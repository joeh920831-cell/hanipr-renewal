// 브라우저 검사: node tests/screens.mjs → 7페이지 × PC/모바일 스크린샷(shots/), 가로 넘침·폼 동작 단언
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const { chromium } = createRequire(import.meta.url)('playwright');
const PAGES = ['/', '/seo-aeo-geo/', '/shortform/', '/automation/', '/agent-q/', '/consult/', '/reviews/'];
const server = spawn('python3', ['-m', 'http.server', '8124'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
mkdirSync('shots', { recursive: true });
const browser = await chromium.launch();
const fails = [];
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const path of PAGES) {
      await page.goto('http://localhost:8124' + path);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      if (sw > width) fails.push(`${path} @${width}: horizontal scroll ${sw}`);
      await page.screenshot({ path: `shots/${path.replace(/\//g, '_') || '_'}${width}.png`, fullPage: true });
    }
    await page.close();
  }

  // 모바일: 페이지 맨 아래에서 하단 고정 바가 마지막 폼 버튼·푸터를 가리지 않아야 함
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto('http://localhost:8124/consult/');
  await m.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await m.waitForTimeout(200);
  const bar = await m.locator('.mobile-bar').boundingBox();
  const foot = await m.locator('.site-footer').boundingBox();
  if (foot.y + foot.height > bar.y) fails.push(`footer hidden behind mobile bar (${foot.y + foot.height} > ${bar.y})`);

  // 필수 12: 모바일에서도 H1 이 페이지에서 가장 큰 글씨
  const h = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await h.goto('http://localhost:8124/');
  const sizes = await h.evaluate(() => {
    const h1 = parseFloat(getComputedStyle(document.querySelector('h1')).fontSize);
    const max = Math.max(...[...document.querySelectorAll('body *:not(h1)')].filter((e) => e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())).map((e) => parseFloat(getComputedStyle(e).fontSize)));
    return { h1, max };
  });
  if (sizes.h1 <= sizes.max) fails.push(`H1 ${sizes.h1}px not largest on mobile (max other ${sizes.max}px)`);

  // 움직임 줄이기: 복제 카드 숨김, 복제 링크는 포커스 불가
  const r = await browser.newPage({ reducedMotion: 'reduce' });
  await r.goto('http://localhost:8124/');
  const visibleReviews = await r.locator('#rv-title ~ * .review, .marquee .review').evaluateAll((els) => els.filter((e) => e.offsetParent).length);
  if (visibleReviews !== 10) fails.push(`reduced motion shows ${visibleReviews} review cards (want 10)`);
  const dupFocusable = await r.evaluate(() => [...document.querySelectorAll('[aria-hidden="true"] a')].filter((a) => !a.closest('[inert]')).length);
  if (dupFocusable) fails.push(`${dupFocusable} focusable links inside aria-hidden duplicates`);

  // 동의 누락 → 차단 메시지
  await m.fill('#consult-form [name=name]', '테스트');
  await m.fill('#consult-form [name=phone]', '010-1234-5678');
  await m.fill('#consult-form [name=clinic]', '테스트한의원');
  await m.fill('#consult-form [name=region]', '서울');
  await m.click('#consult-form button[type=submit]');
  assert.equal(await m.textContent('#consult-form .form-msg'), '개인정보 수집에 동의해 주세요');

  // 전송 실패(엔드포인트 오류) → 입력 유지 + 전화 안내
  await m.check('#consult-form [name=agree]');
  await m.evaluate(() => { document.querySelector('#consult-form').dataset.endpoint = 'http://localhost:9/none'; });
  await m.click('#consult-form button[type=submit]');
  await m.waitForFunction(() => document.querySelector('#consult-form .form-msg').textContent.includes('02-761-1633'));
  assert.equal(await m.inputValue('#consult-form [name=name]'), '테스트');

  // 응답 없는 서버 → 시간 초과 후 전화 안내
  await m.clock.install();
  await m.route('**/hang-endpoint', () => {});
  await m.evaluate(() => { const f = document.querySelector('#consult-form'); f.dataset.endpoint = 'http://localhost:8124/hang-endpoint'; f.querySelector('.form-msg').textContent = ''; });
  await m.click('#consult-form button[type=submit]');
  await m.clock.runFor(16000);
  await m.waitForFunction(() => document.querySelector('#consult-form .form-msg').textContent.includes('02-761-1633'), null, { timeout: 3000 });

  // 전송 성공 → 완료 메시지
  await m.route('**/ok-endpoint', (r) => r.fulfill({ contentType: 'application/json', body: '{"ok":true}' }));
  await m.evaluate(() => { document.querySelector('#consult-form').dataset.endpoint = 'http://localhost:8124/ok-endpoint'; });
  await m.click('#consult-form button[type=submit]');
  await m.waitForSelector('.form-done');

  // 모바일 메뉴 토글
  await m.click('.nav-toggle');
  assert.ok(await m.isVisible('#site-nav a[href="/agent-q/"]'));
} catch (e) {
  fails.push(String(e.message || e));
} finally {
  await browser.close();
  server.kill();
}
if (fails.length) { console.log(fails.map((f) => '✗ ' + f).join('\n')); process.exit(1); }
console.log('✓ screens: 14 shots, no horizontal scroll, form flows ok');

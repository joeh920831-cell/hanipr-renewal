// 브라우저 검사: node tests/screens.mjs → 7페이지 × PC/모바일 스크린샷(shots/), 가로 넘침·폼 동작 단언
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const { chromium } = createRequire(import.meta.url)('playwright');
const PAGES = ['/', '/seo-aeo-geo/', '/shortform/', '/automation/', '/agent-q/', '/diagnosis/', '/magazine/', '/cases/', '/magazine/naver-ai-briefing/', '/diagnosis/done/'];
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
  await m.goto('http://localhost:8124/diagnosis/');
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
  const visibleReviews = await r.locator('.marquee .review').evaluateAll((els) => els.filter((e) => e.offsetParent).length);
  if (visibleReviews !== 10) fails.push(`reduced motion shows ${visibleReviews} review cards (want 10)`);
  const dupFocusable = await r.evaluate(() => [...document.querySelectorAll('[aria-hidden="true"] a')].filter((a) => !a.closest('[inert]')).length);
  if (dupFocusable) fails.push(`${dupFocusable} focusable links inside aria-hidden duplicates`);

  // 동의 누락 → 차단 메시지
  await m.fill('#diagnosis-form [name=name]', '테스트');
  await m.fill('#diagnosis-form [name=phone]', '010-1234-5678');
  await m.fill('#diagnosis-form [name=clinic]', '테스트한의원');
  await m.click('#diagnosis-form button[type=submit]');
  assert.equal(await m.textContent('#diagnosis-form .form-msg'), '개인정보 수집에 동의해 주세요');

  // 전송 실패(엔드포인트 오류) → 입력 유지 + 전화 안내
  await m.check('#diagnosis-form [name=agree]');
  await m.evaluate(() => { document.querySelector('#diagnosis-form').dataset.endpoint = 'http://localhost:9/none'; });
  await m.click('#diagnosis-form button[type=submit]');
  await m.waitForFunction(() => document.querySelector('#diagnosis-form .form-msg').textContent.includes('02-761-1633'));
  assert.equal(await m.inputValue('#diagnosis-form [name=name]'), '테스트');

  // 응답 없는 서버 → 시간 초과 후 전화 안내
  await m.clock.install();
  await m.route('**/hang-endpoint', () => {});
  await m.evaluate(() => { const f = document.querySelector('#diagnosis-form'); f.dataset.endpoint = 'http://localhost:8124/hang-endpoint'; f.querySelector('.form-msg').textContent = ''; });
  await m.click('#diagnosis-form button[type=submit]');
  await m.clock.runFor(16000);
  await m.waitForFunction(() => document.querySelector('#diagnosis-form .form-msg').textContent.includes('02-761-1633'), null, { timeout: 3000 });

  // 전송 성공 → 완료 메시지
  await m.route('**/ok-endpoint', (r) => r.fulfill({ contentType: 'application/json', body: '{"ok":true}' }));
  await m.evaluate(() => { document.querySelector('#diagnosis-form').dataset.endpoint = 'http://localhost:8124/ok-endpoint'; });
  await m.click('#diagnosis-form button[type=submit]');
  await m.waitForURL('**/diagnosis/done/?clinic=*');
  assert.equal(await m.textContent('#done-clinic'), '테스트한의원');

  // 첫 화면 인라인 진단 폼: 연락처 오류 → 해당 칸으로 포커스
  await m.goto('http://localhost:8124/');
  await m.fill('#hero-form [name=clinic]', 'A한의원');
  await m.fill('#hero-form [name=phone]', '010-1234-567');
  await m.click('#hero-form button[type=submit]');
  assert.equal(await m.textContent('#hero-form .form-msg'), '연락처를 확인해 주세요');
  assert.equal(await m.evaluate(() => document.activeElement.name), 'phone');

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
console.log('✓ screens: 20 shots, no horizontal scroll, form flows ok');

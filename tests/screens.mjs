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

  // 모바일: 상담 폼 제출 버튼이 하단 고정 바에 가리지 않아야 함
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto('http://localhost:8124/consult/');
  await m.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await m.waitForTimeout(200);
  const btn = await m.locator('#consult-form button[type=submit]').boundingBox();
  const bar = await m.locator('.mobile-bar').boundingBox();
  await m.locator('#consult-form button[type=submit]').scrollIntoViewIfNeeded();
  const btn2 = await m.locator('#consult-form button[type=submit]').boundingBox();
  if (btn2.y + btn2.height > bar.y) fails.push(`consult submit hidden behind mobile bar (${btn2.y + btn2.height} > ${bar.y})`);

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

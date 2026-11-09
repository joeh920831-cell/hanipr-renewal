// Contest requirement checker: node tests/check.mjs → exit 1 on any failure.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = 'https://hanipr-renewal.vercel.app';
const PAGES = {
  '/': 'index.html',
  '/seo-aeo-geo/': 'seo-aeo-geo/index.html',
  '/shortform/': 'shortform/index.html',
  '/automation/': 'automation/index.html',
  '/agent-q/': 'agent-q/index.html',
  '/consult/': 'consult/index.html',
  '/reviews/': 'reviews/index.html',
};
const BANNED = ['가장', '1위', '최고', '유일', 'no.1', 'no1', '국내 최다'];
const H1 = 'SEO·AEO·GEO, 한의원 한방병원 마케팅대행사';
const TITLE = '한의원한방병원 마케팅·신환 늘리기 | AI 검색 노출 전문 금솔';
const DESC_KEYWORDS = ['SEO·AEO·GEO', '네이버 AI 브리핑', '네이버 클립·쇼츠', '에이전트Q', 'AI마케팅',
  '한의원홈페이지 제작', '한방병원 마케팅 대행사', '무료 AI 노출 진단', '상담'];
const NETWORK = ['hanbangcar.com', 'womandoc.co.kr', 'sschuna.com', 'ipwon.com', 'sanjaeok.com', 'healingoasis.kr'];

const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (p) => (existsSync(join(ROOT, p)) ? readFileSync(join(ROOT, p), 'utf8') : null);
const text = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');
const meta = (html, name) => (html.match(new RegExp(`<meta[^>]+name="${name}"[^>]+content="([^"]*)"`)) || [])[1];

for (const [url, file] of Object.entries(PAGES)) {
  const html = read(file);
  if (!html) { fails.push(`${file}: missing`); continue; }
  ok(/<html lang="ko"/.test(html), `${file}: html lang="ko"`);
  ok(/<title>[^<]+<\/title>/.test(html), `${file}: <title>`);
  ok(meta(html, 'description'), `${file}: meta description`);
  ok(meta(html, 'viewport'), `${file}: viewport`);
  ok(html.includes(`<link rel="canonical" href="${BASE_URL}${url}"`), `${file}: canonical ${BASE_URL}${url}`);
  ok((html.match(/<h1[\s>]/g) || []).length === 1, `${file}: exactly one <h1>`);
  ok(html.includes('application/ld+json'), `${file}: JSON-LD`);
  const visible = (text(html) + ' ' + (html.match(/content="[^"]*"/g) || []).join(' ')).toLowerCase();
  for (const w of BANNED) ok(!visible.includes(w), `${file}: banned word "${w}"`);
  for (const other of Object.keys(PAGES)) ok(html.includes(`href="${other}"`), `${file}: menu link ${other}`);
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const p = href.slice(1);
    ok(p === '' || existsSync(join(ROOT, p, 'index.html')) || existsSync(join(ROOT, p)), `${file}: broken link ${href}`);
  }
  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) ok(/alt="[^"]+"/.test(img), `${file}: img without alt ${img.slice(0, 60)}`);
}

const index = read('index.html');
if (index) {
  ok((index.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, '').trim() === H1, 'index: H1 text exact');
  ok(index.includes(`<title>${TITLE}</title>`), 'index: title exact');
  const d = meta(index, 'description') || '';
  for (const k of DESC_KEYWORDS) ok(d.includes(k), `index: description keyword "${k}"`);
  ok(text(index).includes('SEO·AEO·GEO를 잘하는 대행사'), 'index: hero message');
  ok((index.match(/href="\/consult\/"/g) || []).length >= 2, 'index: >=2 consult links');
  ok(index.includes('class="mobile-bar"'), 'index: .mobile-bar');
  ok(index.includes('kakao-fab'), 'index: .kakao-fab');
  for (const n of NETWORK) ok(index.includes(n), `index: network link ${n}`);
  for (const p of ['/seo-aeo-geo/', '/shortform/', '/automation/']) ok(index.includes(`href="${p}"`), `index: product ${p}`);
  ok(index.includes('id="video-gallery"'), 'index: #video-gallery');
  ok(index.includes('id="agent-q-preview"'), 'index: #agent-q-preview');
}

const css = read('assets/css/style.css') || '';
ok(/#1F7A5C/i.test(css), 'css: point color #1F7A5C');
ok(css.includes('prefers-reduced-motion'), 'css: prefers-reduced-motion');

const sitemap = read('sitemap.xml') || '';
for (const url of Object.keys(PAGES)) ok(sitemap.includes(`<loc>${BASE_URL}${url}</loc>`), `sitemap: ${url}`);
ok(existsSync(join(ROOT, 'og.png')), 'og.png exists');
const vi = read('.vercelignore') || '';
for (const d of ['docs', 'apps-script', 'src', 'tests', 'data']) ok(vi.includes(d), `.vercelignore: ${d}`);
ok(/"trailingSlash":\s*true/.test(read('vercel.json') || ''), 'vercel.json trailingSlash');
ok(/Sitemap: /.test(read('robots.txt') || ''), 'robots.txt: Sitemap line');

if (fails.length) { console.log(fails.map((f) => '✗ ' + f).join('\n') + `\n${fails.length} failed`); process.exit(1); }
console.log('✓ all requirement checks passed');

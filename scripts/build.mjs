// src/pages/*.mjs → 정적 HTML. 결과물은 커밋되고 Vercel은 그대로 서빙한다.
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { BASE_URL } from '../src/layout.mjs';

// [주소, 모듈, 사이트맵 포함]
const PAGES = [
  ['/', 'home'], ['/seo-aeo-geo/', 'seo'], ['/shortform/', 'shortform'], ['/automation/', 'automation'],
  ['/agent-q/', 'agentq'], ['/diagnosis/', 'diagnosis'], ['/magazine/', 'magazine'], ['/cases/', 'cases'],
  ['/diagnosis/done/', 'done', false],
];
const out = {};
for (const [path, mod] of PAGES) out[path] = { html: (await import(`../src/pages/${mod}.mjs`)).default, inSitemap: PAGES.find((p) => p[0] === path)[2] !== false };
for (const [path, html] of Object.entries((await import('../src/pages/article.mjs')).default)) out[path] = { html, inSitemap: true };

for (const old of ['consult', 'reviews']) rmSync(old, { recursive: true, force: true }); // 이전 구조 페이지 제거
for (const [path, { html }] of Object.entries(out)) {
  const dir = '.' + path; mkdirSync(dir, { recursive: true });
  writeFileSync(dir + 'index.html', html);
}
const today = new Date().toISOString().slice(0, 10);
const urls = Object.entries(out).filter(([, v]) => v.inSitemap).map(([p]) => `  <url><loc>${BASE_URL}${p}</loc><lastmod>${today}</lastmod></url>`);
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
writeFileSync('robots.txt', `User-agent: *\nAllow: /\nDisallow: /diagnosis/done/\n\nSitemap: ${BASE_URL}/sitemap.xml\n`);
console.log(`built ${Object.keys(out).length} pages`);

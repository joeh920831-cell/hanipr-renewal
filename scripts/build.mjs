// src/pages/*.mjs → 정적 HTML. 결과물은 커밋되고 Vercel은 그대로 서빙한다.
import { writeFileSync, mkdirSync } from 'node:fs';
import { BASE_URL } from '../src/layout.mjs';

const PAGES = { '/': 'home', '/seo-aeo-geo/': 'seo', '/shortform/': 'shortform', '/automation/': 'automation', '/agent-q/': 'agentq', '/consult/': 'consult', '/reviews/': 'reviews' };
const today = new Date().toISOString().slice(0, 10);
for (const [path, mod] of Object.entries(PAGES)) {
  let html;
  try { html = (await import(`../src/pages/${mod}.mjs`)).default; } catch (e) { if (e.code === 'ERR_MODULE_NOT_FOUND') continue; throw e; }
  const dir = '.' + path; mkdirSync(dir, { recursive: true });
  writeFileSync(dir + 'index.html', html);
}
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(PAGES).map((p) => `  <url><loc>${BASE_URL}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`);
console.log('built');

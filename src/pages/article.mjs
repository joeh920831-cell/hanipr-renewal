// 매거진 개별 글 페이지 생성기: ARTICLES 의 각 글을 /magazine/<slug>/ 로 만든다
import { page, esc, BASE_URL } from '../layout.mjs';
import { ARTICLES } from '../magazine.mjs';
import { ctaBand } from '../product.mjs';

export default Object.fromEntries(ARTICLES.map((a) => {
  const path = `/magazine/${a.slug}/`;
  const body = `
<section class="page-hero">
  <div class="container">
    <nav class="crumb" aria-label="현재 위치"><a href="/">홈</a> / <a href="/magazine/">AI 매거진</a> / ${a.cat}</nav>
    <h1 style="font-size:clamp(28px,4vw,44px)">${esc(a.title)}</h1>
    <p class="article-meta">하니피알 AI 매거진 편집팀 · <time datetime="${a.date}">${a.date.replace(/-/g, '.')}</time></p>
  </div>
</section>
<article class="section article" style="padding-top:0">
  <div class="answer-box"><b>3줄 요약</b>${esc(a.answer)}</div>
  ${a.body}
  <p class="article-meta">작성: 하니피알 AI 매거진 편집팀 ((주)금솔커뮤니케이션) · 문의 02-761-1633</p>
</article>
${ctaBand('SEO·AEO·GEO (AI 매거진)', 'AI 매거진')}`;
  return [path, page({
    path, breadcrumbName: a.title, title: `${a.title} | 하니피알 AI 매거진`, description: a.desc, body, pageType: 'WebPage',
    jsonld: [{ '@type': 'Article', headline: a.title, description: a.desc, datePublished: a.date, dateModified: a.date, inLanguage: 'ko-KR', author: { '@type': 'Organization', name: '하니피알 AI 매거진 편집팀' }, publisher: { '@id': `${BASE_URL}/#org` }, mainEntityOfPage: `${BASE_URL}${path}`, image: `${BASE_URL}/og.png` }],
  })];
}));

import { page, esc } from '../layout.mjs';
import { ARTICLES } from '../magazine.mjs';
import { ctaBand } from '../product.mjs';

const body = `
<section class="page-hero">
  <div class="container">
    <nav class="crumb" aria-label="현재 위치"><a href="/">홈</a> / AI 매거진</nav>
    <h1>AI 매거진</h1>
    <p>검색과 AI 답변에서 한의원이 발견되는 방법을 원장님 눈높이로 정리합니다.</p>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container">
    <div class="mag-grid">${ARTICLES.map((a) => `<a class="mag" href="/magazine/${a.slug}/"><div class="mag-thumb"><span>${a.cat}</span><strong>${esc(a.title.split(':')[0])}</strong></div><h2 style="font-size:18px;line-height:1.45">${esc(a.title)}</h2><p>${esc(a.desc)}</p><time datetime="${a.date}">${a.date.replace(/-/g, '.')}</time></a>`).join('')}</div>
  </div>
</section>
${ctaBand('SEO·AEO·GEO (AI 매거진)', 'AI 매거진')}`;

export default page({
  path: '/magazine/', breadcrumbName: 'AI 매거진', pageType: 'CollectionPage',
  title: 'AI 매거진 | 한의원 SEO·AEO·GEO 마케팅 노트 | 하니피알',
  description: '네이버 AI 브리핑, ChatGPT 노출, SEO·AEO·GEO 차이, 의료광고 표현까지. 한의원 원장님을 위한 AI 검색 마케팅 노트입니다.',
  body,
});

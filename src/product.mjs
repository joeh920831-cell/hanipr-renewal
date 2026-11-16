// 상품 상세 페이지 공통 틀: 문제 → 해결 → 절차 → 근거 → FAQ → 상담
import { page, faqLd, faqHtml, BASE_URL } from './layout.mjs';

export const subHero = ({ name, h1, lead, cta = '무료 AI 노출 진단 받기', product = '무료 AI 노출 진단' }) => `
<section class="page-hero">
  <div class="container">
    <nav class="crumb" aria-label="현재 위치"><a href="/">홈</a> / ${name}</nav>
    <h1>${h1}</h1>
    <p>${lead}</p>
    <div class="btn-row"><a class="btn btn-primary" href="/diagnosis/?product=${encodeURIComponent(product)}" data-track="cta_sub_hero">${cta}</a><a class="btn btn-ghost" href="tel:027611633">전화 상담 02-761-1633</a></div>
  </div>
</section>`;

export const ctaBand = (product, label) => `
<section class="section">
  <div class="container">
    <div class="final" style="grid-template-columns:1fr;text-align:center;justify-items:center">
      <h2>우리 한의원에 맞는 ${label},<br>진단부터 받아 보세요</h2>
      <p class="lead">한의원명과 연락처만 남기시면 영업일 2일 안에 무료 리포트를 보내드립니다.</p>
      <div class="btn-row center" style="margin-top:28px"><a class="btn btn-primary" href="/diagnosis/?product=${encodeURIComponent(product)}" data-track="cta_sub_end">${label} 상담 신청</a><a class="btn btn-line" href="/agent-q/">에이전트Q로 효과 확인</a></div>
    </div>
  </div>
</section>`;

export function productPage({ path, name, title, description, h1, lead, problems, solutions, steps, example, faqs, serviceType, product }) {
  const body = `${subHero({ name, h1, lead, cta: `${name} 상담 신청`, product })}
<section class="section surface">
  <div class="container">
    <div class="section-head"><span class="kicker">원장님이 겪는 문제</span><h2 class="title">이런 고민, 익숙하지 않으신가요?</h2></div>
    <div class="cards c3">${problems.map(([t, d]) => `<div class="card"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><span class="kicker">하니피알의 방식</span><h2 class="title">${name}, 이렇게 다르게 합니다</h2></div>
    <div class="cards c3">${solutions.map(([t, d]) => `<div class="card"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
<section class="section surface">
  <div class="container">
    <div class="section-head"><span class="kicker">진행 절차</span><h2 class="title">상담부터 리포트까지 4단계</h2></div>
    <div class="steps">${steps.map(([t, d]) => `<div class="step"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><span class="kicker">근거 <span class="tag">예시</span></span><h2 class="title">${example.title}</h2>${example.lead ? `<p class="lead">${example.lead}</p>` : ''}</div>
    ${example.html}
  </div>
</section>
<section class="section surface">
  <div class="container"><div class="section-head"><span class="kicker">자주 묻는 질문</span><h2 class="title">${name} FAQ</h2></div>${faqHtml(faqs)}</div>
</section>
${ctaBand(product, name)}`;
  return page({
    path, title, description, body, breadcrumbName: name,
    jsonld: [faqLd(faqs), { '@type': 'Service', name, serviceType, provider: { '@id': `${BASE_URL}/#org` }, areaServed: '대한민국', audience: { '@type': 'Audience', audienceType: '한의원·한방병원 원장' }, url: `${BASE_URL}${path}` }],
  });
}

// 상품 상세 페이지 공통 틀: 문제 → 해결 → 절차 → 예시 → FAQ → 상담
import { page, faqLd, faqHtml, BASE_URL } from './layout.mjs';

export function productPage({ path, name, title, description, h1, lead, problems, solutions, steps, example, faqs, serviceType }) {
  const body = `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="현재 위치"><a href="/">홈</a> › ${name}</nav>
    <h1>${h1}</h1>
    <p>${lead}</p>
    <div class="btn-row" style="margin-top:28px"><a class="btn btn-primary" href="/consult/">무료 AI 노출 진단 받기</a><a class="btn" href="tel:027611633">전화 상담 02-761-1633</a></div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">원장님이 겪는 문제</p><h2 class="section-title">이런 고민, 익숙하지 않으신가요?</h2></div>
    <div class="grid grid-3">${problems.map(([t, d]) => `<div class="card"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head"><p class="eyebrow">하니피알의 해결 방식</p><h2 class="section-title">${name}, 이렇게 다르게 합니다</h2></div>
    <div class="grid grid-3">${solutions.map(([t, d], i) => `<div class="card"><span class="num">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">진행 절차</p><h2 class="section-title">상담부터 리포트까지 4단계</h2></div>
    <div class="steps">${steps.map(([t, d]) => `<div class="step"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head"><p class="eyebrow">예시</p><h2 class="section-title">${example.title} <span class="badge">예시</span></h2>${example.lead ? `<p class="section-lead">${example.lead}</p>` : ''}</div>
    ${example.html}
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">자주 묻는 질문</p><h2 class="section-title">${name} FAQ</h2></div>
    ${faqHtml(faqs)}
    <div class="btn-row" style="margin-top:40px"><a class="btn btn-primary" href="/consult/">${name} 상담 신청</a><a class="btn" href="/agent-q/">에이전트Q로 효과 확인하기</a></div>
  </div>
</section>`;
  return page({
    path, title, description, body, breadcrumbName: name,
    jsonld: [faqLd(faqs), { '@type': 'Service', name, serviceType, provider: { '@id': `${BASE_URL}/#org` }, areaServed: '대한민국', audience: { '@type': 'Audience', audienceType: '한의원·한방병원 원장' }, url: `${BASE_URL}${path}` }],
  });
}

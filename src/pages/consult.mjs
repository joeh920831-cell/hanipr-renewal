import { page, PHONE, FAST_PHONE } from '../layout.mjs';
import { leadForm } from '../form.mjs';

const body = `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="현재 위치"><a href="/">홈</a> › 상담·무료 진단</nav>
    <h1>무료 AI 노출 진단 · 상담 신청</h1>
    <p>신청서를 남겨 주시면 담당 컨설턴트가 영업일 기준 1일 안에 연락드립니다. 진단 결과는 비용 없이 받아보실 수 있습니다.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="grid grid-2" style="align-items:start">
      <div>
        <h2 class="section-title" style="font-size:26px">진단에서 받아보시는 내용</h2>
        <ul class="grid" style="margin-top:24px">
          <li class="card"><span class="num">01</span><h3>주요 키워드 검색 순위</h3><p>진료 분야·지역 키워드에서 블로그·플레이스 노출 위치</p></li>
          <li class="card"><span class="num">02</span><h3>AI 답변 노출 여부</h3><p>ChatGPT·Gemini·Perplexity·네이버 AI 브리핑에서 한의원이 언급되는지</p></li>
          <li class="card"><span class="num">03</span><h3>경쟁 한의원 비교</h3><p>같은 질문에서 주변 한의원 대비 위치와 빈틈</p></li>
          <li class="card"><span class="num">04</span><h3>우선 실행 제안 3가지</h3><p>지금 예산 안에서 먼저 하면 좋은 일</p></li>
        </ul>
        <p class="note" style="margin-top:24px">전화 상담 <a href="tel:027611633">${PHONE}</a> (평일 09:00~18:00) · 빠른 상담 <a href="tel:01042366319">${FAST_PHONE}</a></p>
      </div>
      <div class="card">${leadForm({ id: 'consult-form', full: true, source: '상담 페이지' })}</div>
    </div>
  </div>
</section>`;

export default page({
  path: '/consult/', breadcrumbName: '상담·무료 진단',
  title: '무료 AI 노출 진단·상담 신청 | 한의원 마케팅 하니피알',
  description: '한의원·한방병원 무료 AI 노출 진단과 마케팅 상담을 신청하세요. 키워드 순위, AI 답변 노출, 경쟁 한의원 비교, 우선 실행 제안을 무료로 보내드립니다.',
  body,
  jsonld: [{ '@type': 'ContactPage', name: '무료 AI 노출 진단·상담 신청' }],
});

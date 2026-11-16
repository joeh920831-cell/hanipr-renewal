import { page, PHONE, FAST_PHONE } from '../layout.mjs';
import { leadForm } from '../form.mjs';

export const reportSample = `<div class="report">
  <div class="report-head"><strong>A한의원 AI 노출 진단 리포트</strong><span class="tag">예시</span></div>
  <div class="report-body">
    <div class="cards c3">
      <div class="card"><span class="example">AI 노출 점유율</span><h3 style="font-size:32px;color:var(--point)">18%</h3><p>등록 질문 20개, AI 6종 기준</p></div>
      <div class="card"><span class="example">지역 경쟁 순위</span><h3 style="font-size:32px;color:var(--point)">4위 / 6곳</h3><p>반경 2km 한의원 비교</p></div>
      <div class="card"><span class="example">답변에서 빠진 질문</span><h3 style="font-size:32px;color:var(--point)">13개</h3><p>교통사고 입원·야간진료 등</p></div>
    </div>
    <div class="table-wrap"><table class="data"><thead><tr><th>우선 실행 제안</th><th>기대 효과</th></tr></thead><tbody>
      <tr><td>교통사고 입원 질문 5개에 맞춘 AI 매거진 발행</td><td>ChatGPT·네이버 AI 브리핑 인용 출처 확보</td></tr>
      <tr><td>플레이스·홈페이지 한의원 정보 통일</td><td>AI가 같은 기관으로 인식하도록 정리</td></tr>
      <tr><td>야간진료 안내 숏폼 2편</td><td>네이버 클립 검색 노출</td></tr>
    </tbody></table></div>
  </div>
</div>`;

const body = `
<section class="page-hero">
  <div class="container">
    <nav class="crumb" aria-label="현재 위치"><a href="/">홈</a> / 상담·무료 진단</nav>
    <h1>무료 AI 노출 진단 · 상담 신청</h1>
    <p>우리 한의원이 검색과 AI 답변에 어떻게 나오는지 에이전트Q로 측정해, 영업일 2일 안에 리포트로 보내드립니다. 비용은 없습니다.</p>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container">
    <ol class="flow" aria-label="진단 진행 순서">
      <li class="on"><b>1 · 지금</b>신청서 작성 (1분)</li>
      <li><b>2 · 영업일 1일 안</b>담당 컨설턴트 확인 전화</li>
      <li><b>3 · 영업일 2일 안</b>진단 리포트 발송 (카톡·메일)</li>
    </ol>
    <div class="cards c2" style="margin-top:32px;align-items:start">
      ${leadForm({ id: 'diagnosis-form', full: true, source: '진단 페이지' })}
      <div>
        <h2 class="title" style="font-size:26px">리포트에서 받아보시는 것</h2>
        <ul class="checks" style="margin-top:20px"><li>주요 키워드 검색 순위 (블로그·플레이스)</li><li>AI 6종 답변 속 한의원 노출 여부</li><li>같은 질문에서 경쟁 한의원 대비 위치</li><li>지금 예산 안에서 먼저 할 일 3가지</li></ul>
        <div class="contact-list">
          <a href="tel:027611633"><small>대표 상담 (평일 09:00~18:00)</small><b>${PHONE}</b></a>
          <a href="tel:01042366319"><small>빠른 상담</small><b>${FAST_PHONE}</b></a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section surface">
  <div class="container">
    <div class="section-head"><span class="kicker">리포트 미리보기</span><h2 class="title">이런 리포트를 받아보십니다</h2></div>
    ${reportSample}
  </div>
</section>
<section class="section" id="privacy">
  <div class="container" style="max-width:820px">
    <h2 class="title" style="font-size:22px">개인정보 수집·이용 안내</h2>
    <p class="lead" style="font-size:15px">수집 항목: 기관명, 연락처, 성함, 지역, 주력 진료, 문의 내용 · 목적: 상담 및 진단 리포트 회신 · 보유 기간: 상담 목적 달성 시까지. 목적 이외의 용도로 사용하지 않으며, 동의를 거부할 수 있으나 이 경우 신청이 제한됩니다.</p>
  </div>
</section>`;

export default page({
  path: '/diagnosis/', breadcrumbName: '상담·무료 진단', pageType: 'ContactPage',
  title: '무료 AI 노출 진단·상담 신청 | 한의원 마케팅 하니피알',
  description: '한의원·한방병원 무료 AI 노출 진단과 마케팅 상담을 신청하세요. 키워드 순위, AI 6종 답변 노출, 경쟁 한의원 비교, 우선 실행 제안을 영업일 2일 안에 보내드립니다.',
  body,
});

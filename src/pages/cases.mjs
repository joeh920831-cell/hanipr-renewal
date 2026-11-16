import { page, esc } from '../layout.mjs';
import { REVIEWS, kakaoShots } from './home.mjs';
import { ctaBand } from '../product.mjs';

const cases = [
  ['A한의원 · 경기 군포', '교통사고·입원', '+31%p', 'ChatGPT 노출 점유율', ['교통사고 질문 20개 질문 지도 작성', '질문형 AI 매거진 12편 발행', '플레이스·홈페이지 정보 통일']],
  ['B한의원 · 서울 강서', '추나·통증', '8/10', '핵심 질문 AI 답변 노출', ['추나 건강보험 관련 질문 집중', '원장 출연 숏폼 6편', '네이버 클립 검색 노출']],
  ['C한방병원 · 인천 부평', '한방병원 입원', '+2계단', '지역 경쟁 기관 대비 순위 상승', ['입원닷컴·한방카 네트워크 연동', '입원 안내 매거진 정비', '주간 자동 추적·보완']],
];
const card = (r) => `<article class="review"><p>${esc(r.text)}</p><div class="svc">${r.services.map((s) => `<span class="tag gray">${esc(s)}</span>`).join('')}</div><p class="who">${esc(r.region)} · ${esc(r.clinic)} ${esc(r.director)} 원장</p></article>`;

const body = `
<section class="page-hero">
  <div class="container">
    <nav class="crumb" aria-label="현재 위치"><a href="/">홈</a> / 사례·후기</nav>
    <h1>성과 사례와 원장님 후기</h1>
    <p>무엇을 바꿨고 무엇이 달라졌는지, 그리고 17년 동안 원장님들이 직접 남겨 주신 이야기입니다.</p>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container">
    <div class="section-head"><span class="kicker">성과 사례 <span class="tag">예시</span></span><h2 class="title">진단 → 콘텐츠 → 재측정</h2><p class="lead">아래 사례의 기관명과 수치는 이해를 돕기 위한 예시입니다.</p></div>
    <div class="results">${cases.map(([h, f, n, m, li]) => `<article class="result"><span class="period">${f}</span><b>${n}</b><p class="metric">${m}</p><h3>${h}</h3><ul class="checks" style="margin-top:14px">${li.map((x) => `<li style="font-size:15px;font-weight:500">${x}</li>`).join('')}</ul></article>`).join('')}</div>
  </div>
</section>
<section class="section surface">
  <div class="container">
    <div class="section-head"><span class="kicker">카카오톡 후기</span><h2 class="title">원장님이 카톡으로 보내 주신 이야기</h2><p class="lead">원장님 성함과 프로필 사진은 가렸습니다.</p></div>
    <div class="kakao-row" style="margin-top:0">${kakaoShots()}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><span class="kicker">서면 후기 ${REVIEWS.length}건</span><h2 class="title">서비스를 이용 중인 원장님 후기</h2><p class="lead">성함·한의원명 일부를 가렸고, 긴 후기는 핵심 내용 위주로 줄였습니다.</p></div>
    <div class="review-grid">${REVIEWS.map(card).join('')}</div>
  </div>
</section>
${ctaBand('무료 AI 노출 진단', '무료 AI 노출 진단')}`;

export default page({
  path: '/cases/', breadcrumbName: '사례·후기',
  title: '성과 사례·원장님 후기 | 한의원 마케팅 하니피알',
  description: `한의원·한방병원 AI 검색 마케팅 성과 사례와 원장님 ${REVIEWS.length}분의 실제 후기, 카카오톡 후기를 확인하세요.`,
  body,
});

import { page, faqLd, faqHtml, BASE_URL } from '../layout.mjs';

const share = [['네이버 AI 브리핑', 46, 31], ['ChatGPT', 38, 22], ['Gemini', 27, 15], ['Perplexity', 21, 9]];
const rank = [['A한의원 (고객사)', 92, '▲4', true], ['B한의원', 71, '▼1'], ['C한방병원', 58, '▼1'], ['D한의원', 33, '▼2'], ['E한의원', 19, '–']];
const questions = [['강서구 교통사고 한의원 추천', 9, 10], ['교통사고 입원 가능한 한방병원', 8, 10], ['추나요법 건강보험 되는 한의원', 6, 10], ['산후보약 잘하는 한의원', 4, 10], ['다이어트 한약 상담 한의원', 3, 10]];
const sources = [['A한의원 블로그 (AI 매거진)', 34], ['A한의원 홈페이지', 21], ['네이버 플레이스', 18], ['한방카 네트워크', 12], ['언론 기사', 7]];
const faqs = [
  ['에이전트Q는 어떻게 측정하나요?', '진료 분야와 지역에 맞춘 질문 세트를 ChatGPT, Gemini, Perplexity, 네이버 AI 브리핑에 같은 조건으로 반복 질의하고, 답변 속 한의원 언급과 인용 출처를 집계합니다.'],
  ['무료 진단에서도 에이전트Q 결과를 볼 수 있나요?', '네. 무료 AI 노출 진단에서 주요 질문 기준의 AI별 노출 여부와 경쟁 한의원 비교를 요약해 드립니다.'],
  ['측정 결과는 얼마나 자주 받나요?', '진행 고객사는 매월 리포트로 받으시며, 큰 변화가 있으면 담당 마케터가 바로 알려드립니다.'],
];

const body = `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="현재 위치"><a href="/">홈</a> › 에이전트Q</nav>
    <h1>에이전트Q,<br>AI 답변 속 우리 한의원 위치를 숫자로</h1>
    <p>"AI 마케팅을 한다"는 말은 쉽지만 확인은 어렵습니다. 에이전트Q는 환자가 실제로 묻는 질문을 AI에 반복해서 던지고, 우리 한의원이 몇 번, 어떤 출처로, 경쟁 한의원보다 몇 위로 나오는지 측정합니다.</p>
    <div class="btn-row" style="margin-top:28px"><a class="btn btn-primary" href="/consult/">우리 한의원 무료 측정 신청</a></div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head"><p class="eyebrow">대시보드 <span class="badge">예시</span></p><h2 class="section-title">에이전트Q 4가지 핵심 지표</h2><p class="section-lead">아래 수치는 이해를 돕기 위한 예시입니다. 진단 신청 시 원장님 한의원의 실제 데이터로 보여드립니다.</p></div>
    <div class="grid grid-2">
      <div class="dash">
        <h3>① AI별 노출 점유율</h3><p class="dash-q">질문 20개 × 10회 질의 중 A한의원 언급 비율 (진한 막대: 현재 / 회색: 3개월 전)</p>
        ${share.map(([n, v, b]) => `<div class="bar-row"><span>${n}</span><div><div class="bar"><i style="width:${v}%"></i></div><div class="bar muted" style="margin-top:4px;height:6px"><i style="width:${b}%"></i></div></div><b>${v}%</b></div>`).join('')}
      </div>
      <div class="dash">
        <h3>② 경쟁 한의원 대비 순위</h3><p class="dash-q">반경 2km 내 한의원, 전체 AI 답변 언급 횟수 기준</p>
        <div class="table-wrap"><table class="data"><thead><tr><th>순위</th><th>한의원</th><th class="n">언급</th><th class="n">변화</th></tr></thead><tbody>
        ${rank.map(([n, c, d, us], i) => `<tr${us ? ' class="us"' : ''}><td>${i + 1}</td><td>${n}</td><td class="n">${c}</td><td class="n">${d}</td></tr>`).join('')}
        </tbody></table></div>
      </div>
      <div class="dash">
        <h3>③ 질문별 노출 빈도</h3><p class="dash-q">질문마다 10회 질의 중 A한의원이 답변에 포함된 횟수</p>
        <div class="table-wrap"><table class="data"><thead><tr><th>환자 질문</th><th class="n">노출</th></tr></thead><tbody>
        ${questions.map(([q, c, t]) => `<tr><td>${q}</td><td class="n">${c}/${t}</td></tr>`).join('')}
        </tbody></table></div>
      </div>
      <div class="dash">
        <h3>④ AI가 인용한 출처</h3><p class="dash-q">A한의원이 언급된 답변에서 AI가 근거로 연결한 출처 비중</p>
        ${sources.map(([n, v]) => `<div class="bar-row"><span>${n}</span><div class="bar"><i style="width:${v * 2}%"></i></div><b>${v}%</b></div>`).join('')}
      </div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">활용 방법</p><h2 class="section-title">측정이 다음 행동으로 이어집니다</h2></div>
    <div class="grid grid-3">
      <div class="card"><span class="num">점유율이 낮다면</span><h3>AI 매거진 보강</h3><p>노출이 약한 AI와 질문을 골라 답변형 콘텐츠를 우선 발행합니다.</p><a class="more" href="/seo-aeo-geo/">SEO·AEO·GEO 보기 →</a></div>
      <div class="card"><span class="num">경쟁사에 밀린다면</span><h3>인용 출처 분석</h3><p>경쟁 한의원이 어떤 출처로 인용되는지 확인하고 빈 출처를 먼저 채웁니다.</p><a class="more" href="/automation/">자동 모니터링 보기 →</a></div>
      <div class="card"><span class="num">영상 질문이 많다면</span><h3>숏폼으로 확장</h3><p>"방법", "순서"를 묻는 질문은 숏폼 영상으로 만들어 클립 검색까지 노출합니다.</p><a class="more" href="/shortform/">숏폼 영상 보기 →</a></div>
    </div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head"><p class="eyebrow">자주 묻는 질문</p><h2 class="section-title">에이전트Q FAQ</h2></div>
    ${faqHtml(faqs)}
    <div class="btn-row" style="margin-top:40px"><a class="btn btn-primary" href="/consult/">무료 AI 노출 진단 신청</a></div>
  </div>
</section>`;

export default page({
  path: '/agent-q/', breadcrumbName: '에이전트Q',
  title: '에이전트Q | 한의원 AI 노출 점유율·경쟁 순위 분석 | 하니피알',
  description: '에이전트Q는 ChatGPT·Gemini·Perplexity·네이버 AI 브리핑에서 한의원의 AI별 노출 점유율, 경쟁 한의원 대비 순위, 질문별 노출 빈도, 인용 출처를 측정합니다.',
  body,
  jsonld: [faqLd(faqs), { '@type': 'Service', name: '에이전트Q', serviceType: 'AI 검색 노출 분석', provider: { '@id': `${BASE_URL}/#org` }, url: `${BASE_URL}/agent-q/` }],
});

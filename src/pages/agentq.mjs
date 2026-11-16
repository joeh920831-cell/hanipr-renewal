import { page, faqLd, faqHtml, BASE_URL } from '../layout.mjs';
import { subHero, ctaBand } from '../product.mjs';

const share = [['ChatGPT', 62, 31], ['Perplexity', 71, 44], ['Gemini', 48, 22], ['Claude', 33, 12], ['네이버 AI 브리핑', 39, 18], ['구글 AI 개요', 27, 10]];
const rank = [['△△한의원', 41, '–'], ['우리 한의원', 36, '▲2', true], ['□□한방병원', 22, '▼1'], ['◇◇한의원', 12, '▼1'], ['☆☆한의원', 9, '–']];
const qfreq = [['군포 교통사고 입원 한의원', 8], ['당정동 야간진료 한의원', 6], ['허리 디스크 추나 치료', 5], ['산본 한방병원 자동차보험', 4], ['군포 산후보약 한의원', 3]];
const sources = [['한의원 AI 매거진', 34], ['네이버 플레이스', 22], ['한의원 홈페이지', 18], ['입원닷컴·한방카', 14], ['언론 기사', 7]];
const faqs = [
  ['에이전트Q는 어떻게 측정하나요?', '진료 분야와 지역에 맞춘 질문을 등록하고 ChatGPT·Gemini·Perplexity·Claude·네이버 AI·구글 AI의 답변을 같은 조건으로 반복 수집해, 한의원 언급 여부·언급 순서·인용 출처를 기록합니다. 답변 원문도 함께 저장해 수치의 근거를 확인할 수 있습니다.'],
  ['경쟁 한의원과 비교할 수 있나요?', '네. 같은 질문에서 AI가 어떤 한의원을 몇 번째로 언급했는지, 어떤 출처를 근거로 삼았는지 함께 집계합니다. 우리 한의원이 빠진 답변에서 대신 언급된 기관과 그 근거 문서도 확인할 수 있습니다.'],
  ['AI 답변 노출을 보장하나요?', '아닙니다. 노출과 인용 여부는 각 AI 서비스가 결정합니다. 에이전트Q는 현재 위치를 측정하고, 빠진 질문을 보강할 콘텐츠를 만들고, 같은 질문으로 다시 재서 변화를 확인하는 도구입니다.'],
];
const panelHead = (t, tag) => `<div class="panel-head"><h3>${t}</h3><span class="tag">${tag}</span></div>`;

const body = `${subHero({ name: '에이전트Q', h1: '에이전트Q,<br>AI 답변 속 우리 한의원 위치를 숫자로', lead: '금솔이 직접 개발한 AI 노출 추적 시스템입니다. 환자가 AI에게 묻는 질문을 찾고, 답변 속 노출과 인용 출처를 추적하고, 인용될 콘텐츠를 확산합니다.', cta: '우리 한의원 무료 측정', product: '에이전트Q 리포트' })}
<section class="section surface">
  <div class="container">
    <div class="section-head"><span class="kicker">작동 방식</span><h2 class="title">질문에서 시작해, 인용으로 완성됩니다</h2></div>
    <div class="cards c3">
      <div class="card"><span class="tag">1단계 · 질문</span><h3 style="margin-top:14px">환자가 물을 질문 찾기</h3><p>진료 분야·지역·증상별로 환자가 AI에게 물을 만한 질문을 찾아 추적할 질문 세트를 정합니다.</p></div>
      <div class="card"><span class="tag">2단계 · 추적</span><h3 style="margin-top:14px">노출·인용 출처 추적</h3><p>AI 6종의 답변을 매일 수집해 한의원 언급과 인용 출처를 기록하고, 빠진 질문을 찾아냅니다.</p></div>
      <div class="card"><span class="tag">3단계 · 확산</span><h3 style="margin-top:14px">인용될 콘텐츠 확산</h3><p>빠진 질문에 맞는 AI 매거진을 검토·발행하고 블로그·홈페이지·한의 네트워크로 확산합니다.</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><span class="kicker">대시보드 <span class="tag">예시</span></span><h2 class="title">에이전트Q 4가지 핵심 지표</h2><p class="lead">아래 수치는 이해를 돕기 위한 예시입니다. 진단 신청 시 원장님 한의원의 실제 데이터로 보여드립니다.</p></div>
    <div class="dash-grid">
      <div class="panel">${panelHead('① AI별 노출 점유율', '예시 · 최근 30일')}
        ${share.map(([n, v, p]) => `<div class="bar-row"><span>${n}</span><div><div class="bar"><i style="width:${v}%"></i></div><div class="bar prev" style="height:5px;margin-top:4px"><i style="width:${p}%"></i></div></div><b>${v}%</b></div>`).join('')}
        <div class="legend"><span><i></i>현재</span><span><i class="prev"></i>진행 전</span></div>
      </div>
      <div class="panel">${panelHead('② 경쟁 한의원 대비 순위', '예시 · 반경 2km')}
        <ol class="rank-list">${rank.map(([n, v, d, us], i) => `<li${us ? ' class="us"' : ''}><span class="r">${i + 1}</span><span>${n}</span><span class="num">${v}%</span><span class="delta">${d}</span></li>`).join('')}</ol>
      </div>
      <div class="panel">${panelHead('③ 질문별 노출 빈도', '예시 · 10회 질의')}
        <ul class="q-list">${qfreq.map(([q, c]) => `<li><span>${q}</span><span class="dots" aria-label="10회 중 ${c}회">${Array.from({ length: 10 }, (_, i) => `<i${i < c ? ' class="on"' : ''}></i>`).join('')}</span></li>`).join('')}</ul>
      </div>
      <div class="panel">${panelHead('④ AI가 인용한 출처', '예시')}
        ${sources.map(([n, v]) => `<div class="bar-row"><span>${n}</span><div class="bar"><i style="width:${v * 2.5}%"></i></div><b>${v}%</b></div>`).join('')}
      </div>
    </div>
  </div>
</section>
<section class="section surface">
  <div class="container">
    <div class="section-head"><span class="kicker">측정 결과 활용</span><h2 class="title">숫자가 다음 할 일을 알려줍니다</h2></div>
    <div class="cards c3">
      <div class="card"><h3>점유율이 낮은 AI가 있다면</h3><p>그 AI가 자주 인용하는 출처 유형에 맞춰 AI 매거진을 우선 발행합니다.</p><a class="text-link" href="/seo-aeo-geo/">SEO·AEO·GEO 보기</a></div>
      <div class="card"><h3>경쟁 한의원에 밀린다면</h3><p>경쟁 기관이 인용된 근거 문서를 확인하고 우리에게 빠진 출처부터 채웁니다.</p><a class="text-link" href="/automation/">마케팅 자동화 보기</a></div>
      <div class="card"><h3>방법·순서를 묻는 질문이 많다면</h3><p>숏폼 영상으로 만들어 네이버 클립 검색까지 함께 노출합니다.</p><a class="text-link" href="/shortform/">숏폼 영상 보기</a></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container"><div class="section-head"><span class="kicker">자주 묻는 질문</span><h2 class="title">에이전트Q FAQ</h2></div>${faqHtml(faqs)}</div>
</section>
${ctaBand('에이전트Q 리포트', '에이전트Q 측정')}`;

export default page({
  path: '/agent-q/', breadcrumbName: '에이전트Q',
  title: '에이전트Q | 한의원 AI 노출 점유율·경쟁 순위 분석 | 하니피알',
  description: '에이전트Q는 ChatGPT·Gemini·Perplexity·Claude·네이버 AI·구글 AI에서 한의원의 AI별 노출 점유율, 경쟁 한의원 대비 순위, 질문별 노출 빈도, 인용 출처를 측정합니다.',
  body,
  jsonld: [faqLd(faqs), { '@type': 'Service', name: '에이전트Q', serviceType: 'AI 검색 노출 분석', provider: { '@id': `${BASE_URL}/#org` }, url: `${BASE_URL}/agent-q/` }],
});

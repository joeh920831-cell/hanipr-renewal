import { page, NETWORK, faqLd, faqHtml, esc, BASE_URL } from '../layout.mjs';
import { leadForm } from '../form.mjs';
import { readFileSync } from 'node:fs';

const reviews = JSON.parse(readFileSync(new URL('../../data/reviews.json', import.meta.url), 'utf8'));

// shortcut: 금솔 영상 링크 미확보 — 받으면 youtube 에 영상 ID를 넣으면 썸네일·재생이 실제 영상으로 바뀜
export const VIDEOS = [
  { title: '교통사고 후 목·허리 통증, 한의원 치료 순서', tag: '네이버 클립', youtube: '' },
  { title: '추나요법 건강보험 적용 기준 1분 정리', tag: '유튜브 쇼츠', youtube: '' },
  { title: '산후보약, 언제부터 먹어야 할까', tag: '네이버 클립', youtube: '' },
  { title: '한방병원 입원, 이런 분께 권합니다', tag: '유튜브 쇼츠', youtube: '' },
  { title: '다이어트 한약 상담 전 체크리스트', tag: '네이버 클립', youtube: '' },
  { title: '산재 환자도 한의원 치료가 됩니다', tag: '유튜브 쇼츠', youtube: '' },
];

export const FAQS = [
  ['SEO·AEO·GEO는 각각 무엇이 다른가요?', 'SEO는 네이버·구글 검색 결과 상위 노출, AEO는 네이버 AI 브리핑처럼 검색창이 직접 답을 보여줄 때 우리 한의원 콘텐츠가 답변으로 쓰이게 하는 작업, GEO는 ChatGPT·Gemini·Perplexity 같은 생성형 AI가 한의원을 추천하거나 인용하게 만드는 작업입니다. 하니피알은 세 가지를 하나의 콘텐츠 설계로 함께 운영합니다.'],
  ['이미 다른 대행사와 블로그 광고를 하고 있는데 바꿔야 하나요?', '바꾸기 전에 무료 AI 노출 진단으로 현재 상태부터 확인하시길 권합니다. 지금 키워드 순위와 AI 답변 노출 여부, 경쟁 한의원 대비 위치를 숫자로 보여드리고, 기존 대행사와 겹치지 않는 빈틈부터 제안합니다.'],
  ['의료광고 심의나 의료법은 어떻게 대응하나요?', '모든 콘텐츠는 의료법 제56조 기준으로 치료 효과 보장, 비교 광고, 환자 치료 경험담 등 금지 표현을 제작 단계에서 걸러냅니다. 저작권·의료법 교육을 이수한 마케터가 작성하고 검수합니다.'],
  ['비용과 계약 기간은 어떻게 되나요?', '진료 분야, 지역 경쟁 강도, 목표 키워드 수에 따라 구성이 달라 상담 후 안내드립니다. 진단 결과를 먼저 보시고 결정하실 수 있도록 무료 진단은 비용 없이 진행합니다.'],
  ['효과는 어떻게 확인하나요?', '매월 키워드 순위, 플레이스 지표, 에이전트Q의 AI별 노출 점유율과 질문별 노출 빈도를 리포트로 보내드립니다. 카톡으로 담당 마케터와 수시로 소통하실 수 있습니다.'],
  ['개원 전에도 진행할 수 있나요?', '가능합니다. 개원 예정 지역의 검색 수요와 경쟁 한의원 현황을 먼저 분석해, 개원일에 맞춰 플레이스·블로그·홈페이지가 준비되도록 일정을 역산해 진행합니다.'],
];

const situations = [
  ['개원을 준비 중입니다', '입지 검색 수요·경쟁 한의원 분석부터', '/consult/', '개원 진단 받기'],
  ['대형병원 출신으로 개원했습니다', '경력이 검색과 AI 답변에 드러나도록', '/seo-aeo-geo/', 'AI 노출 설계 보기'],
  ['광고는 하는데 신환이 정체됐어요', '어디서 새는지 키워드·AI 노출 점검', '/agent-q/', '에이전트Q 보기'],
  ['주변에 한의원이 새로 생겼어요', '경쟁사 대비 노출 순위 비교', '/agent-q/', '경쟁 순위 보기'],
];

const products = [
  ['/seo-aeo-geo/', '01', 'SEO·AEO·GEO', 'AI 매거진', '검색 상위노출부터 네이버 AI 브리핑, ChatGPT 답변 인용까지. 원장님 진료 철학을 AI가 읽기 좋은 구조의 매거진 콘텐츠로 만듭니다.', ['네이버·구글 상위노출', '네이버 AI 브리핑 답변 노출', 'ChatGPT·Gemini 추천·인용']],
  ['/shortform/', '02', '숏폼 영상', '네이버 클립·쇼츠', '환자가 자주 묻는 질문을 30~60초 영상으로. 네이버 클립과 유튜브 쇼츠에 동시에 배포해 검색과 피드 양쪽에서 노출합니다.', ['기획·촬영·편집 일괄', '네이버 클립 검색 노출', '유튜브 쇼츠 채널 운영']],
  ['/automation/', '03', '마케팅 자동화', '발행·모니터링·리포트', '콘텐츠 발행 일정, 키워드 순위 추적, 월간 리포트를 자동화해 원장님은 진료에만 집중하시면 됩니다.', ['발행 일정 자동 관리', '순위·노출 매일 추적', '월간 성과 리포트']],
];

const shareRows = [['ChatGPT', 38], ['네이버 AI 브리핑', 46], ['Gemini', 27], ['Perplexity', 21]];

const reviewCard = (r) => `<article class="review"><p>${esc(r.text)}</p><div class="svc">${r.services.slice(0, 3).map((s) => `<span class="badge">${esc(s)}</span>`).join('')}</div><p class="who">${esc(r.region)} · ${esc(r.clinic)} ${esc(r.director)} 원장</p></article>`;
const marqueeReviews = reviews.slice(0, 10);

const videoCard = (v) => `<div class="video"><a href="${v.youtube ? `https://www.youtube.com/shorts/${v.youtube}` : '/shortform/'}"${v.youtube ? ' target="_blank" rel="noopener"' : ''} class="thumb-link"><div class="thumb">${v.youtube ? `<img src="https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg" alt="${esc(v.title)} 영상 썸네일" loading="lazy">` : ''}<span class="play" aria-hidden="true">▶</span><small>${v.tag}${v.youtube ? '' : ' · 예시'}</small><strong>${esc(v.title)}</strong></div></a></div>`;

const body = `
<section class="hero">
  <div class="container">
    <p class="eyebrow">한의원·한방병원 전문 마케팅 17년, 하니피알</p>
    <h1>SEO·AEO·GEO, 한의원 한방병원 마케팅대행사</h1>
    <p class="hero-sub">검색도, AI 답변도. <span class="point">SEO·AEO·GEO를 잘하는 대행사</span></p>
    <p class="hero-desc">환자는 이제 검색창보다 AI에게 먼저 묻습니다. "강서구 교통사고 한의원 추천해줘"라는 질문에 원장님 한의원이 답으로 나오도록, 검색 상위노출부터 네이버 AI 브리핑과 ChatGPT 답변까지 함께 설계합니다.</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/consult/">무료 AI 노출 진단 받기</a>
      <a class="btn" href="/agent-q/">에이전트Q 예시 보기</a>
    </div>
    <ul class="hero-chips" aria-label="주요 서비스">
      <li>네이버 AI 브리핑</li><li>ChatGPT·Gemini 노출</li><li>네이버 클립·쇼츠</li><li>마케팅 자동화</li><li>한의원 홈페이지 제작</li>
    </ul>
  </div>
</section>

<section class="section alt" aria-labelledby="sit-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">원장님 상황별 시작점</p><h2 class="section-title" id="sit-title">지금 원장님의 상황은 어디에 가까우신가요?</h2><p class="section-lead">같은 비용이라도 한의원의 단계와 경쟁 환경에 따라 먼저 해야 할 일이 다릅니다.</p></div>
    <div class="situations">
      ${situations.map(([t, d, h, c]) => `<a class="situation" href="${h}"><strong>${t}</strong><span>${d}</span><em>${c} →</em></a>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="prod-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">3대 핵심 상품</p><h2 class="section-title" id="prod-title">검색, 영상, 운영까지<br>세 가지를 하나의 전략으로</h2></div>
    <div class="grid grid-3">
      ${products.map(([h, n, t, s, d, li]) => `<a class="card product-card" href="${h}"><span class="num">${n} · ${s}</span><h3>${t}</h3><p>${d}</p><ul>${li.map((x) => `<li>${x}</li>`).join('')}</ul><span class="more">자세히 보기 →</span></a>`).join('')}
    </div>
  </div>
</section>

<section class="section alt" id="agent-q-preview" aria-labelledby="aq-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">에이전트Q · AI 노출 분석</p><h2 class="section-title" id="aq-title">AI가 우리 한의원을 몇 번 추천하는지,<br>숫자로 보여드립니다</h2><p class="section-lead">말로 설명하는 AI 마케팅이 아니라, 질문별·AI별 노출 데이터로 현재 위치와 개선 결과를 확인합니다.</p></div>
    <div class="grid grid-2">
      <div class="dash">
        <h3>AI별 노출 점유율 <span class="badge">예시</span></h3>
        <p class="dash-q">질문: "강서구 교통사고 한의원 추천" 외 20개 질문, 각 10회 반복 질의</p>
        ${shareRows.map(([n, v]) => `<div class="bar-row"><span>${n}</span><div class="bar"><i style="width:${v}%"></i></div><b>${v}%</b></div>`).join('')}
        <p class="note">점유율 = 전체 AI 답변 중 A한의원이 언급된 비율</p>
      </div>
      <div class="dash">
        <h3>경쟁 한의원 대비 순위 <span class="badge">예시</span></h3>
        <p class="dash-q">같은 질문 세트 기준, 반경 2km 내 한의원 비교</p>
        <div class="table-wrap"><table class="data"><thead><tr><th>순위</th><th>한의원</th><th class="n">언급 횟수</th><th class="n">변화</th></tr></thead><tbody>
          <tr class="us"><td>1</td><td>A한의원 (고객사)</td><td class="n">92</td><td class="n">▲4</td></tr>
          <tr><td>2</td><td>B한의원</td><td class="n">71</td><td class="n">▼1</td></tr>
          <tr><td>3</td><td>C한방병원</td><td class="n">58</td><td class="n">▼1</td></tr>
          <tr><td>4</td><td>D한의원</td><td class="n">33</td><td class="n">–</td></tr>
        </tbody></table></div>
        <p class="note">변화 = 진행 3개월 전 대비 순위 변동</p>
      </div>
    </div>
    <div class="btn-row" style="margin-top:28px"><a class="btn" href="/agent-q/">에이전트Q 4가지 지표 전체 보기</a></div>
  </div>
</section>

<section class="section" aria-label="하니피알 숫자">
  <div class="container">
    <div class="stats">
      <div class="stat"><b>17년+</b><span>한의사 마케팅 한 분야</span></div>
      <div class="stat"><b>70여 명</b><span>저작권·의료법 교육 이수 전문 인력</span></div>
      <div class="stat"><b>6개</b><span>자체 운영 한의 네트워크 플랫폼</span></div>
    </div>
  </div>
</section>

<section class="section alt" aria-labelledby="rv-title">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">원장님 리얼 후기</p><h2 class="section-title" id="rv-title">함께하는 원장님들이 직접 남긴 이야기</h2><p class="section-lead">원장님 성함과 한의원명은 일부 가려서 소개합니다.</p></div>
  </div>
  <div class="marquee" tabindex="0" aria-label="원장님 후기 목록, 마우스를 올리거나 선택하면 멈춥니다">
    <div class="marquee-track">${marqueeReviews.map(reviewCard).join('')}<div class="marquee-dup" aria-hidden="true" inert>${marqueeReviews.map(reviewCard).join('')}</div></div>
  </div>
  <div class="container">
    <div class="btn-row" style="margin-top:32px;justify-content:center"><a class="btn" href="/reviews/">원장님 후기 ${reviews.length}건 전체 보기</a></div>
  </div>
</section>

<section class="section" aria-labelledby="net-title">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">네트워크 사이트</p><h2 class="section-title" id="net-title">하니피알이 직접 운영하는 한의 네트워크</h2><p class="section-lead">환자가 증상별로 한의원을 찾는 전문 플랫폼을 자체 개발·운영합니다.</p></div>
    <div class="logos">
      ${NETWORK.map(([u, n]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n} 바로가기"><strong>${n}</strong></a>`).join('')}
    </div>
  </div>
</section>

<section class="section alt" aria-labelledby="faq-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">자주 묻는 질문</p><h2 class="section-title" id="faq-title">원장님들이 상담 전에 자주 물으신 것</h2></div>
    ${faqHtml(FAQS)}
  </div>
</section>

<section class="section" id="video-gallery" aria-labelledby="vg-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">금솔이 만든 영상</p><h2 class="section-title" id="vg-title">한의원 숏폼 영상 갤러리</h2><p class="section-lead">영상 카드가 오른쪽에서 왼쪽으로 계속 흘러갑니다. 마우스를 올리거나 키보드로 선택하면 멈추고, 누르면 영상이 열립니다.</p></div>
  </div>
  <div class="marquee" tabindex="0" aria-label="영상 갤러리, 마우스를 올리면 멈춥니다">
    <div class="marquee-track video-track">${VIDEOS.map(videoCard).join('')}<div class="marquee-dup" aria-hidden="true" inert>${VIDEOS.map(videoCard).join('')}</div></div>
  </div>
</section>

<section class="section" aria-labelledby="cta-title">
  <div class="container">
    <div class="cta-band">
      <div>
        <h2 id="cta-title">우리 한의원은 AI에게<br>몇 번 추천받고 있을까요?</h2>
        <p>한의원명과 연락처만 남겨 주시면 주요 키워드 순위와 AI 답변 노출 현황을 정리해 무료로 보내드립니다.</p>
        <div class="contact-lines"><a href="tel:027611633">상담 02-761-1633 (평일 09:00~18:00)</a><a href="tel:01042366319">빠른 상담 010-4236-6319</a></div>
        <div class="btn-row" style="margin-top:20px"><a class="btn" href="/consult/" style="border-color:#fff">상세 진단 신청 페이지</a></div>
      </div>
      ${leadForm({ id: 'home-form', source: '메인 하단' })}
    </div>
  </div>
</section>
`;

export default page({
  path: '/',
  title: '한의원한방병원 마케팅·신환 늘리기 | AI 검색 노출 전문 금솔',
  description: 'SEO·AEO·GEO로 네이버 AI 브리핑과 ChatGPT 답변에 한의원을 노출합니다. 네이버 클립·쇼츠, 에이전트Q 분석, AI마케팅, 한의원홈페이지 제작까지 한방병원 마케팅 대행사 하니피알. 무료 AI 노출 진단과 상담을 신청하세요.',
  body,
  jsonld: [faqLd(FAQS), { '@type': 'ItemList', name: '하니피알 3대 상품', itemListElement: products.map(([h, , t], i) => ({ '@type': 'ListItem', position: i + 1, name: t, url: `${BASE_URL}${h}` })) }],
});

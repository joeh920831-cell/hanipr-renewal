import { page, NETWORK, networkLogo, faqLd, faqHtml, esc, BASE_URL, PHONE, FAST_PHONE } from '../layout.mjs';
import { heroForm, leadForm } from '../form.mjs';
import { ARTICLES } from '../magazine.mjs';
import { readFileSync, existsSync } from 'node:fs';

export const REVIEWS = JSON.parse(readFileSync(new URL('../../data/reviews.json', import.meta.url), 'utf8'));

// shortcut: 금솔 영상 링크 미확보 — url 에 쇼츠·클립 주소, cover 에 썸네일 경로를 넣으면 실제 영상으로 바뀜
export const VIDEOS = [
  { platform: 'N CLIP', title: '교통사고 후 바로 안 아파도 괜찮을까', who: '○○○ 원장', url: '', cover: '' },
  { platform: 'SHORTS', title: '추나 치료, 몇 번 받아야 할까', who: '○○○ 원장', url: '', cover: '' },
  { platform: 'N CLIP', title: '자동차보험으로 한방병원 입원하기', who: '○○한방병원', url: '', cover: '' },
  { platform: 'SHORTS', title: '침 맞고 멍이 들었다면', who: '○○○ 원장', url: '', cover: '' },
  { platform: 'N CLIP', title: '환절기 비염, 체질에 맞춘 치료', who: '○○○ 원장', url: '', cover: '' },
  { platform: 'YOUTUBE', title: '산후보약, 언제부터 먹어야 할까', who: '○○○ 원장', url: '', cover: '' },
];

export const FAQS = [
  ['SEO·AEO·GEO는 각각 무엇이 다른가요?', 'SEO는 네이버·구글 검색 순위, AEO는 네이버 AI 브리핑처럼 검색창이 직접 보여주는 답변에 인용되는 것, GEO는 ChatGPT·Gemini 같은 생성형 AI가 한의원을 언급·추천하게 하는 것입니다. 하니피알은 세 가지를 하나의 AI 매거진 설계로 함께 운영합니다.'],
  ['이미 다른 대행사와 광고를 하고 있어도 진단받을 수 있나요?', '네. 무료 AI 노출 진단은 현재 대행사와 관계없이 지금 상태를 숫자로 확인하는 서비스입니다. 키워드 순위와 AI 답변 노출, 경쟁 한의원 대비 위치를 보고 빈틈부터 제안드립니다.'],
  ['무료 진단은 어떻게 진행되나요?', '한의원명과 연락처를 남기시면 담당 컨설턴트가 주력 진료와 지역을 확인한 뒤, 에이전트Q로 주요 질문을 AI에 질의해 영업일 2일 안에 리포트를 보내드립니다.'],
  ['의료광고법은 어떻게 대응하나요?', '모든 원고는 저작권·의료법 교육을 이수한 마케터가 작성하고, 치료 효과 보장·비교·치료 경험담 같은 제한 표현을 발행 전에 검수합니다.'],
  ['비용과 계약 기간은 어떻게 되나요?', '진료 분야, 지역 경쟁 강도, 목표 질문 수에 따라 구성이 달라 진단 후 안내드립니다. 진단 결과를 먼저 보고 결정하실 수 있습니다.'],
  ['효과는 어떻게 확인하나요?', '매월 키워드 순위와 함께 에이전트Q의 AI별 노출 점유율, 경쟁 한의원 대비 순위, 질문별 노출 빈도, 인용 출처를 리포트로 보내드립니다.'],
];

const results = [
  ['3개월 · 교통사고·입원 분야', '+31%p', 'ChatGPT 노출 점유율', 'A한의원 · 경기 군포', '교통사고 질문 20개에 맞춘 AI 매거진 발행 후 ChatGPT 답변 속 언급 비율이 올랐습니다.'],
  ['6주 · 추나·통증 분야', '8/10', '핵심 질문 AI 답변 노출', 'B한의원 · 서울 강서', '"추나 건강보험 되는 한의원" 질문 10회 중 8회 답변에 언급됐습니다.'],
  ['4개월 · 한방병원 입원', '+2계단', '지역 경쟁 기관 대비 순위 상승', 'C한방병원 · 인천 부평', '반경 3km 한방병원 4곳 사이에서 AI 답변 언급 횟수 순위가 두 계단 올랐습니다.'],
];

const situations = [
  ['개원을 준비하고 있어요', '개원 지역의 검색 수요와 경쟁 한의원을 먼저 분석하고, 개원일에 맞춰 플레이스·블로그·홈페이지를 준비합니다.', '/diagnosis/?product=' + encodeURIComponent('무료 AI 노출 진단'), ['상권 분석', '홈페이지 제작', '플레이스 세팅']],
  ['대형병원·수련 경력이 드러나지 않아요', '수련 이력과 진료 철학을 AI가 읽는 구조로 정리해, 검색 결과와 AI 답변에서 신뢰 근거가 보이게 합니다.', '/seo-aeo-geo/', ['AI 매거진', '원장 프로필 정리', '숏폼']],
  ['광고는 하는데 신환이 그대로예요', '지금 광고가 어디서 노출되고 어디서 빠지는지 에이전트Q로 측정해, 예산이 새는 질문부터 바로잡습니다.', '/agent-q/', ['에이전트Q 진단', '키워드 재설계']],
  ['입원실·한방병원을 운영해요', '교통사고·산재·입원 질문에 대응하는 콘텐츠와 입원닷컴·한방카 네트워크를 함께 설계합니다.', '/automation/', ['입원닷컴', '한방카', '마케팅 자동화']],
];

const share = [['ChatGPT', 62, 31], ['Perplexity', 71, 44], ['Gemini', 48, 22], ['네이버 AI 브리핑', 39, 18]];
const rank = [['우리 한의원', 36, '▲2', true], ['△△한의원', 41, '–'], ['□□한방병원', 22, '▼1'], ['◇◇한의원', 12, '▼1']].sort((a, b) => b[1] - a[1]);
const qfreq = [['군포 교통사고 입원 한의원', 8], ['당정동 야간진료 한의원', 6], ['허리 디스크 추나 치료', 5], ['산본 한방병원 자동차보험', 4]];
const sources = [['한의원 AI 매거진', 34], ['네이버 플레이스', 22], ['한의원 홈페이지', 18], ['입원닷컴·한방카', 14]];

const reviewCard = (r) => `<article class="review"><p>${esc(r.text)}</p><div class="svc">${r.services.slice(0, 3).map((s) => `<span class="tag gray">${esc(s)}</span>`).join('')}</div><p class="who">${esc(r.region)} · ${esc(r.clinic)} ${esc(r.director)} 원장</p></article>`;
const picked = REVIEWS.filter((r) => r.text.length > 60).slice(0, 10);
export const kakaoShots = () => [1, 2, 3, 4, 5].map((i) => existsSync(new URL(`../../assets/img/kakao/kakao-${i}.png`, import.meta.url))
  ? `<figure><img src="/assets/img/kakao/kakao-${i}.png" alt="원장님 카카오톡 후기 ${i} (이름·사진 가림)" loading="lazy"></figure>`
  : `<figure><figcaption>카카오톡 후기 이미지 ${i}<br>(이름·사진 가림)</figcaption></figure>`).join('');

export const videoCard = (v) => {
  const inner = `<div class="cover">${v.cover ? `<img src="${v.cover}" alt="" loading="lazy">` : ''}<span class="platform">${v.platform}</span><span class="play" aria-hidden="true">▶</span><strong>${esc(v.title)}</strong></div><p class="meta">${esc(v.who)}${v.url ? '' : ' · 예시'}</p>`;
  return `<div class="video">${v.url ? `<a href="${v.url}" target="_blank" rel="noopener" aria-label="${esc(v.title)} 영상 보기">${inner}</a>` : `<a href="/shortform/" aria-label="${esc(v.title)} (숏폼 영상 안내로 이동)">${inner}</a>`}</div>`;
};
export const marquee = (items, label, cls = '') => `<div class="marquee ${cls}" role="region" tabindex="0" aria-label="${label}">
  <div class="marquee-track ${cls === 'swipe' ? 'video-track' : ''}">${items}<div class="marquee-dup" aria-hidden="true" inert>${items}</div></div>
</div>`;

const prodCta = (p) => `/diagnosis/?product=${encodeURIComponent(p)}`;

const body = `
<section class="hero">
  <div class="container">
    <p class="hero-brand">한의원·한방병원 마케팅 17년, 하니피알</p>
    <h1>SEO·AEO·GEO, 한의원 한방병원 마케팅대행사</h1>
    <p class="hero-sub">검색도, AI 답변도. SEO·AEO·GEO를 잘하는 대행사</p>
    <p class="hero-desc">네이버·구글 상위 노출부터 ChatGPT·Gemini·네이버 AI 브리핑 추천까지. 우리 한의원이 지금 AI 답변에 나오는지 무료로 진단해 드립니다.</p>
    ${heroForm()}
    <div class="hero-ai"><span>에이전트Q 측정 대상</span>${['ChatGPT', 'Gemini', 'Perplexity', 'Claude', '네이버 AI 브리핑', '구글 AI 개요'].map((a) => `<span class="ai-chip">${a}</span>`).join('')}</div>
  </div>
</section>

<section class="section" style="padding-top:24px" aria-labelledby="net-title">
  <div class="container">
    <h2 class="wall-caption" id="net-title">하니피알이 직접 운영하는 한의 네트워크 7곳</h2>
    <div class="logo-wall">${NETWORK.map((n) => `<a href="${n[0]}" target="_blank" rel="noopener" title="${n[2]}">${networkLogo(n)}</a>`).join('')}</div>
  </div>
</section>

<section class="section" style="padding-top:40px" aria-labelledby="res-title">
  <div class="container">
    <div class="section-head"><span class="kicker">성과</span><h2 class="title" id="res-title">숫자로 확인하는 AI 검색 마케팅</h2><p class="lead">진단 → 콘텐츠 → 재측정. 같은 질문으로 다시 물어 변화를 비교합니다.</p></div>
    <div class="results">${results.map(([p, n, m, h, d]) => `<article class="result"><span class="period">${p}</span><b>${n}</b><p class="metric">${m}</p><h3>${h}</h3><p>${d}</p></article>`).join('')}</div>
    <p class="example" style="text-align:center;margin-top:18px">위 수치와 기관명은 이해를 돕기 위한 예시입니다.</p>
  </div>
</section>

<section class="section surface" aria-labelledby="sit-title">
  <div class="container">
    <div class="section-head"><span class="kicker">원장님 상황별</span><h2 class="title" id="sit-title">같은 예산이라도<br>먼저 할 일은 한의원마다 다릅니다</h2></div>
    <div class="situations">${situations.map(([t, d, h, tags]) => `<a class="situation" href="${h}"><h3>${t}</h3><span class="go" aria-hidden="true">→</span><p>${d}</p><ul>${tags.map((x) => `<li class="tag gray">${x}</li>`).join('')}</ul></a>`).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="prod-title">
  <div class="container">
    <div class="section-head"><span class="kicker">3대 상품</span><h2 class="title" id="prod-title">검색과 AI 답변에<br>한의원이 나오게 만드는 세 가지</h2></div>

    <div class="product">
      <div class="product-text">
        <span class="product-num">01 · SEO·AEO·GEO</span>
        <h3>AI 매거진으로<br>검색 상위에도, AI 답변에도</h3>
        <p class="desc">"군포 교통사고 한의원 추천"을 네이버에 검색해도, ChatGPT에 물어도 우리 한의원이 나오도록 진료 분야·환자 상황별 질문에 맞춘 매거진을 발행합니다.</p>
        <ul class="checks"><li>SEO · 네이버·구글 키워드 상위 노출</li><li>AEO · 네이버 AI 브리핑·구글 AI 개요 인용</li><li>GEO · ChatGPT·Gemini·Perplexity 추천</li></ul>
        <div class="btn-row"><a class="btn btn-primary btn-sm" href="${prodCta('SEO·AEO·GEO (AI 매거진)')}" data-track="cta_prod_seo">AI 매거진 상담</a><a class="btn btn-line btn-sm" href="/seo-aeo-geo/">자세히 보기</a></div>
      </div>
      <div class="evidence">
        <div class="ai-tabs"><span class="on">ChatGPT</span><span>네이버 AI 브리핑</span><span>Gemini</span></div>
        <div class="ai-window">
          <div class="ai-bar"><i></i><i></i><i></i>AI 답변 예시</div>
          <div class="ai-body">
            <p class="q-bubble">출퇴근길 교통사고로 허리가 아파요. 입원 가능한 군포 한의원 있을까요?</p>
            <p class="a-text">자동차보험으로 입원 치료가 가능한 곳으로 <mark>○○365한의원</mark>이 자주 언급됩니다. 야간·공휴일 진료와 입원실을 운영하며, 사고 후 첫 진료 시 보험사 접수번호를 준비하면 됩니다.</p>
            <p class="a-source">출처 <b>○○365한의원 AI 매거진</b> · 교통사고 입원 치료 안내</p>
          </div>
        </div>
      </div>
    </div>

    <div class="product flip">
      <div class="product-text">
        <span class="product-num">02 · 숏폼 영상</span>
        <h3>네이버 클립·쇼츠로<br>원장님의 얼굴과 진료 철학을</h3>
        <p class="desc">환자가 자주 묻는 질문을 30~60초 영상으로 만들어 네이버 클립 검색과 쇼츠 피드에 동시에 노출합니다. 한 번 촬영으로 4~8편을 만듭니다.</p>
        <ul class="checks"><li>검색 키워드에 맞춘 주제 기획</li><li>촬영·편집·자막 전담팀</li><li>네이버 클립·유튜브 쇼츠 동시 배포</li></ul>
        <div class="btn-row"><a class="btn btn-primary btn-sm" href="${prodCta('숏폼 영상 (네이버 클립·쇼츠)')}" data-track="cta_prod_short">숏폼 영상 상담</a><a class="btn btn-line btn-sm" href="/shortform/">자세히 보기</a></div>
      </div>
      <div class="evidence">
        <div class="phones">${VIDEOS.slice(0, 3).map((v) => `<div class="phone"><span class="platform">${v.platform}</span><span class="play" aria-hidden="true">▶</span><div><strong>${esc(v.title)}</strong><br><small>${esc(v.who)}</small></div></div>`).join('')}</div>
        <p class="example" style="margin-top:14px;text-align:center">금솔 제작 영상 자리 (예시)</p>
      </div>
    </div>

    <div class="product">
      <div class="product-text">
        <span class="product-num">03 · 마케팅 자동화</span>
        <h3>반복은 시스템이,<br>품질은 사람이 책임집니다</h3>
        <p class="desc">키워드 발굴·원고 초안·발행·노출 추적은 시스템이 매일 돌리고, 의료법 교육을 받은 마케터가 원고 품질과 표현을 검수합니다.</p>
        <ul class="checks"><li>질문·키워드 자동 발굴</li><li>의료광고 표현 사람 검수</li><li>노출 하락 시 자동 알림·보완</li></ul>
        <div class="btn-row"><a class="btn btn-primary btn-sm" href="${prodCta('마케팅 자동화')}" data-track="cta_prod_auto">마케팅 자동화 상담</a><a class="btn btn-line btn-sm" href="/automation/">자세히 보기</a></div>
      </div>
      <div class="evidence">
        <ol class="pipeline">
          ${[['키워드·질문 발굴', '진료 분야·지역 질문 수집', '시스템', true], ['원고 작성', '초안 생성 후 의료법 표현 검수', '시스템 + 전문가', false], ['발행', '블로그·매거진·네트워크 예약 발행', '시스템', true], ['추적·보완', '순위·AI 노출 매일 측정, 하락 시 보완', '에이전트Q + 전문가', false]].map(([b, s, w, sys], i) => `<li class="pipe"><span class="n">${i + 1}</span><div><b>${b}</b><span>${s}</span></div><span class="who${sys ? ' sys' : ''}">${w}</span></li>`).join('')}
        </ol>
      </div>
    </div>
  </div>
</section>

<section class="section surface" id="agent-q-preview" aria-labelledby="aq-title">
  <div class="container">
    <div class="section-head"><span class="kicker">에이전트Q · 금솔이 개발한 AI 노출 추적 시스템</span><h2 class="title" id="aq-title">결과를 숫자로 증명합니다</h2><p class="lead">어떤 AI가, 어떤 질문에, 우리 한의원을 경쟁 한의원보다 얼마나 자주 추천하는지 매주 보여드립니다.</p></div>
    <div class="dash-grid">
      <div class="panel"><div class="panel-head"><h3>AI별 노출 점유율</h3><span class="tag">예시 · 최근 30일</span></div>
        ${share.map(([n, v, p]) => `<div class="bar-row"><span>${n}</span><div><div class="bar"><i style="width:${v}%"></i></div><div class="bar prev" style="height:5px;margin-top:4px"><i style="width:${p}%"></i></div></div><b>${v}%</b></div>`).join('')}
        <div class="legend"><span><i></i>현재</span><span><i class="prev"></i>진행 전</span></div>
      </div>
      <div class="panel"><div class="panel-head"><h3>경쟁 한의원 대비 순위</h3><span class="tag">예시 · 군포 교통사고</span></div>
        <ol class="rank-list">${rank.map(([n, v, d, us], i) => `<li${us ? ' class="us"' : ''}><span class="r">${i + 1}</span><span>${n}</span><span class="num">${v}%</span><span class="delta">${d}</span></li>`).join('')}</ol>
      </div>
      <div class="panel"><div class="panel-head"><h3>질문별 노출 빈도</h3><span class="tag">예시 · 10회 질의</span></div>
        <ul class="q-list">${qfreq.map(([q, c]) => `<li><span>${q}</span><span class="dots" aria-label="10회 중 ${c}회">${Array.from({ length: 10 }, (_, i) => `<i${i < c ? ' class="on"' : ''}></i>`).join('')}</span></li>`).join('')}</ul>
      </div>
      <div class="panel"><div class="panel-head"><h3>AI가 인용한 출처</h3><span class="tag">예시</span></div>
        ${sources.map(([n, v]) => `<div class="bar-row"><span>${n}</span><div class="bar"><i style="width:${v * 2.5}%"></i></div><b>${v}%</b></div>`).join('')}
      </div>
    </div>
    <div class="btn-row center" style="margin-top:40px"><a class="btn btn-primary" href="${prodCta('에이전트Q 리포트')}" data-track="cta_agentq">우리 한의원 무료 측정</a><a class="btn btn-line" href="/agent-q/">에이전트Q 자세히</a></div>
  </div>
</section>

<section class="section" aria-labelledby="rv-title">
  <div class="container"><div class="section-head"><span class="kicker">원장님 후기</span><h2 class="title" id="rv-title">17년 동안 원장님들이 남겨 주신 이야기</h2><p class="lead">성함·한의원명은 일부 가렸습니다.</p></div></div>
  ${marquee(picked.map(reviewCard).join(''), '원장님 후기 목록, 마우스를 올리면 멈춥니다')}
  <div class="container">
    <div class="kakao-row">${kakaoShots()}</div>
    <div class="btn-row center" style="margin-top:36px"><a class="btn btn-line" href="/cases/">후기 ${REVIEWS.length}건 전체 보기</a></div>
  </div>
</section>

<section class="section surface" aria-labelledby="mag-title">
  <div class="container">
    <div class="section-head"><span class="kicker">AI 매거진</span><h2 class="title" id="mag-title">원장님을 위한 AI 검색 마케팅 노트</h2></div>
    <div class="mag-grid">${ARTICLES.map((a) => `<a class="mag" href="/magazine/${a.slug}/"><div class="mag-thumb"><span>${a.cat}</span><strong>${esc(a.title.split(':')[0])}</strong></div><h3>${esc(a.title)}</h3><p>${esc(a.desc)}</p><time datetime="${a.date}">${a.date.replace(/-/g, '.')}</time></a>`).join('')}</div>
    <div class="btn-row center" style="margin-top:40px"><a class="btn btn-line" href="/magazine/">매거진 전체 보기</a></div>
  </div>
</section>

<section class="section" id="video-gallery" aria-labelledby="vg-title">
  <div class="container"><div class="section-head"><span class="kicker">금솔이 만든 영상</span><h2 class="title" id="vg-title">쇼츠 · 네이버 클립 · 유튜브</h2></div></div>
  ${marquee(VIDEOS.map(videoCard).join(''), '금솔 제작 영상 갤러리', 'swipe')}
  <p class="motion-note container">영상 카드가 왼쪽으로 천천히 흐르고, 마우스를 올리면 멈춥니다. 모바일에서는 손가락으로 넘겨 볼 수 있고, 카드를 누르면 영상이 열립니다.</p>
</section>

<section class="section surface" aria-labelledby="faq-title">
  <div class="container"><div class="section-head"><span class="kicker">자주 묻는 질문</span><h2 class="title" id="faq-title">상담 전에 많이 물으시는 것</h2></div>${faqHtml(FAQS)}</div>
</section>

<section class="section" aria-labelledby="cta-title">
  <div class="container">
    <div class="final">
      <div>
        <span class="kicker">무료 AI 노출 진단</span>
        <h2 id="cta-title">우리 한의원,<br>AI 답변에 나오고 있을까요?</h2>
        <p class="lead">네 칸만 적어 주시면 에이전트Q로 측정해 영업일 2일 안에 진단 리포트를 보내드립니다.</p>
        <div class="contact-list">
          <a href="tel:027611633" data-track="cta_tel_final"><small>대표 상담 (평일 09:00~18:00)</small><b>${PHONE}</b></a>
          <a href="tel:01042366319" data-track="cta_fast_final"><small>빠른 상담</small><b>${FAST_PHONE}</b></a>
        </div>
      </div>
      ${leadForm({ id: 'home-form', source: '메인 하단' })}
    </div>
  </div>
</section>
`;

export default page({
  path: '/',
  title: '한의원한방병원 마케팅·신환 늘리기 | AI 검색 노출 전문 금솔',
  description: 'SEO·AEO·GEO로 네이버 AI 브리핑과 ChatGPT 답변에 한의원을 노출합니다. 네이버 클립·쇼츠, 에이전트Q, AI마케팅, 한의원홈페이지 제작까지 한방병원 마케팅 대행사 하니피알. 무료 AI 노출 진단과 상담을 신청하세요.',
  body,
  jsonld: [faqLd(FAQS), { '@type': 'ItemList', name: '하니피알 3대 상품', itemListElement: [['/seo-aeo-geo/', 'SEO·AEO·GEO (AI 매거진)'], ['/shortform/', '숏폼 영상'], ['/automation/', '마케팅 자동화']].map(([h, t], i) => ({ '@type': 'ListItem', position: i + 1, name: t, url: `${BASE_URL}${h}` })) }],
});

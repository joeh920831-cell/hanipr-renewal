// 공통 레이아웃: head·메뉴·푸터·상담 장치. 모든 페이지가 이 함수로 만들어진다.
import { existsSync } from 'node:fs';

export const BASE_URL = 'https://hanipr-renewal.vercel.app';
export const PHONE = '02-761-1633';
export const FAST_PHONE = '010-4236-6319';
export const EMAIL = 'hanipr@kumsolmedia.com';
// shortcut: 카카오톡 채널 URL 미확보 — 받으면 여기만 채우면 PC 플로팅·모바일 바가 카톡 연결로 바뀜
export const KAKAO_URL = '';
// shortcut: GA4 측정 ID 미확보 — 'G-XXXX' 를 넣으면 페이지뷰·상담 전환 이벤트가 기록됨
export const GA_ID = '';

export const NAV = [
  ['/seo-aeo-geo/', 'SEO·AEO·GEO'],
  ['/shortform/', '숏폼 영상'],
  ['/automation/', '마케팅 자동화'],
  ['/agent-q/', '에이전트Q'],
  ['/magazine/', 'AI 매거진'],
  ['/cases/', '사례·후기'],
];
// [url, 이름, 설명, 로고 파일(assets/img/network/)]
export const NETWORK = [
  ['https://hanbangcar.com/', '한방카', '교통사고 후유증 치료 한의원 네트워크', 'hanbangcar.png'],
  ['https://ipwon.com/', '입원닷컴', '입원치료 가능한 한방의료기관 네트워크', 'ipwon.png'],
  ['https://sschuna.com/', '생생한방', '척추질환·통증 치료 한의원 검색 플랫폼', 'sschuna.png'],
  ['https://womandoc.co.kr/', '우먼닥', '여성 생애 주기별 여성한방 네트워크', 'womandoc.png'],
  ['https://sanjaeok.com/', '한방산재치료OK', '가까운 산재보험 지정 한의원 찾기', 'sanjaeok.png'],
  ['https://healingoasis.kr/', '힐링오아시스', '암 요양병원을 편리하게 찾는 방법', 'healingoasis.png'],
  ['https://hanitalk.net/', '하니톡', '한의사 유튜브 소통 채널', 'hanitalk.png'],
];
export const networkLogo = ([, name, , file]) => existsSync(new URL(`../assets/img/network/${file}`, import.meta.url))
  ? `<img src="/assets/img/network/${file}" alt="${name} 로고" loading="lazy">`
  : `<strong>${name}</strong>`;

export const ORG = {
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}/#org`,
  name: '하니피알',
  alternateName: ['HANIPR', '금솔 하니피알'],
  url: `${BASE_URL}/`,
  logo: `${BASE_URL}/og.png`,
  image: `${BASE_URL}/og.png`,
  description: '한의원·한방병원 전문 SEO·AEO·GEO 마케팅 대행사. 네이버 AI 브리핑·ChatGPT 등 AI 검색 노출, 네이버 클립·쇼츠, 마케팅 자동화, 에이전트Q 분석.',
  telephone: '+82-2-761-1633',
  email: EMAIL,
  faxNumber: '+82-2-761-1632',
  priceRange: '상담 후 안내',
  address: {
    '@type': 'PostalAddress', streetAddress: '가산디지털1로 128, 212-213호 (가산동, 에스티엑스브이타워)',
    addressLocality: '금천구', addressRegion: '서울특별시', postalCode: '08507', addressCountry: 'KR',
  },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
  areaServed: { '@type': 'Country', name: '대한민국' },
  knowsAbout: ['SEO', 'AEO', 'GEO', '한의원 마케팅', '한방병원 마케팅', '네이버 AI 브리핑', '네이버 클립', '유튜브 쇼츠', '마케팅 자동화'],
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 70 },
  parentOrganization: { '@type': 'Organization', name: '(주)금솔커뮤니케이션', taxID: '107-87-29110', founder: { '@type': 'Person', name: '양은주' } },
  sameAs: ['https://hanipr.co.kr/', ...NETWORK.map(([u]) => u)],
  contactPoint: { '@type': 'ContactPoint', telephone: '+82-10-4236-6319', contactType: 'customer service', availableLanguage: 'Korean' },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export { esc };

export const breadcrumb = (path, name) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: `${BASE_URL}/` },
    { '@type': 'ListItem', position: 2, name, item: `${BASE_URL}${path}` },
  ],
});
export const faqLd = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
export const faqHtml = (faqs) => `<div class="faq">${faqs.map(([q, a], i) =>
  `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`;

const ga = GA_ID ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');</script>` : '';

export function page({ path, title, description, body, jsonld = [], breadcrumbName, pageType = 'WebPage', noindex = false }) {
  const graph = [ORG, { '@type': 'WebSite', '@id': `${BASE_URL}/#site`, url: `${BASE_URL}/`, name: '하니피알', inLanguage: 'ko-KR', publisher: { '@id': `${BASE_URL}/#org` } }, { '@type': pageType, '@id': `${BASE_URL}${path}#page`, url: `${BASE_URL}${path}`, name: title, description, inLanguage: 'ko-KR', isPartOf: { '@id': `${BASE_URL}/#site` }, about: { '@id': `${BASE_URL}/#org` } }, ...jsonld];
  if (breadcrumbName) graph.push(breadcrumb(path, breadcrumbName));
  const nav = NAV.map(([href, label]) => `<li><a href="${href}"${path.startsWith(href) ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');
  const contact = KAKAO_URL ? ['카톡', KAKAO_URL, ' target="_blank" rel="noopener"'] : ['빠른 상담', 'tel:01042366319', ''];
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}">
<link rel="canonical" href="${BASE_URL}${path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="하니피알">
<meta property="og:locale" content="ko_KR">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${BASE_URL}${path}">
<meta property="og:image" content="${BASE_URL}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image" content="${BASE_URL}/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#00A06B">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/fonts/pretendard/pretendardvariable-dynamic-subset.css">
<link rel="stylesheet" href="/assets/css/style.css">
${ga}
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>
<body>
<a class="skip" href="#main">본문 바로가기</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="/" aria-label="하니피알 홈"><span class="logo-mark" aria-hidden="true"></span>하니피알</a>
    <button class="nav-toggle" aria-label="메뉴 열기" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>
    <nav class="nav" id="site-nav" aria-label="주요 메뉴">
      <ul>${nav}</ul>
      <a class="btn btn-primary btn-sm" href="/diagnosis/" data-track="cta_header">무료 AI 노출 진단</a>
    </nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="container">
    <div class="foot-top">
      <a class="logo" href="/"><span class="logo-mark" aria-hidden="true"></span>하니피알</a>
      <nav class="foot-nav" aria-label="하단 메뉴"><a href="/">홈</a>${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}<a href="/diagnosis/">상담·무료 진단</a></nav>
    </div>
    <div class="foot-net"><span>네트워크 사이트</span>${NETWORK.map(([u, n]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('')}</div>
    <p class="foot-info">브랜드명 하니피알 · 상호 (주)금솔커뮤니케이션 · 대표이사 양은주 · 개인정보관리책임자 김지태<br>
    (08507) 서울특별시 금천구 가산디지털1로 128, 212-213호 (가산동, 에스티엑스브이타워)<br>
    사업자등록번호 107-87-29110 · 통신판매업 2012-서울금천-0101호 · 대표전화 <a href="tel:027611633">${PHONE}</a> · 빠른 상담 <a href="tel:01042366319">${FAST_PHONE}</a> · <a href="mailto:${EMAIL}">${EMAIL}</a></p>
    <p class="foot-copy">© Kumsol Co.,Ltd. All rights reserved.</p>
  </div>
</footer>
<a class="fab" href="${contact[1]}"${contact[2]} data-track="cta_fab"><span class="fab-dot" aria-hidden="true"></span>${KAKAO_URL ? '카톡 상담' : `빠른 상담 ${FAST_PHONE}`}</a>
<nav class="mobile-bar" aria-label="빠른 상담">
  <a href="tel:027611633" data-track="cta_tel">전화</a>
  <a href="${contact[1]}"${contact[2]} data-track="cta_fast">${contact[0]}</a>
  <a class="primary" href="/diagnosis/" data-track="cta_mobile">무료 AI 진단</a>
</nav>
<dialog class="exit-pop" id="exit-pop" aria-labelledby="exit-title">
  <p class="exit-kicker">나가시기 전에</p>
  <p class="exit-title" id="exit-title">우리 한의원, AI 답변에 나오고 있을까요?</p>
  <p>한의원명과 연락처만 남기시면 영업일 2일 안에 무료 진단 리포트를 보내드립니다.</p>
  <div class="btn-row"><a class="btn btn-primary" href="/diagnosis/" data-track="cta_exit">무료 AI 노출 진단 받기</a><button class="btn btn-ghost" type="button" data-close>닫기</button></div>
</dialog>
<script src="/assets/js/main.js" type="module"></script>
</body>
</html>
`;
}

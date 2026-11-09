// 공통 레이아웃: head·메뉴·푸터·상담 장치. 모든 페이지가 이 함수로 만들어진다.
export const BASE_URL = 'https://hanipr-renewal.vercel.app';
export const PHONE = '02-761-1633';
export const FAST_PHONE = '010-4236-6319';
export const EMAIL = 'hanipr@kumsolmedia.com';
// shortcut: 카카오톡 채널 URL 미확보 — 받으면 여기만 채우면 PC·모바일 카톡 버튼이 노란 카톡 버튼으로 바뀜
export const KAKAO_URL = '';

export const NAV = [
  ['/', '홈'],
  ['/seo-aeo-geo/', 'SEO·AEO·GEO'],
  ['/shortform/', '숏폼 영상'],
  ['/automation/', '마케팅 자동화'],
  ['/agent-q/', '에이전트Q'],
  ['/reviews/', '원장님 후기'],
];
export const NETWORK = [
  ['https://hanbangcar.com/', '한방카', 'f01.png'],
  ['https://womandoc.co.kr/', '우먼닥', 'f02.png'],
  ['https://sschuna.com/', '생생추나', 'f03.png'],
  ['https://ipwon.com/', '입원닷컴', 'f04.png'],
  ['https://sanjaeok.com/', '한방산재치료OK', 'f05.png'],
  ['https://healingoasis.kr/', '힐링오아시스', 'f06.png'],
];

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
  areaServed: { '@type': 'Country', name: '대한민국' },
  knowsAbout: ['SEO', 'AEO', 'GEO', '한의원 마케팅', '한방병원 마케팅', '네이버 AI 브리핑', '네이버 클립', '유튜브 쇼츠', '마케팅 자동화'],
  parentOrganization: { '@type': 'Organization', name: '(주)금솔커뮤니케이션', taxID: '107-87-29110', founder: { '@type': 'Person', name: '양은주' } },
  sameAs: ['https://hanipr.co.kr/', ...NETWORK.map(([u]) => u)],
  contactPoint: { '@type': 'ContactPoint', telephone: '+82-10-4236-6319', contactType: 'customer service', availableLanguage: 'Korean', hoursAvailable: 'Mo-Fr 09:00-18:00' },
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

const contactBtn = () => KAKAO_URL
  ? `<a class="kakao-fab" href="${KAKAO_URL}" target="_blank" rel="noopener">카톡 상담</a>`
  : `<a class="kakao-fab tel" href="tel:${FAST_PHONE.replace(/-/g, '')}" aria-label="빠른 전화 상담 ${FAST_PHONE}">빠른 상담 ${FAST_PHONE}</a>`;

export function page({ path, title, description, h1, body, jsonld = [], breadcrumbName }) {
  const graph = [ORG, { '@type': 'WebSite', '@id': `${BASE_URL}/#site`, url: `${BASE_URL}/`, name: '하니피알', inLanguage: 'ko-KR', publisher: { '@id': `${BASE_URL}/#org` } }, { '@type': 'WebPage', '@id': `${BASE_URL}${path}#page`, url: `${BASE_URL}${path}`, name: title, description, inLanguage: 'ko-KR', isPartOf: { '@id': `${BASE_URL}/#site` }, about: { '@id': `${BASE_URL}/#org` } }, ...jsonld];
  if (breadcrumbName) graph.push(breadcrumb(path, breadcrumbName));
  const nav = NAV.map(([href, label]) => `<li><a href="${href}"${href === path ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow">
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
<meta name="theme-color" content="#1F7A5C">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link rel="stylesheet" href="/assets/css/style.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>
<body>
<a class="sr-only" href="#main">본문 바로가기</a>
<header class="site-header">
  <div class="container">
    <a class="logo" href="/" aria-label="하니피알 홈"><span class="logo-mark" aria-hidden="true">H</span>하니피알 <small>by 금솔</small></a>
    <button class="nav-toggle" aria-label="메뉴 열기" aria-expanded="false" aria-controls="site-nav">☰</button>
    <nav class="nav" id="site-nav" aria-label="주요 메뉴">
      <ul>${nav}<li><a class="nav-cta" href="/consult/">무료 AI 노출 진단</a></li></ul>
    </nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="container">
    <nav class="foot-nav" aria-label="하단 메뉴">${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}<a href="/consult/">상담·무료 진단</a></nav>
    <div class="net"><strong>네트워크 사이트</strong>${NETWORK.map(([u, n]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('')}</div>
    <p>브랜드명 하니피알 · 상호 (주)금솔커뮤니케이션 · 대표이사 양은주 · 개인정보관리책임자 김지태<br>
    (08507) 서울특별시 금천구 가산디지털1로 128, 212-213호 (가산동, 에스티엑스브이타워)<br>
    사업자등록번호 107-87-29110 · 통신판매업 2012-서울금천-0101호 · 대표전화 <a href="tel:027611633">${PHONE}</a> · 빠른 상담 <a href="tel:01042366319">${FAST_PHONE}</a> · <a href="mailto:${EMAIL}">${EMAIL}</a></p>
    <p>Copyright © Kumsol Co.,Ltd. All rights reserved.</p>
  </div>
</footer>
${contactBtn()}
<nav class="mobile-bar" aria-label="빠른 상담">
  <a href="tel:027611633">전화</a>
  ${KAKAO_URL ? `<a class="kakao" href="${KAKAO_URL}" target="_blank" rel="noopener">카톡</a>` : `<a href="tel:01042366319">빠른 상담</a>`}
  <a class="primary" href="/consult/">무료 AI 진단</a>
</nav>
<script src="/assets/js/main.js" type="module"></script>
</body>
</html>
`;
}

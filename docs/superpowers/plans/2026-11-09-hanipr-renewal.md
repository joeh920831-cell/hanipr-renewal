# 하니피알 리뉴얼 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 공모전 필수 15개 조건을 모두 충족하는 7페이지 정적 사이트를 만들어 Vercel에 배포한다.

**Architecture:** 빌드 도구 없는 정적 HTML. 페이지마다 폴더/`index.html`(고유 URL). 공통 CSS 1개, JS 1개. 폼은 Google Apps Script 웹앱으로 POST → 시트 + Gmail.

**Tech Stack:** HTML/CSS/vanilla JS, Node 18+(검사 스크립트, 의존성 없음), Playwright(사전 설치본, 화면 확인), Google Apps Script, Vercel.

**Spec:** `docs/superpowers/specs/2026-11-09-hanipr-renewal-design.md`

## Global Constraints
- BASE_URL: `https://hanipr-renewal.vercel.app` (canonical·sitemap·OG에 사용. 배포 주소가 다르면 일괄 치환)
- 포인트 컬러 `#1F7A5C` 1개, 배경 `#FFFFFF`
- 메인 H1(글자 그대로): `SEO·AEO·GEO, 한의원 한방병원 마케팅대행사`
- 메인 title(글자 그대로): `한의원한방병원 마케팅·신환 늘리기 | AI 검색 노출 전문 금솔`
- 메인 description 필수 키워드: SEO·AEO·GEO, 네이버 AI 브리핑, 네이버 클립·쇼츠, 에이전트Q, AI마케팅, 한의원홈페이지 제작, 한방병원 마케팅 대행사, 무료 AI 노출 진단, 상담
- 전 페이지 금지어: `가장`, `1위`, `최고`, `유일`, `No.1`, `No1`, `국내 최다`
- 첫 화면 문구: `SEO·AEO·GEO를 잘하는 대행사`
- 확인 안 된 수치·데이터에는 `예시` 표기
- 회사 정보(푸터): (주)금솔커뮤니케이션 / 대표이사 양은주 / 서울특별시 금천구 가산디지털1로 128, 212-213호 / 사업자 107-87-29110 / 02-761-1633 / 빠른 상담 010-4236-6319 / hanipr@kumsolmedia.com
- 로그인·회원가입 없음

## Review Focus
- 폼 전송 실패(Apps Script 다운·네트워크 오류) → 입력값 유지 + "02-761-1633으로 연락 주세요" 안내 (Task 5 테스트)
- 개인정보 동의 미체크·연락처 형식 오류 → 전송 차단 + 메시지 (Task 5)
- 모바일 390px에서 가로 스크롤 발생 → 없어야 함 (Task 6 Playwright)
- 하단 고정 바가 마지막 폼 버튼을 가림 → body 하단 여백 확보 (Task 6)
- 움직임 민감 사용자 → `prefers-reduced-motion`에서 영상 갤러리 정지 (Task 3 검사)

---

### Task 1: 요구사항 검사 스크립트 + 공통 뼈대

**Files:**
- Create: `tests/check.mjs`, `assets/css/style.css`, `assets/js/main.js`, `package.json`

**Interfaces:**
- Produces: `npm test` → `node tests/check.mjs`. 실패 항목을 출력하고 exit 1.
- Produces: 공통 CSS 클래스 `.container .btn .btn-primary .section .card .site-header .site-footer .mobile-bar .kakao-fab`

- [ ] **Step 1: `tests/check.mjs` 작성** — 아래 PAGES 각각을 읽어 검사:
  - PAGES = `index.html, seo-aeo-geo/index.html, shortform/index.html, automation/index.html, agent-q/index.html, consult/index.html, reviews/index.html`
  - 모든 페이지: `<title>`·`meta description`·`link rel=canonical`(BASE_URL로 시작)·`<h1>` 정확히 1개·`application/ld+json` 1개 이상·`<html lang="ko">`·viewport meta
  - 모든 페이지: 금지어 없음(대소문자 무시), 공통 메뉴에 나머지 6개 페이지 링크 존재
  - 모든 내부 `href="/..."` 가 실제 파일(`x/index.html` 또는 `x`)로 존재
  - 모든 `<img>` 에 비어있지 않은 alt
  - index.html: H1·title 글자 일치, description 필수 키워드 전부 포함, `SEO·AEO·GEO를 잘하는 대행사` 포함, 상담 링크(`/consult/`) 2개 이상, `.mobile-bar`·`.kakao-fab` 존재, 네트워크 링크 6개(hanbangcar.com, womandoc.co.kr, sschuna.com, ipwon.com, sanjaeok.com, healingoasis.kr), 3대 상품 링크(`/seo-aeo-geo/`,`/shortform/`,`/automation/`), `id="video-gallery"`, `id="agent-q-preview"`
  - style.css: `#1F7A5C` 포함, `prefers-reduced-motion` 포함
  - `sitemap.xml` 에 7개 URL, `robots.txt` 에 Sitemap 줄
- [ ] **Step 2:** `npm test` → FAIL (파일 없음) 확인
- [ ] **Step 3:** style.css(토큰·공통 클래스·반응형 기준 768px), main.js(모바일 메뉴 토글만) 작성
- [ ] **Step 4: Commit** `chore: add requirement checker and base styles`

### Task 2: 기존 자산 가져오기

**Files:** Create: `assets/img/network/f01~f06.png`, `assets/img/reviews/m01~m05.jpg`, `assets/img/logo.png`, `data/reviews.json`

- [ ] **Step 1:** hanipr.co.kr `/theme/basic/img/comm/f01~f06.png`, `/theme/basic/img/main/m01~m05.jpg`, `/theme/basic/img/comm/logo.png` 내려받기(자사 자산). 새 빈 폴더에 받은 뒤 이동.
- [ ] **Step 2:** 카톡 후기 이미지 육안 확인 — 이름·프로필 사진이 보이면 흐림 처리(Pillow 또는 Playwright canvas), 처리 내역 커밋 메시지에 기록
- [ ] **Step 3:** 서면 후기 30여 건 → `data/reviews.json` `[{region, clinic, director, services[], text}]` (이미 마스킹된 값 그대로). 중복 1건(상\*서울한방병원) 제거
- [ ] **Step 4: Commit** `feat: import existing review and network assets`

### Task 3: 메인 페이지

**Files:** Create: `index.html` / Modify: `assets/css/style.css`

**Interfaces:** Consumes Task 1 클래스, Task 2 이미지.

- [ ] **Step 1:** 스펙 4장 순서대로 10개 섹션 작성. 에이전트Q 미리보기는 순수 CSS 막대(ChatGPT·Gemini·네이버 AI 브리핑·Perplexity 점유율, "예시") + 경쟁사 순위 표 3행
- [ ] **Step 2:** 영상 갤러리: 트랙 2벌 복제 + `@keyframes` translateX(-50%), `:hover/:focus-within` 에서 `animation-play-state: paused`, `prefers-reduced-motion: reduce` 에서 `animation: none`. 영상 미확보 → YouTube 썸네일 자리 카드에 "예시" 표기, 링크는 데이터 속성 `data-video` 로 교체 가능하게. 갤러리 아래 한 줄 설명("썸네일이 계속 흘러가며, 마우스를 올리면 멈추고 누르면 재생됩니다")
- [ ] **Step 3:** JSON-LD: `ProfessionalService`(이름 하니피알, 법인 금솔커뮤니케이션, 주소, 전화, sameAs=네트워크 6개 URL, areaServed KR) + `WebSite` + `FAQPage`
- [ ] **Step 4:** 후기 섹션: reviews.json 상위 6개를 HTML에 직접 넣기(JS 렌더 금지 — 크롤러용) + m01~m05 + `/reviews/` 링크
- [ ] **Step 5:** `npm test` 중 index 항목 PASS
- [ ] **Step 6: Commit** `feat: build main page`

### Task 4: 하위 페이지 6개

**Files:** Create: `seo-aeo-geo/index.html`, `shortform/index.html`, `automation/index.html`, `agent-q/index.html`, `consult/index.html`(Task 5에서 폼 완성), `reviews/index.html`, `404.html`

- [ ] **Step 1:** 상품 3페이지: 문제 → 해결 → 절차(4단계) → 예시 → 상담 버튼. 각 페이지 `Service` + `BreadcrumbList` + `FAQPage`(3개) JSON-LD
- [ ] **Step 2:** agent-q: 4개 지표 전부(AI별 점유율, 경쟁사 대비 순위, 질문별 노출 빈도 표, 인용 출처 Top5) — 전부 "예시" 배지
- [ ] **Step 3:** reviews: reviews.json 전체를 HTML에 직접 삽입(작성 시 Node로 생성 후 붙여넣기, 런타임 JS 없음)
- [ ] **Step 4:** `npm test` 전체 PASS (sitemap 제외)
- [ ] **Step 5: Commit** `feat: add service, agent-q, reviews pages`

### Task 5: 상담·무료진단 폼 + Apps Script

**Files:** Create: `apps-script/Code.gs`, `apps-script/README.md`, `tests/form.test.mjs` / Modify: `consult/index.html`, `index.html`(하단 간이 폼), `assets/js/main.js`

**Interfaces:**
- Produces: `main.js` 의 `validateLead(fields) -> string|null` (오류 메시지 또는 null), 폼 `data-endpoint` 속성에 Apps Script URL
- Apps Script `doPost(e)`: 필드 `name, clinic, region, phone, product, message, agree, website(honeypot)` → 시트 `Leads` 에 `[timestamp, ...]` append, `MailApp.sendEmail(NOTIFY_EMAIL, ...)`, `{ok:true}` 반환. honeypot 채워짐/필수값 누락 → `{ok:false}`

- [ ] **Step 1: 실패 테스트** `tests/form.test.mjs` (node:test):
  - `validateLead({name:'', ...})` → `'이름을 입력해 주세요'`
  - phone `'0101234'` → `'연락처를 확인해 주세요'`, `'010-4236-6319'`·`'01042366319'`·`'02-761-1633'` → null
  - agree false → `'개인정보 수집에 동의해 주세요'`
- [ ] **Step 2:** `node --test tests/` FAIL 확인
- [ ] **Step 3:** `validateLead` 구현(main.js 를 ESM export 겸 브라우저용으로 작성), 전송은 `fetch(endpoint,{method:'POST',body:new URLSearchParams(...)})` (no-cors 회피 위해 `text/plain` 아닌 form-urlencoded, Apps Script는 `e.parameter` 로 읽음). 성공 시 폼 숨기고 완료 메시지, 실패 시 입력 유지 + 전화 안내
- [ ] **Step 4:** PASS 확인, Code.gs 작성, README에 배포 절차(시트 생성 → 확장 프로그램 > Apps Script → 붙여넣기 → 배포 > 웹앱, 액세스 "모든 사용자" → URL을 `data-endpoint` 에)
- [ ] **Step 5:** 사용자와 함께 실제 배포 → 테스트 1건 전송 → 시트·메일 도착 확인
- [ ] **Step 6: Commit** `feat: consult form with Apps Script intake`

### Task 6: SEO 파일 + 화면 검증

**Files:** Create: `sitemap.xml`, `robots.txt`, `favicon.svg`, `tests/screens.mjs`

- [ ] **Step 1:** sitemap(7 URL, lastmod 오늘), robots(`Allow: /` + Sitemap)
- [ ] **Step 2:** `tests/screens.mjs`: `npx serve` 대신 `python3 -m http.server` 로 띄우고 Playwright로 7페이지 × (1440, 390) 스크린샷, 각 페이지 `document.documentElement.scrollWidth <= innerWidth` 단언, 390에서 consult 제출 버튼이 `.mobile-bar` 와 겹치지 않음 단언
- [ ] **Step 3:** `npm test && node tests/screens.mjs` 전부 PASS, 스크린샷 육안 확인
- [ ] **Step 4: Commit** `feat: sitemap, robots, screen checks`

### Task 7: 배포 + 넥스트티 100점

- [ ] **Step 1:** (사용자) vercel.com → GitHub로 로그인 → `hanipr-renewal` Import → Framework "Other" → Deploy. 실제 주소가 BASE_URL과 다르면 일괄 치환 후 커밋
- [ ] **Step 2:** next-t.co.kr/seo/check, /geo/entity-check 측정 → 감점 항목 수정 → 100점까지 반복
- [ ] **Step 3:** 배포 주소에서 폼 실제 전송 1회, 모든 메뉴 클릭 확인
- [ ] **Step 4:** 제출용: 점수 캡처 2장, 접수처 설명("구글 시트 + Gmail 알림")

# 하니피알 홈페이지 리뉴얼

한의원·한방병원 SEO·AEO·GEO 마케팅 대행사 하니피알(금솔커뮤니케이션) 사이트. 정적 HTML, Vercel 배포.

- 페이지 원본: `src/` → `npm run build` 로 HTML 생성(생성된 HTML도 커밋)
- 검사: `npm test` (필수 조건·폼 검증), `node tests/screens.mjs` (PC·모바일 화면, 폼 흐름)
- 폼 접수: `apps-script/README.md`
- 바꿀 값: `src/layout.mjs` 의 `KAKAO_URL`, `src/form.mjs` 의 `FORM_ENDPOINT`, `src/pages/home.mjs` 의 `VIDEOS[].youtube`

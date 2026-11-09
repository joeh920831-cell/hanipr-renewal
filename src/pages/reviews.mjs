import { page, esc } from '../layout.mjs';
import { readFileSync } from 'node:fs';

const reviews = JSON.parse(readFileSync(new URL('../../data/reviews.json', import.meta.url), 'utf8'));
const card = (r) => `<article class="review"><p>${esc(r.text)}</p><div class="svc">${r.services.map((s) => `<span class="badge">${esc(s)}</span>`).join('')}</div><p class="who">${esc(r.region)} · ${esc(r.clinic)} ${esc(r.director)} 원장</p></article>`;

const body = `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="현재 위치"><a href="/">홈</a> › 원장님 후기</nav>
    <h1>원장님 리얼 후기 ${reviews.length}건</h1>
    <p>하니피알과 함께하는 한의원·한방병원 원장님들이 서비스 이용 후 직접 남겨 주신 후기입니다. 원장님 성함과 기관명은 일부 가렸고, 긴 후기는 핵심 내용 위주로 줄였습니다.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="review-list">${reviews.map(card).join('')}</div>
    <div class="btn-row" style="margin-top:40px"><a class="btn btn-primary" href="/consult/">무료 AI 노출 진단 받기</a></div>
  </div>
</section>`;

export default page({
  path: '/reviews/', breadcrumbName: '원장님 후기',
  title: '원장님 후기 | 한의원·한방병원 마케팅 하니피알',
  description: `하니피알 한의원·한방병원 마케팅을 이용 중인 원장님 ${reviews.length}분의 실제 후기. 블로그 상위노출, 한방카·입원닷컴 네트워크, 브랜드 블로그 이용 경험.`,
  body,
  jsonld: [],
});

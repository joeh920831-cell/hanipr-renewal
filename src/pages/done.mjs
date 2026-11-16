import { page } from '../layout.mjs';
import { reportSample } from './diagnosis.mjs';

const body = `
<section class="page-hero">
  <div class="container">
    <p class="kicker">신청 완료</p>
    <h1><span id="done-clinic">원장님</span>의<br>무료 AI 노출 진단이 접수되었습니다</h1>
    <p>담당 컨설턴트가 영업일 1일 안에 확인 전화를 드리고, 영업일 2일 안에 리포트를 카톡·메일로 보내드립니다.</p>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container">
    <ol class="flow" aria-label="진단 진행 상황">
      <li><b>1 · 완료</b>신청서 접수</li>
      <li class="on"><b>2 · 진행 예정</b>담당 컨설턴트 확인 전화</li>
      <li><b>3 · 진행 예정</b>진단 리포트 발송</li>
    </ol>
  </div>
</section>
<section class="section surface">
  <div class="container">
    <div class="section-head"><span class="kicker">기다리시는 동안</span><h2 class="title">이런 리포트를 받아보십니다</h2></div>
    ${reportSample}
    <div class="btn-row center" style="margin-top:40px"><a class="btn btn-line" href="/magazine/">AI 매거진 읽기</a><a class="btn btn-ghost" href="/">홈으로</a></div>
  </div>
</section>`;

export default page({
  path: '/diagnosis/done/', breadcrumbName: '신청 완료', noindex: true,
  title: '진단 신청 완료 | 하니피알',
  description: '무료 AI 노출 진단 신청이 접수되었습니다. 영업일 2일 안에 리포트를 보내드립니다.',
  body,
});

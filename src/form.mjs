// 상담·무료 진단 폼 마크업. 전송·검증은 assets/js/main.js 가 담당.
// shortcut: Apps Script 웹앱 URL 미배포 — 배포 후 FORM_ENDPOINT 에 붙여넣고 npm run build
export const FORM_ENDPOINT = '';

const PRODUCTS = ['무료 AI 노출 진단', 'SEO·AEO·GEO (AI 매거진)', '숏폼 영상 (네이버 클립·쇼츠)', '마케팅 자동화', '에이전트Q 리포트', '한의원 홈페이지 제작', '기타 상담'];

export function leadForm({ id, full = false, source }) {
  const opt = PRODUCTS.map((p) => `<option>${p}</option>`).join('');
  return `<form class="form lead-form" id="${id}" data-endpoint="${FORM_ENDPOINT}" data-source="${source}" novalidate>
  <div class="row">
    <label>원장님 성함 <span class="req">*</span><input name="name" autocomplete="name" required></label>
    <label>연락처 <span class="req">*</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="010-0000-0000" required></label>
  </div>
  <div class="row">
    <label>한의원·한방병원명 <span class="req">*</span><input name="clinic" autocomplete="organization" required></label>
    <label>지역${full ? ' <span class="req">*</span>' : ''}<input name="region" placeholder="예: 서울 강서구"${full ? ' required' : ''}></label>
  </div>
  <label>관심 서비스<select name="product">${opt}</select></label>
  ${full ? `<label>문의 내용<textarea name="message" rows="4" placeholder="현재 진행 중인 광고, 고민, 진단받고 싶은 키워드(예: 강서구 교통사고 한의원)를 적어 주세요."></textarea></label>` : ''}
  <label class="hp" aria-hidden="true">웹사이트<input name="website" tabindex="-1" autocomplete="off"></label>
  <div class="agree">
    <input type="checkbox" name="agree" id="${id}-agree" required>
    <div><label for="${id}-agree">개인정보 수집·이용에 동의합니다 <span class="req">*</span></label>
    <details><summary>자세히</summary>수집 항목: 성함, 연락처, 기관명, 지역, 문의 내용 / 목적: 상담 및 진단 결과 회신 / 보유 기간: 상담 목적 달성 시까지. 동의를 거부할 수 있으나 이 경우 상담 신청이 제한됩니다.</details></div>
  </div>
  <p class="form-msg" role="status" aria-live="polite"></p>
  <button class="btn btn-primary" type="submit">${full ? '무료 AI 노출 진단 신청' : '상담 신청하기'}</button>
</form>`;
}

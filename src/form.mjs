// 상담·무료 진단 폼 마크업. 전송·검증은 assets/js/main.js 가 담당.
// shortcut: Apps Script 웹앱 URL 미배포 — 배포 후 FORM_ENDPOINT 에 붙여넣고 npm run build
export const FORM_ENDPOINT = '';

export const PRODUCTS = ['무료 AI 노출 진단', 'SEO·AEO·GEO (AI 매거진)', '숏폼 영상 (네이버 클립·쇼츠)', '마케팅 자동화', '에이전트Q 리포트', '한의원 홈페이지 제작', '네트워크 광고 (한방카·입원닷컴 등)', '기타 상담'];
const SPECIALTIES = ['교통사고·입원', '통증·추나', '여성·산후', '다이어트·체질', '비염·호흡기', '암 요양·면역', '기타'];

const agree = (id) => `<div class="agree">
    <input type="checkbox" name="agree" id="${id}-agree" required>
    <div><label for="${id}-agree">개인정보 수집·이용에 동의합니다 <span class="req">(필수)</span></label>
    <details><summary>내용 보기</summary>수집 항목: 기관명, 연락처, 성함, 지역, 주력 진료, 문의 내용 / 목적: 상담 및 진단 리포트 회신 / 보유 기간: 상담 목적 달성 시까지. 동의를 거부할 수 있으나 이 경우 신청이 제한됩니다.</details></div>
  </div>`;
const hidden = (id) => `<label class="hp" aria-hidden="true">웹사이트<input name="website" tabindex="-1" autocomplete="off"></label>`;

// 첫 화면 인라인 진단 폼: 2칸 + 버튼
export const heroForm = () => `<form class="hero-form lead-form" id="hero-form" data-endpoint="${FORM_ENDPOINT}" data-source="메인 첫 화면" novalidate>
  <label class="sr-only" for="hero-clinic">한의원·한방병원명</label>
  <input id="hero-clinic" name="clinic" autocomplete="organization" placeholder="한의원·한방병원명" required>
  <label class="sr-only" for="hero-phone">연락처</label>
  <input id="hero-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="연락처 (010-0000-0000)" required>
  <button class="btn btn-primary" type="submit">무료 AI 노출 진단 시작</button>
  <input type="hidden" name="product" value="무료 AI 노출 진단">${hidden('hero')}
  <label class="agree-line"><input type="checkbox" name="agree" required> 개인정보 수집·이용 동의 (상담 회신 목적) <a href="/diagnosis/#privacy">내용 보기</a></label>
  <p class="form-msg" role="status" aria-live="polite"></p>
</form>`;

// 하단·진단 페이지 폼. full: 성함·문의 내용 추가
export function leadForm({ id, full = false, source }) {
  return `<form class="form lead-form" id="${id}" data-endpoint="${FORM_ENDPOINT}" data-source="${source}"${full ? ' data-require-name' : ''} novalidate>
  <div class="row">
    <label>한의원·한방병원명 <span class="req">*</span><input name="clinic" autocomplete="organization" required></label>
    <label>연락처 <span class="req">*</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="010-0000-0000" required></label>
  </div>
  <div class="row">
    <label>주력 진료<select name="specialty">${SPECIALTIES.map((s) => `<option>${s}</option>`).join('')}</select></label>
    <label>지역<input name="region" placeholder="예: 군포시 산본동"></label>
  </div>
  ${full ? `<div class="row">
    <label>원장님 성함 <span class="req">*</span><input name="name" autocomplete="name" required></label>
    <label>관심 서비스<select name="product">${PRODUCTS.map((p) => `<option>${p}</option>`).join('')}</select></label>
  </div>
  <label>궁금하신 점<textarea name="message" rows="4" placeholder="현재 진행 중인 광고, 진단받고 싶은 질문(예: 산본 교통사고 한의원 추천)을 적어 주세요."></textarea></label>` : `<input type="hidden" name="product" value="무료 AI 노출 진단">`}
  ${hidden(id)}
  ${agree(id)}
  <p class="form-msg" role="status" aria-live="polite"></p>
  <button class="btn btn-primary" type="submit">무료 AI 노출 진단 신청</button>
</form>`;
}

// 상담 폼 입력 검증. 오류 메시지 또는 null 을 돌려준다. (브라우저·Node 공용)
export function validateLead(f, { requireRegion = false } = {}) {
  if (!String(f.name || '').trim()) return '이름을 입력해 주세요';
  if (!String(f.clinic || '').trim()) return '한의원·한방병원명을 입력해 주세요';
  const digits = String(f.phone || '').replace(/\D/g, '');
  if (!/^0\d{8,10}$/.test(digits)) return '연락처를 확인해 주세요';
  if (requireRegion && !String(f.region || '').trim()) return '지역을 입력해 주세요';
  if (!f.agree) return '개인정보 수집에 동의해 주세요';
  return null;
}

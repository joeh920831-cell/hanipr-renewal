// 하니피알 상담·무료 진단 폼 접수: 구글 시트 저장 + 메일 알림
// 배포: 확장 프로그램 > Apps Script 에 붙여넣기 → 배포 > 새 배포 > 웹 앱 (실행: 나, 액세스: 모든 사용자)
const NOTIFY_EMAIL = 'joeh920831@gmail.com'; // 알림 받을 메일 (여러 명이면 쉼표로)
const SHEET_NAME = 'Leads';
const FIELDS = ['name', 'phone', 'clinic', 'region', 'product', 'message', 'source', 'page'];

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return json_({ ok: true }); // 스팸 봇(숨김 칸 입력) — 저장하지 않고 성공처럼 응답
  if (!p.name || !p.phone || !p.clinic || p.agree !== 'Y') return json_({ ok: false, error: 'missing' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(['접수시각', '성함', '연락처', '기관명', '지역', '관심 서비스', '문의 내용', '접수 위치', '페이지']);
    // 시트 수식 주입 방지: = + - @ 로 시작하는 값 앞에 ' 추가
    const row = FIELDS.map((k) => String(p[k] || '').slice(0, 2000).replace(/^([=+\-@])/, "'$1"));
    sheet.appendRow([new Date()].concat(row));
  } finally {
    lock.releaseLock();
  }

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: '[하니피알] 새 상담 신청 - ' + p.clinic + ' ' + p.name,
      body: FIELDS.map((k) => k + ': ' + (p[k] || '')).join('\n'),
    });
  } catch (err) {
    console.error(err); // 메일 실패해도 시트 저장은 완료 — 신청자에게는 성공 응답
  }
  return json_({ ok: true });
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

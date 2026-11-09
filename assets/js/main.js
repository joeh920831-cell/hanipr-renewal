// 모바일 메뉴 토글
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// 상담·진단 폼 전송 → Google Apps Script 웹앱 (시트 저장 + 메일 알림)
import { validateLead } from './validate.js';

const FAIL_MSG = '전송에 실패했습니다. 입력하신 내용은 그대로 있으니 다시 시도하시거나 02-761-1633으로 연락 주세요.';

document.querySelectorAll('.lead-form').forEach((form) => {
  const msg = form.querySelector('.form-msg');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.agree = form.agree.checked;
    const error = validateLead(data, { requireRegion: form.region.required });
    msg.className = 'form-msg error';
    if (error) { msg.textContent = error; return; }
    const endpoint = form.dataset.endpoint;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; msg.className = 'form-msg'; msg.textContent = '전송 중입니다…';
    try {
      if (!endpoint) throw new Error('no endpoint');
      const body = new URLSearchParams({ ...data, agree: 'Y', source: form.dataset.source, page: location.pathname });
      const res = await fetch(endpoint, { method: 'POST', body });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'rejected');
      form.outerHTML = `<div class="form-done" role="status"><b>신청이 접수되었습니다</b>담당 컨설턴트가 영업일 기준 1일 안에 연락드립니다.</div>`;
    } catch {
      msg.className = 'form-msg error'; msg.textContent = FAIL_MSG; btn.disabled = false;
    }
  });
});

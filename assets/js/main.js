import { validateLead } from './validate.js';

const track = (name, params = {}) => window.gtag?.('event', name, params);
const store = { get: (k) => { try { return sessionStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { sessionStorage.setItem(k, v); } catch {} } };

// 헤더: 스크롤 시 하단 선, 모바일 메뉴 토글
const header = document.querySelector('.site-header');
addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 8), { passive: true });
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});

// 흐르는 띠: 손가락이 닿으면 멈추고 직접 넘길 수 있게
document.querySelectorAll('.marquee').forEach((m) => {
  m.addEventListener('touchstart', () => m.classList.add('paused'), { passive: true });
});

// 상담 버튼 클릭 전환 추적
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-track]');
  if (a) track('cta_click', { cta: a.dataset.track });
});

// 상품별 상담 버튼(?product=...)으로 오면 관심 서비스 미리 선택
const wanted = new URLSearchParams(location.search).get('product');
if (wanted) document.querySelectorAll('select[name="product"]').forEach((s) => { if ([...s.options].some((o) => o.text === wanted)) s.value = wanted; });

// 이탈 방지 팝업: PC에서 화면 위로 마우스가 나갈 때 세션당 1회
const pop = document.getElementById('exit-pop');
if (pop && matchMedia('(pointer: fine)').matches && !location.pathname.startsWith('/diagnosis')) {
  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget || e.clientY > 0 || store.get('exitShown')) return;
    store.set('exitShown', '1');
    pop.showModal?.();
    track('exit_popup_shown');
  });
  pop.querySelector('[data-close]')?.addEventListener('click', () => pop.close());
}

// 상담·진단 폼 전송 → Google Apps Script 웹앱 (시트 저장 + 메일 알림)
const FAIL_MSG = '전송에 실패했습니다. 입력하신 내용은 그대로 있으니 다시 시도하시거나 02-761-1633으로 연락 주세요.';

document.querySelectorAll('.lead-form').forEach((form) => {
  const msg = form.querySelector('.form-msg');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.agree = form.agree.checked;
    const error = validateLead(data, { requireName: 'requireName' in form.dataset });
    msg.className = 'form-msg error';
    if (error) {
      msg.textContent = error;
      const field = Object.entries({ '한의원': 'clinic', '원장님': 'name', '연락처': 'phone', '개인정보': 'agree' }).find(([k]) => error.startsWith(k))?.[1];
      form.elements[field]?.focus();
      return;
    }
    const endpoint = form.dataset.endpoint;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; msg.className = 'form-msg'; msg.textContent = '전송 중입니다…';
    try {
      if (!endpoint) throw new Error('no endpoint');
      const body = new URLSearchParams({ ...data, agree: 'Y', source: form.dataset.source, page: location.pathname });
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000); // 응답 없는 서버에서 무한 대기 방지
      const res = await fetch(endpoint, { method: 'POST', body, signal: ctrl.signal });
      clearTimeout(timer);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'rejected');
      track('generate_lead', { form: form.dataset.source });
      location.href = '/diagnosis/done/?clinic=' + encodeURIComponent(data.clinic);
    } catch {
      msg.className = 'form-msg error'; msg.textContent = FAIL_MSG; btn.disabled = false;
    }
  });
});

// 접수 완료 페이지: 한의원명 표시
const doneName = document.getElementById('done-clinic');
if (doneName) {
  const c = new URLSearchParams(location.search).get('clinic');
  if (c) doneName.textContent = c.slice(0, 40);
}

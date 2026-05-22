/* ============================================================
   WEDDING INVITATION — LAYLA & KARIM
   script.js
   ============================================================ */

'use strict';

/* ── Helpers ─────────────────────────────────────────────── */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const pad = n => String(n).padStart(2, '0');

/* ── Petals ──────────────────────────────────────────────── */
(function initPetals() {
  const container = $('#petals');
  const colors = [
    'rgba(240,220,180,.65)',
    'rgba(210,185,140,.55)',
    'rgba(200,160,64,.45)',
    'rgba(255,240,200,.6)',
    'rgba(180,210,165,.45)',
    'rgba(240,200,160,.5)',
  ];
  const COUNT = window.innerWidth < 500 ? 14 : 22;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const size = 8 + Math.random() * 12;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size * 0.6}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${7 + Math.random() * 9}s;
      animation-delay: ${-Math.random() * 12}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
    container.appendChild(p);
  }
})();

/* ── Music ───────────────────────────────────────────────── */
(function initMusic() {
  const btn    = $('#musicBtn');
  const audio  = $('#bgAudio');
  const iconOn = $('#iconOn');
  const iconOff= $('#iconOff');
  let playing  = false;

  if (!audio) return;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      iconOn.classList.remove('hidden');
      iconOff.classList.add('hidden');
      btn.classList.remove('playing');
    } else {
      audio.play().catch(() => {});
      iconOn.classList.add('hidden');
      iconOff.classList.remove('hidden');
      btn.classList.add('playing');
    }
    playing = !playing;
  });
})();

/* ── Envelope open ───────────────────────────────────────── */
let envelopeOpened = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const wrap   = $('#envWrap');
  const tapTxt = $('#landTap');
  const wipe   = $('#pageWipe');

  // Hide tap hint
  if (tapTxt) { tapTxt.style.opacity = '0'; tapTxt.style.pointerEvents = 'none'; }

  // Trigger envelope open CSS animation
  wrap.classList.add('opening');

  // After envelope animates, do the page wipe transition
  setTimeout(() => {
    wipe.classList.add('wipe-in');

    setTimeout(() => {
      // Show Screen B
      $('#screenA').classList.add('hidden');
      $('#screenB').classList.remove('hidden');

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Remove wipe
      wipe.classList.remove('wipe-in');
      wipe.classList.add('wipe-out');

      setTimeout(() => {
        wipe.classList.remove('wipe-out');
        // Trigger hero animations
        animateHero();
      }, 580);

    }, 560);
  }, 900);
}

/* ── Hero stagger-in ─────────────────────────────────────── */
function animateHero() {
  const els = $$('.hero-body > *');
  els.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), i * 140);
  });
}

/* ── Smooth scroll to section ───────────────────────────── */
function smoothTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── Scroll Reveal ───────────────────────────────────────── */
(function initReveal() {
  const io = new IntersectionObserver(
    entries => {
      entries.forEach((e, idx) => {
        if (e.isIntersecting) {
          // Stagger children within each observed element
          setTimeout(() => e.target.classList.add('in'), 60);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe after screen B is shown (we re-run on mutation)
  function observeReveal() {
    $$('.reveal').forEach(el => { if (!el.classList.contains('in')) io.observe(el); });
  }
  observeReveal();

  // Re-observe when Screen B becomes visible
  const mo = new MutationObserver(() => observeReveal());
  const sB = $('#screenB');
  if (sB) mo.observe(sB, { attributes: true, attributeFilter: ['class'] });
})();

/* ── Countdown Timer ─────────────────────────────────────── */
(function initCountdown() {
  const target = new Date('2025-09-14T19:00:00');
  const nodes  = {
    d: $('#cdD'), h: $('#cdH'), m: $('#cdM'), s: $('#cdS'),
  };

  function flash(el) {
    el.classList.add('flip');
    setTimeout(() => el.classList.remove('flip'), 260);
  }

  let prev = { d: null, h: null, m: null, s: null };

  function tick() {
    const now   = new Date();
    const diff  = target - now;

    if (diff <= 0) {
      // Wedding day!
      if (nodes.d) nodes.d.textContent = '00';
      if (nodes.h) nodes.h.textContent = '00';
      if (nodes.m) nodes.m.textContent = '00';
      if (nodes.s) nodes.s.textContent = '00';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const mi= Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    const vals = { d, h, m: mi, s };
    for (const [key, node] of Object.entries(nodes)) {
      if (!node) continue;
      const v = pad(vals[key]);
      if (v !== prev[key]) { flash(node); node.textContent = v; }
      prev[key] = v;
    }
  }

  tick();
  setInterval(tick, 1000);
})();

/* ── RSVP Form ───────────────────────────────────────────── */
function handleRSVP() {
  const name    = $('#fName');
  const email   = $('#fEmail');
  const attending = $('input[name="attend"]:checked');
  let valid = true;

  // Clear previous errors
  $$('.fin').forEach(el => el.classList.remove('error'));

  // Validate name
  if (!name.value.trim()) {
    name.classList.add('error');
    name.focus();
    valid = false;
  }

  // Validate email
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRx.test(email.value.trim())) {
    email.classList.add('error');
    if (valid) email.focus();
    valid = false;
  }

  // Validate attendance selection
  if (!attending) {
    // Highlight radio row
    const row = $('.attend-row');
    if (row) {
      row.style.outline = '1px solid rgba(224,85,85,.6)';
      row.style.borderRadius = '4px';
      setTimeout(() => { row.style.outline = ''; row.style.borderRadius = ''; }, 1800);
    }
    valid = false;
  }

  if (!valid) return;

  // ── Collect data ──────────────────────────────────────────
  const data = {
    name:     name.value.trim(),
    email:    email.value.trim(),
    phone:    $('#fPhone').value.trim(),
    attending:attending.value,
    guests:   $('#fGuests').value,
    message:  $('#fMsg').value.trim(),
  };

  // ── Send to Formspree (or similar) ───────────────────────
  // Replace YOUR_FORM_ID with your Formspree form ID
  const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

  const btn = $('.rsvp-send');
  btn.disabled = true;
  btn.innerHTML = '<span>Sending…</span>';

  fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
    .then(r => {
      // Show success regardless (Formspree not configured → still show thank-you)
      showRSVPSuccess();
    })
    .catch(() => {
      // Still show success for demo; in production handle the error
      showRSVPSuccess();
    });
}

function showRSVPSuccess() {
  const form = $('#rsvpForm');
  const ok   = $('#rsvpOK');
  if (!form || !ok) return;

  form.style.opacity = '0';
  form.style.transform = 'scale(.96)';
  form.style.transition = 'all .4s ease';

  setTimeout(() => {
    form.classList.add('hidden');
    ok.classList.remove('hidden');
    ok.style.opacity = '0';
    ok.style.transition = 'opacity .5s ease';
    requestAnimationFrame(() => {
      ok.style.opacity = '1';
    });
  }, 400);
}

/* ── Keyboard: allow Enter/Space on envelope ─────────────── */
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.id === 'envWrap') {
    e.preventDefault();
    openEnvelope();
  }
});

/* ── Passive scroll optimisation ────────────────────────── */
window.addEventListener('scroll', () => {}, { passive: true });

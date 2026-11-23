/* marketingwebsites.ca — progressive enhancement (site works without JS). */
(() => {
  'use strict';
  const doc = document.documentElement;
  doc.classList.add('js');
  const cfg = JSON.parse(document.getElementById('mw-config')?.textContent || '{}');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ── Storage (may throw in private mode) ─────────────────────────────── */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
    sget(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch { /* ignore */ } },
  };

  /* ── Analytics: GA4 only after consent (Quebec Law 25) ───────────────── */
  window.dataLayer = window.dataLayer || [];
  const gtag = function () { window.dataLayer.push(arguments); };
  let gaLoaded = false;
  const loadGA = () => {
    if (gaLoaded || !cfg.ga4) return;
    gaLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.ga4);
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', cfg.ga4, { anonymize_ip: true, language: cfg.lang });
  };
  const track = (name, params = {}) => {
    if (gaLoaded) gtag('event', name, { language: cfg.lang, page_path: location.pathname, ...params });
  };

  const consentEl = $('[data-consent]');
  const consent = store.get('mw-consent');
  if (consent === 'granted') loadGA();
  if (!consent && consentEl) consentEl.hidden = false;
  $$('[data-consent-choice]').forEach((b) => b.addEventListener('click', () => {
    const v = b.dataset.consentChoice;
    store.set('mw-consent', v);
    consentEl.hidden = true;
    if (v === 'granted') loadGA();
  }));
  $$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => { consentEl.hidden = false; $('button', consentEl)?.focus(); }));

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a, button');
    if (!a) return;
    if (a.dataset.track) track(a.dataset.track);
    const cta = a.dataset.cta;
    if (cta === 'book_consultation') track('book_consultation');
    else if (cta === 'book_demo') track('book_demo');
    else if (cta) track('cta_click', { cta });
  });

  /* ── UTM / attribution (kept for the session) ────────────────────────── */
  const params = new URLSearchParams(location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach((k) => {
    if (params.get(k)) store.sset('mw-' + k, params.get(k));
  });
  if (!store.sget('mw-landing')) {
    store.sset('mw-landing', location.pathname);
    store.sset('mw-referrer', document.referrer || '');
  }

  /* ── Header scroll state ─────────────────────────────────────────────── */
  const header = $('[data-header]');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { header?.classList.toggle('is-scrolled', window.scrollY > 12); ticking = false; });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu + submenus ──────────────────────────────────────────── */
  const menuBtn = $('[data-menu]');
  const nav = $('[data-nav]');
  const setMenu = (open) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) $('a, button', nav)?.focus();
  };
  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (menuBtn?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
    $$('[data-sub-toggle][aria-expanded="true"]').forEach((t) => { t.setAttribute('aria-expanded', 'false'); $('#' + t.getAttribute('aria-controls'))?.classList.remove('is-open'); });
  });
  nav?.addEventListener('keydown', (e) => { // focus trap while the mobile sheet is open
    if (e.key !== 'Tab' || !nav.classList.contains('is-open')) return;
    const f = $$('a, button', nav).filter((el) => el.offsetParent !== null);
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); menuBtn.focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); menuBtn.focus(); }
  });
  $$('[data-sub-toggle]').forEach((t) => t.addEventListener('click', () => {
    const open = t.getAttribute('aria-expanded') !== 'true';
    t.setAttribute('aria-expanded', String(open));
    $('#' + t.getAttribute('aria-controls'))?.classList.toggle('is-open', open);
  }));
  nav?.addEventListener('click', (e) => { if (e.target.closest('a[href^="#"]')) setMenu(false); });

  /* ── Reveal on scroll, count-up, CRM drop-in ─────────────────────────── */
  const countUp = (el) => {
    const end = Number(el.dataset.count);
    if (!end || reduced) return;
    const suffix = el.textContent.replace(/[\d\s]/g, '');
    const t0 = performance.now();
    const dur = 1200;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const crm = $('[data-crm]');
  if (crm && !reduced) crm.classList.add('is-armed');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        $$('[data-count]', en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    $$('.reveal, .system__grid, [data-crm]').forEach((el) => io.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  /* ── Hero: typed address in the phone form ───────────────────────────── */
  $$('[data-type-text]').forEach((el) => {
    const text = el.dataset.typeText;
    if (reduced) { el.textContent = text; return; }
    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, i);
      if (i <= text.length) { i += 1; setTimeout(tick, 55 + Math.random() * 60); }
      else setTimeout(() => { i = 0; tick(); }, 4200);
    };
    setTimeout(tick, 1400);
  });

  /* ── Hero: subtle 3D tilt following the pointer (desktop only) ───────── */
  const tilt = $('[data-tilt]');
  if (tilt && !reduced && window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) {
    let raf = 0;
    window.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        tilt.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg');
        tilt.style.setProperty('--rx', (-y * 6).toFixed(2) + 'deg');
      });
    }, { passive: true });
  }

  /* ── Infinite carousel (how it works) ────────────────────────────────── */
  $$('[data-carousel]').forEach((root) => {
    const track = $('[data-carousel-track]', root);
    const slides = $$('[data-slide]', track);
    if (!track || slides.length < 2) return;
    // Clone one full set before and after so the loop has no visible end.
    const mk = (el) => { const c = el.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.setAttribute('inert', ''); c.dataset.clone = ''; return c; };
    slides.forEach((el) => track.appendChild(mk(el)));
    slides.slice().reverse().forEach((el) => track.insertBefore(mk(el), track.firstChild));
    const setW = () => slides[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0);
    const span = () => setW() * slides.length;
    const home = () => { track.style.scrollBehavior = 'auto'; track.scrollLeft = span(); track.style.scrollBehavior = ''; };
    requestAnimationFrame(home);
    window.addEventListener('resize', home, { passive: true });
    let t;
    track.addEventListener('scroll', () => {
      clearTimeout(t);
      t = setTimeout(() => { // after scrolling settles, jump back into the middle set
        const s = span();
        if (track.scrollLeft < s * 0.5) { track.style.scrollBehavior = 'auto'; track.scrollLeft += s; track.style.scrollBehavior = ''; }
        else if (track.scrollLeft > s * 1.5) { track.style.scrollBehavior = 'auto'; track.scrollLeft -= s; track.style.scrollBehavior = ''; }
      }, 120);
    }, { passive: true });
    const go = (dir) => track.scrollBy({ left: dir * setW(), behavior: reduced ? 'auto' : 'smooth' });
    const btns = (sel) => [...$$(sel, root), ...(track.id ? $$(`${sel}[aria-controls="${track.id}"]`) : [])];
    btns('[data-carousel-prev]').forEach((b) => b.addEventListener('click', () => go(-1)));
    btns('[data-carousel-next]').forEach((b) => b.addEventListener('click', () => go(1)));
    track.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
    // Slow autoplay; stops on hover, focus or touch, and never with reduced motion.
    if (reduced) return;
    let paused = false; let visible = false;
    ['pointerenter', 'focusin', 'touchstart'].forEach((ev) => root.addEventListener(ev, () => { paused = true; }, { passive: true }));
    ['pointerleave', 'focusout'].forEach((ev) => root.addEventListener(ev, () => { paused = false; }));
    if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(root);
    setInterval(() => { if (!paused && visible && !document.hidden) go(1); }, 4500);
  });

  /* ── v7: rotating word in the hero ───────────────────────────────────── */
  $$('[data-rotator]').forEach((r) => {
    const words = $$('.rotator__w', r);
    if (reduced || words.length < 2) return;
    let k = 0;
    setInterval(() => {
      const cur = words[k]; k = (k + 1) % words.length; const nxt = words[k];
      cur.classList.remove('is-on'); cur.classList.add('is-out'); cur.setAttribute('aria-hidden', 'true');
      nxt.classList.remove('is-out'); nxt.classList.add('is-on'); nxt.removeAttribute('aria-hidden');
      setTimeout(() => cur.classList.remove('is-out'), 700);
    }, 2400);
  });

  /* ── v7: 3D scenes follow the pointer and the scroll ─────────────────── */
  const scenes = $$('[data-scene]');
  if (scenes.length && !reduced && window.matchMedia('(min-width: 640px)').matches) {
    let px = 0, py = 0, raf2 = 0;
    const paint = () => {
      raf2 = 0;
      scenes.forEach((sc) => {
        const r = sc.getBoundingClientRect();
        const prog = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
        const stage = $('.scene__stage', sc);
        if (stage) stage.style.transform = `rotateX(${(4 - py * 6 + prog * 5).toFixed(2)}deg) rotateY(${(-9 + px * 12).toFixed(2)}deg)`;
      });
    };
    const ask = () => { if (!raf2) raf2 = requestAnimationFrame(paint); };
    if (window.matchMedia('(hover: hover)').matches) window.addEventListener('pointermove', (e) => { px = e.clientX / innerWidth - 0.5; py = e.clientY / innerHeight - 0.5; ask(); }, { passive: true });
    window.addEventListener('scroll', ask, { passive: true });
    ask();
  }

  /* ── v7: spotlight + tilt on cards ───────────────────────────────────── */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    $$('[data-tilt-card]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        el.style.setProperty('--ty', ((x - 0.5) * 7).toFixed(2) + 'deg');
        el.style.setProperty('--tx', (-(y - 0.5) * 7).toFixed(2) + 'deg');
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--tx', '0deg'); el.style.setProperty('--ty', '0deg'); });
    });
    $$('.btn--magnetic').forEach((b) => {
      b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px'); b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1) + 'px'); });
      b.addEventListener('pointerleave', () => { b.style.setProperty('--bx', '0px'); b.style.setProperty('--by', '0px'); });
    });
  }

  /* ── v8: services index — floating preview follows the pointer ──────── */
  const sx = $('[data-sx]');
  if (sx && window.matchMedia('(hover: hover) and (min-width: 900px)').matches) {
    const fl = $('.sx__float', sx); const fim = fl && $('img', fl);
    let x = 0, y = 0, cx = 0, cy = 0, on = false, rafS = 0;
    const loop = () => {
      cx += (x - cx) * 0.16; cy += (y - cy) * 0.16;
      fl.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px) translate(-50%, -50%) rotate(${((x - cx) * 0.02).toFixed(2)}deg)`;
      rafS = (on || Math.abs(x - cx) > 0.5 || Math.abs(y - cy) > 0.5) ? requestAnimationFrame(loop) : 0;
    };
    if (fl && fim) {
      sx.addEventListener('pointermove', (e) => { x = e.clientX + 200; y = e.clientY; }, { passive: true });
      $$('[data-sx-img]', sx).forEach((a) => {
        a.addEventListener('pointerenter', (e) => {
          const th = $('.sx__thumb', a); if (th) fim.src = th.currentSrc || th.src;
          if (!on && !fl.classList.contains('is-on')) { x = cx = e.clientX + 200; y = cy = e.clientY; }
          on = true; fl.classList.add('is-on'); if (!rafS) rafS = requestAnimationFrame(loop);
        });
        a.addEventListener('pointerleave', () => { on = false; fl.classList.remove('is-on'); });
      });
    }
  }

  /* ── v8: process timeline fills as you scroll ────────────────────────── */
  const tls = $$('[data-tl]');
  if (tls.length) {
    let rafT = 0;
    const paintT = () => {
      rafT = 0;
      tls.forEach((w) => {
        const r = w.getBoundingClientRect();
        const p = reduced ? 1 : Math.max(0, Math.min(1, (innerHeight * 0.75 - r.top) / (r.height + innerHeight * 0.15)));
        w.style.setProperty('--tl', p.toFixed(3));
        const steps = $$('.tl__step', w);
        steps.forEach((st, i) => st.classList.toggle('is-on', p >= (steps.length > 1 ? i / (steps.length - 1) : 0) - 0.02));
      });
    };
    window.addEventListener('scroll', () => { if (!rafT) rafT = requestAnimationFrame(paintT); }, { passive: true });
    paintT();
  }

  /* ── v7: scroll progress bar ─────────────────────────────────────────── */
  const bar = $('[data-progress]');
  if (bar) {
    let raf3 = 0;
    const upd = () => { raf3 = 0; const h = document.documentElement.scrollHeight - innerHeight; bar.style.setProperty('--p', h > 0 ? (scrollY / h).toFixed(4) : 0); };
    window.addEventListener('scroll', () => { if (!raf3) raf3 = requestAnimationFrame(upd); }, { passive: true });
    upd();
  }

  /* ── Sticky CTA hides while a form is on screen ──────────────────────── */
  const sticky = $('[data-sticky]');
  const finalCta = $('[data-final-cta]');
  if (sticky && finalCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => sticky.classList.toggle('is-hidden', en.isIntersecting), { threshold: 0.15 }).observe(finalCta);
  }

  /* ── Portfolio filter ────────────────────────────────────────────────── */
  const filters = $('[data-filters]');
  if (filters) {
    filters.addEventListener('click', (e) => {
      const b = e.target.closest('[data-filter]');
      if (!b) return;
      $$('[data-filter]', filters).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const f = b.dataset.filter;
      $$('[data-work-grid] .work').forEach((w) => { w.hidden = f !== 'all' && w.dataset.type !== f; });
    });
  }

  /* ── Lead forms → Utilmo ─────────────────────────────────────────────── */
  const msg = {
    fr: { required: 'Ce champ est obligatoire.', email: 'Entrez un courriel valide (ex. nom@domaine.ca).', url: 'Entrez une adresse complète (https://…).', tel: 'Entrez un numéro de téléphone valide.' },
    en: { required: 'This field is required.', email: 'Enter a valid email (e.g. name@domain.ca).', url: 'Enter a full address (https://…).', tel: 'Enter a valid phone number.' },
  }[cfg.lang === 'en' ? 'en' : 'fr'];

  const validate = (form) => {
    let firstBad = null;
    $$('input, select, textarea', form).forEach((el) => {
      if (el.type === 'hidden' || el.closest('.hp') || el.type === 'checkbox') return;
      const err = form.querySelector('#' + el.id + '-err');
      let m = '';
      if (el.required && !el.value.trim()) m = msg.required;
      else if (el.type === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value)) m = msg.email;
      else if (el.type === 'url' && el.value && !/^https?:\/\/\S+\.\S+/.test(el.value)) m = msg.url;
      else if (el.type === 'tel' && el.value && el.value.replace(/\D/g, '').length < 10) m = msg.tel;
      el.setAttribute('aria-invalid', m ? 'true' : 'false');
      if (err) err.textContent = m;
      if (m && !firstBad) firstBad = el;
    });
    return firstBad;
  };

  // Pre-select package from ?forfait= on the quote page.
  const forfait = params.get('forfait');

  $$('[data-lead-form]').forEach((form) => {
    const type = form.dataset.leadForm;
    if (forfait && type === 'quote') {
      const g = form.querySelector('[name="goal"]');
      if (g && !g.value) g.value = (cfg.lang === 'en' ? 'Package: ' : 'Forfait : ') + forfait;
    }
    // Re-check a flagged field as soon as it is corrected (not on blur: clearing
    // errors on blur reflows the form mid-click and the submit click is lost).
    $$('input, select, textarea', form).forEach((el) => ['input', 'change'].forEach((ev) => el.addEventListener(ev, () => {
      if (el.getAttribute('aria-invalid') !== 'true') return;
      const err = form.querySelector('#' + el.id + '-err');
      const telOk = el.type !== 'tel' || !el.value || el.value.replace(/\D/g, '').length >= 10;
      if (el.checkValidity() && telOk) { el.setAttribute('aria-invalid', 'false'); if (err) err.textContent = ''; }
    })));
    let started = false;
    form.addEventListener('focusin', () => { if (!started) { started = true; track('form_start', { form_type: type }); } });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('[data-form-status]', form);
      status.classList.remove('is-error');
      const bad = validate(form);
      if (bad) { status.textContent = cfg.strings.invalid; status.classList.add('is-error'); bad.focus(); return; }
      if (form.querySelector('[name="company_website"]').value) return; // honeypot

      form.page_url.value = location.href;
      form.referrer.value = store.sget('mw-referrer') || document.referrer || '';
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach((k) => { if (form[k]) form[k].value = store.sget('mw-' + k) || ''; });

      const btn = $('button[type="submit"]', form);
      const label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = cfg.strings.sending;
      status.textContent = cfg.strings.sending;

      try {
        if (cfg.formEndpoint) {
          const res = await fetch(cfg.formEndpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error('HTTP ' + res.status);
        } else {
          console.warn('[mw] formEndpoint is not configured — demo mode, nothing was sent.');
        }
        track('generate_lead', { form_type: type });
        location.href = cfg.thanks + '?type=' + encodeURIComponent(type);
      } catch (err) {
        status.textContent = cfg.strings.error;
        status.classList.add('is-error');
        btn.disabled = false;
        btn.innerHTML = label;
      }
    });
  });

  /* ── Thank-you page: show the matching next step ─────────────────────── */
  const thanksType = params.get('type');
  if (thanksType && $('[data-thanks]')) {
    $$('[data-thanks]').forEach((b) => { b.hidden = b.dataset.thanks !== thanksType; });
  }
})();

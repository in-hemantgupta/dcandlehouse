/**
 * D Candle House — Main JavaScript
 */

(function () {
  'use strict';

  const WA_NUM = '917891029566';
  const WA_BASE = `https://wa.me/${WA_NUM}?text=`;

  /* ══ Utilities ══ */
  function encode(str) { return encodeURIComponent(str); }
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

  /* ══ Header scroll shadow ══ */
  const header = qs('#header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ══ Mobile menu ══ */
  const hamburger = qs('#hamburger');
  const mobileMenu = qs('#mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  qsa('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ══ Smooth scroll for anchor links ══ */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = qs(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* ══ Product Rendering ══ */
  function buildWAMessage(product) {
    return `Hi D Candle House! 👋\n\nI'm interested in ordering:\n*${product.name}*\nPrice: ${product.price}${product.priceUnit}\n\nPlease share availability and order details. Thank you!`;
  }

  function renderProducts(filter) {
    const grid = qs('#productGrid');
    grid.innerHTML = '';
    const list = filter === 'all'
      ? window.PRODUCTS
      : window.PRODUCTS.filter(p => p.category === filter);

    if (list.length === 0) {
      grid.innerHTML = '<p style="text-align:center;color:var(--muted);padding:60px 0;grid-column:1/-1;">No products found in this category.</p>';
      return;
    }

    list.forEach((product, i) => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.setAttribute('data-id', product.id);
      card.setAttribute('data-cat', product.category);
      card.style.animationDelay = `${i * 0.06}s`;

      const waMsg = encode(buildWAMessage(product));
      const badge = product.badge
        ? `<span class="product-badge">${product.badge}</span>`
        : '';

      card.innerHTML = `
        <div class="product-img">
          ${badge}
          <img src="${product.image}" alt="${product.name}" loading="lazy" width="250" height="250" />
        </div>
        <div class="product-body">
          <p class="product-cat">${product.categoryLabel}</p>
          <h3 class="product-name" title="${product.name}">${product.name}</h3>
          <p class="product-price">${product.price}<span>${product.priceUnit}</span></p>
          <div class="product-actions">
            <a class="product-order"
               href="${WA_BASE}${waMsg}"
               target="_blank" rel="noopener"
               onclick="event.stopPropagation()">
              Order Now
            </a>
            <button class="product-detail" onclick="event.stopPropagation();openModal(${product.id})">Details</button>
          </div>
        </div>
      `;
      card.addEventListener('click', () => openModal(product.id));
      grid.appendChild(card);
    });
  }

  /* ══ Filter Pills ══ */
  qsa('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      qsa('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderProducts(pill.dataset.filter);
    });
  });

  /* ══ Footer filter links ══ */
  qsa('[data-filter-link]').forEach(link => {
    link.addEventListener('click', e => {
      const filter = link.dataset.filterLink;
      const pill = qs(`.cat-pill[data-filter="${filter}"]`);
      if (pill) pill.click();
    });
  });

  /* ══ Modal ══ */
  const overlay = qs('#modalOverlay');
  const modalClose = qs('#modalClose');

  window.openModal = function (id) {
    const product = window.PRODUCTS.find(p => p.id === id);
    if (!product) return;

    qs('#modalImg').src = product.image;
    qs('#modalImg').alt = product.name;
    qs('#modalCategory').textContent = product.categoryLabel;
    qs('#modalTitle').textContent = product.name;
    qs('#modalPrice').textContent = product.price + product.priceUnit;
    qs('#modalDesc').textContent = product.desc;

    const specsEl = qs('#modalSpecs');
    specsEl.innerHTML = Object.entries(product.specs)
      .map(([k, v]) => `<div class="spec-row"><strong>${k}</strong><span>${v}</span></div>`)
      .join('');

    const waMsg = encode(buildWAMessage(product));
    qs('#modalWA').href = `${WA_BASE}${waMsg}`;
    qs('#modalIndia').href = product.indiamart || 'https://www.indiamart.com/d-candle-house/';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ══ Contact Form → WhatsApp (link-based, no popup blocker issues) ══ */
  const contactForm = qs('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name    = (contactForm.querySelector('#name').value || '').trim();
      const phone   = (contactForm.querySelector('#phone').value || '').trim();
      const message = (contactForm.querySelector('#message').value || '').trim();

      if (!name || !message) {
        alert('Please fill in your name and message.');
        return;
      }

      const text = [
        'Hi D Candle House! 👋',
        '',
        'Name: ' + name,
        phone ? 'Phone: ' + phone : null,
        '',
        'Message: ' + message
      ].filter(l => l !== null).join('\n');

      // Use anchor click instead of window.open — bypasses popup blockers
      const a = document.createElement('a');
      a.href = WA_BASE + encode(text);
      a.target = '_blank';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Show success, reset form
      const successEl = qs('#formSuccess');
      successEl.style.display = 'block';
      contactForm.reset();
      setTimeout(() => { successEl.style.display = 'none'; }, 5000);
    });
  }

  /* ══ Intersection Observer for fade-in ══ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function observeElements() {
    qsa('.value-item, .contact-item, .about-img-main, .about-img-side img').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /* ══ Init ══ */
  renderProducts('all');
  observeElements();

})();

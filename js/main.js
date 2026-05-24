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
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${product.price}<span>${product.priceUnit}</span></p>
          <div class="product-actions">
            <a class="product-wa"
               href="${WA_BASE}${waMsg}"
               target="_blank" rel="noopener"
               onclick="event.stopPropagation()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
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

  /* ══ Contact Form (Formspree) ══ */
  const contactForm = qs('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          qs('#formSuccess').style.display = 'block';
          contactForm.reset();
          setTimeout(() => { qs('#formSuccess').style.display = 'none'; }, 6000);
        } else {
          alert('Something went wrong. Please reach us on WhatsApp directly.');
        }
      } catch {
        // Fallback to WhatsApp
        const name = contactForm.querySelector('#name').value;
        const msg = contactForm.querySelector('#message').value;
        const waMsg = encode(`Hi D Candle House!\n\nName: ${name}\nMessage: ${msg}`);
        window.open(`${WA_BASE}${waMsg}`, '_blank');
      }

      btn.textContent = originalText;
      btn.disabled = false;
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

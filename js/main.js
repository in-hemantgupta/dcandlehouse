/**
 * D Candle House — Main JS
 * Lookbook sections + image carousel cards + modal gallery
 */

(function () {
  'use strict';

  const WA_NUM  = '917891029566';
  const WA_BASE = `https://wa.me/${WA_NUM}?text=`;

  const qs  = (s, c) => (c || document).querySelector(s);
  const qsa = (s, c) => [...(c || document).querySelectorAll(s)];
  const enc = str   => encodeURIComponent(str);

  /* ══ Header scroll ══ */
  window.addEventListener('scroll', () => {
    qs('#header').classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ══ Mobile menu ══ */
  qs('#hamburger').addEventListener('click', () => {
    qs('#mobileMenu').classList.toggle('open');
  });
  qsa('.mobile-link').forEach(l => l.addEventListener('click', () => qs('#mobileMenu').classList.remove('open')));

  /* ══ Smooth scroll ══ */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const t = qs(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });

  /* ══ WA message builder ══ */
  function waMsg(product) {
    return enc([
      'Hi D Candle House! 👋',
      '',
      'Name: (your name)',
      '',
      'I am interested in:',
      product.name,
      'Price: ' + product.price + product.priceUnit,
      '',
      'Please share availability and details. Thank you!'
    ].join('\n'));
  }

  /* ══ LOOKBOOK SECTION DEFINITIONS ══ */
  const SECTIONS = [
    {
      id:      'resin-clock',
      title:   'Resin Clocks',
      tagline: 'Handcrafted epoxy resin wall clocks — every piece is unique art',
      emoji:   '🕐',
      // Ocean triangle clock — full product visible, beautiful colours
      hero:    'https://5.imimg.com/data5/WA_9696/Default/2026/1/574303523/LT/DL/PW/260299642/image-1767868420-1263-919950269992-1000x1000.jpeg',
      cats:    ['Resin Clock'],
    },
    {
      id:      'candle-jar',
      title:   'Candle Jars',
      tagline: 'Concrete, ceramic & glass jars crafted to hold your light',
      emoji:   '🫙',
      // Concrete bowl jar — clean white background, elegant
      hero:    'https://5.imimg.com/data5/WA_9696/Default/2026/1/575271778/LS/TZ/WZ/260299642/image-1000x1000.jpeg',
      cats:    ['Decorative Candle Jar'],
    },
    {
      id:      'candles',
      title:   'Candles',
      tagline: 'Soy wax, lead-free cotton wicks, beautiful fragrances',
      emoji:   '🕯',
      // Rose jar candle — atmospheric lifestyle shot
      hero:    'https://5.imimg.com/data5/WA_9696/Default/2026/1/573685828/LS/ZV/FS/260299642/image-1000x1000.jpeg',
      cats:    ['Jar Candle', 'Soy Wax Candle', 'Scented Candle'],
    },
    {
      id:      'resin-tray',
      title:   'Resin Trays & Thalis',
      tagline: 'Floral, marble & ocean-inspired epoxy resin art pieces',
      emoji:   '🎨',
      // Marble effect tray — stunning close-up
      hero:    'https://5.imimg.com/data5/WA_9696/Default/2026/1/575543192/DE/TC/XW/260299642/image-1000x1000.jpeg',
      cats:    ['Epoxy Resin Tray', 'Resin Pooja Thali'],
    },
    {
      id:      'other',
      title:   'More from D Candle House',
      tagline: 'Bags, keychains, tables, frames & home décor',
      emoji:   '✨',
      // Ombre clutch bag — vibrant, luxurious
      hero:    'https://5.imimg.com/data5/SELLER/Default/2026/1/575862945/KW/WU/AA/260299642/ombre-resin-clutch-bag-1000x1000.jpeg',
      cats:    ['Clutch Bag', 'Keychain', 'Resin Coaster', 'Resin Table', 'Mantra Frame', 'Other'],
    },
  ];

  /* ══ BUILD CAROUSEL PRODUCT CARD ══ */
  function buildCard(product, idx) {
    const imgs   = product.images && product.images.length ? product.images : [product.image];
    const multi  = imgs.length > 1;
    const badge  = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
    const dots   = multi ? `<div class="carousel-dots">${imgs.map((_, i) =>
      `<span class="cdot${i === 0 ? ' active' : ''}"></span>`).join('')}</div>` : '';

    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.id = product.id;
    card.style.animationDelay = `${idx * 0.05}s`;

    card.innerHTML = `
      <div class="product-img" data-current="0">
        ${badge}
        <div class="carousel-track">
          ${imgs.map((url, i) => `<img src="${url}" alt="${product.name}" loading="lazy" class="carousel-img${i===0?' active':''}" />`).join('')}
        </div>
        ${multi ? `
        <button class="car-btn car-prev" aria-label="Previous">&#8249;</button>
        <button class="car-btn car-next" aria-label="Next">&#8250;</button>` : ''}
        ${dots}
        <div class="product-img-overlay">👁 Quick View</div>
      </div>
      <div class="product-body">
        <p class="product-cat">${product.categoryLabel}</p>
        <h3 class="product-name" title="${product.name}">${product.name}</h3>
        <p class="product-price">${product.price}<span>${product.priceUnit}</span></p>
        <div class="product-actions">
          <a class="product-order"
             href="${WA_BASE}${waMsg(product)}"
             target="_blank" rel="noopener"
             onclick="event.stopPropagation()">Order Now</a>
          <button class="product-detail" onclick="event.stopPropagation();openModal(${product.id})">Details</button>
        </div>
      </div>`;

    /* Carousel logic */
    if (multi) {
      const track  = card.querySelector('.carousel-track');
      const dotsEl = card.querySelectorAll('.cdot');
      const imgEls = card.querySelectorAll('.carousel-img');
      let cur = 0;

      function goTo(n) {
        imgEls[cur].classList.remove('active');
        dotsEl[cur].classList.remove('active');
        cur = (n + imgs.length) % imgs.length;
        imgEls[cur].classList.add('active');
        dotsEl[cur].classList.add('active');
        // lazy load next image
        if (imgEls[(cur+1) % imgs.length].dataset.src) {
          imgEls[(cur+1) % imgs.length].src = imgEls[(cur+1) % imgs.length].dataset.src;
        }
      }

      card.querySelector('.car-prev').addEventListener('click', e => { e.stopPropagation(); goTo(cur - 1); });
      card.querySelector('.car-next').addEventListener('click', e => { e.stopPropagation(); goTo(cur + 1); });

      /* Touch swipe */
      let tx = 0;
      card.querySelector('.product-img').addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
      card.querySelector('.product-img').addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 40) goTo(dx < 0 ? cur + 1 : cur - 1);
      }, { passive: true });
    }

    /* Open modal on card / overlay click */
    card.querySelector('.product-img-overlay').addEventListener('click', () => openModal(product.id));
    card.addEventListener('click', e => {
      if (!e.target.closest('.car-btn, .product-actions, a, button')) openModal(product.id);
    });

    return card;
  }

  /* ══ BUILD LOOKBOOK SECTIONS ══ */
  function renderLookbook() {
    const container = qs('#productGrid');
    if (!container) return;
    container.innerHTML = '';

    SECTIONS.forEach(section => {
      const products = window.PRODUCTS.filter(p =>
        section.cats.includes(p.categoryLabel) ||
        section.cats.includes(p.category)
      );
      if (!products.length) return;

      /* Section wrapper */
      const sec = document.createElement('div');
      sec.className = 'lookbook-section';
      sec.id = `section-${section.id}`;

      /* Hero banner */
      sec.innerHTML = `
        <div class="lookbook-hero">
          <img src="${section.hero}" alt="${section.title}" loading="lazy" />
          <div class="lookbook-hero-overlay">
            <p class="lb-emoji">${section.emoji}</p>
            <h2 class="lb-title">${section.title}</h2>
            <p class="lb-tagline">${section.tagline}</p>
            <span class="lb-count">${products.length} products</span>
          </div>
        </div>
        <div class="lookbook-grid"></div>`;

      const grid = sec.querySelector('.lookbook-grid');
      products.forEach((p, i) => grid.appendChild(buildCard(p, i)));

      container.appendChild(sec);
    });
  }

  /* ══ CATEGORY FILTER (pills still work — scroll to section) ══ */
  qsa('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      qsa('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      if (filter === 'all') {
        qs('#productGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const sec = qs(`#section-${filter}`);
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ══ MODAL with image gallery ══ */
  const overlay    = qs('#modalOverlay');
  const modalClose = qs('#modalClose');
  let currentModalImgs = [];
  let currentModalIdx  = 0;

  window.openModal = function(id) {
    const product = window.PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const imgs = product.images && product.images.length ? product.images : [product.image];
    currentModalImgs = imgs;
    currentModalIdx  = 0;

    qs('#modalCategory').textContent = product.categoryLabel;
    qs('#modalTitle').textContent    = product.name;
    qs('#modalPrice').textContent    = product.price + product.priceUnit;
    qs('#modalDesc').textContent     = product.desc || 'Handcrafted with care in Sri Ganganagar, Rajasthan. Lead-free materials, eco-friendly production.';

    /* Specs */
    const specsEl = qs('#modalSpecs');
    const specEntries = Object.entries(product.specs || {});
    specsEl.innerHTML = specEntries.length
      ? specEntries.map(([k,v]) => `<div class="spec-row"><strong>${k}</strong><span>${v}</span></div>`).join('')
      : '';

    /* Gallery */
    renderModalGallery();

    qs('#modalWA').href    = WA_BASE + waMsg(product);
    qs('#modalIndia').href = product.indiamart || 'https://www.indiamart.com/d-candle-house/';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function renderModalGallery() {
    const mainImg = qs('#modalImg');
    mainImg.src = currentModalImgs[currentModalIdx];

    /* Thumbnails */
    let thumbsEl = qs('#modalThumbs');
    if (!thumbsEl) {
      thumbsEl = document.createElement('div');
      thumbsEl.id = 'modalThumbs';
      thumbsEl.className = 'modal-thumbs';
      qs('.modal-img-wrap').appendChild(thumbsEl);
    }
    thumbsEl.innerHTML = currentModalImgs.map((url, i) =>
      `<img src="${url}" class="modal-thumb${i === currentModalIdx ? ' active' : ''}" data-idx="${i}" loading="lazy" />`
    ).join('');

    qsa('.modal-thumb', thumbsEl).forEach(t => {
      t.addEventListener('click', () => {
        currentModalIdx = parseInt(t.dataset.idx);
        qs('#modalImg').src = currentModalImgs[currentModalIdx];
        qsa('.modal-thumb', thumbsEl).forEach(x => x.classList.remove('active'));
        t.classList.add('active');
      });
    });

    /* Prev / Next arrows on modal image */
    if (currentModalImgs.length > 1) {
      let prevBtn = qs('#modalPrev');
      let nextBtn = qs('#modalNext');
      if (!prevBtn) {
        prevBtn = document.createElement('button');
        prevBtn.id = 'modalPrev'; prevBtn.className = 'modal-nav-btn modal-prev';
        prevBtn.innerHTML = '&#8249;';
        nextBtn = document.createElement('button');
        nextBtn.id = 'modalNext'; nextBtn.className = 'modal-nav-btn modal-next';
        nextBtn.innerHTML = '&#8250;';
        qs('.modal-img-wrap').appendChild(prevBtn);
        qs('.modal-img-wrap').appendChild(nextBtn);
      }
      prevBtn.onclick = () => { currentModalIdx = (currentModalIdx - 1 + currentModalImgs.length) % currentModalImgs.length; renderModalGallery(); };
      nextBtn.onclick = () => { currentModalIdx = (currentModalIdx + 1) % currentModalImgs.length; renderModalGallery(); };
      prevBtn.style.display = nextBtn.style.display = 'flex';
    } else {
      const p = qs('#modalPrev'), n = qs('#modalNext');
      if (p) { p.style.display = 'none'; n.style.display = 'none'; }
    }
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ══ Contact Form → WhatsApp ══ */
  const contactForm = qs('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = (contactForm.querySelector('#name').value    || '').trim();
      const phone   = (contactForm.querySelector('#phone').value   || '').trim();
      const message = (contactForm.querySelector('#message').value || '').trim();
      if (!name || !message) { alert('Please fill in your name and message.'); return; }
      const text = ['Hi D Candle House! 👋','','Name: ' + name, phone ? 'Phone: ' + phone : null,'','Message: ' + message].filter(l => l !== null).join('\n');
      const a = document.createElement('a');
      a.href = WA_BASE + enc(text); a.target = '_blank'; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      qs('#formSuccess').style.display = 'block';
      contactForm.reset();
      setTimeout(() => { qs('#formSuccess').style.display = 'none'; }, 5000);
    });
  }

  /* ══ Intersection fade-in ══ */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  function observeEls() {
    qsa('.value-item, .contact-item, .lookbook-hero').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      observer.observe(el);
    });
  }

  /* ══ Init ══ */
  renderLookbook();
  observeEls();

})();

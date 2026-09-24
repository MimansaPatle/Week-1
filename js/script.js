/* ==========================================================================
   1. Lotus — draws the rotating lotus into every element with class "lotus".
   Optional data attributes: data-speed (seconds), data-stroke, data-c1, data-c2, data-c3
   ========================================================================== */
(function () {
  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs) {
    var node = document.createElementNS(NS, tag);
    for (var key in attrs) {
      node.setAttribute(key, attrs[key]);
    }
    return node;
  }

  function build(host) {
    var d = host.dataset;
    var speed = parseFloat(d.speed || 30);
    var stroke = d.stroke || 'var(--lotus-stroke)';
    var rings = [
      { n: 12, rx: 20, ry: 62, cy: -44, fill: d.c1 || '#f9c3d4', dur: speed, rev: false, off: 0 },
      { n: 10, rx: 17, ry: 50, cy: -34, fill: d.c2 || '#f29bb8', dur: speed * 0.7, rev: true, off: 18 },
      { n: 8, rx: 13, ry: 36, cy: -24, fill: d.c3 || '#e56b93', dur: speed * 0.5, rev: false, off: 22 }
    ];
    var svg = el('svg', { viewBox: '-110 -110 220 220', 'aria-hidden': 'true', focusable: 'false' });

    rings.forEach(function (ring) {
      var g = el('g', { 'class': 'ring' });
      g.style.animation = (ring.rev ? 'lotusSpinRev' : 'lotusSpin') + ' ' + ring.dur + 's linear infinite';
      for (var i = 0; i < ring.n; i++) {
        var petal = el('ellipse', {
          cx: 0, cy: ring.cy, rx: ring.rx, ry: ring.ry, fill: ring.fill, opacity: 0.85,
          'stroke-width': 1.2, transform: 'rotate(' + (ring.off + (360 / ring.n) * i) + ')'
        });
        petal.style.stroke = stroke;
        g.appendChild(petal);
      }
      svg.appendChild(g);
    });

    var core = el('g', { 'class': 'core' });
    core.style.animation = 'lotusBreath 4s ease-in-out infinite';
    core.appendChild(el('circle', { r: 13, fill: '#f7c948' }));
    core.appendChild(el('circle', { r: 6, fill: '#e9a92a' }));
    svg.appendChild(core);

    host.textContent = '';
    host.appendChild(svg);
  }

  document.querySelectorAll('.lotus').forEach(build);
})();

/* ==========================================================================
   2. Mobile menu
   ========================================================================== */
(function () {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('site-menu');

  if (!toggle || !menu) {
    return;
  }

  function setOpen(isOpen) {
    menu.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? 'Close' : 'Menu';
  }

  toggle.addEventListener('click', function () {
    setOpen(!menu.classList.contains('is-open'));
  });

  menu.addEventListener('click', function (event) {
    if (event.target.closest('.nav-link')) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

/* ==========================================================================
   3. Dark / light theme (the saved choice is applied early by theme-init.js)
   ========================================================================== */
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');

  if (!button) {
    return;
  }

  function apply(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  button.hidden = false;

  button.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem('mp-theme', next);
    } catch (error) {}
  });
})();

/* ==========================================================================
   4. Copy-email buttons (hidden until the clipboard API is available)
   ========================================================================== */
(function () {
  var buttons = document.querySelectorAll('[data-copy]');

  if (!buttons.length || !navigator.clipboard || !navigator.clipboard.writeText) {
    return;
  }

  buttons.forEach(function (button) {
    button.hidden = false;
    button.setAttribute('aria-live', 'polite');

    button.addEventListener('click', function () {
      navigator.clipboard.writeText(button.dataset.copy).then(function () {
        var original = button.textContent;
        button.textContent = 'Copied';
        setTimeout(function () {
          button.textContent = original;
        }, 1600);
      });
    });
  });
})();

/* ==========================================================================
   5. Project filter (projects page)
   ========================================================================== */
(function () {
  var group = document.querySelector('[data-filters]');

  if (!group) {
    return;
  }

  var buttons = group.querySelectorAll('[data-filter]');
  var projects = document.querySelectorAll('.project');
  var status = document.getElementById('filter-status');

  group.hidden = false;

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = button.dataset.filter;
      var shown = 0;

      buttons.forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === button));
      });

      projects.forEach(function (project) {
        var match = filter === 'all' || project.dataset.category === filter;
        project.hidden = !match;
        if (match) {
          shown += 1;
        }
      });

      if (status) {
        status.textContent = 'Showing ' + shown + ' of ' + projects.length + ' projects';
      }
    });
  });
})();

/* ==========================================================================
   6. Contact form — no server: the message opens in the visitor's email app
   ========================================================================== */
(function () {
  var form = document.getElementById('contact-form');

  if (!form) {
    return;
  }

  var status = document.getElementById('form-status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();
    var subject = 'Portfolio message from ' + name;
    var body = message + '\n\n' + name + '\n' + email;

    window.location.href = form.dataset.mailto +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    if (status) {
      status.textContent = 'Opening your email app. If nothing happens, email ' + form.dataset.mailto.replace('mailto:', '') + ' directly.';
    }
  });
})();

/* ==========================================================================
   7. Scroll reveal (progressive enhancement)
   ========================================================================== */
(function () {
  var targets = document.querySelectorAll(
    '.section-head, .petal-card, .featured, .cap-grid, .toolbox, .focus, .about-card, .about-intro > *, .stat-grid, ' +
    '.edu, .step, .cert, .also-card, .project, .skill-card, .contact-arch, .contact-form, .cta-row'
  );

  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !targets.length) {
    return;
  }

  function reveal(node) {
    if (!node.hasAttribute('data-reveal') || node.classList.contains('is-revealed')) {
      return;
    }
    observer.unobserve(node);
    node.classList.add('is-revealed');
    // hand the element back to its normal styles once it has faded in
    setTimeout(function () {
      node.removeAttribute('data-reveal');
      node.classList.remove('is-revealed');
      node.style.removeProperty('--reveal-delay');
    }, 900);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        reveal(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  targets.forEach(function (node, index) {
    // anything already on screen at load stays put; only content below the fold animates in
    if (node.getBoundingClientRect().top < window.innerHeight) {
      return;
    }
    node.setAttribute('data-reveal', '');
    node.style.setProperty('--reveal-delay', (index % 3) * 0.08 + 's');
    observer.observe(node);
  });

  // once the bottom of the page is reached (or the window is as tall as the page), nothing may stay hidden
  function revealRest() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      document.querySelectorAll('[data-reveal]').forEach(reveal);
    }
  }
  window.addEventListener('scroll', revealRest, { passive: true });
  window.addEventListener('resize', revealRest);

  document.documentElement.classList.add('reveal-ready');
})();

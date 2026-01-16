// nav-active.js — sets the active nav link based on current URL
(function (){
  function normalizePath(path) {
    if (!path) return 'index.html';
    // remove query and hash
    path = String(path).split('?')[0].split('#')[0];
    // normalize backslashes and slashes
    path = path.replace(/\\/g, '/');
    const parts = path.split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1] : 'index.html';
  }

  function markActive() {
    const links = document.querySelectorAll('nav a');
    if (!links.length) return;

    const current = normalizePath(window.location.pathname);

    // clear existing
    links.forEach(l => {
      l.classList.remove('active');
      l.removeAttribute('aria-current');
    });

    let matched = false;

    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      // ignore non-navigation links
      if (href.startsWith('mailto:') || href.startsWith('javascript:')) return;

      let linkPath;
      try {
        const url = new URL(href, window.location.href);
        linkPath = normalizePath(url.pathname);
      } catch (err) {
        // fallback for hashes or plain filenames
        if (href.startsWith('#')) {
          // choose not to match hashes here; will try later
          linkPath = null;
        } else {
          linkPath = normalizePath(href);
        }
      }

      if (!matched && linkPath && linkPath === current) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        matched = true;
      }
    });

    // if none matched, try matching by hash (e.g., link href="#menu")
    if (!matched && window.location.hash) {
      links.forEach(link => {
        if (link.getAttribute('href') === window.location.hash) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
          matched = true;
        }
      });
    }
  }

  // run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markActive);
  } else {
    markActive();
  }

  // also update on history navigation
  window.addEventListener('popstate', markActive);
})();
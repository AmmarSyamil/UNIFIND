(function(){
  // Simple session guard for pages that do not use the layout.
  // It calls /auth/me on the backend and redirects to /login when session invalid.
  try {
    const backend = window.UNIFIND_BACKEND || 'http://localhost:3000';
    const path = location.pathname || '/';
    const allow = (p) => p === '/' || p.startsWith('/login') || p.startsWith('/signup');
    if (allow(path)) return;

    const timeoutMs = 2000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    fetch(backend + '/auth/me', { credentials: 'include', signal: controller.signal })
      .then(r => {
        clearTimeout(id);
        if (!r.ok) {
          try { localStorage.removeItem('sessionUser'); } catch(e) {}
          location.replace('/login');
        }
      })
      .catch(err => {
        clearTimeout(id);
        try { localStorage.removeItem('sessionUser'); } catch(e) {}
        location.replace('/login');
      });
  } catch (e) {
    try { localStorage.removeItem('sessionUser'); } catch(e) {}
    location.replace('/login');
  }
})();

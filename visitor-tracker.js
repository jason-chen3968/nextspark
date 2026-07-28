/**
 * nextSpark — visitor tracker (frontend half)
 * --------------------------------------------
 * Fires a single, invisible request to the backend when the page loads.
 * No UI, no visible count on the page — this only talks to /api/track
 * on the server (see server.js).
 *
 * If the backend isn't running (e.g. you just opened the HTML file
 * directly in a browser), this fails silently and the page still works.
 */
(function () {
  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer || 'direct',
      }),
      keepalive: true,
    }).catch(function () {
      // backend not running / offline — ignore, page still works
    });
  } catch (e) {
    // fetch not available or blocked — ignore
  }
})();

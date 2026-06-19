// =====================================================
// To remove session functionality, just remove:
// <script src="js/session.js" defer></script>
// =====================================================

(function () {

  const LAST_VISIT_KEY = "koi_last_visit";
  const REDIRECT_TARGET_KEY = "koi_redirect_target";
  const TIMEOUT_HOURS = 6; // 6 hours

  const now = Date.now();
  const path = window.location.pathname;
  const isIndex = path.endsWith("index.html");

  const lastVisitRaw = localStorage.getItem(LAST_VISIT_KEY);

  // ==================== FIRST TIME USER ====================
  if (!lastVisitRaw) {
  
    localStorage.setItem(LAST_VISIT_KEY, now);
  
    const intendedPage =
      path + window.location.search + window.location.hash;
  
    localStorage.setItem(REDIRECT_TARGET_KEY, intendedPage);
  
    // Save CURRENT page as return target
    if (!isIndex) {
      window.location.href = "index.html";
      return;
    }
  
    return;
  }

  // ==================== TIMEOUT CHECK ====================
  const lastVisit = Number(lastVisitRaw);
  const diff = now - lastVisit;
  const timeoutMs = TIMEOUT_HOURS * 60 * 60 * 1000;

  const isTimedOut = diff > timeoutMs;

  if (isTimedOut && !isIndex) {

    // Save CURRENT page as return target
    localStorage.setItem(
      REDIRECT_TARGET_KEY,
      path + window.location.search + window.location.hash
    );

    window.location.href = "index.html";
    return;
  }

  // ==================== NORMAL VISIT ====================
  localStorage.setItem(LAST_VISIT_KEY, now);

})();
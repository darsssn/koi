// sidebar.js
function renderSidebarStatic() {
  const sidebar = document.querySelector(".app-sidebar");

  if (!sidebar) return;

  // Insert static brand + wrapper structure
  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <a href="draft.html" class="brand-link">
        <img src="assets/img/Koi_logo.png" class="brand-image opacity-75 shadow"/>
        <span class="brand-text fw-light">KOI</span>
      </a>
    </div>

    <div class="sidebar-wrapper">
      <nav class="mt-2">
        <ul class="nav sidebar-menu flex-column"
            data-lte-toggle="treeview"
            role="navigation"
            data-accordion="false"
            id="sidebarLinks">
          <!-- Sidebar links will be injected by navigation.js -->
        </ul>
      </nav>
    </div>
  `;
}

// navbar.js
function renderNavbarStatic() {
  const navbar = document.querySelector(".app-header .container-fluid");

  if (!navbar) return;

  // Insert static navbar elements around the dynamic container
  navbar.innerHTML = `
    <ul class="navbar-nav">
      <!-- Sidebar toggle stays static -->
      <li class="nav-item">
        <a class="nav-link" data-lte-toggle="sidebar" href="#" role="button" onclick="sidebarToggle()">
          <i class="bi bi-list"></i>
        </a>
      </li>

      <!-- Dynamic navbar links will be injected here -->
      <span id="navbarLinks" class="d-flex"></span>
    </ul>

    <ul class="navbar-nav ms-auto">
      <!-- Notifications -->
      <li class="nav-item dropdown">
        <a id="notifBell" class="nav-link disabled" data-bs-toggle="dropdown" href="#">
          <i class="bi bi-bell-fill"></i>
          <span id="notifBadge" class="navbar-badge badge text-bg-warning"></span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
          <span class="dropdown-item dropdown-header">Errors & Notifications</span>
          <div class="dropdown-divider"></div>
          <!-- This is the dynamic container -->
          <div id="notifList"></div>
        </div>
      </li>

      <!-- Theme toggle -->
      <li class="nav-item dropdown">
        <button
          class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center"
          id="bd-theme"
          type="button"
          aria-expanded="false"
          data-bs-toggle="dropdown"
          data-bs-display="static"
        >
          <span class="theme-icon-active"> <i class="my-1"></i> </span>
          <span class="d-lg-none ms-2" id="bd-theme-text">Toggle theme</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme-text" style="--bs-dropdown-min-width: 8rem">
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="light" aria-pressed="false">
              <i class="bi bi-sun-fill me-2"></i>
              Light
              <i class="bi bi-check-lg ms-auto d-none"></i>
            </button>
          </li>
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
              <i class="bi bi-moon-fill me-2"></i>
              Dark
              <i class="bi bi-check-lg ms-auto d-none"></i>
            </button>
          </li>
        </ul>
      </li>

      <!-- Fullscreen toggle -->
      <li class="nav-item">
        <a class="nav-link" href="#" data-lte-toggle="fullscreen">
          <i data-lte-icon="maximize" class="bi bi-arrows-fullscreen"></i>
          <i data-lte-icon="minimize" class="bi bi-fullscreen-exit" style="display: none"></i>
        </a>
      </li>
    </ul>
  `;
}
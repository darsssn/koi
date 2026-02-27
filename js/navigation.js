// Define navigation structure
const NAVIGATION = {
  findings_tools: {
    sidebar: { text: "Findings Tools", href: "draft.html", icon: "bi-tools" },
    pages: ["draft.html", "draft_1.html", "draft_2.html", "draft_3.html", "draft_4.html", "kql.html", "merger.html", "sanitizer.html", "extractor.html", "splunk_parser.html", "text_editor.html"],
    navbar: [
      { text: "Draft", href: "draft.html" },
      { text: "KQL", href: "kql.html" },
      { text: "Merge", href: "merger.html" },
      { text: "Sanitize", href: "sanitizer.html" },
      { text: "Extract", href: "extractor.html" },
      { text: "Splunk Parser", href: "splunk_parser.html" },
      { text: "Text Editor", href: "text_editor.html" },
    ]
  },

  extractors: {
    sidebar: { text: "Extractors", href: "extract_userinfo.html", icon: "bi-code-slash" },
    pages: ["extract_userinfo.html", "extract_deviceinfo.html"],
    navbar: [
      { text: "User Info", href: "extract_userinfo.html" },
      { text: "Device Info", href: "extract_deviceinfo.html" }
    ]
  },

  miscellaneous: {
    sidebar: { text: "Miscellaneous", href: "otp_tool_v2.html", icon: "bi-columns-gap" },
    pages: ["otp_tool_v2.html", "csv_parser.html"],
    navbar: [
      { text: "OTP Script", href: "otp_tool_v2.html" },
      { text: "CSV Parser", href: "csv_parser.html" }
    ]
  },

  otp_generator: {
    sidebar: { text: "OTP Generator", href: "otp_generator.html", icon: "bi-key" },
    pages: ["otp_generator.html"],
    navbar: [
      { text: "OTP Generator", href: "otp_generator.html" }
    ]
  }
};

// Detect current page
let currentPage = window.location.pathname.split("/").pop();
if (currentPage === "") currentPage = "index.html";

// Determine current section based on the current page
let currentSection = null;

for (const section in NAVIGATION) {
  if (NAVIGATION[section].pages.includes(currentPage)) {
    currentSection = section;
    break;
  }
}

// Render sidebar navigation
function renderSidebar() {
  const container = document.getElementById("sidebarLinks");

  for (const section in NAVIGATION) {
    const item = NAVIGATION[section].sidebar;

    const isActive = NAVIGATION[section].pages.includes(currentPage);
    const activeClass = isActive ? "active" : "";

    container.innerHTML += `
      <li class="nav-item">
        <a href="${item.href}" class="nav-link ${activeClass}">
          <i class="nav-icon bi ${item.icon}"></i>
          <p>${item.text}</p>
        </a>
      </li>
    `;
  }
}

// Render top navbar links based on the current section
function renderNavbar() {
  const container = document.getElementById("navbarLinks");

  if (!currentSection) return;

  NAVIGATION[currentSection].navbar.forEach(link => {
    let activeClass = "";
    
    if (link.href === currentPage) {
      activeClass = "active";
    }
    
    // Special handling for draft group
    if (link.href === "draft.html" && currentPage.startsWith("draft_")) {
      activeClass = "active";
    }

    container.innerHTML += `
      <li class="nav-item d-none d-md-block">
        <a href="${link.href}" class="nav-link ${activeClass}">
          ${link.text}
        </a>
      </li>
    `;
  });
}

// Initialize navigation on page load
document.addEventListener("DOMContentLoaded", function () {
  renderSidebarStatic();
  renderNavbarStatic();
  renderSidebar();
  renderNavbar();
});
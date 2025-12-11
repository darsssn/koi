function sidebarToggle() {
  // Wait for AdminLTE to finish toggling classes
  setTimeout(() => {
    const isOpen = document.body.classList.contains("sidebar-open");
    const isCollapsed = document.body.classList.contains("sidebar-collapse");

    if (isOpen && !isCollapsed) {
      localStorage.setItem("koi_sidebarState", "open");
    } else {
      localStorage.setItem("koi_sidebarState", "closed");
    }
  }, 10);
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("koi_sidebarState");

  if (saved === "open") {
    document.body.classList.add("sidebar-open");
    document.body.classList.remove("sidebar-collapse");
  }

  if (saved === "closed") {
    document.body.classList.add("sidebar-collapse");
    document.body.classList.remove("sidebar-open");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Reveal sections on scroll
  const sections = document.querySelectorAll(".section");
  function revealSections() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        section.classList.add("visible");
      }
    });
  }
  window.addEventListener("scroll", revealSections);
  revealSections();

  // Set copyright year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Theme toggle logic
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (themeToggle) {
    // Load theme from localStorage
    if (localStorage.getItem("theme") === "light") {
      body.classList.add("light");
      themeToggle.textContent = "🌙";
    } else {
      themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", function () {
      body.classList.toggle("light");
      if (body.classList.contains("light")) {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
      } else {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
      }
    });
  }
});
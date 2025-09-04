document.addEventListener("DOMContentLoaded", function () {
  // Enhanced reveal sections on scroll with intersection observer
  const sections = document.querySelectorAll(".section");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Set copyright year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Enhanced theme toggle logic with smooth transitions
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (themeToggle) {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
      body.classList.add("light");
      themeToggle.textContent = "🌙";
    } else {
      themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", function () {
      // Add transition class for smooth theme switching
      body.style.transition = "background-color 0.3s ease, color 0.3s ease";
      
      body.classList.toggle("light");
      if (body.classList.contains("light")) {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
      } else {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
      }
      
      // Remove transition after animation completes
      setTimeout(() => {
        body.style.transition = "";
      }, 300);
    });
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading animation for buttons
  const buttons = document.querySelectorAll('.cta-btn, .pricing-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Add ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add counter animation for hero stats
  const statNumbers = document.querySelectorAll('.stat-number');
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + (target === 99.9 ? '.9%' : target === 10 ? 'x' : 'k+');
    }, 30);
  };

  // Trigger counter animation when stats come into view
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target;
        const text = statNumber.textContent;
        if (text.includes('10x')) {
          animateCounter(statNumber, 10);
        } else if (text.includes('50k+')) {
          animateCounter(statNumber, 50);
        } else if (text.includes('99.9%')) {
          animateCounter(statNumber, 99.9);
        }
        statsObserver.unobserve(statNumber);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
});
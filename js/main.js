document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for nav
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Active nav on scroll
  const sections = document.querySelectorAll("section[id]");
  const header = document.querySelector(".site-header");

  function updateActiveNav() {
    const scrollY = window.scrollY;
    const headerHeight = header ? header.offsetHeight : 0;

    let currentId = "home";
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      if (scrollY >= top - headerHeight - 60) currentId = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // Language toggle
  const langButtons = document.querySelectorAll(".lang-btn");

  function setLanguage(lang) {
    try { localStorage.setItem("mn_lang", lang); } catch (_) {}
    applyTranslations(lang);

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
  });

  let initialLang = "en";
  try {
    const stored = localStorage.getItem("mn_lang");
    if (stored && translations[stored]) initialLang = stored;
  } catch (_) {}
  setLanguage(initialLang);

  // Demo bars audio player
  const player = document.getElementById("demoPlayer");
  const bars = document.querySelectorAll(".demo-bar");
  let currentBar = null;

  function setBarState(bar, isPlaying) {
    const icon = bar.querySelector(".demo-icon");
    bar.classList.toggle("is-playing", isPlaying);
    if (icon) icon.textContent = isPlaying ? "❚❚" : "▶";
  }

  function stopCurrent() {
    if (player) {
      player.pause();
      player.currentTime = 0;
    }
    if (currentBar) setBarState(currentBar, false);
    currentBar = null;
  }

  if (player && bars.length) {
    player.addEventListener("ended", () => {
      if (currentBar) setBarState(currentBar, false);
      currentBar = null;
    });

    bars.forEach((bar) => {
      bar.addEventListener("click", async () => {
        const src = bar.getAttribute("data-audio");
        if (!src) return;

        // Toggle play/pause if same bar
        if (currentBar === bar) {
          if (player.paused) {
            try {
              await player.play();
              setBarState(bar, true);
            } catch (_) {
              setBarState(bar, false);
            }
          } else {
            player.pause();
            setBarState(bar, false);
          }
          return;
        }

        // Play new demo
        stopCurrent();
        currentBar = bar;
        player.src = src;

        try {
          await player.play();
          setBarState(bar, true);
        } catch (_) {
          setBarState(bar, false);
          currentBar = null;
        }
      });
    });
  }
});

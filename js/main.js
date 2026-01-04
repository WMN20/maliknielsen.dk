document.addEventListener("DOMContentLoaded", () => {
  // ============================================================
  // EDIT THIS CATALOG (easy to find + easy to change)
  //
  // Add your YouTube links here. Each item becomes a card.
  // type: "fandub" or "cover"
  //
  // TIP: title_en/title_dk can be the same if you want.
  // ============================================================
  const VOICE_CATALOG = [
    // -------------------------
    // FANDUBS
    // -------------------------
    {
      type: "fandub",
      title_en: "Undertale Dub – Omega Flowey Boss Fight",
      title_dk: "Undertale Dub – Omega Flowey Boss Fight",
      url: "https://www.youtube.com/watch?v=GRsfJYKtVrs"
    },
    {
      type: "fandub",
      title_en: "Final Fantasy XV Fandub – Ardyn Reveals His True Self",
      title_dk: "Final Fantasy XV Fandub – Ardyn afslører sit sande jeg",
      url: "https://www.youtube.com/watch?v=SVtQwiDIwMA"
    },
    {
      type: "fandub",
      title_en: "Batman Arkham Knight – Scarecrow Fandub",
      title_dk: "Batman Arkham Knight – Scarecrow Fandub",
      url: "https://www.youtube.com/watch?v=4qcWle20Aw8"
    },

    // -------------------------
    // COVERS
    // -------------------------
    {
      type: "cover",
      title_en: "“Oogie Boogie’s Song” (Cover) – The Nightmare Before Christmas",
      title_dk: "“Oogie Boogie’s Song” (Cover) – The Nightmare Before Christmas",
      url: "https://www.youtube.com/watch?v=Qggp_cHXwvo"
    },
    {
      type: "cover",
      title_en: "Nuclear (Cover) – By Malik Nielsen",
      title_dk: "Nuclear (Cover) – Af Malik Nielsen",
      url: "https://www.youtube.com/watch?v=ZSsM2eSn1ws"
    }
  ];

  // ------------------------
  // Helpers
  // ------------------------
  function getCurrentLang() {
    try {
      const stored = localStorage.getItem("mn_lang");
      if (stored === "dk" || stored === "en") return stored;
    } catch (_) {}
    return "en";
  }

  function extractYouTubeId(url) {
    // Supports: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/shorts/ID
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "").trim();
      if (u.pathname.includes("/shorts/")) return u.pathname.split("/shorts/")[1]?.split(/[?&/]/)[0];
      return u.searchParams.get("v");
    } catch (_) {
      return null;
    }
  }

  function getYouTubeThumb(videoId) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

  // ------------------------
  // Render "My Voice" catalog
  // ------------------------
  const voiceGrid = document.getElementById("voiceGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function renderCatalog(filter) {
    if (!voiceGrid) return;

    const lang = getCurrentLang();
    const items = (VOICE_CATALOG || []).filter((item) => {
      if (!filter || filter === "all") return true;
      return item.type === filter;
    });

    voiceGrid.innerHTML = "";

    items.forEach((item) => {
      const id = extractYouTubeId(item.url);
      const title =
        lang === "dk"
          ? (item.title_dk || item.title_en || "")
          : (item.title_en || item.title_dk || "");

      const typeLabel =
        item.type === "cover"
          ? (lang === "dk" ? "Cover" : "Cover")
          : (lang === "dk" ? "Fandub" : "Fandub");

      const card = document.createElement("article");
      card.className = "voice-card";

      if (!id) {
        // Fallback if URL is not YouTube or parsing fails
        card.innerHTML = `
          <div class="voice-card-body">
            <div class="voice-type">${typeLabel}</div>
            <h3 class="voice-title">${title}</h3>
            <a class="voice-link" href="${item.url}" target="_blank" rel="noopener">
              ${lang === "dk" ? "Åbn link" : "Open link"}
            </a>
          </div>
        `;
        voiceGrid.appendChild(card);
        return;
      }

      const thumb = getYouTubeThumb(id);

      card.innerHTML = `
        <a class="voice-thumb" href="${item.url}" target="_blank" rel="noopener" aria-label="${title}">
          <img src="${thumb}" alt="${title}" loading="lazy" />
          <span class="voice-play" aria-hidden="true">▶</span>
        </a>
        <div class="voice-card-body">
          <div class="voice-type">${typeLabel}</div>
          <h3 class="voice-title">${title}</h3>
          <a class="voice-link" href="${item.url}" target="_blank" rel="noopener">
            ${lang === "dk" ? "Se på YouTube" : "Watch on YouTube"}
          </a>
        </div>
      `;

      voiceGrid.appendChild(card);
    });
  }

  function setFilter(filter) {
    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === filter);
    });
    renderCatalog(filter);
  }

  if (filterButtons.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => setFilter(btn.getAttribute("data-filter")));
    });
  }

  // ------------------------
  // Smooth scroll for nav
  // ------------------------
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

  // ------------------------
  // Language toggle
  // ------------------------
  const langButtons = document.querySelectorAll(".lang-btn");

  function setLanguage(lang) {
    try { localStorage.setItem("mn_lang", lang); } catch (_) {}
    applyTranslations(lang);

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Re-render catalog to switch titles
    renderCatalog(document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "all");
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

  // Initial render of catalog
  setFilter("all");

  // ------------------------
  // Demo bars audio player
  // ------------------------
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

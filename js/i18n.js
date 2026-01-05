const translations = {
  en: {
    "brand.role": "Voice Actor",

    "nav.home": "Home",
    "nav.about": "About me",
    "nav.voice": "My voice",
    "nav.equipment": "Equipment",
    "nav.contact": "Contact me",

    "hero.kicker": "Danish / English voice actor",
    "hero.title": "Voice acting for games, animation, and other creative projects.",
    "hero.subtitle": "Voice acting for games, animation, and other creative projects.",
    "hero.cta": "Get in touch",
    "hero.cta2": "Other projects",

    "demos.title": "Demos",
    "demos.character": "Character – Demo",
    "demos.commercial": "Commercial – Demo",
    "demos.videogame": "Video Game – Demo",
    "demos.danish": "Danish – Demo",

    "about.title": "About me",
    "about.p1": "My name is Malik Nielsen, and I work as a voice actor in both English and Danish. I provide voices for a range of characters and other types of projects.",
    "about.p2": "I started working with voice acting in 2022 under a different name. What began as a hobby through my own projects on YouTube and collaborations with others has since grown into something I approach more professionally.",
    "about.p3": "I work with the types of projects listed on this site — including games, animation, dubbing, audiobooks, and commercials — and I’m also open to other kinds of work. When recording a role, I focus on following the director’s instructions and making sure the character fits the scene and project as intended.",
    "about.p4": "If you’re looking for a voice for a project and want to work with someone who takes the job seriously, feel free to get in touch.",

    "about.cardTitle": "Services Offered",
    "about.s1": "Video games",
    "about.s2": "Animation",
    "about.s3": "Dubbing",
    "about.s4": "Audiobook",
    "about.s5": "Commercials",

    "more.title": "My voice",
    "more.subtitle": "Here you’ll find some of my fandubs, Covers, and other projects.",

    "more.filter.all": "All",
    "more.filter.fandubs": "Fandubs",
    "more.filter.covers": "Covers",

    "equip.title": "Equipment",
    "equip.subtitle": "I use a reliable setup for clean, consistent recordings.",
    "equip.mic.label": "Microphone",
    "equip.mic.value": "AKG Pro Audio C214",
    "equip.iface.label": "Interface",
    "equip.iface.value": "Focusrite Scarlett Solo (4th Gen)",
    "equip.daw.label": "Digital Audio Workspace",
    "equip.daw.value": "Audacity / REAPER",

    "contact.title": "Contact me",
    "contact.subtitle": "If you want to book me, collaborate, or just ask a question — feel free to reach out.",
    "contact.emailLabel": "Email:",
    "contact.emailValue": "contact@maliknielsen.dk",
    "contact.emailHref": "mailto:contact@maliknielsen.dk",
    "contact.socials": "Socials",

    "more.toggle.more": "Show more",
    "more.toggle.less": "Show less",


    "footer": "© 2025 Malik Nielsen"
  },

  dk: {
    "brand.role": "Stemmeskuespiller",

    "nav.home": "Forside",
    "nav.about": "Om mig",
    "nav.voice": "Min stemme",
    "nav.equipment": "Udstyr",
    "nav.contact": "Kontakt mig",

    "hero.kicker": "Dansk / engelsk stemmeskuespiller",
    "hero.title": "Stemmeskuespil til spil, animation og kreative projekter",
    "hero.subtitle": "Stemmeskuespil til spil, animation og kreative projekter.",
    "hero.cta": "Kontakt mig",
    "hero.cta2": "Andre projekter",

    "demos.title": "Demoer",
    "demos.character": "Karakter – Demo",
    "demos.commercial": "Reklame – Demo",
    "demos.videogame": "Videospil – Demo",
    "demos.danish": "Dansk – Demo",

    "about.title": "Om mig",
    "about.p1": "Jeg hedder Malik Nielsen og arbejder som stemmeskuespiller på både engelsk og dansk. Jeg lægger stemme til forskellige karakterer og andre typer projekter.",
    "about.p2": "Jeg startede med voice acting i 2022 under et andet navn. Det begyndte som en hobby gennem egne projekter på YouTube og samarbejder med andre, og er siden blevet noget, jeg går mere professionelt til.",
    "about.p3": "Jeg arbejder med de typer opgaver, der er nævnt her på siden — blandt andet spil, animation, dubbing, lydbøger og reklamer — men er også åben for andre projekter. Når jeg arbejder på en rolle, forsøger jeg at følge de instruktioner, jeg får fra instruktøren, og få karakteren til at fungere i den sammenhæng, den er tænkt til.",
    "about.p4": "Hvis du leder efter en stemme til et projekt og har brug for en stemmeskuespiller, der tager arbejdet seriøst, er du velkommen til at tage kontakt.",

    "about.cardTitle": "Ydelser",
    "about.s1": "Videospil",
    "about.s2": "Animation",
    "about.s3": "Dubbing",
    "about.s4": "Lydbog",
    "about.s5": "Reklamer",

    "more.title": "Min stemme",
    "more.subtitle": "Her finder du nogle af mine fandubs, covers og andre projekter.",

    "more.filter.all": "Alle",
    "more.filter.fandubs": "Fandubs",
    "more.filter.covers": "Covers",

    "equip.title": "Udstyr",
    "equip.subtitle": "Jeg bruger et stabilt setup til rene og ensartede optagelser.",
    "equip.mic.label": "Mikrofon",
    "equip.mic.value": "AKG Pro Audio C214",
    "equip.iface.label": "Interface",
    "equip.iface.value": "Focusrite Scarlett Solo (4th Gen)",
    "equip.daw.label": "Digital Audio Workspace",
    "equip.daw.value": "Audacity / REAPER",

    "contact.title": "Kontakt mig",
    "contact.subtitle": "Hvis du vil booke mig, samarbejde, eller bare spørge om noget — så skriv endelig.",
    "contact.emailLabel": "Email:",
    "contact.emailValue": "kontakt@maliknielsen.dk",
    "contact.emailHref": "mailto:kontakt@maliknielsen.dk",
    "contact.socials": "Sociale medier",

    "more.toggle.more": "Vis mere",
    "more.toggle.less": "Vis mindre",


    "footer": "© 2025 Malik Nielsen"
  }
};

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll("[data-i18n-href]").forEach((el) => {
    const key = el.getAttribute("data-i18n-href");
    if (dict[key] !== undefined) el.setAttribute("href", dict[key]);
  });

  const form = document.querySelector("#contactForm");
  if (form) {
    const actionKey = form.getAttribute("data-i18n-href-action");
    if (actionKey && dict[actionKey] !== undefined) form.setAttribute("action", dict[actionKey]);
  }

  document.documentElement.setAttribute("lang", lang === "dk" ? "da" : "en");
}


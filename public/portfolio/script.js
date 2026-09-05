/* =========================================================
   Aashika Sana.A — Student Portfolio
   script.js — all interactivity, plain JavaScript
   -----------------------------------------------------
   EASY EDIT AREA is at the top: change your skills,
   projects and achievements there. Nothing else needed.
   ========================================================= */

/* ============ 1. EDITABLE CONTENT =============== */

/* Typing animation lines under your name (hero section) */
const TYPING_TEXTS = [
  "B.Sc. Computer Science with Data Analytics Student",
  "Web Development Enthusiast",
  "Aspiring Data Analyst",
];

/* EDIT YOUR SKILLS AND PERCENTAGES HERE */
const SKILLS = [
  {
    name: "HTML",
    icon: "&lt;/&gt;",
    percent: 90, // change the number to change the bar
    description: "Semantic, accessible page structure and clean responsive markup.",
  },
  {
    name: "JavaScript",
    icon: "JS",
    percent: 80,
    description: "DOM manipulation, events and interactive front-end behaviour.",
  },
  {
    name: "PHP",
    icon: "PHP",
    percent: 75,
    description: "Server-side scripting basics, forms handling and dynamic pages.",
  },
  {
    name: "C Programming",
    icon: "C",
    percent: 80,
    description: "Problem solving, logic building, arrays, pointers and functions.",
  },
];

/* ADD YOUR PROJECTS HERE (copy a block to add more) */
const PROJECTS = [
  {
    icon: "📊",
    title: "Student Performance Dashboard",
    description:
      "Add your project description here — what it does, the data it shows and what you learned while building it.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "#", // replace # with your live demo or GitHub link
  },
  {
    icon: "📈",
    title: "Data Analytics Project",
    description:
      "Add your project description here — the dataset you used, the questions you explored and the results you found.",
    tags: ["Data Analytics"],
    link: "#",
  },
  {
    icon: "🌐",
    title: "Web Development Project",
    description:
      "Add your project description here — the pages you built, the features included and the technologies you practised.",
    tags: ["HTML", "JavaScript", "PHP"],
    link: "#",
  },
];

/* ADD YOUR ACHIEVEMENTS HERE (leave the list as-is until you have some) */
const ACHIEVEMENTS = [
  {
    icon: "📜",
    title: "Certifications",
    description: "More achievements and certifications will be added soon.",
  },
  {
    icon: "🛠️",
    title: "Workshops & Hackathons",
    description: "More achievements and certifications will be added soon.",
  },
  {
    icon: "🤝",
    title: "Clubs & Volunteering",
    description: "More achievements and certifications will be added soon.",
  },
];

/* ============ 2. SMALL HELPERS =============== */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/* ============ 3. BUILD SKILL CARDS =============== */
function renderSkills() {
  const grid = $("#skillsGrid");
  if (!grid) return;

  grid.innerHTML = SKILLS.map(
    (skill) => `
    <article class="card skill-card reveal">
      <div class="skill-top">
        <span class="skill-ico" aria-hidden="true">${skill.icon}</span>
        <h3 class="skill-name">${skill.name}</h3>
      </div>
      <p class="skill-desc">${skill.description}</p>
      <div class="skill-meter"><span>Proficiency</span><b>${skill.percent}%</b></div>
      <div class="bar-track" role="progressbar" aria-label="${skill.name} proficiency"
           aria-valuenow="${skill.percent}" aria-valuemin="0" aria-valuemax="100">
        <div class="bar-fill" data-percent="${skill.percent}"></div>
      </div>
    </article>`
  ).join("");
}

/* ============ 4. BUILD PROJECT CARDS =============== */
function renderProjects() {
  const grid = $("#projectsGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(
    (project) => `
    <article class="card project-card reveal">
      <div class="project-thumb" aria-hidden="true">${project.icon}</div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tags">${project.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <a class="btn btn-ghost btn-sm" href="${project.link}"
         ${project.link.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>View Project</a>
    </article>`
  ).join("");

  // Clicking anywhere on a card follows its "View Project" link
  $$(".project-card", grid).forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return; // the button handles its own click
      const link = $("a", card);
      if (link && link.getAttribute("href") !== "#") link.click();
    });
  });
}

/* ============ 5. BUILD ACHIEVEMENT CARDS =============== */
function renderAchievements() {
  const grid = $("#achievementsGrid");
  if (!grid) return;

  grid.innerHTML = ACHIEVEMENTS.map(
    (item) => `
    <article class="card ach-card reveal">
      <span class="ach-ico" aria-hidden="true">${item.icon}</span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>`
  ).join("");
}

/* ============ 6. TYPING ANIMATION =============== */
function startTyping() {
  const target = $("#typedText");
  if (!target) return;

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const line = TYPING_TEXTS[lineIndex];
    charIndex += deleting ? -1 : 1;
    target.textContent = line.slice(0, charIndex);

    let delay = deleting ? 35 : 65;

    if (!deleting && charIndex === line.length) {
      deleting = true;
      delay = 1800; // pause when the line is complete
    } else if (deleting && charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % TYPING_TEXTS.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  }
  tick();
}

/* ============ 7. SCROLL REVEAL + SKILL BARS =============== */
function setupScrollReveal() {
  const items = $$(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");

        // Animate any skill bars inside this card
        $$(".bar-fill", entry.target).forEach((bar) => {
          bar.style.width = bar.dataset.percent + "%";
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

/* ============ 8. NAVIGATION (menu + active link) =============== */
function setupNavigation() {
  const navbar = $("#navbar");
  const hamburger = $("#hamburger");
  const navLinks = $("#navLinks");

  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });

  // Close the mobile menu after choosing a link
  $$("a", navLinks).forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Highlight the section currently on screen
  const sections = $$("main section[id]");
  const linkFor = (id) => $(`a[href="#${id}"]`, navLinks);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$("a", navLinks).forEach((a) => a.classList.remove("active"));
        const link = linkFor(entry.target.id);
        if (link) link.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => spy.observe(section));

  // Shadow on the navbar + back-to-top button visibility
  const toTop = $("#toTop");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
    toTop.classList.toggle("show", window.scrollY > 480);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ============ 9. PROFILE PHOTO UPLOAD / PREVIEW =============== */
/* The photo is only previewed in the browser — nothing is uploaded anywhere. */
function setupPhotoUpload() {
  const frame = $("#photoFrame");
  const input = $("#photoInput");
  const image = $("#profileImage");
  if (!frame || !input || !image) return;

  const openPicker = () => input.click();

  frame.addEventListener("click", openPicker);
  frame.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  });

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      image.src = reader.result;
      image.alt = "Uploaded profile photo";
    };
    reader.readAsDataURL(file);
  });
}

/* ============ 10. CONTACT FORM VALIDATION =============== */
function setupContactForm() {
  const form = $("#contactForm");
  if (!form) return;

  const note = $("#formNote");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const showError = (fieldId, message) => {
    const input = document.getElementById(fieldId);
    const errorEl = $(`[data-error-for="${fieldId}"]`, form);
    input.closest(".field").classList.toggle("invalid", Boolean(message));
    errorEl.textContent = message || "";
    return !message;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = $("#nameField").value.trim();
    const email = $("#emailField").value.trim();
    const message = $("#messageField").value.trim();

    const okName = showError("nameField", name.length < 2 ? "Please enter your name." : "");
    const okEmail = showError("emailField", emailPattern.test(email) ? "" : "Please enter a valid email address.");
    const okMessage = showError("messageField", message.length < 10 ? "Please write at least 10 characters." : "");

    if (!(okName && okEmail && okMessage)) {
      note.classList.remove("show");
      return;
    }

    note.textContent = "Thank you! Your message is ready to be sent.";
    note.classList.add("show");
    form.reset();
  });

  // Clear an error as soon as the visitor starts fixing it
  $$("input, textarea", form).forEach((input) => {
    input.addEventListener("input", () => {
      input.closest(".field").classList.remove("invalid");
      const errorEl = $(`[data-error-for="${input.id}"]`, form);
      if (errorEl) errorEl.textContent = "";
    });
  });
}

/* ============ 11. START EVERYTHING =============== */
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  renderAchievements();
  startTyping();
  setupNavigation();
  setupPhotoUpload();
  setupContactForm();
  setupScrollReveal(); // runs last so generated cards are included
});

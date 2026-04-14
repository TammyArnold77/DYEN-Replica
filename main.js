/* ══════════════════════════════════════
   DYEN — main.js
   Shared across all pages.
   Every function guards against missing
   elements so it is safe on every page.
══════════════════════════════════════ */

/* ── Shorthand ── */
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);
const pad = (n) => String(n).padStart(2, "0");

/* ════════════════════════════════
   NAV — highlight active link
   Uses the current page filename to find
   the matching nav <a> and add .active.
════════════════════════════════ */
(function markActive() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  const map = {
    "index.html": "nl-home",
    "": "nl-home",
    "schools.html": "nl-schools",
    "about.html": "nl-about",
    "apply.html": "nl-apply",
  };
  const el = $(map[page]);
  if (el) el.classList.add("active");
})();

/* ════════════════════════════════
   MOBILE NAV TOGGLE
════════════════════════════════ */
function toggleMobile() {
  const menu = $("mobileMenu");
  const btn = $("hamburgerBtn");
  if (menu) menu.classList.toggle("open");
  if (btn) btn.classList.toggle("open");
}

/* Close mobile menu whenever any link inside it is clicked */
document.addEventListener("DOMContentLoaded", function () {
  const menu = $("mobileMenu");
  if (!menu) return;
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      const btn = $("hamburgerBtn");
      if (btn) btn.classList.remove("open");
      const menuBtn = document.getElementById("menu-btn"); // your menu button

      menuBtn.addEventListener("click", () => {
        document.body.classList.toggle("menu-open");
      });
    });
  });
});

/* ════════════════════════════════
   SCROLL REVEAL
   Elements with class .reveal fade up
   when they enter the viewport.
════════════════════════════════ */
function initReveal() {
  const els = $$(".reveal:not(.in)");
  if (!els.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        /* Stagger siblings: each sibling delayed by 70ms (max 350ms) */
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const delay = Math.min(siblings.indexOf(entry.target) * 70, 350);
        setTimeout(() => entry.target.classList.add("in"), delay);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );

  els.forEach((el) => obs.observe(el));
}

document.addEventListener("DOMContentLoaded", initReveal);

/* ════════════════════════════════
   FAQ ACCORDION
   Toggled by JS, no inline onclick needed.
════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  $$(".faq-item").forEach((item) => {
    item.addEventListener("click", () => item.classList.toggle("open"));
  });
});

/* ════════════════════════════════
   NEWSLETTER SUBSCRIBE
════════════════════════════════ */
function handleSub() {
  const inp = $("emailInput");
  const note = $("subNote");
  if (!inp || !note) return;

  const val = inp.value.trim();
  /* Simple validation: must contain @ and a dot after @ */
  const valid = val.includes("@") && val.split("@")[1]?.includes(".");

  if (valid) {
    note.textContent = "✓ You're subscribed! Thank you.";
    note.style.color = "#00b884";
    inp.value = "";
    setTimeout(() => {
      note.textContent = "";
    }, 4500);
  } else {
    note.textContent = "Please enter a valid email address.";
    note.style.color = "#f87171";
    setTimeout(() => {
      note.textContent = "";
    }, 3500);
  }
}

/* ════════════════════════════════
   HOME — FEATURE SLIDER
════════════════════════════════ */
const features = [
  {
    icon: "💰",
    title: "Tution Free Scholarship",
    desc: "Tuition fees fully covered. Nothing should stop you from creating your dream future.",
    img: "Img4.webp",
  },
  {
    icon: "👥",
    title: "Community",
    desc: "Surround yourself with driven, ambitious people on the same journey as you.",
    img: "Dyn22.jpg",
  },
  {
    icon: "🏅",
    title: "Mentoring by Experts",
    desc: "Get proper guidance from experienced professionals in your chosen field.",
    img: "DYN_2223.jpg",
  },
  {
    icon: "📈",
    title: "High Income Skills",
    desc: "Learn skills that pay the bills and set you up for life.",
    img: "DSC_0014.jpg",
  },
  {
    icon: "🏫",
    title: "Physical classes",
    desc: "Face to face, undistracted learning in an engaging classroom setting.",
    img: "Img11.webp",
  },
  {
    icon: "🌐",
    title: "Networking",
    desc: "Build valuable connections with like-minded peers who will challenge and inspire you to grow.",
    img: "Img2.webp",
  },
];

let featIdx = 0;
let featTimer = null;

function renderFeat() {
  const counter = $("featCounter");
  if (!counter) return; /* not on home page */

  const f = features[featIdx];
  counter.textContent = `${pad(featIdx + 1)} / ${pad(features.length)}`;
  $("featIcon").textContent = f.icon;
  $("featTitle").textContent = f.title;
  $("featDesc").textContent = f.desc;
  const lbl = $("featImgLabel");
  if (lbl) lbl.textContent = `Feature image (600 × 440 px)\ne.g. ${f.img}`;

  const dotsEl = $("featDots");
  if (dotsEl) {
    dotsEl.innerHTML = features
      .map(
        (_, i) =>
          `<div class="feat-dot${i === featIdx ? " active" : ""}" onclick="setFeat(${i})"></div>`,
      )
      .join("");
  }
}

function setFeat(i) {
  featIdx = i;
  renderFeat();
  /* Reset the auto-timer so it doesn't jump immediately after a manual click */
  if (featTimer) {
    clearInterval(featTimer);
    featTimer = setInterval(featNext, 4500);
  }
}
function featNext() {
  featIdx = (featIdx + 1) % features.length;
  renderFeat();
}
function featPrev() {
  featIdx = (featIdx - 1 + features.length) % features.length;
  renderFeat();
}

/* ════════════════════════════════
   HOME — TESTIMONIALS
════════════════════════════════ */
const testimonials = [
  {
    name: "Tega Ekure",
    role: "Basic Culinary Program, Culinary School",
    file: "tega.jpg",
    quote:
      "I have learnt alot from Dyen, before coming to Dyen I had no knowledge about baking and pastries, but within this few Months with Dyen, I have really learnt alot, and I will say my experience here was fun and productive, thank you Dyen.",
  },
  {
    name: "Tam Bruno Kodoye",
    role: "Product design, Tech School",
    file: "tam.jpg",
    quote:
      "DYEN is simply God sent. The sacrifice is huge. The impact is deep and holistic. It goes beyond skill acquisition. They're offering so much value for free. I commend, then recommend DYEN to any serious minded person who desires growth and success in life.",
  },
  {
    name: "Nita Atimati",
    role: "Basic Culinary Program, Culinary School",
    file: "nita.jpg",
    quote:
      "Before coming to DYEN I had zero knowledge about baking of cakes, pastries, smoothies & cocktails but now, I can proudly say I am a certified chef...THANK YOU DYEN🙏🙏.",
  },
  {
    name: "Eseoghene Esiehor",
    role: "Web development, Tech School",
    file: "ese.jpg",
    quote:
      "From day one, I knew I was at the right place. My experience at DYEN has been nothing short of amazing because in a very short period of time, my life has been affected positively. The passion and drive shown by the instructors to impact knowledge is inspiring and mind-blowing.",
  },
  {
    name: "Obue Ella",
    role: "Product design, Tech School",
    file: "Ella.jpg",
    quote:
      "My experience has been good, I already had an idea about UI/UX design, so everything is going smooth for me. DYEN is doing a good work and I pray God continues to strengthen the organizers.",
  },
];

let testiIdx = 0;

function buildTestiTabs() {
  const tabs = $("testiTabs");
  if (!tabs) return;
  tabs.innerHTML = testimonials
    .map(
      (t, i) => `
    <div class="testi-tab${i === 0 ? " active" : ""}" onclick="setTesti(${i})">
      <div class="testi-avatar">
        <div class="img-ph" style="border-radius:50%;border:none;font-size:0;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/>
          </svg>
        </div>
      </div>
      <span class="testi-tab-name">${t.name.split(" ")[0]}</span>
    </div>
  `,
    )
    .join("");
}

function setTesti(i) {
  testiIdx = i;
  const t = testimonials[i];

  $$(".testi-tab").forEach((el, idx) =>
    el.classList.toggle("active", idx === i),
  );

  const quote = $("testiQuote"),
    name = $("testiName"),
    role = $("testiRole"),
    lbl = $("testiImgLabel");
  if (quote) quote.textContent = t.quote;
  if (name) name.textContent = t.name;
  if (role) role.textContent = t.role;
  if (lbl) lbl.textContent = `Testimonial photo (300 × 300 px)\n${t.file}`;
}

/* ════════════════════════════════
   HOME — STAT COUNTERS
   Runs once when the stats section
   enters the viewport then disconnects.
════════════════════════════════ */
function runCounters() {
  $$(".counter").forEach((el) => {
    const val = parseInt(el.dataset.val, 10);
    const sfx = el.dataset.sfx || "";
    if (isNaN(val)) return;
    let start = null;
    const dur = 1600;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * val).toLocaleString() + sfx;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ════════════════════════════════
   SCHOOLS PAGE — tab switching
   Also called from URL param on load.
════════════════════════════════ */
function openSchool(id, clickedTab) {
  $$(".school-panel").forEach((p) => p.classList.remove("active"));
  const panel = $("sp-" + id);
  if (panel) panel.classList.add("active");

  $$(".s-tab").forEach((t) => {
    if (clickedTab) {
      t.classList.toggle("active", t === clickedTab);
    } else {
      /* Match by onclick attribute when called programmatically */
      const oc = t.getAttribute("onclick") || "";
      t.classList.toggle("active", oc.includes(`'${id}'`));
    }
  });

  /* Re-run reveal for cards in the newly visible panel */
  initReveal();
}

/* ════════════════════════════════
   APPLY PAGE — form submit
════════════════════════════════ */
function submitApp() {
  const body = $("formBody");
  const success = $("successMsg");
  if (body) body.style.display = "none";
  if (success) success.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ════════════════════════════════
   INITIALISE (runs after DOM ready)
════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  /* ── Feature slider (home only) ── */
  if ($("featSlider")) {
    renderFeat();
    featTimer = setInterval(featNext, 4500);
  }

  /* ── Testimonials (home only) ── */
  if ($("testiTabs")) {
    buildTestiTabs();
    setTesti(0);
  }

  /* ── Stat counters (home only) ─────────────────────
     BUG FIX: observer disconnects after firing once
     so runCounters() never runs more than once.      ── */
  const statsSec = document.querySelector(".stats-sec");
  if (statsSec) {
    const counterObs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runCounters();
          counterObs.disconnect(); /* fire exactly once */
        }
      },
      { threshold: 0.25 },
    );
    counterObs.observe(statsSec);
  }

  /* ── Schools page: open tab from URL param ──────────
     e.g. schools.html?type=Tech opens the Tech panel. ── */
  if (document.querySelector(".school-panel")) {
    const type = new URLSearchParams(window.location.search).get("type");
    if (type) openSchool(type, null);
  }
});

// ============================================================
// DYEN Chatbot Script
// Replace the URL below with your actual n8n webhook URL
// ============================================================
const DYEN_WEBHOOK_URL =
  "https://tammyarnold.app.n8n.cloud/webhook/dyen-chatbot";

const sessionId = "dyen-" + Math.random().toString(36).substr(2, 9);
const bubble = document.getElementById("dyen-chat-bubble");
const toggleBtn = document.getElementById("dyen-toggle-btn");
const messages = document.getElementById("dyen-messages");
const input = document.getElementById("dyen-input");

const sendBtn = document.getElementById("dyen-send-btn");
const unreadDot = document.getElementById("dyen-unread-dot");

// Toggle open/close
toggleBtn.addEventListener("click", () => {
  bubble.classList.toggle("open");
  unreadDot.style.display = "none";
  if (bubble.classList.contains("open")) {
    setTimeout(() => input.focus(), 300);
  }
});

// Send on Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // Show user message
  appendMessage(text, "user");
  input.value = "";
  sendBtn.disabled = true;

  // Show typing indicator
  const typingEl = showTyping();

  try {
    const res = await fetch(DYEN_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, sessionId }),
    });

    const data = await res.json();
    typingEl.remove();

    appendMessage(
      data.output ||
        data.text ||
        "Sorry, I didn't get a response. Please try again.",
      "bot",
    );
  } catch (err) {
    typingEl.remove();
    appendMessage(
      "Oops! I'm having trouble connecting right now. Please try again shortly. 🙏",
      "bot",
    );
  }

  sendBtn.disabled = false;
  input.focus();
}

function appendMessage(text, sender) {
  const label = document.createElement("div");
  label.className = "dyen-msg-label" + (sender === "user" ? " user-label" : "");
  label.textContent = sender === "user" ? "You" : "DYEN Assistant";

  const msg = document.createElement("div");
  msg.className = "dyen-msg " + sender;
  msg.innerHTML = text.replace(/\n/g, "<br>");

  messages.appendChild(label);
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
  return msg;
}

function showTyping() {
  const el = document.createElement("div");
  el.className = "dyen-typing";
  el.innerHTML = "<span></span><span></span><span></span>";
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
  return el;
}

function toggleMobile() {
  const menu = $("mobileMenu");
  const btn = $("hamburgerBtn");
  if (menu) menu.classList.toggle("open");
  if (btn) btn.classList.toggle("open");

  // ✅ ADD THIS LINE ONLY
  if (bubble)
    bubble.style.display = menu.classList.contains("open") ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const menu = $("mobileMenu");

  if (bubble) {
    // Show chatbot by default
    bubble.style.display = "block";

    // If menu is already open (edge case), hide it
    if (menu && menu.classList.contains("open")) {
      bubble.style.display = "none";
    }
  }
});

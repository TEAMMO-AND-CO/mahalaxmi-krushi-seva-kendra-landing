// ==========================================
// Navigation Toggle - Must run first
// ==========================================
(function () {
  "use strict";

  function initNavToggle() {
    const navToggle = document.getElementById("navToggle");
    const navList = document.getElementById("navList");

    if (!navToggle || !navList) {
      console.error("Nav toggle or nav list not found");
      return;
    }

    console.log("Nav toggle initialized");

    // Ensure nav is hidden initially on mobile
    if (window.innerWidth <= 768) {
      navList.classList.remove("active");
    }

    // Toggle menu on button click
    navToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("Toggle clicked");

      const isActive = navList.classList.contains("active");

      if (isActive) {
        navList.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      } else {
        navList.classList.add("active");
        navToggle.classList.add("active");
        navToggle.setAttribute("aria-expanded", "true");
      }
    });

    // Close menu when clicking on a nav link
    const navLinks = navList.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navList.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInsideNav = navList.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);

      if (
        !isClickInsideNav &&
        !isClickOnToggle &&
        navList.classList.contains("active")
      ) {
        navList.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Handle window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navList.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavToggle);
  } else {
    initNavToggle();
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // close nav on mobile
        document.getElementById("navList")?.classList.remove("show");
        document
          .getElementById("navToggle")
          ?.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");
  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      const show = navList.classList.toggle("show");
      navToggle.setAttribute("aria-expanded", String(show));
    });
  }

  // Navigation Toggle Functionality
  document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const navList = document.getElementById("navList");

    if (navToggle && navList) {
      // Ensure nav is hidden initially on mobile
      if (window.innerWidth <= 768) {
        navList.style.display = "none";
      }

      // Toggle menu on button click
      navToggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = navToggle.getAttribute("aria-expanded") === "true";

        // Toggle aria-expanded
        navToggle.setAttribute("aria-expanded", !isExpanded);

        // Toggle active class
        navToggle.classList.toggle("active");
        navList.classList.toggle("active");

        // Force display toggle
        if (navList.classList.contains("active")) {
          navList.style.display = "flex";
        } else {
          navList.style.display = "none";
        }
      });

      // Close menu when clicking on a nav link
      const navLinks = navList.querySelectorAll("a");
      navLinks.forEach((link) => {
        link.addEventListener("click", function () {
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.classList.remove("active");
          navList.classList.remove("active");
          if (window.innerWidth <= 768) {
            navList.style.display = "none";
          }
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !navToggle.contains(event.target) &&
          !navList.contains(event.target)
        ) {
          if (navList.classList.contains("active")) {
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.classList.remove("active");
            navList.classList.remove("active");
            if (window.innerWidth <= 768) {
              navList.style.display = "none";
            }
          }
        }
      });

      // Handle window resize
      window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
          navList.style.display = "";
          navToggle.classList.remove("active");
          navList.classList.remove("active");
          navToggle.setAttribute("aria-expanded", "false");
        } else {
          if (!navList.classList.contains("active")) {
            navList.style.display = "none";
          }
        }
      });
    }
  });

  // IntersectionObserver reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Back to top
  const back = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (!back) return;
    if (window.scrollY > 300) back.style.display = "block";
    else back.style.display = "none";
  });
  back?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple contact form handler (no backend)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const msgEl = document.getElementById("formMsg");
      if (!name || !phone) {
        msgEl.textContent =
          translations[currentLang]["contact.validation"] ||
          "Please enter your name and phone number.";
        return;
      }
      msgEl.textContent =
        translations[currentLang]["contact.thanks"] ||
        "Thank you — we will contact you shortly.";
      form.reset();
      setTimeout(() => (msgEl.textContent = ""), 6000);
    });
  }

  // Basic accessibility: allow click to submit contact form
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener(
      "click",
      () => form && form.dispatchEvent(new Event("submit"))
    );
  }

  // Translation data
  const translations = {
    en: {
      "meta.title":
        "Mahalaxmi Krushi Seva Kendra — Farming Chemicals & Agriculture Products",
      "meta.description":
        "Mahalaxmi Krushi Seva Kendra — Trusted agricultural retailer helping farmers buy quality farming chemicals, seeds, and tools. Learn with blogs & videos to grow better crops.",
      skip: "Skip to content",
      "brand.name": "Mahalaxmi Krushi Seva Kendra",
      "nav.home": "Home",
      "nav.products": "Products",
      "nav.blogs": "Blogs",
      "nav.about": "About Us",
      "nav.contact": "Contact",
      "hero.title": "Trusted Farming Chemicals & Agriculture Products",
      "hero.sub":
        "Connecting farmers directly to quality inputs, advice, and market insights to increase yield and income.",
      "hero.explore": "Explore Products",
      "hero.learn": "Learn from Blogs & Videos",
      "about.title": "About Mahalaxmi Krushi Seva Kendra",
      "about.p1":
        "We connect rural farmers to genuine seeds, fertilizers, pesticides and farming tools while sharing practical, localised guidance via blogs and videos — helping you grow better crops and earn more.",
      "feature.1": "Genuine Inputs: Verified brands & quality checks",
      "feature.2": "Direct Supply: Competitive prices & transparent sourcing",
      "feature.3": "Educational Content: Simple tips, videos & local examples",
      "products.title": "Featured Products",
      "products.subtitle":
        "Carefully selected items for small and medium farms",
      "product1.name": "High Yield Fertilizer",
      "product1.desc": "Balanced NPK blend for healthy crop growth.",
      "product1.price": "₹850",
      "product1.button": "Buy / Enquire",
      "product2.name": "Organic Pesticide",
      "product2.desc": "Safe pest control for vegetables and fruits.",
      "product2.price": "₹420",
      "product2.button": "Buy / Enquire",
      "product3.name": "Certified Seeds",
      "product3.desc": "High-germination seeds for better yields.",
      "product3.price": "₹220",
      "product3.button": "Buy / Enquire",
      "product4.name": "Farming Tools",
      "product4.desc": "Durable tools for everyday farm use.",
      "product4.price": "₹320",
      "product4.button": "Buy / Enquire",
      "blogs.title": "Blogs & Video Previews",
      "blogs.subtitle":
        "Practical tips, how-to videos, and local success stories",
      "blog.1": "How to Improve Soil Health",
      "blog.2": "Selecting Right Seeds for Monsoon",
      "blog.3": "Simple Pest Control Methods",
      "testimonials.title": "Farmer Success Stories",
      "test.1":
        '"We increased yield by 20% after switching to guided inputs from Mahalaxmi. Helpful team and timely delivery."',
      "test.1.author": "Ramesh Naik, Satara",
      "test.2":
        '"The videos are simple to follow and helped me manage pests without harming the soil."',
      "test.2.author": "Sangeeta Patil, Ahmednagar",
      "contact.title": "Contact & Enquiry",
      "contact.subtitle":
        "Fill the form and our team will call you. No spam — just local help.",
      "contact.name": "Name",
      "contact.name.pl": "Your name",
      "contact.phone": "Phone",
      "contact.phone.pl": "Mobile number",
      "contact.message": "Message",
      "contact.message.pl": "What would you like to know?",
      "contact.send": "Send Enquiry",
      "contact.call.label": "Call / WhatsApp:",
      "contact.call": "+91 758xxxxxx",
      "contact.email.label": "Email:",
      "contact.address.label": "Address:",
      "contact.address": "Sangli, Maharashtra, India",
      "contact.validation": "Please enter your name and phone number.",
      "contact.thanks": "Thank you — we will contact you shortly.",
      "social.facebook": "Facebook",
      "social.youtube": "YouTube",
      "social.instagram": "Instagram",
      "footer.tag": "Helping farmers grow better and earn more.",
      "footer.rights": "All rights reserved.",
      "back.top": "↑",
    },
    mr: {
      "meta.title": "महालक्ष्मी कृषी सेवा केंद्र — कृषी रसायने व उत्पाद",
      "meta.description":
        "महालक्ष्मी कृषी सेवा केंद्र — दर्जेदार कृषी इनपुट विकत घ्या आणि ब्लॉग व व्हिडिओद्वारे शिका.",
      skip: "मुख्य भागाकडे जा",
      "brand.name": "महालक्ष्मी कृषी सेवा केंद्र",
      "nav.home": "मुख्यपृष्ठ",
      "nav.products": "उत्पादने",
      "nav.blogs": "ब्लॉग",
      "nav.about": "आमच्याबद्दल",
      "nav.contact": "संपर्क",
      "hero.title": "विश्वासू कृषी रसायने व उत्पादन",
      "hero.sub":
        "कृषकांना दर्जेदार इनपुट्स, सल्ला आणि मार्केट माहिती थेट जोडून उत्पादन वाढवण्यास मदत.",
      "hero.explore": "उत्पादने पहा",
      "hero.learn": "ब्लॉग व व्हिडिओ बघा",
      "about.title": "महालक्ष्मी कृषी सेवा केंद्र बद्दल",
      "about.p1":
        "आम्ही स्थानिक शेतकऱ्यांना खरेपी बियाणे, खत, किटकनाशके आणि साधने देवून व्यावहारिक मार्गदर्शन देतो.",
      "feature.1": "खरे इनपुट्स: तपासलेली ब्रँड्स",
      "feature.2": "थेट पुरवठा: स्पर्धात्मक किंमती",
      "feature.3": "शैक्षणिक सामग्री: सोपी टिप्स व व्हिडिओ",
      "products.title": "विशेष उत्पादने",
      "products.subtitle": "लहान व मध्यम शेतांसाठी आवडती उत्पादने",
      "product1.name": "उच्च उत्पन्न खत",
      "product1.desc": "संतुलित NPK मिश्रण.",
      "product1.price": "₹850",
      "product1.button": "खरेदी / चौकशी",
      "product2.name": "सेंद्रिय किटकनाशक",
      "product2.desc": "भाजीपाला व फळांसाठी सुरक्षित.",
      "product2.price": "₹420",
      "product2.button": "खरेदी / चौकशी",
      "product3.name": "प्रमाणित बियाणे",
      "product3.desc": "उत्कृष्ट पेरणीच्या बियाण्यांसह.",
      "product3.price": "₹220",
      "product3.button": "खरेदी / चौकशी",
      "product4.name": "शेती साधने",
      "product4.desc": "दैनंदिन वापरासाठी टिकाऊ साधने.",
      "product4.price": "₹320",
      "product4.button": "खरेदी / चौकशी",
      "blogs.title": "ब्लॉग व व्हिडिओ",
      "blogs.subtitle": "व्यवहारिक टिप्स व स्थानिक यशकथा",
      "blog.1": "माती आरोग्य सुधारण्याचे सोपे उपाय",
      "blog.2": "मान्सूनसाठी योग्य बियाणे निवडा",
      "blog.3": "सुरक्षित कीटक नियंत्रण पद्धती",
      "testimonials.title": "शेतकरी यशकथा",
      "test.1": '"आम्हाला उत्पादन 20% वाढले."',
      "test.1.author": "रमेश नाईक, सातारा",
      "test.2": '"व्हिडिओ सोपे व उपयुक्त आहेत."',
      "test.2.author": "संगीता पाटिल, अहमदनगर",
      "contact.title": "संपर्क व चौकशी",
      "contact.subtitle": "फॉर्म भरा, आमची टीम तुम्हाला कॉल करेल.",
      "contact.name": "नाव",
      "contact.name.pl": "तुमचे नाव",
      "contact.phone": "फोन",
      "contact.phone.pl": "मोबाईल नंबर",
      "contact.message": "संदेश",
      "contact.message.pl": "तुम्हाला काय विचारायचे आहे?",
      "contact.send": "चौकशी पाठवा",
      "contact.call.label": "कॉल / व्हॉट्सअॅप:",
      "contact.call": "+91 98xxxxxxx",
      "contact.email.label": "ईमेल:",
      "contact.address.label": "पत्ता:",
      "contact.address": "लोकल अॅग्रो सेंटर, महाराष्ट्र, भारत",
      "contact.validation": "कृपया नाव आणि फोन नंबर भरा.",
      "contact.thanks": "धन्यवाद — लवकरच संपर्क केल्या जाईल.",
      "social.facebook": "फेसबुक",
      "social.youtube": "यूट्यूब",
      "social.instagram": "इंस्टाग्राम",
      "footer.tag": "शेतकऱ्यांना चांगले वाढवायला व उत्पन्न वाढवायला मदत.",
      "footer.rights": "सर्व हक्क राखीव.",
    },
    hi: {
      "meta.title": "महालक्ष्मी कृषि सेवा केंद्र — कृषि रसायन व उत्पाद",
      "meta.description":
        "महालक्ष्मी कृषि सेवा केंद्र — किसानों को गुणवत्तापूर्ण इनपुट खरीदने में मदद करता है। ब्लॉग और वीडियो के साथ सीखें।",
      skip: "कंटेंट पर जाएं",
      "brand.name": "महालक्ष्मी कृषि सेवा केंद्र",
      "nav.home": "होम",
      "nav.products": "उत्पाद",
      "nav.blogs": "ब्लॉग",
      "nav.about": "हमारे बारे में",
      "nav.contact": "संपर्क",
      "hero.title": "विश्वसनीय कृषि रसायन व उत्पाद",
      "hero.sub":
        "किसानों को गुणवत्तापूर्ण इनपुट, सलाह और बाजार जानकारी से जोड़ना।",
      "hero.explore": "उत्पाद देखें",
      "hero.learn": "ब्लॉग और वीडियो देखें",
      "about.title": "महालक्ष्मी कृषि सेवा केंद्र के बारे में",
      "about.p1":
        "हम स्थानीय किसानों को प्रमाणित बीज, उर्वरक, कीटनाशक और उपकरण उपलब्ध कराते हैं और व्यावहारिक मार्गदर्शन देते हैं।",
      "feature.1": "प्रमाणित इनपुट: गुणवत्ता सुनिश्चित",
      "feature.2": "सीधा वितरण: पारदर्शी दाम",
      "feature.3": "शैक्षिक सामग्री: सरल टिप्स और वीडियो",
      "products.title": "प्रमुख उत्पाद",
      "products.subtitle": "छोटे व मध्यम खेतों के लिए चुने हुए आइटम",
      "product1.name": "उच्च उपज वाला उर्वरक",
      "product1.desc": "संतुलित NPK मिश्रण।",
      "product1.price": "₹850",
      "product1.button": "खरीदें / पूछताछ",
      "product2.name": "ऑर्गैनिक कीटनाशक",
      "product2.desc": "सब्जियों व फलों के लिए सुरक्षित।",
      "product2.price": "₹420",
      "product2.button": "खरीदें / पूछताछ",
      "product3.name": "प्रमाणित बीज",
      "product3.desc": "उत्तम अंकुरण के लिए बीज।",
      "product3.price": "₹220",
      "product3.button": "खरीदें / पूछताछ",
      "product4.name": "खेती के उपकरण",
      "product4.desc": "दैनिक उपयोग के लिए मजबूत उपकरण।",
      "product4.price": "₹320",
      "product4.button": "खरीदें / पूछताछ",
      "blogs.title": "ब्लॉग और वीडियो",
      "blogs.subtitle": "व्यावहारिक सुझाव और स्थानीय कहानियाँ",
      "blog.1": "मिट्टी का स्वास्थ्य कैसे सुधारें",
      "blog.2": "मानसून के लिए सही बीज चुनना",
      "blog.3": "सरल कीट नियंत्रण तरीके",
      "testimonials.title": "किसान सफल कहानियाँ",
      "test.1": '"हमारी उपज 20% बढ़ गई।"',
      "test.1.author": "रमेश नाइक, सतारा",
      "test.2": '"वीडियो आसान और उपयोगी हैं।"',
      "test.2.author": "संगीता पाटिल, अहमदनगर",
      "contact.title": "संपर्क व पूछताछ",
      "contact.subtitle": "फॉर्म भरें, हमारी टीम आपको कॉल करेगी.",
      "contact.name": "नाम",
      "contact.name.pl": "आपका नाम",
      "contact.phone": "फोन",
      "contact.phone.pl": "मोबाइल नंबर",
      "contact.message": "संदेश",
      "contact.message.pl": "आप क्या जानना चाहेंगे?",
      "contact.send": "पाठाएं",
      "contact.call.label": "कॉल / WhatsApp:",
      "contact.call": "+91 98xxxxxxx",
      "contact.email.label": "ईमेल:",
      "contact.address.label": "पता:",
      "contact.address": "लोकल एग्रो सेंटर, महाराष्ट्र, भारत",
      "contact.validation": "कृपया नाम और फोन नंबर दर्ज करें.",
      "contact.thanks": "धन्यवाद — हम जल्द संपर्क करेंगे.",
      "social.facebook": "Facebook",
      "social.youtube": "YouTube",
      "social.instagram": "Instagram",
      "footer.tag": "किसानों को बेहतर उगाने और अधिक कमाने में मदद।",
      "footer.rights": "सर्वाधिकार सुरक्षित।",
    },
  };

  // expose translations to outer scope of this function for form handler
  window.translations = translations;
  let currentLang = "en";
  window.currentLang = currentLang;

  // function to apply translations for elements with data-i18n and placeholders
  function applyTranslations(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    window.currentLang = lang;
    // set html lang
    document.documentElement.lang = lang;

    // update meta
    if (document.querySelector("title"))
      document.querySelector("title").textContent =
        translations[lang]["meta.title"] || "";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc)
      metaDesc.setAttribute(
        "content",
        translations[lang]["meta.description"] || ""
      );

    // standard elements
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const text = translations[lang][key];
      if (typeof text !== "undefined") {
        if (
          el.tagName.toLowerCase() === "input" ||
          el.tagName.toLowerCase() === "textarea"
        ) {
          el.value = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      const text = translations[lang][key];
      if (typeof text !== "undefined") el.setAttribute("placeholder", text);
    });

    // update aria-pressed state on language buttons
    document.querySelectorAll(".lang-toggle .lang").forEach((b) => {
      const bLang = b.getAttribute("data-lang");
      if (bLang === lang) {
        b.classList.add("active");
        b.setAttribute("aria-pressed", "true");
      } else {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      }
    });
  }

  // initial apply
  applyTranslations(currentLang);

  // language toggle handlers
  document.querySelectorAll(".lang-toggle .lang").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (!translations[lang]) return;
      applyTranslations(lang);
    });
  });

  // ensure "Enter" on buttons works for keyboard users
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("keyup", (e) => {
      if (e.key === "Enter" || e.key === " ") btn.click();
    });
  });

  // add product loading + rendering (keep this block near other DOM-ready logic)
  (function () {
    let products = [];

    // load products JSON
    function loadProducts() {
      fetch("src/data/products.json")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load products.json");
          return res.json();
        })
        .then((data) => {
          products = Array.isArray(data.products) ? data.products : [];
          renderProducts(window.currentLang || "en");
        })
        .catch((err) => {
          console.warn("Products load error:", err);
        });
    }

    // helper to get localized text from product fields
    function localText(obj, lang) {
      if (!obj) return "";
      if (typeof obj === "string") return obj;
      return obj[lang] || obj["en"] || Object.values(obj)[0] || "";
    }

    // render product grid
    function renderProducts(lang) {
      const grid =
        document.getElementById("productGrid") ||
        document.querySelector(".product-grid");
      if (!grid) return;
      grid.innerHTML = "";
      products.forEach((p) => {
        const name = localText(p.name, lang);
        const desc = localText(p.description, lang);
        const price =
          typeof p.price === "number" ? `₹${p.price}` : p.price || "";
        const imgSrc = p.imageUrl;

        const article = document.createElement("article");
        article.className = "product";
        article.setAttribute("aria-labelledby", `product-${p.id}-name`);
        article.innerHTML = `
          <img src="${imgSrc}" alt="${name}" loading="lazy">
          <h3 id="product-${p.id}-name">${name}</h3>
          <p class="prod-desc">${desc}</p>
          <p class="price">${price}</p>
          <a class="btn small" href="#contact">${
            window.translations?.[lang]?.["product1.button"] || "Buy / Enquire"
          }</a>
        `;
        grid.appendChild(article);
      });
    }

    // expose render to global so language switch can call it (applyTranslations should call render)
    window.renderProducts = renderProducts;

    // run loader on DOM ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadProducts);
    } else {
      loadProducts();
    }

    // ensure language switch re-renders products (if applyTranslations exists, patch it)
    const originalApply = window.applyTranslations;
    if (typeof originalApply === "function") {
      window.applyTranslations = function (lang) {
        originalApply(lang);
        renderProducts(lang);
      };
    } else {
      // fallback: listen for clicks on lang buttons and re-render
      document.querySelectorAll(".lang-toggle .lang").forEach((btn) => {
        btn.addEventListener("click", () => {
          const lang = btn.getAttribute("data-lang");
          renderProducts(lang);
        });
      });
    }
  })();

  // Handle product enquiry buttons
  function handleProductEnquiry(productName) {
    const messageField = document.getElementById('message');
    const contactSection = document.getElementById('contact');
    
    // Pre-fill message with product enquiry
    const enquiryText = `I am interested in: ${productName}\n\n`;
    messageField.value = enquiryText;
    
    // Scroll to contact form
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Focus on message field after scrolling
    setTimeout(() => {
      messageField.focus();
      // Move cursor to end of text
      messageField.setSelectionRange(enquiryText.length, enquiryText.length);
    }, 500);
  }

  // Update product card rendering to add enquiry button click handler
  // (Modify the existing renderProducts function or add event delegation)
  document.addEventListener('DOMContentLoaded', () => {
    // Event delegation for product enquiry buttons
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
      productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-outline') || e.target.closest('.btn-outline')) {
          e.preventDefault();
          const productCard = e.target.closest('.product-card');
          const productName = productCard.querySelector('h3').textContent;
          handleProductEnquiry(productName);
        }
      });
    }
    
    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const sendBtn = document.getElementById('sendBtn');
        const originalText = sendBtn.textContent;
        
        // Show loading state
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';
        formMsg.textContent = '';
        
        try {
          const formData = new FormData(contactForm);
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            formMsg.textContent = 'Thank you! Your enquiry has been sent successfully.';
            formMsg.style.color = '#2e7d32';
            contactForm.reset();
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          formMsg.textContent = 'Oops! Something went wrong. Please try again.';
          formMsg.style.color = '#d32f2f';
        } finally {
          sendBtn.disabled = false;
          sendBtn.textContent = originalText;
        }
      });
    }
  });
});

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Mahalaxmi Krushi Seva Kendra - Connecting farmers to markets with genuine farming inputs.">
    <meta name="keywords" content="E-commerce, Farming, Agriculture, Mahalaxmi Krushi Seva Kendra">
    <meta name="author" content="Mahalaxmi Krushi Seva Kendra">
    <title>Mahalaxmi Krushi Seva Kendra</title>
    <link rel="stylesheet" href="src/css/styles.css">
    <link rel="stylesheet" href="src/css/components.css">
    <link rel="manifest" href="public/manifest.webmanifest">
</head>
<body>
    <header>
        <!-- Include header.html here -->
    </header>
    <main>
        <section id="hero">
            <!-- Include hero.html here -->
        </section>
        <section id="features">
            <!-- Include features.html here -->
        </section>
        <section id="categories">
            <!-- Include categories.html here -->
        </section>
        <section id="testimonials">
            <!-- Include testimonials.html here -->
        </section>
        <section id="faq">
            <!-- Include faq.html here -->
        </section>
        <section id="contact">
            <!-- Include contact.html here -->
        </section>
    </main>
    <footer>
        <!-- Include footer.html here -->
    </footer>
    <script src="src/js/main.js"></script>
    <script src="src/js/ui.js"></script>
    <script src="src/js/analytics.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
          anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            if (!targetId) return;
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              e.preventDefault();
              targetEl.scrollIntoView({behavior: 'smooth', block: 'start'});
              // close mobile nav if open
              const navToggle = document.getElementById('navToggle');
              const primaryMenu = document.getElementById('primaryMenu');
              if (navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
                navToggle.setAttribute('aria-expanded', 'false');
                primaryMenu.classList.remove('open');
              }
            }
          });
        });

        // Mobile nav toggle
        const navToggle = document.getElementById('navToggle');
        const primaryMenu = document.getElementById('primaryMenu');
        if (navToggle && primaryMenu) {
          navToggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            primaryMenu.classList.toggle('open');
          });
        }

        // Language toggle placeholder
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
          langToggle.addEventListener('click', function () {
            // Placeholder: implement translations or selector later
            alert('Language selector: English / मराठी / हिन्दी (placeholder)');
          });
        }

        // IntersectionObserver for fade-in on scroll
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        }, {root: null, rootMargin: '0px', threshold: 0.12});

        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

        // Back to top button
        const backBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', function () {
          if (window.scrollY > 300) backBtn.style.display = 'block';
          else backBtn.style.display = 'none';
        });
        backBtn.addEventListener('click', function () {
          window.scrollTo({top: 0, behavior: 'smooth'});
        });

        // Contact form (no backend) - simple validation + fake submit
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        if (contactForm) {
          contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = contactForm.name.value.trim();
            const phone = contactForm.phone.value.trim();
            const message = contactForm.message.value.trim();
            if (!name || !phone || !message) {
              formStatus.textContent = 'Please fill all fields.';
              formStatus.style.color = 'crimson';
              return;
            }
            formStatus.style.color = '';
            formStatus.textContent = 'Sending...';
            // Simulate network
            setTimeout(() => {
              formStatus.style.color = 'var(--green-700)';
              formStatus.textContent = 'Thanks! Your enquiry has been recorded. We will contact you shortly.';
              contactForm.reset();
            }, 900);
          });
        }

        // Set copyright year
        const year = document.getElementById('year');
        if (year) year.textContent = new Date().getFullYear();
      });
    </script>
</body>
</html>
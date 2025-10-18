// This file manages user interface interactions, such as animations or fade-ins on scroll and the multilingual toggle functionality.

document.addEventListener('DOMContentLoaded', function() {
    // Fade-in effect for sections on scroll
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Multilingual toggle functionality
    const langToggle = document.getElementById('lang-toggle');
    langToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'en' ? 'hi' : 'en';
        document.documentElement.lang = newLang;
        // Update text content based on the selected language
        updateTextContent(newLang);
    });

    function updateTextContent(lang) {
        // Placeholder for updating text content based on language
        // This function should change the text of various elements based on the selected language
        // Example: document.getElementById('welcome-text').textContent = lang === 'en' ? 'Welcome' : 'स्वागत है';
    }
});
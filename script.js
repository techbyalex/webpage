document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const langToggleBtn = document.getElementById('lang-toggle');
    const heroLogo = document.querySelector('.hero-logo');
    const aboutLogo = document.querySelector('.about-logo-icon');
    
    // Logo image names
    const lightLogoText = 'logo_white_text.png';
    const darkLogoText = 'logo_black_text.png';
    const lightLogoIcon = 'logo_white.png';
    const darkLogoIcon = 'logo_black.png';

    // Theme Toggle
    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            heroLogo.src = lightLogoText;
            aboutLogo.src = lightLogoIcon;
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            heroLogo.src = darkLogoText;
            aboutLogo.src = darkLogoIcon;
        }
        localStorage.setItem('theme', theme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Language Handling
    function getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage;
        return lang.startsWith('cs') || lang.startsWith('sk') ? 'cz' : 'en';
    }

    // Redirect to the correct language on the FIRST visit
    if (!localStorage.getItem('languageSet')) {
        const initialLang = getBrowserLanguage();
        if (initialLang === 'cz' && !window.location.href.includes('index_cz.html')) {
            window.location.href = 'index_cz.html';
        }
        localStorage.setItem('languageSet', 'true');
    }

    // Language Toggle
    langToggleBtn.addEventListener('click', () => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('index.html')) {
            window.location.href = 'index_cz.html';
        } else {
            window.location.href = 'index.html';
        }
    });

    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});
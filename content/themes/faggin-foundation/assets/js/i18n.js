/**
 * Faggin Foundation - Internationalization (i18n)
 *
 * Translates all shared UI elements (header, footer, newsletter, buttons)
 * based on the URL language prefix (/en/, /de/, /es/).
 * Italian (/) is the default and requires no translation.
 */
(function () {
    'use strict';

    var translations = {
        en: {
            // Header / Nav
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.video': 'Video Series',
            'nav.eventi': 'Events',
            'nav.ricerca': 'Research',
            'nav.signup': 'Sign up',
            'nav.account': 'Account',

            // Newsletter
            'newsletter.title': 'Stay connected with our research',
            'newsletter.desc': 'Subscribe to the Faggin Foundation newsletter to receive updates on new videos, articles, events, and insights into the science of consciousness.',
            'newsletter.placeholder': 'Your email address',
            'newsletter.button': 'Subscribe',
            'newsletter.success': 'Thank you for subscribing!',
            'newsletter.error': 'An error occurred. Please try again.',

            // Footer
            'footer.desc': 'Promoting research on the nature and origin of consciousness.',
            'footer.pages': 'Pages',
            'footer.follow': 'Follow us',
            'footer.rights': 'All rights reserved.'
        },
        de: {
            'nav.home': 'Startseite',
            'nav.about': 'Über uns',
            'nav.video': 'Videoreihe',
            'nav.eventi': 'Veranstaltungen',
            'nav.ricerca': 'Forschung',
            'nav.signup': 'Registrieren',
            'nav.account': 'Konto',

            'newsletter.title': 'Bleiben Sie mit unserer Forschung verbunden',
            'newsletter.desc': 'Abonnieren Sie den Newsletter der Faggin Foundation, um Updates zu neuen Videos, Artikeln, Veranstaltungen und Einblicken in die Wissenschaft des Bewusstseins zu erhalten.',
            'newsletter.placeholder': 'Ihre E-Mail-Adresse',
            'newsletter.button': 'Abonnieren',
            'newsletter.success': 'Vielen Dank für Ihre Anmeldung!',
            'newsletter.error': 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',

            'footer.desc': 'Förderung der Forschung über die Natur und den Ursprung des Bewusstseins.',
            'footer.pages': 'Seiten',
            'footer.follow': 'Folgen Sie uns',
            'footer.rights': 'Alle Rechte vorbehalten.'
        },
        es: {
            'nav.home': 'Inicio',
            'nav.about': 'Acerca de',
            'nav.video': 'Serie de Videos',
            'nav.eventi': 'Eventos',
            'nav.ricerca': 'Investigación',
            'nav.signup': 'Suscribirse',
            'nav.account': 'Cuenta',

            'newsletter.title': 'Mantente conectado con nuestra investigación',
            'newsletter.desc': 'Suscríbete al boletín de la Faggin Foundation para recibir actualizaciones sobre nuevos videos, artículos, eventos y conocimientos sobre la ciencia de la conciencia.',
            'newsletter.placeholder': 'Tu dirección de correo electrónico',
            'newsletter.button': 'Suscribirse',
            'newsletter.success': '¡Gracias por suscribirte!',
            'newsletter.error': 'Ha ocurrido un error. Inténtalo de nuevo.',

            'footer.desc': 'Promoviendo la investigación sobre la naturaleza y el origen de la conciencia.',
            'footer.pages': 'Páginas',
            'footer.follow': 'Síguenos',
            'footer.rights': 'Todos los derechos reservados.'
        }
    };

    // Navigation URL map per language
    var navUrls = {
        it: { home: '/', about: '/about/', video: '/video-serie/', eventi: '/eventi/', ricerca: '/ricerca-e-sviluppo/' },
        en: { home: '/en/', about: '/en/about/', video: '/en/video-series/', eventi: '/en/events/', ricerca: '/en/research/' },
        de: { home: '/de/', about: '/de/about/', video: '/de/videoreihe/', eventi: '/de/veranstaltungen/', ricerca: '/de/forschung/' },
        es: { home: '/es/', about: '/es/acerca-de/', video: '/es/serie-de-videos/', eventi: '/es/eventos/', ricerca: '/es/investigacion/' }
    };

    // Detect language from URL
    var path = window.location.pathname;
    var lang = 'it';
    if (path.indexOf('/en/') === 0 || path === '/en') lang = 'en';
    else if (path.indexOf('/de/') === 0 || path === '/de') lang = 'de';
    else if (path.indexOf('/es/') === 0 || path === '/es') lang = 'es';

    // Expose current language globally
    document.documentElement.setAttribute('data-lang', lang);

    // Highlight active language in switcher
    var langLinks = document.querySelectorAll('.lang-link');
    for (var i = 0; i < langLinks.length; i++) {
        if (langLinks[i].getAttribute('data-lang') === lang) {
            langLinks[i].classList.add('active');
        }
    }

    // If Italian, nothing to translate
    if (lang === 'it') return;

    var t = translations[lang];
    if (!t) return;

    // Translate all elements with data-i18n attribute
    var els = document.querySelectorAll('[data-i18n]');
    for (var j = 0; j < els.length; j++) {
        var key = els[j].getAttribute('data-i18n');
        if (t[key]) {
            var attr = els[j].getAttribute('data-i18n-attr');
            if (attr === 'placeholder') {
                els[j].setAttribute('placeholder', t[key]);
            } else {
                els[j].textContent = t[key];
            }
        }
    }

    // Translate navigation links + URLs
    var urls = navUrls[lang];
    var navItems = document.querySelectorAll('.site-nav ul a, .footer-links ul a');
    for (var k = 0; k < navItems.length; k++) {
        var href = navItems[k].getAttribute('href');
        var txt = navItems[k].textContent.trim().toLowerCase();
        if (href === '/' || txt === 'home') {
            navItems[k].setAttribute('href', urls.home);
            navItems[k].textContent = t['nav.home'];
        } else if (href.indexOf('/about') !== -1 || txt === 'about') {
            navItems[k].setAttribute('href', urls.about);
            navItems[k].textContent = t['nav.about'];
        } else if (href.indexOf('/video') !== -1 || txt.indexOf('video') !== -1) {
            navItems[k].setAttribute('href', urls.video);
            navItems[k].textContent = t['nav.video'];
        } else if (href.indexOf('/eventi') !== -1 || txt === 'eventi') {
            navItems[k].setAttribute('href', urls.eventi);
            navItems[k].textContent = t['nav.eventi'];
        } else if (href.indexOf('/ricerca') !== -1 || txt.indexOf('ricerca') !== -1) {
            navItems[k].setAttribute('href', urls.ricerca);
            navItems[k].textContent = t['nav.ricerca'];
        }
    }

    // Update language switcher hrefs to maintain current page context
    // e.g. if on /en/about/, the IT link should go to /about/, DE to /de/about/
    var currentPage = null;
    var itUrls = navUrls.it;
    for (var page in urls) {
        if (path === urls[page] || path === urls[page].replace(/\/$/, '')) {
            currentPage = page;
            break;
        }
    }
    if (currentPage) {
        for (var li = 0; li < langLinks.length; li++) {
            var linkLang = langLinks[li].getAttribute('data-lang');
            if (navUrls[linkLang] && navUrls[linkLang][currentPage]) {
                langLinks[li].setAttribute('href', navUrls[linkLang][currentPage]);
            }
        }
    }
})();

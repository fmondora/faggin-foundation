// Faggin Foundation - Main JS

(function () {
    'use strict';

    // Mobile menu toggle
    var menuToggle = document.querySelector('.menu-toggle');
    var siteNav = document.querySelector('.site-nav');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', function () {
            var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            siteNav.classList.toggle('is-open');
        });

        // Close menu when clicking a nav link (mobile)
        siteNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.setAttribute('aria-expanded', 'false');
                siteNav.classList.remove('is-open');
            });
        });
    }

    // Close menu on click outside
    document.addEventListener('click', function (e) {
        if (siteNav && siteNav.classList.contains('is-open')) {
            if (!siteNav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                siteNav.classList.remove('is-open');
            }
        }
    });

    // Newsletter form feedback
    var forms = document.querySelectorAll('[data-members-form]');
    forms.forEach(function (form) {
        form.addEventListener('submit', function () {
            form.classList.add('loading');
        });
    });
})();

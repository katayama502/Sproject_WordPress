/**
 * Sproject - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Main Copy Reveal (always above the fold, so trigger on load) ---
    const heroCopy = document.querySelector('.hero-copy');
    if (heroCopy) {
        requestAnimationFrame(() => {
            setTimeout(() => heroCopy.classList.add('is-visible'), 300);
        });
    }

    // --- Mobile Menu Toggle ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navbar = document.getElementById('navbar');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            menu.classList.toggle('opacity-0');
            menu.classList.toggle('translate-y-[-10px]');
            
            // Icon change
            const icon = btn.querySelector('i');
            const isOpen = !menu.classList.contains('hidden');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            btn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
            if (menu.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                navbar.classList.remove('bg-white');
                navbar.classList.add('bg-white/90');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                navbar.classList.add('bg-white');
                navbar.classList.remove('bg-white/90');
            }
        });
    }

    // Close mobile menu on link click
    if (mobileLinks.length > 0) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(menu && !menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                    menu.classList.add('opacity-0');
                    menu.classList.add('translate-y-[-10px]');
                    btn.setAttribute('aria-expanded', 'false');
                    btn.setAttribute('aria-label', 'メニューを開く');
                    const icon = btn.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                    navbar.classList.remove('bg-white');
                    navbar.classList.add('bg-white/90');
                }
            });
        });
    }

    // --- Navbar Background on Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm', 'bg-white/95');
            navbar.classList.remove('bg-transparent', 'py-4');
        } else {
            navbar.classList.remove('shadow-sm', 'bg-white/95');
            navbar.classList.add('bg-transparent', 'py-4');
        }
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before it comes into view
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Elements to animate
    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeUpElements.forEach(el => observer.observe(el));
    fadeElements.forEach(el => observer.observe(el));

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
});

/**
 * Static share build only.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Hero background videos: loop through all three (front-page.php inline script) ---
    const video = document.getElementById('hero-bg-video');
    if (video) {
        const sources = [
            'img/gemini_generated_video_13ac186a.mp4',
            'img/gemini_generated_video_85e6b873.mp4',
            'img/gemini_generated_video_916303be.mp4'
        ];
        let current = 0;

        video.addEventListener('ended', () => {
            current = (current + 1) % sources.length;
            video.style.opacity = '0.3';
            setTimeout(() => {
                video.src = sources[current];
                video.play().catch(err => console.log(err));
                video.style.opacity = '1';
            }, 300);
        });
    }

    // --- Contact form is a preview only in the shared version ---
    document.querySelectorAll('form[data-share-preview]').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('こちらは共有用のプレビューのため、フォームは送信されません。');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Navigation Background Toggle on Scroll
    const navbar = document.getElementById('navbar');
    const isDarkNav = navbar.classList.contains('bg-light/90');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if(!isDarkNav) {
                navbar.classList.add('bg-black/80', 'backdrop-blur-md');
            }
        } else {
            if(!isDarkNav) {
                navbar.classList.remove('bg-black/80', 'backdrop-blur-md');
            }
        }
    });

    // --- GSAP ANIMATIONS ---

    // 1. Hero Animations (Index, Menu, Contact)
    const heroTl = gsap.timeline();
    
    // Animate hero background image if present
    const heroVid = document.querySelector('.hero-vid');
    if (heroVid) {
        // Slow zoom effect on video
        gsap.to(heroVid, {
            scale: 1,
            duration: 10,
            ease: "power1.inOut"
        });
    }

    // Animate Hero Text
    heroTl.to('.hero-title', {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.2
    })
    .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=1")
    .to('.hero-btn', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8");

    // Initial state for hero text (if not set in css)
    gsap.set('.hero-title', { y: 50, opacity: 0 });
    gsap.set('.hero-subtitle', { y: 30, opacity: 0 });
    gsap.set('.hero-btn', { y: 20, opacity: 0 });


    // 2. Image Reveal (Index About section)
    const revealContainers = document.querySelectorAll('.reveal-img-container');
    revealContainers.forEach((container) => {
        let image = container.querySelector('img');
        
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 80%", // trigger when top of container hits 80% of viewport
                toggleActions: "play none none reverse"
            }
        });

        // Set initial state
        gsap.set(container, { autoAlpha: 1 });
        tl.from(container, {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.5,
            ease: "power4.inOut"
        })
        .from(image, {
            scale: 1.3,
            duration: 1.5,
            ease: "power4.inOut"
        }, "-=1.5");
    });

    // 3. Text Reveal (Slide up & fade)
    const revealTexts = document.querySelectorAll('.reveal-text');
    revealTexts.forEach((text) => {
        gsap.from(text.children, {
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    });

    // 4. Staggered Elements (Menu items, Featured items)
    const staggerSections = document.querySelectorAll('section'); // Adjust trigger area
    staggerSections.forEach((section) => {
        const items = section.querySelectorAll('.reveal-stagger');
        if (items.length > 0) {
            gsap.from(items, {
                scrollTrigger: {
                    trigger: items[0],
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }
    });

    // 5. Simple Fade In
    const fades = document.querySelectorAll('.reveal-fade');
    fades.forEach((fade) => {
        gsap.from(fade, {
            scrollTrigger: {
                trigger: fade,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});
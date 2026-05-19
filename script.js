document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate Lenis with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Slight delay on outline for smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect to links and buttons
        const interactables = document.querySelectorAll('a, button, input');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

    // 3. Preloader & Initial Animations
    const tl = gsap.timeline();

    // Stop scrolling during preloader
    lenis.stop();
    window.scrollTo(0, 0);

    tl.to('.preloader-bar', {
        width: '100%',
        duration: 1.5,
        ease: 'power4.inOut'
    })
    .to('.preloader-text', {
        y: 0,
        duration: 1,
        ease: 'power4.out'
    }, "-=0.5")
    .to('.preloader', {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0.5,
        onComplete: () => {
            lenis.start(); // Re-enable scrolling
        }
    })
    // Navbar entry
    .to('nav', {
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.5")
    // Hero Text Staggered Entry
    .to('.title-anim span span', {
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out'
    }, "-=1")
    .to('.fade-anim', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    }, "-=0.8");

    // Set initial states for fade-anim
    gsap.set('.fade-anim', { y: 20 });

    // 4. Parallax Image Effects
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    parallaxContainers.forEach(container => {
        const img = container.querySelector('.parallax-img');
        if (img) {
            gsap.to(img, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    });

    // 5. Scroll Reveal Animations (Text)
    const fadeScrollElements = document.querySelectorAll('.fade-in-scroll');
    fadeScrollElements.forEach(el => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 6. Scroll Reveal Animations (Items/Cards Stagger)
    const fadeInUpElements = document.querySelectorAll('.fade-in-up');
    if(fadeInUpElements.length > 0) {
        ScrollTrigger.batch(fadeInUpElements, {
            onEnter: batch => gsap.fromTo(batch,
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" }
            ),
            start: "top 85%"
        });
    }

    // 7. Video Hero Slow Zoom (retained from old but tweaked)
    const heroVid = document.querySelector('.hero-vid');
    if (heroVid) {
        gsap.to(heroVid, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
                trigger: heroVid.parentElement,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }
});

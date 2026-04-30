document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    /* =========================================
       CANVAS SETUP & ANIMATION (SEQUENCE 1)
       ========================================= */
    const canvas1 = document.getElementById("hero-canvas");
    const context1 = canvas1.getContext("2d");
    
    // Set canvas dimensions
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;

    const frameCount1 = 240;
    const currentFrame1 = index => (
        `./Sequence 1/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
    );

    const images1 = [];
    const seq1 = { frame: 0 };

    for (let i = 0; i < frameCount1; i++) {
        const img = new Image();
        img.src = currentFrame1(i);
        images1.push(img);
    }

    images1[0].onload = render1;

    function render1() {
        context1.clearRect(0, 0, canvas1.width, canvas1.height);
        
        // Draw image cover (maintain aspect ratio)
        const img = images1[seq1.frame];
        if(!img) return;
        
        const hRatio = canvas1.width / img.width;
        const vRatio = canvas1.height / img.height;
        const ratio  = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas1.width - img.width * ratio) / 2;
        const centerShift_y = (canvas1.height - img.height * ratio) / 2;  
        
        context1.drawImage(img, 0, 0, img.width, img.height,
                           centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }

    // GSAP ScrollTrigger for Sequence 1 & Hero Content
    let tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "+=3000",
            scrub: 0.5,
            pin: true
        }
    });

    tl1.to(seq1, {
        frame: frameCount1 - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render1,
        duration: 2
    })
    .to(".hero-content", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    });

    /* =========================================
       CANVAS SETUP & ANIMATION (SEQUENCE 2)
       ========================================= */
    const canvas2 = document.getElementById("collection-canvas");
    const context2 = canvas2.getContext("2d");

    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    const frameCount2 = 240;
    const currentFrame2 = index => (
        `./Sequence 2/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
    );

    const images2 = [];
    const seq2 = { frame: 0 };

    for (let i = 0; i < frameCount2; i++) {
        const img = new Image();
        img.src = currentFrame2(i);
        images2.push(img);
    }

    images2[0].onload = render2;

    function render2() {
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        
        const img = images2[seq2.frame];
        if(!img) return;
        
        const hRatio = canvas2.width / img.width;
        const vRatio = canvas2.height / img.height;
        const ratio  = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas2.width - img.width * ratio) / 2;
        const centerShift_y = (canvas2.height - img.height * ratio) / 2;  
        
        context2.drawImage(img, 0, 0, img.width, img.height,
                           centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }

    // Initialize cards to be hidden initially
    gsap.set('.category-card', { opacity: 0, x: 50 });

    // GSAP ScrollTrigger for Sequence 2 & Cards
    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".collection-section",
            start: "top top",
            end: "+=3000",
            scrub: 0.5,
            pin: true
        }
    });

    tl2.to(seq2, {
        frame: frameCount2 - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render2,
        duration: 2
    })
    .to('.category-card', {
        opacity: 0.8,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
    });

    // Window resize handler for canvases
    window.addEventListener("resize", () => {
        canvas1.width = window.innerWidth;
        canvas1.height = window.innerHeight;
        render1();
        
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight;
        render2();
    });

    /* =========================================
       ANIMATED COUNTERS
       ========================================= */
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 95%",
            once: true,
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + "+";
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                
                updateCounter();
            }
        });
    });

    /* =========================================
       FADE IN REVEAL ANIMATIONS
       ========================================= */
    const fadeElements = document.querySelectorAll('.section-title, .service-card, .gallery-item, .team-card');
    
    fadeElements.forEach((el, index) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    /* =========================================
       SLIDE TABS NAVBAR
       ========================================= */
    const navLinks = document.querySelectorAll('.nav-links a');
    const navSlider = document.querySelector('.nav-slider');
    
    function updateNavSlider(activeLink) {
        if (!activeLink || !navSlider) return;
        
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = activeLink.closest('.nav-links').getBoundingClientRect();
        
        const left = linkRect.left - navRect.left;
        const width = linkRect.width;
        
        navSlider.style.width = `${width}px`;
        navSlider.style.transform = `translateX(${left}px)`;
    }

    // Initialize slider position
    // Delay initialization slightly to ensure fonts and layout are rendered
    setTimeout(() => {
        const initialActive = document.querySelector('.nav-links a.active');
        if(initialActive) {
            updateNavSlider(initialActive);
        }
    }, 100);
    
    // Update on click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active from all
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked
            link.classList.add('active');
            updateNavSlider(link);
        });
    });

    // Update on resize
    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-links a.active');
        if (activeLink) updateNavSlider(activeLink);
    });

    /* =========================================
       SERVICES ACCORDION
       ========================================= */
    const serviceStrips = document.querySelectorAll('.service-strip');
    
    serviceStrips.forEach(strip => {
        strip.addEventListener('click', () => {
            serviceStrips.forEach(s => s.classList.remove('active'));
            strip.classList.add('active');
        });
    });

    /* =========================================
       STAGGER TESTIMONIALS
       ========================================= */
    const testimonialsData = [
        {
            testimonial: "My favorite solution in the market. We work 5x faster with Clarity.",
            by: "Alex, CEO",
            imgSrc: "https://i.pravatar.cc/150?img=11"
        },
        {
            testimonial: "I'm confident my data is safe with Clarity. I can't say that about other providers.",
            by: "Dan, CTO",
            imgSrc: "https://i.pravatar.cc/150?img=12"
        },
        {
            testimonial: "I know it's cliche, but we were lost before we found Clarity. Can't thank you guys enough!",
            by: "Stephanie, COO",
            imgSrc: "https://i.pravatar.cc/150?img=13"
        },
        {
            testimonial: "Clarity's products make planning for the future seamless. Can't recommend them enough!",
            by: "Marie, CFO",
            imgSrc: "https://i.pravatar.cc/150?img=14"
        },
        {
            testimonial: "If I could give 11 stars, I'd give 12. Amazing experience from start to finish.",
            by: "Andre, Head of Design",
            imgSrc: "https://i.pravatar.cc/150?img=15"
        }
    ];

    let testimonialsList = [...testimonialsData.map((t, i) => ({...t, tempId: i}))];
    const staggerContainer = document.getElementById('stagger-container');
    const prevBtn = document.getElementById('stagger-prev');
    const nextBtn = document.getElementById('stagger-next');
    let cardSize = window.innerWidth >= 640 ? 365 : 290;

    function renderTestimonials() {
        if (!staggerContainer) return;
        staggerContainer.innerHTML = '';
        
        testimonialsList.forEach((t, index) => {
            const position = testimonialsList.length % 2
                ? index - Math.floor(testimonialsList.length / 2)
                : index - Math.floor(testimonialsList.length / 2); // For 5 items it's 5%2 = 1, index - 2.
                
            const isCenter = position === 0;
            const translateX = (cardSize / 1.5) * position;
            const translateY = isCenter ? -65 : (position % 2 !== 0 ? 15 : -15);
            const rotate = isCenter ? 0 : (position % 2 !== 0 ? 2.5 : -2.5);
            
            const card = document.createElement('div');
            card.className = `stagger-card ${isCenter ? 'active' : ''}`;
            card.style.width = `${cardSize}px`;
            card.style.height = `${cardSize}px`;
            card.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`;
            
            card.innerHTML = `
                <span class="quote-corner"></span>
                <img src="${t.imgSrc}" alt="${t.by}">
                <h3>"${t.testimonial}"</h3>
                <p>- ${t.by}</p>
            `;
            
            card.addEventListener('click', () => {
                if(position !== 0) {
                    handleMove(position);
                }
            });
            
            staggerContainer.appendChild(card);
        });
    }

    function handleMove(steps) {
        if (steps > 0) {
            for (let i = steps; i > 0; i--) {
                const item = testimonialsList.shift();
                item.tempId = Math.random();
                testimonialsList.push(item);
            }
        } else if (steps < 0) {
            for (let i = steps; i < 0; i++) {
                const item = testimonialsList.pop();
                item.tempId = Math.random();
                testimonialsList.unshift(item);
            }
        }
        renderTestimonials();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => handleMove(-1));
        nextBtn.addEventListener('click', () => handleMove(1));
    }

    window.addEventListener('resize', () => {
        const newSize = window.innerWidth >= 640 ? 365 : 290;
        if(newSize !== cardSize) {
            cardSize = newSize;
            renderTestimonials();
        }
    });

    renderTestimonials();
});

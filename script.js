/**
 * Premium Personal Portfolio JavaScript
 * Client: Sonia Nanwani
 * Features: Scroll progress, Sticky Header, Mobile Navigation, Project Modals,
 *           Scroll Reveal, Animated Counters, and Simulated Contact Form.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Scroll Progress Indicator
    // ==========================================================================
    const progressBar = document.getElementById('scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = scrolled + '%';
    });

    // ==========================================================================
    // 2. Sticky Header & Scroll-to-Top Button Visibility
    // ==========================================================================
    const header = document.getElementById('main-header');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // Header transition
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll-to-top visibility
        if (scrollPos > 500) {
            scrollToTopBtn.classList.add('visible-btn');
            scrollToTopBtn.classList.remove('hidden-btn');
        } else {
            scrollToTopBtn.classList.remove('visible-btn');
            scrollToTopBtn.classList.add('hidden-btn');
        }
    });

    // Scroll to Top click event
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================================================
    // 3. Mobile Hamburger Menu Toggle
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isOpen);
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // ==========================================================================
    // 4. Active Navigation Links on Scroll
    // ==========================================================================
    const sections = document.querySelectorAll('section');

    const updateActiveNavLink = () => {
        let scrollPosition = window.scrollY + 100; // Offset for sticky nav

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Run initially

    // ==========================================================================
    // 5. Scroll Reveal Animation & Stats Counter
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    // IntersectionObserver for Reveal Animations
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Stats Counter Function
    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 1500; // milliseconds
            const stepTime = Math.max(Math.floor(duration / target), 30);
            let current = 0;

            const timer = setInterval(() => {
                current += 1;
                stat.textContent = current;
                if (current >= target) {
                    stat.textContent = target; // Safeguard exact target
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };

    // Observer to trigger counters exactly when About section is in view
    const statsSection = document.querySelector('.about-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    animateCounters();
                    countersStarted = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(statsSection);
    }

    // ==========================================================================
    // 6. Project Details Modals (Learn More)
    // ==========================================================================
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body-content');
    const modalClose = document.getElementById('modal-close');
    const learnMoreButtons = document.querySelectorAll('.btn-learn-more');

    // Projects Detailed Data Dictionary
    const projectsData = {
        ecolens: {
            title: "EcoLens AI",
            subtitle: "AI for Sustainability",
            award: "🏆 GDG Sangli TechSprint Finalist",
            description: "EcoLens AI is an advanced, computer vision-based waste management utility developed to automate plastic waste classification and boost regional recycling rates. Built during the GDG Sangli TechSprint Hackathon, the tool simplifies environmental consciousness by letting users submit raw photos of plastics and instantly receive recycling details.",
            techStack: ["Python", "Google Gemini Vision API", "Computer Vision", "Artificial Intelligence", "Flask (Dashboard)"],
            details: [
                "Utilizes the multimodal Google Gemini Vision API to parse visual inputs and determine plastic grades (PET #1, HDPE #2, PVC #3, LDPE #4, PP #5, PS #6, Other #7) with explanation logic.",
                "Designed a responsive Flask-based web application to upload images via camera or file pickers and render real-time results.",
                "Extracts structured environmental directives outlining local recycling capabilities, environmental impacts, and alternative reusable choices.",
                "Successfully advanced to the Final Round of the GDG Sangli TechSprint, receiving critical praise for alignment with global ESG goals."
            ]
        },
        cyberguard: {
            title: "CyberGuard AI",
            subtitle: "Autonomous Cybersecurity Agent",
            description: "CyberGuard AI is an autonomous, conversational security assistant that streamlines penetration testing procedures. Built on Gemini 2.0 Flash's function-calling capabilities, the system operates as a co-pilot for ethical security engineers, orchestrating local utility executions, parsing console inputs, and looking up vulnerabilities on CVE registries.",
            techStack: ["Python", "Gemini 2.0 Flash", "Function Calling", "Nmap Scanner", "Cybersecurity", "CVE Mapping"],
            workflow: [
                { id: "1", name: "Network Scan", desc: "Launches port scans via Nmap on designated targets." },
                { id: "2", name: "Service Detection", desc: "Extracts software version details from open socket streams." },
                { id: "3", name: "CVE Mapping", desc: "Queries CVE vulnerability registries for version matches." },
                { id: "4", name: "Exploit Pipeline", desc: "Aggregates actionable threat scores and generates structured reports." }
            ],
            details: [
                "Implements a reactive Python agent utilizing Gemini 2.0 Flash Function Calling, translating natural language security prompts into structured tool calls.",
                "Leverages modular Nmap scanner wrapper interfaces to query local subnets, ports, and network nodes safely.",
                "Automates vulnerability search patterns, scraping active database indexes to fetch security bulletins matching detected software configurations.",
                "Produces standardized markdown reports highlighting vulnerable entryways, impact statistics, and concrete patching directives."
            ]
        },
        somasense: {
            title: "SomaSense AI",
            subtitle: "AI for Human Well-being",
            description: "SomaSense AI is a digital wellness application exploring connection mappings between human emotional narratives and somatic physiological reactions. The project blends modern sentiment classification pipelines with holistic somatic principles like Ho'oponopono, offering users reflective wellness spaces.",
            techStack: ["Artificial Intelligence", "Natural Language Processing", "Emotion Analysis", "Wellness Technology", "Holistic Somatic Mappings"],
            details: [
                "Utilizes advanced natural language processing pipelines to parse emotional journaling logs and map sentiment vectors.",
                "Translates emotional clusters to perceived physical body zones, creating interactive heatmaps of somatic stress regions.",
                "Integrates Ho'oponopono philosophy guidelines (Repentance, Forgiveness, Gratitude, Love) to frame wellness reflections and promote calm introspection.",
                "Designed with clean, serene glassmorphic visual cues, soft color waves, and accessible interactive inputs to encourage emotional expression."
            ]
        }
    };

    const openModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        let modalHTML = `
            <div class="modal-header-section">
                ${data.award ? `<span class="modal-proj-award"><i class="fa-solid fa-trophy"></i> ${data.award.replace('🏆 ', '')}</span>` : ''}
                <h3 class="modal-proj-title">${data.title}</h3>
                <h4 class="modal-proj-subtitle">${data.subtitle}</h4>
            </div>
            
            <h4 class="modal-section-title">Project Overview</h4>
            <p class="modal-desc-text">${data.description}</p>
        `;

        // If CyberGuard, render the detailed workflow pipeline
        if (data.workflow) {
            modalHTML += `
                <h4 class="modal-section-title">Autonomous Execution Pipeline</h4>
                <div class="modal-workflow">
                    <div class="workflow-steps-flex">
            `;
            data.workflow.forEach(step => {
                modalHTML += `
                    <div class="w-step">
                        <div class="w-icon">${step.id}</div>
                        <div class="w-content">
                            <strong>${step.name}</strong> - ${step.desc}
                        </div>
                    </div>
                `;
            });
            modalHTML += `
                    </div>
                </div>
            `;
        }

        modalHTML += `
            <h4 class="modal-section-title">Key Implementations</h4>
            <ul class="modal-list">
        `;
        data.details.forEach(item => {
            modalHTML += `<li>${item}</li>`;
        });
        modalHTML += `</ul>`;

        modalHTML += `
            <h4 class="modal-section-title">Tech Stack</h4>
            <div class="modal-tech-list">
        `;
        data.techStack.forEach(tech => {
            modalHTML += `<span class="tech-badge">${tech}</span>`;
        });
        modalHTML += `</div>`;

        modalBody.innerHTML = modalHTML;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Re-enable scroll
    };

    // Attach click events to "Learn More" buttons
    learnMoreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                const projectId = card.getAttribute('data-project');
                openModal(projectId);
            }
        });
    });

    // Close button click
    modalClose.addEventListener('click', closeModal);

    // Backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Accessibility: Keyboard close (Escape)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================================================
    // 7. Interactive Contact Form Submission (Simulated)
    // ==========================================================================
    const contactForm = document.getElementById('portfolio-contact-form');
    const submitBtn = document.getElementById('btn-submit-form');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    const btnSuccess = submitBtn.querySelector('.btn-success');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic inputs verification
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name || !email || !message) return;

        // Transition states: Show loading spinner
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        submitBtn.disabled = true;

        // Send actual data using FormSubmit (free static form handler)
        fetch("https://formsubmit.co/ajax/soniananvani7@gmail.com", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(data => {
            // Transition states: Show success message
            btnSpinner.classList.add('hidden');
            btnSuccess.classList.remove('hidden');
            submitBtn.style.backgroundColor = '#10B981'; // Green accent for success

            // Reset form input values
            contactForm.reset();

            // Transition states: Restore submission button to normal state
            setTimeout(() => {
                btnSuccess.classList.add('hidden');
                btnText.classList.remove('hidden');
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = ''; // Restore original style
            }, 3000);
        })
        .catch(error => {
            console.error("Form submission error:", error);
            // Revert submit button state on failure
            btnSpinner.classList.add('hidden');
            btnText.classList.remove('hidden');
            submitBtn.disabled = false;
            alert("Oops! There was a problem submitting your message. Please try again or email directly.");
        });
    });
});

// Counter Animation for Stats
        let countersAnimated = false;

        function animateCounters() {
            if (countersAnimated) return;
            
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
            
            countersAnimated = true;
        }

        // Trigger counter animation on page load
        window.addEventListener('load', () => {
            setTimeout(animateCounters, 500);
        });

        // Word drop animation for About section
        function animateWords() {
            const aboutTexts = document.querySelectorAll('.about-text');
            let wordIndex = 0;
            
            aboutTexts.forEach((aboutText) => {
                const text = aboutText.textContent;
                const words = text.split(' ');
                
                aboutText.innerHTML = '';
                
                words.forEach((word, index) => {
                    const span = document.createElement('span');
                    span.className = 'word';
                    span.textContent = word + ' ';
                    span.style.animationDelay = `${(wordIndex + index) * 0.05}s`;
                    aboutText.appendChild(span);
                });
                
                wordIndex += words.length;
            });
        }

        // Observe about section for animation trigger
        const aboutSection = document.querySelector('.about');
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateWords();
                    // Trigger lanyard animation
                    const lanyardCard = document.getElementById('lanyardCard');
                    if (lanyardCard) {
                        lanyardCard.classList.add('animated');
                    }
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        aboutObserver.observe(aboutSection);

        // Observe contact section for badge animation
        const contactSection = document.querySelector('.contact');
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.getElementById('contactBadge').classList.add('animated');
                    contactObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        contactObserver.observe(contactSection);

        // Event gallery data
        const eventGalleries = [
            {
                title: 'Tisch Scholars Program - Dana-Farber Cancer Institute',
                images: [
                    'event1.png'
                ]
            }
            /*
            {
                title: 'Quantitative Trading Strategies - Goldman Sachs',
                images: [
                    'Workshop Session - Trading Floor',
                    'Algorithmic Trading Demo',
                    'Team Collaboration Exercise',
                    'Closing Remarks & Awards'
                ]
            },
            {
                title: 'Federal Reserve Policy & ESG Events',
                images: [
                    'Keynote Speaker Presentation',
                    'Interactive Policy Discussion',
                    'Networking with Industry Leaders',
                    'Event Venue & Attendees'
                ]
            }
            */
        ];

        let currentSlide = 0;
        let slideInterval;
        let currentGallery = [];

        // Open event modal
        function openModal(eventIndex) {
            const modal = document.getElementById('eventModal');
            const gallery = eventGalleries[eventIndex];
            
            document.getElementById('modalTitle').textContent = gallery.title;
            currentGallery = gallery.images;
            currentSlide = 0;
            
            createSlideshow();
            modal.style.display = 'block';
            startSlideshow();
        }

        function closeModal() {
            const modal = document.getElementById('eventModal');
            modal.style.display = 'none';
            stopSlideshow();
        }

        function createSlideshow() {
            const container = document.getElementById('slideshowContainer');
            const navContainer = document.getElementById('slideNav');
            
            container.innerHTML = '';
            navContainer.innerHTML = '';
            
            currentGallery.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = 'slide' + (index === 0 ? ' active' : '');
                
                // Check if image is a file (ends with .png, .jpg, etc.)
                const isImageFile = /\.(png|jpg|jpeg|gif|webp)$/i.test(image);
                
                if (isImageFile) {
                    slide.innerHTML = `
                        <div class="slide-media">
                            <img src="${image}" alt="Event photo ${index + 1}" style="width: 100%; height: 100%; object-fit: contain;">
                        </div>
                    `;
                } else {
                    slide.innerHTML = `
                        <div class="slide-media">
                            <div style="text-align: center;">
                                <div style="font-size: 3rem; margin-bottom: 1rem;"><i class="fas fa-camera"></i></div>
                                <div style="font-size: 1.2rem; color: #fff; margin-bottom: 0.5rem;">${image}</div>
                                <div style="font-size: 0.9rem; color: #888;">Photo ${index + 1} of ${currentGallery.length}</div>
                            </div>
                        </div>
                    `;
                }
                container.appendChild(slide);
                
                const dot = document.createElement('span');
                dot.className = 'dot' + (index === 0 ? ' active' : '');
                dot.onclick = () => goToSlide(index);
                navContainer.appendChild(dot);
            });
        }

        function goToSlide(n) {
            const slides = document.querySelectorAll('#slideshowContainer .slide');
            const dots = document.querySelectorAll('#slideNav .dot');
            
            if (slides.length === 0) return;
            
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = n;
            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextEventSlide() {
            const slides = document.querySelectorAll('#slideshowContainer .slide');
            if (slides.length === 0) return;
            goToSlide(currentSlide + 1);
        }

        function previousEventSlide() {
            const slides = document.querySelectorAll('#slideshowContainer .slide');
            if (slides.length === 0) return;
            goToSlide(currentSlide - 1);
        }

        function nextSlide() {
            nextEventSlide();
        }

        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlideshow() {
            clearInterval(slideInterval);
        }

        // Project Modal Data
        const projectsData = [
            {
                title: 'Career.edYOU Academy - JP Morgan Chase',
                slides: [
                    {
                        type: 'details',
                        title: 'Project Overview',
                        content: `
                            <p><strong>Objective:</strong> Complete an intensive virtual training program designed to prepare participants for careers at JP Morgan Chase, focusing on interview preparation, understanding firm culture, and building foundational business skills.</p>
                            <p><strong>Duration:</strong> 6 weeks (Sept 2025-Present)</p>
                            <p><strong>Team Size:</strong> Individual participant in cohort-based program</p>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Methodology:</h4>
                            <ul>
                                <li>Participated in structured virtual sessions covering interview preparation techniques</li>
                                <li>Engaged with recruiting team members to understand hiring processes and expectations</li>
                                <li>Studied JP Morgan Chase's culture, values, and lines of business</li>
                                <li>Developed foundational skills relevant to investment banking and financial services</li>
                                <li>Completed practical exercises simulating real-world banking scenarios</li>
                            </ul>
                        `
                    },
                    {
                        type: 'details',
                        title: 'Skills Developed',
                        content: `
                            <p><strong>Professional Development Areas:</strong></p>
                            <ul>
                                <li>Interview preparation and professional communication</li>
                                <li>Financial services industry knowledge</li>
                                <li>Business analysis and critical thinking</li>
                                <li>Professional networking and relationship building</li>
                            </ul>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Key Features:</h4>
                            <ul>
                                <li>Structured learning modules covering firm operations</li>
                                <li>Direct interaction with JP Morgan Chase recruiting team</li>
                                <li>Real-world case study analysis</li>
                                <li>Professional skill development workshops</li>
                                <li>Industry insights and career pathway guidance</li>
                            </ul>
                        `
                    },
                    {
                        type: 'details',
                        title: 'Key Outcomes',
                        content: `
                            <h4 style="color: #ff6b00; margin-bottom: 1.5rem;">Professional Development:</h4>
                            <ul>
                                <li>Enhanced understanding of investment banking operations</li>
                                <li>Improved interview and communication skills</li>
                                <li>Built foundational knowledge of financial services</li>
                                <li>Developed professional network within the industry</li>
                            </ul>
                            <h4 style="color: #ff6b00; margin-top: 2rem; margin-bottom: 1.5rem;">Career Impact:</h4>
                            <ul>
                                <li>Prepared for competitive recruitment processes</li>
                                <li>Gained insights into firm culture and expectations</li>
                                <li>Established connections with industry professionals</li>
                            </ul>
                        `
                    }
                ]
            },
            {
                title: 'Nova Scotia Green Energy Project',
                slides: [
                    {
                        type: 'details',
                        title: 'Project Overview',
                        content: `
                            <p><strong>Objective:</strong> Research, analyze, and write a comprehensive proposal to the World Bank for funding a green energy plan in Nova Scotia, with full implementation targeted by 2050.</p>
                            <p><strong>Duration:</strong> Intro to Engineering course project (Jan-May 2025)</p>
                            <p><strong>Location:</strong> Medford, MA</p>
                            <p><strong>Team Size:</strong> Individual project</p>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Methodology:</h4>
                            <ul>
                                <li>Conducted extensive research on Nova Scotia's current energy infrastructure</li>
                                <li>Analyzed financial data covering 20-year implementation timeline</li>
                                <li>Assessed feasibility of green energy transition strategies</li>
                                <li>Developed comprehensive budget and funding requirements</li>
                                <li>Created detailed implementation roadmap and milestones</li>
                                <li>Evaluated environmental and economic impact projections</li>
                            </ul>
                        `
                    },
                    {
                        type: 'details',
                        title: 'Research & Analysis',
                        content: `
                            <p><strong>Research & Analysis Tools:</strong></p>
                            <ul>
                                <li>Financial modeling and forecasting software</li>
                                <li>Energy sector data analysis</li>
                                <li>Economic impact assessment frameworks</li>
                                <li>Policy research and regulatory analysis</li>
                            </ul>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Key Components:</h4>
                            <ul>
                                <li>55-page comprehensive proposal document</li>
                                <li>20-year financial projection models</li>
                                <li>Feasibility study and risk assessment</li>
                                <li>Sustainability impact analysis</li>
                                <li>Implementation timeline and milestones</li>
                                <li>Budget breakdown and funding allocation strategy</li>
                            </ul>
                        `
                    },
                    {
                        type: 'details',
                        title: 'Key Outcomes',
                        content: `
                            <h4 style="color: #ff6b00; margin-bottom: 1.5rem;">Deliverables:</h4>
                            <ul>
                                <li>Comprehensive 55-page World Bank proposal</li>
                                <li>Detailed financial analysis spanning 20 years</li>
                                <li>Feasibility assessment with risk mitigation strategies</li>
                                <li>Sustainability roadmap for Nova Scotia's energy transition</li>
                            </ul>
                            <h4 style="color: #ff6b00; margin-top: 2rem; margin-bottom: 1.5rem;">Impact:</h4>
                            <ul>
                                <li>Demonstrated viability of large-scale green energy transition</li>
                                <li>Provided data-driven strategy for sustainable development</li>
                                <li>Created framework for long-term environmental and economic benefits</li>
                            </ul>
                        `
                    }
                ]
            },
            {
                title: 'Just Markets - Independent Forex Trader',
                slides: [
                    {
                        type: 'details',
                        title: 'Project Overview',
                        content: `
                            <p><strong>Objective:</strong> Conduct professional-level forex trading operations with emphasis on technical analysis, risk management, and disciplined execution across major currency pairs and commodities.</p>
                            <p><strong>Duration:</strong> May 2019-Dec 2023</p>
                            <p><strong>Location:</strong> Nairobi, Kenya</p>
                            <p><strong>Team Size:</strong> Independent Trader</p>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Methodology:</h4>
                            <ul>
                                <li>Performed in-depth technical analysis using multiple indicators and chart patterns</li>
                                <li>Conducted fundamental analysis of macroeconomic factors affecting currency movements</li>
                                <li>Developed and tested trading strategies across various market conditions</li>
                                <li>Implemented strict risk management protocols including position sizing</li>
                                <li>Executed trades with disciplined entry and exit strategies</li>
                                <li>Maintained detailed trading journal and performance analytics</li>
                                <li>Applied stop-loss mechanisms to protect capital</li>
                            </ul>
                        `
                    },
                    {
                        type: 'details',
                        title: 'Trading Technologies & Strategies',
                        content: `
                            <p><strong>Trading Technologies:</strong></p>
                            <ul>
                                <li>Advanced charting platforms and technical indicators</li>
                                <li>Real-time market data feeds</li>
                                <li>Trade execution platforms</li>
                                <li>Portfolio analysis tools</li>
                                <li>Python for data analysis and strategy backtesting</li>
                            </ul>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Currency Pairs Traded:</h4>
                            <ul>
                                <li>EUR/USD (Euro/US Dollar)</li>
                                <li>XAU/USD (Gold/US Dollar)</li>
                                <li>Other major and emerging market pairs</li>
                            </ul>
                        `
                    },
                    {
                        type: 'details',
                        title: 'Risk Management & Outcomes',
                        content: `
                            <h4 style="color: #ff6b00; margin-bottom: 1.5rem;">Risk Management Framework:</h4>
                            <ul>
                                <li>Position sizing based on account equity</li>
                                <li>Stop-loss placement at strategic levels</li>
                                <li>Risk per trade limitations</li>
                                <li>Portfolio diversification across pairs</li>
                                <li>Drawdown management protocols</li>
                            </ul>
                            <h4 style="color: #ff6b00; margin-top: 2rem; margin-bottom: 1.5rem;">Skills Developed:</h4>
                            <ul>
                                <li>Patience and emotional discipline in high-pressure situations</li>
                                <li>Composure during volatile market conditions</li>
                                <li>Precision in trade execution and timing</li>
                                <li>Advanced technical analysis capabilities</li>
                                <li>Comprehensive risk management expertise</li>
                            </ul>
                        `
                    }
                ]
            }
        ];

        let currentProjectSlide = 0;
        let currentProjectData = null;

        function openProjectModal(projectIndex) {
            const modal = document.getElementById('projectModal');
            currentProjectData = projectsData[projectIndex];
            currentProjectSlide = 0;
            
            document.getElementById('projectModalTitle').textContent = currentProjectData.title;
            createProjectSlideshow();
            modal.style.display = 'block';
        }

        function closeProjectModal() {
            const modal = document.getElementById('projectModal');
            modal.style.display = 'none';
        }

     // Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

        function createProjectSlideshow() {
            const container = document.getElementById('projectSlideshow');
            const navContainer = document.getElementById('projectNav');
            
            const existingSlides = container.querySelectorAll('.modal-slide');
            existingSlides.forEach(slide => slide.remove());
            
            navContainer.innerHTML = '';
            
            currentProjectData.slides.forEach((slide, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'modal-slide' + (index === 0 ? ' active' : '');
                
                if (slide.type === 'details') {
                    slideDiv.innerHTML = `
                        <div class="modal-slide-content">
                            <h3>${slide.title}</h3>
                            ${slide.content}
                        </div>
                    `;
                } else {
                    slideDiv.innerHTML = `
                        <div class="modal-slide-content">
                            <h3>${slide.title}</h3>
                            <div class="slide-media">
                                <div style="text-align: center;">
                                    <div style="font-size: 3rem; margin-bottom: 1rem;"><i class="fas fa-image"></i></div>
                                    <div style="font-size: 1.2rem; color: #fff;">${slide.title}</div>
                                    <div style="font-size: 0.9rem; color: #888; margin-top: 0.5rem;">Media content placeholder</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                container.appendChild(slideDiv);
                
                const dot = document.createElement('span');
                dot.className = 'modal-dot' + (index === 0 ? ' active' : '');
                dot.onclick = () => goToProjectSlide(index);
                navContainer.appendChild(dot);
            });
            
            updateSlideCounter();
        }

        function updateSlideCounter() {
            const counter = document.getElementById('slideCounter');
            const totalSlides = currentProjectData.slides.length;
            counter.textContent = `Slide ${currentProjectSlide + 1} of ${totalSlides}`;
        }

        function goToProjectSlide(n) {
            const slides = document.querySelectorAll('#projectSlideshow .modal-slide');
            const dots = document.querySelectorAll('#projectNav .modal-dot');
            
            slides[currentProjectSlide].classList.remove('active');
            dots[currentProjectSlide].classList.remove('active');
            
            currentProjectSlide = n;
            if (currentProjectSlide >= slides.length) currentProjectSlide = 0;
            if (currentProjectSlide < 0) currentProjectSlide = slides.length - 1;
            
            slides[currentProjectSlide].classList.add('active');
            dots[currentProjectSlide].classList.add('active');
            
            updateSlideCounter();
        }

        function nextProjectSlide() {
            goToProjectSlide(currentProjectSlide + 1);
        }

        function previousProjectSlide() {
            goToProjectSlide(currentProjectSlide - 1);
        }

        // Keyboard navigation for event and certification modals
        document.addEventListener('keydown', function(e) {
            const projectModal = document.getElementById('projectModal');
            const eventModal = document.getElementById('eventModal');
            
            if (projectModal.style.display === 'block') {
                if (e.key === 'ArrowRight') {
                    nextProjectSlide();
                } else if (e.key === 'ArrowLeft') {
                    previousProjectSlide();
                } else if (e.key === 'Escape') {
                    closeProjectModal();
                }
            }
            
            if (eventModal.style.display === 'block') {
                if (e.key === 'ArrowRight') {
                    nextEventSlide();
                } else if (e.key === 'ArrowLeft') {
                    previousEventSlide();
                } else if (e.key === 'Escape') {
                    closeModal();
                }
            }
        });

        // Certifications functionality
        let currentCert = 0;
        let certInterval;

        function setCertification(n) {
            const slides = document.querySelectorAll('.cert-slide');
            const dots = document.querySelectorAll('.cert-dot');
            
            slides[currentCert].classList.remove('active');
            dots[currentCert].classList.remove('active');
            
            currentCert = n;
            if (currentCert >= slides.length) currentCert = 0;
            if (currentCert < 0) currentCert = slides.length - 1;
            
            slides[currentCert].classList.add('active');
            dots[currentCert].classList.add('active');
            
            clearInterval(certInterval);
            startCertRotation();
        }

        function nextCertSlide() {
            let next = currentCert + 1;
            if (next >= document.querySelectorAll('.cert-slide').length) {
                next = 0;
            }
            setCertification(next);
        }

        function previousCert() {
            let prev = currentCert - 1;
            if (prev < 0) {
                prev = document.querySelectorAll('.cert-slide').length - 1;
            }
            setCertification(prev);
        }

        function nextCert() {
            nextCertSlide();
        }

        function startCertRotation() {
            certInterval = setInterval(nextCert, 5000);
        }

        // Observe certifications section
        const certSection = document.querySelector('.certifications');
        const certObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCertRotation();
                    certObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        certObserver.observe(certSection);

        // Testimonials functionality
        let currentTestimonial = 0;
        let testimonialInterval;

        function animateTestimonialWords(testimonialIndex) {
            const slides = document.querySelectorAll('.testimonial-slide');
            const textElement = slides[testimonialIndex].querySelector('.testimonial-text');
            const text = textElement.textContent.trim();
            const words = text.split(' ');
            
            textElement.innerHTML = '';
            textElement.classList.remove('animate');
            
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.className = 'word';
                span.textContent = word + ' ';
                span.style.animationDelay = `${index * 0.03}s`;
                textElement.appendChild(span);
            });
            
            setTimeout(() => {
                textElement.classList.add('animate');
            }, 50);
        }

        function setTestimonial(n) {
            const slides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.testimonial-dot');
            
            slides[currentTestimonial].classList.remove('active');
            dots[currentTestimonial].classList.remove('active');
            
            currentTestimonial = n;
            
            slides[currentTestimonial].classList.add('active');
            dots[currentTestimonial].classList.add('active');
            
            animateTestimonialWords(currentTestimonial);
            
            clearInterval(testimonialInterval);
            startTestimonialRotation();
        }

        function nextTestimonial() {
            let next = currentTestimonial + 1;
            if (next >= document.querySelectorAll('.testimonial-slide').length) {
                next = 0;
            }
            setTestimonial(next);
        }

        function startTestimonialRotation() {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        }

        // Observe testimonials section
        const testimonialsSection = document.querySelector('.testimonials');
        const testimonialsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTestimonialWords(0);
                    startTestimonialRotation();
                    testimonialsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        testimonialsObserver.observe(testimonialsSection);

        // Floating navigation
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update active state
            document.querySelectorAll('.float-nav-btn').forEach(btn => btn.classList.remove('active'));
            event.currentTarget.classList.add('active');
        }

        // Floating navigation - show only near end of page
        function checkFloatingNav() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
            
            const floatingNav = document.querySelector('.floating-nav');
            
            // Show when user has scrolled 70% of the page
            if (scrollPercentage > 0.7) {
                floatingNav.classList.add('visible');
            } else {
                floatingNav.classList.remove('visible');
            }
        }

        // Update active floating nav button on scroll
        window.addEventListener('scroll', () => {
            checkFloatingNav();
            
            const sections = ['home', 'about', 'projects', 'seminars', 'contact'];
            const floatBtns = document.querySelectorAll('.float-nav-btn');
            
            let current = '';
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = sectionId;
                }
            });
            
            floatBtns.forEach((btn, index) => {
                btn.classList.remove('active');
                if (sections[index] === current) {
                    btn.classList.add('active');
                }
            });
        });

        // Close modals when clicking outside
        window.onclick = function(event) {
            const eventModal = document.getElementById('eventModal');
            const projectModal = document.getElementById('projectModal');
            const successModal = document.getElementById('successModal');
            if (event.target === eventModal) {
                closeModal();
            }
            if (event.target === projectModal) {
                closeProjectModal();
            }
            if (event.target === successModal) {
                closeSuccessModal();
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission handler
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnHTML = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            submitBtn.disabled = true;

            const formData = new FormData(this);

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    openSuccessModal();
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
            }
        });

        // Add scroll effect to navigation
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                nav.style.boxShadow = 'none';
            } else {
                nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
            }
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Open success modal
        function openSuccessModal() {
            const modal = document.getElementById('successModal');
            modal.style.display = 'block';
            const icon = modal.querySelector('.success-icon');
            if (icon) {
                icon.style.opacity = '0';
                icon.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    icon.style.opacity = '1';
                    icon.style.transform = 'scale(1)';
                }, 100);
            }
        }

        // Close success modal
        function closeSuccessModal() {
            const modal = document.getElementById('successModal');
            modal.style.display = 'none';
        }

        // Form submission - allow FormSubmit to handle it naturally
        // No preventDefault needed, form will submit directly to FormSubmit
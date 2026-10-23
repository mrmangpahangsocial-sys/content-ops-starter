import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

const photos = [
    {
        src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
        alt: 'A guest enjoying a fresh hair styling'
    },
    {
        src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
        alt: 'Bright, modern salon styling chairs'
    },
    {
        src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
        alt: 'A relaxing facial and skin care treatment'
    },
    {
        src: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85',
        alt: 'A stylist creating a polished hair look'
    },
    {
        src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85',
        alt: 'Makeup brushes and beauty essentials'
    },
    {
        src: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=85',
        alt: 'A calm, softly lit beauty studio'
    },
    {
        src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85',
        alt: 'A close-up beauty portrait with natural makeup'
    }
];

const services = [
    {
        number: '01 / CARE',
        title: 'Skin & facial care',
        description: 'A moment to refresh, unwind, and give your skin some thoughtful attention.',
        photoClass: 'service-photo-one',
        photoLabel: 'Close-up of a relaxed, self-care moment',
        linkLabel: 'Ask about skin and facial care'
    },
    {
        number: '02 / STYLE',
        title: 'Hair & styling',
        description: 'Everyday care and special-occasion styling, shaped around your look.',
        photoClass: 'service-photo-two',
        photoLabel: 'Elegant beauty styling in a warm studio',
        linkLabel: 'Ask about hair and styling'
    },
    {
        number: '03 / FINISH',
        title: 'Makeup & occasion',
        description: 'Soft, polished looks for celebrations, special days, and everything in between.',
        photoClass: 'service-photo-three',
        photoLabel: 'Beautifully arranged makeup brushes and cosmetics',
        linkLabel: 'Ask about makeup and occasion styling'
    }
];

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Yana+Beauty+Parlor+Birtamode+Jhapa+Nepal';

function Brand({ footer = false }) {
    return (
        <a className={`brand${footer ? ' footer-brand' : ''}`} href="#home" aria-label={footer ? 'Yana Beauty Parlor, back to top' : 'Yana Beauty Parlor home'}>
            <span className="brand-mark" aria-hidden="true">Y</span>
            <span className="brand-name">Yana <span>Beauty Parlor</span></span>
        </a>
    );
}

export default function HomePage() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [carouselPaused, setCarouselPaused] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const menuButtonRef = useRef(null);
    const touchStartX = useRef(0);

    useEffect(() => {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateMotionPreference = () => setReduceMotion(motionQuery.matches);

        updateMotionPreference();
        motionQuery.addEventListener('change', updateMotionPreference);
        return () => motionQuery.removeEventListener('change', updateMotionPreference);
    }, []);

    useEffect(() => {
        if (reduceMotion || carouselPaused) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            if (!document.hidden) {
                setActiveSlide((currentSlide) => (currentSlide + 1) % photos.length);
            }
        }, 5000);

        return () => window.clearInterval(timer);
    }, [carouselPaused, reduceMotion]);

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [menuOpen]);

    function showSlide(index) {
        setActiveSlide((index + photos.length) % photos.length);
    }

    function closeNavigation() {
        setMenuOpen(false);
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape' && menuOpen) {
            closeNavigation();
            menuButtonRef.current?.focus();
        }
    }

    function handleTouchEnd(event) {
        const touchDistance = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(touchDistance) > 45) {
            showSlide(activeSlide + (touchDistance < 0 ? 1 : -1));
        }
    }

    return (
        <div className={`yana-site${menuOpen ? ' menu-open' : ''}`} onKeyDown={handleKeyDown}>
            <Head>
                <title>Yana Beauty Parlor | Beauty, with intention</title>
                <meta
                    name="description"
                    content="Discover Yana Beauty Parlor in Birtamode, Jhapa, Nepal — thoughtful beauty services in a calm, welcoming space."
                />
                <meta name="theme-color" content="#f7f4ef" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <a className="skip-link" href="#main">Skip to content</a>

            <header className="site-header">
                <Brand />
                <button
                    ref={menuButtonRef}
                    className="menu-toggle"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="site-navigation"
                    aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    onClick={() => setMenuOpen((isOpen) => !isOpen)}
                >
                    <span></span>
                    <span></span>
                </button>
                <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} id="site-navigation" aria-label="Main navigation">
                    <a href="#home" onClick={closeNavigation}>Home</a>
                    <a href="#services" onClick={closeNavigation}>Services</a>
                    <a href="#team" onClick={closeNavigation}>Our staff</a>
                    <a href="#about" onClick={closeNavigation}>About us</a>
                    <a href="#contact" onClick={closeNavigation}>Contact</a>
                    <a className="nav-visit" href="#contact" onClick={closeNavigation}>Plan your visit <span aria-hidden="true">↗</span></a>
                </nav>
            </header>

            <main id="main">
                <section className="hero" id="home" aria-labelledby="hero-title">
                    <div
                        className="hero-carousel"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Yana Beauty Parlor photos"
                        onMouseEnter={() => setCarouselPaused(true)}
                        onMouseLeave={() => setCarouselPaused(false)}
                        onFocus={() => setCarouselPaused(true)}
                        onBlur={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) {
                                setCarouselPaused(false);
                            }
                        }}
                        onTouchStart={(event) => {
                            touchStartX.current = event.changedTouches[0].clientX;
                        }}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                            {photos.map((photo, index) => (
                                <div
                                    className="carousel-slide"
                                    role="group"
                                    aria-roledescription="slide"
                                    aria-label={`${index + 1} of ${photos.length}`}
                                    aria-hidden={index !== activeSlide}
                                    key={photo.src}
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        fetchPriority={index === 0 ? 'high' : undefined}
                                        loading={index === 0 ? undefined : 'lazy'}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="hero-copy">
                            <p className="eyebrow"><span></span> BEAUTY, WITH INTENTION · BIRTAMODE, JHAPA</p>
                            <h1 id="hero-title">Yana Beauty Parlor</h1>
                            <p className="hero-description">Beauty that feels like <em>you.</em></p>
                            <div className="hero-actions">
                                <a className="button button-light" href="#services">Explore our services <span aria-hidden="true">→</span></a>
                                <a className="text-link" href="#about">Get to know Yana <span aria-hidden="true">↗</span></a>
                            </div>
                        </div>
                        <div className="carousel-controls">
                            <button className="carousel-arrow carousel-previous" type="button" aria-label="Previous photo" onClick={() => showSlide(activeSlide - 1)}>←</button>
                            <div className="carousel-dots" aria-label="Choose a photo">
                                {photos.map((photo, index) => (
                                    <button
                                        className={`carousel-dot${index === activeSlide ? ' is-active' : ''}`}
                                        type="button"
                                        aria-label={`Show photo ${index + 1}`}
                                        aria-current={index === activeSlide ? 'true' : undefined}
                                        onClick={() => showSlide(index)}
                                        key={photo.src}
                                    />
                                ))}
                            </div>
                            <button className="carousel-arrow carousel-next" type="button" aria-label="Next photo" onClick={() => showSlide(activeSlide + 1)}>→</button>
                            <span className="visually-hidden carousel-status" aria-live="polite">Photo {activeSlide + 1} of {photos.length}</span>
                        </div>
                    </div>
                </section>

                <section className="intro section-wrap" id="about" aria-labelledby="about-title">
                    <div className="intro-label">
                        <p className="eyebrow">WELCOME TO YANA</p>
                        <span className="tiny-flower" aria-hidden="true">✳</span>
                    </div>
                    <div className="intro-content">
                        <h2 id="about-title">A beautiful feeling<br />begins with <em>good care.</em></h2>
                        <div className="intro-bottom">
                            <p>
                                Yana Beauty Parlor is a neighborhood beauty space in Birtamode,
                                made for unrushed moments and care that feels personal. Come as
                                you are; leave feeling a little more like yourself.
                            </p>
                            <a className="text-link" href="#contact">Come say hello <span aria-hidden="true">↗</span></a>
                        </div>
                    </div>
                </section>

                <section className="services section-wrap" id="services" aria-labelledby="services-title">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">A LITTLE SOMETHING FOR YOU</p>
                            <h2 id="services-title">Our <em>services</em></h2>
                        </div>
                        <p className="heading-aside">The finishing touches, the feel-good rituals,<br />the time that’s all yours.</p>
                    </div>
                    <div className="service-grid">
                        {services.map((service) => (
                            <article className="service-card" key={service.number}>
                                <div className={`service-photo ${service.photoClass}`} role="img" aria-label={service.photoLabel}></div>
                                <div className="service-card-content">
                                    <span className="service-number">{service.number}</span>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <a href="#contact" aria-label={service.linkLabel}>Ask about this <span aria-hidden="true">↗</span></a>
                                </div>
                            </article>
                        ))}
                    </div>
                    <p className="service-note">Service availability and details may vary. Please ask us when you visit.</p>
                </section>

                <section className="quote-band" aria-label="Our promise">
                    <div className="quote-decoration" aria-hidden="true">✳</div>
                    <p className="eyebrow">THE YANA FEELING</p>
                    <blockquote>“The best beauty ritual is the one that helps you feel <em>good in your own skin.</em>”</blockquote>
                    <span className="quote-location">A LITTLE CARE, RIGHT HERE IN BIRTAMODE</span>
                </section>

                <section className="approach section-wrap" id="team" aria-labelledby="approach-title">
                    <div className="approach-visual" role="img" aria-label="Calm beauty space with natural textures and soft light">
                        <div className="approach-image"></div>
                        <span className="approach-tag">PERSONAL CARE, ALWAYS</span>
                    </div>
                    <div className="approach-copy">
                        <p className="eyebrow">A THOUGHTFUL APPROACH</p>
                        <h2 id="approach-title">Good care is<br />always <em>personal.</em></h2>
                        <p>
                            Every person is different, and your beauty routine should feel that
                            way too. Our team takes time to listen, understand what you’re
                            looking for, and help you feel comfortable throughout your visit.
                        </p>
                        <p className="approach-detail"><span>01</span> A warm welcome, with no fuss.</p>
                        <p className="approach-detail"><span>02</span> Care shaped around your occasion.</p>
                        <p className="approach-detail"><span>03</span> A little time that’s just for you.</p>
                        <a className="button button-outline" href="#contact">Visit Yana <span aria-hidden="true">↗</span></a>
                    </div>
                </section>

                <section className="contact" id="contact" aria-labelledby="contact-title">
                    <div className="contact-inner section-wrap">
                        <div className="contact-copy">
                            <p className="eyebrow">WE’D LOVE TO WELCOME YOU</p>
                            <h2 id="contact-title">Your next feel-good<br />moment is <em>near.</em></h2>
                            <p>Find us in Birtamode, Jhapa, Nepal. We look forward to seeing you.</p>
                            <a className="button button-light" href={mapsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
                        </div>
                        <div className="contact-card">
                            <div className="contact-card-icon" aria-hidden="true">Y.</div>
                            <p className="eyebrow">COME FIND US</p>
                            <h3>Yana Beauty Parlor</h3>
                            <p className="address">Birtamode<br />Jhapa, Nepal</p>
                            <span className="contact-rule"></span>
                            <p className="contact-small">For appointments and service details, please visit us or use the directions link.</p>
                            <a className="contact-map-link" href={mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <Brand footer />
                <p>Beauty, with intention. <span>·</span> Birtamode, Jhapa, Nepal</p>
                <a href="#home" className="back-top">BACK TO TOP ↑</a>
                <small>© {new Date().getFullYear()} Yana Beauty Parlor</small>
            </footer>
        </div>
    );
}

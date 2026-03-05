// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

const darkSections = document.querySelectorAll('.ai-works, .ai-tools, .section-transition');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let overDark = false;
    const navBottom = navbar.getBoundingClientRect().bottom;
    darkSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < navBottom && rect.bottom > 0) overDark = true;
    });
    navbar.classList.toggle('navbar-dark', overDark);
});

// ============================================
// MOBILE NAVIGATION
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
});

// Close menu on link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

// ============================================
// PORTFOLIO FILTERS
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ============================================
// STAT COUNTER ANIMATION
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');
let statAnimated = false;

function animateStats() {
    if (statAnimated) return;

    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
        statAnimated = true;
        statNumbers.forEach(num => {
            const target = parseInt(num.dataset.target);
            const duration = 1500;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                num.textContent = Math.floor(target * eased);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    num.textContent = target;
                }
            }

            requestAnimationFrame(update);
        });
    }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function addRevealClasses() {
    const elements = document.querySelectorAll(
        '.service-card, .portfolio-card, .ai-card, .contact-item, .about-text, .about-image'
    );
    elements.forEach(el => el.classList.add('reveal'));
}

function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// AI GALLERY SIDE PANEL
// ============================================
const artworkData = [
    {
        title: 'The Cathedral of Becoming',
        tool: 'Google Gemini + Nano Banana 2',
        desc: 'Structure dissolves, but order remains. Nature is not the opposite of architecture — it is architecture evolved.',
        toolsList: ['Google Gemini', 'Nano Banana 2'],
        cover: 'assets/gallery/01-dreamscape-horizons/Cathedral of Becoming.png',
        type: 'image',
        refs: []
    },
    {
        title: 'Midnight Frequency',
        tool: 'Google Gemini + Nano Banana 2',
        desc: 'In the glow of neon shadows, her steady gaze cuts through the electric silence.',
        toolsList: ['Google Gemini', 'Nano Banana 2'],
        cover: 'assets/gallery/02-neon-portraits/Midnight Frequency.png',
        type: 'image',
        refs: []
    },
    {
        title: 'Emotions Made Visible',
        tool: 'OpenArt + Seedance 5.0 Lite',
        desc: 'Ribbons of color burst like untamed thoughts learning how to fly.',
        toolsList: ['OpenArt', 'Seedance 5.0 Lite'],
        cover: 'assets/gallery/03-abstract-emotions/Emotions made visible - fine art.png',
        type: 'image',
        refs: []
    },
    {
        title: 'Seasons',
        tool: 'Nim + Kling O1',
        desc: 'Walking through the turning year as the world transforms around her, her flowing gown shifting colors like the seasons themselves.',
        toolsList: ['Grok Imagine', 'Nim', 'Kling O1'],
        cover: 'assets/gallery/04-motion-stories/Seasons.mp4',
        type: 'video',
        refs: []
    },
    {
        title: 'Future Cities',
        tool: 'Google Gemini + Nano Banana 2',
        desc: 'A future city where architecture grows like a forest — terraced gardens cascading down buildings, community life visible on multiple levels, harmonious with nature.',
        toolsList: ['Google Gemini', 'Nano Banana 2'],
        cover: 'assets/gallery/05-future-cities/Future Cities.png',
        type: 'image',
        refs: []
    },
    {
        title: 'Scented Candle',
        tool: 'Nim + Seedance 1.5',
        desc: 'A quiet flame flickers on the bedside table as delicate ribbons of smoke drift softly.',
        toolsList: ['Nim', 'Seedance 1.5'],
        cover: 'assets/gallery/06-brand-concepts/Scented candle.mp4',
        type: 'video',
        refs: []
    },
    {
        title: 'Breath of Light',
        tool: 'Nim + Veo 3.1',
        desc: 'She rises through a veil of golden mist, as if the night itself is learning how to breathe.',
        toolsList: ['Nim', 'Veo 3.1'],
        cover: 'assets/gallery/07-ethereal-motion/Breath of Light.mp4',
        type: 'video',
        refs: []
    },
    {
        title: 'Light Studies',
        tool: 'Nim + Kling 3 Pro',
        desc: 'A quiet shard of sun breaks the dark, and the room is stained with wandering colors.',
        toolsList: ['Nim', 'Kling 3 Pro'],
        cover: 'assets/gallery/08-light-studies/ltNEEjxzin1TSk1pDrf1B_output_0.mp4',
        type: 'video',
        refs: []
    },
    {
        title: 'Organic Forms',
        tool: 'Nim + Grok Imagine',
        desc: 'A quiet shape remembers a thousand forms, dissolving and returning like a thought that never quite ends.',
        toolsList: ['Nim', 'Grok Imagine'],
        cover: 'assets/gallery/09-organic-forms/Organic motion loop.mp4',
        type: 'video',
        refs: []
    },
    {
        title: 'Liquid Metal Glitch',
        tool: 'Nim + Seedance 1.5',
        desc: 'Catching whispers of color in its silent, gliding pulse.',
        toolsList: ['Nim', 'Seedance 1.5'],
        cover: 'assets/gallery/10-digital-textures/Liquid metal glitch flow.mp4',
        type: 'video',
        refs: []
    },
    {
        title: 'Scented Candle',
        tool: 'Nim + Kling 3 Pro',
        desc: 'Soft candlelight and a gentle fragrance fill the room, turning quiet moments into pure relaxation.',
        toolsList: ['Nim', 'Kling 3 Pro'],
        cover: 'assets/gallery/11-scented-candle/Scented candle product reel.mp4',
        type: 'video',
        refs: []
    }
];

const aiGalleryWrap = document.getElementById('aiGalleryWrap');
const aiSidePanel = document.getElementById('aiSidePanel');
const panelClose = document.getElementById('panelClose');
const panelImage = document.getElementById('panelImage');
const panelTool = document.getElementById('panelTool');
const panelTitle = document.getElementById('panelTitle');
const panelDesc = document.getElementById('panelDesc');
const panelRefSection = document.getElementById('panelRefSection');
const panelThumbnails = document.getElementById('panelThumbnails');
const panelCounter = document.getElementById('panelCounter');
const panelPrev = document.getElementById('panelPrev');
const panelNext = document.getElementById('panelNext');
const aiCards = document.querySelectorAll('.ai-card[data-index]');

let currentPanelIndex = 0;

function updatePanel(index) {
    const data = artworkData[index];
    currentPanelIndex = index;

    panelImage.innerHTML = '';
    panelImage.style.background = '';
    if (data.type === 'video' && data.cover) {
        const vid = document.createElement('video');
        vid.src = data.cover;
        vid.autoplay = true;
        vid.muted = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.style.cssText = 'width:100%;display:block;border-radius:16px 16px 0 0';
        panelImage.appendChild(vid);
    } else if (data.cover) {
        const img = document.createElement('img');
        img.src = data.cover;
        img.alt = data.title;
        img.style.cssText = 'width:100%;display:block;border-radius:16px 16px 0 0';
        panelImage.appendChild(img);
    } else {
        panelImage.style.background = data.gradient;
        panelImage.textContent = 'AI Artwork';
    }
    panelTool.textContent = data.tool;
    panelTitle.textContent = data.title;
    panelDesc.textContent = data.desc;

    if (data.refs && data.refs.length > 0) {
        panelRefSection.style.display = '';
        panelThumbnails.innerHTML = data.refs
            .map(src => `<div class="panel-thumb" style="background: url('${src}') center/cover no-repeat"></div>`)
            .join('');
    } else {
        panelRefSection.style.display = 'none';
    }

    panelCounter.textContent = `${index + 1} / ${artworkData.length}`;

    aiCards.forEach(c => c.classList.remove('active-card'));
    aiCards[index].classList.add('active-card');
}

function openPanel(index) {
    updatePanel(index);
    aiGalleryWrap.classList.add('panel-open');
}

function closePanel() {
    aiGalleryWrap.classList.remove('panel-open');
    aiCards.forEach(c => c.classList.remove('active-card'));
}

aiCards.forEach(card => {
    card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index);
        if (aiGalleryWrap.classList.contains('panel-open') && currentPanelIndex === idx) {
            closePanel();
        } else {
            openPanel(idx);
        }
    });
});

panelClose.addEventListener('click', closePanel);
document.getElementById('panelOverlay').addEventListener('click', closePanel);

panelPrev.addEventListener('click', () => {
    const prev = (currentPanelIndex - 1 + artworkData.length) % artworkData.length;
    updatePanel(prev);
});

panelNext.addEventListener('click', () => {
    const next = (currentPanelIndex + 1) % artworkData.length;
    updatePanel(next);
});

// ============================================
// INIT
// ============================================
addRevealClasses();

window.addEventListener('scroll', () => {
    animateStats();
    revealOnScroll();
});

// Trigger initial check
animateStats();
revealOnScroll();

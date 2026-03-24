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
// SERVICE CARD VIDEO HOVER
// ============================================
document.querySelectorAll('.service-card').forEach(card => {
    const video = card.querySelector('video.service-card-bg');
    if (!video) return;
    card.addEventListener('mouseenter', () => { video.play(); });
    card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
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

// ============================================
// PORTFOLIO MODAL
// ============================================
const projectData = [
    {
        tag: 'Research · Flagship',
        coverImage: 'assets/projects/project-1-cover.png',
        title: 'Virtual screening of molecular inhibitors targeting <em>Mycobacterium tuberculosis</em> proteins',
        desc: 'Led computational screening of candidate molecules targeting tuberculosis proteins and coordinated research workflows between computational and wet-laboratory teams, supporting the project from proposal development to publication.',
        role: 'Computational Research Investigator & Project Coordinator',
        roleDesc: 'I served as the computational researcher and project coordinator, contributing to both the scientific research and operational management of the project.',
        duration: '3 years',
        team: '7–10 members',
        tools: 'AutoDock, Discovery Studio, Glide, GOLD',
        overview: 'Conducted computational research to identify potential molecular inhibitors against tuberculosis proteins while coordinating the full research lifecycle — from proposal development, budgeting, and procurement to publication and conference presentation.',
        workflow: [
            { num: 1, title: 'Research Planning', bullets: [
                'Reviewed scientific literature to identify tuberculosis protein targets',
                'Supported preparation of the research proposal and project documentation',
                'Assisted in budget planning and project scope definition'
            ]},
            { num: 2, title: 'Computational Screening', bullets: [
                'Performed molecular docking and virtual screening of candidate molecules',
                'Evaluated molecular interactions and binding affinities',
                'Identified promising compounds for further experimental investigation'
            ]},
            { num: 3, title: 'Cross-Disciplinary Coordination', bullets: [
                'Shared computational findings with organic chemistry and biochemical researchers',
                'Coordinated sequencing of research activities across teams',
                'Ensured computational results informed downstream laboratory experiments'
            ]},
            { num: 4, title: 'Resource Procurement & Operations', bullets: [
                'Prepared supplier bidding and acquisition documentation',
                'Coordinated procurement of laboratory reagents, cultures, and materials',
                'Maintained research documentation and administrative reporting'
            ]},
            { num: 5, title: 'Publication & Dissemination', bullets: [
                'Drafted sections of the research manuscript, followed by consolidation and proofreading',
                'Presented in scientific conferences',
                'Supported submission and publication of the research paper'
            ]}
        ],
        outcomesLabel: 'Key Contributions',
        outcomes: [
            'Led molecular docking and virtual screening experiments',
            'Delivered computational results that informed laboratory experiments',
            'Coordinated collaboration between computational, organic chemistry, and biochemical researchers',
            'Guided student researchers performing computational experiments',
            'Contributed to research publication and conference presentations'
        ]
    },
    {
        tag: 'Research',
        coverImage: 'assets/projects/project-2-cover.png',
        title: 'Computational Drug Discovery Workflow',
        desc: 'Designed and executed a computational screening workflow to evaluate candidate molecules targeting tuberculosis proteins, producing experimental insights that guided downstream laboratory research.',
        role: 'Computational Researcher',
        roleDesc: '',
        duration: '3 years',
        team: '7–10 members',
        overview: 'Computational drug discovery methods can significantly narrow down candidate molecules before laboratory experimentation begins. This project focused on developing a structured workflow for screening potential inhibitors targeting tuberculosis proteins.\n\nBy conducting molecular docking, interaction analysis, and compound toxicology predictions, the computational experiments identified promising compounds that informed laboratory experiments conducted by collaborating research teams.',
        outcomesLabel: 'Key Contributions',
        outcomes: [
            'Designed the computational screening workflow for evaluating candidate molecules',
            'Conducted molecular docking simulations and analyzed molecular interactions',
            'Evaluated candidate compounds based on binding affinity, interaction profiles, and toxicology',
            'Generated computational insights that guided laboratory experimentation',
            'Guided student researchers performing computational docking experiments'
        ],
        workflowLabel: 'Computational Workflow',
        workflow: [
            { num: 1, title: 'Literature Review', bullets: [
                'Reviewed scientific literature and bioinformatics databases to understand existing tuberculosis research, identify relevant protein structures, and determine suitable computational screening approaches.'
            ]},
            { num: 2, title: 'Molecular Target Identification', bullets: [
                'Selected specific <em>Mycobacterium tuberculosis</em> protein targets associated with bacterial survival or pathogenicity, preparing the structural data required for computational docking experiments.'
            ]},
            { num: 3, title: 'Molecular Docking Simulations', bullets: [
                'Conducted virtual screening and molecular docking experiments to evaluate how candidate molecules interact with selected protein targets, generating binding affinity and interaction data.'
            ]},
            { num: 4, title: 'Interaction Analysis & Candidate Ranking', bullets: [
                'Analyzed docking results to assess molecular interactions, binding stability, and docking scores, ranking candidate compounds based on their predicted inhibitory potential and toxicology.'
            ]},
            { num: 5, title: 'Experimental Recommendations for Wet-Lab Testing', bullets: [
                'Compiled computational findings and identified promising candidate molecules to guide downstream laboratory experiments conducted by organic chemistry and biochemical researchers.'
            ]}
        ],
        secondaryOutcomes: [
            'Identified promising molecular candidates for laboratory experimentation',
            'Established a structured computational screening workflow',
            'Enabled more focused laboratory experiments through computational insights'
        ],
        secondaryOutcomesLabel: 'Outcome',
        tools: 'AutoDock, Discovery Studio, Glide, GOLD'
    },
    {
        tag: 'Operations',
        coverImage: 'assets/projects/project-3-cover.png',
        title: 'Research Operations & Procurement Coordination',
        desc: 'Coordinated the operational and administrative aspects of a multidisciplinary tuberculosis research project, supporting procurement, documentation, budgeting, and reporting processes required for successful project execution.',
        role: 'Research Operations Coordinator',
        duration: '3 years',
        team: '7–10 members',
        overview: 'Scientific research projects require structured operational support to manage procurement, financial documentation, and administrative reporting. This project involved coordinating the operational infrastructure that supported the research team\'s scientific work.\n\nThe responsibilities included procurement coordination, documentation management, financial reporting support, and maintaining project records to ensure smooth research execution.',
        outcomesLabel: 'Key Contributions',
        outcomes: [
            'Assisted in preparing research proposals and supporting project documentation',
            'Supported project budgeting and financial documentation',
            'Prepared procurement paperwork for supplier bidding processes',
            'Drafted acquisition documents for ordering laboratory reagents and bacterial cultures',
            'Maintained organized research records and project documentation',
            'Assisted with administrative reporting including salary documentation and financial reports'
        ],
        workflowLabel: 'Operations Workflow',
        hideWorkflowNums: true,
        workflow: [
            { num: 1, title: 'Project Proposal Preparation', bullets: [] },
            { num: 2, title: 'Budget Planning & Documentation', bullets: [] },
            { num: 3, title: 'Supplier Bidding & Procurement Requests', bullets: [] },
            { num: 4, title: 'Acquisition of Laboratory Materials', bullets: [] },
            { num: 5, title: 'Administrative Reporting & Financial Documentation', bullets: [] }
        ],
        secondaryOutcomes: [
            'Ensured timely procurement of laboratory materials and resources',
            'Maintained structured documentation supporting research operations',
            'Supported the administrative and operational needs of the research team'
        ],
        secondaryOutcomesLabel: 'Outcome',
        tools: 'Google Workspace, MS Office'
    },
    {
        tag: 'Development',
        coverImage: 'assets/projects/project-4-cover.png',
        title: 'Employee Reimbursement Request Web Application',
        desc: 'Designed and developed a browser-based application that allows employees to submit reimbursement requests and track approval status, providing a structured workflow for managing expense claims.',
        role: 'Web Application Developer',
        roleDesc: 'I designed and developed a lightweight browser application that allows employees to submit reimbursement requests and organize expense records through a structured digital workflow.',
        duration: '2–3 months',
        team: 'Solo Project',
        overview: 'Managing reimbursement requests manually can often lead to delays, disorganized records, and inefficient approval processes. This project focused on creating a simple web-based system where employees can submit reimbursement requests, store supporting information, and manage expense records in a centralized platform.\n\nThe application was developed as a browser-based solution using JavaScript for functionality, CSS for interface styling, Firebase for real-time database management, and Vercel for deployment.',
        outcomesLabel: 'Key Contributions',
        outcomes: [
            'Designed the reimbursement request workflow for employees submitting expense claims',
            'Developed the browser-based application using JavaScript and CSS',
            'Implemented a cloud-based database using Firebase to store reimbursement records',
            'Deployed the application using Vercel for accessible web hosting',
            'Created a simple interface allowing users to submit and manage reimbursement requests'
        ],
        tools: 'JavaScript, CSS, Firebase, Vercel',
        workflowLabel: 'Application Workflow',
        hideWorkflowNums: true,
        workflow: [
            { title: 'Request Submission', bullets: [
                'Employees submit reimbursement requests through the web interface, entering expense details and supporting information.'
            ]},
            { title: 'Data Storage', bullets: [
                'Submitted reimbursement data is securely stored in a cloud-based Firebase database.'
            ]},
            { title: 'Request Tracking', bullets: [
                'Users can review submitted reimbursement records and monitor request status.'
            ]},
            { title: 'Record Organization', bullets: [
                'Expense records are maintained in a structured database, allowing easier tracking and management of reimbursement requests.'
            ]}
        ],
        secondaryOutcomes: [
            'Created a functional browser-based reimbursement request application',
            'Demonstrated full-stack workflow using frontend development and cloud database integration',
            'Implemented a structured system for organizing and tracking reimbursement records'
        ],
        secondaryOutcomesLabel: 'Outcome'
    }
];

const modalOverlay = document.getElementById('portfolioModalOverlay');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalStats = document.getElementById('modalStats');
const modalRoleSection = document.getElementById('modalRoleSection');
const modalRoleDesc = document.getElementById('modalRoleDesc');
const modalOverview = document.getElementById('modalOverview');
const modalOverviewSection = document.getElementById('modalOverviewSection');
const modalWorkflowSection = document.getElementById('modalWorkflowSection');
const modalWorkflow = document.getElementById('modalWorkflow');
const modalOutcomesList = document.getElementById('modalOutcomesList');
const modalToolsSection = document.getElementById('modalToolsSection');
const modalToolsVisual = document.getElementById('modalToolsVisual');

// Tool-to-domain mapping for favicons in modal
const toolDomains = {
    'AutoDock': 'autodock.scripps.edu',
    'Discovery Studio': '3ds.com',
    'Glide': 'schrodinger.com',
    'GOLD': 'ccdc.cam.ac.uk',
    'Jira': 'jira.atlassian.com',
    'Figma': 'figma.com',
    'Slack': 'slack.com',
    'Trello': 'trello.com',
    'Notion': 'notion.so',
    'GitHub': 'github.com',
    'MS Project': 'microsoft.com',
    'Salesforce': 'salesforce.com',
    'Confluence': 'atlassian.com',
    'Miro': 'miro.com',
    'Power BI': 'powerbi.microsoft.com',
    'Minitab': 'minitab.com',
    'Visio': 'microsoft.com',
    'AWS': 'aws.amazon.com',
    'Terraform': 'terraform.io',
    'ServiceNow': 'servicenow.com',
    'Google Workspace': 'workspace.google.com',
    'Canva': 'canva.com',
    'VS Code': 'code.visualstudio.com',
    'JavaScript': 'developer.mozilla.org',
    'CSS': 'css-tricks.com',
    'Firebase': 'firebase.google.com',
    'Vercel': 'vercel.com',
    'Google Workspace': 'workspace.google.com',
    'MS Office': 'office.com'
};

function openProjectModal(index) {
    const data = projectData[index];

    // Hero content
    const heroBg = document.querySelector('.modal-hero-bg');
    if (data.coverImage) {
        heroBg.style.backgroundImage = `url('${data.coverImage}')`;
        heroBg.style.backgroundSize = 'cover';
        heroBg.style.backgroundPosition = 'center';
    } else {
        heroBg.style.backgroundImage = '';
        heroBg.style.backgroundSize = '';
        heroBg.style.backgroundPosition = '';
    }
    modalTag.textContent = data.tag;
    modalTitle.innerHTML = data.title;
    modalDesc.textContent = data.desc;

    // Stat cards (3 cards: Role, Duration, Team)
    const statItems = [
        { label: 'Role', value: data.role, icon: '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
        { label: 'Duration', value: data.duration, icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
        { label: 'Team Size', value: data.team, icon: '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' }
    ];

    modalStats.innerHTML = statItems.map(s => `
        <div class="modal-stat-card">
            <div class="modal-stat-icon">${s.icon}</div>
            <span class="modal-stat-label">${s.label}</span>
            <span class="modal-stat-value">${s.value}</span>
        </div>
    `).join('');

    // My Role section
    if (data.roleDesc) {
        modalRoleSection.style.display = '';
        modalRoleDesc.textContent = data.roleDesc;
    } else {
        modalRoleSection.style.display = 'none';
    }

    // Overview
    if (data.overview) {
        modalOverviewSection.style.display = '';
        modalOverview.innerHTML = data.overview.split('\n\n').map(p => `<p>${p}</p>`).join('');
    } else {
        modalOverviewSection.style.display = 'none';
    }

    // Workflow timeline
    if (data.workflow && data.workflow.length) {
        modalWorkflowSection.style.display = '';
        document.querySelector('#modalWorkflowSection h3').textContent = data.workflowLabel || 'Research Workflow';
        modalWorkflow.className = 'modal-workflow' + (data.hideWorkflowNums ? ' no-nums' : '');
        modalWorkflow.innerHTML = data.workflow.map(step => `
            <div class="modal-wf-step${data.hideWorkflowNums ? ' no-num' : ''}">
                ${data.hideWorkflowNums ? '<div class="modal-wf-dot"></div>' : `<div class="modal-wf-num">${step.num}</div>`}
                <h4>${step.title}</h4>
                ${step.bullets && step.bullets.length
                    ? `<ul>${step.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`
                    : (step.desc ? `<p>${step.desc}</p>` : '')
                }
            </div>
        `).join('');
    } else {
        modalWorkflowSection.style.display = 'none';
    }

    // Outcomes
    document.querySelector('#modalOutcomesSection h3').textContent = data.outcomesLabel || 'Key Outcomes';
    modalOutcomesList.innerHTML = data.outcomes
        .map(item => `<li>${item}</li>`)
        .join('');

    // Pipeline (horizontal flow)
    const pipelineSection = document.getElementById('modalPipelineSection');
    const pipelineContainer = document.getElementById('modalPipeline');
    if (data.pipeline && data.pipeline.length) {
        pipelineSection.style.display = '';
        document.getElementById('modalPipelineLabel').textContent = data.pipelineLabel || 'Workflow';
        pipelineContainer.innerHTML = data.pipeline.map((step, i) => `
            <div class="modal-pipeline-step">
                <span>${step}</span>
            </div>
            ${i < data.pipeline.length - 1 ? '<div class="modal-pipeline-arrow">→</div>' : ''}
        `).join('');
    } else {
        pipelineSection.style.display = 'none';
    }

    // Secondary outcomes
    const secOutSection = document.getElementById('modalSecondaryOutcomesSection');
    const secOutList = document.getElementById('modalSecondaryOutcomesList');
    if (data.secondaryOutcomes && data.secondaryOutcomes.length) {
        secOutSection.style.display = '';
        document.getElementById('modalSecondaryOutcomesLabel').textContent = data.secondaryOutcomesLabel || 'Outcome';
        secOutList.innerHTML = data.secondaryOutcomes
            .map(item => `<li>${item}</li>`)
            .join('');
    } else {
        secOutSection.style.display = 'none';
    }

    // Tools section
    if (data.hideTools) {
        modalToolsSection.style.display = 'none';
    } else {
        modalToolsSection.style.display = '';
        if (data.toolCategories) {
            modalToolsVisual.innerHTML = data.toolCategories
                .map(cat => `<span class="modal-tool-pill">${cat}</span>`)
                .join('');
        } else if (data.tools) {
            const tools = data.tools.split(', ');
            modalToolsVisual.innerHTML = tools.map(tool => {
                const domain = toolDomains[tool];
                const imgTag = domain
                    ? `<img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" alt="">`
                    : '';
                return `<span class="modal-tool-pill">${imgTag}${tool}</span>`;
            }).join('');
        }
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(link.dataset.project);
        openProjectModal(index);
    });
});

document.getElementById('modalClose').addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeProjectModal();
    }
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

// ============================================
// LAZY-LOAD VIDEOS (hover to play)
// ============================================
const lazyVideos = document.querySelectorAll('video[data-src]');

// Preload video src when near viewport and show first frame
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting && !video.src) {
            video.src = video.dataset.src;
            video.currentTime = 0;
        }
    });
}, { rootMargin: '400px' });

lazyVideos.forEach(video => {
    videoObserver.observe(video);

    const card = video.closest('.ai-card');
    if (card) {
        card.addEventListener('mouseenter', () => {
            if (!video.src && video.dataset.src) {
                video.src = video.dataset.src;
            }
            video.play().catch(() => {});
        });
        card.addEventListener('mouseleave', () => {
            video.pause();
        });
    }
});

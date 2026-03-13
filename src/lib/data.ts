export const SITE_DATA = {
    hero: {
        title: "Designing with Agents & Clinical Intelligence",
        subtitle: "I architect workflows, not just screens. Leveraging Custom MCPs, Cursor, Claude or Antigravity, and Figma to aggregate intelligence and build high-velocity clinical applications.",
        cta: "Explore My System",
        email: "jordanwilliamleahy@gmail.com",
    },
    author: {
        name: "Jordan Leahy",
        role: "Product Design Engineer",
        bio: "I architect workflows, not just screens. I combine design thinking with technical execution, leveraging Custom MCPs, Cursor, and AI to build high-velocity clinical applications. I believe in 'Product Design Engineering'—closing the gap between Figma and production code."
    },
    experience: [
        { name: "SmarterDx", logo: "https://wgwmzfbnkovumqcvsxgd.supabase.co/storage/v1/object/public/images//smarterdx.jpeg" },
        { name: "PrescriberPoint", logo: "https://wgwmzfbnkovumqcvsxgd.supabase.co/storage/v1/object/public/images//ppt.jpeg" },
        { name: "BCG X", logo: "/logos/bcg-x.png" }, // Fallback local path if needed
        { name: "Definitive Health", logo: "/logos/definitive.png" },
        { name: "HTD Health", logo: "/logos/htd.png" }
    ],
    caseStudies: [

        {
            id: "case1-updated",
            title: "Redesigned clinical diagnostics to boost accuracy 60%",
            subtitle: "SmarterDx",
            description: "I transformed how clinical teams validate Sepsis diagnoses—ensuring hospitals get paid for the critical care they actually delivered.",
            tags: ["RCM", "LLM", "ICD-10", "Sepsis", "Clinical AI"],
            image: "/case-studies/case1-updated.png",
            locked: false,
            password: "design2025",
            slug: "smarter-dx-iteration",
            heroImage: "/case-studies/smarterdx-hero-devices.png",
            preTeamSection: {
                id: "smarterdx-overview",
                label: "WHAT IS PREBILL IN RCM",
                title: "What is PreBill in RCM?",
                text: "1. CLINICAL DOCUMENT INTEGRITY: Pre-bill Design Focused\n• Once a patient has been discharged and the encounter has been coded.\n• Common sense ML is applied to flag new revenue & quality improvements. 2. REVENUE OPPORTUNITY?: Clinical UI Storytelling\n• Once a patient has been discharged and the encounter has been coded.\n• If a new Pdx opportunity exists with higher revenue, then an internal CDI team needs to verify. 3. SEND TO CLIENT: New or resequenced primary diagnosis?\n• Select evidence and send to client\n• If client approves, revenue is attributed to efforts",
                image: "/case-studies/Master Product Flows.png"
            },
            team: {
                role: "Senior Product Designer",
                responsibilities: [
                    "Owned information architecture, visual design, and usability testing.",
                    "Defined the \"explainable AI\" layer for every recommendation."
                ],
                stakeholders: [
                    "Clinical SMEs (nurses, coders)",
                    "Data science (model development and feature importance)",
                    "Product (RCM strategy)",
                    "Engineering (EHR integration)"
                ],
                duration: "2.5 months",
                scope: [
                    "Deployed to internal CDI team",
                    "Clinical validation studies"
                ],
                tools: ["Figma", "FigJam", "Product Discovery", "Jira"],
                image: "/case-studies/team-photo.png"
            },
            sections: [
                {
                    id: "challenge",
                    label: "The Challenge",
                    title: "The Validation Gap",
                    text: "1. The Context: \n• Each patient encounter explodes into over 30,000 data points, creating a massive validation burden.\n• Despite their expertise, manual review inevitably leads to missed diagnoses and lost revenue. 2. Clinical Impact: \n• Incomplete documentation resulting in revenue leakage.\n• AI models that flag diagnoses without explaining 'why'.\n• Slow review cycles that delay billing and increase denials. 3. Design Challenges: \n• Consolidating all data into a single trusted view.\n• Showing the 'why' behind AI suggestions.\n• Identifying workflows that speed up decision making without reducing accuracy.",
                    image: "/case-studies/adaptive-drg-whiteboard.png"
                },
                {
                    id: "process",
                    label: "The Process",
                    title: "From Research to Validation",
                    text: "1. Clinical Research & Discovery: \n• Facilitated design thinking workshops to investigate why valid clinical opportunities were being rejected.\n• By combining these collaborative sessions with real-time shadowing, I uncovered the specific evidence gaps causing clients to disagree with our findings. 2. ANALYZED MVP & IDENTIFIED MODULAR PATTERNS: Moving beyond 'One Size Fits All'\n• Audited the existing \"single view\" MVP and identified that a one-size-fits-all approach failed for complex conditions.\n• Define a modular UI framework where clinicians see tailored components based on the diagnosis (e.g., Sepsis, Metabolic Encephalopathy, CHF) rather than a generic chart. 3. Prototype & Clinical Testing: \n• Iterative testing with CDI staff using high-fidelity interactive prototypes.\n• Identified which features had the highest impact on improving revenue, allowing us to double down on what worked. 4. Implementation & Validation: \n• Deployment and real-world performance monitoring.\n• Ensured pixel-perfect handoff, integrated clinical workflows, and monitored agreement rates via HEX data dashboards.",
                    image: "/case-studies/4444.png"
                },
                {
                    id: "solution",
                    label: "The Solution",
                    title: "Dynamic Clinical UI",
                    text: "1. Dynamic Clinical Layouts: \n• Moved beyond a single generic view to a dynamic system where the interface changes structure based on the specific clinical condition.\n• Designed tailored workflows for Sepsis, Metabolic Encephalopathy, CHF, and STI to match their unique validation criteria. 2. Evidence-Driven Priority: \n• The UI architecture is determined by the specific clinical data points that impact the DRG assignment.\n• It visually prioritizes the evidence needed to prove or disprove a Primary Diagnosis, shifting the focus from passive review to active validation. 3. Data Dense Visualization: \n• Developed a rich, interactive visualization engine that synthesizes and plots key clinical diagnostic markers over time, allowing for rapid trend identification. 4. Clinical Decision Support: \n• Integrated evidence-based treatment recommendations directly into the physician's workflow to reduce cognitive load and standardize care pathways. 5. Team Collaboration Tools: \n• Enabled seamless care coordination with real-time patient status sharing and structured handoff communication tools between shifting care teams.",
                    image: "",
                    iframe: "https://salty-bulk-27835015.figma.site/"
                },
                {
                    id: "impact",
                    label: "The Impact",
                    title: "Clinical Confidence",
                    text: "1. 60% Accuracy Boost: \n• Redesigned clinical diagnostics to boost accuracy significantly through thoughtful design. 2. Leading Clinical Feedback: \n• \"Having a data dense visualization of real data that makes sense makes the world of difference. Being able to see all the sepsis-related data and tell that story of, this is the primary diagnosis, makes the world of difference.\" — Stephen, Lead Clinical Document Specialist",
                    image: "/case-studies/sepsisResults.png"
                },
                {
                    id: "reflection",
                    label: "Reflection & Learnings",
                    title: "The Retrospective",
                    text: "1. What Went Well: \n• Early clinical stakeholder involvement led to accurate requirements.\n• Iterative design process prevented major usability issues.\n• Real-world testing validated design decisions.\n• Cross-functional collaboration improved solution quality. 2. Challenges: \n• EMR integration complexity required creative solutions.\n• Managing clinical validation timelines and requirements involved constant negotiation.\n• Addressing varying workflows across different hospital units was critical. 3. Next Steps: \n• Expand to additional infection prediction models.\n• Develop pediatric sepsis detection capabilities.\n• Add predictive antibiotic resistance modeling.",
                    image: "/case-studies/retro.png"
                }
            ]
        },

        {
            id: "case3",
            title: "Drug Prior Authorization",
            subtitle: "PrescriberPoint",
            description: "How I designed an ML & LLM powered prior authorization system that reduced response time from 3 days to 5 minutes, improving patient access to medications.",
            tags: ["PriorAuth", "ML", "Workflow", "Formulary", "Automation"],
            image: "/case-studies/case4-prescriber-point.png",
            locked: false,
            password: "design2025",
            slug: "prescriber-point",
            comingSoon: true,
            team: {
                role: "Senior UX Designer",
                responsibilities: [
                    "Workflow design & user research lead",
                    "Prior authorization workflow research",
                    "AI assisted interface design",
                    "Insurance integration UX strategy"
                ],
                stakeholders: [
                    "2 Healthcare Workflow Specialists",
                    "4 Backend Engineers",
                    "1 ML Engineer",
                    "Product Manager"
                ],
                duration: "6 months",
                scope: [
                    "8 major formulary integrations",
                    "AI rule extraction system",
                    "Automated letter generation workflow",
                    "Approval tracking dashboard"
                ],
                tools: ["Figma", "Whimsical", "Jira"]
            },
            sections: [
                {
                    id: "challenge",
                    label: "The Challenge",
                    title: "The Inefficiency",
                    text: "1. Process Inefficiency: \n• Average response time was 2-3 days, delaying patient care. 2. Provider Burden: \n• 78% of providers report prior authorization as a major workflow burden. 3. Integration Friction: \n• 60% of authorizations require multiple submissions due to complex, fragmented payer requirements.",
                    image: "/case-studies/prescriber-point-challenge.png"
                },
                {
                    id: "process",
                    label: "The Process",
                    title: "From Analysis to Automation",
                    text: "1. Workflow Analysis & Research: \n• Shadowed NPs and MAs to map deep user journeys.\n• Analyzed 10 formulary rule sets and interviewed insurance reviewers to identify pain points. 2. AI Assisted Workflow Design: \n• Designed intelligent automation that identifies AI decision points while maintaining 'human-in-the-loop' oversight for exception handling. 3. Prototyping & Validation: \n• Conducted iterative usability testing with prescribers using interactive prototypes with real data.\n• Validated formulary accuracy with MA reviewers. 4. Implementation & Optimization: \n• Phased rollout across Florida dermatology practices.\n• Monitored performance and iterated based on real usage feedback.",
                    image: "/case-studies/prescriber-point-process.png"
                },
                {
                    id: "solution",
                    label: "The Solution",
                    title: "Intelligent Authorization",
                    text: "1. Formulary Identification: \n• AI-powered analysis of insurance documents automatically identifies specific prior authorization requirements. 2. Medical Requirements: \n• Surfacing all necessary medical documentation upfront to prevent denials. 3. Step Therapy Engine: \n• Flagging 'try and fail' requirements (Step Therapy) before submission so providers can document history. 4. Reauthorization Intelligence: \n• Tracking renewal dates to proactively alert staff before coverage lapses. 5. Automated Submission: \n• One-click download and packet generation for mailing, faxing, or portal submission.",
                    image: "/case-studies/prescriber-point-solution.png"
                },
                {
                    id: "impact",
                    label: "The Impact",
                    title: "3 Days to 5 Minutes",
                    text: "1. Velocity: \n• \"We went from 3 days to 5 minutes for specialty medication prior authorizations.\" 2. Patient Access: \n• \"Our patients get their medications faster, and our staff can focus on patient care instead of paperwork.\" — Maria Gonzalez, Medical Practice Manager.",
                    image: "/case-studies/prescriber-point-impact.png"
                },
                {
                    id: "reflection",
                    label: "Reflection & Learnings",
                    title: "The Retrospective",
                    text: "1. What Went Well: \n• Multi-stakeholder research provided comprehensive requirements, and AI integration truly enhanced (rather than replaced) human expertise. 2. Challenges: \n• Managing insurance API inconsistencies required creative workarounds, and regulatory compliance was complex. 3. Next Steps: \n• Expanding to specialty medication prior authorizations and integrating directly with EHR systems.",
                    image: "/case-studies/prescriber-point-reflection.png"
                }
            ]
        },
        {
            id: "case4",
            title: "3 Million Views, Zero Clarity",
            subtitle: "Definitive Healthcare",
            description: "Led a data-driven redesign to transform navigation chaos into clarity. Partnered with Product Management, Customer Success, and Data Science to restructure information architecture...",
            tags: ["UX Research", "Healthcare SaaS", "Data Visualization", "Enterprise Design"],
            image: "/case-studies/case6-definitive-healthcare.png",
            locked: false,
            password: "design2025",
            slug: "definitive-healthcare",
            comingSoon: true,
            team: {
                role: "Lead Product Designer",
                responsibilities: [
                    "User research & workflow analysis",
                    "Information architecture & wireframing",
                    "Prototype development & testing"
                ],
                stakeholders: [
                    "1 Customer Service User",
                    "3 Software Engineers",
                    "Product Manager"
                ],
                duration: "6 months",
                scope: [
                    "End-to-end Hospital Profile redesign",
                    "Information Architecture restructuring",
                    "Design system for 500+ metrics",
                    "Search & Filtering system"
                ],
                tools: ["Figma", "Pendo", "Jira"],
                component: "DefinitiveRoleCard"
            },
            sections: [
                {
                    id: "challenge",
                    label: "The Challenge",
                    title: "Rushed Complexity",
                    text: "1. Historic Debt: \n• Rushed development without proper UX planning created an unstructured data experience filled with duplicate information and navigation chaos. 2. 3 Million Struggles: \n• High page views weren't engagement—they were users lost in navigation.\n• Finding hospital data meant juggling multiple tabs with duplicate metrics. 3. Answers Needed: \n• Users needed summary views that surface insights instead of forcing tab-by-tab discovery.",
                    image: "/case-studies/definitive-challenge.png",
                    component: "PainPointBubbles"
                },
                {
                    id: "process",
                    label: "The Process",
                    title: "Data-Driven Architecture",
                    text: "1. Research & Data Analysis: \n• Combined qualitative interviews with quantitative analytics (3.3M page views) to identify pain points.\n• \"It's very complex and difficult to find what you need.\" — Customer Interview. 2. Information Architecture: \n• Mapped and audited every screen to document structure before consolidating layout.\n• Created comprehensive sitemaps to visualize the simplified flow. 3. High-Fidelity Design: \n• Developed scalable design system components for 500+ customizable metrics and iterated rapidly with product stakeholders using auto-layout and variants.",
                    image: "/case-studies/definitive-process.png",
                    component: "UserFlowVisualization"
                },
                {
                    id: "solution",
                    label: "The Solution",
                    title: "Clarity at Scale",
                    text: "1. Customizable Data Filters: \n• Introduced over 500+ customizable filters with toggle-based interactions for faster metric selection. 2. Usage-Driven Prioritization: \n• Prioritized the Summary Tab and high-traffic areas identified from Pendo analytics to surface key insights immediately.",
                    image: "/case-studies/definitive-solution.png"
                },
                {
                    id: "impact",
                    label: "The Impact",
                    title: "Simplified Discovery",
                    text: "1. Outcomes: \n• \"Searching and navigating through hospital data became much easier. The summary tab now provides everything I need at a glance.\" — Healthcare Product Manager. 2. Efficiency: \n• Reduced time on task for key workflows.",
                    image: "/case-studies/definitive-impact.png"
                },
                {
                    id: "reflection",
                    label: "Reflection & Learnings",
                    title: "Refining the Methods",
                    text: "1. Validated Through Usage: \n• Improved engagement on high-value tabs post-launch. 2. Data Validation: \n• The combination of qualitative user feedback and quantitative Pendo analytics was crucial for getting stakeholder buy-in for the restructuring.",
                    image: "/case-studies/definitive-reflection.png"
                }
            ]
        }
    ],
    testimonials: [
        {
            quote: "Jordan demonstrated a methodical approach to research, user experience design, and prototyping.",
            author: "Ruth Nacey",
            role: "Director of Product, SmarterDx",
            image: "/testimonials/ruth-nacey.png"
        },
        {
            quote: "Jordan demonstrated a deep understanding of our users' needs and seamlessly translated complex requirements into intuitive and elegant experiences.",
            author: "Bryan Lawson",
            role: "Clinical Operations Lead, PrescriberPoint",
            image: "/testimonials/bryan-lawson.png"
        },
        {
            quote: "He genuinely understands the challenges HCPs face, particularly how excessive clicks can hinder our workflow.",
            author: "Spencer Rizk DNP, APRN-CNP",
            role: "Clinical Staff, One Medical",
            image: "/testimonials/spencer-rizk.png"
        }
    ],
    blogPosts: [
        {
            id: "new-1",
            title: "CDI Verification Bottleneck",
            excerpt: "AI was exceptional at flagging clinical opportunities, but the interface failed to present evidence effectively. The core issue wasn't detection—it was the speed of human verification.",
            date: "Jan 30, 2026",
            readTime: "4 min read",
            link: "/blog/verification-bottleneck",
            image: "/blog/smarterdx-dashboard.png"
        },
        {
            id: "new-2",
            title: "The $360 Billion Opportunity",
            excerpt: "McKinsey predicts AI could save healthcare $360B annually. The key isn't better models—it's better workflows that let humans trust the data.",
            date: "Jan 31, 2026",
            readTime: "5 min read",
            link: "/blog/ai-cost-savings",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
        },
        {
            id: "new-3",
            title: "AI is Not a Doctor. It is a Detective.",
            excerpt: "We often ask if AI can replace the physician. At SmarterDx, we asked a better question: Can it just find the evidence they missed?",
            date: "Feb 2, 2026",
            readTime: "6 min read",
            link: "/blog/what-is-ai",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: "new-4",
            title: "The 'Good Enough' Trap: Why 98% Accuracy is Bankrupting Hospitals",
            excerpt: "Our intelligence agents flagged a rising denial rate in Q1 2026. The cause? Generic AI claiming capture rates that don't translate to revenue.",
            date: "Feb 5, 2026",
            readTime: "7 min read",
            link: "/blog/competitor-analysis",
            image: "/blog/blog_intel_forensics.png"
        },
        {
            id: "1",
            title: "Why Product Design Engineering is the Future",
            excerpt: "The gap between Figma and production code is closing. Here's why the best designers of 2026 are writing their own React components.",
            date: "Jan 28, 2026",
            readTime: "5 min read",
            link: "#",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: "2",
            title: "Building Real Apps with Cursor and Claude",
            excerpt: "How I use LLMs to scaffold full-stack features in minutes, allowing me to focus on high-leverage UX decisions.",
            date: "Jan 15, 2026",
            readTime: "8 min read",
            link: "#",
            image: "https://images.unsplash.com/photo-1526374965128-4882005f43e0?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: "3",
            title: "The Death of the Static Mockup",
            excerpt: "Why I stopped presenting static images to stakeholders and started shipping interactive deploy previews instead.",
            date: "Dec 12, 2025",
            readTime: "6 min read",
            link: "#",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
        }
    ],
    footer: {
        email: "jordanwilliamleahy@gmail.com",
        linkedin: "https://linkedin.com/in/jordanleahy",
        schedule: "https://calendly.com/..."
    }
};

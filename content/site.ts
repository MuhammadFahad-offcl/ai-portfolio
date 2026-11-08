export const siteContent = {
  metadata: {
    title: "Muhammad Fahad, WhatsApp AI agents for Pakistani businesses",
    serviceName: "WhatsApp AI Automation",
    description:
      "AI receptionists, WhatsApp booking agents, and workflow automations for clinics, salons, and small businesses in Pakistan.",
    openGraphImage: "/og-image.png",
    // TODO: Replace with the deployed site origin so social preview URLs resolve correctly.
    siteUrl: "{{SITE_URL}}",
  },
  ui: {
    brand: "Muhammad Fahad",
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
    clientsAndResults: "Clients and results",
    problemLabel: "The problem",
    builtLabel: "What I built",
    technologyLabel: "Technology stack",
    resultsLabel: "Results",
    youLabel: "You:",
    meLabel: "Me:",
    currency: "PKR",
    monthlyUnit: "/ month",
    faqContactTitle: "Still unsure? Ask me directly.",
    faqContactDescription:
      "Tell me what takes up your team’s time. I’ll help you decide whether automation is a fit.",
    faqContactAction: "Ask me directly",
    workCostLink: "Estimate your costs",
    auditOnWhatsApp: "Get a free audit on WhatsApp",
    testimonialPlaceholderNote:
      "TODO: Replace testimonial placeholders with real, approved client feedback.",
    socialLinkedIn: "LinkedIn",
    socialGitHub: "GitHub",
    socialEmail: "Email",
    socialWhatsApp: "WhatsApp",
  },
  whatsapp: {
    number: "923104866662",
    messages: {
      audit: "Hi Fahad, I saw your portfolio and would like a free automation audit.",
      hero: "Hi Fahad, I saw your WhatsApp agent work and would like a free audit.",
      work: "Hi Fahad, I saw the Clinic Receptionist demo and want one for my clinic.",
      demo: "Hi Fahad, I want to try the AI appointment agent. Hi!",
      process: "Hi Fahad, I have a question about how the automation process works.",
      roi: "Hi Fahad, I'd like an audit. Website: {{WEBSITE_URL}}. Estimated yearly manual cost: PKR {{WASTED_COST}}. Potential savings: PKR {{POTENTIAL_SAVINGS}}.",
      starter: "Hi Fahad, I'm interested in the Starter package.",
      growth: "Hi Fahad, I'm interested in the Growth package.",
      custom: "Hi Fahad, I'd like to discuss a Custom automation package.",
      guarantee: "Hi Fahad, I'd like to discuss trying an AI agent for my business.",
      footer: "Hi Fahad, I run a business that uses WhatsApp and would like to automate a workflow.",
    },
  },
  navigation: {
    work: "Work",
    results: "Results",
    pricing: "Pricing",
    faq: "FAQ",
    audit: "Get a free audit",
  },
  hero: {
    eyebrow: "Muhammad Fahad · AI automation engineer, Lahore",
    title: "WhatsApp agents that book appointments while you sleep.",
    description:
      "I build AI receptionists, booking systems and workflow automations for clinics, salons and local businesses in Pakistan — in English and Roman Urdu.",
    primaryAction: "Get a free audit",
    secondaryAction: "See the work ↓",
    trustLine: "Trusted by {{CLIENTS}} businesses in {{CITIES}}",
    bookingNotification: "New booking · Dr. Ahmed Clinic · 3:00 PM",
    reminderNotification: "Reminder sent · 12 patients",
    stackLine: "Built with n8n · WhatsApp Cloud API · OpenAI / Gemini",
    sceneFallbackAlt: "Illustrated WhatsApp booking, calendar, clock, and workflow icons",
  },
  trustBar: {
    title: "Running today at",
    clients: [
      // TODO: Replace with verified client names and cities; remove entries that are not live clients.
      { name: "{{CLIENT_1_NAME}}", city: "{{CLIENT_1_CITY}}", logo: "" },
      { name: "{{CLIENT_2_NAME}}", city: "{{CLIENT_2_CITY}}", logo: "" },
      { name: "{{CLIENT_3_NAME}}", city: "{{CLIENT_3_CITY}}", logo: "" },
    ],
    stats: [
      // TODO: Replace each value with a verified count; the counter animates numeric values.
      { value: "{{MESSAGES_HANDLED}}", label: "WhatsApp messages handled" },
      { value: "{{HOURS_SAVED}}", label: "staff hours saved / month" },
      { value: "{{BOOKINGS}}", label: "bookings automated" },
      { value: "{{CLIENTS}}", label: "businesses live" },
    ],
  },
  manualWork: {
    title: "Your front desk shouldn't be your bottleneck.",
    description:
      "Your customers expect quick answers, even when your team is with a patient, a client, or already off the clock. Automation takes care of repeatable work while your people focus on service.",
    rows: [
      {
        before: "Missed WhatsApp messages after 9 pm",
        after: "Replied in under a minute, any hour",
      },
      {
        before: "Staff copying bookings into registers",
        after: "Slots saved straight to Google Sheets/Calendar",
      },
      {
        before: "Leads that never get a follow-up",
        after: "Automatic reminders and follow-ups",
      },
    ],
    costLine:
      "A receptionist answering WhatsApp 6 hours a day costs ~Rs {{MONTHLY_RECEPTIONIST_COST_PKR}}/month. An agent doesn't sleep, doesn't take leave, and replies in 1 minute.",
  },
  work: {
    eyebrow: "Selected work",
    title: "Real systems I've built and shipped.",
    featuredLabel: "Featured system",
    demoButton: "View full demo",
    closeDemo: "Close demo",
    videoFallback: "Demo video coming soon.",
    videoCaptionsLabel: "English captions",
    videoCaptionsPath: "/videos/clinic-agent-demo.vtt",
    problemLabel: "The problem",
    builtLabel: "What I built",
    technologyLabel: "Technology stack",
    clinicCase: {
      id: "clinic-receptionist-ai",
      title: "Clinic Receptionist AI",
      client: "{{CLINIC_CLIENT_NAME}}",
      industry: "Healthcare · Clinic",
      problem:
        "Patients need timely answers and appointment confirmation, including outside reception hours.",
      solution:
        "A WhatsApp agent that answers patients, checks available slots, and confirms bookings in English and Roman Urdu.",
      stack: ["n8n", "WhatsApp Cloud API", "OpenAI", "Google Sheets"],
      results: [
        // TODO: Replace with verified figures and labels from the client.
        { number: "{{CLINIC_RESULT_1_VALUE}}", label: "{{CLINIC_RESULT_1_LABEL}}" },
        { number: "{{CLINIC_RESULT_2_VALUE}}", label: "{{CLINIC_RESULT_2_LABEL}}" },
        { number: "{{CLINIC_RESULT_3_VALUE}}", label: "{{CLINIC_RESULT_3_LABEL}}" },
      ],
      video: "/videos/clinic-agent-demo.mp4",
      poster: "/posters/clinic-agent-demo-poster.jpg",
      videoAlt: "Clinic WhatsApp appointment agent demonstration",
      videoShape: "phone",
    },
    outreachCase: {
      id: "ai-contact-form-outreach",
      title: "AI Contact Form Outreach",
      client: "{{OUTREACH_CLIENT_NAME}}",
      industry: "B2B · Business outreach",
      problem:
        "Finding relevant businesses and reaching out with a message tailored to each one takes repetitive manual work.",
      solution:
        "A workflow that discovers business websites, prepares personalised outreach, and submits it through their contact forms.",
      stack: ["n8n", "FastAPI", "Playwright"],
      results: [
        // TODO: Replace with verified figures and labels; don't publish estimated outcomes as results.
        { number: "{{OUTREACH_RESULT_1_VALUE}}", label: "{{OUTREACH_RESULT_1_LABEL}}" },
        { number: "{{OUTREACH_RESULT_2_VALUE}}", label: "{{OUTREACH_RESULT_2_LABEL}}" },
      ],
      // TODO: Add a real outreach workflow demo video at this path, or leave empty until available.
      video: "",
      poster: "/work/contact-form-outreach.png",
      videoAlt: "Contact form outreach workflow preview",
      videoShape: "browser",
    },
    alsoBuilt: {
      title: "Also built",
      description:
        "Campus2Career AI — a student career-roadmap hackathon project and national finalist at the Alibaba Cloud AI Hackathon 2026.",
    },
  },
  testimonials: {
    title: "From the people using it.",
    playVideo: "Play testimonial video",
    closeVideo: "Close testimonial video",
    items: [
      // TODO: Add real, approved client quotes and identities; don't publish placeholders as testimonials.
      {
        quote: "{{TESTIMONIAL_1_QUOTE}}",
        name: "{{TESTIMONIAL_1_NAME}}",
        role: "{{TESTIMONIAL_1_ROLE}}",
        business: "{{TESTIMONIAL_1_BUSINESS}}",
        city: "{{TESTIMONIAL_1_CITY}}",
        photo: "",
        video: "",
        caseStudy: "clinic-receptionist-ai",
      },
      {
        quote: "{{TESTIMONIAL_2_QUOTE}}",
        name: "{{TESTIMONIAL_2_NAME}}",
        role: "{{TESTIMONIAL_2_ROLE}}",
        business: "{{TESTIMONIAL_2_BUSINESS}}",
        city: "{{TESTIMONIAL_2_CITY}}",
        photo: "",
        video: "",
        caseStudy: "ai-contact-form-outreach",
      },
      {
        quote: "{{TESTIMONIAL_3_QUOTE}}",
        name: "{{TESTIMONIAL_3_NAME}}",
        role: "{{TESTIMONIAL_3_ROLE}}",
        business: "{{TESTIMONIAL_3_BUSINESS}}",
        city: "{{TESTIMONIAL_3_CITY}}",
        photo: "",
        video: "",
        caseStudy: "",
      },
    ],
    viewAgent: "See their WhatsApp agent →",
  },
  demo: {
    title: "Don't take my word for it. Message the agent.",
    eyebrow: "Live demo",
    architecture: "System Architecture",
    architectureLogLabel: "System architecture log",
    clinicLabel: "Clinic Appointment Demo",
    assistantLabel: "AI Assistant · Online",
    dayLabel: "TODAY",
    messagePlaceholder: "Message",
    chat: [
      { from: "user", english: "I need to book a checkup tomorrow.", urdu: "Mujhe kal checkup book karwana hai.", time: "10:41 AM" },
      { from: "agent", english: "Checking available slots for tomorrow... I have 3:00 PM available. Please confirm your name.", urdu: "Kal ke liye 3:00 PM available hai. Apna naam confirm kar dein.", time: "10:41 AM" },
      { from: "user", english: "Muhammad Fahad.", urdu: "Muhammad Fahad.", time: "10:42 AM" },
      { from: "agent", english: "Your checkup is confirmed for tomorrow at 3:00 PM.", urdu: "Aapka checkup kal 3:00 PM par confirm ho gaya hai.", time: "10:42 AM" },
    ],
    technologies: [
      { title: "Orchestration", value: "n8n Workflows" },
      { title: "AI models", value: "OpenAI / Gemini" },
      { title: "Scheduling", value: "Google Sheets" },
      { title: "Delivery", value: "WhatsApp Cloud API" },
    ],
    terminal: [
      "> [n8n] Webhook received.",
      "> [OpenAI / Gemini] Intent classified: Booking.",
      "> [Google Sheets] Appointment slot confirmed.",
      "> [API] Bilingual payload generated.",
      "> [Success] Message delivered.",
    ],
    action: "Try it on WhatsApp",
    actionNote: "No signup. Just send 'Hi'.",
    subtext: "Replies in English or Roman Urdu. Try booking a checkup.",
    phoneAvatar: "AI",
  },
  process: {
    title: "How we'll work together",
    youLabel: "You:",
    meLabel: "Me:",
    steps: [
      {
        number: "01",
        title: "Free 20-min audit",
        description: "We look at where your team loses time.",
        clientAction: "Share your FAQs",
        myAction: "Map the workflow",
      },
      {
        number: "02",
        title: "Build in 1–2 weeks",
        description: "I build and test the agent on your real questions.",
        clientAction: "Review sample replies",
        myAction: "Build and test",
      },
      {
        number: "03",
        title: "Go live on your WhatsApp",
        description: "Your number, your branding.",
        clientAction: "Approve the setup",
        myAction: "Connect and launch",
      },
      {
        number: "04",
        title: "Monitor & improve",
        description: "Monthly check-ins and tweaks.",
        clientAction: "Share feedback",
        myAction: "Monitor and refine",
      },
    ],
  },
  pricing: {
    title: "Simple pricing. No surprises.",
    description:
      "Every project starts with a clear scope. Setup and monthly support are shown separately.",
    includedTitle: "All packages include:",
    included: [
      "Your own WhatsApp number",
      "English + Roman Urdu replies",
      "Human handover",
      "Monthly report",
    ],
    packages: [
      {
        id: "starter",
        name: "Starter",
        setupFee: "{{STARTER_SETUP_PKR}}",
        monthlyFee: "{{STARTER_MONTHLY_PKR}}",
        bestFor: "Clinics or salons starting with one automated workflow.",
        features: [
          "One appointment or enquiry workflow",
          "English + Roman Urdu response setup",
          "WhatsApp Cloud API connection",
          "Human handover path",
          "Testing with your FAQs",
        ],
        highlighted: false,
        messageKey: "starter",
      },
      {
        id: "growth",
        name: "Growth",
        setupFee: "{{GROWTH_SETUP_PKR}}",
        monthlyFee: "{{GROWTH_MONTHLY_PKR}}",
        bestFor: "Businesses ready to automate booking and follow-ups.",
        features: [
          "Booking flow plus follow-up reminders",
          "English + Roman Urdu response setup",
          "Calendar or sheet integration",
          "Human handover path",
          "Monthly review and refinements",
          "Monthly activity report",
        ],
        highlighted: true,
        messageKey: "growth",
      },
      {
        id: "custom",
        name: "Custom",
        setupFee: "{{CUSTOM_SETUP_PKR}}",
        monthlyFee: "{{CUSTOM_MONTHLY_PKR}}",
        bestFor: "Teams with multiple workflows or custom integrations.",
        features: [
          "Workflow scope designed around your operations",
          "Custom integrations and data flows",
          "English + Roman Urdu response setup",
          "Human handover path",
          "Testing and launch support",
          "Ongoing monitoring options",
        ],
        highlighted: false,
        messageKey: "custom",
      },
    ],
    setupLabel: "One-time setup",
    monthlyLabel: "Monthly support",
    bestForLabel: "Best for",
    chooseLabel: "Ask about this package",
    highlightedLabel: "Most chosen",
  },
  roi: {
    title: "What is manual work costing you?",
    eyebrow: "Your automation opportunity",
    websiteLabel: "Website URL",
    successDescription: "Continue on WhatsApp to share your estimates.",
    hoursUnit: "hrs",
    minHours: "5 hrs",
    maxHours: "200 hrs",
    minWage: "PKR 100/hr",
    maxWage: "PKR 5,000/hr",
    savingsMultiplier: 0.8,
    calculatorTitle: "Estimate your annual impact",
    calculatorDescription: "Adjust the sliders to see how routine work could add up over a year.",
    description:
      "Estimate the time your team spends on repetitive tasks and see the potential annual savings. This is a starting point for a practical audit, not a promise of results.",
    assumption: "Assumes AI handles ~80% of repetitive work.",
    hoursLabel: "Repetitive hours per week",
    wageLabel: "Average hourly wage (PKR)",
    wastedCostLabel: "Estimated annual wasted cost",
    savingsLabel: "Potential annual AI savings",
    websitePlaceholder: "Enter your website URL",
    submitLabel: "Send me my audit",
    submittingLabel: "Sending...",
    successLabel: "Audit request sent",
    whatsappFollowup: "Message me on WhatsApp",
    errorRequired: "Enter a website URL, including https://.",
    errorProtocol: "Enter a website URL that starts with http:// or https://.",
    errorWebhook: "The audit request service is not configured. Please try again later.",
    errorResponse: "The audit request could not be sent. Please try again.",
    paybackLabel: "Pays for itself in ~{{N}} weeks",
    paybackUnavailable: "Add Growth package pricing to calculate payback.",
  },
  faq: {
    title: "A few practical questions.",
    items: [
      {
        question: "Do I need to change my current WhatsApp number?",
        answer:
          "Not necessarily. We’ll review your current WhatsApp setup first and confirm what can be connected before any work begins.",
      },
      {
        question: "Can it reply in Urdu / Roman Urdu?",
        answer:
          "Yes. Replies can be set up for English and Roman Urdu, then tested against the questions your customers actually ask.",
      },
      {
        question: "What happens if the AI doesn't know an answer?",
        answer:
          "It should not guess. We can configure it to hand the conversation and context to a person on your team.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Starter setup is PKR {{STARTER_SETUP_PKR}} plus PKR {{STARTER_MONTHLY_PKR}} monthly. Growth and Custom pricing are listed in Packages and depend on scope.",
      },
      {
        question: "Is my customers' data safe?",
        answer:
          "We’ll review what data the workflow needs, limit access to that scope, and agree on the services used before launch.",
      },
      {
        question: "How long until it's live?",
        answer:
          "A typical first build takes 1–2 weeks after the workflow and replies are agreed. Integrations or scope can change that timeline.",
      },
      {
        question: "What if my customers don't like talking to a bot?",
        answer:
          "The flow can be kept short and clear, with an option to hand over to your staff. We can adjust it using real customer feedback.",
      },
      {
        question: "Can I cancel the monthly plan?",
        answer:
          "Monthly terms depend on the package. We’ll confirm notice periods and what happens to integrations before you agree.",
      },
      {
        question: "Do you work with businesses outside Lahore?",
        answer:
          "Yes. The discovery, build, and support can be handled remotely for businesses elsewhere in Pakistan.",
      },
    ],
  },
  guarantee: {
    // TODO: Confirm this offer and its terms before publishing.
    title:
      "Try it for {{TRIAL_DAYS}} days. If it doesn't save your team time, you don't pay the monthly fee.",
    benefits: ["Live in 1–2 weeks", "English + Roman Urdu", "Real human support"],
    directContact: "You'll talk to me directly, not a sales team.",
    action: "Message me on WhatsApp",
    replyTime: "Usually replies within {{REPLY_TIME}}",
  },
  footer: {
    name: "Muhammad Fahad",
    role: "AI automation engineer",
    location: "Based in Lahore, Pakistan",
    copyright: "© 2026 Muhammad Fahad",
    // TODO: Replace these with verified social profiles and a monitored email.
    linkedin: "{{LINKEDIN_URL}}",
    github: "{{GITHUB_URL}}",
    email: "{{EMAIL_ADDRESS}}",
  },
} as const;

export const stats = siteContent.trustBar.stats;
export const clients = siteContent.trustBar.clients;
export const caseStudies = [siteContent.work.clinicCase, siteContent.work.outreachCase] as const;
export const testimonials = siteContent.testimonials.items;
export const packages = siteContent.pricing.packages;

export type WhatsAppMessageKey = keyof typeof siteContent.whatsapp.messages;

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${siteContent.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppLink(key: WhatsAppMessageKey) {
  return buildWhatsAppLink(siteContent.whatsapp.messages[key]);
}

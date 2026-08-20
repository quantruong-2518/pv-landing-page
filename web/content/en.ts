import type { SiteContent } from "./types";

/**
 * EN — canonical. Section titles are written; detail prose is left empty on purpose
 * and filled from `context/` later. Facts must trace back to docs/01-proof-bank.md.
 * Numbers use a decimal point here (17.6); `vi.ts` uses a comma (17,6).
 */
export const en: SiteContent = {
  locale: "en",
  alternateLabel: "VI",

  meta: {
    home: {
      title: "Pebble Vina — Analog-PIM edge AI, from Seongnam to Vietnam",
      description:
        "Pebble Vina is the Vietnam member of Pebble Square Inc., the Korean fabless company whose Analog-PIM chips compute inside memory — top AI performance on a fraction of the power, with nothing sent to the cloud. Silicon in mass production since 2023.",
    },
    products: {
      title: "Products & solutions — Pebble Vina",
      description:
        "Hardware: MINT and PAPAYA FLEX Analog-PIM chips in production, the ESPRESSO AI SoC on the roadmap, and GPU infrastructure. Software: AI-optimized enterprise systems and private AI deployed on-device, at the edge, or inside your own data centre.",
    },
    contact: {
      title: "Contact — Pebble Vina",
      description:
        "Book a 30-minute consultation with Pebble Vina, Landmark 72 Tower, Hanoi. PEBBLE VINA COMPANY LIMITED, tax code 0111545175 — the Vietnam member of the Pebble Square group.",
    },
  },

  nav: {
    home: "Home",
    products: "Products & solutions",
    contact: "Contact",
    hardware: "Hardware",
    software: "Software",
    cta: "Book a consultation",
    menuLabel: "Menu",
    skipToContent: "Skip to content",
  },

  home: {
    hero: {
      eyebrow: "Pebble Vina · the Vietnam member of the Pebble Square group",
      slogan: "The world wants more AI than it has power for",
      lead: "",
      ctaPrimary: "Book a 30-minute consultation",
      ctaSecondary: "See the products",
      scrollHint: "Why this matters now",
      media: {
        alt: "A MINT chip on a development board, lit from one side against a dark background",
      },
    },

    whyNow: {
      kicker: "01 — Why now",
      title: "Performance stopped being the hard part. Energy became it.",
      lead: "",
      points: [
        { title: "Data centres already draw about 2% of the world's electricity", body: "" },
        { title: "The work is moving to places with no power budget", body: "" },
        { title: "Most of that energy moves data rather than computing on it", body: "" },
      ],
      pillarsTitle: "The four properties Pebble Square designs for",
      pillars: [
        { title: "Low power", body: "" },
        { title: "Private", body: "" },
        { title: "Fast", body: "" },
        { title: "Low cost", body: "" },
      ],
      media: {
        alt: "Diagram: a conventional processor hauling data across a bus, next to a crossbar array computing inside the memory",
      },
    },

    history: {
      kicker: "02 — History",
      title: "Everything Pebble Square has put on the record",
      lead: "",
      milestones: [
        { date: "Sep 2021", title: "Pebble Square Inc. founded in Seongnam", body: "", status: "shipped" },
        { date: "Nov 2021", title: "MOCHA — first-generation PIM edge AI chip; corporate research centre established", body: "", status: "shipped" },
        { date: "Jul 2022", title: "Joint-research MOU with KAIST and Chonbuk National University", body: "", status: "shipped" },
        { date: "Oct 2022", title: "Venture company certification", body: "", status: "shipped" },
        { date: "Dec 2022", title: "MINT — second-generation PIM AI semiconductor developed", body: "", status: "shipped" },
        { date: "Mar 2023", title: "NDA signed with SK hynix", body: "", status: "shipped", starred: true },
        { date: "May 2023", title: "MINT enters mass production", body: "", status: "shipped", starred: true },
        { date: "Jan 2024", title: "Patent registered for a neuromorphic device", body: "", status: "shipped" },
        { date: "Feb 2024", title: "PoC demonstrated on MINT — voice-controlled lighting with emergency call bell", body: "", status: "shipped" },
        { date: "Mar 2024", title: "Cluster AI Lab joint venture, Saudi Arabia · Home IoT NDA with MEISEI ELECTRIC", body: "", status: "shipped", starred: true },
        { date: "Mar 2025", title: "UTC Investment invests ₩2 billion", body: "", status: "shipped" },
        { date: "May 2025", title: "Pebble Square Japan, Inc. established in Tokyo", body: "", status: "shipped", starred: true },
        { date: "Aug 2025", title: "Pre-A round closed", body: "", status: "shipped" },
        { date: "Oct 2025", title: "Selected for KPAS 2025 — Korea Promising AI Startups", body: "", status: "shipped" },
        { date: "Sep 2026", title: "ESPRESSO — 160 TOPS Digital-PIM AI SoC", body: "", status: "roadmap", statusNote: "Investor material" },
      ],
      footnote:
        "Company history as published by Pebble Square (read 20 Aug 2026). The September 2026 entry is from the IR deck dated 5 January 2026 and does not appear on the public product catalogue.",
    },
  },

  products: {
    intro: {
      kicker: "Products & solutions",
      title: "Silicon, systems, and the software on top",
      lead: "",
    },

    hardware: {
      kicker: "2.1 — Hardware",
      title: "From a milliwatt sensor to a data centre",
      lead: "",
      items: [
        {
          id: "mint",
          name: "MINT",
          tagline: "Analog-PIM · second-generation edge AI chip",
          body: "",
          capabilities: [
            { title: "Sensor AI", body: "" },
            { title: "Voice AI", body: "" },
            { title: "Ultra-low-power edge AI", body: "" },
          ],
          specs: [
            {
              value: "17.6",
              unit: "TOPS/W",
              label: "Energy efficiency",
              note: "Analog-PIM, ~30 GOPS, 5×5 mm die. Measured on real silicon, in mass production since May 2023.",
              source: "Pebble Square · SmartTimes/JBNU · IR deck p.21",
              status: "shipped",
            },
          ],
          media: { alt: "The MINT chip photographed straight on against a neutral grey background" },
          status: "shipped",
          origin: "ps",
        },
        {
          id: "papaya",
          name: "PAPAYA FLEX",
          tagline: "Analog-PIM · vision at milliwatt scale",
          body: "",
          capabilities: [
            { title: "Vision AI", body: "" },
            { title: "Camera", body: "" },
            { title: "Inspection", body: "" },
            { title: "Robotics", body: "" },
          ],
          specs: [
            {
              value: "~50×",
              label: "Lower power than an NVIDIA Jetson Nano",
              note: "PAPAYA FLEX at 0.1–0.15 W against 5–10 W on the same class of machine-vision workload (ResNet-50).",
              source: "Pebble Square IR deck, 5 Jan 2026",
              status: "shipped",
            },
            {
              value: "~10,000×",
              label: "Less power for the AI task at a 5G base station",
              note: "PAPAYA against an NVIDIA L4: 320–332 W falls to 0.03 W. For the AI task specifically, not the whole station.",
              source: "Pebble Square IR deck, 5 Jan 2026",
              status: "shipped",
            },
          ],
          media: { alt: "PAPAYA FLEX photographed in the same setup as MINT, same angle and background" },
          status: "shipped",
          origin: "ps",
        },
        {
          id: "espresso",
          name: "ESPRESSO",
          tagline: "Digital-PIM on SRAM · heavy workloads and private LLMs",
          body: "",
          capabilities: [
            { title: "Large-model inference", body: "" },
            { title: "AI accelerator", body: "" },
            { title: "AI server / infrastructure", body: "" },
          ],
          specs: [
            {
              value: "160",
              unit: "TOPS",
              label: "AI SoC @INT8",
              note: "10 W, 16 TOPS/W. Four-chip card reaches 640 TOPS. Runs in-house LLMs up to 120B parameters.",
              source: "Pebble Square IR deck, 5 Jan 2026",
              status: "roadmap",
              statusNote: "Expected Sep 2026",
            },
          ],
          media: { alt: "Architecture block diagram of ESPRESSO — no product photograph exists yet" },
          status: "roadmap",
          statusNote: "Expected Sep 2026 · investor material",
          origin: "ps",
        },
        {
          id: "gpu",
          name: "GPU & high-performance compute",
          tagline: "Pebble Vina integration layer · commercial silicon",
          body: "",
          capabilities: [
            { title: "GPU products", body: "" },
            { title: "AI training", body: "" },
            { title: "Large-scale inference", body: "" },
            { title: "HPC", body: "" },
            { title: "AI data centre", body: "" },
          ],
          specs: [],
          media: { alt: "A rack of GPU servers in a machine room, shot down the cold aisle" },
          status: "shipped",
          origin: "pv",
        },
      ],
    },

    software: {
      kicker: "2.2 — Software",
      title: "Models that stay inside your building",
      lead: "",
      groups: [
        {
          id: "enterprise",
          name: "AI-optimized enterprise software",
          tagline: "Systems of record, rebuilt around models",
          body: "",
          modules: [
            { title: "CRM", body: "" },
            { title: "ERP / operations", body: "" },
            { title: "Workflow", body: "" },
            { title: "Data & reporting", body: "" },
            { title: "AI agent / best next action", body: "" },
          ],
          media: { alt: "Screenshot of the operations dashboard in a plain browser frame" },
          origin: "pv",
        },
        {
          id: "private-ai",
          name: "Private AI",
          tagline: "Your model, your data, your infrastructure",
          body: "",
          modules: [
            { title: "Build", body: "" },
            { title: "Train / adapt", body: "" },
            { title: "Deploy", body: "" },
          ],
          targetsTitle: "Deployment targets",
          targets: [
            { title: "On-device", body: "" },
            { title: "Edge", body: "" },
            { title: "On-premise", body: "" },
            { title: "Private cloud", body: "" },
            { title: "GPU / AI infrastructure", body: "" },
          ],
          media: { alt: "Diagram of the five deployment targets ordered by power budget, with the hardware behind each" },
          origin: "pv",
        },
      ],
    },
  },

  contact: {
    intro: {
      kicker: "03 — Contact",
      title: "Thirty minutes, one straight answer",
      lead: "",
    },
    ctaPrimary: "Book a 30-minute consultation",
    ctaSecondary: "Email us directly",
    media: { alt: "The Pebble Vina office on the 19th floor of Landmark 72 Tower, Hanoi" },
  },

  labels: {
    call: "Call",
    email: "Email",
    office: "Office",
    entity: "Legal entity",
    taxCode: "Tax code",
    parent: "Parent company",
  },

  footer: {
    tagline: "The Vietnam member of the Pebble Square group.",
    navTitle: "Pages",
    contactTitle: "Contact",
    legalTitle: "Legal",
    statusLegend: "Labels: green = shipping · amber = roadmap",
    disclaimer:
      "Figures about Pebble Square Inc. are drawn from its published materials (pebble-square.com, read 20 August 2026) and from the investor deck dated 5 January 2026. Items labelled roadmap were not commercially available at the time of publication.",
    copyright: "© 2026 PEBBLE VINA COMPANY LIMITED",
  },

  ui: {
    specs: "Measured",
    source: "Source",
    imagePending: "Image pending",
  },

  status: { shipped: "Shipping", roadmap: "Roadmap" },
  origin: { ps: "Pebble Square", pv: "Pebble Vina" },
};

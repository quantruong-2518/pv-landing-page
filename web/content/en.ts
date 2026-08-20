import type { LandingContent } from "./types";

/**
 * EN — canonical. Nội dung bám sát pebble-square.com (đọc 2026-08-20) nhưng viết lại bằng
 * lời của mình; chỉ giữ nguyên tên riêng, thông số, và vài cụm chữ ký của họ đặt trong ngoặc kép.
 * Mọi fact phải truy được về docs/01-proof-bank.md. Số dùng dấu chấm thập phân (17.6).
 */
export const en: LandingContent = {
  locale: "en",
  alternate: { href: "/vi", label: "VI", hrefLang: "vi" },

  meta: {
    title: "Pebble Vina — Analog-PIM edge AI, from Seongnam to Vietnam",
    description:
      "Pebble Vina is the Vietnam member of Pebble Square Inc., the Korean fabless company whose Analog-PIM chips compute inside memory — top AI performance on a fraction of the power, with nothing sent to the cloud. Silicon in mass production since 2023.",
  },

  nav: {
    links: [
      { label: "Why now", href: "#why-now" },
      { label: "Track record", href: "#track-record" },
      { label: "Products", href: "#products" },
      { label: "Domains", href: "#domains" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Book a consultation",
    menuLabel: "Menu",
  },

  hero: {
    eyebrow: "Pebble Vina · the Vietnam member of the Pebble Square group",
    h1: "The world wants more AI than it has power for",
    lead: "Pebble Square builds AI chips that compute inside the memory instead of hauling data to a processor — full performance on a fraction of the energy, with nothing sent to the cloud. Pebble Vina brings that platform into operation in Vietnam.",
    ctaPrimary: "Book a 30-minute consultation",
    ctaSecondary: "See what has been built",
    ctaSecondaryHref: "#track-record",
    trust: [
      { label: "Parent company", value: "Pebble Square Inc. · Seongnam, Korea" },
      { label: "Founded", value: "September 2021 · fabless AI semiconductors" },
      { label: "Silicon", value: "MINT in mass production since May 2023" },
      { label: "Recognition", value: "KPAS 2025 · Korea Promising AI Startups" },
    ],
    scrollHint: "Why this matters now",
  },

  whyNow: {
    kicker: "01 — Why now",
    heading: "Performance stopped being the hard part. Energy became it.",
    lead: "Every organisation now has more AI it wants to run than power, bandwidth or permission to run it. That gap is the whole opportunity.",
    points: [
      {
        no: "01",
        title: "Data centres already draw about 2% of the world's electricity",
        body: "Plus roughly 300,000 gallons of water a day for cooling. Every larger model widens that bill, and the grid is not widening with it.",
      },
      {
        no: "02",
        title: "The work is moving to places with no power budget",
        body: "Substations, solar arrays, production lines, wearables, battery-powered sensors. The sites that need inference most can spare a few hundred milliwatts — not a few hundred watts.",
      },
      {
        no: "03",
        title: "Most of that energy moves data rather than computing on it",
        body: "In a conventional von Neumann machine, memory and processor sit apart and the bus burns the budget. Processing-In-Memory does the arithmetic where the data already is.",
      },
    ],
    pillarsTitle: "The four properties Pebble Square designs for",
    pillars: [
      { title: "Low power", body: "Analog computation inside embedded flash, not across a bus." },
      { title: "Private", body: "On-device inference with no reliance on the cloud." },
      { title: "Fast", body: "Instant inferencing — the decision is made where the data is." },
      { title: "Low cost", body: "Hardware you buy once instead of inference you rent monthly." },
    ],
  },

  stats: {
    kicker: "The measured case",
    heading: "Four numbers, four labels",
    lead: "Three are measured on shipping silicon. The fourth is the most impressive in the set — and it is still a roadmap item. We label it so you do not have to guess.",
    items: [
      {
        value: "17.6",
        unit: "TOPS/W",
        label: "MINT energy efficiency",
        note: "Analog-PIM, ~30 GOPS, 5×5 mm die. Measured on real silicon, in mass production since May 2023.",
        source: "Pebble Square · SmartTimes/JBNU · IR deck p.21",
        status: "shipped",
      },
      {
        value: "~50×",
        label: "Lower power than NVIDIA Jetson Nano",
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
      {
        value: "160",
        unit: "TOPS",
        label: "ESPRESSO AI SoC @INT8",
        note: "10 W, 16 TOPS/W. Four-chip card reaches 640 TOPS. Runs in-house LLMs up to 120B parameters.",
        source: "Pebble Square IR deck, 5 Jan 2026",
        status: "roadmap",
        statusNote: "Expected Sep 2026",
      },
    ],
    legend:
      "Green means it exists on shipping hardware. Amber means it appears in the parent company's investor material and is not yet on the public product catalogue.",
  },

  track: {
    kicker: "02 — Track record",
    heading: "Four markets, one playbook",
    lead: "Pebble Square expands by putting a legal entity next to a local ecosystem rather than shipping from Seongnam and hoping. Vietnam is the fourth run of the same playbook.",
    markets: [
      {
        region: "Korea",
        org: "Pebble Square Inc. — headquarters",
        period: "2021 →",
        body: "MOCHA, the first-generation PIM edge chip, in 2021. Joint-research MOU with KAIST and Chonbuk National University in 2022. NDA with SK hynix on Analog Computing-in-Memory and AI accelerators in 2023. MINT in mass production from May 2023. Selected for KPAS 2025.",
        status: "shipped",
      },
      {
        region: "Japan",
        org: "Pebble Square Japan, Inc.",
        period: "2024 →",
        body: "A conditional purchase NDA with MEISEI ELECTRIC Co., Ltd. for a MINT-based Home IoT system in March 2024, followed by a Tokyo subsidiary in May 2025 selected for the Tokyo Overseas Company Project.",
        status: "shipped",
      },
      {
        region: "Saudi Arabia",
        org: "Cluster AI Lab — joint venture",
        period: "2024 →",
        body: "A joint-venture investment agreement signed in March 2024, opening the Gulf market where sovereign-AI requirements and on-premise inference line up exactly with what PIM silicon is good at.",
        status: "shipped",
      },
      {
        region: "Vietnam",
        org: "Pebble Vina",
        period: "2026 →",
        body: "A Vietnamese legal entity in Hanoi carrying the platform into real operation for Vietnamese industry and government, with Southeast Asia beyond it. Same structure, fourth market.",
        status: "shipped",
      },
    ],
  },

  timeline: {
    kicker: "Since 2021",
    heading: "Everything Pebble Square has put on the record",
    lead: "Taken from the company history it publishes itself, plus the one 2026 item that comes from investor material and is marked as such.",
    items: [
      { date: "Sep 2021", title: "Pebble Square Inc. founded in Seongnam", status: "shipped" },
      { date: "Nov 2021", title: "MOCHA — first-generation PIM edge AI chip; corporate research centre established", status: "shipped" },
      { date: "Jul 2022", title: "Joint-research MOU with KAIST and Chonbuk National University", status: "shipped" },
      { date: "Oct 2022", title: "Venture company certification", status: "shipped" },
      { date: "Dec 2022", title: "MINT — second-generation PIM AI semiconductor developed", status: "shipped" },
      { date: "Mar 2023", title: "NDA signed with SK hynix", status: "shipped", starred: true },
      { date: "May 2023", title: "MINT enters mass production", status: "shipped", starred: true },
      { date: "Jan 2024", title: "Patent registered for a neuromorphic device", status: "shipped" },
      { date: "Feb 2024", title: "PoC demonstrated on MINT — voice-controlled lighting with emergency call bell", status: "shipped" },
      { date: "Mar 2024", title: "Cluster AI Lab joint venture, Saudi Arabia · Home IoT NDA with MEISEI ELECTRIC", status: "shipped", starred: true },
      { date: "Mar 2025", title: "UTC Investment invests ₩2 billion", status: "shipped" },
      { date: "May 2025", title: "Pebble Square Japan, Inc. established in Tokyo", status: "shipped", starred: true },
      { date: "Aug 2025", title: "Pre-A round closed", status: "shipped" },
      { date: "Oct 2025", title: "Selected for KPAS 2025 — Korea Promising AI Startups", status: "shipped" },
      { date: "Sep 2026", title: "ESPRESSO — 160 TOPS Digital-PIM AI SoC", status: "roadmap", statusNote: "Investor material" },
    ],
    footnote:
      "Company history as published by Pebble Square (read 20 Aug 2026). The September 2026 entry is from the IR deck dated 5 January 2026 and does not appear on the public product catalogue.",
  },

  products: {
    kicker: "03 — Products",
    heading: "Three layers, one architecture",
    lead: "This is Pebble Square's catalogue in its own structure: the silicon, the toolchain that puts models onto it, and the branch built for heavy workloads.",
    plain: "A conventional computer stores data in one place and computes in another, so most of the energy is spent hauling data back and forth. Processing-In-Memory performs the arithmetic where the data already sits. Less movement, less power — an idea borrowed from how the human brain works.",
    layers: [
      {
        name: "PIM-based AI chips",
        tagline: "Analog-PIM · computation inside embedded flash",
        body: "A crossbar array for analog computing with 256-state synaptic cells at 8-bit precision, mixed-signal digital/analog processors, and large-scale neural networks — FCNN, CNN, DNN and RNN — running on-device.",
        items: "MOCHA (2021) · MINT (2022) · PAPAYA FLEX",
        status: "shipped",
      },
      {
        name: "Pebble AI Studio",
        tagline: "Integrated SDK · the path from trained model to silicon",
        body: "Deploys and optimises trained models onto PIM chips quickly and seamlessly, with an AI Accelerator alongside it for development work. Without this layer the chips would be a research result rather than a product.",
        items: "Pebble AI Studio · AI Accelerator",
        status: "shipped",
      },
      {
        name: "ESPRESSO AI SoC",
        tagline: "Digital-PIM on SRAM · for heavy workloads and private LLMs",
        body: "A second architectural branch aimed at AI PCs, private LLM appliances, robotics and industrial edge: 160 TOPS @INT8 within 10 W, four-chip cards at 640 TOPS, and on-premise servers running in-house models up to 120B parameters.",
        items: "ESPRESSO · M.2 module · accelerator card · on-premise LLM server",
        status: "roadmap",
        statusNote: "Expected Sep 2026",
      },
    ],
  },

  team: {
    kicker: "04 — Who they are",
    heading: "A fabless chip company run by device physicists",
    lead: "Pebble Square Inc. was founded in September 2021 in Seongnam. The technical leadership it publishes is four people — three of them doctorates from the University of Tokyo.",
    people: [
      { name: "ChoongHyun Lee", role: "Chief Executive Officer", credential: "Ph.D., The University of Tokyo (2013)" },
      { name: "SangHyeon Kim", role: "Chief Technology Officer", credential: "Ph.D., The University of Tokyo (2014)" },
      { name: "Cimang Lu", role: "Architecture Leader", credential: "Ph.D., The University of Tokyo (2015)" },
      { name: "Xu Yi", role: "Circuit Leader", credential: "M.S., Tsinghua University (2007)" },
    ],
    backingTitle: "Backing and standing",
    backing: [
      { label: "Capital raised", value: "~₩15 billion to date" },
      { label: "Latest investors", value: "UTC Investment ₩2bn (Mar 2025) · Pre-A closed Aug 2025" },
      { label: "Academic partners", value: "KAIST · Chonbuk National University" },
      { label: "IP depth", value: ">800 US patents · >200 SCI papers (IR deck)" },
    ],
  },

  places: {
    kicker: "05 — Where they are",
    heading: "Two continents, four addresses",
    lead: "The group is small and deliberately placed: an engineering headquarters in Korea's chip corridor, and one local entity per market it decides to serve.",
    offices: [
      {
        label: "Headquarters",
        org: "Pebble Square Inc.",
        address: "331, 402 Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea — ABN Tower, Sampyeong-dong",
        status: "shipped",
      },
      {
        label: "Japan",
        org: "Pebble Square Japan, Inc.",
        address: "Tokyo, Japan — established May 2025, selected for the Tokyo Overseas Company Project",
        status: "shipped",
      },
      {
        label: "Saudi Arabia",
        org: "Cluster AI Lab — joint venture",
        address: "Joint-venture investment agreement signed March 2024",
        status: "shipped",
      },
      {
        label: "Vietnam",
        org: "Pebble Vina",
        address: "Suite O1912, 19th Floor, Landmark 72 Tower, Cau Giay New Urban Area, Yen Hoa Ward, Hanoi",
        status: "shipped",
      },
    ],
  },

  domains: {
    kicker: "06 — Domains",
    heading: "Six sectors the platform already works in",
    lead: "These six are Pebble Square's own business sectors, each with the on-device capability behind it. The last two lines are ours, and are marked as ours.",
    items: [
      {
        title: "Fault Analysis",
        body: "Real-time diagnostics for automated robots and machinery — catching a failure before the line stops rather than after.",
        origin: "ps",
      },
      {
        title: "Risk Management",
        body: "Continuous anomaly detection on live data, running at the equipment instead of in a monitoring centre.",
        origin: "ps",
      },
      {
        title: "Vision",
        body: "High-speed, low-power image processing for manufacturing and healthcare: inspection, counting, classification.",
        origin: "ps",
      },
      {
        title: "Security",
        body: "Threat detection with no reliance on internet or network — the footage and the decision both stay on the device.",
        origin: "ps",
      },
      {
        title: "Home IoT",
        body: "Speech recognition for smart homes and wearables. Demonstrated on MINT in February 2024: voice-controlled lighting with an emergency call bell.",
        origin: "ps",
      },
      {
        title: "Healthcare",
        body: "Image and signal processing inside medical devices, where power, latency and patient privacy are all constraints at once.",
        origin: "ps",
      },
      {
        title: "Private LLM deployment",
        body: "Pebble Vina deploys on-premise inference servers so an organisation can run its own models on its own documents. A configuration ships today on commercial GPUs; the ESPRESSO version follows the Sep 2026 roadmap.",
        origin: "pv",
      },
      {
        title: "Electrical safety and solar",
        body: "Not a Pebble Square product. Pebble Vina builds this layer on the parent's anomaly-detection capability for the Vietnamese market, against UL 1699B, IEC 63027:2023 and TCVN 11855-1:2017.",
        origin: "pv",
      },
    ],
    legend: {
      ps: "Pebble Square business sector",
      pv: "Pebble Vina application layer",
    },
  },

  local: {
    kicker: "07 — Pebble Vina",
    heading: "So why not buy directly from Korea?",
    lead: "A fair question. Four things a contract signed straight with Seongnam does not give you.",
    items: [
      {
        no: "01",
        title: "A Vietnamese legal entity",
        body: "Contracts, VAT invoices, warranty and acceptance paperwork — in Vietnamese, under Vietnamese law. PEBBLE VINA COMPANY LIMITED, tax code 0111545175, office in Hanoi.",
      },
      {
        no: "02",
        title: "Engineers on your factory floor",
        body: "Application support and design-in on site, not an email to Seongnam and a wait across seven time zones.",
      },
      {
        no: "03",
        title: "Vietnamese standards compliance",
        body: "TCVN/QCVN, import procedures, documentation for your assessors. This work takes longer than people expect and cannot be done remotely.",
      },
      {
        no: "04",
        title: "The Korean business network in Vietnam",
        body: "Pebble Vina's investor is a Vice Chairman of KOCHAM, the Korean Chamber of Business in Vietnam.",
      },
    ],
    punch: "Korean technology, Vietnamese accountability.",
    cta: "Book a 30-minute consultation",
  },

  start: {
    kicker: "08 — Getting started",
    heading: "What actually happens after you click",
    lead: "Nothing is signed at step one. Four steps, each ending in something you can hold.",
    steps: [
      {
        no: "01",
        title: "A 30-minute working session",
        body: "You describe the problem. We say plainly whether on-site processing fits it — and if it does not, we say so.",
        deliverable: "A yes/no answer, free of charge",
      },
      {
        no: "02",
        title: "Site assessment",
        body: "We look at the data, the equipment, and the power and connectivity constraints where the system will actually run.",
        deliverable: "Proposed architecture and cost estimate",
      },
      {
        no: "03",
        title: "A pilot with measurable criteria",
        body: "Running on real hardware, in narrow scope, against acceptance metrics agreed in advance.",
        deliverable: "Measurement report against the agreed criteria",
      },
      {
        no: "04",
        title: "Rollout and handover",
        body: "Scaling on the pilot's results, and training your operations team to take it over.",
        deliverable: "A running system plus operating documentation",
      },
    ],
    note: "Step durations depend on scale. A direct conversation gives a closer figure than any estimate printed on a website.",
  },

  faq: {
    kicker: "09 — Questions",
    heading: "The hard questions, answered straight",
    lead: "Including the one a sales page usually avoids.",
    items: [
      {
        q: "Is Pebble Vina a Vietnamese or a Korean company?",
        a: "It is a Vietnamese legal entity — PEBBLE VINA COMPANY LIMITED, tax code 0111545175, registered in Hanoi — and the Vietnam member of the Pebble Square group. You sign with the Vietnamese entity; the technology comes from the parent company in Seongnam.",
      },
      {
        q: "Who is Pebble Square, and where can I verify this?",
        a: "Pebble Square Inc. is a fabless AI semiconductor company founded in September 2021, headquartered at ABN Tower, 331 Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea, with CEO ChoongHyun Lee and business licence 879-88-02299. Everything on this page about the parent company can be checked at pebble-square.com.",
      },
      {
        q: "Is the silicon shipping, or is this still research?",
        a: "MINT, the second-generation chip, has been in mass production since May 2023 at 17.6 TOPS/W. The 160 TOPS ESPRESSO AI SoC has not shipped: it appears in the investor deck dated 5 January 2026 as expected in September 2026, and it is not on the public product catalogue. Every figure on this page carries a label so the two are never confused.",
      },
      {
        q: "How is this different from an NVIDIA Jetson or a GPU card?",
        a: "It differs in power and size, not in being better at everything. Per Pebble Square's IR deck, PAPAYA FLEX draws 0.1–0.15 W against 5–10 W for a Jetson Nano on the same class of machine-vision workload, in a package around 25× smaller. If your problem is training large models, a GPU is still the right answer.",
      },
      {
        q: "Does our data leave the company?",
        a: "Not under an on-site architecture. Pebble Square designs explicitly for processing \"without reliance on internet or network\", and an LLM server placed inside your own infrastructure keeps both the data and the model behind your firewall.",
      },
      {
        q: "We need arc-fault detection for a solar installation. Can you do that?",
        a: "This one deserves a precise answer. Pebble Square does not list arc-fault detection among its business sectors; what it publishes is Fault Analysis and Risk Management — real-time diagnostics and anomaly detection for automated robots and machinery. Electrical safety is an application layer Pebble Vina builds on that capability for the Vietnamese market, against UL 1699B, IEC 63027:2023 and TCVN 11855-1:2017. The platform exists; the application layer is built with you.",
      },
      {
        q: "What does it cost?",
        a: "It depends on architecture and scale, so there is no price list here. What can be said now is that the cost model differs from the cloud: you pay once for hardware instead of paying monthly per inference. The first session and the yes/no answer are free.",
      },
      {
        q: "Why does this page spend so much of its space on the parent company?",
        a: "Because that is the most useful part of the file. Pebble Vina is a new entity with no publishable case studies yet. Rather than write generalities about a company without a past, this page puts forward what you can verify: Pebble Square's history, numbers, leadership and product catalogue — labelled to separate what exists from what is still a roadmap.",
      },
    ],
  },

  cta: {
    heading: "Thirty minutes, one straight answer",
    lead: "Describe your problem. If on-site AI is not the right answer, we will tell you that.",
    primary: "Book a 30-minute consultation",
    secondary: "Email us directly",
    contactLabel: "Or call",
  },

  footer: {
    tagline: "The Vietnam member of the Pebble Square group.",
    navTitle: "On this page",
    contactTitle: "Contact",
    legalTitle: "Legal",
    legalLabel: "Legal entity",
    taxLabel: "Tax code",
    addressLabel: "Registered office",
    parentLabel: "Parent company",
    statusLegend: "Labels used on this page: green = shipping · amber = roadmap",
    disclaimer:
      "Figures about Pebble Square Inc. are drawn from its published materials (pebble-square.com, read 20 August 2026) and from the investor deck dated 5 January 2026. Items labelled roadmap were not commercially available at the time of publication.",
    copyright: "© 2026 PEBBLE VINA COMPANY LIMITED",
  },

  statusLabel: { shipped: "Shipping", roadmap: "Roadmap" },
};

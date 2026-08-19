import type { LandingContent } from "./types";

/**
 * EN — full parallel of `vi.ts`, not a trimmed version: the Korean FDI and GCC
 * audiences read English first (CLAUDE.md §4). Decimal points, not commas (17.6).
 */
export const en: LandingContent = {
  locale: "en",
  alternate: { href: "/", label: "VI", hrefLang: "vi" },

  meta: {
    title: "Pebble Vina — Korean AI silicon, operated in Vietnam",
    description:
      "Pebble Vina is the Vietnam member of the Pebble Square Inc. group (South Korea), bringing a mass-produced Edge AI platform into real operation in Vietnam. AI runs on site; your data never leaves.",
  },

  nav: {
    links: [
      { label: "Evidence", href: "#bang-chung" },
      { label: "Technology", href: "#cong-nghe" },
      { label: "History", href: "#lich-su" },
      { label: "Applications", href: "#ung-dung" },
      { label: "FAQ", href: "#cau-hoi" },
    ],
    cta: "Book a consultation",
  },

  hero: {
    eyebrow: "The Vietnam member of the Pebble Square group",
    h1: "Korean AI silicon, operated in Vietnam",
    lead: "Pebble Vina brings the Edge AI platform of Pebble Square Inc. — silicon in mass production since 2023 — into real operation in Vietnam. The AI runs inside your building; the data goes nowhere.",
    ctaPrimary: "Book a 30-minute consultation",
    ctaSecondary: "See the company profile",
    trust: [
      { label: "Parent company", value: "Pebble Square Inc. · Seongnam, South Korea" },
      { label: "Founded", value: "Sep 2021 · fabless AI semiconductors" },
      { label: "MINT chip", value: "In mass production since May 2023" },
      { label: "Recognition", value: "KPAS 2025 — Korea Promising AI Startups" },
    ],
  },

  proof: {
    kicker: "02 — Evidence",
    heading: "You are not buying a two-month-old startup",
    lead: "Pebble Vina is a new Vietnamese entity. The platform behind it is not new. Here is the parent company — full name, address, and a link so you can verify it yourself.",
    parent: {
      name: "Pebble Square Inc.",
      role: "Parent company · fabless AI semiconductors, Edge AI focus",
      facts: [
        { label: "Headquarters", value: "Seongnam, Gyeonggi-do, South Korea" },
        { label: "Founded", value: "September 2021" },
        { label: "Capital raised", value: "~KRW 15 billion" },
        { label: "Intellectual property", value: ">800 US patents · >200 SCI papers" },
      ],
      href: "https://www.pebble-square.com",
      hrefLabel: "pebble-square.com",
    },
  },

  stats: {
    kicker: "03 — Numbers",
    heading: "Four numbers, four labels",
    lead: "Three of them are measured on shipping hardware. The fourth is the most impressive in the set — and it is still on the roadmap. We label it, so you do not have to guess.",
    items: [
      {
        value: "17.6",
        unit: "TOPS/W",
        label: "Energy efficiency of the MINT chip",
        note: "Analog-PIM architecture, ~30 GOPS, 5×5 mm die. Measured on real silicon.",
        source: "Pebble Square · SmartTimes/JBNU · IR deck p.21",
        status: "shipped",
      },
      {
        value: "May 2023",
        label: "MINT entered mass production",
        note: "The line between research and product. The second-generation chip crossed it.",
        source: "Pebble Square company history",
        status: "shipped",
      },
      {
        value: "~50×",
        label: "Lower power than NVIDIA Jetson Nano",
        note: "PAPAYA FLEX at 0.1–0.15 W versus 5–10 W, on the same class of machine-vision workload.",
        source: "Pebble Square IR deck, 5 Jan 2026",
        status: "shipped",
      },
      {
        value: "160",
        unit: "TOPS",
        label: "ESPRESSO AI SoC @INT8",
        note: "10 W, 16 TOPS/W. A four-chip card reaches 640 TOPS. Runs in-house LLMs up to 120B parameters.",
        source: "Pebble Square IR deck, 5 Jan 2026",
        status: "roadmap",
        statusNote: "Expected Sep 2026",
      },
    ],
    legend:
      "Green means it exists on shipping hardware. Amber means it is on the parent company's roadmap and not yet commercially available.",
  },

  problem: {
    kicker: "04 — The problem",
    heading: "Three places cloud AI cannot reach",
    lead: "Not because the cloud is bad. Because some constraints cannot be bought with more bandwidth.",
    items: [
      {
        no: "01",
        title: "The data is not allowed to leave the organisation",
        body: "Medical records, transaction data, manufacturing drawings, citizen data. Internal policy or law is explicit: it does not go outside. That rules out most of the AI tooling on the market before the first meeting ends.",
      },
      {
        no: "02",
        title: "The field has neither bandwidth nor spare power",
        body: "Substations, solar arrays, production lines, battery-powered devices. The places that need AI most are usually the places without a stable link — and without a spare few dozen watts for a graphics card.",
      },
      {
        no: "03",
        title: "One second late is already too late",
        body: "Anomaly detection on machinery, safety alerts, line stops. Shipping data to the cloud and waiting for an answer is not a usable architecture for any of these.",
      },
    ],
  },

  tech: {
    kicker: "05 — Technology",
    heading: "The arithmetic happens inside the memory",
    lead: "This is the technical core of Pebble Square, and the reason the three problems above have an answer.",
    plainEnglish:
      "A conventional computer stores data in one place and computes in another, so most of the energy is spent hauling data back and forth. PIM — Processing-In-Memory — performs the arithmetic where the data already sits. Less hauling, less power. That is the whole idea, and it is borrowed from how the human brain works.",
    branches: [
      {
        name: "Analog-PIM",
        arch: "Analog computation inside embedded flash memory",
        body: "Pebble Square's original branch: a crossbar array with 256-state (8-bit) synaptic cells. Extremely low power, and small enough to sit inside a battery-powered device.",
        chips: "MOCHA (2021) · MINT (2022) · PAPAYA FLEX",
        status: "shipped",
      },
      {
        name: "Digital-PIM",
        arch: "SRAM-based PIM for heavy workloads",
        body: "The newer branch, aimed at AI PCs, private LLM appliances, robotics and industrial edge. 160 TOPS @INT8 within 10 W; a four-chip card reaches 640 TOPS.",
        chips: "ESPRESSO (AI SoC)",
        status: "roadmap",
        statusNote: "Expected Sep 2026",
      },
    ],
    pillars: [
      {
        no: "01",
        title: "The data stays",
        body: "Processing happens on the device, with no reliance on internet or network. This is the one advantage a cloud competitor cannot erase with a discount.",
      },
      {
        no: "02",
        title: "Very low power",
        body: "Efficient enough to put intelligence where you could previously only put a sensor.",
      },
      {
        no: "03",
        title: "Immediate response",
        body: "Decisions are made locally. No round trip, no dependence on link quality at peak hours.",
      },
      {
        no: "04",
        title: "Pay once",
        body: "You pay for hardware instead of paying forever per API token.",
      },
    ],
  },

  timeline: {
    kicker: "06 — Parent company history",
    heading: "Five years, and an expansion model that has already run twice",
    lead: "For a Vietnamese reader the two most relevant milestones are not the technical ones: the Saudi joint venture and the Tokyo subsidiary. Pebble Vina is the third run of the same model.",
    items: [
      {
        date: "Nov 2021",
        title: "First-generation Edge AI PIM chip — MOCHA",
        body: "The corporate research centre was established the same year.",
        status: "shipped",
      },
      {
        date: "Jul 2022",
        title: "Joint research MOU with KAIST and Jeonbuk National University",
        body: "Intelligent semiconductor research with two of Korea's academic anchors.",
        status: "shipped",
      },
      {
        date: "Mar 2023",
        title: "NDA signed with SK hynix",
        body: "Covering Analog Computing-in-Memory technology and AI accelerators.",
        status: "shipped",
        starred: true,
      },
      {
        date: "May 2023",
        title: "MINT entered mass production",
        body: "The second-generation chip left the lab: 17.6 TOPS/W, ~30 GOPS, 5×5 mm die.",
        status: "shipped",
        starred: true,
      },
      {
        date: "Mar 2024",
        title: "Cluster AI Lab joint venture in Saudi Arabia",
        body: "The same month: a conditional purchase NDA with MEISEI ELECTRIC (Japan) for a home IoT system built on MINT.",
        status: "shipped",
        starred: true,
      },
      {
        date: "May 2025",
        title: "Pebble Square Japan, Inc. established in Tokyo",
        body: "Selected for the Tokyo Overseas Company Project. Pebble Vina follows the same model.",
        status: "shipped",
        starred: true,
      },
      {
        date: "Oct 2025",
        title: "Selected for KPAS 2025",
        body: "Korea Promising AI Startups — the national shortlist of promising Korean AI companies.",
        status: "shipped",
      },
      {
        date: "Sep 2026",
        title: "ESPRESSO — 160 TOPS AI SoC",
        body: "The Digital-PIM branch, for heavy workloads and on-premise LLMs.",
        status: "roadmap",
        statusNote: "Per the IR deck of 5 Jan 2026",
      },
    ],
    footnote:
      "Milestones are taken from the official Pebble Square company history (cross-checked June 2026) and the IR deck dated 5 January 2026.",
  },

  local: {
    kicker: "07 — Pebble Vina",
    heading: "So why not buy directly from Korea?",
    lead: "A fair question. Here are four things a contract signed straight with Seongnam does not give you.",
    items: [
      {
        no: "01",
        title: "A Vietnamese legal entity",
        body: "Contracts, VAT invoices, warranty and acceptance paperwork — in Vietnamese, under Vietnamese law. PEBBLE VINA COMPANY LIMITED, tax code 0111545175, office in Hanoi.",
      },
      {
        no: "02",
        title: "Engineers on your factory floor",
        body: "Application support and design-in on site. Not an email to Seongnam and a wait across seven time zones.",
      },
      {
        no: "03",
        title: "Vietnamese standards compliance",
        body: "TCVN/QCVN, import procedures, documentation for your assessors. This work takes longer than people expect, and it cannot be done remotely.",
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

  useCases: {
    kicker: "08 — Applications",
    heading: "Six places this platform already goes",
    lead: "Each card states its origin: what Pebble Square has published as its own capability, and what Pebble Vina builds on top for the Vietnamese market. We do not merge the two.",
    items: [
      {
        title: "On-device voice recognition",
        body: "Voice control with no internet. Pebble Square ran a real proof of concept in Feb 2024: a voice-recognition lighting system with an emergency call bell.",
        origin: "ps",
      },
      {
        title: "Low-power machine vision",
        body: "High-speed, low-power image processing — counting, sorting and visual inspection on the line.",
        origin: "ps",
      },
      {
        title: "Security without a network",
        body: "Security processing entirely on the device, with no reliance on internet or internal network.",
        origin: "ps",
      },
      {
        title: "Anomaly detection & predictive maintenance",
        body: "Real-time data analysis to detect irregularities and diagnose faults in automated robots and machinery.",
        origin: "ps",
      },
      {
        title: "Private on-premise LLM",
        body: "An LLM inference server inside your own infrastructure: question answering over internal documents, with nothing sent outside. A configuration that ships today uses commercial GPUs; the ESPRESSO-based version follows the Sep 2026 roadmap.",
        origin: "pv",
      },
      {
        title: "Electrical safety & solar",
        body: "An application layer Pebble Vina builds on the parent company's anomaly-detection capability, aligned to UL 1699B, IEC 63027:2023 and TCVN 11855-1:2017. This is Pebble Vina's direction for the Vietnamese market, not an off-the-shelf Pebble Square product.",
        origin: "pv",
      },
    ],
    legend: {
      ps: "Published Pebble Square capability",
      pv: "Application layer built by Pebble Vina",
    },
  },

  start: {
    kicker: "09 — Getting started",
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
    note: "Step durations depend on scale. A direct conversation will give you a closer figure than any estimate printed on a website.",
  },

  faq: {
    kicker: "10 — Questions",
    heading: "The hard questions, answered straight",
    lead: "Including the one a sales page usually avoids.",
    items: [
      {
        q: "Is Pebble Vina a Vietnamese or a Korean company?",
        a: "It is a Vietnamese legal entity — PEBBLE VINA COMPANY LIMITED, tax code 0111545175, registered in Hanoi — and the Vietnam member of the Pebble Square group (South Korea). You sign with the Vietnamese entity; the technology comes from the parent company.",
      },
      {
        q: "Who is Pebble Square, and where can I verify this?",
        a: "Pebble Square Inc. (페블스퀘어) is a fabless AI semiconductor company founded in September 2021, headquartered in Seongnam, Gyeonggi-do, South Korea. Official site: pebble-square.com. It has raised roughly KRW 15 billion and was selected for Korea's KPAS 2025 list.",
      },
      {
        q: "Is the silicon shipping, or is this still research?",
        a: "The second-generation MINT chip has been in mass production since May 2023, at 17.6 TOPS/W. The 160 TOPS ESPRESSO AI SoC has not: per Pebble Square's IR deck of 5 January 2026, it is expected in September 2026. Every number on this page carries a label so you can tell the two apart.",
      },
      {
        q: "How is this different from an NVIDIA Jetson or a GPU card?",
        a: "It differs in power and size, not in being better at everything. Per Pebble Square's IR deck, PAPAYA FLEX draws 0.1–0.15 W against 5–10 W for a Jetson Nano on the same class of machine-vision workload (ResNet-50), in a package around 25× smaller. If your problem is training large models, a GPU is still the right answer.",
      },
      {
        q: "Does our data leave the company?",
        a: "No, under an on-site architecture. On-device processing has no reliance on internet or network, and an LLM server placed inside your infrastructure keeps both the data and the model behind your own firewall.",
      },
      {
        q: "We need arc-fault detection for a solar installation. Can you do that?",
        a: "This one deserves a precise answer. Pebble Square does not list arc-fault detection in its product catalogue; the capability it publishes is anomaly detection and predictive maintenance for automated robots and machinery. Electrical safety is an application layer Pebble Vina builds on that capability for the Vietnamese market, aligned to UL 1699B, IEC 63027:2023 and TCVN 11855-1:2017. In short: the platform exists, the application layer is built with you.",
      },
      {
        q: "What does it cost?",
        a: "It depends on architecture and scale, so there is no price list on this page. What can be said now is that the cost model differs from the cloud: you pay once for hardware instead of paying monthly per API call. The first session and the yes/no answer are free.",
      },
      {
        q: "Why does this page talk so much about the parent company?",
        a: "Because that is the most honest part of the file. Pebble Vina is a new entity with no publishable case studies yet. Rather than write generalities about a company without a past, this page puts forward what you can verify: Pebble Square's history, numbers and milestones — labelled to separate what exists from what is still a roadmap.",
      },
    ],
  },

  cta: {
    heading: "Thirty minutes, one straight answer",
    lead: "Describe your problem. If on-site AI is not the right answer, we will tell you that.",
    primary: "Book a 30-minute consultation",
    secondary: "See the company profile",
    contactLabel: "Or call directly",
  },

  footer: {
    tagline: "The Vietnam member of the Pebble Square group.",
    legalLabel: "Legal entity",
    taxLabel: "Tax code",
    addressLabel: "Registered office",
    contactLabel: "Contact",
    parentLabel: "Parent company",
    statusLegend: "Labels on this page: green = shipping · amber = roadmap",
    disclaimer:
      "Technical figures are drawn from Pebble Square Inc. published materials and the IR deck dated 5 January 2026. Items labelled as roadmap were not commercially available at the time of publication.",
  },

  statusLabel: { shipped: "Shipping", roadmap: "Roadmap" },
};

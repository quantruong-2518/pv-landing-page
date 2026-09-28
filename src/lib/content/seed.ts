import { SEED_PUBLISHED_AT, type SiteContent } from "@/lib/content/schema";

/**
 * Seed for the CMS document.
 *
 * Vietnamese is the source and comes from the shipped design
 * (`Pebble Vina Home.dc.html` / `Pebble Vina Product.dc.html`, which carry the
 * full paragraphs — the `DEFAULTS` object in the Admin mock holds abbreviated
 * versions of the same fields). English comes from the `data-en` attribute
 * sitting on each Vietnamese node, so that pair is the designer's, not a
 * re-translation. Korean is translated from the Vietnamese in the same
 * marketing register as `src/lib/i18n/dictionary.ts`.
 *
 * Nothing here may be invented: these are product claims about real silicon.
 * A translation may reorder a sentence; it may not add a figure, a capability
 * or a date that the Vietnamese does not already state.
 */
export const SEED_CONTENT: SiteContent = {
  // Document-level, not a page — see the comment on `SEED_PUBLISHED_AT` in
  // schema.ts for where this date comes from and when to bump it.
  publishedAt: SEED_PUBLISHED_AT,
  home: {
    hero: {
      visible: true,
      eyebrow: {
        vi: "CHIP BÁN DẪN TÍCH HỢP AI NGOẠI BIÊN THẾ HỆ MỚI",
        en: "NEXT-GENERATION EDGE AI SEMICONDUCTORS",
        ko: "차세대 엣지 AI 반도체",
      },
      title: {
        vi: "KIẾN TẠO CÔNG NGHỆ BÁN DẪN\nCHO *KỶ NGUYÊN AI*",
        en: "ENGINEERING SEMICONDUCTORS\nFOR *THE AI ERA*",
        ko: "*AI 시대*를 여는\n반도체 기술",
      },
      lead: {
        vi: "Pebble Vina tập trung nghiên cứu và phát triển các công nghệ bán dẫn AI, từ thiết kế kiến trúc chip, công nghệ tính toán trong bộ nhớ (CIM) đến phát triển phần mềm và các giải pháp AI ứng dụng.",
        en: "Pebble Vina researches and develops AI semiconductor technologies — from chip architecture and compute-in-memory (CIM) to software and applied AI solutions.",
        ko: "Pebble Vina는 칩 아키텍처 설계와 메모리 내 연산(CIM) 기술부터 소프트웨어 개발과 응용 AI 솔루션에 이르기까지, AI 반도체 기술을 연구하고 개발합니다.",
      },
      sub: {
        vi: "Với định hướng kết hợp giữa phần cứng và phần mềm, Pebble Vina phát triển các nền tảng tính toán phục vụ AI, Edge AI, On-device AI và các mô hình AI thế hệ mới.",
        en: "Hardware and software developed together: computing platforms for AI, Edge AI, on-device AI and the next generation of AI models.",
        ko: "하드웨어와 소프트웨어를 함께 설계한다는 방향 아래, AI와 Edge AI, 온디바이스 AI, 그리고 차세대 AI 모델을 위한 연산 플랫폼을 개발합니다.",
      },
      cta: {
        vi: "TÌM HIỂU THÊM →",
        en: "EXPLORE THE TECHNOLOGY →",
        ko: "기술 살펴보기 →",
      },
      image: "/images/ai-semiconductor-hero-v2.png",
    },

    marquee: {
      visible: true,
      items: {
        vi: "NGHIÊN CỨU · THỰC NGHIỆM · PHÁT TRIỂN · ĐÀO TẠO · COMPUTE-IN-MEMORY · EDGE AI · ON-DEVICE AI · AI INFERENCE",
        en: "RESEARCH · EXPERIMENTATION · DEVELOPMENT · TRAINING · COMPUTE-IN-MEMORY · EDGE AI · ON-DEVICE AI · AI INFERENCE",
        ko: "연구 · 실증 · 개발 · 교육 · COMPUTE-IN-MEMORY · EDGE AI · ON-DEVICE AI · AI INFERENCE",
      },
    },

    pim: {
      visible: true,
      eyebrow: {
        vi: "01 — COMPUTE IN MEMORY",
        en: "01 — COMPUTE IN MEMORY",
        ko: "01 — COMPUTE IN MEMORY",
      },
      title: {
        vi: "CÔNG NGHỆ CIM\nNỀN TẢNG TÍNH TOÁN CHO AI",
        en: "THE COMPUTING FOUNDATION\nFOR AI",
        // One line: "AI 연산의 토대가 되는" is a modifier, and breaking it off
        // would leave the dimmer line carrying the subject of the headline.
        ko: "AI 연산의 토대가 되는 CIM 기술",
      },
      lead: {
        vi: "**CIM (Compute-in-Memory)** là công nghệ tính toán đưa hoạt động xử lý đến gần nơi dữ liệu được lưu trữ, qua đó giảm lượng dữ liệu phải di chuyển giữa bộ nhớ và bộ xử lý.\nPebble Vina phát triển hai hướng công nghệ CIM gồm *Analog* và *Digital* nhằm đáp ứng các nhu cầu tính toán AI khác nhau.",
        en: "**CIM (Compute-in-Memory)** brings computation close to where data is stored, cutting the volume of data that has to move between memory and processor.\nPebble Vina develops two CIM directions — *Analog* and *Digital* — to serve different AI computing needs.",
        ko: "**CIM(Compute-in-Memory)**은 연산을 데이터가 저장된 자리 가까이로 옮겨, 메모리와 프로세서 사이를 오가야 하는 데이터의 양을 줄이는 기술입니다.\nPebble Vina는 서로 다른 AI 연산 수요에 대응하기 위해 *아날로그*와 *디지털* 두 갈래의 CIM 기술을 개발하고 있습니다.",
      },
      imageA: "/images/mint-analog-pim-v2.png",
      imageB: "/images/espresso-digital-pim-v2.png",
    },

    why: {
      visible: true,
      title: {
        vi: "Tại sao công nghệ CIM quan trọng đối với AI?",
        en: "WHY DOES CIM MATTER FOR AI?",
        ko: "CIM 기술이 AI에 중요한 이유",
      },
      lead: {
        vi: "Khi các mô hình AI ngày càng lớn, thách thức không chỉ nằm ở sức mạnh tính toán mà còn ở **việc di chuyển dữ liệu**. Trong kiến trúc truyền thống, dữ liệu liên tục luân chuyển giữa bộ nhớ (DRAM) và bộ xử lý (NPU), tạo ra *nút thắt cổ chai* về cả tốc độ lẫn năng lượng.\n**Công nghệ CIM (Compute-in-Memory)** giải quyết bài toán này bằng cách tích hợp khả năng tính toán *trực tiếp vào cấu trúc bộ nhớ*, rút ngắn quãng đường dữ liệu phải di chuyển đối với các workload AI phù hợp.",
        en: "As AI models grow, the challenge is not only raw compute but **moving data**. In a traditional architecture, data constantly shuttles between memory (DRAM) and the processor (NPU), creating a *bottleneck* in both speed and energy.\n**CIM (Compute-in-Memory)** solves this by building compute *directly into the memory structure*, shortening the distance data has to travel for suitable AI workloads.",
        ko: "AI 모델이 커질수록 과제는 연산 성능 자체보다 **데이터 이동**에 있습니다. 기존 아키텍처에서는 메모리(DRAM)와 프로세서(NPU) 사이에서 데이터가 끊임없이 오가며 속도와 에너지 양쪽에서 *병목*이 생깁니다.\n**CIM(Compute-in-Memory) 기술**은 연산 기능을 *메모리 구조 안에 직접* 통합해, 적합한 AI 워크로드에서 데이터가 이동하는 거리를 줄입니다.",
      },
      image: "/images/pim-ai-data-movement-v2.png",
    },

    core: {
      visible: true,
      eyebrow: {
        vi: "02 — CORE CAPABILITY",
        en: "02 — CORE CAPABILITY",
        ko: "02 — CORE CAPABILITY",
      },
      title: {
        vi: "NĂNG LỰC CỐT LÕI\nCỦA CÔNG NGHỆ CHIP",
        en: "CORE CAPABILITIES\nOF THE CHIP TECHNOLOGY",
        ko: "칩 기술의 핵심 역량",
      },
      lead: {
        vi: "Pebble Vina phát triển kiến trúc công nghệ chip bán dẫn tích hợp AI ngoại biên với trọng tâm **tối ưu luồng dữ liệu, năng lực xử lý song song và hiệu quả tính toán**, hướng tới khả năng xử lý ổn định và hiệu quả năng lượng.",
        en: "Pebble Vina develops edge-AI semiconductor architecture centred on **data-flow optimisation, parallel processing capability and computational efficiency** — built for the rising demands of AI workloads while targeting stable processing and energy efficiency.",
        ko: "Pebble Vina는 **데이터 흐름 최적화와 병렬 처리 능력, 연산 효율**을 중심에 두고 엣지 AI 반도체 아키텍처를 개발하며, 안정적인 처리 성능과 에너지 효율을 함께 지향합니다.",
      },
      stat: "400K",
    },

    news: {
      visible: true,
      eyebrow: {
        vi: "03 — COLLABORATION FOR THE FUTURE",
        en: "03 — COLLABORATION FOR THE FUTURE",
        ko: "03 — COLLABORATION FOR THE FUTURE",
      },
      title: { vi: "TIN TỨC & HỢP TÁC", en: "NEWS & PARTNERSHIPS", ko: "뉴스 & 협력" },
      lead: {
        vi: "Pebble Vina luôn chủ động mở rộng **hợp tác chiến lược với các đối tác, khách hàng và tổ chức hàng đầu** để thúc đẩy đổi mới công nghệ và tạo ra giá trị bền vững.",
        en: "Pebble Vina actively expands **strategic collaboration with leading partners, customers and institutions** to drive technological innovation and create lasting value.",
        ko: "Pebble Vina는 기술 혁신을 앞당기고 지속 가능한 가치를 만들기 위해, **선도적인 파트너·고객·기관과의 전략적 협력**을 꾸준히 넓혀 갑니다.",
      },
      count: 4,
      image1: "/images/news-korea-semiconductor-partnership-v2.png",
      image2: "/images/news-japan-technology-meeting-v2.png",
      image3: "/images/news-vietnam-edge-ai-deployment-v2.png",
      image4: "/images/news-global-ai-partnership-v2.png",
    },

    contact: {
      visible: true,
      title: {
        vi: "Cùng nhau kiến tạo giải pháp chip bán dẫn tích hợp *AI ngoại biên đột phá*",
        en: "LET'S BUILD BREAKTHROUGH *EDGE-AI SEMICONDUCTOR SOLUTIONS* TOGETHER",
        ko: "*혁신적인 엣지 AI 반도체 솔루션*, 함께 만들어 가십시오",
      },
      lead: {
        vi: "Chúng tôi luôn sẵn sàng lắng nghe và **đồng hành cùng bạn để biến ý tưởng thành giá trị thực tiễn**, dẫn dắt tương lai công nghệ.",
        en: "We are always ready to listen and **work alongside you to turn ideas into practical value** and shape the future of technology.",
        ko: "**아이디어를 실질적인 가치로 바꾸고 기술의 미래를 함께** 열어 갈 수 있도록, 언제든 귀사의 이야기를 듣고 동행하겠습니다.",
      },
      cta: { vi: "GỬI THÔNG TIN", en: "SEND", ko: "보내기" },
      note: {
        vi: "Thông tin của bạn được bảo mật và chỉ sử dụng để hỗ trợ theo yêu cầu.",
        en: "Your information is kept confidential and used only to support your request.",
        ko: "입력하신 정보는 안전하게 보관되며, 문의에 답변하는 용도로만 사용됩니다.",
      },
      image: "/images/semiconductor-rd-headquarters-v2.png",
    },
  },

  product: {
    catalog: {
      visible: true,
      eyebrow: {
        vi: "SẢN PHẨM & GIẢI PHÁP AI",
        en: "PRODUCTS & AI SOLUTIONS",
        ko: "제품 & AI 솔루션",
      },
      // `\n` breaks the line (lib/content/markup.ts); the catalogue head
      // renders line 2 in `text-muted`, same mechanism as
      // `home.pim.title` (see PimSection in home/pim-section.tsx).
      title: {
        vi: "Từ con chip AI\nđến giải pháp doanh nghiệp",
        en: "From AI chips\nto enterprise solutions",
        ko: "AI 칩에서\n기업용 솔루션까지",
      },
      // Two paragraphs (`\n` = new paragraph). `**x**` = bright bold, `*x*` =
      // accent bold (lib/content/markup.ts) — same phrases marked in every
      // locale, no new claim added (brief P1 § "Content changes").
      lead: {
        vi: "Tại Pebble Vina, chúng tôi tin rằng AI không chỉ là xu hướng mà là **công cụ để tối ưu hóa kinh doanh**.\nChúng tôi cung cấp các giải pháp toàn diện *chip bán dẫn tích hợp AI* và *các giải pháp phần mềm* nhằm đưa năng lực xử lý AI **đến gần nơi dữ liệu được tạo ra và sử dụng**.",
        en: "At Pebble Vina, we believe AI is not just a trend but **a tool to optimise business**.\nWe deliver end-to-end solutions in *AI-integrated semiconductors* and *software solutions*, bringing AI processing power **close to where data is created and used**.",
        ko: "Pebble Vina는 AI를 한때의 흐름이 아니라 **비즈니스를 최적화하는 도구**로 봅니다.\n저희는 *AI를 집적한 반도체*와 *소프트웨어 솔루션*을 아우르는 통합 솔루션으로, 데이터가 만들어지고 쓰이는 자리 가까이에 **AI 처리 능력**을 가져다 놓습니다.",
      },
      // No longer rendered — `Catalogue` drops the row that showed it (brief
      // P1 § "Content changes"; it also overlapped at 390px). Kept in the
      // schema/CMS so the field isn't lost if the row comes back.
      hint: {
        vi: "Bấm vào sản phẩm để xem chi tiết bên dưới",
        en: "Tap a product to see its detail below",
        ko: "제품을 선택하시면 아래에서 상세 내용을 보실 수 있습니다",
      },
    },

    mint: {
      visible: true,
      title: {
        vi: "MINT — AI AN TOÀN TẠI BIÊN ĐÃ ĐƯỢC CHỨNG MINH",
        en: "MINT — THE PROVEN EDGE SAFETY AI",
        ko: "MINT — 검증된 엣지 안전 AI",
      },
      lead: {
        // Figures: 30 GOPS / 17,6 TOPS/W are `product.mint.specs` (dictionary.ts); 05/2023
        // is `product.mint.meta`; 600.000 chips and the 92% pass rate come from the
        // owner's product brief (2026-09-28). Best-for line: safety monitoring, electrical
        // equipment, sensors.
        vi: "MINT là giải pháp AI tiên phong đã được chứng minh qua sản xuất hàng loạt từ 05/2023. Là chip Analog CIM chuyên dụng cho các thiết bị cần giám sát liên tục với mức tiêu thụ điện cực thấp, MINT đạt 30 GOPS ở hiệu suất 17,6 TOPS/W. Hơn 600.000 chip đã được sản xuất với tỷ lệ đạt chuẩn 92%, mang lại độ tin cậy cao cho các ứng dụng an toàn điện như AFCI. MINT dành cho thiết bị giám sát an toàn, thiết bị điện và cảm biến cần AI chạy trực tiếp tại biên với độ ổn định cao.",
        en: "MINT is the proven edge safety AI — an Analog CIM chip in mass production since 05/2023. Built for devices that need continuous monitoring at ultra-low power, it delivers 30 GOPS at 17.6 TOPS/W. With more than 600,000 chips produced at a 92% pass rate, MINT brings dependable reliability to electrical-safety applications such as AFCI. It is made for safety-monitoring devices, electrical equipment and sensors that need AI running right at the edge with high stability.",
        ko: "MINT는 2023년 5월부터 대량 생산으로 검증된 엣지 안전 AI입니다. 초저전력으로 상시 모니터링이 필요한 기기를 위한 전용 아날로그 CIM 칩으로, 17.6 TOPS/W 효율로 30 GOPS를 냅니다. 60만 개 이상을 92%의 합격률로 생산해 AFCI 같은 전기 안전 응용에 높은 신뢰성을 제공합니다. 안전 모니터링 기기, 전기 설비, 그리고 엣지에서 AI를 안정적으로 구동해야 하는 센서에 적합합니다.",
      },
      image: "/images/mint-chrome-v4.png",
    },

    papaya: {
      visible: true,
      title: {
        vi: "PAPAYA & PAPAYA FLEX — ANALOG CIM CHO THỊ GIÁC VÀ PHYSICAL AI TẠI BIÊN",
        en: "PAPAYA & PAPAYA FLEX — ANALOG CIM FOR EDGE VISION AND PHYSICAL AI",
        ko: "PAPAYA & PAPAYA FLEX — 엣지 비전과 피지컬 AI를 위한 아날로그 CIM",
      },
      lead: {
        // Figures: ~50 mW, 2 TOPS, ~200 mW are `product.papaya.specs` /
        // `flexAbsoluteSpecs` (dictionary.ts); 32M synapses and the 2027 H1 target come
        // from the owner's product brief (2026-09-28). FLEX is not shipping, so its date
        // sits in the sentence (CLAUDE.md § 2).
        vi: "PAPAYA là động cơ thị giác đã được kiểm chứng silicon: chip Analog CIM thế hệ mới cho các tác vụ thị giác máy tính. Chỉ khoảng 50 mW, PAPAYA đưa AI xử lý hình ảnh ngay tại thiết bị đầu cuối mà không cần kết nối cloud — lý tưởng cho camera AI, thiết bị giám sát hình ảnh và Edge Vision công nghiệp. PAPAYA FLEX, đang hoàn thiện sản phẩm với mục tiêu 2027 H1, nâng lên 32M synapse và 2 TOPS trong khung điện năng thấp ~200 mW, dành cho robot, cảm biến vật lý phức tạp và Physical AI cần xử lý dữ liệu đa kênh.",
        en: "PAPAYA is the verified vision engine: a next-generation Analog CIM chip, silicon-verified for computer-vision workloads. At around 50 mW, it runs image processing right on the end device with no cloud connection — ideal for AI cameras, video-monitoring equipment and industrial edge vision. PAPAYA FLEX, now being productized with a target of 2027 H1, steps up to 32M synapses and 2 TOPS within a low ~200 mW envelope, for robots, complex physical sensors and physical AI that must process multi-channel data.",
        ko: "PAPAYA는 실리콘 검증을 마친 비전 엔진으로, 컴퓨터 비전 작업을 위한 차세대 아날로그 CIM 칩입니다. 약 50 mW로 클라우드 연결 없이 단말 기기에서 바로 영상을 처리해 AI 카메라, 영상 모니터링 장비, 산업용 엣지 비전에 적합합니다. 제품화를 진행 중인 PAPAYA FLEX(2027년 상반기 목표)는 약 200 mW의 저전력 범위에서 3,200만 시냅스와 2 TOPS를 제공하며, 다채널 데이터를 처리해야 하는 로봇, 복합 물리 센서, 피지컬 AI를 겨냥합니다.",
      },
      image: "/images/papaya-chrome-v4.png",
    },

    espresso: {
      visible: true,
      title: {
        vi: "ESPRESSO — BỘ TĂNG TỐC AI HIỆU NĂNG CAO CHO LLM CỤC BỘ",
        en: "ESPRESSO — THE LOCAL LLM & HIGH-PERFORMANCE AI ACCELERATOR",
        ko: "ESPRESSO — 로컬 LLM을 위한 고성능 AI 가속기",
      },
      lead: {
        // Figures: 140 TOPS dense INT8 is `product.espresso.specs`; 90 TFLOPS (bf16) and
        // "MPW silicon validated" come from the owner's product brief (2026-09-28).
        // Roadmap part, so Q3/2026 sits in the copy (CLAUDE.md § 2).
        vi: "ESPRESSO là bộ tăng tốc AI hiệu năng cao cho kỷ nguyên AI tạo sinh: chip Digital CIM (SRAM) đã được đo lường thực tế trên silicon MPW. Mỗi chip đạt 140 TOPS (dense INT8) và 90 TFLOPS (bf16), đủ sức chạy mô hình ngôn ngữ lớn (LLM) và Vision AI quy mô lớn ngay tại chỗ — AI cục bộ, riêng tư. ESPRESSO hướng tới Private AI Server, suy luận LLM cục bộ và trung tâm dữ liệu AI tại biên, dự kiến Q3/2026.",
        en: "ESPRESSO is the local-LLM and high-performance AI accelerator for the generative-AI era: a Digital CIM (SRAM) chip whose performance has been measured on MPW silicon. Each chip delivers 140 TOPS (dense INT8) and 90 TFLOPS (bf16), enough to run large language models (LLMs) and large-scale vision AI right where the data lives — local, private AI. It targets private AI servers, local LLM inference and edge AI data centres, and is expected in Q3/2026.",
        ko: "ESPRESSO는 생성형 AI 시대를 위한 로컬 LLM·고성능 AI 가속기로, MPW 실리콘에서 성능을 실측한 Digital CIM(SRAM) 칩입니다. 칩 하나당 140 TOPS(dense INT8)와 90 TFLOPS(bf16)를 내어 대규모 언어 모델(LLM)과 대규모 비전 AI를 현장에서 직접 구동하는 로컬·프라이빗 AI를 가능하게 합니다. 프라이빗 AI 서버, 로컬 LLM 추론, 엣지 AI 데이터센터를 목표로 하며 2026년 3분기 출시가 예정되어 있습니다.",
      },
      image: "/images/espresso-chrome-v4.png",
    },

    eseries: {
      visible: true,
      title: {
        vi: "E-SERIES — NỀN TẢNG TĂNG TỐC AI CHO SERVER VÀ HỆ THỐNG ĐA CARD",
        en: "E-SERIES — THE AI ACCELERATION PLATFORM FOR SERVERS AND MULTI-CARD SYSTEMS",
        ko: "E-SERIES — 서버와 멀티카드 시스템을 위한 AI 가속 플랫폼",
      },
      lead: {
        vi: "E-Series là dòng card tăng tốc AI của Pebble Vina, được phát triển cho các hệ thống máy chủ cần mở rộng năng lực tính toán cho AI training và inference. E-Series hỗ trợ các định dạng tính toán FP32, INT4 và INT8, cho phép lựa chọn cấu hình phù hợp với từng workload, mô hình AI và yêu cầu triển khai.",
        en: "E-Series is Pebble Vina's line of AI accelerator cards, developed for server systems that need to scale compute capacity for AI training and inference. E-Series supports FP32, INT8 and INT4 compute formats, so a configuration can be matched to each workload, AI model and deployment requirement.",
        ko: "E-Series는 AI 학습과 추론을 위해 연산 능력을 확장해야 하는 서버 시스템을 위해 개발한 Pebble Vina의 AI 가속 카드 라인입니다. FP32, INT8, INT4 연산 형식을 지원해 워크로드와 AI 모델, 도입 요건에 맞는 구성을 선택하실 수 있습니다.",
      },
      image: "/images/e20-chrome-v4.png",
    },

    software: {
      visible: true,
      // DARK-BUILD-brief PART B (2026-09-24): the standalone `/products/software`
      // page's own hero copy, replacing the hub section's title/lead — the
      // ORIGINAL sentence below now lives as `product.software.hubBody`
      // (dictionary.ts), still printed verbatim on the same page, just no
      // longer as the hero lead (CLAUDE.md § 3: reuse, don't discard).
      title: {
        vi: "PHẦN MỀM DOANH NGHIỆP\nCÓ AI HỖ TRỢ RA QUYẾT ĐỊNH",
        en: "ENTERPRISE SOFTWARE\nWITH AI-ASSISTED DECISIONS",
        ko: "AI 의사결정 지원\n기업용 소프트웨어",
      },
      lead: {
        vi: "Bộ phần mềm dành cho doanh nghiệp, có *AI hỗ trợ* ở từng khâu vận hành. Mỗi sản phẩm **kế thừa dữ liệu** của sản phẩm trước, để việc ra quyết định diễn ra **xuyên suốt, nhanh và chính xác**.",
        en: "A software suite for enterprises, with *AI support* at every step of operations. Each product **inherits the data** of the one before it, so decisions happen **consistently, quickly and accurately**.",
        ko: "기업을 위한 소프트웨어 모음으로, 운영의 각 단계마다 *AI 지원*을 제공합니다. 각 제품은 이전 제품의 **데이터를 이어받아**, 의사결정이 **일관되고 빠르며 정확하게** 이루어지도록 합니다.",
      },
      progress: 82,
      image: "/images/enterprise-ai-software-v2.png",
    },

    training: {
      visible: true,
      title: {
        vi: "ĐÀO TẠO AI DOANH NGHIỆP THEO NHU CẦU THỰC TẾ",
        en: "ENTERPRISE AI TRAINING BUILT ON REAL NEEDS",
        ko: "실제 필요에서 출발하는 기업 AI 교육",
      },
      lead: {
        vi: "Pebble Vina định hướng xây dựng chương trình đào tạo AI dành cho doanh nghiệp dựa trên bài toán, dữ liệu và năng lực thực tế của từng tổ chức.",
        en: "Pebble Vina is designing enterprise AI training programmes around each organisation's problems, data and actual capability.",
        ko: "Pebble Vina는 각 조직이 실제로 마주한 과제와 보유한 데이터, 현재의 역량을 기준으로 기업 AI 교육 프로그램을 설계하고자 합니다.",
      },
      image: "/images/enterprise-ai-training-v2.png",
    },

    contact: {
      visible: true,
      title: {
        vi: "CHO CHÚNG TÔI BIẾT WORKLOAD — CHÚNG TÔI ĐỀ XUẤT CẤU HÌNH",
        en: "TELL US THE WORKLOAD — WE'LL PROPOSE THE CONFIGURATION",
        ko: "워크로드를 알려 주시면, 구성을 제안해 드립니다",
      },
      lead: {
        vi: "Gửi yêu cầu của bạn, đội ngũ kỹ thuật sẽ phản hồi với cấu hình chip hoặc card phù hợp.",
        en: "Send us your requirement and our engineering team will get back with the suitable chip or card configuration.",
        ko: "요구사항을 보내 주시면 기술팀이 적합한 칩 또는 카드 구성을 제안해 드립니다.",
      },
      cta: {
        vi: "ĐĂNG KÝ TƯ VẤN NGAY →",
        en: "BOOK A CONSULTATION →",
        ko: "상담 신청하기 →",
      },
    },
  },
};

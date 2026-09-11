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
        vi: "KIẾN TẠO CÔNG NGHỆ BÁN DẪN CHO KỶ NGUYÊN AI",
        en: "ENGINEERING SEMICONDUCTORS FOR THE AI ERA",
        ko: "AI 시대를 여는 반도체 기술",
      },
      lead: {
        vi: "Pebble Vina tập trung nghiên cứu và phát triển các công nghệ bán dẫn AI, từ thiết kế kiến trúc chip, công nghệ xử lý trong bộ nhớ (PIM) đến phát triển phần mềm và các giải pháp AI ứng dụng.",
        en: "Pebble Vina researches and develops AI semiconductor technologies — from chip architecture and processing-in-memory (PIM) to software and applied AI solutions.",
        ko: "Pebble Vina는 칩 아키텍처 설계와 메모리 내 연산(PIM) 기술부터 소프트웨어 개발과 응용 AI 솔루션에 이르기까지, AI 반도체 기술을 연구하고 개발합니다.",
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
        vi: "NGHIÊN CỨU · THỰC NGHIỆM · PHÁT TRIỂN · ĐÀO TẠO · PROCESSING-IN-MEMORY · EDGE AI · ON-DEVICE AI · AI INFERENCE",
        en: "RESEARCH · EXPERIMENTATION · DEVELOPMENT · TRAINING · PROCESSING-IN-MEMORY · EDGE AI · ON-DEVICE AI · AI INFERENCE",
        ko: "연구 · 실증 · 개발 · 교육 · PROCESSING-IN-MEMORY · EDGE AI · ON-DEVICE AI · AI INFERENCE",
      },
    },

    pim: {
      visible: true,
      eyebrow: {
        vi: "01 — PROCESSING IN MEMORY",
        en: "01 — PROCESSING IN MEMORY",
        ko: "01 — PROCESSING IN MEMORY",
      },
      title: {
        vi: "CÔNG NGHỆ PIM NỀN TẢNG TÍNH TOÁN CHO AI",
        en: "THE COMPUTING FOUNDATION FOR AI",
        ko: "AI 연산의 토대가 되는 PIM 기술",
      },
      lead: {
        vi: "PIM (Processing-in-Memory) là công nghệ tính toán đưa hoạt động xử lý đến gần nơi dữ liệu được lưu trữ, qua đó giảm lượng dữ liệu phải di chuyển giữa bộ nhớ và bộ xử lý. Pebble Vina phát triển hai hướng công nghệ PIM gồm Analog và Digital nhằm đáp ứng các nhu cầu tính toán AI khác nhau.",
        en: "PIM (Processing-in-Memory) brings computation close to where data is stored, cutting the volume of data that has to move between memory and processor. Pebble Vina develops two PIM directions — Analog and Digital — to serve different AI computing needs.",
        ko: "PIM(Processing-in-Memory)은 연산을 데이터가 저장된 자리 가까이로 옮겨, 메모리와 프로세서 사이를 오가야 하는 데이터의 양을 줄이는 기술입니다. Pebble Vina는 서로 다른 AI 연산 수요에 대응하기 위해 아날로그와 디지털 두 갈래의 PIM 기술을 개발하고 있습니다.",
      },
      imageA: "/images/mint-analog-pim-v2.png",
      imageB: "/images/espresso-digital-pim-v2.png",
      statement: {
        vi: "NÂNG CAO HIỆU SUẤT TÍNH TOÁN CHO AI.",
        en: "RAISING COMPUTE EFFICIENCY FOR AI.",
        ko: "AI 연산 효율을 끌어올립니다.",
      },
      imageC: "/images/pim-memory-compute-v2.png",
    },

    why: {
      visible: true,
      title: {
        vi: "Tại sao công nghệ PIM quan trọng đối với AI?",
        en: "WHY DOES PIM MATTER FOR AI?",
        ko: "PIM 기술이 AI에 중요한 이유",
      },
      lead: {
        vi: "Khi các mô hình AI ngày càng lớn, nhu cầu xử lý và truyền dữ liệu cũng tăng theo. Việc liên tục di chuyển dữ liệu giữa bộ nhớ (DRAM) và bộ xử lý (NPU) có thể ảnh hưởng đến hiệu quả của quá trình tính toán. Công nghệ PIM tiếp cận bài toán này bằng cách đưa hoạt động tính toán đến gần nơi dữ liệu được lưu trữ, từ đó giảm nhu cầu di chuyển dữ liệu đối với các workload AI phù hợp.",
        en: "As AI models grow, so does the demand for processing and moving data. Continuously shuttling data between memory (DRAM) and the processor (NPU) can hold back computational efficiency. PIM approaches this by bringing computation close to where data is stored, reducing data movement for suitable AI workloads.",
        ko: "AI 모델이 커질수록 데이터를 처리하고 옮기는 부담도 함께 커집니다. 메모리(DRAM)와 프로세서(NPU) 사이에서 데이터가 끊임없이 오가면 연산 효율이 떨어질 수 있습니다. PIM 기술은 연산을 데이터가 저장된 자리 가까이로 옮기는 방식으로 이 문제에 접근해, 적합한 AI 워크로드에서 데이터 이동 자체를 줄입니다.",
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
        vi: "NĂNG LỰC CỐT LÕI CỦA CÔNG NGHỆ CHIP",
        en: "CORE CAPABILITIES OF THE CHIP TECHNOLOGY",
        ko: "칩 기술의 핵심 역량",
      },
      lead: {
        vi: "Pebble Vina phát triển kiến trúc công nghệ chip bán dẫn tích hợp AI ngoại biên với trọng tâm tối ưu luồng dữ liệu, năng lực xử lý song song và hiệu quả tính toán, hướng tới khả năng xử lý ổn định và hiệu quả năng lượng.",
        en: "Pebble Vina develops edge-AI semiconductor architecture centred on data-flow optimisation, parallel processing capability and computational efficiency — built for the rising demands of AI workloads while targeting stable processing and energy efficiency.",
        ko: "Pebble Vina는 데이터 흐름 최적화와 병렬 처리 능력, 연산 효율을 중심에 두고 엣지 AI 반도체 아키텍처를 개발하며, 안정적인 처리 성능과 에너지 효율을 함께 지향합니다.",
      },
      stat: "400K",
    },

    solutions: {
      visible: true,
      eyebrow: {
        vi: "03 — PRODUCTS & SOLUTIONS",
        en: "03 — PRODUCTS & SOLUTIONS",
        ko: "03 — PRODUCTS & SOLUTIONS",
      },
      title: {
        vi: "GIẢI PHÁP CHIP BÁN DẪN & PHẦN MỀM AI NGOẠI BIÊN",
        en: "EDGE-AI SEMICONDUCTORS & AI SOFTWARE",
        ko: "엣지 AI 반도체와 AI 소프트웨어 솔루션",
      },
      lead: {
        vi: "Pebble Vina kết hợp công nghệ phần cứng bán dẫn với phần mềm AI để phát triển các giải pháp tính toán phù hợp với nhu cầu doanh nghiệp, từ chip bán dẫn tích hợp AI ngoại biên, nền tảng PIM đến huấn luyện mô hình ngôn ngữ lớn và phần mềm AI tùy chỉnh.",
        en: "Pebble Vina pairs semiconductor hardware with AI software to build computing solutions that fit enterprise needs — from edge-AI chips and the PIM platform to large language model training and custom AI software.",
        ko: "Pebble Vina는 반도체 하드웨어와 AI 소프트웨어를 결합해 기업의 요구에 맞는 연산 솔루션을 만듭니다. 엣지 AI 칩과 PIM 플랫폼에서 대규모 언어 모델 학습과 맞춤형 AI 소프트웨어까지 아우릅니다.",
      },
      count: 4,
    },

    news: {
      visible: true,
      eyebrow: {
        vi: "04 — COLLABORATION FOR THE FUTURE",
        en: "04 — COLLABORATION FOR THE FUTURE",
        ko: "04 — COLLABORATION FOR THE FUTURE",
      },
      title: { vi: "TIN TỨC & HỢP TÁC", en: "NEWS & PARTNERSHIPS", ko: "뉴스 & 협력" },
      lead: {
        vi: "Pebble Vina luôn chủ động mở rộng hợp tác chiến lược với các đối tác, khách hàng và tổ chức hàng đầu để thúc đẩy đổi mới công nghệ và tạo ra giá trị bền vững.",
        en: "Pebble Vina actively expands strategic collaboration with leading partners, customers and institutions to drive technological innovation and create lasting value.",
        ko: "Pebble Vina는 기술 혁신을 앞당기고 지속 가능한 가치를 만들기 위해, 선도적인 파트너·고객·기관과의 전략적 협력을 꾸준히 넓혀 갑니다.",
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
        vi: "Cùng nhau kiến tạo giải pháp chip bán dẫn tích hợp AI ngoại biên đột phá",
        en: "LET'S BUILD BREAKTHROUGH EDGE-AI SEMICONDUCTOR SOLUTIONS TOGETHER",
        ko: "혁신적인 엣지 AI 반도체 솔루션, 함께 만들어 가십시오",
      },
      lead: {
        vi: "Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn để biến ý tưởng thành giá trị thực tiễn, dẫn dắt tương lai công nghệ.",
        en: "We are always ready to listen and work alongside you to turn ideas into practical value and shape the future of technology.",
        ko: "아이디어를 실질적인 가치로 바꾸고 기술의 미래를 함께 열어 갈 수 있도록, 언제든 귀사의 이야기를 듣고 동행하겠습니다.",
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
        vi: "DANH MỤC CHIP AI VÀ GIẢI PHÁP AI",
        en: "AI CHIP & AI SOLUTION CATALOGUE",
        ko: "AI 칩 & AI 솔루션 카탈로그",
      },
      title: {
        vi: "Danh mục sản phẩm công nghệ AI của Pebble Vina",
        en: "Pebble Vina's AI technology product catalogue",
        ko: "Pebble Vina의 AI 기술 제품 카탈로그",
      },
      lead: {
        vi: "Tại Pebble Vina, chúng tôi tin rằng AI không chỉ là xu hướng mà là công cụ để tối ưu hóa kinh doanh. Chúng tôi cung cấp các giải pháp toàn diện chip bán dẫn tích hợp AI và các giải pháp phần mềm nhằm đưa năng lực xử lý AI đến gần nơi dữ liệu được tạo ra và sử dụng.",
        en: "At Pebble Vina we believe AI is not just a trend but a tool for optimising business. We deliver end-to-end solutions — AI-integrated semiconductors and software — bringing AI processing close to where data is created and used.",
        ko: "Pebble Vina는 AI를 한때의 흐름이 아니라 비즈니스를 최적화하는 도구로 봅니다. AI를 집적한 반도체와 소프트웨어를 아우르는 통합 솔루션으로, 데이터가 만들어지고 쓰이는 자리 가까이에 AI 처리 능력을 가져다 놓습니다.",
      },
      hint: {
        vi: "Bấm vào sản phẩm để xem chi tiết bên dưới",
        en: "Tap a product to see its detail below",
        ko: "제품을 선택하시면 아래에서 상세 내용을 보실 수 있습니다",
      },
    },

    mint: {
      visible: true,
      title: {
        vi: "MINT — CHIP ANALOG PIM CHO EDGE AI TẠI THIẾT BỊ",
        en: "MINT — ANALOG PIM CHIP FOR ON-DEVICE EDGE AI",
        ko: "MINT — 온디바이스 엣지 AI를 위한 아날로그 PIM 칩",
      },
      lead: {
        vi: "MINT là chip AI do Pebble Vina phát triển cho các thiết bị cần xử lý dữ liệu trực tiếp tại biên. Sử dụng công nghệ Analog PIM, MINT triệt tiêu độ trễ di chuyển dữ liệu giữa bộ nhớ và bộ xử lý, giúp gia tăng độ chính xác của dữ liệu phân tích và tối ưu khả năng dự báo cho các mô hình AI. Giải pháp mang lại tốc độ phản hồi tức thì với mức tiêu thụ điện năng cực kỳ thấp.",
        en: "MINT is an AI chip developed by Pebble Vina for devices that must process data directly at the edge. Using Analog PIM, MINT removes the latency of moving data between memory and processor, improving the accuracy of analysed data and the predictive capability of AI models — with instant response at extremely low power draw.",
        ko: "MINT는 엣지에서 데이터를 직접 처리해야 하는 기기를 위해 Pebble Vina가 개발한 AI 칩입니다. 아날로그 PIM 기술로 메모리와 프로세서 사이의 데이터 이동 지연을 없애 분석 데이터의 정확도를 높이고 AI 모델의 예측 성능을 최적화합니다. 극히 낮은 소비 전력으로 즉각적인 응답 속도를 제공합니다.",
      },
      image: "/images/mint-chrome-v4.png",
    },

    papaya: {
      visible: true,
      title: {
        vi: "PAPAYA & PAPAYA FLEX — NỀN TẢNG CHIP ANALOG CHO THỊ GIÁC TẠI THIẾT BỊ",
        en: "PAPAYA & PAPAYA FLEX — THE ANALOG VISION CHIP PLATFORM FOR DEVICES",
        ko: "PAPAYA & PAPAYA FLEX — 온디바이스 비전을 위한 아날로그 칩 플랫폼",
      },
      lead: {
        vi: "PAPAYA và PAPAYA FLEX là các dòng chip chuyên biệt cho xử lý hình ảnh và thị giác máy trực tiếp tại thiết bị. Nhờ lợi thế của công nghệ Analog, nền tảng này mang lại kết quả xử lý dữ liệu với độ chính xác cao, nâng cao đáng kể khả năng dự báo của các mô hình AI theo thời gian thực.",
        en: "PAPAYA and PAPAYA FLEX are chip lines dedicated to image processing and machine vision directly on the device. Thanks to the advantages of Analog technology, the platform delivers high-accuracy data processing and markedly improves the real-time predictive capability of AI models.",
        ko: "PAPAYA와 PAPAYA FLEX는 기기에서 곧바로 영상 처리와 머신 비전을 수행하도록 만든 전용 칩 라인입니다. 아날로그 기술의 강점을 살려 높은 정확도의 데이터 처리 결과를 제공하며, AI 모델의 실시간 예측 성능을 크게 끌어올립니다.",
      },
      image: "/images/papaya-chrome-v4.png",
    },

    espresso: {
      visible: true,
      title: {
        vi: "ESPRESSO — CHIP DIGITAL-PIM CHO AI COMPUTER",
        en: "ESPRESSO — DIGITAL-PIM CHIP FOR THE AI COMPUTER",
        ko: "ESPRESSO — AI 컴퓨터를 위한 Digital-PIM 칩",
      },
      lead: {
        vi: "ESPRESSO là thế hệ chip Digital-PIM tiếp theo của Pebble Vina, được phát triển cho các workload AI có yêu cầu tính toán cao hơn Edge AI, bao gồm AI PC, Robotics và hệ thống Data Center.",
        en: "ESPRESSO is Pebble Vina's next Digital-PIM generation, developed for AI workloads whose compute demands exceed Edge AI — including AI PC, Robotics and Data Center systems.",
        ko: "ESPRESSO는 Pebble Vina의 차세대 Digital-PIM 칩으로, Edge AI를 넘어서는 연산이 필요한 AI 워크로드를 위해 개발하고 있습니다. AI PC와 로보틱스, 데이터센터 시스템이 그 대상입니다.",
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
      title: {
        vi: "NỀN TẢNG PHẦN MỀM TÍCH HỢP DỮ LIỆU VÀ AI CHO DOANH NGHIỆP",
        en: "A SOFTWARE PLATFORM INTEGRATING ENTERPRISE DATA AND AI",
        ko: "기업의 데이터와 AI를 통합하는 소프트웨어 플랫폼",
      },
      lead: {
        vi: "Pebble Vina phát triển nền tảng phần mềm giúp kết nối dữ liệu từ CRM, ERP, HRM và DMS trên một môi trường thống nhất, tạo nền tảng cho việc phân tích dữ liệu và ứng dụng AI trong hoạt động doanh nghiệp.",
        en: "Pebble Vina is building a software platform that connects data from CRM, ERP, HRM and DMS in one unified environment — the foundation for data analysis and applied AI across enterprise operations.",
        ko: "Pebble Vina는 CRM, ERP, HRM, DMS의 데이터를 하나의 통합 환경에서 연결하는 소프트웨어 플랫폼을 개발하고 있습니다. 이는 기업 운영 전반의 데이터 분석과 AI 활용을 위한 토대가 됩니다.",
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

import type { SiteContent } from "@/lib/content/schema";

/**
 * Seed for the CMS document.
 *
 * Vietnamese comes from the shipped design (`Pebble Vina Home.dc.html` /
 * `Pebble Vina Product.dc.html`, which carry the full paragraphs — the `DEFAULTS`
 * object in the Admin mock holds abbreviated versions of the same fields).
 * English comes from the `data-en` attribute sitting on each Vietnamese node,
 * so the pairs are the designer's, not a re-translation.
 *
 * Nothing here may be invented: these are product claims about real silicon.
 */
export const SEED_CONTENT: SiteContent = {
  home: {
    hero: {
      visible: true,
      eyebrow: {
        vi: "CHIP BÁN DẪN TÍCH HỢP AI NGOẠI BIÊN THẾ HỆ MỚI",
        en: "NEXT-GENERATION EDGE AI SEMICONDUCTORS",
      },
      title: {
        vi: "KIẾN TẠO CÔNG NGHỆ BÁN DẪN CHO KỶ NGUYÊN AI",
        en: "ENGINEERING SEMICONDUCTORS FOR THE AI ERA",
      },
      lead: {
        vi: "Pebble Vina tập trung nghiên cứu và phát triển các công nghệ bán dẫn AI, từ thiết kế kiến trúc chip, công nghệ xử lý trong bộ nhớ (PIM) đến phát triển phần mềm và các giải pháp AI ứng dụng.",
        en: "Pebble Vina researches and develops AI semiconductor technologies — from chip architecture and processing-in-memory (PIM) to software and applied AI solutions.",
      },
      sub: {
        vi: "Với định hướng kết hợp giữa phần cứng và phần mềm, Pebble Vina phát triển các nền tảng tính toán phục vụ AI, Edge AI, On-device AI và các mô hình AI thế hệ mới.",
        en: "Hardware and software developed together: computing platforms for AI, Edge AI, on-device AI and the next generation of AI models.",
      },
      cta: { vi: "TÌM HIỂU THÊM →", en: "EXPLORE THE TECHNOLOGY →" },
      image: "/images/ai-semiconductor-hero-v2.png",
    },

    marquee: {
      visible: true,
      items: {
        vi: "NGHIÊN CỨU · THỰC NGHIỆM · PHÁT TRIỂN · ĐÀO TẠO · PROCESSING-IN-MEMORY · EDGE AI · ON-DEVICE AI · AI INFERENCE",
        en: "RESEARCH · EXPERIMENTATION · DEVELOPMENT · TRAINING · PROCESSING-IN-MEMORY · EDGE AI · ON-DEVICE AI · AI INFERENCE",
      },
    },

    pim: {
      visible: true,
      eyebrow: { vi: "01 — PROCESSING IN MEMORY", en: "01 — PROCESSING IN MEMORY" },
      title: {
        vi: "CÔNG NGHỆ PIM NỀN TẢNG TÍNH TOÁN CHO AI",
        en: "THE COMPUTING FOUNDATION FOR AI",
      },
      lead: {
        vi: "PIM (Processing-in-Memory) là công nghệ tính toán đưa hoạt động xử lý đến gần nơi dữ liệu được lưu trữ, qua đó giảm lượng dữ liệu phải di chuyển giữa bộ nhớ và bộ xử lý. Pebble Vina phát triển hai hướng công nghệ PIM gồm Analog và Digital nhằm đáp ứng các nhu cầu tính toán AI khác nhau.",
        en: "PIM (Processing-in-Memory) brings computation close to where data is stored, cutting the volume of data that has to move between memory and processor. Pebble Vina develops two PIM directions — Analog and Digital — to serve different AI computing needs.",
      },
      imageA: "/images/analog-pim-chip-v3.png",
      imageB: "/images/digital-pim-chip-v3.png",
      statement: {
        vi: "NÂNG CAO HIỆU SUẤT TÍNH TOÁN CHO AI.",
        en: "RAISING COMPUTE EFFICIENCY FOR AI.",
      },
      imageC: "/images/pim-memory-compute-v2.png",
    },

    why: {
      visible: true,
      title: {
        vi: "Tại sao công nghệ PIM quan trọng đối với AI?",
        en: "WHY DOES PIM MATTER FOR AI?",
      },
      lead: {
        vi: "Khi các mô hình AI ngày càng lớn, nhu cầu xử lý và truyền dữ liệu cũng tăng theo. Việc liên tục di chuyển dữ liệu giữa bộ nhớ (DRAM) và bộ xử lý (NPU) có thể ảnh hưởng đến hiệu quả của quá trình tính toán. Công nghệ PIM tiếp cận bài toán này bằng cách đưa hoạt động tính toán đến gần nơi dữ liệu được lưu trữ, từ đó giảm nhu cầu di chuyển dữ liệu đối với các workload AI phù hợp.",
        en: "As AI models grow, so does the demand for processing and moving data. Continuously shuttling data between memory (DRAM) and the processor (NPU) can hold back computational efficiency. PIM approaches this by bringing computation close to where data is stored, reducing data movement for suitable AI workloads.",
      },
      image: "/images/pim-ai-data-movement-v2.png",
    },

    core: {
      visible: true,
      eyebrow: { vi: "02 — CORE CAPABILITY", en: "02 — CORE CAPABILITY" },
      title: {
        vi: "NĂNG LỰC CỐT LÕI CỦA CÔNG NGHỆ CHIP",
        en: "CORE CAPABILITIES OF THE CHIP TECHNOLOGY",
      },
      lead: {
        vi: "Pebble Vina phát triển kiến trúc công nghệ chip bán dẫn tích hợp AI ngoại biên với trọng tâm tối ưu luồng dữ liệu, năng lực xử lý song song và hiệu quả tính toán, hướng tới khả năng xử lý ổn định và hiệu quả năng lượng.",
        en: "Pebble Vina develops edge-AI semiconductor architecture centred on data-flow optimisation, parallel processing capability and computational efficiency — built for the rising demands of AI workloads while targeting stable processing and energy efficiency.",
      },
      stat: "400K",
    },

    solutions: {
      visible: true,
      eyebrow: { vi: "03 — PRODUCTS & SOLUTIONS", en: "03 — PRODUCTS & SOLUTIONS" },
      title: {
        vi: "GIẢI PHÁP CHIP BÁN DẪN & PHẦN MỀM AI NGOẠI BIÊN",
        en: "EDGE-AI SEMICONDUCTORS & AI SOFTWARE",
      },
      lead: {
        vi: "Pebble Vina kết hợp công nghệ phần cứng bán dẫn với phần mềm AI để phát triển các giải pháp tính toán phù hợp với nhu cầu doanh nghiệp, từ chip bán dẫn tích hợp AI ngoại biên, nền tảng PIM đến huấn luyện mô hình ngôn ngữ lớn và phần mềm AI tùy chỉnh.",
        en: "Pebble Vina pairs semiconductor hardware with AI software to build computing solutions that fit enterprise needs — from edge-AI chips and the PIM platform to large language model training and custom AI software.",
      },
      count: 4,
    },

    news: {
      visible: true,
      eyebrow: {
        vi: "04 — COLLABORATION FOR THE FUTURE",
        en: "04 — COLLABORATION FOR THE FUTURE",
      },
      title: { vi: "TIN TỨC & HỢP TÁC", en: "NEWS & PARTNERSHIPS" },
      lead: {
        vi: "Pebble Vina luôn chủ động mở rộng hợp tác chiến lược với các đối tác, khách hàng và tổ chức hàng đầu để thúc đẩy đổi mới công nghệ và tạo ra giá trị bền vững.",
        en: "Pebble Vina actively expands strategic collaboration with leading partners, customers and institutions to drive technological innovation and create lasting value.",
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
      },
      lead: {
        vi: "Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn để biến ý tưởng thành giá trị thực tiễn, dẫn dắt tương lai công nghệ.",
        en: "We are always ready to listen and work alongside you to turn ideas into practical value and shape the future of technology.",
      },
      cta: { vi: "GỬI THÔNG TIN", en: "SEND" },
      note: {
        vi: "Thông tin của bạn được bảo mật và chỉ sử dụng để hỗ trợ theo yêu cầu.",
        en: "Your information is kept confidential and used only to support your request.",
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
      },
      title: {
        vi: "Danh mục sản phẩm công nghệ AI của Pebble Vina",
        en: "Pebble Vina's AI technology product catalogue",
      },
      lead: {
        vi: "Tại Pebble Vina, chúng tôi tin rằng AI không chỉ là xu hướng mà là công cụ để tối ưu hóa kinh doanh. Chúng tôi cung cấp các giải pháp toàn diện chip bán dẫn tích hợp AI và các giải pháp phần mềm nhằm đưa năng lực xử lý AI đến gần nơi dữ liệu được tạo ra và sử dụng.",
        en: "At Pebble Vina we believe AI is not just a trend but a tool for optimising business. We deliver end-to-end solutions — AI-integrated semiconductors and software — bringing AI processing close to where data is created and used.",
      },
      hint: {
        vi: "Bấm vào sản phẩm để xem chi tiết bên dưới",
        en: "Tap a product to see its detail below",
      },
    },

    mint: {
      visible: true,
      title: {
        vi: "MINT — CHIP ANALOG PIM CHO EDGE AI TẠI THIẾT BỊ",
        en: "MINT — ANALOG PIM CHIP FOR ON-DEVICE EDGE AI",
      },
      lead: {
        vi: "MINT là chip AI do Pebble Vina phát triển cho các thiết bị cần xử lý dữ liệu trực tiếp tại biên. Sử dụng công nghệ Analog PIM, MINT triệt tiêu độ trễ di chuyển dữ liệu giữa bộ nhớ và bộ xử lý, giúp gia tăng độ chính xác của dữ liệu phân tích và tối ưu khả năng dự báo cho các mô hình AI. Giải pháp mang lại tốc độ phản hồi tức thì với mức tiêu thụ điện năng cực kỳ thấp.",
        en: "MINT is an AI chip developed by Pebble Vina for devices that must process data directly at the edge. Using Analog PIM, MINT removes the latency of moving data between memory and processor, improving the accuracy of analysed data and the predictive capability of AI models — with instant response at extremely low power draw.",
      },
      image: "/images/mint-analog-pim-v3.png",
    },

    papaya: {
      visible: true,
      title: {
        vi: "PAPAYA & PAPAYA FLEX — NỀN TẢNG CHIP ANALOG CHO THỊ GIÁC TẠI THIẾT BỊ",
        en: "PAPAYA & PAPAYA FLEX — THE ANALOG VISION CHIP PLATFORM FOR DEVICES",
      },
      lead: {
        vi: "PAPAYA và PAPAYA FLEX là các dòng chip chuyên biệt cho xử lý hình ảnh và thị giác máy trực tiếp tại thiết bị. Nhờ lợi thế của công nghệ Analog, nền tảng này mang lại kết quả xử lý dữ liệu với độ chính xác cao, nâng cao đáng kể khả năng dự báo của các mô hình AI theo thời gian thực.",
        en: "PAPAYA and PAPAYA FLEX are chip lines dedicated to image processing and machine vision directly on the device. Thanks to the advantages of Analog technology, the platform delivers high-accuracy data processing and markedly improves the real-time predictive capability of AI models.",
      },
      image: "/images/papaya-vision-pim-v3.png",
    },

    espresso: {
      visible: true,
      title: {
        vi: "ESPRESSO — CHIP DIGITAL-PIM CHO AI COMPUTER",
        en: "ESPRESSO — DIGITAL-PIM CHIP FOR THE AI COMPUTER",
      },
      lead: {
        vi: "ESPRESSO là thế hệ chip Digital-PIM tiếp theo của Pebble Vina, được phát triển cho các workload AI có yêu cầu tính toán cao hơn Edge AI, bao gồm AI PC, Robotics và hệ thống Data Center.",
        en: "ESPRESSO is Pebble Vina's next Digital-PIM generation, developed for AI workloads whose compute demands exceed Edge AI — including AI PC, Robotics and Data Center systems.",
      },
      image: "/images/espresso-digital-pim-v3.png",
    },

    eseries: {
      visible: true,
      title: {
        vi: "E-SERIES — NỀN TẢNG TĂNG TỐC AI CHO SERVER VÀ HỆ THỐNG ĐA CARD",
        en: "E-SERIES — THE AI ACCELERATION PLATFORM FOR SERVERS AND MULTI-CARD SYSTEMS",
      },
      lead: {
        vi: "E-Series là dòng card tăng tốc AI của Pebble Vina, được phát triển cho các hệ thống máy chủ cần mở rộng năng lực tính toán cho AI training và inference. E-Series hỗ trợ các định dạng tính toán FP32, INT4 và INT8, cho phép lựa chọn cấu hình phù hợp với từng workload, mô hình AI và yêu cầu triển khai.",
        en: "E-Series is Pebble Vina's line of AI accelerator cards, developed for server systems that need to scale compute capacity for AI training and inference. E-Series supports FP32, INT8 and INT4 compute formats, so a configuration can be matched to each workload, AI model and deployment requirement.",
      },
      image: "/images/e-series-ai-accelerators-v3.png",
    },

    software: {
      visible: true,
      title: {
        vi: "NỀN TẢNG PHẦN MỀM TÍCH HỢP DỮ LIỆU VÀ AI CHO DOANH NGHIỆP",
        en: "A SOFTWARE PLATFORM INTEGRATING ENTERPRISE DATA AND AI",
      },
      lead: {
        vi: "Pebble Vina phát triển nền tảng phần mềm giúp kết nối dữ liệu từ CRM, ERP, HRM và DMS trên một môi trường thống nhất, tạo nền tảng cho việc phân tích dữ liệu và ứng dụng AI trong hoạt động doanh nghiệp.",
        en: "Pebble Vina is building a software platform that connects data from CRM, ERP, HRM and DMS in one unified environment — the foundation for data analysis and applied AI across enterprise operations.",
      },
      progress: 82,
      image: "/images/enterprise-ai-software-v2.png",
    },

    training: {
      visible: true,
      title: {
        vi: "ĐÀO TẠO AI DOANH NGHIỆP THEO NHU CẦU THỰC TẾ",
        en: "ENTERPRISE AI TRAINING BUILT ON REAL NEEDS",
      },
      lead: {
        vi: "Pebble Vina định hướng xây dựng chương trình đào tạo AI dành cho doanh nghiệp dựa trên bài toán, dữ liệu và năng lực thực tế của từng tổ chức.",
        en: "Pebble Vina is designing enterprise AI training programmes around each organisation's problems, data and actual capability.",
      },
      image: "/images/enterprise-ai-training-v2.png",
    },

    contact: {
      visible: true,
      title: {
        vi: "CHO CHÚNG TÔI BIẾT WORKLOAD — CHÚNG TÔI ĐỀ XUẤT CẤU HÌNH",
        en: "TELL US THE WORKLOAD — WE'LL PROPOSE THE CONFIGURATION",
      },
      lead: {
        vi: "Gửi yêu cầu của bạn, đội ngũ kỹ thuật sẽ phản hồi với cấu hình chip hoặc card phù hợp.",
        en: "Send us your requirement and our engineering team will get back with the suitable chip or card configuration.",
      },
      cta: { vi: "ĐĂNG KÝ TƯ VẤN NGAY →", en: "BOOK A CONSULTATION →" },
    },
  },
};

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
      eyebrow: { vi: "Chip AI & phần mềm cho doanh nghiệp", en: "AI chips & software for business" },
      title: { vi: "AI hiệu quả hơn, từ thiết bị đến vận hành", en: "More efficient AI, from devices to operations" },
      lead: { vi: "Đưa AI vào sản phẩm và quy trình của bạn với chip tiết kiệm điện năng, mô hình AI theo nhu cầu và phần mềm được thiết kế riêng.", en: "Bring AI to your products and workflows with energy-efficient chips, tailored AI models and custom software." },
      sub: { vi: "Pebble Vina kết hợp phần cứng và phần mềm để giải quyết bài toán thực tế: xử lý tại thiết bị, kiểm soát dữ liệu và tối ưu vận hành.", en: "Pebble Vina brings hardware and software together for on-device processing, data control and more efficient operations." },
      cta: { vi: "Khám phá giải pháp", en: "Explore solutions" },
      image: "/images/espresso-chrome-v4.png",
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
      eyebrow: { vi: "Công nghệ phía sau hiệu quả", en: "The technology behind the efficiency" },
      title: { vi: "Thêm năng lực AI. Bớt gánh nặng năng lượng.", en: "More AI capability. Lower energy demands." },
      lead: { vi: "Ít di chuyển dữ liệu, ít tiêu tốn năng lượng. Hai hướng PIM cho nhu cầu tích hợp AI khác nhau.", en: "Less data movement, less energy spent. Two PIM approaches for different AI integration needs." },
      imageA: "/images/analog-signal-space-v1.png",
      imageB: "/images/digital-signal-space-v1.png",
      statement: { vi: "Công nghệ phù hợp. Giá trị thiết thực.", en: "The right technology. Practical value." },
      imageC: "/images/pim-memory-compute-v2.png",
    },

    why: {
      visible: true,
      title: { vi: "AI cần tạo giá trị, không thêm gánh nặng vận hành.", en: "AI should add value, not operational strain." },
      lead: { vi: "Tiết kiệm điện, phản hồi nhanh và xử lý tại thiết bị: ba ưu tiên khi đưa AI vào sản phẩm.", en: "Lower power, faster responses and on-device processing: three priorities for bringing AI into products." },
      image: "/images/pim-ai-data-movement-v2.png",
    },

    core: {
      visible: true,
      eyebrow: { vi: "Nền tảng cho sản phẩm của bạn", en: "Built for your products" },
      title: { vi: "Thiết kế để xử lý nhiều hơn, hiệu quả hơn.", en: "Designed to do more, more efficiently." },
      lead: { vi: "Tận dụng tốt hơn phần cứng, từ cách lưu dữ liệu đến khả năng xử lý nhiều tác vụ cùng lúc.", en: "Make better use of hardware, from how data is stored to processing multiple tasks at once." },
      stat: "400K",
    },

    solutions: {
      visible: true,
      eyebrow: { vi: "Giải pháp cho doanh nghiệp", en: "Business solutions" },
      title: { vi: "Bắt đầu từ bài toán của bạn.", en: "Start with your business needs." },
      lead: { vi: "Từ sản phẩm thông minh đến vận hành doanh nghiệp, chọn hướng triển khai phù hợp.", en: "From smarter products to business operations, find the right approach." },
      count: 4,
    },

    news: {
      visible: true,
      eyebrow: { vi: "Kết nối & hợp tác", en: "Connections & collaboration" },
      title: { vi: "Cùng đối tác đưa AI vào thực tế.", en: "Bringing AI into practice, together." },
      lead: { vi: "Những hoạt động hợp tác, nghiên cứu và triển khai của Pebble Vina cùng đối tác trong và ngoài nước.", en: "Research, collaboration and deployment with Pebble Vina’s partners in Vietnam and beyond." },
      count: 4,
      image1: "/images/news-korea-semiconductor-partnership-v2.png",
      image2: "/images/news-japan-technology-meeting-v2.png",
      image3: "/images/news-vietnam-edge-ai-deployment-v2.png",
      image4: "/images/news-global-ai-partnership-v2.png",
    },

    contact: {
      visible: true,
      title: { vi: "Bạn muốn AI giải quyết điều gì?", en: "What do you want AI to solve?" },
      lead: { vi: "Chia sẻ bài toán, hệ thống hiện tại và mục tiêu của bạn. Cùng Pebble Vina tìm hướng triển khai phù hợp cho doanh nghiệp.", en: "Tell us about your goals and current systems. Work with Pebble Vina to find the right approach for your business." },
      cta: { vi: "Trao đổi về nhu cầu của bạn", en: "Discuss your needs" },
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
      image: "/images/mint-chrome-v4.png",
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
      image: "/images/papaya-chrome-v4.png",
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
      image: "/images/espresso-chrome-v4.png",
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
      image: "/images/e20-chrome-v4.png",
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

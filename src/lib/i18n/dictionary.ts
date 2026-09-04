import type { Localized } from "@/lib/i18n/config";

/**
 * Fixed site copy — everything the CMS does not own.
 *
 * Both languages come straight from the design: Vietnamese from the visible
 * text of `Pebble Vina Home.dc.html` / `Pebble Vina Product.dc.html`, English
 * from the `data-en` attribute on the same node. Nothing here is re-worded and
 * no claim is added; a new claim belongs in a design revision, not here.
 *
 * Technical figures (30 GOPS, 17,6 TOPS/W, 640 TOPS, 400K …) are transcribed
 * verbatim, including the Vietnamese decimal comma, which is why spec values
 * are not localized strings.
 */
const L = (vi: string, en: string): Localized => ({ vi, en });

/** A figure card: mono label, large value, unit or footnote underneath. */
export interface Spec {
  label: string;
  value: string;
  /** Fixed unit (GOPS, TOPS/W) — never translated. */
  unit?: string;
  /** Comparative footnote, which is prose and therefore translated. */
  note?: Localized;
  /** Highlight the value in accent — used for the "×" comparisons. */
  accent?: boolean;
}

export const dictionary = {
  header: {
    nav: {
      home: L("Trang chủ", "Home"),
      products: L("Sản phẩm & giải pháp", "Products & solutions"),
      news: L("Tin tức", "News"),
    },
    cta: L("LIÊN HỆ NGAY", "CONTACT US"),
    /** Screen-reader label for the mobile disclosure. */
    menu: L("Mở menu", "Open menu"),
    languageSwitch: L("Chuyển sang tiếng Anh", "Switch to Vietnamese"),
  },

  footer: {
    tagline: L(
      "Pebble Vina nghiên cứu, thiết kế chip, phát triển phần mềm AI và đào tạo cho doanh nghiệp tại Việt Nam.",
      "Pebble Vina researches, designs chips, develops AI software and delivers training for enterprises in Vietnam.",
    ),
    partner: L(
      "Đối tác công nghệ · pebble-square.com ↗",
      "Technology partner · pebble-square.com ↗",
    ),
    pagesTitle: L("CÁC TRANG", "PAGES"),
    contactTitle: L("THÔNG TIN LIÊN HỆ", "CONTACT DETAILS"),
    profileTitle: L("HỒ SƠ DOANH NGHIỆP", "COMPANY PROFILE"),
    contactLink: L("Liên hệ", "Contact"),
    address: L(
      "Văn phòng O1912, Tầng 19, Landmark 72 Tower, Khu E6, Khu đô thị mới Cầu Giấy, P. Yên Hoà, Hà Nội",
      "Office O1912, 19th floor, Landmark 72 Tower, Zone E6, Cau Giay New Urban Area, Yen Hoa Ward, Hanoi",
    ),
    legalEntityLabel: L("Pháp nhân", "Legal entity"),
    legalEntity: "CÔNG TY TNHH PEBBLE VINA",
    taxLabel: L("Mã số thuế", "Tax code"),
    taxCode: "0111545175",
    copyright: L("© 2026 Công ty TNHH Pebble Vina", "© 2026 Pebble Vina Company Limited"),
  },

  home: {
    pim: {
      /** Two columns: Analog then Digital. */
      analog: {
        index: "01",
        name: "ANALOG PIM",
        heading: L("Tính toán tại nơi dữ liệu được lưu trữ", "Computing where the data lives"),
        body: L(
          "Công nghệ Analog tích hợp năng lực tính toán với bộ nhớ, hạn chế di chuyển dữ liệu giữa memory và processor, từ đó nâng cao hiệu quả tính toán cho các workload AI phù hợp.",
          "Analog technology integrates compute capability into memory, limiting data movement between memory and processor and raising computational efficiency for suitable AI workloads.",
        ),
        cta: L("KHÁM PHÁ CHIP ANALOG →", "EXPLORE THE ANALOG CHIP →"),
      },
      digital: {
        index: "02",
        name: "DIGITAL PIM",
        heading: L("Nền tảng tính toán số cho AI", "A digital computing platform for AI"),
        body: L(
          "Công nghệ Digital được phát triển nhằm đáp ứng các yêu cầu về khả năng tính toán và tích hợp linh hoạt, tạo nền tảng cho các sản phẩm và hệ thống AI đa dạng.",
          "Digital technology is built to meet demands for computational capability and flexible integration, forming the foundation for a diverse range of AI products and systems.",
        ),
        cta: L("KHÁM PHÁ CHIP DIGITAL →", "EXPLORE THE DIGITAL CHIP →"),
      },
      statementLead: L(
        "Hai hướng tiếp cận công nghệ, một mục tiêu chung:",
        "Two technical approaches, one shared objective:",
      ),
    },

    why: {
      cards: [
        {
          index: "01",
          title: L("Tiết kiệm điện năng", "Lower power draw"),
          body: L(
            "Giảm nhu cầu truyền dữ liệu qua lại giữa bộ nhớ và bộ xử lý đối với các workload AI phù hợp.",
            "Reduces the need to shuttle data back and forth between memory and processor for suitable AI workloads.",
          ),
        },
        {
          index: "02",
          title: L("Tối ưu tính toán AI", "Optimised AI computation"),
          body: L(
            "Thiết kế kiến trúc tính toán phù hợp với đặc thù của từng workload AI, hướng tới nâng cao hiệu quả xử lý cho các ứng dụng AI phù hợp.",
            "Compute architectures designed around the characteristics of each AI workload, aimed at better processing efficiency.",
          ),
        },
        {
          index: "03",
          title: L("Mở hướng ứng dụng mới", "New application directions"),
          body: L(
            "Công nghệ PIM mở ra các hướng ứng dụng cho Edge AI, AI trên thiết bị (On-device AI) và suy luận AI (AI Inference).",
            "PIM opens application paths for Edge AI, on-device AI and AI inference.",
          ),
        },
      ],
    },

    core: {
      /** Card 02's value comes from the CMS (`core.stat`), the rest are fixed. */
      cards: [
        {
          index: "01",
          value: "PIM",
          fromCms: false,
          headline: null as Localized | null,
          label: L("TỐI ƯU DATA MOVEMENT", "OPTIMISED DATA MOVEMENT") as Localized | null,
          body: L(
            "Xử lý dữ liệu trực tiếp tại nơi lưu trữ, giảm nhu cầu truyền dữ liệu giữa bộ nhớ và bộ xử lý.",
            "Data is processed directly where it is stored, reducing transfers between memory and processor.",
          ),
          outcome: "→ ENERGY EFFICIENCY",
          accent: false,
          small: false,
        },
        {
          index: "02",
          value: "",
          fromCms: true,
          headline: null as Localized | null,
          label: L("ĐIỂM NORON TÍNH TOÁN", "COMPUTE NEURON POINTS") as Localized | null,
          body: L(
            "400.000 điểm xử lý tạo nền tảng cho khả năng thực hiện đồng thời khối lượng lớn phép tính AI.",
            "400,000 processing points underpin the ability to run large volumes of AI computation concurrently.",
          ),
          outcome: "→ HIGH THROUGHPUT",
          accent: true,
          small: false,
        },
        {
          index: "03",
          value: "",
          fromCms: false,
          /** This card's "figure" is a phrase, so it is set smaller. */
          headline: L("PHÂN BỔ DỮ LIỆU ĐỒNG ĐỀU", "EVEN DATA DISTRIBUTION") as Localized | null,
          label: null as Localized | null,
          body: L(
            "Phân bổ dữ liệu đồng đều trên các điểm xử lý giúp duy trì sự cân bằng trong quá trình tính toán.",
            "Distributing data evenly across processing points keeps the computation balanced.",
          ),
          outcome: "→ STABLE & CONSISTENT PROCESSING",
          accent: false,
          small: true,
        },
      ],
    },

    solutions: {
      /**
       * The mock pointed these rows at `#chip`, `#llm`, `#reuse` and `#crm`,
       * anchors that do not exist on the product page — the handoff flags this
       * in section 5.7 and asks for real destinations. Each row now lands on
       * the product section that actually answers it.
       */
      rows: [
        {
          index: "01",
          anchor: "mint" as const,
          title: L(
            "CHIP BÁN DẪN VÀ GIẢI PHÁP TÍCH HỢP AI NGOẠI BIÊN",
            "EDGE-AI SEMICONDUCTOR CHIPS & INTEGRATED SOLUTIONS",
          ),
          body: L(
            "Phát triển kiến trúc chip và tích hợp AI ngoại biên nhằm đáp ứng nhu cầu tính toán cho các workload AI chuyên biệt.",
            "Chip architecture and edge-AI integration developed to meet the computing needs of specialised AI workloads.",
          ),
        },
        {
          index: "02",
          anchor: "e-series" as const,
          title: L("HUẤN LUYỆN LLM CÁ NHÂN HÓA", "PERSONALISED LLM TRAINING"),
          body: L(
            "Xây dựng và tinh chỉnh các mô hình ngôn ngữ lớn (LLM) theo yêu cầu riêng của từng doanh nghiệp, hỗ trợ kiểm soát dữ liệu và tối ưu hóa chi phí vận hành.",
            "Building and fine-tuning large language models to each enterprise's requirements, supporting data control and lower operating cost.",
          ),
        },
        {
          index: "03",
          anchor: "papaya" as const,
          title: L(
            "TÁI SỬ DỤNG LINH HOẠT VỚI KHẢ NĂNG GHI ĐÈ DỮ LIỆU",
            "FLEXIBLE REUSE THROUGH DATA OVERWRITE",
          ),
          body: L(
            "Cho phép doanh nghiệp dễ dàng xóa bỏ dữ liệu cũ sau mỗi chu kỳ huấn luyện để nạp và đào tạo các mô hình AI hoàn toàn mới trên cùng một phần cứng chip PIM — tối ưu hóa chi phí đầu tư dài hạn.",
            "Enterprises can clear old data after each training cycle and train entirely new AI models on the same PIM hardware — optimising long-term investment.",
          ),
        },
        {
          index: "04",
          anchor: "phan-mem" as const,
          title: L("HỆ THỐNG CRM THÔNG MINH MAY ĐO RIÊNG", "TAILORED INTELLIGENT CRM"),
          body: L(
            "Phát triển phần mềm quản trị quan hệ khách hàng (CRM) tích hợp AI, được thiết kế linh hoạt theo quy trình vận hành và đặc thù của từng doanh nghiệp.",
            "AI-integrated customer relationship management software, designed around each enterprise's operating processes and specifics.",
          ),
        },
      ],
    },

    news: {
      /**
       * Cards render as articles, not links: there is no /news route and no
       * article URLs yet, and a card that goes back to its own section is worse
       * than one that goes nowhere. Give them `href` when the route exists.
       */
      items: [
        {
          date: "02.04.2025",
          title: L(
            "Ký kết MOU với đối tác công nghệ hàng đầu Hàn Quốc",
            "MOU signed with a leading Korean technology partner",
          ),
          body: L(
            "Hợp tác nghiên cứu và phát triển giải pháp PIM AI nhằm tối ưu hiệu năng và mở rộng ứng dụng.",
            "Joint research and development of PIM AI solutions, targeting higher performance and broader applications.",
          ),
        },
        {
          date: "15.05.2025",
          title: L(
            "Gặp gỡ và trao đổi cùng đối tác chiến lược Nhật Bản",
            "Meeting with our strategic partner in Japan",
          ),
          body: L(
            "Thảo luận về xu hướng AI on-device và cơ hội hợp tác phát triển thị trường bán dẫn thế hệ mới.",
            "Discussing on-device AI trends and opportunities to develop the next-generation semiconductor market together.",
          ),
        },
        {
          date: "20.03.2025",
          title: L(
            "Hợp tác triển khai giải pháp AI cùng doanh nghiệp Việt Nam",
            "Deploying AI solutions with Vietnamese enterprises",
          ),
          body: L(
            "Đồng hành xây dựng hệ thống AI tùy chỉnh, phù hợp với đặc thù ngành và nhu cầu vận hành thực tế.",
            "Building custom AI systems that fit each industry's specifics and real operating needs.",
          ),
        },
        {
          date: "10.02.2025",
          title: L(
            "Ký kết hợp tác chiến lược với đối tác Quốc tế",
            "Strategic partnership with an international partner",
          ),
          body: L(
            "Cùng nhau thúc đẩy đổi mới AI và mang các giải pháp tiên tiến đến thị trường toàn cầu.",
            "Accelerating AI innovation together and bringing advanced solutions to the global market.",
          ),
        },
      ],
    },

    contact: {
      eyebrow: L("05 — LIÊN HỆ", "05 — CONTACT"),
      stats: [
        {
          title: L("Hợp tác tin cậy", "Trusted collaboration"),
          body: L("Đồng hành bền vững", "Long-term partnership"),
        },
        {
          title: L("Công nghệ tiên phong", "Pioneering technology"),
          body: L("Giải pháp tối ưu", "Optimised solutions"),
        },
        {
          title: L("Bảo mật tuyệt đối", "Absolute confidentiality"),
          body: L("An tâm hợp tác", "Work with peace of mind"),
        },
      ],
      form: {
        fullName: {
          label: L("HỌ VÀ TÊN *", "FULL NAME *"),
          placeholder: L("Nhập họ và tên của bạn", "Enter your full name"),
        },
        company: {
          label: L("CÔNG TY *", "COMPANY *"),
          placeholder: L("Nhập tên công ty", "Enter your company name"),
        },
        email: {
          label: L("EMAIL *", "EMAIL *"),
          placeholder: L("Nhập email của bạn", "Enter your email"),
        },
        phone: {
          label: L("SỐ ĐIỆN THOẠI", "PHONE (OPTIONAL)"),
          placeholder: L("Nhập số điện thoại của bạn", "Enter your phone number"),
        },
        message: {
          label: L("MÔ TẢ NHU CẦU CỦA BẠN *", "DESCRIBE YOUR NEEDS *"),
          placeholder: L(
            "Vui lòng chia sẻ nhu cầu hoặc thông tin bạn quan tâm...",
            "Tell us what you need or what you'd like to know more about...",
          ),
        },
        sending: L("ĐANG GỬI…", "SENDING…"),
        success: L(
          "CẢM ƠN BẠN — CHÚNG TÔI SẼ LIÊN HỆ LẠI SỚM.",
          "THANK YOU — WE WILL BE IN TOUCH SHORTLY.",
        ),
        failure: L(
          "GỬI KHÔNG THÀNH CÔNG — VUI LÒNG THỬ LẠI HOẶC GỌI TRỰC TIẾP.",
          "COULD NOT SEND — PLEASE TRY AGAIN OR CALL US DIRECTLY.",
        ),
        errors: {
          fullName: L("Vui lòng nhập họ và tên.", "Please enter your full name."),
          company: L("Vui lòng nhập tên công ty.", "Please enter your company name."),
          email: L("Email chưa hợp lệ.", "That email address is not valid."),
          message: L("Vui lòng mô tả nhu cầu của bạn.", "Please describe what you need."),
        },
      },
    },
  },

  product: {
    catalog: {
      exploreLine: L(
        "Khám phá các sản phẩm phần cứng và phần mềm của Pebble Vina",
        "Explore Pebble Vina's hardware and software products",
      ),
      groupProducts: L("SẢN PHẨM", "PRODUCTS"),
      groupChipLine: L("DÒNG CHIP NPU AI", "AI NPU CHIP LINE"),
      hardware: [
        {
          anchor: "mint" as const,
          badge: "ANALOG PIM · 05/2023",
          name: "MINT",
          image: "/images/mint-analog-pim-v3.png",
          body: L(
            "Chip Analog sử dụng công nghệ Processing-in-Memory nhằm giảm sự di chuyển dữ liệu giữa bộ nhớ và bộ xử lý.",
            "An Analog chip using Processing-in-Memory to cut data movement between memory and processor.",
          ),
        },
        {
          anchor: "papaya" as const,
          badge: "ANALOG PIM · PoC 2024",
          name: "PAPAYA / PAPAYA FLEX",
          image: "/images/papaya-vision-pim-v3.png",
          body: L(
            "Chip Analog PIM hướng đến các workload thị giác máy cần xử lý dữ liệu tại biên.",
            "Analog PIM chips for machine-vision workloads that must process data at the edge.",
          ),
        },
        {
          anchor: "espresso" as const,
          badge: "DIGITAL PIM · Q3/2026",
          name: "ESPRESSO",
          image: "/images/espresso-digital-pim-v3.png",
          body: L(
            "Thế hệ chip Digital-PIM tiếp theo được phát triển cho các workload AI có yêu cầu tính toán cao hơn Edge AI.",
            "The next Digital-PIM generation, built for AI workloads with compute demands beyond Edge AI.",
          ),
        },
        {
          anchor: "e-series" as const,
          badge: "GP-GPU / GP-DSA",
          name: "E-SERIES · E10 / E20",
          image: "/images/e-series-ai-accelerators-v3.png",
          body: L(
            "Dòng card tăng tốc AI dành cho AI server, LLM training & inference và hệ thống tính toán nhiều card.",
            "AI accelerator cards for AI servers, LLM training & inference, and multi-card computing systems.",
          ),
        },
      ],
      other: [
        {
          anchor: "phan-mem" as const,
          badge: L("PHẦN MỀM · DỰ KIẾN 12/2026", "SOFTWARE · EXPECTED 12/2026"),
          name: L("Phần mềm doanh nghiệp", "Enterprise software"),
          body: L(
            "Kết nối dữ liệu và quy trình từ CRM, ERP, HRM và DMS, hỗ trợ đưa AI vào các hoạt động vận hành và ra quyết định.",
            "Connecting data and processes across CRM, ERP, HRM and DMS, bringing AI into operations and decision-making.",
          ),
        },
        {
          anchor: "dao-tao" as const,
          badge: L("ĐÀO TẠO · KHẢO SÁT 2027", "TRAINING · SURVEY 2027"),
          name: L("Đào tạo AI doanh nghiệp", "Enterprise AI training"),
          body: L(
            "Chương trình đào tạo AI được định hướng dựa trên bài toán, quy trình và nhu cầu sử dụng AI của từng doanh nghiệp.",
            "AI training programmes shaped around each organisation's problems, processes and intended AI use.",
          ),
        },
      ],
      timeline: [
        { when: "05/2023", what: L("Sản xuất — MINT", "In production — MINT") },
        { when: "2024", what: L("PoC — PAPAYA", "PoC — PAPAYA") },
        { when: "Q3/2026", what: L("Roadmap — ESPRESSO", "Roadmap — ESPRESSO") },
        {
          when: "12/2026",
          what: L("Roadmap — phần mềm doanh nghiệp", "Roadmap — enterprise software"),
        },
        { when: "2027", what: L("Khảo sát — đào tạo AI", "Needs survey — AI training") },
      ],
    },

    /** Labels reused across every product detail block. */
    shared: {
      applications: L("ỨNG DỤNG", "APPLICATIONS"),
      keySpecs: L("THÔNG SỐ CHÍNH", "KEY SPECIFICATIONS"),
      consult: L("ĐĂNG KÝ TƯ VẤN NGAY →", "BOOK A CONSULTATION →"),
      hardware: L("01 • PHẦN CỨNG", "01 • HARDWARE"),
    },

    mint: {
      meta: L("ANALOG · SẢN XUẤT 05/2023", "ANALOG · IN PRODUCTION 05/2023"),
      apps: ["Smart Home", "IoT", "Failure Analysis"],
      specs: [
        { label: "01 PERFORMANCE", value: "30", unit: "GOPS" },
        { label: "02 EFFICIENCY", value: "17,6", unit: "TOPS/W" },
        { label: "03 DIE / CHIP AREA", value: "5 × 5", unit: "MM²" },
      ] satisfies Spec[],
    },

    papaya: {
      meta: L("ANALOG · PoC 2024 · PC-VISION & 5G", "ANALOG · PoC 2024 · PC-VISION & 5G"),
      apps: [
        L("Nhận dạng hình ảnh", "Image recognition"),
        L("Hệ thống an ninh", "Security systems"),
        L("Robot", "Robot"),
        L("Thị giác máy", "Machine vision"),
      ],
      specs: [
        { label: "01 PERFORMANCE", value: "0,5", unit: "TOPS" },
        { label: "02 EFFICIENCY", value: "30", unit: "TOPS/W" },
        { label: "03 DIE / CHIP AREA", value: "5 × 5", unit: "MM²" },
        {
          label: "04 POWER",
          value: "~10.000",
          note: L(
            "So với NVIDIA Jetson Nano trong điều kiện benchmark được công bố.",
            "Versus NVIDIA Jetson Nano under published benchmark conditions.",
          ),
        },
      ] satisfies Spec[],
      flexLabel: "MACHINE VISION BENCHMARK",
      flexSpecs: [
        {
          label: "01 POWER",
          value: "~50×",
          accent: true,
          note: L(
            "0,1–0,15 W so với 5–10 W của NVIDIA Jetson Nano.",
            "0.1–0.15 W against 5–10 W on the NVIDIA Jetson Nano.",
          ),
        },
        {
          label: "02 EFFICIENCY",
          value: "~100×",
          accent: true,
          note: L(
            "333–500 GOPS/W so với 3,6–7,2 FPS/W trên NVIDIA Nano.",
            "333–500 GOPS/W against 3.6–7.2 FPS/W on the NVIDIA Nano.",
          ),
        },
        {
          label: "03 DIE / CHIP AREA",
          value: "~25×",
          accent: true,
          note: L(
            "10 × 10 mm so với 70 × 45 mm của NVIDIA Nano.",
            "10 × 10 mm against 70 × 45 mm on the NVIDIA Nano.",
          ),
        },
      ] satisfies Spec[],
    },

    espresso: {
      meta: L("DIGITAL · ROADMAP Q3/2026", "DIGITAL · ROADMAP Q3/2026"),
      targets: [
        { name: "AI PC", when: L("Dự kiến Q3/2026", "Expected Q3/2026") },
        { name: "Robotics", when: L("Dự kiến Q3/2026", "Expected Q3/2026") },
        { name: "Data Center", when: L("Trong lộ trình", "On the roadmap") },
      ],
      specs: [
        { label: "01 PERFORMANCE", value: "160", unit: "TOPS" },
        { label: "02 EFFICIENCY", value: "16", unit: "TOPS/W" },
        { label: "03 DIE / CHIP AREA", value: "20 × 23", unit: "MM²" },
      ] satisfies Spec[],
      cardLabel: L("CARD 4 CHIP", "4-CHIP CARD"),
      cardValue: "640 TOPS",
    },

    eseries: {
      kicker: "01 • E-SERIES",
      meta: L("GP-GPU / GP-DSA · PRODUCT DATA", "GP-GPU / GP-DSA · PRODUCT DATA"),
      apps: [
        "Data Center",
        "LLM Training & Inference",
        "Computer Vision",
        "NLP & Speech AI",
        "Multi-card Computing",
      ],
      cards: [
        {
          index: "01",
          name: "E10 PCIe",
          image: "/images/e10-pcie-ai-accelerator-v3.png",
          heading: L("Cân bằng để triển khai mở rộng", "Balanced for scaled deployment"),
          body: L(
            "Card tăng tốc AI bổ sung năng lực tính toán cho máy chủ, phù hợp với AI server doanh nghiệp cần huấn luyện và suy luận trên hạ tầng tiêu chuẩn.",
            "An AI accelerator card that adds AI compute to existing servers — suited to enterprise AI servers running training and inference on standard infrastructure.",
          ),
          specs: [
            {
              label: "01 COMPUTE",
              value: "512T",
              unit: "FP8/INT8 · 32 AI CORES · FP32 → INT4",
            },
            { label: "02 MEMORY", value: "48 GB" },
            {
              label: "03 CONNECTIVITY",
              value: "PCIe 5.0 ×16",
              unit: "6 × 400G / 12 × 200G · RDMA · RoCEv2",
            },
          ] satisfies Spec[],
        },
        {
          index: "02",
          name: "E20",
          image: "/images/e20-ai-accelerator-v3.png",
          heading: L("Gấp đôi quy mô cho tải AI lớn", "Twice the scale for large AI models"),
          body: L(
            "E20 mở rộng lên 64 AI Cores và 96 GB cho mô hình lớn cùng hạ tầng AI phân tán, kết nối nhiều card để xây dựng cấu hình AI server và multi-card computing.",
            "E20 scales to 64 AI cores and 96 GB for large models and distributed AI infrastructure, with multi-card connectivity for AI server configurations.",
          ),
          specs: [
            {
              label: "01 COMPUTE",
              value: "1024T",
              unit: "FP8/INT8 · 64 AI CORES · FP32 → INT4",
              accent: true,
            },
            { label: "02 MEMORY", value: "96 GB", accent: true },
            {
              label: "03 CONNECTIVITY",
              value: "2 × PCIe 5.0 ×16",
              unit: "16 × 400G / 32 × 200G · RDMA · RoCEv2",
            },
          ] satisfies Spec[],
        },
      ],
      stackLabel: "SOFTWARE STACK",
      stackLead: L("Phần mềm đồng bộ với phần cứng AI", "Software in lockstep with the AI hardware"),
      stack: [
        "AI Compiler",
        "Graph Optimization",
        "Operator Generation",
        "Framework Compatibility",
        "Performance & Precision Tools",
      ],
    },

    software: {
      kicker: L("02 • PHẦN MỀM", "02 • SOFTWARE"),
      meta: L("DỰ KIẾN 12/2026", "EXPECTED 12/2026"),
      progressLabel: L("HOÀN THÀNH MỤC TIÊU", "TARGET COMPLETION"),
      modules: [
        {
          index: "01",
          name: "CRM",
          body: L(
            "Tập trung thông tin khách hàng, lịch sử tương tác và hoạt động bán hàng.",
            "Centralises customer information, interaction history and sales activity.",
          ),
        },
        {
          index: "02",
          name: "ERP",
          body: L(
            "Quản lý đơn hàng, tồn kho, mua sắm và các hoạt động vận hành trên cùng một hệ thống dữ liệu.",
            "Orders, inventory, procurement and operations on one shared data system.",
          ),
        },
        {
          index: "03",
          name: "HRM",
          body: L(
            "Quản lý hồ sơ nhân sự, thông tin nhân viên và các hoạt động liên quan đến nguồn nhân lực.",
            "Personnel records, employee information and human-resource activities.",
          ),
        },
        {
          index: "04",
          name: "DMS",
          body: L(
            "Lưu trữ, kiểm soát, truy xuất tài liệu, hỗ trợ quản lý thông tin và khai thác dữ liệu dễ dàng hơn.",
            "Document storage, control and retrieval — easier information management and data use.",
          ),
        },
        {
          index: "05",
          name: L("Trung tâm vận hành AI", "AI operations centre"),
          body: L(
            "Tổng hợp dữ liệu từ các hệ thống doanh nghiệp để hỗ trợ phân tích hoạt động, phát hiện vấn đề và cung cấp thông tin phục vụ quá trình ra quyết định.",
            "Aggregates data from enterprise systems to support operational analysis, surface issues and inform decisions.",
          ),
        },
      ],
    },

    training: {
      kicker: L("03 • ĐÀO TẠO AI DOANH NGHIỆP", "03 • ENTERPRISE AI TRAINING"),
      meta: L("KHẢO SÁT NHU CẦU · 2027", "NEEDS SURVEY · 2027"),
      /** Second, deliberately fainter paragraph. */
      secondary: L(
        "Lộ trình 2027 tập trung vào khảo sát nhu cầu và hoàn thiện mô hình đào tạo.",
        "The 2027 roadmap focuses on surveying needs and finalising the training model.",
      ),
      steps: [
        {
          index: "01",
          title: L("Khảo sát trước", "Survey first"),
          body: L(
            "Tìm hiểu nhu cầu, các bài toán doanh nghiệp đang gặp phải và mức độ sẵn sàng trước khi xây dựng chương trình.",
            "Understanding needs, the problems the business faces and its readiness before any programme is designed.",
          ),
        },
        {
          index: "02",
          title: L("Thiết kế riêng", "Designed to fit"),
          body: L(
            "Xây dựng nội dung dựa trên lĩnh vực hoạt động và những bài toán AI mà doanh nghiệp muốn giải quyết.",
            "Content built around the organisation's field of work and the AI problems it wants to solve.",
          ),
        },
        {
          index: "03",
          title: L("Đi vào thực hành", "Straight into practice"),
          body: L(
            "Tập trung vào các tình huống gần với công việc hằng ngày, giúp đội ngũ hiểu cách lựa chọn công cụ, xây dựng quy trình và ứng dụng AI vào công việc.",
            "Focused on situations close to daily work, so teams learn to choose tools, build processes and apply AI on the job.",
          ),
        },
        {
          index: "04",
          title: L("Đo bằng ROI", "Measured by ROI"),
          body: L(
            "Xác định các chỉ số phù hợp để đánh giá mức độ ứng dụng AI, khả năng triển khai vào công việc và hiệu quả đạt được sau chương trình.",
            "Defining the right indicators to assess AI adoption, deployment into work and the results achieved after the programme.",
          ),
        },
      ],
    },

    contact: {
      eyebrow: L("04 — LIÊN HỆ", "04 — CONTACT"),
    },
  },

  /** Page-level SEO copy. Written to be read by a person in a result list. */
  meta: {
    home: {
      title: L(
        "Pebble Vina — Chip bán dẫn tích hợp AI ngoại biên & công nghệ PIM",
        "Pebble Vina — Edge-AI semiconductors and processing-in-memory technology",
      ),
      description: L(
        "Pebble Vina nghiên cứu và phát triển chip bán dẫn AI ngoại biên trên công nghệ Processing-in-Memory (Analog và Digital PIM), cùng phần mềm AI và đào tạo AI cho doanh nghiệp tại Việt Nam.",
        "Pebble Vina researches and develops edge-AI semiconductors built on Processing-in-Memory (Analog and Digital PIM), alongside AI software and enterprise AI training in Vietnam.",
      ),
    },
    products: {
      title: L(
        "Sản phẩm & giải pháp — chip MINT, PAPAYA, ESPRESSO, card E-Series | Pebble Vina",
        "Products & solutions — MINT, PAPAYA, ESPRESSO chips and E-Series cards | Pebble Vina",
      ),
      description: L(
        "Danh mục chip AI và giải pháp của Pebble Vina: MINT (30 GOPS, 17,6 TOPS/W), PAPAYA & PAPAYA FLEX cho thị giác máy, ESPRESSO Digital-PIM 160 TOPS và card tăng tốc E-Series E10/E20.",
        "Pebble Vina's AI chip and solution catalogue: MINT (30 GOPS, 17.6 TOPS/W), PAPAYA & PAPAYA FLEX for machine vision, the 160 TOPS ESPRESSO Digital-PIM chip and E10/E20 accelerator cards.",
      ),
    },
    /** Short organisation blurb reused by JSON-LD and llms.txt. */
    organisation: L(
      "Công ty TNHH Pebble Vina — doanh nghiệp công nghệ bán dẫn AI tại Hà Nội, phát triển chip AI ngoại biên trên nền công nghệ Processing-in-Memory cùng đối tác công nghệ Pebble Square Inc.",
      "Pebble Vina Company Limited — an AI semiconductor company in Hanoi developing edge-AI chips on Processing-in-Memory technology with technology partner Pebble Square Inc.",
    ),
  },
};

export type Dictionary = typeof dictionary;

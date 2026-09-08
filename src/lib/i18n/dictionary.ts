import type { Localized } from "@/lib/i18n/config";

/**
 * Fixed site copy — everything the CMS does not own.
 *
 * Vietnamese is the source. It comes from the visible text of
 * `Pebble Vina Home.dc.html` / `Pebble Vina Product.dc.html`; English comes
 * from the `data-en` attribute sitting on the same node. Korean is translated
 * from the Vietnamese in the same marketing register — a B2B semiconductor
 * voice, 합니다체 throughout, product and technology names left in Latin script
 * because that is how the industry writes them in Korean copy too.
 *
 * Nothing here is re-worded across languages and no claim is added in one that
 * is missing in another; a new claim belongs in a design revision, not here.
 *
 * Technical figures (30 GOPS, 17,6 TOPS/W, 640 TOPS, 400K …) are transcribed
 * verbatim, including the Vietnamese decimal comma, which is why spec values
 * are not localized strings. Where a figure sits inside a translated sentence,
 * English and Korean use the decimal point their readers expect.
 */
const L = (vi: string, en: string, ko: string): Localized => ({ vi, en, ko });

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
      home: L("Trang chủ", "Home", "홈"),
      products: L("Sản phẩm & giải pháp", "Products & solutions", "제품 & 솔루션"),
      bio: L("Hồ sơ", "Profile", "회사 소개"),
      news: L("Tin tức", "News", "뉴스"),
    },
    cta: L("LIÊN HỆ NGAY", "CONTACT US", "문의하기"),
    /** Screen-reader label for the mobile disclosure. */
    menu: L("Mở menu", "Open menu", "메뉴 열기"),
    /** Labels the language switcher itself, not any one destination — with
     *  three languages the control is a list, not a toggle. */
    language: L("Ngôn ngữ", "Language", "언어"),
    languageMenu: L("Chọn ngôn ngữ", "Choose a language", "언어 선택"),
  },

  footer: {
    tagline: L(
      "Pebble Vina nghiên cứu, thiết kế chip, phát triển phần mềm AI và đào tạo cho doanh nghiệp tại Việt Nam.",
      "Pebble Vina researches, designs chips, develops AI software and delivers training for enterprises in Vietnam.",
      "Pebble Vina는 베트남에서 반도체 연구와 칩 설계, AI 소프트웨어 개발, 기업 대상 AI 교육을 수행합니다.",
    ),
    partner: L(
      "Đối tác công nghệ · pebble-square.com ↗",
      "Technology partner · pebble-square.com ↗",
      "기술 파트너 · pebble-square.com ↗",
    ),
    pagesTitle: L("CÁC TRANG", "PAGES", "페이지"),
    contactTitle: L("THÔNG TIN LIÊN HỆ", "CONTACT DETAILS", "연락처"),
    profileTitle: L("HỒ SƠ DOANH NGHIỆP", "COMPANY PROFILE", "회사 소개"),
    contactLink: L("Liên hệ", "Contact", "문의"),
    address: L(
      "Văn phòng O1912, Tầng 19, Landmark 72 Tower, Khu E6, Khu đô thị mới Cầu Giấy, P. Yên Hoà, Hà Nội",
      "Office O1912, 19th floor, Landmark 72 Tower, Zone E6, Cau Giay New Urban Area, Yen Hoa Ward, Hanoi",
      "베트남 하노이 옌호아동, 꺼우저이 신도시 E6구역, Landmark 72 Tower 19층 O1912호",
    ),
    legalEntityLabel: L("Pháp nhân", "Legal entity", "법인명"),
    legalEntity: "CÔNG TY TNHH PEBBLE VINA",
    taxLabel: L("Mã số thuế", "Tax code", "사업자등록번호"),
    taxCode: "0111545175",
    copyright: L(
      "© 2026 Công ty TNHH Pebble Vina",
      "© 2026 Pebble Vina Company Limited",
      "© 2026 Pebble Vina Company Limited",
    ),
  },

  home: {
    pim: {
      /** Two columns: Analog then Digital. */
      analog: {
        index: "01",
        name: "ANALOG PIM",
        heading: L(
          "Tính toán tại nơi dữ liệu được lưu trữ",
          "Computing where the data lives",
          "데이터가 있는 자리에서 연산합니다",
        ),
        body: L(
          "Công nghệ Analog tích hợp năng lực tính toán với bộ nhớ, hạn chế di chuyển dữ liệu giữa memory và processor, từ đó nâng cao hiệu quả tính toán cho các workload AI phù hợp.",
          "Analog technology integrates compute capability into memory, limiting data movement between memory and processor and raising computational efficiency for suitable AI workloads.",
          "아날로그 기술은 연산 능력을 메모리에 통합해 메모리와 프로세서 사이의 데이터 이동을 줄이고, 이에 적합한 AI 워크로드의 연산 효율을 높입니다.",
        ),
        cta: L("KHÁM PHÁ CHIP ANALOG →", "EXPLORE THE ANALOG CHIP →", "아날로그 칩 살펴보기 →"),
      },
      digital: {
        index: "02",
        name: "DIGITAL PIM",
        heading: L(
          "Nền tảng tính toán số cho AI",
          "A digital computing platform for AI",
          "AI를 위한 디지털 연산 플랫폼",
        ),
        body: L(
          "Công nghệ Digital được phát triển nhằm đáp ứng các yêu cầu về khả năng tính toán và tích hợp linh hoạt, tạo nền tảng cho các sản phẩm và hệ thống AI đa dạng.",
          "Digital technology is built to meet demands for computational capability and flexible integration, forming the foundation for a diverse range of AI products and systems.",
          "디지털 기술은 높은 연산 성능과 유연한 통합 요구를 충족하도록 개발되어, 다양한 AI 제품과 시스템의 기반이 됩니다.",
        ),
        cta: L("KHÁM PHÁ CHIP DIGITAL →", "EXPLORE THE DIGITAL CHIP →", "디지털 칩 살펴보기 →"),
      },
      statementLead: L(
        "Hai hướng tiếp cận công nghệ, một mục tiêu chung:",
        "Two technical approaches, one shared objective:",
        "두 갈래의 기술 접근, 하나의 목표:",
      ),
    },

    why: {
      cards: [
        {
          index: "01",
          title: L("Tiết kiệm điện năng", "Lower power draw", "전력 소비 절감"),
          body: L(
            "Giảm nhu cầu truyền dữ liệu qua lại giữa bộ nhớ và bộ xử lý đối với các workload AI phù hợp.",
            "Reduces the need to shuttle data back and forth between memory and processor for suitable AI workloads.",
            "적합한 AI 워크로드에서 메모리와 프로세서 사이를 오가는 데이터 전송 자체를 줄입니다.",
          ),
        },
        {
          index: "02",
          title: L("Tối ưu tính toán AI", "Optimised AI computation", "AI 연산 최적화"),
          body: L(
            "Thiết kế kiến trúc tính toán phù hợp với đặc thù của từng workload AI, hướng tới nâng cao hiệu quả xử lý cho các ứng dụng AI phù hợp.",
            "Compute architectures designed around the characteristics of each AI workload, aimed at better processing efficiency.",
            "AI 워크로드별 특성에 맞춰 연산 아키텍처를 설계해 처리 효율을 높이는 것을 목표로 합니다.",
          ),
        },
        {
          index: "03",
          title: L("Mở hướng ứng dụng mới", "New application directions", "새로운 응용 영역"),
          body: L(
            "Công nghệ PIM mở ra các hướng ứng dụng cho Edge AI, AI trên thiết bị (On-device AI) và suy luận AI (AI Inference).",
            "PIM opens application paths for Edge AI, on-device AI and AI inference.",
            "PIM 기술은 Edge AI, 온디바이스 AI, AI 추론으로 응용 범위를 넓힙니다.",
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
          label: L(
            "TỐI ƯU DATA MOVEMENT",
            "OPTIMISED DATA MOVEMENT",
            "데이터 이동 최적화",
          ) as Localized | null,
          body: L(
            "Xử lý dữ liệu trực tiếp tại nơi lưu trữ, giảm nhu cầu truyền dữ liệu giữa bộ nhớ và bộ xử lý.",
            "Data is processed directly where it is stored, reducing transfers between memory and processor.",
            "데이터를 저장된 자리에서 바로 처리해 메모리와 프로세서 간 전송을 줄입니다.",
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
          label: L(
            "ĐIỂM NORON TÍNH TOÁN",
            "COMPUTE NEURON POINTS",
            "연산 뉴런 포인트",
          ) as Localized | null,
          body: L(
            "400.000 điểm xử lý tạo nền tảng cho khả năng thực hiện đồng thời khối lượng lớn phép tính AI.",
            "400,000 processing points underpin the ability to run large volumes of AI computation concurrently.",
            "40만 개의 처리 포인트가 대규모 AI 연산을 동시에 수행할 수 있는 기반이 됩니다.",
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
          headline: L(
            "PHÂN BỔ DỮ LIỆU ĐỒNG ĐỀU",
            "EVEN DATA DISTRIBUTION",
            "균등한 데이터 분산",
          ) as Localized | null,
          label: null as Localized | null,
          body: L(
            "Phân bổ dữ liệu đồng đều trên các điểm xử lý giúp duy trì sự cân bằng trong quá trình tính toán.",
            "Distributing data evenly across processing points keeps the computation balanced.",
            "처리 포인트에 데이터를 고르게 분산해 연산 과정의 균형을 유지합니다.",
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
            "엣지 AI 반도체 칩 및 통합 솔루션",
          ),
          body: L(
            "Phát triển kiến trúc chip và tích hợp AI ngoại biên nhằm đáp ứng nhu cầu tính toán cho các workload AI chuyên biệt.",
            "Chip architecture and edge-AI integration developed to meet the computing needs of specialised AI workloads.",
            "특화된 AI 워크로드의 연산 요구를 충족하기 위해 칩 아키텍처와 엣지 AI 통합을 개발합니다.",
          ),
        },
        {
          index: "02",
          anchor: "e-series" as const,
          title: L(
            "HUẤN LUYỆN LLM CÁ NHÂN HÓA",
            "PERSONALISED LLM TRAINING",
            "맞춤형 LLM 학습",
          ),
          body: L(
            "Xây dựng và tinh chỉnh các mô hình ngôn ngữ lớn (LLM) theo yêu cầu riêng của từng doanh nghiệp, hỗ trợ kiểm soát dữ liệu và tối ưu hóa chi phí vận hành.",
            "Building and fine-tuning large language models to each enterprise's requirements, supporting data control and lower operating cost.",
            "기업별 요구에 맞춰 대규모 언어 모델(LLM)을 구축하고 미세 조정하여 데이터 통제와 운영 비용 최적화를 지원합니다.",
          ),
        },
        {
          index: "03",
          anchor: "papaya" as const,
          title: L(
            "TÁI SỬ DỤNG LINH HOẠT VỚI KHẢ NĂNG GHI ĐÈ DỮ LIỆU",
            "FLEXIBLE REUSE THROUGH DATA OVERWRITE",
            "데이터 덮어쓰기를 통한 유연한 재사용",
          ),
          body: L(
            "Cho phép doanh nghiệp dễ dàng xóa bỏ dữ liệu cũ sau mỗi chu kỳ huấn luyện để nạp và đào tạo các mô hình AI hoàn toàn mới trên cùng một phần cứng chip PIM — tối ưu hóa chi phí đầu tư dài hạn.",
            "Enterprises can clear old data after each training cycle and train entirely new AI models on the same PIM hardware — optimising long-term investment.",
            "학습 주기가 끝날 때마다 기존 데이터를 지우고 동일한 PIM 하드웨어에서 완전히 새로운 AI 모델을 학습시킬 수 있어, 장기 투자 비용을 최적화합니다.",
          ),
        },
        {
          index: "04",
          anchor: "phan-mem" as const,
          title: L(
            "HỆ THỐNG CRM THÔNG MINH MAY ĐO RIÊNG",
            "TAILORED INTELLIGENT CRM",
            "맞춤 설계형 지능형 CRM",
          ),
          body: L(
            "Phát triển phần mềm quản trị quan hệ khách hàng (CRM) tích hợp AI, được thiết kế linh hoạt theo quy trình vận hành và đặc thù của từng doanh nghiệp.",
            "AI-integrated customer relationship management software, designed around each enterprise's operating processes and specifics.",
            "기업별 운영 프로세스와 특성에 맞춰 유연하게 설계하는 AI 통합 고객관계관리(CRM) 소프트웨어를 개발합니다.",
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
            "한국 유수의 기술 파트너와 MOU 체결",
          ),
          body: L(
            "Hợp tác nghiên cứu và phát triển giải pháp PIM AI nhằm tối ưu hiệu năng và mở rộng ứng dụng.",
            "Joint research and development of PIM AI solutions, targeting higher performance and broader applications.",
            "성능 최적화와 응용 확대를 목표로 PIM AI 솔루션을 공동 연구·개발합니다.",
          ),
        },
        {
          date: "15.05.2025",
          title: L(
            "Gặp gỡ và trao đổi cùng đối tác chiến lược Nhật Bản",
            "Meeting with our strategic partner in Japan",
            "일본 전략 파트너와의 미팅",
          ),
          body: L(
            "Thảo luận về xu hướng AI on-device và cơ hội hợp tác phát triển thị trường bán dẫn thế hệ mới.",
            "Discussing on-device AI trends and opportunities to develop the next-generation semiconductor market together.",
            "온디바이스 AI 트렌드와 차세대 반도체 시장을 함께 개척할 협력 기회를 논의했습니다.",
          ),
        },
        {
          date: "20.03.2025",
          title: L(
            "Hợp tác triển khai giải pháp AI cùng doanh nghiệp Việt Nam",
            "Deploying AI solutions with Vietnamese enterprises",
            "베트남 기업과 함께하는 AI 솔루션 도입",
          ),
          body: L(
            "Đồng hành xây dựng hệ thống AI tùy chỉnh, phù hợp với đặc thù ngành và nhu cầu vận hành thực tế.",
            "Building custom AI systems that fit each industry's specifics and real operating needs.",
            "산업별 특성과 실제 운영 요구에 맞는 맞춤형 AI 시스템을 함께 구축합니다.",
          ),
        },
        {
          date: "10.02.2025",
          title: L(
            "Ký kết hợp tác chiến lược với đối tác Quốc tế",
            "Strategic partnership with an international partner",
            "글로벌 파트너와 전략적 협력 체결",
          ),
          body: L(
            "Cùng nhau thúc đẩy đổi mới AI và mang các giải pháp tiên tiến đến thị trường toàn cầu.",
            "Accelerating AI innovation together and bringing advanced solutions to the global market.",
            "AI 혁신을 함께 가속하고 앞선 솔루션을 글로벌 시장에 선보입니다.",
          ),
        },
      ],
    },

    contact: {
      eyebrow: L("05 — LIÊN HỆ", "05 — CONTACT", "05 — 문의"),
      stats: [
        {
          title: L("Hợp tác tin cậy", "Trusted collaboration", "신뢰할 수 있는 협력"),
          body: L("Đồng hành bền vững", "Long-term partnership", "지속 가능한 동행"),
        },
        {
          title: L("Công nghệ tiên phong", "Pioneering technology", "앞서가는 기술"),
          body: L("Giải pháp tối ưu", "Optimised solutions", "최적의 솔루션"),
        },
        {
          title: L("Bảo mật tuyệt đối", "Absolute confidentiality", "철저한 기밀 유지"),
          body: L("An tâm hợp tác", "Work with peace of mind", "안심하고 협력하십시오"),
        },
      ],
      form: {
        fullName: {
          label: L("HỌ VÀ TÊN *", "FULL NAME *", "성함 *"),
          placeholder: L("Nhập họ và tên của bạn", "Enter your full name", "성함을 입력해 주세요"),
        },
        company: {
          label: L("CÔNG TY *", "COMPANY *", "회사명 *"),
          placeholder: L("Nhập tên công ty", "Enter your company name", "회사명을 입력해 주세요"),
        },
        email: {
          label: L("EMAIL *", "EMAIL *", "이메일 *"),
          placeholder: L("Nhập email của bạn", "Enter your email", "이메일을 입력해 주세요"),
        },
        phone: {
          label: L("SỐ ĐIỆN THOẠI", "PHONE (OPTIONAL)", "연락처 (선택)"),
          placeholder: L(
            "Nhập số điện thoại của bạn",
            "Enter your phone number",
            "연락처를 입력해 주세요",
          ),
        },
        message: {
          label: L("MÔ TẢ NHU CẦU CỦA BẠN *", "DESCRIBE YOUR NEEDS *", "필요하신 내용 *"),
          placeholder: L(
            "Vui lòng chia sẻ nhu cầu hoặc thông tin bạn quan tâm...",
            "Tell us what you need or what you'd like to know more about...",
            "필요하신 내용이나 궁금한 점을 알려 주세요…",
          ),
        },
        sending: L("ĐANG GỬI…", "SENDING…", "전송 중…"),
        success: L(
          "CẢM ƠN BẠN — CHÚNG TÔI SẼ LIÊN HỆ LẠI SỚM.",
          "THANK YOU — WE WILL BE IN TOUCH SHORTLY.",
          "감사합니다 — 곧 연락드리겠습니다.",
        ),
        failure: L(
          "GỬI KHÔNG THÀNH CÔNG — VUI LÒNG THỬ LẠI HOẶC GỌI TRỰC TIẾP.",
          "COULD NOT SEND — PLEASE TRY AGAIN OR CALL US DIRECTLY.",
          "전송하지 못했습니다 — 다시 시도하시거나 전화로 문의해 주세요.",
        ),
        invalidBody: L(
          "THÔNG TIN CHƯA HỢP LỆ — KIỂM TRA LẠI CÁC Ô VỪA NHẬP.",
          "THAT INFORMATION ISN'T VALID — PLEASE CHECK THE FIELDS ABOVE.",
          "입력한 정보가 올바르지 않습니다 — 위 항목을 확인해 주세요.",
        ),
        rateLimitBody: L(
          "BẠN GỬI HƠI NHANH — VUI LÒNG THỬ LẠI SAU {minutes} PHÚT.",
          "YOU'RE SUBMITTING TOO FAST — PLEASE TRY AGAIN IN {minutes} MIN.",
          "전송이 너무 잦습니다 — {minutes}분 후 다시 시도해 주세요.",
        ),
        networkErrorBody: L(
          "KHÔNG NỐI ĐƯỢC MÁY CHỦ — KIỂM TRA MẠNG RỒI THỬ LẠI.",
          "COULDN'T REACH THE SERVER — CHECK YOUR CONNECTION AND TRY AGAIN.",
          "서버에 연결하지 못했습니다 — 네트워크를 확인한 뒤 다시 시도해 주세요.",
        ),
        errors: {
          fullName: L(
            "Vui lòng nhập họ và tên.",
            "Please enter your full name.",
            "성함을 입력해 주세요.",
          ),
          company: L(
            "Vui lòng nhập tên công ty.",
            "Please enter your company name.",
            "회사명을 입력해 주세요.",
          ),
          email: L(
            "Email chưa hợp lệ.",
            "That email address is not valid.",
            "이메일 주소가 올바르지 않습니다.",
          ),
          message: L(
            "Vui lòng mô tả nhu cầu của bạn.",
            "Please describe what you need.",
            "필요하신 내용을 알려 주세요.",
          ),
        },
      },
    },
  },

  product: {
    catalog: {
      exploreLine: L(
        "Khám phá các sản phẩm phần cứng và phần mềm của Pebble Vina",
        "Explore Pebble Vina's hardware and software products",
        "Pebble Vina의 하드웨어와 소프트웨어 제품을 살펴보십시오",
      ),
      groupProducts: L("SẢN PHẨM", "PRODUCTS", "제품"),
      groupChipLine: L("DÒNG CHIP NPU AI", "AI NPU CHIP LINE", "AI NPU 칩 라인업"),
      hardware: [
        {
          anchor: "mint" as const,
          badge: "ANALOG PIM · 05/2023",
          name: "MINT",
          image: "/images/mint-chrome-v4.png",
          body: L(
            "Chip Analog sử dụng công nghệ Processing-in-Memory nhằm giảm sự di chuyển dữ liệu giữa bộ nhớ và bộ xử lý.",
            "An Analog chip using Processing-in-Memory to cut data movement between memory and processor.",
            "Processing-in-Memory 기술로 메모리와 프로세서 사이의 데이터 이동을 줄이는 아날로그 칩입니다.",
          ),
        },
        {
          anchor: "papaya" as const,
          badge: "ANALOG PIM · PoC 2024",
          name: "PAPAYA / PAPAYA FLEX",
          image: "/images/papaya-chrome-v4.png",
          body: L(
            "Chip Analog PIM hướng đến các workload thị giác máy cần xử lý dữ liệu tại biên.",
            "Analog PIM chips for machine-vision workloads that must process data at the edge.",
            "엣지에서 데이터를 처리해야 하는 머신 비전 워크로드를 위한 아날로그 PIM 칩입니다.",
          ),
        },
        {
          anchor: "espresso" as const,
          badge: "DIGITAL PIM · Q3/2026",
          name: "ESPRESSO",
          image: "/images/espresso-chrome-v4.png",
          body: L(
            "Thế hệ chip Digital-PIM tiếp theo được phát triển cho các workload AI có yêu cầu tính toán cao hơn Edge AI.",
            "The next Digital-PIM generation, built for AI workloads with compute demands beyond Edge AI.",
            "Edge AI를 넘어서는 연산 요구를 가진 AI 워크로드를 위해 개발 중인 차세대 Digital-PIM 칩입니다.",
          ),
        },
        {
          anchor: "e-series" as const,
          badge: "GP-GPU / GP-DSA",
          name: "E-SERIES · E10 / E20",
          image: "/images/e20-chrome-v4.png",
          body: L(
            "Dòng card tăng tốc AI dành cho AI server, LLM training & inference và hệ thống tính toán nhiều card.",
            "AI accelerator cards for AI servers, LLM training & inference, and multi-card computing systems.",
            "AI 서버, LLM 학습·추론, 멀티카드 연산 시스템을 위한 AI 가속 카드 라인업입니다.",
          ),
        },
      ],
      other: [
        {
          anchor: "phan-mem" as const,
          badge: L(
            "PHẦN MỀM · DỰ KIẾN 12/2026",
            "SOFTWARE · EXPECTED 12/2026",
            "소프트웨어 · 2026년 12월 예정",
          ),
          name: L("Phần mềm doanh nghiệp", "Enterprise software", "기업용 소프트웨어"),
          body: L(
            "Kết nối dữ liệu và quy trình từ CRM, ERP, HRM và DMS, hỗ trợ đưa AI vào các hoạt động vận hành và ra quyết định.",
            "Connecting data and processes across CRM, ERP, HRM and DMS, bringing AI into operations and decision-making.",
            "CRM, ERP, HRM, DMS의 데이터와 업무 흐름을 연결해 운영과 의사결정에 AI를 도입합니다.",
          ),
        },
        {
          anchor: "dao-tao" as const,
          badge: L("ĐÀO TẠO · KHẢO SÁT 2027", "TRAINING · SURVEY 2027", "교육 · 2027년 수요 조사"),
          name: L("Đào tạo AI doanh nghiệp", "Enterprise AI training", "기업 AI 교육"),
          body: L(
            "Chương trình đào tạo AI được định hướng dựa trên bài toán, quy trình và nhu cầu sử dụng AI của từng doanh nghiệp.",
            "AI training programmes shaped around each organisation's problems, processes and intended AI use.",
            "기업별 과제와 업무 프로세스, 실제 AI 활용 목적에 맞춰 설계하는 AI 교육 프로그램입니다.",
          ),
        },
      ],
      /**
       * `state` is not decoration: /bio draws a filled mark for what has
       * happened and a hollow one for what has not, so the split between
       * shipped silicon and a dated announcement survives being skimmed.
       * The catalogue strip ignores the field and reads `when` / `what`.
       */
      timeline: [
        {
          when: "05/2023",
          state: "done" as const,
          what: L("Sản xuất — MINT", "In production — MINT", "양산 — MINT"),
        },
        {
          when: "2024",
          state: "done" as const,
          what: L("PoC — PAPAYA", "PoC — PAPAYA", "PoC — PAPAYA"),
        },
        {
          when: "Q3/2026",
          state: "roadmap" as const,
          what: L("Roadmap — ESPRESSO", "Roadmap — ESPRESSO", "로드맵 — ESPRESSO"),
        },
        {
          when: "12/2026",
          state: "roadmap" as const,
          what: L(
            "Roadmap — phần mềm doanh nghiệp",
            "Roadmap — enterprise software",
            "로드맵 — 기업용 소프트웨어",
          ),
        },
        {
          when: "2027",
          state: "roadmap" as const,
          what: L("Khảo sát — đào tạo AI", "Needs survey — AI training", "수요 조사 — AI 교육"),
        },
      ],
    },

    /** Labels reused across every product detail block. */
    shared: {
      applications: L("ỨNG DỤNG", "APPLICATIONS", "응용 분야"),
      keySpecs: L("THÔNG SỐ CHÍNH", "KEY SPECIFICATIONS", "주요 사양"),
      consult: L("ĐĂNG KÝ TƯ VẤN NGAY →", "BOOK A CONSULTATION →", "상담 신청하기 →"),
      hardware: L("01 • PHẦN CỨNG", "01 • HARDWARE", "01 • 하드웨어"),
    },

    mint: {
      meta: L(
        "ANALOG · SẢN XUẤT 05/2023",
        "ANALOG · IN PRODUCTION 05/2023",
        "ANALOG · 2023년 5월 양산",
      ),
      apps: ["Smart Home", "IoT", "Failure Analysis"],
      specs: [
        { label: "01 PERFORMANCE", value: "30", unit: "GOPS" },
        { label: "02 EFFICIENCY", value: "17,6", unit: "TOPS/W" },
        { label: "03 DIE / CHIP AREA", value: "5 × 5", unit: "MM²" },
      ] satisfies Spec[],
    },

    papaya: {
      meta: L(
        "ANALOG · PoC 2024 · PC-VISION & 5G",
        "ANALOG · PoC 2024 · PC-VISION & 5G",
        "ANALOG · 2024 PoC · PC-VISION & 5G",
      ),
      apps: [
        L("Nhận dạng hình ảnh", "Image recognition", "영상 인식"),
        L("Hệ thống an ninh", "Security systems", "보안 시스템"),
        L("Robot", "Robot", "로봇"),
        L("Thị giác máy", "Machine vision", "머신 비전"),
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
            "공개된 벤치마크 조건에서 NVIDIA Jetson Nano와 비교한 수치입니다.",
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
            "NVIDIA Jetson Nano의 5–10 W 대비 0.1–0.15 W입니다.",
          ),
        },
        {
          label: "02 EFFICIENCY",
          value: "~100×",
          accent: true,
          note: L(
            "333–500 GOPS/W so với 3,6–7,2 FPS/W trên NVIDIA Nano.",
            "333–500 GOPS/W against 3.6–7.2 FPS/W on the NVIDIA Nano.",
            "NVIDIA Nano의 3.6–7.2 FPS/W 대비 333–500 GOPS/W입니다.",
          ),
        },
        {
          label: "03 DIE / CHIP AREA",
          value: "~25×",
          accent: true,
          note: L(
            "10 × 10 mm so với 70 × 45 mm của NVIDIA Nano.",
            "10 × 10 mm against 70 × 45 mm on the NVIDIA Nano.",
            "NVIDIA Nano의 70 × 45 mm 대비 10 × 10 mm입니다.",
          ),
        },
      ] satisfies Spec[],
    },

    espresso: {
      meta: L(
        "DIGITAL · ROADMAP Q3/2026",
        "DIGITAL · ROADMAP Q3/2026",
        "DIGITAL · 로드맵 2026년 3분기",
      ),
      targets: [
        { name: "AI PC", when: L("Dự kiến Q3/2026", "Expected Q3/2026", "2026년 3분기 예정") },
        { name: "Robotics", when: L("Dự kiến Q3/2026", "Expected Q3/2026", "2026년 3분기 예정") },
        { name: "Data Center", when: L("Trong lộ trình", "On the roadmap", "로드맵 단계") },
      ],
      specs: [
        { label: "01 PERFORMANCE", value: "160", unit: "TOPS" },
        { label: "02 EFFICIENCY", value: "16", unit: "TOPS/W" },
        { label: "03 DIE / CHIP AREA", value: "20 × 23", unit: "MM²" },
      ] satisfies Spec[],
      cardLabel: L("CARD 4 CHIP", "4-CHIP CARD", "4칩 카드"),
      cardValue: "640 TOPS",
    },

    eseries: {
      kicker: "01 • E-SERIES",
      meta: L(
        "GP-GPU / GP-DSA · PRODUCT DATA",
        "GP-GPU / GP-DSA · PRODUCT DATA",
        "GP-GPU / GP-DSA · 제품 정보",
      ),
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
          image: "/images/e10-chrome-v4.png",
          heading: L(
            "Cân bằng để triển khai mở rộng",
            "Balanced for scaled deployment",
            "확장 배치를 위한 균형점",
          ),
          body: L(
            "Card tăng tốc AI bổ sung năng lực tính toán cho máy chủ, phù hợp với AI server doanh nghiệp cần huấn luyện và suy luận trên hạ tầng tiêu chuẩn.",
            "An AI accelerator card that adds AI compute to existing servers — suited to enterprise AI servers running training and inference on standard infrastructure.",
            "기존 서버에 AI 연산 능력을 더하는 가속 카드로, 표준 인프라에서 학습과 추론을 수행하는 기업용 AI 서버에 적합합니다.",
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
          image: "/images/e20-chrome-v4.png",
          heading: L(
            "Gấp đôi quy mô cho tải AI lớn",
            "Twice the scale for large AI models",
            "대규모 AI 모델을 위한 두 배의 규모",
          ),
          body: L(
            "E20 mở rộng lên 64 AI Cores và 96 GB cho mô hình lớn cùng hạ tầng AI phân tán, kết nối nhiều card để xây dựng cấu hình AI server và multi-card computing.",
            "E20 scales to 64 AI cores and 96 GB for large models and distributed AI infrastructure, with multi-card connectivity for AI server configurations.",
            "E20은 64개 AI 코어와 96 GB로 확장되어 대형 모델과 분산 AI 인프라를 지원하며, 멀티카드 연결로 AI 서버 구성을 구축할 수 있습니다.",
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
      stackLead: L(
        "Phần mềm đồng bộ với phần cứng AI",
        "Software in lockstep with the AI hardware",
        "AI 하드웨어와 함께 맞물려 움직이는 소프트웨어",
      ),
      stack: [
        "AI Compiler",
        "Graph Optimization",
        "Operator Generation",
        "Framework Compatibility",
        "Performance & Precision Tools",
      ],
    },

    software: {
      kicker: L("02 • PHẦN MỀM", "02 • SOFTWARE", "02 • 소프트웨어"),
      meta: L("DỰ KIẾN 12/2026", "EXPECTED 12/2026", "2026년 12월 예정"),
      progressLabel: L("HOÀN THÀNH MỤC TIÊU", "TARGET COMPLETION", "목표 달성률"),
      modules: [
        {
          index: "01",
          name: "CRM",
          body: L(
            "Tập trung thông tin khách hàng, lịch sử tương tác và hoạt động bán hàng.",
            "Centralises customer information, interaction history and sales activity.",
            "고객 정보와 상담 이력, 영업 활동을 한곳에 모읍니다.",
          ),
        },
        {
          index: "02",
          name: "ERP",
          body: L(
            "Quản lý đơn hàng, tồn kho, mua sắm và các hoạt động vận hành trên cùng một hệ thống dữ liệu.",
            "Orders, inventory, procurement and operations on one shared data system.",
            "주문, 재고, 구매, 운영 업무를 하나의 데이터 체계에서 관리합니다.",
          ),
        },
        {
          index: "03",
          name: "HRM",
          body: L(
            "Quản lý hồ sơ nhân sự, thông tin nhân viên và các hoạt động liên quan đến nguồn nhân lực.",
            "Personnel records, employee information and human-resource activities.",
            "인사 기록과 임직원 정보, 인적자원 관련 업무를 관리합니다.",
          ),
        },
        {
          index: "04",
          name: "DMS",
          body: L(
            "Lưu trữ, kiểm soát, truy xuất tài liệu, hỗ trợ quản lý thông tin và khai thác dữ liệu dễ dàng hơn.",
            "Document storage, control and retrieval — easier information management and data use.",
            "문서를 저장·통제·검색해 정보 관리와 데이터 활용을 한결 수월하게 합니다.",
          ),
        },
        {
          index: "05",
          name: L("Trung tâm vận hành AI", "AI operations centre", "AI 운영 센터"),
          body: L(
            "Tổng hợp dữ liệu từ các hệ thống doanh nghiệp để hỗ trợ phân tích hoạt động, phát hiện vấn đề và cung cấp thông tin phục vụ quá trình ra quyết định.",
            "Aggregates data from enterprise systems to support operational analysis, surface issues and inform decisions.",
            "기업 시스템의 데이터를 통합해 운영 분석을 돕고 문제를 짚어내며 의사결정에 필요한 정보를 제공합니다.",
          ),
        },
      ],
    },

    training: {
      kicker: L(
        "03 • ĐÀO TẠO AI DOANH NGHIỆP",
        "03 • ENTERPRISE AI TRAINING",
        "03 • 기업 AI 교육",
      ),
      meta: L("KHẢO SÁT NHU CẦU · 2027", "NEEDS SURVEY · 2027", "수요 조사 · 2027년"),
      /** Second, deliberately fainter paragraph. */
      secondary: L(
        "Lộ trình 2027 tập trung vào khảo sát nhu cầu và hoàn thiện mô hình đào tạo.",
        "The 2027 roadmap focuses on surveying needs and finalising the training model.",
        "2027년 로드맵은 수요 조사와 교육 모델 정립에 집중합니다.",
      ),
      steps: [
        {
          index: "01",
          title: L("Khảo sát trước", "Survey first", "먼저 조사합니다"),
          body: L(
            "Tìm hiểu nhu cầu, các bài toán doanh nghiệp đang gặp phải và mức độ sẵn sàng trước khi xây dựng chương trình.",
            "Understanding needs, the problems the business faces and its readiness before any programme is designed.",
            "프로그램을 설계하기 전에 기업의 요구와 당면 과제, 준비 수준을 먼저 파악합니다.",
          ),
        },
        {
          index: "02",
          title: L("Thiết kế riêng", "Designed to fit", "맞춤으로 설계합니다"),
          body: L(
            "Xây dựng nội dung dựa trên lĩnh vực hoạt động và những bài toán AI mà doanh nghiệp muốn giải quyết.",
            "Content built around the organisation's field of work and the AI problems it wants to solve.",
            "기업의 사업 영역과 실제로 풀고자 하는 AI 과제를 바탕으로 교육 내용을 구성합니다.",
          ),
        },
        {
          index: "03",
          title: L("Đi vào thực hành", "Straight into practice", "곧바로 실무로 이어집니다"),
          body: L(
            "Tập trung vào các tình huống gần với công việc hằng ngày, giúp đội ngũ hiểu cách lựa chọn công cụ, xây dựng quy trình và ứng dụng AI vào công việc.",
            "Focused on situations close to daily work, so teams learn to choose tools, build processes and apply AI on the job.",
            "일상 업무에 가까운 상황을 중심으로, 도구를 고르고 프로세스를 만들고 업무에 AI를 적용하는 방법을 익힙니다.",
          ),
        },
        {
          index: "04",
          title: L("Đo bằng ROI", "Measured by ROI", "ROI로 확인합니다"),
          body: L(
            "Xác định các chỉ số phù hợp để đánh giá mức độ ứng dụng AI, khả năng triển khai vào công việc và hiệu quả đạt được sau chương trình.",
            "Defining the right indicators to assess AI adoption, deployment into work and the results achieved after the programme.",
            "AI 활용 수준과 업무 적용도, 교육 이후의 성과를 확인할 수 있는 지표를 함께 정의합니다.",
          ),
        },
      ],
    },

    contact: {
      eyebrow: L("04 — LIÊN HỆ", "04 — CONTACT", "04 — 문의"),
    },
  },

  /**
   * /bio — the company profile sheet.
   *
   * Read what is *not* here first. This block holds no claim about the company:
   * no figure, no capability, no partner name that the site does not already
   * publish elsewhere. Every paragraph the page renders comes from the CMS
   * document (`home.hero.lead`, `home.pim.lead`, `home.news.lead` …) or from
   * the product blocks above, so /bio cannot drift away from what /vi and
   * /vi/products say. What lives here is the sheet's furniture — section marks,
   * column labels, legend text — plus values already fixed in `footer` and
   * `routes.external`, restated as labels.
   */
  bio: {
    /** Rotated rail down the left edge; desktop only, decorative-but-readable. */
    spine: L(
      "HỒ SƠ DOANH NGHIỆP · PEBBLE VINA",
      "COMPANY PROFILE · PEBBLE VINA",
      "회사 소개 · PEBBLE VINA",
    ),

    /** Dossier header: the sheet names itself, then the language it is in. */
    sheet: {
      doc: "DOC",
      docValue: "PV · COMPANY PROFILE",
      locale: "LOCALE",
    },

    /**
     * Cover art. `photo` is the render the Organization JSON-LD names as the
     * company's image, so opening the profile on it is consistent rather than
     * decorative-by-accident — but it is still decorative in the accessibility
     * sense (`alt=""`), exactly as the home contact block treats the same file:
     * it illustrates, it does not evidence.
     */
    cover: {
      photo: "/images/semiconductor-rd-headquarters-v2.png",
    },

    directions: {
      /**
       * The two PIM chip renders. Both sit in the CMS asset list and no page
       * renders them any more — the home PIM block moved to the signal
       * diagrams — which is why /bio can use them without arriving at a second
       * copy of that section's imagery.
       */
      analogImage: "/images/analog-pim-chip-v3.png",
      digitalImage: "/images/digital-pim-chip-v3.png",
      /** Heads the list of parts implementing each direction. The list itself
       *  is filtered out of the catalogue badges, never written out here. */
      implementedBy: L("TRIỂN KHAI BỞI", "IMPLEMENTED BY", "적용 제품"),
    },

    eyebrow: L("HỒ SƠ DOANH NGHIỆP", "COMPANY PROFILE", "회사 소개"),
    /** Sub-line of the H1 — the same descriptor the home page title carries. */
    title: L(
      "Chip bán dẫn tích hợp AI ngoại biên và công nghệ Processing-in-Memory",
      "Edge-AI semiconductors and processing-in-memory technology",
      "엣지 AI 반도체와 Processing-in-Memory 기술",
    ),

    /** The four identity cells under the wordmark. `hqValue` is the city out of
     *  `footer.address`; the rest are rendered from `footer` / `external`. */
    identity: {
      entityLabel: L("PHÁP NHÂN", "LEGAL ENTITY", "법인명"),
      taxLabel: L("MÃ SỐ THUẾ", "TAX CODE", "사업자등록번호"),
      hqLabel: L("TRỤ SỞ", "HEADQUARTERS", "본사"),
      hqValue: L("Hà Nội, Việt Nam", "Hanoi, Vietnam", "베트남 하노이"),
      partnerLabel: L("ĐỐI TÁC CÔNG NGHỆ", "TECHNOLOGY PARTNER", "기술 파트너"),
      partnerValue: "Pebble Square Inc.",
    },

    /** Section marks. The numeral doubles as the oversized ghost figure behind
     *  each heading, which is why it is stored without the "§". */
    sections: {
      work: {
        mark: "01",
        title: L("Lĩnh vực hoạt động", "What the company works on", "사업 영역"),
      },
      tech: {
        mark: "02",
        title: L("Hai hướng công nghệ PIM", "Two PIM directions", "두 갈래의 PIM 기술"),
      },
      figures: {
        mark: "03",
        title: L("Con số và trạng thái", "Figures and their status", "수치와 진행 상태"),
      },
      timeline: {
        mark: "04",
        title: L("Lộ trình sản phẩm", "Product timeline", "제품 로드맵"),
      },
      partners: { mark: "05", title: L("Hợp tác", "Collaboration", "협력") },
      legal: { mark: "06", title: L("Thông tin pháp nhân", "Legal information", "법인 정보") },
    },

    figures: {
      /** States the rule the section follows, so the grid cannot be read as a
       *  list of things that all exist today. */
      lead: L(
        "Mỗi con số dưới đây đi kèm sản phẩm sinh ra nó và mốc thời gian của sản phẩm đó.",
        "Every figure below carries the product it comes from and that product's date.",
        "아래의 모든 수치에는 그 수치가 나온 제품과 해당 제품의 시점이 함께 표시됩니다.",
      ),
      sourceLabel: L("NGUỒN", "SOURCE", "출처"),
      /** The 400K figure describes the chip technology rather than one dated
       *  part, so its status cell names the home section it is published in
       *  instead of a month. Every other cell carries a real date. */
      coreSource: "PIM",
      coreStatus: L("NĂNG LỰC CỐT LÕI", "CORE CAPABILITY", "핵심 역량"),
    },

    timeline: {
      legend: {
        done: L("Đã thực hiện", "Already done", "완료"),
        roadmap: L("Trong lộ trình", "On the roadmap", "로드맵"),
      },
    },

    legal: {
      addressLabel: L("ĐỊA CHỈ", "ADDRESS", "주소"),
      phoneLabel: L("ĐIỆN THOẠI", "PHONE", "전화"),
      emailLabel: L("EMAIL", "EMAIL", "이메일"),
    },

    cta: {
      catalogue: L(
        "XEM DANH MỤC SẢN PHẨM →",
        "SEE THE PRODUCT CATALOGUE →",
        "제품 카탈로그 보기 →",
      ),
      contact: L("LIÊN HỆ VỚI CHÚNG TÔI →", "GET IN TOUCH →", "문의하기 →"),
    },
  },

  /**
   * Cookie consent. Every line here is a legal statement as much as a piece of
   * copy: the categories named must be the categories that actually run, and
   * the cookie names and lifetimes must match `src/lib/consent/cookie.ts` and
   * `src/lib/auth/admin.ts`. Change one, change the other.
   */
  consent: {
    /** Labels the banner for a screen reader, which meets it before the text. */
    region: L("Thông báo về cookie", "Cookie notice", "쿠키 안내"),
    title: L("Trang này dùng cookie", "This site uses cookies", "이 사이트는 쿠키를 사용합니다"),
    body: L(
      "Cookie cần thiết giúp trang chạy đúng. Cookie phân tích chỉ được bật nếu bạn đồng ý — chúng tôi không nạp bất kỳ mã đo lường nào trước khi bạn chọn.",
      "Necessary cookies keep the site working. Analytics cookies are set only if you allow them — we load no measurement code before you choose.",
      "필수 쿠키는 사이트가 정상적으로 작동하는 데 쓰입니다. 분석 쿠키는 동의하신 경우에만 설정되며, 선택하시기 전에는 어떤 측정 코드도 불러오지 않습니다.",
    ),
    /** Shown under the buttons: the two things consent law says a visitor must
     *  be told up front — how long the answer lasts and how to take it back. */
    retention: L(
      "Lựa chọn được ghi nhớ 180 ngày. Bạn có thể đổi hoặc rút lại bất cứ lúc nào ở mục “Cài đặt cookie” dưới chân trang.",
      "Your answer is kept for 180 days. You can change or withdraw it at any time from “Cookie settings” in the footer.",
      "선택하신 내용은 180일간 저장됩니다. 페이지 하단의 “쿠키 설정”에서 언제든지 변경하거나 철회하실 수 있습니다.",
    ),

    acceptAll: L("ĐỒNG Ý TẤT CẢ", "ACCEPT ALL", "모두 동의"),
    rejectAll: L("CHỈ COOKIE CẦN THIẾT", "NECESSARY ONLY", "필수 쿠키만"),
    customise: L("TÙY CHỈNH", "CUSTOMISE", "설정"),
    save: L("LƯU LỰA CHỌN", "SAVE CHOICES", "선택 저장"),
    close: L("Đóng", "Close", "닫기"),

    /** Footer entry point — the withdrawal route the banner text promises. */
    manage: L("Cài đặt cookie", "Cookie settings", "쿠키 설정"),
    /** Sits where the necessary category's switch would be. */
    alwaysOn: L("LUÔN BẬT", "ALWAYS ON", "항상 사용"),

    categories: {
      necessary: {
        name: L("Cookie cần thiết", "Necessary cookies", "필수 쿠키"),
        body: L(
          "Ghi nhớ chính lựa chọn cookie này, và giữ phiên đăng nhập của công cụ quản trị nội bộ. Không cookie nào trong nhóm theo dõi bạn, và trang không hoạt động đúng nếu thiếu chúng.",
          "They remember this very choice, and keep the internal CMS session signed in. Nothing in this group tracks you, and the site cannot work correctly without them.",
          "이 쿠키 선택 자체를 기억하고, 내부 관리 도구의 로그인 세션을 유지합니다. 이 그룹의 쿠키는 이용자를 추적하지 않으며, 이 쿠키 없이는 사이트가 정상적으로 작동하지 않습니다.",
        ),
        detail: L(
          "pv_consent · 180 ngày · pv_admin · 12 giờ, chỉ trong CMS",
          "pv_consent · 180 days · pv_admin · 12 hours, CMS only",
          "pv_consent · 180일 · pv_admin · 12시간, CMS 전용",
        ),
      },
      analytics: {
        name: L("Cookie phân tích", "Analytics cookies", "분석 쿠키"),
        body: L(
          "Google Analytics đo lượt xem trang và đường đi của người đọc, để chúng tôi biết phần nội dung nào thực sự hữu ích. Mã chỉ được nạp sau khi bạn bật, và khi tắt lại, các cookie _ga bị xoá ngay.",
          "Google Analytics measures page views and how readers move through the site, so we learn which content is actually useful. The code loads only once you switch this on, and switching it off deletes the _ga cookies straight away.",
          "Google Analytics는 페이지 조회수와 방문 경로를 측정해, 어떤 콘텐츠가 실제로 도움이 되는지 파악하는 데 쓰입니다. 이 항목을 켜신 뒤에만 코드가 로드되며, 끄시면 _ga 쿠키는 즉시 삭제됩니다.",
        ),
        detail: L(
          "_ga, _ga_* · tối đa 2 năm · Google LLC",
          "_ga, _ga_* · up to 2 years · Google LLC",
          "_ga, _ga_* · 최대 2년 · Google LLC",
        ),
      },
    },
  },

  /** Page-level SEO copy. Written to be read by a person in a result list. */
  meta: {
    home: {
      title: L(
        "Pebble Vina — Chip bán dẫn tích hợp AI ngoại biên & công nghệ PIM",
        "Pebble Vina — Edge-AI semiconductors and processing-in-memory technology",
        "Pebble Vina — 엣지 AI 반도체와 PIM 기술",
      ),
      description: L(
        "Pebble Vina nghiên cứu và phát triển chip bán dẫn AI ngoại biên trên công nghệ Processing-in-Memory (Analog và Digital PIM), cùng phần mềm AI và đào tạo AI cho doanh nghiệp tại Việt Nam.",
        "Pebble Vina researches and develops edge-AI semiconductors built on Processing-in-Memory (Analog and Digital PIM), alongside AI software and enterprise AI training in Vietnam.",
        "Pebble Vina는 Processing-in-Memory(아날로그·디지털 PIM) 기술을 기반으로 엣지 AI 반도체를 연구·개발하며, 베트남에서 AI 소프트웨어와 기업 AI 교육을 함께 제공합니다.",
      ),
    },
    products: {
      title: L(
        "Sản phẩm & giải pháp — chip MINT, PAPAYA, ESPRESSO, card E-Series | Pebble Vina",
        "Products & solutions — MINT, PAPAYA, ESPRESSO chips and E-Series cards | Pebble Vina",
        "제품 & 솔루션 — MINT, PAPAYA, ESPRESSO 칩과 E-Series 카드 | Pebble Vina",
      ),
      description: L(
        "Danh mục chip AI và giải pháp của Pebble Vina: MINT (30 GOPS, 17,6 TOPS/W), PAPAYA & PAPAYA FLEX cho thị giác máy, ESPRESSO Digital-PIM 160 TOPS và card tăng tốc E-Series E10/E20.",
        "Pebble Vina's AI chip and solution catalogue: MINT (30 GOPS, 17.6 TOPS/W), PAPAYA & PAPAYA FLEX for machine vision, the 160 TOPS ESPRESSO Digital-PIM chip and E10/E20 accelerator cards.",
        "Pebble Vina의 AI 칩·솔루션 카탈로그: MINT(30 GOPS, 17.6 TOPS/W), 머신 비전용 PAPAYA & PAPAYA FLEX, 160 TOPS ESPRESSO Digital-PIM 칩, E10/E20 가속 카드.",
      ),
    },
    bio: {
      title: L(
        "Hồ sơ doanh nghiệp — Công ty TNHH Pebble Vina",
        "Company profile — Pebble Vina Company Limited",
        "회사 소개 — Pebble Vina Company Limited",
      ),
      description: L(
        "Hồ sơ Công ty TNHH Pebble Vina: pháp nhân và trụ sở tại Hà Nội, hai hướng công nghệ PIM Analog và Digital, lộ trình sản phẩm từ MINT (sản xuất 05/2023) đến ESPRESSO (lộ trình Q3/2026), cùng đối tác công nghệ Pebble Square Inc.",
        "Profile of Pebble Vina Company Limited: legal entity and Hanoi headquarters, the Analog and Digital PIM technology directions, the product timeline from MINT (in production 05/2023) to ESPRESSO (roadmap Q3/2026), and technology partner Pebble Square Inc.",
        "Pebble Vina Company Limited 회사 소개: 하노이 본사와 법인 정보, 아날로그·디지털 두 갈래의 PIM 기술, MINT(2023년 5월 양산)에서 ESPRESSO(2026년 3분기 로드맵)로 이어지는 제품 로드맵, 그리고 기술 파트너 Pebble Square Inc.",
      ),
    },
    /** Short organisation blurb reused by JSON-LD and llms.txt. */
    organisation: L(
      "Công ty TNHH Pebble Vina — doanh nghiệp công nghệ bán dẫn AI tại Hà Nội, phát triển chip AI ngoại biên trên nền công nghệ Processing-in-Memory cùng đối tác công nghệ Pebble Square Inc.",
      "Pebble Vina Company Limited — an AI semiconductor company in Hanoi developing edge-AI chips on Processing-in-Memory technology with technology partner Pebble Square Inc.",
      "Pebble Vina Company Limited — 하노이에 자리한 AI 반도체 기업으로, 기술 파트너 Pebble Square Inc.와 함께 Processing-in-Memory 기술 기반의 엣지 AI 칩을 개발합니다.",
    ),
  },
};

export type Dictionary = typeof dictionary;

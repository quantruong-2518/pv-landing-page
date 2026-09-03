import type { SiteContent } from "./types";

/**
 * VI — the only locale the site ships. Every visible string is an i18n key for
 * now; the prose lands later (CLAUDE.md §3b). Numbers use a decimal comma
 * (17,6 TOPS/W).
 */
export const vi: SiteContent = {
  meta: {
    home: { title: "Pebble Vina — giải pháp công nghệ mới và AI cho doanh nghiệp", description: "Pebble Vina nghiên cứu nhu cầu thị trường, thiết kế chip, phát triển phần mềm AI và đào tạo tại Việt Nam; hợp tác chiến lược với Pebble Square Inc. trong công nghệ bán dẫn AI." },
    products: { title: "Chip PIM, E-Series & phần mềm AI | Pebble Vina", description: "Phần cứng Pebble Square: MINT, PAPAYA, ESPRESSO, E10 và E20; cùng phần mềm doanh nghiệp dự kiến 12/2026 và khảo sát đào tạo AI năm 2027." },
    contact: { title: "Liên hệ Pebble Vina — gửi yêu cầu tư vấn", description: "Liên hệ trực tiếp Pebble Vina tại văn phòng Hà Nội, MST 0111545175. Gọi 0345 913 369 hoặc email contact@pebblevina.com." },
  },

  nav: {
    home: "Trang chủ",
    products: "Sản phẩm & giải pháp",
    contact: "Liên hệ",
    hardware: "Phần cứng",
    software: "Phần mềm",
    training: "Đào tạo AI",
    cta: "Liên hệ ngay",
    menuLabel: "Menu chính",
    skipToContent: "Bỏ qua, tới nội dung chính",
  },

  /* ------------------------------------------------------------------------
     HOME — transcribed from the Canva master "Home - Pebble Vina" (1408×768,
     read 2026-08-30). Canva is the single source for this page: the strings
     below are what that file says, not a rewrite of them.

     Two things in here are NOT cleared against docs/01-proof-bank.md and must
     be before launch (CLAUDE.md §2): the four partnership entries under `news`
     name unverified Japanese, Korean, Vietnamese and international partners,
     and `core.capabilities` carries "400.000 điểm xử lý" with no evidence label.
     ------------------------------------------------------------------------ */
  home: {
    hero: {
      slides: [
        {
          title: "Chip bán dẫn tích hợp AI ngoại biên thế hệ mới",
          lead: "Pebble Vina tập trung nghiên cứu và phát triển các công nghệ bán dẫn AI, từ thiết kế kiến trúc chip, công nghệ xử lý trong bộ nhớ (PIM) đến phát triển phần mềm và các giải pháp AI ứng dụng.",
        },
        {
          title: "Kiến tạo công nghệ bán dẫn cho kỷ nguyên AI",
          lead: "Với định hướng kết hợp giữa phần cứng và phần mềm, Pebble Vina phát triển các nền tảng tính toán phục vụ AI, Edge AI, On-device AI và các mô hình AI thế hệ mới.",
        },
      ],
      cta: "Tìm hiểu thêm",
      pillars: ["Nghiên cứu", "Thực nghiệm", "Phát triển", "Đào tạo"],
      media: {
        src: "/media/home/hero-chip.png",
        // Full-bleed brand photograph behind the headline — decorative.
        alt: "",
      },
    },

    pim: {
      title: "Công nghệ PIM",
      titleAccent: "Nền tảng tính toán cho AI",
      body: "PIM (Processing-in-Memory) là công nghệ tính toán đưa hoạt động xử lý đến gần nơi dữ liệu được lưu trữ, qua đó giảm lượng dữ liệu phải di chuyển giữa bộ nhớ và bộ xử lý. Pebble Vina phát triển hai hướng công nghệ PIM gồm Analog và Digital nhằm đáp ứng các nhu cầu tính toán AI khác nhau.",
      branches: [
        {
          id: "analog",
          index: "01",
          name: "Analog PIM",
          tagline: "Tính toán tại nơi dữ liệu được lưu trữ",
          body: "Công nghệ Analog tích hợp năng lực tính toán với bộ nhớ, hạn chế di chuyển dữ liệu giữa memory và processor, từ đó nâng cao hiệu quả tính toán cho các workload AI phù hợp.",
          cta: "Khám phá CHIP analog",
          iconLabel: "Analog",
          media: {
            src: "/media/home/pim-photo-analog.png",
            alt: "Chip Analog-PIM đặt trên bảng mạch phát sáng tím.",
          },
        },
        {
          id: "digital",
          index: "02",
          name: "Digital PIM",
          tagline: "Nền tảng tính toán số cho AI",
          body: "Công nghệ Digital được phát triển nhằm đáp ứng các yêu cầu về khả năng tính toán và tích hợp linh hoạt, tạo nền tảng cho các sản phẩm và hệ thống AI đa dạng.",
          cta: "Khám phá CHIP digital",
          iconLabel: "Digital",
          media: {
            src: "/media/home/pim-photo-digital.png",
            alt: "Chip Digital-PIM đặt trên bảng mạch phát sáng xanh.",
          },
        },
      ],
      calloutLead: "Hai hướng tiếp cận công nghệ, một mục tiêu chung:",
      calloutGoal: "NÂNG CAO Hiệu suất tính toán cho AI.",
    },

    whyPim: {
      // The newline is the master's own line break: no box width can both keep
      // "PIM quan trọng đối với AI?" together and push it off line one.
      title: [
        { text: "Tại sao công nghệ\n" },
        { text: "PIM", accent: true },
        { text: " quan trọng đối với AI?" },
      ],
      body: "Khi các mô hình AI ngày càng lớn, nhu cầu xử lý và truyền dữ liệu cũng tăng theo. Việc liên tục di chuyển dữ liệu giữa bộ nhớ (DRAM) và bộ xử lý (NPU) có thể ảnh hưởng đến hiệu quả của quá trình tính toán. Công nghệ PIM (Processing-in-Memory) tiếp cận bài toán này bằng cách đưa hoạt động tính toán đến gần nơi dữ liệu được lưu trữ, từ đó giảm nhu cầu di chuyển dữ liệu đối với các workload AI phù hợp.",
      items: [
        {
          id: "movement",
          index: "01",
          title: "Giảm di chuyển dữ liệu",
          body: "Giảm nhu cầu truyền dữ liệu qua lại giữa bộ nhớ và bộ xử lý đối với các workload AI phù hợp.",
        },
        {
          id: "workload",
          index: "02",
          title: "Tối ưu tính toán AI",
          body: "Thiết kế kiến trúc tính toán phù hợp với đặc thù của từng workload AI, hướng tới nâng cao hiệu quả xử lý cho các ứng dụng AI phù hợp.",
        },
        {
          id: "platform",
          index: "03",
          title: "Nền tảng cho AI thế hệ mới",
          body: "Công nghệ PIM mở ra các hướng ứng dụng cho Edge AI, AI trên thiết bị (On-device AI) và suy luận AI (AI Inference).",
        },
      ],
      media: {
        src: "/media/home/why-npu.png",
        alt: "Bo mạch với khối NPU ở giữa và các khối DRAM nối quanh.",
      },
    },

    core: {
      title: "Năng lực cốt lõi của công nghệ chip",
      body: [
        { text: "Pebble Vina phát triển kiến trúc công nghệ chip bán dẫn tích hợp AI ngoại biên với trọng tâm " },
        { text: "tối ưu luồng dữ liệu, năng lực xử lý song song", accent: true },
        { text: " và " },
        { text: "hiệu quả tính toán", accent: true },
        { text: ". Các công nghệ được phát triển nhằm đáp ứng yêu cầu ngày càng cao của các workload AI, đồng thời hướng tới khả năng xử lý ổn định và hiệu quả năng lượng." },
      ],
      capabilities: [
        {
          id: "pim",
          index: "01",
          name: "pim",
          caption: "tối ưu data movement",
          body: "Xử lý dữ liệu trực tiếp tại nơi lưu trữ, giảm nhu cầu truyền dữ liệu giữa bộ nhớ và bộ xử lý.",
          outcome: "→ Energy Efficiency",
        },
        {
          id: "neurons",
          index: "02",
          value: "400k",
          name: "điểm noron tính toán",
          body: "400.000 điểm xử lý tạo nền tảng cho khả năng thực hiện đồng thời khối lượng lớn phép tính AI.",
          outcome: "→ High Throughput",
        },
        {
          id: "distribution",
          index: "03",
          name: "phân Bổ dữ liệu ĐỒNG ĐỀU",
          body: "Phân bổ dữ liệu đồng đều trên các điểm xử lý giúp duy trì sự cân bằng trong quá trình tính toán.",
          outcome: "→ Stable & Consistent Processing",
        },
      ],
      media: {
        src: "/media/home/core-bg.png",
        // Full-bleed technical field behind the three capability cards.
        alt: "",
      },
    },

    solutions: {
      title: "Giải pháp chip bán dẫn &",
      titleAccent: "phần mềm AI ngoại biên",
      body: "Pebble Vina kết hợp công nghệ phần cứng bán dẫn với phần mềm AI để phát triển các giải pháp tính toán phù hợp với nhu cầu doanh nghiệp, từ chip bán dẫn tích hợp AI ngoại biên, nền tảng PIM đến huấn luyện mô hình ngôn ngữ lớn và phần mềm AI tùy chỉnh.",
      items: [
        {
          id: "chip",
          index: "01",
          title: "Chip bán dẫn và giải pháp tích hợp AI ngoại biên",
          body: "Phát triển kiến trúc chip và tích hợp AI ngoại biên nhằm đáp ứng nhu cầu tính toán cho các workload AI chuyên biệt.",
        },
        {
          id: "llm",
          index: "02",
          title: "Huấn luyện LLM cá nhân hóa",
          body: "Xây dựng và tinh chỉnh các mô hình ngôn ngữ lớn (LLM) theo yêu cầu riêng của từng doanh nghiệp, hỗ trợ kiểm soát dữ liệu và tối ưu hóa chi phí vận hành.",
        },
        {
          id: "reuse",
          index: "03",
          title: "Tái sử dụng linh hoạt với khả năng ghi đè dữ liệu",
          body: "Cho phép doanh nghiệp dễ dàng xóa bỏ dữ liệu cũ sau mỗi chu kỳ huấn luyện để nạp và đào tạo các mô hình AI hoàn toàn mới trên cùng một phần cứng chip PIM - tối ưu hóa chi phí đầu tư dài hạn.",
        },
        {
          id: "crm",
          index: "04",
          title: "Hệ thống CRM thông minh may đo riêng",
          body: "Phát triển phần mềm quản trị quan hệ khách hàng (CRM) tích hợp AI, được thiết kế linh hoạt theo quy trình vận hành và đặc thù của từng doanh nghiệp.",
        },
      ],
      media: {
        src: "/media/home/solutions-pim.png",
        alt: "Chip PIM AI-Powered đặt trên bảng mạch phát sáng xanh.",
      },
    },

    news: {
      title: "Tin tức & Hợp tác",
      lead: "Pebbles Square luôn động đạt mở rộng hợp tác chiến lược với các đối tác, khách hàng và tổ chức hàng đầu để thúc đẩy đối mới công nghệ và tạo ra giá trị bền vững.",
      items: [
        {
          id: "japan",
          date: "15.05.2025",
          title: "Gặp gỡ và trao đổi cùng đối tác chiến lược Nhật Bản",
          body: "Thảo luận về xu hướng AI on-device và cơ hội hợp tác phát triển thị trường bản dẫn thề hệ mới.",
          cta: "Xem chi tiết",
          media: {
            src: "/media/home/news-photo-1.png",
            alt: "Buổi trao đổi giữa hai nhóm làm việc trong phòng họp.",
          },
        },
        {
          id: "korea",
          date: "02.04.2025",
          title: "Kỷ kết MOU với đối tác công nghệ hàng đầu Hàn Quốc",
          body: "Hợp tác nghiên cứu và phát triển giải pháp PIM AI nhẫm tới tưi hiệu nang và mở rộng ứng dụng.",
          cta: "Xem chi tiết",
          media: {
            src: "/media/home/news-photo-2.png",
            alt: "Lễ ký kết biên bản ghi nhớ giữa hai đại diện.",
          },
        },
        {
          id: "vietnam",
          date: "20.03.2025",
          title: "Hợp tác triển khai giải pháp AI cùng doanh nghiệp Việt Nam",
          body: "Dông hành xây dựng hệ thống AI tùy chỉnh, phù hợp với dặc thủ ngành và nhu cậu vành hệ thực tế.",
          cta: "Xem chi tiết",
          // Cards 3 and 4 reuse one flattened image in the master that already
          // contains its photograph, so there is no separate photo to name here.
          media: { src: "", alt: "" },
        },
        {
          id: "global",
          date: "10.02.2025",
          title: "Kỷ kết hợp tác chiến lược với đối tác Quốc tế",
          body: "Cùng nhúc thức dậy đối mới AI và mang các giá pháp tiến tiến đến thị trường toàn cầu.",
          cta: "Xem chi tiết",
          media: { src: "", alt: "" },
        },
      ],
      cta: "Xem tất cả tin tức",
    },

    contact: {
      // Three lines in the master, broken where it breaks them.
      title: [
        { text: "Cùng nhau kiến tạo giải pháp\nchip bán dẫn tích hợp\nAI ngoại biên " },
        { text: "đột phá", accent: true },
      ],
      lead: "Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn để biến ý tưởng thành giá trị thực tiễn, dẫn đặt tương lai công nghệ.",
      badges: [
        {
          id: "trust",
          title: "Hợp tác tin cậy",
          body: "Đồng hành bền vững",
          media: { src: "/media/home/contact-badge-1.png", alt: "" },
        },
        {
          id: "technology",
          title: "Công nghệ tiên phong",
          body: "Giải pháp tối ưu",
          media: { src: "/media/home/contact-badge-2.png", alt: "" },
        },
        {
          id: "security",
          title: "Bảo mật tuyệt đời",
          body: "An tâm hợp tác",
          media: { src: "/media/home/contact-badge-3.png", alt: "" },
        },
      ],
      media: {
        src: "/media/home/contact-building.png",
        // Building exterior behind the invitation — decorative.
        alt: "",
      },
    },
  },
  /* ------------------------------------------------------------------------
     PRODUCTS — restructured on the Canva master "Product - Pebble Vina"
     (1536×1024, read 2026-09-02). The layout changed, the facts did not: every
     metric, note and qualifier below is the copy that already passed
     docs/01-proof-bank.md. The slots the rebuild opened were filled by the
     `content-i18n` pass of 2026-09-03 — `intro.catalogTitle`,
     `intro.catalogLead`, `hardware.catalogGroups.*`, `headline` on every
     family, `training.offer.calloutNote` and ESPRESSO's three `dateNote`s:
     content-system/output/products.canva-master.vi.json.

     Dropped from the type on 2026-09-03: `transition` on every family and
     `followUp`, both retired with the embedded form (spec `retired_slots`).

     Closed out by the pass of 2026-09-03b — the gpu band label, `training.kicker`,
     the three ESPRESSO application `alt`s and `ctaLabel`, which was waiting on its
     type field: content-system/output/products.labels-and-alts.vi.json. Nothing in
     `products` is empty on purpose any more.
     ------------------------------------------------------------------------ */
  products: {
    intro: {
      kicker: "Danh mục sản phẩm",
      title: "Chọn đúng tầng sản phẩm cho bài toán AI của bạn.",
      lead: "Chọn theo nơi AI chạy, việc AI tham gia và mức độ sẵn sàng của từng nhánh.",
      scrollLabel: "Đi xuống phần cứng",
      catalogTitle: "Danh mục chip AI và giải pháp AI",
      catalogLead: "Khám phá phần cứng của Pebble Square, cùng phần mềm và đào tạo AI của Pebble Vina.",
      media: {
        src: "/media/home/hero-chip.png",
        // Chip macro bleeding in behind the headline — decorative.
        alt: "",
      },
    },

    hardware: {
      kicker: "01 · Phần cứng",
      title: "Ba dòng chip. Hai cấp AI accelerator.",
      lead: "Chọn theo nơi workload chạy, loại tác vụ và quy mô triển khai: từ thiết bị Edge AI tiết kiệm điện đến máy chủ và cụm đa card.",
      // The band names the FORM, not the architecture: `GP-GPU` was the Canva
      // word and contradicted the GP-DSA spec panel below it (spec decision
      // catalogue_band_gpu_relabel_2026_09_03). Also the section's aria-label.
      catalogGroups: { npu: "Dòng chip NPU AI", gpu: "Card tăng tốc AI" },
      items: [
        {
          id: "mint",
          name: "MINT",
          headline: "MINT — Chip Analog-PIM cho Edge AI tại thiết bị",
          catalogGroup: "npu",
          tagline: "Analog-PIM · Edge AI đã sản xuất hàng loạt",
          decisionLabel: "AI chạy ngay trên thiết bị, trong giới hạn điện thấp.",
          indexStageLabel: "Sản xuất-5/2023",
          technologyLabel: "Analog",
          body: "Dành cho suy luận Edge AI trong giới hạn điện của thiết bị hiện trường. MINT đã sản xuất hàng loạt từ 5/2023.",
          applicationLead: "MINT thường được định hướng cho Smart Home, IoT và thiết bị phân tích lỗi tại hiện trường.",
          metrics: [
            { label: "performance", value: "30 GOPS" },
            { label: "efficiency", value: "17,6 TOPS/W" },
            { label: "area", value: "5 × 5 mm²" },
          ],
          capabilities: [
            {
              title: "Smart Home",
              body: "Đưa suy luận vào thiết bị gia dụng.",
              media: {
                src: "/media/apps/mint-smart-home-panel.webp",
                alt: "Bảng điều khiển nhà thông minh gắn tường, mặt kính đen viền kim loại, đèn trạng thái xanh lá.",
              },
            },
            {
              title: "IoT",
              body: "Xử lý AI ngay trên thiết bị đầu cuối.",
              media: {
                src: "/media/apps/mint-voice-assistant.webp",
                alt: "Loa trợ lý giọng nói hình trụ, vành đèn LED viền trên, chụp trên nền trắng.",
              },
            },
            {
              title: "Failure Analysis",
              body: "Phân tích tín hiệu thiết bị tại hiện trường.",
              media: {
                src: "/media/apps/mint-wearable.webp",
                alt: "Đồng hồ thông minh mặt tròn, dây đeo silicon đen, chụp nghiêng 3/4 trên nền trắng.",
              },
            },
          ],
          source: "Pebble Square · IR Deck · SmartTimes/JBNU",
          media: {
            src: "/media/chips/mint.webp",
            alt: "Chip MINT trên nền xám, nhìn nghiêng từ phía trên.",
          },
          status: "shipped",
          stage: "mass-production",
          statusNote: "Sản xuất · 5/2023",
          origin: "ps",
        },
        {
          id: "papaya-flex",
          name: "PAPAYA · PAPAYA FLEX",
          headline: "PAPAYA & PAPAYA FLEX — Nền tảng chip Analog-PIM cho thị giác máy trên thiết bị",
          catalogGroup: "npu",
          tagline: "Analog-PIM · PoC khách hàng · 2024",
          decisionLabel: "Thị giác máy và hệ thống an ninh ở mốc PoC.",
          indexStageLabel: "PoC-2024",
          technologyLabel: "Analog",
          body: "Số đo của PAPAYA FLEX lấy trên tải thị giác máy, còn PAPAYA ở trạm gốc 5G. Lợi thế nằm ở điện năng và kích thước; huấn luyện mô hình lớn vẫn cần GPU.",
          applicationLead: "Hai mức hiệu năng trong cùng họ PAPAYA phục vụ thị giác máy và hệ thống tại hiện trường.",
          metrics: [],
          variants: [
            {
              name: "PAPAYA",
              tagline: "PoC · Vision & 5G",
              applicationLead: "Thông số nền tại mốc PoC và mức giảm điện cho tác vụ AI ở trạm gốc 5G.",
              metrics: [
                { label: "performance", value: "0,5 TOPS" },
                { label: "efficiency", value: "30 TOPS/W" },
                { label: "area", value: "5 × 5 mm²" },
                {
                  label: "power",
                  value: "~10.000×",
                  note: "So với NVIDIA L4: 320–332 W còn 0,03 W cho riêng tác vụ AI tại trạm gốc, không phải cả trạm.",
                },
              ],
              media: {
                src: "/media/chips/papaya.webp",
                alt: "Chip PAPAYA, nhìn nghiêng từ phía trên.",
              },
            },
            {
              name: "PAPAYA FLEX",
              tagline: "Machine Vision Benchmark",
              applicationLead: "Ba benchmark trên tải thị giác máy so với NVIDIA Jetson Nano.",
              metrics: [
                {
                  label: "power",
                  value: "~50×",
                  note: "0,1–0,15 W so với 5–10 W của NVIDIA Jetson Nano.",
                },
                {
                  label: "efficiency",
                  value: "~100×",
                  note: "333–500 so với 3,6–7,2 FPS/W của NVIDIA Jetson Nano, đo trên ResNet-50.",
                },
                {
                  label: "area",
                  value: "~25×",
                  note: "10 × 10 mm so với 70 × 45 mm của NVIDIA Jetson Nano.",
                },
              ],
              media: {
                src: "/media/chips/papaya-flex.webp",
                alt: "Chip PAPAYA FLEX, nhìn nghiêng từ phía trên.",
              },
            },
          ],
          capabilities: [
            {
              title: "Nhận dạng hình ảnh",
              body: "Nhận dạng nội dung trong ảnh.",
              media: {
                src: "/media/apps/papaya-flex-vision-camera.webp",
                alt: "Camera thị giác máy công nghiệp, ống kính rời, thân nhôm có rãnh tản nhiệt.",
              },
            },
            {
              title: "Thị giác máy",
              body: "Phân tích khung hình cho tác vụ thị giác.",
              media: {
                src: "/media/apps/papaya-flex-security-camera.webp",
                alt: "Camera an ninh dạng ống, vòng đèn hồng ngoại quanh ống kính, đế gắn tường.",
              },
            },
            {
              title: "Hệ thống an ninh",
              body: "Đưa nhận dạng hình ảnh vào điểm giám sát.",
              media: {
                src: "/media/apps/papaya-flex-overhead-sensor.webp",
                alt: "Cảm biến thị giác gắn trên thanh ray trần, ống kính hướng xuống, đèn LED chiếu sáng quanh ống kính.",
              },
            },
            {
              title: "Robot",
              body: "Phát hiện bất thường, bảo trì dự đoán cho robot và máy móc.",
              media: {
                src: "/media/apps/papaya-flex-warehouse-robot.webp",
                alt: "Khối đế robot tự hành trong kho, dáng dẹt bo góc, đèn báo trạng thái màu cam.",
              },
            },
          ],
          source: "Pebble Square · IR Deck · mốc PoC với khách hàng 2024",
          media: {
            src: "/media/chips/papaya-flex.webp",
            alt: "Chip PAPAYA FLEX trên nền xám, nhìn nghiêng từ phía trên.",
          },
          status: "shipped",
          stage: "customer-poc",
          statusNote: "PoC với khách hàng · 2024",
          origin: "ps",
        },
        {
          id: "espresso",
          name: "ESPRESSO",
          headline: "ESPRESSO — Chip Digital-PIM cho AI Computer",
          catalogGroup: "npu",
          tagline: "Digital-PIM · roadmap Q3/2026",
          decisionLabel: "Digital-PIM cho tải lớn hơn · dự kiến Q3/2026.",
          indexStageLabel: "Roadmap-Q3/2026",
          technologyLabel: "Digital",
          body: "Dự kiến Q3/2026, ESPRESSO sẽ đưa Digital-PIM lên AI PC, Robotics, ChatBot, Auto Pilot và Data Center. Đây là roadmap trong tài liệu nhà đầu tư, chưa có trong danh mục công khai.",
          applicationLead: "ESPRESSO hướng tới AI PC, Robotics và Data Center trong roadmap Q3/2026.",
          metrics: [
            { label: "performance", value: "160 TOPS", note: "INT8 · card 4 chip: 640 TOPS" },
            { label: "efficiency", value: "16 TOPS/W" },
            { label: "area", value: "20 × 23 mm²" },
          ],
          capabilities: [
            {
              title: "AI PC",
              body: "Mục tiêu cho AI chạy trên máy tính cá nhân.",
              // The roadmap date is a field of its own now: a card that loses it
              // loses the label CLAUDE.md §2 rule 4 requires on every mention.
              dateNote: "Dự kiến Q3/2026",
              media: {
                src: "/media/apps/espresso-ai-pc.webp",
                // Literal description of a generic machine render — it names no
                // product. The roadmap boundary is the card's own `dateNote`.
                alt: "Thùng máy tính để bàn cỡ nhỏ màu đen, mặt trước lưới đục lỗ, viền vàng đồng ở cạnh trên.",
              },
            },
            {
              title: "Robotics",
              body: "Mục tiêu cho tải suy luận trên robot.",
              dateNote: "Dự kiến Q3/2026",
              media: {
                src: "/media/apps/espresso-robot-arm.webp",
                alt: "Cánh tay robot vỏ trắng bóng, các khớp kim loại sáng, bàn tay máy năm ngón ở đầu.",
              },
            },
            {
              title: "Data Center",
              body: "Mục tiêu cho tải suy luận tại trung tâm dữ liệu.",
              dateNote: "Dự kiến Q3/2026",
              media: {
                src: "/media/apps/espresso-ai-server.webp",
                alt: "Máy chủ gắn rack thân dẹt màu đen, mặt trước là dãy khay ổ cứng nẹp vàng đồng.",
              },
            },
          ],
          source: "Pebble Square · IR Deck · roadmap Q3/2026 · chưa có trong danh mục công khai",
          media: {
            src: "/media/chips/espresso.webp",
            alt: "Ảnh dựng roadmap ESPRESSO, không phải ảnh chip đang sản xuất.",
          },
          status: "roadmap",
          stage: "roadmap",
          statusNote: "Dự kiến · Q3/2026",
          origin: "ps",
        },
        {
          id: "gpu",
          name: "E-Series AI Compute Accelerators",
          indexName: "E-Series · E10 / E20",
          headline: "E-Series — Nền tảng tăng tốc AI cho máy chủ và hệ thống đa card",
          catalogGroup: "gpu",
          tagline: "GP-DSA · Training + Inference",
          decisionLabel: "Tăng tốc huấn luyện và suy luận từ một máy chủ đến cụm đa card.",
          indexStageLabel: "Product Data",
          technologyLabel: "GP-DSA",
          body: "E-Series dùng GP-DSA cho huấn luyện và suy luận. Dải độ chính xác trải từ FP32 đến INT4, với PCIe 5.0 và RDMA.",
          applicationLead: "E-Series thường được ứng dụng cho máy chủ AI doanh nghiệp, LLM, thị giác máy, NLP, Speech AI và tính toán đa card.",
          metrics: [],
          variants: [
            {
              name: "E10 PCIe",
              tagline: "Cân bằng để triển khai mở rộng",
              applicationLead: "E10 phù hợp cho máy chủ AI doanh nghiệp cần huấn luyện và suy luận trên hạ tầng tiêu chuẩn.",
              metrics: [
                { label: "compute", value: "512T FP8/INT8", note: "32 AI Cores · FP32 → INT4" },
                { label: "memory", value: "48 GB" },
                { label: "connectivity", value: "PCIe 5.0 ×16", note: "6 × 400G hoặc 12 × 200G RDMA · RoCEv2" },
              ],
              media: {
                src: "/media/chips/e10.webp",
                alt: "Card tăng tốc AI E10 PCIe với vỏ nhôm bạc và đầu nối PCIe.",
              },
            },
            {
              name: "E20",
              tagline: "Gấp đôi quy mô cho tải AI lớn",
              applicationLead: "E20 mở rộng lên 64 AI Cores và 96 GB cho mô hình lớn cùng hạ tầng AI phân tán.",
              metrics: [
                { label: "compute", value: "1024T FP8/INT8", note: "64 AI Cores · FP32 → INT4" },
                { label: "memory", value: "96 GB" },
                { label: "connectivity", value: "2 × PCIe 5.0 ×16", note: "16 × 400G hoặc 32 × 200G RDMA · RoCEv2" },
              ],
              media: {
                src: "/media/chips/e20.webp",
                alt: "Card tăng tốc AI E20 với hai khối tản nhiệt nhôm trên bo mạch xanh.",
              },
            },
          ],
          supportingTitle: "Software stack đi cùng phần cứng",
          supportingItems: [
            { title: "AI Compiler", body: "Biên dịch và tối ưu workload cho GP-DSA." },
            { title: "Graph Optimization", body: "Tối ưu computational graph và luồng thực thi." },
            { title: "Operator Generation", body: "Tạo và tối ưu operator." },
            { title: "Performance & Precision Tools", body: "Phân tích hiệu năng, độ chính xác và giám sát." },
            { title: "Framework Compatibility", body: "Chuyển đổi mô hình từ các framework học sâu phổ biến." },
          ],
          capabilities: [
            { title: "Enterprise AI Server", body: "Máy chủ AI doanh nghiệp." },
            { title: "LLM Training & Inference", body: "Huấn luyện và suy luận mô hình ngôn ngữ lớn." },
            { title: "Computer Vision", body: "Tải thị giác máy." },
            { title: "NLP & Speech AI", body: "Tải ngôn ngữ và giọng nói." },
            { title: "Multi-card Computing", body: "Cụm tính toán đa card qua RDMA." },
          ],
          source: "Pebble Square · tài liệu sản phẩm E-Series do GM cung cấp",
          // The catalogue card needs one representative shot of the family; E10
          // is it. `alt` is the E10 string already approved on `variants[0]`,
          // reused verbatim because it is the same file — not new copy.
          media: {
            src: "/media/chips/e10.webp",
            alt: "Card tăng tốc AI E10 PCIe với vỏ nhôm bạc và đầu nối PCIe.",
          },
          status: "shipped",
          stage: "product-data",
          statusNote: "Thông số sản phẩm",
          origin: "ps",
        },
      ],
    },

    software: {
      kicker: "02 · Phần mềm",
      title: "Một bộ phần mềm để nhìn toàn bộ doanh nghiệp.",
      lead: "Dự kiến 12/2026: CRM, ERP, HRM và DMS cùng đổ về một màn hình vận hành. AI đề xuất; con người phê duyệt.",
      groups: [
        {
          id: "enterprise",
          name: "Bộ phần mềm vận hành doanh nghiệp",
          indexName: "Phần mềm doanh nghiệp",
          headline: "Nền tảng phần mềm tích hợp dữ liệu và AI cho doanh nghiệp",
          tagline: "Dự kiến 12/2026 · AI đề xuất, con người phê duyệt",
          decisionLabel: "Nối CRM, ERP, HRM và DMS vào một góc nhìn vận hành.",
          indexStageLabel: "Roadmap · 12/2026",
          body: "Dữ liệu vận hành được nối thành một luồng thống nhất để AI phát hiện điểm cần chú ý và đề xuất bước tiếp theo. Người phụ trách vẫn xem xét và phê duyệt quyết định.",
          modules: [
            { title: "CRM", body: "Theo dõi hồ sơ khách hàng và hoạt động bán hàng.", icon: "crm" },
            { title: "ERP", body: "Theo dõi đơn hàng, tồn kho, mua sắm và vận hành.", icon: "erp" },
            { title: "HRM", body: "Quản lý hồ sơ nhân sự và phân công công việc.", icon: "hrm" },
            { title: "DMS · Document Management System", body: "Kiểm soát, tìm và truy xuất tài liệu.", icon: "dms" },
            { title: "Trung tâm vận hành AI", body: "Theo dõi xuyên phân hệ, đề xuất và điều phối bước tiếp theo để người phụ trách phê duyệt.", icon: "ai" },
          ],
          media: {
            src: "/media/software-enterprise-suite.webp",
            alt: "Minh hoạ ba chiều các phân hệ phần mềm doanh nghiệp hội tụ vào một trung tâm vận hành AI.",
          },
          status: "roadmap",
          stage: "roadmap",
          statusNote: "Dự kiến 12/2026",
          origin: "pv",
        },
      ],
    },

    training: {
      // Bare category noun, like `01 · Phần cứng` and `02 · Phần mềm`: the
      // headline one line below opens on the same five words otherwise.
      kicker: "03 · Đào tạo",
      title: "Đào tạo AI đi từ bài toán riêng của doanh nghiệp.",
      lead: "Năm 2027, Pebble Vina dự kiến khảo sát nhu cầu trước khi thiết kế bất kỳ chương trình nào.",
      offer: {
        id: "enterprise-ai-training",
        name: "Đào tạo AI theo nhu cầu doanh nghiệp",
        indexName: "Đào tạo AI doanh nghiệp",
        headline: "Đào tạo AI doanh nghiệp theo nhu cầu thực tế",
        tagline: "Thiết kế sau khảo sát 2027",
        decisionLabel: "Khảo sát nhu cầu trước khi thiết kế chương trình riêng.",
        indexStageLabel: "Khảo sát · 2027",
        body: "Mốc 2027 là giai đoạn xác định nhu cầu, chưa phải cam kết triển khai. Chương trình chỉ được xây dựng khi hai bên thống nhất rõ phạm vi, người tham gia và đầu ra cần đạt.",
        calloutNote: "Lộ trình 2027 tập trung vào khảo sát nhu cầu và hoàn thiện mô hình đào tạo.",
        principles: [
          { title: "Khảo sát trước", body: "Xác định bài toán, nhóm tham gia và khoảng trống năng lực trước khi thiết kế.", icon: "survey" },
          { title: "Thiết kế riêng", body: "Không dùng một lộ trình cố định cho mọi doanh nghiệp.", icon: "tailored" },
          { title: "Đi vào thực hành", body: "Làm trên tình huống gắn với công việc, không dừng ở lý thuyết.", icon: "practice" },
          { title: "Đo bằng ROI", body: "Thống nhất chỉ số đầu ra trước khi đào tạo; không cam kết một mức hoàn vốn.", icon: "roi" },
        ],
        media: {
          src: "/media/enterprise-ai-training.webp",
          alt: "Minh hoạ ba chiều lộ trình đào tạo AI theo nhu cầu đi từ khảo sát đến mục tiêu đo lường được.",
        },
        status: "roadmap",
        stage: "research",
        statusNote: "Khảo sát nhu cầu · 2027",
        origin: "pv",
      },
    },

    // One label for all three block buttons — the buyer converts at the block
    // that convinced them. Approved in products.canva-master.vi.json and applied
    // unchanged once ProductsContent declared the field.
    ctaLabel: "Đăng ký tư vấn ngay",
  },

  contact: {
    intro: {
      kicker: "Trao đổi bài toán",
      title: "Điền form để Pebble Vina tiếp nhận bài toán",
      lead: "Trong vòng 24 giờ sau khi doanh nghiệp gửi form thành công, nhân viên kinh doanh Pebble Vina sẽ liên hệ qua email hoặc số điện thoại đã cung cấp.",
    },
    // Labels, placeholders and the submit wording come from the Canva master's
    // contact artboard (page 8) — the form is shared with /vi/contact, so both
    // now read the same way.
    ctaPrimary: "Gửi thông tin",
    form: {
      title: "Liên hệ với chúng tôi",
      nameLabel: "Họ và tên",
      namePlaceholder: "Nhập họ và tên của bạn",
      companyLabel: "Công ty",
      companyPlaceholder: "Nhập tên công ty",
      emailLabel: "Email",
      emailPlaceholder: "Nhập email của bạn",
      phoneLabel: "Số điện thoại",
      phonePlaceholder: "Nhập số điện thoại của bạn",
      messageLabel: "Mô tả như cầu của bạn",
      messagePlaceholder: "Vui lòng chia sẻ nhu cầu hoặc thông tin bạn quan tâm...",
      optionalLabel: "Không bắt buộc",
      privacyNote: "Thông tin của bạn được bảo mật và chỉ sử dụng để hỗ trợ theo yêu cầu.",
      successTitle: "Pebble Vina đã nhận yêu cầu",
      successBody: "Nhân viên kinh doanh sẽ liên hệ qua email hoặc số điện thoại đã cung cấp trong vòng 24 giờ.",
      errorBody: "Chưa gửi được yêu cầu. Thử lại hoặc liên hệ trực tiếp:",
      invalidBody: "Thông tin chưa hợp lệ. Kiểm tra lại các ô vừa nhập.",
      rateLimitBody: "Bạn gửi hơi nhanh. Vui lòng thử lại sau {minutes} phút.",
      networkErrorBody: "Không nối được máy chủ. Kiểm tra mạng rồi thử lại.",
    },
  },

  labels: {
    call: "Điện thoại",
    email: "Email",
    office: "Văn phòng",
    entity: "Pháp nhân",
    taxCode: "Mã số thuế",
    partner: "Đối tác công nghệ",
  },

  footer: {
    tagline: "Pebble Vina nghiên cứu, thiết kế chip, phát triển phần mềm AI và đào tạo cho doanh nghiệp tại Việt Nam.",
    navTitle: "Các trang",
    contactTitle: "Thông tin liên hệ",
    legalTitle: "Hồ sơ doanh nghiệp",
    copyright: "© 2026 Công ty TNHH Pebble Vina",
  },

  ui: {
    specs: "Số đo",
    source: "Nguồn",
    productMetrics: "Thông số chính",
    softwareStack: "Software stack",
    metricLabels: {
      performance: "Performance",
      efficiency: "Efficiency",
      power: "Power",
      area: "Die / Chip Area",
      compute: "Compute",
      memory: "Memory",
      connectivity: "Connectivity",
    },
    applications: "Ứng dụng",
    imagePending: "Ảnh đang chờ",
  },

  status: { shipped: "Đã có", roadmap: "Dự kiến" },
  origin: { ps: "Pebble Square", pv: "Pebble Vina" },
};

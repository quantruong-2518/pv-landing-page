import type { SiteContent } from "./types";

/**
 * VI — the only locale the site ships. Every visible string is an i18n key for
 * now; the prose lands later (CLAUDE.md §3b). Numbers use a decimal comma
 * (17,6 TOPS/W).
 */
export const vi: SiteContent = {
  meta: {
    home: { title: "Pebble Vina — chip AI Analog-PIM của Pebble Square tại Việt Nam", description: "Pebble Vina — thành viên Việt Nam của nhóm Pebble Square Inc., hãng bán dẫn AI fabless Hàn Quốc. Chip tính ngay trong bộ nhớ để AI chạy tại chỗ. MINT đạt 17,6 TOPS/W, sản xuất hàng loạt từ 5/2023." },
    products: { title: "Chip PIM, E-Series & phần mềm AI | Pebble Vina", description: "Phần cứng Pebble Square: MINT, PAPAYA, ESPRESSO, E10 và E20; cùng phần mềm doanh nghiệp dự kiến 12/2026 và khảo sát đào tạo AI năm 2027." },
    contact: { title: "Liên hệ Pebble Vina — đặt lịch tư vấn, văn phòng Hà Nội", description: "Pebble Vina — thành viên Việt Nam của nhóm Pebble Square Inc. Văn phòng Hà Nội, MST 0111545175. Gọi 0345 913 369 hoặc email contact@pebblevina.com." },
  },

  nav: {
    home: "Trang chủ",
    products: "Sản phẩm & giải pháp",
    contact: "Liên hệ",
    hardware: "Phần cứng",
    software: "Phần mềm",
    training: "Đào tạo AI",
    cta: "Đặt lịch tư vấn 30 phút",
    menuLabel: "Menu chính",
    skipToContent: "Bỏ qua, tới nội dung chính",
  },

  home: {
    hero: {
      eyebrow: "NGHIÊN CỨU · THỰC NGHIỆM · PHÁT TRIỂN · ĐÀO TẠO",
      brand: "PEBBLE VINA",
      slogan: "Đối tác chiến lược về công nghệ mới và AI",
      lead: "Chúng tôi nghiên cứu nhu cầu thị trường, thiết kế chip, phát triển phần mềm điều phối và đào tạo đội ngũ. Bốn năng lực cùng phục vụ một mục tiêu: đưa AI vào vận hành thực tế.",
      ctaPrimary: "Khám phá năng lực",
      ctaSecondary: "Trao đổi bài toán",
      media: {
        src: "/brand/pebble-vina-decorator.png",
        // Decorative brand mark — alt stays empty by design (context/media-plan.md).
        alt: "",
      },
    },

    whyNow: {
      kicker: "01 · Vì sao cần một cách làm khác",
      title: "AI đang vướng ở hai chỗ: dữ liệu phải đi xa và thiết bị phải tốn điện cho quãng đường đó.",
      lead: "",
      problemLabel: "Hai điểm nghẽn",
      solutionLabel: "Cách Pebble Square giải bài toán",
      points: [
        {
          title: "Đưa dữ liệu lên cloud đồng nghĩa với thêm một lớp rủi ro",
          body: "Mỗi truy vấn phải đi qua mạng và hạ tầng bên ngoài. Doanh nghiệp khó giữ toàn bộ dữ liệu trong phạm vi kiểm soát; khi đường truyền chậm hoặc gián đoạn, phản hồi của hệ thống cũng bị kéo theo.",
          media: {
            src: "/media/why-now-1-mobile.webp",
            srcWide: "/media/why-now-1-desktop.webp",
            alt: "Minh hoạ dữ liệu doanh nghiệp đi qua mạng tới một trung tâm dữ liệu bên ngoài.",
          },
        },
        {
          title: "Chip truyền thống tốn điện để chuyển dữ liệu qua lại",
          body: "Trong kiến trúc von Neumann, bộ nhớ và bộ xử lý nằm tách nhau. Dữ liệu phải liên tục di chuyển giữa hai vùng, nên một phần đáng kể điện năng được dùng cho việc di chuyển dữ liệu, không phải phép tính.",
          media: {
            src: "/media/why-now-2-mobile.webp",
            srcWide: "/media/why-now-2-desktop.webp",
            alt: "Minh hoạ các thiết bị thông minh tại hiện trường cùng giới hạn điện năng của chúng.",
          },
        },
        {
          title: "Đưa phép tính vào vùng nhớ, thay vì kéo dữ liệu sang bộ xử lý",
          body: "Pebble Square Inc., đối tác chiến lược của Pebble Vina về công nghệ bán dẫn, phát triển kiến trúc Processing-In-Memory (PIM). PIM thực hiện phép tính ngay nơi dữ liệu được lưu, giảm quãng đường dữ liệu phải di chuyển và tạo nền tảng để AI chạy tại chỗ.",
          media: {
            src: "/media/why-now-3-mobile.webp",
            srcWide: "/media/why-now-3-desktop.webp",
            alt: "Sơ đồ so sánh kiến trúc tách bộ nhớ và bộ xử lý với PIM xử lý trực tiếp trong vùng nhớ.",
          },
        },
      ],
      pillarsTitle: "Kết quả",
      pillars: [
        { title: "Giữ dữ liệu tại chỗ", body: "Không phải gửi từng truy vấn lên cloud." },
        { title: "Phản hồi nhanh hơn", body: "Không chờ vòng đi-về qua mạng." },
        { title: "Dùng điện hiệu quả hơn", body: "Giảm điện cho việc di chuyển dữ liệu." },
      ],
    },

    history: {
      kicker: "02 · Hành trình công nghệ bán dẫn",
      title: "Từ MOCHA đến ESPRESSO: mỗi thế hệ mở rộng phạm vi AI có thể chạy tại chỗ.",
      lead: "Pebble Square phát triển họ chip PIM theo một hướng nhất quán: bắt đầu từ Edge AI tiết kiệm điện, mở rộng sang thị giác máy và tiến tới suy luận mô hình lớn tại chỗ.",
      milestones: [
        {
          date: "2021 · Thế hệ 1",
          title: "MOCHA mở đường cho Edge AI PIM",
          body: "Thế hệ đầu tiên đặt nền cho hướng xử lý AI ngay trong bộ nhớ.",
          status: "shipped",
        },
        {
          date: "2022–2023 · Thế hệ 2",
          title: "MINT bước từ phát triển sang sản xuất",
          body: "Hoàn tất phát triển 12/2022, sản xuất hàng loạt từ 5/2023 và đạt hiệu suất năng lượng 17,6 TOPS/W.",
          status: "shipped",
          starred: true,
        },
        {
          date: "Thế hệ 3",
          title: "PAPAYA FLEX mở rộng sang AI thị giác",
          body: "Hướng tới camera, kiểm tra ngoại quan và robot, với trọng tâm là điện năng và kích thước.",
          status: "shipped",
        },
        {
          date: "Bước tiếp theo",
          title: "ESPRESSO hướng tới suy luận mô hình lớn tại chỗ",
          body: "Digital-PIM được định hướng cho AI accelerator và máy chủ suy luận.",
          status: "roadmap",
          statusNote: "Tài liệu nhà đầu tư · lộ trình",
        },
      ],
      footnote: "MOCHA và MINT dựa trên lịch sử công khai của Pebble Square. PAPAYA FLEX dựa trên tài liệu kỹ thuật của hãng. ESPRESSO là nội dung lộ trình từ tài liệu nhà đầu tư và chưa xuất hiện trong danh mục công khai.",
    },
  },

  products: {
    intro: {
      kicker: "Danh mục sản phẩm",
      title: "Chọn đúng tầng sản phẩm cho bài toán AI của bạn.",
      lead: "Chọn theo nơi AI chạy, việc AI tham gia và mức độ sẵn sàng của từng nhánh.",
      scrollLabel: "Đi xuống phần cứng",
    },

    hardware: {
      kicker: "01 · Phần cứng",
      title: "Ba dòng chip. Hai cấp AI accelerator.",
      lead: "Chọn theo nơi workload chạy, loại tác vụ và quy mô triển khai: từ thiết bị Edge AI tiết kiệm điện đến máy chủ và cụm đa card.",
      items: [
        {
          id: "mint",
          name: "MINT",
          tagline: "Analog-PIM · Edge AI đã sản xuất hàng loạt",
          decisionLabel: "AI chạy ngay trên thiết bị, trong giới hạn điện thấp.",
          indexStageLabel: "Sản xuất-5/2023",
          technologyLabel: "Analog",
          transition: "Bắt đầu tại thiết bị, nơi điện năng là giới hạn đầu tiên.",
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
          tagline: "Analog-PIM · PoC khách hàng · 2024",
          decisionLabel: "Thị giác máy và hệ thống an ninh ở mốc PoC.",
          indexStageLabel: "PoC-2024",
          technologyLabel: "Analog",
          transition: "Khi thiết bị cần nhìn, bài toán chuyển từ tín hiệu sang hình ảnh.",
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
          tagline: "Digital-PIM · roadmap Q3/2026",
          decisionLabel: "Digital-PIM cho tải lớn hơn · dự kiến Q3/2026.",
          indexStageLabel: "Roadmap-Q3/2026",
          technologyLabel: "Digital",
          transition: "Sau Edge AI hiện tại là lộ trình Digital-PIM dự kiến Q3/2026.",
          body: "Dự kiến Q3/2026, ESPRESSO sẽ đưa Digital-PIM lên AI PC, Robotics, ChatBot, Auto Pilot và Data Center. Đây là roadmap trong tài liệu nhà đầu tư, chưa có trong danh mục công khai.",
          applicationLead: "ESPRESSO hướng tới AI PC, Robotics và Data Center trong roadmap Q3/2026.",
          metrics: [
            { label: "performance", value: "160 TOPS", note: "INT8 · card 4 chip: 640 TOPS" },
            { label: "efficiency", value: "16 TOPS/W" },
            { label: "area", value: "20 × 23 mm²" },
          ],
          capabilities: [
            {
              title: "AI PC · dự kiến Q3/2026",
              body: "Mục tiêu cho AI chạy trên máy tính cá nhân.",
              media: { src: "/media/apps/espresso-ai-pc.webp", alt: "" },
            },
            {
              title: "Robotics · dự kiến Q3/2026",
              body: "Mục tiêu cho tải suy luận trên robot.",
              media: { src: "/media/apps/espresso-robot-arm.webp", alt: "" },
            },
            {
              title: "Data Center · dự kiến Q3/2026",
              body: "Mục tiêu cho tải suy luận tại trung tâm dữ liệu.",
              media: { src: "/media/apps/espresso-ai-server.webp", alt: "" },
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
          tagline: "GP-DSA · Training + Inference",
          decisionLabel: "Tăng tốc huấn luyện và suy luận từ một máy chủ đến cụm đa card.",
          indexStageLabel: "Product Data",
          technologyLabel: "GP-DSA",
          transition: "Khi mô hình vượt khỏi thiết bị Edge AI, E-Series đưa tải lên máy chủ và cụm đa card.",
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
          media: { alt: "Dòng card tăng tốc AI E-Series của Pebble Square." },
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
          tagline: "Dự kiến 12/2026 · AI đề xuất, con người phê duyệt",
          decisionLabel: "Nối CRM, ERP, HRM và DMS vào một góc nhìn vận hành.",
          indexStageLabel: "Roadmap · 12/2026",
          transition: "Sau lớp tính toán là lớp đưa dữ liệu vào quyết định vận hành.",
          body: "Dữ liệu vận hành được nối thành một luồng thống nhất để AI phát hiện điểm cần chú ý và đề xuất bước tiếp theo. Người phụ trách vẫn xem xét và phê duyệt quyết định.",
          modules: [
            { title: "CRM", body: "Theo dõi hồ sơ khách hàng và hoạt động bán hàng.", icon: "crm" },
            { title: "ERP", body: "Theo dõi đơn hàng, tồn kho, mua sắm và vận hành.", icon: "erp" },
            { title: "HRM", body: "Quản lý hồ sơ nhân sự và phân công công việc.", icon: "hrm" },
            { title: "DMS · Document Management System", body: "Kiểm soát, tìm và truy xuất tài liệu.", icon: "dms" },
            { title: "Trung tâm vận hành AI", body: "Theo dõi xuyên phân hệ, đề xuất và điều phối bước tiếp theo để người phụ trách phê duyệt.", icon: "ai" },
          ],
          media: { alt: "Minh hoạ giao diện bộ phần mềm doanh nghiệp dự kiến 12/2026." },
          status: "roadmap",
          stage: "roadmap",
          statusNote: "Dự kiến 12/2026",
          origin: "pv",
        },
      ],
    },

    training: {
      kicker: "03 · Đào tạo AI doanh nghiệp",
      title: "Đào tạo AI đi từ bài toán riêng của doanh nghiệp.",
      lead: "Năm 2027, Pebble Vina dự kiến khảo sát nhu cầu trước khi thiết kế bất kỳ chương trình nào.",
      offer: {
        id: "enterprise-ai-training",
        name: "Đào tạo AI theo nhu cầu doanh nghiệp",
        indexName: "Đào tạo AI doanh nghiệp",
        tagline: "Thiết kế sau khảo sát 2027",
        decisionLabel: "Khảo sát nhu cầu trước khi thiết kế chương trình riêng.",
        indexStageLabel: "Khảo sát · 2027",
        transition: "Sau hệ thống là đội ngũ phải đưa AI vào một đầu việc có thể đo.",
        body: "Mốc 2027 là giai đoạn xác định nhu cầu, chưa phải cam kết triển khai. Chương trình chỉ được xây dựng khi hai bên thống nhất rõ phạm vi, người tham gia và đầu ra cần đạt.",
        principles: [
          { title: "Khảo sát trước", body: "Xác định bài toán, nhóm tham gia và khoảng trống năng lực trước khi thiết kế.", icon: "survey" },
          { title: "Thiết kế riêng", body: "Không dùng một lộ trình cố định cho mọi doanh nghiệp.", icon: "tailored" },
          { title: "Đi vào thực hành", body: "Làm trên tình huống gắn với công việc, không dừng ở lý thuyết.", icon: "practice" },
          { title: "Đo bằng ROI", body: "Thống nhất chỉ số đầu ra trước khi đào tạo; không cam kết một mức hoàn vốn.", icon: "roi" },
        ],
        status: "roadmap",
        stage: "research",
        statusNote: "Khảo sát nhu cầu · 2027",
        origin: "pv",
      },
    },

    followUp: {
      kicker: "Bước tiếp theo",
      title: "Mang nhánh phù hợp vào bài toán doanh nghiệp của bạn.",
    },
  },

  contact: {
    intro: {
      kicker: "Bắt đầu ngay",
      title: "Kể bài toán của bạn, chúng ta xem giải được tới đâu.",
      lead: "Gửi form đi, trong vòng 24 giờ một người của Pebble Vina sẽ đọc và trả lời bạn. Cảm ơn bạn đã quan tâm — chúng tôi mong được làm việc cùng doanh nghiệp của bạn.",
    },
    ctaPrimary: "Gửi yêu cầu tư vấn",
    media: { alt: "Văn phòng Pebble Vina, tầng 19 toà Landmark 72, Hà Nội." },
    form: {
      title: "Đặt lịch tư vấn",
      nameLabel: "Họ và tên",
      companyLabel: "Công ty",
      emailLabel: "Email",
      phoneLabel: "Số điện thoại",
      messageLabel: "Bài toán cần giải",
      messagePlaceholder: "Ví dụ: 12 máy CNC, cần phát hiện rung bất thường trước khi hỏng, dữ liệu không được rời nhà máy.",
      optionalLabel: "Không bắt buộc",
      successTitle: "Đã nhận được yêu cầu của bạn",
      successBody: "Chúng tôi sẽ liên hệ lại theo thông tin bạn vừa để lại. Bạn không cần làm gì thêm.",
      errorBody: "Chưa gửi được yêu cầu. Thử lại hoặc liên hệ trực tiếp:",
    },
  },

  labels: {
    call: "Điện thoại",
    email: "Email",
    office: "Văn phòng",
    entity: "Pháp nhân",
    taxCode: "Mã số thuế",
    parent: "Thành viên của",
  },

  footer: {
    tagline: "Thành viên của nhóm Pebble Square, ký hợp đồng và xuất hoá đơn tại Việt Nam.",
    navTitle: "Các trang",
    contactTitle: "Thông tin liên hệ",
    legalTitle: "Hồ sơ doanh nghiệp",
    statusLegend: "Mỗi số liệu đều mang nhãn đã có hoặc dự kiến",
    disclaimer: "Số liệu về Pebble Square Inc. lấy từ trang chính thức pebble-square.com, đọc ngày 20/08/2026.",
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

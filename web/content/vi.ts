import type { SiteContent } from "./types";

/**
 * VI — the only locale the site ships. Every visible string is an i18n key for
 * now; the prose lands later (CLAUDE.md §3b). Numbers use a decimal comma
 * (17,6 TOPS/W).
 */
export const vi: SiteContent = {
  meta: {
    home: { title: "Pebble Vina — chip AI Analog-PIM của Pebble Square tại Việt Nam", description: "Pebble Vina — thành viên Việt Nam của nhóm Pebble Square Inc., hãng bán dẫn AI fabless Hàn Quốc. Chip tính ngay trong bộ nhớ để AI chạy tại chỗ. MINT đạt 17,6 TOPS/W, sản xuất hàng loạt từ 5/2023." },
    products: { title: "Sản phẩm & giải pháp — chip Edge AI, GPU và AI riêng tư | Pebble Vina", description: "Chip Analog-PIM của Pebble Square: MINT và PAPAYA FLEX đang sản xuất, ESPRESSO dự kiến 9/2026. GPU, AI riêng tư và phần mềm doanh nghiệp do Pebble Vina dựng tại Việt Nam." },
    contact: { title: "Liên hệ Pebble Vina — đặt lịch tư vấn, văn phòng Hà Nội", description: "Pebble Vina — thành viên Việt Nam của nhóm Pebble Square Inc. Văn phòng Hà Nội, MST 0111545175. Gọi 0345 913 369 hoặc email contact@pebblevina.com." },
  },

  nav: {
    home: "Trang chủ",
    products: "Sản phẩm & giải pháp",
    contact: "Liên hệ",
    hardware: "Phần cứng",
    software: "Phần mềm",
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
      kicker: "Danh mục",
      title: "Từ con chip trong cảm biến đến máy chủ AI tại chỗ.",
      lead: "Phần cứng của Pebble Square, phần mềm Pebble Vina — mỗi mục ghi rõ đã có hay dự kiến.",
    },

    hardware: {
      kicker: "01 · Phần cứng",
      title: "Ba con chip Hàn Quốc, một lớp tích hợp tại Việt Nam.",
      lead: "MINT và PAPAYA FLEX đang sản xuất, ESPRESSO dự kiến 9/2026, nhánh GPU do Pebble Vina tích hợp.",
      items: [
        {
          id: "mint",
          name: "MINT",
          tagline: "Analog-PIM · chip Edge AI thế hệ 2",
          body: "Chip suy luận cho cảm biến và thiết bị chạy pin: phép tính chạy ngay trong mảng nhớ. Sản xuất hàng loạt từ 5/2023 — silicon thật, không phải bản mẫu.",
          capabilities: [
            {
              title: "AI cảm biến",
              body: "NDA Home IoT với MEISEI ELECTRIC, 3/2024.",
              media: {
                src: "/media/apps/mint-smart-home-panel.webp",
                alt: "Bảng điều khiển nhà thông minh gắn tường, mặt kính đen viền kim loại, đèn trạng thái xanh lá.",
              },
            },
            {
              title: "AI giọng nói",
              body: "PoC 2/2024: đèn điều khiển bằng giọng nói, kèm chuông gọi khẩn.",
              media: {
                src: "/media/apps/mint-voice-assistant.webp",
                alt: "Loa trợ lý giọng nói hình trụ, vành đèn LED viền trên, chụp trên nền trắng.",
              },
            },
            {
              title: "Edge AI siêu tiết kiệm điện",
              body: "Chạy FCNN, CNN, DNN, RNN ngay trên thiết bị, không cần mạng.",
              media: {
                src: "/media/apps/mint-wearable.webp",
                alt: "Đồng hồ thông minh mặt tròn, dây đeo silicon đen, chụp nghiêng 3/4 trên nền trắng.",
              },
            },
          ],
          specs: [
            {
              value: "17,6",
              unit: "TOPS/W",
              label: "Hiệu suất năng lượng chip MINT",
              note: "Đo trên chip thật: Analog-PIM, khoảng 30 GOPS, die 5×5 mm, sản xuất hàng loạt từ 5/2023.",
              source: "Pebble Square · SmartTimes/JBNU · IR Deck tr.21",
              status: "shipped",
            },
          ],
          media: {
            src: "/media/chips/mint.webp",
            alt: "Chip MINT chụp nghiêng 3/4 trên nền xám trung tính.",
          },
          status: "shipped",
          origin: "ps",
        },
        {
          id: "papaya-flex",
          name: "PAPAYA · PAPAYA FLEX",
          tagline: "Analog-PIM · thị giác máy ở mức miliwatt",
          body: "Số đo của PAPAYA FLEX lấy trên tải thị giác máy, còn PAPAYA ở trạm gốc 5G. Lợi thế là điện và kích thước — huấn luyện mô hình lớn vẫn cần GPU.",
          capabilities: [
            {
              title: "AI thị giác",
              body: "Soi lỗi, đếm, phân loại cho sản xuất và y tế.",
              media: {
                src: "/media/apps/papaya-flex-vision-camera.webp",
                alt: "Camera thị giác máy công nghiệp, ống kính rời, thân nhôm có rãnh tản nhiệt.",
              },
            },
            {
              title: "Camera",
              body: "Suy luận chạy ngay trong camera, hình không rời thiết bị.",
              media: {
                src: "/media/apps/papaya-flex-security-camera.webp",
                alt: "Camera an ninh dạng ống, vòng đèn hồng ngoại quanh ống kính, đế gắn tường.",
              },
            },
            {
              title: "Kiểm tra ngoại quan",
              body: "Bắt lỗi ngay trên chuyền, ở mức điện của một cảm biến.",
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
          specs: [
            {
              value: "~50×",
              label: "Điện năng chip PAPAYA FLEX, thấp hơn NVIDIA Jetson Nano",
              note: "0,1–0,15 W so với 5–10 W của NVIDIA Jetson Nano.",
              source: "Pebble Square IR Deck 05/01/2026 — số do hãng tự công bố",
              status: "shipped",
            },
            {
              value: "~100×",
              label: "Hiệu suất chip PAPAYA FLEX, cao hơn NVIDIA Jetson Nano",
              note: "333–500 so với 3,6–7,2 FPS/W của NVIDIA Jetson Nano, đo trên ResNet-50.",
              source: "Pebble Square IR Deck 05/01/2026 — benchmark của hãng",
              status: "shipped",
            },
            {
              value: "~25×",
              label: "Kích thước chip PAPAYA FLEX, nhỏ hơn NVIDIA Jetson Nano",
              note: "10×10 mm so với 70×45 mm của NVIDIA Jetson Nano.",
              source: "Pebble Square IR Deck 05/01/2026 — kích thước theo hãng",
              status: "shipped",
            },
            {
              value: "~10.000×",
              label: "Điện năng chip PAPAYA cho tác vụ AI tại trạm gốc 5G, thấp hơn NVIDIA L4",
              note: "So với NVIDIA L4: 320–332 W còn 0,03 W. Cho riêng tác vụ AI, không phải cả trạm.",
              source: "Pebble Square IR Deck 05/01/2026",
              status: "shipped",
            },
          ],
          media: {
            src: "/media/chips/papaya-flex.webp",
            alt: "PAPAYA FLEX chụp cùng góc, cùng nền với MINT để so được kích thước.",
          },
          status: "shipped",
          origin: "ps",
        },
        {
          id: "espresso",
          name: "ESPRESSO",
          tagline: "Digital-PIM nền SRAM · dự kiến 9/2026",
          body: "Nhánh Digital-PIM trên SRAM, khác đường Analog-PIM của MINT và PAPAYA FLEX. Chưa bán — nhắm AI PC và thiết bị chạy LLM riêng, số liệu từ tài liệu nhà đầu tư 05/01/2026.",
          capabilities: [
            {
              title: "Suy luận mô hình lớn",
              body: "Chạy LLM nội bộ tới 120 tỷ tham số.",
              media: { src: "/media/apps/espresso-ai-pc.webp", alt: "" },
            },
            {
              title: "Bộ tăng tốc AI",
              body: "Card 4 chip đạt 640 TOPS, giao tiếp PCIe Gen4 ×4.",
              media: { src: "/media/apps/espresso-robot-arm.webp", alt: "" },
            },
            {
              title: "Máy chủ AI / hạ tầng",
              body: "Chip, module M.2, card tăng tốc, máy chủ LLM tại chỗ.",
              media: { src: "/media/apps/espresso-ai-server.webp", alt: "" },
            },
          ],
          specs: [
            {
              value: "160",
              unit: "TOPS",
              label: "Thông lượng ở INT8",
              note: "10 W, 16 TOPS/W · LLM nội bộ tới 120 tỷ tham số.",
              source: "Pebble Square IR Deck 05/01/2026 — chưa có trên trang công khai",
              status: "roadmap",
              statusNote: "Dự kiến 9/2026",
            },
          ],
          media: {
            src: "/media/chips/espresso.webp",
            alt: "Sơ đồ khối kiến trúc Digital-PIM của ESPRESSO — chưa có silicon thật để chụp.",
          },
          status: "roadmap",
          statusNote: "Dự kiến 9/2026 · chưa có trên trang công khai",
          origin: "ps",
        },
        {
          id: "gpu",
          name: "GPU & tính toán hiệu năng cao",
          tagline: "Khi bài toán vượt quá chip edge",
          body: "Chip PIM giải bài toán suy luận tại chỗ, không giải bài toán huấn luyện. Cần huấn luyện hay suy luận quy mô lớn thì Pebble Vina dựng cụm GPU cho bạn.",
          capabilities: [
            { title: "Sản phẩm GPU", body: "Chọn cấu hình theo tải thật: huấn luyện, suy luận, hay cả hai." },
            { title: "Huấn luyện AI", body: "Huấn luyện và tinh chỉnh trên hạ tầng của bạn." },
            { title: "Suy luận quy mô lớn", body: "Nhiều người dùng, mô hình lớn, chạy đồng thời." },
            { title: "HPC", body: "Mô phỏng và tính toán khoa học dùng chung cụm với AI." },
            { title: "Trung tâm dữ liệu AI", body: "Tính toán, mạng, điện, làm mát — từ một tủ rack trở lên." },
          ],
          specs: [],
          media: { alt: "Tủ rack GPU trong phòng máy, chụp chính diện, ánh sáng nguội." },
          status: "shipped",
          origin: "pv",
        },
      ],
    },

    software: {
      kicker: "02 · Phần mềm",
      title: "Hai nhánh phần mềm do Pebble Vina dựng tại Việt Nam.",
      lead: "Cả hai trả lời một câu hỏi: mô hình đặt ở đâu, dữ liệu có phải rời công ty không.",
      groups: [
        {
          id: "enterprise",
          name: "Phần mềm doanh nghiệp",
          tagline: "CRM, ERP · mô hình đặt tại chỗ",
          body: "CRM và ERP nào cũng gắn thêm được AI. Khác biệt ở đây: mô hình đặt tại chỗ, dữ liệu khách hàng không phải gửi ra ngoài.",
          modules: [
            { title: "CRM", body: "Khách hàng, cơ hội và lịch sử trao đổi nằm chung một chỗ." },
            { title: "ERP / Vận hành", body: "Đơn hàng, kho, mua sắm trên cùng một luồng số liệu." },
            { title: "Quy trình", body: "Duyệt, giao việc, nhắc hạn theo cách công ty đang chạy." },
            { title: "Dữ liệu & báo cáo", body: "Gom số từ các phân hệ thành báo cáo, không phải ghép tay." },
            { title: "Trợ lý AI / gợi ý hành động kế tiếp", body: "Gợi ý việc nên làm tiếp, dựa trên dữ liệu trong hệ thống." },
          ],
          media: { alt: "Ảnh chụp màn hình phần mềm doanh nghiệp trong khung trình duyệt tối giản." },
          origin: "pv",
        },
      ],
    },
  },

  contact: {
    intro: {
      kicker: "Bắt đầu ngay",
      title: "Kể bài toán của bạn, chúng ta xem giải được tới đâu.",
      lead: "Gửi form đi, trong vòng 24 giờ một người của Pebble Vina sẽ đọc và trả lời bạn. Cảm ơn bạn đã quan tâm — chúng tôi mong được làm việc cùng doanh nghiệp của bạn.",
    },
    ctaPrimary: "Mở email đã điền sẵn",
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
      successTitle: "Thư đã soạn sẵn trong ứng dụng mail của bạn",
      successBody: "Bấm gửi trong cửa sổ vừa mở thì yêu cầu mới tới chỗ chúng tôi — trước đó chưa có gì rời máy bạn. Nếu không có cửa sổ nào mở ra, dùng email hoặc số điện thoại ngay bên dưới.",
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
    applications: "Ứng dụng",
    imagePending: "Ảnh đang chờ",
  },

  status: { shipped: "Đã có", roadmap: "Dự kiến" },
  origin: { ps: "Của Pebble Square", pv: "Của Pebble Vina" },
};

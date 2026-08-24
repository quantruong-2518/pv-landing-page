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
      slogan: "PEBBLE VINA - Đối tác chiến lược đưa AI và công nghệ mới vào doanh nghiệp",
      lead: "Từ thế mạnh thiết kế chip, Pebble Vina nghiên cứu nhu cầu thị trường và phát triển phần mềm kết nối nhiều luồng công việc. Chúng tôi đi cùng doanh nghiệp qua từng bước: thực nghiệm, xây dựng lộ trình, đào tạo đội ngũ và đưa AI vào vận hành.",
      ctaPrimary: "Khám phá năng lực",
      ctaSecondary: "Trao đổi bài toán",
      media: {
        src: "/brand/pebble-vina-decorator.png",
        // Decorative brand mark — alt stays empty by design (context/media-plan.md).
        alt: "",
      },
    },

    whyNow: {
      kicker: "01 · Cái khó nằm ở đâu",
      title: "Muốn giữ AI trong nhà, cái vướng đầu tiên là điện.",
      lead: "",
      points: [
        {
          title: "Trung tâm dữ liệu đã ngốn khoảng 2% điện toàn cầu",
          body: "Cộng thêm khoảng 300.000 gallon nước mỗi ngày để làm mát. Đây là số của ngành, không phải số đo của Pebble Square.",
          media: {
            src: "/media/why-now-1-mobile.webp",
            srcWide: "/media/why-now-1-desktop.webp",
            alt: "Minh hoạ một trung tâm dữ liệu đấu vào lưới điện và hệ làm mát bằng nước, bên cạnh là quả cầu ghi 2%.",
          },
        },
        {
          title: "Chỗ cần AI nhất lại là chỗ không có điện dư",
          body: "Trạm biến áp, dây chuyền sản xuất, tủ điện trong nhà xưởng, cảm biến chạy pin. Ngân sách điện ở những chỗ đó tính bằng miliwatt, không phải bằng watt.",
          media: {
            src: "/media/why-now-2-mobile.webp",
            srcWide: "/media/why-now-2-desktop.webp",
            alt: "Minh hoạ một lõi AI ở giữa. Quanh nó là trạm biến áp, tấm pin mặt trời, cánh tay robot và cảm biến, mỗi thứ ghi rõ mức điện tính bằng mW.",
          },
        },
        {
          title: "Điện tốn vào việc khiêng dữ liệu, không phải vào việc tính",
          body: "Máy tính thường để bộ nhớ một nơi, bộ xử lý một nơi. Dữ liệu phải chạy đi chạy lại giữa hai chỗ, và chính quãng đường đó mới ngốn điện. Chip của Pebble Square tính ngay trong mảng nhớ, nên không còn quãng đường ấy.",
          media: {
            src: "/media/why-now-3-mobile.webp",
            srcWide: "/media/why-now-3-desktop.webp",
            alt: "Sơ đồ so sánh: bên trái là bus dữ liệu dày nối chip với bộ nhớ rời, bên phải là mảng crossbar tính ngay trong bộ nhớ. Hai thanh bên dưới đo điện năng của mỗi bên.",
          },
        },
      ],
      pillarsTitle: "Bốn thứ Pebble Square nhắm tới khi thiết kế",
      pillars: [
        { title: "Riêng tư", body: "Suy luận chạy xong ngay trên thiết bị. Dữ liệu không phải gửi ra ngoài." },
        { title: "Điện năng thấp", body: "Phép tính chạy ngay trong mảng nhớ, dữ liệu không phải di chuyển." },
        { title: "Phản ứng nhanh", body: "Quyết định ngay tại nơi sự việc xảy ra, không chờ mạng trả lời." },
        { title: "Chi phí một lần", body: "Mua phần cứng một lần, thay vì trả tiền suy luận theo tháng." },
      ],
    },

    history: {
      kicker: "02 · Hồ sơ công ty mẹ",
      title: "Từ phòng thí nghiệm 2021 đến sản xuất hàng loạt 2023",
      lead: "Hồ sơ dưới đây là của Pebble Square Inc., hãng bán dẫn AI fabless ở Seongnam, Hàn Quốc — không phải của Pebble Vina. Toàn bộ lấy từ trang công bố của chính họ, ai cũng tra lại được.",
      milestones: [
        { date: "09/2021", title: "Thành lập Pebble Square Inc. tại Seongnam", body: "", status: "shipped" },
        { date: "11/2021", title: "MOCHA — chip edge AI PIM thế hệ 1, kèm trung tâm nghiên cứu riêng", body: "", status: "shipped" },
        { date: "07/2022", title: "MOU nghiên cứu chung với KAIST và ĐH Quốc gia Chonbuk", body: "", status: "shipped" },
        { date: "10/2022", title: "Chứng nhận doanh nghiệp mạo hiểm", body: "", status: "shipped" },
        { date: "12/2022", title: "MINT — hoàn tất phát triển bán dẫn AI PIM thế hệ 2", body: "", status: "shipped" },
        { date: "03/2023", title: "Ký NDA với SK hynix", body: "", status: "shipped", starred: true },
        { date: "05/2023", title: "MINT vào sản xuất hàng loạt", body: "Con chip tính ngay trong bộ nhớ, đo được 17,6 TOPS/W.", status: "shipped", starred: true },
        { date: "01/2024", title: "Đăng ký bằng sáng chế thiết bị neuromorphic", body: "", status: "shipped" },
        { date: "02/2024", title: "PoC trên MINT — đèn nhận diện giọng nói kèm chuông khẩn cấp", body: "", status: "shipped" },
        { date: "03/2024", title: "Liên doanh Cluster AI Lab tại Ả Rập Xê Út · NDA Home IoT với MEISEI ELECTRIC", body: "", status: "shipped", starred: true },
        { date: "03/2025", title: "UTC Investment rót 2 tỷ KRW", body: "", status: "shipped" },
        { date: "05/2025", title: "Lập Pebble Square Japan, Inc. tại Tokyo", body: "", status: "shipped", starred: true },
        { date: "08/2025", title: "Đóng vòng gọi vốn Pre-A", body: "", status: "shipped" },
        { date: "10/2025", title: "Được chọn vào KPAS 2025 — Korea Promising AI Startups", body: "", status: "shipped" },
        { date: "09/2026", title: "ESPRESSO — AI SoC Digital-PIM 160 TOPS", body: "", status: "roadmap", statusNote: "Tài liệu nhà đầu tư · dự kiến 9/2026" },
      ],
      footnote: "Lịch sử công ty lấy từ trang công bố của chính Pebble Square, đọc ngày 20/08/2026. Riêng mục 9/2026 lấy từ tài liệu nhà đầu tư ngày 05/01/2026 và không có trong danh mục sản phẩm công khai của họ.",
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

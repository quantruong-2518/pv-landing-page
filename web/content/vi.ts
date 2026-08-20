import type { SiteContent } from "./types";

/**
 * VI — full parallel version of `en.ts` (canonical). Same structure, same facts;
 * numbers use a decimal comma (17,6). Changing a fact here means changing `en.ts` too.
 */
export const vi: SiteContent = {
  locale: "vi",
  alternateLabel: "EN",

  meta: {
    home: {
      title: "Pebble Vina — Edge AI Analog-PIM, từ Seongnam về Việt Nam",
      description:
        "Pebble Vina là thành viên Việt Nam của Pebble Square Inc. — công ty bán dẫn fabless Hàn Quốc với chip Analog-PIM tính toán ngay trong bộ nhớ: hiệu năng AI đầy đủ trên một phần nhỏ điện năng, không gửi gì lên đám mây. Chip đã sản xuất hàng loạt từ 2023.",
    },
    products: {
      title: "Sản phẩm & giải pháp — Pebble Vina",
      description:
        "Phần cứng: chip Analog-PIM MINT và PAPAYA FLEX đã sản xuất, AI SoC ESPRESSO trong lộ trình, và hạ tầng GPU. Phần mềm: hệ thống doanh nghiệp tối ưu bằng AI và AI riêng tư triển khai trên thiết bị, tại biên, hoặc trong trung tâm dữ liệu của chính bạn.",
    },
    contact: {
      title: "Liên hệ — Pebble Vina",
      description:
        "Đặt lịch tư vấn 30 phút với Pebble Vina, Landmark 72 Tower, Hà Nội. CÔNG TY TNHH PEBBLE VINA, mã số thuế 0111545175 — thành viên Việt Nam của nhóm Pebble Square.",
    },
  },

  nav: {
    home: "Trang chủ",
    products: "Sản phẩm & giải pháp",
    contact: "Liên hệ",
    hardware: "Phần cứng",
    software: "Phần mềm",
    cta: "Đặt lịch tư vấn",
    menuLabel: "Mục lục",
    skipToContent: "Tới nội dung chính",
  },

  home: {
    hero: {
      eyebrow: "Pebble Vina · thành viên Việt Nam của nhóm Pebble Square",
      slogan: "Thế giới muốn nhiều AI hơn lượng điện nó có",
      lead: "",
      ctaPrimary: "Đặt lịch tư vấn 30 phút",
      ctaSecondary: "Xem sản phẩm",
      scrollHint: "Vì sao là lúc này",
      media: {
        alt: "Chip MINT trên board phát triển, đánh sáng chếch một bên trên nền tối",
      },
    },

    whyNow: {
      kicker: "01 — Vì sao là lúc này",
      title: "Hiệu năng không còn là phần khó. Điện năng mới là.",
      lead: "",
      points: [
        { title: "Trung tâm dữ liệu đã ngốn khoảng 2% điện toàn cầu", body: "" },
        { title: "Công việc đang dịch về nơi không có điện dư", body: "" },
        { title: "Phần lớn điện năng dùng để khiêng dữ liệu, không phải để tính", body: "" },
      ],
      pillarsTitle: "Bốn tính chất Pebble Square thiết kế để đạt",
      pillars: [
        { title: "Điện năng thấp", body: "" },
        { title: "Riêng tư", body: "" },
        { title: "Nhanh", body: "" },
        { title: "Chi phí thấp", body: "" },
      ],
      media: {
        alt: "Sơ đồ: bộ xử lý thông thường khiêng dữ liệu qua đường truyền, đặt cạnh mảng crossbar tính ngay trong bộ nhớ",
      },
    },

    history: {
      kicker: "02 — Lịch sử hình thành",
      title: "Toàn bộ những gì Pebble Square đã ghi vào hồ sơ",
      lead: "",
      milestones: [
        { date: "09/2021", title: "Thành lập Pebble Square Inc. tại Seongnam", body: "", status: "shipped" },
        { date: "11/2021", title: "MOCHA — chip edge AI PIM thế hệ 1; lập trung tâm nghiên cứu doanh nghiệp", body: "", status: "shipped" },
        { date: "07/2022", title: "MOU nghiên cứu chung với KAIST và ĐH Quốc gia Chonbuk", body: "", status: "shipped" },
        { date: "10/2022", title: "Chứng nhận doanh nghiệp mạo hiểm", body: "", status: "shipped" },
        { date: "12/2022", title: "MINT — phát triển bán dẫn AI PIM thế hệ 2", body: "", status: "shipped" },
        { date: "03/2023", title: "Ký NDA với SK hynix", body: "", status: "shipped", starred: true },
        { date: "05/2023", title: "MINT vào sản xuất hàng loạt", body: "", status: "shipped", starred: true },
        { date: "01/2024", title: "Đăng ký bằng sáng chế thiết bị neuromorphic", body: "", status: "shipped" },
        { date: "02/2024", title: "PoC trên MINT — hệ đèn điều khiển giọng nói kèm chuông khẩn cấp", body: "", status: "shipped" },
        { date: "03/2024", title: "Liên doanh Cluster AI Lab tại Ả Rập Xê Út · NDA Home IoT với MEISEI ELECTRIC", body: "", status: "shipped", starred: true },
        { date: "03/2025", title: "UTC Investment rót 2 tỷ KRW", body: "", status: "shipped" },
        { date: "05/2025", title: "Lập Pebble Square Japan, Inc. tại Tokyo", body: "", status: "shipped", starred: true },
        { date: "08/2025", title: "Đóng vòng Pre-A", body: "", status: "shipped" },
        { date: "10/2025", title: "Được chọn KPAS 2025 — Korea Promising AI Startups", body: "", status: "shipped" },
        { date: "09/2026", title: "ESPRESSO — AI SoC Digital-PIM 160 TOPS", body: "", status: "roadmap", statusNote: "Tài liệu nhà đầu tư" },
      ],
      footnote:
        "Lịch sử công ty theo công bố của Pebble Square (đọc 20/08/2026). Mục 9/2026 lấy từ IR Deck ngày 05/01/2026 và không có trong danh mục sản phẩm công khai.",
    },
  },

  products: {
    intro: {
      kicker: "Sản phẩm & giải pháp",
      title: "Chip, hệ thống, và phần mềm bên trên",
      lead: "",
    },

    hardware: {
      kicker: "2.1 — Phần cứng",
      title: "Từ cảm biến vài miliwatt tới trung tâm dữ liệu",
      lead: "",
      items: [
        {
          id: "mint",
          name: "MINT",
          tagline: "Analog-PIM · chip edge AI thế hệ 2",
          body: "",
          capabilities: [
            { title: "AI cảm biến", body: "" },
            { title: "AI giọng nói", body: "" },
            { title: "Edge AI siêu tiết kiệm điện", body: "" },
          ],
          specs: [
            {
              value: "17,6",
              unit: "TOPS/W",
              label: "Hiệu suất năng lượng",
              note: "Analog-PIM, ~30 GOPS, die 5×5 mm. Đo trên chip thật, sản xuất hàng loạt từ 5/2023.",
              source: "Pebble Square · SmartTimes/JBNU · IR Deck tr.21",
              status: "shipped",
            },
          ],
          media: { alt: "Chip MINT chụp thẳng trên nền xám trung tính" },
          status: "shipped",
          origin: "ps",
        },
        {
          id: "papaya",
          name: "PAPAYA FLEX",
          tagline: "Analog-PIM · thị giác máy ở mức miliwatt",
          body: "",
          capabilities: [
            { title: "AI thị giác", body: "" },
            { title: "Camera", body: "" },
            { title: "Kiểm tra ngoại quan", body: "" },
            { title: "Robot", body: "" },
          ],
          specs: [
            {
              value: "~50×",
              label: "Điện năng thấp hơn NVIDIA Jetson Nano",
              note: "PAPAYA FLEX 0,1–0,15 W so với 5–10 W, trên cùng loại tải thị giác máy (ResNet-50).",
              source: "IR Deck Pebble Square 05/01/2026",
              status: "shipped",
            },
            {
              value: "~10.000×",
              label: "Ít điện hơn cho tác vụ AI tại trạm gốc 5G",
              note: "PAPAYA so với NVIDIA L4: 320–332 W còn 0,03 W. Cho riêng tác vụ AI, không phải cả trạm.",
              source: "IR Deck Pebble Square 05/01/2026",
              status: "shipped",
            },
          ],
          media: { alt: "PAPAYA FLEX chụp cùng setup với MINT, cùng góc và cùng nền" },
          status: "shipped",
          origin: "ps",
        },
        {
          id: "espresso",
          name: "ESPRESSO",
          tagline: "Digital-PIM nền SRAM · tải nặng và LLM riêng",
          body: "",
          capabilities: [
            { title: "Suy luận mô hình lớn", body: "" },
            { title: "Bộ tăng tốc AI", body: "" },
            { title: "Máy chủ AI / hạ tầng", body: "" },
          ],
          specs: [
            {
              value: "160",
              unit: "TOPS",
              label: "AI SoC @INT8",
              note: "10 W, 16 TOPS/W. Card 4 chip đạt 640 TOPS. Chạy LLM nội bộ tới 120 tỷ tham số.",
              source: "IR Deck Pebble Square 05/01/2026",
              status: "roadmap",
              statusNote: "Dự kiến 9/2026",
            },
          ],
          media: { alt: "Sơ đồ khối kiến trúc ESPRESSO — chưa có ảnh sản phẩm thật" },
          status: "roadmap",
          statusNote: "Dự kiến 9/2026 · tài liệu nhà đầu tư",
          origin: "ps",
        },
        {
          id: "gpu",
          name: "GPU & tính toán hiệu năng cao",
          tagline: "Lớp tích hợp của Pebble Vina · phần cứng thương mại",
          body: "",
          capabilities: [
            { title: "Sản phẩm GPU", body: "" },
            { title: "Huấn luyện AI", body: "" },
            { title: "Suy luận quy mô lớn", body: "" },
            { title: "HPC", body: "" },
            { title: "Trung tâm dữ liệu AI", body: "" },
          ],
          specs: [],
          media: { alt: "Dãy máy chủ GPU trong phòng máy, chụp dọc lối lạnh" },
          status: "shipped",
          origin: "pv",
        },
      ],
    },

    software: {
      kicker: "2.2 — Phần mềm",
      title: "Mô hình ở lại trong nhà bạn",
      lead: "",
      groups: [
        {
          id: "enterprise",
          name: "Phần mềm doanh nghiệp tối ưu bằng AI",
          tagline: "Hệ thống lõi, dựng lại quanh mô hình",
          body: "",
          modules: [
            { title: "CRM", body: "" },
            { title: "ERP / vận hành", body: "" },
            { title: "Quy trình", body: "" },
            { title: "Dữ liệu & báo cáo", body: "" },
            { title: "Trợ lý AI / hành động kế tiếp tốt nhất", body: "" },
          ],
          media: { alt: "Ảnh chụp màn hình bảng điều khiển vận hành trong khung trình duyệt tối giản" },
          origin: "pv",
        },
        {
          id: "private-ai",
          name: "AI riêng tư",
          tagline: "Mô hình của bạn, dữ liệu của bạn, hạ tầng của bạn",
          body: "",
          modules: [
            { title: "Xây dựng", body: "" },
            { title: "Huấn luyện / tinh chỉnh", body: "" },
            { title: "Triển khai", body: "" },
          ],
          targetsTitle: "Đích triển khai",
          targets: [
            { title: "Trên thiết bị", body: "" },
            { title: "Biên", body: "" },
            { title: "Tại chỗ", body: "" },
            { title: "Đám mây riêng", body: "" },
            { title: "Hạ tầng GPU / AI", body: "" },
          ],
          media: { alt: "Sơ đồ năm đích triển khai xếp theo thang điện năng, kèm phần cứng đứng sau mỗi bậc" },
          origin: "pv",
        },
      ],
    },
  },

  contact: {
    intro: {
      kicker: "03 — Liên hệ",
      title: "Ba mươi phút, một câu trả lời thẳng",
      lead: "",
    },
    ctaPrimary: "Đặt lịch tư vấn 30 phút",
    ctaSecondary: "Gửi email trực tiếp",
    media: { alt: "Văn phòng Pebble Vina tầng 19 toà Landmark 72, Hà Nội" },
  },

  labels: {
    call: "Gọi",
    email: "Email",
    office: "Văn phòng",
    entity: "Pháp nhân",
    taxCode: "Mã số thuế",
    parent: "Công ty mẹ",
  },

  footer: {
    tagline: "Thành viên Việt Nam của nhóm Pebble Square.",
    navTitle: "Trang",
    contactTitle: "Liên hệ",
    legalTitle: "Pháp lý",
    statusLegend: "Nhãn: xanh = đã có · vàng = lộ trình",
    disclaimer:
      "Thông tin về Pebble Square Inc. lấy từ tài liệu họ công bố (pebble-square.com, đọc 20/08/2026) và từ IR Deck ngày 05/01/2026. Các mục gắn nhãn lộ trình chưa sẵn sàng thương mại tại thời điểm đăng.",
    copyright: "© 2026 CÔNG TY TNHH PEBBLE VINA",
  },

  ui: {
    specs: "Số đo",
    source: "Nguồn",
    imagePending: "Chờ ảnh",
  },

  status: { shipped: "Đã có", roadmap: "Lộ trình" },
  origin: { ps: "Pebble Square", pv: "Pebble Vina" },
};

import type { SiteContent } from "./types";

/**
 * VI — the only locale the site ships. Every visible string is an i18n key for
 * now; the prose lands later (CLAUDE.md §3b). Numbers use a decimal comma
 * (17,6 TOPS/W).
 */
export const vi: SiteContent = {
  meta: {
    home: { title: "Pebble Vina — chip AI Analog-PIM của Pebble Square tại Việt Nam", description: "Pebble Vina là thành viên Việt Nam của nhóm Pebble Square Inc., hãng bán dẫn AI fabless Hàn Quốc. Chip MINT đạt 17,6 TOPS/W, sản xuất hàng loạt từ 5/2023." },
    products: { title: "meta.products.title", description: "meta.products.description" },
    contact: { title: "meta.contact.title", description: "meta.contact.description" },
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
      eyebrow: "Thành viên Việt Nam của nhóm Pebble Square Inc., Hàn Quốc",
      slogan: "Từ con chip đến phần mềm, cho AI của riêng bạn.",
      lead: "Pebble Square Inc. làm chip AI đặt luôn phép tính vào trong bộ nhớ. Con chip MINT của họ chạy ở mức 17,6 TOPS/W và đã sản xuất hàng loạt từ 5/2023. Phần việc ở Việt Nam là của Pebble Vina: hạ tầng GPU để huấn luyện, phần mềm doanh nghiệp, và hợp đồng ký trong nước.",
      ctaPrimary: "Đặt lịch tư vấn",
      ctaSecondary: "Xem sản phẩm",
      media: {
        src: "/brand/pebble-vina-decorator.png",
        // Decorative brand mark — alt stays empty by design (context/media-plan.md).
        alt: "",
      },
    },

    whyNow: {
      kicker: "01 · Vì sao là bây giờ",
      title: "Cái khó bây giờ không phải hiệu năng, mà là điện.",
      lead: "",
      points: [
        {
          title: "Trung tâm dữ liệu đã ngốn khoảng 2% điện toàn cầu",
          body: "Chưa kể khoảng 300.000 gallon nước mỗi ngày để làm mát.",
          media: {
            src: "/media/why-now-1-mobile.webp",
            srcWide: "/media/why-now-1-desktop.webp",
            alt: "Minh hoạ một trung tâm dữ liệu đấu vào lưới điện và hệ làm mát bằng nước, bên cạnh là quả cầu ghi 2%.",
          },
        },
        {
          title: "AI đang chuyển xuống nơi không dư lấy một watt",
          body: "Trạm biến áp, dàn pin mặt trời, dây chuyền, thiết bị đeo, cảm biến chạy pin. Những chỗ này chỉ dư vài trăm miliwatt, không phải vài trăm watt.",
          media: {
            src: "/media/why-now-2-mobile.webp",
            srcWide: "/media/why-now-2-desktop.webp",
            alt: "Minh hoạ một lõi AI ở giữa. Quanh nó là trạm biến áp, tấm pin mặt trời, cánh tay robot và cảm biến, mỗi thứ ghi rõ mức điện tính bằng mW.",
          },
        },
        {
          title: "Điện chủ yếu tốn vào việc khiêng dữ liệu, không phải để tính",
          body: "Kiến trúc von Neumann để bộ nhớ một nơi, bộ xử lý một nơi, nên phần lớn điện đổ vào quãng đi lại giữa hai chỗ. Processing-In-Memory tính ngay trong bộ nhớ, khỏi phải đi đâu cả.",
          media: {
            src: "/media/why-now-3-mobile.webp",
            srcWide: "/media/why-now-3-desktop.webp",
            alt: "Sơ đồ so sánh: bên trái là bus dữ liệu dày nối chip với bộ nhớ rời, bên phải là mảng crossbar tính ngay trong bộ nhớ. Hai thanh bên dưới đo điện năng của mỗi bên.",
          },
        },
      ],
      pillarsTitle: "Bốn thứ Pebble Square nhắm tới khi thiết kế",
      pillars: [
        { title: "Điện năng thấp", body: "Phép tính chạy analog ngay trong flash nhúng, không qua đường truyền." },
        { title: "Riêng tư", body: "Suy luận trên thiết bị, không phụ thuộc đám mây." },
        { title: "Nhanh", body: "Quyết định ngay nơi sự kiện xảy ra, không chờ đường truyền." },
        { title: "Chi phí thấp", body: "Phần cứng mua một lần, thay vì thuê suy luận theo tháng." },
      ],
    },

    history: {
      kicker: "02 · Lịch sử hình thành",
      title: "Từ phòng thí nghiệm 2021 đến sản xuất hàng loạt 2023",
      lead: "Bán dẫn AI fabless, chuyên Edge AI, đặt tại Seongnam. Ba trong bốn lãnh đạo kỹ thuật có bằng tiến sĩ Đại học Tokyo.",
      milestones: [
        { date: "09/2021", title: "Thành lập Pebble Square Inc. tại Seongnam", body: "", status: "shipped" },
        { date: "11/2021", title: "MOCHA — chip edge AI PIM thế hệ 1, kèm trung tâm nghiên cứu riêng", body: "", status: "shipped" },
        { date: "07/2022", title: "MOU nghiên cứu chung với KAIST và ĐH Quốc gia Chonbuk", body: "", status: "shipped" },
        { date: "10/2022", title: "Chứng nhận doanh nghiệp mạo hiểm", body: "", status: "shipped" },
        { date: "12/2022", title: "MINT — hoàn tất phát triển bán dẫn AI PIM thế hệ 2", body: "", status: "shipped" },
        { date: "03/2023", title: "Ký NDA với SK hynix", body: "", status: "shipped", starred: true },
        { date: "05/2023", title: "MINT vào sản xuất hàng loạt", body: "Analog-PIM, die 5 × 5 mm², khoảng 30 GOPS, hiệu suất 17,6 TOPS/W.", status: "shipped", starred: true },
        { date: "01/2024", title: "Đăng ký bằng sáng chế thiết bị neuromorphic", body: "", status: "shipped" },
        { date: "02/2024", title: "PoC trên MINT — đèn nhận diện giọng nói kèm chuông khẩn cấp", body: "", status: "shipped" },
        { date: "03/2024", title: "Liên doanh Cluster AI Lab tại Ả Rập Xê Út · NDA Home IoT với MEISEI ELECTRIC", body: "", status: "shipped", starred: true },
        { date: "03/2025", title: "UTC Investment rót 2 tỷ KRW", body: "", status: "shipped" },
        { date: "05/2025", title: "Lập Pebble Square Japan, Inc. tại Tokyo", body: "", status: "shipped", starred: true },
        { date: "08/2025", title: "Đóng vòng gọi vốn Pre-A", body: "", status: "shipped" },
        { date: "10/2025", title: "Được chọn vào KPAS 2025 — Korea Promising AI Startups", body: "", status: "shipped" },
        { date: "09/2026", title: "ESPRESSO — AI SoC Digital-PIM 160 TOPS", body: "", status: "roadmap", statusNote: "Tài liệu nhà đầu tư · dự kiến 9/2026" },
      ],
      footnote: "Lịch sử công ty theo công bố của chính Pebble Square, đọc ngày 20/08/2026. Mục 9/2026 lấy từ IR Deck ngày 05/01/2026 và không có trong danh mục sản phẩm công khai của họ.",
    },
  },

  products: {
    intro: {
      kicker: "products.intro.kicker",
      title: "products.intro.title",
      lead: "products.intro.lead",
    },

    hardware: {
      kicker: "products.hardware.kicker",
      title: "products.hardware.title",
      lead: "products.hardware.lead",
      items: [
        {
          id: "mint",
          name: "products.hardware.items[0].name",
          tagline: "products.hardware.items[0].tagline",
          body: "products.hardware.items[0].body",
          capabilities: [
            { title: "products.hardware.items[0].capabilities[0].title", body: "products.hardware.items[0].capabilities[0].body" },
            { title: "products.hardware.items[0].capabilities[1].title", body: "products.hardware.items[0].capabilities[1].body" },
            { title: "products.hardware.items[0].capabilities[2].title", body: "products.hardware.items[0].capabilities[2].body" },
          ],
          specs: [
            {
              value: "products.hardware.items[0].specs[0].value",
              unit: "products.hardware.items[0].specs[0].unit",
              label: "products.hardware.items[0].specs[0].label",
              note: "products.hardware.items[0].specs[0].note",
              source: "products.hardware.items[0].specs[0].source",
              status: "shipped",
            },
          ],
          media: { alt: "products.hardware.items[0].media.alt" },
          status: "shipped",
          origin: "ps",
        },
        {
          id: "papaya",
          name: "products.hardware.items[1].name",
          tagline: "products.hardware.items[1].tagline",
          body: "products.hardware.items[1].body",
          capabilities: [
            { title: "products.hardware.items[1].capabilities[0].title", body: "products.hardware.items[1].capabilities[0].body" },
            { title: "products.hardware.items[1].capabilities[1].title", body: "products.hardware.items[1].capabilities[1].body" },
            { title: "products.hardware.items[1].capabilities[2].title", body: "products.hardware.items[1].capabilities[2].body" },
            { title: "products.hardware.items[1].capabilities[3].title", body: "products.hardware.items[1].capabilities[3].body" },
          ],
          specs: [
            {
              value: "products.hardware.items[1].specs[0].value",
              label: "products.hardware.items[1].specs[0].label",
              note: "products.hardware.items[1].specs[0].note",
              source: "products.hardware.items[1].specs[0].source",
              status: "shipped",
            },
            {
              value: "products.hardware.items[1].specs[1].value",
              label: "products.hardware.items[1].specs[1].label",
              note: "products.hardware.items[1].specs[1].note",
              source: "products.hardware.items[1].specs[1].source",
              status: "shipped",
            },
          ],
          media: { alt: "products.hardware.items[1].media.alt" },
          status: "shipped",
          origin: "ps",
        },
        {
          id: "espresso",
          name: "products.hardware.items[2].name",
          tagline: "products.hardware.items[2].tagline",
          body: "products.hardware.items[2].body",
          capabilities: [
            { title: "products.hardware.items[2].capabilities[0].title", body: "products.hardware.items[2].capabilities[0].body" },
            { title: "products.hardware.items[2].capabilities[1].title", body: "products.hardware.items[2].capabilities[1].body" },
            { title: "products.hardware.items[2].capabilities[2].title", body: "products.hardware.items[2].capabilities[2].body" },
          ],
          specs: [
            {
              value: "products.hardware.items[2].specs[0].value",
              unit: "products.hardware.items[2].specs[0].unit",
              label: "products.hardware.items[2].specs[0].label",
              note: "products.hardware.items[2].specs[0].note",
              source: "products.hardware.items[2].specs[0].source",
              status: "roadmap",
              statusNote: "products.hardware.items[2].specs[0].statusNote",
            },
          ],
          media: { alt: "products.hardware.items[2].media.alt" },
          status: "roadmap",
          statusNote: "products.hardware.items[2].statusNote",
          origin: "ps",
        },
        {
          id: "gpu",
          name: "products.hardware.items[3].name",
          tagline: "products.hardware.items[3].tagline",
          body: "products.hardware.items[3].body",
          capabilities: [
            { title: "products.hardware.items[3].capabilities[0].title", body: "products.hardware.items[3].capabilities[0].body" },
            { title: "products.hardware.items[3].capabilities[1].title", body: "products.hardware.items[3].capabilities[1].body" },
            { title: "products.hardware.items[3].capabilities[2].title", body: "products.hardware.items[3].capabilities[2].body" },
            { title: "products.hardware.items[3].capabilities[3].title", body: "products.hardware.items[3].capabilities[3].body" },
            { title: "products.hardware.items[3].capabilities[4].title", body: "products.hardware.items[3].capabilities[4].body" },
          ],
          specs: [],
          media: { alt: "products.hardware.items[3].media.alt" },
          status: "shipped",
          origin: "pv",
        },
      ],
    },

    software: {
      kicker: "products.software.kicker",
      title: "products.software.title",
      lead: "products.software.lead",
      groups: [
        {
          id: "enterprise",
          name: "products.software.groups[0].name",
          tagline: "products.software.groups[0].tagline",
          body: "products.software.groups[0].body",
          modules: [
            { title: "products.software.groups[0].modules[0].title", body: "products.software.groups[0].modules[0].body" },
            { title: "products.software.groups[0].modules[1].title", body: "products.software.groups[0].modules[1].body" },
            { title: "products.software.groups[0].modules[2].title", body: "products.software.groups[0].modules[2].body" },
            { title: "products.software.groups[0].modules[3].title", body: "products.software.groups[0].modules[3].body" },
            { title: "products.software.groups[0].modules[4].title", body: "products.software.groups[0].modules[4].body" },
          ],
          media: { alt: "products.software.groups[0].media.alt" },
          origin: "pv",
        },
        {
          id: "private-ai",
          name: "products.software.groups[1].name",
          tagline: "products.software.groups[1].tagline",
          body: "products.software.groups[1].body",
          modules: [
            { title: "products.software.groups[1].modules[0].title", body: "products.software.groups[1].modules[0].body" },
            { title: "products.software.groups[1].modules[1].title", body: "products.software.groups[1].modules[1].body" },
            { title: "products.software.groups[1].modules[2].title", body: "products.software.groups[1].modules[2].body" },
          ],
          targetsTitle: "products.software.groups[1].targetsTitle",
          targets: [
            { title: "products.software.groups[1].targets[0].title", body: "products.software.groups[1].targets[0].body" },
            { title: "products.software.groups[1].targets[1].title", body: "products.software.groups[1].targets[1].body" },
            { title: "products.software.groups[1].targets[2].title", body: "products.software.groups[1].targets[2].body" },
            { title: "products.software.groups[1].targets[3].title", body: "products.software.groups[1].targets[3].body" },
            { title: "products.software.groups[1].targets[4].title", body: "products.software.groups[1].targets[4].body" },
          ],
          media: { alt: "products.software.groups[1].media.alt" },
          origin: "pv",
        },
      ],
    },
  },

  contact: {
    intro: {
      kicker: "contact.intro.kicker",
      title: "contact.intro.title",
      lead: "contact.intro.lead",
    },
    ctaPrimary: "contact.ctaPrimary",
    media: { alt: "contact.media.alt" },
    form: {
      title: "contact.form.title",
      nameLabel: "contact.form.nameLabel",
      companyLabel: "contact.form.companyLabel",
      emailLabel: "contact.form.emailLabel",
      phoneLabel: "contact.form.phoneLabel",
      messageLabel: "contact.form.messageLabel",
      messagePlaceholder: "contact.form.messagePlaceholder",
      optionalLabel: "contact.form.optionalLabel",
      requiredNote: "contact.form.requiredNote",
      successTitle: "contact.form.successTitle",
      successBody: "contact.form.successBody",
    },
  },

  labels: {
    call: "Điện thoại",
    email: "Email",
    office: "Văn phòng",
    entity: "Pháp nhân",
    taxCode: "Mã số thuế",
    parent: "Nhóm công ty",
  },

  footer: {
    tagline: "Nền tảng bán dẫn AI Hàn Quốc, ký hợp đồng và xuất hoá đơn tại Việt Nam.",
    navTitle: "Các trang",
    contactTitle: "Kênh liên hệ",
    legalTitle: "Pháp lý",
    statusLegend: "Xanh: đã có · Vàng: dự kiến",
    disclaimer: "Số liệu về Pebble Square Inc. lấy từ trang chính thức pebble-square.com, đọc ngày 20/08/2026. Mục nào mang nhãn dự kiến là lấy từ tài liệu nhà đầu tư, không nằm trong danh mục sản phẩm công khai.",
    copyright: "© 2026 Công ty TNHH Pebble Vina",
  },

  ui: {
    specs: "ui.specs",
    source: "ui.source",
    imagePending: "ui.imagePending",
  },

  status: { shipped: "Đã có", roadmap: "Dự kiến" },
  origin: { ps: "origin.ps", pv: "origin.pv" },
};

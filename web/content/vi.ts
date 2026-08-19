import type { LandingContent } from "./types";

/**
 * Bản VI — canonical. Mọi fact ở đây phải truy được về docs/01-proof-bank.md.
 * Số dùng dấu phẩy thập phân (17,6). Bản EN đối xứng ở `en.ts`.
 */
export const vi: LandingContent = {
  locale: "vi",
  alternate: { href: "/en", label: "EN", hrefLang: "en" },

  meta: {
    title: "Pebble Vina — Bán dẫn AI Hàn Quốc, vận hành tại Việt Nam",
    description:
      "Pebble Vina là thành viên Việt Nam của nhóm Pebble Square Inc. (Hàn Quốc) — đưa nền tảng Edge AI đã sản xuất hàng loạt vào vận hành thật tại Việt Nam. AI chạy tại chỗ, dữ liệu không rời doanh nghiệp.",
  },

  nav: {
    links: [
      { label: "Bằng chứng", href: "#bang-chung" },
      { label: "Công nghệ", href: "#cong-nghe" },
      { label: "Lịch sử", href: "#lich-su" },
      { label: "Ứng dụng", href: "#ung-dung" },
      { label: "Câu hỏi", href: "#cau-hoi" },
    ],
    cta: "Đặt lịch tư vấn",
  },

  hero: {
    eyebrow: "Thành viên Việt Nam của nhóm Pebble Square",
    h1: "Bán dẫn AI Hàn Quốc, vận hành tại Việt Nam",
    lead: "Pebble Vina đưa nền tảng Edge AI của Pebble Square Inc. — chip đã sản xuất hàng loạt từ 2023 — vào vận hành thật tại Việt Nam. AI chạy trong nhà bạn, dữ liệu không đi đâu cả.",
    ctaPrimary: "Đặt lịch tư vấn 30 phút",
    ctaSecondary: "Xem hồ sơ năng lực",
    trust: [
      { label: "Công ty mẹ", value: "Pebble Square Inc. · Seongnam, Hàn Quốc" },
      { label: "Thành lập", value: "09/2021 · bán dẫn AI fabless" },
      { label: "Chip MINT", value: "Sản xuất hàng loạt từ 5/2023" },
      { label: "Ghi nhận", value: "KPAS 2025 — Korea Promising AI Startups" },
    ],
  },

  proof: {
    kicker: "02 — Bằng chứng",
    heading: "Bạn không mua một startup hai tháng tuổi",
    lead: "Pebble Vina là pháp nhân Việt Nam mới. Nền tảng đứng sau thì không mới. Đây là công ty mẹ — tên đầy đủ, địa chỉ, và đường dẫn để bạn tự tra.",
    parent: {
      name: "Pebble Square Inc.",
      role: "Công ty mẹ · bán dẫn AI fabless, chuyên Edge AI",
      facts: [
        { label: "Trụ sở", value: "Seongnam, Gyeonggi-do, Hàn Quốc" },
        { label: "Thành lập", value: "Tháng 9/2021" },
        { label: "Vốn đã gọi", value: "~15 tỷ KRW" },
        { label: "Sở hữu trí tuệ", value: ">800 bằng sáng chế Mỹ · >200 bài báo SCI" },
      ],
      href: "https://www.pebble-square.com",
      hrefLabel: "pebble-square.com",
    },
  },

  stats: {
    kicker: "03 — Con số",
    heading: "Bốn con số, bốn nhãn",
    lead: "Ba con số đã đo được trên hàng thật. Con số thứ tư đẹp nhất trong bộ — và nó vẫn còn là lộ trình. Chúng tôi ghi rõ để bạn không phải đoán.",
    items: [
      {
        value: "17,6",
        unit: "TOPS/W",
        label: "Hiệu suất năng lượng chip MINT",
        note: "Kiến trúc Analog-PIM, ~30 GOPS, die 5×5 mm. Số đo được trên chip thật.",
        source: "Pebble Square · SmartTimes/JBNU · IR Deck tr.21",
        status: "shipped",
      },
      {
        value: "5/2023",
        label: "MINT vào sản xuất hàng loạt",
        note: "Ranh giới giữa nghiên cứu và có hàng. Chip thế hệ 2 đã qua vạch đó.",
        source: "Company History Pebble Square",
        status: "shipped",
      },
      {
        value: "~50×",
        label: "Điện năng thấp hơn NVIDIA Jetson Nano",
        note: "PAPAYA FLEX 0,1–0,15 W so với 5–10 W, trên cùng loại tải thị giác máy.",
        source: "IR Deck Pebble Square 05/01/2026",
        status: "shipped",
      },
      {
        value: "160",
        unit: "TOPS",
        label: "AI SoC ESPRESSO @INT8",
        note: "10 W, 16 TOPS/W. Card 4 chip đạt 640 TOPS. Chạy LLM nội bộ tới 120 tỷ tham số.",
        source: "IR Deck Pebble Square 05/01/2026",
        status: "roadmap",
        statusNote: "Dự kiến 9/2026",
      },
    ],
    legend:
      "Xanh là đã có trên hàng thật. Vàng là lộ trình theo tài liệu IR của công ty mẹ, chưa sẵn sàng thương mại.",
  },

  problem: {
    kicker: "04 — Vấn đề",
    heading: "Ba chỗ mà AI trên đám mây không đi vào được",
    lead: "Không phải vì đám mây kém. Vì có những ràng buộc không mua được bằng tiền băng thông.",
    items: [
      {
        no: "01",
        title: "Dữ liệu không được phép rời tổ chức",
        body: "Hồ sơ bệnh án, dữ liệu giao dịch, bản vẽ sản xuất, dữ liệu công dân. Quy định nội bộ hoặc pháp luật nói rõ: không đưa ra ngoài. Vậy là phần lớn công cụ AI đang bán trên thị trường bị loại từ vòng đầu.",
      },
      {
        no: "02",
        title: "Hiện trường không có băng thông, cũng không có điện dư",
        body: "Trạm biến áp, dàn pin mặt trời, dây chuyền trong xưởng, thiết bị chạy pin. Nơi cần AI nhất thường là nơi không kéo được đường truyền ổn định, và cũng không dư vài chục watt cho một card đồ hoạ.",
      },
      {
        no: "03",
        title: "Chậm một giây là đã muộn",
        body: "Phát hiện bất thường trên máy móc, cảnh báo an toàn, dừng dây chuyền. Gửi dữ liệu lên đám mây rồi chờ trả lời không phải là kiến trúc dùng được cho những việc này.",
      },
    ],
  },

  tech: {
    kicker: "05 — Công nghệ",
    heading: "Phép tính chạy ngay trong bộ nhớ",
    lead: "Đây là lõi kỹ thuật của Pebble Square, và là lý do ba vấn đề bên trên có lời giải.",
    plainEnglish:
      "Máy tính thông thường cất dữ liệu ở một nơi và tính toán ở nơi khác, nên phần lớn điện năng bị đốt cho việc khiêng dữ liệu qua lại. PIM — Processing-In-Memory — làm phép tính ngay tại chỗ dữ liệu nằm. Khiêng ít hơn thì tốn ít điện hơn. Đó là toàn bộ ý tưởng, và nó lấy cảm hứng từ cách não người hoạt động.",
    branches: [
      {
        name: "Analog-PIM",
        arch: "Tính toán analog trong bộ nhớ flash nhúng",
        body: "Nhánh lâu đời của Pebble Square: crossbar array, ô khớp thần kinh 256 trạng thái (8-bit). Cực kỳ tiết kiệm điện và đủ nhỏ để đặt vào thiết bị chạy pin.",
        chips: "MOCHA (2021) · MINT (2022) · PAPAYA FLEX",
        status: "shipped",
      },
      {
        name: "Digital-PIM",
        arch: "PIM nền SRAM, cho tải nặng",
        body: "Nhánh mới, nhắm AI PC, thiết bị LLM riêng, robot và edge công nghiệp. 160 TOPS @INT8 trong 10 W; card 4 chip đạt 640 TOPS.",
        chips: "ESPRESSO (AI SoC)",
        status: "roadmap",
        statusNote: "Dự kiến 9/2026",
      },
    ],
    pillars: [
      {
        no: "01",
        title: "Dữ liệu ở lại",
        body: "Xử lý ngay trên thiết bị, không phụ thuộc internet hay mạng. Đây là lợi thế duy nhất mà đối thủ đám mây không xoá được bằng cách giảm giá.",
      },
      {
        no: "02",
        title: "Điện năng cực thấp",
        body: "Đủ tiết kiệm để đặt trí tuệ vào chỗ trước đây chỉ đặt được cảm biến.",
      },
      {
        no: "03",
        title: "Phản ứng tức thì",
        body: "Quyết định tại chỗ. Không chờ đường truyền, không phụ thuộc chất lượng mạng vào giờ cao điểm.",
      },
      {
        no: "04",
        title: "Chi phí trả một lần",
        body: "Trả cho phần cứng, thay vì trả mãi theo lượng token gọi API mỗi tháng.",
      },
    ],
  },

  timeline: {
    kicker: "06 — Lịch sử công ty mẹ",
    heading: "Năm năm, và một mô hình mở rộng đã chạy hai lần",
    lead: "Hai mốc đáng chú ý nhất với người Việt Nam không phải là mốc kỹ thuật: liên doanh tại Ả Rập Xê Út và công ty con tại Tokyo. Pebble Vina là lần thứ ba của cùng một mô hình.",
    items: [
      {
        date: "11/2021",
        title: "Chip Edge AI PIM thế hệ 1 — MOCHA",
        body: "Trung tâm nghiên cứu doanh nghiệp được lập cùng năm.",
        status: "shipped",
      },
      {
        date: "07/2022",
        title: "MOU nghiên cứu chung với KAIST và ĐH Quốc gia Jeonbuk",
        body: "Hợp tác bán dẫn thông minh với hai đầu mối học thuật của Hàn Quốc.",
        status: "shipped",
      },
      {
        date: "03/2023",
        title: "Ký NDA với SK hynix",
        body: "Về công nghệ Analog Computing-in-Memory và bộ tăng tốc AI.",
        status: "shipped",
        starred: true,
      },
      {
        date: "05/2023",
        title: "MINT vào sản xuất hàng loạt",
        body: "Chip thế hệ 2 rời phòng thí nghiệm: 17,6 TOPS/W, ~30 GOPS, die 5×5 mm.",
        status: "shipped",
        starred: true,
      },
      {
        date: "03/2024",
        title: "Liên doanh Cluster AI Lab tại Ả Rập Xê Út",
        body: "Cùng tháng: NDA mua có điều kiện với MEISEI ELECTRIC (Nhật Bản) cho hệ Home IoT dùng MINT.",
        status: "shipped",
        starred: true,
      },
      {
        date: "05/2025",
        title: "Lập Pebble Square Japan, Inc. tại Tokyo",
        body: "Được chọn vào chương trình Tokyo Overseas Company Project. Pebble Vina đi theo đúng mô hình này.",
        status: "shipped",
        starred: true,
      },
      {
        date: "10/2025",
        title: "Được chọn KPAS 2025",
        body: "Korea Promising AI Startups — danh sách startup AI triển vọng của Hàn Quốc.",
        status: "shipped",
      },
      {
        date: "09/2026",
        title: "ESPRESSO — AI SoC 160 TOPS",
        body: "Nhánh Digital-PIM cho tải nặng và LLM đặt tại chỗ.",
        status: "roadmap",
        statusNote: "Theo tài liệu IR 05/01/2026",
      },
    ],
    footnote:
      "Các mốc trên lấy từ Company History chính thức của Pebble Square (đối chiếu 6/2026) và tài liệu IR ngày 05/01/2026.",
  },

  local: {
    kicker: "07 — Pebble Vina",
    heading: "Vậy tại sao không mua thẳng từ Hàn Quốc?",
    lead: "Câu hỏi đúng. Đây là bốn thứ mà một hợp đồng ký thẳng với Seongnam không cho bạn.",
    items: [
      {
        no: "01",
        title: "Pháp nhân Việt Nam",
        body: "Hợp đồng, hoá đơn VAT, bảo hành, hồ sơ nghiệm thu — bằng tiếng Việt, theo luật Việt Nam. CÔNG TY TNHH PEBBLE VINA, MST 0111545175, văn phòng tại Hà Nội.",
      },
      {
        no: "02",
        title: "Kỹ sư có mặt tại nhà máy",
        body: "Hỗ trợ ứng dụng và design-in tại chỗ. Không phải gửi email sang Seongnam rồi chờ qua lệch múi giờ.",
      },
      {
        no: "03",
        title: "Tuân thủ tiêu chuẩn Việt Nam",
        body: "TCVN/QCVN, thủ tục nhập khẩu, hồ sơ cho bên thẩm định. Phần việc này tốn thời gian hơn người ta tưởng, và không thuê từ xa được.",
      },
      {
        no: "04",
        title: "Mạng lưới doanh nghiệp Hàn tại Việt Nam",
        body: "Nhà đầu tư của Pebble Vina là Phó Chủ tịch KOCHAM — Hội Doanh nghiệp Hàn Quốc tại Việt Nam.",
      },
    ],
    punch: "Công nghệ Hàn Quốc, trách nhiệm Việt Nam.",
    cta: "Đặt lịch tư vấn 30 phút",
  },

  useCases: {
    kicker: "08 — Ứng dụng",
    heading: "Sáu chỗ nền tảng này đã và đang đi vào",
    lead: "Mỗi ô ghi rõ nguồn gốc: đâu là năng lực Pebble Square đã công bố, đâu là lớp ứng dụng Pebble Vina dựng thêm cho thị trường Việt Nam. Chúng tôi không gộp hai thứ lại.",
    items: [
      {
        title: "Nhận diện giọng nói tại chỗ",
        body: "Điều khiển bằng giọng nói không cần internet. Pebble Square đã chạy PoC thật vào 2/2024: hệ đèn nhận diện giọng nói kèm chuông khẩn cấp.",
        origin: "ps",
      },
      {
        title: "Thị giác máy công suất thấp",
        body: "Xử lý ảnh tốc độ cao, điện năng thấp — đếm, phân loại, kiểm tra ngoại quan trên dây chuyền.",
        origin: "ps",
      },
      {
        title: "An ninh không phụ thuộc mạng",
        body: "Xử lý an ninh hoàn toàn trên thiết bị, không dựa vào internet hay mạng nội bộ.",
        origin: "ps",
      },
      {
        title: "Phát hiện bất thường & bảo trì dự đoán",
        body: "Đọc dữ liệu thời gian thực để phát hiện bất thường và chẩn đoán sự cố cho robot và máy móc tự động.",
        origin: "ps",
      },
      {
        title: "LLM riêng đặt tại chỗ",
        body: "Máy chủ suy luận LLM đặt trong hạ tầng doanh nghiệp: hỏi đáp trên tài liệu nội bộ, không gửi gì ra ngoài. Cấu hình chạy được ngay hôm nay dùng GPU thương mại; bản dùng ESPRESSO theo lộ trình 9/2026.",
        origin: "pv",
      },
      {
        title: "An toàn điện & điện mặt trời",
        body: "Lớp ứng dụng Pebble Vina dựng trên năng lực phát hiện bất thường của công ty mẹ, bám chuẩn UL 1699B, IEC 63027:2023 và TCVN 11855-1:2017. Đây là hướng của Pebble Vina cho thị trường Việt Nam, không phải sản phẩm có sẵn của Pebble Square.",
        origin: "pv",
      },
    ],
    legend: {
      ps: "Năng lực Pebble Square đã công bố",
      pv: "Lớp ứng dụng Pebble Vina dựng thêm",
    },
  },

  start: {
    kicker: "09 — Cách bắt đầu",
    heading: "Sau khi bạn bấm nút thì chuyện gì xảy ra",
    lead: "Không có hợp đồng nào ký ở bước một. Bốn bước, mỗi bước kết thúc bằng một thứ bạn cầm được.",
    steps: [
      {
        no: "01",
        title: "Buổi làm việc 30 phút",
        body: "Bạn kể bài toán. Chúng tôi nói thẳng bài toán đó có hợp với xử lý tại chỗ hay không — nếu không hợp, chúng tôi nói không.",
        deliverable: "Kết luận có/không, miễn phí",
      },
      {
        no: "02",
        title: "Khảo sát hiện trạng",
        body: "Xem dữ liệu, thiết bị, ràng buộc điện năng và đường truyền ngay tại nơi sẽ triển khai.",
        deliverable: "Đề xuất kiến trúc + dự toán",
      },
      {
        no: "03",
        title: "Thí điểm có tiêu chí đo",
        body: "Chạy trên phần cứng thật, phạm vi hẹp, với chỉ số nghiệm thu thống nhất từ trước.",
        deliverable: "Báo cáo đo, đối chiếu tiêu chí đã chốt",
      },
      {
        no: "04",
        title: "Mở rộng và chuyển giao",
        body: "Nhân rộng theo kết quả thí điểm, đào tạo đội vận hành của bạn tiếp quản.",
        deliverable: "Hệ thống chạy thật + tài liệu vận hành",
      },
    ],
    note: "Thời lượng từng bước phụ thuộc quy mô. Trao đổi trực tiếp sẽ cho con số sát hơn bất kỳ ước lượng nào ghi sẵn trên web.",
  },

  faq: {
    kicker: "10 — Câu hỏi",
    heading: "Những câu khó, trả lời thẳng",
    lead: "Kể cả câu mà một trang bán hàng thường tránh.",
    items: [
      {
        q: "Pebble Vina là công ty Việt Nam hay Hàn Quốc?",
        a: "Là pháp nhân Việt Nam — CÔNG TY TNHH PEBBLE VINA, mã số thuế 0111545175, trụ sở tại Hà Nội — đồng thời là thành viên Việt Nam của nhóm Pebble Square (Hàn Quốc). Bạn ký hợp đồng với pháp nhân Việt; công nghệ đến từ công ty mẹ.",
      },
      {
        q: "Pebble Square là ai, tôi tra ở đâu?",
        a: "Pebble Square Inc. (페블스퀘어) là công ty bán dẫn AI fabless thành lập tháng 9/2021, trụ sở tại Seongnam, Gyeonggi-do, Hàn Quốc. Trang chính thức: pebble-square.com. Công ty đã gọi khoảng 15 tỷ KRW và được chọn vào danh sách KPAS 2025 của Hàn Quốc.",
      },
      {
        q: "Chip đã bán được chưa, hay còn là nghiên cứu?",
        a: "Chip MINT thế hệ 2 đã vào sản xuất hàng loạt từ tháng 5/2023, đạt 17,6 TOPS/W. AI SoC ESPRESSO 160 TOPS thì chưa: theo tài liệu IR của Pebble Square ngày 05/01/2026, dự kiến sẵn sàng tháng 9/2026. Trên trang này mọi con số đều mang nhãn để bạn phân biệt hai loại.",
      },
      {
        q: "Khác gì so với NVIDIA Jetson hay một card GPU?",
        a: "Khác ở điện năng và kích thước, không phải mạnh hơn về mọi mặt. Theo tài liệu IR của Pebble Square, PAPAYA FLEX tiêu thụ 0,1–0,15 W so với 5–10 W của Jetson Nano trên cùng loại tải thị giác máy (ResNet-50), và nhỏ hơn khoảng 25 lần. Nếu bài toán của bạn là huấn luyện mô hình lớn, GPU vẫn là lựa chọn đúng.",
      },
      {
        q: "Dữ liệu của chúng tôi có ra khỏi doanh nghiệp không?",
        a: "Không, nếu triển khai theo kiến trúc tại chỗ. Xử lý on-device không phụ thuộc internet hay mạng; còn máy chủ LLM đặt trong hạ tầng của bạn thì cả dữ liệu lẫn mô hình đều nằm sau tường lửa của bạn.",
      },
      {
        q: "Chúng tôi cần phát hiện hồ quang điện cho hệ điện mặt trời. Có làm được không?",
        a: "Câu này cần trả lời chính xác. Pebble Square không liệt kê phát hiện hồ quang điện trong danh mục sản phẩm của họ; năng lực họ công bố là phát hiện bất thường và bảo trì dự đoán cho robot, máy móc tự động. An toàn điện là lớp ứng dụng Pebble Vina dựng trên nền năng lực đó cho thị trường Việt Nam, bám các chuẩn UL 1699B, IEC 63027:2023 và TCVN 11855-1:2017. Nghĩa là: nền tảng đã có, lớp ứng dụng cần làm cùng bạn.",
      },
      {
        q: "Chi phí bao nhiêu?",
        a: "Phụ thuộc kiến trúc và quy mô, nên trang này không có bảng giá. Điều nói được ngay là mô hình chi phí khác đám mây: trả cho phần cứng một lần, thay vì trả theo lượng gọi API hằng tháng. Buổi làm việc đầu tiên và kết luận có/không là miễn phí.",
      },
      {
        q: "Vì sao trang này nói về công ty mẹ nhiều đến vậy?",
        a: "Vì đó là phần trung thực nhất của hồ sơ. Pebble Vina là pháp nhân mới, chưa có case study công bố được. Thay vì viết những câu chung chung về một công ty chưa có quá khứ, trang này đưa ra thứ tra chéo được: lịch sử, con số và các mốc của Pebble Square — kèm nhãn phân biệt cái đã có với cái còn là lộ trình.",
      },
    ],
  },

  cta: {
    heading: "Ba mươi phút, một câu trả lời thẳng",
    lead: "Kể bài toán của bạn. Nếu xử lý AI tại chỗ không phải lời giải đúng, chúng tôi sẽ nói vậy.",
    primary: "Đặt lịch tư vấn 30 phút",
    secondary: "Xem hồ sơ năng lực",
    contactLabel: "Hoặc gọi thẳng",
  },

  footer: {
    tagline: "Thành viên Việt Nam của nhóm Pebble Square.",
    legalLabel: "Pháp nhân",
    taxLabel: "Mã số thuế",
    addressLabel: "Trụ sở",
    contactLabel: "Liên hệ",
    parentLabel: "Công ty mẹ",
    statusLegend: "Nhãn trên trang: xanh = đã có · vàng = lộ trình",
    disclaimer:
      "Số liệu kỹ thuật trích từ tài liệu công bố của Pebble Square Inc. và tài liệu IR ngày 05/01/2026. Các mục gắn nhãn lộ trình chưa sẵn sàng thương mại tại thời điểm đăng.",
  },

  statusLabel: { shipped: "Đã có", roadmap: "Lộ trình" },
};

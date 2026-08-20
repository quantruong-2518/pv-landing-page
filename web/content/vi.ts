import type { LandingContent } from "./types";

/**
 * VI — bản phụ, dịch từ `en.ts` (canonical). Giữ nguyên cấu trúc và mọi fact;
 * số dùng dấu phẩy thập phân (17,6). Sửa fact ở đây thì phải sửa cả `en.ts`.
 */
export const vi: LandingContent = {
  locale: "vi",
  alternate: { href: "/", label: "EN", hrefLang: "en" },

  meta: {
    title: "Pebble Vina — Edge AI Analog-PIM, từ Seongnam về Việt Nam",
    description:
      "Pebble Vina là thành viên Việt Nam của Pebble Square Inc. — công ty bán dẫn fabless Hàn Quốc với chip Analog-PIM tính toán ngay trong bộ nhớ: hiệu năng AI đầy đủ trên một phần nhỏ điện năng, không gửi gì lên đám mây. Chip đã sản xuất hàng loạt từ 2023.",
  },

  nav: {
    links: [
      { label: "Vì sao lúc này", href: "#why-now" },
      { label: "Đã làm gì", href: "#track-record" },
      { label: "Sản phẩm", href: "#products" },
      { label: "Lĩnh vực", href: "#domains" },
      { label: "Câu hỏi", href: "#faq" },
    ],
    cta: "Đặt lịch tư vấn",
    menuLabel: "Mục lục",
  },

  hero: {
    eyebrow: "Pebble Vina · thành viên Việt Nam của nhóm Pebble Square",
    h1: "Thế giới muốn nhiều AI hơn lượng điện nó có",
    lead: "Pebble Square làm chip AI tính toán ngay trong bộ nhớ thay vì khiêng dữ liệu sang bộ xử lý — hiệu năng đầy đủ trên một phần nhỏ điện năng, và không gửi gì lên đám mây. Pebble Vina đưa nền tảng đó vào vận hành tại Việt Nam.",
    ctaPrimary: "Đặt lịch tư vấn 30 phút",
    ctaSecondary: "Xem họ đã làm được gì",
    ctaSecondaryHref: "#track-record",
    trust: [
      { label: "Công ty mẹ", value: "Pebble Square Inc. · Seongnam, Hàn Quốc" },
      { label: "Thành lập", value: "09/2021 · bán dẫn AI fabless" },
      { label: "Chip", value: "MINT sản xuất hàng loạt từ 5/2023" },
      { label: "Ghi nhận", value: "KPAS 2025 · Korea Promising AI Startups" },
    ],
    scrollHint: "Vì sao là lúc này",
  },

  whyNow: {
    kicker: "01 — Vì sao là lúc này",
    heading: "Hiệu năng không còn là phần khó. Điện năng mới là.",
    lead: "Tổ chức nào giờ cũng có nhiều AI muốn chạy hơn lượng điện, băng thông và quyền được chạy. Chính khoảng cách đó là cơ hội.",
    points: [
      {
        no: "01",
        title: "Trung tâm dữ liệu đã ngốn khoảng 2% điện toàn cầu",
        body: "Kèm chừng 300.000 gallon nước mỗi ngày để làm mát. Mỗi mô hình lớn hơn lại nới rộng hoá đơn đó, còn lưới điện thì không nở theo.",
      },
      {
        no: "02",
        title: "Công việc đang dịch về nơi không có điện dư",
        body: "Trạm biến áp, dàn pin mặt trời, dây chuyền sản xuất, thiết bị đeo, cảm biến chạy pin. Nơi cần suy luận nhất lại chỉ dư được vài trăm miliwatt, không phải vài trăm watt.",
      },
      {
        no: "03",
        title: "Phần lớn điện năng dùng để khiêng dữ liệu, không phải để tính",
        body: "Trong kiến trúc von Neumann thông thường, bộ nhớ và bộ xử lý nằm tách nhau nên đường truyền đốt hết ngân sách. Processing-In-Memory làm phép tính ngay tại chỗ dữ liệu nằm.",
      },
    ],
    pillarsTitle: "Bốn tính chất Pebble Square thiết kế để đạt",
    pillars: [
      { title: "Điện năng thấp", body: "Tính toán analog trong bộ nhớ flash nhúng, không đi qua đường truyền." },
      { title: "Riêng tư", body: "Suy luận trên thiết bị, không phụ thuộc đám mây." },
      { title: "Nhanh", body: "Suy luận tức thì — quyết định ngay tại chỗ dữ liệu sinh ra." },
      { title: "Chi phí thấp", body: "Phần cứng mua một lần, thay vì thuê suy luận theo tháng." },
    ],
  },

  stats: {
    kicker: "Bằng chứng đo được",
    heading: "Bốn con số, bốn nhãn",
    lead: "Ba số đo trên chip đã xuất xưởng. Số thứ tư đẹp nhất trong bộ — và vẫn còn là lộ trình. Chúng tôi ghi nhãn để bạn không phải đoán.",
    items: [
      {
        value: "17,6",
        unit: "TOPS/W",
        label: "Hiệu suất năng lượng chip MINT",
        note: "Analog-PIM, ~30 GOPS, die 5×5 mm. Đo trên chip thật, sản xuất hàng loạt từ 5/2023.",
        source: "Pebble Square · SmartTimes/JBNU · IR Deck tr.21",
        status: "shipped",
      },
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
      "Xanh là đã có trên phần cứng xuất xưởng. Vàng là xuất hiện trong tài liệu nhà đầu tư của công ty mẹ và chưa nằm trong danh mục sản phẩm công khai.",
  },

  track: {
    kicker: "02 — Đã làm gì ở đâu",
    heading: "Bốn thị trường, một cách đi",
    lead: "Pebble Square mở rộng bằng cách đặt một pháp nhân cạnh một hệ sinh thái bản địa, thay vì xuất hàng từ Seongnam rồi hy vọng. Việt Nam là lần thứ tư của cùng cách đi đó.",
    markets: [
      {
        region: "Hàn Quốc",
        org: "Pebble Square Inc. — trụ sở",
        period: "2021 →",
        body: "MOCHA, chip edge PIM thế hệ 1, năm 2021. MOU nghiên cứu chung với KAIST và ĐH Quốc gia Chonbuk năm 2022. NDA với SK hynix về Analog Computing-in-Memory và bộ tăng tốc AI năm 2023. MINT sản xuất hàng loạt từ 5/2023. Được chọn KPAS 2025.",
        status: "shipped",
      },
      {
        region: "Nhật Bản",
        org: "Pebble Square Japan, Inc.",
        period: "2024 →",
        body: "NDA mua có điều kiện với MEISEI ELECTRIC Co., Ltd. cho hệ Home IoT dùng MINT vào 3/2024, rồi lập công ty con tại Tokyo 5/2025, được chọn vào Tokyo Overseas Company Project.",
        status: "shipped",
      },
      {
        region: "Ả Rập Xê Út",
        org: "Cluster AI Lab — liên doanh",
        period: "2024 →",
        body: "Thoả thuận đầu tư liên doanh ký 3/2024, mở thị trường vùng Vịnh — nơi yêu cầu AI chủ quyền và suy luận tại chỗ khớp đúng thế mạnh của chip PIM.",
        status: "shipped",
      },
      {
        region: "Việt Nam",
        org: "Pebble Vina",
        period: "2026 →",
        body: "Pháp nhân Việt Nam tại Hà Nội, đưa nền tảng vào vận hành thật cho doanh nghiệp và khối nhà nước Việt Nam, hướng tiếp ra Đông Nam Á. Cùng một cấu trúc, thị trường thứ tư.",
        status: "shipped",
      },
    ],
  },

  timeline: {
    kicker: "Từ 2021",
    heading: "Toàn bộ những gì Pebble Square đã ghi vào hồ sơ",
    lead: "Lấy từ lịch sử công ty do chính họ công bố, cộng một mục 2026 đến từ tài liệu nhà đầu tư và được ghi nhãn rõ.",
    items: [
      { date: "09/2021", title: "Thành lập Pebble Square Inc. tại Seongnam", status: "shipped" },
      { date: "11/2021", title: "MOCHA — chip edge AI PIM thế hệ 1; lập trung tâm nghiên cứu doanh nghiệp", status: "shipped" },
      { date: "07/2022", title: "MOU nghiên cứu chung với KAIST và ĐH Quốc gia Chonbuk", status: "shipped" },
      { date: "10/2022", title: "Chứng nhận doanh nghiệp mạo hiểm", status: "shipped" },
      { date: "12/2022", title: "MINT — phát triển bán dẫn AI PIM thế hệ 2", status: "shipped" },
      { date: "03/2023", title: "Ký NDA với SK hynix", status: "shipped", starred: true },
      { date: "05/2023", title: "MINT vào sản xuất hàng loạt", status: "shipped", starred: true },
      { date: "01/2024", title: "Đăng ký bằng sáng chế thiết bị neuromorphic", status: "shipped" },
      { date: "02/2024", title: "PoC trên MINT — hệ đèn điều khiển giọng nói kèm chuông khẩn cấp", status: "shipped" },
      { date: "03/2024", title: "Liên doanh Cluster AI Lab tại Ả Rập Xê Út · NDA Home IoT với MEISEI ELECTRIC", status: "shipped", starred: true },
      { date: "03/2025", title: "UTC Investment rót 2 tỷ KRW", status: "shipped" },
      { date: "05/2025", title: "Lập Pebble Square Japan, Inc. tại Tokyo", status: "shipped", starred: true },
      { date: "08/2025", title: "Đóng vòng Pre-A", status: "shipped" },
      { date: "10/2025", title: "Được chọn KPAS 2025 — Korea Promising AI Startups", status: "shipped" },
      { date: "09/2026", title: "ESPRESSO — AI SoC Digital-PIM 160 TOPS", status: "roadmap", statusNote: "Tài liệu nhà đầu tư" },
    ],
    footnote:
      "Lịch sử công ty theo công bố của Pebble Square (đọc 20/08/2026). Mục 9/2026 lấy từ IR Deck ngày 05/01/2026 và không có trong danh mục sản phẩm công khai.",
  },

  products: {
    kicker: "03 — Sản phẩm",
    heading: "Ba tầng, một kiến trúc",
    lead: "Đây là danh mục của Pebble Square theo đúng cấu trúc của họ: chip, bộ công cụ đưa mô hình lên chip, và nhánh dựng cho tải nặng.",
    plain: "Máy tính thông thường cất dữ liệu ở một nơi và tính toán ở nơi khác, nên phần lớn điện năng bị đốt cho việc khiêng dữ liệu qua lại. Processing-In-Memory làm phép tính ngay tại chỗ dữ liệu nằm. Khiêng ít hơn thì tốn ít điện hơn — ý tưởng lấy từ cách não người hoạt động.",
    layers: [
      {
        name: "Chip AI nền PIM",
        tagline: "Analog-PIM · tính toán trong bộ nhớ flash nhúng",
        body: "Crossbar array cho tính toán analog với ô khớp thần kinh 256 trạng thái ở độ chính xác 8-bit, bộ xử lý tín hiệu hỗn hợp số/analog, và mạng nơ-ron quy mô lớn — FCNN, CNN, DNN, RNN — chạy ngay trên thiết bị.",
        items: "MOCHA (2021) · MINT (2022) · PAPAYA FLEX",
        status: "shipped",
      },
      {
        name: "Pebble AI Studio",
        tagline: "SDK tích hợp · đường từ mô hình đã huấn luyện xuống chip",
        body: "Triển khai và tối ưu mô hình đã huấn luyện lên chip PIM nhanh và liền mạch, kèm AI Accelerator cho công việc phát triển. Thiếu tầng này thì chip chỉ là kết quả nghiên cứu, không phải sản phẩm.",
        items: "Pebble AI Studio · AI Accelerator",
        status: "shipped",
      },
      {
        name: "AI SoC ESPRESSO",
        tagline: "Digital-PIM nền SRAM · cho tải nặng và LLM riêng",
        body: "Nhánh kiến trúc thứ hai nhắm AI PC, thiết bị LLM riêng, robot và edge công nghiệp: 160 TOPS @INT8 trong 10 W, card 4 chip đạt 640 TOPS, và máy chủ tại chỗ chạy mô hình nội bộ tới 120 tỷ tham số.",
        items: "ESPRESSO · module M.2 · card tăng tốc · máy chủ LLM tại chỗ",
        status: "roadmap",
        statusNote: "Dự kiến 9/2026",
      },
    ],
  },

  team: {
    kicker: "04 — Họ là ai",
    heading: "Công ty chip fabless do các nhà vật lý linh kiện điều hành",
    lead: "Pebble Square Inc. thành lập tháng 9/2021 tại Seongnam. Ban lãnh đạo kỹ thuật họ công bố gồm bốn người — ba trong đó là tiến sĩ Đại học Tokyo.",
    people: [
      { name: "ChoongHyun Lee", role: "Tổng giám đốc (CEO)", credential: "Ph.D., Đại học Tokyo (2013)" },
      { name: "SangHyeon Kim", role: "Giám đốc công nghệ (CTO)", credential: "Ph.D., Đại học Tokyo (2014)" },
      { name: "Cimang Lu", role: "Trưởng kiến trúc", credential: "Ph.D., Đại học Tokyo (2015)" },
      { name: "Xu Yi", role: "Trưởng thiết kế mạch", credential: "M.S., Đại học Thanh Hoa (2007)" },
    ],
    backingTitle: "Hậu thuẫn và vị thế",
    backing: [
      { label: "Vốn đã gọi", value: "~15 tỷ KRW tính đến nay" },
      { label: "Nhà đầu tư gần nhất", value: "UTC Investment 2 tỷ KRW (3/2025) · Pre-A đóng 8/2025" },
      { label: "Đối tác học thuật", value: "KAIST · ĐH Quốc gia Chonbuk" },
      { label: "Chiều sâu sở hữu trí tuệ", value: ">800 bằng sáng chế Mỹ · >200 bài báo SCI (IR Deck)" },
    ],
  },

  places: {
    kicker: "05 — Họ ở đâu",
    heading: "Hai châu lục, bốn địa chỉ",
    lead: "Nhóm này nhỏ và đặt chỗ có chủ đích: một trụ sở kỹ thuật trong hành lang bán dẫn của Hàn Quốc, và mỗi thị trường quyết định phục vụ thì có một pháp nhân bản địa.",
    offices: [
      {
        label: "Trụ sở chính",
        org: "Pebble Square Inc.",
        address: "331, 402 Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Hàn Quốc — ABN Tower, Sampyeong-dong",
        status: "shipped",
      },
      {
        label: "Nhật Bản",
        org: "Pebble Square Japan, Inc.",
        address: "Tokyo, Nhật Bản — lập 5/2025, được chọn vào Tokyo Overseas Company Project",
        status: "shipped",
      },
      {
        label: "Ả Rập Xê Út",
        org: "Cluster AI Lab — liên doanh",
        address: "Thoả thuận đầu tư liên doanh ký 3/2024",
        status: "shipped",
      },
      {
        label: "Việt Nam",
        org: "Pebble Vina",
        address: "Văn phòng O1912, Tầng 19, Landmark 72 Tower, Khu đô thị mới Cầu Giấy, P. Yên Hoà, Hà Nội",
        status: "shipped",
      },
    ],
  },

  domains: {
    kicker: "06 — Lĩnh vực",
    heading: "Sáu lĩnh vực nền tảng này đã chạy",
    lead: "Sáu lĩnh vực đầu là business sector do chính Pebble Square công bố, mỗi cái kèm năng lực on-device đứng sau. Hai dòng cuối là của chúng tôi, và được ghi rõ là của chúng tôi.",
    items: [
      {
        title: "Phân tích sự cố",
        body: "Chẩn đoán thời gian thực cho robot và máy móc tự động — bắt được hỏng hóc trước khi dây chuyền dừng, thay vì sau.",
        origin: "ps",
      },
      {
        title: "Quản trị rủi ro",
        body: "Phát hiện bất thường liên tục trên dữ liệu sống, chạy ngay tại thiết bị thay vì ở trung tâm giám sát.",
        origin: "ps",
      },
      {
        title: "Thị giác máy",
        body: "Xử lý ảnh tốc độ cao, điện năng thấp cho sản xuất và y tế: kiểm tra ngoại quan, đếm, phân loại.",
        origin: "ps",
      },
      {
        title: "An ninh",
        body: "Phát hiện mối đe doạ không phụ thuộc internet hay mạng — cả hình ảnh lẫn quyết định đều ở lại trên thiết bị.",
        origin: "ps",
      },
      {
        title: "Home IoT",
        body: "Nhận diện giọng nói cho nhà thông minh và thiết bị đeo. Đã trình diễn trên MINT tháng 2/2024: hệ đèn điều khiển bằng giọng nói kèm chuông khẩn cấp.",
        origin: "ps",
      },
      {
        title: "Y tế",
        body: "Xử lý ảnh và tín hiệu ngay trong thiết bị y tế, nơi điện năng, độ trễ và quyền riêng tư của bệnh nhân đồng thời là ràng buộc.",
        origin: "ps",
      },
      {
        title: "Triển khai LLM riêng",
        body: "Pebble Vina triển khai máy chủ suy luận tại chỗ để tổ chức chạy mô hình của mình trên tài liệu của mình. Cấu hình chạy được ngay hôm nay dùng GPU thương mại; bản ESPRESSO theo lộ trình 9/2026.",
        origin: "pv",
      },
      {
        title: "An toàn điện và điện mặt trời",
        body: "Không phải sản phẩm của Pebble Square. Pebble Vina dựng lớp này trên năng lực phát hiện bất thường của công ty mẹ cho thị trường Việt Nam, bám chuẩn UL 1699B, IEC 63027:2023 và TCVN 11855-1:2017.",
        origin: "pv",
      },
    ],
    legend: {
      ps: "Business sector của Pebble Square",
      pv: "Lớp ứng dụng Pebble Vina",
    },
  },

  local: {
    kicker: "07 — Pebble Vina",
    heading: "Vậy tại sao không mua thẳng từ Hàn Quốc?",
    lead: "Câu hỏi đúng. Bốn thứ mà một hợp đồng ký thẳng với Seongnam không cho bạn.",
    items: [
      {
        no: "01",
        title: "Pháp nhân Việt Nam",
        body: "Hợp đồng, hoá đơn VAT, bảo hành, hồ sơ nghiệm thu — bằng tiếng Việt, theo luật Việt Nam. CÔNG TY TNHH PEBBLE VINA, MST 0111545175, văn phòng tại Hà Nội.",
      },
      {
        no: "02",
        title: "Kỹ sư có mặt tại nhà máy",
        body: "Hỗ trợ ứng dụng và design-in tại chỗ, không phải gửi email sang Seongnam rồi chờ qua bảy múi giờ.",
      },
      {
        no: "03",
        title: "Tuân thủ tiêu chuẩn Việt Nam",
        body: "TCVN/QCVN, thủ tục nhập khẩu, hồ sơ cho bên thẩm định. Phần việc này tốn thời gian hơn người ta tưởng và không làm từ xa được.",
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

  start: {
    kicker: "08 — Cách bắt đầu",
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
    note: "Thời lượng từng bước phụ thuộc quy mô. Trao đổi trực tiếp cho con số sát hơn bất kỳ ước lượng nào ghi sẵn trên web.",
  },

  faq: {
    kicker: "09 — Câu hỏi",
    heading: "Những câu khó, trả lời thẳng",
    lead: "Kể cả câu mà một trang bán hàng thường tránh.",
    items: [
      {
        q: "Pebble Vina là công ty Việt Nam hay Hàn Quốc?",
        a: "Là pháp nhân Việt Nam — CÔNG TY TNHH PEBBLE VINA, mã số thuế 0111545175, đăng ký tại Hà Nội — đồng thời là thành viên Việt Nam của nhóm Pebble Square. Bạn ký hợp đồng với pháp nhân Việt; công nghệ đến từ công ty mẹ ở Seongnam.",
      },
      {
        q: "Pebble Square là ai, tôi tra ở đâu?",
        a: "Pebble Square Inc. là công ty bán dẫn AI fabless thành lập tháng 9/2021, trụ sở tại ABN Tower, 331 Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Hàn Quốc, CEO là ChoongHyun Lee, giấy phép kinh doanh 879-88-02299. Mọi thông tin về công ty mẹ trên trang này đều tra được tại pebble-square.com.",
      },
      {
        q: "Chip đã bán được chưa, hay còn là nghiên cứu?",
        a: "MINT, chip thế hệ 2, đã sản xuất hàng loạt từ tháng 5/2023, đạt 17,6 TOPS/W. AI SoC ESPRESSO 160 TOPS thì chưa: nó xuất hiện trong tài liệu nhà đầu tư ngày 05/01/2026 với mốc dự kiến tháng 9/2026, và không nằm trong danh mục sản phẩm công khai. Mọi con số trên trang này đều mang nhãn để không lẫn hai loại.",
      },
      {
        q: "Khác gì so với NVIDIA Jetson hay một card GPU?",
        a: "Khác ở điện năng và kích thước, không phải mạnh hơn về mọi mặt. Theo IR Deck của Pebble Square, PAPAYA FLEX tiêu thụ 0,1–0,15 W so với 5–10 W của Jetson Nano trên cùng loại tải thị giác máy, trong gói nhỏ hơn khoảng 25 lần. Nếu bài toán của bạn là huấn luyện mô hình lớn, GPU vẫn là lựa chọn đúng.",
      },
      {
        q: "Dữ liệu của chúng tôi có ra khỏi doanh nghiệp không?",
        a: "Không, nếu triển khai theo kiến trúc tại chỗ. Pebble Square thiết kế rõ ràng cho việc xử lý \"không phụ thuộc internet hay mạng\", còn máy chủ LLM đặt trong hạ tầng của bạn thì cả dữ liệu lẫn mô hình đều nằm sau tường lửa của bạn.",
      },
      {
        q: "Chúng tôi cần phát hiện hồ quang điện cho hệ điện mặt trời. Có làm được không?",
        a: "Câu này cần trả lời chính xác. Pebble Square không liệt kê phát hiện hồ quang điện trong các business sector của họ; cái họ công bố là Fault Analysis và Risk Management — chẩn đoán thời gian thực và phát hiện bất thường cho robot, máy móc tự động. An toàn điện là lớp ứng dụng Pebble Vina dựng trên năng lực đó cho thị trường Việt Nam, bám UL 1699B, IEC 63027:2023 và TCVN 11855-1:2017. Nền tảng đã có; lớp ứng dụng làm cùng bạn.",
      },
      {
        q: "Chi phí bao nhiêu?",
        a: "Phụ thuộc kiến trúc và quy mô, nên trang này không có bảng giá. Điều nói được ngay là mô hình chi phí khác đám mây: trả cho phần cứng một lần, thay vì trả theo lượt suy luận hằng tháng. Buổi làm việc đầu tiên và kết luận có/không là miễn phí.",
      },
      {
        q: "Vì sao trang này dành nhiều chỗ đến vậy cho công ty mẹ?",
        a: "Vì đó là phần hữu ích nhất của hồ sơ. Pebble Vina là pháp nhân mới, chưa có case study công bố được. Thay vì viết những câu chung chung về một công ty chưa có quá khứ, trang này đưa ra thứ bạn tra được: lịch sử, con số, ban lãnh đạo và danh mục sản phẩm của Pebble Square — kèm nhãn phân biệt cái đã có với cái còn là lộ trình.",
      },
    ],
  },

  cta: {
    heading: "Ba mươi phút, một câu trả lời thẳng",
    lead: "Kể bài toán của bạn. Nếu xử lý AI tại chỗ không phải lời giải đúng, chúng tôi sẽ nói vậy.",
    primary: "Đặt lịch tư vấn 30 phút",
    secondary: "Gửi email trực tiếp",
    contactLabel: "Hoặc gọi",
  },

  footer: {
    tagline: "Thành viên Việt Nam của nhóm Pebble Square.",
    navTitle: "Trên trang này",
    contactTitle: "Liên hệ",
    legalTitle: "Pháp lý",
    legalLabel: "Pháp nhân",
    taxLabel: "Mã số thuế",
    addressLabel: "Trụ sở",
    parentLabel: "Công ty mẹ",
    statusLegend: "Nhãn dùng trên trang: xanh = đã có · vàng = lộ trình",
    disclaimer:
      "Thông tin về Pebble Square Inc. lấy từ tài liệu họ công bố (pebble-square.com, đọc 20/08/2026) và từ IR Deck ngày 05/01/2026. Các mục gắn nhãn lộ trình chưa sẵn sàng thương mại tại thời điểm đăng.",
    copyright: "© 2026 CÔNG TY TNHH PEBBLE VINA",
  },

  statusLabel: { shipped: "Đã có", roadmap: "Lộ trình" },
};

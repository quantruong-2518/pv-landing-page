# 06 — Strategy review: is this page good enough to sell with?

> **Reviewed** 2026-08-20 · **Reviewer** strategy-reviewer · **Target** `http://localhost:3001` (EN, canonical) and `/vi`
> **Evidence base** Pebble Square Series-A deck *"Strategic Investment Proposal final v4"* (31 slides, extracted to
> `reports/deck-01-11.md`, `deck-12-21.md`, `deck-22-31.md`, slide images verified by eye) · `docs/01-proof-bank.md` ·
> `web/content/en.ts` · 13 desktop + 13 mobile screenshots read in scroll order.
>
> **Written in English** because every artefact it cites is English — the canonical copy (`en.ts`), the deck, and the
> decision audience defined in `CLAUDE.md` §4. The other docs in this folder stay Vietnamese.
>
> **Scope note.** This review recommends nothing that breaks `CLAUDE.md` §2. Where the strongest available move needs a
> fact the company has not released, that is stated plainly and routed to §10 — that is a finding, not a failure.

---

## 1. Verdict

**NOT READY.** Do not put this in front of customers this week.

The page is well built, honestly intended, and structurally better than the main site — but it ships two claims that
the parent company's own current investor deck contradicts, and it closes the wrong one of the two gaps it exists to
close. Per `README.md` the repo exists to close **G1 — no evidence layer** and **G2 — not a single number**. It closed
G2 cleanly and completely: four sourced, labelled numbers on `en-03-numbers`, which is more measurement discipline than
any comparable Vietnamese deep-tech page has. **G1 it did not close.** It closed a *substitute* for G1 — the parent's
corporate history, addresses, tax code and leadership CVs — which proves the parent **exists**, not that anyone has
ever **bought** anything. A buyer finishes all thirteen blocks knowing the chip is efficient, the company is real, and
nobody has purchased it. There is not one customer, one deployment, one unit shipped, one site, one signed agreement
with an outside party, or one photograph of anything working anywhere on this page.

**The single biggest thing standing between this page and a booked call: zero demand evidence.** The deck contains an
AFCI solution with *3,000+ units mass-produced and delivered* under a `Commercial Revenue` badge (s16), a completed
in-vehicle PoC at a BMW AG connected test vehicle with photographs (s24), NDAs signed with four Vietnamese
organisations and a joint-R&D NDA with two Vietnamese state institutes (s15), live PoCs in four countries, and JPY 100M
of secured Japanese government support (s18). **The page uses none of it.** Chip specs answer "does it work?".
Nothing on this page answers "does anyone want it?" — and for a company nobody has heard of, that is the only question
that gets a meeting.

**Separately and more urgently: two things on this page are not weak, they are false.** Falsity outranks weakness.
See §4 and §5. Both are hours of work to fix. Fix those before anything else, then the page is a content problem
rather than a credibility problem.

**Distance to sellable.** Three factual corrections (§9 items 1, 2, 4) move it from NOT READY to READY WITH FIXES —
call it a day of work. Getting it to READY TO SELL needs facts only the company can release (§10), and no amount of
writing substitutes for them.

---

## 2. Where each audience leaves

Read the desktop set in scroll order. Each audience abandons at a different block, for a different reason.

### 2.1 Korean FDI / Pebble Square's own network → leaves at **02 Track record** (`en-04-track-record`)

They already trust the parent. They came for one thing: *what can the Vietnam entity actually execute?* The Korea,
Japan and Saudi cards carry real history — MOCHA, KAIST, SK hynix, MEISEI, a Tokyo subsidiary. Then the Vietnam card
(`en.ts:143-149`) says: *"A Vietnamese legal entity in Hanoi carrying the platform into real operation for Vietnamese
industry and government, with Southeast Asia beyond it. Same structure, fourth market."* That is aspiration set in the
same typography, on the same row, under the same green `SHIPPING` badge as three markets with five years of receipts.

It gets worse for exactly this audience, because they are the people most likely to have seen the deck. Slide 18 —
verified by eye — labels the relationship **"Pebble Vina Partnership"** with the sub-line **"2026 local marketing and
sales channel agreement"**, sitting beside "Japan **Subsidiary**". The page calls itself *"the Vietnam member of the
Pebble Square group"* (`en.ts:31`) and puts Pebble Vina in an address table headed "Two continents, four addresses"
alongside the HQ. A Korean reader holding both documents concludes the page has quietly promoted a sales-channel
agreement into group membership. That single perceived stretch costs more with this audience than everything the page
gains from the parent's history.

### 2.2 Vietnamese industrial buyer → leaves at **the Numbers block** (`en-03-numbers`)

They have never heard of Pebble Square, Pebble Vina, PIM, or Seongnam. They open on a two-line physics thesis, scroll
through an essay about global data-centre electricity and von Neumann architecture (`en-02-why-now`), and land on four
cards whose only reference points are TOPS/W, an NVIDIA Jetson Nano and an NVIDIA L4. Nothing in the first three
screens is about a factory, a line, a panel, a Vietnamese site, or a Vietnamese person. There is no Vietnamese name
anywhere on the page, no photograph of anything (G9 still open, `05-backlog.md` #5), and the block that would hold
them — **07 Pebble Vina**, "So why not buy directly from Korea?", which is genuinely the best-written block on the
page — is **six screens further down**, behind a Korean company history, a Korean org chart and four addresses.

They will not scroll that far. With `scroll-snap-type: y mandatory` (`03-structure.md` §2) reaching block 07 costs ten
deliberate scroll actions. This audience is the largest by count and the page makes them work hardest.

### 2.3 Japanese partner / distributor → leaves at **05 Where they are** (`en-08-where`)

Japan appears exactly twice on this page: one sentence in Track record (`en.ts:129-135`) and one row in the address
table — both saying the same thing, "established May 2025, selected for the Tokyo Overseas Company Project". By the
address table they have learned nothing new about their own market and they stop.

What the deck holds for precisely this reader and the page omits: **JPY 100M support secured** under the named *2025
overseas excellent startup attraction program*, with a "Selected by Japanese Government Program" seal (s18, verified by
eye); GasPal and SCREEN PoCs in progress; Iris Ohyama, Meisei Electric and Daito Kentaku in discussion; and
AICC-related specification work (s15). A Japanese partner evaluates maturity by *who else in Japan is already engaged
and who vouched for you*. The page answers neither, while the deck answers both.

### 2.4 Investor → leaves at **04 Who they are** (`en-07-team`)

The "Backing and standing" strip is the weakest thing on the page, and it contains its most dangerous line.
`en.ts:224` reads `IP depth: ">800 US patents · >200 SCI papers (IR deck)"`. Deck slide 19 puts those figures under a
band headed **"Pebble Square *Leadership* Track Record"** — they are the four executives' cumulative career totals, and
the deck extraction flags explicitly: *"Do not restate as 'Pebble Square holds 800+ US patents'. Ownership is
`[not stated]`."* The page's own label, **"IP depth"**, does exactly that restating. An investor who checks — and
checking a patent count is a ten-minute job — finds the company's assignee record does not remotely support 800, and
from that moment every green badge on the page is suspect. The parenthetical "(IR deck)" does not save it; it names a
source the reader cannot obtain.

Beyond that line: no moat, no market size, no traction, no dated roadmap, no revenue model. The deck has all four
(s10, s14, s17, s20). This page is not built for investors and should probably stop pretending otherwise — but the
patents line must go regardless of audience.

### 2.5 Engineer evaluator → leaves at **the Numbers block**, for the opposite reason to 2.2

This is the audience `00-brief.md` calls "người phá trang" — the page-breaker — and the whole labelling architecture
was built for them. They read `en-03-numbers` carefully, believe it, and then go looking for the part. They find: no
part number, no package, no process node, no operating temperature range, no datasheet, no dev kit, no eval board, no
SDK download, no documentation link, no sample request. "Pebble AI Studio" is a paragraph with no link
(`en.ts:191-197`). The single action available to a chip engineer on a chip company's website is *email us*.

Then the trap springs. Card 2 (`en.ts:89-95`) claims **PAPAYA FLEX** at 0.1–0.15 W under a green `SHIPPING` badge.
Card 3 (`en.ts:96-102`) claims **PAPAYA** vs an NVIDIA L4, also `SHIPPING`. Deck slide 17 — verified by eye — puts
**"Launch Analog CIM (Papaya Family)"** and **"Tape-out and volume-ready silicon"** in **2027**, with the milestone
"First revenue and product market entry". An engineer who has seen the parent's current material now knows the page
labelled a pre-tape-out part as shipping. The device the page built to buy trust is the device that loses it. This is
the worst possible failure mode for this specific page, because its entire differentiation is *"we label honestly"*.

---

## 3. Proof gap A — deck proof the page is not using

Ranked by sales impact. Each carries a confidentiality route:
**(a)** publishable today as-is · **(b)** publishable if the company confirms/approves · **(c)** publishable only
aggregated/anonymised · **(d)** not publishable.

| # | Unused proof | Deck source | Why it matters | Route |
|---|---|---|---|---|
| **1** | **AFCI AI solution commercialized for electrical fire prevention · 3,000+ units mass-produced and delivered · test reports and required approvals completed**, under a `Commercial Revenue` badge | s16 | The only hard commercial fact the group owns. Converts "interesting chip" into "someone paid for this and it passed approvals". Would single-handedly close G1. **Also the most dangerous item on this list — see §3.1.** | **(b)**, downgradeable to **(c)** |
| **2** | **Completed in-vehicle PoC at BMW** — "AI trunk PoC completed with BMW HQ", "Demonstrated by direct integration into BMW vehicle", "Strong feedback"; photographic evidence of a rig beside a vehicle carrying an official `BMW AG / CONNECTED TEST VEHICLE` sticker | s15, s16, s23, s24 | Strongest logo in the deck. A German premium OEM let this hardware near a test vehicle — that is a competence signal no spec sheet buys. **Not a customer:** no order, no volume, no revenue. | **(c)** |
| **3** | **Vietnamese pipeline** — VinFast & VinRobotics (NDA signed, technical review underway), FPT (NDA signed, ultra-small voice AI module), Mobifone/VNPT (base-station module discussions), NACENTECH + VAST (joint R&D NDA completed) | s15 | Answers the Vietnamese buyer's real question — *does anyone here take this seriously?* — with names they know. **Names are NDA-bound; the aggregate is not.** | **(c)** |
| **4** | **Leadership prior employers**: ChoongHyun Lee — former **IBM Research** (advanced semiconductor & neuromorphic), 15+ yrs; SangHyeon Kim — **KAIST professor** with approved concurrent CTO role, former **KIST**; Cimang Lu — former **Qualcomm** chip architecture; Yi Xu — former **Qimonda**, **YMTC**, **HHGrace**, "strong mass-production experience" | s19 | **Highest value per unit of effort on the entire list.** The page shows four names and three Tokyo PhDs (`en.ts:213-218`) — impressive to nobody outside academia. "Former IBM Research", "former Qualcomm", "KAIST professor" is what a Japanese partner and an engineer actually weigh. Biographical facts about named executives; almost certainly already public. | **(a)** |
| **5** | **ESPRESSO is on TSMC N6**, ~160 TOPS, ~10 W, "Digital CIM Processor", flagship part | s7 | A named advanced node is the strongest single credibility token a fabless company can show. The page describes ESPRESSO in detail and omits the one detail an engineer checks first. | **(b)** — gated behind the same approval ESPRESSO already needs (`05-backlog.md` #9) |
| **6** | **JPY 100M support secured**, "Selected by Japanese Government Program", *2025 overseas excellent startup attraction program* | s18 | A foreign government did diligence and wrote a cheque. Third-party validation, denominated. Decisive for the Japanese audience, strong everywhere. | **(b)** — likely **(a)** once the public programme announcement is located |
| **7** | **Dated GTM roadmap**: 2026 technology validation & customer pilots → 2027 tape-out, volume-ready silicon, Analog + Digital CIM launch, *first revenue* → 2028 scale-up → 2029 recurring revenue | s17 | Maturity signal for Japanese partners and engineers. Also the honest frame the page is missing: it currently implies the portfolio is here, when the parent says most of it lands in 2027. | **(b)** |
| **8** | **PS10 programme** — a customer-driven DPU for telecom Smart NIC infrastructure on **Samsung SF4X**, ~560 mm² die, "Tier-1 customer status" | s29, s30, s31 | A ~560 mm² 4nm-class die on Samsung with Tier-1 status is a different weight class from anything on the page. Proves the group can run a large commercial programme. | **(b)** for the relationship only |
| **9** | **Live PoC geography** — PoCs running in Korea, Japan, Germany and Vietnam; discussions across Korea, Japan, Vietnam, China | s15 | "Four countries" is a defensible aggregate that needs no name and no permission from any counterparty. Cheapest possible partial close of G1. | **(c)** |
| **10** | **Four worked application cases** — thermal anomaly detection inside distribution panels via IR imaging (HD Electric); AI-based AFCI validated against an arc generator at 220 V (Sangdo); gas-cylinder-to-hazard distance via monocular depth estimation (GasPal); equipment wear classification from an analog sensor front-end (SCREEN/AQUASPIN) | s25, s26, s27, s28 | The closest thing the group has to case studies. Real methods, real hazards, real bench hardware. Anonymised, they become capability proof without naming anyone. | **(c)** |
| **11** | **Positioning table** — GPU/NPU vs MCU vs Cloud AI vs Pebble Square across performance, power, cost, latency, privacy, edge suitability | s4 | The page never places itself against anything except one 2019 NVIDIA part. This table does the comparative work in one screen. Qualitative, no confidential content. | **(a)** |
| **12** | **Cloud AI vs Private AI Server table** + air-gapped / compliance / audit framing | s9 | Built for the government and data-sensitive audience `00-brief.md` names, which the page currently serves only with one FAQ answer. | **(a)** |
| **13** | **Analog CIM is eNVM-class (Flash, ReRAM, PCM, MRAM); Digital CIM is SRAM-based**; deck does not state which eNVM is used | s6, s7 | Architecture-level, no secrets — and it corrects the page's over-specific *"computation inside embedded flash"* (`en.ts:69`, `en.ts:186`), which asserts more than the parent does. | **(a)** |
| **14** | **Five revenue streams** — chip sales, IP licensing, SDK/runtime licensing, custom private LLM projects, private AI server deployment | s14 | Tells a Vietnamese systems integrator or an FDI manufacturer there is a way to work with this company other than buying chips. Generic, no numbers. | **(a)** |
| **15** | **"CIM / Compute-In-Memory"** as the parent's current vocabulary throughout v4 | deck-wide | See §4.5. | **(a)** |

### 3.1 Item 1 in detail — the AFCI claim is UNRESOLVED, and I am not authorising it

This is the most commercially valuable fact available and the most dangerous. It is **not** cleared for use by this
review. What is actually true, verified against slide 16 by eye:

- Under a dark badge reading **`Commercial Revenue`**, in the column headed **Commercialization**, the deck states
  verbatim: *"AFCI AI solution commercialized for electrical fire prevention"* · *"3,000+ units mass-produced and
  delivered"* · *"Test reports and required approvals completed"* · *"Proven ability to move from AI solution to
  revenue"*. **No customer is named** against this block.
- On the **same slide**, in the **Pilot** column — not Commercialization — sit *"HD Electric / Sangdo Electric:
  AI-based electrical fire-prevention solution supplied · Pilot deployment"*.
- Appendix slide 26 (Sangdo Electric) states the objective as, verbatim, *"**To develop** an AI-based AFCI that
  detects electrical anomalies to prevent fires"* — an infinitive of intent, under the same `Objective` heading used on
  the concept slides. Its captions read *"< Rule-based vs AI-based ARC breakers >"* and *"ARC generator"* — a
  comparison study on a Pebble-Square-branded lab bench, not a product.

**The three-way tension, stated plainly.** The deck simultaneously claims AFCI is commercialized with 3,000+ units
delivered and approvals completed (s16), places its only named AFCI partner in Pilot (s16), and describes that
partnership as a development objective (s26). Those cannot all be the strongest reading. And the whole cluster
collides with `CLAUDE.md` §2.2 and `01-proof-bank.md` §H.2, which forbid attributing arc-fault to Pebble Square —
a rule that was correct when it was written, because it was derived from the **public website**, which lists six
business sectors containing no arc-fault and no solar. What has changed is that the parent's **own current investor
deck** now claims AFCI in its own name, on three separate slides. The rule and the deck now disagree, and the deck is
the more recent, higher-authority document about what the parent believes about itself.

**Size of the prize.** If confirmed, this is worth more than every other item on this list combined. It converts the
page from "credible technology, no demand" to "3,000+ units delivered, approvals passed" — G1 closed in one line — and
it retroactively legitimises Pebble Vina's entire Vietnamese electrical-safety angle, which currently has to be
defended defensively in FAQ 06 (`en.ts:400-403`) as *"Not a Pebble Square product"*. It would also let the arc-fault
FAQ stop apologising and start selling.

**What the company must confirm before one word of this appears — all four, in writing:**

1. **Who bought the 3,000+ units, what were they, and when?** Units of *what* — breaker modules, sensor modules, AI
   modules inside someone else's breaker? Delivered to whom, by which legal entity?
2. **Is the AFCI revenue Pebble Square's own, or a partner's product containing Pebble Square content?** These
   produce completely different sentences on a public page and only one of them is "Pebble Square commercialized an
   AFCI solution".
3. **Which approvals, from which certifying body?** "Test reports and required approvals completed" names no
   standard and no authority. Without a named standard (UL 1699/1699B, KS, IEC) it is unpublishable — and against a
   Vietnamese electrical audience, an unnamed approval is worse than none.
4. **Does the parent authorise arc-fault/AFCI being attributed to Pebble Square publicly**, given the public site does
   not list it? This is a `CLAUDE.md` amendment, and it is GM + HQ's decision, not this page's.

**Until all four land: change nothing.** FAQ 06 as currently written (`en.ts:400-403`) is a correct, careful answer
under today's rules and is one of the best paragraphs on the page. Do not touch it on the strength of a deck slide.

---

## 4. Proof gap B — page claims the proof bank and deck do not support

Ordered by severity. The first two are **false**, not weak.

### 4.1 🔴 FALSE — two `SHIPPING` badges on silicon the parent says launches in 2027

| Where | Claim | What the deck says |
|---|---|---|
| `en.ts:89-95`, status `shipped` at :94 | *"~50× lower power than NVIDIA Jetson Nano — **PAPAYA FLEX** at 0.1–0.15 W"* | s17: **"Launch Analog CIM (Papaya Family)" — 2027**; **"Tape-out and volume-ready silicon" — 2027** |
| `en.ts:96-102`, status `shipped` at :101 | *"~10,000× less power at a 5G base station — **PAPAYA** against an NVIDIA L4"* | same |
| `en.ts:79` | *"**Three are measured on shipping silicon.**"* | s11 gives MOCHA/MINT/PAPAYA/PAPAYA FLEX **no** silicon status, no date, no spec. s20 funds *"Complete tape-out and validation of CIM chips"* as a **future outcome of the raise** |
| `en.ts:113-114` | *"**Green means it exists on shipping hardware.**"* | Under the page's own definition, cards 2 and 3 fail it |

Only **card 1 (MINT, 17.6 TOPS/W)** survives: MINT's May-2023 mass production comes from the parent's **public**
company history, not the deck, and is solid. Cards 2 and 3 describe a product family the parent's own current roadmap
launches next year. A benchmark on a part that has not taped out is a **projection**, however it was produced.

This is `CLAUDE.md` §2.1 — the first of the four forbidden things, *"không trộn 'đã có' với 'lộ trình'"* — broken by
the page itself, on the exact block built to demonstrate that it never does that.

**Fix:** either re-label cards 2 and 3 as `roadmap` with the note *"projected, PAPAYA family launches 2027 per parent
roadmap"*, or move both into the products block as design targets and let the Numbers block carry **one** number
(MINT) plus something real from §3. One honest number beats three of which two are contested. Also rewrite `:79` and
the legend at `:113-114`.

### 4.2 🔴 FALSE — "Expected Sep 2026" for ESPRESSO is a year stale

Appears five times: `en.ts:110` (stat card), `:172` (timeline entry "Sep 2026"), `:204` (product card), `:297`
(domains, *"the ESPRESSO version follows the Sep 2026 roadmap"*), `:390` (FAQ 03, *"expected in September 2026"*).
The footnote at `:174-175` sources it to the **IR deck dated 5 January 2026**.

Deck v4 slide 17, verified by eye: **"Launch Digital CIM (Espresso Family)" sits in 2027**, and slide 16 uses future
tense — *"Digital CIM-based ESPRESSO **will** expand the business beyond edge AI modules"*. Slide 7 gives the specs
(TSMC N6, ~160 TOPS, ~10 W) with **no date at all**.

Today is 2026-08-20. The page promises a part **next month** that the parent's current material puts a year out. This
one has a clock on it: on 1 October 2026 it stops being a stale citation and becomes a visibly broken promise, on the
page whose entire pitch is that it labels honestly. **This is the most urgent single edit in this review.**

### 4.3 🟠 "Six sectors the platform already works in"

`en.ts:262`. The deck's own framing of the same application set (s12) is, per the extraction, *"breadth of addressable
applications, not proof of shipment"* — all eight application blocks are `unclear`, asserting no product, no customer
and no delivery date. Of the six sectors on the page, exactly **one** has a demonstrated instance: Home IoT, the
Feb-2024 MINT PoC (voice-controlled lighting with emergency call bell), which the card correctly cites.
**"already works in" is not supported.** "Six sectors the platform is built for" is true and costs one word.

### 4.4 🟠 Vietnam and Saudi both badged `shipped` in Track record

- **Vietnam** (`en.ts:143-149`, status `shipped`): the content is a plan, not a record. The parent's own slide 18
  calls it a *"2026 local marketing and sales channel agreement"*. A green badge on a market with no history
  devalues the badge on the three markets that have one.
- **Saudi Arabia** (`en.ts:136-142`; office row `en.ts:245-250`): rests on the March-2024 Cluster AI Lab JV from the
  public company history. **Saudi Arabia does not appear anywhere in deck v4's Global Expansion slide** — slide 18,
  verified by eye, shows exactly three pillars: Korea HQ, Japan Subsidiary, Pebble Vina Partnership. The page claims
  "Four markets, one playbook" and "Two continents, four addresses" while the parent's current strategy document shows
  three regions and does not mention the Gulf. Note also that the Saudi "address" is not an address — it reads
  *"Joint-venture investment agreement signed March 2024"*, and a careful reader notices the table has a hole in it.
  **Confirm the JV is live before the page keeps counting it as a market.**

### 4.5 🟠 The page says PIM 12 times; the parent's current deck says CIM throughout

`grep -c` on `web/content/en.ts`: **PIM 12, CIM 0** (`:13, :15, :85, :126, :140, :159, :162, :172, :185, :186, :194,
:200`). Deck v4 says **Compute-In-Memory / CIM** on every technology slide — "Analog CIM", "Digital CIM", "SRAM-based
CIM", "Proprietary CIM IP". The public site still says Analog-PIM, so the page is not wrong. But anyone holding the
parent's current material reads a subsidiary using the parent's previous vocabulary, and the two most damaging
inferences are *"they are working from an old deck"* and *"they are not actually close to the parent"*. For the Korean
FDI audience — the one that most often has both documents — that is a real cost for a mechanical fix.
Recommendation: lead with the parent's current term and gloss the old one once — "Compute-In-Memory (CIM, previously
Analog-PIM)". Proper nouns stay per `CLAUDE.md` §4.

### 4.6 🟡 ">800 US patents · >200 SCI papers" labelled "IP depth"

`en.ts:224`. Covered in §2.4. Deck s19 places these under **"Pebble Square *Leadership* Track Record"** — career
totals for four individuals, ownership `[not stated]`. The page's label converts them into company IP. This is the
single most checkable overstatement on the page. Either write *"Leadership career record: >800 US patents and >200 SCI
papers across the four technical leaders (parent's investor material)"* — which is still strong — or delete the line.
Do not leave it as "IP depth".

### 4.7 🟡 "Pebble Square IR deck, 5 Jan 2026" as a public citation

Visible on three of four stat cards (`en.ts:86, :93, :100, :108`) and in the timeline footnote and footer disclaimer.
Two problems. **Verifiability:** a source the reader cannot obtain is not a source — it reads as a citation and
functions as an assertion, and the engineer audience knows the difference. **Disclosure:** it advertises to every
visitor that a private investor deck exists and is dated, which invites "can I see it?" from people who should not
receive it. Either cite something obtainable, or attribute more neutrally ("Pebble Square internal measurement data,
2026") and be ready to produce the figure under NDA on the call.

---

## 5. Mislabelled facts — shipped vs roadmap vs pipeline

| Item | Page label | Deck's actual stage | Verdict |
|---|---|---|---|
| MINT 17.6 TOPS/W, mass production May 2023 | `shipped` | Public company history; not contradicted by v4 | ✅ correct |
| PAPAYA FLEX ~50× vs Jetson Nano | `shipped` (`:94`) | Papaya family **launches 2027**; tape-out 2027 (s17) | ❌ **false** |
| PAPAYA ~10,000× at 5G base station | `shipped` (`:101`) | same | ❌ **false** |
| ESPRESSO 160 TOPS | `roadmap`, "Expected Sep 2026" | **2027** launch (s17); no date on s7 | ⚠️ correctly labelled, **wrong date** |
| Six business sectors "already works in" | implied shipped (`:262`) | Addressable applications; one demonstrated (s12) | ⚠️ overstated |
| Pebble Vina, Vietnam market | `shipped` (`:148`) | "Partnership" / "sales channel agreement" (s18) | ⚠️ overstated |
| Cluster AI Lab, Saudi Arabia | `shipped` (`:141`) | Absent from v4's expansion slide (s18) | ⚠️ unverified currency |
| ">800 US patents" as "IP depth" | implied company asset (`:224`) | Leadership career totals (s19) | ⚠️ misattributed |
| Timeline items Sep 2021 – Oct 2025 | `shipped` | Public company history | ✅ correct |
| Team: 4 people, 3 Tokyo PhDs | stated | s19 confirms; **page omits the employers** | ✅ correct but under-sold |
| Private LLM: "A configuration ships today on commercial GPUs" (`:297`) | implied shipped | Not in the deck; PV's own claim | ⚠️ needs an internal source |
| Arc-fault / electrical safety = PV layer, "Not a Pebble Square product" (`:300-304`, `:400-403`) | PV-origin | Deck s16 claims AFCI commercialization **for PS**; s26 shows joint development | 🔶 **UNRESOLVED — see §3.1. Change nothing yet.** |

**Direction of error is worth noting.** Every mislabelling on this page runs the same way: toward more maturity than
the parent claims. None runs the other way. That is a systematic optimism bias in how the deck and the public site were
read, not a set of isolated slips — and it is worth naming, because the same bias will reappear in the next content
pass unless someone is watching for it.

---

## 6. The eight objections

The eight things a real buyer raises in a first call with an unknown chip company.

| # | Objection | Status | Where it lives / why not |
|---|---|---|---|
| 1 | **"Who are you? Are you real?"** | ✅ **Answered** | Hero trust strip, `04 Who they are`, `05 Where`, tax code 0111545175, business licence 879-88-02299, FAQ 01–02, and a live link to pebble-square.com. Genuinely well done — this is the page's strongest work, and giving the reader a direct route to verify is the behaviour of a confident seller. |
| 2 | **"Has anyone actually bought this? Who else uses it?"** | ❌ **Ignored** | **Nowhere on the page.** Zero customers, zero deployments, zero units, zero sites, zero logos, zero references, zero "used by". FAQ 08 addresses *why the page talks about the parent* but never touches demand. **Blocker.** The deck holds §3 items 1, 2, 3, 9, 10 against this. |
| 3 | **"Is there real silicon, or is this a deck?"** | ⚠️ **Partial — and partly wrong** | FAQ 03 (`:388-391`) answers it directly and well for MINT. But cards 2 and 3 imply Papaya silicon exists (§4.1) and the ESPRESSO date is stale (§4.2). Half-answered, half-misanswered. |
| 4 | **"Why not a Jetson, a Hailo, or just a GPU?"** | ⚠️ **Partial** | FAQ 04 (`:392-395`) is honest and good — *"If your problem is training large models, a GPU is still the right answer"*. But the only comparators anywhere are a **Jetson Nano** (a 2019 part) and an **NVIDIA L4**. Hailo, Ambarella, Kneron, Axelera, SiMa.ai — the parts actually on the shortlist — are absent. Deck s4's positioning table (§3 item 11, route **a**) fixes this in one screen. |
| 5 | **"What does it cost? What's the ROI?"** | ⚠️ **Partial** | FAQ 07 (`:404-407`) explains the *shape* — buy once vs rent monthly — and refuses a price list, which is defensible. But there is no order of magnitude, no worked TCO comparison, no payback period, nothing a buyer can take to a budget holder. A range or a single worked example would not commit anyone. |
| 6 | **"Who supports it when it breaks? Will you exist in three years?"** | ⚠️ **Partial** | Block 07 asserts *"Engineers on your factory floor"* (`:322-327`) — asserted, never evidenced. No headcount, no Vietnamese engineer count, no SLA, no response time, no service model, no spare-parts or RMA path. On longevity: nothing about the parent's runway, and note `01-proof-bank.md` §G records parent revenue at **−86% YoY** as `internal`. This audience will ask; the page has no answer prepared. |
| 7 | **"Can I get hands on it — dev kit, SDK, eval board, docs?"** | ❌ **Ignored** | No dev kit, no eval board, no SDK download, no documentation link, no part numbers, no sample request, no developer path of any kind. "Pebble AI Studio" is a paragraph (`:191-197`) with no link. **Blocker for the engineer evaluator** — the person `00-brief.md` identifies as the one who advises the signer. |
| 8 | **"What are the risks — supply, lifecycle, second source, export control?"** | ❌ **Ignored** | No longevity/lifecycle commitment, no supply assurance, no second-source position, no export-control or compliance statement. The only certifications named anywhere are the three standards in the arc-fault card (`:302`), and those are *targets for a layer PV will build*, not certifications held. An industrial buyer designing a part into a five-year product asks this in the first call. |

**Score: 1 answered · 4 partial · 3 ignored.** Objections 2 and 7 are the two that end calls, and both are ignored.

---

## 7. Conversion funnel findings

**The one action** (`00-brief.md`): book a 30-minute consultation.

**7.1 The primary CTA is a `mailto:`.** `web/content/site.ts:33-36`:
```ts
export const CTA_HREF = `mailto:${SITE.contact.email}?subject=…"Consultation request — Pebble Vina"`;
```
Every "Book a 30-minute consultation" on the page — sticky header, hero, mid-page block 07, final CTA — opens a blank
email client. This is the highest-friction terminal action available. On mobile it may open nothing; on a corporate
desktop with webmail it often opens nothing; and it asks a cold visitor to compose prose from scratch about a subject
they only half understand. The button says *book*; the behaviour is *compose*. **The page promises a booking and
delivers a blank page.** Everything upstream — thirteen blocks of careful, sourced, well-written argument — funnels
into that. Highest impact-per-hour fix on the whole list.

**7.2 The value of the call is stated well, and this is a real strength.** *"Thirty minutes, one straight answer"*,
*"You describe the problem. We say plainly whether on-site processing fits it — and if it does not, we say so"*
(`:346-352`), *"A yes/no answer, free of charge"*. Block 08 "What actually happens after you click" is the second-best
block on the page and closes G4 properly. It is a genuinely well-sized ask.

**7.3 There is no low-commitment step. G5 is not closed, despite `03-structure.md` §6 marking it closed.**
The hero's secondary CTA is *"See what has been built"* → `#track-record` (`en.ts:35-36`) — a scroll anchor, not an
asset. The final CTA's secondary is *"Email us directly"* → another `mailto:`. So the page's two "paths" are: email
them, or email them. `00-brief.md` specified a second route — *"Xem hồ sơ năng lực"*, a capability PDF — and
`05-backlog.md` #6 records it as still missing. **Roughly nine in ten qualified visitors are not ready to talk to a
human on first contact, and this page has nothing for them.** No PDF, no spec sheet, no newsletter, no
"send me the comparison", no gated anything. They leave with nothing and the company learns nothing about them.

**7.4 No engineer path.** Related to objection 7 but distinct as a funnel issue: the technical evaluator has no
low-commitment action either. "Request an evaluation kit", "Get SDK access", "Download the MINT brief" — none exist.
The page identifies the engineer as the decisive audience and then offers them the same blank email as everyone else.

**7.5 No qualification, no routing.** A `mailto:` captures no company, no sector, no problem type, no volume, no
timeline, and cannot route. A five-field form would qualify every inbound lead and cost less than one block of copy.
`00-brief.md` scopes forms out ("chỉ mailto:/tel:") — that scope decision is the thing to revisit, because it is the
constraint doing the most commercial damage on the page.

**7.6 Coverage and hygiene are good.** The CTA is present at every scroll position via the sticky header, including at
360px where it correctly stays outside the hamburger (`03-structure.md` §3) — that is textbook and worth keeping.
Phone and email are visible in the final block and the footer. Mobile screenshots (`mob-01`, `mob-03`, `mob-13`) show
the layout holds up and the CTA stays reachable. G6 genuinely closed.

---

## 8. Competitive frame — why act now

**The page gives no reason to act now, and does not engage its real competitor.**

**8.1 Doing nothing wins by default.** The buyer's live options are: keep the cloud subscription, keep the existing
rule-based sensors, keep the incumbent, or wait a year and see who is still trading. The page's only argument against
inaction is one pillar line — *"Hardware you buy once instead of inference you rent monthly"* (`:72`) — plus one FAQ
paragraph. There is **no cost of delay, no trigger, no deadline, no regulatory forcing function, no scarcity, and no
consequence of waiting.** Block 01 "Why now" is titled for urgency and then argues about **the world's** energy
problem, not **this buyer's** next quarter. A Vietnamese plant manager reads three screens about global data-centre
electricity and correctly concludes none of it changes anything for them this year.

**8.2 The comparison set is a 2019 part.** See objection 4. Beating a Jetson Nano on power is table stakes in edge AI
in 2026 — every competitor claims it. The page never names the parts actually on the shortlist. Worse, the two
benchmarks doing the comparative work are the two carrying false `SHIPPING` badges (§4.1), so the competitive argument
is also the least defensible part of the page.

**8.3 The genuine urgency levers exist and none is pulled.** Available today, none requiring an unreleased fact:
- **Data residency and sovereignty.** The strongest lever the group has, and the one competitors cannot answer by
  cutting price. It appears as a *feature* ("Private", "on-device") and never as a *deadline*. Government, banking,
  healthcare and FDI manufacturing in Vietnam face real and tightening data-localisation pressure. That is a clock,
  and the page does not start it.
- **Capacity is finite and first-come.** Pebble Vina is a small entity with a handful of application engineers. The
  number of Vietnamese pilots it can run in 2026 is genuinely limited. Saying so is true, checkable and urgent.
- **Design-in windows close.** Anyone building a product for 2027 chooses their silicon in 2026. If the parent's
  roadmap really lands Papaya and Espresso in 2027 (s17), then the *honest* urgency argument is: **start the
  evaluation now to be ready when the parts land**. That converts the roadmap from a weakness into the reason to
  book the call — and it requires no new facts, only the truth from §4.2.
- **First-mover in-country.** No competitor has a Vietnamese entity with Korean silicon behind it. That is a real,
  temporary window and the page never claims it.

**8.4 One structural note.** The mid-page CTA in block 07 sits directly under *"Korean technology, Vietnamese
accountability"* (`:338`) — the single best line on the page, and correctly placed. That block is where the buyer is
most persuaded. It deserves the urgency argument, not just the button.

---

## 9. Fix list, ranked by sales impact per unit of effort

| # | Fix | Where | Effort | Route | Expected effect on booked calls |
|---|---|---|---|---|---|
| **1** | **Re-label the two false `SHIPPING` badges.** Cards 2 and 3 → `roadmap` with *"projected; PAPAYA family launches 2027 per parent roadmap"*. Rewrite the lead and legend that assert measurement on shipping silicon. | `en.ts:79`, `:94`, `:101`, `:113-114` | 30 min | (a) | Removes the one defect that ends a call with a technical evaluator. No upside — pure downside removal, which is why it is first. |
| **2** | **Correct the ESPRESSO date** — Sep 2026 → 2027 (parent's current roadmap), in all five places. Add **TSMC N6** once approved. | `en.ts:110`, `:172`, `:204`, `:297`, `:390` | 1 h + one HQ email | (b) | Kills a promise that becomes visibly broken on 1 Oct 2026. Adding the node turns a correction into a credibility gain. |
| **3** | **Add the leadership prior employers** — IBM Research, Qualcomm, KAIST professorship, KIST, YMTC/HHGrace/Qimonda + "strong mass-production experience". | `en.ts:213-218` | 1 h | **(a)** | Largest credibility gain per word on the page, needs no approval, breaks no rule. Decisive for Japanese partners and engineers. **Do this today.** |
| **4** | **Fix or delete ">800 US patents" as "IP depth."** Re-label as leadership career record, or remove. | `en.ts:224` | 10 min | (a) | Removes the page's most checkable overstatement. Ten minutes to protect every other number on the page. |
| **5** | **Give the primary CTA a real destination.** Replace `mailto:` with a booking link (Cal.com / Google Calendar appointment schedule) or a five-field qualifying form. | `site.ts:33-36` | 1 h (booking link) / 1 day (form) | (a) | Highest single-fix conversion impact on the page. Every block funnels here and the button currently does not do what it says. |
| **6** | **Build an anonymised demand-evidence block.** "Live PoCs in four countries" + a completed in-vehicle PoC with a German premium car maker + NDAs with a Vietnamese automotive group, a national IT services firm, two state telecoms and two state research institutes. No names. Place it directly after the Numbers block. | new block; `en.ts` + `vi.ts` + `landing.tsx` | 1 day + GM sign-off | **(c)** | **Closes G1** — the biggest blocker in this review. Highest absolute impact on the list; ranked 6th only because it needs sign-off and the five above do not. |
| **7** | **Ship the missing second path** — a real one-page capability PDF behind the hero's secondary CTA, which today is a scroll anchor. | `en.ts:35-36`; `05-backlog.md` #6 | 1 day | (a) | Actually closes G5. Captures the majority of qualified visitors who are not ready to talk to a human. |
| **8** | **Add the engineer path** — "Request an evaluation kit / SDK access", plus a part-level spec table (package, node, interfaces, operating range). | new sub-block in `03 Products` | 0.5 day + HQ input | (b) | Unblocks objection 7 and the audience that advises the signer. Currently a chip company offering a chip engineer nothing but an email address. |
| **9** | **Add the competitive table** from deck s4 (GPU/NPU vs MCU vs Cloud vs Pebble Square) and the Cloud-vs-Private-server table from s9. | new block or into `01 Why now` | 0.5 day | **(a)** | Answers objection 4 properly and serves the government/data-sensitive audience. No approval needed. Watch the one-block-one-screen rule (`CLAUDE.md` §4b) — this needs its own block. |
| **10** | **Turn the roadmap into urgency.** State the parent's dated 2026→2029 roadmap and make the design-in-window argument: evaluate now to be ready when the parts land. | `05 Timeline` + block 07 | 0.5 day | (b) | The only "why act now" argument available that needs no new facts. Converts §4.2's correction into a reason to book. |
| **11** | **Reconcile the Vietnam relationship wording** with slide 18 ("Partnership / sales channel agreement") before a Korean reader does it for you. Get the ownership structure settled (`05-backlog.md` #2). | `en.ts:31`, `:143-149`, `:424` | GM + HQ decision | (b) | Protects the audience most likely to hold both documents. |
| **12** | **"Six sectors the platform already works in" → "is built for."** | `en.ts:262` | 5 min | (a) | One word, removes an unsupported claim. |
| **13** | **Verify the Saudi JV is current** — absent from deck v4's expansion slide. If not live, drop it from "four markets" and "four addresses". | `en.ts:136-142`, `:245-250` | HQ confirmation | (b) | Prevents an awkward question with the Korean network. |
| **14** | **Decide PIM vs CIM** and align — lead with the parent's current term, gloss the old one once. | `en.ts` ×12, `vi.ts` | 1 h + decision | (a) | Removes an "old deck" signal for the audience that has the new one. |
| **15** | **Move block 07 (Pebble Vina) up**, above the Korean org chart and address table. | `03-structure.md` §1, `landing.tsx` | 0.5 day | (a) | The Vietnamese buyer currently abandons six screens before the block written for them. |
| **16** | **Real photographs** — office, team, hardware on a bench. G9, the only gap `03-structure.md` §6 admits is open. | `05-backlog.md` #5 | GM | (b) | A deep-tech page made entirely of vector graphics reads as a company with nothing to photograph. |

---

## 10. Facts the company must supply → backlog

Ordered by what they unlock. Nothing here can be written around, invented, or inferred. Route codes as §3.

| # | Fact needed | Unlocks | From | Route |
|---|---|---|---|---|
| **B1** | **The four AFCI questions in §3.1** — who bought the 3,000+ units and what they were; whether the revenue is PS's or a partner's; which approvals from which body; and whether HQ authorises attributing AFCI to Pebble Square publicly given the public site does not list it | The single most valuable claim available. Closes G1 alone. Would require amending `CLAUDE.md` §2.2 and `01-proof-bank.md` §H.2 | GM + HQ | (b) |
| **B2** | **Permission to describe the BMW PoC anonymously** — "a completed in-vehicle PoC with a German premium car maker" | Strongest competence signal in the deck | HQ (+ counterparty view) | (c) |
| **B3** | **Permission for the Vietnamese aggregate** — NDAs with a Vietnamese automotive group, a national IT services firm, two state telecom operators, plus a joint-R&D NDA with two state research institutes, **without names** | The Vietnamese buyer's core objection: *does anyone here take this seriously?* | GM + counterparties | (c) |
| **B4** | **Confirmation of ESPRESSO's real launch window and whether TSMC N6 can be stated publicly** | Fixes §4.2 permanently; adds the strongest single engineer-facing credibility token | HQ · already `05-backlog.md` #9, still the top open item | (b) |
| **B5** | **Whether PAPAYA / PAPAYA FLEX benchmarks were measured on silicon or simulated, and on what** | Determines whether the Numbers block keeps three cards or one | HQ | (b) |
| **B6** | **Whether JPY 100M / the 2025 overseas excellent startup attraction program selection is publicly announced** | Third-party validation, denominated; decisive for the Japanese audience | HQ | (b)→(a) |
| **B7** | **Whether the Samsung SF4X / PS10 programme can be referenced at all**, relationship only, no volumes and no customer | Moves the group into a different weight class | HQ | (b) |
| **B8** | **Ownership structure** — "member of the group" vs "partnership / sales channel agreement" (s18) vs subsidiary; % and effective date | Everything in §4.4 and fix 11. Already `05-backlog.md` #2 and still the quietest large risk on the page | GM + HQ | (b) |
| **B9** | **Is the Saudi Cluster AI Lab JV still live?** Absent from deck v4 s18 | Whether "four markets / four addresses" survives | HQ | (b) |
| **B10** | **Support model in Vietnam** — how many application engineers, response time, service scope, spare parts | Objection 6, which the page currently only asserts | GM · related to `05-backlog.md` #4 | (b) |
| **B11** | **Real photographs** — Landmark 72 office, team, hardware | G9, the last admitted open gap | GM · `05-backlog.md` #5 | (b) |
| **B12** | **Cost order of magnitude or one worked TCO example** | Objection 5, currently answered with a shape and no number | GM | (b) |
| **B13** | **A source for "a configuration ships today on commercial GPUs"** (`en.ts:297`) — not in the deck | Whether that sentence survives | GM | (b) |
| **B14** | **The five to eight questions real prospects actually ask** — today's eight FAQs are inferred | Replaces a reasoned FAQ with an observed one | GM · `05-backlog.md` #7 | (a) |

**Do not invent, estimate, round or imply any of these.** `CLAUDE.md` §2 closing paragraph: no fabricated revenue,
customer counts, customer names, or partner logos. An empty space is recoverable; a fabricated number is not.

---

## 11. Confidentiality routing summary

The deck is Series-A investor material, not public. Every unused proof in §3 routed:

| Route | Meaning | Count | Items |
|---|---|---|---|
| **(a)** | Publishable today as-is | **6** | Leadership prior employers (s19) · eNVM/SRAM architecture basis (s6, s7) · CIM terminology (deck-wide) · GPU/NPU/MCU/Cloud positioning table (s4) · Cloud-vs-Private-server table (s9) · five revenue streams (s14) |
| **(b)** | Publishable if the company confirms/approves | **7** | AFCI 3,000+ units (s16) ★ · ESPRESSO TSMC N6 + 2027 (s7, s17) · JPY 100M + Japanese government programme (s18) · dated 2026–2029 GTM roadmap (s17) · Samsung SF4X / PS10 relationship (s29, s30) · Vietnam relationship wording (s18) · Saudi JV currency (absent from s18) |
| **(c)** | Publishable only aggregated / anonymised | **4** | BMW → "a German premium car maker" (s15, s16, s23, s24) · Vietnamese NDA names → sector aggregate (s15) · PoC geography → "four countries" (s15) · the four appendix application cases → unnamed capability cases (s25–s28) |
| **(d)** | Not publishable | **4** | Series-A 40 MUSD target raise + 40/20/15/15/10 use of proceeds (s20) · PS10 60,000-wafer forecast, 5.4M gross dies, 30% yield assumption, 1.62M usable chips, 2027–2030 ramp (s30) · named Discussion-stage companies — Cuckoo, HD Electric, IntenteK, Iris Ohyama, Meisei Electric, Daito Kentaku, AICC, Haier, VinFast, VinRobotics, FPT, Mobifone, VNPT (s15) · "Tier-1 customer status" / "Preferred wafer pricing" as bare assertions, and the unnamed PS10 overseas customer (s29, s30) |
| | **Total** | **21** | |

**Two observations that matter more than the tally.**

First, **six items need no permission from anyone** and the page uses none of them. Item (a)4 alone — writing "former
IBM Research", "former Qualcomm", "KAIST professor" next to four names that currently carry only degrees — is an hour
of work with no approval, no rule broken, and no risk. The page is not blocked by confidentiality nearly as much as it
appears to be. It is leaving free evidence on the table.

Second, **the (c) column is where G1 actually gets closed.** "Live PoCs in four countries", "a completed in-vehicle
PoC with a German premium car maker", "NDAs signed with a Vietnamese automotive group, a national IT services company
and two state telecom operators" — every one of those is true, none names a counterparty, none discloses a number from
the deck, and together they are the difference between a page with no demand evidence and a page with some. That is
one conversation with the GM, not a change of strategy.

---

## 12. What is genuinely good, and should not be lost in a rewrite

A blunt review owes an accurate account of the strengths, because the fixes above must not damage them.

1. **The labelling architecture itself.** `shipped` / `roadmap` badges with visible sources is the most valuable thing
   this repo has produced, and `05-backlog.md` is right that it is a *process* worth porting. §4 attacks two
   applications of it, not the idea. Fix the labels; keep the system.
2. **FAQ 06, the arc-fault answer** (`en.ts:400-403`). A page that answers *"we need arc-fault for solar"* with
   *"Pebble Square does not list arc-fault among its business sectors… the platform exists; the application layer is
   built with you"* is doing something almost no vendor page does. Keep it exactly as it is until §3.1 resolves.
3. **FAQ 08** (`en.ts:408-411`) — answering *"why does this page spend so much space on the parent company?"* out loud
   turns the page's biggest structural weakness into evidence of candour.
4. **Block 08, "What actually happens after you click"** — four steps, each with a deliverable, opening with
   *"Nothing is signed at step one"*. Closes G4 properly and sizes the ask correctly.
5. **Block 07, "So why not buy directly from Korea?"** — the best-argued block on the page, and
   *"Korean technology, Vietnamese accountability"* is the best line on it. It is simply six screens too late.
6. **Craft.** Typography, rhythm, the light/dark alternation, mobile behaviour, and the sticky CTA that stays outside
   the hamburger at 360px are all done properly. Nothing in this review is about design.

The problem with this page is not how it is built or how it is written. It is that it proves the parent **exists**
when the buyer needs proof that the parent's technology has been **bought** — and that two of the four numbers
carrying its credibility are labelled in a way the parent's own current deck contradicts.

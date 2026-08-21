# Semiconductor / AI chip

The evaluator is an engineer who opens the page assuming they are being oversold. Every sentence is
read against that assumption.

## Technology section

**BAD**
> Our revolutionary PIM architecture delivers unprecedented performance per watt, redefining what is
> possible at the edge.

Fails: `revolutionary`, `unprecedented`, `redefining` — three superlatives and not one number, on a
page whose entire audience reads numbers first.

**GOOD**
> MINT performs the multiply-accumulate inside the memory array, so the weights never cross a bus.
> Measured at 17.6 TOPS/W, in mass production since May 2023.

Works: mechanism, then the measured figure, then the manufacturing status. Three checkable facts in
two sentences.

## Benchmark

**BAD**
> Up to 100× more efficient.

Fails: no counterparty, no workload, no method. An engineer reads this as "the number is meaningless
and they know it".

**GOOD**
> On ResNet-50, PAPAYA FLEX reaches 333–500 FPS/W against 3.6–7.2 FPS/W for an NVIDIA Jetson Nano —
> roughly 100×.

Works: workload, counterparty, both raw figures, then the multiple. The multiple is the headline
only because the reader can already verify it.

## Roadmap part

**BAD**
> Our 160 TOPS accelerator powers on-premise LLMs up to 120 billion parameters.

Fails: presents an unshipped part as inventory. On a page that also lists shipping parts, this
single sentence makes an engineer re-audit everything above it.

**GOOD**
> **ESPRESSO — roadmap, September 2026.** 160 TOPS at INT8, 10 W. From the investor deck; not yet on
> the public catalogue.

Works: the label comes first, the source is named. Labelling your own best number as unshipped is
what buys belief in the numbers that are shipped.

## Attribution

**BAD**
> Pebble Square's chips detect electrical arc faults in solar installations.

Fails: merges the parent's real capability with the subsidiary's application layer. It is the one
sentence on the page an informed reader can disprove in a minute.

**GOOD**
> Pebble Square builds anomaly detection and predictive maintenance for robots and machinery.
> Pebble Vina builds the electrical-safety application layer on top of it for the Vietnamese market.

Works: two named parties, two named scopes. Nobody has to guess who did what.

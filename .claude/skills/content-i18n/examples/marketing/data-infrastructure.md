# Data infrastructure

## Product page

**BAD**
> A next-generation, cloud-native data platform built for scale.

Fails: three category words. Every competitor's page says the same sentence.

**GOOD**
> Streams change events from Postgres, MySQL and MongoDB into your warehouse with a lag under ten
> seconds at steady state.

Works: named sources, named destination, a measured property, and the condition under which it
holds. `at steady state` is doing real work — it is the qualifier that keeps the claim true.

## Reliability

**BAD**
> Enterprise-grade reliability you can count on.

**GOOD**
> At-least-once delivery. Duplicates are possible after a failover; every event carries an id so
> your sink can deduplicate.

Works: states the guarantee precisely, names the failure mode, and hands the reader the tool for
it. This is what an infrastructure buyer is actually shopping for.

## Cost

**BAD**
> Dramatically reduce your data infrastructure costs.

**GOOD**
> Priced per GB of change data, not per source connector. Adding a table does not add a line item.

Works: the pricing shape is the claim. No invented percentage.

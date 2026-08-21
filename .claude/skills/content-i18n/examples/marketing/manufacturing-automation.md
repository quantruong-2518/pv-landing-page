# Manufacturing automation

The reader is a plant maintenance director. Downtime is measured in money per hour and they know
the number.

## Solution page opening

**BAD**
> Transform your factory with Industry 4.0 intelligence.

Fails: a category slogan. It does not say what breaks today or what stops breaking.

**GOOD**
> A bearing fails on the main conveyor and the line stops for the rest of the shift. The vibration
> signature changes days earlier — but only if something is listening at the machine.

Works: names the failure, the cost, and the gap the product fills. The product has not been
mentioned yet, and does not need to be.

## Mechanism

**BAD**
> AI-powered predictive maintenance for smarter operations.

**GOOD**
> A sensor module on the motor housing runs the anomaly model on-device and raises a flag on the
> maintenance board. No gateway, no cloud round trip, no plant network changes.

Works: what is installed, where the inference runs, where the output lands, and — critically — the
three things IT does **not** have to approve.

## Limits

**BAD**
> Works with any equipment.

**GOOD**
> Works where a vibration or current signature exists. It will not predict a tool crash or an
> operator error.

Works: naming what it cannot do stops the pilot that was going to fail and sours the account.

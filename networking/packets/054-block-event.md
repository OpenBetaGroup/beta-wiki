---
title: "0x36: Block Event"
order: 55
---

# Block Event

| Packet ID | Direction   | Mojang Name       | MCP Name                |
| --------- | ----------- | ----------------- | ----------------------- |
| `0x36`    | Clientbound | `TileEventPacket` | `Packet54PlayNoteBlock` |

## Clientbound

This packet is sent to inform the client when a block has performed an action. There are only two blocks that make use this packet: note blocks and pistons.

## Note Block

Note blocks use the packet to indicate they've played a tone. They use the two bytes the packet offers for instrument and pitch information.

| Field      | Type    | Description                       |
| ---------- | ------- | --------------------------------- |
| X          | Integer | The X block position of the block |
| Y          | Short   | The Y block position of the block |
| Z          | Integer | The Z block position of the block |
| Instrument | Byte    | The instrument type               |
| Pitch      | Byte    | The pitch of the note             |

| Value | Instrument |
| ----- | ---------- |
| `0`   | Harp       |
| `1`   | Bass Drum  |
| `2`   | Snare Drum |
| `3`   | Hi-hat     |
| `4`   | Bass       |

## Piston

Pistons use it to indicate whether they're extended or not and what direction they face. This also plays the piston push or retract sound as needed.\*

| Field     | Type    | Description                                  |
| --------- | ------- | -------------------------------------------- |
| X         | Integer | The X block position of the block            |
| Y         | Short   | The Y block position of the block            |
| Z         | Integer | The Z block position of the block            |
| State     | Byte    | `false` for extending, `true` for retracting |
| Direction | Byte    | The direction the piston extends/retracts to |

The direction matches the lower 3-Bits of the metadata values that're [used for pistons as described on the Blocks page](../../general/blocks#pistons).

| Value | Direction |
| ----- | --------- |
| `0`   | Down      |
| `1`   | Up        |
| `2`   | East      |
| `3`   | West      |
| `4`   | North     |
| `5`   | South     |

::: tip MISSING
A lot of this still needs to be tested. I'm unsure if this just plays the sound or if this is also responsible for playing the piston extend/retract animations!
:::

## Example Packet

::: tip MISSING
TODO: Capture or at least write example packet data
:::

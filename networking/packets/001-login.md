---
title: "0x01: Login"
description: Responsible for finalizing the login process
order: 2
---

# Login

| Packet ID | Direction | Mojang Name   | MCP Name       |
| --------- | --------- | ------------- | -------------- |
| `0x01`    | Both      | `LoginPacket` | `Packet1Login` |

This packet is sent after [Pre-Login](./002-pre-login) to finish logging in. The server is expected to kick the client if any fields are invalid or the client's protocol version does not match the server. The unused fields are also useful for negotiating mod support.

## Clientbound

| Field      | Type     | Description                               |
| ---------- | -------- | ----------------------------------------- |
| Entity ID  | Integer  | The entity ID of the player               |
| Unused     | String16 | This string is always Empty (Size of `0`) |
| World Seed | Long     | The random seed for terrain generation    |
| Dimension  | Byte     | The player's spawning dimension           |

The player's dimension is specified as `0` for The Overworld, `-1` for The Nether and `1` for Sky.

> [!NOTE]
> Unlike Overworld, if Sky dimension is used, the whole world is in Sky biome, so grass blocks will not be rendered differently based on client-side world generation. 

## Serverbound

| Field            | Type     | Description                                               |
| ---------------- | -------- | --------------------------------------------------------- |
| Protocol Version | Integer  | The current protocol version is `14`                      |
| Username         | String16 | The name of the connecting user                           |
| Unused           | Long     | This value is not used by the client but still expects it |
| Unused           | Byte     | This value is not used by the client but still expects it |

## Example Packets

### Clientbound

| Field      | Value                |
| ---------- | -------------------- |
| Entity ID  | `1298`               |
| Unused     | (EMPTY)              |
| World Seed | `971768181197178410` |
| Dimension  | `0`                  |

### Serverbound

| Field            | Value   |
| ---------------- | ------- |
| Protocol Version | `14`    |
| Username         | `Notch` |
| Unused           | `0`     |
| Unused           | `0`     |

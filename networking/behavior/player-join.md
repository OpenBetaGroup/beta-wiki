---
order: 10
description: The behavior observed when a new player joins the server is exceedingly interesting, as it reveals a little bit about how the Protocol came about
---

# Player Joining

The behavior observed when a new player joins the server is exceedingly interesting, as it reveals a little bit about how the Protocol came about.

## An existing player is sent to the new Client

| Direction | Packet                                                                    | Data                                                                                    | Meaning                                                                                                                 |
| --------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `S->C`    | [Login](../packets/001-login)                                             | EID=7; Unknown=""; Seed=4700869286537174060; Dimension=0;                               | The new player gets its EID (7), the Worlds Seed (for biome colors) and Dimension                                       |
| `S->C`    | [Set Compass Target Position](../packets/006-set-compass-target-position) | x=0; y=64; z=0;                                                                         | The players spawn point is sent so compass' point in the correct direction                                              |
| `S->C`    | [Set Time](../packets/004-set-time)                                       | Time=240402;                                                                            | The current world time is sent                                                                                          |
| `S->C`    | [Spawn Player](../packets/020-spawn-player)                               | EID=6; Username="PixelBrushArt"; x=656; y=2272; z=-290; Yaw=79; Pitch=16; Held Item=17; | The other player is spawned with its EID (6). The coordinates are in [entity space](/general/terminology#entity-space). |
| `S->C`    | [Set Equipment](../packets/005-set-equipment)                             | EID=6; Slot=0; Item=17; Damage=0;                                                       | The other players' held item is set                                                                                     |
| `S->C`    | [Set Equipment](../packets/005-set-equipment)                             | EID=6; Slot=1; Item=-1; Damage=0;                                                       | The other players' boots are set                                                                                        |
| `S->C`    | [Set Equipment](../packets/005-set-equipment)                             | EID=6; Slot=2; Item=-1; Damage=0;                                                       | The other players' leggings are set                                                                                     |
| `S->C`    | [Set Equipment](../packets/005-set-equipment)                             | EID=6; Slot=3; Item=-1; Damage=0;                                                       | The other players' chestplate is set                                                                                    |
| `S->C`    | [Set Equipment](../packets/005-set-equipment)                             | EID=6; Slot=4; Item=-1; Damage=0;                                                       | The other players' helmet is set                                                                                        |

It's interesting that the held item is sent twice, despite already being sent with `SpawnPlayer`. However, that packet lacks the data value that is need for some blocks, such as the different kinds of saplings or wool.

> [!NOTE]
> If the held item is less than `0` and not followed up by a `Set Equipment` packet, the sky inverts, as the notchian client never expects to draw block `-1`, failing to acquire the correct block model and running into an `ArrayIndexOutOfBoundsException`. Due to the state of the OpenGL Context by this point in the rendering pipeline, any subsequent rendering process' are messed up, most obviously manifesting by flipping many transparent objects (water, clouds, block selector box) and players.

## A new client shows up on the existing client

| Direction | Packet                                        | Data                                                                         | Meaning                                                                                                              |
| --------- | --------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `S->C`    | [Chat Message](../packets/003-chat-message)   | Message="§eCamera joined the game.";                                         | Join chat message                                                                                                    |
| `S->C`    | [Spawn Player](../packets/020-spawn-player)   | EID=7; Username="Camera"; x=272; y=2355; z=272; Yaw=0; Pitch=0; Held Item=0; | This spawns the new player on the client-side. Coordinates are in [entity space](/general/terminology#entity-space). |
| `S->C`    | [Set Equipment](../packets/005-set-equipment) | EID=7; Slot=0; Item=-1; Damage=0;                                            | The other players' held item is set                                                                                  |
| `S->C`    | [Set Equipment](../packets/005-set-equipment) | EID=7; Slot=1; Item=-1; Damage=0;                                            | The other players' boots are set                                                                                     |
| `S->C`    | [Set Equipment](../packets/005-set-equipment) | EID=7; Slot=2; Item=-1; Damage=0;                                            | The other players' leggings are set                                                                                  |
| `S->C`    | [Set Equipment](../packets/005-set-equipment) | EID=7; Slot=3; Item=-1; Damage=0;                                            | The other players' chestplate is set                                                                                 |
| `S->C`    | [Set Equipment](../packets/005-set-equipment) | EID=7; Slot=4; Item=-1; Damage=0;                                            | The other players' helmet is set                                                                                     |

# Further reading

- [A new player joins (Github - BetrockServer Wiki - Vanilla server Behavior)](https://github.com/OpenBetaGroup/BetrockServer/wiki/Vanilla-Server-Behavior#a-new-player-joins)

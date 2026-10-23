---
description: Dimensions are what Minecraft calls its different worlds that the player can explore, usually via portals. They often have wildly different terrain, mobs and survival strategies.
---

# Dimensions

Dimensions are what Minecraft calls its different worlds that the player can explore, usually via portals.
They often have wildly different terrain, mobs and survival strategies.

## Overworld

The primary world of Minecraft. It is given the numerical Id `0`. It's terrain data is stored in the `world` folder as a result.

The overworld features:

- [Earth-like terrain generation](./generation/overworld)
- Various biomes
- Water oceans
- Progessing time of day
- Changing Weather (Rain, Thunder)
- Can spawn Pigs, Chickens, Cows, Sheep, Squids and Wolves
- Can spawn Zombies, Creepers, Skeletons and Spiders

## Nether

The secondary world of Minecraft, inspired by hell. It is given the numerical Id `-1`. It's terrain data is stored in `world/DIM-1` as a result.

The nether features:

- [Cavern-like terrain generation](./generation/nether)
- Only one biome, "hell"
- Lava oceans
- Can spawn Zombie Pigmen and Ghasts
- Has spontaneously spawning fire
- Water evaporation, meaning it cannot be placed (without exploits)
- Faster lava flow

## Sky

The coveted sky dimension that later became the end dimension. There exist only fragments of functionality in Beta 1.7.3.
It is given the numerical Id `1`. It's terrain data would've likely been stored in `world/DIM1` as a result.

These are:

- The "sky" biome, unused under normal circumstances
- The client properly handling the Dimension Id `1` (Sky) when connecting to a server or respawning (See the [Login](/networking/packets/001-login) and [Respawn](/networking/packets/009-respawn) packets)

## Further reading:

- [Biomes](./generation/biomes)

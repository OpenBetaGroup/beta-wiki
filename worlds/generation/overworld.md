---
order: 10
description: The generation described in this section will explain how Minecraft Beta 1.7.3 does its Overworld Terrain Generation. A lot of this will be based on educated guesses and the decompilation provided by RetroMCP. Additionally, certain historical bits and pieces will be taken from the Minecraft Wiki.
---

# Overworld Terrain

The generation described in this section will explain how Minecraft Beta 1.7.3 does its Overworld Terrain Generation. A lot of this will be based on educated guesses and the decompilation provided by [RetroMCP](https://github.com/MCPHackers/RetroMCP-Java). Additionally, certain historical bits and pieces will be taken from the [Minecraft Wiki](https://minecraft.wiki/w/World_generation/History#Beta_terrain_generator).

> [!NOTE]
> The seed used throughout all of these comparisons is `3257840388504953787`, the seed behind [`pack.png`](https://minecraftathome.com/projects/packpng.html).

> [!NOTE]
> In any visualizations, the shown chunks range from `-1,-1` to `1,1`. Additionally, up is always towards **Negative Z**, while right is always towards **Positive X**.

## History

The first version to have the Beta-era generator was Alpha 1.2.0, and it was used up until Beta 1.7.3.

However, we can see that the general shape of the terrain remains the same by using the same seed and spawn location in Alpha 1.1.2 (pre-rework), Alpha 1.2.3 (post-rework) and Beta 1.7.3.

| A1.1.2                                          | A1.2.3                                          |
| ----------------------------------------------- | ----------------------------------------------- |
| ![](../images/history/a112.webp){data-zoomable} | ![](../images/history/a123.webp){data-zoomable} |

This similar pre-1.2.0 generation dates all the way back to Infdev 20100624, before which the world generation looked entirely different.

| Inf20100624                                           | A1.1.2                                          |
| ----------------------------------------------------- | ----------------------------------------------- |
| ![](../images/history/infdevPack.webp){data-zoomable} | ![](../images/history/a112.webp){data-zoomable} |

Facing the other way reveals some of the more glaring differences between the generators.

| A1.1.2                                               | A1.2.3                                               |
| ---------------------------------------------------- | ---------------------------------------------------- |
| ![](../images/history/a112_pack.webp){data-zoomable} | ![](../images/history/a123_pack.webp){data-zoomable} |

Between Alpha 1.2.3 and Beta 1.7.3 there only exist minor differences, mainly relating to the feature generation.

| A1.2.3                                               | B1.7.3                                               |
| ---------------------------------------------------- | ---------------------------------------------------- |
| ![](../images/history/a123_pack.webp){data-zoomable} | ![](../images/history/b173_pack.webp){data-zoomable} |

## Biomes

To find out more about what biomes exist and how they're defined, check out [the biomes page](biomes)./

This process uses 3 octaved [Simplex Noise](/technical/noise#simplex-noise) generators called Temperature, Humidity and Variation. This process is described [here](biomes#biome-noise).

|                                               Temperature                                               |                                             Humidity                                              |                                              Variation                                               |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| <img src="../images/biome/temperaturePost.png" alt="Temperature map" style="width: 100%;" class="zoom"> | <img src="../images/biome/humidityPost.png" alt="Humidity map" style="width: 100%;" class="zoom"> | <img src="../images/biome/biomeVariation.png" alt="Variation map" style="width: 100%;" class="zoom"> |

<sub>Temperature, humidity and variation values after being modified by this function. These values are in the `0.0 - 2.0` range.</sub>

With this a `16x16` Biome Array is generated, where any block column can contain any of the 13 Biomes.

|                                                  Foliage Colors                                                   |                                                Map Colors                                                 |
| :---------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| <img src="../images/biome/terrainFoliage.png" alt="Biomes with foliage colors" style="width: 100%;" class="zoom"> | <img src="../images/biome/terrainMap.png" alt="Biomes with map colors" style="width: 100%;" class="zoom"> |

<sub>Biomes colored as per the [biomes](biomes#biome-list) page.</sub>

## Terrain Shape

### Noise Octaves

The Beta 1.7.3 terrain generator has a shared [Pseudorandom Number Generator](/technical/javaFeatures#random), alongside 8 [Octaved Perlin Noise Generators](/technical/noise), 7 of which are relevant for world generation.

| Generator          | Octaves |                                               Scale |
| :----------------- | ------- | --------------------------------------------------: |
| Low Noise          | `16`    |                       `(684.412, 684.412, 684.412)` |
| High Noise         | `16`    |                       `(684.412, 684.412, 684.412)` |
| Selector Noise     | `8`     | `(684.412 / 80.0, 684.412 / 160.0, 684.412 / 80.0)` |
| Continentalness    | `10`    |                                    `(1.121, 1.121)` |
| Depth Noise        | `16`    |                                    `(200.0, 200.0)` |
| Tree Density Noise | `8`     |                                          (variable) |

|                                    Low                                     |                                     High                                     |                                       Selector                                       |                                            Continental                                             |                                     Depth                                      |
| :------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :----------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
| <img src="../images/terrain/low.png" alt="Low noise" style="width: 100%;"> | <img src="../images/terrain/high.png" alt="High noise" style="width: 100%;"> | <img src="../images/terrain/selector.png" alt="Selector noise" style="width: 100%;"> | <img src="../images/terrain/continentalness.png" alt="Continentalness noise" style="width: 100%;"> | <img src="../images/terrain/depth.png" alt="Depth noise" style="width: 100%;"> |

<sub>Colors adjusted be more visible.</sub>

Continentalness and depth are 2D, while low, high and selector noise are 3D. As a result, only the lowest slice of each is shown. Tree density is 2D as well, but only used during the [population stage](population#trees) for trees.

### Terrain Noise

The exact algorithm is a bit annoying to explain and feels very vibes-based. A simplified explanation boils down to the following process.

The following code is iterated over along the X,Z axes via a set of for loops. It's responsible for sampling the 2D noises.

```cpp
// Get temperature values
double temp = temperature[];
double humi = humidity[] * temp;
humi = 1.0 - humi;
humi *= humi;
humi *= humi;
humi = 1.0 - humi;
// Sample continentalness noise
double cn = (continentalness[xz] + 256.0) / 512.0;
cn *= humi;
if (cn > 1.0)
  cn = 1.0;
if (cn < 0.0)
  cn = 0.0;
cn += 0.5;
// Sample depth noise
double dn = depthNoise[xz] / 8000.0;
if (dn < 0.0)
  dn = -dn * 0.3;
dn = dn * 3.0 - 2.0;
if (dn < 0.0) {
  dn /= 2.0;
  if (dn < -1.0)
    dn = -1.0;
  dn /= 1.4;
  dn /= 2.0;
  cn = 0.0;
} else {
  if (dn > 1.0)
    dn = 1.0;
  dn /= 8.0;
}
dn = dn * double(max.y) / 16.0;
double elevationOffset = double(max.y) / 2.0 + dn * 4.0;
++xz;
```

After this follow the 3D noises. These are iterated over bottom to top.

```cpp
double terrainDensity = 0.0;
double densityOffset = (double(y) - elevationOffset) * 12.0 / cn;
if (densityOffset < 0.0)
  densityOffset *= 4.0;
// Sample the noises
double ln = lowNoise[xyz] / 512.0;
double hn = highNoise[xyz] / 512.0;
double sn = (selectorNoise[xyz] / 10.0 + 1.0) / 2.0;
// Lerp between low and high noise
if (sn < 0.0)
  terrainDensity = ln;
else if (sn > 1.0)
  terrainDensity = hn;
else
  terrainDensity = ln + (hn - ln) * sn;
terrainDensity -= densityOffset;
// Reduce terrain density towards the top of the world
if (y > max.y - 4) {
  double heightEdgeFade = double(float(y - (max.y - 4)) / 3.0f);
  terrainDensity = (terrainDensity * (1.0 - heightEdgeFade)) + (-10.0 * heightEdgeFade);
}
terrainMap[xyz] = terrainDensity;
xyz++;
```

For more details, check out the implementation used by [Betrock++](https://github.com/OpenBetaGroup/BetrockPlusPlus/blob/main/src/bpp_shared/world/generator/overworld/chunk_gen.cpp).

The result of this is placed into a `4x16x4` Double Array that describes our terrain at a reduced scale.

### Interpolation

Minecraft uses [Trillinear interpolation](https://en.wikipedia.org/wiki/Trilinear_interpolation) to interpolate between the generated density values, to scale them up to the final `16x128x16` chunk size.

The actual decision which blocks are solid or not comes down to the following function.

```c
uint8_t blockType = BLOCK_AIR;
// If water is too cold, turn it into ice
double temp = temperature[columnIndex];
if(y < WATER_LEVEL) {
  if(temp < 0.5 && y >= WATER_LEVEL - 1) {
    blockType = BLOCK_ICE;
  } else {
    blockType = BLOCK_WATER_STILL;
  }
}
// Decide which blocks are solid or not
if(noiseValue > 0.0) blockType = BLOCK_STONE;
// Write to chunk
SetBlock(blockType, position);
```

Some of the values appear to modify themselves for the next loop.

|                                            Terrain                                            |                                                   Terrain (water)                                                   |
| :-------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
| <img src="../images/terrain/terrain.png" alt="Terrain map" style="width: 100%;" class="zoom"> | <img src="../images/terrain/terrainWater.png" alt="Terrain map with water level" style="width: 100%;" class="zoom"> |

<sub>Highest stone blocks. Color values have been tweaked to be more readable.
Blocks at or below water level are marked in blue.</sub>

## Biome Blocks

After the terrain shape has been generated, the chunk is transformed further by the Sand, Gravel and Stone Perlin Noise Generators.

| Generator                    | Octaves |                Scale |
| :--------------------------- | ------- | -------------------: |
| Sand & Gravel Noise (Sand)   | `4`     |  `(1/32, 1/32, 1.0)` |
| Sand & Gravel Noise (Gravel) | `4`     |  `(1/32, 1.0, 1/32)` |
| Stone Noise                  | `4`     | `(1/16, 1/16, 1/16)` |

|                                              Sand                                              |                                               Gravel                                               |                                              Stone                                               |
| :--------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: |
| <img src="../images/terrain/sandNoise.png" alt="Sand noise" style="width: 100%;" class="zoom"> | <img src="../images/terrain/gravelNoise.png" alt="Gravel noise" style="width: 100%;" class="zoom"> | <img src="../images/terrain/stoneNoise.png" alt="Stone noise" style="width: 100%;" class="zoom"> |

<sub>Sand, Gravel and Stone noise. Color values have been tweaked to be more readable.</sub>

The chunk is now iterated over in a nested x and z for-loop.

1. The biome for the specified column is read
2. Its checked if sand is possible to be placed here
3. Its checked if gravel is possible to be placed here
4. An integer is generated for if stone can be placed here
5. The biomes appropriate top and filler block is chosen (e.g. Grass and Dirt)

For this the current block column is iterated over from top to bottom, from `127` down to `0`.

```cpp
// Place Bedrock at bottom with some randomness
if (y <= 0 + rand.nextInt(5)) {
  SetBlock(BLOCK_BEDROCK, position);
  continue;
}
int8_t currentBlock = GetBlock(position);
// Ignore air
if (currentBlock == BLOCK_AIR) {
  stoneDepth = -1;
  continue;
}
// If we counter stone, start replacing it
if (currentBlock == BLOCK_STONE) {
  if (stoneDepth == -1) {
    if (stoneActive <= 0) {
      topBlock = BLOCK_AIR;
      fillerBlock = BLOCK_STONE;
    } else if (y >= WATER_LEVEL - 4 && y <= WATER_LEVEL + 1) {
      // If we're close to the water level, apply gravel and sand
      topBlock = GetTopBlock(biome);
      fillerBlock = GetFillerBlock(biome);
      if (gravelActive)
        topBlock = BLOCK_AIR;
      if (gravelActive)
        fillerBlock = BLOCK_GRAVEL;
      if (sandActive)
        topBlock = BLOCK_SAND;
      if (sandActive)
        fillerBlock = BLOCK_SAND;
    }
    // Add water if we're below water level
    if (y < WATER_LEVEL && topBlock == BLOCK_AIR) {
      topBlock = BLOCK_WATER_STILL;
    }
    stoneDepth = stoneActive;
    if (y >= WATER_LEVEL - 1) {
      SetBlock(topBlock, position);
    } else {
      SetBlock(fillerBlock, position);
    }
  } else if (stoneDepth > 0) {
    --stoneDepth;
    SetBlock(fillerBlock, position);
    if (stoneDepth == 0 && fillerBlock == BLOCK_SAND) {
      stoneDepth = rand.nextInt(4);
      fillerBlock = BLOCK_SANDSTONE;
    }
  }
}
```

## Caves

See the [cave generation wiki page](./caves)

After this, the lighting is updated and the heightmap is generated.

## Heightmap

The initial heightmap generation boils down to iterating through every `xz` coordinate, from the top to the bottom, and stopping if any block with an Opacity that isn't `0` is run into. Additionally, it keeps track of the lowest block height it has encountered up to that point.

## Population

Continue onto the [population page](population) to find out more.

## Further reading

- [Java Edition Far Lands/Infdev 20100327 to Beta 1.7.3](https://minecraft.wiki/w/Java_Edition_Far_Lands/Infdev_20100327_to_Beta_1.7.3)
- [Nether](./nether#generation)
- [Beta 1.8 Generation](https://github.com/PhoenixVX/golden-age-wiki/blob/main/minecraft/genlayer/sequence/b18.md)
- [Release 1.0 Generation](https://github.com/PhoenixVX/golden-age-wiki/blob/main/minecraft/genlayer/sequence/r100.md)
- [Release 1.1 Generation](https://github.com/PhoenixVX/golden-age-wiki/blob/main/minecraft/genlayer/sequence/r11.md)
- [Release 1.2 Generation](https://github.com/PhoenixVX/golden-age-wiki/blob/main/minecraft/genlayer/sequence/r12.md)

---
order: 5
description: Biomes are regions with differing foliage, terrain etc.
---

# Biomes

Biomes are regions with differing foliage, terrain etc.

> [!NOTE]
> The seed used throughout all of these examples is `3257840388504953787`, the seed behind [`pack.png`](https://minecraftathome.com/projects/packpng.html).

## Biome List

There exist 13 distinct biomes in Beta 1.7.3. They each have unique properties, mainly if they can show rain particles, if it can snow in them, and what their respective foliage and map colors are.

| Name            | Top Block | Filler Block | Rain | Snow |          Foliage Color          |            Map Color            |
| :-------------- | :-------: | :----------: | :--: | :--: | :-----------------------------: | :-----------------------------: |
| Rainforest      |   Grass   |     Dirt     |  ✅  |  ❌  | <ColorSwatch color="#1FF458" /> | <ColorSwatch color="#8FA360" /> |
| Swampland       |   Grass   |     Dirt     |  ✅  |  ❌  | <ColorSwatch color="#8BAF48" /> | <ColorSwatch color="#7F9B20" /> |
| Seasonal Forest |   Grass   |     Dirt     |  ✅  |  ❌  | <ColorSwatch color="#4EE031" /> | <ColorSwatch color="#9BE023" /> |
| Forest          |   Grass   |     Dirt     |  ✅  |  ❌  | <ColorSwatch color="#4EBA31" /> | <ColorSwatch color="#566210" /> |
| Savanna         |   Grass   |     Dirt     |  ✅  |  ❌  | <ColorSwatch color="#4EE031" /> | <ColorSwatch color="#D9E023" /> |
| Shrubland       |   Grass   |     Dirt     |  ✅  |  ❌  | <ColorSwatch color="#4EE031" /> | <ColorSwatch color="#A1AD20" /> |
| Taiga           |   Grass   |     Dirt     |  ✅  |  ✅  | <ColorSwatch color="#7BB731" /> | <ColorSwatch color="#2EB153" /> |
| Desert          |   Sand    |     Sand     |  ❌  |  ❌  | <ColorSwatch color="#4EE031" /> | <ColorSwatch color="#FA9418" /> |
| Plains          |   Grass   |     Dirt     |  ✅  |  ❌  | <ColorSwatch color="#4EE031" /> | <ColorSwatch color="#FFD910" /> |
| Ice Desert      |   Sand    |     Sand     |  ❌  |  ✅  | <ColorSwatch color="#C4D339" /> | <ColorSwatch color="#FFED93" /> |
| Tundra          |   Grass   |     Dirt     |  ✅  |  ✅  | <ColorSwatch color="#C4D339" /> | <ColorSwatch color="#57EBF9" /> |
| Hell            |   Grass   |     Dirt     |  ❌  |  ❌  | <ColorSwatch color="#4EE031" /> | <ColorSwatch color="#FF0000" /> |
| Sky             |   Grass   |     Dirt     |  ❌  |  ❌  | <ColorSwatch color="#4EE031" /> | <ColorSwatch color="#8080FF" /> |

## Lookup table

A `64x64` lookup table is generated to more quickly calculate the appropriate biome to use.

First we need to apply some of the temperature to the humidity.

$$
h' = h \cdot t
$$

Then we determine the actual biome for that position, in a range from `0.0` to `1.0` on each axis.

$$
B(t,h)=
\begin{cases}
\text{Tundra} & t < 0.1 \\[4pt]

\text{Tundra} & h' < 0.2 \land t < 0.5 \\

\text{Savanna} & h' < 0.2 \land 0.5 \leq t < 0.95 \\

\text{Desert} & h' < 0.2 \land t \geq 0.95 \\[4pt]

\text{Swampland} & h' > 0.5 \land t < 0.7 \\[4pt]

\text{Taiga} & h' \geq 0.2 \land t < 0.5 \\[4pt]

\text{Shrubland} & h' \geq 0.2 \land 0.5 \leq t < 0.97 \land h' < 0.35 \\

\text{Forest} & h' \geq 0.2 \land 0.5 \leq t < 0.97 \land h' \geq 0.35 \\[4pt]

\text{Plains} & t \geq 0.97 \land h' < 0.45 \\

\text{Seasonal Forest} & t \geq 0.97 \land 0.45 \leq h' < 0.9 \\

\text{Rainforest} & t \geq 0.97 \land h' \geq 0.9
\end{cases}
$$

If mapped to an image, using the foliage/map colors, we get this.

|                                            Foliage Colors                                            |                                          Map Colors                                          |
| :--------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
| <img src="../images/biome/biomesFoliage.png" alt="Foliage Colors" style="width: 100%;" class="zoom"> | <img src="../images/biome/biomesMap.png" alt="Map Colors" style="width: 100%;" class="zoom"> |

<sub>Temperature is X, Humidity is Y. Range is from `0` to `64` (or `0.0` to `1.0`) on both axes. [Notch drew this graph back in 2011.](https://minecraft.wiki/w/File:NotchBiomeGraph.png)
</sub>

## Biome Noise

The function which determines what biome is use in a chunk is relatively simple.
It mainly uses 3 instances of [octaved simplex noise](/technical/noise#simplex-noise).

### Noise Octaves

The current Chunk Coordinate, scaled to Block-Space (multiplied by `16`), is passed in, alongside how many values the generator should return (`16x16` for one chunk) and a scaling factor.

| Generator   | Octaves |                              Scale |
| ----------- | :-----: | ---------------------------------: |
| Temperature |   `4`   |             `(0.025, 0.025, 0.25)` |
| Humidity    |   `4`   |                `(0.05, 0.05, 1/3)` |
| Weirdness   |   `2`   | `(0.25, 0.25, 0.5882352941176471)` |

Each of these return a `16x16` array of 64-bit floating point numbers, which're that chunks' temperature, humidity and weirdness values.

|                                              Temperature                                               |                                             Humidity                                             |                                              Weirdness                                               |
| :----------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| <img src="../images/biome/temperaturePre.png" alt="Temperature map" style="width: 100%;" class="zoom"> | <img src="../images/biome/humidityPre.png" alt="Humidity map" style="width: 100%;" class="zoom"> | <img src="../images/biome/biomeWeirdness.png" alt="Weirdness map" style="width: 100%;" class="zoom"> |

<sub>Temperature, humidity and weirdness values from chunk `-1,-1` to `1,1`. These values are in the `0.0 - 2.0` range.</sub>

### Biome map

The final biomes for each section are determined by iterating over the `16x16` array and performing the following actions for each entry.

$$
\begin{aligned}
w_i &= 1.1\,\mathrm{weird}_i + 0.5 \\[4pt]
s &= 0.01 \\
m &= 1.0 - s \\[4pt]
T_i &= (0.15\,\mathrm{temp}_i + 0.7)m + w_i s \\[4pt]
s &= 0.002 \\
m &= 1.0 - s \\[4pt]
H_i &= (0.15\,\mathrm{humi}_i + 0.5)m + w_i s \\[6pt]
T_i &= 1.0 - (1.0 - T_i)^2 \\[6pt]
T_i &= \min(1.0,\max(0.0,T_i)) \\
H_i &= \min(1.0,\max(0.0,H_i)) \\[6pt]
\mathrm{temp}_i &= T_i \\
\mathrm{humi}_i &= H_i \\[4pt]
\end{aligned}
$$

The final biome is then determined by mapping the calculated `0.0` to `1.0` to range into the `64x64` biome LUT we calculated before.

The returned biome map can look something like this over a 3x3 chunk area.

|                                                  Foliage Colors                                                   |                                                Map Colors                                                 |
| :---------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| <img src="../images/biome/terrainFoliage.png" alt="Biomes with foliage colors" style="width: 100%;" class="zoom"> | <img src="../images/biome/terrainMap.png" alt="Biomes with map colors" style="width: 100%;" class="zoom"> |

The temperature and humidity values are changed by this function, resulting in a different set of values, to be used in later generation stages.

|                                               Temperature                                               |                                             Humidity                                              |                                              Weirdness                                               |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| <img src="../images/biome/temperaturePost.png" alt="Temperature map" style="width: 100%;" class="zoom"> | <img src="../images/biome/humidityPost.png" alt="Humidity map" style="width: 100%;" class="zoom"> | <img src="../images/biome/biomeWeirdness.png" alt="Weirdness map" style="width: 100%;" class="zoom"> |

<sub>Temperature, humidity and weirdness values from chunks `-1,-1` to `1,1` after being modified by this function. These values are in the `0.0 - 2.0` range. Weirdness is not affected.</sub>

This is then passed to the [Overworld Generator](./overworld).

## Further reading

Check out the page for the [Overworld Generator](./overworld).

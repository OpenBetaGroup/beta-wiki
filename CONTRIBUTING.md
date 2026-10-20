# Contributing

There are many ways in which anyone can contribute to the wiki. [Look at the repository on Github](https://github.com/OpenBetaGroup/beta-wiki/)!

## Confirming existing information

Simply double, triple or quintupple checking that all information presented on the wiki is factually correct is a huge help. Small oversights and errors can slip through easily, so people just making sure everything's right is a huge help! If you find anything that's wrong, either fix it yourself by making a [Pull Request](#pull-request) or filing an [issue on the GitHub](https://github.com/OpenBetaGroup/beta-wiki/issues) so someone else can fix it.

## Fixing issues

If you [find an issue on GitHub](https://github.com/OpenBetaGroup/beta-wiki/issues) that strikes your fancy, or you think you can resolve, please do so!

## Pull Request

Making a pull request is relatively straightforward. Just fork the repo, make the changes you want to, and then just create a pull request on GitHub. This is even easier with GitHub Desktop.

# Development

You'll need to install [`bun`](https://bun.sh) (or another package manager if you prefer)

After cloning the repo you can test the website with

```bash
bun dev
```

It'll install whatever dependencies you need automatically.

If you want to make a static build for hosting, run

```bash
bun run build
```

This can be previewed with

```bash
bun preview
```

# Style Guide

## Considerations

The following is a list of stylistic and formal considerations that should be taken into account when creating a page, going from most to least important.

1. The page should be readable in a non-markdown text editor
1. The page should not rely on external links, and be entirely usable without them
1. The page should not rely on any online-only elements and be usable as a downloaded file too (either `.md` or `.html`)
1. The page should not rely on JavaScript, and be entirely usable without it
1. The page should be readable in a text-only browser like `lynx` or similar

## Values

1. All values are always `monospaced`
1. **Bytes**, **Shorts** and **Integers** are not differentiated (`125`, `6723`, `66241267`)
1. **Floats** have a lower-case `f` on their end (`0.53f`)
1. **Doubles** do not have a lower-case `f` (`545.42`)
1. **Booleans** are either `true` or `false`
1. **Strings** are also monospaced (`Test String`)
1. There shall never be any quotes around Strings
1. **String8** and **String16s** are not differentiated, mainly due to how rarely String8 is used
1. If a **String** is empty, the exact contents between the following quoted block can be used, "(EMPTY)". It should **NOT** be monospaced, as that could be mistaken for a string with `(EMPTY)` as its contents.
1. Unless necessary for the sake of accuracy (i.e. world generation), any floating-point numbers should only be limited to 2 decimal places (`15.24`)

## Additions

1. If a block or item ID is used, the designated **English (US)** name must also be included in brackets, alongside a texture swatch (e.g. `276` (<TextureSwatch texture_name="items/diamond_sword" label="Diamond Sword" />)). When there is no valid block or item texture then a lone label is acceptable as well.
1. The same applies to any numerical value with a different known meaning than the number itself (`1` (Swing Arm))

## Code blocks

1. Code blocks can be done in whatever language the author prefers, with some exceptions, as long as the underlying algorithm can be understood
1. Languages that are non-typed should not be used for code where specific bitwidths or types are important
1. Code blocks should not rely on libraries that magically handle most of the hard work or obfuscate what the code actually does. Math helper libraries are permitted
1. Variables should be reasonably and readably named, avoid single-character names unless its for something unimportant (like an iterator)
1. A specific case is not enforced
1. Variables that require a specific bitwidth should use a type that confirms this bitwidth, i.e. instead of `int`, which can be 16-bit or 32-bit depending on ones system or compiler, it should be `int32_t` or `i32`, to ensure it's a signed 32-bit integer

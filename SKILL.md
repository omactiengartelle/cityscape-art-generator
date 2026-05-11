---
name: cityscape-art-generator
description: Cityscape art generator for stunning urban skylines, city skyline wallpapers, and metropolitan scenes. Create cinematic city views, night cityscapes, cyberpunk metropolises, anime-style city backgrounds, futuristic skylines, Tokyo street scenes, New York skyline art, urban landscape illustrations, downtown panoramas, and architectural concept art for desktop wallpapers, game backgrounds, video thumbnails, and digital prints via the Neta AI image generation API (free trial at neta.art/open).
tools: Bash
---

# Cityscape Art Generator

Cityscape art generator for stunning urban skylines, city skyline wallpapers, and metropolitan scenes. Create cinematic city views, night cityscapes, cyberpunk metropolises, anime-style city backgrounds, futuristic skylines, Tokyo street scenes, New York skyline art, urban landscape illustrations, downtown panoramas, and architectural concept art for desktop wallpapers, game backgrounds, video thumbnails, and digital prints.

## Token

Requires a Neta API token (free trial at <https://www.neta.art/open/>). Pass it via the `--token` flag.

```bash
node <script> "your prompt" --token YOUR_TOKEN
```

## When to use
Use when someone asks to generate or create cityscape art generator images.

## Quick start
```bash
node cityscapeartgenerator.js "your description here" --token YOUR_TOKEN
```

## Options
- `--size` — `portrait`, `landscape`, `square`, `tall` (default: `landscape`)
- `--ref` — reference image UUID for style inheritance

## Install
```bash
npx skills add omactiengartelle/cityscape-art-generator
```

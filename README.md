# Cityscape Art Generator

Generate stunning cityscape images from text descriptions — dramatic urban skylines, cinematic city views, night cityscapes, cyberpunk metropolises, anime-style city backgrounds, futuristic skylines, and architectural concept art. Perfect for desktop wallpapers, game backgrounds, video thumbnails, and digital prints.

Powered by the Neta AI image generation API (api.talesofai.com) — the same service as neta.art/open.

## Install

```bash
npx skills add omactiengartelle/cityscape-art-generator
```

Or with ClawHub:

```bash
clawhub install cityscape-art-generator
```

## Usage

```bash
node cityscapeartgenerator.js "your cityscape description" --token YOUR_TOKEN
```

### Examples

Generate a default cinematic cityscape:

```bash
node cityscapeartgenerator.js "neon-lit Tokyo street at midnight, rain-soaked pavement, towering skyscrapers" --token YOUR_TOKEN
```

Portrait-orientation New York skyline:

```bash
node cityscapeartgenerator.js "Manhattan skyline at golden hour, Empire State Building, dramatic clouds" --size portrait --token YOUR_TOKEN
```

Use a reference image for style inheritance:

```bash
node cityscapeartgenerator.js "cyberpunk megacity, flying vehicles, holographic signs" --ref <picture_uuid> --token YOUR_TOKEN
```

## Options

| Flag | Description | Default |
| --- | --- | --- |
| `--token` | Neta API token (required) | — |
| `--size` | One of `portrait`, `landscape`, `square`, `tall` | `landscape` |
| `--ref` | Reference image UUID for style inheritance | — |

### Size dimensions

| Size | Width × Height |
| --- | --- |
| `square` | 1024 × 1024 |
| `portrait` | 832 × 1216 |
| `landscape` | 1216 × 832 |
| `tall` | 704 × 1408 |

## Token Setup

This skill requires a Neta API token (free trial available at <https://www.neta.art/open/>).

Pass it via the `--token` flag:

```bash
node <script> "your prompt" --token YOUR_TOKEN
```

## Output

Returns a direct image URL.

This skill requires a Neta API token (free trial available at https://www.neta.art/open/).

## Example Output

```bash
node cityscapeartgenerator.js "stunning cityscape view, dramatic urban skyline with towering skyscrapers and glowing windows, cinematic composition, atmospheric lighting, neon signs and street lamps reflecting on wet streets, depth of field, golden hour or twilight blue hour, ultra detailed architecture, high resolution, photorealistic detail"
```

![Example output](https://oss.talesofai.cn/picture/797a0ab4-5863-4b76-9a9b-0b5821d58226.webp)

> Prompt: *"stunning cityscape view, dramatic urban skyline with towering skyscrapers and glowing windows, cinematic composition, atmospheric lighting, neon signs and street lamps reflecting on wet streets, depth of field, golden hour or twilight blue hour, ultra detailed architecture, high resolution, photorealistic detail"*

[English](README.md) / [中文](README_CN.md)

# Cocos Creator JS Obfuscator

A Cocos Creator extension that obfuscates JavaScript code during the build process to protect your game code from reverse engineering.

## Features

- **Automatic Obfuscation**: Integrates into Cocos Creator's build pipeline
- **Configurable Presets**: Low, Medium, and High obfuscation levels
- **Smart Exclusions**: Automatically excludes engine files and adapters
- **Detailed Reports**: Generates obfuscation reports with file statistics
- **Cross-Platform**: Works with Android, iOS, Web, and other platforms

## Installation

### Method 1: Clone

```bash
cd your-cocos-project/extensions
git clone https://github.com/KaiXuanXuan/cocos-js-obfuscator.git js-obfuscator
cd js-obfuscator
npm install
```

### Method 2: Download

1. Download the latest release from [Releases](https://github.com/KaiXuanXuan/cocos-js-obfuscator/releases)
2. Extract to your project's `extensions/js-obfuscator/` folder
3. Run `npm install` in the extension directory

## Usage

1. Open Cocos Creator
2. Go to **Project** -> **Build**
3. Find **js-obfuscator** section in the build panel
4. Enable **Enable Obfuscation**
5. Select **Obfuscation Preset** (Low/Medium/High)
6. Build your project

## Configuration

### Obfuscation Preset

| Preset | Description | Performance Impact |
|--------|-------------|-------------------|
| Low | Basic string encoding | Minimal |
| Medium | Control flow flattening + dead code injection (Recommended) | Moderate |
| High | Maximum protection, debug protection | High |

### Exclude Files
Comma-separated list of file names to exclude from obfuscation.
Example: `my-lib.js, sdk.js`

## What Gets Obfuscated

Obfuscated:
- `assets/**/*.js` - Your game bundle code
- `src/chunks/**/*.js` - Shared/common code

Automatically Excluded:
- `src/cocos-js/` - Cocos engine code
- `jsb-adapter/` - Native bridge adapters
- `system.bundle.js` - Module loader
- `application.js`, `main.js` - Entry points

## Obfuscation Report

After each build, a detailed report is generated at:
```
build/<platform>/data/obfuscation-report.json
```

## Example Output

```
[js-obfuscator] OBfuscation SUMMARY
[js-obfuscator] =========================================
[js-obfuscator] Total files scanned:   15
[js-obfuscator] Files obfuscated:      7
[js-obfuscator] Files skipped:         8
[js-obfuscator] Duration:              3.01s
[js-obfuscator] Original total size:  154.58 KB
[js-obfuscator] Obfuscated total:     2.69 MB
[js-obfuscator] Avg size change:      +1681.2%
```

## Requirements

- Cocos Creator 3.8.0+
- Node.js 16+

## How It Works

```
Cocos Build -> JS Obfuscator (onAfterBuild) -> Cocos Generate (APK/IPA)
```

1. Cocos Creator generates JS files to `build/<platform>/data/`
2. This extension obfuscates JS files in-place
3. Cocos Creator packages the obfuscated files into the final build

## License

MIT License
[English](README.md) / [中文](README_CN.md)

# Cocos Creator JS 混淆器

一个 Cocos Creator 扩展插件，在构建过程中自动混淆 JavaScript 代码，保护您的游戏代码免受逆向工程攻击。

## 功能特性

- **自动混淆**：无缝集成到 Cocos Creator 构建流程
- **可配置预设**：提供低、中、高三种混淆级别
- **智能排除**：自动排除引擎文件和适配器
- **详细报告**：生成包含文件统计信息的混淆报告
- **跨平台支持**：支持 Android、iOS、Web 等多个平台

## 安装方法

### 方法一：克隆

```bash
cd your-cocos-project/extensions
git clone https://github.com/KaiXuanXuan/cocos-js-obfuscator.git js-obfuscator
cd js-obfuscator
npm install
```

### 方法二：下载

1. 从 [Releases](https://github.com/KaiXuanXuan/cocos-js-obfuscator/releases) 下载最新版本
2. 解压到项目的 `extensions/js-obfuscator/` 目录
3. 在扩展目录中运行 `npm install`

## 使用方法

1. 打开 Cocos Creator
2. 进入 **项目** -> **构建**
3. 在构建面板中找到 **js-obfuscator** 部分
4. 启用 **Enable Obfuscation**（启用混淆）
5. 选择 **Obfuscation Preset**（混淆预设：低/中/高）
6. 构建项目

## 配置说明

### 混淆预设

| 预设 | 描述 | 性能影响 |
|------|------|----------|
| Low（低） | 基础字符串编码 | 极小 |
| Medium（中） | 控制流扁平化 + 死代码注入（推荐） | 中等 |
| High（高） | 最大保护级别，包含调试保护 | 较高 |

### 排除文件
用逗号分隔需要排除混淆的文件名列表。
示例：`my-lib.js, sdk.js`

## 混淆范围

会被混淆：
- `assets/**/*.js` - 游戏包代码
- `src/chunks/**/*.js` - 共享/公共代码

自动排除：
- `src/cocos-js/` - Cocos 引擎代码
- `jsb-adapter/` - 原生桥接适配器
- `system.bundle.js` - 模块加载器
- `application.js`, `main.js` - 入口文件

## 混淆报告

每次构建后，会生成详细报告：
```
build/<platform>/data/obfuscation-report.json
```

## 输出示例

```
[js-obfuscator] OBFUSCATION SUMMARY
[js-obfuscator] =========================================
[js-obfuscator] Total files scanned:   15
[js-obfuscator] Files obfuscated:      7
[js-obfuscator] Files skipped:         8
[js-obfuscator] Duration:              3.01s
[js-obfuscator] Original total size:   154.58 KB
[js-obfuscator] Obfuscated total:      2.69 MB
[js-obfuscator] Avg size change:       +1681.2%
```

## 系统要求

- Cocos Creator 3.8.0+
- Node.js 18+ (javascript-obfuscator 4.x 版本要求)

## 工作原理

```
Cocos 构建 -> JS 混淆器 (onAfterBuild) -> Cocos 打包 (APK/IPA)
```

1. Cocos Creator 生成 JS 文件到 `build/<platform>/data/`
2. 本扩展对 JS 文件进行原地混淆
3. Cocos Creator 将混淆后的文件打包到最终构建中

## 许可证

MIT License
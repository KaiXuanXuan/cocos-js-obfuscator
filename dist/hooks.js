"use strict";
/**
 * js-obfuscator 构建钩子脚本
 *
 * 实现 onAfterBuild 钩子，在构建完成后混淆 JS 文件
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAfterCompressSettings = exports.onBeforeCompressSettings = exports.onAfterBuild = exports.onBeforeBuild = void 0;
const javascript_obfuscator_1 = __importDefault(require("javascript-obfuscator"));
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
/**
 * 排除规则配置（统一管理）
 *
 * 说明：
 * - dirs: 搜索时排除的目录名（不递归进入这些目录）
 * - files: 根据文件名排除（不混淆这些文件）
 * - paths: 根据路径关键词排除（包含这些关键词的路径不混淆）
 */
const EXCLUDE_RULES = {
    // 排除的目录名（搜索时跳过）
    dirs: ['cocos-js', 'jsb-adapter'],
    // 排除的文件名（精确匹配）
    files: [
        'cc.js', // Cocos 引擎核心
        'cocos-js.js', // 引擎打包文件
        'system.bundle.js', // 模块加载器
        'application.js', // 应用入口
        'main.js', // 主入口文件
        'import-map.json', // 导入映射
        'polyfill.js', // Polyfill
        'adapter.js', // 适配器
        'jsb-adapter.js', // JSB 适配器
        'jsb_polyfill.js', // JSB Polyfill
    ],
    // 排除的路径关键词（路径中包含这些词则跳过）
    paths: [
        'cocos-js', // 引擎目录
        'jsb-adapter', // 原生适配器目录
    ],
};
// 混淆器预设配置
const PRESETS = {
    low: {
        compact: false,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: false,
        renameGlobals: false,
        selfDefending: false,
        simplify: true,
        splitStrings: false,
        stringArray: true,
        stringArrayCallsTransform: false,
        stringArrayEncoding: [],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChosenCallsCount: 1,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.5,
        transformObjectKeys: false,
        unicodeEscapeSequence: false,
    },
    medium: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        numbersToExpressionsThreshold: 0.35,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.75,
        stringArrayEncoding: ['base64'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChosenCallsCount: 2,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
    },
    high: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
        debugProtection: true,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'mangled-shuffled',
        log: false,
        numbersToExpressions: true,
        numbersToExpressionsThreshold: 1,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        shuffleStringArray: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 1,
        stringArrayEncoding: ['rc4'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 5,
        stringArrayWrappersChosenCallsCount: 5,
        stringArrayWrappersParametersMaxCount: 5,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 1,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
    },
};
/**
 * 检查文件是否应该被排除
 */
function shouldExcludeFile(filePath, buildDest, userExcludeFiles) {
    const fileName = path.basename(filePath);
    const relPath = path.relative(buildDest, filePath);
    const posixRelPath = toPosixPath(relPath);
    // 1. 检查是否在排除目录中（路径包含排除的目录名）
    for (const excludeDir of EXCLUDE_RULES.dirs) {
        if (posixRelPath.includes('/' + excludeDir + '/') || posixRelPath.startsWith(excludeDir + '/')) {
            return { excluded: true, reason: `Excluded dir: ${excludeDir}` };
        }
    }
    // 2. 检查文件名是否在排除列表中
    if (EXCLUDE_RULES.files.includes(fileName)) {
        return { excluded: true, reason: `Excluded file: ${fileName}` };
    }
    // 3. 检查路径是否包含排除关键词
    for (const excludePath of EXCLUDE_RULES.paths) {
        if (posixRelPath.includes(excludePath)) {
            return { excluded: true, reason: `Excluded path: ${excludePath}` };
        }
    }
    // 4. 检查用户排除列表
    if (userExcludeFiles.includes(fileName)) {
        return { excluded: true, reason: 'User excluded' };
    }
    // 5. 检查是否是已压缩文件
    if (fileName.includes('.min.') || fileName.startsWith('min.')) {
        return { excluded: true, reason: 'Already minified' };
    }
    return { excluded: false };
}
/**
 * 构建开始前的钩子
 */
const onBeforeBuild = async function (options, result) {
    console.log('[js-obfuscator] =========================================');
    console.log('[js-obfuscator] JS Obfuscator Plugin');
    console.log('[js-obfuscator] =========================================');
    console.log('[js-obfuscator] onBeforeBuild hook triggered');
};
exports.onBeforeBuild = onBeforeBuild;
/**
 * 构建完成后的钩子 - 主要混淆逻辑
 */
const onAfterBuild = async function (options, result) {
    console.log('[js-obfuscator] =========================================');
    console.log('[js-obfuscator] onAfterBuild hook triggered');
    // 检查是否启用混淆（配置在 packages['js-obfuscator'] 下）
    const obfuscatorConfig = options.packages?.['js-obfuscator'] || {};
    const enableObfuscation = obfuscatorConfig.enableObfuscation;
    if (!enableObfuscation) {
        console.log('[js-obfuscator] Obfuscation is DISABLED, skipping...');
        console.log('[js-obfuscator] =========================================\n');
        return;
    }
    console.log('[js-obfuscator] Obfuscation is ENABLED');
    // 获取构建输出目录（多种方式尝试）
    let buildDest = options.dest;
    // 如果没有直接的 dest，尝试从其他字段构建路径
    if (!buildDest) {
        // 尝试从 cocosParams 获取（native 平台）
        if (options.cocosParams?.buildAssetsDir) {
            buildDest = options.cocosParams.buildAssetsDir;
        }
        else if (options.cocosParams?.buildDir) {
            buildDest = path.join(options.cocosParams.buildDir, 'data');
        }
        else if (options.buildPath && options.outputName) {
            // 从 result 参数获取构建目录
            if (result?.dest) {
                buildDest = result.dest;
            }
            else {
                // 尝试从当前工作目录推导
                const cwd = process.cwd();
                buildDest = path.join(cwd, 'build', options.outputName);
            }
        }
    }
    // 对于 native 平台（android/ios），JS 文件在 data 子目录下
    // 检查 buildDest 是否已包含 data 目录，如果没有则检查是否需要添加
    if (buildDest && !buildDest.endsWith('data') && !buildDest.endsWith('data' + path.sep)) {
        const dataPath = path.join(buildDest, 'data');
        if (fs.existsSync(dataPath)) {
            buildDest = dataPath;
        }
    }
    if (!buildDest) {
        console.error('[js-obfuscator] Build destination not found');
        console.log('[js-obfuscator] Available options keys:', Object.keys(options));
        console.log('[js-obfuscator] Result:', result);
        return;
    }
    console.log('[js-obfuscator] Build destination:', buildDest);
    // 获取混淆预设
    const preset = obfuscatorConfig.obfuscatorPreset || 'medium';
    const selectedPreset = PRESETS[preset] || PRESETS.medium;
    console.log('[js-obfuscator] Obfuscation preset:', preset);
    console.log('[js-obfuscator] =========================================');
    // 获取用户排除文件列表
    const excludeFilesStr = obfuscatorConfig.excludeFiles || '';
    const userExcludeFiles = excludeFilesStr
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f.length > 0);
    console.log('[js-obfuscator] User excluded files:', userExcludeFiles.length > 0 ? userExcludeFiles.join(', ') : 'None');
    console.log('[js-obfuscator] =========================================');
    console.log('[js-obfuscator] Exclusion rules:');
    console.log(`[js-obfuscator]   - Dirs: ${EXCLUDE_RULES.dirs.length} patterns`);
    console.log(`[js-obfuscator]   - Files: ${EXCLUDE_RULES.files.length} names`);
    console.log(`[js-obfuscator]   - Paths: ${EXCLUDE_RULES.paths.length} keywords`);
    console.log('[js-obfuscator] =========================================');
    // 查找所有 JS 文件（只搜索用户代码目录）
    // 目标目录：
    // - assets/ (各 Bundle 的 index.js)
    // - src/chunks/ (公共代码)
    // 注意：不在这里排除目录，而是找到所有文件后在处理阶段排除，以便统计
    let jsFiles = [];
    // 搜索 assets 目录（不排除任何目录，找到所有 JS 文件）
    const assetsDir = path.join(buildDest, 'assets');
    if (await fs.pathExists(assetsDir)) {
        const assetsFiles = await findJsFiles(assetsDir, []); // 空数组 = 不排除任何目录
        jsFiles = jsFiles.concat(assetsFiles);
    }
    // 搜索 src/chunks 目录
    const chunksDir = path.join(buildDest, 'src', 'chunks');
    if (await fs.pathExists(chunksDir)) {
        const chunksFiles = await findJsFiles(chunksDir, []);
        jsFiles = jsFiles.concat(chunksFiles);
    }
    // 去重
    jsFiles = [...new Set(jsFiles)];
    console.log('[js-obfuscator] Found', jsFiles.length, 'JS files to process');
    console.log('[js-obfuscator] =========================================');
    if (jsFiles.length === 0) {
        console.warn('[js-obfuscator] No JS files found to obfuscate');
        console.log('[js-obfuscator] =========================================\n');
        return;
    }
    // 混淆每个 JS 文件
    const startTime = Date.now();
    const reports = [];
    let obfuscatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let totalOriginalSize = 0;
    let totalObfuscatedSize = 0;
    for (const jsFile of jsFiles) {
        const fileName = path.basename(jsFile);
        const relPath = path.relative(buildDest, jsFile);
        const report = {
            fileName: relPath,
            originalSize: 0,
            obfuscatedSize: 0,
            sizeRatio: 0,
            skipped: false,
        };
        // 检查是否应该排除
        const excludeCheck = shouldExcludeFile(jsFile, buildDest, userExcludeFiles);
        if (excludeCheck.excluded) {
            report.skipped = true;
            report.skipReason = excludeCheck.reason;
            skippedCount++;
            reports.push(report);
            console.log('[js-obfuscator] [SKIP]', excludeCheck.reason, '-', fileName);
            continue;
        }
        // 检查文件大小，跳过空文件
        try {
            const stats = await fs.stat(jsFile);
            if (stats.size === 0) {
                report.skipped = true;
                report.skipReason = 'Empty file';
                skippedCount++;
                reports.push(report);
                console.log('[js-obfuscator] [SKIP] Empty file:', fileName);
                continue;
            }
            report.originalSize = stats.size;
        }
        catch (err) {
            report.skipped = true;
            report.skipReason = 'Cannot read file';
            report.error = String(err);
            skippedCount++;
            reports.push(report);
            console.warn('[js-obfuscator] [WARN] Cannot stat file:', fileName, err);
            continue;
        }
        try {
            console.log('[js-obfuscator] [OBF] Obfuscating:', fileName);
            // 读取原始代码
            const originalCode = await fs.readFile(jsFile, 'utf-8');
            // 执行混淆
            const obfuscationResult = javascript_obfuscator_1.default.obfuscate(originalCode, selectedPreset);
            const obfuscatedCode = obfuscationResult.getObfuscatedCode();
            // 写入混淆后的代码
            await fs.writeFile(jsFile, obfuscatedCode, 'utf-8');
            // 计算混淆后大小
            const obfuscatedSize = Buffer.byteLength(obfuscatedCode, 'utf-8');
            report.obfuscatedSize = obfuscatedSize;
            report.sizeRatio = obfuscatedSize / report.originalSize;
            totalOriginalSize += report.originalSize;
            totalObfuscatedSize += obfuscatedSize;
            obfuscatedCount++;
            // 显示详细信息
            const sizeChange = ((report.sizeRatio - 1) * 100).toFixed(1);
            const sign = report.sizeRatio >= 1 ? '+' : '';
            console.log(`[js-obfuscator] [DONE] ${fileName} | ` +
                `${formatBytes(report.originalSize)} -> ${formatBytes(obfuscatedSize)} ` +
                `(${sign}${sizeChange}%)`);
        }
        catch (err) {
            errorCount++;
            report.skipped = true;
            report.skipReason = 'Obfuscation error';
            report.error = String(err);
            reports.push(report);
            console.error('[js-obfuscator] [ERROR] Failed to obfuscate:', fileName, err);
        }
    }
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    // 输出摘要报告
    console.log('[js-obfuscator] =========================================');
    console.log('[js-obfuscator] OBfuscation SUMMARY');
    console.log('[js-obfuscator] =========================================');
    console.log(`[js-obfuscator] Total files scanned:   ${jsFiles.length}`);
    console.log(`[js-obfuscator] Files obfuscated:      ${obfuscatedCount}`);
    console.log(`[js-obfuscator] Files skipped:         ${skippedCount}`);
    console.log(`[js-obfuscator] Files with errors:     ${errorCount}`);
    console.log(`[js-obfuscator] Duration:              ${duration.toFixed(2)}s`);
    if (obfuscatedCount > 0) {
        const avgSizeRatio = totalObfuscatedSize / totalOriginalSize;
        const avgSizeChange = ((avgSizeRatio - 1) * 100).toFixed(1);
        const sign = avgSizeRatio >= 1 ? '+' : '';
        console.log(`[js-obfuscator] Original total size:  ${formatBytes(totalOriginalSize)}`);
        console.log(`[js-obfuscator] Obfuscated total:     ${formatBytes(totalObfuscatedSize)}`);
        console.log(`[js-obfuscator] Avg size change:      ${sign}${avgSizeChange}%`);
        // 显示最显著的文件变化
        const sizeChanges = reports
            .filter(r => !r.skipped && r.obfuscatedSize > 0)
            .sort((a, b) => b.sizeRatio - a.sizeRatio);
        if (sizeChanges.length > 0) {
            console.log('[js-obfuscator] =========================================');
            console.log('[js-obfuscator] TOP 5 LARGEST SIZE INCREASE:');
            sizeChanges.slice(0, 5).forEach(r => {
                const change = ((r.sizeRatio - 1) * 100).toFixed(1);
                const sign = r.sizeRatio >= 1 ? '+' : '';
                console.log(`[js-obfuscator]   ${r.fileName}: ${sign}${change}%`);
            });
        }
    }
    // 保存详细报告到文件
    try {
        const reportPath = path.join(buildDest, 'obfuscation-report.json');
        const summary = {
            timestamp: new Date().toISOString(),
            preset: preset,
            duration: duration,
            totalFiles: jsFiles.length,
            obfuscatedCount: obfuscatedCount,
            skippedCount: skippedCount,
            errorCount: errorCount,
            originalSize: totalOriginalSize,
            obfuscatedSize: totalObfuscatedSize,
            avgSizeRatio: obfuscatedCount > 0 ? totalObfuscatedSize / totalOriginalSize : 0,
            excludeRules: EXCLUDE_RULES,
            reports: reports,
        };
        await fs.writeJSON(reportPath, summary, { spaces: 2 });
        console.log('[js-obfuscator] =========================================');
        console.log(`[js-obfuscator] Detailed report saved to: ${reportPath}`);
    }
    catch (err) {
        console.warn('[js-obfuscator] Failed to save report:', err);
    }
    console.log('[js-obfuscator] =========================================\n');
};
exports.onAfterBuild = onAfterBuild;
/**
 * 格式化字节大小
 */
function formatBytes(bytes) {
    if (bytes === 0)
        return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}
/**
 * 将路径转换为正斜杠格式（用于路径匹配）
 */
function toPosixPath(p) {
    return p.split(path.sep).join('/');
}
/**
 * 递归查找目录下的所有 JS 文件
 * @param dir 要搜索的目录
 * @param excludeDirs 要排除的目录名列表
 */
async function findJsFiles(dir, excludeDirs) {
    const results = [];
    async function walk(currentDir) {
        try {
            const entries = await fs.readdir(currentDir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(currentDir, entry.name);
                if (entry.isDirectory()) {
                    // 检查是否在排除目录中
                    if (!excludeDirs.includes(entry.name)) {
                        await walk(fullPath);
                    }
                }
                else if (entry.isFile() && entry.name.endsWith('.js')) {
                    results.push(fullPath);
                }
            }
        }
        catch (err) {
            // 忽略无法访问的目录
        }
    }
    await walk(dir);
    return results;
}
/**
 * 压缩设置文件前的钩子
 */
const onBeforeCompressSettings = async function (options, result) {
    console.log('[js-obfuscator] onBeforeCompressSettings hook triggered');
};
exports.onBeforeCompressSettings = onBeforeCompressSettings;
/**
 * 压缩设置文件后的钩子
 */
const onAfterCompressSettings = async function (options, result) {
    console.log('[js-obfuscator] onAfterCompressSettings hook triggered');
};
exports.onAfterCompressSettings = onAfterCompressSettings;
//# sourceMappingURL=hooks.js.map
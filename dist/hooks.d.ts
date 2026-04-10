/**
 * js-obfuscator 构建钩子脚本
 *
 * 实现 onAfterBuild 钩子，在构建完成后混淆 JS 文件
 */
/**
 * 构建开始前的钩子
 */
export declare const onBeforeBuild: (options: any, result?: any) => Promise<void>;
/**
 * 构建完成后的钩子 - 主要混淆逻辑
 */
export declare const onAfterBuild: (options: any, result?: any) => Promise<void>;
/**
 * 压缩设置文件前的钩子
 */
export declare const onBeforeCompressSettings: (options: any, result?: any) => Promise<void>;
/**
 * 压缩设置文件后的钩子
 */
export declare const onAfterCompressSettings: (options: any, result?: any) => Promise<void>;
//# sourceMappingURL=hooks.d.ts.map
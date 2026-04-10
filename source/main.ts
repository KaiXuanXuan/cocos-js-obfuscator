/**
 * js-obfuscator 扩展主入口
 */

export const methods: { [key: string]: (...args: any[]) => any } = {
    openPanel() {
        // 可以打开配置面板
        console.log('[js-obfuscator] Opening panel...');
    },
};

/**
 * 扩展加载时触发
 */
export function load() {
    console.log('[js-obfuscator] Extension loaded');
}

/**
 * 扩展卸载时触发
 */
export function unload() {
    console.log('[js-obfuscator] Extension unloaded');
}
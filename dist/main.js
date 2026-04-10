"use strict";
/**
 * js-obfuscator 扩展主入口
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = void 0;
exports.load = load;
exports.unload = unload;
exports.methods = {
    openPanel() {
        // 可以打开配置面板
        console.log('[js-obfuscator] Opening panel...');
    },
};
/**
 * 扩展加载时触发
 */
function load() {
    console.log('[js-obfuscator] Extension loaded');
}
/**
 * 扩展卸载时触发
 */
function unload() {
    console.log('[js-obfuscator] Extension unloaded');
}
//# sourceMappingURL=main.js.map
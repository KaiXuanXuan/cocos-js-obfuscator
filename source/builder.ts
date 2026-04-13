/**
 * js-obfuscator 构建入口脚本
 *
 * 通过 contributions.builder 指向此脚本
 * configs 中配置各平台的构建选项和钩子脚本路径
 */

const PACKAGE_NAME = 'js-obfuscator';

export const configs = {
    // 对所有平台生效的基础配置
    '*': {
        options: {
            enableObfuscation: {
                label: `i18n:${PACKAGE_NAME}.options.enable`,
                description: `i18n:${PACKAGE_NAME}.options.enable_desc`,
                default: false,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            obfuscatorPreset: {
                label: `i18n:${PACKAGE_NAME}.options.preset`,
                description: `i18n:${PACKAGE_NAME}.options.preset_desc`,
                default: 'medium',
                render: {
                    ui: 'ui-select',
                    items: [
                        { value: 'low', label: `i18n:${PACKAGE_NAME}.options.preset_low` },
                        { value: 'medium', label: `i18n:${PACKAGE_NAME}.options.preset_medium` },
                        { value: 'high', label: `i18n:${PACKAGE_NAME}.options.preset_high` },
                    ],
                },
                verifyRules: ['rulePreset'],
            },
            excludeFiles: {
                label: `i18n:${PACKAGE_NAME}.options.exclude`,
                description: `i18n:${PACKAGE_NAME}.options.exclude_desc`,
                default: '',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'e.g.: cc.js, cocos-js.js, minigame.js',
                    },
                },
            },
        },
        verifyRuleMap: {
            rulePreset: {
                message: 'Preset must be one of: low, medium, high',
                func(val: any) {
                    return ['low', 'medium', 'high'].includes(val);
                },
            },
        },
        hooks: './hooks',
    },
};

export const load = function () {
    console.log('[js-obfuscator] builder plugin loaded');
};

export const unload = function () {
    console.log('[js-obfuscator] builder plugin unloaded');
};
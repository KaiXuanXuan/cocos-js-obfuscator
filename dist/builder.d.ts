/**
 * js-obfuscator 构建入口脚本
 *
 * 通过 contributions.builder 指向此脚本
 * configs 中配置各平台的构建选项和钩子脚本路径
 */
export declare const configs: {
    '*': {
        options: {
            enableObfuscation: {
                label: string;
                description: string;
                default: boolean;
                render: {
                    ui: string;
                };
            };
            obfuscatorPreset: {
                label: string;
                description: string;
                default: string;
                render: {
                    ui: string;
                    items: {
                        value: string;
                        label: string;
                    }[];
                };
                verifyRules: string[];
            };
            excludeFiles: {
                label: string;
                description: string;
                default: string;
                render: {
                    ui: string;
                    attributes: {
                        placeholder: string;
                    };
                };
            };
        };
        verifyRuleMap: {
            rulePreset: {
                message: string;
                func(val: any): boolean;
            };
        };
        hooks: string;
    };
};
export declare const load: () => void;
export declare const unload: () => void;
//# sourceMappingURL=builder.d.ts.map
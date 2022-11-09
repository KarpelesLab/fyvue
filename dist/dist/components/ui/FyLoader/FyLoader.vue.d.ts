declare const _default: import("vue").DefineComponent<{
    id: {
        type: StringConstructor;
        required: false;
    };
    loader: {
        type: ObjectConstructor;
        required: false;
        default: () => import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    };
    showLoadingText: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    force: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: StringConstructor;
        required: false;
    };
    loader: {
        type: ObjectConstructor;
        required: false;
        default: () => import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    };
    showLoadingText: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    force: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>>, {
    loader: Record<string, any>;
    showLoadingText: boolean;
    size: string;
    force: boolean;
}>;
export default _default;

declare const _default: import("vue").DefineComponent<{
    displayOnly: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    locationUuid: {
        type: StringConstructor;
        required: false;
    };
    modelValue: {
        type: StringConstructor;
        required: false;
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    displayOnly: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    locationUuid: {
        type: StringConstructor;
        required: false;
    };
    modelValue: {
        type: StringConstructor;
        required: false;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    displayOnly: boolean;
}>;
export default _default;

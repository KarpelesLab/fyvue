declare const _default: import("vue").DefineComponent<{
    steps: {
        type: ArrayConstructor;
        required: false;
        default: () => never[];
    };
    currentStep: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    steps: {
        type: ArrayConstructor;
        required: false;
        default: () => never[];
    };
    currentStep: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}>>, {
    steps: unknown[];
    currentStep: number;
}>;
export default _default;

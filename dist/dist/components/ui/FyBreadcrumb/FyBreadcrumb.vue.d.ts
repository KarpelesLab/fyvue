declare const _default: import("vue").DefineComponent<{
    nav: {
        type: ArrayConstructor;
        required: true;
        default: () => never[];
    };
    maxLength: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    nav: {
        type: ArrayConstructor;
        required: true;
        default: () => never[];
    };
    maxLength: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}>>, {
    nav: unknown[];
    maxLength: number;
}>;
export default _default;

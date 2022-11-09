declare const _default: import("vue").DefineComponent<{
    percent: {
        type: NumberConstructor;
        required: true;
        default: number;
    };
    textXY: {
        type: ArrayConstructor;
        required: false;
        default: () => number[];
    };
    color: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    percent: {
        type: NumberConstructor;
        required: true;
        default: number;
    };
    textXY: {
        type: ArrayConstructor;
        required: false;
        default: () => number[];
    };
    color: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>>, {
    percent: number;
    textXY: unknown[];
    color: string;
}>;
export default _default;

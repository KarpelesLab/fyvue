declare const _default: import("vue").DefineComponent<{
    showHeaders: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    headers: {
        type: null;
        required: true;
    };
    data: {
        type: ArrayConstructor;
        required: false;
        default: () => never[];
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    showHeaders: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    headers: {
        type: null;
        required: true;
    };
    data: {
        type: ArrayConstructor;
        required: false;
        default: () => never[];
    };
}>>, {
    showHeaders: boolean;
    data: unknown[];
}>;
export default _default;

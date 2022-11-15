declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        required: true;
    };
    showTitle: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    darkLight: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    links: {
        type: ArrayConstructor;
        required: true;
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: true;
    };
    showTitle: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    darkLight: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    links: {
        type: ArrayConstructor;
        required: true;
    };
}>>, {
    showTitle: boolean;
    darkLight: boolean;
}>;
export default _default;

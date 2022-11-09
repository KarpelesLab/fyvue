declare const _default: import("vue").DefineComponent<{
    id: {
        type: StringConstructor;
        required: true;
    };
    title: {
        type: StringConstructor;
        required: false;
    };
    onOpen: {
        type: FunctionConstructor;
        required: false;
    };
    onClose: {
        type: FunctionConstructor;
        required: false;
    };
    closeIcon: {
        type: ObjectConstructor;
        required: false;
        default: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: StringConstructor;
        required: true;
    };
    title: {
        type: StringConstructor;
        required: false;
    };
    onOpen: {
        type: FunctionConstructor;
        required: false;
    };
    onClose: {
        type: FunctionConstructor;
        required: false;
    };
    closeIcon: {
        type: ObjectConstructor;
        required: false;
        default: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
    };
}>>, {
    closeIcon: Record<string, any>;
}>;
export default _default;

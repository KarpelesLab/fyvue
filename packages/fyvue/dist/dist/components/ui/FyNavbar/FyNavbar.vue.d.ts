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
    loginLink: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    signupLink: {
        type: StringConstructor;
        required: false;
        default: string;
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
    loginLink: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    signupLink: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>>, {
    showTitle: boolean;
    darkLight: boolean;
    loginLink: string;
    signupLink: string;
}>;
export default _default;

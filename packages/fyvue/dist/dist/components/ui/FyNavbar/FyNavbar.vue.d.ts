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
    loginPath: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    accountPath: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    showDashboardLink: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
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
    loginPath: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    accountPath: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    showDashboardLink: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>>, {
    showTitle: boolean;
    darkLight: boolean;
    loginPath: string;
    accountPath: string;
    showDashboardLink: boolean;
}>;
export default _default;

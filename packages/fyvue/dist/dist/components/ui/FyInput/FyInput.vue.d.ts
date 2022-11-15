declare const _default: import("vue").DefineComponent<{
    id: {
        type: StringConstructor;
        required: true;
    };
    showLabel: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    label: {
        type: StringConstructor;
        required: false;
    };
    type: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        required: false;
    };
    autocomplete: {
        type: StringConstructor;
        required: false;
    };
    checkboxTrueValue: {
        type: (StringConstructor | BooleanConstructor)[];
        required: false;
        default: boolean;
    };
    checkboxFalseValue: {
        type: (StringConstructor | BooleanConstructor)[];
        required: false;
        default: boolean;
    };
    req: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    linkIcon: {
        type: StringConstructor;
        required: false;
    };
    modelValue: {
        type: null;
        required: false;
    };
    checkboxValue: {
        type: null;
        required: false;
    };
    options: {
        type: ArrayConstructor;
        required: false;
        default: () => never[];
    };
    help: {
        type: StringConstructor;
        required: false;
    };
    error: {
        type: StringConstructor;
        required: false;
    };
    errorVuelidate: {
        type: ArrayConstructor;
        required: false;
    };
    disabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "update:checkboxValue")[], "update:modelValue" | "update:checkboxValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: StringConstructor;
        required: true;
    };
    showLabel: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    label: {
        type: StringConstructor;
        required: false;
    };
    type: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        required: false;
    };
    autocomplete: {
        type: StringConstructor;
        required: false;
    };
    checkboxTrueValue: {
        type: (StringConstructor | BooleanConstructor)[];
        required: false;
        default: boolean;
    };
    checkboxFalseValue: {
        type: (StringConstructor | BooleanConstructor)[];
        required: false;
        default: boolean;
    };
    req: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    linkIcon: {
        type: StringConstructor;
        required: false;
    };
    modelValue: {
        type: null;
        required: false;
    };
    checkboxValue: {
        type: null;
        required: false;
    };
    options: {
        type: ArrayConstructor;
        required: false;
        default: () => never[];
    };
    help: {
        type: StringConstructor;
        required: false;
    };
    error: {
        type: StringConstructor;
        required: false;
    };
    errorVuelidate: {
        type: ArrayConstructor;
        required: false;
    };
    disabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:checkboxValue"?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    disabled: boolean;
    showLabel: boolean;
    checkboxTrueValue: string | boolean;
    checkboxFalseValue: string | boolean;
    req: boolean;
    options: unknown[];
}>;
export default _default;

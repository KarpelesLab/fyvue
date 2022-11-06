import { createHead } from '@vueuse/head';
import { getCurrentInstance, defineComponent, ref, onMounted, onUnmounted, openBlock, createBlock, unref, withCtx, createVNode, createElementVNode, createTextVNode, toDisplayString, resolveDynamicComponent, createElementBlock, normalizeClass, renderSlot } from 'vue';
import { TransitionRoot, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { XCircleIcon } from '@heroicons/vue/24/solid';

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

const eventBus = mitt();
const useEventBus = () => {
    const vueInstance = getCurrentInstance();
    return vueInstance === null || vueInstance === void 0 ? void 0 : vueInstance.appContext.config.globalProperties.$eventBus;
};

const _hoisted_1$1 = { class: "parent" };
var script$1 = /*#__PURE__*/ defineComponent({
    __name: 'FyModal',
    props: {
        id: { type: String, default: "CustomModal" },
        title: { type: String, default: "" },
        onOpen: { type: Function, default: () => { } },
        onClose: { type: Function, default: () => { } },
        closeIcon: { type: Object, default: XCircleIcon },
    },
    setup(__props) {
        const props = __props;
        const eventBus = useEventBus();
        const isOpen = ref(false);
        const setModal = (value) => {
            if (value === true)
                props.onOpen();
            else {
                props.onClose();
            }
            isOpen.value = Boolean(value);
        };
        onMounted(() => {
            eventBus.on(`${props.id}Modal`, setModal);
        });
        onUnmounted(() => {
            eventBus.off(`${props.id}Modal`, setModal);
        });
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(unref(TransitionRoot), {
                show: isOpen.value,
                as: "template",
                enter: "duration-300 ease-out",
                "enter-from": "opacity-0",
                "enter-to": "opacity-100",
                leave: "duration-200 ease-in",
                "leave-from": "opacity-100",
                "leave-to": "opacity-0"
            }, {
                default: withCtx(() => [
                    createVNode(unref(Dialog), {
                        open: isOpen.value,
                        onClose: setModal,
                        style: { "background": "rgba(0, 0, 0, 0.8)" },
                        class: "fy-modal"
                    }, {
                        default: withCtx(() => [
                            createElementVNode("div", _hoisted_1$1, [
                                createVNode(unref(DialogPanel), { class: "modal-container" }, {
                                    default: withCtx(() => [
                                        (__props.title)
                                            ? (openBlock(), createBlock(unref(DialogTitle), {
                                                key: 0,
                                                class: "title"
                                            }, {
                                                default: withCtx(() => [
                                                    createTextVNode(toDisplayString(__props.title) + " ", 1 /* TEXT */),
                                                    createElementVNode("a", {
                                                        href: "javascript:void(0)",
                                                        onClick: _cache[0] || (_cache[0] = ($event) => (setModal(false)))
                                                    }, [
                                                        (openBlock(), createBlock(resolveDynamicComponent(__props.closeIcon), { class: "close-icon" }))
                                                    ])
                                                ]),
                                                _: 1 /* STABLE */
                                            }))
                                            : (openBlock(), createElementBlock("a", {
                                                key: 1,
                                                href: "javascript:void(0)",
                                                onClick: _cache[1] || (_cache[1] = ($event) => (setModal(false)))
                                            }, [
                                                (openBlock(), createBlock(resolveDynamicComponent(__props.closeIcon), { class: "close-icon is-alone" }))
                                            ])),
                                        createElementVNode("div", {
                                            class: normalizeClass(!__props.title ? 'is-alone modal-content' : 'modal-content')
                                        }, [
                                            renderSlot(_ctx.$slots, "default")
                                        ], 2 /* CLASS */)
                                    ]),
                                    _: 3 /* FORWARDED */
                                })
                            ])
                        ]),
                        _: 3 /* FORWARDED */
                    }, 8 /* PROPS */, ["open"])
                ]),
                _: 3 /* FORWARDED */
            }, 8 /* PROPS */, ["show"]));
        };
    }
});

script$1.__file = "src/components/ui/FyModal/FyModal.vue";

const _hoisted_1 = { class: "fy-circle-percent" };
const _hoisted_2 = {
    viewBox: "0 0 36 36",
    class: "circular-chart"
};
const _hoisted_3 = /*#__PURE__*/ createElementVNode("path", {
    class: "circle-bg",
    d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
}, null, -1 /* HOISTED */);
const _hoisted_4 = ["stroke-dasharray", "stroke"];
const _hoisted_5 = ["x", "y"];
var script = /*#__PURE__*/ defineComponent({
    __name: 'FyCirclePercent',
    props: {
        percent: { type: Number, default: 100 },
        textXY: { type: (Array), default: [18, 20.85] },
        color: { type: String, default: "blue" }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1, [
                (openBlock(), createElementBlock("svg", _hoisted_2, [
                    _hoisted_3,
                    createElementVNode("path", {
                        class: "circle",
                        "stroke-dasharray": `${__props.percent}, 100`,
                        stroke: __props.color,
                        d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    }, null, 8 /* PROPS */, _hoisted_4),
                    createElementVNode("text", {
                        x: __props.textXY[0].toString(),
                        y: __props.textXY[1].toString(),
                        class: "percentage"
                    }, toDisplayString(__props.percent) + "%", 9 /* TEXT, PROPS */, _hoisted_5)
                ]))
            ]));
        };
    }
});

script.__file = "src/components/ui/FyCirclePercent/FyCirclePercent.vue";

var uiComponents = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FyModal: script$1,
    FyCirclePercent: script
});

const head = createHead();
const createFyvue = () => {
    const install = (app, options) => {
        app.use(head);
        app.config.globalProperties.$eventBus = eventBus;
        // Loading UI components
        for (const componentKey in uiComponents) {
            app.component(componentKey, uiComponents[componentKey]);
        }
    };
    return {
        install
    };
};

export { createFyvue, useEventBus };
//# sourceMappingURL=fyvue.mjs.map

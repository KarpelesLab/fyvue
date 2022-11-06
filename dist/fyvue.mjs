import { createHead } from '@vueuse/head';
import { getCurrentInstance, defineComponent, ref, onMounted, onUnmounted, openBlock, createBlock, unref, withCtx, createVNode, createElementVNode, createTextVNode, toDisplayString, resolveDynamicComponent, createElementBlock, normalizeClass, renderSlot, computed, normalizeStyle, Fragment, renderList, createCommentVNode, resolveComponent } from 'vue';
import { TransitionRoot, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { getLocale } from '@karpeleslab/klbfw';
import i18next from 'i18next';
import { XCircleIcon, ArrowRightIcon } from '@heroicons/vue/24/solid';

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

const defaults = {
  allowMultiLoading: false,
};

class Backend {
  constructor(services, options) {
    this.init(services, options);

    this.type = 'backend';
  }

  init(services, options = {}) {
    this.services = services;

    this.options = {
      ...defaults,
      ...this.options,
      ...options,
    };
  }

  read(language, namespace, callback) {
    if (language.length != 5) {
      // ignore this (tip: you should set load: 'currentOnly' in i18next options)
      // this can happen if i18next attempts to load spepcial language "dev" or "en" instead of "en-US"
      callback(null, {});
      return;
    }
    if ((typeof FW !== "undefined") && (language == FW.Locale) && (typeof FW.i18n !== "undefined")) {
      // we already know about this language, use it
      callback(null, FW.i18n);
      return;
    }

    // load via: /l/<lng>/locale.json
    var pfx = "";
    if (typeof FW !== "undefined") {
        pfx = FW.prefix;
    }
    // pfx=""
    // pfx="/l/en-US"
    // pfx="/b/test/l/en-US/z/foobar"
    var newpfx = pfx.replace(/\/l\/[a-z]{2}-[A-Z]{2}/, "/l/"+language);
    if (newpfx == pfx) {
        newpfx = newpfx = "/l/"+language;
    }
    // fallback to fetch: /_special/locale/<lng>.json
    fetch(newpfx+"/_special/locale.json").catch(function(err) { return fetch("/_special/locale/"+language+".json"); })
      .then(function(res) {
        if (!res.ok) {
          const retry = res.status >= 500 && res.status < 600; // don't retry for 4xx codes
    callback(`failed loading i18n`, retry);
    return;
        }
        return res.json();
      })
      .then(function(res) { callback(null, res); })
      .catch(function(err) {
        callback(err, false);
      });
  }
}

Backend.type = 'backend';

const eventBus = mitt();
const useEventBus = () => {
    const vueInstance = getCurrentInstance();
    return vueInstance === null || vueInstance === void 0 ? void 0 : vueInstance.appContext.config.globalProperties.$eventBus;
};
const i18nextPromise = i18next.use(Backend).init({
    ns: ["translation"],
    defaultNS: "translation",
    debug: false,
    lng: getLocale(),
    load: "currentOnly",
    initImmediate: false,
});

const _hoisted_1$3 = { class: "parent" };
var script$3 = /*#__PURE__*/ defineComponent({
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
                            createElementVNode("div", _hoisted_1$3, [
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

script$3.__file = "src/components/ui/FyModal/FyModal.vue";

const _hoisted_1$2 = { class: "fy-circle-percent" };
const _hoisted_2$2 = {
    viewBox: "0 0 36 36",
    class: "circular-chart"
};
const _hoisted_3$1 = /*#__PURE__*/ createElementVNode("path", {
    class: "circle-bg",
    d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
}, null, -1 /* HOISTED */);
const _hoisted_4 = ["stroke-dasharray", "stroke"];
const _hoisted_5 = ["x", "y"];
var script$2 = /*#__PURE__*/ defineComponent({
    __name: 'FyCirclePercent',
    props: {
        percent: { type: Number, default: 100 },
        textXY: { type: (Array), default: [18, 20.85] },
        color: { type: String, default: "blue" }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1$2, [
                (openBlock(), createElementBlock("svg", _hoisted_2$2, [
                    _hoisted_3$1,
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

script$2.__file = "src/components/ui/FyCirclePercent/FyCirclePercent.vue";

const _hoisted_1$1 = { class: "fy-step-bar" };
const _hoisted_2$1 = { class: "bar-bg" };
const _hoisted_3 = { class: "label" };
var script$1 = /*#__PURE__*/ defineComponent({
    __name: 'FySteps',
    props: {
        steps: { type: (Array), default: [] },
        currentStep: { type: Number, default: 0 }
    },
    setup(__props) {
        const props = __props;
        const barWidth = computed(() => (props.currentStep * 100) / props.steps.length);
        const getStepClass = (index) => {
            if ((index + 1) < props.currentStep)
                return 'past-step';
            if ((index + 1) == props.currentStep)
                return 'current-step';
            return 'past-step';
        };
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1$1, [
                createElementVNode("div", _hoisted_2$1, [
                    createElementVNode("div", {
                        class: "bar",
                        style: normalizeStyle(`width:${unref(barWidth)}%`)
                    }, null, 4 /* STYLE */)
                ]),
                createElementVNode("ol", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.steps, (step, index) => {
                        return (openBlock(), createElementBlock("li", {
                            key: index,
                            class: normalizeClass(getStepClass(index))
                        }, [
                            createElementVNode("span", _hoisted_3, toDisplayString(_ctx.$t(step.name)), 1 /* TEXT */),
                            (step.icon)
                                ? (openBlock(), createBlock(resolveDynamicComponent(step.icon), {
                                    key: 0,
                                    class: "icon"
                                }))
                                : createCommentVNode("v-if", true)
                        ], 2 /* CLASS */));
                    }), 128 /* KEYED_FRAGMENT */))
                ])
            ]));
        };
    }
});

script$1.__file = "src/components/ui/FySteps/FySteps.vue";

const _hoisted_1 = {
    class: "fy-breadcrumb",
    "aria-label": "Breadcrumb"
};
const _hoisted_2 = { class: "bc-innactive" };
var script = /*#__PURE__*/ defineComponent({
    __name: 'FyBreadcrumb',
    props: {
        nav: { type: (Array), default: [] },
        maxLength: { type: Number, default: 15 }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            const _component_router_link = resolveComponent("router-link");
            return (openBlock(), createElementBlock("div", _hoisted_1, [
                createElementVNode("ol", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.nav, (item) => {
                        return (openBlock(), createElementBlock(Fragment, null, [
                            (item.to)
                                ? (openBlock(), createElementBlock("li", {
                                    key: item.to,
                                    class: "bc-innactive"
                                }, [
                                    createVNode(_component_router_link, {
                                        to: item.to,
                                        class: "bc-active link"
                                    }, {
                                        default: withCtx(() => [
                                            createTextVNode(toDisplayString(_ctx.$cropText(_ctx.$t(item.name), __props.maxLength)), 1 /* TEXT */)
                                        ]),
                                        _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["to"]),
                                    createVNode(unref(ArrowRightIcon), { class: "icon bc-innactive" })
                                ]))
                                : (openBlock(), createElementBlock("li", {
                                    key: `e-${item.to}`,
                                    class: "bc-current"
                                }, [
                                    createElementVNode("span", _hoisted_2, toDisplayString(_ctx.$cropText(_ctx.$t(item.name), __props.maxLength)), 1 /* TEXT */)
                                ]))
                        ], 64 /* STABLE_FRAGMENT */));
                    }), 256 /* UNKEYED_FRAGMENT */))
                ])
            ]));
        };
    }
});

script.__file = "src/components/ui/FyBreadcrumb/FyBreadcrumb.vue";

var uiComponents = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FyModal: script$3,
  FyCirclePercent: script$2,
  FySteps: script$1,
  FyBreadcrumb: script
});

const cropText = (str, end = '...', ml = 100) => {
    if (str && typeof str == "string") {
        if (str.length > ml) {
            return `${str.slice(0, ml)}${end}`;
        }
    }
    return str;
};
const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes)
        return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const head = createHead();
const createFyvue = () => {
    const install = (app, options) => {
        app.use(head);
        app.config.globalProperties.$eventBus = eventBus;
        app.config.globalProperties.$t = i18next.t;
        app.config.globalProperties.$cropText = cropText;
        app.config.globalProperties.$formatBytes = formatBytes;
        // Loading UI components
        for (const componentKey in uiComponents) {
            app.component(componentKey, uiComponents[componentKey]);
        }
    };
    return {
        install
    };
};

export { createFyvue, i18nextPromise, useEventBus };
//# sourceMappingURL=fyvue.mjs.map

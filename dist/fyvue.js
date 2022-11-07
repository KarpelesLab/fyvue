'use strict';

var head$1 = require('@vueuse/head');
var vue = require('vue');
var vue$1 = require('@headlessui/vue');
var klbfw = require('@karpeleslab/klbfw');
var i18next = require('i18next');
var solid = require('@heroicons/vue/24/solid');

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
    const vueInstance = vue.getCurrentInstance();
    return vueInstance?.appContext.config.globalProperties.$eventBus;
};
const i18nextPromise = i18next.use(Backend).init({
    ns: ["translation"],
    defaultNS: "translation",
    debug: false,
    lng: klbfw.getLocale(),
    load: "currentOnly",
    initImmediate: false,
});
const useTranslation = () => {
    const vueInstance = vue.getCurrentInstance();
    return vueInstance?.appContext.config.globalProperties.$t;
};

const _hoisted_1$4 = { class: "parent" };
var script$4 = /*#__PURE__*/ vue.defineComponent({
    __name: 'FyModal',
    props: {
        id: { type: String, default: "CustomModal" },
        title: { type: String, default: "" },
        onOpen: { type: Function, default: () => { } },
        onClose: { type: Function, default: () => { } },
        closeIcon: { type: Object, default: solid.XCircleIcon },
    },
    setup(__props) {
        const props = __props;
        const eventBus = useEventBus();
        const isOpen = vue.ref(false);
        const setModal = (value) => {
            if (value === true)
                props.onOpen();
            else {
                props.onClose();
            }
            isOpen.value = value;
        };
        vue.onMounted(() => {
            eventBus.on(`${props.id}Modal`, setModal);
        });
        vue.onUnmounted(() => {
            eventBus.off(`${props.id}Modal`, setModal);
        });
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createBlock(vue.unref(vue$1.TransitionRoot), {
                show: isOpen.value,
                as: "template",
                enter: "duration-300 ease-out",
                "enter-from": "opacity-0",
                "enter-to": "opacity-100",
                leave: "duration-200 ease-in",
                "leave-from": "opacity-100",
                "leave-to": "opacity-0"
            }, {
                default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(vue$1.Dialog), {
                        open: isOpen.value,
                        onClose: setModal,
                        style: { "background": "rgba(0, 0, 0, 0.8)" },
                        class: "fy-modal"
                    }, {
                        default: vue.withCtx(() => [
                            vue.createElementVNode("div", _hoisted_1$4, [
                                vue.createVNode(vue.unref(vue$1.DialogPanel), { class: "modal-container" }, {
                                    default: vue.withCtx(() => [
                                        (__props.title)
                                            ? (vue.openBlock(), vue.createBlock(vue.unref(vue$1.DialogTitle), {
                                                key: 0,
                                                class: "title"
                                            }, {
                                                default: vue.withCtx(() => [
                                                    vue.createTextVNode(vue.toDisplayString(__props.title) + " ", 1 /* TEXT */),
                                                    vue.createElementVNode("a", {
                                                        href: "javascript:void(0)",
                                                        onClick: _cache[0] || (_cache[0] = ($event) => (setModal(false)))
                                                    }, [
                                                        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.closeIcon), { class: "close-icon" }))
                                                    ])
                                                ]),
                                                _: 1 /* STABLE */
                                            }))
                                            : (vue.openBlock(), vue.createElementBlock("a", {
                                                key: 1,
                                                href: "javascript:void(0)",
                                                onClick: _cache[1] || (_cache[1] = ($event) => (setModal(false)))
                                            }, [
                                                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.closeIcon), { class: "close-icon is-alone" }))
                                            ])),
                                        vue.createElementVNode("div", {
                                            class: vue.normalizeClass(!__props.title ? 'is-alone modal-content' : 'modal-content')
                                        }, [
                                            vue.renderSlot(_ctx.$slots, "default")
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

script$4.__file = "src/components/ui/FyModal/FyModal.vue";

const _hoisted_1$3 = { class: "fy-circle-percent" };
const _hoisted_2$3 = {
    viewBox: "0 0 36 36",
    class: "circular-chart"
};
const _hoisted_3$2 = /*#__PURE__*/ vue.createElementVNode("path", {
    class: "circle-bg",
    d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
}, null, -1 /* HOISTED */);
const _hoisted_4$1 = ["stroke-dasharray", "stroke"];
const _hoisted_5$1 = ["x", "y"];
var script$3 = /*#__PURE__*/ vue.defineComponent({
    __name: 'FyCirclePercent',
    props: {
        percent: { type: Number, default: 100 },
        textXY: { type: (Array), default: [18, 20.85] },
        color: { type: String, default: "blue" }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
                (vue.openBlock(), vue.createElementBlock("svg", _hoisted_2$3, [
                    _hoisted_3$2,
                    vue.createElementVNode("path", {
                        class: "circle",
                        "stroke-dasharray": `${__props.percent}, 100`,
                        stroke: __props.color,
                        d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    }, null, 8 /* PROPS */, _hoisted_4$1),
                    vue.createElementVNode("text", {
                        x: __props.textXY[0].toString(),
                        y: __props.textXY[1].toString(),
                        class: "percentage"
                    }, vue.toDisplayString(__props.percent) + "%", 9 /* TEXT, PROPS */, _hoisted_5$1)
                ]))
            ]));
        };
    }
});

script$3.__file = "src/components/ui/FyCirclePercent/FyCirclePercent.vue";

const _hoisted_1$2 = { class: "parent" };
const _hoisted_2$2 = {
    class: "modal-container",
    style: { "width": "350px !important" }
};
const _hoisted_3$1 = { class: "modal-content" };
const _hoisted_4 = {
    key: 0,
    class: "confirm-modal-desc default-p"
};
const _hoisted_5 = /*#__PURE__*/ vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6 = { class: "btn-box" };
var script$2 = /*#__PURE__*/ vue.defineComponent({
    __name: 'FyConfirm',
    setup(__props) {
        const eventBus = useEventBus();
        const confirm = vue.ref(false);
        const title = vue.ref(null);
        const desc = vue.ref(null);
        const onConfirm = vue.ref(null);
        const _onConfirm = async () => {
            if (onConfirm.value) {
                await onConfirm.value();
            }
            resetConfirm();
        };
        const resetConfirm = () => {
            title.value = null;
            desc.value = null;
            onConfirm.value = null;
            confirm.value = false;
        };
        const showConfirm = (data) => {
            title.value = data.title;
            desc.value = data.desc;
            onConfirm.value = data.onConfirm;
            confirm.value = true;
        };
        vue.onMounted(() => {
            eventBus.on('resetConfirm', resetConfirm);
            eventBus.on('showConfirm', showConfirm);
        });
        vue.onUnmounted(() => {
            eventBus.off('resetConfirm', resetConfirm);
            eventBus.off('showConfirm', showConfirm);
        });
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", null, [
                vue.createVNode(vue.unref(vue$1.Dialog), {
                    open: confirm.value,
                    onClose: _cache[2] || (_cache[2] = ($event) => (confirm.value = false)),
                    class: "fy-modal is-confirm",
                    style: { "background": "rgba(0, 0, 0, 0.6)", "z-index": "43 !important" }
                }, {
                    default: vue.withCtx(() => [
                        vue.createElementVNode("div", _hoisted_1$2, [
                            vue.createVNode(vue.unref(vue$1.DialogOverlay)),
                            vue.createElementVNode("div", _hoisted_2$2, [
                                vue.createElementVNode("div", null, [
                                    vue.createVNode(vue.unref(vue$1.DialogTitle), { class: "title" }, {
                                        default: vue.withCtx(() => [
                                            vue.createTextVNode(vue.toDisplayString(title.value), 1 /* TEXT */)
                                        ]),
                                        _: 1 /* STABLE */
                                    }),
                                    vue.createElementVNode("div", _hoisted_3$1, [
                                        (desc.value)
                                            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, vue.toDisplayString(desc.value), 1 /* TEXT */))
                                            : vue.createCommentVNode("v-if", true),
                                        _hoisted_5,
                                        vue.createElementVNode("div", _hoisted_6, [
                                            vue.createElementVNode("button", {
                                                onClick: _cache[0] || (_cache[0] = ($event) => (confirm.value = false)),
                                                class: "btn neutral btn-defaults"
                                            }, vue.toDisplayString(_ctx.$t("confirm_modal_cta_cancel")), 1 /* TEXT */),
                                            vue.createElementVNode("button", {
                                                onClick: _cache[1] || (_cache[1] = ($event) => (_onConfirm())),
                                                class: "btn primary btn-defaults"
                                            }, vue.toDisplayString(_ctx.$t("confirm_modal_cta_confirm")), 1 /* TEXT */)
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ]),
                    _: 1 /* STABLE */
                }, 8 /* PROPS */, ["open"])
            ]));
        };
    }
});

script$2.__file = "src/components/ui/FyConfirm/FyConfirm.vue";

const _hoisted_1$1 = {
    class: "fy-breadcrumb",
    "aria-label": "Breadcrumb"
};
const _hoisted_2$1 = { class: "bc-innactive" };
var script$1 = /*#__PURE__*/ vue.defineComponent({
    __name: 'FyBreadcrumb',
    props: {
        nav: { type: (Array), default: [] },
        maxLength: { type: Number, default: 15 }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            const _component_router_link = vue.resolveComponent("router-link");
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
                vue.createElementVNode("ol", null, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.nav, (item) => {
                        return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                            (item.to)
                                ? (vue.openBlock(), vue.createElementBlock("li", {
                                    key: item.to,
                                    class: "bc-innactive"
                                }, [
                                    vue.createVNode(_component_router_link, {
                                        to: item.to,
                                        class: "bc-active link"
                                    }, {
                                        default: vue.withCtx(() => [
                                            vue.createTextVNode(vue.toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1 /* TEXT */)
                                        ]),
                                        _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["to"]),
                                    vue.createVNode(vue.unref(solid.ArrowRightIcon), { class: "icon bc-innactive" })
                                ]))
                                : (vue.openBlock(), vue.createElementBlock("li", {
                                    key: `e-${item.to}`,
                                    class: "bc-current"
                                }, [
                                    vue.createElementVNode("span", _hoisted_2$1, vue.toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1 /* TEXT */)
                                ]))
                        ], 64 /* STABLE_FRAGMENT */));
                    }), 256 /* UNKEYED_FRAGMENT */))
                ])
            ]));
        };
    }
});

script$1.__file = "src/components/ui/FyBreadcrumb/FyBreadcrumb.vue";

const _hoisted_1 = { class: "fy-step-bar" };
const _hoisted_2 = { class: "bar-bg" };
const _hoisted_3 = { class: "label" };
var script = /*#__PURE__*/ vue.defineComponent({
    __name: 'FySteps',
    props: {
        steps: { type: (Array), default: [] },
        currentStep: { type: Number, default: 0 }
    },
    setup(__props) {
        const props = __props;
        const barWidth = vue.computed(() => (props.currentStep * 100) / props.steps.length);
        const getStepClass = (index) => {
            if ((index + 1) < props.currentStep)
                return 'past-step';
            if ((index + 1) == props.currentStep)
                return 'current-step';
            return 'past-step';
        };
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
                vue.createElementVNode("div", _hoisted_2, [
                    vue.createElementVNode("div", {
                        class: "bar",
                        style: vue.normalizeStyle(`width:${vue.unref(barWidth)}%`)
                    }, null, 4 /* STYLE */)
                ]),
                vue.createElementVNode("ol", null, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.steps, (step, index) => {
                        return (vue.openBlock(), vue.createElementBlock("li", {
                            key: index,
                            class: vue.normalizeClass(getStepClass(index))
                        }, [
                            vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(_ctx.$t(step.name)), 1 /* TEXT */),
                            (step.icon)
                                ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(step.icon), {
                                    key: 0,
                                    class: "icon"
                                }))
                                : vue.createCommentVNode("v-if", true)
                        ], 2 /* CLASS */));
                    }), 128 /* KEYED_FRAGMENT */))
                ])
            ]));
        };
    }
});

script.__file = "src/components/ui/FySteps/FySteps.vue";

var uiComponents = [
    script$4,
    script$3,
    script$2,
    script$1,
    script
];

const cropText = (str, ml = 100, end = '...') => {
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

const head = head$1.createHead();
const createFyvue = () => {
    const install = (app, options) => {
        app.use(head);
        app.config.globalProperties.$eventBus = eventBus;
        app.config.globalProperties.$t = i18next.t;
        app.config.globalProperties.$cropText = cropText;
        app.config.globalProperties.$formatBytes = formatBytes;
        uiComponents.forEach((component) => {
            if (component.__name)
                app.component(component.__name, component);
        });
    };
    return {
        install
    };
};

exports.createFyvue = createFyvue;
exports.i18nextPromise = i18nextPromise;
exports.useEventBus = useEventBus;
exports.useTranslation = useTranslation;
//# sourceMappingURL=fyvue.js.map

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
      callback(null, {});
      return;
    }
    if ((typeof FW !== "undefined") && (language == FW.Locale) && (typeof FW.i18n !== "undefined")) {
      callback(null, FW.i18n);
      return;
    }
    var pfx = "";
    if (typeof FW !== "undefined") {
        pfx = FW.prefix;
    }
    var newpfx = pfx.replace(/\/l\/[a-z]{2}-[A-Z]{2}/, "/l/"+language);
    if (newpfx == pfx) {
        newpfx = newpfx = "/l/"+language;
    }
    fetch(newpfx+"/_special/locale.json").catch(function(err) { return fetch("/_special/locale/"+language+".json"); })
      .then(function(res) {
        if (!res.ok) {
          const retry = res.status >= 500 && res.status < 600;
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
    return vueInstance === null || vueInstance === void 0 ? void 0 : vueInstance.appContext.config.globalProperties.$eventBus;
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
    return vueInstance === null || vueInstance === void 0 ? void 0 : vueInstance.appContext.config.globalProperties.$t;
};

const _hoisted_1$a = { class: "parent" };
var script$a = vue.defineComponent({
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
                            vue.createElementVNode("div", _hoisted_1$a, [
                                vue.createVNode(vue.unref(vue$1.DialogPanel), { class: "modal-container" }, {
                                    default: vue.withCtx(() => [
                                        (__props.title)
                                            ? (vue.openBlock(), vue.createBlock(vue.unref(vue$1.DialogTitle), {
                                                key: 0,
                                                class: "title"
                                            }, {
                                                default: vue.withCtx(() => [
                                                    vue.createTextVNode(vue.toDisplayString(__props.title) + " ", 1),
                                                    vue.createElementVNode("a", {
                                                        href: "javascript:void(0)",
                                                        onClick: _cache[0] || (_cache[0] = ($event) => (setModal(false)))
                                                    }, [
                                                        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.closeIcon), { class: "close-icon" }))
                                                    ])
                                                ]),
                                                _: 1
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
                                        ], 2)
                                    ]),
                                    _: 3
                                })
                            ])
                        ]),
                        _: 3
                    }, 8, ["open"])
                ]),
                _: 3
            }, 8, ["show"]));
        };
    }
});

script$a.__file = "src/components/ui/FyModal/FyModal.vue";

const _hoisted_1$9 = { class: "fy-circle-percent" };
const _hoisted_2$9 = {
    viewBox: "0 0 36 36",
    class: "circular-chart"
};
const _hoisted_3$7 = vue.createElementVNode("path", {
    class: "circle-bg",
    d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
}, null, -1);
const _hoisted_4$6 = ["stroke-dasharray", "stroke"];
const _hoisted_5$5 = ["x", "y"];
var script$9 = vue.defineComponent({
    __name: 'FyCirclePercent',
    props: {
        percent: { type: Number, default: 100 },
        textXY: { type: (Array), default: [18, 20.85] },
        color: { type: String, default: "blue" }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$9, [
                (vue.openBlock(), vue.createElementBlock("svg", _hoisted_2$9, [
                    _hoisted_3$7,
                    vue.createElementVNode("path", {
                        class: "circle",
                        "stroke-dasharray": `${__props.percent}, 100`,
                        stroke: __props.color,
                        d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    }, null, 8, _hoisted_4$6),
                    vue.createElementVNode("text", {
                        x: __props.textXY[0].toString(),
                        y: __props.textXY[1].toString(),
                        class: "percentage"
                    }, vue.toDisplayString(__props.percent) + "%", 9, _hoisted_5$5)
                ]))
            ]));
        };
    }
});

script$9.__file = "src/components/ui/FyCirclePercent/FyCirclePercent.vue";

const _hoisted_1$8 = { class: "parent" };
const _hoisted_2$8 = {
    class: "modal-container",
    style: { "width": "350px !important" }
};
const _hoisted_3$6 = { class: "modal-content" };
const _hoisted_4$5 = {
    key: 0,
    class: "confirm-modal-desc default-p"
};
const _hoisted_5$4 = vue.createElementVNode("br", null, null, -1);
const _hoisted_6$3 = { class: "btn-box" };
var script$8 = vue.defineComponent({
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
                        vue.createElementVNode("div", _hoisted_1$8, [
                            vue.createVNode(vue.unref(vue$1.DialogOverlay)),
                            vue.createElementVNode("div", _hoisted_2$8, [
                                vue.createElementVNode("div", null, [
                                    vue.createVNode(vue.unref(vue$1.DialogTitle), { class: "title" }, {
                                        default: vue.withCtx(() => [
                                            vue.createTextVNode(vue.toDisplayString(title.value), 1)
                                        ]),
                                        _: 1
                                    }),
                                    vue.createElementVNode("div", _hoisted_3$6, [
                                        (desc.value)
                                            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$5, vue.toDisplayString(desc.value), 1))
                                            : vue.createCommentVNode("v-if", true),
                                        _hoisted_5$4,
                                        vue.createElementVNode("div", _hoisted_6$3, [
                                            vue.createElementVNode("button", {
                                                onClick: _cache[0] || (_cache[0] = ($event) => (confirm.value = false)),
                                                class: "btn neutral btn-defaults"
                                            }, vue.toDisplayString(_ctx.$t("confirm_modal_cta_cancel")), 1),
                                            vue.createElementVNode("button", {
                                                onClick: _cache[1] || (_cache[1] = ($event) => (_onConfirm())),
                                                class: "btn primary btn-defaults"
                                            }, vue.toDisplayString(_ctx.$t("confirm_modal_cta_confirm")), 1)
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ]),
                    _: 1
                }, 8, ["open"])
            ]));
        };
    }
});

script$8.__file = "src/components/ui/FyConfirm/FyConfirm.vue";

const _hoisted_1$7 = {
    class: "fy-breadcrumb",
    "aria-label": "Breadcrumb"
};
const _hoisted_2$7 = { class: "bc-innactive" };
var script$7 = vue.defineComponent({
    __name: 'FyBreadcrumb',
    props: {
        nav: { type: (Array), default: [] },
        maxLength: { type: Number, default: 15 }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            const _component_router_link = vue.resolveComponent("router-link");
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$7, [
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
                                            vue.createTextVNode(vue.toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1)
                                        ]),
                                        _: 2
                                    }, 1032, ["to"]),
                                    vue.createVNode(vue.unref(solid.ArrowRightIcon), { class: "icon bc-innactive" })
                                ]))
                                : (vue.openBlock(), vue.createElementBlock("li", {
                                    key: `e-${item.to}`,
                                    class: "bc-current"
                                }, [
                                    vue.createElementVNode("span", _hoisted_2$7, vue.toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1)
                                ]))
                        ], 64));
                    }), 256))
                ])
            ]));
        };
    }
});

script$7.__file = "src/components/ui/FyBreadcrumb/FyBreadcrumb.vue";

const _hoisted_1$6 = { class: "fy-step-bar" };
const _hoisted_2$6 = { class: "bar-bg" };
const _hoisted_3$5 = { class: "label" };
var script$6 = vue.defineComponent({
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
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [
                vue.createElementVNode("div", _hoisted_2$6, [
                    vue.createElementVNode("div", {
                        class: "bar",
                        style: vue.normalizeStyle(`width:${vue.unref(barWidth)}%`)
                    }, null, 4)
                ]),
                vue.createElementVNode("ol", null, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.steps, (step, index) => {
                        return (vue.openBlock(), vue.createElementBlock("li", {
                            key: index,
                            class: vue.normalizeClass(getStepClass(index))
                        }, [
                            vue.createElementVNode("span", _hoisted_3$5, vue.toDisplayString(_ctx.$t(step.name)), 1),
                            (step.icon)
                                ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(step.icon), {
                                    key: 0,
                                    class: "icon"
                                }))
                                : vue.createCommentVNode("v-if", true)
                        ], 2));
                    }), 128))
                ])
            ]));
        };
    }
});

script$6.__file = "src/components/ui/FySteps/FySteps.vue";

const _hoisted_1$5 = {
    key: 0,
    class: "border-collapse w-full md:mx-0 fy-datatable"
};
const _hoisted_2$5 = { key: 0 };
const _hoisted_3$4 = { class: "div" };
const _hoisted_4$4 = { class: "div-cell" };
const _hoisted_5$3 = { key: 0 };
const _hoisted_6$2 = { key: 1 };
var script$5 = vue.defineComponent({
    __name: 'FyDatatable',
    props: {
        showHeaders: {
            type: Boolean,
            default: true
        },
        headers: {
            type: Object,
            default: {}
        },
        data: {
            type: (Array),
            default: []
        }
    },
    setup(__props) {
        const bgColor = (i) => {
            return i % 2 == 0 ? 'bg-color-1' : 'bg-color-2';
        };
        return (_ctx, _cache) => {
            return (__props.data && __props.data.length > 0)
                ? (vue.openBlock(), vue.createElementBlock("table", _hoisted_1$5, [
                    (__props.showHeaders)
                        ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_2$5, [
                            vue.createElementVNode("tr", null, [
                                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.headers, (title) => {
                                    return (vue.openBlock(), vue.createElementBlock("th", {
                                        key: `header_${title}`
                                    }, vue.toDisplayString(title), 1));
                                }), 128))
                            ])
                        ]))
                        : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode("tbody", null, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.data, (item, index) => {
                            return (vue.openBlock(), vue.createElementBlock("tr", {
                                key: index,
                                class: vue.normalizeClass(`tr ${bgColor(index)} `)
                            }, [
                                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.headers, (title, property) => {
                                    return (vue.openBlock(), vue.createElementBlock("td", {
                                        key: title,
                                        class: "td"
                                    }, [
                                        vue.createElementVNode("div", _hoisted_3$4, vue.toDisplayString(title), 1),
                                        vue.createElementVNode("div", _hoisted_4$4, [
                                            vue.renderSlot(_ctx.$slots, `${property}_item`, {
                                                data: { prop: item[property], item: item, idx: index }
                                            }, () => [
                                                (item[property])
                                                    ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$3, vue.toDisplayString(item[property]), 1))
                                                    : (vue.openBlock(), vue.createElementBlock("span", _hoisted_6$2, "n/a"))
                                            ])
                                        ])
                                    ]));
                                }), 128))
                            ], 2));
                        }), 128))
                    ])
                ]))
                : vue.createCommentVNode("v-if", true);
        };
    }
});

script$5.__file = "src/components/ui/FyDatatable/FyDatatable.vue";

const _hoisted_1$4 = {
    key: 0,
    class: "fy-table"
};
const _hoisted_2$4 = { class: "table-container" };
const _hoisted_3$3 = { key: 0 };
const _hoisted_4$3 = { key: 0 };
const _hoisted_5$2 = { key: 1 };
var script$4 = vue.defineComponent({
    __name: 'FyTable',
    props: {
        showHeaders: {
            type: Boolean,
            default: true
        },
        headers: {
            type: Object,
            default: {}
        },
        data: {
            type: (Array),
            default: []
        }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (__props.data && __props.data.length)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
                    vue.createElementVNode("div", _hoisted_2$4, [
                        vue.createElementVNode("table", null, [
                            (__props.showHeaders)
                                ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_3$3, [
                                    vue.createElementVNode("tr", null, [
                                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.headers, (title, property) => {
                                            return (vue.openBlock(), vue.createElementBlock("th", { key: property }, vue.toDisplayString(title), 1));
                                        }), 128))
                                    ])
                                ]))
                                : vue.createCommentVNode("v-if", true),
                            vue.createElementVNode("tbody", null, [
                                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.data, (item, index) => {
                                    return (vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.headers, (_, property) => {
                                            return (vue.openBlock(), vue.createElementBlock("td", {
                                                key: `${property}`
                                            }, [
                                                vue.renderSlot(_ctx.$slots, `${property}_item`, {
                                                    data: {
                                                        prop: item[property],
                                                        item: item,
                                                        idx: index,
                                                    }
                                                }, () => [
                                                    (item[property])
                                                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$3, vue.toDisplayString(item[property]), 1))
                                                        : (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$2, "n/a"))
                                                ])
                                            ]));
                                        }), 128))
                                    ]));
                                }), 128))
                            ])
                        ])
                    ])
                ]))
                : vue.createCommentVNode("v-if", true);
        };
    }
});

script$4.__file = "src/components/ui/FyTable/FyTable.vue";

const _hoisted_1$3 = vue.createElementVNode("path", {
    d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
    fill: "currentColor"
}, null, -1);
const _hoisted_2$3 = vue.createElementVNode("path", {
    d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
    fill: "currentFill"
}, null, -1);
const _hoisted_3$2 = [
    _hoisted_1$3,
    _hoisted_2$3
];
const _hoisted_4$2 = { class: "sr-only" };
var script$3 = vue.defineComponent({
    __name: 'DefaultLoader',
    props: {
        size: {
            type: String,
            default: "16"
        }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                (vue.openBlock(), vue.createElementBlock("svg", {
                    style: vue.normalizeStyle(`width: ${(parseInt(__props.size) / 2).toString()}rem; height: ${(parseInt(__props.size) / 2).toString()}rem;`),
                    "aria-hidden": "true",
                    class: "default-loader",
                    viewBox: "0 0 100 101",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                }, _hoisted_3$2, 4)),
                vue.createElementVNode("span", _hoisted_4$2, vue.toDisplayString(_ctx.$t('global_loading_text')), 1)
            ], 64));
        };
    }
});

script$3.__file = "src/components/ui/FyLoader/DefaultLoader.vue";

const _hoisted_1$2 = { key: 0 };
const _hoisted_2$2 = { class: "fy-loader" };
var script$2 = vue.defineComponent({
    __name: 'FyLoader',
    props: {
        id: {
            type: String,
            default: null
        },
        loader: {
            type: Object,
            default: script$3
        },
        showLoadingText: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: "16"
        }
    },
    setup(__props) {
        const props = __props;
        const eventBus = useEventBus();
        const loading = vue.ref(false);
        const setLoading = (value) => {
            loading.value = value;
        };
        vue.onMounted(() => {
            if (props.id) {
                eventBus.on(`${props.id}-loading`, setLoading);
            }
            else {
                eventBus.on("loading", setLoading);
            }
        });
        vue.onUnmounted(() => {
            if (props.id) {
                eventBus.off(`${props.id}-loading`, setLoading);
            }
            else {
                eventBus.off("loading", setLoading);
            }
        });
        return (_ctx, _cache) => {
            return (loading.value)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
                    vue.createElementVNode("div", _hoisted_2$2, [
                        vue.createElementVNode("div", {
                            class: "loader-container",
                            role: "status",
                            style: vue.normalizeStyle(`width:${__props.size}rem; height:${__props.size}rem;`)
                        }, [
                            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.loader), { size: __props.size }, null, 8, ["size"]))
                        ], 4)
                    ])
                ]))
                : vue.createCommentVNode("v-if", true);
        };
    }
});

script$2.__file = "src/components/ui/FyLoader/FyLoader.vue";

const _hoisted_1$1 = { class: "input-group" };
const _hoisted_2$1 = ["for"];
const _hoisted_3$1 = ["id", "true-value", "false-value"];
const _hoisted_4$1 = ["href"];
const _hoisted_5$1 = {
    key: 2,
    class: "is-req"
};
const _hoisted_6$1 = {
    key: 1,
    class: "input-box"
};
const _hoisted_7$1 = ["placeholder", "autocomplete", "id"];
const _hoisted_8$1 = ["placeholder", "autocomplete", "id"];
const _hoisted_9$1 = ["id"];
const _hoisted_10$1 = ["value"];
const _hoisted_11$1 = {
    key: 2,
    class: "help-text"
};
const _hoisted_12$1 = {
    key: 3,
    class: "form-error-label"
};
var script$1 = vue.defineComponent({
    __name: 'FyInputBase',
    props: {
        id: {
            type: String,
            default: undefined,
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: undefined
        },
        errors: {
            type: String,
            default: undefined
        },
        type: {
            type: String,
            default: 'text',
            required: true
        },
        placeholder: {
            type: String,
            default: undefined
        },
        autocomplete: {
            type: String,
            default: undefined
        },
        checkboxTrueValue: {
            type: String,
            default: "on"
        },
        checkboxFalseValue: {
            type: String,
            default: "off"
        },
        req: {
            type: Boolean,
            default: false
        },
        help: {
            type: String,
            default: undefined
        },
        linkIcon: {
            type: String,
            default: undefined
        },
        modelValue: null,
        options: {
            type: (Array),
            default: []
        }
    },
    emits: ['update:modelValue'],
    setup(__props, { emit }) {
        const props = __props;
        const model = vue.computed({
            get: () => props.modelValue,
            set: items => emit('update:modelValue', items)
        });
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
                (__props.showLabel && __props.id && __props.label)
                    ? (vue.openBlock(), vue.createElementBlock("label", {
                        key: 0,
                        class: "label-basic",
                        for: __props.id
                    }, [
                        (__props.type == 'checkbox')
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                                key: 0,
                                type: "checkbox",
                                class: vue.normalizeClass(["form-checkbox", { 'error-form': __props.errors }]),
                                id: __props.id,
                                "true-value": __props.checkboxTrueValue,
                                "false-value": __props.checkboxFalseValue,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (vue.isRef(model) ? (model).value = $event : null))
                            }, null, 10, _hoisted_3$1)), [
                                [vue.vModelCheckbox, vue.unref(model)]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        vue.createTextVNode(" " + vue.toDisplayString(__props.label) + " ", 1),
                        (__props.linkIcon)
                            ? (vue.openBlock(), vue.createElementBlock("a", {
                                key: 1,
                                class: "link-icon",
                                href: __props.linkIcon,
                                target: "_blank"
                            }, [
                                vue.createVNode(vue.unref(solid.LinkIcon))
                            ], 8, _hoisted_4$1))
                            : vue.createCommentVNode("v-if", true),
                        (__props.req)
                            ? (vue.openBlock(), vue.createElementBlock("sup", _hoisted_5$1, "*"))
                            : vue.createCommentVNode("v-if", true)
                    ], 8, _hoisted_2$1))
                    : vue.createCommentVNode("v-if", true),
                (!['checkbox', 'radiobox'].includes(__props.type))
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$1, [
                        vue.renderSlot(_ctx.$slots, "before"),
                        (['text', 'password', 'email'].includes(__props.type))
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                                key: 0,
                                class: vue.normalizeClass(["input-basic", { 'error-form': __props.errors }]),
                                placeholder: __props.placeholder,
                                autocomplete: __props.autocomplete,
                                id: __props.id,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => (vue.isRef(model) ? (model).value = $event : null))
                            }, null, 10, _hoisted_7$1)), [
                                [vue.vModelText, vue.unref(model)]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        (__props.type == 'textarea')
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
                                key: 1,
                                class: vue.normalizeClass(["input-basic is-textarea", { 'error-form': __props.errors }]),
                                placeholder: __props.placeholder,
                                autocomplete: __props.autocomplete,
                                id: __props.id,
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => (vue.isRef(model) ? (model).value = $event : null))
                            }, null, 10, _hoisted_8$1)), [
                                [vue.vModelText, vue.unref(model)]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        (__props.type == 'select')
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("select", {
                                key: 2,
                                id: __props.id,
                                class: "input-basic",
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => (vue.isRef(model) ? (model).value = $event : null))
                            }, [
                                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.options, (opt) => {
                                    return (vue.openBlock(), vue.createElementBlock("option", {
                                        value: opt[0],
                                        key: opt[0].toString()
                                    }, vue.toDisplayString(opt[1]), 9, _hoisted_10$1));
                                }), 128))
                            ], 8, _hoisted_9$1)), [
                                [vue.vModelSelect, vue.unref(model)]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        vue.renderSlot(_ctx.$slots, "after")
                    ]))
                    : vue.createCommentVNode("v-if", true),
                (__props.help)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$1, vue.toDisplayString(__props.help), 1))
                    : vue.createCommentVNode("v-if", true),
                (__props.errors)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12$1, vue.toDisplayString(__props.errors), 1))
                    : vue.createCommentVNode("v-if", true)
            ]));
        };
    }
});

script$1.__file = "src/components/ui/FyInput/FyInputBase.vue";

const _hoisted_1 = { class: "input-group" };
const _hoisted_2 = ["for"];
const _hoisted_3 = ["id", "true-value", "false-value"];
const _hoisted_4 = ["href"];
const _hoisted_5 = {
    key: 2,
    class: "is-req"
};
const _hoisted_6 = {
    key: 1,
    class: "input-box"
};
const _hoisted_7 = ["placeholder", "autocomplete", "id"];
const _hoisted_8 = ["placeholder", "autocomplete", "id"];
const _hoisted_9 = ["id"];
const _hoisted_10 = ["value"];
const _hoisted_11 = {
    key: 2,
    class: "help-text"
};
const _hoisted_12 = {
    key: 3,
    class: "form-error-label"
};
var script = vue.defineComponent({
    __name: 'FyInput',
    props: {
        id: {
            type: String,
            default: undefined,
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: undefined
        },
        type: {
            type: String,
            default: 'text',
            required: true
        },
        placeholder: {
            type: String,
            default: undefined
        },
        autocomplete: {
            type: String,
            default: undefined
        },
        checkboxTrueValue: {
            type: String,
            default: undefined
        },
        checkboxFalseValue: {
            type: String,
            default: undefined
        },
        req: {
            type: Boolean,
            default: false
        },
        help: {
            type: String,
            default: undefined
        },
        linkIcon: {
            type: String,
            default: undefined
        },
        modelValue: null,
        options: {
            type: (Array),
            default: []
        }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
                (__props.showLabel && __props.id && __props.label)
                    ? (vue.openBlock(), vue.createElementBlock("label", {
                        key: 0,
                        class: "label-basic",
                        for: __props.id
                    }, [
                        (__props.type == 'checkbox')
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                                key: 0,
                                type: "checkbox",
                                class: vue.normalizeClass(["form-checkbox", { 'error-form': __props.modelValue.$errors.length }]),
                                id: __props.id,
                                "true-value": __props.checkboxTrueValue,
                                "false-value": __props.checkboxFalseValue,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ((__props.modelValue.$model) = $event))
                            }, null, 10, _hoisted_3)), [
                                [vue.vModelCheckbox, __props.modelValue.$model]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        vue.createTextVNode(" " + vue.toDisplayString(__props.label) + " ", 1),
                        (__props.linkIcon)
                            ? (vue.openBlock(), vue.createElementBlock("a", {
                                key: 1,
                                class: "link-icon",
                                href: __props.linkIcon,
                                target: "_blank"
                            }, [
                                vue.createVNode(vue.unref(solid.LinkIcon))
                            ], 8, _hoisted_4))
                            : vue.createCommentVNode("v-if", true),
                        (__props.req)
                            ? (vue.openBlock(), vue.createElementBlock("sup", _hoisted_5, "*"))
                            : vue.createCommentVNode("v-if", true)
                    ], 8, _hoisted_2))
                    : vue.createCommentVNode("v-if", true),
                (!['checkbox', 'radiobox'].includes(__props.type))
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
                        vue.renderSlot(_ctx.$slots, "before"),
                        (['text', 'password', 'email'].includes(__props.type))
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                                key: 0,
                                class: vue.normalizeClass(["input-basic", { 'error-form': __props.modelValue.$errors.length > 0 }]),
                                placeholder: __props.placeholder,
                                autocomplete: __props.autocomplete,
                                id: __props.id,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => ((__props.modelValue.$model) = $event))
                            }, null, 10, _hoisted_7)), [
                                [vue.vModelText, __props.modelValue.$model]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        (__props.type == 'textarea')
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
                                key: 1,
                                class: vue.normalizeClass(["input-basic is-textarea", { 'error-form': __props.modelValue.$errors.length > 0 }]),
                                placeholder: __props.placeholder,
                                autocomplete: __props.autocomplete,
                                id: __props.id,
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => ((__props.modelValue.$model) = $event))
                            }, null, 10, _hoisted_8)), [
                                [vue.vModelText, __props.modelValue.$model]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        (__props.type == 'select')
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("select", {
                                key: 2,
                                id: __props.id,
                                class: "input-basic",
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => ((__props.modelValue.$model) = $event))
                            }, [
                                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.options, (opt) => {
                                    return (vue.openBlock(), vue.createElementBlock("option", {
                                        value: opt[0],
                                        key: opt[0].toString()
                                    }, vue.toDisplayString(opt[1]), 9, _hoisted_10));
                                }), 128))
                            ], 8, _hoisted_9)), [
                                [vue.vModelSelect, __props.modelValue.$model]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        vue.renderSlot(_ctx.$slots, "after")
                    ]))
                    : vue.createCommentVNode("v-if", true),
                (__props.help)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11, vue.toDisplayString(__props.help), 1))
                    : vue.createCommentVNode("v-if", true),
                (__props.modelValue.$errors.length > 0)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, vue.toDisplayString(_ctx.$t(`error_form_${__props.modelValue.$errors[0].$validator}`)), 1))
                    : vue.createCommentVNode("v-if", true)
            ]));
        };
    }
});

script.__file = "src/components/ui/FyInput/FyInput.vue";

var uiComponents = [
    script$a,
    script$9,
    script$8,
    script$7,
    script$6,
    script$5,
    script$4,
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
const tailwindColors = {
    "fv-primary": {
        "50": "#f5f3ff",
        "100": "#ede9fe",
        "200": "#ddd6fe",
        "300": "#c4b5fd",
        "400": "#a78bfa",
        "500": "#8b5cf6",
        "600": "#7c3aed",
        "700": "#6d28d9",
        "800": "#5b21b6",
        "900": "#4c1d95"
    },
    "fv-neutral": {
        "50": "#f8fafc",
        "100": "#f1f5f9",
        "200": "#e2e8f0",
        "300": "#cbd5e1",
        "400": "#94a3b8",
        "500": "#64748b",
        "600": "#475569",
        "700": "#334155",
        "800": "#1e293b",
        "900": "#0f172a"
    }
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

const cssDynamic = async () => {
    if (!process.env.live)
        await Promise.resolve().then(function () { return fyvue; });
    return null;
};
cssDynamic();
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

var fyvue = /*#__PURE__*/Object.freeze({
  __proto__: null
});

exports.createFyvue = createFyvue;
exports.i18nextPromise = i18nextPromise;
exports.tailwindColors = tailwindColors;
exports.useEventBus = useEventBus;
exports.useTranslation = useTranslation;
//# sourceMappingURL=fyvue.js.map

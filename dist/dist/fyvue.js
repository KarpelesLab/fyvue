'use strict';

var head$1 = require('@vueuse/head');
var pinia$1 = require('pinia');
var vue = require('vue');
var vue$1 = require('@headlessui/vue');
var klbfw = require('@karpeleslab/klbfw');
var i18next = require('i18next');
var vueRouter = require('vue-router');
var useVuelidate = require('@vuelidate/core');
var validators = require('@vuelidate/validators');
var serverRenderer = require('@vue/server-renderer');

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

function render$4(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render$3(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render$2(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render$1(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z",
      "clip-rule": "evenodd"
    })
  ]))
}

const _hoisted_1$b = { class: "parent" };
var script$b = vue.defineComponent({
    __name: 'FyModal',
    props: {
        id: { type: String, required: true },
        title: { type: String, required: false },
        onOpen: { type: Function, required: false },
        onClose: { type: Function, required: false },
        closeIcon: { type: Object, required: false, default: () => vue.h(render) }
    },
    setup(__props) {
        const props = __props;
        const eventBus = useEventBus();
        const isOpen = vue.ref(false);
        const setModal = (value) => {
            if (value === true)
                if (props.onOpen)
                    props.onOpen();
                else {
                    if (props.onClose)
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
                            vue.createElementVNode("div", _hoisted_1$b, [
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

script$b.__file = "src/components/ui/FyModal/FyModal.vue";

const _hoisted_1$a = { class: "fy-circle-percent" };
const _hoisted_2$a = {
    viewBox: "0 0 36 36",
    class: "circular-chart"
};
const _hoisted_3$8 = vue.createElementVNode("path", {
    class: "circle-bg",
    d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
}, null, -1);
const _hoisted_4$6 = ["stroke-dasharray", "stroke"];
const _hoisted_5$6 = ["x", "y"];
var script$a = vue.defineComponent({
    __name: 'FyCirclePercent',
    props: {
        percent: { type: Number, required: true, default: 100 },
        textXY: { type: Array, required: false, default: () => [18, 20.85] },
        color: { type: String, required: false, default: "blue" }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$a, [
                (vue.openBlock(), vue.createElementBlock("svg", _hoisted_2$a, [
                    _hoisted_3$8,
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
                    }, vue.toDisplayString(__props.percent) + "%", 9, _hoisted_5$6)
                ]))
            ]));
        };
    }
});

script$a.__file = "src/components/ui/FyCirclePercent/FyCirclePercent.vue";

const _hoisted_1$9 = { class: "parent" };
const _hoisted_2$9 = {
    class: "modal-container",
    style: { "width": "350px !important" }
};
const _hoisted_3$7 = { class: "modal-content" };
const _hoisted_4$5 = {
    key: 0,
    class: "confirm-modal-desc default-p"
};
const _hoisted_5$5 = vue.createElementVNode("br", null, null, -1);
const _hoisted_6$4 = { class: "btn-box" };
var script$9 = vue.defineComponent({
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
                        vue.createElementVNode("div", _hoisted_1$9, [
                            vue.createVNode(vue.unref(vue$1.DialogOverlay)),
                            vue.createElementVNode("div", _hoisted_2$9, [
                                vue.createElementVNode("div", null, [
                                    vue.createVNode(vue.unref(vue$1.DialogTitle), { class: "title" }, {
                                        default: vue.withCtx(() => [
                                            vue.createTextVNode(vue.toDisplayString(title.value), 1)
                                        ]),
                                        _: 1
                                    }),
                                    vue.createElementVNode("div", _hoisted_3$7, [
                                        (desc.value)
                                            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$5, vue.toDisplayString(desc.value), 1))
                                            : vue.createCommentVNode("v-if", true),
                                        _hoisted_5$5,
                                        vue.createElementVNode("div", _hoisted_6$4, [
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

script$9.__file = "src/components/ui/FyConfirm/FyConfirm.vue";

const _hoisted_1$8 = {
    class: "fy-breadcrumb",
    "aria-label": "Breadcrumb"
};
const _hoisted_2$8 = { class: "bc-innactive" };
var script$8 = vue.defineComponent({
    __name: 'FyBreadcrumb',
    props: {
        nav: { type: Array, required: true, default: () => [] },
        maxLength: { type: Number, required: false, default: 32 }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            const _component_router_link = vue.resolveComponent("router-link");
            return (vue.openBlock(), vue.createElementBlock("nav", _hoisted_1$8, [
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
                                    vue.createVNode(vue.unref(render$4), { class: "icon bc-innactive" })
                                ]))
                                : (vue.openBlock(), vue.createElementBlock("li", {
                                    key: `e-${item.to}`,
                                    class: "bc-current"
                                }, [
                                    vue.createElementVNode("span", _hoisted_2$8, vue.toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1)
                                ]))
                        ], 64));
                    }), 256))
                ])
            ]));
        };
    }
});

script$8.__file = "src/components/ui/FyBreadcrumb/FyBreadcrumb.vue";

const _hoisted_1$7 = { class: "fy-step-bar" };
const _hoisted_2$7 = { class: "bar-bg" };
const _hoisted_3$6 = { class: "label" };
var script$7 = vue.defineComponent({
    __name: 'FySteps',
    props: {
        steps: { type: Array, required: false, default: () => [] },
        currentStep: { type: Number, required: false, default: 1 }
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
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$7, [
                vue.createElementVNode("div", _hoisted_2$7, [
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
                            vue.createElementVNode("span", _hoisted_3$6, vue.toDisplayString(_ctx.$t(step.name)), 1),
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

script$7.__file = "src/components/ui/FySteps/FySteps.vue";

const _hoisted_1$6 = {
    key: 0,
    class: "border-collapse w-full md:mx-0 fy-datatable"
};
const _hoisted_2$6 = { key: 0 };
const _hoisted_3$5 = { class: "div" };
const _hoisted_4$4 = { class: "div-cell" };
const _hoisted_5$4 = { key: 0 };
const _hoisted_6$3 = { key: 1 };
var script$6 = vue.defineComponent({
    __name: 'FyDatatable',
    props: {
        showHeaders: { type: Boolean, required: false, default: true },
        headers: { type: null, required: true },
        data: { type: Array, required: false, default: () => [] }
    },
    setup(__props) {
        const bgColor = (i) => {
            return i % 2 == 0 ? 'bg-color-1' : 'bg-color-2';
        };
        return (_ctx, _cache) => {
            return (__props.data && __props.data.length > 0)
                ? (vue.openBlock(), vue.createElementBlock("table", _hoisted_1$6, [
                    (__props.showHeaders)
                        ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_2$6, [
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
                        (__props.data)
                            ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(__props.data, (item, index) => {
                                return (vue.openBlock(), vue.createElementBlock("tr", {
                                    key: index,
                                    class: vue.normalizeClass(`tr ${bgColor(index)} `)
                                }, [
                                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.headers, (title, property) => {
                                        return (vue.openBlock(), vue.createElementBlock("td", {
                                            key: title,
                                            class: "td"
                                        }, [
                                            vue.createElementVNode("div", _hoisted_3$5, vue.toDisplayString(title), 1),
                                            vue.createElementVNode("div", _hoisted_4$4, [
                                                vue.renderSlot(_ctx.$slots, `${property}_item`, {
                                                    data: { prop: item[property], item: item, idx: index }
                                                }, () => [
                                                    (item[property])
                                                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$4, vue.toDisplayString(item[property].toString()), 1))
                                                        : (vue.openBlock(), vue.createElementBlock("span", _hoisted_6$3, "n/a"))
                                                ])
                                            ])
                                        ]));
                                    }), 128))
                                ], 2));
                            }), 128))
                            : vue.createCommentVNode("v-if", true)
                    ])
                ]))
                : vue.createCommentVNode("v-if", true);
        };
    }
});

script$6.__file = "src/components/ui/FyDatatable/FyDatatable.vue";

const _hoisted_1$5 = {
    key: 0,
    class: "fy-table"
};
const _hoisted_2$5 = { class: "table-container" };
const _hoisted_3$4 = { key: 0 };
const _hoisted_4$3 = { key: 0 };
const _hoisted_5$3 = { key: 1 };
var script$5 = vue.defineComponent({
    __name: 'FyTable',
    props: {
        showHeaders: { type: Boolean, required: false, default: true },
        headers: { type: null, required: true },
        data: { type: Array, required: false, default: () => [] }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (__props.data && __props.data.length)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
                    vue.createElementVNode("div", _hoisted_2$5, [
                        vue.createElementVNode("table", null, [
                            (__props.showHeaders)
                                ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_3$4, [
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
                                                        : (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$3, "n/a"))
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

script$5.__file = "src/components/ui/FyTable/FyTable.vue";

const _hoisted_1$4 = vue.createElementVNode("path", {
    d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
    fill: "currentColor"
}, null, -1);
const _hoisted_2$4 = vue.createElementVNode("path", {
    d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
    fill: "currentFill"
}, null, -1);
const _hoisted_3$3 = [
    _hoisted_1$4,
    _hoisted_2$4
];
var script$4 = vue.defineComponent({
    __name: 'DefaultLoader',
    props: {
        size: { type: String, required: false, default: "16" },
        showLoadingText: { type: Boolean, required: true, default: true }
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
                }, _hoisted_3$3, 4)),
                vue.createElementVNode("span", {
                    class: vue.normalizeClass(!__props.showLoadingText ? 'is-sr' : 'loader-text')
                }, vue.toDisplayString(_ctx.$t('global_loading_text')), 3)
            ], 64));
        };
    }
});

script$4.__file = "src/components/ui/FyLoader/DefaultLoader.vue";

const _hoisted_1$3 = { key: 0 };
const _hoisted_2$3 = { class: "fy-loader" };
var script$3 = vue.defineComponent({
    __name: 'FyLoader',
    props: {
        id: { type: String, required: false },
        loader: { type: Object, required: false, default: () => script$4 },
        showLoadingText: { type: Boolean, required: false, default: true },
        size: { type: String, required: false, default: "16" },
        force: { type: Boolean, required: false, default: false }
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
            return (loading.value || __props.force)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
                    vue.createElementVNode("div", _hoisted_2$3, [
                        vue.createElementVNode("div", {
                            class: "loader-container",
                            role: "status",
                            style: vue.normalizeStyle(`width:${__props.size}rem; height:${__props.size}rem;`)
                        }, [
                            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.loader), {
                                size: __props.size,
                                showLoadingText: __props.showLoadingText
                            }, null, 8, ["size", "showLoadingText"]))
                        ], 4)
                    ])
                ]))
                : vue.createCommentVNode("v-if", true);
        };
    }
});

script$3.__file = "src/components/ui/FyLoader/FyLoader.vue";

const _hoisted_1$2 = { class: "input-group" };
const _hoisted_2$2 = ["for"];
const _hoisted_3$2 = ["aria-label", "id", "true-value", "false-value"];
const _hoisted_4$2 = ["href"];
const _hoisted_5$2 = {
    key: 2,
    class: "is-req"
};
const _hoisted_6$2 = {
    key: 1,
    class: "input-box"
};
const _hoisted_7$2 = ["aria-label", "placeholder", "autocomplete", "id", "type"];
const _hoisted_8$2 = ["aria-label", "placeholder", "autocomplete", "id"];
const _hoisted_9$2 = ["aria-label", "id"];
const _hoisted_10$2 = ["value"];
const _hoisted_11$1 = {
    key: 2,
    class: "help-text"
};
const _hoisted_12 = {
    key: 3,
    class: "form-error-label"
};
var script$2 = vue.defineComponent({
    __name: 'FyInput',
    props: {
        id: { type: String, required: true },
        showLabel: { type: Boolean, required: false, default: true },
        label: { type: String, required: false },
        type: { type: String, required: true, default: 'text' },
        placeholder: { type: String, required: false },
        autocomplete: { type: String, required: false },
        checkboxTrueValue: { type: [String, Boolean], required: false, default: true },
        checkboxFalseValue: { type: [String, Boolean], required: false, default: false },
        req: { type: Boolean, required: false, default: false },
        linkIcon: { type: String, required: false },
        modelValue: { type: null, required: false },
        checkboxValue: { type: null, required: false },
        options: { type: Array, required: false, default: () => [] },
        help: { type: String, required: false },
        error: { type: String, required: false },
        errorVuelidate: { type: Array, required: false }
    },
    emits: ['update:modelValue', 'update:checkboxValue'],
    setup(__props, { expose, emit }) {
        const props = __props;
        const inputRef = vue.ref();
        const errorProps = vue.toRef(props, 'error');
        const errorVuelidateProps = vue.toRef(props, 'errorVuelidate');
        const checkErrors = vue.computed(() => {
            if (errorProps.value)
                return errorProps.value;
            if (errorVuelidateProps.value && errorVuelidateProps.value.length > 0) {
                console.log(errorVuelidateProps.value);
                return errorVuelidateProps.value[0].$validator.toString();
            }
            return null;
        });
        const focus = () => {
            if (inputRef.value)
                inputRef.value.focus();
        };
        const getInputRef = () => {
            if (inputRef.value)
                return inputRef.value;
        };
        const model = vue.computed({
            get: () => props.modelValue,
            set: items => {
                emit('update:modelValue', items);
            }
        });
        const modelCheckbox = vue.computed({
            get: () => props.checkboxValue,
            set: items => {
                emit('update:checkboxValue', items);
            }
        });
        expose({ focus, getInputRef });
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
                (__props.showLabel && __props.id && __props.label)
                    ? (vue.openBlock(), vue.createElementBlock("label", {
                        key: 0,
                        class: "label-basic",
                        for: __props.id
                    }, [
                        (__props.type == 'checkbox')
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                                key: 0,
                                "aria-label": __props.label,
                                ref_key: "inputRef",
                                ref: inputRef,
                                type: "checkbox",
                                class: vue.normalizeClass(["form-checkbox", { 'error-form': vue.unref(checkErrors) }]),
                                id: __props.id,
                                "true-value": __props.checkboxTrueValue,
                                "false-value": __props.checkboxFalseValue,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (vue.isRef(modelCheckbox) ? (modelCheckbox).value = $event : null))
                            }, null, 10, _hoisted_3$2)), [
                                [vue.vModelCheckbox, vue.unref(modelCheckbox)]
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
                                vue.createVNode(vue.unref(render$1))
                            ], 8, _hoisted_4$2))
                            : vue.createCommentVNode("v-if", true),
                        (__props.req)
                            ? (vue.openBlock(), vue.createElementBlock("sup", _hoisted_5$2, "*"))
                            : vue.createCommentVNode("v-if", true)
                    ], 8, _hoisted_2$2))
                    : vue.createCommentVNode("v-if", true),
                (!['checkbox', 'radiobox'].includes(__props.type))
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$2, [
                        vue.renderSlot(_ctx.$slots, "before"),
                        (['text', 'password', 'email', 'search'].includes(__props.type))
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                                key: 0,
                                ref_key: "inputRef",
                                ref: inputRef,
                                "aria-label": __props.label,
                                class: vue.normalizeClass(["input-basic", { 'error-form': __props.error }]),
                                placeholder: __props.placeholder,
                                autocomplete: __props.autocomplete,
                                id: __props.id,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => (vue.isRef(model) ? (model).value = $event : null)),
                                type: __props.type
                            }, null, 10, _hoisted_7$2)), [
                                [vue.vModelDynamic, vue.unref(model)]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        (__props.type == 'textarea')
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
                                key: 1,
                                "aria-label": __props.label,
                                ref_key: "inputRef",
                                ref: inputRef,
                                class: vue.normalizeClass(["input-basic is-textarea", { 'error-form': vue.unref(checkErrors) }]),
                                placeholder: __props.placeholder,
                                autocomplete: __props.autocomplete,
                                id: __props.id,
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => (vue.isRef(model) ? (model).value = $event : null))
                            }, null, 10, _hoisted_8$2)), [
                                [vue.vModelText, vue.unref(model)]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        (__props.type == 'select')
                            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("select", {
                                key: 2,
                                "aria-label": __props.label,
                                ref_key: "inputRef",
                                ref: inputRef,
                                id: __props.id,
                                class: "input-basic",
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => (vue.isRef(model) ? (model).value = $event : null))
                            }, [
                                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.options, (opt) => {
                                    return (vue.openBlock(), vue.createElementBlock("option", {
                                        value: opt[0],
                                        key: opt[0].toString()
                                    }, vue.toDisplayString(opt[1]), 9, _hoisted_10$2));
                                }), 128))
                            ], 8, _hoisted_9$2)), [
                                [vue.vModelSelect, vue.unref(model)]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        vue.renderSlot(_ctx.$slots, "after")
                    ]))
                    : vue.createCommentVNode("v-if", true),
                (__props.help)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$1, vue.toDisplayString(__props.help), 1))
                    : vue.createCommentVNode("v-if", true),
                (vue.unref(checkErrors))
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, vue.toDisplayString(vue.unref(checkErrors)), 1))
                    : vue.createCommentVNode("v-if", true)
            ]));
        };
    }
});

script$2.__file = "src/components/ui/FyInput/FyInput.vue";

const _hoisted_1$1 = {
    key: 0,
    class: "paging"
};
const _hoisted_2$1 = { "aria-label": "Pagination" };
const _hoisted_3$1 = { class: "is-sr" };
const _hoisted_4$1 = {
    key: 2,
    class: "dots"
};
const _hoisted_5$1 = ["onClick"];
const _hoisted_6$1 = {
    href: "#",
    "aria-current": "page",
    class: "active"
};
const _hoisted_7$1 = ["onClick"];
const _hoisted_8$1 = {
    key: 3,
    class: "dots"
};
const _hoisted_9$1 = { class: "is-sr" };
const _hoisted_10$1 = { class: "paging-text" };
var script$1 = vue.defineComponent({
    __name: 'FyPaging',
    props: {
        items: { type: null, required: true },
        id: { type: String, required: true }
    },
    setup(__props) {
        const props = __props;
        const eventBus = useEventBus();
        const route = vueRouter.useRoute();
        const router = vueRouter.useRouter();
        const getRoutePage = () => {
            if (route && route.query) {
                return route.query.page?.toString() || '1';
            }
            return '1';
        };
        const isNewPage = (page) => {
            return (page >= 1) && page <= props.items.page_max && page != props.items.page_no;
        };
        const next = () => {
            const page = props.items.page_no + 1;
            if (!isNewPage(page))
                return;
            router.push({
                path: route.path,
                query: { page: page }
            }).then(() => {
                eventBus.emit(`${props.id}GoToPage`, page);
            });
        };
        const prev = () => {
            const page = props.items.page_no - 1;
            if (!isNewPage(page))
                return;
            router.push({
                path: route.path,
                query: { page: page }
            }).then(() => {
                eventBus.emit(`${props.id}GoToPage`, page);
            });
        };
        const page = (page) => {
            if (!isNewPage(page))
                return;
            router.push({
                path: route.path,
                query: { page: page }
            }).then(() => {
                eventBus.emit(`${props.id}GoToPage`, page);
            });
        };
        vue.onMounted(() => {
            const routePage = parseInt(getRoutePage());
            if (!isNaN(routePage) && props.items) {
                eventBus.emit(`${props.id}GoToPage`, routePage);
            }
        });
        return (_ctx, _cache) => {
            return (__props.items && __props.items.page_max > 1 && __props.items.page_no)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
                    vue.createElementVNode("div", null, [
                        vue.createElementVNode("nav", _hoisted_2$1, [
                            (__props.items.page_no >= 2)
                                ? (vue.openBlock(), vue.createElementBlock("a", {
                                    key: 0,
                                    href: "javascript:void(0);",
                                    onClick: _cache[0] || (_cache[0] = ($event) => (prev())),
                                    class: "prev-next"
                                }, [
                                    vue.createElementVNode("span", _hoisted_3$1, vue.toDisplayString(_ctx.$t('previous_paging')), 1),
                                    vue.createVNode(vue.unref(render$3), { class: "fv-icon-base" })
                                ]))
                                : vue.createCommentVNode("v-if", true),
                            (__props.items.page_no - 2 > 1)
                                ? (vue.openBlock(), vue.createElementBlock("a", {
                                    key: 1,
                                    class: "innactive",
                                    href: "javascript:void(0);",
                                    onClick: _cache[1] || (_cache[1] = ($event) => (page(1)))
                                }, " 1 "))
                                : vue.createCommentVNode("v-if", true),
                            (__props.items.page_no - 2 > 2)
                                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$1, " ... "))
                                : vue.createCommentVNode("v-if", true),
                            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(2, (i) => {
                                return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                                    (__props.items.page_no - (3 - i) >= 1)
                                        ? (vue.openBlock(), vue.createElementBlock("a", {
                                            class: "innactive",
                                            href: "javascript:void(0);",
                                            key: `${i}-sm`,
                                            onClick: ($event) => (page(__props.items.page_no - (3 - i)))
                                        }, vue.toDisplayString(__props.items.page_no - (3 - i)), 9, _hoisted_5$1))
                                        : vue.createCommentVNode("v-if", true)
                                ], 64));
                            }), 64)),
                            vue.createElementVNode("a", _hoisted_6$1, vue.toDisplayString(__props.items.page_no), 1),
                            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(2, (i) => {
                                return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                                    (__props.items.page_no + i <= __props.items.page_max)
                                        ? (vue.openBlock(), vue.createElementBlock("a", {
                                            class: "innactive",
                                            href: "javascript:void(0);",
                                            key: `${i}-md`,
                                            onClick: ($event) => (page(__props.items.page_no + i))
                                        }, vue.toDisplayString(__props.items.page_no + i), 9, _hoisted_7$1))
                                        : vue.createCommentVNode("v-if", true)
                                ], 64));
                            }), 64)),
                            (__props.items.page_no + 2 < __props.items.page_max - 1)
                                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_8$1, " ... "))
                                : vue.createCommentVNode("v-if", true),
                            (__props.items.page_no + 2 < __props.items.page_max)
                                ? (vue.openBlock(), vue.createElementBlock("a", {
                                    key: 4,
                                    class: "innactive",
                                    href: "javascript:void(0);",
                                    onClick: _cache[2] || (_cache[2] = ($event) => (page(__props.items.page_max)))
                                }, vue.toDisplayString(__props.items.page_max), 1))
                                : vue.createCommentVNode("v-if", true),
                            (__props.items.page_no < __props.items.page_max - 1)
                                ? (vue.openBlock(), vue.createElementBlock("a", {
                                    key: 5,
                                    href: "javascript:void(0);",
                                    onClick: _cache[3] || (_cache[3] = ($event) => (next())),
                                    class: "prev-next"
                                }, [
                                    vue.createElementVNode("span", _hoisted_9$1, vue.toDisplayString(_ctx.$t('next_paging')), 1),
                                    vue.createVNode(vue.unref(render$2), { class: "fv-icon-base" })
                                ]))
                                : vue.createCommentVNode("v-if", true)
                        ]),
                        vue.createElementVNode("p", _hoisted_10$1, vue.toDisplayString(_ctx.$t("global_paging", {
                            start: __props.items.results_per_page * (__props.items.page_no - 1),
                            end: __props.items.results_per_page * __props.items.page_no,
                            total: __props.items.count >= 10000 ? _ctx.$t('paging_a_lot_of') : __props.items.count,
                        })), 1)
                    ])
                ]))
                : vue.createCommentVNode("v-if", true);
        };
    }
});

script$1.__file = "src/components/ui/FyPaging/FyPaging.vue";

var uiComponents = {
    FyModal: script$b,
    FyCirclePercent: script$a,
    FyConfirm: script$9,
    FyBreadcrumb: script$8,
    FySteps: script$7,
    FyDatatable: script$6,
    FyTable: script$5,
    FyLoader: script$3,
    FyInput: script$2,
    FyPaging: script$1
};

const useFVStore = pinia$1.defineStore({
    id: "fVStore",
    state: () => ({
        user: null,
    }),
    getters: {
        isAuth: (state) => {
            return !(state.user === null);
        }
    },
    actions: {
        async refreshUser() {
            const apiData = await klbfw.rest("User:get", "GET")
                .catch((err) => { });
            if (apiData.result == 'success' && apiData.data != null) {
                this.user = apiData.data;
            }
            else {
                this.user = null;
            }
        },
        async logout() {
            const apiData = await klbfw.rest("User:logout", "Post")
                .catch((err) => { });
            if (apiData.result == 'success') {
                this.setUser(null);
            }
        },
        setUser(user) {
            this.user = user;
        }
    },
});

const _hoisted_1 = { class: "w-full" };
const _hoisted_2 = {
    key: 0,
    class: "message"
};
const _hoisted_3 = {
    key: 0,
    class: "oauth-container"
};
const _hoisted_4 = ["onClick"];
const _hoisted_5 = ["alt", "src"];
const _hoisted_6 = {
    key: 1,
    class: "response-error"
};
const _hoisted_7 = {
    key: 2,
    class: "reset-pwd"
};
const _hoisted_8 = { class: "btn primary btn-defaults" };
const _hoisted_9 = {
    key: 0,
    class: "response-error"
};
const _hoisted_10 = vue.createElementVNode("br", { style: { "clear": "both" } }, null, -1);
const _hoisted_11 = { key: 1 };
var script = vue.defineComponent({
    __name: 'KlbLogin',
    props: {
        returnDefault: { type: String, required: false, default: "/" },
        forceAction: { type: String, required: false }
    },
    setup(__props) {
        const props = __props;
        const state = vue.reactive({
            userEmail: "",
        });
        const rules = {
            userEmail: { required: validators.required },
        };
        const store = useFVStore();
        const v$ = useVuelidate(rules, state);
        const route = vueRouter.useRoute();
        const router = vueRouter.useRouter();
        const eventBus = useEventBus();
        const returnTo = vue.ref(props.returnDefault);
        const responseMessage = vue.ref(null);
        const responseError = vue.ref();
        const responseReq = vue.ref([]);
        const responseFields = vue.ref([]);
        const response = vue.ref();
        const hasOauth = vue.ref(false);
        const fieldsError = vue.ref({});
        const pwdRecoverMailSent = vue.ref(false);
        const pwdRecoverError = vue.ref();
        const inputs = vue.ref([]);
        const formData = vue.ref({
            return_to: props.returnDefault,
            session: null,
            action: props.forceAction ? props.forceAction : undefined,
        });
        const completed = vue.ref(false);
        const forgotPassword = async () => {
            if (await v$.value.$validate()) {
                let data = await klbfw.rest("User:forgot_password", "POST", {
                    login: state.userEmail,
                }).catch((err) => {
                    pwdRecoverError.value = err;
                });
                if (data.result == "success") {
                    pwdRecoverMailSent.value = true;
                }
                else {
                    console.log(data);
                }
            }
        };
        const userFlow = async (params = { initial: false }) => {
            eventBus.emit("klblogin-loading", true);
            fieldsError.value = {};
            hasOauth.value = false;
            if (params.initial === false) {
                let hasError = false;
                responseReq.value.forEach((field) => {
                    if (!formData.value[field] || formData.value[field] == "") {
                        fieldsError.value[field] = "error_form_value_is_required";
                        hasError = true;
                    }
                });
                if (hasError) {
                    eventBus.emit("klblogin-loading", false);
                    return;
                }
            }
            if (params.oauth) {
                formData.value.oauth2 = params.oauth;
            }
            if (route.query.return_to && typeof route.query.return_to == 'string') {
                returnTo.value = route.query.return_to
                    ? route.query.return_to : props.returnDefault;
            }
            if (!formData.value.session) {
                formData.value.session = route.query.session
                    ? route.query.session
                    : undefined;
            }
            formData.value.return_to = returnTo.value;
            response.value = await klbfw.rest("User:flow", "POST", formData.value).catch((err) => {
                responseError.value = err;
                if (responseError.value.param) {
                    fieldsError.value[responseError.value.param] =
                        responseError.value.token;
                }
                eventBus.emit("klblogin-loading", false);
                return;
            });
            if (response.value?.result == "success") {
                if (response.value.data.url) {
                    window.location.href = response.value.data.url;
                    return;
                }
                if (response.value.data.complete == true && response.value.data.user) {
                    store.setUser(response.value.data.user);
                    let routeExists = router.resolve(returnTo.value);
                    if (routeExists.matched.length != 0)
                        router.push(returnTo.value);
                    else
                        window.location.href = returnTo.value;
                    return;
                }
                formData.value = {
                    session: response.value.data.session,
                };
                inputs.value = [];
                if (response.value.data.email)
                    state.userEmail = response.value.data.email;
                responseFields.value = response.value.data.fields;
                if (response.value.data.message)
                    responseMessage.value = response.value.data.message;
                responseReq.value = response.value.data.req;
                responseFields.value.forEach((field) => {
                    if (field.type == "oauth2") {
                        hasOauth.value = true;
                    }
                });
                setTimeout(() => {
                    if (inputs.value.length > 0 && inputs.value[inputs.value.length - 1])
                        inputs.value[inputs.value.length - 1].focus();
                }, 300);
            }
            else {
                console.log(response);
            }
            eventBus.emit("klblogin-loading", false);
        };
        vue.onMounted(async () => {
            await userFlow({ initial: true });
        });
        return (_ctx, _cache) => {
            const _component_FyLoader = vue.resolveComponent("FyLoader");
            const _component_FyModal = vue.resolveComponent("FyModal");
            return (vue.openBlock(), vue.createElementBlock("div", null, [
                (!completed.value)
                    ? (vue.openBlock(), vue.createElementBlock("form", {
                        key: 0,
                        onSubmit: _cache[1] || (_cache[1] = vue.withModifiers(($event) => (userFlow()), ["prevent"])),
                        class: "klb-login"
                    }, [
                        vue.createVNode(_component_FyLoader, { id: "klblogin" }),
                        vue.createElementVNode("div", _hoisted_1, [
                            (responseMessage.value)
                                ? (vue.openBlock(), vue.createElementBlock("h2", _hoisted_2, vue.toDisplayString(responseMessage.value), 1))
                                : vue.createCommentVNode("v-if", true),
                            (responseFields.value.length > 0)
                                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(responseFields.value, (field) => {
                                        return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                                            key: field.label
                                        }, [
                                            (field.type == 'label')
                                                ? (vue.openBlock(), vue.createElementBlock("h3", {
                                                    key: 0,
                                                    class: vue.normalizeClass(["label", field.style == 'error' ? 'response-error' : ''])
                                                }, vue.toDisplayString(field.label), 3))
                                                : vue.createCommentVNode("v-if", true),
                                            (field.cat == 'input')
                                                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                                                    (field.type == 'text' ||
                                                        field.type == 'password' ||
                                                        field.type == 'email')
                                                        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                                            (field.name)
                                                                ? (vue.openBlock(), vue.createBlock(script$2, {
                                                                    key: 0,
                                                                    id: field.name,
                                                                    label: field.label,
                                                                    placeholder: field.name == 'name' ? 'John Doe' : field.label,
                                                                    error: fieldsError.value[field.name],
                                                                    type: field.type,
                                                                    ref_for: true,
                                                                    ref_key: "inputs",
                                                                    ref: inputs,
                                                                    modelValue: formData.value[field.name],
                                                                    "onUpdate:modelValue": ($event) => ((formData.value[field.name]) = $event),
                                                                    req: responseReq.value.includes(field.name)
                                                                }, null, 8, ["id", "label", "placeholder", "error", "type", "modelValue", "onUpdate:modelValue", "req"]))
                                                                : vue.createCommentVNode("v-if", true)
                                                        ], 64))
                                                        : vue.createCommentVNode("v-if", true)
                                                ], 64))
                                                : vue.createCommentVNode("v-if", true),
                                            (field.type == 'checkbox')
                                                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                                                    (field.name)
                                                        ? (vue.openBlock(), vue.createBlock(script$2, {
                                                            key: 0,
                                                            id: field.name,
                                                            label: field.label,
                                                            error: fieldsError.value[field.name],
                                                            type: field.type,
                                                            "checkbox-value": formData.value[field.name],
                                                            "onUpdate:checkbox-value": ($event) => ((formData.value[field.name]) = $event),
                                                            req: responseReq.value.includes(field.name),
                                                            "link-icon": field.link
                                                        }, null, 8, ["id", "label", "error", "type", "checkbox-value", "onUpdate:checkbox-value", "req", "link-icon"]))
                                                        : vue.createCommentVNode("v-if", true)
                                                ], 64))
                                                : vue.createCommentVNode("v-if", true)
                                        ], 64));
                                    }), 128)),
                                    (hasOauth.value)
                                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
                                            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(responseFields.value, (field) => {
                                                return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                                                    key: field.id
                                                }, [
                                                    (field.type && field.type == 'oauth2' && field.button)
                                                        ? (vue.openBlock(), vue.createElementBlock("a", {
                                                            key: 0,
                                                            onClick: () => {
                                                                userFlow({ initial: true, oauth: field.id });
                                                            },
                                                            href: "javascript:void(0);"
                                                        }, [
                                                            (vue.openBlock(), vue.createElementBlock("img", {
                                                                key: `${field.label}oauth`,
                                                                class: "oauth-button",
                                                                alt: field.info.Name,
                                                                src: field.button.logo,
                                                                style: vue.normalizeStyle(`background: ${field.button['background-color']}`)
                                                            }, null, 12, _hoisted_5))
                                                        ], 8, _hoisted_4))
                                                        : vue.createCommentVNode("v-if", true)
                                                ], 64));
                                            }), 128))
                                        ]))
                                        : vue.createCommentVNode("v-if", true),
                                    (responseError.value)
                                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, vue.toDisplayString(_ctx.$t(responseError.value.token)), 1))
                                        : vue.createCommentVNode("v-if", true),
                                    (responseReq.value.includes('password') && 0)
                                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
                                            vue.createElementVNode("a", {
                                                href: "javascript:void(0)",
                                                onClick: _cache[0] || (_cache[0] =
                                                    () => {
                                                        vue.unref(eventBus).emit('ResetPasswordModal', true);
                                                        pwdRecoverMailSent.value = false;
                                                    })
                                            }, vue.toDisplayString(_ctx.$t("recover_pwd_link")), 1)
                                        ]))
                                        : vue.createCommentVNode("v-if", true),
                                    vue.createElementVNode("button", _hoisted_8, vue.toDisplayString(_ctx.$t("cta_login_next")), 1)
                                ], 64))
                                : vue.createCommentVNode("v-if", true)
                        ])
                    ], 32))
                    : vue.createCommentVNode("v-if", true),
                vue.createVNode(_component_FyModal, {
                    id: "ResetPassword",
                    title: `${_ctx.$t('recover_pwd_title')}`
                }, {
                    default: vue.withCtx(() => [
                        (!pwdRecoverMailSent.value)
                            ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                vue.createVNode(script$2, {
                                    id: "emailRecover",
                                    req: true,
                                    showLabel: true,
                                    placeholder: _ctx.$t('recover_pwd_email_placeholder'),
                                    modelValue: state.userEmail,
                                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => ((state.userEmail) = $event)),
                                    errorVuelidate: vue.unref(v$).userEmail.$errors,
                                    type: "email",
                                    label: _ctx.$t('recover_pwd_email_label')
                                }, null, 8, ["placeholder", "modelValue", "errorVuelidate", "label"]),
                                (pwdRecoverError.value)
                                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, vue.toDisplayString(_ctx.$t(pwdRecoverError.value.token)), 1))
                                    : vue.createCommentVNode("v-if", true),
                                vue.createElementVNode("a", {
                                    href: "javascript:void(0)",
                                    onClick: _cache[3] || (_cache[3] = ($event) => (forgotPassword())),
                                    class: "mt-2 float-right btn px-5 py-2 primary"
                                }, vue.toDisplayString(_ctx.$t("recover_pwd_cta")), 1),
                                _hoisted_10
                            ], 64))
                            : (vue.openBlock(), vue.createElementBlock("div", _hoisted_11, vue.toDisplayString(_ctx.$t("pwd_recover_confirm")), 1))
                    ]),
                    _: 1
                }, 8, ["title"])
            ]));
        };
    }
});

script.__file = "src/components/klb/KlbLogin/KlbLogin.vue";

var klbComponents = {
    KlbLogin: script,
};

const cropText = (str, ml = 100, end = '...') => {
    if (str.length > ml) {
        return `${str.slice(0, ml)}${end}`;
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
const jpZipcode = (zip) => {
    let _zip = zip.toString();
    if (_zip.length != 7)
        return "";
    return "〒" + _zip.slice(0, 3) + '-' + _zip.slice(3, _zip.length);
};

var UID_LENGTH          = 16;
var UID                 = generateUID();
var PLACE_HOLDER_REGEXP = new RegExp('(\\\\)?"@__(F|R|D|M|S|A|U|I|B|L)-' + UID + '-(\\d+)__@"', 'g');
var IS_NATIVE_CODE_REGEXP = /\{\s*\[native code\]\s*\}/g;
var IS_PURE_FUNCTION = /function.*?\(/;
var IS_ARROW_FUNCTION = /.*?=>.*?/;
var UNSAFE_CHARS_REGEXP   = /[<>\/\u2028\u2029]/g;
var RESERVED_SYMBOLS = ['*', 'async'];
var ESCAPED_CHARS = {
    '<'     : '\\u003C',
    '>'     : '\\u003E',
    '/'     : '\\u002F',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
function escapeUnsafeChars(unsafeChar) {
    return ESCAPED_CHARS[unsafeChar];
}
function generateUID() {
    var bytes = new Uint8Array(UID_LENGTH);
    crypto.getRandomValues(bytes);
    var result = '';
    for(var i=0; i<UID_LENGTH; ++i) {
        result += bytes[i].toString(16);
    }
    return result;
}
function deleteFunctions(obj){
    var functionKeys = [];
    for (var key in obj) {
        if (typeof obj[key] === "function") {
            functionKeys.push(key);
        }
    }
    for (var i = 0; i < functionKeys.length; i++) {
        delete obj[functionKeys[i]];
    }
}
function serialize(obj, options) {
    options || (options = {});
    if (typeof options === 'number' || typeof options === 'string') {
        options = {space: options};
    }
    var functions = [];
    var regexps   = [];
    var dates     = [];
    var maps      = [];
    var sets      = [];
    var arrays    = [];
    var undefs    = [];
    var infinities= [];
    var bigInts = [];
    var urls = [];
    function replacer(key, value) {
        if(options.ignoreFunction){
            deleteFunctions(value);
        }
        if (!value && value !== undefined) {
            return value;
        }
        var origValue = this[key];
        var type = typeof origValue;
        if (type === 'object') {
            if(origValue instanceof RegExp) {
                return '@__R-' + UID + '-' + (regexps.push(origValue) - 1) + '__@';
            }
            if(origValue instanceof Date) {
                return '@__D-' + UID + '-' + (dates.push(origValue) - 1) + '__@';
            }
            if(origValue instanceof Map) {
                return '@__M-' + UID + '-' + (maps.push(origValue) - 1) + '__@';
            }
            if(origValue instanceof Set) {
                return '@__S-' + UID + '-' + (sets.push(origValue) - 1) + '__@';
            }
            if(origValue instanceof Array) {
                var isSparse = origValue.filter(function(){return true}).length !== origValue.length;
                if (isSparse) {
                    return '@__A-' + UID + '-' + (arrays.push(origValue) - 1) + '__@';
                }
            }
            if(origValue instanceof URL) {
                return '@__L-' + UID + '-' + (urls.push(origValue) - 1) + '__@';
            }
        }
        if (type === 'function') {
            return '@__F-' + UID + '-' + (functions.push(origValue) - 1) + '__@';
        }
        if (type === 'undefined') {
            return '@__U-' + UID + '-' + (undefs.push(origValue) - 1) + '__@';
        }
        if (type === 'number' && !isNaN(origValue) && !isFinite(origValue)) {
            return '@__I-' + UID + '-' + (infinities.push(origValue) - 1) + '__@';
        }
        if (type === 'bigint') {
            return '@__B-' + UID + '-' + (bigInts.push(origValue) - 1) + '__@';
        }
        return value;
    }
    function serializeFunc(fn) {
      var serializedFn = fn.toString();
      if (IS_NATIVE_CODE_REGEXP.test(serializedFn)) {
          throw new TypeError('Serializing native function: ' + fn.name);
      }
      if(IS_PURE_FUNCTION.test(serializedFn)) {
          return serializedFn;
      }
      if(IS_ARROW_FUNCTION.test(serializedFn)) {
          return serializedFn;
      }
      var argsStartsAt = serializedFn.indexOf('(');
      var def = serializedFn.substr(0, argsStartsAt)
        .trim()
        .split(' ')
        .filter(function(val) { return val.length > 0 });
      var nonReservedSymbols = def.filter(function(val) {
        return RESERVED_SYMBOLS.indexOf(val) === -1
      });
      if(nonReservedSymbols.length > 0) {
          return (def.indexOf('async') > -1 ? 'async ' : '') + 'function'
            + (def.join('').indexOf('*') > -1 ? '*' : '')
            + serializedFn.substr(argsStartsAt);
      }
      return serializedFn;
    }
    if (options.ignoreFunction && typeof obj === "function") {
        obj = undefined;
    }
    if (obj === undefined) {
        return String(obj);
    }
    var str;
    if (options.isJSON && !options.space) {
        str = JSON.stringify(obj);
    } else {
        str = JSON.stringify(obj, options.isJSON ? null : replacer, options.space);
    }
    if (typeof str !== 'string') {
        return String(str);
    }
    if (options.unsafe !== true) {
        str = str.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars);
    }
    if (functions.length === 0 && regexps.length === 0 && dates.length === 0 && maps.length === 0 && sets.length === 0 && arrays.length === 0 && undefs.length === 0 && infinities.length === 0 && bigInts.length === 0 && urls.length === 0) {
        return str;
    }
    return str.replace(PLACE_HOLDER_REGEXP, function (match, backSlash, type, valueIndex) {
        if (backSlash) {
            return match;
        }
        if (type === 'D') {
            return "new Date(\"" + dates[valueIndex].toISOString() + "\")";
        }
        if (type === 'R') {
            return "new RegExp(" + serialize(regexps[valueIndex].source) + ", \"" + regexps[valueIndex].flags + "\")";
        }
        if (type === 'M') {
            return "new Map(" + serialize(Array.from(maps[valueIndex].entries()), options) + ")";
        }
        if (type === 'S') {
            return "new Set(" + serialize(Array.from(sets[valueIndex].values()), options) + ")";
        }
        if (type === 'A') {
            return "Array.prototype.slice.call(" + serialize(Object.assign({ length: arrays[valueIndex].length }, arrays[valueIndex]), options) + ")";
        }
        if (type === 'U') {
            return 'undefined'
        }
        if (type === 'I') {
            return infinities[valueIndex];
        }
        if (type === 'B') {
            return "BigInt(\"" + bigInts[valueIndex] + "\")";
        }
        if (type === 'L') {
            return "new URL(\"" + urls[valueIndex].toString() + "\")";
        }
        var fn = functions[valueIndex];
        return serializeFunc(fn);
    });
}

const useHistory = pinia$1.defineStore({
    id: "historyStore",
    state: () => ({
        _router: null,
        status: 200,
        redirect: undefined,
    }),
    getters: {
        currentRoute: (state) => state._router.currentRoute,
    },
    actions: {
        setStatus(status) {
            this.status = status;
        },
        _setRouter(_router) {
            this._router = _router;
        },
        push(path, status = 302) {
            this.status = status;
            this._router?.push(path);
            if (status != 302)
                this.redirect = path;
        },
        replace(path, status = 302) {
            this.status = status;
            this._router?.replace(path);
            if (status != 302)
                this.redirect = path;
        },
        go(delta) {
            this._router?.go(delta);
        },
        back() {
            this._router?.go(-1);
        },
        forward() {
            this._router?.go(1);
        },
    },
});
const setupClient = ({ router, pinia, }) => {
    const initialState = klbfw.getInitialState();
    if (initialState && initialState.piniaState)
        pinia.state.value = initialState.piniaState;
    useHistory(pinia)._setRouter(router);
};
async function handleSSR(createApp, cb, options = { 'routerNotFound': 'NotFound', 'router404Route': '/404' }) {
    const { app, router, head, pinia } = await createApp(true);
    const url = `${klbfw.getPath()}`;
    await router.push(url);
    await router.isReady();
    const result = { uuid: klbfw.getUuid(), initial: { isSSRRendered: true, piniaState: serialize(null) } };
    const historyStore = useHistory(pinia);
    useHistory(pinia)._setRouter(router);
    if (url !== historyStore.currentRoute.fullPath) {
        result.redirect = router.currentRoute.value.fullPath;
        result.statusCode = 307;
        return cb(result);
    }
    const html = await serverRenderer.renderToString(app, {});
    const { headTags, htmlAttrs, bodyAttrs, bodyTags } = head$1.renderHeadToString(head);
    result.meta = headTags;
    result.bodyAttributes = bodyAttrs;
    result.htmlAttributes = htmlAttrs;
    result.bodyTags = bodyTags;
    result.app = html;
    console.log(`[SSR Debug] Checking status... ${serialize(pinia.state.value)}`);
    if (historyStore.status != 200) {
        if ([301, 302, 303, 307].includes(historyStore.status)) {
            if (historyStore.redirect) {
                result.statusCode = historyStore.status;
                result.redirect = historyStore.redirect;
            }
        }
        else {
            result.statusCode = historyStore.status;
        }
    }
    useHistory(pinia)._setRouter(null);
    result.initial.piniaState = serialize(pinia.state.value);
    return cb(result);
}

const components = { ...uiComponents, ...klbComponents };
const head = head$1.createHead();
const pinia = pinia$1.createPinia();
const createFyvue = () => {
    const install = (app, options) => {
        app.use(head);
        app.use(pinia);
        app.config.globalProperties.$eventBus = eventBus;
        app.config.globalProperties.$t = i18next.t;
        app.config.globalProperties.$cropText = cropText;
        app.config.globalProperties.$formatBytes = formatBytes;
        app.config.globalProperties.$jpZipcode = jpZipcode;
        let k;
        for (k in uiComponents) {
            app.component(uiComponents[k].__name, uiComponents[k]);
        }
        let klb;
        for (klb in klbComponents) {
            app.component(klbComponents[klb].__name, klbComponents[klb]);
        }
    };
    return {
        install
    };
};
const helpers = {
    i18next: i18next.t, cropText, formatBytes, tailwindColors, jpZipcode,
    head, pinia
};
const helpersSSR = {
    setupClient, handleSSR
};

exports.components = components;
exports.createFyvue = createFyvue;
exports.helpers = helpers;
exports.helpersSSR = helpersSSR;
exports.i18nextPromise = i18nextPromise;
exports.useEventBus = useEventBus;
exports.useFVStore = useFVStore;
exports.useHistory = useHistory;
exports.useTranslation = useTranslation;
//# sourceMappingURL=fyvue.js.map

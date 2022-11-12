'use strict';

var vue = require('vue');
var vue$1 = require('@headlessui/vue');
var klbfw = require('@karpeleslab/klbfw');
var i18next = require('i18next');
var vueRouter = require('vue-router');
var useVuelidate = require('@vuelidate/core');
var validators = require('@vuelidate/validators');
var pinia = require('pinia');
var serverRenderer = require('@vue/server-renderer');
var head = require('@vueuse/head');

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
    if (
      typeof FW !== 'undefined' &&
      language == FW.Locale &&
      typeof FW.i18n !== 'undefined'
    ) {
      callback(null, FW.i18n);
      return;
    }
    var pfx = '';
    if (typeof FW !== 'undefined') {
      pfx = FW.prefix;
    }
    var newpfx = pfx.replace(/\/l\/[a-z]{2}-[A-Z]{2}/, '/l/' + language);
    if (newpfx == pfx) {
      newpfx = newpfx = '/l/' + language;
    }
    fetch(newpfx + '/_special/locale.json')
      .catch((err) => {
        return fetch('/_special/locale/' + language + '.json');
      })
      .then((res) => {
        if (!res.ok) {
          const retry = res.status >= 500 && res.status < 600;
          callback(`failed loading i18n`, retry);
          return;
        }
        return res.json();
      })
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err, false);
      });
  }
}
Backend.type = 'backend';

const eventBus = mitt();
const useEventBus = () => {
    const vueInstance = vue.getCurrentInstance();
    return vueInstance.appContext.config.globalProperties.$eventBus;
};
const i18nextPromise = i18next.use(Backend).init({
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,
    lng: klbfw.getLocale(),
    load: 'currentOnly',
    initImmediate: false,
});
const useTranslation = () => {
    const vueInstance = vue.getCurrentInstance();
    return vueInstance.appContext.config.globalProperties.$t;
};

function render$7(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render$6(_ctx, _cache) {
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

function render$5(_ctx, _cache) {
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

function render$4(_ctx, _cache) {
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

function render$3(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
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
      d: "M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z",
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
    vue.createElementVNode("path", { d: "M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" })
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

const _hoisted_1$g = { class: "parent" };
var script$g = vue.defineComponent({
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
                            vue.createElementVNode("div", _hoisted_1$g, [
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

script$g.__file = "src/components/ui/FyModal/FyModal.vue";

const _hoisted_1$f = { class: "fy-circle-percent" };
const _hoisted_2$f = {
    viewBox: "0 0 36 36",
    class: "circular-chart"
};
const _hoisted_3$d = vue.createElementVNode("path", {
    class: "circle-bg",
    d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
}, null, -1);
const _hoisted_4$b = ["stroke-dasharray", "stroke"];
const _hoisted_5$a = ["x", "y"];
var script$f = vue.defineComponent({
    __name: 'FyCirclePercent',
    props: {
        percent: { type: Number, required: true, default: 100 },
        textXY: { type: Array, required: false, default: () => [18, 20.85] },
        color: { type: String, required: false, default: 'blue' }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$f, [
                (vue.openBlock(), vue.createElementBlock("svg", _hoisted_2$f, [
                    _hoisted_3$d,
                    vue.createElementVNode("path", {
                        class: "circle",
                        "stroke-dasharray": `${__props.percent}, 100`,
                        stroke: __props.color,
                        d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    }, null, 8, _hoisted_4$b),
                    vue.createElementVNode("text", {
                        x: __props.textXY[0].toString(),
                        y: __props.textXY[1].toString(),
                        class: "percentage"
                    }, vue.toDisplayString(__props.percent) + "% ", 9, _hoisted_5$a)
                ]))
            ]));
        };
    }
});

script$f.__file = "src/components/ui/FyCirclePercent/FyCirclePercent.vue";

const _hoisted_1$e = { class: "parent" };
const _hoisted_2$e = {
    class: "modal-container",
    style: { "width": "350px !important" }
};
const _hoisted_3$c = { class: "modal-content" };
const _hoisted_4$a = {
    key: 0,
    class: "confirm-modal-desc default-p"
};
const _hoisted_5$9 = vue.createElementVNode("br", null, null, -1);
const _hoisted_6$8 = { class: "btn-box" };
var script$e = vue.defineComponent({
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
                        vue.createElementVNode("div", _hoisted_1$e, [
                            vue.createVNode(vue.unref(vue$1.DialogOverlay)),
                            vue.createElementVNode("div", _hoisted_2$e, [
                                vue.createElementVNode("div", null, [
                                    vue.createVNode(vue.unref(vue$1.DialogTitle), { class: "title" }, {
                                        default: vue.withCtx(() => [
                                            vue.createTextVNode(vue.toDisplayString(title.value), 1)
                                        ]),
                                        _: 1
                                    }),
                                    vue.createElementVNode("div", _hoisted_3$c, [
                                        (desc.value)
                                            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$a, vue.toDisplayString(desc.value), 1))
                                            : vue.createCommentVNode("v-if", true),
                                        _hoisted_5$9,
                                        vue.createElementVNode("div", _hoisted_6$8, [
                                            vue.createElementVNode("button", {
                                                onClick: _cache[0] || (_cache[0] = ($event) => (confirm.value = false)),
                                                class: "btn neutral btn-defaults"
                                            }, vue.toDisplayString(_ctx.$t('confirm_modal_cta_cancel')), 1),
                                            vue.createElementVNode("button", {
                                                onClick: _cache[1] || (_cache[1] = ($event) => (_onConfirm())),
                                                class: "btn primary btn-defaults"
                                            }, vue.toDisplayString(_ctx.$t('confirm_modal_cta_confirm')), 1)
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

script$e.__file = "src/components/ui/FyConfirm/FyConfirm.vue";

const _hoisted_1$d = {
    class: "fy-breadcrumb",
    "aria-label": "Breadcrumb"
};
const _hoisted_2$d = { class: "bc-innactive" };
var script$d = vue.defineComponent({
    __name: 'FyBreadcrumb',
    props: {
        nav: { type: Array, required: true, default: () => [] },
        maxLength: { type: Number, required: false, default: 32 }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            const _component_router_link = vue.resolveComponent("router-link");
            return (vue.openBlock(), vue.createElementBlock("nav", _hoisted_1$d, [
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
                                    vue.createVNode(vue.unref(render$6), { class: "icon bc-innactive" })
                                ]))
                                : (vue.openBlock(), vue.createElementBlock("li", {
                                    key: `e-${item.to}`,
                                    class: "bc-current"
                                }, [
                                    vue.createElementVNode("span", _hoisted_2$d, vue.toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1)
                                ]))
                        ], 64));
                    }), 256))
                ])
            ]));
        };
    }
});

script$d.__file = "src/components/ui/FyBreadcrumb/FyBreadcrumb.vue";

const _hoisted_1$c = { class: "fy-step-bar" };
const _hoisted_2$c = { class: "bar-bg" };
const _hoisted_3$b = { class: "label" };
var script$c = vue.defineComponent({
    __name: 'FySteps',
    props: {
        steps: { type: Array, required: false, default: () => [] },
        currentStep: { type: Number, required: false, default: 1 }
    },
    setup(__props) {
        const props = __props;
        const barWidth = vue.computed(() => (props.currentStep * 100) / props.steps.length);
        const getStepClass = (index) => {
            if (index + 1 < props.currentStep)
                return 'past-step';
            if (index + 1 == props.currentStep)
                return 'current-step';
            return 'past-step';
        };
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$c, [
                vue.createElementVNode("div", _hoisted_2$c, [
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
                            vue.createElementVNode("span", _hoisted_3$b, vue.toDisplayString(_ctx.$t(step.name)), 1),
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

script$c.__file = "src/components/ui/FySteps/FySteps.vue";

const _hoisted_1$b = {
    key: 0,
    class: "border-collapse w-full md:mx-0 fy-datatable"
};
const _hoisted_2$b = { key: 0 };
const _hoisted_3$a = { class: "div" };
const _hoisted_4$9 = { class: "div-cell" };
const _hoisted_5$8 = { key: 0 };
const _hoisted_6$7 = { key: 1 };
var script$b = vue.defineComponent({
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
                ? (vue.openBlock(), vue.createElementBlock("table", _hoisted_1$b, [
                    (__props.showHeaders)
                        ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_2$b, [
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
                                    class: vue.normalizeClass(`tr ${bgColor(index)} `),
                                    key: index
                                }, [
                                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.headers, (title, property) => {
                                        return (vue.openBlock(), vue.createElementBlock("td", {
                                            key: title,
                                            class: "td"
                                        }, [
                                            vue.createElementVNode("div", _hoisted_3$a, vue.toDisplayString(title), 1),
                                            vue.createElementVNode("div", _hoisted_4$9, [
                                                vue.renderSlot(_ctx.$slots, `${property}_item`, {
                                                    data: { prop: item[property], item: item, idx: index }
                                                }, () => [
                                                    (item[property])
                                                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$8, vue.toDisplayString(item[property].toString()), 1))
                                                        : (vue.openBlock(), vue.createElementBlock("span", _hoisted_6$7, "n/a"))
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

script$b.__file = "src/components/ui/FyDatatable/FyDatatable.vue";

const _hoisted_1$a = {
    key: 0,
    class: "fy-table"
};
const _hoisted_2$a = { class: "table-container" };
const _hoisted_3$9 = { key: 0 };
const _hoisted_4$8 = { key: 0 };
const _hoisted_5$7 = { key: 1 };
var script$a = vue.defineComponent({
    __name: 'FyTable',
    props: {
        showHeaders: { type: Boolean, required: false, default: true },
        headers: { type: null, required: true },
        data: { type: Array, required: false, default: () => [] }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (__props.data && __props.data.length)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$a, [
                    vue.createElementVNode("div", _hoisted_2$a, [
                        vue.createElementVNode("table", null, [
                            (__props.showHeaders)
                                ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_3$9, [
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
                                                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$8, vue.toDisplayString(item[property]), 1))
                                                        : (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$7, "n/a"))
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

script$a.__file = "src/components/ui/FyTable/FyTable.vue";

const _hoisted_1$9 = vue.createElementVNode("path", {
    d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
    fill: "currentColor"
}, null, -1);
const _hoisted_2$9 = vue.createElementVNode("path", {
    d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
    fill: "currentFill"
}, null, -1);
const _hoisted_3$8 = [
    _hoisted_1$9,
    _hoisted_2$9
];
var script$9 = vue.defineComponent({
    __name: 'DefaultLoader',
    props: {
        size: { type: String, required: false, default: '16' },
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
                }, _hoisted_3$8, 4)),
                vue.createElementVNode("span", {
                    class: vue.normalizeClass(!__props.showLoadingText ? 'is-sr' : 'loader-text')
                }, vue.toDisplayString(_ctx.$t('global_loading_text')), 3)
            ], 64));
        };
    }
});

script$9.__file = "src/components/ui/FyLoader/DefaultLoader.vue";

const _hoisted_1$8 = { key: 0 };
const _hoisted_2$8 = { class: "fy-loader" };
var script$8 = vue.defineComponent({
    __name: 'FyLoader',
    props: {
        id: { type: String, required: false },
        loader: { type: Object, required: false, default: () => script$9 },
        showLoadingText: { type: Boolean, required: false, default: true },
        size: { type: String, required: false, default: '16' },
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
                eventBus.on('loading', setLoading);
            }
        });
        vue.onUnmounted(() => {
            if (props.id) {
                eventBus.off(`${props.id}-loading`, setLoading);
            }
            else {
                eventBus.off('loading', setLoading);
            }
        });
        return (_ctx, _cache) => {
            return (loading.value || __props.force)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
                    vue.createElementVNode("div", _hoisted_2$8, [
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

script$8.__file = "src/components/ui/FyLoader/FyLoader.vue";

const _hoisted_1$7 = { class: "input-group" };
const _hoisted_2$7 = ["for"];
const _hoisted_3$7 = ["aria-label", "id", "true-value", "false-value"];
const _hoisted_4$7 = ["href"];
const _hoisted_5$6 = {
    key: 2,
    class: "is-req"
};
const _hoisted_6$6 = {
    key: 1,
    class: "input-box"
};
const _hoisted_7$5 = ["aria-label", "placeholder", "autocomplete", "id", "type"];
const _hoisted_8$5 = ["aria-label", "placeholder", "autocomplete", "id"];
const _hoisted_9$4 = ["aria-label", "id"];
const _hoisted_10$3 = ["value"];
const _hoisted_11$2 = {
    key: 2,
    class: "help-text"
};
const _hoisted_12$1 = {
    key: 3,
    class: "form-error-label"
};
var script$7 = vue.defineComponent({
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
        const translate = useTranslation();
        const inputRef = vue.ref();
        const errorProps = vue.toRef(props, 'error');
        const errorVuelidateProps = vue.toRef(props, 'errorVuelidate');
        const checkErrors = vue.computed(() => {
            if (errorProps.value)
                return errorProps.value;
            if (errorVuelidateProps.value && errorVuelidateProps.value.length > 0) {
                const err = `vuelidate_validator_${errorVuelidateProps.value[0].$validator.toString()}`;
                return translate(err);
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
            set: (items) => {
                emit('update:modelValue', items);
            },
        });
        const modelCheckbox = vue.computed({
            get: () => props.checkboxValue,
            set: (items) => {
                emit('update:checkboxValue', items);
            },
        });
        expose({ focus, getInputRef });
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$7, [
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
                            }, null, 10, _hoisted_3$7)), [
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
                                vue.createVNode(vue.unref(render$2))
                            ], 8, _hoisted_4$7))
                            : vue.createCommentVNode("v-if", true),
                        (__props.req)
                            ? (vue.openBlock(), vue.createElementBlock("sup", _hoisted_5$6, "*"))
                            : vue.createCommentVNode("v-if", true)
                    ], 8, _hoisted_2$7))
                    : vue.createCommentVNode("v-if", true),
                (!['checkbox', 'radiobox'].includes(__props.type))
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$6, [
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
                            }, null, 10, _hoisted_7$5)), [
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
                            }, null, 10, _hoisted_8$5)), [
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
                                    }, vue.toDisplayString(opt[1]), 9, _hoisted_10$3));
                                }), 128))
                            ], 8, _hoisted_9$4)), [
                                [vue.vModelSelect, vue.unref(model)]
                            ])
                            : vue.createCommentVNode("v-if", true),
                        vue.renderSlot(_ctx.$slots, "after")
                    ]))
                    : vue.createCommentVNode("v-if", true),
                (__props.help)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$2, vue.toDisplayString(__props.help), 1))
                    : vue.createCommentVNode("v-if", true),
                (vue.unref(checkErrors))
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12$1, vue.toDisplayString(vue.unref(checkErrors)), 1))
                    : vue.createCommentVNode("v-if", true)
            ]));
        };
    }
});

script$7.__file = "src/components/ui/FyInput/FyInput.vue";

const _hoisted_1$6 = {
    key: 0,
    class: "paging"
};
const _hoisted_2$6 = { "aria-label": "Pagination" };
const _hoisted_3$6 = { class: "is-sr" };
const _hoisted_4$6 = {
    key: 2,
    class: "dots"
};
const _hoisted_5$5 = ["onClick"];
const _hoisted_6$5 = {
    href: "#",
    "aria-current": "page",
    class: "active"
};
const _hoisted_7$4 = ["onClick"];
const _hoisted_8$4 = {
    key: 3,
    class: "dots"
};
const _hoisted_9$3 = { class: "is-sr" };
const _hoisted_10$2 = { class: "paging-text" };
var script$6 = vue.defineComponent({
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
            return (page >= 1 && page <= props.items.page_max && page != props.items.page_no);
        };
        const next = () => {
            const page = props.items.page_no + 1;
            if (!isNewPage(page))
                return;
            router
                .push({
                path: route.path,
                query: { page: page },
            })
                .then(() => {
                eventBus.emit(`${props.id}GoToPage`, page);
            });
        };
        const prev = () => {
            const page = props.items.page_no - 1;
            if (!isNewPage(page))
                return;
            router
                .push({
                path: route.path,
                query: { page: page },
            })
                .then(() => {
                eventBus.emit(`${props.id}GoToPage`, page);
            });
        };
        const page = (page) => {
            if (!isNewPage(page))
                return;
            router
                .push({
                path: route.path,
                query: { page: page },
            })
                .then(() => {
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
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [
                    vue.createElementVNode("div", null, [
                        vue.createElementVNode("nav", _hoisted_2$6, [
                            (__props.items.page_no >= 2)
                                ? (vue.openBlock(), vue.createElementBlock("a", {
                                    key: 0,
                                    href: "javascript:void(0);",
                                    onClick: _cache[0] || (_cache[0] = ($event) => (prev())),
                                    class: "prev-next"
                                }, [
                                    vue.createElementVNode("span", _hoisted_3$6, vue.toDisplayString(_ctx.$t('previous_paging')), 1),
                                    vue.createVNode(vue.unref(render$5), { class: "fv-icon-base" })
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
                                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$6, " ... "))
                                : vue.createCommentVNode("v-if", true),
                            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(2, (i) => {
                                return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                                    (__props.items.page_no - (3 - i) >= 1)
                                        ? (vue.openBlock(), vue.createElementBlock("a", {
                                            class: "innactive",
                                            href: "javascript:void(0);",
                                            key: `${i}-sm`,
                                            onClick: ($event) => (page(__props.items.page_no - (3 - i)))
                                        }, vue.toDisplayString(__props.items.page_no - (3 - i)), 9, _hoisted_5$5))
                                        : vue.createCommentVNode("v-if", true)
                                ], 64));
                            }), 64)),
                            vue.createElementVNode("a", _hoisted_6$5, vue.toDisplayString(__props.items.page_no), 1),
                            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(2, (i) => {
                                return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                                    (__props.items.page_no + i <= __props.items.page_max)
                                        ? (vue.openBlock(), vue.createElementBlock("a", {
                                            class: "innactive",
                                            href: "javascript:void(0);",
                                            key: `${i}-md`,
                                            onClick: ($event) => (page(__props.items.page_no + i))
                                        }, vue.toDisplayString(__props.items.page_no + i), 9, _hoisted_7$4))
                                        : vue.createCommentVNode("v-if", true)
                                ], 64));
                            }), 64)),
                            (__props.items.page_no + 2 < __props.items.page_max - 1)
                                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_8$4, " ... "))
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
                                    vue.createElementVNode("span", _hoisted_9$3, vue.toDisplayString(_ctx.$t('next_paging')), 1),
                                    vue.createVNode(vue.unref(render$4), { class: "fv-icon-base" })
                                ]))
                                : vue.createCommentVNode("v-if", true)
                        ]),
                        vue.createElementVNode("p", _hoisted_10$2, vue.toDisplayString(_ctx.$t('global_paging', {
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

script$6.__file = "src/components/ui/FyPaging/FyPaging.vue";

var uiComponents = {
    FyModal: script$g,
    FyCirclePercent: script$f,
    FyConfirm: script$e,
    FyBreadcrumb: script$d,
    FySteps: script$c,
    FyDatatable: script$b,
    FyTable: script$a,
    FyLoader: script$8,
    FyInput: script$7,
    FyPaging: script$6,
};

const useFVStore = pinia.defineStore({
    id: 'fVStore',
    state: () => ({
        user: null,
    }),
    getters: {
        isAuth: (state) => {
            return !(state.user === null);
        },
    },
    actions: {
        async refreshUser(params = {}) {
            const apiData = await klbfw.rest('User:get', 'GET', params).catch((err) => { });
            if (apiData.result == 'success' && apiData.data != null) {
                this.user = apiData.data;
            }
            else {
                this.user = null;
            }
        },
        async logout() {
            const apiData = await klbfw.rest('User:logout', 'Post').catch((err) => { });
            if (apiData.result == 'success') {
                this.setUser(null);
            }
        },
        setUser(user) {
            this.user = user;
        },
    },
});

const useHistory = pinia.defineStore({
    id: 'historyStore',
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
const isSSRRendered = () => {
    const state = klbfw.getInitialState();
    return !!(state && state.isSSRRendered == true);
};
const setupClient = (router, pinia) => {
    const initialState = klbfw.getInitialState();
    if (isSSRRendered()) {
        if (initialState && initialState.piniaState) {
            pinia.state.value = JSON.parse(initialState.piniaState);
        }
    }
    useHistory(pinia)._setRouter(router);
};
async function handleSSR(createApp, cb, options = {}) {
    const { app, router, head: head$1, pinia } = await createApp(true);
    const url = `${klbfw.getPath()}`;
    await router.push(url);
    await router.isReady();
    const result = {
        uuid: klbfw.getUuid(),
        initial: {
            isSSRRendered: true,
            piniaState: null,
        },
    };
    const historyStore = useHistory(pinia);
    useHistory(pinia)._setRouter(router);
    if (url !== historyStore.currentRoute.fullPath) {
        result.redirect = router.currentRoute.value.fullPath;
        result.statusCode = 307;
        return cb(result);
    }
    const html = await serverRenderer.renderToString(app, {});
    const { headTags, htmlAttrs, bodyAttrs, bodyTags } = head.renderHeadToString(head$1);
    result.meta = headTags;
    result.bodyAttributes = bodyAttrs;
    result.htmlAttributes = htmlAttrs;
    result.bodyTags = bodyTags;
    result.app = html;
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
    result.initial.piniaState = JSON.stringify(pinia.state.value);
    return cb(result);
}

const useRestState = pinia.defineStore({
    id: 'restState',
    state: () => ({
        results: {},
    }),
    actions: {
        addResult(key, result) {
            this.results[key] = result;
        },
        delResult(key) {
            delete this.results[key];
        },
        getByHash(key) {
            return this.results[key];
        },
    },
});
const stringHashcode = (str) => {
    let hash = 0, i, chr;
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
};
async function rest(url, method = 'GET', params = {}, ctx = {}) {
    const requestHash = stringHashcode(url + method + JSON.stringify(params));
    const restState = useRestState();
    if (isSSRRendered() && restState.results[requestHash]) {
        const result = { ...restState.getByHash(requestHash) };
        restState.delResult(requestHash);
        return new Promise((resolve, reject) => {
            if (result.fvReject) {
                delete result.fvReject;
                reject(result);
            }
            else
                resolve(result);
        });
    }
    return new Promise((resolve, reject) => {
        klbfw.rest(url, method, params, ctx)
            .then((restResult) => {
            if (klbfw.getMode() == 'ssr')
                restState.addResult(requestHash, restResult);
            resolve(restResult);
        })
            .catch((err) => {
            if (klbfw.getMode() == 'ssr') {
                err.fvReject = true;
                restState.addResult(requestHash, err);
            }
            reject(err);
        });
    });
}

const _hoisted_1$5 = { class: "w-full" };
const _hoisted_2$5 = {
    key: 0,
    class: "message"
};
const _hoisted_3$5 = {
    key: 0,
    class: "oauth-container"
};
const _hoisted_4$5 = ["onClick"];
const _hoisted_5$4 = ["alt", "src"];
const _hoisted_6$4 = {
    key: 1,
    class: "response-error"
};
const _hoisted_7$3 = {
    key: 2,
    class: "reset-pwd"
};
const _hoisted_8$3 = { class: "btn primary btn-defaults" };
const _hoisted_9$2 = {
    key: 0,
    class: "response-error"
};
const _hoisted_10$1 = vue.createElementVNode("br", { style: { "clear": "both" } }, null, -1);
const _hoisted_11$1 = { key: 1 };
var script$5 = vue.defineComponent({
    __name: 'KlbLogin',
    props: {
        returnDefault: { type: String, required: false, default: '/' },
        forceAction: { type: String, required: false }
    },
    setup(__props) {
        const props = __props;
        const state = vue.reactive({
            userEmail: '',
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
                const data = await rest('User:forgot_password', 'POST', {
                    login: state.userEmail,
                }).catch((err) => {
                    pwdRecoverError.value = err;
                });
                if (data?.result == 'success') {
                    pwdRecoverMailSent.value = true;
                }
            }
        };
        const userFlow = async (params = { initial: false }) => {
            eventBus.emit('klblogin-loading', true);
            fieldsError.value = {};
            hasOauth.value = false;
            if (params.initial === false) {
                let hasError = false;
                responseReq.value.forEach((field) => {
                    if (!formData.value[field] || formData.value[field] == '') {
                        fieldsError.value[field] = 'error_form_value_is_required';
                        hasError = true;
                    }
                });
                if (hasError) {
                    eventBus.emit('klblogin-loading', false);
                    return;
                }
            }
            if (params.oauth) {
                formData.value.oauth2 = params.oauth;
            }
            if (route.query.return_to && typeof route.query.return_to == 'string') {
                returnTo.value = route.query.return_to
                    ? route.query.return_to
                    : props.returnDefault;
            }
            if (!formData.value.session) {
                formData.value.session = route.query.session
                    ? route.query.session
                    : undefined;
            }
            formData.value.return_to = returnTo.value;
            response.value = (await rest('User:flow', 'POST', formData.value).catch((err) => {
                responseError.value = err;
                if (responseError.value.param) {
                    fieldsError.value[responseError.value.param] =
                        responseError.value.token;
                }
                eventBus.emit('klblogin-loading', false);
                return;
            }));
            if (response.value?.result == 'success') {
                if (response.value.data.url) {
                    window.location.href = response.value.data.url;
                    return;
                }
                if (response.value.data.complete == true && response.value.data.user) {
                    store.setUser(response.value.data.user);
                    const routeExists = router.resolve(returnTo.value);
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
                    if (field.type == 'oauth2') {
                        hasOauth.value = true;
                    }
                });
                setTimeout(() => {
                    if (inputs.value.length > 0 && inputs.value[inputs.value.length - 1])
                        inputs.value[inputs.value.length - 1].focus();
                }, 300);
            }
            eventBus.emit('klblogin-loading', false);
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
                        vue.createElementVNode("div", _hoisted_1$5, [
                            (responseMessage.value)
                                ? (vue.openBlock(), vue.createElementBlock("h2", _hoisted_2$5, vue.toDisplayString(responseMessage.value), 1))
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
                                                                ? (vue.openBlock(), vue.createBlock(script$7, {
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
                                                        ? (vue.openBlock(), vue.createBlock(script$7, {
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
                                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$5, [
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
                                                            }, null, 12, _hoisted_5$4))
                                                        ], 8, _hoisted_4$5))
                                                        : vue.createCommentVNode("v-if", true)
                                                ], 64));
                                            }), 128))
                                        ]))
                                        : vue.createCommentVNode("v-if", true),
                                    (responseError.value && responseError.value.token)
                                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$4, vue.toDisplayString(_ctx.$t(responseError.value.token)), 1))
                                        : vue.createCommentVNode("v-if", true),
                                    (responseReq.value.includes('password') && 0)
                                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7$3, [
                                            vue.createElementVNode("a", {
                                                href: "javascript:void(0)",
                                                onClick: _cache[0] || (_cache[0] =
                                                    () => {
                                                        vue.unref(eventBus).emit('ResetPasswordModal', true);
                                                        pwdRecoverMailSent.value = false;
                                                    })
                                            }, vue.toDisplayString(_ctx.$t('recover_pwd_link')), 1)
                                        ]))
                                        : vue.createCommentVNode("v-if", true),
                                    vue.createElementVNode("button", _hoisted_8$3, vue.toDisplayString(_ctx.$t('cta_login_next')), 1)
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
                                vue.createVNode(script$7, {
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
                                (pwdRecoverError.value && pwdRecoverError.value.token)
                                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$2, vue.toDisplayString(_ctx.$t(pwdRecoverError.value.token)), 1))
                                    : vue.createCommentVNode("v-if", true),
                                vue.createElementVNode("a", {
                                    href: "javascript:void(0)",
                                    onClick: _cache[3] || (_cache[3] = ($event) => (forgotPassword())),
                                    class: "mt-2 float-right btn px-5 py-2 primary"
                                }, vue.toDisplayString(_ctx.$t('recover_pwd_cta')), 1),
                                _hoisted_10$1
                            ], 64))
                            : (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$1, vue.toDisplayString(_ctx.$t('pwd_recover_confirm')), 1))
                    ]),
                    _: 1
                }, 8, ["title"])
            ]));
        };
    }
});

script$5.__file = "src/components/klb/KlbLogin/KlbLogin.vue";

const _hoisted_1$4 = {
    key: 0,
    class: "klb-account"
};
const _hoisted_2$4 = {
    key: 0,
    class: "input-group"
};
const _hoisted_3$4 = { class: "label-basic" };
const _hoisted_4$4 = { class: "input-box-child" };
const _hoisted_5$3 = { class: "main" };
const _hoisted_6$3 = ["onSubmit"];
const _hoisted_7$2 = { class: "klb-account-grid-inputs" };
const _hoisted_8$2 = {
    key: 0,
    class: "form-error-label"
};
const _hoisted_9$1 = {
    class: "btn-defaults mt-4 btn primary",
    type: "submit"
};
var script$4 = vue.defineComponent({
    __name: 'KlbUpdateEmailModal',
    props: {
        showValueButton: { type: Boolean, required: false, default: true }
    },
    setup(__props) {
        const eventBus = useEventBus();
        const store = useFVStore();
        const isAuth = vue.computed(() => store.isAuth);
        const errorOnSubmit = vue.ref(undefined);
        const rules = { updateEmail: {
                email: { required: validators.required, email: validators.email },
                pwd: { required: validators.required },
            } };
        const state = vue.reactive({ updateEmail: { email: '', pwd: '' } });
        const v$ = useVuelidate(rules, state);
        const changeEmail = async () => {
            errorOnSubmit.value = undefined;
            if (await v$.value.updateEmail.$validate()) {
                const _updateResult = await rest('User/@:setEmail', 'POST', {
                    email: state.updateEmail.email,
                    current_password: state.updateEmail.pwd,
                }).catch((err) => {
                    errorOnSubmit.value = err.token;
                });
                if (_updateResult && _updateResult.result == 'success') {
                    await store.refreshUser();
                    eventBus.emit('UpdateEmailModal', false);
                }
            }
        };
        return (_ctx, _cache) => {
            const _component_FyModal = vue.resolveComponent("FyModal");
            return (vue.unref(isAuth))
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
                    (__props.showValueButton)
                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$4, [
                            vue.createElementVNode("div", _hoisted_3$4, vue.toDisplayString(_ctx.$t('update_email_display_label')), 1),
                            vue.createElementVNode("div", _hoisted_4$4, [
                                vue.createElementVNode("div", _hoisted_5$3, vue.toDisplayString(vue.unref(store).user?.Email), 1),
                                vue.createElementVNode("button", {
                                    onClick: _cache[0] || (_cache[0] = ($event) => (vue.unref(eventBus).emit('UpdateEmailModal', true))),
                                    class: "btn primary small"
                                }, [
                                    vue.createVNode(vue.unref(render$1), { class: "edit-icon" }),
                                    vue.createTextVNode(" " + vue.toDisplayString(_ctx.$t('update_email_display_cta')), 1)
                                ])
                            ])
                        ]))
                        : vue.createCommentVNode("v-if", true),
                    vue.createVNode(_component_FyModal, {
                        id: "UpdateEmail",
                        title: _ctx.$t('update_email_modal_title')
                    }, {
                        default: vue.withCtx(() => [
                            vue.createElementVNode("form", {
                                onSubmit: vue.withModifiers(changeEmail, ["prevent"])
                            }, [
                                vue.createElementVNode("div", _hoisted_7$2, [
                                    vue.createVNode(script$7, {
                                        id: "currPwd",
                                        req: true,
                                        showLabel: true,
                                        placeholder: _ctx.$t('update_email_form_pwd_placeholder'),
                                        errorVuelidate: vue.unref(v$).updateEmail.pwd.$errors,
                                        modelValue: state.updateEmail.pwd,
                                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => ((state.updateEmail.pwd) = $event)),
                                        label: _ctx.$t('update_email_form_pwd_label'),
                                        type: "password",
                                        autocomplete: "off"
                                    }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                                    vue.createVNode(script$7, {
                                        id: "newEmail",
                                        req: true,
                                        showLabel: true,
                                        placeholder: _ctx.$t('update_email_form_email_placeholder'),
                                        errorVuelidate: vue.unref(v$).updateEmail.email.$errors,
                                        modelValue: state.updateEmail.email,
                                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => ((state.updateEmail.email) = $event)),
                                        label: _ctx.$t('update_email_form_email_label'),
                                        autocomplete: "off",
                                        type: "email"
                                    }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"])
                                ]),
                                (errorOnSubmit.value)
                                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8$2, vue.toDisplayString(errorOnSubmit.value), 1))
                                    : vue.createCommentVNode("v-if", true),
                                vue.createElementVNode("button", _hoisted_9$1, vue.toDisplayString(_ctx.$t('update_email_cta')), 1)
                            ], 40, _hoisted_6$3)
                        ]),
                        _: 1
                    }, 8, ["title"])
                ]))
                : vue.createCommentVNode("v-if", true);
        };
    }
});

script$4.__file = "src/components/klb/KlbAccount/KlbUpdateEmailModal.vue";

const _hoisted_1$3 = {
    key: 0,
    class: "klb-account"
};
const _hoisted_2$3 = {
    key: 0,
    class: "input-group"
};
const _hoisted_3$3 = { class: "label-basic" };
const _hoisted_4$3 = { class: "input-box-child" };
const _hoisted_5$2 = ["onSubmit"];
const _hoisted_6$2 = { class: "klb-account-grid-inputs" };
const _hoisted_7$1 = {
    key: 0,
    class: "form-error-label"
};
const _hoisted_8$1 = {
    class: "btn-defaults mt-4 btn primary",
    type: "submit"
};
var script$3 = vue.defineComponent({
    __name: 'KlbUpdatePasswordModal',
    props: {
        showValueButton: { type: Boolean, required: false, default: true }
    },
    setup(__props) {
        const eventBus = useEventBus();
        const store = useFVStore();
        const isAuth = vue.computed(() => store.isAuth);
        const pwd = vue.ref();
        const pwdConfirm = vue.ref();
        const oldPwd = vue.ref();
        const errorOnSubmit = vue.ref(undefined);
        const rules = {
            oldPwd: { required: validators.required },
            pwd: { required: validators.required },
            pwdConfirm: { req: validators.required, sameAs: validators.sameAs(pwd) },
        };
        const v$ = useVuelidate(rules, { oldPwd, pwd, pwdConfirm });
        const changeEmail = async () => {
            errorOnSubmit.value = undefined;
            if (await v$.value.$validate()) {
                const _updateResult = await rest('User/@:setPassword', 'POST', {
                    old_password: oldPwd,
                    password: pwd
                }).catch((err) => {
                    errorOnSubmit.value = err.token;
                });
                if (_updateResult && _updateResult.result == 'success') {
                    await store.refreshUser();
                    eventBus.emit('updatePwdModal', false);
                }
            }
        };
        return (_ctx, _cache) => {
            const _component_FyModal = vue.resolveComponent("FyModal");
            return (vue.unref(isAuth))
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
                    (__props.showValueButton)
                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$3, [
                            vue.createElementVNode("div", _hoisted_3$3, vue.toDisplayString(_ctx.$t('update_pwd_display_label')), 1),
                            vue.createElementVNode("div", _hoisted_4$3, [
                                vue.createElementVNode("button", {
                                    onClick: _cache[0] || (_cache[0] = ($event) => (vue.unref(eventBus).emit('updatePwdModal', true))),
                                    class: "btn primary small"
                                }, [
                                    vue.createVNode(vue.unref(render$1), { class: "edit-icon" }),
                                    vue.createTextVNode(" " + vue.toDisplayString(_ctx.$t('update_pwd_display_cta')), 1)
                                ])
                            ])
                        ]))
                        : vue.createCommentVNode("v-if", true),
                    vue.createVNode(_component_FyModal, {
                        id: "updatePwd",
                        title: _ctx.$t('update_pwd_modal_title')
                    }, {
                        default: vue.withCtx(() => [
                            vue.createElementVNode("form", {
                                onSubmit: vue.withModifiers(changeEmail, ["prevent"])
                            }, [
                                vue.createElementVNode("div", _hoisted_6$2, [
                                    vue.createVNode(script$7, {
                                        id: "newPwd",
                                        req: true,
                                        showLabel: true,
                                        placeholder: _ctx.$t('update_pwd_form_newPwd_placeholder'),
                                        errorVuelidate: vue.unref(v$).pwd.$errors,
                                        modelValue: pwd.value,
                                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => ((pwd).value = $event)),
                                        label: _ctx.$t('update_pwd_form_newPwd_label'),
                                        type: "password",
                                        autocomplete: "off"
                                    }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                                    vue.createVNode(script$7, {
                                        id: "newPwdConfirm",
                                        req: true,
                                        showLabel: true,
                                        placeholder: _ctx.$t('update_pwd_form_pwdConfirm_placeholder'),
                                        errorVuelidate: vue.unref(v$).pwdConfirm.$errors,
                                        modelValue: pwdConfirm.value,
                                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => ((pwdConfirm).value = $event)),
                                        label: _ctx.$t('update_pwd_form_pwdConfirm_label'),
                                        type: "password",
                                        autocomplete: "off"
                                    }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"])
                                ]),
                                vue.createVNode(script$7, {
                                    id: "oldPwd",
                                    req: true,
                                    showLabel: true,
                                    placeholder: _ctx.$t('update_pwd_form_oldPwd_placeholder'),
                                    errorVuelidate: vue.unref(v$).oldPwd.$errors,
                                    modelValue: oldPwd.value,
                                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => ((oldPwd).value = $event)),
                                    label: _ctx.$t('update_pwd_form_oldPwd_label'),
                                    type: "password",
                                    autocomplete: "off"
                                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                                (errorOnSubmit.value)
                                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7$1, vue.toDisplayString(errorOnSubmit.value), 1))
                                    : vue.createCommentVNode("v-if", true),
                                vue.createElementVNode("button", _hoisted_8$1, vue.toDisplayString(_ctx.$t('update_pwd_cta')), 1)
                            ], 40, _hoisted_5$2)
                        ]),
                        _: 1
                    }, 8, ["title"])
                ]))
                : vue.createCommentVNode("v-if", true);
        };
    }
});

script$3.__file = "src/components/klb/KlbAccount/KlbUpdatePasswordModal.vue";

const _hoisted_1$2 = {
    key: 0,
    class: "klb-account"
};
const _hoisted_2$2 = { class: "input-group" };
const _hoisted_3$2 = { class: "label-basic" };
const _hoisted_4$2 = { class: "input-box-child" };
var script$2 = vue.defineComponent({
    __name: 'KlbDeleteAccount',
    props: {
        url: { type: String, required: false, default: '/login' }
    },
    setup(__props) {
        const store = useFVStore();
        const isAuth = vue.computed(() => store.isAuth);
        return (_ctx, _cache) => {
            const _component_router_link = vue.resolveComponent("router-link");
            return (vue.unref(isAuth))
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
                    vue.createElementVNode("div", _hoisted_2$2, [
                        vue.createElementVNode("div", _hoisted_3$2, vue.toDisplayString(_ctx.$t('delete_account_display_label')), 1),
                        vue.createElementVNode("div", _hoisted_4$2, [
                            vue.createVNode(_component_router_link, {
                                to: `${__props.url}?act=delete_account`,
                                class: "btn primary small"
                            }, {
                                default: vue.withCtx(() => [
                                    vue.createVNode(vue.unref(render$3), { class: "edit-icon" }),
                                    vue.createTextVNode(" " + vue.toDisplayString(_ctx.$t('delete_account_display_cta')), 1)
                                ]),
                                _: 1
                            }, 8, ["to"])
                        ])
                    ])
                ]))
                : vue.createCommentVNode("v-if", true);
        };
    }
});

script$2.__file = "src/components/klb/KlbAccount/KlbDeleteAccount.vue";

const _hoisted_1$1 = { class: "klb-billing-history" };
const _hoisted_2$1 = ["href"];
const _hoisted_3$1 = { class: "billing-history-tag" };
const _hoisted_4$1 = { class: "billing-history-tag" };
const _hoisted_5$1 = {
    key: 1,
    class: "self-loader-fyvue"
};
const _hoisted_6$1 = {
    key: 2,
    class: "no-billing-history"
};
var script$1 = vue.defineComponent({
    __name: 'KlbBillingHistory',
    setup(__props) {
        const store = useFVStore();
        const isAuth = vue.computed(() => store.isAuth);
        const billingHistory = vue.ref();
        const getPaymentHistory = async (page = 1) => {
            let _billingHistory = await rest("Order", "GET", {
                page_no: page,
                results_per_page: 10,
                Status: "completed",
            }).catch(() => { });
            if (_billingHistory && _billingHistory.result == 'success') {
                billingHistory.value = _billingHistory;
            }
        };
        vue.onMounted(async () => {
            if (isAuth) {
                await getPaymentHistory();
            }
        });
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
                (billingHistory.value)
                    ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                        (billingHistory.value.paging && billingHistory.value.paging.page_no)
                            ? (vue.openBlock(), vue.createBlock(script$6, {
                                key: 0,
                                id: "billingHistory",
                                items: billingHistory.value.paging,
                                class: "billing-history-paging"
                            }, null, 8, ["items"]))
                            : vue.createCommentVNode("v-if", true),
                        vue.createVNode(script$a, {
                            data: billingHistory.value.data,
                            headers: {
                                Invoice_Number: _ctx.$t('billing_history_headers_invoice_number'),
                                Invoice_Date: _ctx.$t('billing_history_headers_created'),
                                Paid: _ctx.$t('billing_history_headers_paid'),
                                Status: _ctx.$t('billing_history_headers_status'),
                                Total: _ctx.$t('billing_history_headers_price'),
                                Actions: _ctx.$t('billing_history_headers_actions'),
                            }
                        }, {
                            Actions_item: vue.withCtx((property) => [
                                (property.data.item.Invoice_Url)
                                    ? (vue.openBlock(), vue.createElementBlock("a", {
                                        key: 0,
                                        href: property.data.item.Invoice_Url,
                                        target: "_blank",
                                        class: "btn neutral download-btn"
                                    }, [
                                        vue.createVNode(vue.unref(render$7), {
                                            stroke: "currentColor",
                                            class: "download-icon"
                                        }),
                                        vue.createTextVNode(" " + vue.toDisplayString(_ctx.$t('billing_history_download_cta')), 1)
                                    ], 8, _hoisted_2$1))
                                    : vue.createCommentVNode("v-if", true)
                            ]),
                            Total_item: vue.withCtx((property) => [
                                vue.createElementVNode("span", _hoisted_3$1, vue.toDisplayString(property.data.item.Total.display), 1)
                            ]),
                            Status_item: vue.withCtx((property) => [
                                vue.createElementVNode("span", _hoisted_4$1, vue.toDisplayString(property.data.item.Status), 1)
                            ]),
                            Invoice_Date_item: vue.withCtx((property) => [
                                vue.createTextVNode(vue.toDisplayString(_ctx.$t("global_datetime", {
                                    val: new Date(property.data.item.Invoice_Date.iso),
                                    formatParams: {
                                        val: {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                        },
                                    },
                                })), 1)
                            ]),
                            Paid_item: vue.withCtx((property) => [
                                vue.createTextVNode(vue.toDisplayString(_ctx.$t("global_datetime", {
                                    val: new Date(property.data.item.Paid.iso),
                                    formatParams: {
                                        val: {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                        },
                                    },
                                })), 1)
                            ]),
                            _: 1
                        }, 8, ["data", "headers"]),
                        (billingHistory.value.paging && billingHistory.value.paging.page_no)
                            ? (vue.openBlock(), vue.createBlock(script$6, {
                                key: 1,
                                id: "billingHistory",
                                items: billingHistory.value.paging,
                                class: "billing-history-paging"
                            }, null, 8, ["items"]))
                            : vue.createCommentVNode("v-if", true)
                    ], 64))
                    : (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$1, [
                        vue.createVNode(script$8, {
                            id: "self-loader-fyvue",
                            force: true,
                            size: "6",
                            showLoadingText: false
                        })
                    ])),
                (billingHistory.value && billingHistory.value.data?.length == 0)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$1, vue.toDisplayString(_ctx.$t('billing_history_empty')), 1))
                    : vue.createCommentVNode("v-if", true)
            ]));
        };
    }
});

script$1.__file = "src/components/klb/KlbBilling/KlbBillingHistory.vue";

const _hoisted_1 = { key: 0 };
const _hoisted_2 = {
    key: 0,
    class: "klb-update-pm"
};
const _hoisted_3 = ["onSubmit"];
const _hoisted_4 = { class: "input-group w-full" };
const _hoisted_5 = { class: "mr-4 w-16" };
const _hoisted_6 = {
    class: "label-basic",
    for: "typeDef"
};
const _hoisted_7 = { class: "w-full" };
const _hoisted_8 = { class: "input-box w-full pl-2" };
const _hoisted_9 = { class: "btn-box" };
const _hoisted_10 = {
    class: "btn-defaults btn primary",
    type: "submit"
};
const _hoisted_11 = {
    key: 1,
    class: ""
};
const _hoisted_12 = { key: 0 };
const _hoisted_13 = vue.createElementVNode("br", null, null, -1);
const _hoisted_14 = { key: 1 };
const _hoisted_15 = vue.createElementVNode("br", null, null, -1);
const _hoisted_16 = {
    key: 1,
    class: "self-loader-fyvue"
};
var script = vue.defineComponent({
    __name: 'KlbUpdatePaymentMethod',
    setup(__props) {
        const store = useFVStore();
        const isAuth = vue.computed(() => store.isAuth);
        const isLoaded = vue.ref(false);
        const billing = vue.ref();
        const location = vue.ref();
        const hasBilling = vue.ref(false);
        const isEditing = vue.ref(false);
        const stripeCard = vue.ref();
        const theCard = vue.ref();
        let stripe;
        const switchToEdit = async () => {
            const _pms = await rest("Realm/PaymentMethod:methodInfo", "GET", {
                method: "Stripe",
            });
            if (_pms && _pms.data) {
                if (_pms.data.Fields && _pms.data.Fields.cc_token && _pms.data.Fields.cc_token.attributes?.key) {
                    stripe = window.Stripe(_pms.data.Fields.cc_token.attributes?.key, {});
                }
            }
            isEditing.value = true;
            if (stripe) {
                stripeCard.value = stripe.elements().create("card", { hidePostalCode: true });
                await theCard;
                stripeCard.value.mount(theCard.value);
            }
        };
        const submitEditPaymentInfo = async () => {
            let cardToken = await stripe.value.createToken(stripeCard.value, {
                name: `${location.value?.First_Name} ${location.value?.Last_Name}`,
                email: store.user?.Email,
            });
            let _updateBillingResult = await rest(`User/Billing/Method/${billing.value?.Methods[0].User_Billing_Method__}:change`, "POST", {
                method: "Stripe",
                cc_token: cardToken.token.id,
            });
            if (_updateBillingResult && _updateBillingResult.result == 'success') {
                await getUserBilling();
            }
            isEditing.value = false;
        };
        head.useHead({
            script: [
                { src: 'https://js.stripe.com/v3' },
            ],
        });
        const getUserBilling = async () => {
            if (isAuth) {
                isLoaded.value = false;
                const _userBilling = await rest('User/Billing', 'GET').catch(() => { });
                if (_userBilling && _userBilling.data) {
                    if (_userBilling.data.length != 0) {
                        hasBilling.value = true;
                        const _userLocation = await rest(`User/Location/${_userBilling.data[0].User_Location__}`, "GET").catch(() => { });
                        if (_userLocation && _userLocation.result == 'success') {
                            location.value = _userLocation.data;
                        }
                        billing.value = _userBilling.data[0];
                    }
                }
                isLoaded.value = true;
            }
        };
        vue.onMounted(async () => {
            await getUserBilling();
        });
        return (_ctx, _cache) => {
            return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                (vue.unref(isAuth))
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
                        (hasBilling.value && isLoaded.value)
                            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                                (isEditing.value)
                                    ? (vue.openBlock(), vue.createElementBlock("form", {
                                        key: 0,
                                        onSubmit: vue.withModifiers(submitEditPaymentInfo, ["prevent"])
                                    }, [
                                        vue.createElementVNode("div", _hoisted_4, [
                                            vue.createElementVNode("div", _hoisted_5, [
                                                vue.createElementVNode("label", _hoisted_6, vue.toDisplayString(_ctx.$t("payment_method_label")), 1)
                                            ]),
                                            vue.createElementVNode("div", _hoisted_7, [
                                                vue.createElementVNode("div", _hoisted_8, [
                                                    vue.createElementVNode("div", {
                                                        id: "theCard",
                                                        class: "theCard",
                                                        ref_key: "theCard",
                                                        ref: theCard
                                                    }, null, 512)
                                                ])
                                            ])
                                        ]),
                                        vue.createElementVNode("div", _hoisted_9, [
                                            vue.createElementVNode("a", {
                                                class: "btn-defaults btn neutral",
                                                onClick: _cache[0] || (_cache[0] = ($event) => (isEditing.value = false))
                                            }, vue.toDisplayString(_ctx.$t('cancel_save_payment_method')), 1),
                                            vue.createElementVNode("button", _hoisted_10, vue.toDisplayString(_ctx.$t("save_payment_method")), 1)
                                        ])
                                    ], 40, _hoisted_3))
                                    : (vue.openBlock(), vue.createElementBlock("div", _hoisted_11, [
                                        (billing.value && billing.value.Methods && billing.value.Methods.length > 0)
                                            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, [
                                                vue.createTextVNode(vue.toDisplayString(_ctx.$t("payment_method_billing")) + ": ", 1),
                                                vue.createElementVNode("b", null, vue.toDisplayString(billing.value.Methods[0].Name), 1),
                                                _hoisted_13,
                                                vue.createTextVNode(" " + vue.toDisplayString(_ctx.$t("payment_method_exp")) + ": ", 1),
                                                vue.createElementVNode("b", null, vue.toDisplayString(billing.value.Methods[0].Expiration), 1),
                                                vue.createElementVNode("button", {
                                                    class: "block font-extrabold mx-auto p-2 mt-4 btn primary",
                                                    onClick: switchToEdit
                                                }, vue.toDisplayString(_ctx.$t("edit_billing_method")), 1)
                                            ]))
                                            : vue.createCommentVNode("v-if", true)
                                    ]))
                            ]))
                            : vue.createCommentVNode("v-if", true),
                        (!hasBilling.value && isLoaded.value)
                            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_14, [
                                vue.createTextVNode(vue.toDisplayString(_ctx.$t("no_payment_method_yet")), 1),
                                _hoisted_15,
                                vue.createTextVNode(),
                                vue.createElementVNode("button", {
                                    onClick: _cache[1] || (_cache[1] = () => { _ctx.$eventBus.emit('ShowCreateBillingProfile', true); }),
                                    class: "btn primary btn-defaults"
                                }, vue.toDisplayString(_ctx.$t('add_payment_method_cta')), 1)
                            ]))
                            : vue.createCommentVNode("v-if", true)
                    ]))
                    : vue.createCommentVNode("v-if", true),
                (!isLoaded.value)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_16, [
                        vue.createVNode(script$8, {
                            id: "self-loader-fyvue",
                            force: true,
                            size: "6",
                            showLoadingText: false
                        })
                    ]))
                    : vue.createCommentVNode("v-if", true)
            ], 64));
        };
    }
});

script.__file = "src/components/klb/KlbBilling/KlbUpdatePaymentMethod.vue";

var klbComponents = {
    KlbLogin: script$5,
    KlbUpdateEmailModal: script$4,
    KlbUpdatePasswordModal: script$3,
    KlbDeleteAccount: script$2,
    KlbBillingHistory: script$1,
    KlbUpdatePaymentMethod: script
};

const cropText = (str, ml = 100, end = '...') => {
    if (str.length > ml) {
        return `${str.slice(0, ml)}${end}`;
    }
    return str;
};
const tailwindColors = {
    'fv-primary': {
        '50': '#f5f3ff',
        '100': '#ede9fe',
        '200': '#ddd6fe',
        '300': '#c4b5fd',
        '400': '#a78bfa',
        '500': '#8b5cf6',
        '600': '#7c3aed',
        '700': '#6d28d9',
        '800': '#5b21b6',
        '900': '#4c1d95',
    },
    'fv-neutral': {
        '50': '#f8fafc',
        '100': '#f1f5f9',
        '200': '#e2e8f0',
        '300': '#cbd5e1',
        '400': '#94a3b8',
        '500': '#64748b',
        '600': '#475569',
        '700': '#334155',
        '800': '#1e293b',
        '900': '#0f172a',
    },
};
const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
const jpZipcode = (zip) => {
    const _zip = zip.toString();
    if (_zip.length != 7)
        return '';
    return '〒' + _zip.slice(0, 3) + '-' + _zip.slice(3, _zip.length);
};

const components = { ...uiComponents, ...klbComponents };
const createFyvue = () => {
    const install = (app, options) => {
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
        install,
    };
};
const helpers = {
    i18next: i18next.t,
    cropText,
    formatBytes,
    tailwindColors,
    jpZipcode,
};
const helpersSSR = {
    setupClient,
    handleSSR,
    isSSRRendered,
};

exports.components = components;
exports.createFyvue = createFyvue;
exports.helpers = helpers;
exports.helpersSSR = helpersSSR;
exports.i18nextPromise = i18nextPromise;
exports.rest = rest;
exports.useEventBus = useEventBus;
exports.useFVStore = useFVStore;
exports.useHistory = useHistory;
exports.useTranslation = useTranslation;
//# sourceMappingURL=fyvue.js.map

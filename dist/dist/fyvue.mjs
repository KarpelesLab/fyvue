import { renderHeadToString, createHead } from '@vueuse/head';
import { defineStore, createPinia } from 'pinia';
import { getCurrentInstance, openBlock, createElementBlock, createElementVNode, defineComponent, h, ref, onMounted, onUnmounted, createBlock, unref, withCtx, createVNode, createTextVNode, toDisplayString, resolveDynamicComponent, normalizeClass, renderSlot, createCommentVNode, resolveComponent, Fragment, renderList, computed, normalizeStyle, toRef, withDirectives, isRef, vModelCheckbox, vModelDynamic, vModelText, vModelSelect, reactive, withModifiers } from 'vue';
import { TransitionRoot, Dialog, DialogPanel, DialogTitle, DialogOverlay } from '@headlessui/vue';
import { getLocale, rest, getUuid, getPath, getPrefix } from '@karpeleslab/klbfw';
import i18next from 'i18next';
import { useRoute, useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { renderToString } from '@vue/server-renderer';

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
    const vueInstance = getCurrentInstance();
    return vueInstance?.appContext.config.globalProperties.$eventBus;
};
const i18nextPromise = i18next.use(Backend).init({
    ns: ["translation"],
    defaultNS: "translation",
    debug: false,
    lng: getLocale(),
    load: "currentOnly",
    initImmediate: false,
});
const useTranslation = () => {
    const vueInstance = getCurrentInstance();
    return vueInstance?.appContext.config.globalProperties.$t;
};

function render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z",
      "clip-rule": "evenodd"
    })
  ]))
}

const _hoisted_1$b = { class: "parent" };
var script$b = defineComponent({
    __name: 'FyModal',
    props: {
        id: { type: String, required: true },
        title: { type: String, required: false },
        onOpen: { type: Function, required: false },
        onClose: { type: Function, required: false },
        closeIcon: { type: Object, required: false, default: () => h(render) }
    },
    setup(__props) {
        const props = __props;
        const eventBus = useEventBus();
        const isOpen = ref(false);
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
                            createElementVNode("div", _hoisted_1$b, [
                                createVNode(unref(DialogPanel), { class: "modal-container" }, {
                                    default: withCtx(() => [
                                        (__props.title)
                                            ? (openBlock(), createBlock(unref(DialogTitle), {
                                                key: 0,
                                                class: "title"
                                            }, {
                                                default: withCtx(() => [
                                                    createTextVNode(toDisplayString(__props.title) + " ", 1),
                                                    createElementVNode("a", {
                                                        href: "javascript:void(0)",
                                                        onClick: _cache[0] || (_cache[0] = ($event) => (setModal(false)))
                                                    }, [
                                                        (openBlock(), createBlock(resolveDynamicComponent(__props.closeIcon), { class: "close-icon" }))
                                                    ])
                                                ]),
                                                _: 1
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
const _hoisted_3$8 = createElementVNode("path", {
    class: "circle-bg",
    d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
}, null, -1);
const _hoisted_4$6 = ["stroke-dasharray", "stroke"];
const _hoisted_5$6 = ["x", "y"];
var script$a = defineComponent({
    __name: 'FyCirclePercent',
    props: {
        percent: { type: Number, required: true, default: 100 },
        textXY: { type: Array, required: false, default: () => [18, 20.85] },
        color: { type: String, required: false, default: "blue" }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1$a, [
                (openBlock(), createElementBlock("svg", _hoisted_2$a, [
                    _hoisted_3$8,
                    createElementVNode("path", {
                        class: "circle",
                        "stroke-dasharray": `${__props.percent}, 100`,
                        stroke: __props.color,
                        d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    }, null, 8, _hoisted_4$6),
                    createElementVNode("text", {
                        x: __props.textXY[0].toString(),
                        y: __props.textXY[1].toString(),
                        class: "percentage"
                    }, toDisplayString(__props.percent) + "%", 9, _hoisted_5$6)
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
const _hoisted_5$5 = createElementVNode("br", null, null, -1);
const _hoisted_6$4 = { class: "btn-box" };
var script$9 = defineComponent({
    __name: 'FyConfirm',
    setup(__props) {
        const eventBus = useEventBus();
        const confirm = ref(false);
        const title = ref(null);
        const desc = ref(null);
        const onConfirm = ref(null);
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
        onMounted(() => {
            eventBus.on('resetConfirm', resetConfirm);
            eventBus.on('showConfirm', showConfirm);
        });
        onUnmounted(() => {
            eventBus.off('resetConfirm', resetConfirm);
            eventBus.off('showConfirm', showConfirm);
        });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", null, [
                createVNode(unref(Dialog), {
                    open: confirm.value,
                    onClose: _cache[2] || (_cache[2] = ($event) => (confirm.value = false)),
                    class: "fy-modal is-confirm",
                    style: { "background": "rgba(0, 0, 0, 0.6)", "z-index": "43 !important" }
                }, {
                    default: withCtx(() => [
                        createElementVNode("div", _hoisted_1$9, [
                            createVNode(unref(DialogOverlay)),
                            createElementVNode("div", _hoisted_2$9, [
                                createElementVNode("div", null, [
                                    createVNode(unref(DialogTitle), { class: "title" }, {
                                        default: withCtx(() => [
                                            createTextVNode(toDisplayString(title.value), 1)
                                        ]),
                                        _: 1
                                    }),
                                    createElementVNode("div", _hoisted_3$7, [
                                        (desc.value)
                                            ? (openBlock(), createElementBlock("div", _hoisted_4$5, toDisplayString(desc.value), 1))
                                            : createCommentVNode("v-if", true),
                                        _hoisted_5$5,
                                        createElementVNode("div", _hoisted_6$4, [
                                            createElementVNode("button", {
                                                onClick: _cache[0] || (_cache[0] = ($event) => (confirm.value = false)),
                                                class: "btn neutral btn-defaults"
                                            }, toDisplayString(_ctx.$t("confirm_modal_cta_cancel")), 1),
                                            createElementVNode("button", {
                                                onClick: _cache[1] || (_cache[1] = ($event) => (_onConfirm())),
                                                class: "btn primary btn-defaults"
                                            }, toDisplayString(_ctx.$t("confirm_modal_cta_confirm")), 1)
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
var script$8 = defineComponent({
    __name: 'FyBreadcrumb',
    props: {
        nav: { type: Array, required: true, default: () => [] },
        maxLength: { type: Number, required: false, default: 32 }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            const _component_router_link = resolveComponent("router-link");
            return (openBlock(), createElementBlock("nav", _hoisted_1$8, [
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
                                            createTextVNode(toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1)
                                        ]),
                                        _: 2
                                    }, 1032, ["to"]),
                                    createVNode(unref(render$4), { class: "icon bc-innactive" })
                                ]))
                                : (openBlock(), createElementBlock("li", {
                                    key: `e-${item.to}`,
                                    class: "bc-current"
                                }, [
                                    createElementVNode("span", _hoisted_2$8, toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1)
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
var script$7 = defineComponent({
    __name: 'FySteps',
    props: {
        steps: { type: Array, required: false, default: () => [] },
        currentStep: { type: Number, required: false, default: 1 }
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
            return (openBlock(), createElementBlock("div", _hoisted_1$7, [
                createElementVNode("div", _hoisted_2$7, [
                    createElementVNode("div", {
                        class: "bar",
                        style: normalizeStyle(`width:${unref(barWidth)}%`)
                    }, null, 4)
                ]),
                createElementVNode("ol", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.steps, (step, index) => {
                        return (openBlock(), createElementBlock("li", {
                            key: index,
                            class: normalizeClass(getStepClass(index))
                        }, [
                            createElementVNode("span", _hoisted_3$6, toDisplayString(_ctx.$t(step.name)), 1),
                            (step.icon)
                                ? (openBlock(), createBlock(resolveDynamicComponent(step.icon), {
                                    key: 0,
                                    class: "icon"
                                }))
                                : createCommentVNode("v-if", true)
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
var script$6 = defineComponent({
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
                ? (openBlock(), createElementBlock("table", _hoisted_1$6, [
                    (__props.showHeaders)
                        ? (openBlock(), createElementBlock("thead", _hoisted_2$6, [
                            createElementVNode("tr", null, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, (title) => {
                                    return (openBlock(), createElementBlock("th", {
                                        key: `header_${title}`
                                    }, toDisplayString(title), 1));
                                }), 128))
                            ])
                        ]))
                        : createCommentVNode("v-if", true),
                    createElementVNode("tbody", null, [
                        (__props.data)
                            ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.data, (item, index) => {
                                return (openBlock(), createElementBlock("tr", {
                                    key: index,
                                    class: normalizeClass(`tr ${bgColor(index)} `)
                                }, [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, (title, property) => {
                                        return (openBlock(), createElementBlock("td", {
                                            key: title,
                                            class: "td"
                                        }, [
                                            createElementVNode("div", _hoisted_3$5, toDisplayString(title), 1),
                                            createElementVNode("div", _hoisted_4$4, [
                                                renderSlot(_ctx.$slots, `${property}_item`, {
                                                    data: { prop: item[property], item: item, idx: index }
                                                }, () => [
                                                    (item[property])
                                                        ? (openBlock(), createElementBlock("span", _hoisted_5$4, toDisplayString(item[property].toString()), 1))
                                                        : (openBlock(), createElementBlock("span", _hoisted_6$3, "n/a"))
                                                ])
                                            ])
                                        ]));
                                    }), 128))
                                ], 2));
                            }), 128))
                            : createCommentVNode("v-if", true)
                    ])
                ]))
                : createCommentVNode("v-if", true);
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
var script$5 = defineComponent({
    __name: 'FyTable',
    props: {
        showHeaders: { type: Boolean, required: false, default: true },
        headers: { type: null, required: true },
        data: { type: Array, required: false, default: () => [] }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (__props.data && __props.data.length)
                ? (openBlock(), createElementBlock("div", _hoisted_1$5, [
                    createElementVNode("div", _hoisted_2$5, [
                        createElementVNode("table", null, [
                            (__props.showHeaders)
                                ? (openBlock(), createElementBlock("thead", _hoisted_3$4, [
                                    createElementVNode("tr", null, [
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, (title, property) => {
                                            return (openBlock(), createElementBlock("th", { key: property }, toDisplayString(title), 1));
                                        }), 128))
                                    ])
                                ]))
                                : createCommentVNode("v-if", true),
                            createElementVNode("tbody", null, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data, (item, index) => {
                                    return (openBlock(), createElementBlock("tr", { key: index }, [
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, (_, property) => {
                                            return (openBlock(), createElementBlock("td", {
                                                key: `${property}`
                                            }, [
                                                renderSlot(_ctx.$slots, `${property}_item`, {
                                                    data: {
                                                        prop: item[property],
                                                        item: item,
                                                        idx: index,
                                                    }
                                                }, () => [
                                                    (item[property])
                                                        ? (openBlock(), createElementBlock("span", _hoisted_4$3, toDisplayString(item[property]), 1))
                                                        : (openBlock(), createElementBlock("span", _hoisted_5$3, "n/a"))
                                                ])
                                            ]));
                                        }), 128))
                                    ]));
                                }), 128))
                            ])
                        ])
                    ])
                ]))
                : createCommentVNode("v-if", true);
        };
    }
});

script$5.__file = "src/components/ui/FyTable/FyTable.vue";

const _hoisted_1$4 = createElementVNode("path", {
    d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
    fill: "currentColor"
}, null, -1);
const _hoisted_2$4 = createElementVNode("path", {
    d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
    fill: "currentFill"
}, null, -1);
const _hoisted_3$3 = [
    _hoisted_1$4,
    _hoisted_2$4
];
var script$4 = defineComponent({
    __name: 'DefaultLoader',
    props: {
        size: { type: String, required: false, default: "16" },
        showLoadingText: { type: Boolean, required: true, default: true }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock(Fragment, null, [
                (openBlock(), createElementBlock("svg", {
                    style: normalizeStyle(`width: ${(parseInt(__props.size) / 2).toString()}rem; height: ${(parseInt(__props.size) / 2).toString()}rem;`),
                    "aria-hidden": "true",
                    class: "default-loader",
                    viewBox: "0 0 100 101",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                }, _hoisted_3$3, 4)),
                createElementVNode("span", {
                    class: normalizeClass(!__props.showLoadingText ? 'is-sr' : 'loader-text')
                }, toDisplayString(_ctx.$t('global_loading_text')), 3)
            ], 64));
        };
    }
});

script$4.__file = "src/components/ui/FyLoader/DefaultLoader.vue";

const _hoisted_1$3 = { key: 0 };
const _hoisted_2$3 = { class: "fy-loader" };
var script$3 = defineComponent({
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
        const loading = ref(false);
        const setLoading = (value) => {
            loading.value = value;
        };
        onMounted(() => {
            if (props.id) {
                eventBus.on(`${props.id}-loading`, setLoading);
            }
            else {
                eventBus.on("loading", setLoading);
            }
        });
        onUnmounted(() => {
            if (props.id) {
                eventBus.off(`${props.id}-loading`, setLoading);
            }
            else {
                eventBus.off("loading", setLoading);
            }
        });
        return (_ctx, _cache) => {
            return (loading.value || __props.force)
                ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
                    createElementVNode("div", _hoisted_2$3, [
                        createElementVNode("div", {
                            class: "loader-container",
                            role: "status",
                            style: normalizeStyle(`width:${__props.size}rem; height:${__props.size}rem;`)
                        }, [
                            (openBlock(), createBlock(resolveDynamicComponent(__props.loader), {
                                size: __props.size,
                                showLoadingText: __props.showLoadingText
                            }, null, 8, ["size", "showLoadingText"]))
                        ], 4)
                    ])
                ]))
                : createCommentVNode("v-if", true);
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
var script$2 = defineComponent({
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
        const inputRef = ref();
        const errorProps = toRef(props, 'error');
        const errorVuelidateProps = toRef(props, 'errorVuelidate');
        const checkErrors = computed(() => {
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
        expose({ focus });
        const model = computed({
            get: () => props.modelValue,
            set: items => {
                emit('update:modelValue', items);
            }
        });
        const modelCheckbox = computed({
            get: () => props.checkboxValue,
            set: items => {
                emit('update:checkboxValue', items);
            }
        });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1$2, [
                (__props.showLabel && __props.id && __props.label)
                    ? (openBlock(), createElementBlock("label", {
                        key: 0,
                        class: "label-basic",
                        for: __props.id
                    }, [
                        (__props.type == 'checkbox')
                            ? withDirectives((openBlock(), createElementBlock("input", {
                                key: 0,
                                "aria-label": __props.label,
                                ref: `inputRef`,
                                type: "checkbox",
                                class: normalizeClass(["form-checkbox", { 'error-form': unref(checkErrors) }]),
                                id: __props.id,
                                "true-value": __props.checkboxTrueValue,
                                "false-value": __props.checkboxFalseValue,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (isRef(modelCheckbox) ? (modelCheckbox).value = $event : null))
                            }, null, 10, _hoisted_3$2)), [
                                [vModelCheckbox, unref(modelCheckbox)]
                            ])
                            : createCommentVNode("v-if", true),
                        createTextVNode(" " + toDisplayString(__props.label) + " ", 1),
                        (__props.linkIcon)
                            ? (openBlock(), createElementBlock("a", {
                                key: 1,
                                class: "link-icon",
                                href: __props.linkIcon,
                                target: "_blank"
                            }, [
                                createVNode(unref(render$1))
                            ], 8, _hoisted_4$2))
                            : createCommentVNode("v-if", true),
                        (__props.req)
                            ? (openBlock(), createElementBlock("sup", _hoisted_5$2, "*"))
                            : createCommentVNode("v-if", true)
                    ], 8, _hoisted_2$2))
                    : createCommentVNode("v-if", true),
                (!['checkbox', 'radiobox'].includes(__props.type))
                    ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
                        renderSlot(_ctx.$slots, "before"),
                        (['text', 'password', 'email', 'search'].includes(__props.type))
                            ? withDirectives((openBlock(), createElementBlock("input", {
                                key: 0,
                                ref: `inputRef`,
                                "aria-label": __props.label,
                                class: normalizeClass(["input-basic", { 'error-form': __props.error }]),
                                placeholder: __props.placeholder,
                                autocomplete: __props.autocomplete,
                                id: __props.id,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => (isRef(model) ? (model).value = $event : null)),
                                type: __props.type
                            }, null, 10, _hoisted_7$2)), [
                                [vModelDynamic, unref(model)]
                            ])
                            : createCommentVNode("v-if", true),
                        (__props.type == 'textarea')
                            ? withDirectives((openBlock(), createElementBlock("textarea", {
                                key: 1,
                                "aria-label": __props.label,
                                ref: `inputRef`,
                                class: normalizeClass(["input-basic is-textarea", { 'error-form': unref(checkErrors) }]),
                                placeholder: __props.placeholder,
                                autocomplete: __props.autocomplete,
                                id: __props.id,
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => (isRef(model) ? (model).value = $event : null))
                            }, null, 10, _hoisted_8$2)), [
                                [vModelText, unref(model)]
                            ])
                            : createCommentVNode("v-if", true),
                        (__props.type == 'select')
                            ? withDirectives((openBlock(), createElementBlock("select", {
                                key: 2,
                                "aria-label": __props.label,
                                ref: `inputRef`,
                                id: __props.id,
                                class: "input-basic",
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => (isRef(model) ? (model).value = $event : null))
                            }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (opt) => {
                                    return (openBlock(), createElementBlock("option", {
                                        value: opt[0],
                                        key: opt[0].toString()
                                    }, toDisplayString(opt[1]), 9, _hoisted_10$2));
                                }), 128))
                            ], 8, _hoisted_9$2)), [
                                [vModelSelect, unref(model)]
                            ])
                            : createCommentVNode("v-if", true),
                        renderSlot(_ctx.$slots, "after")
                    ]))
                    : createCommentVNode("v-if", true),
                (__props.help)
                    ? (openBlock(), createElementBlock("div", _hoisted_11$1, toDisplayString(__props.help), 1))
                    : createCommentVNode("v-if", true),
                (unref(checkErrors))
                    ? (openBlock(), createElementBlock("div", _hoisted_12, toDisplayString(unref(checkErrors)), 1))
                    : createCommentVNode("v-if", true)
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
var script$1 = defineComponent({
    __name: 'FyPaging',
    props: {
        items: { type: null, required: true },
        id: { type: String, required: true }
    },
    setup(__props) {
        const props = __props;
        const eventBus = useEventBus();
        const route = useRoute();
        const router = useRouter();
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
        onMounted(() => {
            const routePage = parseInt(getRoutePage());
            if (!isNaN(routePage) && props.items) {
                eventBus.emit(`${props.id}GoToPage`, routePage);
            }
        });
        return (_ctx, _cache) => {
            return (__props.items && __props.items.page_max > 1 && __props.items.page_no)
                ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
                    createElementVNode("div", null, [
                        createElementVNode("nav", _hoisted_2$1, [
                            (__props.items.page_no >= 2)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 0,
                                    href: "javascript:void(0);",
                                    onClick: _cache[0] || (_cache[0] = ($event) => (prev())),
                                    class: "prev-next"
                                }, [
                                    createElementVNode("span", _hoisted_3$1, toDisplayString(_ctx.$t('previous_paging')), 1),
                                    createVNode(unref(render$3), { class: "fv-icon-base" })
                                ]))
                                : createCommentVNode("v-if", true),
                            (__props.items.page_no - 2 > 1)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 1,
                                    class: "innactive",
                                    href: "javascript:void(0);",
                                    onClick: _cache[1] || (_cache[1] = ($event) => (page(1)))
                                }, " 1 "))
                                : createCommentVNode("v-if", true),
                            (__props.items.page_no - 2 > 2)
                                ? (openBlock(), createElementBlock("span", _hoisted_4$1, " ... "))
                                : createCommentVNode("v-if", true),
                            (openBlock(), createElementBlock(Fragment, null, renderList(2, (i) => {
                                return (openBlock(), createElementBlock(Fragment, null, [
                                    (__props.items.page_no - (3 - i) >= 1)
                                        ? (openBlock(), createElementBlock("a", {
                                            class: "innactive",
                                            href: "javascript:void(0);",
                                            key: `${i}-sm`,
                                            onClick: ($event) => (page(__props.items.page_no - (3 - i)))
                                        }, toDisplayString(__props.items.page_no - (3 - i)), 9, _hoisted_5$1))
                                        : createCommentVNode("v-if", true)
                                ], 64));
                            }), 64)),
                            createElementVNode("a", _hoisted_6$1, toDisplayString(__props.items.page_no), 1),
                            (openBlock(), createElementBlock(Fragment, null, renderList(2, (i) => {
                                return (openBlock(), createElementBlock(Fragment, null, [
                                    (__props.items.page_no + i <= __props.items.page_max)
                                        ? (openBlock(), createElementBlock("a", {
                                            class: "innactive",
                                            href: "javascript:void(0);",
                                            key: `${i}-md`,
                                            onClick: ($event) => (page(__props.items.page_no + i))
                                        }, toDisplayString(__props.items.page_no + i), 9, _hoisted_7$1))
                                        : createCommentVNode("v-if", true)
                                ], 64));
                            }), 64)),
                            (__props.items.page_no + 2 < __props.items.page_max - 1)
                                ? (openBlock(), createElementBlock("span", _hoisted_8$1, " ... "))
                                : createCommentVNode("v-if", true),
                            (__props.items.page_no + 2 < __props.items.page_max)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 4,
                                    class: "innactive",
                                    href: "javascript:void(0);",
                                    onClick: _cache[2] || (_cache[2] = ($event) => (page(__props.items.page_max)))
                                }, toDisplayString(__props.items.page_max), 1))
                                : createCommentVNode("v-if", true),
                            (__props.items.page_no < __props.items.page_max - 1)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 5,
                                    href: "javascript:void(0);",
                                    onClick: _cache[3] || (_cache[3] = ($event) => (next())),
                                    class: "prev-next"
                                }, [
                                    createElementVNode("span", _hoisted_9$1, toDisplayString(_ctx.$t('next_paging')), 1),
                                    createVNode(unref(render$2), { class: "fv-icon-base" })
                                ]))
                                : createCommentVNode("v-if", true)
                        ]),
                        createElementVNode("p", _hoisted_10$1, toDisplayString(_ctx.$t("global_paging", {
                            start: __props.items.results_per_page * (__props.items.page_no - 1),
                            end: __props.items.results_per_page * __props.items.page_no,
                            total: __props.items.count >= 10000 ? _ctx.$t('paging_a_lot_of') : __props.items.count,
                        })), 1)
                    ])
                ]))
                : createCommentVNode("v-if", true);
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

const useFVStore = defineStore({
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
            const apiData = await rest("User:get", "GET")
                .catch((err) => { });
            if (apiData.result == 'success' && apiData.data != null) {
                this.user = apiData.data;
            }
            else {
                this.user = null;
            }
        },
        async logout() {
            const apiData = await rest("User:logout", "Post")
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
const _hoisted_10 = createElementVNode("br", { style: { "clear": "both" } }, null, -1);
const _hoisted_11 = { key: 1 };
var script = defineComponent({
    __name: 'KlbLogin',
    props: {
        returnDefault: { type: String, required: false, default: "/" },
        forceAction: { type: String, required: false }
    },
    setup(__props) {
        const props = __props;
        const state = reactive({
            userEmail: "",
        });
        const rules = {
            userEmail: { required },
        };
        const store = useFVStore();
        const v$ = useVuelidate(rules, state);
        const route = useRoute();
        const router = useRouter();
        const eventBus = useEventBus();
        const returnTo = ref(props.returnDefault);
        const responseMessage = ref(null);
        const responseError = ref();
        const responseReq = ref([]);
        const responseFields = ref([]);
        const response = ref();
        const hasOauth = ref(false);
        const fieldsError = ref({});
        const pwdRecoverMailSent = ref(false);
        const pwdRecoverError = ref();
        const inputs = ref([]);
        const formData = ref({
            return_to: props.returnDefault,
            session: null,
            action: props.forceAction ? props.forceAction : undefined,
        });
        const completed = ref(false);
        const forgotPassword = async () => {
            if (await v$.value.$validate()) {
                let data = await rest("User:forgot_password", "POST", {
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
            response.value = await rest("User:flow", "POST", formData.value).catch((err) => {
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
        onMounted(async () => {
            await userFlow({ initial: true });
        });
        return (_ctx, _cache) => {
            const _component_FyLoader = resolveComponent("FyLoader");
            const _component_FyModal = resolveComponent("FyModal");
            return (openBlock(), createElementBlock("div", null, [
                (!completed.value)
                    ? (openBlock(), createElementBlock("form", {
                        key: 0,
                        onSubmit: _cache[1] || (_cache[1] = withModifiers(($event) => (userFlow()), ["prevent"])),
                        class: "klb-login"
                    }, [
                        createVNode(_component_FyLoader, { id: "klblogin" }),
                        createElementVNode("div", _hoisted_1, [
                            (responseMessage.value)
                                ? (openBlock(), createElementBlock("h2", _hoisted_2, toDisplayString(responseMessage.value), 1))
                                : createCommentVNode("v-if", true),
                            (responseFields.value.length > 0)
                                ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(responseFields.value, (field) => {
                                        return (openBlock(), createElementBlock(Fragment, {
                                            key: field.label
                                        }, [
                                            (field.type == 'label')
                                                ? (openBlock(), createElementBlock("h3", {
                                                    key: 0,
                                                    class: normalizeClass(["label", field.style == 'error' ? 'response-error' : ''])
                                                }, toDisplayString(field.label), 3))
                                                : createCommentVNode("v-if", true),
                                            (field.cat == 'input')
                                                ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                                    (field.type == 'text' ||
                                                        field.type == 'password' ||
                                                        field.type == 'email')
                                                        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                                            (field.name)
                                                                ? (openBlock(), createBlock(script$2, {
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
                                                                : createCommentVNode("v-if", true)
                                                        ], 64))
                                                        : createCommentVNode("v-if", true)
                                                ], 64))
                                                : createCommentVNode("v-if", true),
                                            (field.type == 'checkbox')
                                                ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                                                    (field.name)
                                                        ? (openBlock(), createBlock(script$2, {
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
                                                        : createCommentVNode("v-if", true)
                                                ], 64))
                                                : createCommentVNode("v-if", true)
                                        ], 64));
                                    }), 128)),
                                    (hasOauth.value)
                                        ? (openBlock(), createElementBlock("div", _hoisted_3, [
                                            (openBlock(true), createElementBlock(Fragment, null, renderList(responseFields.value, (field) => {
                                                return (openBlock(), createElementBlock(Fragment, {
                                                    key: field.id
                                                }, [
                                                    (field.type && field.type == 'oauth2' && field.button)
                                                        ? (openBlock(), createElementBlock("a", {
                                                            key: 0,
                                                            onClick: () => {
                                                                userFlow({ initial: true, oauth: field.id });
                                                            },
                                                            href: "javascript:void(0);"
                                                        }, [
                                                            (openBlock(), createElementBlock("img", {
                                                                key: `${field.label}oauth`,
                                                                class: "oauth-button",
                                                                alt: field.info.Name,
                                                                src: field.button.logo,
                                                                style: normalizeStyle(`background: ${field.button['background-color']}`)
                                                            }, null, 12, _hoisted_5))
                                                        ], 8, _hoisted_4))
                                                        : createCommentVNode("v-if", true)
                                                ], 64));
                                            }), 128))
                                        ]))
                                        : createCommentVNode("v-if", true),
                                    (responseError.value)
                                        ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(_ctx.$t(responseError.value.token)), 1))
                                        : createCommentVNode("v-if", true),
                                    (responseReq.value.includes('password') && 0)
                                        ? (openBlock(), createElementBlock("div", _hoisted_7, [
                                            createElementVNode("a", {
                                                href: "javascript:void(0)",
                                                onClick: _cache[0] || (_cache[0] =
                                                    () => {
                                                        unref(eventBus).emit('ResetPasswordModal', true);
                                                        pwdRecoverMailSent.value = false;
                                                    })
                                            }, toDisplayString(_ctx.$t("recover_pwd_link")), 1)
                                        ]))
                                        : createCommentVNode("v-if", true),
                                    createElementVNode("button", _hoisted_8, toDisplayString(_ctx.$t("cta_login_next")), 1)
                                ], 64))
                                : createCommentVNode("v-if", true)
                        ])
                    ], 32))
                    : createCommentVNode("v-if", true),
                createVNode(_component_FyModal, {
                    id: "ResetPassword",
                    title: `${_ctx.$t('recover_pwd_title')}`
                }, {
                    default: withCtx(() => [
                        (!pwdRecoverMailSent.value)
                            ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                createVNode(script$2, {
                                    id: "emailRecover",
                                    req: true,
                                    showLabel: true,
                                    placeholder: _ctx.$t('recover_pwd_email_placeholder'),
                                    modelValue: state.userEmail,
                                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => ((state.userEmail) = $event)),
                                    errorVuelidate: unref(v$).userEmail.$errors,
                                    type: "email",
                                    label: _ctx.$t('recover_pwd_email_label')
                                }, null, 8, ["placeholder", "modelValue", "errorVuelidate", "label"]),
                                (pwdRecoverError.value)
                                    ? (openBlock(), createElementBlock("div", _hoisted_9, toDisplayString(_ctx.$t(pwdRecoverError.value.token)), 1))
                                    : createCommentVNode("v-if", true),
                                createElementVNode("a", {
                                    href: "javascript:void(0)",
                                    onClick: _cache[3] || (_cache[3] = ($event) => (forgotPassword())),
                                    class: "mt-2 float-right btn px-5 py-2 primary"
                                }, toDisplayString(_ctx.$t("recover_pwd_cta")), 1),
                                _hoisted_10
                            ], 64))
                            : (openBlock(), createElementBlock("div", _hoisted_11, toDisplayString(_ctx.$t("pwd_recover_confirm")), 1))
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

async function handleSSR(createApp, cb, options = { 'routerNotFound': 'NotFound', 'router404Route': '/404' }) {
    const { app, router, head } = await createApp(true);
    const result = { uuid: getUuid(), initial: {} };
    const ctx = {};
    const url = `${getPath()}`;
    router.push(url);
    await router.isReady();
    let appHtml = "";
    try {
        appHtml = await renderToString(app, ctx);
    }
    catch (e) {
        router.push(`${getPrefix()}${options.router404Route}`);
        await router.isReady();
        appHtml = await renderToString(app, ctx);
        result.statusCode = 404;
        result.app = appHtml;
        return cb(result);
    }
    if (url != router.currentRoute.value.fullPath) {
        result.statusCode = 307;
        result.redirect = router.currentRoute.value.fullPath;
        return cb(result);
    }
    const { headTags, htmlAttrs, bodyAttrs, bodyTags } = renderHeadToString(head);
    result.meta = headTags;
    result.bodyAttributes = bodyAttrs;
    result.htmlAttributes = htmlAttrs;
    result.bodyTags = bodyTags;
    result.app = appHtml;
    if (router.currentRoute.value.name == options.routerNotFound)
        result.statusCode = 404;
    if (router.currentRoute.value.meta.statusCode && router.currentRoute.value.meta.statusCode != 200) {
        if ([301, 302, 303, 307].includes(router.currentRoute.value.meta.statusCode)) {
            if (router.currentRoute.value.meta.redirect) {
                result.statusCode = router.currentRoute.value.meta.statusCode;
                result.redirect = router.currentRoute.value.meta.redirect;
            }
        }
        else {
            result.statusCode = router.currentRoute.value.meta.statusCode;
        }
    }
    return cb(result);
}

const components = { ...uiComponents, ...klbComponents };
const head = createHead();
const helpers = {
    i18next: i18next.t, cropText, formatBytes, tailwindColors, head, jpZipcode
};
const createFyvue = () => {
    const install = (app, options) => {
        app.use(head);
        app.use(createPinia());
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

export { components, createFyvue, handleSSR, helpers, i18nextPromise, useEventBus, useFVStore, useTranslation };
//# sourceMappingURL=fyvue.mjs.map

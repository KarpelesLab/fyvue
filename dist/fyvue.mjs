import { createHead } from '@vueuse/head';
import { getCurrentInstance, defineComponent, ref, onMounted, onUnmounted, openBlock, createBlock, unref, withCtx, createVNode, createElementVNode, createTextVNode, toDisplayString, resolveDynamicComponent, createElementBlock, normalizeClass, renderSlot, computed, normalizeStyle, Fragment, renderList, createCommentVNode } from 'vue';
import { TransitionRoot, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { getLocale } from '@karpeleslab/klbfw';
import i18next from 'i18next';
import { XCircleIcon } from '@heroicons/vue/24/solid';

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

const _hoisted_1$2 = { class: "parent" };
var script$2 = /*#__PURE__*/ defineComponent({
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
                            createElementVNode("div", _hoisted_1$2, [
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

script$2.__file = "src/components/ui/FyModal/FyModal.vue";

const _hoisted_1$1 = { class: "fy-circle-percent" };
const _hoisted_2$1 = {
    viewBox: "0 0 36 36",
    class: "circular-chart"
};
const _hoisted_3$1 = /*#__PURE__*/ createElementVNode("path", {
    class: "circle-bg",
    d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
}, null, -1 /* HOISTED */);
const _hoisted_4 = ["stroke-dasharray", "stroke"];
const _hoisted_5 = ["x", "y"];
var script$1 = /*#__PURE__*/ defineComponent({
    __name: 'FyCirclePercent',
    props: {
        percent: { type: Number, default: 100 },
        textXY: { type: (Array), default: [18, 20.85] },
        color: { type: String, default: "blue" }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1$1, [
                (openBlock(), createElementBlock("svg", _hoisted_2$1, [
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

script$1.__file = "src/components/ui/FyCirclePercent/FyCirclePercent.vue";

const _hoisted_1 = { class: "fy-step-bar" };
const _hoisted_2 = { class: "bar-bg" };
const _hoisted_3 = { class: "label" };
var script = /*#__PURE__*/ defineComponent({
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
            return (openBlock(), createElementBlock("div", _hoisted_1, [
                createElementVNode("div", _hoisted_2, [
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

script.__file = "src/components/ui/FySteps/FySteps.vue";

var uiComponents = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FyModal: script$2,
  FyCirclePercent: script$1,
  FySteps: script
});

const head = createHead();
const createFyvue = () => {
    const install = (app, options) => {
        app.use(head);
        app.config.globalProperties.$eventBus = eventBus;
        app.config.globalProperties.$t = i18next.t;
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

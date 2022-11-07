(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@vueuse/head'), require('vue'), require('@headlessui/vue'), require('@karpeleslab/klbfw'), require('i18next'), require('@heroicons/vue/24/solid')) :
  typeof define === 'function' && define.amd ? define(['exports', '@vueuse/head', 'vue', '@headlessui/vue', '@karpeleslab/klbfw', 'i18next', '@heroicons/vue/24/solid'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.fyvue = {}, global.head$1, global.vue, global.vue$1, global.klbfw, global.i18next, global.solid));
})(this, (function (exports, head$1, vue, vue$1, klbfw, i18next, solid) { 'use strict';

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

  const _hoisted_1$6 = { class: "parent" };
  var script$6 = vue.defineComponent({
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
                              vue.createElementVNode("div", _hoisted_1$6, [
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

  script$6.__file = "src/components/ui/FyModal/FyModal.vue";

  const _hoisted_1$5 = { class: "fy-circle-percent" };
  const _hoisted_2$5 = {
      viewBox: "0 0 36 36",
      class: "circular-chart"
  };
  const _hoisted_3$4 = vue.createElementVNode("path", {
      class: "circle-bg",
      d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
  }, null, -1);
  const _hoisted_4$3 = ["stroke-dasharray", "stroke"];
  const _hoisted_5$3 = ["x", "y"];
  var script$5 = vue.defineComponent({
      __name: 'FyCirclePercent',
      props: {
          percent: { type: Number, default: 100 },
          textXY: { type: (Array), default: [18, 20.85] },
          color: { type: String, default: "blue" }
      },
      setup(__props) {
          return (_ctx, _cache) => {
              return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
                  (vue.openBlock(), vue.createElementBlock("svg", _hoisted_2$5, [
                      _hoisted_3$4,
                      vue.createElementVNode("path", {
                          class: "circle",
                          "stroke-dasharray": `${__props.percent}, 100`,
                          stroke: __props.color,
                          d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
                      }, null, 8, _hoisted_4$3),
                      vue.createElementVNode("text", {
                          x: __props.textXY[0].toString(),
                          y: __props.textXY[1].toString(),
                          class: "percentage"
                      }, vue.toDisplayString(__props.percent) + "%", 9, _hoisted_5$3)
                  ]))
              ]));
          };
      }
  });

  script$5.__file = "src/components/ui/FyCirclePercent/FyCirclePercent.vue";

  const _hoisted_1$4 = { class: "parent" };
  const _hoisted_2$4 = {
      class: "modal-container",
      style: { "width": "350px !important" }
  };
  const _hoisted_3$3 = { class: "modal-content" };
  const _hoisted_4$2 = {
      key: 0,
      class: "confirm-modal-desc default-p"
  };
  const _hoisted_5$2 = vue.createElementVNode("br", null, null, -1);
  const _hoisted_6$1 = { class: "btn-box" };
  var script$4 = vue.defineComponent({
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
                          vue.createElementVNode("div", _hoisted_1$4, [
                              vue.createVNode(vue.unref(vue$1.DialogOverlay)),
                              vue.createElementVNode("div", _hoisted_2$4, [
                                  vue.createElementVNode("div", null, [
                                      vue.createVNode(vue.unref(vue$1.DialogTitle), { class: "title" }, {
                                          default: vue.withCtx(() => [
                                              vue.createTextVNode(vue.toDisplayString(title.value), 1)
                                          ]),
                                          _: 1
                                      }),
                                      vue.createElementVNode("div", _hoisted_3$3, [
                                          (desc.value)
                                              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$2, vue.toDisplayString(desc.value), 1))
                                              : vue.createCommentVNode("v-if", true),
                                          _hoisted_5$2,
                                          vue.createElementVNode("div", _hoisted_6$1, [
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

  script$4.__file = "src/components/ui/FyConfirm/FyConfirm.vue";

  const _hoisted_1$3 = {
      class: "fy-breadcrumb",
      "aria-label": "Breadcrumb"
  };
  const _hoisted_2$3 = { class: "bc-innactive" };
  var script$3 = vue.defineComponent({
      __name: 'FyBreadcrumb',
      props: {
          nav: { type: (Array), default: [] },
          maxLength: { type: Number, default: 15 }
      },
      setup(__props) {
          return (_ctx, _cache) => {
              const _component_router_link = vue.resolveComponent("router-link");
              return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
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
                                      vue.createElementVNode("span", _hoisted_2$3, vue.toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1)
                                  ]))
                          ], 64));
                      }), 256))
                  ])
              ]));
          };
      }
  });

  script$3.__file = "src/components/ui/FyBreadcrumb/FyBreadcrumb.vue";

  const _hoisted_1$2 = { class: "fy-step-bar" };
  const _hoisted_2$2 = { class: "bar-bg" };
  const _hoisted_3$2 = { class: "label" };
  var script$2 = vue.defineComponent({
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
              return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
                  vue.createElementVNode("div", _hoisted_2$2, [
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
                              vue.createElementVNode("span", _hoisted_3$2, vue.toDisplayString(_ctx.$t(step.name)), 1),
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

  script$2.__file = "src/components/ui/FySteps/FySteps.vue";

  const _hoisted_1$1 = {
      key: 0,
      class: "border-collapse w-full md:mx-0 fy-datatable"
  };
  const _hoisted_2$1 = { key: 0 };
  const _hoisted_3$1 = { class: "div" };
  const _hoisted_4$1 = { class: "div-cell" };
  const _hoisted_5$1 = { key: 0 };
  const _hoisted_6 = { key: 1 };
  var script$1 = vue.defineComponent({
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
                  ? (vue.openBlock(), vue.createElementBlock("table", _hoisted_1$1, [
                      (__props.showHeaders)
                          ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_2$1, [
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
                                          vue.createElementVNode("div", _hoisted_3$1, vue.toDisplayString(title), 1),
                                          vue.createElementVNode("div", _hoisted_4$1, [
                                              vue.renderSlot(_ctx.$slots, `${property}_item`, {
                                                  data: { prop: item[property], item: item, idx: index }
                                              }, () => [
                                                  (item[property])
                                                      ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$1, vue.toDisplayString(item[property]), 1))
                                                      : (vue.openBlock(), vue.createElementBlock("span", _hoisted_6, "n/a"))
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

  script$1.__file = "src/components/ui/FyDatatable/FyDatatable.vue";

  const _hoisted_1 = {
      key: 0,
      class: "fy-table"
  };
  const _hoisted_2 = { class: "table-container" };
  const _hoisted_3 = { key: 0 };
  const _hoisted_4 = { key: 0 };
  const _hoisted_5 = { key: 1 };
  var script = vue.defineComponent({
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
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
                      vue.createElementVNode("div", _hoisted_2, [
                          vue.createElementVNode("table", null, [
                              (__props.showHeaders)
                                  ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_3, [
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
                                                          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, vue.toDisplayString(item[property]), 1))
                                                          : (vue.openBlock(), vue.createElementBlock("span", _hoisted_5, "n/a"))
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

  script.__file = "src/components/ui/FyTable/FyTable.vue";

  var uiComponents = [
      script$6,
      script$5,
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

}));
//# sourceMappingURL=fyvue.js.map

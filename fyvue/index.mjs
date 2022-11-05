/*! fyvue */

import mitt from 'mitt';
import Notifications, { notify } from 'notiwind';
import { rest, getUuid, getPath, getPrefix, getLocale } from '@karpeleslab/klbfw';
import i18next from 'i18next';
export { default as i18next } from 'i18next';
import { openBlock, createElementBlock, createElementVNode, resolveComponent, createTextVNode, toDisplayString, createCommentVNode, createVNode, normalizeClass as normalizeClass$1, withDirectives, vModelDynamic, vModelText, Fragment, renderList, vModelSelect, renderSlot, createBlock, withCtx, unref, cloneVNode, h as h$2, inject, provide, watchEffect, ref, computed, defineComponent, onMounted, watch, onUnmounted, Teleport, reactive, nextTick, normalizeStyle as normalizeStyle$1, withModifiers, vModelCheckbox, initDirectivesForSSR, createApp, ssrContextKey, warn, Static, Comment as Comment$1, Text, mergeProps, ssrUtils, getCurrentInstance } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, sameAs } from '@vuelidate/validators';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { copyText } from 'vue3-clipboard';
import { createHead } from '@vueuse/head';

var __defProp$8 = Object.defineProperty;
var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
var __hasOwnProp$a = Object.prototype.hasOwnProperty;
var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$8 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$a.call(b, prop))
      __defNormalProp$8(a, prop, b[prop]);
  if (__getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(b)) {
      if (__propIsEnum$a.call(b, prop))
        __defNormalProp$8(a, prop, b[prop]);
    }
  return a;
};
const defaults = {
  allowMultiLoading: false
};
class Backend {
  constructor(services, options) {
    this.init(services, options);
    this.type = "backend";
  }
  init(services, options = {}) {
    this.services = services;
    this.options = __spreadValues$8(__spreadValues$8(__spreadValues$8({}, defaults), this.options), options);
  }
  read(language, namespace, callback) {
    if (language.length != 5) {
      callback(null, {});
      return;
    }
    if (typeof FW !== "undefined" && language == FW.Locale && typeof FW.i18n !== "undefined") {
      callback(null, FW.i18n);
      return;
    }
    var pfx = "";
    if (typeof FW !== "undefined") {
      pfx = FW.prefix;
    }
    var newpfx = pfx.replace(/\/l\/[a-z]{2}-[A-Z]{2}/, "/l/" + language);
    if (newpfx == pfx) {
      newpfx = newpfx = "/l/" + language;
    }
    fetch(newpfx + "/_special/locale.json").catch(function(err) {
      return fetch("/_special/locale/" + language + ".json");
    }).then(function(res) {
      if (!res.ok) {
        const retry = res.status >= 500 && res.status < 600;
        callback(`failed loading i18n`, retry);
        return;
      }
      return res.json();
    }).then(function(res) {
      callback(null, res);
    }).catch(function(err) {
      callback(err, false);
    });
  }
}
Backend.type = "backend";

function render$d(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z",
      "clip-rule": "evenodd"
    })
  ]);
}

function render$c(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
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
  ]);
}

function render$b(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z",
      "clip-rule": "evenodd"
    })
  ]);
}

function render$a(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
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
  ]);
}

function render$9(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
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
  ]);
}

function render$8(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z",
      "clip-rule": "evenodd"
    }),
    createElementVNode("path", { d: "M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z" }),
    createElementVNode("path", { d: "M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z" })
  ]);
}

function render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      "clip-rule": "evenodd"
    })
  ]);
}

function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", { d: "M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" }),
    createElementVNode("path", { d: "M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" })
  ]);
}

function render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z",
      "clip-rule": "evenodd"
    })
  ]);
}

function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z",
      "clip-rule": "evenodd"
    })
  ]);
}

function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", { d: "M10.375 2.25a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zM10.375 12a7.125 7.125 0 00-7.124 7.247.75.75 0 00.363.63 13.067 13.067 0 006.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 00.364-.63l.001-.12v-.002A7.125 7.125 0 0010.375 12zM16 9.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" })
  ]);
}

function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", { d: "M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" })
  ]);
}

function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", { d: "M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" })
  ]);
}

function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
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
  ]);
}

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$o = {
  name: "FyInput",
  components: {
    QuestionMarkCircleIcon: render$5
  },
  props: {
    req: {
      type: Boolean,
      default: false
    },
    hasLabelHelp: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: []
    },
    labelHelp: String,
    showLabel: Boolean,
    validate: Object,
    label: String,
    help: String,
    placeholder: String,
    autocomplete: {
      type: String,
      default: ""
    },
    id: String,
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    snakeCase: (str) => {
      return str.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map((word) => word.toLowerCase()).join("_");
    }
  }
};
const _hoisted_1$o = {
  key: 0,
  class: "input-group"
};
const _hoisted_2$n = {
  key: 0,
  class: ""
};
const _hoisted_3$l = ["for"];
const _hoisted_4$i = {
  key: 0,
  class: "text-red-700"
};
const _hoisted_5$h = ["href"];
const _hoisted_6$c = { class: "flex-1" };
const _hoisted_7$7 = ["type", "placeholder", "autocomplete", "id"];
const _hoisted_8$7 = ["placeholder", "autocomplete", "id"];
const _hoisted_9$7 = ["value"];
const _hoisted_10$7 = {
  key: 0,
  class: "help-text"
};
const _hoisted_11$5 = {
  key: 1,
  class: "form-error-label"
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_QuestionMarkCircleIcon = resolveComponent("QuestionMarkCircleIcon");
  return $props.validate ? (openBlock(), createElementBlock("div", _hoisted_1$o, [
    $props.showLabel ? (openBlock(), createElementBlock("div", _hoisted_2$n, [
      createElementVNode("label", {
        class: "label-basic",
        for: $props.id
      }, [
        createTextVNode(toDisplayString($props.label) + " ", 1),
        $props.req ? (openBlock(), createElementBlock("sup", _hoisted_4$i, "*")) : createCommentVNode("v-if", true),
        $props.hasLabelHelp ? (openBlock(), createElementBlock("a", {
          key: 1,
          href: $props.labelHelp,
          target: "_blank",
          onClick: _cache[0] || (_cache[0] = ($event) => $props.labelHelp())
        }, [
          createVNode(_component_QuestionMarkCircleIcon, { class: "help-icon" })
        ], 8, _hoisted_5$h)) : createCommentVNode("v-if", true)
      ], 8, _hoisted_3$l)
    ])) : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_6$c, [
      createElementVNode("div", {
        class: normalizeClass$1(["input-box", { "error-form": $props.validate.$errors.length }])
      }, [
        $props.type == "text" || $props.type == "password" || $props.type == "email" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 0,
          class: "input-basic",
          type: $props.type,
          placeholder: $props.placeholder,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.validate.$model = $event),
          autocomplete: $props.autocomplete,
          id: $props.id
        }, null, 8, _hoisted_7$7)), [
          [vModelDynamic, $props.validate.$model]
        ]) : createCommentVNode("v-if", true),
        $props.type == "textarea" ? withDirectives((openBlock(), createElementBlock("textarea", {
          key: 1,
          class: "input-basic h-32",
          placeholder: $props.placeholder,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.validate.$model = $event),
          autocomplete: $props.autocomplete,
          id: $props.id
        }, null, 8, _hoisted_8$7)), [
          [vModelText, $props.validate.$model]
        ]) : createCommentVNode("v-if", true),
        $props.type == "select" ? withDirectives((openBlock(), createElementBlock("select", {
          key: 2,
          id: "id",
          class: "input-basic",
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $props.validate.$model = $event)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.options, (opt) => {
            return openBlock(), createElementBlock("option", {
              value: opt[0],
              key: opt[0]
            }, toDisplayString(opt[1]), 9, _hoisted_9$7);
          }), 128))
        ], 512)), [
          [vModelSelect, $props.validate.$model]
        ]) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "icon")
      ], 2),
      renderSlot(_ctx.$slots, "adds"),
      $props.help ? (openBlock(), createElementBlock("div", _hoisted_10$7, toDisplayString($props.help), 1)) : createCommentVNode("v-if", true),
      $props.validate.$errors.length > 0 && $props.validate.$errors[0].$validator ? (openBlock(), createElementBlock("div", _hoisted_11$5, toDisplayString(_ctx.$t($options.snakeCase(`errorForm` + $props.validate.$errors[0].$message))), 1)) : createCommentVNode("v-if", true)
    ])
  ])) : createCommentVNode("v-if", true);
}
var FyInput = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$6], ["__file", "FyInput.vue"]]);

const _hoisted_1$n = { class: "fy-notify" };
const _hoisted_2$m = { class: "w-full max-w-sm" };
const _hoisted_3$k = { class: "px-4 py-2 -mx-3" };
const _hoisted_4$h = { class: "mx-3" };
const _hoisted_5$g = { class: "text-sm text-gray-600" };
const _sfc_main$n = {
  __name: "FyNotif",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Notification = resolveComponent("Notification");
      const _component_NotificationGroup = resolveComponent("NotificationGroup");
      return openBlock(), createBlock(_component_NotificationGroup, { group: "default" }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$n, [
            createElementVNode("div", _hoisted_2$m, [
              createVNode(_component_Notification, {
                enter: "transform ease-out duration-300 transition",
                "enter-from": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4",
                "enter-to": "translate-y-0 opacity-100 sm:translate-x-0",
                leave: "transition ease-in duration-500",
                "leave-from": "opacity-100",
                "leave-to": "opacity-0",
                move: "transition duration-500",
                "move-delay": "delay-300"
              }, {
                default: withCtx(({ notifications }) => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(notifications, (notification) => {
                    return openBlock(), createElementBlock("div", {
                      class: "ncontainer",
                      key: notification.id
                    }, [
                      createElementVNode("div", {
                        class: normalizeClass$1(["notif", notification.type ? notification.type : "success"])
                      }, [
                        !notification.type || notification.type == "success" ? (openBlock(), createBlock(unref(render$b), {
                          key: 0,
                          class: "w-6 h-6 text-white fill-current"
                        })) : createCommentVNode("v-if", true),
                        notification.type == "error" ? (openBlock(), createBlock(unref(render$7), {
                          key: 1,
                          class: "w-6 h-6 text-white fill-current"
                        })) : createCommentVNode("v-if", true)
                      ], 2),
                      createElementVNode("div", _hoisted_3$k, [
                        createElementVNode("div", _hoisted_4$h, [
                          createElementVNode("span", {
                            class: normalizeClass$1(["title", notification.type ? notification.type : "success"])
                          }, toDisplayString(notification.title), 3),
                          createElementVNode("p", _hoisted_5$g, toDisplayString(notification.text), 1)
                        ])
                      ])
                    ]);
                  }), 128))
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      });
    };
  }
};
var FyNotif = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "FyNotif.vue"]]);

const _sfc_main$m = {
  name: "FyBreadcrumb",
  components: {
    ArrowRightIcon: render$c
  },
  props: {
    nav: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
const _hoisted_1$m = { class: "" };
const _hoisted_2$l = {
  class: "fy-breadcrumb",
  "aria-label": "Breadcrumb"
};
const _hoisted_3$j = { class: "bc-innactive break-words" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_ArrowRightIcon = resolveComponent("ArrowRightIcon");
  return openBlock(), createElementBlock("div", _hoisted_1$m, [
    createElementVNode("div", _hoisted_2$l, [
      createElementVNode("ol", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.nav, (item) => {
          return openBlock(), createElementBlock(Fragment, null, [
            item.to ? (openBlock(), createElementBlock("li", {
              key: item.to,
              class: "bc-innactive"
            }, [
              createVNode(_component_router_link, {
                to: item.to,
                class: "bc-active link"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$cropText(item.name, 15)), 1)
                ]),
                _: 2
              }, 1032, ["to"]),
              createVNode(_component_ArrowRightIcon, { class: "w-3 bc-innactive" })
            ])) : (openBlock(), createElementBlock("li", {
              key: item.to,
              class: "flex items-center"
            }, [
              createElementVNode("span", _hoisted_3$j, toDisplayString(_ctx.$cropText(item.name, 15)), 1)
            ]))
          ], 64);
        }), 256))
      ])
    ])
  ]);
}
var FyBreadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$5], ["__file", "FyBreadcrumb.vue"]]);

function u$4(r, n, ...a) {
  if (r in n) {
    let e = n[r];
    return typeof e == "function" ? e(...a) : e;
  }
  let t = new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map((e) => `"${e}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t, u$4), t;
}

var __defProp$7 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$7 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$9.call(b2, prop))
      __defNormalProp$7(a, prop, b2[prop]);
  if (__getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(b2)) {
      if (__propIsEnum$9.call(b2, prop))
        __defNormalProp$7(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b2) => __defProps$3(a, __getOwnPropDescs$3(b2));
var __objRest$6 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$9.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$9.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var R$1 = ((o) => (o[o.None = 0] = "None", o[o.RenderStrategy = 1] = "RenderStrategy", o[o.Static = 2] = "Static", o))(R$1 || {});
var O$1 = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(O$1 || {});
function P$3(_a) {
  var _b = _a, { visible: r = true, features: t = 0, ourProps: e, theirProps: o } = _b, i = __objRest$6(_b, ["visible", "features", "ourProps", "theirProps"]);
  var a;
  let n = k$1(o, e), s = Object.assign(i, { props: n });
  if (r || t & 2 && n.static)
    return p$2(s);
  if (t & 1) {
    let l = (a = n.unmount) == null || a ? 0 : 1;
    return u$4(l, { [0]() {
      return null;
    }, [1]() {
      return p$2(__spreadProps$3(__spreadValues$7({}, i), { props: __spreadProps$3(__spreadValues$7({}, n), { hidden: true, style: { display: "none" } }) }));
    } });
  }
  return p$2(s);
}
function p$2({ props: r, attrs: t, slots: e, slot: o, name: i }) {
  var y;
  let _a = w$3(r, ["unmount", "static"]), { as: n } = _a, s = __objRest$6(_a, ["as"]), a = (y = e.default) == null ? void 0 : y.call(e, o), l = {};
  if (o) {
    let d = false, u = [];
    for (let [f, c] of Object.entries(o))
      typeof c == "boolean" && (d = true), c === true && u.push(f);
    d && (l["data-headlessui-state"] = u.join(" "));
  }
  if (n === "template") {
    if (a = g$3(a != null ? a : []), Object.keys(s).length > 0 || Object.keys(t).length > 0) {
      let [d, ...u] = a != null ? a : [];
      if (!x$1(d) || u.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${i} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(s).concat(Object.keys(t)).sort((f, c) => f.localeCompare(c)).map((f) => `  - ${f}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((f) => `  - ${f}`).join(`
`)].join(`
`));
      return cloneVNode(d, Object.assign({}, s, l));
    }
    return Array.isArray(a) && a.length === 1 ? a[0] : a;
  }
  return h$2(n, Object.assign({}, s, l), a);
}
function g$3(r) {
  return r.flatMap((t) => t.type === Fragment ? g$3(t.children) : [t]);
}
function k$1(...r) {
  if (r.length === 0)
    return {};
  if (r.length === 1)
    return r[0];
  let t = {}, e = {};
  for (let i of r)
    for (let n in i)
      n.startsWith("on") && typeof i[n] == "function" ? ((e[n]) != null || (e[n] = []), e[n].push(i[n])) : t[n] = i[n];
  if (t.disabled || t["aria-disabled"])
    return Object.assign(t, Object.fromEntries(Object.keys(e).map((i) => [i, void 0])));
  for (let i in e)
    Object.assign(t, { [i](n, ...s) {
      let a = e[i];
      for (let l of a) {
        if (n instanceof Event && n.defaultPrevented)
          return;
        l(n, ...s);
      }
    } });
  return t;
}
function w$3(r, t = []) {
  let e = Object.assign({}, r);
  for (let o of t)
    o in e && delete e[o];
  return e;
}
function x$1(r) {
  return r == null ? false : typeof r.type == "string" || typeof r.type == "object" || typeof r.type == "function";
}

let e$2 = 0;
function n$2() {
  return ++e$2;
}
function t$1() {
  return n$2();
}

var o$2 = ((r) => (r.Space = " ", r.Enter = "Enter", r.Escape = "Escape", r.Backspace = "Backspace", r.Delete = "Delete", r.ArrowLeft = "ArrowLeft", r.ArrowUp = "ArrowUp", r.ArrowRight = "ArrowRight", r.ArrowDown = "ArrowDown", r.Home = "Home", r.End = "End", r.PageUp = "PageUp", r.PageDown = "PageDown", r.Tab = "Tab", r))(o$2 || {});

function o$1(n) {
  var l;
  return n == null || n.value == null ? null : (l = n.value.$el) != null ? l : n.value;
}

let n$1 = Symbol("Context");
var l$2 = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(l$2 || {});
function f$1() {
  return p$1() !== null;
}
function p$1() {
  return inject(n$1, null);
}
function c$1(o) {
  provide(n$1, o);
}

const e$1 = typeof window == "undefined" || typeof document == "undefined";

function m$2(r) {
  if (e$1)
    return null;
  if (r instanceof Node)
    return r.ownerDocument;
  if (r != null && r.hasOwnProperty("value")) {
    let o = o$1(r);
    if (o)
      return o.ownerDocument;
  }
  return document;
}

let m$1 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var M = ((n) => (n[n.First = 1] = "First", n[n.Previous = 2] = "Previous", n[n.Next = 4] = "Next", n[n.Last = 8] = "Last", n[n.WrapAround = 16] = "WrapAround", n[n.NoScroll = 32] = "NoScroll", n))(M || {});
var N = ((o) => (o[o.Error = 0] = "Error", o[o.Overflow = 1] = "Overflow", o[o.Success = 2] = "Success", o[o.Underflow = 3] = "Underflow", o))(N || {});
var b$1 = ((r) => (r[r.Previous = -1] = "Previous", r[r.Next = 1] = "Next", r))(b$1 || {});
function E$1(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(m$1));
}
var F$2 = ((r) => (r[r.Strict = 0] = "Strict", r[r.Loose = 1] = "Loose", r))(F$2 || {});
function h$1(e, t = 0) {
  var r;
  return e === ((r = m$2(e)) == null ? void 0 : r.body) ? false : u$4(t, { [0]() {
    return e.matches(m$1);
  }, [1]() {
    let l = e;
    for (; l !== null; ) {
      if (l.matches(m$1))
        return true;
      l = l.parentElement;
    }
    return false;
  } });
}
function w$2(e) {
  e == null || e.focus({ preventScroll: true });
}
let H = ["textarea", "input"].join(",");
function S$1(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, H)) != null ? r : false;
}
function O(e, t = (r) => r) {
  return e.slice().sort((r, l) => {
    let o = t(r), s = t(l);
    if (o === null || s === null)
      return 0;
    let n = o.compareDocumentPosition(s);
    return n & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function P$2(e, t, r = true, l = null) {
  var c;
  let o = (c = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? c : document, s = Array.isArray(e) ? r ? O(e) : e : E$1(e);
  l = l != null ? l : o.activeElement;
  let n = (() => {
    if (t & 5)
      return 1;
    if (t & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), x = (() => {
    if (t & 1)
      return 0;
    if (t & 2)
      return Math.max(0, s.indexOf(l)) - 1;
    if (t & 4)
      return Math.max(0, s.indexOf(l)) + 1;
    if (t & 8)
      return s.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p = t & 32 ? { preventScroll: true } : {}, a = 0, i = s.length, u;
  do {
    if (a >= i || a + i <= 0)
      return 0;
    let f = x + a;
    if (t & 16)
      f = (f + i) % i;
    else {
      if (f < 0)
        return 3;
      if (f >= i)
        return 1;
    }
    u = s[f], u == null || u.focus(p), a += n;
  } while (u !== o.activeElement);
  return t & 6 && S$1(u) && u.select(), u.hasAttribute("tabindex") || u.setAttribute("tabindex", "0"), 2;
}

function v$1(e, t, n) {
  e$1 || watchEffect((o) => {
    document.addEventListener(e, t, n), o(() => document.removeEventListener(e, t, n));
  });
}

function y(f, m, i = computed(() => true)) {
  function a(e, u) {
    if (!i.value || e.defaultPrevented)
      return;
    let n = u(e);
    if (n === null || !n.ownerDocument.documentElement.contains(n))
      return;
    let c = function o(t) {
      return typeof t == "function" ? o(t()) : Array.isArray(t) || t instanceof Set ? t : [t];
    }(f);
    for (let o of c) {
      if (o === null)
        continue;
      let t = o instanceof HTMLElement ? o : o$1(o);
      if (t != null && t.contains(n))
        return;
    }
    return !h$1(n, F$2.Loose) && n.tabIndex !== -1 && e.preventDefault(), m(e, n);
  }
  let r = ref(null);
  v$1("mousedown", (e) => {
    var u, n;
    i.value && (r.value = ((n = (u = e.composedPath) == null ? void 0 : u.call(e)) == null ? void 0 : n[0]) || e.target);
  }, true), v$1("click", (e) => {
    !r.value || (a(e, () => r.value), r.value = null);
  }, true), v$1("blur", (e) => a(e, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), true);
}

var __defProp$6 = Object.defineProperty;
var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a2, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$8.call(b, prop))
      __defNormalProp$6(a2, prop, b[prop]);
  if (__getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(b)) {
      if (__propIsEnum$8.call(b, prop))
        __defNormalProp$6(a2, prop, b[prop]);
    }
  return a2;
};
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$8.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$8.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var a = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(a || {});
let f = defineComponent({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(r, { slots: t, attrs: d }) {
  return () => {
    let _a = r, { features: e } = _a, o = __objRest$5(_a, ["features"]), n = { "aria-hidden": (e & 2) === 2 ? true : void 0, style: __spreadValues$6({ position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" }, (e & 4) === 4 && (e & 2) !== 2 && { display: "none" }) };
    return P$3({ ourProps: n, theirProps: o, slot: {}, attrs: d, slots: t, name: "Hidden" });
  };
} });

function w$1(e, n, t) {
  e$1 || watchEffect((o) => {
    window.addEventListener(e, n, t), o(() => window.removeEventListener(e, n, t));
  });
}

var d$2 = ((r) => (r[r.Forwards = 0] = "Forwards", r[r.Backwards = 1] = "Backwards", r))(d$2 || {});
function n() {
  let o = ref(0);
  return w$1("keydown", (e) => {
    e.key === "Tab" && (o.value = e.shiftKey ? 1 : 0);
  }), o;
}

function E(n, e, o, r) {
  e$1 || watchEffect((t) => {
    n = n != null ? n : window, n.addEventListener(e, o, r), t(() => n.removeEventListener(e, o, r));
  });
}

function t(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((o) => setTimeout(() => {
    throw o;
  }));
}

var __defProp$5 = Object.defineProperty;
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols;
var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
var __propIsEnum$7 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$7.call(b2, prop))
      __defNormalProp$5(a, prop, b2[prop]);
  if (__getOwnPropSymbols$7)
    for (var prop of __getOwnPropSymbols$7(b2)) {
      if (__propIsEnum$7.call(b2, prop))
        __defNormalProp$5(a, prop, b2[prop]);
    }
  return a;
};
var __objRest$4 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$7.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$7)
    for (var prop of __getOwnPropSymbols$7(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$7.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var h = ((e) => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(h || {});
let ee = Object.assign(defineComponent({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: Object, default: ref(/* @__PURE__ */ new Set()) } }, inheritAttrs: false, setup(u, { attrs: a$1, slots: t, expose: r }) {
  let n$1 = ref(null);
  r({ el: n$1, $el: n$1 });
  let o = computed(() => m$2(n$1));
  A({ ownerDocument: o }, computed(() => Boolean(u.features & 16)));
  let e = C({ ownerDocument: o, container: n$1, initialFocus: computed(() => u.initialFocus) }, computed(() => Boolean(u.features & 2)));
  _$1({ ownerDocument: o, container: n$1, containers: u.containers, previousActiveElement: e }, computed(() => Boolean(u.features & 8)));
  let s = n();
  function i() {
    let l = o$1(n$1);
    !l || u$4(s.value, { [d$2.Forwards]: () => P$2(l, M.First), [d$2.Backwards]: () => P$2(l, M.Last) });
  }
  return () => {
    let l = {}, c = { ref: n$1 }, _a = u, { features: f$1, initialFocus: p, containers: U } = _a, y = __objRest$4(_a, ["features", "initialFocus", "containers"]);
    return h$2(Fragment, [Boolean(f$1 & 4) && h$2(f, { as: "button", type: "button", onFocus: i, features: a.Focusable }), P$3({ ourProps: c, theirProps: __spreadValues$5(__spreadValues$5({}, a$1), y), slot: l, attrs: a$1, slots: t, name: "FocusTrap" }), Boolean(f$1 & 4) && h$2(f, { as: "button", type: "button", onFocus: i, features: a.Focusable })]);
  };
} }), { features: h });
function A({ ownerDocument: u }, a) {
  let t = ref(null);
  function r() {
    var o;
    t.value || (t.value = (o = u.value) == null ? void 0 : o.activeElement);
  }
  function n() {
    !t.value || (w$2(t.value), t.value = null);
  }
  onMounted(() => {
    watch(a, (o, e) => {
      o !== e && (o ? r() : n());
    }, { immediate: true });
  }), onUnmounted(n);
}
function C({ ownerDocument: u, container: a, initialFocus: t$1 }, r) {
  let n = ref(null), o = ref(false);
  return onMounted(() => o.value = true), onUnmounted(() => o.value = false), onMounted(() => {
    watch([a, t$1, r], (e, s) => {
      if (e.every((l, c) => (s == null ? void 0 : s[c]) === l) || !r.value)
        return;
      let i = o$1(a);
      !i || t(() => {
        var f, p;
        if (!o.value)
          return;
        let l = o$1(t$1), c = (f = u.value) == null ? void 0 : f.activeElement;
        if (l) {
          if (l === c) {
            n.value = c;
            return;
          }
        } else if (i.contains(c)) {
          n.value = c;
          return;
        }
        l ? w$2(l) : P$2(i, M.First | M.NoScroll) === N.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), n.value = (p = u.value) == null ? void 0 : p.activeElement;
      });
    }, { immediate: true, flush: "post" });
  }), n;
}
function _$1({ ownerDocument: u, container: a, containers: t, previousActiveElement: r }, n) {
  var o;
  E((o = u.value) == null ? void 0 : o.defaultView, "focus", (e) => {
    if (!n.value)
      return;
    let s = new Set(t == null ? void 0 : t.value);
    s.add(a);
    let i = r.value;
    if (!i)
      return;
    let l = e.target;
    l && l instanceof HTMLElement ? x(s, l) ? (r.value = l, w$2(l)) : (e.preventDefault(), e.stopPropagation(), w$2(i)) : w$2(r.value);
  }, true);
}
function x(u, a) {
  var t;
  for (let r of u)
    if ((t = r.value) != null && t.contains(a))
      return true;
  return false;
}

let l$1 = "body > *";
let i = /* @__PURE__ */ new Set();
let r = /* @__PURE__ */ new Map();
function u$3(t) {
  t.setAttribute("aria-hidden", "true"), t.inert = true;
}
function s$1(t) {
  let n = r.get(t);
  !n || (n["aria-hidden"] === null ? t.removeAttribute("aria-hidden") : t.setAttribute("aria-hidden", n["aria-hidden"]), t.inert = n.inert);
}
function g$2(t, n = ref(true)) {
  watchEffect((d) => {
    if (!n.value || !t.value)
      return;
    let a = t.value, o = m$2(a);
    if (!!o) {
      i.add(a);
      for (let e of r.keys())
        e.contains(a) && (s$1(e), r.delete(e));
      o.querySelectorAll(l$1).forEach((e) => {
        if (e instanceof HTMLElement) {
          for (let f of i)
            if (e.contains(f))
              return;
          i.size === 1 && (r.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), u$3(e));
        }
      }), d(() => {
        if (i.delete(a), i.size > 0)
          o.querySelectorAll(l$1).forEach((e) => {
            if (e instanceof HTMLElement && !r.has(e)) {
              for (let f of i)
                if (e.contains(f))
                  return;
              r.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), u$3(e);
            }
          });
        else
          for (let e of r.keys())
            s$1(e), r.delete(e);
      });
    }
  });
}

var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __objRest$3 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$6.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$6.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
let e = Symbol("ForcePortalRootContext");
function u$2() {
  return inject(e, false);
}
let P$1 = defineComponent({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: false } }, setup(o, { slots: t, attrs: r }) {
  return provide(e, o.force), () => {
    let _a = o, n = __objRest$3(_a, ["force"]);
    return P$3({ theirProps: n, ourProps: {}, slot: {}, slots: t, attrs: r, name: "ForcePortalRoot" });
  };
} });

var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$5.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$5.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function c(t) {
  let r = m$2(t);
  if (!r) {
    if (t === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${t}`);
  }
  let o = r.getElementById("headlessui-portal-root");
  if (o)
    return o;
  let e = r.createElement("div");
  return e.setAttribute("id", "headlessui-portal-root"), r.body.appendChild(e);
}
let R = defineComponent({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(t, { slots: r, attrs: o }) {
  let e = ref(null), p = computed(() => m$2(e)), n = u$2(), u = inject(g$1, null), l = ref(n === true || u == null ? c(e.value) : u.resolveTarget());
  return watchEffect(() => {
    n || u != null && (l.value = u.resolveTarget());
  }), onUnmounted(() => {
    var i, m;
    let a = (i = p.value) == null ? void 0 : i.getElementById("headlessui-portal-root");
    !a || l.value === a && l.value.children.length <= 0 && ((m = l.value.parentElement) == null || m.removeChild(l.value));
  }), () => {
    if (l.value === null)
      return null;
    let a = { ref: e, "data-headlessui-portal": "" };
    return h$2(Teleport, { to: l.value }, P$3({ ourProps: a, theirProps: t, slot: {}, attrs: o, slots: r, name: "Portal" }));
  };
} });
let g$1 = Symbol("PortalGroupContext");
let L$1 = defineComponent({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(t, { attrs: r, slots: o }) {
  let e = reactive({ resolveTarget() {
    return t.target;
  } });
  return provide(g$1, e), () => {
    let _a = t, n = __objRest$2(_a, ["target"]);
    return P$3({ theirProps: n, ourProps: {}, slot: {}, attrs: r, slots: o, name: "PortalGroup" });
  };
} });

let u$1 = Symbol("StackContext");
var p = ((e) => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(p || {});
function v() {
  return inject(u$1, () => {
  });
}
function S({ type: o, enabled: r, element: e, onUpdate: i }) {
  let a = v();
  function t(...n) {
    i == null || i(...n), a(...n);
  }
  onMounted(() => {
    watch(r, (n, d) => {
      n ? t(0, o, e) : d === true && t(1, o, e);
    }, { immediate: true, flush: "sync" });
  }), onUnmounted(() => {
    r.value && t(1, o, e);
  }), provide(u$1, t);
}

var __defProp$4 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$4.call(b2, prop))
      __defNormalProp$4(a, prop, b2[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b2)) {
      if (__propIsEnum$4.call(b2, prop))
        __defNormalProp$4(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b2) => __defProps$2(a, __getOwnPropDescs$2(b2));
let u = Symbol("DescriptionContext");
function b() {
  let t = inject(u, null);
  if (t === null)
    throw new Error("Missing parent");
  return t;
}
function P({ slot: t = ref({}), name: o = "Description", props: s = {} } = {}) {
  let e = ref([]);
  function n(r) {
    return e.value.push(r), () => {
      let i = e.value.indexOf(r);
      i !== -1 && e.value.splice(i, 1);
    };
  }
  return provide(u, { register: n, slot: t, name: o, props: s }), computed(() => e.value.length > 0 ? e.value.join(" ") : void 0);
}
defineComponent({ name: "Description", props: { as: { type: [Object, String], default: "p" } }, setup(t, { attrs: o, slots: s }) {
  let e = b(), n = `headlessui-description-${t$1()}`;
  return onMounted(() => onUnmounted(e.register(n))), () => {
    let { name: r = "Description", slot: i = ref({}), props: l = {} } = e, c = t, d = __spreadProps$2(__spreadValues$4({}, Object.entries(l).reduce((f, [a, g]) => Object.assign(f, { [a]: unref(g) }), {})), { id: n });
    return P$3({ ourProps: d, theirProps: c, slot: i.value, attrs: o, slots: s, name: r });
  };
} });

var __async$j = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function s() {
  let a = [], i = [], t = { enqueue(e) {
    i.push(e);
  }, addEventListener(e, n, o, r) {
    return e.addEventListener(n, o, r), t.add(() => e.removeEventListener(n, o, r));
  }, requestAnimationFrame(...e) {
    let n = requestAnimationFrame(...e);
    t.add(() => cancelAnimationFrame(n));
  }, nextFrame(...e) {
    t.requestAnimationFrame(() => {
      t.requestAnimationFrame(...e);
    });
  }, setTimeout(...e) {
    let n = setTimeout(...e);
    t.add(() => clearTimeout(n));
  }, add(e) {
    a.push(e);
  }, dispose() {
    for (let e of a.splice(0))
      e();
  }, workQueue() {
    return __async$j(this, null, function* () {
      for (let e of i.splice(0))
        yield e();
    });
  } };
  return t;
}

function o() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}

var __defProp$3 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$3.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$3.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var De = ((t) => (t[t.Open = 0] = "Open", t[t.Closed = 1] = "Closed", t))(De || {});
let j = Symbol("DialogContext");
function T(a) {
  let u = inject(j, null);
  if (u === null) {
    let t = new Error(`<${a} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, T), t;
  }
  return u;
}
let k = "DC8F892D-2EBD-447C-A4C8-A03058436FF4";
let Ne = defineComponent({ name: "Dialog", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, open: { type: [Boolean, String], default: k }, initialFocus: { type: Object, default: null } }, emits: { close: (a) => true }, setup(a$1, { emit: u, attrs: t, slots: s$1, expose: i }) {
  var A;
  let g = ref(false);
  onMounted(() => {
    g.value = true;
  });
  let r = ref(0), d = p$1(), S$1 = computed(() => a$1.open === k && d !== null ? u$4(d.value, { [l$2.Open]: true, [l$2.Closed]: false }) : a$1.open), x = ref(/* @__PURE__ */ new Set()), m = ref(null), B = ref(null), I = computed(() => m$2(m));
  if (i({ el: m, $el: m }), !(a$1.open !== k || d !== null))
    throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof S$1.value != "boolean")
    throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${S$1.value === k ? void 0 : a$1.open}`);
  let f$1 = computed(() => g.value && S$1.value ? 0 : 1), H = computed(() => f$1.value === 0), C = computed(() => r.value > 1), G = inject(j, null) !== null, z = computed(() => C.value ? "parent" : "leaf");
  g$2(m, computed(() => C.value ? H.value : false)), S({ type: "Dialog", enabled: computed(() => f$1.value === 0), element: m, onUpdate: (o, l, n) => {
    if (l === "Dialog")
      return u$4(o, { [p.Add]() {
        x.value.add(n), r.value += 1;
      }, [p.Remove]() {
        x.value.delete(n), r.value -= 1;
      } });
  } });
  let J = P({ name: "DialogDescription", slot: computed(() => ({ open: S$1.value })) }), Q = `headlessui-dialog-${t$1()}`, E$1 = ref(null), O = { titleId: E$1, panelRef: ref(null), dialogState: f$1, setTitleId(o) {
    E$1.value !== o && (E$1.value = o);
  }, close() {
    u("close", false);
  } };
  return provide(j, O), y(() => {
    var l, n, p;
    return [...Array.from((n = (l = I.value) == null ? void 0 : l.querySelectorAll("body > *, [data-headlessui-portal]")) != null ? n : []).filter((e) => !(!(e instanceof HTMLElement) || e.contains(o$1(B)) || O.panelRef.value && e.contains(O.panelRef.value))), (p = O.panelRef.value) != null ? p : m.value];
  }, (o, l) => {
    O.close(), nextTick(() => l == null ? void 0 : l.focus());
  }, computed(() => f$1.value === 0 && !C.value)), E((A = I.value) == null ? void 0 : A.defaultView, "keydown", (o) => {
    o.defaultPrevented || o.key === o$2.Escape && f$1.value === 0 && (C.value || (o.preventDefault(), o.stopPropagation(), O.close()));
  }), watchEffect((o$1) => {
    var W;
    if (f$1.value !== 0 || G)
      return;
    let l = I.value;
    if (!l)
      return;
    let n = s();
    function p(v, b, X) {
      let Z = v.style.getPropertyValue(b);
      return Object.assign(v.style, { [b]: X }), n.add(() => {
        Object.assign(v.style, { [b]: Z });
      });
    }
    let e = l == null ? void 0 : l.documentElement, L = ((W = l.defaultView) != null ? W : window).innerWidth - e.clientWidth;
    if (p(e, "overflow", "hidden"), L > 0) {
      let v = e.clientWidth - e.offsetWidth, b = L - v;
      p(e, "paddingRight", `${b}px`);
    }
    if (o()) {
      let v = window.pageYOffset;
      p(e, "position", "fixed"), p(e, "marginTop", `-${v}px`), p(e, "width", "100%"), n.add(() => window.scrollTo(0, v));
    }
    o$1(n.dispose);
  }), watchEffect((o) => {
    if (f$1.value !== 0)
      return;
    let l = o$1(m);
    if (!l)
      return;
    let n = new IntersectionObserver((p) => {
      for (let e of p)
        e.boundingClientRect.x === 0 && e.boundingClientRect.y === 0 && e.boundingClientRect.width === 0 && e.boundingClientRect.height === 0 && O.close();
    });
    n.observe(l), o(() => n.disconnect());
  }), () => {
    let o = __spreadProps$1(__spreadValues$3({}, t), { ref: m, id: Q, role: "dialog", "aria-modal": f$1.value === 0 ? true : void 0, "aria-labelledby": E$1.value, "aria-describedby": J.value }), _a = a$1, { open: l, initialFocus: n } = _a, p = __objRest$1(_a, ["open", "initialFocus"]), e = { open: f$1.value === 0 };
    return h$2(P$1, { force: true }, () => [h$2(R, () => h$2(L$1, { target: m.value }, () => h$2(P$1, { force: false }, () => h$2(ee, { initialFocus: n, containers: x, features: H.value ? u$4(z.value, { parent: ee.features.RestoreFocus, leaf: ee.features.All & ~ee.features.FocusLock }) : ee.features.None }, () => P$3({ ourProps: o, theirProps: p, slot: e, attrs: t, slots: s$1, visible: f$1.value === 0, features: R$1.RenderStrategy | R$1.Static, name: "Dialog" }))))), h$2(f, { features: a.Hidden, ref: B })]);
  };
} });
let Ve = defineComponent({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" } }, setup(a, { attrs: u, slots: t }) {
  let s = T("DialogOverlay"), i = `headlessui-dialog-overlay-${t$1()}`;
  function g(r) {
    r.target === r.currentTarget && (r.preventDefault(), r.stopPropagation(), s.close());
  }
  return () => P$3({ ourProps: { id: i, "aria-hidden": true, onClick: g }, theirProps: a, slot: { open: s.dialogState.value === 0 }, attrs: u, slots: t, name: "DialogOverlay" });
} });
defineComponent({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" } }, inheritAttrs: false, setup(a, { attrs: u, slots: t, expose: s }) {
  let i = T("DialogBackdrop"), g = `headlessui-dialog-backdrop-${t$1()}`, r = ref(null);
  return s({ el: r, $el: r }), onMounted(() => {
    if (i.panelRef.value === null)
      throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let d = a, S = { id: g, ref: r, "aria-hidden": true };
    return h$2(P$1, { force: true }, () => h$2(R, () => P$3({ ourProps: S, theirProps: __spreadValues$3(__spreadValues$3({}, u), d), slot: { open: i.dialogState.value === 0 }, attrs: u, slots: t, name: "DialogBackdrop" })));
  };
} });
let _e = defineComponent({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" } }, setup(a, { attrs: u, slots: t, expose: s }) {
  let i = T("DialogPanel"), g = `headlessui-dialog-panel-${t$1()}`;
  s({ el: i.panelRef, $el: i.panelRef });
  function r(d) {
    d.stopPropagation();
  }
  return () => {
    let d = { id: g, ref: i.panelRef, onClick: r };
    return P$3({ ourProps: d, theirProps: a, slot: { open: i.dialogState.value === 0 }, attrs: u, slots: t, name: "DialogPanel" });
  };
} });
let Ue = defineComponent({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" } }, setup(a, { attrs: u, slots: t }) {
  let s = T("DialogTitle"), i = `headlessui-dialog-title-${t$1()}`;
  return onMounted(() => {
    s.setTitleId(i), onUnmounted(() => s.setTitleId(null));
  }), () => P$3({ ourProps: { id: i }, theirProps: a, slot: { open: s.dialogState.value === 0 }, attrs: u, slots: t, name: "DialogTitle" });
} });

function l(r) {
  let e = { called: false };
  return (...t) => {
    if (!e.called)
      return e.called = true, r(...t);
  };
}

function m(e, ...t) {
  e && t.length > 0 && e.classList.add(...t);
}
function d$1(e, ...t) {
  e && t.length > 0 && e.classList.remove(...t);
}
var g = ((i) => (i.Finished = "finished", i.Cancelled = "cancelled", i))(g || {});
function F$1(e, t) {
  let i = s();
  if (!e)
    return i.dispose;
  let { transitionDuration: n, transitionDelay: a } = getComputedStyle(e), [l, s$1] = [n, a].map((o) => {
    let [u = 0] = o.split(",").filter(Boolean).map((r) => r.includes("ms") ? parseFloat(r) : parseFloat(r) * 1e3).sort((r, c) => c - r);
    return u;
  });
  return l !== 0 ? i.setTimeout(() => t("finished"), l + s$1) : t("finished"), i.add(() => t("cancelled")), i.dispose;
}
function L(e, t, i, n, a, l$1) {
  let s$1 = s(), o = l$1 !== void 0 ? l(l$1) : () => {
  };
  return d$1(e, ...a), m(e, ...t, ...i), s$1.nextFrame(() => {
    d$1(e, ...i), m(e, ...n), s$1.add(F$1(e, (u) => (d$1(e, ...n, ...t), m(e, ...a), o(u))));
  }), s$1.add(() => d$1(e, ...t, ...i, ...n, ...a)), s$1.add(() => o("cancelled")), s$1.dispose;
}

var __defProp$2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$2.call(b2, prop))
      __defNormalProp$2(a, prop, b2[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b2)) {
      if (__propIsEnum$2.call(b2, prop))
        __defNormalProp$2(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function d(e = "") {
  return e.split(" ").filter((t) => t.trim().length > 1);
}
let B = Symbol("TransitionContext");
var ae = ((a) => (a.Visible = "visible", a.Hidden = "hidden", a))(ae || {});
function le() {
  return inject(B, null) !== null;
}
function ie() {
  let e = inject(B, null);
  if (e === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
function se() {
  let e = inject(F, null);
  if (e === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
let F = Symbol("NestingContext");
function w(e) {
  return "children" in e ? w(e.children) : e.value.filter(({ state: t }) => t === "visible").length > 0;
}
function K(e) {
  let t = ref([]), a = ref(false);
  onMounted(() => a.value = true), onUnmounted(() => a.value = false);
  function s(r, n = O$1.Hidden) {
    let l = t.value.findIndex(({ id: i }) => i === r);
    l !== -1 && (u$4(n, { [O$1.Unmount]() {
      t.value.splice(l, 1);
    }, [O$1.Hidden]() {
      t.value[l].state = "hidden";
    } }), !w(t) && a.value && (e == null || e()));
  }
  function v(r) {
    let n = t.value.find(({ id: l }) => l === r);
    return n ? n.state !== "visible" && (n.state = "visible") : t.value.push({ id: r, state: "visible" }), () => s(r, O$1.Unmount);
  }
  return { children: t, register: v, unregister: s };
}
let _ = R$1.RenderStrategy;
let oe = defineComponent({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e, { emit: t, attrs: a, slots: s, expose: v }) {
  if (!le() && f$1())
    return () => h$2(fe, __spreadProps(__spreadValues$2({}, e), { onBeforeEnter: () => t("beforeEnter"), onAfterEnter: () => t("afterEnter"), onBeforeLeave: () => t("beforeLeave"), onAfterLeave: () => t("afterLeave") }), s);
  let r = ref(null), n = ref("visible"), l = computed(() => e.unmount ? O$1.Unmount : O$1.Hidden);
  v({ el: r, $el: r });
  let { show: i, appear: x } = ie(), { register: g$1, unregister: p } = se(), R = { value: true }, m = t$1(), S = { value: false }, N = K(() => {
    S.value || (n.value = "hidden", p(m), t("afterLeave"));
  });
  onMounted(() => {
    let o = g$1(m);
    onUnmounted(o);
  }), watchEffect(() => {
    if (l.value === O$1.Hidden && !!m) {
      if (i && n.value !== "visible") {
        n.value = "visible";
        return;
      }
      u$4(n.value, { ["hidden"]: () => p(m), ["visible"]: () => g$1(m) });
    }
  });
  let k = d(e.enter), $ = d(e.enterFrom), q = d(e.enterTo), O = d(e.entered), z = d(e.leave), G = d(e.leaveFrom), J = d(e.leaveTo);
  onMounted(() => {
    watchEffect(() => {
      if (n.value === "visible") {
        let o = o$1(r);
        if (o instanceof Comment && o.data === "")
          throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function Q(o) {
    let c = R.value && !x.value, u = o$1(r);
    !u || !(u instanceof HTMLElement) || c || (S.value = true, i.value && t("beforeEnter"), i.value || t("beforeLeave"), o(i.value ? L(u, k, $, q, O, (C) => {
      S.value = false, C === g.Finished && t("afterEnter");
    }) : L(u, z, G, J, O, (C) => {
      S.value = false, C === g.Finished && (w(N) || (n.value = "hidden", p(m), t("afterLeave")));
    })));
  }
  return onMounted(() => {
    watch([i], (o, c, u) => {
      Q(u), R.value = false;
    }, { immediate: true });
  }), provide(F, N), c$1(computed(() => u$4(n.value, { ["visible"]: l$2.Open, ["hidden"]: l$2.Closed }))), () => {
    let _a = e, W = __objRest(_a, ["appear", "show", "enter", "enterFrom", "enterTo", "entered", "leave", "leaveFrom", "leaveTo"]);
    return P$3({ theirProps: W, ourProps: { ref: r }, slot: {}, slots: s, attrs: a, features: _, visible: n.value === "visible", name: "TransitionChild" });
  };
} });
let ue = oe;
let fe = defineComponent({ inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e, { emit: t, attrs: a, slots: s }) {
  let v = p$1(), r = computed(() => e.show === null && v !== null ? u$4(v.value, { [l$2.Open]: true, [l$2.Closed]: false }) : e.show);
  watchEffect(() => {
    if (![true, false].includes(r.value))
      throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let n = ref(r.value ? "visible" : "hidden"), l = K(() => {
    n.value = "hidden";
  }), i = ref(true), x = { show: r, appear: computed(() => e.appear || !i.value) };
  return onMounted(() => {
    watchEffect(() => {
      i.value = false, r.value ? n.value = "visible" : w(l) || (n.value = "hidden");
    });
  }), provide(F, l), provide(B, x), () => {
    let g = w$3(e, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), p = { unmount: e.unmount };
    return P$3({ ourProps: __spreadProps(__spreadValues$2({}, p), { as: "template" }), theirProps: {}, slot: {}, slots: __spreadProps(__spreadValues$2({}, s), { default: () => [h$2(ue, __spreadValues$2(__spreadValues$2(__spreadValues$2({ onBeforeEnter: () => t("beforeEnter"), onAfterEnter: () => t("afterEnter"), onBeforeLeave: () => t("beforeLeave"), onAfterLeave: () => t("afterLeave") }, a), p), g), s.default)] }), attrs: {}, features: _, visible: n.value === "visible", name: "Transition" });
  };
} });

const _sfc_main$l = {
  name: "FyConfirm",
  components: {
    Dialog: Ne,
    DialogOverlay: Ve,
    DialogTitle: Ue
  },
  setup() {
    let confirm = ref(false);
    return {
      confirm,
      setConfirm(value) {
        confirm.value = value;
      }
    };
  },
  data() {
    return {
      title: "",
      desc: "",
      onConfirm: () => {
      }
    };
  },
  created() {
    this.$eventBus.on("resetConfirm", () => {
      this.title = "";
      this.onConfirm = () => {
      };
      this.setConfirm(false);
    });
    this.$eventBus.on("showConfirm", (data) => {
      this.title = data.title;
      this.desc = data.desc;
      this.onConfirm = data.onConfirm;
      this.setConfirm(true);
    });
  }
};
const _hoisted_1$l = { class: "parent" };
const _hoisted_2$k = {
  class: "modal-container",
  style: { "width": "350px !important", "padding": "1rem !important" }
};
const _hoisted_3$i = {
  key: 0,
  class: "confirm-modal-desc default-p"
};
const _hoisted_4$g = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_5$f = { class: "btn-box" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DialogOverlay = resolveComponent("DialogOverlay");
  const _component_DialogTitle = resolveComponent("DialogTitle");
  const _component_Dialog = resolveComponent("Dialog");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_Dialog, {
      open: $setup.confirm,
      onClose: $setup.setConfirm,
      class: "fy-modal is-confirm",
      style: { "background": "rgba(0, 0, 0, 0.6)", "z-index": "51 !important" }
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_1$l, [
          createVNode(_component_DialogOverlay),
          createElementVNode("div", _hoisted_2$k, [
            createElementVNode("div", null, [
              createVNode(_component_DialogTitle, { class: "title" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($data.title), 1)
                ]),
                _: 1
              }),
              $data.desc ? (openBlock(), createElementBlock("div", _hoisted_3$i, toDisplayString($data.desc), 1)) : createCommentVNode("v-if", true),
              _hoisted_4$g,
              createElementVNode("div", _hoisted_5$f, [
                createElementVNode("button", {
                  onClick: _cache[0] || (_cache[0] = ($event) => $setup.setConfirm(false)),
                  class: "btn neutral btn-defaults"
                }, toDisplayString(_ctx.$t("confirm_modal_cta_cancel")), 1),
                createElementVNode("button", {
                  onClick: _cache[1] || (_cache[1] = ($event) => $data.onConfirm()),
                  class: "btn primary btn-defaults"
                }, toDisplayString(_ctx.$t("confirm_modal_cta_confirm")), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["open", "onClose"])
  ]);
}
var FyConfirm = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$4], ["__file", "FyConfirm.vue"]]);

const _sfc_main$k = {
  name: "FyDatatable",
  props: {
    showHeaders: {
      type: Boolean,
      default: true
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    bgColor(i) {
      if (i % 2 == 0) {
        return "bg-gray-200";
      }
      return "bg-gray-100";
    }
  }
};
const _hoisted_1$k = {
  key: 0,
  class: "border-collapse w-full md:mx-0 fy-datatable"
};
const _hoisted_2$j = { key: 0 };
const _hoisted_3$h = { class: "div" };
const _hoisted_4$f = { class: "px-2 md:px-0" };
const _hoisted_5$e = { key: 0 };
const _hoisted_6$b = { key: 1 };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.data && $props.data.length > 0 ? (openBlock(), createElementBlock("table", _hoisted_1$k, [
    $props.showHeaders ? (openBlock(), createElementBlock("thead", _hoisted_2$j, [
      createElementVNode("tr", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.headers, (title) => {
          return openBlock(), createElementBlock("th", {
            key: `header_${title}`
          }, toDisplayString(title), 1);
        }), 128))
      ])
    ])) : createCommentVNode("v-if", true),
    createElementVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.data, (item, index) => {
        return openBlock(), createElementBlock("tr", {
          key: index,
          class: normalizeClass$1(`tr ${$options.bgColor(index)} `)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.headers, (title, property) => {
            return openBlock(), createElementBlock("td", {
              key: title,
              class: "td"
            }, [
              createElementVNode("div", _hoisted_3$h, toDisplayString(title), 1),
              createElementVNode("div", _hoisted_4$f, [
                renderSlot(_ctx.$slots, `${property}_item`, {
                  data: { prop: item[property], id: item.id, item, idx: index }
                }, () => [
                  item[property] ? (openBlock(), createElementBlock("span", _hoisted_5$e, toDisplayString(item[property]), 1)) : (openBlock(), createElementBlock("span", _hoisted_6$b, "n/a"))
                ])
              ])
            ]);
          }), 128))
        ], 2);
      }), 128))
    ])
  ])) : createCommentVNode("v-if", true);
}
var FyDatatable = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$3], ["__file", "FyDatatable.vue"]]);

const _hoisted_1$j = { class: "parent" };
const _sfc_main$j = {
  __name: "FyModal",
  props: {
    id: { type: String, default: "CustomModal" },
    title: { type: String, default: "" },
    onOpen: { type: Function, default: () => {
    } },
    onClose: { type: Function, default: () => {
    } }
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
      isOpen.value = value;
    };
    onMounted(() => {
      eventBus.on(`${props.id}Modal`, setModal);
    });
    onUnmounted(() => {
      eventBus.on(`${props.id}Modal`, setModal);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(fe), {
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
          createVNode(unref(Ne), {
            open: isOpen.value,
            onClose: setModal,
            style: { "background": "rgba(0, 0, 0, 0.8)" },
            class: "fy-modal"
          }, {
            default: withCtx(() => [
              createElementVNode("div", _hoisted_1$j, [
                createVNode(unref(_e), { class: "modal-container" }, {
                  default: withCtx(() => [
                    createVNode(unref(Ue), { class: "title" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.title) + " ", 1),
                        createElementVNode("a", {
                          href: "javascript:void(0)",
                          onClick: _cache[0] || (_cache[0] = ($event) => setModal(false))
                        }, [
                          createVNode(unref(render), { class: "close-icon" })
                        ])
                      ]),
                      _: 1
                    }),
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                })
              ])
            ]),
            _: 3
          }, 8, ["open"])
        ]),
        _: 3
      }, 8, ["show"]);
    };
  }
};
var FyModal = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "FyModal.vue"]]);

const _sfc_main$i = {
  name: "FyLoader",
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.$eventBus.on("loading", (value) => {
      this.loading = value;
    });
  }
};
const _hoisted_1$i = { key: 0 };
const _hoisted_2$i = {
  class: "fy-loader",
  style: { "z-index": "60 !important" }
};
const _hoisted_3$g = {
  class: "loader-container",
  style: { "top": "50%" }
};
const _hoisted_4$e = /* @__PURE__ */ createElementVNode("div", { class: "half-circle-spinner opacity-100" }, [
  /* @__PURE__ */ createElementVNode("div", { class: "circle circle-1" }),
  /* @__PURE__ */ createElementVNode("div", { class: "circle circle-2" })
], -1);
const _hoisted_5$d = { class: "loader-text" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return $data.loading ? (openBlock(), createElementBlock("div", _hoisted_1$i, [
    createElementVNode("div", _hoisted_2$i, [
      createElementVNode("div", _hoisted_3$g, [
        createElementVNode("div", null, [
          _hoisted_4$e,
          createElementVNode("div", _hoisted_5$d, toDisplayString(_ctx.$t("global_loading_text")), 1)
        ])
      ])
    ])
  ])) : createCommentVNode("v-if", true);
}
var FyLoader = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$2], ["__file", "FyLoader.vue"]]);

const _sfc_main$h = {
  components: {
    ChevronLeftIcon: render$a,
    ChevronRightIcon: render$9
  },
  name: "FyPaging",
  props: {
    items: {
      type: Object,
      default() {
        return {};
      }
    },
    id: {
      type: String,
      default() {
        return "default";
      }
    }
  },
  mounted() {
    const routePage = parseInt(this.$route.query.page);
    if (!isNaN(routePage) && this.items) {
      if (this.isPageNew(routePage)) {
        this.$eventBus.emit(`${this.id}GoToPage`, routePage);
      }
    }
  },
  methods: {
    isPageNew(page) {
      return page >= 1 && page <= this.items.page_max && page != this.items.page_no;
    },
    next() {
      let newPage = this.items.page_no + 1;
      if (!this.isPageNew(newPage))
        return;
      this.$router.push({
        path: this.$route.path,
        query: { page: newPage }
      }).then(() => this.$eventBus.emit(`${this.id}GoToPage`, newPage));
    },
    prev() {
      let newPage = this.items.page_no - 1;
      if (!this.isPageNew(newPage))
        return;
      this.$router.push({
        path: this.$route.path,
        query: { page: newPage }
      }).then(() => this.$eventBus.emit(`${this.id}GoToPage`, newPage));
    },
    page(page) {
      if (!this.isPageNew(page))
        return;
      this.$router.push({
        path: this.$route.path,
        query: { page }
      }).then(() => this.$eventBus.emit(`${this.id}GoToPage`, page));
    }
  }
};
const _hoisted_1$h = {
  key: 0,
  class: "paging flex items-center justify-center"
};
const _hoisted_2$h = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
};
const _hoisted_3$f = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "{ $t('previous') }", -1);
const _hoisted_4$d = {
  key: 2,
  class: "dots"
};
const _hoisted_5$c = ["onClick"];
const _hoisted_6$a = {
  href: "#",
  "aria-current": "page",
  class: "active"
};
const _hoisted_7$6 = ["onClick"];
const _hoisted_8$6 = {
  key: 3,
  class: "dots"
};
const _hoisted_9$6 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "{ $t('next') }", -1);
const _hoisted_10$6 = { class: "paging-text" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChevronLeftIcon = resolveComponent("ChevronLeftIcon");
  const _component_ChevronRightIcon = resolveComponent("ChevronRightIcon");
  return $props.items && $props.items.page_max > 1 && $props.items.page_no ? (openBlock(), createElementBlock("div", _hoisted_1$h, [
    createElementVNode("div", null, [
      createElementVNode("nav", _hoisted_2$h, [
        $props.items.page_no >= 2 ? (openBlock(), createElementBlock("a", {
          key: 0,
          href: "javascript:void(0);",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.prev()),
          class: "prev-next"
        }, [
          _hoisted_3$f,
          createVNode(_component_ChevronLeftIcon, { class: "h-5 w-5" })
        ])) : createCommentVNode("v-if", true),
        $props.items.page_no - 2 > 1 ? (openBlock(), createElementBlock("a", {
          key: 1,
          class: "innactive",
          href: "javascript:void(0);",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.page(1))
        }, " 1 ")) : createCommentVNode("v-if", true),
        $props.items.page_no - 2 > 2 ? (openBlock(), createElementBlock("span", _hoisted_4$d, " ... ")) : createCommentVNode("v-if", true),
        (openBlock(), createElementBlock(Fragment, null, renderList(2, (i) => {
          return openBlock(), createElementBlock(Fragment, { key: i }, [
            $props.items.page_no - (3 - i) >= 1 ? (openBlock(), createElementBlock("a", {
              key: 0,
              class: "innactive",
              href: "javascript:void(0);",
              onClick: ($event) => $options.page($props.items.page_no - (3 - i))
            }, toDisplayString($props.items.page_no - (3 - i)), 9, _hoisted_5$c)) : createCommentVNode("v-if", true)
          ], 64);
        }), 64)),
        createElementVNode("a", _hoisted_6$a, toDisplayString($props.items.page_no), 1),
        (openBlock(), createElementBlock(Fragment, null, renderList(2, (i) => {
          return openBlock(), createElementBlock(Fragment, { key: i }, [
            $props.items.page_no + i <= $props.items.page_max ? (openBlock(), createElementBlock("a", {
              key: 0,
              class: "innactive",
              href: "javascript:void(0);",
              onClick: ($event) => $options.page($props.items.page_no + i)
            }, toDisplayString($props.items.page_no + i), 9, _hoisted_7$6)) : createCommentVNode("v-if", true)
          ], 64);
        }), 64)),
        $props.items.page_no + 2 < $props.items.page_max - 1 ? (openBlock(), createElementBlock("span", _hoisted_8$6, " ... ")) : createCommentVNode("v-if", true),
        $props.items.page_no + 2 < $props.items.page_max ? (openBlock(), createElementBlock("a", {
          key: 4,
          class: "innactive",
          href: "javascript:void(0);",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.page($props.items.page_max))
        }, toDisplayString($props.items.page_max), 1)) : createCommentVNode("v-if", true),
        $props.items.page_no < $props.items.page_max - 1 ? (openBlock(), createElementBlock("a", {
          key: 5,
          href: "javascript:void(0);",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.next()),
          class: "prev-next"
        }, [
          _hoisted_9$6,
          createVNode(_component_ChevronRightIcon, { class: "h-5 w-5" })
        ])) : createCommentVNode("v-if", true)
      ]),
      createElementVNode("p", _hoisted_10$6, toDisplayString(_ctx.$t("global_paging", {
        start: $props.items.results_per_page * ($props.items.page_no - 1),
        end: $props.items.results_per_page * $props.items.page_no,
        total: $props.items.count
      })), 1)
    ])
  ])) : createCommentVNode("v-if", true);
}
var FyPaging = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$1], ["__file", "FyPaging.vue"]]);

const _sfc_main$g = {
  name: "FySteps",
  props: {
    steps: Array,
    currentStep: Number
  },
  computed: {
    barWidth() {
      return this.currentStep * 100 / this.steps.length;
    }
  },
  methods: {
    getStepClass(index) {
      if (index + 1 < this.currentStep)
        return "past-step";
      if (index + 1 == this.currentStep)
        return "current-step";
      return "future-step";
    }
  }
};
const _hoisted_1$g = { class: "fy-step-bar" };
const _hoisted_2$g = { class: "bar-bg" };
const _hoisted_3$e = { class: "hidden sm:inline" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$g, [
    createElementVNode("div", _hoisted_2$g, [
      createElementVNode("div", {
        class: "bar",
        style: normalizeStyle$1(`width:${$options.barWidth}%`)
      }, null, 4)
    ]),
    createElementVNode("ol", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.steps, (step, index) => {
        return openBlock(), createElementBlock("li", {
          key: index,
          class: normalizeClass$1($options.getStepClass(index))
        }, [
          createElementVNode("span", _hoisted_3$e, toDisplayString(_ctx.$t(step.name)), 1),
          createElementVNode("i", {
            class: normalizeClass$1(["h-6 w-6 sm:ml-2 sm:h-5 sm:w-5", step.icon])
          }, null, 2)
        ], 2);
      }), 128))
    ])
  ]);
}
var FySteps = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render], ["__file", "FySteps.vue"]]);

const _hoisted_1$f = /* @__PURE__ */ createElementVNode("div", { class: "circle circle-1" }, null, -1);
const _hoisted_2$f = /* @__PURE__ */ createElementVNode("div", { class: "circle circle-2" }, null, -1);
const _hoisted_3$d = [
  _hoisted_1$f,
  _hoisted_2$f
];
const _sfc_main$f = {
  __name: "FySelfLoading",
  props: {
    isLoading: Boolean,
    style: Object,
    size: { type: Array, default: [100, 100] }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return __props.isLoading ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "fy-self-loader",
        style: normalizeStyle$1(__props.style)
      }, [
        createElementVNode("div", {
          class: "half-circle-spinner opacity-100",
          style: normalizeStyle$1(`width: ${__props.size[0]}px; height:${__props.size[1]}px`)
        }, _hoisted_3$d, 4)
      ], 4)) : createCommentVNode("v-if", true);
    };
  }
};
var FySelfLoading = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "FySelfLoading.vue"]]);

const _hoisted_1$e = {
  key: 0,
  class: "fy-table"
};
const _hoisted_2$e = { class: "table-container" };
const _hoisted_3$c = { key: 0 };
const _hoisted_4$c = ["onClick"];
const _hoisted_5$b = { key: 0 };
const _hoisted_6$9 = { key: 1 };
const _sfc_main$e = {
  __name: "FyTable",
  props: {
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    showHeaders: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(__props) {
    const columns = ref({});
    return (_ctx, _cache) => {
      return __props.data && __props.data.length ? (openBlock(), createElementBlock("div", _hoisted_1$e, [
        createElementVNode("div", _hoisted_2$e, [
          createElementVNode("table", null, [
            __props.showHeaders ? (openBlock(), createElementBlock("thead", _hoisted_3$c, [
              createElementVNode("tr", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, (title, property) => {
                  return openBlock(), createElementBlock("th", { key: property }, [
                    createTextVNode(toDisplayString(title) + " ", 1),
                    createElementVNode("button", {
                      class: "flex items-center th-cell",
                      onClick: ($event) => _ctx.toggleSort(property)
                    }, null, 8, _hoisted_4$c)
                  ]);
                }), 128))
              ])
            ])) : createCommentVNode("v-if", true),
            createElementVNode("tbody", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data, (item, index) => {
                return openBlock(), createElementBlock("tr", { key: index }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, (title, property) => {
                    return openBlock(), createElementBlock("td", {
                      key: property,
                      ref_for: true,
                      ref: (el) => {
                        if (el) {
                          if (!columns.value.hasOwnProperty(property))
                            columns.value[property] = {};
                          columns.value[property][index] = el.innerHTML;
                        }
                      }
                    }, [
                      renderSlot(_ctx.$slots, `${property}_item`, {
                        data: {
                          prop: item[property],
                          item,
                          idx: index
                        }
                      }, () => [
                        item[property] ? (openBlock(), createElementBlock("span", _hoisted_5$b, toDisplayString(item[property]), 1)) : (openBlock(), createElementBlock("span", _hoisted_6$9, "n/a"))
                      ])
                    ], 512);
                  }), 128))
                ]);
              }), 128))
            ])
          ])
        ])
      ])) : createCommentVNode("v-if", true);
    };
  }
};
var FyTable = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "FyTable.vue"]]);

const _hoisted_1$d = { class: "fy-circle-percent" };
const _hoisted_2$d = {
  viewBox: "0 0 36 36",
  class: "circular-chart"
};
const _hoisted_3$b = /* @__PURE__ */ createElementVNode("path", {
  class: "circle-bg",
  d: "M18 2.0845\n            a 15.9155 15.9155 0 0 1 0 31.831\n            a 15.9155 15.9155 0 0 1 0 -31.831"
}, null, -1);
const _hoisted_4$b = ["stroke-dasharray"];
const _hoisted_5$a = ["x", "y"];
const _sfc_main$d = {
  __name: "FyCirclePercent",
  props: { percent: Number, textXY: { type: Array, default: [18, 20.85] } },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        (openBlock(), createElementBlock("svg", _hoisted_2$d, [
          _hoisted_3$b,
          createElementVNode("path", {
            class: "circle",
            "stroke-dasharray": `${__props.percent}, 100`,
            d: "M18 2.0845\n            a 15.9155 15.9155 0 0 1 0 31.831\n            a 15.9155 15.9155 0 0 1 0 -31.831"
          }, null, 8, _hoisted_4$b),
          createElementVNode("text", {
            x: __props.textXY[0],
            y: __props.textXY[1],
            class: "percentage"
          }, toDisplayString(__props.percent) + "%", 9, _hoisted_5$a)
        ]))
      ]);
    };
  }
};
var FyCirclePercent = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "FyCirclePercent.vue"]]);

var FyvueComponents = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FyLoader: FyLoader,
  FyModal: FyModal,
  FyDatatable: FyDatatable,
  FyConfirm: FyConfirm,
  FyBreadcrumb: FyBreadcrumb,
  FyNotif: FyNotif,
  FyInput: FyInput,
  FyPaging: FyPaging,
  FySteps: FySteps,
  FySelfLoading: FySelfLoading,
  FyTable: FyTable,
  FyCirclePercent: FyCirclePercent
});

var __async$i = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const getUser = () => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("User:get", "GET").catch((err) => {
      reject(err);
    }).then((tmp) => {
      if (tmp.result == "success" && tmp.data && tmp.data.User__) {
        resolve(tmp.data);
      }
      resolve(null);
    });
  });
});
const addGroup = (Name) => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/Group`, "POST", { Name }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const delGroup = (groupUuid) => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/Group/${groupUuid}`, "DELETE", {}).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const delUserFromGroup = (groupUuid, user) => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/Group/${groupUuid}:delMember`, "POST", { user }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const addUserToGroup = (groupUuid, user, access = "R") => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/Group/${groupUuid}:addMember`, "POST", { user, access }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const getGroups = (groupUuid) => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/Group${groupUuid ? "/" + groupUuid : ""}`, "GET", {}).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const decodeMetaLink = (link) => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`MetaObject/Link:decode`, "POST", { id: link }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const joinMetaLink = (link) => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`MetaObject:linkJoin`, "POST", { id: link }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const groupLinkAccess = (groupUuid, access = "R", expires = "+24 hour", type = "permuser") => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`MetaObject/${groupUuid}:linkAccess`, "POST", {
      access,
      expires,
      type
    }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const userLogout = () => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("User:logout", "Post").catch((err) => {
      notificationErrors(err);
    }).then((tmp) => {
      if (tmp.result == "success") {
        resolve(tmp.data);
      }
      resolve(null);
    });
  });
});
const updatePwd = (pwd, newPwd) => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/@:setPassword`, "POST", { old_password: pwd, password: newPwd }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const updateEmail = (pwd, email) => __async$i(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/@:setEmail`, "POST", { email, current_password: pwd }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});

var user = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getUser: getUser,
  addGroup: addGroup,
  delGroup: delGroup,
  delUserFromGroup: delUserFromGroup,
  addUserToGroup: addUserToGroup,
  getGroups: getGroups,
  decodeMetaLink: decodeMetaLink,
  joinMetaLink: joinMetaLink,
  groupLinkAccess: groupLinkAccess,
  userLogout: userLogout,
  updatePwd: updatePwd,
  updateEmail: updateEmail
});

var __async$h = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$c = { key: 0 };
const _hoisted_2$c = ["onSubmit"];
const _hoisted_3$a = { class: "grid grid-cols-2 gap-2" };
const _hoisted_4$a = {
  key: 0,
  class: "form-error-label"
};
const _hoisted_5$9 = {
  class: "btn-defaults mt-4 btn primary",
  type: "submit"
};
const _hoisted_6$8 = { class: "text-lg italic ml-2" };
const _sfc_main$c = {
  __name: "KlbAccountUpdateEmail",
  setup(__props) {
    const eventBus = useEventBus();
    const i18next = useTranslation();
    const user = ref(null);
    const error = ref(null);
    const emailField = ref("");
    const pwd = ref("");
    const rules = {
      emailField: { required, email },
      pwd: { required }
    };
    const v$ = useVuelidate(rules, { emailField, pwd });
    const submitUpdatePwd = () => __async$h(this, null, function* () {
      eventBus.emit("loading", true);
      error.value = null;
      if (yield v$.value.$validate()) {
        let tmp = yield updateEmail(pwd.value, emailField.value).catch((err) => {
          error.value = err.error;
          eventBus.emit("loading", false);
        });
        if (tmp && tmp.result && tmp.result == "success") {
          notify(
            {
              group: "default",
              title: i18next.t("notif_success_title"),
              text: i18next.t("update_success_confirm")
            },
            4e3
          );
          eventBus.emit("loading", false);
          eventBus.emit("UpdateEmailModal", false);
        } else {
          error.value = i18next.t("pwdchange_invalid_password");
          eventBus.emit("loading", false);
        }
      }
      eventBus.emit("loading", false);
    });
    onMounted(() => __async$h(this, null, function* () {
      user.value = yield getUser();
      if (user.value) {
        emailField.value = user.value.Email;
      }
    }));
    return (_ctx, _cache) => {
      const _component_FySelfLoading = resolveComponent("FySelfLoading");
      return user.value ? (openBlock(), createElementBlock("div", _hoisted_1$c, [
        createVNode(FyModal, {
          id: "UpdateEmail",
          title: _ctx.$t("account_title")
        }, {
          default: withCtx(() => [
            createElementVNode("form", {
              onSubmit: withModifiers(submitUpdatePwd, ["prevent"])
            }, [
              createElementVNode("div", _hoisted_3$a, [
                createVNode(FyInput, {
                  id: "currPwd",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("emailchange_pwd_placeholder"),
                  validate: unref(v$).pwd,
                  label: _ctx.$t("emailchange_pwd_label"),
                  type: "password",
                  autocomplete: "off"
                }, null, 8, ["placeholder", "validate", "label"]),
                createVNode(FyInput, {
                  id: "newEmail",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("emailchange_email_placeholder"),
                  validate: unref(v$).emailField,
                  label: _ctx.$t("emailchange_email_label"),
                  autocomplete: "off",
                  type: "email"
                }, null, 8, ["placeholder", "validate", "label"])
              ]),
              error.value ? (openBlock(), createElementBlock("div", _hoisted_4$a, toDisplayString(error.value), 1)) : createCommentVNode("v-if", true),
              createElementVNode("button", _hoisted_5$9, toDisplayString(_ctx.$t("save_new_email_button")), 1)
            ], 40, _hoisted_2$c)
          ]),
          _: 1
        }, 8, ["title"]),
        createElementVNode("button", {
          class: "btn primary btn-defaults inline-block",
          onClick: _cache[0] || (_cache[0] = () => {
            unref(eventBus).emit("UpdateEmailModal", true);
          })
        }, [
          createVNode(unref(render$6), {
            stroke: "currentColor",
            class: "h-5 -mt-0.5 align-middle inline-block"
          }),
          createTextVNode(" " + toDisplayString(_ctx.$t("change_email_btn")), 1)
        ]),
        createElementVNode("span", _hoisted_6$8, toDisplayString(user.value.Email), 1)
      ])) : (openBlock(), createBlock(_component_FySelfLoading, {
        key: 1,
        isLoading: true,
        style: { "height": "55px" },
        size: [40, 40]
      }));
    };
  }
};
var KlbAccountUpdateEmail = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "KlbAccountUpdateEmail.vue"]]);

var __async$g = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$b = { key: 0 };
const _hoisted_2$b = ["onSubmit"];
const _hoisted_3$9 = { class: "" };
const _hoisted_4$9 = {
  key: 0,
  class: "form-error-label"
};
const _hoisted_5$8 = {
  class: "btn-defaults mt-4 btn primary",
  type: "submit"
};
const _sfc_main$b = {
  __name: "KlbAccountUpdatePwd",
  setup(__props) {
    const eventBus = useEventBus();
    const i18next = useTranslation();
    const user = ref(null);
    const error = ref(null);
    const oldPwd = ref("");
    const pwd = ref("");
    const pwdConfirm = ref("");
    const rules = {
      oldPwd: { required },
      pwd: { required },
      pwdConfirm: { req: required, sameAs: sameAs(pwd) }
    };
    const v$ = useVuelidate(rules, { oldPwd, pwd, pwdConfirm });
    const submitUpdatePwd = () => __async$g(this, null, function* () {
      eventBus.emit("loading", true);
      error.value = null;
      if (yield v$.value.$validate()) {
        let tmp = yield updatePwd(oldPwd.value, pwd.value).catch((err) => {
          error.value = err.error;
          eventBus.emit("loading", false);
        });
        if (tmp && tmp.result && tmp.result == "success") {
          notify(
            {
              group: "default",
              title: i18next.t("notif_success_title"),
              text: i18next.t("update_success_confirm")
            },
            4e3
          );
          eventBus.emit("UpdatePwdModal", false);
          eventBus.emit("loading", false);
        } else {
          error.value = i18next.t("pwdchange_invalid_password");
          eventBus.emit("loading", false);
        }
      }
      eventBus.emit("loading", false);
    });
    onMounted(() => __async$g(this, null, function* () {
      user.value = yield getUser();
    }));
    return (_ctx, _cache) => {
      const _component_FySelfLoading = resolveComponent("FySelfLoading");
      return user.value ? (openBlock(), createElementBlock("div", _hoisted_1$b, [
        createVNode(FyModal, {
          id: "UpdatePwd",
          title: _ctx.$t("account_security_title")
        }, {
          default: withCtx(() => [
            createElementVNode("form", {
              onSubmit: withModifiers(submitUpdatePwd, ["prevent"])
            }, [
              createElementVNode("div", _hoisted_3$9, [
                createVNode(FyInput, {
                  id: "pwd",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("pwdchange_old_placeholder"),
                  validate: unref(v$).oldPwd,
                  label: _ctx.$t("pwdchange_old_label"),
                  type: "password",
                  autocomplete: "off"
                }, null, 8, ["placeholder", "validate", "label"]),
                createVNode(FyInput, {
                  id: "pwdNew",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("pwdchange_new_placeholder"),
                  validate: unref(v$).pwd,
                  label: _ctx.$t("pwdchange_new_label"),
                  type: "password",
                  autocomplete: "off"
                }, null, 8, ["placeholder", "validate", "label"]),
                createVNode(FyInput, {
                  id: "pwdNewConfirm",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("pwdchange_new_confirm_placeholder"),
                  validate: unref(v$).pwdConfirm,
                  label: _ctx.$t("pwdchange_new_confirm_label"),
                  type: "password",
                  autocomplete: "off"
                }, null, 8, ["placeholder", "validate", "label"])
              ]),
              error.value ? (openBlock(), createElementBlock("div", _hoisted_4$9, toDisplayString(error.value), 1)) : createCommentVNode("v-if", true),
              createElementVNode("button", _hoisted_5$8, toDisplayString(_ctx.$t("save_new_pwd_button")), 1)
            ], 40, _hoisted_2$b)
          ]),
          _: 1
        }, 8, ["title"]),
        createElementVNode("button", {
          class: "btn primary btn-defaults",
          onClick: _cache[0] || (_cache[0] = () => {
            unref(eventBus).emit("UpdatePwdModal", true);
          })
        }, [
          createVNode(unref(render$6), {
            stroke: "currentColor",
            class: "h-5 -mt-0.5 align-middle inline-block"
          }),
          createTextVNode(" " + toDisplayString(_ctx.$t("change_pwd_btn")), 1)
        ])
      ])) : (openBlock(), createBlock(_component_FySelfLoading, {
        key: 1,
        isLoading: true,
        style: { "height": "55px" },
        size: [40, 40]
      }));
    };
  }
};
var KlbAccountUpdatePwd = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "KlbAccountUpdatePwd.vue"]]);

var __async$f = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const getUserBilling = () => __async$f(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("User/Billing", "GET").catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const updateBillingByID = (id, data) => __async$f(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/Billing/${id}`, "PATCH", data).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const getPaymentHistory = (page = 1) => __async$f(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("Order", "GET", {
      page_no: page,
      results_per_page: 10,
      Status: "completed"
    }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const changePaymentMethodByID = (id, cc_token) => __async$f(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/Billing/Method/${id}:change`, "POST", {
      method: "Stripe",
      cc_token
    }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const getPaymentMethod = () => __async$f(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("Realm/PaymentMethod:methodInfo", "GET", {
      method: "Stripe"
    }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const createBillingProfile = (label, firstname, lastname, zip, country, method, cc_token) => __async$f(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("User/Billing:create", "POST", {
      Label: label,
      First_Name: firstname,
      Last_Name: lastname,
      Zip: zip,
      Country__: country,
      method,
      cc_token
    }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});

var billing = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getUserBilling: getUserBilling,
  updateBillingByID: updateBillingByID,
  getPaymentHistory: getPaymentHistory,
  changePaymentMethodByID: changePaymentMethodByID,
  getPaymentMethod: getPaymentMethod,
  createBillingProfile: createBillingProfile
});

var __async$e = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const getCountries = (data) => __async$e(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("Country", "GET", data).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const getLocationByID = (id) => __async$e(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/Location/${id}`, "GET").catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const updateLocationByID = (id, data) => __async$e(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`User/Location/${id}`, "PATCH", data).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});

var location = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getCountries: getCountries,
  getLocationByID: getLocationByID,
  updateLocationByID: updateLocationByID
});

var __async$d = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$a = { key: 0 };
const _hoisted_2$a = ["onSubmit"];
const _hoisted_3$8 = { class: "grid grid-cols-2 gap-2" };
const _hoisted_4$8 = { class: "input-group" };
const _hoisted_5$7 = { class: "mr-4 w-16" };
const _hoisted_6$7 = {
  class: "label-basic",
  for: "typeDef"
};
const _hoisted_7$5 = { class: "flex-1" };
const _hoisted_8$5 = { class: "input-box" };
const _hoisted_9$5 = ["value"];
const _hoisted_10$5 = {
  class: "block font-extrabold mx-auto p-2 mt-4 btn primary",
  type: "submit"
};
const _hoisted_11$4 = { key: 1 };
const _sfc_main$a = {
  __name: "KlbBillingAddressSingle",
  setup(__props) {
    const eventBus = useEventBus();
    const i18next = useTranslation();
    const countries = useCountries().countries;
    const billing = ref(null);
    const location = ref(null);
    const state = reactive({
      firstname: "",
      lastname: "",
      country: "",
      zip: ""
    });
    const rules = {
      firstname: { required },
      lastname: { required },
      country: { required },
      zip: { required }
    };
    const v$ = useVuelidate(rules, state);
    const user = ref(null);
    const hasBilling = ref(false);
    const submitEditBillingAddress = () => __async$d(this, null, function* () {
      eventBus.emit("loading", true);
      if (yield v$.value.$validate()) {
        let result = yield updateLocationByID(
          billing.value.data[0].User_Location__,
          {
            First_Name: state.firstname,
            Last_Name: state.lastname,
            Zip: state.zip,
            Country__: state.country
          }
        );
        yield updateBillingByID(billing.value.data[0].User_Billing__, {
          User_Location__: result.data.User_Location__,
          Label: billing.value.data[0].Label
        });
        location.value = yield getLocationByID(result.data.User_Location__);
        state.firstname = location.value.data.First_Name;
        state.lastname = location.value.data.Last_Name;
        state.zip = location.value.data.Zip;
        state.country = location.value.data.Country__;
        notify(
          {
            group: "default",
            title: i18next.t("notif_success_title"),
            text: i18next.t("update_success_confirm")
          },
          4e3
        );
      }
      eventBus.emit("loading", false);
    });
    onMounted(() => __async$d(this, null, function* () {
      user.value = yield getUser();
      if (user.value) {
        billing.value = yield getUserBilling();
        if (billing.value.data.length != 0) {
          hasBilling.value = true;
          location.value = yield getLocationByID(
            billing.value.data[0].User_Location__
          );
          state.firstname = location.value.data.First_Name;
          state.lastname = location.value.data.Last_Name;
          state.zip = location.value.data.Zip;
          state.country = location.value.data.Country__;
        }
      }
    }));
    return (_ctx, _cache) => {
      const _component_FyInput = resolveComponent("FyInput");
      const _component_FySelfLoading = resolveComponent("FySelfLoading");
      return user.value ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
        hasBilling.value ? (openBlock(), createElementBlock("form", {
          key: 0,
          onSubmit: withModifiers(submitEditBillingAddress, ["prevent"])
        }, [
          createElementVNode("div", _hoisted_3$8, [
            createVNode(_component_FyInput, {
              id: "billingFirstname",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("billing_create_firstname_placeholder"),
              validate: unref(v$).firstname,
              label: _ctx.$t("billing_create_firstname_label")
            }, null, 8, ["placeholder", "validate", "label"]),
            createVNode(_component_FyInput, {
              id: "billingLastname",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("billing_create_lastname_placeholder"),
              validate: unref(v$).lastname,
              label: _ctx.$t("billing_create_lastname_label")
            }, null, 8, ["placeholder", "validate", "label"]),
            createVNode(_component_FyInput, {
              id: "billingZip",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("billing_create_zip_placeholder"),
              validate: unref(v$).zip,
              label: _ctx.$t("billing_create_zip_label")
            }, null, 8, ["placeholder", "validate", "label"]),
            createElementVNode("div", _hoisted_4$8, [
              createElementVNode("div", _hoisted_5$7, [
                createElementVNode("label", _hoisted_6$7, toDisplayString(_ctx.$t("billing_create_country_label")), 1)
              ]),
              createElementVNode("div", _hoisted_7$5, [
                createElementVNode("div", _hoisted_8$5, [
                  withDirectives(createElementVNode("select", {
                    class: "input-basic",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.country = $event)
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(countries), (country) => {
                      return openBlock(), createElementBlock("option", {
                        value: country.Country__,
                        key: country.Country__
                      }, toDisplayString(country.Name), 9, _hoisted_9$5);
                    }), 128))
                  ], 512), [
                    [vModelSelect, state.country]
                  ])
                ])
              ])
            ])
          ]),
          createElementVNode("button", _hoisted_10$5, toDisplayString(_ctx.$t("save_billing_address")), 1)
        ], 40, _hoisted_2$a)) : (openBlock(), createElementBlock("div", _hoisted_11$4, toDisplayString(_ctx.$t("no_billing_location_yet")), 1))
      ])) : (openBlock(), createBlock(_component_FySelfLoading, {
        key: 1,
        isLoading: true,
        style: { "height": "155px" },
        size: [80, 80]
      }));
    };
  }
};
var KlbBillingAddressSingle = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "KlbBillingAddressSingle.vue"]]);

var __async$c = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$9 = { key: 0 };
const _hoisted_2$9 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_3$7 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_4$7 = ["onSubmit"];
const _hoisted_5$6 = { class: "grid grid-cols-2 gap-2" };
const _hoisted_6$6 = { class: "input-group" };
const _hoisted_7$4 = { class: "mr-4 w-16" };
const _hoisted_8$4 = {
  class: "label-basic",
  for: "typeDef"
};
const _hoisted_9$4 = { class: "flex-1" };
const _hoisted_10$4 = { class: "input-box" };
const _hoisted_11$3 = ["value"];
const _hoisted_12$3 = { class: "input-group w-full" };
const _hoisted_13$3 = { class: "mr-4 w-16" };
const _hoisted_14$2 = {
  class: "label-basic",
  for: "typeDef"
};
const _hoisted_15$2 = /* @__PURE__ */ createElementVNode("div", { class: "w-full" }, [
  /* @__PURE__ */ createElementVNode("div", { class: "input-box w-full" }, [
    /* @__PURE__ */ createElementVNode("div", {
      id: "theCard",
      class: "pl-2 input-basic w-full"
    })
  ])
], -1);
const _hoisted_16$2 = {
  class: "block text-lg font-extrabold mx-auto p-2 mt-4 btn primary",
  type: "submit"
};
const _sfc_main$9 = {
  __name: "KlbBillingProfileCreate",
  props: {
    showOnMount: { type: Boolean, default: false },
    onComplete: { type: Function, default: () => {
    } }
  },
  setup(__props) {
    const props = __props;
    const eventBus = useEventBus();
    const state = reactive({
      label: "",
      firstname: "",
      lastname: "",
      country: "",
      zip: ""
    });
    const rules = {
      label: { required },
      firstname: { required },
      lastname: { required },
      country: { required },
      zip: { required }
    };
    const v$ = useVuelidate(rules, state);
    const user = ref(null);
    const billing = ref(null);
    const countries = useCountries().countries;
    const stripe = ref(null);
    const stripePK = ref(null);
    const stripeCard = ref(null);
    const cardToken = ref(null);
    ref(null);
    const submitBillingCreate = () => __async$c(this, null, function* () {
      if (yield v$.value.$validate()) {
        eventBus.emit("loading", true);
        cardToken.value = yield stripe.value.createToken(stripeCard.value, {
          name: `${state.firstname} ${state.lastname}`,
          email: user.value.Email
        });
        createBillingProfile.value = yield createBillingProfile(
          state.label,
          state.firstname,
          state.lastname,
          state.zip,
          state.country,
          "Stripe",
          cardToken.value.token.id
        );
        eventBus.emit("FirstBillingModal", false);
        user.value = yield getUser();
        eventBus.emit("loading", false);
        props.onComplete(createBillingProfile.value);
      }
    });
    const showBillingModal = () => __async$c(this, null, function* () {
      eventBus.emit("FirstBillingModal", true);
      stripePK.value = yield getPaymentMethod();
      if (stripePK.value && stripePK.value.data && stripePK.value.data.Fields && stripePK.value.data.Fields.cc_token && stripePK.value.data.Fields.cc_token.attributes.key) {
        stripe.value = window.Stripe(
          stripePK.value.data.Fields.cc_token.attributes.key
        );
        stripeCard.value = stripe.value.elements().create("card", { hidePostalCode: true });
        stripeCard.value.mount("#theCard");
      }
    });
    onMounted(() => __async$c(this, null, function* () {
      user.value = yield getUser();
      eventBus.on("ShowCreateBillingProfile", (r) => {
        if (r)
          showBillingModal();
      });
      if (user.value) {
        billing.value = yield getUserBilling();
        if (billing.value.data.length == 0) {
          if (props.showOnMount)
            showBillingModal();
        }
      }
    }));
    return (_ctx, _cache) => {
      return user.value ? (openBlock(), createElementBlock("div", _hoisted_1$9, [
        createVNode(FyModal, {
          id: "FirstBilling",
          title: _ctx.$t("modal_first_billing_title")
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$t("modal_first_billing_description")), 1),
            _hoisted_2$9,
            _hoisted_3$7,
            createElementVNode("form", {
              onSubmit: withModifiers(submitBillingCreate, ["prevent"])
            }, [
              createVNode(FyInput, {
                id: "billingLabel",
                req: true,
                showLabel: true,
                placeholder: _ctx.$t("billing_create_label_placeholder"),
                validate: unref(v$).label,
                label: _ctx.$t("billing_create_label_label")
              }, null, 8, ["placeholder", "validate", "label"]),
              createElementVNode("div", _hoisted_5$6, [
                createVNode(FyInput, {
                  id: "billingFirstname",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("billing_create_firstname_placeholder"),
                  validate: unref(v$).firstname,
                  label: _ctx.$t("billing_create_firstname_label")
                }, null, 8, ["placeholder", "validate", "label"]),
                createVNode(FyInput, {
                  id: "billingLastname",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("billing_create_lastname_placeholder"),
                  validate: unref(v$).lastname,
                  label: _ctx.$t("billing_create_lastname_label")
                }, null, 8, ["placeholder", "validate", "label"]),
                createVNode(FyInput, {
                  id: "billingZip",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("billing_create_zip_placeholder"),
                  validate: unref(v$).zip,
                  label: _ctx.$t("billing_create_zip_label")
                }, null, 8, ["placeholder", "validate", "label"]),
                createElementVNode("div", _hoisted_6$6, [
                  createElementVNode("div", _hoisted_7$4, [
                    createElementVNode("label", _hoisted_8$4, toDisplayString(_ctx.$t("billing_create_country_label")), 1)
                  ]),
                  createElementVNode("div", _hoisted_9$4, [
                    createElementVNode("div", _hoisted_10$4, [
                      withDirectives(createElementVNode("select", {
                        class: "input-basic",
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.country = $event)
                      }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(countries), (country) => {
                          return openBlock(), createElementBlock("option", {
                            value: country.Country__,
                            key: country.Country__
                          }, toDisplayString(country.Name), 9, _hoisted_11$3);
                        }), 128))
                      ], 512), [
                        [vModelSelect, state.country]
                      ])
                    ])
                  ])
                ])
              ]),
              createElementVNode("div", _hoisted_12$3, [
                createElementVNode("div", _hoisted_13$3, [
                  createElementVNode("label", _hoisted_14$2, toDisplayString(_ctx.$t("billing_create_creditcard_label")), 1)
                ]),
                _hoisted_15$2
              ]),
              createElementVNode("button", _hoisted_16$2, toDisplayString(_ctx.$t("create_billing_profile")), 1)
            ], 40, _hoisted_4$7)
          ]),
          _: 1
        }, 8, ["title"])
      ])) : createCommentVNode("v-if", true);
    };
  }
};
var KlbBillingProfileCreate = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "KlbBillingProfileCreate.vue"]]);

var __async$b = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$8 = { key: 0 };
const _hoisted_2$8 = { key: 0 };
const _hoisted_3$6 = ["onSubmit"];
const _hoisted_4$6 = { class: "input-group w-full" };
const _hoisted_5$5 = { class: "mr-4 w-16" };
const _hoisted_6$5 = {
  class: "label-basic",
  for: "typeDef"
};
const _hoisted_7$3 = /* @__PURE__ */ createElementVNode("div", { class: "w-full" }, [
  /* @__PURE__ */ createElementVNode("div", { class: "input-box w-full pl-2" }, [
    /* @__PURE__ */ createElementVNode("div", {
      id: "theCard",
      class: "input-basic w-full"
    })
  ])
], -1);
const _hoisted_8$3 = {
  class: "block font-extrabold mx-auto p-2 mt-4 btn primary",
  type: "submit"
};
const _hoisted_9$3 = {
  key: 1,
  class: ""
};
const _hoisted_10$3 = { key: 0 };
const _hoisted_11$2 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_12$2 = { key: 1 };
const _hoisted_13$2 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _sfc_main$8 = {
  __name: "KlbBillingUpdatePayment",
  props: {
    includeProfileModal: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const eventBus = useEventBus();
    const user = ref(null);
    const billing = ref(null);
    const isEditing = ref(false);
    const stripe = ref(null);
    const stripePK = ref(null);
    const stripeCard = ref(null);
    const cardToken = ref(null);
    const location = ref(null);
    const i18next = useTranslation();
    const hasBilling = ref(false);
    const switchToEdit = () => __async$b(this, null, function* () {
      isEditing.value = true;
      stripePK.value = yield getPaymentMethod();
      if (stripePK.value && stripePK.value.data && stripePK.value.data.Fields && stripePK.value.data.Fields.cc_token && stripePK.value.data.Fields.cc_token.attributes.key) {
        stripe.value = window.Stripe(
          stripePK.value.data.Fields.cc_token.attributes.key
        );
        stripeCard.value = stripe.value.elements().create("card", { hidePostalCode: true });
        stripeCard.value.mount("#theCard");
      }
    });
    const submitEditPaymentInfo = () => __async$b(this, null, function* () {
      eventBus.emit("loading", true);
      cardToken.value = yield stripe.value.createToken(stripeCard.value, {
        name: `${location.value.data.First_Name} ${location.value.data.Last_Name}`,
        email: user.value.Email
      });
      yield changePaymentMethodByID(
        billing.value.Methods[0].User_Billing_Method__,
        cardToken.value.token.id
      );
      billing.value = yield getUserBilling();
      if (billing.value.data.length != 0) {
        location.value = yield getLocationByID(
          billing.value.data[0].User_Location__
        );
        billing.value = billing.value.data[0];
      }
      isEditing.value = false;
      eventBus.emit("loading", false);
      notify(
        {
          group: "default",
          title: i18next.t("notif_success_title"),
          text: i18next.t("update_success_confirm")
        },
        4e3
      );
    });
    onMounted(() => __async$b(this, null, function* () {
      user.value = yield getUser();
      if (user.value) {
        billing.value = yield getUserBilling();
        if (billing.value.data.length != 0) {
          hasBilling.value = true;
          location.value = yield getLocationByID(
            billing.value.data[0].User_Location__
          );
          billing.value = billing.value.data[0];
        }
      }
    }));
    return (_ctx, _cache) => {
      const _component_FySelfLoading = resolveComponent("FySelfLoading");
      return user.value ? (openBlock(), createElementBlock("div", _hoisted_1$8, [
        hasBilling.value ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
          isEditing.value ? (openBlock(), createElementBlock("form", {
            key: 0,
            onSubmit: withModifiers(submitEditPaymentInfo, ["prevent"])
          }, [
            createElementVNode("div", _hoisted_4$6, [
              createElementVNode("div", _hoisted_5$5, [
                createElementVNode("label", _hoisted_6$5, toDisplayString(_ctx.$t("billing_create_creditcard_label")), 1)
              ]),
              _hoisted_7$3
            ]),
            createElementVNode("button", _hoisted_8$3, toDisplayString(_ctx.$t("save_billing_data")), 1)
          ], 40, _hoisted_3$6)) : (openBlock(), createElementBlock("div", _hoisted_9$3, [
            billing.value && billing.value.Methods && billing.value.Methods.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_10$3, [
              createTextVNode(toDisplayString(_ctx.$t("payment_method_billing")) + ": ", 1),
              createElementVNode("b", null, toDisplayString(billing.value.Methods[0].Name), 1),
              _hoisted_11$2,
              createTextVNode(" " + toDisplayString(_ctx.$t("payment_method_exp")) + ": ", 1),
              createElementVNode("b", null, toDisplayString(billing.value.Methods[0].Expiration), 1),
              createElementVNode("button", {
                class: "block font-extrabold mx-auto p-2 mt-4 btn primary",
                onClick: switchToEdit
              }, toDisplayString(_ctx.$t("edit_billing_method")), 1)
            ])) : createCommentVNode("v-if", true)
          ]))
        ])) : (openBlock(), createElementBlock("div", _hoisted_12$2, [
          createTextVNode(toDisplayString(_ctx.$t("no_payment_information_yet")), 1),
          _hoisted_13$2,
          createTextVNode(),
          createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = () => {
              unref(eventBus).emit("ShowCreateBillingProfile", true);
            }),
            class: "btn primary btn-defaults"
          }, toDisplayString(_ctx.$t("add_payment_method_cta")), 1)
        ]))
      ])) : (openBlock(), createBlock(_component_FySelfLoading, {
        key: 1,
        isLoading: true,
        style: { "height": "60px" },
        size: [45, 45]
      }));
    };
  }
};
var KlbBillingUpdatePayment = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "KlbBillingUpdatePayment.vue"]]);

var __async$a = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$7 = { class: "w-full" };
const _hoisted_2$7 = {
  key: 0,
  class: "message"
};
const _hoisted_3$5 = {
  key: 0,
  class: "input-group"
};
const _hoisted_4$5 = ["for"];
const _hoisted_5$4 = {
  key: 0,
  class: "mandatory"
};
const _hoisted_6$4 = { class: "flex-1" };
const _hoisted_7$2 = { class: "input-box" };
const _hoisted_8$2 = ["placeholder", "type", "onUpdate:modelValue", "id"];
const _hoisted_9$2 = {
  key: 0,
  class: "form-error-label"
};
const _hoisted_10$2 = {
  key: 2,
  class: "mt-6"
};
const _hoisted_11$1 = ["for"];
const _hoisted_12$1 = ["id", "onUpdate:modelValue"];
const _hoisted_13$1 = { class: "ml-2" };
const _hoisted_14$1 = ["href"];
const _hoisted_15$1 = {
  key: 0,
  class: "mandatory"
};
const _hoisted_16$1 = {
  key: 0,
  class: "oauth-container"
};
const _hoisted_17$1 = ["onClick"];
const _hoisted_18$1 = ["alt", "src"];
const _hoisted_19$1 = {
  key: 1,
  class: "response-error"
};
const _hoisted_21$1 = {
  key: 0,
  class: "response-error"
};
const _hoisted_22$1 = /* @__PURE__ */ createElementVNode("br", { style: { "clear": "both" } }, null, -1);
const _hoisted_23$1 = { key: 1 };
const _sfc_main$7 = {
  __name: "KlbSignInSignUp",
  props: {
    returnDefault: { type: String, default: "/" },
    forceAction: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const state = reactive({
      userEmail: ""
    });
    const rules = {
      userEmail: { required }
    };
    const eventBus = useEventBus();
    const v$ = useVuelidate(rules, state);
    const route = useRoute();
    const returnTo = ref(props.returnDefault);
    const responseMessage = ref(null);
    const responseError = ref(null);
    const responseReq = ref([]);
    const responseFields = ref([]);
    const response = ref(null);
    const hasOauth = ref(false);
    const fieldsError = ref({});
    const store = useStore();
    const pwdRecoverMailSent = ref(null);
    const pwdRecoverError = ref(false);
    const inputs = ref([]);
    const formData = ref({
      return_to: "/l/en-US/",
      session: null,
      action: props.forceAction ? props.forceAction : void 0
    });
    const completed = ref(false);
    const forgotPassword = () => __async$a(this, null, function* () {
      if (yield v$.value.$validate()) {
        let data = yield rest("User:forgot_password", "POST", {
          login: state.userEmail
        }).catch((err) => {
          pwdRecoverError.value = err;
        });
        if (data.result == "success") {
          pwdRecoverMailSent.value = true;
        } else {
          console.log(data);
        }
      }
    });
    const userFlow = (..._0) => __async$a(this, [..._0], function* (params = { initial: false }) {
      eventBus.emit("loading", true);
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
          eventBus.emit("loading", false);
          return;
        }
      }
      if (params.oauth) {
        formData.value.oauth2 = params.oauth;
      }
      returnTo.value = route.query.return_to ? route.query.return_to : props.returnDefault;
      if (!formData.value.session) {
        formData.value.session = route.query.session ? route.query.session : void 0;
      }
      response.value = yield rest("User:flow", "POST", formData.value).catch(
        (err) => {
          responseError.value = err;
          if (responseError.value.param) {
            fieldsError.value[responseError.value.param] = responseError.value.token;
          }
          eventBus.emit("loading", false);
          return;
        }
      );
      if (response.value.result == "success") {
        if (response.value.data.url) {
          window.location = response.value.data.url;
          return;
        }
        if (response.value.data.complete == true && response.value.data.user) {
          store.dispatch("setSession", response.value.data.user.User__).then(() => {
            completed.value = true;
            window.location = returnTo.value;
          });
          return;
        }
        formData.value = {
          session: response.value.data.session
        };
        inputs.value = [];
        state.userEmail = response.value.data.email;
        responseFields.value = response.value.data.fields;
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
        }, 500);
      } else {
        console.log(response);
      }
      eventBus.emit("loading", false);
    });
    onMounted(() => __async$a(this, null, function* () {
      yield userFlow({ intial: true });
    }));
    return (_ctx, _cache) => {
      const _component_FyInput = resolveComponent("FyInput");
      const _component_FyModal = resolveComponent("FyModal");
      return openBlock(), createElementBlock(Fragment, null, [
        !completed.value ? (openBlock(), createElementBlock("form", {
          key: 0,
          onSubmit: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.onSubmit && _ctx.onSubmit(...args), ["prevent"])),
          class: "klb-login"
        }, [
          createElementVNode("div", _hoisted_1$7, [
            createElementVNode("h1", null, toDisplayString(_ctx.$t("user_flow_title")), 1),
            responseMessage.value ? (openBlock(), createElementBlock("h2", _hoisted_2$7, toDisplayString(responseMessage.value), 1)) : createCommentVNode("v-if", true),
            responseFields.value.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(responseFields.value, (field) => {
                return openBlock(), createElementBlock(Fragment, {
                  key: field.label
                }, [
                  field.type == "label" ? (openBlock(), createElementBlock("h3", {
                    key: 0,
                    class: normalizeClass$1(["label", field.style == "error" ? "response-error" : ""])
                  }, toDisplayString(field.label), 3)) : createCommentVNode("v-if", true),
                  field.cat == "input" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    field.type == "text" || field.type == "password" || field.type == "email" ? (openBlock(), createElementBlock("div", _hoisted_3$5, [
                      createElementVNode("div", null, [
                        createElementVNode("label", {
                          class: "label-basic",
                          for: `login${field.name}`
                        }, [
                          createTextVNode(toDisplayString(field.label) + " ", 1),
                          responseReq.value.includes(field.name) ? (openBlock(), createElementBlock("sup", _hoisted_5$4, "*")) : createCommentVNode("v-if", true)
                        ], 8, _hoisted_4$5)
                      ]),
                      createElementVNode("div", _hoisted_6$4, [
                        createElementVNode("div", _hoisted_7$2, [
                          withDirectives(createElementVNode("input", {
                            placeholder: field.name == "name" ? "John Doe" : field.label,
                            class: normalizeClass$1([fieldsError.value[field.name] ? "error-form" : "", "input-basic"]),
                            type: field.type,
                            "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                            id: `login${field.name}`,
                            ref_for: true,
                            ref: (el) => {
                              if (el)
                                inputs.value.push(el);
                            }
                          }, null, 10, _hoisted_8$2), [
                            [vModelDynamic, formData.value[field.name]]
                          ])
                        ]),
                        fieldsError.value[field.name] ? (openBlock(), createElementBlock("div", _hoisted_9$2, toDisplayString(_ctx.$t(fieldsError.value[field.name])), 1)) : createCommentVNode("v-if", true)
                      ])
                    ])) : createCommentVNode("v-if", true)
                  ], 64)) : createCommentVNode("v-if", true),
                  field.type == "checkbox" ? (openBlock(), createElementBlock("div", _hoisted_10$2, [
                    createElementVNode("label", {
                      class: "inline-flex text-xs",
                      for: `login${field.name}`
                    }, [
                      withDirectives(createElementVNode("input", {
                        type: "checkbox",
                        class: normalizeClass$1(["form-checkbox", fieldsError.value[field.name] ? "error-form" : ""]),
                        id: `login${field.name}`,
                        "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                        "true-value": true,
                        "false-value": false
                      }, null, 10, _hoisted_12$1), [
                        [vModelCheckbox, formData.value[field.name]]
                      ]),
                      createElementVNode("span", _hoisted_13$1, [
                        createElementVNode("a", {
                          class: "chekbox-label",
                          href: field.link,
                          target: "_blank"
                        }, toDisplayString(field.label), 9, _hoisted_14$1),
                        createTextVNode("\xA0 "),
                        responseReq.value.includes(field.name) ? (openBlock(), createElementBlock("sup", _hoisted_15$1, "*")) : createCommentVNode("v-if", true)
                      ])
                    ], 8, _hoisted_11$1)
                  ])) : createCommentVNode("v-if", true)
                ], 64);
              }), 128)),
              hasOauth.value ? (openBlock(), createElementBlock("div", _hoisted_16$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(responseFields.value, (field) => {
                  return openBlock(), createElementBlock(Fragment, {
                    key: field.id
                  }, [
                    field.type && field.type == "oauth2" ? (openBlock(), createElementBlock("a", {
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
                        style: normalizeStyle$1(`background: ${field.button["background-color"]}`)
                      }, null, 12, _hoisted_18$1))
                    ], 8, _hoisted_17$1)) : createCommentVNode("v-if", true)
                  ], 64);
                }), 128))
              ])) : createCommentVNode("v-if", true),
              responseError.value ? (openBlock(), createElementBlock("div", _hoisted_19$1, toDisplayString(_ctx.$t(responseError.value.token)), 1)) : createCommentVNode("v-if", true),
              responseReq.value.includes("password") && 0 ? (openBlock(), createElementBlock("div", _hoisted_20, [
                createElementVNode("a", {
                  href: "javascript:void(0)",
                  onClick: _cache[0] || (_cache[0] = () => {
                    _ctx.$eventBus.emit("ResetPasswordModal", true);
                    pwdRecoverMailSent.value = false;
                  })
                }, toDisplayString(_ctx.$t("recover_pwd_link")), 1)
              ])) : createCommentVNode("v-if", true),
              createElementVNode("button", {
                onClick: _cache[1] || (_cache[1] = () => {
                  userFlow();
                }),
                class: "btn primary btn-defaults"
              }, toDisplayString(_ctx.$t("cta_login_next")), 1)
            ], 64)) : createCommentVNode("v-if", true)
          ])
        ], 32)) : createCommentVNode("v-if", true),
        createVNode(_component_FyModal, {
          id: "ResetPassword",
          title: `${_ctx.$t("recover_pwd_title")}`
        }, {
          default: withCtx(() => [
            !pwdRecoverMailSent.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(_component_FyInput, {
                id: "emailRecover",
                req: true,
                showLabel: true,
                placeholder: _ctx.$t("recover_pwd_email_placeholder"),
                validate: unref(v$).userEmail,
                type: "email",
                label: _ctx.$t("recover_pwd_email_label")
              }, null, 8, ["placeholder", "validate", "label"]),
              pwdRecoverError.value ? (openBlock(), createElementBlock("div", _hoisted_21$1, toDisplayString(_ctx.$(pwdRecoverError.value.token)), 1)) : createCommentVNode("v-if", true),
              createElementVNode("a", {
                href: "javascript:void(0)",
                onClick: _cache[3] || (_cache[3] = ($event) => forgotPassword()),
                class: "mt-2 float-right btn px-5 py-2 primary"
              }, toDisplayString(_ctx.$t("recover_pwd_cta")), 1),
              _hoisted_22$1
            ], 64)) : (openBlock(), createElementBlock("div", _hoisted_23$1, toDisplayString(_ctx.$t("pwd_recover_confirm")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64);
    };
  }
};
var KlbSignInSignUp = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "KlbSignInSignUp.vue"]]);

var __async$9 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const catalogSearch = (sort = "Basic.Priority:asc") => __async$9(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("/Catalog/Product:search", "GET", { sort }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const addProductToCart = (id_product) => __async$9(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("Catalog/Cart/@:process", "POST", { request: id_product }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const getOrder = (uid) => __async$9(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest(`Order/${uid}`, "GET").catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const orderProcess = () => __async$9(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("Catalog/Cart/@:process", "GET").catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const orderProcessPost = (_0, ..._1) => __async$9(void 0, [_0, ..._1], function* (order, data = {}) {
  return new Promise((resolve, reject) => {
    rest(`Order/${order}:process`, "POST", data).catch((err) => {
      console.log("orderProcessPayment" + err);
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const resetCart = () => __async$9(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("Catalog/Cart/@:reset", "POST", {}).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const getCart = () => __async$9(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("/Catalog/Cart", "GET").catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});
const cartCreateOrder = (billing) => __async$9(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    rest("Catalog/Cart/@:createOrder", "POST", { Billing: billing }).catch((err) => {
      notificationErrors(err);
    }).then((result) => resolve(result));
  });
});

var order = /*#__PURE__*/Object.freeze({
  __proto__: null,
  catalogSearch: catalogSearch,
  addProductToCart: addProductToCart,
  getOrder: getOrder,
  orderProcess: orderProcess,
  orderProcessPost: orderProcessPost,
  resetCart: resetCart,
  getCart: getCart,
  cartCreateOrder: cartCreateOrder
});

var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __async$8 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$6 = ["onSubmit"];
const _hoisted_2$6 = { class: "grid grid-cols-1 md:grid-cols-2 mb-4" };
const _hoisted_3$4 = { class: "font-bold mt-4 mb-1" };
const _hoisted_4$4 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_5$3 = { class: "font-bold mt-4 mb-1" };
const _hoisted_6$3 = { class: "font-bold font-heading" };
const _hoisted_7$1 = { class: "mt-2 mb-8 font-normal ml-1" };
const _hoisted_8$1 = { key: 0 };
const _hoisted_9$1 = { class: "input-group w-full" };
const _hoisted_10$1 = { class: "mr-4 w-16" };
const _hoisted_11 = {
  class: "label-basic",
  for: "typeDef"
};
const _hoisted_12 = { class: "w-full" };
const _hoisted_13 = { class: "input-box w-full" };
const _hoisted_14 = {
  key: 0,
  class: "input-group"
};
const _hoisted_15 = {
  key: 0,
  class: "form-error-label"
};
const _hoisted_16 = {
  key: 1,
  class: "font-medium"
};
const _hoisted_17 = ["href"];
const _hoisted_18 = {
  key: 1,
  class: "w-full"
};
const _hoisted_19 = ["for"];
const _hoisted_20$1 = {
  key: 0,
  class: "text-red-700"
};
const _hoisted_21 = { class: "input-box" };
const _hoisted_22 = ["placeholder", "type", "onUpdate:modelValue", "id"];
const _hoisted_23 = {
  key: 0,
  class: "error-form mt-4"
};
const _hoisted_24 = {
  key: 2,
  class: "mt-6"
};
const _hoisted_25 = ["for"];
const _hoisted_26 = ["id", "onUpdate:modelValue", "value", "true-value"];
const _hoisted_27 = { class: "ml-2" };
const _hoisted_28 = {
  key: 1,
  class: "text-lg mt-1"
};
const _hoisted_29 = {
  class: "block font-extrabold mx-auto px-4 py-3 mt-4 btn primary",
  type: "submit"
};
const _sfc_main$6 = {
  __name: "KlbProcessOrder",
  props: { orderUuid: String, onComplete: Function },
  setup(__props) {
    const props = __props;
    const user = ref(null);
    const order = ref(null);
    const session = ref(null);
    const currentMethod = ref(null);
    const methodProperties = reactive({});
    const formData = reactive({});
    const theCard = ref(null);
    const eventBus = useEventBus();
    watch(theCard, (v) => {
      if (v && currentMethod.value == "Stripe") {
        methodProperties.stripeCard = methodProperties.stripe.elements().create("card", { hidePostalCode: true });
        methodProperties.stripeCard.mount("#theCard");
      }
    });
    const processOrder = () => __async$8(this, null, function* () {
      eventBus.emit("loading", true);
      if (currentMethod.value == "Stripe") {
        methodProperties.cardToken = yield methodProperties.stripe.createToken(
          methodProperties.stripeCard,
          {
            name: `${order.value.data.order.Billing_User_Location.Display_Name}`,
            email: user.value.Email
          }
        );
        let data = __spreadValues$1({}, formData);
        data.session = session.value;
        data.cc_token = methodProperties.cardToken.token.id;
        data.method = currentMethod.value;
        let orderResult = yield orderProcessPost(props.orderUuid, data);
        props.onComplete(orderResult);
      } else if (currentMethod.value == "Free") {
        let data = __spreadValues$1({}, formData);
        data.session = session.value;
        data.method = currentMethod.value;
        let orderResult = yield orderProcessPost(props.orderUuid, data);
        props.onComplete(orderResult);
      }
      eventBus.emit("loading", false);
    });
    onMounted(() => __async$8(this, null, function* () {
      user.value = yield getUser();
      order.value = yield orderProcessPost(props.orderUuid);
      order.value.data.methods_order.forEach((method) => {
        if (method == "Stripe") {
          currentMethod.value = "Stripe";
          session.value = order.value.data.methods[method].session;
          methodProperties.stripe = window.Stripe(
            order.value.data.methods[method].fields.cc_token.attributes.key
          );
        } else if (method == "Free") {
          session.value = order.value.data.methods[method].session;
          console.log(order.value.data.methods);
          currentMethod.value = "Free";
        }
        for (const [key, value] of Object.entries(
          order.value.data.methods[method].fields
        )) {
          formData[key] = null;
          if (value.attributes.value) {
            formData[key] = value.attributes.value.toString();
          }
        }
      });
    }));
    return (_ctx, _cache) => {
      const _component_FySelfLoading = resolveComponent("FySelfLoading");
      return order.value && order.value.data && order.value.data.methods && currentMethod.value ? (openBlock(), createElementBlock("form", {
        key: 0,
        onSubmit: withModifiers(processOrder, ["prevent"])
      }, [
        createElementVNode("div", _hoisted_2$6, [
          createElementVNode("div", null, [
            createElementVNode("h3", _hoisted_3$4, toDisplayString(_ctx.$t("order_process_location_data")), 1),
            createTextVNode(" " + toDisplayString(order.value.data.order.Billing_User_Location.Display_Name) + " ", 1),
            _hoisted_4$4,
            createTextVNode(toDisplayString(order.value.data.order.Billing_User_Location.Zip) + " " + toDisplayString(order.value.data.order.Billing_User_Location.Country.name), 1)
          ]),
          createElementVNode("div", null, [
            createElementVNode("h3", _hoisted_5$3, toDisplayString(_ctx.$t("order_process_products")), 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(order.value.data.order.Items, (item, index) => {
              return openBlock(), createElementBlock("div", { key: index }, [
                createTextVNode(toDisplayString(item.Catalog_Product["Basic.Name"]) + " - ", 1),
                createElementVNode("span", _hoisted_6$3, [
                  createTextVNode(toDisplayString(item.Price.display) + " ", 1),
                  createElementVNode("sup", _hoisted_7$1, toDisplayString(_ctx.$t("per_month_product")), 1)
                ])
              ]);
            }), 128))
          ])
        ]),
        currentMethod.value == "Stripe" ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
          createElementVNode("div", _hoisted_9$1, [
            createElementVNode("div", _hoisted_10$1, [
              createElementVNode("label", _hoisted_11, toDisplayString(_ctx.$t("billing_create_creditcard_label")), 1)
            ]),
            createElementVNode("div", _hoisted_12, [
              createElementVNode("div", _hoisted_13, [
                createElementVNode("div", {
                  id: "theCard",
                  ref_key: "theCard",
                  ref: theCard,
                  class: "input-basic w-full",
                  style: { "padding-left": "0.5rem" }
                }, null, 512)
              ])
            ])
          ])
        ])) : createCommentVNode("v-if", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(order.value.data.methods[currentMethod.value].fields, (field, key) => {
          return openBlock(), createElementBlock("div", {
            key: field.method
          }, [
            key != "cc_token" && currentMethod.value == "Stripe" ? (openBlock(), createElementBlock("div", _hoisted_14, [
              field.type == "label" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                field.style == "error" ? (openBlock(), createElementBlock("p", _hoisted_15, toDisplayString(field.label), 1)) : (openBlock(), createElementBlock("p", _hoisted_16, [
                  field.link !== void 0 ? (openBlock(), createElementBlock("a", {
                    key: 0,
                    class: "underline",
                    href: field.link
                  }, toDisplayString(field.label), 9, _hoisted_17)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(field.label), 1)
                  ], 64))
                ]))
              ], 64)) : createCommentVNode("v-if", true),
              field.type == "input" || field.type == "password" || field.type == "email" ? (openBlock(), createElementBlock("div", _hoisted_18, [
                createElementVNode("label", {
                  class: "label-basic my-4",
                  for: `form_${key}`
                }, [
                  createTextVNode(toDisplayString(field.label) + " ", 1),
                  _ctx.req.includes(key) ? (openBlock(), createElementBlock("sup", _hoisted_20$1, "*")) : createCommentVNode("v-if", true)
                ], 8, _hoisted_19),
                createElementVNode("div", _hoisted_21, [
                  withDirectives(createElementVNode("input", {
                    placeholder: key == "name" ? "John Doe" : field.label,
                    class: "input-basic",
                    type: field.type,
                    "onUpdate:modelValue": ($event) => formData[key] = $event,
                    id: `form_${key}`,
                    ref_for: true,
                    ref: `form_${key}`
                  }, null, 8, _hoisted_22), [
                    [vModelDynamic, formData[key]]
                  ]),
                  renderSlot(_ctx.$slots, "icon")
                ]),
                key in _ctx.errors ? (openBlock(), createElementBlock("div", _hoisted_23, toDisplayString(_ctx.errors[key]), 1)) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true),
              field.type == "checkbox" ? (openBlock(), createElementBlock("div", _hoisted_24, [
                createElementVNode("label", {
                  class: "inline-flex text-xs",
                  for: `form_${key}`
                }, [
                  withDirectives(createElementVNode("input", {
                    type: "checkbox",
                    class: "form-checkbox",
                    id: `form_${key}`,
                    "onUpdate:modelValue": ($event) => formData[key] = $event,
                    value: field.attributes.value,
                    "true-value": field.attributes.value,
                    "false-value": "0"
                  }, null, 8, _hoisted_26), [
                    [vModelCheckbox, formData[key]]
                  ]),
                  createElementVNode("span", _hoisted_27, toDisplayString(_ctx.$t(field.caption)), 1)
                ], 8, _hoisted_25)
              ])) : createCommentVNode("v-if", true)
            ])) : createCommentVNode("v-if", true)
          ]);
        }), 128)),
        order.value ? (openBlock(), createElementBlock("div", _hoisted_28, [
          createTextVNode(" Total: "),
          createElementVNode("b", null, toDisplayString(order.value.data.order.Total.display), 1)
        ])) : createCommentVNode("v-if", true),
        createElementVNode("button", _hoisted_29, toDisplayString(_ctx.$t("process_order_cta")), 1)
      ], 40, _hoisted_1$6)) : (openBlock(), createBlock(_component_FySelfLoading, {
        key: 1,
        isLoading: true,
        style: { "height": "155px" },
        size: [80, 80]
      }));
    };
  }
};
var KlbProcessOrder = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "KlbProcessOrder.vue"]]);

var __async$7 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$5 = { key: 0 };
const _hoisted_2$5 = ["onSubmit"];
const _hoisted_3$3 = { class: "grid grid-cols-2 gap-2" };
const _hoisted_4$3 = { class: "input-group" };
const _hoisted_5$2 = { class: "mr-4 w-16" };
const _hoisted_6$2 = {
  class: "label-basic",
  for: "typeDef"
};
const _hoisted_7 = { class: "flex-1" };
const _hoisted_8 = { class: "input-box" };
const _hoisted_9 = ["value"];
const _hoisted_10 = {
  class: "block font-extrabold mx-auto px-4 py-3 mt-4 btn primary",
  type: "submit"
};
const _sfc_main$5 = {
  __name: "KlbBillingAddressCreateOrder",
  props: { onComplete: Function },
  setup(__props) {
    const props = __props;
    const eventBus = useEventBus();
    const countries = useCountries().countries;
    const billing = ref(null);
    const location = ref(null);
    const state = reactive({
      firstname: "",
      lastname: "",
      country: "",
      zip: ""
    });
    const rules = {
      firstname: { required },
      lastname: { required },
      country: { required },
      zip: { required }
    };
    const v$ = useVuelidate(rules, state);
    const user = ref(null);
    const submitEditBillingAddress = () => __async$7(this, null, function* () {
      eventBus.emit("loading", true);
      if (yield v$.value.$validate()) {
        let result = yield cartCreateOrder({
          First_Name: state.firstname,
          Last_Name: state.lastname,
          Zip: state.zip,
          Country__: state.country
        });
        if (result.result == "success") {
          props.onComplete(result.data.Order__);
        }
      }
      eventBus.emit("loading", false);
    });
    onMounted(() => __async$7(this, null, function* () {
      user.value = yield getUser();
      if (user.value) {
        billing.value = yield getUserBilling();
        if (billing.value.data.length != 0) {
          location.value = yield getLocationByID(
            billing.value.data[0].User_Location__
          );
          state.firstname = location.value.data.First_Name;
          state.lastname = location.value.data.Last_Name;
          state.zip = location.value.data.Zip;
          state.country = location.value.data.Country__;
        }
      }
    }));
    return (_ctx, _cache) => {
      const _component_FyInput = resolveComponent("FyInput");
      const _component_FySelfLoading = resolveComponent("FySelfLoading");
      return user.value ? (openBlock(), createElementBlock("div", _hoisted_1$5, [
        createElementVNode("form", {
          onSubmit: withModifiers(submitEditBillingAddress, ["prevent"])
        }, [
          createElementVNode("div", _hoisted_3$3, [
            createVNode(_component_FyInput, {
              id: "billingFirstname",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("billing_create_firstname_placeholder"),
              validate: unref(v$).firstname,
              label: _ctx.$t("billing_create_firstname_label")
            }, null, 8, ["placeholder", "validate", "label"]),
            createVNode(_component_FyInput, {
              id: "billingLastname",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("billing_create_lastname_placeholder"),
              validate: unref(v$).lastname,
              label: _ctx.$t("billing_create_lastname_label")
            }, null, 8, ["placeholder", "validate", "label"]),
            createVNode(_component_FyInput, {
              id: "billingZip",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("billing_create_zip_placeholder"),
              validate: unref(v$).zip,
              label: _ctx.$t("billing_create_zip_label")
            }, null, 8, ["placeholder", "validate", "label"]),
            createElementVNode("div", _hoisted_4$3, [
              createElementVNode("div", _hoisted_5$2, [
                createElementVNode("label", _hoisted_6$2, toDisplayString(_ctx.$t("billing_create_country_label")), 1)
              ]),
              createElementVNode("div", _hoisted_7, [
                createElementVNode("div", _hoisted_8, [
                  withDirectives(createElementVNode("select", {
                    class: "input-basic",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.country = $event)
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(countries), (country) => {
                      return openBlock(), createElementBlock("option", {
                        value: country.Country__,
                        key: country.Country__
                      }, toDisplayString(country.Name), 9, _hoisted_9);
                    }), 128))
                  ], 512), [
                    [vModelSelect, state.country]
                  ])
                ])
              ])
            ])
          ]),
          createElementVNode("button", _hoisted_10, toDisplayString(_ctx.$t("cta_next")), 1)
        ], 40, _hoisted_2$5)
      ])) : (openBlock(), createBlock(_component_FySelfLoading, {
        key: 1,
        isLoading: true,
        style: { "height": "155px" },
        size: [80, 80]
      }));
    };
  }
};
var KlbBillingAddressCreateOrder = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "KlbBillingAddressCreateOrder.vue"]]);

var __async$6 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$4 = ["href"];
const _hoisted_2$4 = { class: "uppercase block mx-auto bg-blue-200 rounded p-1" };
const _hoisted_3$2 = { class: "uppercase block mx-auto bg-blue-200 rounded p-1" };
const _hoisted_4$2 = {
  key: 2,
  class: "text-center default-p"
};
const _sfc_main$4 = {
  __name: "KlbBillingHistory",
  setup(__props) {
    const user = ref(null);
    const paymentHistory = ref(null);
    const paging = ref(null);
    const eventBus = useEventBus();
    const _getPaymentHistory = (page = 1) => __async$6(this, null, function* () {
      let tmp = yield getPaymentHistory(page);
      paymentHistory.value = yield tmp.data;
      paging.value = yield tmp.paging;
    });
    onMounted(() => __async$6(this, null, function* () {
      user.value = yield getUser();
      if (user.value) {
        _getPaymentHistory();
        eventBus.on("billingHistoryGoToPage", (page) => _getPaymentHistory(page));
      }
    }));
    return (_ctx, _cache) => {
      const _component_FyPaging = resolveComponent("FyPaging");
      const _component_FyTable = resolveComponent("FyTable");
      const _component_FySelfLoading = resolveComponent("FySelfLoading");
      return openBlock(), createElementBlock(Fragment, null, [
        paymentHistory.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          paging.value && paging.value.page_no ? (openBlock(), createBlock(_component_FyPaging, {
            key: 0,
            id: "billingHistory",
            items: paging.value,
            "onUpdate:items": _cache[0] || (_cache[0] = ($event) => paging.value = $event),
            class: "mt-4 mb-4"
          }, null, 8, ["items"])) : createCommentVNode("v-if", true),
          createVNode(_component_FyTable, {
            data: paymentHistory.value,
            "onUpdate:data": _cache[1] || (_cache[1] = ($event) => paymentHistory.value = $event),
            headers: {
              Invoice_Number: _ctx.$t("billing_history_headers_invoice_number"),
              Invoice_Date: _ctx.$t("billing_history_headers_created"),
              Paid: _ctx.$t("billing_history_headers_paid"),
              Status: _ctx.$t("billing_history_headers_status"),
              Total: _ctx.$t("billing_history_headers_price"),
              Actions: _ctx.$t("billing_history_headers_actions")
            }
          }, {
            Actions_item: withCtx((property) => [
              property.data.item.Invoice_Url ? (openBlock(), createElementBlock("a", {
                key: 0,
                href: property.data.item.Invoice_Url,
                target: "_blank",
                class: "btn neutral p-2"
              }, [
                createVNode(unref(render$d), {
                  stroke: "currentColor",
                  class: "h-5 -mt-0.5 align-middle inline-block"
                }),
                createTextVNode(" Download PDF")
              ], 8, _hoisted_1$4)) : createCommentVNode("v-if", true)
            ]),
            Total_item: withCtx((property) => [
              createElementVNode("span", _hoisted_2$4, toDisplayString(property.data.item.Total.display), 1)
            ]),
            Status_item: withCtx((property) => [
              createElementVNode("span", _hoisted_3$2, toDisplayString(property.data.item.Status), 1)
            ]),
            Invoice_Date_item: withCtx((property) => [
              createTextVNode(toDisplayString(_ctx.$t("global_datetime", {
                val: new Date(property.data.item.Invoice_Date.iso),
                formatParams: {
                  val: {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                  }
                }
              })), 1)
            ]),
            Paid_item: withCtx((property) => [
              createTextVNode(toDisplayString(_ctx.$t("global_datetime", {
                val: new Date(property.data.item.Paid.iso),
                formatParams: {
                  val: {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                  }
                }
              })), 1)
            ]),
            _: 1
          }, 8, ["data", "headers"]),
          paging.value && paging.value.page_no ? (openBlock(), createBlock(_component_FyPaging, {
            key: 1,
            id: "billingHistory",
            items: paging.value,
            "onUpdate:items": _cache[2] || (_cache[2] = ($event) => paging.value = $event),
            class: "mt-4 mb-4"
          }, null, 8, ["items"])) : createCommentVNode("v-if", true)
        ], 64)) : (openBlock(), createBlock(_component_FySelfLoading, {
          key: 1,
          isLoading: true,
          style: { "height": "60px" },
          size: [45, 45]
        })),
        paymentHistory.value && paymentHistory.value.length == 0 ? (openBlock(), createElementBlock("div", _hoisted_4$2, toDisplayString(_ctx.$t("billing_history_empty")), 1)) : createCommentVNode("v-if", true)
      ], 64);
    };
  }
};
var KlbBillingHistory = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "KlbBillingHistory.vue"]]);

var __async$5 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$3 = { class: "text-md font-medium" };
const _hoisted_2$3 = {
  key: 0,
  class: "flex space-x-2"
};
const _hoisted_3$1 = ["onClick"];
const _hoisted_4$1 = ["onClick"];
const _hoisted_5$1 = ["onClick"];
const _hoisted_6$1 = { key: 1 };
const _sfc_main$3 = {
  __name: "KlbWorkGroup",
  props: {
    roles: {
      type: Array,
      default: [
        ["A", "Administrator"],
        ["W", "Write access"],
        ["C", "Create access"],
        ["R", "View only"]
      ]
    },
    joinURL: String
  },
  setup(__props) {
    const eventBus = useEventBus();
    const i18next = useTranslation();
    ref(null);
    const groups = ref(null);
    const _deleteGroup = (groupUuid, name) => __async$5(this, null, function* () {
      eventBus.emit("showConfirm", {
        title: i18next.t("workgroup_del_group_confirm_title"),
        desc: i18next.t("workgroup_del_group_confirm_desc", {
          group: name
        }),
        onConfirm: () => __async$5(this, null, function* () {
          eventBus.emit("loading", true);
          yield delGroup(groupUuid);
          yield _getGroups();
          eventBus.emit("loading", false);
          eventBus.emit("resetConfirm", true);
        })
      });
    });
    const _getGroups = (page = 1, groupUuid = void 0) => __async$5(this, null, function* () {
      eventBus.emit("loading", true);
      groups.value = yield getGroups(groupUuid);
      eventBus.emit("loading", false);
    });
    onMounted(() => __async$5(this, null, function* () {
      yield _getGroups();
    }));
    return (_ctx, _cache) => {
      const _component_FyTable = resolveComponent("FyTable");
      const _component_KlbGroupUsersModal = resolveComponent("KlbGroupUsersModal");
      const _component_KlbAddUserToGroupModal = resolveComponent("KlbAddUserToGroupModal");
      const _component_KlbAddGroupModal = resolveComponent("KlbAddGroupModal");
      return openBlock(), createElementBlock(Fragment, null, [
        groups.value ? (openBlock(), createBlock(_component_FyTable, {
          key: 0,
          data: groups.value.data,
          "onUpdate:data": _cache[0] || (_cache[0] = ($event) => groups.value.data = $event),
          headers: {
            Name: _ctx.$t("workgroups_headers_name"),
            Type: _ctx.$t("workgroups_headers_type"),
            Owner: _ctx.$t("workgroups_headers_owner"),
            Actions: _ctx.$t("workgroups_headers_actions")
          }
        }, {
          Owner_item: withCtx((property) => [
            createTextVNode(toDisplayString(property.data.item.Owner.Email), 1)
          ]),
          Name_item: withCtx((property) => [
            createElementVNode("span", _hoisted_1$3, toDisplayString(property.data.item.Name), 1)
          ]),
          Actions_item: withCtx((property) => [
            property.data.item.Type != "user" ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
              createElementVNode("button", {
                class: "btn primary px-2 py-1 text-sm",
                onClick: () => {
                  _ctx.$eventBus.emit("KlbAddUserToGroup", property.data.item.User_Group__);
                }
              }, [
                createVNode(unref(render$2), {
                  stroke: "currentColor",
                  class: "h-5 -mt-0.5 align-middle inline-block"
                }),
                createTextVNode(" " + toDisplayString(_ctx.$t("workgroup_add_user_modal_cta")), 1)
              ], 8, _hoisted_3$1),
              createElementVNode("button", {
                class: "btn primary px-2 py-1 text-sm",
                onClick: () => {
                  _ctx.$eventBus.emit("KlbGroupUsersModal", property.data.item.User_Group__);
                }
              }, [
                createVNode(unref(render$1), {
                  stroke: "currentColor",
                  class: "h-5 -mt-0.5 align-middle inline-block"
                }),
                createTextVNode(" " + toDisplayString(_ctx.$t("workgroup_users_modal_cta")), 1)
              ], 8, _hoisted_4$1),
              createElementVNode("button", {
                class: "btn primary px-2 py-1 text-sm",
                onClick: () => {
                  _deleteGroup(
                    property.data.item.User_Group__,
                    property.data.item.Name
                  );
                }
              }, [
                createVNode(unref(render$4), {
                  stroke: "currentColor",
                  class: "h-5 -mt-0.5 align-middle inline-block"
                }),
                createTextVNode(" " + toDisplayString(_ctx.$t("workgroup_delete_cta")), 1)
              ], 8, _hoisted_5$1)
            ])) : (openBlock(), createElementBlock("div", _hoisted_6$1, "n/a"))
          ]),
          _: 1
        }, 8, ["data", "headers"])) : createCommentVNode("v-if", true),
        createVNode(_component_KlbGroupUsersModal, { roles: __props.roles }, null, 8, ["roles"]),
        createVNode(_component_KlbAddUserToGroupModal, {
          roles: __props.roles,
          joinURL: __props.joinURL
        }, null, 8, ["roles", "joinURL"]),
        createVNode(_component_KlbAddGroupModal, {
          onComplete: () => __async$5(this, null, function* () {
            _getGroups();
          })
        }, null, 8, ["onComplete"])
      ], 64);
    };
  }
};
var KlbWorkGroup = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "KlbWorkGroup.vue"]]);

var __async$4 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$2 = { class: "default-p -mt-6 mb-3" };
const _hoisted_2$2 = ["onClick"];
const _sfc_main$2 = {
  __name: "KlbGroupUsersModal",
  props: {
    roles: {
      type: Array,
      default: [
        ["A", "Administrator"],
        ["W", "Write access"],
        ["C", "Create access"],
        ["R", "View only"]
      ]
    }
  },
  setup(__props) {
    const props = __props;
    const groupUsers = ref(null);
    const groupUserModal = (groupUuid) => __async$4(this, null, function* () {
      eventBus.emit("loading", true);
      groupUsers.value = yield getGroups(groupUuid);
      eventBus.emit("GroupUsersModal", true);
      eventBus.emit("loading", false);
    });
    const eventBus = useEventBus();
    const getRole = (role) => {
      if (role === "O")
        return "Owner";
      return props.roles.filter((r) => r[0] == role)[0][1];
    };
    const _delUserFromGroup = (user) => __async$4(this, null, function* () {
      eventBus.emit("loading", true);
      yield delUserFromGroup(groupUsers.value.data.User_Group__, user);
      groupUsers.value = yield getGroups(groupUsers.value.data.User_Group__);
      eventBus.emit("resetConfirm", true);
      eventBus.emit("loading", false);
    });
    onMounted(() => __async$4(this, null, function* () {
      eventBus.on("KlbGroupUsersModal", (groupUuid) => __async$4(this, null, function* () {
        yield groupUserModal(groupUuid);
      }));
      eventBus.on("KlbAddUserToGroupCompleted", (groupUuid) => __async$4(this, null, function* () {
        eventBus.emit("loading", true);
        groupUsers.value = yield getGroups(groupUuid);
        eventBus.emit("GroupUsersModal", true);
        eventBus.emit("loading", false);
      }));
    }));
    return (_ctx, _cache) => {
      const _component_FyTable = resolveComponent("FyTable");
      const _component_FyModal = resolveComponent("FyModal");
      return openBlock(), createBlock(_component_FyModal, {
        id: "GroupUsers",
        title: _ctx.$t("workgroup_user_list_title")
      }, {
        default: withCtx(() => [
          groupUsers.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createElementVNode("button", {
              class: "btn primary px-2 py-1 text-sm float-right -mt-8",
              onClick: _cache[0] || (_cache[0] = () => {
                _ctx.$eventBus.emit("GroupUsersModal", false);
                _ctx.$eventBus.emit("KlbAddUserToGroup", groupUsers.value.data.User_Group__);
              })
            }, [
              createVNode(unref(render$2), {
                stroke: "currentColor",
                class: "h-5 -mt-0.5 align-middle inline-block"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("workgroup_add_user_modal_cta")), 1)
            ]),
            createElementVNode("p", _hoisted_1$2, [
              createTextVNode(toDisplayString(_ctx.$t("workgroup_summary_group")) + " ", 1),
              createElementVNode("b", null, toDisplayString(groupUsers.value.data.Name), 1),
              createElementVNode("small", null, [
                createTextVNode(" (" + toDisplayString(_ctx.$t("workgroup_summary_owned_by")) + " ", 1),
                createElementVNode("i", null, toDisplayString(groupUsers.value.data.Owner.Email), 1),
                createTextVNode(")")
              ])
            ]),
            createVNode(_component_FyTable, {
              data: groupUsers.value.data.Members,
              "onUpdate:data": _cache[1] || (_cache[1] = ($event) => groupUsers.value.data.Members = $event),
              headers: {
                Name: _ctx.$t("workgroups_users_headers_name"),
                Access: _ctx.$t("workgroups_users_headers_access"),
                Actions: _ctx.$t("workgroups_users_headers_actions")
              }
            }, {
              Actions_item: withCtx((property) => [
                createElementVNode("button", {
                  class: "btn primary px-2 py-1 text-sm",
                  onClick: () => {
                    _ctx.$eventBus.emit("showConfirm", {
                      title: _ctx.$t("workgroup_del_user_confirm_title"),
                      desc: `${_ctx.$t("workgroup_del_user_confirm_desc", { user: property.data.item.User.Display_Name, group: groupUsers.value.data.Name })}`,
                      onConfirm: () => __async$4(this, null, function* () {
                        yield _delUserFromGroup(property.data.item.User.User__);
                      })
                    });
                  }
                }, [
                  createVNode(unref(render$3), {
                    stroke: "currentColor",
                    class: "h-5 -mt-0.5 align-middle inline-block"
                  })
                ], 8, _hoisted_2$2)
              ]),
              Name_item: withCtx((property) => [
                createTextVNode(toDisplayString(property.data.item.User.Profile.Display_Name) + " ", 1),
                createElementVNode("small", null, "(" + toDisplayString(property.data.item.User.Email) + ")", 1)
              ]),
              Access_item: withCtx((property) => [
                createTextVNode(toDisplayString(getRole(property.data.item.Access)), 1)
              ]),
              _: 1
            }, 8, ["data", "headers"])
          ], 64)) : createCommentVNode("v-if", true)
        ]),
        _: 1
      }, 8, ["title"]);
    };
  }
};
var KlbGroupUsersModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "KlbGroupUsersModal.vue"]]);

var __async$3 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1$1 = ["onSubmit"];
const _hoisted_2$1 = {
  class: "btn primary btn-defaults",
  type: "submit"
};
const _sfc_main$1 = {
  __name: "KlbAddGroupModal",
  props: { onComplete: Function, default: () => {
  } },
  setup(__props) {
    const props = __props;
    const eventBus = useEventBus();
    const state = reactive({
      group: {
        groupName: ""
      }
    });
    const rules = {
      group: {
        groupName: { required }
      }
    };
    const v$ = useVuelidate(rules, state);
    const _addGroup = () => __async$3(this, null, function* () {
      eventBus.emit("loading", true);
      if (yield v$.value.group.$validate()) {
        let res = yield addGroup(state.group.groupName);
        if (res.result == "success") {
          props.onComplete(res.data.User_Group__);
        }
        eventBus.emit("GroupAddModal", false);
      }
      eventBus.emit("loading", false);
    });
    return (_ctx, _cache) => {
      const _component_FyInput = resolveComponent("FyInput");
      const _component_FyModal = resolveComponent("FyModal");
      return openBlock(), createBlock(_component_FyModal, {
        id: "GroupAdd",
        title: _ctx.$t("workgroup_add_title_modal")
      }, {
        default: withCtx(() => [
          createElementVNode("form", {
            onSubmit: withModifiers(_addGroup, ["prevent"])
          }, [
            createVNode(_component_FyInput, {
              id: "groupName",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("workgroup_name_placeholder"),
              validate: unref(v$).group.groupName,
              label: _ctx.$t("workgroup_name_label"),
              type: "text",
              autocomplete: "off"
            }, null, 8, ["placeholder", "validate", "label"]),
            createElementVNode("button", _hoisted_2$1, toDisplayString(_ctx.$t("create_group_cta")), 1)
          ], 40, _hoisted_1$1)
        ]),
        _: 1
      }, 8, ["title"]);
    };
  }
};
var KlbAddGroupModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "KlbAddGroupModal.vue"]]);

var __async$2 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _hoisted_1 = { class: "default-p -mt-6 mb-3" };
const _hoisted_2 = { class: "default-p my-2" };
const _hoisted_3 = {
  key: 0,
  class: "default-p-err mt-4"
};
const _hoisted_4 = {
  class: "btn primary btn-defaults",
  type: "submit"
};
const _hoisted_5 = { class: "default-p mt-4 mb-4" };
const _hoisted_6 = {
  class: "btn primary p-3",
  style: { "border-radius": "0", "border": "3px solid #eee" },
  type: "submit"
};
const _sfc_main = {
  __name: "KlbAddUserToGroupModal",
  props: {
    roles: {
      type: Array,
      default: [
        ["A", "Administrator"],
        ["W", "Write access"],
        ["C", "Create access"],
        ["R", "View only"]
      ]
    },
    joinURL: String
  },
  setup(__props) {
    const props = __props;
    const eventBus = useEventBus();
    const addUserGroupError = ref(null);
    ref(null);
    const accessLink = ref(null);
    const accessLinkLink = ref(null);
    const groupUsers = ref(null);
    const state = reactive({
      user: {
        email: "",
        role: "R"
      }
    });
    const rules = {
      user: {
        email: { required, email },
        role: { required }
      }
    };
    const v$ = useVuelidate(rules, state);
    const addUserModal = (groupUuid) => __async$2(this, null, function* () {
      eventBus.emit("loading", true);
      groupUsers.value = yield getGroups(groupUuid);
      eventBus.emit("AddUserGroupModal", true);
      accessLinkLink.value = null;
      eventBus.emit("loading", false);
    });
    const generateAccessLink = () => __async$2(this, null, function* () {
      eventBus.emit("loading", true);
      accessLink.value = yield groupLinkAccess(
        groupUsers.value.data.User_Group__,
        state.user.role
      );
      accessLinkLink.value = props.joinURL + accessLink.value.data.Link;
      eventBus.emit("loading", false);
    });
    const _addUserToGroup = () => __async$2(this, null, function* () {
      eventBus.emit("loading", true);
      if (yield v$.value.user.$validate()) {
        addUserGroupError.value = null;
        let result = yield addUserToGroup(
          groupUsers.value.data.User_Group__,
          state.user.email,
          state.user.role
        ).catch((err) => {
          addUserGroupError.value = err;
          eventBus.emit("loading", false);
          return;
        });
        if (result.result == "success") {
          eventBus.emit("AddUserGroupModal", false);
          eventBus.emit(
            "KlbAddUserToGroupCompleted",
            groupUsers.value.data.User_Group__
          );
        }
      }
      eventBus.emit("loading", false);
    });
    onMounted(() => __async$2(this, null, function* () {
      eventBus.on("KlbAddUserToGroup", (groupUuid) => __async$2(this, null, function* () {
        eventBus.emit("loading", true);
        yield addUserModal(groupUuid);
        eventBus.emit("loading", false);
      }));
    }));
    return (_ctx, _cache) => {
      const _component_FyInput = resolveComponent("FyInput");
      const _component_FyModal = resolveComponent("FyModal");
      return openBlock(), createBlock(_component_FyModal, {
        id: "AddUserGroup",
        title: _ctx.$t("workgroup_user_add_title")
      }, {
        default: withCtx(() => [
          groupUsers.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createElementVNode("p", _hoisted_1, [
              createTextVNode(toDisplayString(_ctx.$t("workgroup_summary_group")) + " ", 1),
              createElementVNode("b", null, toDisplayString(groupUsers.value.data.Name), 1),
              createElementVNode("small", null, [
                createTextVNode(" (" + toDisplayString(_ctx.$t("workgroup_summary_owned_by")) + " ", 1),
                createElementVNode("i", null, toDisplayString(groupUsers.value.data.Owner.Email), 1),
                createTextVNode(")")
              ])
            ]),
            createElementVNode("p", _hoisted_2, toDisplayString(_ctx.$t("workgroup_user_add_description")), 1),
            createElementVNode("form", {
              onSubmit: _cache[0] || (_cache[0] = withModifiers(($event) => _addUserToGroup(), ["prevent"]))
            }, [
              createVNode(_component_FyInput, {
                id: "groupUserEmail",
                req: true,
                showLabel: true,
                placeholder: _ctx.$t("workgroup_useradd_email_placeholder"),
                validate: unref(v$).user.email,
                label: _ctx.$t("workgroup_useradd_email_label"),
                type: "text",
                autocomplete: "off"
              }, null, 8, ["placeholder", "validate", "label"]),
              createVNode(_component_FyInput, {
                id: "groupUserRole",
                req: true,
                showLabel: true,
                validate: unref(v$).user.role,
                options: __props.roles,
                label: _ctx.$t("workgroup_useradd_role_placeholder"),
                type: "select",
                autocomplete: "off"
              }, null, 8, ["validate", "options", "label"]),
              addUserGroupError.value && addUserGroupError.value.token ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(_ctx.$t(addUserGroupError.value.token)), 1)) : createCommentVNode("v-if", true),
              createElementVNode("button", _hoisted_4, toDisplayString(_ctx.$t("add_user_to_group_cta")), 1)
            ], 32),
            createElementVNode("p", _hoisted_5, toDisplayString(_ctx.$t("workgroup_user_add_invite_link_description")), 1),
            createElementVNode("form", {
              onSubmit: _cache[3] || (_cache[3] = withModifiers(
                () => {
                  generateAccessLink();
                },
                ["prevent"]
              )),
              class: "flex flex-nowrap items-stretch w-full"
            }, [
              withDirectives(createElementVNode("input", {
                type: "text",
                "aria-invalid": "false",
                disabled: "true",
                style: { "border": "1px solid #eee" },
                class: "input-basic",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => accessLinkLink.value = $event)
              }, null, 512), [
                [vModelText, accessLinkLink.value]
              ]),
              accessLinkLink.value ? (openBlock(), createElementBlock("button", {
                key: 0,
                class: "btn accent p-3",
                style: { "border-radius": "0", "border": "3px solid #eee" },
                onClick: _cache[2] || (_cache[2] = withModifiers(
                  () => {
                    unref(copyText)(accessLinkLink.value, void 0, () => {
                    });
                    unref(notify)(
                      {
                        group: "default",
                        title: _ctx.$t("notif_success_title"),
                        text: _ctx.$t("workgroup_link_invite_copy_confirm")
                      },
                      4e3
                    );
                  },
                  ["prevent"]
                ))
              }, [
                createVNode(unref(render$8), {
                  stroke: "currentColor",
                  class: "h-5 -mt-0.5 align-middle inline-block"
                })
              ])) : createCommentVNode("v-if", true),
              createElementVNode("button", _hoisted_6, toDisplayString(_ctx.$t("group_invite_link_cta")), 1)
            ], 32)
          ], 64)) : createCommentVNode("v-if", true)
        ]),
        _: 1
      }, 8, ["title"]);
    };
  }
};
var KlbAddUserToGroupModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "KlbAddUserToGroupModal.vue"]]);

var KlbComponents = /*#__PURE__*/Object.freeze({
  __proto__: null,
  KlbWorkGroup: KlbWorkGroup,
  KlbAccountUpdatePwd: KlbAccountUpdatePwd,
  KlbAccountUpdateEmail: KlbAccountUpdateEmail,
  KlbBillingUpdatePayment: KlbBillingUpdatePayment,
  KlbBillingAddressSingle: KlbBillingAddressSingle,
  KlbBillingProfileCreate: KlbBillingProfileCreate,
  KlbSignInSignUp: KlbSignInSignUp,
  KlbBillingHistory: KlbBillingHistory,
  KlbBillingAddressCreateOrder: KlbBillingAddressCreateOrder,
  KlbProcessOrder: KlbProcessOrder,
  KlbGroupUsersModal: KlbGroupUsersModal,
  KlbAddGroupModal: KlbAddGroupModal,
  KlbAddUserToGroupModal: KlbAddUserToGroupModal
});

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes)
    return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
const cropText = (str, ml = 100) => {
  if (str && typeof str == "string") {
    if (str.length > ml) {
      return `${str.slice(0, ml)}...`;
    }
  }
  return str;
};
const isPathActive = (paths, path) => {
  if (paths.includes(path))
    return true;
  let foundPath = false;
  for (let _path of paths) {
    if (_path.includes("*") && path.includes(_path.replace("*", ""))) {
      foundPath = true;
      break;
    }
  }
  return foundPath;
};

function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }
    lastIndex = index + 1;
    html += escaped;
  }
  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
const NOOP = () => {
};
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async$1 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const shouldIgnoreProp = makeMap(`,key,ref,innerHTML,textContent,ref_key,ref_for`);
function ssrRenderAttrs(props, tag) {
  let ret = "";
  for (const key in props) {
    if (shouldIgnoreProp(key) || isOn(key) || tag === "textarea" && key === "value") {
      continue;
    }
    const value = props[key];
    if (key === "class") {
      ret += ` class="${ssrRenderClass(value)}"`;
    } else if (key === "style") {
      ret += ` style="${ssrRenderStyle(value)}"`;
    } else {
      ret += ssrRenderDynamicAttr(key, value, tag);
    }
  }
  return ret;
}
function ssrRenderDynamicAttr(key, value, tag) {
  if (!isRenderableValue(value)) {
    return ``;
  }
  const attrKey = tag && (tag.indexOf("-") > 0 || isSVGTag(tag)) ? key : propsToAttrMap[key] || key.toLowerCase();
  if (isBooleanAttr(attrKey)) {
    return includeBooleanAttr(value) ? ` ${attrKey}` : ``;
  } else if (isSSRSafeAttrName(attrKey)) {
    return value === "" ? ` ${attrKey}` : ` ${attrKey}="${escapeHtml(value)}"`;
  } else {
    console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${attrKey}`);
    return ``;
  }
}
function isRenderableValue(value) {
  if (value == null) {
    return false;
  }
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean";
}
function ssrRenderClass(raw) {
  return escapeHtml(normalizeClass(raw));
}
function ssrRenderStyle(raw) {
  if (!raw) {
    return "";
  }
  if (isString(raw)) {
    return escapeHtml(raw);
  }
  const styles = normalizeStyle(raw);
  return escapeHtml(stringifyStyle(styles));
}
function ssrCompile(template, instance) {
  {
    throw new Error(`On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.`);
  }
}
function ssrRenderTeleport(parentPush, contentRenderFn, target, disabled, parentComponent) {
  parentPush("<!--teleport start-->");
  const context = parentComponent.appContext.provides[ssrContextKey];
  const teleportBuffers = context.__teleportBuffers || (context.__teleportBuffers = {});
  const targetBuffer = teleportBuffers[target] || (teleportBuffers[target] = []);
  const bufferIndex = targetBuffer.length;
  let teleportContent;
  if (disabled) {
    contentRenderFn(parentPush);
    teleportContent = `<!--teleport anchor-->`;
  } else {
    const { getBuffer, push } = createBuffer();
    contentRenderFn(push);
    push(`<!--teleport anchor-->`);
    teleportContent = getBuffer();
  }
  targetBuffer.splice(bufferIndex, 0, teleportContent);
  parentPush("<!--teleport end-->");
}
const { createComponentInstance, setCurrentRenderingInstance, setupComponent, renderComponentRoot, normalizeVNode } = ssrUtils;
function createBuffer() {
  let appendable = false;
  const buffer = [];
  return {
    getBuffer() {
      return buffer;
    },
    push(item) {
      const isStringItem = isString(item);
      if (appendable && isStringItem) {
        buffer[buffer.length - 1] += item;
      } else {
        buffer.push(item);
      }
      appendable = isStringItem;
      if (isPromise(item) || isArray(item) && item.hasAsync) {
        buffer.hasAsync = true;
      }
    }
  };
}
function renderComponentVNode(vnode, parentComponent = null, slotScopeId) {
  const instance = createComponentInstance(vnode, parentComponent, null);
  const res = setupComponent(instance, true);
  const hasAsyncSetup = isPromise(res);
  const prefetches = instance.sp;
  if (hasAsyncSetup || prefetches) {
    let p = hasAsyncSetup ? res : Promise.resolve();
    if (prefetches) {
      p = p.then(() => Promise.all(prefetches.map((prefetch) => prefetch.call(instance.proxy)))).catch(() => {
      });
    }
    return p.then(() => renderComponentSubTree(instance, slotScopeId));
  } else {
    return renderComponentSubTree(instance, slotScopeId);
  }
}
function renderComponentSubTree(instance, slotScopeId) {
  const comp = instance.type;
  const { getBuffer, push } = createBuffer();
  if (isFunction(comp)) {
    let root = renderComponentRoot(instance);
    if (!comp.props) {
      for (const key in instance.attrs) {
        if (key.startsWith(`data-v-`)) {
          (root.props || (root.props = {}))[key] = ``;
        }
      }
    }
    renderVNode(push, instance.subTree = root, instance, slotScopeId);
  } else {
    if ((!instance.render || instance.render === NOOP) && !instance.ssrRender && !comp.ssrRender && isString(comp.template)) {
      comp.ssrRender = ssrCompile(comp.template);
    }
    for (const e of instance.scope.effects) {
      if (e.computed)
        e.computed._cacheable = true;
    }
    const ssrRender = instance.ssrRender || comp.ssrRender;
    if (ssrRender) {
      let attrs = instance.inheritAttrs !== false ? instance.attrs : void 0;
      let hasCloned = false;
      let cur = instance;
      while (true) {
        const scopeId = cur.vnode.scopeId;
        if (scopeId) {
          if (!hasCloned) {
            attrs = __spreadValues({}, attrs);
            hasCloned = true;
          }
          attrs[scopeId] = "";
        }
        const parent = cur.parent;
        if (parent && parent.subTree && parent.subTree === cur.vnode) {
          cur = parent;
        } else {
          break;
        }
      }
      if (slotScopeId) {
        if (!hasCloned)
          attrs = __spreadValues({}, attrs);
        attrs[slotScopeId.trim()] = "";
      }
      const prev = setCurrentRenderingInstance(instance);
      try {
        ssrRender(
          instance.proxy,
          push,
          instance,
          attrs,
          instance.props,
          instance.setupState,
          instance.data,
          instance.ctx
        );
      } finally {
        setCurrentRenderingInstance(prev);
      }
    } else if (instance.render && instance.render !== NOOP) {
      renderVNode(push, instance.subTree = renderComponentRoot(instance), instance, slotScopeId);
    } else {
      const componentName = comp.name || comp.__file || `<Anonymous>`;
      warn(`Component ${componentName} is missing template or render function.`);
      push(`<!---->`);
    }
  }
  return getBuffer();
}
function renderVNode(push, vnode, parentComponent, slotScopeId) {
  const { type, shapeFlag, children } = vnode;
  switch (type) {
    case Text:
      push(escapeHtml(children));
      break;
    case Comment$1:
      push(children ? `<!--${escapeHtmlComment(children)}-->` : `<!---->`);
      break;
    case Static:
      push(children);
      break;
    case Fragment:
      if (vnode.slotScopeIds) {
        slotScopeId = (slotScopeId ? slotScopeId + " " : "") + vnode.slotScopeIds.join(" ");
      }
      push(`<!--[-->`);
      renderVNodeChildren(push, children, parentComponent, slotScopeId);
      push(`<!--]-->`);
      break;
    default:
      if (shapeFlag & 1) {
        renderElementVNode(push, vnode, parentComponent, slotScopeId);
      } else if (shapeFlag & 6) {
        push(renderComponentVNode(vnode, parentComponent, slotScopeId));
      } else if (shapeFlag & 64) {
        renderTeleportVNode(push, vnode, parentComponent, slotScopeId);
      } else if (shapeFlag & 128) {
        renderVNode(push, vnode.ssContent, parentComponent, slotScopeId);
      } else {
        warn("[@vue/server-renderer] Invalid VNode type:", type, `(${typeof type})`);
      }
  }
}
function renderVNodeChildren(push, children, parentComponent, slotScopeId) {
  for (let i = 0; i < children.length; i++) {
    renderVNode(push, normalizeVNode(children[i]), parentComponent, slotScopeId);
  }
}
function renderElementVNode(push, vnode, parentComponent, slotScopeId) {
  const tag = vnode.type;
  let { props, children, shapeFlag, scopeId, dirs } = vnode;
  let openTag = `<${tag}`;
  if (dirs) {
    props = applySSRDirectives(vnode, props, dirs);
  }
  if (props) {
    openTag += ssrRenderAttrs(props, tag);
  }
  if (scopeId) {
    openTag += ` ${scopeId}`;
  }
  let curParent = parentComponent;
  let curVnode = vnode;
  while (curParent && curVnode === curParent.subTree) {
    curVnode = curParent.vnode;
    if (curVnode.scopeId) {
      openTag += ` ${curVnode.scopeId}`;
    }
    curParent = curParent.parent;
  }
  if (slotScopeId) {
    openTag += ` ${slotScopeId}`;
  }
  push(openTag + `>`);
  if (!isVoidTag(tag)) {
    let hasChildrenOverride = false;
    if (props) {
      if (props.innerHTML) {
        hasChildrenOverride = true;
        push(props.innerHTML);
      } else if (props.textContent) {
        hasChildrenOverride = true;
        push(escapeHtml(props.textContent));
      } else if (tag === "textarea" && props.value) {
        hasChildrenOverride = true;
        push(escapeHtml(props.value));
      }
    }
    if (!hasChildrenOverride) {
      if (shapeFlag & 8) {
        push(escapeHtml(children));
      } else if (shapeFlag & 16) {
        renderVNodeChildren(push, children, parentComponent, slotScopeId);
      }
    }
    push(`</${tag}>`);
  }
}
function applySSRDirectives(vnode, rawProps, dirs) {
  const toMerge = [];
  for (let i = 0; i < dirs.length; i++) {
    const binding = dirs[i];
    const { dir: { getSSRProps } } = binding;
    if (getSSRProps) {
      const props = getSSRProps(binding, vnode);
      if (props)
        toMerge.push(props);
    }
  }
  return mergeProps(rawProps || {}, ...toMerge);
}
function renderTeleportVNode(push, vnode, parentComponent, slotScopeId) {
  const target = vnode.props && vnode.props.to;
  const disabled = vnode.props && vnode.props.disabled;
  if (!target) {
    if (!disabled) {
      warn(`[@vue/server-renderer] Teleport is missing target prop.`);
    }
    return [];
  }
  if (!isString(target)) {
    warn(`[@vue/server-renderer] Teleport target must be a query selector string.`);
    return [];
  }
  ssrRenderTeleport(push, (push2) => {
    renderVNodeChildren(push2, vnode.children, parentComponent, slotScopeId);
  }, target, disabled || disabled === "", parentComponent);
}
const { isVNode } = ssrUtils;
function unrollBuffer(buffer) {
  return __async$1(this, null, function* () {
    if (buffer.hasAsync) {
      let ret = "";
      for (let i = 0; i < buffer.length; i++) {
        let item = buffer[i];
        if (isPromise(item)) {
          item = yield item;
        }
        if (isString(item)) {
          ret += item;
        } else {
          ret += yield unrollBuffer(item);
        }
      }
      return ret;
    } else {
      return unrollBufferSync(buffer);
    }
  });
}
function unrollBufferSync(buffer) {
  let ret = "";
  for (let i = 0; i < buffer.length; i++) {
    let item = buffer[i];
    if (isString(item)) {
      ret += item;
    } else {
      ret += unrollBufferSync(item);
    }
  }
  return ret;
}
function renderToString(_0) {
  return __async$1(this, arguments, function* (input, context = {}) {
    if (isVNode(input)) {
      return renderToString(createApp({ render: () => input }), context);
    }
    const vnode = createVNode(input._component, input._props);
    vnode.appContext = input._context;
    input.provide(ssrContextKey, context);
    const buffer = yield renderComponentVNode(vnode);
    const result = yield unrollBuffer(buffer);
    yield resolveTeleports(context);
    return result;
  });
}
function resolveTeleports(context) {
  return __async$1(this, null, function* () {
    if (context.__teleportBuffers) {
      context.teleports = context.teleports || {};
      for (const key in context.__teleportBuffers) {
        context.teleports[key] = yield unrollBuffer(yield Promise.all([context.__teleportBuffers[key]]));
      }
    }
  });
}
initDirectivesForSSR();

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function handleSSR(_0, _1) {
  return __async(this, arguments, function* (createApp, cb, options = {}) {
    const { app, router, head } = yield createApp(true);
    const result = { uuid: getUuid(), initial: {} };
    const ctx = {};
    const url = `${getPath()}`;
    router.push(url);
    yield router.isReady();
    let appHtml = "";
    try {
      appHtml = yield renderToString(app, ctx);
    } catch (e) {
      router.push(`${getPrefix()}/404`);
      yield router.isReady();
      appHtml = yield renderToString(app, ctx);
      result.statusCode = 404;
      result.app = appHtml;
      return cb(result);
    }
    if (url != router.currentRoute.value.fullPath) {
      if (router.currentRoute.value.name == "NotFound") {
        router.push(`${getPrefix()}/404`);
        yield router.isReady();
        appHtml = yield renderToString(app, ctx);
        result.statusCode = 404;
        result.app = appHtml;
        return cb(result);
      } else {
        result.statusCode = 301;
        result.redirect = router.currentRoute.value.fullPath;
        return cb(result);
      }
    }
  });
}

const head = createHead();
const eventBus = mitt();
const countries = {
  countries: [],
  byUuid: {}
};
const locale = getLocale();
const useEventBus = () => {
  return getCurrentInstance().appContext.config.globalProperties.$eventBus;
};
const useCountries = () => {
  return getCurrentInstance().appContext.config.globalProperties.$countries;
};
const useTranslation = () => {
  return { t: getCurrentInstance().appContext.config.globalProperties.$t };
};
const countriesPromise = () => {
  return new Promise((resolve) => {
    getCountries().then((_countries) => {
      countries.countries = _countries.data;
      _countries.data.forEach((_country) => {
        countries.byUuid[_country.Country__] = _country;
      });
      resolve();
    });
  });
};
const i18nextPromise = i18next.use(Backend).init({
  ns: ["translation"],
  defaultNS: "translation",
  debug: false,
  lng: locale,
  load: "currentOnly",
  initImmediate: false
});
const notificationErrors = (err) => {
  notify(
    {
      group: "default",
      type: "error",
      title: i18next.t("error_notif_title"),
      text: err.error ? err.error : i18next.t("error_notif_unknown")
    },
    6e3
  );
};
function createFyvue() {
  const fyvue = {
    install(app, options = {}) {
      app.config.globalProperties.$eventBus = eventBus;
      app.config.globalProperties.$rest = rest;
      app.config.globalProperties.$countries = countries;
      app.config.globalProperties.$cropText = cropText;
      app.config.globalProperties.$formatBytes = formatBytes;
      app.config.globalProperties.$isPathActive = isPathActive;
      app.config.globalProperties.$t = i18next.t;
      for (const componentKey in FyvueComponents) {
        app.component(componentKey, FyvueComponents[componentKey]);
      }
      for (const componentKey in KlbComponents) {
        app.component(componentKey, KlbComponents[componentKey]);
      }
      app.use(Notifications);
      app.use(head);
    }
  };
  return fyvue;
}

export { billing as KlbBilling, location as KlbLocation, order as KlbOrder, user as KlbUser, countriesPromise, createFyvue, handleSSR, head, i18nextPromise, notificationErrors, useCountries, useEventBus, useTranslation };

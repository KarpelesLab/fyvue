/*!
  * @karpeleslab/fyvue v0.2.0-rc.4
  * (c) 2022 Florian Gasquez <m@fy.to>
  * @license MIT
  */
import i18next from 'i18next';
import { getCurrentInstance, openBlock, createElementBlock, createElementVNode, defineComponent, h, ref, onMounted, onUnmounted, createBlock, unref, withCtx, createVNode, renderSlot, createTextVNode, toDisplayString, resolveDynamicComponent, normalizeClass, createCommentVNode, resolveComponent, Fragment, renderList, computed, normalizeStyle, toRef, withDirectives, isRef, vModelCheckbox, vModelDynamic, vModelText, vModelSelect, Transition, reactive, withModifiers, watch, withAsyncContext } from 'vue';
import { TransitionRoot, Dialog, DialogPanel, DialogTitle, DialogOverlay, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { defineStore } from 'pinia';
import { getMode, getInitialState, getPath, getUuid, rest as rest$1, getLocale as getLocale$1, getUrl } from '@karpeleslab/klbfw';
import { renderToString } from '@vue/server-renderer';
import { renderHeadToString, useHead } from '@vueuse/head';
import { useDark, useToggle, useStorage } from '@vueuse/core';
import useVuelidate, { useVuelidate as useVuelidate$1 } from '@vuelidate/core';
import { required, email, sameAs } from '@vuelidate/validators';
import { useRoute, useRouter } from 'vue-router';

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

const useHistory = defineStore({
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
            if (status != 302)
                this.redirect = path;
            return this._router?.push(path);
        },
        replace(path, status = 302) {
            this.status = status;
            if (status != 302)
                this.redirect = path;
            return this._router?.replace(path);
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
    return !!(getMode() != 'client');
};
const setupClient = (router, pinia) => {
    const initialState = getInitialState();
    if (isSSRRendered()) {
        if (initialState && initialState.piniaState) {
            pinia.state.value = JSON.parse(initialState.piniaState);
        }
    }
    useHistory(pinia)._setRouter(router);
};
async function handleSSR(createApp, cb, options = { url: null }) {
    const { app, router, head, pinia } = await createApp(true);
    let url;
    if (options.url)
        url = options.url;
    else {
        url = `${getPath()}`;
    }
    await router.push(url);
    await router.isReady();
    const result = {
        uuid: getUuid(),
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
    try {
        const html = await renderToString(app, {});
        const { headTags, htmlAttrs, bodyAttrs, bodyTags } = await renderHeadToString(head);
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
    catch (e) {
        console.log('------Fyvue SSR Error------');
        if (e) {
            if (typeof e === 'string') {
                console.log(e);
            }
            else if (e instanceof Error) {
                console.log(e.message);
                console.log('------------');
                console.log(e.stack);
            }
        }
        console.log('------End Fyvue SSR Error------');
        return cb(result);
    }
}

const useRestState = defineStore({
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
        console.log('----klbrest----');
        console.log(`KLBRESTCall: ${method} ${url}`);
        console.log('Params: ', params);
        console.log('CTX: ', ctx);
        console.log('----endklbrest----');
        rest$1(url, method, params, ctx)
            .then((restResult) => {
            if (getMode() == 'ssr')
                restState.addResult(requestHash, restResult);
            resolve(restResult);
        })
            .catch((err) => {
            if (getMode() == 'ssr') {
                err.fvReject = true;
                restState.addResult(requestHash, err);
            }
            reject(err);
        });
    });
}

const countries = {
    countries: new Array(),
    byUuid: {},
};
const eventBus = mitt();
const useCountries = () => {
    const vueInstance = getCurrentInstance();
    return vueInstance.appContext.config.globalProperties.$countries;
};
const countriesPromise = () => {
    return new Promise((resolve) => {
        rest('Country', 'GET')
            .then((_countries) => {
            if (_countries && _countries.result == 'success') {
                countries.countries = _countries.data;
                _countries.data.forEach((_country) => {
                    countries.byUuid[_country.Country__] = _country;
                });
            }
            resolve(true);
        })
            .catch(() => { });
    });
};
const useEventBus = () => {
    const vueInstance = getCurrentInstance();
    return vueInstance.appContext.config.globalProperties.$eventBus;
};
const useTranslation = () => {
    const vueInstance = getCurrentInstance();
    return vueInstance.appContext.config.globalProperties.$t;
};

function render$b(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
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
  ]))
}

function render$a(_ctx, _cache) {
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

function render$9(_ctx, _cache) {
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

function render$8(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
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
  ]))
}

function render$7(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", { d: "M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" }),
    createElementVNode("path", { d: "M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" })
  ]))
}

function render$6(_ctx, _cache) {
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

function render$5(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", { d: "M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" })
  ]))
}

function render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", { d: "M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" })
  ]))
}

function render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", { d: "M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" })
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
      d: "M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z",
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

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _hoisted_1$o = { class: "parent" };
const _hoisted_2$n = { class: "modal-container" };
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "FyModal",
  props: {
    id: null,
    title: null,
    onOpen: null,
    onClose: null,
    closeIcon: { default: () => h(render) }
  },
  setup(__props) {
    const props = __props;
    const eventBus = useEventBus();
    const isOpen = ref(false);
    const setModal = (value) => {
      if (value === true) {
        if (props.onOpen)
          props.onOpen();
      } else {
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
      return openBlock(), createBlock(unref(TransitionRoot), {
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
              createElementVNode("div", _hoisted_1$o, [
                createVNode(unref(DialogPanel), { class: "modal-parent" }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "before"),
                    createElementVNode("div", _hoisted_2$n, [
                      __props.title ? (openBlock(), createBlock(unref(DialogTitle), {
                        key: 0,
                        class: "title"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.title) + " ", 1),
                          createElementVNode("a", {
                            href: "javascript:void(0)",
                            onClick: _cache[0] || (_cache[0] = ($event) => setModal(false))
                          }, [
                            (openBlock(), createBlock(resolveDynamicComponent(__props.closeIcon), { class: "close-icon" }))
                          ])
                        ]),
                        _: 1
                      })) : (openBlock(), createElementBlock("a", {
                        key: 1,
                        href: "javascript:void(0)",
                        onClick: _cache[1] || (_cache[1] = ($event) => setModal(false))
                      }, [
                        (openBlock(), createBlock(resolveDynamicComponent(__props.closeIcon), { class: "close-icon is-alone" }))
                      ])),
                      createElementVNode("div", {
                        class: normalizeClass(!__props.title ? "is-alone modal-content" : "modal-content")
                      }, [
                        renderSlot(_ctx.$slots, "default")
                      ], 2)
                    ])
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
});
var FyModal = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "FyModal.vue"]]);

const _hoisted_1$n = { class: "fy-circle-percent" };
const _hoisted_2$m = {
  viewBox: "0 0 36 36",
  class: "circular-chart"
};
const _hoisted_3$m = /* @__PURE__ */ createElementVNode("path", {
  class: "circle-bg",
  d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
}, null, -1);
const _hoisted_4$j = ["stroke-dasharray", "stroke"];
const _hoisted_5$g = ["x", "y"];
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "FyCirclePercent",
  props: {
    percent: { default: 100 },
    textXY: { default: () => [18, 20.85] },
    color: { default: "blue" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        (openBlock(), createElementBlock("svg", _hoisted_2$m, [
          _hoisted_3$m,
          createElementVNode("path", {
            class: "circle",
            "stroke-dasharray": `${__props.percent}, 100`,
            stroke: __props.color,
            d: "M18 2.0845\n                    a 15.9155 15.9155 0 0 1 0 31.831\n                    a 15.9155 15.9155 0 0 1 0 -31.831"
          }, null, 8, _hoisted_4$j),
          createElementVNode("text", {
            x: __props.textXY[0].toString(),
            y: __props.textXY[1].toString(),
            class: "percentage"
          }, toDisplayString(__props.percent) + "% ", 9, _hoisted_5$g)
        ]))
      ]);
    };
  }
});
var FyCirclePercent = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "FyCirclePercent.vue"]]);

const _hoisted_1$m = { class: "parent" };
const _hoisted_2$l = {
  class: "modal-container",
  style: { "width": "350px !important" }
};
const _hoisted_3$l = { class: "modal-content" };
const _hoisted_4$i = {
  key: 0,
  class: "confirm-modal-desc default-p"
};
const _hoisted_5$f = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_6$f = { class: "btn-box" };
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "FyConfirm",
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
      eventBus.on("resetConfirm", resetConfirm);
      eventBus.on("showConfirm", showConfirm);
    });
    onUnmounted(() => {
      eventBus.off("resetConfirm", resetConfirm);
      eventBus.off("showConfirm", showConfirm);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(unref(Dialog), {
          open: confirm.value,
          onClose: _cache[2] || (_cache[2] = ($event) => confirm.value = false),
          class: "fy-modal is-confirm",
          style: { "background": "rgba(0, 0, 0, 0.6)", "z-index": "43 !important" }
        }, {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_1$m, [
              createVNode(unref(DialogOverlay)),
              createElementVNode("div", _hoisted_2$l, [
                createElementVNode("div", null, [
                  createVNode(unref(DialogTitle), { class: "title" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(title.value), 1)
                    ]),
                    _: 1
                  }),
                  createElementVNode("div", _hoisted_3$l, [
                    desc.value ? (openBlock(), createElementBlock("div", _hoisted_4$i, toDisplayString(desc.value), 1)) : createCommentVNode("v-if", true),
                    _hoisted_5$f,
                    createElementVNode("div", _hoisted_6$f, [
                      createElementVNode("button", {
                        onClick: _cache[0] || (_cache[0] = ($event) => confirm.value = false),
                        class: "btn neutral btn-defaults"
                      }, toDisplayString(_ctx.$t("confirm_modal_cta_cancel")), 1),
                      createElementVNode("button", {
                        onClick: _cache[1] || (_cache[1] = ($event) => _onConfirm()),
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
      ]);
    };
  }
});
var FyConfirm = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "FyConfirm.vue"]]);

const _hoisted_1$l = {
  class: "fy-breadcrumb",
  "aria-label": "Breadcrumb"
};
const _hoisted_2$k = ["aria-current"];
const _hoisted_3$k = { key: 2 };
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "FyBreadcrumb",
  props: {
    nav: { default: () => [] },
    maxLength: { default: 32 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("nav", _hoisted_1$l, [
        createElementVNode("ol", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.nav, (item, index) => {
            return openBlock(), createElementBlock("li", {
              key: `bc_${index.toString()}`,
              class: normalizeClass(
                item.to ? index == 0 ? "li-home" : "li-normal" : "li-current"
              ),
              "aria-current": item.to ? void 0 : "page"
            }, [
              index != 0 ? (openBlock(), createBlock(unref(render$9), { key: 0 })) : createCommentVNode("v-if", true),
              item.to ? (openBlock(), createBlock(_component_router_link, {
                key: 1,
                to: item.to
              }, {
                default: withCtx(() => [
                  index === 0 ? (openBlock(), createBlock(unref(render$7), { key: 0 })) : createCommentVNode("v-if", true),
                  createTextVNode(" " + toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1)
                ]),
                _: 2
              }, 1032, ["to"])) : (openBlock(), createElementBlock("span", _hoisted_3$k, toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1))
            ], 10, _hoisted_2$k);
          }), 128))
        ])
      ]);
    };
  }
});
var FyBreadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "FyBreadcrumb.vue"]]);

const _hoisted_1$k = { class: "fy-step-bar" };
const _hoisted_2$j = { class: "bar-bg" };
const _hoisted_3$j = { class: "label" };
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "FySteps",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(__props) {
    const props = __props;
    const barWidth = computed(() => props.currentStep * 100 / props.steps.length);
    const getStepClass = (index) => {
      if (index + 1 < props.currentStep)
        return "past-step";
      if (index + 1 == props.currentStep)
        return "current-step";
      return "past-step";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$k, [
        createElementVNode("div", _hoisted_2$j, [
          createElementVNode("div", {
            class: "bar",
            style: normalizeStyle(`width:${unref(barWidth)}%`)
          }, null, 4)
        ]),
        createElementVNode("ol", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.steps, (step, index) => {
            return openBlock(), createElementBlock("li", {
              key: index,
              class: normalizeClass(getStepClass(index))
            }, [
              createElementVNode("span", _hoisted_3$j, toDisplayString(_ctx.$t(step.name)), 1),
              step.icon ? (openBlock(), createBlock(resolveDynamicComponent(step.icon), {
                key: 0,
                class: "icon"
              })) : createCommentVNode("v-if", true)
            ], 2);
          }), 128))
        ])
      ]);
    };
  }
});
var FySteps = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "FySteps.vue"]]);

const _hoisted_1$j = {
  key: 0,
  class: "border-collapse w-full md:mx-0 fy-datatable"
};
const _hoisted_2$i = { key: 0 };
const _hoisted_3$i = { class: "div" };
const _hoisted_4$h = { class: "div-cell" };
const _hoisted_5$e = { key: 0 };
const _hoisted_6$e = { key: 1 };
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "FyDatatable",
  props: {
    showHeaders: { type: Boolean, default: true },
    headers: null,
    data: { default: () => [] }
  },
  setup(__props) {
    const bgColor = (i) => {
      return i % 2 == 0 ? "bg-color-1" : "bg-color-2";
    };
    return (_ctx, _cache) => {
      return __props.data && __props.data.length > 0 ? (openBlock(), createElementBlock("table", _hoisted_1$j, [
        __props.showHeaders ? (openBlock(), createElementBlock("thead", _hoisted_2$i, [
          createElementVNode("tr", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, (title) => {
              return openBlock(), createElementBlock("th", {
                key: `header_${title}`
              }, toDisplayString(title), 1);
            }), 128))
          ])
        ])) : createCommentVNode("v-if", true),
        createElementVNode("tbody", null, [
          __props.data ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.data, (item, index) => {
            return openBlock(), createElementBlock("tr", {
              class: normalizeClass(`tr ${bgColor(index)} `),
              key: index
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, (title, property) => {
                return openBlock(), createElementBlock("td", {
                  key: title,
                  class: "td"
                }, [
                  createElementVNode("div", _hoisted_3$i, toDisplayString(title), 1),
                  createElementVNode("div", _hoisted_4$h, [
                    renderSlot(_ctx.$slots, `${property}_item`, {
                      data: { prop: item[property], item, idx: index }
                    }, () => [
                      item[property] ? (openBlock(), createElementBlock("span", _hoisted_5$e, toDisplayString(item[property].toString()), 1)) : (openBlock(), createElementBlock("span", _hoisted_6$e, "n/a"))
                    ])
                  ])
                ]);
              }), 128))
            ], 2);
          }), 128)) : createCommentVNode("v-if", true)
        ])
      ])) : createCommentVNode("v-if", true);
    };
  }
});
var FyDatatable = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "FyDatatable.vue"]]);

const _hoisted_1$i = {
  key: 0,
  class: "fy-table"
};
const _hoisted_2$h = { class: "table-container" };
const _hoisted_3$h = { class: "table-sub-container" };
const _hoisted_4$g = { class: "table-scroll" };
const _hoisted_5$d = { key: 0 };
const _hoisted_6$d = { key: 0 };
const _hoisted_7$c = { key: 1 };
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "FyTable",
  props: {
    showHeaders: { type: Boolean, default: true },
    headers: null,
    data: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return __props.data && __props.data.length ? (openBlock(), createElementBlock("div", _hoisted_1$i, [
        createElementVNode("div", _hoisted_2$h, [
          createElementVNode("div", _hoisted_3$h, [
            createElementVNode("div", _hoisted_4$g, [
              createElementVNode("table", null, [
                __props.showHeaders ? (openBlock(), createElementBlock("thead", _hoisted_5$d, [
                  createElementVNode("tr", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, (title, property) => {
                      return openBlock(), createElementBlock("th", { key: property }, toDisplayString(title), 1);
                    }), 128))
                  ])
                ])) : createCommentVNode("v-if", true),
                createElementVNode("tbody", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data, (item, index) => {
                    return openBlock(), createElementBlock("tr", { key: index }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, (_, property) => {
                        return openBlock(), createElementBlock("td", {
                          key: `${property}`
                        }, [
                          renderSlot(_ctx.$slots, `${property}_item`, {
                            data: {
                              prop: item[property],
                              item,
                              idx: index
                            }
                          }, () => [
                            item[property] ? (openBlock(), createElementBlock("span", _hoisted_6$d, toDisplayString(item[property]), 1)) : (openBlock(), createElementBlock("span", _hoisted_7$c, "n/a"))
                          ])
                        ]);
                      }), 128))
                    ]);
                  }), 128))
                ])
              ])
            ])
          ])
        ])
      ])) : createCommentVNode("v-if", true);
    };
  }
});
var FyTable = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "FyTable.vue"]]);

const _hoisted_1$h = /* @__PURE__ */ createElementVNode("path", {
  d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
  fill: "currentColor"
}, null, -1);
const _hoisted_2$g = /* @__PURE__ */ createElementVNode("path", {
  d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
  fill: "currentFill"
}, null, -1);
const _hoisted_3$g = [
  _hoisted_1$h,
  _hoisted_2$g
];
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "DefaultLoader",
  props: {
    size: { default: "16" },
    showLoadingText: { type: Boolean, default: true }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        (openBlock(), createElementBlock("svg", {
          style: normalizeStyle(`width: ${(parseInt(__props.size) / 2).toString()}rem; height: ${(parseInt(__props.size) / 2).toString()}rem;`),
          "aria-hidden": "true",
          class: "default-loader",
          viewBox: "0 0 100 101",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_3$g, 4)),
        createElementVNode("span", {
          class: normalizeClass(!__props.showLoadingText ? "is-sr" : "loader-text")
        }, toDisplayString(_ctx.$t("global_loading_text")), 3)
      ], 64);
    };
  }
});
var DefaultLoader = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "DefaultLoader.vue"]]);

const _hoisted_1$g = {
  key: 0,
  class: "fy-loader"
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "FyLoader",
  props: {
    id: null,
    loader: { default: () => DefaultLoader },
    showLoadingText: { type: Boolean, default: true },
    size: { default: "16" },
    force: { type: Boolean, default: false }
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
      } else {
        eventBus.on("loading", setLoading);
      }
    });
    onUnmounted(() => {
      if (props.id) {
        eventBus.off(`${props.id}-loading`, setLoading);
      } else {
        eventBus.off("loading", setLoading);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        loading.value || __props.force ? (openBlock(), createElementBlock("div", _hoisted_1$g, [
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
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var FyLoader = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "FyLoader.vue"]]);

const _hoisted_1$f = { class: "input-group" };
const _hoisted_2$f = ["for"];
const _hoisted_3$f = ["aria-label", "id", "true-value", "false-value"];
const _hoisted_4$f = ["href"];
const _hoisted_5$c = {
  key: 2,
  class: "is-req"
};
const _hoisted_6$c = ["aria-label", "placeholder", "autocomplete", "id", "type", "disabled"];
const _hoisted_7$b = ["aria-label", "placeholder", "autocomplete", "id", "disabled"];
const _hoisted_8$a = ["aria-label", "id"];
const _hoisted_9$9 = ["value"];
const _hoisted_10$8 = {
  key: 2,
  class: "form-error-label"
};
const _hoisted_11$8 = {
  key: 3,
  class: "help-text"
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "FyInput",
  props: {
    id: null,
    showLabel: { type: Boolean, default: true },
    label: null,
    type: { default: "text" },
    placeholder: null,
    autocomplete: null,
    checkboxTrueValue: { type: [String, Boolean], default: true },
    checkboxFalseValue: { type: [String, Boolean], default: false },
    req: { type: Boolean, default: false },
    linkIcon: null,
    modelValue: null,
    checkboxValue: null,
    options: { default: () => [] },
    help: null,
    error: null,
    errorVuelidate: null,
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:checkboxValue"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const translate = useTranslation();
    const inputRef = ref();
    const errorProps = toRef(props, "error");
    const errorVuelidateProps = toRef(props, "errorVuelidate");
    const checkErrors = computed(() => {
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
    const model = computed({
      get: () => props.modelValue,
      set: (items) => {
        emit("update:modelValue", items);
      }
    });
    const modelCheckbox = computed({
      get: () => props.checkboxValue,
      set: (items) => {
        emit("update:checkboxValue", items);
      }
    });
    expose({ focus, getInputRef });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        __props.showLabel && __props.id && __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: "label-basic",
          for: __props.id
        }, [
          __props.type == "checkbox" ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            "aria-label": __props.label,
            ref_key: "inputRef",
            ref: inputRef,
            type: "checkbox",
            class: normalizeClass(["form-checkbox", { "error-form": unref(checkErrors) }]),
            id: __props.id,
            "true-value": __props.checkboxTrueValue,
            "false-value": __props.checkboxFalseValue,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelCheckbox) ? modelCheckbox.value = $event : null)
          }, null, 10, _hoisted_3$f)), [
            [vModelCheckbox, unref(modelCheckbox)]
          ]) : createCommentVNode("v-if", true),
          createTextVNode(" " + toDisplayString(__props.label) + " ", 1),
          __props.linkIcon ? (openBlock(), createElementBlock("a", {
            key: 1,
            class: "link-icon",
            href: __props.linkIcon,
            target: "_blank"
          }, [
            createVNode(unref(render$6))
          ], 8, _hoisted_4$f)) : createCommentVNode("v-if", true),
          __props.req ? (openBlock(), createElementBlock("sup", _hoisted_5$c, "*")) : createCommentVNode("v-if", true)
        ], 8, _hoisted_2$f)) : createCommentVNode("v-if", true),
        !["checkbox", "radiobox"].includes(__props.type) ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["input-box", { error: unref(checkErrors), disabled: __props.disabled }])
        }, [
          renderSlot(_ctx.$slots, "before"),
          ["text", "password", "email", "search"].includes(__props.type) ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            ref_key: "inputRef",
            ref: inputRef,
            "aria-label": __props.label,
            class: "input-basic",
            placeholder: __props.placeholder,
            autocomplete: __props.autocomplete,
            id: __props.id,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(model) ? model.value = $event : null),
            type: __props.type,
            disabled: __props.disabled
          }, null, 8, _hoisted_6$c)), [
            [vModelDynamic, unref(model)]
          ]) : createCommentVNode("v-if", true),
          __props.type == "textarea" ? withDirectives((openBlock(), createElementBlock("textarea", {
            key: 1,
            "aria-label": __props.label,
            ref_key: "inputRef",
            ref: inputRef,
            class: "input-basic is-textarea",
            placeholder: __props.placeholder,
            autocomplete: __props.autocomplete,
            id: __props.id,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(model) ? model.value = $event : null),
            disabled: __props.disabled
          }, null, 8, _hoisted_7$b)), [
            [vModelText, unref(model)]
          ]) : createCommentVNode("v-if", true),
          __props.type == "select" ? withDirectives((openBlock(), createElementBlock("select", {
            key: 2,
            "aria-label": __props.label,
            ref_key: "inputRef",
            ref: inputRef,
            id: __props.id,
            class: "input-basic",
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(model) ? model.value = $event : null)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (opt) => {
              return openBlock(), createElementBlock("option", {
                value: opt[0],
                key: opt[0].toString()
              }, toDisplayString(opt[1]), 9, _hoisted_9$9);
            }), 128))
          ], 8, _hoisted_8$a)), [
            [vModelSelect, unref(model)]
          ]) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "after")
        ], 2)) : createCommentVNode("v-if", true),
        unref(checkErrors) ? (openBlock(), createElementBlock("div", _hoisted_10$8, toDisplayString(unref(checkErrors)), 1)) : createCommentVNode("v-if", true),
        __props.help ? (openBlock(), createElementBlock("div", _hoisted_11$8, toDisplayString(__props.help), 1)) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var FyInput = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "FyInput.vue"]]);

const _hoisted_1$e = {
  key: 0,
  class: "fy-paging"
};
const _hoisted_2$e = { class: "paging-container" };
const _hoisted_3$e = { "aria-label": "Pagination" };
const _hoisted_4$e = { class: "is-sr" };
const _hoisted_5$b = {
  key: 2,
  class: "dots"
};
const _hoisted_6$b = ["onClick"];
const _hoisted_7$a = {
  href: "#",
  "aria-current": "page",
  class: "active"
};
const _hoisted_8$9 = ["onClick"];
const _hoisted_9$8 = {
  key: 3,
  class: "dots"
};
const _hoisted_10$7 = { class: "is-sr" };
const _hoisted_11$7 = { class: "paging-text" };
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "FyPaging",
  props: {
    items: null,
    id: null
  },
  setup(__props) {
    const props = __props;
    const eventBus = useEventBus();
    const history = useHistory();
    const isNewPage = (page2) => {
      return page2 >= 1 && page2 <= props.items.page_max && page2 != props.items.page_no;
    };
    const next = () => {
      const page2 = props.items.page_no + 1;
      if (!isNewPage(page2))
        return;
      history.push({
        path: history.currentRoute.path,
        query: { page: page2.toString() }
      }).then(() => {
        eventBus.emit(`${props.id}GoToPage`, page2);
      });
    };
    const prev = () => {
      const page2 = props.items.page_no - 1;
      if (!isNewPage(page2))
        return;
      history.push({
        path: history.currentRoute.path,
        query: { page: page2.toString() }
      }).then(() => {
        eventBus.emit(`${props.id}GoToPage`, page2);
      });
    };
    const page = (page2) => {
      if (!isNewPage(page2))
        return;
      history.push({
        path: history.currentRoute.path,
        query: { page: page2.toString() }
      }).then(() => {
        eventBus.emit(`${props.id}GoToPage`, page2);
      });
    };
    return (_ctx, _cache) => {
      return __props.items && __props.items.page_max > 1 && __props.items.page_no ? (openBlock(), createElementBlock("div", _hoisted_1$e, [
        createElementVNode("div", _hoisted_2$e, [
          createElementVNode("nav", _hoisted_3$e, [
            __props.items.page_no >= 2 ? (openBlock(), createElementBlock("a", {
              key: 0,
              href: "javascript:void(0);",
              onClick: _cache[0] || (_cache[0] = ($event) => prev()),
              class: "prev-next"
            }, [
              createElementVNode("span", _hoisted_4$e, toDisplayString(_ctx.$t("previous_paging")), 1),
              createVNode(unref(render$a), { class: "fv-icon-base" })
            ])) : createCommentVNode("v-if", true),
            __props.items.page_no - 2 > 1 ? (openBlock(), createElementBlock("a", {
              key: 1,
              class: "innactive",
              href: "javascript:void(0);",
              onClick: _cache[1] || (_cache[1] = ($event) => page(1))
            }, " 1 ")) : createCommentVNode("v-if", true),
            __props.items.page_no - 2 > 2 ? (openBlock(), createElementBlock("span", _hoisted_5$b, " ... ")) : createCommentVNode("v-if", true),
            (openBlock(), createElementBlock(Fragment, null, renderList(2, (i) => {
              return openBlock(), createElementBlock(Fragment, null, [
                __props.items.page_no - (3 - i) >= 1 ? (openBlock(), createElementBlock("a", {
                  class: "innactive",
                  href: "javascript:void(0);",
                  key: `${i}-sm`,
                  onClick: ($event) => page(__props.items.page_no - (3 - i))
                }, toDisplayString(__props.items.page_no - (3 - i)), 9, _hoisted_6$b)) : createCommentVNode("v-if", true)
              ], 64);
            }), 64)),
            createElementVNode("a", _hoisted_7$a, toDisplayString(__props.items.page_no), 1),
            (openBlock(), createElementBlock(Fragment, null, renderList(2, (i) => {
              return openBlock(), createElementBlock(Fragment, null, [
                __props.items.page_no + i <= __props.items.page_max ? (openBlock(), createElementBlock("a", {
                  class: "innactive",
                  href: "javascript:void(0);",
                  key: `${i}-md`,
                  onClick: ($event) => page(__props.items.page_no + i)
                }, toDisplayString(__props.items.page_no + i), 9, _hoisted_8$9)) : createCommentVNode("v-if", true)
              ], 64);
            }), 64)),
            __props.items.page_no + 2 < __props.items.page_max - 1 ? (openBlock(), createElementBlock("span", _hoisted_9$8, " ... ")) : createCommentVNode("v-if", true),
            __props.items.page_no + 2 < __props.items.page_max ? (openBlock(), createElementBlock("a", {
              key: 4,
              class: "innactive",
              href: "javascript:void(0);",
              onClick: _cache[2] || (_cache[2] = ($event) => page(__props.items.page_max))
            }, toDisplayString(__props.items.page_max), 1)) : createCommentVNode("v-if", true),
            __props.items.page_no < __props.items.page_max - 1 ? (openBlock(), createElementBlock("a", {
              key: 5,
              href: "javascript:void(0);",
              onClick: _cache[3] || (_cache[3] = ($event) => next()),
              class: "prev-next"
            }, [
              createElementVNode("span", _hoisted_10$7, toDisplayString(_ctx.$t("next_paging")), 1),
              createVNode(unref(render$9), { class: "fv-icon-base" })
            ])) : createCommentVNode("v-if", true)
          ]),
          createElementVNode("p", _hoisted_11$7, toDisplayString(_ctx.$t("global_paging", {
            start: __props.items.results_per_page * (__props.items.page_no - 1),
            end: __props.items.results_per_page * __props.items.page_no,
            total: __props.items.count >= 1e4 ? _ctx.$t("paging_a_lot_of") : __props.items.count
          })), 1)
        ])
      ])) : createCommentVNode("v-if", true);
    };
  }
});
var FyPaging = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "FyPaging.vue"]]);

function useCart() {
    return {
        resetCart: () => {
            return new Promise((resolve, reject) => {
                rest('Catalog/Cart/@:reset', 'POST', {})
                    .then((_resetResult) => {
                    if (_resetResult && _resetResult.result == 'success') {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                })
                    .catch(() => {
                    reject(false);
                });
            });
        },
        createOrder(billingLocation) {
            return rest('Catalog/Cart/@:createOrder', 'POST', {
                Billing: billingLocation,
            });
        },
        getCart() {
            return rest('/Catalog/Cart/@', 'GET');
        },
        delProduct: (productKey) => {
            return new Promise((resolve, reject) => {
                rest('Catalog/Cart/@:process', 'POST', {
                    request: productKey + `=0`,
                })
                    .then((_addProductCartResult) => {
                    if (_addProductCartResult &&
                        _addProductCartResult.result == 'success') {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                })
                    .catch(() => {
                    reject(false);
                });
            });
        },
        addProduct: (productUuid, meta) => {
            return new Promise((resolve, reject) => {
                rest('Catalog/Cart/@:process', 'POST', {
                    request: productUuid + meta,
                })
                    .then((_addProductCartResult) => {
                    if (_addProductCartResult &&
                        _addProductCartResult.result == 'success') {
                        resolve(_addProductCartResult);
                    }
                    else {
                        resolve(_addProductCartResult);
                    }
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        },
    };
}

const useFVStore = defineStore({
    id: 'fVStore',
    state: () => ({
        user: null,
        cartCount: 0,
        cart: null,
    }),
    getters: {
        isAuth: (state) => {
            return !(state.user === null);
        },
    },
    actions: {
        async refreshCart() {
            const _cart = await useCart().getCart();
            if (_cart && _cart.result == 'success') {
                this.cartCount = _cart.data.products.length;
                this.cart = _cart.data;
            }
        },
        async refreshCartData(_cart) {
            if (_cart && _cart.result == 'success') {
                this.cartCount = _cart.data.products.length;
                this.cart = _cart.data;
            }
        },
        async refreshUser(params = {}) {
            const apiData = await rest$1('User:get', 'GET', params).catch((err) => { });
            if (apiData.result == 'success' && apiData.data != null) {
                this.user = apiData.data;
            }
            else {
                this.user = null;
            }
        },
        async logout() {
            const apiData = await rest$1('User:logout', 'POST').catch((err) => { });
            if (apiData.result == 'success') {
                this.setUser(null);
            }
        },
        setUser(user) {
            this.user = user;
        },
    },
});

const ClientOnly = defineComponent({
    __name: 'ClientOnly',
    setup(_, { slots }) {
        const show = ref(false);
        onMounted(() => {
            show.value = true;
        });
        return () => (show.value && slots.default ? slots.default() : null);
    },
});

const _hoisted_1$d = { class: "fy-navbar" };
const _hoisted_2$d = { class: "nav-container" };
const _hoisted_3$d = { key: 0 };
const _hoisted_4$d = { class: "nav-actions" };
const _hoisted_5$a = { class: "badge" };
const _hoisted_6$a = /* @__PURE__ */ createElementVNode("span", { class: "is-sr" }, "Open main menu", -1);
const _hoisted_7$9 = /* @__PURE__ */ createElementVNode("svg", {
  "aria-hidden": "true",
  fill: "currentColor",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
    "clip-rule": "evenodd"
  })
], -1);
const _hoisted_8$8 = [
  _hoisted_6$a,
  _hoisted_7$9
];
const _hoisted_9$7 = { class: "main-ul" };
const _hoisted_10$6 = /* @__PURE__ */ createElementVNode("svg", {
  "aria-hidden": "true",
  fill: "currentColor",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
    "clip-rule": "evenodd"
  })
], -1);
const _hoisted_11$6 = ["href", "title", "alt"];
const _hoisted_12$5 = ["href", "title", "alt"];
const _hoisted_13$4 = { key: 0 };
const _hoisted_14$4 = { key: 1 };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "FyNavbar",
  props: {
    title: null,
    showTitle: { type: Boolean, default: true },
    darkLight: { type: Boolean, default: true },
    links: null,
    loginPath: { default: "/login" },
    accountPath: { default: "/user" },
    cartPath: { default: "/user/order" },
    showDashboardLink: { type: Boolean, default: true },
    showCart: { type: Boolean, default: false }
  },
  setup(__props) {
    const isDark = useDark({
      selector: "html",
      attribute: "class",
      valueDark: "dark",
      valueLight: "light"
    });
    const isOpen = ref(false);
    const toggleDark = useToggle(isDark);
    const toggleNavbarOpen = useToggle(isOpen);
    const store = useFVStore();
    const isAuth = computed(() => store.isAuth);
    const cartCount = computed(() => store.cartCount);
    const logout = async () => {
      await store.logout();
      useHistory().push("/", 302);
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("nav", _hoisted_1$d, [
        createElementVNode("div", _hoisted_2$d, [
          createVNode(_component_router_link, {
            to: "/",
            class: "logo-image"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "logo"),
              __props.title && __props.showTitle ? (openBlock(), createElementBlock("span", _hoisted_3$d, toDisplayString(__props.title), 1)) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }),
          createElementVNode("div", _hoisted_4$d, [
            createVNode(unref(ClientOnly), null, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "cart", {}, () => [
                  __props.showCart ? (openBlock(), createBlock(_component_router_link, {
                    key: 0,
                    to: __props.cartPath,
                    class: "nav-cart"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(render$3)),
                      createElementVNode("div", _hoisted_5$a, toDisplayString(unref(cartCount).toString()), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])) : createCommentVNode("v-if", true)
                ])
              ]),
              _: 3
            }),
            __props.darkLight ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = ($event) => unref(toggleDark)()),
              class: "btn neutral light-dark"
            }, [
              !unref(isDark) ? (openBlock(), createBlock(unref(render$5), { key: 0 })) : (openBlock(), createBlock(unref(render$2), { key: 1 }))
            ])) : createCommentVNode("v-if", true),
            createElementVNode("button", {
              type: "button",
              class: "open-nav-button",
              onClick: _cache[1] || (_cache[1] = ($event) => unref(toggleNavbarOpen)())
            }, _hoisted_8$8)
          ]),
          createElementVNode("div", {
            class: normalizeClass(["nav-menu", isOpen.value ? "is-open" : ""])
          }, [
            createElementVNode("ul", _hoisted_9$7, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.links, (link, index) => {
                return openBlock(), createElementBlock("li", {
                  key: `link_${index.toString()}`
                }, [
                  link.childrens && link.childrens.length > 0 ? (openBlock(), createBlock(unref(Menu), { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(unref(MenuButton), { class: "is-link has-childs" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(link.name) + " ", 1),
                          _hoisted_10$6
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(Transition, { name: "fade" }, {
                        default: withCtx(() => [
                          createVNode(unref(MenuItems), { class: "sub-nav" }, {
                            default: withCtx(() => [
                              createElementVNode("ul", null, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(link.childrens, (children, index2) => {
                                  return openBlock(), createBlock(unref(MenuItem), {
                                    key: `link_children_${index2.toString()}`
                                  }, {
                                    default: withCtx(() => [
                                      createElementVNode("li", null, [
                                        !children.isExternal ? (openBlock(), createBlock(_component_router_link, {
                                          key: 0,
                                          to: children.to,
                                          title: children.name,
                                          alt: children.name,
                                          class: "is-link"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(children.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["to", "title", "alt"])) : (openBlock(), createElementBlock("a", {
                                          key: 1,
                                          href: children.to,
                                          title: children.name,
                                          alt: children.name,
                                          class: "is-link"
                                        }, toDisplayString(children.name), 9, _hoisted_11$6))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    !link.isExternal ? (openBlock(), createBlock(_component_router_link, {
                      key: 0,
                      to: link.to,
                      title: link.name,
                      alt: link.name,
                      class: normalizeClass(["is-link", ""])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(link.name), 1)
                      ]),
                      _: 2
                    }, 1032, ["to", "title", "alt"])) : (openBlock(), createElementBlock("a", {
                      key: 1,
                      href: link.to,
                      title: link.name,
                      alt: link.name,
                      class: normalizeClass(["is-link", ""])
                    }, toDisplayString(link.name), 9, _hoisted_12$5))
                  ], 64))
                ]);
              }), 128))
            ]),
            renderSlot(_ctx.$slots, "custom"),
            renderSlot(_ctx.$slots, "buttons", {}, () => [
              unref(isAuth) ? (openBlock(), createElementBlock("div", _hoisted_13$4, [
                createElementVNode("a", {
                  href: "javascript:void(0)",
                  onClick: _cache[2] || (_cache[2] = ($event) => logout()),
                  class: "btn neutral btn-defaults"
                }, toDisplayString(_ctx.$t("navbar_logout_cta")), 1),
                __props.showDashboardLink ? (openBlock(), createBlock(_component_router_link, {
                  key: 0,
                  to: "/user",
                  class: "btn primary btn-defaults"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("navbar_dashboard_cta")), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("v-if", true)
              ])) : (openBlock(), createElementBlock("div", _hoisted_14$4, [
                createVNode(_component_router_link, {
                  to: "/login",
                  class: "btn neutral btn-defaults"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("navbar_login_cta")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_router_link, {
                  to: "/login",
                  class: "btn primary btn-defaults"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("navbar_signup_cta")), 1)
                  ]),
                  _: 1
                })
              ]))
            ])
          ], 2)
        ])
      ]);
    };
  }
});
var FyNavbar = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "FyNavbar.vue"]]);

const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "FyTabs",
  setup(__props) {
    return (_ctx, _cache) => {
      return "Yo";
    };
  }
});
var FyTabs = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "FyTabs.vue"]]);

var uiComponents = {
    FyModal,
    FyCirclePercent,
    FyConfirm,
    FyBreadcrumb,
    FySteps,
    FyDatatable,
    FyTable,
    FyLoader,
    FyInput,
    FyPaging,
    FyNavbar,
    FyTabs,
};

const _hoisted_1$c = { class: "w-full" };
const _hoisted_2$c = {
  key: 0,
  class: "message"
};
const _hoisted_3$c = {
  key: 0,
  class: "oauth-container"
};
const _hoisted_4$c = ["onClick"];
const _hoisted_5$9 = ["alt", "src"];
const _hoisted_6$9 = {
  key: 1,
  class: "response-error"
};
const _hoisted_7$8 = {
  key: 2,
  class: "reset-pwd"
};
const _hoisted_8$7 = { class: "btn primary btn-defaults" };
const _hoisted_9$6 = {
  key: 0,
  class: "response-error"
};
const _hoisted_10$5 = /* @__PURE__ */ createElementVNode("br", { style: { "clear": "both" } }, null, -1);
const _hoisted_11$5 = { key: 1 };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "KlbLogin",
  props: {
    returnDefault: { default: "/" },
    forceAction: null,
    onSuccess: null
  },
  setup(__props) {
    const props = __props;
    const state = reactive({
      userEmail: ""
    });
    const rules = {
      userEmail: { required }
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
      action: props.forceAction ? props.forceAction : void 0
    });
    const completed = ref(false);
    const forgotPassword = async () => {
      if (await v$.value.$validate()) {
        const data = await rest("User:forgot_password", "POST", {
          login: state.userEmail
        }).catch((err) => {
          pwdRecoverError.value = err;
        });
        if (data?.result == "success") {
          pwdRecoverMailSent.value = true;
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
      if (route.query.return_to && typeof route.query.return_to == "string") {
        returnTo.value = route.query.return_to ? route.query.return_to : props.returnDefault;
      }
      if (!formData.value.session) {
        formData.value.session = route.query.session ? route.query.session : void 0;
      }
      formData.value.return_to = returnTo.value;
      response.value = await rest("User:flow", "POST", formData.value).catch(
        (err) => {
          responseError.value = err;
          if (responseError.value.param) {
            fieldsError.value[responseError.value.param] = responseError.value.token;
          }
          eventBus.emit("klblogin-loading", false);
          return;
        }
      );
      if (response.value?.result == "success") {
        if (props.onSuccess) {
          await props.onSuccess();
        }
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
          session: response.value.data.session
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
      eventBus.emit("klblogin-loading", false);
    };
    onMounted(async () => {
      await userFlow({ initial: true });
    });
    return (_ctx, _cache) => {
      const _component_FyLoader = resolveComponent("FyLoader");
      const _component_FyModal = resolveComponent("FyModal");
      return openBlock(), createElementBlock("div", null, [
        !completed.value ? (openBlock(), createElementBlock("form", {
          key: 0,
          onSubmit: _cache[1] || (_cache[1] = withModifiers(($event) => userFlow(), ["prevent"])),
          class: "klb-login"
        }, [
          createVNode(_component_FyLoader, { id: "klblogin" }),
          createElementVNode("div", _hoisted_1$c, [
            responseMessage.value ? (openBlock(), createElementBlock("h2", _hoisted_2$c, toDisplayString(responseMessage.value), 1)) : createCommentVNode("v-if", true),
            responseFields.value.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(responseFields.value, (field) => {
                return openBlock(), createElementBlock(Fragment, {
                  key: field.label
                }, [
                  field.type == "label" ? (openBlock(), createElementBlock("h3", {
                    key: 0,
                    class: normalizeClass(["label", field.style == "error" ? "response-error" : ""])
                  }, toDisplayString(field.label), 3)) : createCommentVNode("v-if", true),
                  field.cat == "input" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    field.type == "text" || field.type == "password" || field.type == "email" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      field.name ? (openBlock(), createBlock(FyInput, {
                        key: 0,
                        id: field.name,
                        label: field.label,
                        placeholder: field.name == "name" ? "John Doe" : field.label,
                        error: fieldsError.value[field.name],
                        type: field.type,
                        ref_for: true,
                        ref_key: "inputs",
                        ref: inputs,
                        modelValue: formData.value[field.name],
                        "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                        req: responseReq.value.includes(field.name)
                      }, null, 8, ["id", "label", "placeholder", "error", "type", "modelValue", "onUpdate:modelValue", "req"])) : createCommentVNode("v-if", true)
                    ], 64)) : createCommentVNode("v-if", true)
                  ], 64)) : createCommentVNode("v-if", true),
                  field.type == "checkbox" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                    field.name ? (openBlock(), createBlock(FyInput, {
                      key: 0,
                      id: field.name,
                      label: field.label,
                      error: fieldsError.value[field.name],
                      type: field.type,
                      "checkbox-value": formData.value[field.name],
                      "onUpdate:checkbox-value": ($event) => formData.value[field.name] = $event,
                      req: responseReq.value.includes(field.name),
                      "link-icon": field.link
                    }, null, 8, ["id", "label", "error", "type", "checkbox-value", "onUpdate:checkbox-value", "req", "link-icon"])) : createCommentVNode("v-if", true)
                  ], 64)) : createCommentVNode("v-if", true)
                ], 64);
              }), 128)),
              hasOauth.value ? (openBlock(), createElementBlock("div", _hoisted_3$c, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(responseFields.value, (field) => {
                  return openBlock(), createElementBlock(Fragment, {
                    key: field.id
                  }, [
                    field.type && field.type == "oauth2" && field.button ? (openBlock(), createElementBlock("a", {
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
                        style: normalizeStyle(`background: ${field.button["background-color"]}`)
                      }, null, 12, _hoisted_5$9))
                    ], 8, _hoisted_4$c)) : createCommentVNode("v-if", true)
                  ], 64);
                }), 128))
              ])) : createCommentVNode("v-if", true),
              responseError.value && responseError.value.token ? (openBlock(), createElementBlock("div", _hoisted_6$9, toDisplayString(_ctx.$t(responseError.value.token)), 1)) : createCommentVNode("v-if", true),
              responseReq.value.includes("password") && 0 ? (openBlock(), createElementBlock("div", _hoisted_7$8, [
                createElementVNode("a", {
                  href: "javascript:void(0)",
                  onClick: _cache[0] || (_cache[0] = () => {
                    unref(eventBus).emit("ResetPasswordModal", true);
                    pwdRecoverMailSent.value = false;
                  })
                }, toDisplayString(_ctx.$t("recover_pwd_link")), 1)
              ])) : createCommentVNode("v-if", true),
              createElementVNode("button", _hoisted_8$7, toDisplayString(_ctx.$t("cta_login_next")), 1)
            ], 64)) : createCommentVNode("v-if", true)
          ])
        ], 32)) : createCommentVNode("v-if", true),
        createVNode(_component_FyModal, {
          id: "ResetPassword",
          title: `${_ctx.$t("recover_pwd_title")}`
        }, {
          default: withCtx(() => [
            !pwdRecoverMailSent.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(FyInput, {
                id: "emailRecover",
                req: true,
                showLabel: true,
                placeholder: _ctx.$t("recover_pwd_email_placeholder"),
                modelValue: state.userEmail,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => state.userEmail = $event),
                errorVuelidate: unref(v$).userEmail.$errors,
                type: "email",
                label: _ctx.$t("recover_pwd_email_label")
              }, null, 8, ["placeholder", "modelValue", "errorVuelidate", "label"]),
              pwdRecoverError.value && pwdRecoverError.value.token ? (openBlock(), createElementBlock("div", _hoisted_9$6, toDisplayString(_ctx.$t(pwdRecoverError.value.token)), 1)) : createCommentVNode("v-if", true),
              createElementVNode("a", {
                href: "javascript:void(0)",
                onClick: _cache[3] || (_cache[3] = ($event) => forgotPassword()),
                class: "mt-2 float-right btn px-5 py-2 primary"
              }, toDisplayString(_ctx.$t("recover_pwd_cta")), 1),
              _hoisted_10$5
            ], 64)) : (openBlock(), createElementBlock("div", _hoisted_11$5, toDisplayString(_ctx.$t("pwd_recover_confirm")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ]);
    };
  }
});
var KlbLogin = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "KlbLogin.vue"]]);

const _hoisted_1$b = {
  key: 0,
  class: "klb-account"
};
const _hoisted_2$b = {
  key: 0,
  class: "input-group"
};
const _hoisted_3$b = { class: "label-basic" };
const _hoisted_4$b = { class: "input-box-child" };
const _hoisted_5$8 = { class: "main" };
const _hoisted_6$8 = ["onSubmit"];
const _hoisted_7$7 = { class: "klb-account-grid-inputs" };
const _hoisted_8$6 = {
  key: 0,
  class: "form-error-label"
};
const _hoisted_9$5 = {
  class: "btn-defaults mt-4 btn primary",
  type: "submit"
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "KlbUpdateEmailModal",
  props: {
    showValueButton: { type: Boolean, default: true }
  },
  setup(__props) {
    const eventBus = useEventBus();
    const store = useFVStore();
    const isAuth = computed(() => store.isAuth);
    const errorOnSubmit = ref(void 0);
    const rules = {
      updateEmail: {
        email: { required, email },
        pwd: { required }
      }
    };
    const state = reactive({ updateEmail: { email: "", pwd: "" } });
    const v$ = useVuelidate(rules, state);
    const changeEmail = async () => {
      errorOnSubmit.value = void 0;
      if (await v$.value.updateEmail.$validate()) {
        const _updateResult = await rest("User/@:setEmail", "POST", {
          email: state.updateEmail.email,
          current_password: state.updateEmail.pwd
        }).catch((err) => {
          errorOnSubmit.value = err.token;
        });
        if (_updateResult && _updateResult.result == "success") {
          await store.refreshUser();
          eventBus.emit("UpdateEmailModal", false);
        }
      }
    };
    return (_ctx, _cache) => {
      const _component_FyModal = resolveComponent("FyModal");
      return unref(isAuth) ? (openBlock(), createElementBlock("div", _hoisted_1$b, [
        __props.showValueButton ? (openBlock(), createElementBlock("div", _hoisted_2$b, [
          createElementVNode("div", _hoisted_3$b, toDisplayString(_ctx.$t("update_email_display_label")), 1),
          createElementVNode("div", _hoisted_4$b, [
            createElementVNode("div", _hoisted_5$8, toDisplayString(unref(store).user?.Email), 1),
            createElementVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => unref(eventBus).emit("UpdateEmailModal", true)),
              class: "btn primary small"
            }, [
              createVNode(unref(render$4), { class: "edit-icon" }),
              createTextVNode(" " + toDisplayString(_ctx.$t("update_email_display_cta")), 1)
            ])
          ])
        ])) : createCommentVNode("v-if", true),
        createVNode(_component_FyModal, {
          id: "UpdateEmail",
          title: _ctx.$t("update_email_modal_title")
        }, {
          default: withCtx(() => [
            createElementVNode("form", {
              onSubmit: withModifiers(changeEmail, ["prevent"])
            }, [
              createElementVNode("div", _hoisted_7$7, [
                createVNode(FyInput, {
                  id: "currPwd",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("update_email_form_pwd_placeholder"),
                  errorVuelidate: unref(v$).updateEmail.pwd.$errors,
                  modelValue: state.updateEmail.pwd,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => state.updateEmail.pwd = $event),
                  label: _ctx.$t("update_email_form_pwd_label"),
                  type: "password",
                  autocomplete: "off"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                createVNode(FyInput, {
                  id: "newEmail",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("update_email_form_email_placeholder"),
                  errorVuelidate: unref(v$).updateEmail.email.$errors,
                  modelValue: state.updateEmail.email,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => state.updateEmail.email = $event),
                  label: _ctx.$t("update_email_form_email_label"),
                  autocomplete: "off",
                  type: "email"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"])
              ]),
              errorOnSubmit.value ? (openBlock(), createElementBlock("div", _hoisted_8$6, toDisplayString(errorOnSubmit.value), 1)) : createCommentVNode("v-if", true),
              createElementVNode("button", _hoisted_9$5, toDisplayString(_ctx.$t("update_email_cta")), 1)
            ], 40, _hoisted_6$8)
          ]),
          _: 1
        }, 8, ["title"])
      ])) : createCommentVNode("v-if", true);
    };
  }
});
var KlbUpdateEmailModal = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "KlbUpdateEmailModal.vue"]]);

const _hoisted_1$a = {
  key: 0,
  class: "klb-account"
};
const _hoisted_2$a = {
  key: 0,
  class: "input-group"
};
const _hoisted_3$a = { class: "label-basic" };
const _hoisted_4$a = { class: "input-box-child" };
const _hoisted_5$7 = ["onSubmit"];
const _hoisted_6$7 = { class: "klb-account-grid-inputs" };
const _hoisted_7$6 = {
  key: 0,
  class: "form-error-label"
};
const _hoisted_8$5 = {
  class: "btn-defaults mt-4 btn primary",
  type: "submit"
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "KlbUpdatePasswordModal",
  props: {
    showValueButton: { type: Boolean, default: true }
  },
  setup(__props) {
    const eventBus = useEventBus();
    const store = useFVStore();
    const isAuth = computed(() => store.isAuth);
    const pwd = ref();
    const pwdConfirm = ref();
    const oldPwd = ref();
    const errorOnSubmit = ref(void 0);
    const rules = {
      oldPwd: { required },
      pwd: { required },
      pwdConfirm: { req: required, sameAs: sameAs(pwd) }
    };
    const v$ = useVuelidate(rules, { oldPwd, pwd, pwdConfirm });
    const changeEmail = async () => {
      errorOnSubmit.value = void 0;
      if (await v$.value.$validate()) {
        const _updateResult = await rest("User/@:setPassword", "POST", {
          old_password: oldPwd,
          password: pwd
        }).catch((err) => {
          errorOnSubmit.value = err.token;
        });
        if (_updateResult && _updateResult.result == "success") {
          await store.refreshUser();
          eventBus.emit("updatePwdModal", false);
        }
      }
    };
    return (_ctx, _cache) => {
      const _component_FyModal = resolveComponent("FyModal");
      return unref(isAuth) ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
        __props.showValueButton ? (openBlock(), createElementBlock("div", _hoisted_2$a, [
          createElementVNode("div", _hoisted_3$a, toDisplayString(_ctx.$t("update_pwd_display_label")), 1),
          createElementVNode("div", _hoisted_4$a, [
            createElementVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => unref(eventBus).emit("updatePwdModal", true)),
              class: "btn primary small"
            }, [
              createVNode(unref(render$4), { class: "edit-icon" }),
              createTextVNode(" " + toDisplayString(_ctx.$t("update_pwd_display_cta")), 1)
            ])
          ])
        ])) : createCommentVNode("v-if", true),
        createVNode(_component_FyModal, {
          id: "updatePwd",
          title: _ctx.$t("update_pwd_modal_title")
        }, {
          default: withCtx(() => [
            createElementVNode("form", {
              onSubmit: withModifiers(changeEmail, ["prevent"])
            }, [
              createElementVNode("div", _hoisted_6$7, [
                createVNode(FyInput, {
                  id: "newPwd",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("update_pwd_form_newPwd_placeholder"),
                  errorVuelidate: unref(v$).pwd.$errors,
                  modelValue: pwd.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => pwd.value = $event),
                  label: _ctx.$t("update_pwd_form_newPwd_label"),
                  type: "password",
                  autocomplete: "off"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                createVNode(FyInput, {
                  id: "newPwdConfirm",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("update_pwd_form_pwdConfirm_placeholder"),
                  errorVuelidate: unref(v$).pwdConfirm.$errors,
                  modelValue: pwdConfirm.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => pwdConfirm.value = $event),
                  label: _ctx.$t("update_pwd_form_pwdConfirm_label"),
                  type: "password",
                  autocomplete: "off"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"])
              ]),
              createVNode(FyInput, {
                id: "oldPwd",
                req: true,
                showLabel: true,
                placeholder: _ctx.$t("update_pwd_form_oldPwd_placeholder"),
                errorVuelidate: unref(v$).oldPwd.$errors,
                modelValue: oldPwd.value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => oldPwd.value = $event),
                label: _ctx.$t("update_pwd_form_oldPwd_label"),
                type: "password",
                autocomplete: "off"
              }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
              errorOnSubmit.value ? (openBlock(), createElementBlock("div", _hoisted_7$6, toDisplayString(errorOnSubmit.value), 1)) : createCommentVNode("v-if", true),
              createElementVNode("button", _hoisted_8$5, toDisplayString(_ctx.$t("update_pwd_cta")), 1)
            ], 40, _hoisted_5$7)
          ]),
          _: 1
        }, 8, ["title"])
      ])) : createCommentVNode("v-if", true);
    };
  }
});
var KlbUpdatePasswordModal = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "KlbUpdatePasswordModal.vue"]]);

const _hoisted_1$9 = {
  key: 0,
  class: "klb-account"
};
const _hoisted_2$9 = { class: "input-group" };
const _hoisted_3$9 = { class: "label-basic" };
const _hoisted_4$9 = { class: "input-box-child" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "KlbDeleteAccount",
  props: {
    url: { default: "/login" }
  },
  setup(__props) {
    const store = useFVStore();
    const isAuth = computed(() => store.isAuth);
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return unref(isAuth) ? (openBlock(), createElementBlock("div", _hoisted_1$9, [
        createElementVNode("div", _hoisted_2$9, [
          createElementVNode("div", _hoisted_3$9, toDisplayString(_ctx.$t("delete_account_display_label")), 1),
          createElementVNode("div", _hoisted_4$9, [
            createVNode(_component_router_link, {
              to: `${__props.url}?act=delete_account`,
              class: "btn primary small"
            }, {
              default: withCtx(() => [
                createVNode(unref(render$8), { class: "edit-icon" }),
                createTextVNode(" " + toDisplayString(_ctx.$t("delete_account_display_cta")), 1)
              ]),
              _: 1
            }, 8, ["to"])
          ])
        ])
      ])) : createCommentVNode("v-if", true);
    };
  }
});
var KlbDeleteAccount = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "KlbDeleteAccount.vue"]]);

const _hoisted_1$8 = { class: "klb-billing-history" };
const _hoisted_2$8 = ["href"];
const _hoisted_3$8 = { class: "billing-history-tag" };
const _hoisted_4$8 = { class: "billing-history-tag" };
const _hoisted_5$6 = {
  key: 1,
  class: "self-loader-fyvue"
};
const _hoisted_6$6 = {
  key: 2,
  class: "no-billing-history"
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "KlbBillingHistory",
  setup(__props) {
    const store = useFVStore();
    const isAuth = computed(() => store.isAuth);
    const billingHistory = ref();
    const getPaymentHistory = async (page = 1) => {
      const _billingHistory = await rest("Order", "GET", {
        page_no: page,
        results_per_page: 10,
        Status: "completed"
      }).catch(() => {
      });
      if (_billingHistory && _billingHistory.result == "success") {
        billingHistory.value = _billingHistory;
      }
    };
    onMounted(async () => {
      if (isAuth.value) {
        await getPaymentHistory();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        billingHistory.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          billingHistory.value.paging && billingHistory.value.paging.page_no ? (openBlock(), createBlock(FyPaging, {
            key: 0,
            id: "billingHistory",
            items: billingHistory.value.paging,
            class: "billing-history-paging"
          }, null, 8, ["items"])) : createCommentVNode("v-if", true),
          createVNode(FyTable, {
            data: billingHistory.value.data,
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
                class: "btn neutral download-btn"
              }, [
                createVNode(unref(render$b), {
                  stroke: "currentColor",
                  class: "download-icon"
                }),
                createTextVNode(" " + toDisplayString(_ctx.$t("billing_history_download_cta")), 1)
              ], 8, _hoisted_2$8)) : createCommentVNode("v-if", true)
            ]),
            Total_item: withCtx((property) => [
              createElementVNode("span", _hoisted_3$8, toDisplayString(property.data.item.Total_Vat.display), 1)
            ]),
            Status_item: withCtx((property) => [
              createElementVNode("span", _hoisted_4$8, toDisplayString(property.data.item.Status), 1)
            ]),
            Invoice_Date_item: withCtx((property) => [
              createTextVNode(toDisplayString(_ctx.$formatDatetime(property.data.item.Invoice_Date.unixms)), 1)
            ]),
            Paid_item: withCtx((property) => [
              createTextVNode(toDisplayString(_ctx.$formatDatetime(property.data.item.Paid.unixms)), 1)
            ]),
            _: 1
          }, 8, ["data", "headers"]),
          billingHistory.value.paging && billingHistory.value.paging.page_no ? (openBlock(), createBlock(FyPaging, {
            key: 1,
            id: "billingHistory",
            items: billingHistory.value.paging,
            class: "billing-history-paging"
          }, null, 8, ["items"])) : createCommentVNode("v-if", true)
        ], 64)) : (openBlock(), createElementBlock("div", _hoisted_5$6, [
          createVNode(FyLoader, {
            id: "self-loader-fyvue",
            force: true,
            size: "6",
            showLoadingText: false
          })
        ])),
        billingHistory.value && billingHistory.value.data?.length == 0 ? (openBlock(), createElementBlock("div", _hoisted_6$6, toDisplayString(_ctx.$t("billing_history_empty")), 1)) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var KlbBillingHistory = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "KlbBillingHistory.vue"]]);

const _hoisted_1$7 = { class: "location-select" };
const _hoisted_2$7 = { class: "input-group" };
const _hoisted_3$7 = {
  key: 0,
  class: "label-basic",
  for: "selectLocation"
};
const _hoisted_4$7 = { class: "input-box" };
const _hoisted_5$5 = { key: 0 };
const _hoisted_6$5 = ["onSubmit"];
const _hoisted_7$5 = { class: "form-grid" };
const _hoisted_8$4 = { class: "input-group" };
const _hoisted_9$4 = { class: "mr-4 w-16" };
const _hoisted_10$4 = {
  class: "label-basic",
  for: "countryChoice"
};
const _hoisted_11$4 = { class: "input-box" };
const _hoisted_12$4 = ["value"];
const _hoisted_13$3 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_14$3 = { class: "btn-box" };
const _hoisted_15$2 = {
  class: "btn-defaults btn primary",
  type: "submit"
};
const _hoisted_16$2 = {
  key: 1,
  class: "self-loader-fyvue"
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "KlbUserLocation",
  props: {
    displayOnly: { type: Boolean, default: false },
    locationUuid: null,
    modelValue: null,
    selectedLocation: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const store = useFVStore();
    const translate = useTranslation();
    const isAuth = computed(() => store.isAuth);
    const location = ref();
    const locationsSelectOptions = ref([]);
    const locations = ref({});
    const isLoaded = ref(false);
    const editMode = ref(false);
    const selectedLocation = ref();
    const model = computed({
      get: () => props.modelValue,
      set: (items) => {
        emit("update:modelValue", items);
      }
    });
    watch(selectedLocation, async (v) => {
      if (v == "new") {
        state.firstname = "";
        state.lastname = "";
        state.zip = "";
        state.country = "";
        editMode.value = true;
        location.value = void 0;
        model.value = void 0;
        await getUserGeolocation();
      } else {
        if (v && locations.value[v]) {
          location.value = locations.value[v];
          state.firstname = location.value.First_Name;
          state.lastname = location.value.Last_Name;
          state.zip = location.value.Zip ? location.value.Zip : "";
          state.country = location.value.Country__;
          model.value = location.value.User_Location__;
        }
      }
    });
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
    const getUserGeolocation = async () => {
      const _userLoc = await rest(
        "/ThirdParty/Geoip:lookup",
        "GET"
      ).catch(() => {
      });
      if (_userLoc && _userLoc.result == "success") {
        state.country = _userLoc.data.country.unixms_code;
      }
    };
    const deleteLocation = async () => {
      await rest(
        `User/Location/${location.value?.User_Location__}`,
        "DELETE",
        {}
      ).catch(() => {
      });
      await getUserLocation();
    };
    const submitLocation = async () => {
      if (location.value) {
        await rest(
          `User/Location/${location.value?.User_Location__}`,
          "PATCH",
          {
            First_Name: state.firstname,
            Last_Name: state.lastname,
            Zip: state.zip,
            Country__: state.country
          }
        ).catch(() => {
        });
        editMode.value = false;
        await getUserLocation();
      } else {
        await rest(
          `User/Location`,
          "POST",
          {
            First_Name: state.firstname,
            Last_Name: state.lastname,
            Zip: state.zip,
            Country__: state.country
          }
        ).catch(() => {
        });
        editMode.value = false;
        await getUserLocation();
      }
    };
    const getUserLocation = async () => {
      state.country = "";
      state.firstname = "";
      state.lastname = "";
      state.zip = "";
      if (isAuth.value) {
        const _locations = await rest(`User/Location`, "GET", {
          sort: "Created"
        }).catch(() => {
        });
        if (_locations && _locations.result == "success") {
          if (_locations.data.length > 0) {
            location.value = _locations.data[0];
            if (props.selectedLocation) {
              selectedLocation.value = props.selectedLocation;
            } else {
              selectedLocation.value = _locations.data[0].User_Location__;
            }
            locationsSelectOptions.value = [];
            locations.value = {};
            _locations.data.forEach((loc) => {
              locations.value[loc.User_Location__] = loc;
              locationsSelectOptions.value.push([
                loc.User_Location__,
                loc.Display.join(", ")
              ]);
            });
            if (!props.displayOnly)
              locationsSelectOptions.value.push([
                "new",
                translate("klb_location_new_cta")
              ]);
            editMode.value = false;
          } else {
            locations.value = {};
            locationsSelectOptions.value = [];
            if (!props.displayOnly) {
              locationsSelectOptions.value.push(["new", "New"]);
              selectedLocation.value = "new";
            }
            editMode.value = true;
            if (!state.country) {
              await getUserGeolocation();
            }
          }
        }
      }
      isLoaded.value = true;
    };
    onMounted(async () => {
      if (isAuth.value) {
        await getUserLocation();
      }
    });
    return (_ctx, _cache) => {
      const _component_FyInput = resolveComponent("FyInput");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(isAuth) && isLoaded.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(__props.displayOnly ? "" : "card-container card-defaults klb-user-location")
        }, [
          createElementVNode("div", _hoisted_1$7, [
            createElementVNode("div", _hoisted_2$7, [
              __props.displayOnly ? (openBlock(), createElementBlock("label", _hoisted_3$7, toDisplayString(_ctx.$t("klb_user_location_label")), 1)) : createCommentVNode("v-if", true),
              createElementVNode("div", _hoisted_4$7, [
                createVNode(_component_FyInput, {
                  id: "selectLocation",
                  options: locationsSelectOptions.value,
                  type: "select",
                  modelValue: selectedLocation.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedLocation.value = $event)
                }, null, 8, ["options", "modelValue"])
              ])
            ]),
            !__props.displayOnly ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              editMode.value == false ? (openBlock(), createElementBlock("button", {
                key: 0,
                class: "btn primary btn-defaults",
                onClick: _cache[1] || (_cache[1] = ($event) => editMode.value = true)
              }, toDisplayString(_ctx.$t("klb_edit_location")), 1)) : createCommentVNode("v-if", true),
              editMode.value == true && location.value && selectedLocation.value != "new" ? (openBlock(), createElementBlock("button", {
                key: 1,
                class: "btn danger btn-defaults",
                onClick: _cache[2] || (_cache[2] = ($event) => deleteLocation())
              }, toDisplayString(_ctx.$t("klb_delete_location")), 1)) : createCommentVNode("v-if", true),
              editMode.value == true ? (openBlock(), createElementBlock("button", {
                key: 2,
                class: "btn-defaults btn neutral",
                type: "reset",
                onClick: _cache[3] || (_cache[3] = ($event) => editMode.value = false)
              }, toDisplayString(_ctx.$t("klb_locations_reset_cta")), 1)) : createCommentVNode("v-if", true),
              editMode.value == false ? (openBlock(), createElementBlock("button", {
                key: 3,
                class: "btn-defaults btn primary",
                type: "reset",
                onClick: _cache[4] || (_cache[4] = ($event) => selectedLocation.value = "new")
              }, toDisplayString(_ctx.$t("klb_location_new_cta")), 1)) : createCommentVNode("v-if", true)
            ], 64)) : createCommentVNode("v-if", true)
          ]),
          editMode.value ? (openBlock(), createElementBlock("div", _hoisted_5$5, [
            createElementVNode("div", null, [
              createElementVNode("form", {
                onSubmit: withModifiers(submitLocation, ["prevent"])
              }, [
                createElementVNode("div", _hoisted_7$5, [
                  createVNode(_component_FyInput, {
                    id: "billingFirstname",
                    req: true,
                    showLabel: true,
                    type: "text",
                    placeholder: _ctx.$t("klb_location_firstname_placeholder"),
                    errorVuelidate: unref(v$).firstname.$errors,
                    modelValue: state.firstname,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => state.firstname = $event),
                    label: _ctx.$t("klb_location_firstname_label")
                  }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                  createVNode(_component_FyInput, {
                    id: "billingLastname",
                    req: true,
                    type: "text",
                    showLabel: true,
                    placeholder: _ctx.$t("klb_location_lastname_placeholder"),
                    errorVuelidate: unref(v$).lastname.$errors,
                    modelValue: state.lastname,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => state.lastname = $event),
                    label: _ctx.$t("klb_location_lastname_label")
                  }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                  createVNode(_component_FyInput, {
                    id: "billingZip",
                    req: true,
                    type: "text",
                    showLabel: true,
                    placeholder: _ctx.$t("klb_location_zip_placeholder"),
                    errorVuelidate: unref(v$).zip.$errors,
                    modelValue: state.zip,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => state.zip = $event),
                    label: _ctx.$t("klb_location_zip_label")
                  }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                  createElementVNode("div", _hoisted_8$4, [
                    createElementVNode("div", _hoisted_9$4, [
                      createElementVNode("label", _hoisted_10$4, toDisplayString(_ctx.$t("klb_location_country_label")), 1)
                    ]),
                    createElementVNode("div", _hoisted_11$4, [
                      withDirectives(createElementVNode("select", {
                        class: "input-basic",
                        id: "countryChoice",
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => state.country = $event)
                      }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.$countries.countries, (country) => {
                          return openBlock(), createElementBlock("option", {
                            value: country.Country__,
                            key: country.Country__
                          }, toDisplayString(country.Name), 9, _hoisted_12$4);
                        }), 128))
                      ], 512), [
                        [vModelSelect, state.country]
                      ])
                    ])
                  ])
                ]),
                _hoisted_13$3,
                createElementVNode("div", _hoisted_14$3, [
                  createElementVNode("button", _hoisted_15$2, toDisplayString(_ctx.$t("klb_locations_save_cta")), 1)
                ])
              ], 40, _hoisted_6$5)
            ])
          ])) : createCommentVNode("v-if", true)
        ], 2)) : createCommentVNode("v-if", true),
        !isLoaded.value && unref(isAuth) ? (openBlock(), createElementBlock("div", _hoisted_16$2, [
          createVNode(FyLoader, {
            id: "self-loader-fyvue",
            force: true,
            size: "6",
            showLoadingText: false
          })
        ])) : createCommentVNode("v-if", true)
      ], 64);
    };
  }
});
var KlbUserLocation = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "KlbUserLocation.vue"]]);

function useBilling() {
    return {
        setupPaymentIntent: (method = 'Stripe') => {
            return new Promise((resolve) => {
                rest('Realm/PaymentMethod:setup', 'POST', {
                    method: method,
                })
                    .then((_result) => {
                    if (_result && _result.result == 'success') {
                        resolve(_result);
                    }
                    else {
                        resolve(null);
                    }
                })
                    .catch(() => {
                    resolve(null);
                });
            });
        },
        getUserBillingAndLoc: () => {
            return new Promise((resolve) => {
                rest('User/Billing', 'GET')
                    .then((_userBilling) => {
                    if (_userBilling &&
                        _userBilling.data &&
                        _userBilling.data.length != 0) {
                        rest(`User/Location/${_userBilling.data[0].User_Location__}`, 'GET')
                            .then((_userLocation) => {
                            if (_userLocation && _userLocation.result == 'success') {
                                resolve({
                                    location: _userLocation.data,
                                    billing: _userBilling.data[0],
                                });
                            }
                            else {
                                resolve(null);
                            }
                        })
                            .catch(() => {
                            resolve(null);
                        });
                    }
                    else {
                        resolve(null);
                    }
                })
                    .catch(() => {
                    resolve(null);
                });
            });
        },
    };
}

const _hoisted_1$6 = { key: 0 };
const _hoisted_2$6 = ["onSubmit"];
const _hoisted_3$6 = { class: "form-grid" };
const _hoisted_4$6 = { class: "input-group" };
const _hoisted_5$4 = {
  class: "label-basic",
  for: "typeDef"
};
const _hoisted_6$4 = { class: "input-box" };
const _hoisted_7$4 = ["value"];
const _hoisted_8$3 = { class: "input-group" };
const _hoisted_9$3 = {
  class: "label-basic",
  for: "typeDef"
};
const _hoisted_10$3 = {
  key: 0,
  class: "response-error"
};
const _hoisted_11$3 = { class: "btn-center" };
const _hoisted_12$3 = {
  class: "btn primary btn-defaults",
  type: "submit"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "KlbAddPaymentMethodModal",
  props: {
    onComplete: { type: Function, default: () => {
    } }
  },
  setup(__props) {
    const props = __props;
    const state = useStorage("state-store-klb-addpm", {
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
    const store = useFVStore();
    const paymentSetupIntent = ref();
    const isAuth = computed(() => store.isAuth);
    const eventBus = useEventBus();
    const history = useHistory();
    const stripePayment = ref();
    const errorMessage = ref();
    let stripe;
    let stripeElements;
    const submitBillingCreate = async () => {
      if (await v$.value.$validate()) {
        errorMessage.value = void 0;
        if (stripe && stripeElements) {
          eventBus.emit("modal-add-pm-loading", true);
          const _stripeResult = await stripe.confirmSetup({
            elements: stripeElements,
            confirmParams: {
              return_url: `${getUrl().scheme}://${getUrl().host}${history.currentRoute.path}?newMode=1`,
              payment_method_data: {
                billing_details: {
                  name: `${state.value.firstname} ${state.value.lastname}`,
                  email: store.user?.Email,
                  address: {
                    country: state.value.country,
                    postal_code: state.value.zip,
                    state: "",
                    city: "",
                    line1: "",
                    line2: ""
                  }
                }
              }
            }
          });
          if (_stripeResult.error) {
            errorMessage.value = _stripeResult.error.message;
          }
          eventBus.emit("modal-add-pm-loading", false);
        }
      }
    };
    const showAddPaymentMethodModal = async () => {
      eventBus.emit("AddPaymentMethodModal", true);
      const _setupIntent = await useBilling().setupPaymentIntent();
      if (_setupIntent) {
        paymentSetupIntent.value = _setupIntent;
        if (paymentSetupIntent.value.data.Setup.key) {
          stripe = window.Stripe(paymentSetupIntent.value.data.Setup.key, {
            locale: getLocale$1(),
            stripeAccount: paymentSetupIntent.value.data.Setup.options.stripe_account ? paymentSetupIntent.value.data.Setup.options.stripe_account : void 0
          });
        }
      }
      if (stripe) {
        stripeElements = stripe.elements({
          clientSecret: paymentSetupIntent.value?.data.Setup.client_secret
        });
        await stripePayment.value;
        stripeElements.create("payment", {
          fields: {
            billingDetails: {
              address: "never",
              name: "never",
              email: "never"
            }
          }
        }).mount(stripePayment.value);
      }
    };
    onMounted(async () => {
      if (history.currentRoute.query.setup_intent && history.currentRoute.query.setup_intent_client_secret && state.value && history.currentRoute.query.newMode == "1") {
        eventBus.emit("modal-add-pm-loading", true);
        const _result = await rest("User/Billing:create", "POST", {
          Label: state.value.label,
          First_Name: state.value.firstname,
          Last_Name: state.value.lastname,
          Zip: state.value.zip,
          Country__: state.value.country,
          method: "Stripe",
          stripe_intent: history.currentRoute.query.setup_intent
        }).catch((err) => {
          errorMessage.value = err.message;
          eventBus.emit("modal-add-pm-loading", false);
          history.push(getPath());
        });
        if (_result && _result.result == "success") {
          eventBus.emit("AddPaymentMethodModal", false);
          props.onComplete(_result);
          state.value = null;
          history.push(getPath());
        } else {
          errorMessage.value = _result?.message;
        }
        eventBus.emit("modal-add-pm-loading", false);
      }
      eventBus.on("ShowAddPaymentMethodModal", showAddPaymentMethodModal);
    });
    onUnmounted(() => {
      eventBus.off("ShowAddPaymentMethodModal", showAddPaymentMethodModal);
    });
    useHead({
      script: [
        {
          src: "https://js.stripe.com/v3",
          key: "stripe-script"
        }
      ]
    });
    return (_ctx, _cache) => {
      const _component_FyLoader = resolveComponent("FyLoader");
      const _component_FyInput = resolveComponent("FyInput");
      return unref(isAuth) ? (openBlock(), createElementBlock("div", _hoisted_1$6, [
        createVNode(FyModal, {
          id: "AddPaymentMethod",
          title: _ctx.$t("add_pm_modal_title"),
          class: "klb-add-method"
        }, {
          default: withCtx(() => [
            createVNode(_component_FyLoader, {
              id: "modal-add-pm",
              size: "6",
              showLoadingText: false
            }),
            createElementVNode("form", {
              onSubmit: withModifiers(submitBillingCreate, ["prevent"])
            }, [
              createVNode(_component_FyInput, {
                id: "billingLabel",
                req: true,
                showLabel: true,
                placeholder: _ctx.$t("add_pm_label_placeholder"),
                errorVuelidate: unref(v$).label.$errors,
                modelValue: unref(state).label,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(state).label = $event),
                label: _ctx.$t("add_pm_label_label"),
                type: "text"
              }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
              createElementVNode("div", _hoisted_3$6, [
                createVNode(_component_FyInput, {
                  id: "billingFirstname",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("add_pm_firstname_placeholder"),
                  errorVuelidate: unref(v$).firstname.$errors,
                  modelValue: unref(state).firstname,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(state).firstname = $event),
                  label: _ctx.$t("add_pm_firstname_label"),
                  type: "text"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                createVNode(_component_FyInput, {
                  id: "billingLastname",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("add_pm_lastname_placeholder"),
                  errorVuelidate: unref(v$).lastname.$errors,
                  modelValue: unref(state).lastname,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(state).lastname = $event),
                  label: _ctx.$t("add_pm_lastname_label"),
                  type: "text"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                createVNode(_component_FyInput, {
                  id: "billingZip",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("add_pm_zip_placeholder"),
                  errorVuelidate: unref(v$).zip.$errors,
                  modelValue: unref(state).zip,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(state).zip = $event),
                  label: _ctx.$t("add_pm_zip_label"),
                  type: "text"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                createElementVNode("div", _hoisted_4$6, [
                  createElementVNode("label", _hoisted_5$4, toDisplayString(_ctx.$t("add_pm_country_label")), 1),
                  createElementVNode("div", _hoisted_6$4, [
                    withDirectives(createElementVNode("select", {
                      class: "input-basic",
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(state).country = $event)
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.$countries.countries, (country) => {
                        return openBlock(), createElementBlock("option", {
                          value: country.Country__,
                          key: country.Country__
                        }, toDisplayString(country.Name), 9, _hoisted_7$4);
                      }), 128))
                    ], 512), [
                      [vModelSelect, unref(state).country]
                    ])
                  ])
                ])
              ]),
              createElementVNode("div", _hoisted_8$3, [
                createElementVNode("label", _hoisted_9$3, toDisplayString(_ctx.$t("payment_method_label")), 1),
                createElementVNode("div", {
                  id: "stripePayment",
                  class: "stripePayment",
                  ref_key: "stripePayment",
                  ref: stripePayment
                }, null, 512)
              ]),
              errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_10$3, toDisplayString(errorMessage.value), 1)) : createCommentVNode("v-if", true),
              createElementVNode("div", _hoisted_11$3, [
                createElementVNode("button", _hoisted_12$3, toDisplayString(_ctx.$t("create_billing_profile")), 1)
              ])
            ], 40, _hoisted_2$6)
          ]),
          _: 1
        }, 8, ["title"])
      ])) : createCommentVNode("v-if", true);
    };
  }
});
var KlbAddPaymentMethodModal = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "KlbAddPaymentMethodModal.vue"]]);

const _hoisted_1$5 = {
  key: 0,
  class: "card-container card-defaults klb-user-billing"
};
const _hoisted_2$5 = ["onSubmit"];
const _hoisted_3$5 = { class: "input-group" };
const _hoisted_4$5 = {
  class: "label-basic",
  for: "typeDef"
};
const _hoisted_5$3 = {
  key: 0,
  class: "response-error"
};
const _hoisted_6$3 = { class: "btn-center" };
const _hoisted_7$3 = {
  class: "btn primary btn-defaults",
  type: "submit"
};
const _hoisted_8$2 = { class: "billing-select" };
const _hoisted_9$2 = { key: 0 };
const _hoisted_10$2 = ["onSubmit"];
const _hoisted_11$2 = { class: "input-group" };
const _hoisted_12$2 = {
  class: "label-basic",
  for: "theCard"
};
const _hoisted_13$2 = {
  key: 0,
  class: "card-container billing-method-summary"
};
const _hoisted_14$2 = {
  key: 0,
  class: "response-error"
};
const _hoisted_15$1 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_16$1 = { class: "btn-box" };
const _hoisted_17$1 = {
  class: "btn-defaults btn primary",
  type: "submit"
};
const _hoisted_18$1 = {
  key: 1,
  class: "self-loader-fyvue"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "KlbUserBilling",
  props: {
    displayOnly: { type: Boolean, default: false },
    locationUuid: null,
    modelValue: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const store = useFVStore();
    const history = useHistory();
    const isAuth = computed(() => store.isAuth);
    const billingProfile = ref();
    const billingProfileSelectOptions = ref([]);
    const billingProfiles = ref({});
    const isLoaded = ref(false);
    const editMode = ref(false);
    const selectedBillingProfile = ref();
    const stripeCard = ref();
    const theCard = ref();
    const errorMessage = ref();
    const billingEmpty = ref();
    let stripe;
    let stripeElements;
    const paymentSetupIntent = ref();
    const stripePayment = ref();
    const model = computed({
      get: () => props.modelValue,
      set: (items) => {
        emit("update:modelValue", items);
      }
    });
    watch(selectedBillingProfile, (v) => {
      if (v == "new") {
        state.billingProfile.label = "";
        state.billingProfile.location = "";
        editMode.value = true;
        billingProfile.value = void 0;
        model.value = void 0;
      } else {
        if (v && billingProfiles.value[v]) {
          billingProfile.value = billingProfiles.value[v];
          state.billingProfile.label = billingProfile.value.Label;
          state.billingProfile.location = billingProfile.value.User_Location__;
          model.value = billingProfile.value.User_Billing__;
        }
      }
    });
    const state = reactive({
      billingProfile: {
        label: "",
        location: ""
      }
    });
    const rules = {
      billingProfile: {
        label: { required },
        location: { required }
      }
    };
    const v$ = useVuelidate(rules, state);
    const submitBillingEdit = async () => {
      eventBus.emit("modal-edit-pm-loading", true);
      errorMessage.value = void 0;
      const _userLocation = await rest(
        `User/Location/${billingProfile.value?.User_Location__}`,
        "GET"
      ).catch(() => {
      });
      if (_userLocation && _userLocation.result == "success" && _userLocation.data) {
        const _stripeResult = await stripe.confirmSetup({
          elements: stripeElements,
          confirmParams: {
            return_url: `${getUrl().scheme}://${getUrl().host}${history.currentRoute.path}?editMode=1&editUuid=${billingProfile.value?.Methods[0].User_Billing_Method__}&billingProfile=${billingProfile.value?.User_Billing__}`,
            payment_method_data: {
              billing_details: {
                name: `${_userLocation.data.First_Name} ${_userLocation.data.Last_Name}`,
                email: store.user?.Email,
                address: {
                  country: _userLocation.data.Country__,
                  postal_code: _userLocation.data.Country__,
                  state: "",
                  city: "",
                  line1: "",
                  line2: ""
                }
              }
            }
          }
        });
        if (_stripeResult.error) {
          errorMessage.value = _stripeResult.error.message;
          eventBus.emit("modal-edit-pm-loading", false);
        }
        eventBus.emit("EditPaymentMethodModal", false);
        eventBus.emit("modal-edit-pm-loading", false);
      }
    };
    const submitUserBilling = async () => {
      errorMessage.value = void 0;
      if (await v$.value.billingProfile.$validate() && billingProfile.value) {
        await rest(`User/Billing/${billingProfile.value.User_Billing__}`, "PATCH", {
          User_Location__: state.billingProfile.location,
          Label: state.billingProfile.label
        }).catch(() => {
        });
        await getUserBilling();
        isLoaded.value = true;
        editMode.value = false;
      }
    };
    const getUserBilling = async () => {
      isLoaded.value = false;
      if (isAuth.value) {
        const _billingProfiles = await rest(
          `User/Billing`,
          "GET",
          {
            sort: "Created"
          }
        ).catch(() => {
        });
        if (_billingProfiles && _billingProfiles.result == "success") {
          if (_billingProfiles.data.length > 0) {
            billingProfile.value = _billingProfiles.data[0];
            selectedBillingProfile.value = _billingProfiles.data[0].User_Billing__;
            billingProfileSelectOptions.value = [];
            billingProfiles.value = {};
            _billingProfiles.data.forEach((_profile) => {
              billingProfiles.value[_profile.User_Billing__] = _profile;
              billingProfileSelectOptions.value.push([
                _profile.User_Billing__,
                _profile.Label
              ]);
            });
            editMode.value = false;
            billingEmpty.value = false;
          } else {
            billingProfileSelectOptions.value = [];
            billingProfiles.value = {};
            editMode.value = false;
            billingEmpty.value = true;
          }
        }
      }
      isLoaded.value = true;
    };
    const switchToEdit = async () => {
      editMode.value = true;
      if (stripe) {
        stripeCard.value = stripe.elements().create("card", { hidePostalCode: true });
        await theCard;
        stripeCard.value.mount(theCard.value);
      }
    };
    const openEditModal = async () => {
      eventBus.emit("EditPaymentMethodModal", true);
      const _setupIntent = await useBilling().setupPaymentIntent();
      if (_setupIntent) {
        paymentSetupIntent.value = _setupIntent;
        if (paymentSetupIntent.value.data.Setup.key) {
          stripe = window.Stripe(paymentSetupIntent.value.data.Setup.key, {
            locale: getLocale$1(),
            stripeAccount: paymentSetupIntent.value.data.Setup.options.stripe_account ? paymentSetupIntent.value.data.Setup.options.stripe_account : void 0
          });
        }
      }
      if (stripe) {
        stripeElements = stripe.elements({
          clientSecret: paymentSetupIntent.value?.data.Setup.client_secret
        });
        await stripePayment.value;
        stripeElements.create("payment", {
          fields: {
            billingDetails: {
              address: "never",
              name: "never",
              email: "never"
            }
          }
        }).mount(stripePayment.value);
      }
    };
    onMounted(async () => {
      if (isAuth.value) {
        await getUserBilling();
        if (history.currentRoute.query.setup_intent && history.currentRoute.query.setup_intent_client_secret && history.currentRoute.query.editMode == "1" && history.currentRoute.query.editUuid && history.currentRoute.query.billingProfile) {
          await rest(
            `User/Billing/Method/${history.currentRoute.query.editUuid}:change`,
            "POST",
            {
              method: "Stripe",
              stripe_intent: history.currentRoute.query.setup_intent
            }
          ).catch(() => {
          });
          await getUserBilling();
          history.push(
            `${getPath()}?billingProfile=${history.currentRoute.query.billingProfile}`
          );
        }
        if (history.currentRoute.query.billingProfile) {
          selectedBillingProfile.value = history.currentRoute.query.billingProfile;
          editMode.value = true;
        }
      }
    });
    useHead({
      script: [
        {
          src: "https://js.stripe.com/v3",
          key: "stripe-script"
        }
      ]
    });
    return (_ctx, _cache) => {
      const _component_FyInput = resolveComponent("FyInput");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(isAuth) && isLoaded.value ? (openBlock(), createElementBlock("div", _hoisted_1$5, [
          createVNode(FyModal, {
            id: "EditPaymentMethod",
            title: _ctx.$t("edit_pm_modal_title"),
            class: "klb-edit-method"
          }, {
            default: withCtx(() => [
              createVNode(FyLoader, {
                id: "modal-edit-pm",
                size: "6",
                showLoadingText: false
              }),
              createElementVNode("form", {
                onSubmit: withModifiers(submitBillingEdit, ["prevent"])
              }, [
                createElementVNode("div", _hoisted_3$5, [
                  createElementVNode("label", _hoisted_4$5, toDisplayString(_ctx.$t("payment_method_label")), 1),
                  createElementVNode("div", {
                    id: "stripePayment",
                    class: "stripePayment",
                    ref_key: "stripePayment",
                    ref: stripePayment
                  }, null, 512)
                ]),
                errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_5$3, toDisplayString(errorMessage.value), 1)) : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_6$3, [
                  createElementVNode("button", _hoisted_7$3, toDisplayString(_ctx.$t("edit_billing_method")), 1)
                ])
              ], 40, _hoisted_2$5)
            ]),
            _: 1
          }, 8, ["title"]),
          createVNode(KlbAddPaymentMethodModal, {
            onComplete: () => {
              getUserBilling();
            }
          }, null, 8, ["onComplete"]),
          createElementVNode("div", _hoisted_8$2, [
            !billingEmpty.value ? (openBlock(), createBlock(_component_FyInput, {
              key: 0,
              id: "selectBillingProfile",
              options: billingProfileSelectOptions.value,
              type: "select",
              modelValue: selectedBillingProfile.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedBillingProfile.value = $event)
            }, null, 8, ["options", "modelValue"])) : createCommentVNode("v-if", true),
            editMode.value == false && !billingEmpty.value ? (openBlock(), createElementBlock("button", {
              key: 1,
              class: "btn primary btn-defaults",
              onClick: _cache[1] || (_cache[1] = ($event) => switchToEdit())
            }, toDisplayString(_ctx.$t("klb_edit_billing_profile")), 1)) : createCommentVNode("v-if", true),
            editMode.value == true ? (openBlock(), createElementBlock("button", {
              key: 2,
              class: "btn-defaults btn neutral",
              type: "reset",
              onClick: _cache[2] || (_cache[2] = ($event) => editMode.value = false)
            }, toDisplayString(_ctx.$t("klb_billing_cancel_save_payment_method")), 1)) : createCommentVNode("v-if", true),
            editMode.value == false ? (openBlock(), createElementBlock("button", {
              key: 3,
              class: "btn-defaults btn primary",
              onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$eventBus.emit("ShowAddPaymentMethodModal", true))
            }, toDisplayString(_ctx.$t("klb_add_new_billing_profile")), 1)) : createCommentVNode("v-if", true)
          ]),
          editMode.value ? (openBlock(), createElementBlock("div", _hoisted_9$2, [
            createElementVNode("div", null, [
              createElementVNode("form", {
                onSubmit: withModifiers(submitUserBilling, ["prevent"])
              }, [
                createVNode(_component_FyInput, {
                  id: "billingLabel",
                  req: true,
                  showLabel: true,
                  placeholder: _ctx.$t("add_pm_label_placeholder"),
                  errorVuelidate: unref(v$).billingProfile.label.$errors,
                  modelValue: state.billingProfile.label,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => state.billingProfile.label = $event),
                  label: _ctx.$t("add_pm_label_label"),
                  type: "text"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                createElementVNode("div", _hoisted_11$2, [
                  createElementVNode("label", _hoisted_12$2, toDisplayString(_ctx.$t("klb_billing_payment_method_label")), 1),
                  billingProfile.value && billingProfile.value.Methods && billingProfile.value.Methods.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_13$2, [
                    createElementVNode("span", null, [
                      createElementVNode("b", null, toDisplayString(_ctx.$t("klb_billing_current_credit_card")), 1),
                      createTextVNode(" " + toDisplayString(_ctx.$t("payment_method_billing")) + ": ", 1),
                      createElementVNode("b", null, toDisplayString(billingProfile.value.Methods[0].Name), 1)
                    ]),
                    createElementVNode("span", null, [
                      createTextVNode(toDisplayString(_ctx.$t("payment_method_exp")) + ": ", 1),
                      createElementVNode("b", null, toDisplayString(billingProfile.value.Methods[0].Expiration), 1)
                    ]),
                    createElementVNode("button", {
                      class: "btn primary btn-defaults",
                      type: "button",
                      onClick: _cache[5] || (_cache[5] = ($event) => openEditModal())
                    }, toDisplayString(_ctx.$t("klb_billing_edit_pm_cta")), 1)
                  ])) : createCommentVNode("v-if", true)
                ]),
                createVNode(KlbUserLocation, {
                  displayOnly: true,
                  selectedLocation: state.billingProfile.location,
                  modelValue: state.billingProfile.location,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => state.billingProfile.location = $event)
                }, null, 8, ["selectedLocation", "modelValue"]),
                unref(v$).billingProfile.location.$errors.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_14$2, toDisplayString(_ctx.$t(
                  `vuelidate_validator_${unref(v$).billingProfile.location.$errors[0].$validator.toString()}`
                )), 1)) : createCommentVNode("v-if", true),
                _hoisted_15$1,
                createElementVNode("div", _hoisted_16$1, [
                  createElementVNode("button", _hoisted_17$1, toDisplayString(_ctx.$t("klb_billing_save_payment_method")), 1)
                ])
              ], 40, _hoisted_10$2)
            ])
          ])) : createCommentVNode("v-if", true)
        ])) : createCommentVNode("v-if", true),
        !isLoaded.value && unref(isAuth) ? (openBlock(), createElementBlock("div", _hoisted_18$1, [
          createVNode(FyLoader, {
            id: "self-loader-fyvue",
            force: true,
            size: "6",
            showLoadingText: false
          })
        ])) : createCommentVNode("v-if", true)
      ], 64);
    };
  }
});
var KlbUserBilling = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "KlbUserBilling.vue"]]);

const _hoisted_1$4 = { class: "klb-product" };
const _hoisted_2$4 = {
  key: 0,
  class: "subs"
};
const _hoisted_3$4 = { class: "price" };
const _hoisted_4$4 = { class: "price" };
const _hoisted_5$2 = {
  key: 0,
  class: "cycle"
};
const _hoisted_6$2 = ["src"];
const _hoisted_7$2 = { role: "list" };
const _hoisted_8$1 = ["onClick"];
const _hoisted_9$1 = {
  key: 1,
  class: "shop"
};
const _hoisted_10$1 = ["src"];
const _hoisted_11$1 = { class: "inside" };
const _hoisted_12$1 = { class: "price-btn" };
const _hoisted_13$1 = {
  key: 0,
  class: "cycle"
};
const _hoisted_14$1 = ["onClick"];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "KlbCatalog",
  props: {
    options: { default: () => {
      return { sort: "Basic.Priority:asc" };
    } },
    displayType: { default: "subs" },
    features: { default: () => [] },
    startOrderPath: { default: "/user/order/start" },
    productMeta: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const products = ref();
    const store = useFVStore();
    onMounted(async () => {
      const _products = await rest(
        "/Catalog/Product:search",
        "GET",
        {
          ...props.options,
          image_variation: [
            "scale_crop=320x160&format=png&alias=shop",
            "scale_crop=320x120&format=png&alias=subs"
          ]
        }
      ).catch(() => {
      });
      if (_products && _products.result == "success") {
        products.value = _products;
      }
    });
    const addProductToCart = async (productUuid) => {
      if (props.displayType == "subs") {
        await useCart().resetCart();
        const _addResult = await useCart().addProduct(
          productUuid,
          props.productMeta
        );
        if (_addResult) {
          await store.refreshCartData(_addResult);
          useHistory().push(props.startOrderPath);
        }
      } else if (props.displayType == "shop") {
        const _addResult = await useCart().addProduct(
          productUuid,
          props.productMeta
        );
        await store.refreshCartData(_addResult);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        products.value && __props.displayType == "subs" ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(products.value?.data.data, (product) => {
            return openBlock(), createElementBlock("div", {
              key: product.Catalog_Product__,
              class: "card-container card-defaults"
            }, [
              createElementVNode("div", null, [
                createElementVNode("h5", null, toDisplayString(product["Basic.Name"]), 1),
                createElementVNode("div", _hoisted_3$4, [
                  createElementVNode("span", _hoisted_4$4, toDisplayString(product.Price.display), 1),
                  product["Basic.ServiceLifetime"] ? (openBlock(), createElementBlock("span", _hoisted_5$2, "/" + toDisplayString(_ctx.$formatKlbRecurringPaymentCycle(
                    product["Basic.ServiceLifetime"]
                  )), 1)) : createCommentVNode("v-if", true)
                ]),
                product.Image && product.Image.list && product.Image.list.length > 0 && product.Image.list[0].Variation?.subs ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: product.Image.list[0].Variation?.subs,
                  class: "product-image"
                }, null, 8, _hoisted_6$2)) : createCommentVNode("v-if", true),
                createElementVNode("ul", _hoisted_7$2, [
                  renderSlot(_ctx.$slots, product.Catalog_Product__)
                ]),
                createElementVNode("button", {
                  onClick: ($event) => addProductToCart(product.Catalog_Product__),
                  class: "btn primary"
                }, toDisplayString(_ctx.$t("klb_catalog_choose_plan")), 9, _hoisted_8$1)
              ])
            ]);
          }), 128))
        ])) : createCommentVNode("v-if", true),
        products.value && __props.displayType == "shop" ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(products.value?.data.data, (product) => {
            return openBlock(), createElementBlock("div", {
              key: product.Catalog_Product__,
              class: "card-container card-defaults"
            }, [
              product.Image && product.Image.list && product.Image.list.length > 0 && product.Image.list[0].Variation?.shop ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: product.Image.list[0].Variation?.shop,
                class: "product-image"
              }, null, 8, _hoisted_10$1)) : createCommentVNode("v-if", true),
              createElementVNode("div", _hoisted_11$1, [
                createElementVNode("h5", null, toDisplayString(product["Basic.Name"]), 1),
                renderSlot(_ctx.$slots, product.Catalog_Product__),
                createElementVNode("div", _hoisted_12$1, [
                  createElementVNode("span", null, [
                    createTextVNode(toDisplayString(product.Price.display) + " ", 1),
                    product["Basic.ServiceLifetime"] ? (openBlock(), createElementBlock("span", _hoisted_13$1, "/" + toDisplayString(_ctx.$formatKlbRecurringPaymentCycle(
                      product["Basic.ServiceLifetime"]
                    )), 1)) : createCommentVNode("v-if", true)
                  ]),
                  createElementVNode("button", {
                    class: "btn primary btn-defaults",
                    onClick: ($event) => addProductToCart(product.Catalog_Product__)
                  }, toDisplayString(_ctx.$t("klb_catalog_add_to_cart")), 9, _hoisted_14$1)
                ])
              ])
            ]);
          }), 128))
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var KlbCatalog = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "KlbCatalog.vue"]]);

function useOrder() {
    return {
        process(data, orderUuid) {
            return rest(`Order/${orderUuid}:process`, 'POST', data);
        },
        getOrder(orderUuid) {
            return rest(`Order/${orderUuid}`, 'GET');
        },
        getOrders() {
            return rest('Order/', 'GET');
        },
        getLastUnfinishedOrder() {
            return new Promise((resolve) => {
                rest('Order/', 'GET', {
                    results_per_page: 1,
                    sort: 'Created',
                    Status: 'pending',
                })
                    .then((_result) => {
                    if (_result &&
                        _result.result == 'success' &&
                        _result.data.length > 0) {
                        resolve(_result.data[0]);
                    }
                    resolve(null);
                })
                    .catch(() => {
                    resolve(null);
                });
            });
        },
    };
}

const _hoisted_1$3 = { class: "klb-order-internal" };
const _hoisted_2$3 = ["onSubmit"];
const _hoisted_3$3 = {
  key: 0,
  class: "input-group"
};
const _hoisted_4$3 = {
  class: "label-basic",
  for: "stripeElementsRef"
};
const _hoisted_5$1 = {
  key: 4,
  class: "response-error"
};
const _hoisted_6$1 = { class: "klb-order-button" };
const _hoisted_7$1 = { class: "btn primary btn-defaults" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "KlbProcessOrderInternal",
  props: {
    orderUuid: null
  },
  setup(__props) {
    const props = __props;
    let stripe;
    let stripeElements;
    useHead({
      script: [
        {
          src: "https://js.stripe.com/v3",
          key: "stripe-script"
        }
      ]
    });
    const currentMethod = ref();
    const stripeElementsRef = ref();
    const history = useHistory();
    const eventBus = useEventBus();
    const store = useFVStore();
    const session = ref();
    const errorMessage = ref();
    const order = ref();
    const formData = reactive({});
    const process = ref();
    const onFileSelectOptions = ref([]);
    const selectedOnFile = ref();
    const isAuth = computed(() => store.isAuth);
    watch(formData, async (v) => {
      if (v.cc_remember) {
        if (isAuth.value && currentMethod.value) {
          if (order.value?.Flags.autorenew_record == true && v.cc_remember == "0" || (!order.value?.Flags.autorenew_record || order.value?.Flags.autorenew_record == false) && v.cc_remember == "1") {
            const _process = await useOrder().process(
              {
                cc_remember: v.cc_remember,
                session: session.value,
                method: currentMethod.value,
                stripe_intent: 1
              },
              props.orderUuid
            );
            if (_process && _process.result == "success") {
              process.value = _process.data;
              order.value = process.value.order;
              session.value = process.value.methods[currentMethod.value].session;
            }
          }
        }
      }
    });
    const processOrder = async () => {
      eventBus.emit("klb-order-loading", true);
      errorMessage.value = void 0;
      if (currentMethod.value == "Stripe" && process.value) {
        const _stripeResult = await stripe.confirmPayment({
          elements: stripeElements,
          confirmParams: {
            return_url: `${getUrl().scheme}://${getUrl().host}${history.currentRoute.path}?Order__=${props.orderUuid}&session=${session.value}`,
            payment_method_data: {
              billing_details: {
                name: `${process.value.order.Billing_User_Location.First_Name} ${process.value.order.Billing_User_Location.Last_Name}`,
                email: store.user?.Email,
                address: {
                  country: process.value.order.Billing_User_Location.Country__,
                  postal_code: process.value.order.Billing_User_Location.Zip,
                  state: "",
                  city: "",
                  line1: "",
                  line2: ""
                }
              }
            }
          }
        });
        if (_stripeResult.error) {
          errorMessage.value = _stripeResult.error.message;
        }
      } else if (currentMethod.value == "Free") {
        const data = { ...formData };
        data.session = session.value;
        data.method = currentMethod.value;
        const _process = await useOrder().process(data, props.orderUuid).catch((err) => {
          errorMessage.value = err.message;
        });
        if (!errorMessage.value)
          await getOrderProcess(_process);
        else
          await getOrderProcess();
      } else if (currentMethod.value == "OnFile") {
        const data = { ...formData };
        data.session = session.value;
        data.method = currentMethod.value;
        data.user_billing = selectedOnFile.value;
        const _process = await useOrder().process(data, props.orderUuid).catch((err) => {
          errorMessage.value = err.message;
        });
        if (!errorMessage.value)
          await getOrderProcess(_process);
        else
          await getOrderProcess();
      }
      eventBus.emit("klb-order-loading", false);
    };
    const activatePM = async (method) => {
      eventBus.emit("klb-order-loading", true);
      if (process.value) {
        if (method == "Stripe") {
          currentMethod.value = method;
          const _ccToken = process.value.methods[method].fields.cc_token;
          if (_ccToken.attributes && _ccToken.attributes.key) {
            stripe = window.Stripe(_ccToken.attributes?.key, {
              locale: getLocale$1(),
              stripeAccount: _ccToken.attributes.options?.stripe_account
            });
          }
          session.value = process.value.methods[method].session;
          if (stripe) {
            await stripeElementsRef.value;
            if (process.value.methods[method].fields.stripe_intent?.attributes?.client_secret) {
              stripeElements = stripe.elements({
                clientSecret: process.value.methods[method].fields.stripe_intent?.attributes?.client_secret
              });
              if (stripeElementsRef.value) {
                stripeElements.create("payment", {
                  fields: {
                    billingDetails: {
                      address: "never",
                      name: "never",
                      email: "never"
                    }
                  }
                }).mount(stripeElementsRef.value);
              }
            }
          }
        } else if (method == "OnFile") {
          currentMethod.value = method;
          session.value = process.value.methods[method].session;
          onFileSelectOptions.value = [];
          const _userBilling = process.value.methods[method].fields.user_billing.values;
          if (_userBilling) {
            let i = 0;
            for (const userBilling of _userBilling) {
              if (i == 0)
                selectedOnFile.value = userBilling.User_Billing__;
              const displayUserBilling = `${userBilling.Label}`;
              onFileSelectOptions.value.push([
                userBilling.User_Billing__,
                displayUserBilling
              ]);
              i++;
            }
          }
        } else if (method == "Free") {
          currentMethod.value = method;
          session.value = process.value.methods[method].session;
        }
      }
      eventBus.emit("klb-order-loading", false);
    };
    const getOrderProcess = async (__process = void 0) => {
      eventBus.emit("klb-order-loading", true);
      let processParams = null;
      if (useHistory().currentRoute.query.payment_intent) {
        processParams = { stripe_intent: 1 };
      }
      const _process = __process ? __process : await useOrder().process(processParams, props.orderUuid).catch(() => {
      });
      if (_process && _process.result == "success") {
        process.value = _process.data;
        order.value = process.value.order;
        for (const method of process.value.methods_order) {
          if (["Free", "Stripe", "OnFile"].includes(method)) {
            currentMethod.value = method;
            break;
          }
        }
        if (currentMethod.value) {
          await activatePM(currentMethod.value);
        }
      }
      eventBus.emit("klb-order-loading", false);
    };
    onMounted(async () => {
      if (history.currentRoute.query.payment_intent && history.currentRoute.query.payment_intent_client_secret && history.currentRoute.query.session) {
        const _process = await useOrder().process(
          {
            session: history.currentRoute.query.session,
            stripe_intent: 1,
            method: "Stripe"
          },
          props.orderUuid
        ).catch((err) => {
          errorMessage.value = err.message;
        });
        if (!errorMessage.value)
          await getOrderProcess(_process);
        else
          await getOrderProcess();
        await store.refreshCart();
        history.push(`${getPath()}?Order__=${props.orderUuid}`);
      } else {
        await getOrderProcess();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createVNode(FyLoader, { id: "klb-order" }),
        process.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createElementVNode("form", {
            onSubmit: withModifiers(processOrder, ["prevent"])
          }, [
            process.value.order_payable ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              currentMethod.value == "Stripe" ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
                createElementVNode("label", _hoisted_4$3, toDisplayString(_ctx.$t("klb_order_payment_card_label")), 1),
                createElementVNode("div", {
                  id: "stripeElementsRef",
                  class: "stripeElements",
                  ref_key: "stripeElementsRef",
                  ref: stripeElementsRef
                }, null, 512)
              ])) : createCommentVNode("v-if", true),
              currentMethod.value == "Free" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [], 64)) : createCommentVNode("v-if", true),
              currentMethod.value == "OnFile" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                createVNode(FyInput, {
                  id: "selectLocation",
                  options: onFileSelectOptions.value,
                  type: "select",
                  modelValue: selectedOnFile.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedOnFile.value = $event)
                }, null, 8, ["options", "modelValue"]),
                process.value.methods_order.includes("Stripe") ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: _cache[1] || (_cache[1] = ($event) => activatePM("Stripe")),
                  type: "button",
                  class: "klb-switch-method"
                }, toDisplayString(_ctx.$t("klb_order_option_stripe")), 1)) : createCommentVNode("v-if", true)
              ], 64)) : createCommentVNode("v-if", true),
              currentMethod.value ? (openBlock(true), createElementBlock(Fragment, { key: 3 }, renderList(process.value.methods[currentMethod.value].fields, (field, key) => {
                return openBlock(), createElementBlock("div", {
                  key: `field_method_${key}`
                }, [
                  (field.type == "input" || field.type == "password" || field.type == "email" || field.type == "checkbox") && field.caption ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    field.type == "checkbox" ? (openBlock(), createBlock(FyInput, {
                      key: 0,
                      placeholder: _ctx.$t(field.caption),
                      type: field.type,
                      label: _ctx.$t(field.caption),
                      checkboxValue: formData[key],
                      "onUpdate:checkboxValue": ($event) => formData[key] = $event,
                      id: `form_${key}`,
                      checkboxTrueValue: "1",
                      checkboxFalseValue: "0"
                    }, null, 8, ["placeholder", "type", "label", "checkboxValue", "onUpdate:checkboxValue", "id"])) : (openBlock(), createBlock(FyInput, {
                      key: 1,
                      placeholder: _ctx.$t(field.caption),
                      type: field.type,
                      label: _ctx.$t(field.caption),
                      modelValue: formData[key],
                      "onUpdate:modelValue": ($event) => formData[key] = $event,
                      id: `form_${key}`
                    }, null, 8, ["placeholder", "type", "label", "modelValue", "onUpdate:modelValue", "id"]))
                  ], 64)) : createCommentVNode("v-if", true)
                ]);
              }), 128)) : createCommentVNode("v-if", true),
              errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_5$1, toDisplayString(errorMessage.value), 1)) : createCommentVNode("v-if", true),
              createElementVNode("div", _hoisted_6$1, [
                createElementVNode("button", _hoisted_7$1, toDisplayString(_ctx.$t("klb_order_process_cta")), 1)
              ])
            ], 64)) : createCommentVNode("v-if", true)
          ], 40, _hoisted_2$3),
          process.value.order_payable == false ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            process.value.order.Paid ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(_ctx.$t("klb_order_paid_text", {
                date: _ctx.$formatDatetime(process.value.order.Paid.unixms)
              })), 1)
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(_ctx.$t("klb_order_non_payable")), 1)
            ], 64))
          ], 64)) : createCommentVNode("v-if", true)
        ], 64)) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var KlbProcessOrderInternal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "KlbProcessOrderInternal.vue"]]);

const _hoisted_1$2 = {
  key: 0,
  class: "klb-order"
};
const _hoisted_2$2 = {
  key: 0,
  class: "card-container card-defaults"
};
const _hoisted_3$2 = {
  key: 0,
  class: "fv-typo mb-2"
};
const _hoisted_4$2 = { class: "cart-summary" };
const _hoisted_5 = { class: "price" };
const _hoisted_6 = {
  key: 0,
  class: "cycle"
};
const _hoisted_7 = ["onClick"];
const _hoisted_8 = {
  key: 0,
  class: "cart-summary is-desc"
};
const _hoisted_9 = {
  key: 1,
  class: "cart-summary is-tax"
};
const _hoisted_10 = { class: "price" };
const _hoisted_11 = { class: "cart-total" };
const _hoisted_12 = {
  key: 0,
  class: "cart-summary"
};
const _hoisted_13 = { class: "price" };
const _hoisted_14 = { class: "cart-summary vat" };
const _hoisted_15 = { class: "price" };
const _hoisted_16 = { class: "cart-summary vat" };
const _hoisted_17 = { class: "price" };
const _hoisted_18 = { class: "cart-summary total" };
const _hoisted_19 = { class: "price" };
const _hoisted_20 = {
  key: 1,
  class: "card-container card-defaults"
};
const _hoisted_21 = { class: "cart-summary" };
const _hoisted_22 = { class: "price" };
const _hoisted_23 = {
  key: 0,
  class: "cycle"
};
const _hoisted_24 = {
  key: 0,
  class: "cart-summary is-desc"
};
const _hoisted_25 = {
  key: 1,
  class: "cart-summary is-desc"
};
const _hoisted_26 = { class: "fv-tag" };
const _hoisted_27 = {
  key: 2,
  class: "cart-summary is-tax"
};
const _hoisted_28 = { class: "price" };
const _hoisted_29 = { class: "cart-total" };
const _hoisted_30 = {
  key: 0,
  class: "cart-summary"
};
const _hoisted_31 = { class: "price" };
const _hoisted_32 = { class: "cart-summary vat" };
const _hoisted_33 = { class: "price" };
const _hoisted_34 = { class: "cart-summary vat" };
const _hoisted_35 = { class: "price" };
const _hoisted_36 = { class: "cart-summary total" };
const _hoisted_37 = { class: "price" };
const _hoisted_38 = { class: "mt-4" };
const _hoisted_39 = {
  key: 1,
  class: "card-container card-defaults fv-typo"
};
const _hoisted_40 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_41 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_42 = { key: 1 };
const _hoisted_43 = {
  key: 2,
  class: "response-error"
};
const _hoisted_44 = { class: "mt-4 flex items-center justify-center" };
const _hoisted_45 = { key: 2 };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "KlbOrder",
  props: {
    shopPath: { default: "/shop" },
    mode: { default: "b2c" },
    loginPath: { default: "/login" }
  },
  setup(__props) {
    const cart = ref();
    const store = useFVStore();
    const router = useRouter();
    const route = useRoute();
    const routeOrderUuid = computed(() => route.query.Order__);
    const translate = useTranslation();
    const isAuth = computed(() => store.isAuth);
    const isReady = ref(false);
    const error = ref();
    const hasOrder = ref();
    const eventBus = useEventBus();
    watch(routeOrderUuid, async (v) => {
      if (v) {
        const _order = await useOrder().getOrder(v.toString()).catch(() => {
        });
        if (_order && _order.result == "success")
          hasOrder.value = _order.data;
      } else {
        hasOrder.value = void 0;
      }
    });
    const state = reactive({
      location: void 0
    });
    const delProduct = async (productUuid) => {
      eventBus.emit("klb-order-main-loading", true);
      const _result = await useCart().delProduct(productUuid);
      if (_result) {
        cart.value = await useCart().getCart();
        await store.refreshCart();
      }
      eventBus.emit("klb-order-main-loading", false);
    };
    const createOrder = async () => {
      eventBus.emit("klb-order-main-loading", true);
      error.value = void 0;
      if (!state.location) {
        error.value = translate("klb_error_order_create_location_empty");
        return;
      }
      const _result = await useCart().createOrder({
        User_Location__: state.location
      }).catch((err) => {
        error.value = err.error;
      });
      if (_result && _result.result == "success") {
        hasOrder.value = _result.data;
        router.push({
          path: router.currentRoute.value.path,
          query: { Order__: hasOrder.value.Order__ }
        });
      }
      await store.refreshCart();
      eventBus.emit("klb-order-main-loading", false);
    };
    onMounted(async () => {
      eventBus.emit("klb-order-main-loading", true);
      if (!routeOrderUuid.value) {
        if (route.query.product) {
          await addProductToCart(route.query.product.toString());
        }
        cart.value = await useCart().getCart();
      } else {
        const _order = await useOrder().getOrder(routeOrderUuid.value.toString()).catch(() => {
        });
        if (_order && _order.result == "success") {
          hasOrder.value = _order.data;
        }
      }
      isReady.value = true;
      eventBus.emit("klb-order-main-loading", false);
    });
    const addProductToCart = async (productData) => {
      await useCart().resetCart();
      const _addResult = await useCart().addProduct(productData, "");
      if (_addResult) {
        await store.refreshCartData(_addResult);
      }
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return isReady.value ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(FyLoader, { id: "klb-order-main" }),
        createElementVNode("h2", null, toDisplayString(_ctx.$t("klb_order_cart_summary")), 1),
        cart.value && !hasOrder.value ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
          cart.value.data.products.length == 0 ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
            createElementVNode("p", null, toDisplayString(_ctx.$t("klb_order_cart_is_empty")), 1)
          ])) : createCommentVNode("v-if", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(cart.value.data.products, (product) => {
            return openBlock(), createElementBlock("div", {
              key: `cart_summary_${product.data.Catalog_Product__}`,
              class: "cart-product"
            }, [
              createElementVNode("div", _hoisted_4$2, [
                createElementVNode("h3", null, toDisplayString(product.data["Basic.Name"]), 1),
                createElementVNode("div", _hoisted_5, [
                  createTextVNode(toDisplayString(__props.mode == "b2c" ? product.data.Price.tax.display : product.data.Price.raw.display) + " ", 1),
                  product.data["Basic.ServiceLifetime"] ? (openBlock(), createElementBlock("span", _hoisted_6, "/" + toDisplayString(_ctx.$formatKlbRecurringPaymentCycle(
                    product.data["Basic.ServiceLifetime"]
                  )), 1)) : createCommentVNode("v-if", true),
                  createElementVNode("button", {
                    class: "btn danger trash-icon",
                    onClick: ($event) => delProduct(product.key)
                  }, [
                    createVNode(unref(render$1))
                  ], 8, _hoisted_7)
                ])
              ]),
              product.meta.description ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString(product.meta.description), 1)) : createCommentVNode("v-if", true),
              __props.mode == "b2b" ? (openBlock(), createElementBlock("div", _hoisted_9, [
                createElementVNode("h3", null, toDisplayString(_ctx.$t("klb_order_cart_vat")) + " (" + toDisplayString(product.data.Price.tax_rate) + "%) ", 1),
                createElementVNode("div", _hoisted_10, toDisplayString(product.data.Price.tax_only.display), 1)
              ])) : createCommentVNode("v-if", true)
            ]);
          }), 128)),
          createElementVNode("div", _hoisted_11, [
            __props.mode == "b2c" ? (openBlock(), createElementBlock("div", _hoisted_12, [
              createElementVNode("h3", null, [
                createTextVNode(toDisplayString(_ctx.$t("klb_order_cart_total")) + " ", 1),
                createElementVNode("small", null, "(" + toDisplayString(_ctx.$t("klb_order_tv_included", {
                  val: cart.value.data.total_vat_only.display
                })) + ")", 1)
              ]),
              createElementVNode("div", _hoisted_13, [
                createElementVNode("b", null, toDisplayString(cart.value.data.total_vat.display), 1)
              ])
            ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createElementVNode("div", _hoisted_14, [
                createElementVNode("h3", null, toDisplayString(_ctx.$t("klb_order_cart_total_products")), 1),
                createElementVNode("div", _hoisted_15, [
                  createElementVNode("b", null, toDisplayString(cart.value.data.total.display), 1)
                ])
              ]),
              createElementVNode("div", _hoisted_16, [
                createElementVNode("h3", null, toDisplayString(_ctx.$t("klb_order_cart_total_taxes")), 1),
                createElementVNode("div", _hoisted_17, [
                  createElementVNode("b", null, toDisplayString(cart.value.data.total_vat_only.display), 1)
                ])
              ]),
              createElementVNode("div", _hoisted_18, [
                createElementVNode("h3", null, toDisplayString(_ctx.$t("klb_order_cart_total")), 1),
                createElementVNode("div", _hoisted_19, [
                  createElementVNode("b", null, toDisplayString(cart.value.data.total_vat.display), 1)
                ])
              ])
            ], 64))
          ])
        ])) : createCommentVNode("v-if", true),
        hasOrder.value ? (openBlock(), createElementBlock("div", _hoisted_20, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(hasOrder.value.Items, (product) => {
            return openBlock(), createElementBlock("div", {
              key: `cart_summary_${product.Catalog_Product.Catalog_Product__}`,
              class: "cart-product"
            }, [
              createElementVNode("div", _hoisted_21, [
                createElementVNode("h3", null, toDisplayString(product.Catalog_Product["Basic.Name"]), 1),
                createElementVNode("div", _hoisted_22, [
                  createTextVNode(toDisplayString(__props.mode == "b2c" ? product.Catalog_Product.Price.tax.display : product.Catalog_Product.Price.raw.display) + " ", 1),
                  product.Catalog_Product["Basic.ServiceLifetime"] ? (openBlock(), createElementBlock("span", _hoisted_23, "/" + toDisplayString(_ctx.$formatKlbRecurringPaymentCycle(
                    product.Catalog_Product["Basic.ServiceLifetime"]
                  )), 1)) : createCommentVNode("v-if", true)
                ])
              ]),
              product.Catalog_Product["Meta.description"] ? (openBlock(), createElementBlock("div", _hoisted_24, [
                createTextVNode(toDisplayString(_ctx.$t("klb_product_description_label")) + " ", 1),
                createElementVNode("span", null, toDisplayString(product.Catalog_Product["Meta.description"]), 1)
              ])) : createCommentVNode("v-if", true),
              product.Status ? (openBlock(), createElementBlock("div", _hoisted_25, [
                createTextVNode(toDisplayString(_ctx.$t("klb_product_status")) + " ", 1),
                createElementVNode("span", _hoisted_26, toDisplayString(_ctx.$t(`klb_product_status_${product.Status.replace("-", "_")}`)), 1)
              ])) : createCommentVNode("v-if", true),
              __props.mode == "b2b" ? (openBlock(), createElementBlock("div", _hoisted_27, [
                createElementVNode("span", null, toDisplayString(_ctx.$t("klb_order_cart_vat")) + " (" + toDisplayString(product.Catalog_Product.Price.tax_rate) + "%) ", 1),
                createElementVNode("div", _hoisted_28, toDisplayString(product.Catalog_Product.Price.tax_only.display), 1)
              ])) : createCommentVNode("v-if", true)
            ]);
          }), 128)),
          createElementVNode("div", _hoisted_29, [
            __props.mode == "b2c" ? (openBlock(), createElementBlock("div", _hoisted_30, [
              createElementVNode("h3", null, [
                createTextVNode(toDisplayString(_ctx.$t("klb_order_cart_total")) + " ", 1),
                createElementVNode("small", null, "(" + toDisplayString(_ctx.$t("klb_order_tv_included", {
                  val: hasOrder.value.Vat_Amount.display
                })) + ")", 1)
              ]),
              createElementVNode("div", _hoisted_31, [
                createElementVNode("b", null, toDisplayString(hasOrder.value.Total_Vat.display), 1)
              ])
            ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createElementVNode("div", _hoisted_32, [
                createElementVNode("h3", null, toDisplayString(_ctx.$t("klb_order_cart_total_products")), 1),
                createElementVNode("div", _hoisted_33, [
                  createElementVNode("b", null, toDisplayString(hasOrder.value.Total.display), 1)
                ])
              ]),
              createElementVNode("div", _hoisted_34, [
                createElementVNode("h3", null, toDisplayString(_ctx.$t("klb_order_cart_total_taxes")), 1),
                createElementVNode("div", _hoisted_35, [
                  createElementVNode("b", null, toDisplayString(hasOrder.value.Vat_Amount.display), 1)
                ])
              ]),
              createElementVNode("div", _hoisted_36, [
                createElementVNode("h3", null, toDisplayString(_ctx.$t("klb_order_cart_total")), 1),
                createElementVNode("div", _hoisted_37, [
                  createElementVNode("b", null, toDisplayString(hasOrder.value.Total_Vat.display), 1)
                ])
              ])
            ], 64))
          ])
        ])) : createCommentVNode("v-if", true),
        createElementVNode("div", _hoisted_38, [
          createElementVNode("h2", null, toDisplayString(_ctx.$t("klb_order_billing_location")), 1),
          !hasOrder.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            unref(isAuth) ? (openBlock(), createBlock(KlbUserLocation, {
              key: 0,
              modelValue: state.location,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.location = $event)
            }, null, 8, ["modelValue"])) : (openBlock(), createElementBlock("div", _hoisted_39, [
              createTextVNode(toDisplayString(_ctx.$t("klb_order_you_need_to_be_logged_in")) + " ", 1),
              _hoisted_40,
              _hoisted_41,
              createVNode(_component_router_link, {
                to: `${__props.loginPath}?return_to=${_ctx.$route.path}`,
                class: "btn primary btn-defaults"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("klb_login_cta")), 1)
                ]),
                _: 1
              }, 8, ["to"])
            ]))
          ], 64)) : (openBlock(), createElementBlock("div", _hoisted_42, toDisplayString(hasOrder.value.Billing_User_Location.Display.join(", ")), 1)),
          error.value ? (openBlock(), createElementBlock("p", _hoisted_43, toDisplayString(error.value), 1)) : createCommentVNode("v-if", true),
          createElementVNode("div", _hoisted_44, [
            !hasOrder.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: _cache[1] || (_cache[1] = ($event) => createOrder()),
              class: "btn primary btn-defaults big"
            }, toDisplayString(_ctx.$t("klb_order_create_cta")), 1)) : createCommentVNode("v-if", true)
          ])
        ]),
        unref(routeOrderUuid) ? (openBlock(), createElementBlock("div", _hoisted_45, [
          createElementVNode("h2", null, toDisplayString(_ctx.$t("klb_order_process")), 1),
          createVNode(KlbProcessOrderInternal, {
            orderUuid: unref(routeOrderUuid)?.toString()
          }, null, 8, ["orderUuid"])
        ])) : createCommentVNode("v-if", true)
      ])) : createCommentVNode("v-if", true);
    };
  }
});
var KlbOrder = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "KlbOrder.vue"]]);

const _hoisted_1$1 = { class: "fv-relative" };
const _hoisted_2$1 = {
  key: 0,
  class: "fv-typo margins"
};
const _hoisted_3$1 = ["innerHTML"];
const _hoisted_4$1 = {
  key: 1,
  class: "fv-typo"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "KlbPage",
  props: {},
  async setup(__props) {
    let __temp, __restore;
    const pageHead = reactive({
      title: `...`
    });
    const page = ref();
    const route = useRoute();
    const is404 = ref(false);
    const eventBus = useEventBus();
    watch(
      () => route.params.slug,
      async (v) => {
        if (v)
          await loadPage(v);
      }
    );
    const loadPage = async (slug) => {
      eventBus.emit("cmspage-loading", true);
      is404.value = false;
      console.log("/Content/Cms/@pages:loadSlug", "GET", {
        slug
      });
      const _page = await rest(
        "/Content/Cms/@pages:loadSlug",
        "GET",
        {
          slug
        }
      ).catch((err) => {
        if (err.code == 404) {
          useHistory().status = 404;
          is404.value = true;
          pageHead.title = "404";
        }
        eventBus.emit("cmspage-loading", false);
      });
      if (_page && _page.result == "success") {
        page.value = _page;
        pageHead.title = page.value.data.content_cms_entry_data.Title;
      }
      eventBus.emit("cmspage-loading", false);
    };
    useHead({
      title: computed(() => `${pageHead.title}`)
    });
    [__temp, __restore] = withAsyncContext(() => loadPage(route.params.slug)), await __temp, __restore();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(FyLoader, { id: "cmspage" }),
        page.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createElementVNode("h1", null, toDisplayString(page.value.data.content_cms_entry_data.Title), 1),
          createElementVNode("div", {
            innerHTML: page.value.data.content_cms_entry_data.Contents
          }, null, 8, _hoisted_3$1)
        ])) : createCommentVNode("v-if", true),
        is404.value ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
          createElementVNode("h1", null, toDisplayString(_ctx.$t("fv_404_text")), 1)
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var KlbPage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "KlbPage.vue"]]);

const _hoisted_1 = ["onSubmit"];
const _hoisted_2 = {
  key: 0,
  class: "response-error"
};
const _hoisted_3 = {
  class: "btn primary btn-defaults",
  type: "submit"
};
const _hoisted_4 = {
  key: 1,
  class: "response-success"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "KlbSupport",
  props: {
    to: { default: "@support" }
  },
  setup(__props) {
    const props = __props;
    const store = useFVStore();
    const isAuth = computed(() => store.isAuth);
    const eventBus = useEventBus();
    const globalFormError = ref(null);
    const success = ref(false);
    const state = reactive({
      contact: {
        fullname: isAuth.value ? store.user?.Profile.Display_Name : "",
        email: isAuth.value ? store.user?.Email : "",
        message: "",
        subject: ""
      }
    });
    const rules = {
      contact: {
        fullname: { required },
        email: { required, email },
        message: { required },
        subject: { required }
      }
    };
    const v$ = useVuelidate$1(rules, state);
    const sendMessage = async () => {
      globalFormError.value = null;
      success.value = false;
      if (await v$.value.contact.$validate()) {
        eventBus.emit("klb-contact-form-loading", true);
        const sendResult = await rest("Support/Ticket", "POST", {
          To: props.to,
          Email: state.contact.email,
          Subject: `${state.contact.subject}`,
          Message: state.contact.message,
          Name: state.contact.fullname
        }).catch((error) => {
          eventBus.emit("klb-contact-form-loading", false);
          globalFormError.value = error.error;
        });
        if (sendResult && sendResult.result == "success") {
          success.value = true;
        }
        eventBus.emit("klb-contact-form-loading", false);
      }
    };
    return (_ctx, _cache) => {
      const _component_FyInput = resolveComponent("FyInput");
      return openBlock(), createElementBlock("div", null, [
        !success.value ? (openBlock(), createElementBlock("form", {
          key: 0,
          onSubmit: withModifiers(sendMessage, ["prevent"]),
          class: "klb-contact-form"
        }, [
          createVNode(FyLoader, { id: "klb-contact-form" }),
          createElementVNode("div", null, [
            createVNode(_component_FyInput, {
              id: "emailLogin",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("klb_contact_form_place_holder_email"),
              autocomplete: "email",
              errorVuelidate: unref(v$).contact.email.$errors,
              modelValue: state.contact.email,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.contact.email = $event),
              disabled: unref(isAuth),
              type: "email",
              label: _ctx.$t("klb_contact_form_label_email")
            }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "disabled", "label"]),
            createVNode(_component_FyInput, {
              id: "fullName",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("klb_contact_form_label_fullname"),
              autocomplete: "name",
              disabled: unref(isAuth),
              errorVuelidate: unref(v$).contact.fullname.$errors,
              modelValue: state.contact.fullname,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => state.contact.fullname = $event),
              type: "text",
              label: _ctx.$t("klb_contact_form_place_holder_fullname")
            }, null, 8, ["placeholder", "disabled", "errorVuelidate", "modelValue", "label"]),
            createVNode(_component_FyInput, {
              id: "subject",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("klb_contact_form_place_holder_subject"),
              errorVuelidate: unref(v$).contact.subject.$errors,
              modelValue: state.contact.subject,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => state.contact.subject = $event),
              type: "text",
              label: _ctx.$t("klb_contact_form_label_subject")
            }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
            createVNode(_component_FyInput, {
              id: "message",
              req: true,
              showLabel: true,
              placeholder: _ctx.$t("klb_contact_form_place_holder_message"),
              errorVuelidate: unref(v$).contact.message.$errors,
              modelValue: state.contact.message,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => state.contact.message = $event),
              type: "textarea",
              label: _ctx.$t("klb_contact_form_label_message")
            }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
            globalFormError.value ? (openBlock(), createElementBlock("p", _hoisted_2, toDisplayString(globalFormError.value), 1)) : createCommentVNode("v-if", true),
            createElementVNode("button", _hoisted_3, toDisplayString(_ctx.$t("klb_contact_cta")), 1)
          ])
        ], 40, _hoisted_1)) : (openBlock(), createElementBlock("p", _hoisted_4, toDisplayString(_ctx.$t("klb_contact_thanks")), 1))
      ]);
    };
  }
});
var KlbSupport = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "KlbSupport.vue"]]);

function useUser() {
    return {};
}

var klb = {
    components: {
        KlbLogin,
        KlbUpdateEmailModal,
        KlbUpdatePasswordModal,
        KlbDeleteAccount,
        KlbBillingHistory,
        KlbUserLocation,
        KlbAddPaymentMethodModal,
        KlbCatalog,
        KlbOrder,
        KlbUserBilling,
        KlbPage,
        KlbSupport,
    },
    composables: {
        useCart,
        useUserCheck: useUser,
        useOrder,
        useBilling,
    },
};

var helpersComponents = {
    ClientOnly: ClientOnly,
};

var EN_US = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];
function en_US (diff, idx) {
    if (idx === 0)
        return ['just now', 'right now'];
    var unit = EN_US[Math.floor(idx / 2)];
    if (diff > 1)
        unit += 's';
    return [diff + " " + unit + " ago", "in " + diff + " " + unit];
}

var ZH_CN = ['秒', '分钟', '小时', '天', '周', '个月', '年'];
function zh_CN (diff, idx) {
    if (idx === 0)
        return ['刚刚', '片刻后'];
    var unit = ZH_CN[~~(idx / 2)];
    return [diff + " " + unit + "\u524D", diff + " " + unit + "\u540E"];
}

var Locales = {};
var register = function (locale, func) {
    Locales[locale] = func;
};
var getLocale = function (locale) {
    return Locales[locale] || Locales['en_US'];
};

var SEC_ARRAY = [
    60,
    60,
    24,
    7,
    365 / 7 / 12,
    12,
];
function toDate(input) {
    if (input instanceof Date)
        return input;
    if (!isNaN(input) || /^\d+$/.test(input))
        return new Date(parseInt(input));
    input = (input || '')
        .trim()
        .replace(/\.\d+/, '')
        .replace(/-/, '/')
        .replace(/-/, '/')
        .replace(/(\d)T(\d)/, '$1 $2')
        .replace(/Z/, ' UTC')
        .replace(/([+-]\d\d):?(\d\d)/, ' $1$2');
    return new Date(input);
}
function formatDiff(diff, localeFunc) {
    var agoIn = diff < 0 ? 1 : 0;
    diff = Math.abs(diff);
    var totalSec = diff;
    var idx = 0;
    for (; diff >= SEC_ARRAY[idx] && idx < SEC_ARRAY.length; idx++) {
        diff /= SEC_ARRAY[idx];
    }
    diff = Math.floor(diff);
    idx *= 2;
    if (diff > (idx === 0 ? 9 : 1))
        idx += 1;
    return localeFunc(diff, idx, totalSec)[agoIn].replace('%s', diff.toString());
}
function diffSec(date, relativeDate) {
    var relDate = relativeDate ? toDate(relativeDate) : new Date();
    return (+relDate - +toDate(date)) / 1000;
}

var format = function (date, locale, opts) {
    var sec = diffSec(date, opts && opts.relativeDate);
    return formatDiff(sec, getLocale(locale));
};

register('en_US', en_US);
register('zh_CN', zh_CN);

const cropText = (str, ml = 100, end = '...') => {
    if (str.length > ml) {
        return `${str.slice(0, ml)}${end}`;
    }
    return str;
};
const formatKlbRecurringPaymentCycle = (cycle) => {
    const translate = useTranslation();
    if (!cycle) {
        return translate('payment_cycles_one_time');
    }
    const unit = cycle.slice(-1);
    const quantity = parseInt(cycle.replace(unit, ''));
    switch (unit) {
        case 'h':
            return translate('payment_cycles_hour', { count: quantity });
        case 'd':
            return translate('payment_cycles_day', { count: quantity });
        case 'm':
            return translate('payment_cycles_month', { count: quantity });
        case 'y':
            return translate('payment_cycles_year', { count: quantity });
    }
    return '';
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
const formatDate = (dt) => {
    let _dt = dt;
    if (typeof dt === 'string') {
        _dt = Date.parse(dt);
        if (Number.isNaN(_dt)) {
            _dt = parseInt(dt);
        }
    }
    const translate = useTranslation();
    return translate('global_datetime', {
        val: new Date(_dt),
        formatParams: {
            val: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            },
        },
    });
};
const formatDatetime = (dt) => {
    let _dt = dt;
    if (typeof dt === 'string') {
        _dt = Date.parse(dt);
        if (Number.isNaN(_dt)) {
            _dt = parseInt(dt);
        }
    }
    const translate = useTranslation();
    return translate('global_datetime', {
        val: new Date(_dt),
        formatParams: {
            val: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            },
        },
    });
};
const formatTimeago = (dt) => {
    let _dt = dt;
    if (typeof dt === 'string') {
        _dt = Date.parse(dt);
        if (Number.isNaN(_dt)) {
            _dt = parseInt(dt);
        }
    }
    return format(new Date(_dt), getLocale$1().replace('_', '-'));
};

function useUserCheck(path = '/login') {
    const store = useFVStore();
    const isAuth = computed(() => store.isAuth);
    const router = useRouter();
    const checkUser = (route) => {
        if (route.meta.reqLogin) {
            if (!isAuth.value)
                router.push(path);
        }
    };
    store.refreshUser().then(() => {
        checkUser(useHistory().currentRoute);
    });
    router.afterEach(async () => {
        await store.refreshUser();
    });
    router.beforeEach((to) => {
        if (to.fullPath != path) {
            checkUser(to);
        }
    });
}

const components = { ...uiComponents, ...klb.components, ...helpersComponents };
const i18nextPromise = (backend) => {
    return i18next.use(backend).init({
        ns: ['translation'],
        defaultNS: 'translation',
        debug: false,
        lng: getLocale$1(),
        load: 'currentOnly',
        initImmediate: false,
    });
};
const createFyvue = () => {
    const install = (app, options) => {
        if (!options)
            options = { loadKlb: true };
        app.config.globalProperties.$eventBus = eventBus;
        app.config.globalProperties.$t = i18next.t;
        app.config.globalProperties.$cropText = cropText;
        app.config.globalProperties.$formatBytes = formatBytes;
        app.config.globalProperties.$formatDate = formatDate;
        app.config.globalProperties.$formatTimeago = formatTimeago;
        app.config.globalProperties.$formatDatetime = formatDatetime;
        app.config.globalProperties.$formatJPZipcode = jpZipcode;
        app.config.globalProperties.$formatKlbRecurringPaymentCycle =
            formatKlbRecurringPaymentCycle;
        app.config.globalProperties.$jpZipcode = jpZipcode;
        let k;
        for (k in uiComponents) {
            app.component(uiComponents[k].__name, uiComponents[k]);
        }
        if (options.loadKlb) {
            app.config.globalProperties.$countries = countries;
            let klbComponent;
            for (klbComponent in klb.components) {
                app.component(klb.components[klbComponent].__name, klb.components[klbComponent]);
            }
        }
        let hlp;
        for (hlp in helpersComponents) {
            app.component(helpersComponents[hlp].__name, helpersComponents[hlp]);
        }
    };
    return {
        install,
    };
};
const helpers = {
    cropText,
    formatBytes,
    formatJPZipcode: jpZipcode,
    formatDate,
    formatDatetime,
    formatTimeago,
    formatKlbRecurringPaymentCycle,
};
const helpersSSR = {
    setupClient,
    handleSSR,
    isSSRRendered,
};
const KlbUse = {
    ...klb.composables,
};

export { KlbUse, components, countriesPromise, createFyvue, helpers, helpersSSR, i18nextPromise, rest, useCountries, useEventBus, useFVStore, useHistory, useTranslation, useUserCheck };
//# sourceMappingURL=fyvue.mjs.map

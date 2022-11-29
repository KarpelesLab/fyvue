"use strict";
/*!
  * @karpeleslab/fyvue v0.2.0-rc.29
  * (c) 2022 Florian Gasquez <m@fy.to>
  * @license MIT
  */
Object.defineProperty(exports, "__esModule", { value: !0 });
var i18next = require("i18next"), vue = require("vue"), vue$1 = require("@headlessui/vue"), pinia = require("pinia"), klbfw = require("@karpeleslab/klbfw"), serverRenderer = require("@vue/server-renderer"), head = require("@vueuse/head"), runtime = require("@vueuse/schema-org/runtime"), vueRouter = require("vue-router"), core = require("@vueuse/core"), useVuelidate = require("@vuelidate/core"), validators = require("@vuelidate/validators");
function _interopDefaultLegacy(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var i18next__default = /* @__PURE__ */ _interopDefaultLegacy(i18next), useVuelidate__default = /* @__PURE__ */ _interopDefaultLegacy(useVuelidate);
function mitt(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}
const useHistory = pinia.defineStore({
  id: "historyStore",
  state: () => ({
    _router: null,
    status: 200,
    redirect: void 0
  }),
  getters: {
    currentRoute: (state) => state._router.currentRoute
  },
  actions: {
    setStatus(status) {
      this.status = status;
    },
    _setRouter(_router) {
      this._router = _router;
    },
    push(path, status = 302) {
      var _a;
      return this.status = status, status != 302 && (this.redirect = path), (_a = this._router) == null ? void 0 : _a.push(path);
    },
    replace(path, status = 302) {
      var _a;
      return this.status = status, status != 302 && (this.redirect = path), (_a = this._router) == null ? void 0 : _a.replace(path);
    },
    go(delta) {
      var _a;
      (_a = this._router) == null || _a.go(delta);
    },
    back() {
      var _a;
      (_a = this._router) == null || _a.go(-1);
    },
    forward() {
      var _a;
      (_a = this._router) == null || _a.go(1);
    }
  }
}), isSSRRendered = () => {
  const state = klbfw.getInitialState();
  return !!(state && state.isSSRRendered == !0);
}, setupClient = (router, pinia2) => {
  const initialState = klbfw.getInitialState();
  isSSRRendered() && initialState && initialState.piniaState && (pinia2.state.value = JSON.parse(initialState.piniaState)), useHistory(pinia2)._setRouter(router);
};
async function handleSSR(createApp, cb, options = { url: null }) {
  const { app, router, head: head$1, pinia: pinia2 } = await createApp(!0);
  let url;
  options.url ? url = options.url : url = `${klbfw.getPath()}`, await router.push(url), await router.isReady();
  const result = {
    uuid: klbfw.getUuid(),
    initial: {
      isSSRRendered: !0,
      piniaState: null
    }
  }, historyStore = useHistory(pinia2);
  if (useHistory(pinia2)._setRouter(router), url !== historyStore.currentRoute.fullPath)
    return result.redirect = router.currentRoute.value.fullPath, result.statusCode = 307, cb(result);
  try {
    const html = await serverRenderer.renderToString(app, {}), { headTags, htmlAttrs, bodyAttrs, bodyTags } = await head.renderHeadToString(head$1);
    return result.meta = headTags, result.bodyAttributes = bodyAttrs, result.htmlAttributes = htmlAttrs, result.bodyTags = bodyTags, result.app = html, historyStore.status != 200 && ([301, 302, 303, 307].includes(historyStore.status) ? historyStore.redirect && (result.statusCode = historyStore.status, result.redirect = historyStore.redirect) : result.statusCode = historyStore.status), useHistory(pinia2)._setRouter(null), result.initial.piniaState = JSON.stringify(pinia2.state.value), cb(result);
  } catch (e) {
    return console.log("------Fyvue SSR Error------"), e && (typeof e == "string" ? console.log(e) : e instanceof Error && (console.log(e.message), console.log("------------"), console.log(e.stack))), console.log("------End Fyvue SSR Error------"), cb(result);
  }
}
const useRestState = pinia.defineStore({
  id: "restState",
  state: () => ({
    results: {},
    fetchResults: {}
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
    }
  }
}), stringHashcode = (str) => {
  let hash = 0, i, chr;
  if (str.length === 0)
    return hash;
  for (i = 0; i < str.length; i++)
    chr = str.charCodeAt(i), hash = (hash << 5) - hash + chr, hash |= 0;
  return hash;
};
function restFetch(url, method = "GET", params = {}, isSSR = !1) {
  const requestHash = stringHashcode(url + method + JSON.stringify(params)), restState = useRestState();
  if (isSSRRendered() && restState.fetchResults[requestHash]) {
    const result = { ...restState.fetchResults[requestHash] };
    return delete restState.fetchResults[requestHash], new Promise((resolve, reject) => {
      result.fvReject ? (delete result.fvReject, reject(result)) : resolve(result);
    });
  }
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  let _params = params;
  return method == "POST" ? _params = JSON.stringify(params) : method == "GET" && (_params = void 0, params && (_params = "?" + new URLSearchParams(params))), new Promise((resolve, reject) => {
    fetch(`${url}${method == "GET" ? _params : ""}`, {
      method,
      body: method == "POST" ? _params : void 0,
      headers
    }).catch((err) => {
      const _res = {
        raw: err,
        data: err,
        status: err.status
      };
      isSSR && (_res.fvReject = !0, restState.fetchResults[requestHash] = _res), reject(_res);
    }).then((res) => {
      if (res) {
        const _res = {
          raw: res,
          data: void 0,
          status: res.status
        };
        res.json().then((data) => {
          _res.data = data, isSSR && (restState.fetchResults[requestHash] = _res), resolve(_res);
        });
      }
    });
  });
}
function rest(url, method = "GET", params = {}, ctx = {}) {
  const requestHash = stringHashcode(url + method + JSON.stringify(params)), restState = useRestState();
  if (isSSRRendered() && restState.results[requestHash]) {
    const result = { ...restState.getByHash(requestHash) };
    return restState.delResult(requestHash), new Promise((resolve, reject) => {
      result.fvReject ? (delete result.fvReject, reject(result)) : resolve(result);
    });
  }
  return new Promise((resolve, reject) => {
    klbfw.rest(url, method, params, ctx).then((restResult) => {
      klbfw.getMode() == "ssr" && restState.addResult(requestHash, restResult), resolve(restResult);
    }).catch((err) => {
      klbfw.getMode() == "ssr" && (err.fvReject = !0, restState.addResult(requestHash, err)), reject(err);
    });
  });
}
const countries = {
  countries: new Array(),
  byUuid: {}
}, eventBus = mitt(), useCountries = () => vue.getCurrentInstance().appContext.config.globalProperties.$countries, countriesPromise = () => new Promise((resolve) => {
  rest("Country", "GET").then((_countries) => {
    _countries && _countries.result == "success" && (countries.countries = _countries.data, _countries.data.forEach((_country) => {
      countries.byUuid[_country.Country__] = _country;
    })), resolve(!0);
  }).catch(() => {
  });
}), useEventBus = () => vue.getCurrentInstance().appContext.config.globalProperties.$eventBus, useTranslation = () => vue.getCurrentInstance().appContext.config.globalProperties.$t;
function render$g(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
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
  ]);
}
function render$f(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", { d: "M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" }),
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render$e(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
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
  ]);
}
function render$d(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
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
  ]);
}
function render$c(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
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
  ]);
}
function render$b(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", { d: "M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 00-3-3h-3.879a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H6a3 3 0 00-3 3v3.162A3.756 3.756 0 014.094 9h15.812zM4.094 10.5a2.25 2.25 0 00-2.227 2.568l.857 6A2.25 2.25 0 004.951 21H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-2.227-2.568H4.094z" })
  ]);
}
function render$a(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", { d: "M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" }),
    vue.createElementVNode("path", { d: "M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" })
  ]);
}
function render$9(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
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
  ]);
}
function render$8(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render$7(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render$6(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render$5(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", { d: "M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" })
  ]);
}
function render$4(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", { d: "M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" })
  ]);
}
function render$3(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", { d: "M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" })
  ]);
}
function render$2(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render$1(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", {
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
  ]);
}
const _hoisted_1$r = { class: "parent" }, _hoisted_2$q = { class: "modal-container" };
var _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
  __name: "FyModal",
  props: {
    id: null,
    title: null,
    onOpen: null,
    onClose: null,
    closeIcon: { default: () => vue.h(render) }
  },
  setup(__props) {
    const props = __props, eventBus2 = useEventBus(), isOpen = vue.ref(!1), setModal = (value) => {
      value === !0 ? props.onOpen && props.onOpen() : props.onClose && props.onClose(), isOpen.value = value;
    };
    return vue.onMounted(() => {
      eventBus2.on(`${props.id}Modal`, setModal);
    }), vue.onUnmounted(() => {
      eventBus2.off(`${props.id}Modal`, setModal);
    }), (_ctx, _cache) => (vue.openBlock(), vue.createBlock(vue.unref(vue$1.TransitionRoot), {
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
          style: { background: "rgba(0, 0, 0, 0.8)" },
          class: "fy-modal"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("div", _hoisted_1$r, [
              vue.createVNode(vue.unref(vue$1.DialogPanel), { class: "modal-parent" }, {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "before"),
                  vue.createElementVNode("div", _hoisted_2$q, [
                    __props.title ? (vue.openBlock(), vue.createBlock(vue.unref(vue$1.DialogTitle), {
                      key: 0,
                      class: "title"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(__props.title) + " ", 1),
                        vue.createElementVNode("a", {
                          href: "javascript:void(0)",
                          onClick: _cache[0] || (_cache[0] = ($event) => setModal(!1))
                        }, [
                          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.closeIcon), { class: "close-icon" }))
                        ])
                      ]),
                      _: 1
                    })) : (vue.openBlock(), vue.createElementBlock("a", {
                      key: 1,
                      href: "javascript:void(0)",
                      onClick: _cache[1] || (_cache[1] = ($event) => setModal(!1))
                    }, [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.closeIcon), { class: "close-icon is-alone" }))
                    ])),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(__props.title ? "modal-content" : "is-alone modal-content")
                    }, [
                      vue.renderSlot(_ctx.$slots, "default")
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
    }, 8, ["show"]));
  }
}), _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props)
    target[key] = val;
  return target;
}, FyModal = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__file", "FyModal.vue"]]);
const _hoisted_1$q = { class: "fy-circle-percent" }, _hoisted_2$p = {
  viewBox: "0 0 36 36",
  class: "circular-chart"
}, _hoisted_3$o = /* @__PURE__ */ vue.createElementVNode("path", {
  class: "circle-bg",
  d: `M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831`
}, null, -1), _hoisted_4$l = ["stroke-dasharray", "stroke"], _hoisted_5$j = ["x", "y"];
var _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
  __name: "FyCirclePercent",
  props: {
    percent: { default: 100 },
    textXY: { default: () => [18, 20.85] },
    color: { default: "blue" }
  },
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$q, [
      (vue.openBlock(), vue.createElementBlock("svg", _hoisted_2$p, [
        _hoisted_3$o,
        vue.createElementVNode("path", {
          class: "circle",
          "stroke-dasharray": `${__props.percent}, 100`,
          stroke: __props.color,
          d: `M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831`
        }, null, 8, _hoisted_4$l),
        vue.createElementVNode("text", {
          x: __props.textXY[0].toString(),
          y: __props.textXY[1].toString(),
          class: "percentage"
        }, vue.toDisplayString(__props.percent) + "% ", 9, _hoisted_5$j)
      ]))
    ]));
  }
}), FyCirclePercent = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__file", "FyCirclePercent.vue"]]);
const _hoisted_1$p = { class: "parent" }, _hoisted_2$o = {
  class: "modal-container",
  style: { width: "350px !important" }
}, _hoisted_3$n = { class: "modal-content" }, _hoisted_4$k = {
  key: 0,
  class: "confirm-modal-desc default-p"
}, _hoisted_5$i = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1), _hoisted_6$i = { class: "btn-box" };
var _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
  __name: "FyConfirm",
  setup(__props) {
    const eventBus2 = useEventBus(), confirm = vue.ref(!1), title = vue.ref(null), desc = vue.ref(null), onConfirm = vue.ref(null), _onConfirm = async () => {
      onConfirm.value && await onConfirm.value(), resetConfirm();
    }, resetConfirm = () => {
      title.value = null, desc.value = null, onConfirm.value = null, confirm.value = !1;
    }, showConfirm = (data) => {
      title.value = data.title, desc.value = data.desc, onConfirm.value = data.onConfirm, confirm.value = !0;
    };
    return vue.onMounted(() => {
      eventBus2.on("resetConfirm", resetConfirm), eventBus2.on("showConfirm", showConfirm);
    }), vue.onUnmounted(() => {
      eventBus2.off("resetConfirm", resetConfirm), eventBus2.off("showConfirm", showConfirm);
    }), (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.createVNode(vue.unref(vue$1.Dialog), {
        open: confirm.value,
        onClose: _cache[2] || (_cache[2] = ($event) => confirm.value = !1),
        class: "fy-modal is-confirm",
        style: { background: "rgba(0, 0, 0, 0.6)", "z-index": "43 !important" }
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", _hoisted_1$p, [
            vue.createVNode(vue.unref(vue$1.DialogOverlay)),
            vue.createElementVNode("div", _hoisted_2$o, [
              vue.createElementVNode("div", null, [
                vue.createVNode(vue.unref(vue$1.DialogTitle), { class: "title" }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(title.value), 1)
                  ]),
                  _: 1
                }),
                vue.createElementVNode("div", _hoisted_3$n, [
                  desc.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$k, vue.toDisplayString(desc.value), 1)) : vue.createCommentVNode("v-if", !0),
                  _hoisted_5$i,
                  vue.createElementVNode("div", _hoisted_6$i, [
                    vue.createElementVNode("button", {
                      onClick: _cache[0] || (_cache[0] = ($event) => confirm.value = !1),
                      class: "btn neutral btn-defaults"
                    }, vue.toDisplayString(_ctx.$t("confirm_modal_cta_cancel")), 1),
                    vue.createElementVNode("button", {
                      onClick: _cache[1] || (_cache[1] = ($event) => _onConfirm()),
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
  }
}), FyConfirm = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "FyConfirm.vue"]]);
const _hoisted_1$o = {
  class: "fy-breadcrumb",
  "aria-label": "Breadcrumb"
}, _hoisted_2$n = ["aria-current"], _hoisted_3$m = { key: 2 };
var _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
  __name: "FyBreadcrumb",
  props: {
    nav: { default: () => [] },
    maxLength: { default: 32 }
  },
  setup(__props) {
    const props = __props, schemaOrgFormat = vue.computed(() => {
      const _nav = [];
      return props.nav.forEach((e) => {
        _nav.push({
          item: e.to,
          name: e.name
        });
      }), _nav;
    });
    return (_ctx, _cache) => {
      const _component_router_link = vue.resolveComponent("router-link");
      return vue.openBlock(), vue.createElementBlock("nav", _hoisted_1$o, [
        vue.createVNode(vue.unref(runtime.SchemaOrgBreadcrumb), {
          as: "ol",
          "item-list-element": vue.unref(schemaOrgFormat)
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.nav, (item, index) => (vue.openBlock(), vue.createElementBlock("li", {
              key: `bc_${index.toString()}`,
              class: vue.normalizeClass(
                item.to ? index == 0 ? "li-home" : "li-normal" : "li-current"
              ),
              "aria-current": item.to ? void 0 : "page"
            }, [
              index != 0 ? (vue.openBlock(), vue.createBlock(vue.unref(render$d), { key: 0 })) : vue.createCommentVNode("v-if", !0),
              item.to ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                key: 1,
                to: item.to
              }, {
                default: vue.withCtx(() => [
                  index === 0 ? (vue.openBlock(), vue.createBlock(vue.unref(render$a), { key: 0 })) : vue.createCommentVNode("v-if", !0),
                  vue.createTextVNode(" " + vue.toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1)
                ]),
                _: 2
              }, 1032, ["to"])) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$m, vue.toDisplayString(_ctx.$cropText(_ctx.$t(item.name).toString(), __props.maxLength)), 1))
            ], 10, _hoisted_2$n))), 128))
          ]),
          _: 1
        }, 8, ["item-list-element"])
      ]);
    };
  }
}), FyBreadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "FyBreadcrumb.vue"]]);
const _hoisted_1$n = { class: "fy-step-bar" }, _hoisted_2$m = { class: "bar-bg" }, _hoisted_3$l = { class: "label" };
var _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
  __name: "FySteps",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(__props) {
    const props = __props, barWidth = vue.computed(() => props.currentStep * 100 / props.steps.length), getStepClass = (index) => index + 1 < props.currentStep ? "past-step" : index + 1 == props.currentStep ? "current-step" : "past-step";
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$n, [
      vue.createElementVNode("div", _hoisted_2$m, [
        vue.createElementVNode("div", {
          class: "bar",
          style: vue.normalizeStyle(`width:${vue.unref(barWidth)}%`)
        }, null, 4)
      ]),
      vue.createElementVNode("ol", null, [
        (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.steps, (step, index) => (vue.openBlock(), vue.createElementBlock("li", {
          key: index,
          class: vue.normalizeClass(getStepClass(index))
        }, [
          vue.createElementVNode("span", _hoisted_3$l, vue.toDisplayString(_ctx.$t(step.name)), 1),
          step.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(step.icon), {
            key: 0,
            class: "icon"
          })) : vue.createCommentVNode("v-if", !0)
        ], 2))), 128))
      ])
    ]));
  }
}), FySteps = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "FySteps.vue"]]);
const _hoisted_1$m = {
  key: 0,
  class: "border-collapse w-full md:mx-0 fy-datatable"
}, _hoisted_2$l = { key: 0 }, _hoisted_3$k = { class: "div" }, _hoisted_4$j = { class: "div-cell" }, _hoisted_5$h = { key: 0 }, _hoisted_6$h = { key: 1 };
var _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
  __name: "FyDatatable",
  props: {
    showHeaders: { type: Boolean, default: !0 },
    headers: null,
    data: { default: () => [] }
  },
  setup(__props) {
    const bgColor = (i) => i % 2 == 0 ? "bg-color-1" : "bg-color-2";
    return (_ctx, _cache) => __props.data && __props.data.length > 0 ? (vue.openBlock(), vue.createElementBlock("table", _hoisted_1$m, [
      __props.showHeaders ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_2$l, [
        vue.createElementVNode("tr", null, [
          (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.headers, (title) => (vue.openBlock(), vue.createElementBlock("th", {
            key: `header_${title}`
          }, vue.toDisplayString(title), 1))), 128))
        ])
      ])) : vue.createCommentVNode("v-if", !0),
      vue.createElementVNode("tbody", null, [
        __props.data ? (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(__props.data, (item, index) => (vue.openBlock(), vue.createElementBlock("tr", {
          class: vue.normalizeClass(`tr ${bgColor(index)} `),
          key: index
        }, [
          (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.headers, (title, property) => (vue.openBlock(), vue.createElementBlock("td", {
            key: title,
            class: "td"
          }, [
            vue.createElementVNode("div", _hoisted_3$k, vue.toDisplayString(title), 1),
            vue.createElementVNode("div", _hoisted_4$j, [
              vue.renderSlot(_ctx.$slots, `${property}_item`, {
                data: { prop: item[property], item, idx: index }
              }, () => [
                item[property] ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$h, vue.toDisplayString(item[property].toString()), 1)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_6$h, "n/a"))
              ])
            ])
          ]))), 128))
        ], 2))), 128)) : vue.createCommentVNode("v-if", !0)
      ])
    ])) : vue.createCommentVNode("v-if", !0);
  }
}), FyDatatable = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "FyDatatable.vue"]]);
const _hoisted_1$l = {
  key: 0,
  class: "fy-table"
}, _hoisted_2$k = { class: "table-container" }, _hoisted_3$j = { class: "table-sub-container" }, _hoisted_4$i = { class: "table-scroll" }, _hoisted_5$g = { key: 0 }, _hoisted_6$g = { key: 0 }, _hoisted_7$d = { key: 1 };
var _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
  __name: "FyTable",
  props: {
    showHeaders: { type: Boolean, default: !0 },
    headers: null,
    data: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _cache) => __props.data && __props.data.length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$l, [
      vue.createElementVNode("div", _hoisted_2$k, [
        vue.createElementVNode("div", _hoisted_3$j, [
          vue.createElementVNode("div", _hoisted_4$i, [
            vue.createElementVNode("table", null, [
              __props.showHeaders ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_5$g, [
                vue.createElementVNode("tr", null, [
                  (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.headers, (title, property) => (vue.openBlock(), vue.createElementBlock("th", { key: property }, vue.toDisplayString(title), 1))), 128))
                ])
              ])) : vue.createCommentVNode("v-if", !0),
              vue.createElementVNode("tbody", null, [
                (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.data, (item, index) => (vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                  (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.headers, (_, property) => (vue.openBlock(), vue.createElementBlock("td", {
                    key: `${property}`
                  }, [
                    vue.renderSlot(_ctx.$slots, `${property}_item`, {
                      data: {
                        prop: item[property],
                        item,
                        idx: index
                      }
                    }, () => [
                      item[property] ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_6$g, vue.toDisplayString(item[property]), 1)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_7$d, "n/a"))
                    ])
                  ]))), 128))
                ]))), 128))
              ])
            ])
          ])
        ])
      ])
    ])) : vue.createCommentVNode("v-if", !0);
  }
}), FyTable = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "FyTable.vue"]]);
const _hoisted_1$k = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
  fill: "currentColor"
}, null, -1), _hoisted_2$j = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
  fill: "currentFill"
}, null, -1), _hoisted_3$i = [
  _hoisted_1$k,
  _hoisted_2$j
];
var _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
  __name: "DefaultLoader",
  props: {
    size: { default: "16" },
    showLoadingText: { type: Boolean, default: !0 }
  },
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      (vue.openBlock(), vue.createElementBlock("svg", {
        style: vue.normalizeStyle(`width: ${(parseInt(__props.size) / 2).toString()}rem; height: ${(parseInt(__props.size) / 2).toString()}rem;`),
        "aria-hidden": "true",
        class: "default-loader",
        viewBox: "0 0 100 101",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, _hoisted_3$i, 4)),
      vue.createElementVNode("span", {
        class: vue.normalizeClass(__props.showLoadingText ? "loader-text" : "is-sr")
      }, vue.toDisplayString(_ctx.$t("global_loading_text")), 3)
    ], 64));
  }
}), DefaultLoader = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "DefaultLoader.vue"]]);
const _hoisted_1$j = {
  key: 0,
  class: "fy-loader"
};
var _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
  __name: "FyLoader",
  props: {
    id: null,
    loader: { default: () => DefaultLoader },
    showLoadingText: { type: Boolean, default: !0 },
    size: { default: "16" },
    force: { type: Boolean, default: !1 }
  },
  setup(__props) {
    const props = __props, eventBus2 = useEventBus(), loading = vue.ref(!1), setLoading = (value) => {
      loading.value = value;
    };
    return vue.onMounted(() => {
      props.id ? eventBus2.on(`${props.id}-loading`, setLoading) : eventBus2.on("loading", setLoading);
    }), vue.onUnmounted(() => {
      props.id ? eventBus2.off(`${props.id}-loading`, setLoading) : eventBus2.off("loading", setLoading);
    }), (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("div", null, [
      loading.value || __props.force ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$j, [
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
      ])) : vue.createCommentVNode("v-if", !0)
    ]));
  }
}), FyLoader = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "FyLoader.vue"]]);
const _hoisted_1$i = { class: "input-group" }, _hoisted_2$i = ["for"], _hoisted_3$h = ["aria-label", "id", "true-value", "false-value"], _hoisted_4$h = ["href"], _hoisted_5$f = {
  key: 2,
  class: "is-req"
}, _hoisted_6$f = ["aria-label", "placeholder", "autocomplete", "id", "type", "disabled"], _hoisted_7$c = ["aria-label", "placeholder", "autocomplete", "id", "disabled"], _hoisted_8$c = ["aria-label", "id"], _hoisted_9$b = ["value"], _hoisted_10$9 = {
  key: 2,
  class: "form-error-label"
}, _hoisted_11$9 = {
  key: 3,
  class: "help-text"
};
var _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
  __name: "FyInput",
  props: {
    id: null,
    showLabel: { type: Boolean, default: !0 },
    label: null,
    type: { default: "text" },
    placeholder: null,
    autocomplete: null,
    checkboxTrueValue: { type: [String, Boolean], default: !0 },
    checkboxFalseValue: { type: [String, Boolean], default: !1 },
    req: { type: Boolean, default: !1 },
    linkIcon: null,
    modelValue: null,
    checkboxValue: null,
    options: { default: () => [] },
    help: null,
    error: null,
    errorVuelidate: null,
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:checkboxValue"],
  setup(__props, { expose, emit }) {
    const props = __props, translate = useTranslation(), inputRef = vue.ref(), errorProps = vue.toRef(props, "error"), errorVuelidateProps = vue.toRef(props, "errorVuelidate"), checkErrors = vue.computed(() => {
      if (errorProps.value)
        return errorProps.value;
      if (errorVuelidateProps.value && errorVuelidateProps.value.length > 0) {
        const err = `vuelidate_validator_${errorVuelidateProps.value[0].$validator.toString()}`;
        return translate(err);
      }
      return null;
    }), focus = () => {
      inputRef.value && inputRef.value.focus();
    }, getInputRef = () => {
      if (inputRef.value)
        return inputRef.value;
    }, model = vue.computed({
      get: () => props.modelValue,
      set: (items) => {
        emit("update:modelValue", items);
      }
    }), modelCheckbox = vue.computed({
      get: () => props.checkboxValue,
      set: (items) => {
        emit("update:checkboxValue", items);
      }
    });
    return expose({ focus, getInputRef }), (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$i, [
      __props.showLabel && __props.id && __props.label ? (vue.openBlock(), vue.createElementBlock("label", {
        key: 0,
        class: "label-basic",
        for: __props.id
      }, [
        __props.type == "checkbox" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
          key: 0,
          "aria-label": __props.label,
          ref_key: "inputRef",
          ref: inputRef,
          type: "checkbox",
          class: vue.normalizeClass(["form-checkbox", { "error-form": vue.unref(checkErrors) }]),
          id: __props.id,
          "true-value": __props.checkboxTrueValue,
          "false-value": __props.checkboxFalseValue,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(modelCheckbox) ? modelCheckbox.value = $event : null)
        }, null, 10, _hoisted_3$h)), [
          [vue.vModelCheckbox, vue.unref(modelCheckbox)]
        ]) : vue.createCommentVNode("v-if", !0),
        vue.createTextVNode(" " + vue.toDisplayString(__props.label) + " ", 1),
        __props.linkIcon ? (vue.openBlock(), vue.createElementBlock("a", {
          key: 1,
          class: "link-icon",
          href: __props.linkIcon,
          target: "_blank"
        }, [
          vue.createVNode(vue.unref(render$9))
        ], 8, _hoisted_4$h)) : vue.createCommentVNode("v-if", !0),
        __props.req ? (vue.openBlock(), vue.createElementBlock("sup", _hoisted_5$f, "*")) : vue.createCommentVNode("v-if", !0)
      ], 8, _hoisted_2$i)) : vue.createCommentVNode("v-if", !0),
      ["checkbox", "radiobox"].includes(__props.type) ? vue.createCommentVNode("v-if", !0) : (vue.openBlock(), vue.createElementBlock("div", {
        key: 1,
        class: vue.normalizeClass(["input-box", { error: vue.unref(checkErrors), disabled: __props.disabled }])
      }, [
        vue.renderSlot(_ctx.$slots, "before"),
        ["text", "password", "email", "search"].includes(__props.type) ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
          key: 0,
          ref_key: "inputRef",
          ref: inputRef,
          "aria-label": __props.label,
          class: "input-basic",
          placeholder: __props.placeholder,
          autocomplete: __props.autocomplete,
          id: __props.id,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(model) ? model.value = $event : null),
          type: __props.type,
          disabled: __props.disabled
        }, null, 8, _hoisted_6$f)), [
          [vue.vModelDynamic, vue.unref(model)]
        ]) : vue.createCommentVNode("v-if", !0),
        __props.type == "textarea" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
          key: 1,
          "aria-label": __props.label,
          ref_key: "inputRef",
          ref: inputRef,
          class: "input-basic is-textarea",
          placeholder: __props.placeholder,
          autocomplete: __props.autocomplete,
          id: __props.id,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.isRef(model) ? model.value = $event : null),
          disabled: __props.disabled
        }, null, 8, _hoisted_7$c)), [
          [vue.vModelText, vue.unref(model)]
        ]) : vue.createCommentVNode("v-if", !0),
        __props.type == "select" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("select", {
          key: 2,
          "aria-label": __props.label,
          ref_key: "inputRef",
          ref: inputRef,
          id: __props.id,
          class: "input-basic",
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.isRef(model) ? model.value = $event : null)
        }, [
          (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.options, (opt) => (vue.openBlock(), vue.createElementBlock("option", {
            value: opt[0],
            key: opt[0].toString()
          }, vue.toDisplayString(opt[1]), 9, _hoisted_9$b))), 128))
        ], 8, _hoisted_8$c)), [
          [vue.vModelSelect, vue.unref(model)]
        ]) : vue.createCommentVNode("v-if", !0),
        vue.renderSlot(_ctx.$slots, "after")
      ], 2)),
      vue.unref(checkErrors) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10$9, vue.toDisplayString(vue.unref(checkErrors)), 1)) : vue.createCommentVNode("v-if", !0),
      __props.help ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$9, vue.toDisplayString(__props.help), 1)) : vue.createCommentVNode("v-if", !0)
    ]));
  }
}), FyInput = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "FyInput.vue"]]);
const useSeo = (seo, initial = !1) => {
  initial && runtime.useSchemaOrg([
    runtime.defineOrganization({
      name: seo.value.name,
      logo: seo.value.image
    }),
    runtime.defineWebSite({
      name: seo.value.name,
      potentialAction: vue.computed(() => {
        const _res = [];
        return seo.value.searchAction && _res.push(runtime.defineSearchAction({ target: seo.value.searchAction })), _res;
      })
    }),
    runtime.defineWebPage()
  ]), head.useHead({
    title: vue.computed(() => seo.value.title),
    link: vue.computed(() => {
      const _res = [];
      return initial && klbfw.getMode() == "ssr" && _res.push({
        rel: "canonical",
        href: `${klbfw.getUrl().scheme}://${klbfw.getUrl().host}${klbfw.getUrl().path}`
      }), seo.value.prev && _res.push({
        rel: "prev",
        href: seo.value.prev
      }), seo.value.next && _res.push({
        rel: "next",
        href: seo.value.next
      }), _res;
    }),
    htmlAttrs: vue.computed(() => initial && klbfw.getMode() == "ssr" ? { lang: vue.computed(() => klbfw.getLocale()) } : {}),
    bodyAttrs: vue.computed(() => initial ? { itemtype: "http://schema.org/WebPage" } : {}),
    meta: vue.computed(() => {
      const _res = [];
      return initial && (klbfw.getMode() == "ssr" && _res.push(
        {
          name: "og:locale",
          content: klbfw.getLocale().replace("-", "_")
        },
        {
          name: "og:url",
          content: klbfw.getUrl().full
        }
      ), _res.push(
        {
          name: "og:type",
          content: "website"
        },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      )), seo.value.type && _res.push({
        name: "og:type",
        content: seo.value.type
      }), seo.value.title && _res.push(
        {
          name: "og:title",
          content: seo.value.title
        },
        {
          name: "twitter:title",
          content: seo.value.title
        }
      ), seo.value.description && _res.push(
        {
          name: "og:description",
          content: seo.value.description
        },
        {
          name: "twitter:description",
          content: seo.value.description
        },
        {
          name: "og:description",
          content: seo.value.description
        },
        {
          name: "description",
          content: seo.value.description
        }
      ), seo.value.modified && _res.push({
        name: "article:published_time",
        content: seo.value.modified
      }), seo.value.published && _res.push({
        name: "article:modified_time",
        content: seo.value.published
      }), seo.value.imageWidth && seo.value.imageHeight && _res.push(
        {
          name: "og:image:width",
          content: seo.value.imageWidth
        },
        {
          name: "og:image:height",
          content: seo.value.imageHeight
        }
      ), seo.value.imageType && _res.push({
        name: "og:image:type",
        content: seo.value.imageType
      }), seo.value.image && _res.push(
        {
          name: "og:image",
          content: seo.value.image
        },
        {
          name: "twitter:image",
          content: seo.value.image
        }
      ), _res;
    })
  });
}, _hoisted_1$h = {
  key: 0,
  class: "fy-paging"
}, _hoisted_2$h = { class: "paging-container" }, _hoisted_3$g = { "aria-label": "Pagination" }, _hoisted_4$g = { class: "is-sr" }, _hoisted_5$e = {
  key: 2,
  class: "dots"
}, _hoisted_6$e = ["onClick"], _hoisted_7$b = {
  href: "#",
  "aria-current": "page",
  class: "active"
}, _hoisted_8$b = ["onClick"], _hoisted_9$a = {
  key: 3,
  class: "dots"
}, _hoisted_10$8 = { class: "is-sr" }, _hoisted_11$8 = { class: "paging-text" };
var _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
  __name: "FyPaging",
  props: {
    items: null,
    id: null
  },
  setup(__props) {
    const props = __props, route = vueRouter.useRoute(), eventBus2 = useEventBus(), history = useHistory(), prevNextSeo = vue.ref({}), url = klbfw.getUrl(), isNewPage = (page2) => page2 >= 1 && page2 <= props.items.page_max && page2 != props.items.page_no, pageWatcher = vue.ref(), next = () => {
      const page2 = props.items.page_no + 1;
      !isNewPage(page2) || history.push({
        path: history.currentRoute.path,
        query: { page: page2.toString() }
      });
    }, prev = () => {
      const page2 = props.items.page_no - 1;
      !isNewPage(page2) || history.push({
        path: history.currentRoute.path,
        query: { page: page2.toString() }
      });
    }, page = (page2) => {
      !isNewPage(page2) || history.push({
        path: history.currentRoute.path,
        query: { page: page2.toString() }
      });
    }, checkPageNumber = (page2 = 1) => {
      prevNextSeo.value.next = void 0, prevNextSeo.value.prev = void 0, page2 + 1 <= props.items.page_max && (prevNextSeo.value.next = `${url.scheme}://${url.host}${url.path}?page=${page2 + 1}`), page2 - 1 >= 1 && (prevNextSeo.value.prev = `${url.scheme}://${url.host}${url.path}?page=${page2 - 1}`);
    };
    return eventBus2.on(`${props.id}GoToPage`, checkPageNumber), vue.onMounted(() => {
      pageWatcher.value = vue.watch(
        () => route.query.page,
        (v, ov) => {
          eventBus2.emit(`${props.id}GoToPage`, v || 1);
        }
      );
    }), vue.onUnmounted(() => {
      eventBus2.off(`${props.id}GoToPage`, checkPageNumber), pageWatcher.value && pageWatcher.value();
    }), checkPageNumber(props.items.page_no), useSeo(prevNextSeo), (_ctx, _cache) => __props.items && __props.items.page_max > 1 && __props.items.page_no ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$h, [
      vue.createElementVNode("div", _hoisted_2$h, [
        vue.createElementVNode("nav", _hoisted_3$g, [
          __props.items.page_no >= 2 ? (vue.openBlock(), vue.createElementBlock("a", {
            key: 0,
            href: "javascript:void(0);",
            onClick: _cache[0] || (_cache[0] = ($event) => prev()),
            class: "prev-next"
          }, [
            vue.createElementVNode("span", _hoisted_4$g, vue.toDisplayString(_ctx.$t("previous_paging")), 1),
            vue.createVNode(vue.unref(render$e), { class: "fv-icon-base" })
          ])) : vue.createCommentVNode("v-if", !0),
          __props.items.page_no - 2 > 1 ? (vue.openBlock(), vue.createElementBlock("a", {
            key: 1,
            class: "innactive",
            href: "javascript:void(0);",
            onClick: _cache[1] || (_cache[1] = ($event) => page(1))
          }, " 1 ")) : vue.createCommentVNode("v-if", !0),
          __props.items.page_no - 2 > 2 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$e, " ... ")) : vue.createCommentVNode("v-if", !0),
          (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(2, (i) => (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
            __props.items.page_no - (3 - i) >= 1 ? (vue.openBlock(), vue.createElementBlock("a", {
              class: "innactive",
              href: "javascript:void(0);",
              key: `${i}-sm`,
              onClick: ($event) => page(__props.items.page_no - (3 - i))
            }, vue.toDisplayString(__props.items.page_no - (3 - i)), 9, _hoisted_6$e)) : vue.createCommentVNode("v-if", !0)
          ], 64))), 64)),
          vue.createElementVNode("a", _hoisted_7$b, vue.toDisplayString(__props.items.page_no), 1),
          (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(2, (i) => (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
            __props.items.page_no + i <= __props.items.page_max ? (vue.openBlock(), vue.createElementBlock("a", {
              class: "innactive",
              href: "javascript:void(0);",
              key: `${i}-md`,
              onClick: ($event) => page(__props.items.page_no + i)
            }, vue.toDisplayString(__props.items.page_no + i), 9, _hoisted_8$b)) : vue.createCommentVNode("v-if", !0)
          ], 64))), 64)),
          __props.items.page_no + 2 < __props.items.page_max - 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_9$a, " ... ")) : vue.createCommentVNode("v-if", !0),
          __props.items.page_no + 2 < __props.items.page_max ? (vue.openBlock(), vue.createElementBlock("a", {
            key: 4,
            class: "innactive",
            href: "javascript:void(0);",
            onClick: _cache[2] || (_cache[2] = ($event) => page(__props.items.page_max))
          }, vue.toDisplayString(__props.items.page_max), 1)) : vue.createCommentVNode("v-if", !0),
          __props.items.page_no < __props.items.page_max - 1 ? (vue.openBlock(), vue.createElementBlock("a", {
            key: 5,
            href: "javascript:void(0);",
            onClick: _cache[3] || (_cache[3] = ($event) => next()),
            class: "prev-next"
          }, [
            vue.createElementVNode("span", _hoisted_10$8, vue.toDisplayString(_ctx.$t("next_paging")), 1),
            vue.createVNode(vue.unref(render$d), { class: "fv-icon-base" })
          ])) : vue.createCommentVNode("v-if", !0)
        ]),
        vue.createElementVNode("p", _hoisted_11$8, vue.toDisplayString(_ctx.$t("global_paging", {
          start: __props.items.results_per_page * (__props.items.page_no - 1),
          end: __props.items.results_per_page * __props.items.page_no,
          total: __props.items.count >= 1e4 ? _ctx.$t("paging_a_lot_of") : __props.items.count
        })), 1)
      ])
    ])) : vue.createCommentVNode("v-if", !0);
  }
}), FyPaging = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "FyPaging.vue"]]);
function useCart() {
  return {
    resetCart: () => new Promise((resolve, reject) => {
      rest("Catalog/Cart/@:reset", "POST", {}).then((_resetResult) => {
        _resetResult && _resetResult.result == "success" ? resolve(!0) : resolve(!1);
      }).catch(() => {
        reject(!1);
      });
    }),
    createOrder(billingLocation) {
      return rest("Catalog/Cart/@:createOrder", "POST", {
        Billing: billingLocation
      });
    },
    getCart() {
      return rest("Catalog/Cart/@", "GET");
    },
    delProduct: (productKey) => new Promise((resolve, reject) => {
      rest("Catalog/Cart/@:process", "POST", {
        request: productKey + "=0"
      }).then((_addProductCartResult) => {
        _addProductCartResult && _addProductCartResult.result == "success" ? resolve(!0) : resolve(!1);
      }).catch(() => {
        reject(!1);
      });
    }),
    addProduct: (productUuid, meta) => new Promise((resolve, reject) => {
      rest("Catalog/Cart/@:process", "POST", {
        request: productUuid + meta
      }).then((_addProductCartResult) => {
        _addProductCartResult && _addProductCartResult.result == "success", resolve(_addProductCartResult);
      }).catch((err) => {
        reject(err);
      });
    })
  };
}
const useFVStore = pinia.defineStore({
  id: "fVStore",
  state: () => ({
    user: null,
    cartCount: 0,
    cart: null
  }),
  getters: {
    isAuth: (state) => state.user !== null
  },
  actions: {
    async refreshCart() {
      const _cart = await useCart().getCart();
      _cart && _cart.result == "success" && (this.cartCount = _cart.data.products.length, this.cart = _cart.data);
    },
    async refreshCartData(_cart) {
      _cart && _cart.result == "success" && (this.cartCount = _cart.data.products.length, this.cart = _cart.data);
    },
    async refreshUser(params = {}) {
      const apiData = await klbfw.rest(
        "User:get",
        "GET",
        params
      ).catch((err) => {
      });
      apiData.result == "success" && apiData.data != null ? this.user = apiData.data : this.user = null;
    },
    async logout() {
      (await klbfw.rest(
        "User:logout",
        "POST"
      ).catch((err) => {
      })).result == "success" && this.setUser(null);
    },
    setUser(user) {
      this.user = user;
    }
  }
}), ClientOnly = vue.defineComponent({
  __name: "ClientOnly",
  setup(_, { slots }) {
    const show = vue.ref(!1);
    return vue.onMounted(() => {
      show.value = !0;
    }), () => show.value && slots.default ? slots.default() : null;
  }
}), _hoisted_1$g = { class: "fy-navbar" }, _hoisted_2$g = { class: "nav-container" }, _hoisted_3$f = { key: 0 }, _hoisted_4$f = { class: "nav-actions" }, _hoisted_5$d = { class: "badge" }, _hoisted_6$d = /* @__PURE__ */ vue.createElementVNode("span", { class: "is-sr" }, "Open main menu", -1), _hoisted_7$a = /* @__PURE__ */ vue.createElementVNode("svg", {
  "aria-hidden": "true",
  fill: "currentColor",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
    "clip-rule": "evenodd"
  })
], -1), _hoisted_8$a = [
  _hoisted_6$d,
  _hoisted_7$a
], _hoisted_9$9 = { class: "main-ul" }, _hoisted_10$7 = /* @__PURE__ */ vue.createElementVNode("svg", {
  "aria-hidden": "true",
  fill: "currentColor",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
    "clip-rule": "evenodd"
  })
], -1), _hoisted_11$7 = ["href", "title", "alt"], _hoisted_12$6 = ["href", "title", "alt"], _hoisted_13$5 = { key: 0 }, _hoisted_14$5 = { key: 1 };
var _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
  __name: "FyNavbar",
  props: {
    title: null,
    showTitle: { type: Boolean, default: !0 },
    darkLight: { type: Boolean, default: !0 },
    links: null,
    loginPath: { default: "/login" },
    accountPath: { default: "/user" },
    cartPath: { default: "/user/order" },
    showDashboardLink: { type: Boolean, default: !0 },
    showCart: { type: Boolean, default: !1 }
  },
  setup(__props) {
    const isDark = core.useDark({
      selector: "html",
      attribute: "class",
      valueDark: "dark",
      valueLight: "light"
    }), isOpen = vue.ref(!1), toggleDark = core.useToggle(isDark), toggleNavbarOpen = core.useToggle(isOpen), store = useFVStore(), isAuth = vue.computed(() => store.isAuth), cartCount = vue.computed(() => store.cartCount), logout = async () => {
      await store.logout(), useHistory().push("/", 302);
    };
    return (_ctx, _cache) => {
      const _component_router_link = vue.resolveComponent("router-link");
      return vue.openBlock(), vue.createElementBlock("nav", _hoisted_1$g, [
        vue.createElementVNode("div", _hoisted_2$g, [
          vue.createVNode(_component_router_link, {
            to: "/",
            class: "logo-image"
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "logo"),
              __props.title && __props.showTitle ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$f, vue.toDisplayString(__props.title), 1)) : vue.createCommentVNode("v-if", !0)
            ]),
            _: 3
          }),
          vue.createElementVNode("div", _hoisted_4$f, [
            vue.createVNode(vue.unref(ClientOnly), null, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "cart", {}, () => [
                  __props.showCart ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                    key: 0,
                    to: __props.cartPath,
                    class: "nav-cart"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(render$4)),
                      vue.createElementVNode("div", _hoisted_5$d, vue.toDisplayString(vue.unref(cartCount).toString()), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])) : vue.createCommentVNode("v-if", !0)
                ])
              ]),
              _: 3
            }),
            __props.darkLight ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(toggleDark)()),
              class: "btn neutral light-dark"
            }, [
              vue.unref(isDark) ? (vue.openBlock(), vue.createBlock(vue.unref(render$3), { key: 1 })) : (vue.openBlock(), vue.createBlock(vue.unref(render$7), { key: 0 }))
            ])) : vue.createCommentVNode("v-if", !0),
            vue.createElementVNode("button", {
              type: "button",
              class: "open-nav-button",
              onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(toggleNavbarOpen)())
            }, _hoisted_8$a)
          ]),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(["nav-menu", isOpen.value ? "is-open" : ""])
          }, [
            vue.createElementVNode("ul", _hoisted_9$9, [
              (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.links, (link, index) => (vue.openBlock(), vue.createElementBlock("li", {
                key: `link_${index.toString()}`
              }, [
                link.childrens && link.childrens.length > 0 ? (vue.openBlock(), vue.createBlock(vue.unref(vue$1.Menu), { key: 0 }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(vue$1.MenuButton), { class: "is-link has-childs" }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(link.name) + " ", 1),
                        _hoisted_10$7
                      ]),
                      _: 2
                    }, 1024),
                    vue.createVNode(vue.Transition, { name: "fade" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(vue$1.MenuItems), { class: "sub-nav" }, {
                          default: vue.withCtx(() => [
                            vue.createElementVNode("ul", null, [
                              (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(link.childrens, (children, index2) => (vue.openBlock(), vue.createBlock(vue.unref(vue$1.MenuItem), {
                                key: `link_children_${index2.toString()}`
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createElementVNode("li", null, [
                                    children.isExternal ? (vue.openBlock(), vue.createElementBlock("a", {
                                      key: 1,
                                      href: children.to,
                                      title: children.name,
                                      alt: children.name,
                                      class: "is-link"
                                    }, vue.toDisplayString(children.name), 9, _hoisted_11$7)) : (vue.openBlock(), vue.createBlock(_component_router_link, {
                                      key: 0,
                                      to: children.to,
                                      title: children.name,
                                      alt: children.name,
                                      class: "is-link"
                                    }, {
                                      default: vue.withCtx(() => [
                                        vue.createTextVNode(vue.toDisplayString(children.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["to", "title", "alt"]))
                                  ])
                                ]),
                                _: 2
                              }, 1024))), 128))
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  link.isExternal ? (vue.openBlock(), vue.createElementBlock("a", {
                    key: 1,
                    href: link.to,
                    title: link.name,
                    alt: link.name,
                    class: vue.normalizeClass(["is-link", ""])
                  }, vue.toDisplayString(link.name), 9, _hoisted_12$6)) : (vue.openBlock(), vue.createBlock(_component_router_link, {
                    key: 0,
                    to: link.to,
                    title: link.name,
                    alt: link.name,
                    class: vue.normalizeClass(["is-link", ""])
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(link.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to", "title", "alt"]))
                ], 64))
              ]))), 128))
            ]),
            vue.renderSlot(_ctx.$slots, "custom"),
            vue.renderSlot(_ctx.$slots, "buttons", {}, () => [
              vue.unref(isAuth) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13$5, [
                vue.createElementVNode("a", {
                  href: "javascript:void(0)",
                  onClick: _cache[2] || (_cache[2] = ($event) => logout()),
                  class: "btn neutral btn-defaults"
                }, vue.toDisplayString(_ctx.$t("navbar_logout_cta")), 1),
                __props.showDashboardLink ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                  key: 0,
                  to: "/user",
                  class: "btn primary btn-defaults"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(_ctx.$t("navbar_dashboard_cta")), 1)
                  ]),
                  _: 1
                })) : vue.createCommentVNode("v-if", !0)
              ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_14$5, [
                vue.createVNode(_component_router_link, {
                  to: "/login",
                  class: "btn neutral btn-defaults"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(_ctx.$t("navbar_login_cta")), 1)
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_router_link, {
                  to: "/login",
                  class: "btn primary btn-defaults"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(_ctx.$t("navbar_signup_cta")), 1)
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
}), FyNavbar = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "FyNavbar.vue"]]), _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
  __name: "FyTabs",
  setup(__props) {
    return (_ctx, _cache) => "Yo";
  }
}), FyTabs = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "FyTabs.vue"]]);
const _sfc_main$f = {}, _hoisted_1$f = { class: "fv-404" }, _hoisted_2$f = { class: "" }, _hoisted_3$e = /* @__PURE__ */ vue.createElementVNode("div", { class: "title-404" }, "404", -1), _hoisted_4$e = { class: "content-404" }, _hoisted_5$c = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1), _hoisted_6$c = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
function _sfc_render(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$f, [
    vue.createElementVNode("div", _hoisted_2$f, [
      _hoisted_3$e,
      vue.createElementVNode("div", _hoisted_4$e, vue.toDisplayString(_ctx.$t("fv_404_title")), 1),
      _hoisted_5$c,
      _hoisted_6$c,
      vue.createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.go(-1)),
        class: "btn primary btn-defaults"
      }, vue.toDisplayString(_ctx.$t("fv_404_back_to_home")), 1)
    ])
  ]);
}
var Fy404View = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render], ["__file", "Fy404View.vue"]]), uiComponents = {
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
  Fy404View
};
const _hoisted_1$e = { class: "w-full" }, _hoisted_2$e = {
  key: 0,
  class: "message"
}, _hoisted_3$d = {
  key: 0,
  class: "oauth-container"
}, _hoisted_4$d = ["onClick"], _hoisted_5$b = ["alt", "src"], _hoisted_6$b = {
  key: 1,
  class: "response-error"
}, _hoisted_8$9 = { class: "btn primary btn-defaults" }, _hoisted_9$8 = {
  key: 0,
  class: "response-error"
}, _hoisted_10$6 = /* @__PURE__ */ vue.createElementVNode("br", { style: { clear: "both" } }, null, -1), _hoisted_11$6 = { key: 1 };
var _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbLogin",
  props: {
    returnDefault: { default: "/" },
    forceAction: null,
    onSuccess: null
  },
  setup(__props) {
    const props = __props, state = vue.reactive({
      userEmail: ""
    }), rules = {
      userEmail: { required: validators.required }
    }, store = useFVStore(), v$ = useVuelidate__default.default(rules, state), route = vueRouter.useRoute(), router = vueRouter.useRouter(), eventBus2 = useEventBus(), returnTo = vue.ref(props.returnDefault), responseMessage = vue.ref(null), responseError = vue.ref(), responseReq = vue.ref([]), responseFields = vue.ref([]), response = vue.ref(), hasOauth = vue.ref(!1), fieldsError = vue.ref({}), pwdRecoverMailSent = vue.ref(!1), pwdRecoverError = vue.ref(), inputs = vue.ref([]), formData = vue.ref({
      return_to: props.returnDefault,
      session: null,
      action: props.forceAction ? props.forceAction : void 0
    }), completed = vue.ref(!1), forgotPassword = async () => {
      if (await v$.value.$validate()) {
        const data = await rest("User:forgot_password", "POST", {
          login: state.userEmail
        }).catch((err) => {
          pwdRecoverError.value = err;
        });
        (data == null ? void 0 : data.result) == "success" && (pwdRecoverMailSent.value = !0);
      }
    }, userFlow = async (params = { initial: !1 }) => {
      var _a;
      if (eventBus2.emit("klblogin-loading", !0), fieldsError.value = {}, hasOauth.value = !1, params.initial === !1) {
        let hasError = !1;
        if (responseReq.value.forEach((field) => {
          (!formData.value[field] || formData.value[field] == "") && (fieldsError.value[field] = "error_form_value_is_required", hasError = !0);
        }), hasError) {
          eventBus2.emit("klblogin-loading", !1);
          return;
        }
      }
      if (params.oauth && (formData.value.oauth2 = params.oauth), route.query.return_to && typeof route.query.return_to == "string" && (returnTo.value = route.query.return_to ? route.query.return_to : props.returnDefault), formData.value.session || (formData.value.session = route.query.session ? route.query.session : void 0), formData.value.return_to = returnTo.value, response.value = await rest("User:flow", "POST", formData.value).catch(
        (err) => {
          responseError.value = err, responseError.value.param && (fieldsError.value[responseError.value.param] = responseError.value.token), eventBus2.emit("klblogin-loading", !1);
        }
      ), ((_a = response.value) == null ? void 0 : _a.result) == "success") {
        if (props.onSuccess && await props.onSuccess(), response.value.data.url) {
          window.location.href = response.value.data.url;
          return;
        }
        if (response.value.data.complete == !0 && response.value.data.user) {
          store.setUser(response.value.data.user), router.resolve(returnTo.value).matched.length != 0 ? router.push(returnTo.value) : window.location.href = returnTo.value;
          return;
        }
        formData.value = {
          session: response.value.data.session
        }, inputs.value = [], response.value.data.email && (state.userEmail = response.value.data.email), responseFields.value = response.value.data.fields, response.value.data.message && (responseMessage.value = response.value.data.message), responseReq.value = response.value.data.req, responseFields.value.forEach((field) => {
          field.type == "oauth2" && (hasOauth.value = !0);
        }), setTimeout(() => {
          inputs.value.length > 0 && inputs.value[inputs.value.length - 1] && inputs.value[inputs.value.length - 1].focus();
        }, 300);
      }
      eventBus2.emit("klblogin-loading", !1);
    };
    return vue.onMounted(async () => {
      await userFlow({ initial: !0 });
    }), (_ctx, _cache) => {
      const _component_FyLoader = vue.resolveComponent("FyLoader"), _component_FyModal = vue.resolveComponent("FyModal");
      return vue.openBlock(), vue.createBlock(vue.unref(ClientOnly), null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", null, [
            completed.value ? vue.createCommentVNode("v-if", !0) : (vue.openBlock(), vue.createElementBlock("form", {
              key: 0,
              onSubmit: _cache[1] || (_cache[1] = vue.withModifiers(($event) => userFlow(), ["prevent"])),
              class: "klb-login"
            }, [
              vue.createVNode(_component_FyLoader, { id: "klblogin" }),
              vue.createElementVNode("div", _hoisted_1$e, [
                responseMessage.value ? (vue.openBlock(), vue.createElementBlock("h2", _hoisted_2$e, vue.toDisplayString(responseMessage.value), 1)) : vue.createCommentVNode("v-if", !0),
                responseFields.value.length > 0 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(responseFields.value, (field) => (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                    key: field.label
                  }, [
                    field.type == "label" ? (vue.openBlock(), vue.createElementBlock("h3", {
                      key: 0,
                      class: vue.normalizeClass(["label", field.style == "error" ? "response-error" : ""])
                    }, vue.toDisplayString(field.label), 3)) : vue.createCommentVNode("v-if", !0),
                    field.cat == "input" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                      field.type == "text" || field.type == "password" || field.type == "email" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                        field.name ? (vue.openBlock(), vue.createBlock(FyInput, {
                          key: 0,
                          id: field.name,
                          label: field.label,
                          placeholder: field.name == "name" ? "John Doe" : field.label,
                          error: fieldsError.value[field.name],
                          type: field.type,
                          ref_for: !0,
                          ref_key: "inputs",
                          ref: inputs,
                          modelValue: formData.value[field.name],
                          "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                          req: responseReq.value.includes(field.name)
                        }, null, 8, ["id", "label", "placeholder", "error", "type", "modelValue", "onUpdate:modelValue", "req"])) : vue.createCommentVNode("v-if", !0)
                      ], 64)) : vue.createCommentVNode("v-if", !0)
                    ], 64)) : vue.createCommentVNode("v-if", !0),
                    field.type == "checkbox" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                      field.name ? (vue.openBlock(), vue.createBlock(FyInput, {
                        key: 0,
                        id: field.name,
                        label: field.label,
                        error: fieldsError.value[field.name],
                        type: field.type,
                        "checkbox-value": formData.value[field.name],
                        "onUpdate:checkbox-value": ($event) => formData.value[field.name] = $event,
                        req: responseReq.value.includes(field.name),
                        "link-icon": field.link
                      }, null, 8, ["id", "label", "error", "type", "checkbox-value", "onUpdate:checkbox-value", "req", "link-icon"])) : vue.createCommentVNode("v-if", !0)
                    ], 64)) : vue.createCommentVNode("v-if", !0)
                  ], 64))), 128)),
                  hasOauth.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$d, [
                    (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(responseFields.value, (field) => (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                      key: field.id
                    }, [
                      field.type && field.type == "oauth2" && field.button ? (vue.openBlock(), vue.createElementBlock("a", {
                        key: 0,
                        onClick: () => {
                          userFlow({ initial: !0, oauth: field.id });
                        },
                        href: "javascript:void(0);"
                      }, [
                        (vue.openBlock(), vue.createElementBlock("img", {
                          key: `${field.label}oauth`,
                          class: "oauth-button",
                          alt: field.info.Name,
                          src: field.button.logo,
                          style: vue.normalizeStyle(`background: ${field.button["background-color"]}`)
                        }, null, 12, _hoisted_5$b))
                      ], 8, _hoisted_4$d)) : vue.createCommentVNode("v-if", !0)
                    ], 64))), 128))
                  ])) : vue.createCommentVNode("v-if", !0),
                  responseError.value && responseError.value.token ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$b, vue.toDisplayString(_ctx.$t(responseError.value.token)), 1)) : vue.createCommentVNode("v-if", !0),
                  (responseReq.value.includes("password"), vue.createCommentVNode("v-if", !0)),
                  vue.createElementVNode("button", _hoisted_8$9, vue.toDisplayString(_ctx.$t("cta_login_next")), 1)
                ], 64)) : vue.createCommentVNode("v-if", !0)
              ])
            ], 32)),
            vue.createVNode(_component_FyModal, {
              id: "ResetPassword",
              title: `${_ctx.$t("recover_pwd_title")}`
            }, {
              default: vue.withCtx(() => [
                pwdRecoverMailSent.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$6, vue.toDisplayString(_ctx.$t("pwd_recover_confirm")), 1)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                  vue.createVNode(FyInput, {
                    id: "emailRecover",
                    req: !0,
                    showLabel: !0,
                    placeholder: _ctx.$t("recover_pwd_email_placeholder"),
                    modelValue: state.userEmail,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => state.userEmail = $event),
                    errorVuelidate: vue.unref(v$).userEmail.$errors,
                    type: "email",
                    label: _ctx.$t("recover_pwd_email_label")
                  }, null, 8, ["placeholder", "modelValue", "errorVuelidate", "label"]),
                  pwdRecoverError.value && pwdRecoverError.value.token ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$8, vue.toDisplayString(_ctx.$t(pwdRecoverError.value.token)), 1)) : vue.createCommentVNode("v-if", !0),
                  vue.createElementVNode("a", {
                    href: "javascript:void(0)",
                    onClick: _cache[3] || (_cache[3] = ($event) => forgotPassword()),
                    class: "mt-2 float-right btn px-5 py-2 primary"
                  }, vue.toDisplayString(_ctx.$t("recover_pwd_cta")), 1),
                  _hoisted_10$6
                ], 64))
              ]),
              _: 1
            }, 8, ["title"])
          ])
        ]),
        _: 1
      });
    };
  }
}), KlbLogin = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "KlbLogin.vue"]]);
const _hoisted_1$d = {
  key: 0,
  class: "klb-account"
}, _hoisted_2$d = {
  key: 0,
  class: "input-group"
}, _hoisted_3$c = { class: "label-basic" }, _hoisted_4$c = { class: "input-box-child" }, _hoisted_5$a = { class: "main" }, _hoisted_6$a = ["onSubmit"], _hoisted_7$9 = { class: "klb-account-grid-inputs" }, _hoisted_8$8 = {
  key: 0,
  class: "form-error-label"
}, _hoisted_9$7 = {
  class: "btn-defaults mt-4 btn primary",
  type: "submit"
};
var _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbUpdateEmailModal",
  props: {
    showValueButton: { type: Boolean, default: !0 }
  },
  setup(__props) {
    const eventBus2 = useEventBus(), store = useFVStore(), isAuth = vue.computed(() => store.isAuth), errorOnSubmit = vue.ref(void 0), rules = {
      updateEmail: {
        email: { required: validators.required, email: validators.email },
        pwd: { required: validators.required }
      }
    }, state = vue.reactive({ updateEmail: { email: "", pwd: "" } }), v$ = useVuelidate__default.default(rules, state), changeEmail = async () => {
      if (errorOnSubmit.value = void 0, await v$.value.updateEmail.$validate()) {
        const _updateResult = await rest("User/@:setEmail", "POST", {
          email: state.updateEmail.email,
          current_password: state.updateEmail.pwd
        }).catch((err) => {
          errorOnSubmit.value = err.token;
        });
        _updateResult && _updateResult.result == "success" && (await store.refreshUser(), eventBus2.emit("UpdateEmailModal", !1));
      }
    };
    return (_ctx, _cache) => {
      var _a;
      const _component_FyModal = vue.resolveComponent("FyModal");
      return vue.unref(isAuth) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$d, [
        __props.showValueButton ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$d, [
          vue.createElementVNode("div", _hoisted_3$c, vue.toDisplayString(_ctx.$t("update_email_display_label")), 1),
          vue.createElementVNode("div", _hoisted_4$c, [
            vue.createElementVNode("div", _hoisted_5$a, vue.toDisplayString((_a = vue.unref(store).user) == null ? void 0 : _a.Email), 1),
            vue.createElementVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(eventBus2).emit("UpdateEmailModal", !0)),
              class: "btn primary small"
            }, [
              vue.createVNode(vue.unref(render$5), { class: "edit-icon" }),
              vue.createTextVNode(" " + vue.toDisplayString(_ctx.$t("update_email_display_cta")), 1)
            ])
          ])
        ])) : vue.createCommentVNode("v-if", !0),
        vue.createVNode(_component_FyModal, {
          id: "UpdateEmail",
          title: _ctx.$t("update_email_modal_title")
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("form", {
              onSubmit: vue.withModifiers(changeEmail, ["prevent"])
            }, [
              vue.createElementVNode("div", _hoisted_7$9, [
                vue.createVNode(FyInput, {
                  id: "currPwd",
                  req: !0,
                  showLabel: !0,
                  placeholder: _ctx.$t("update_email_form_pwd_placeholder"),
                  errorVuelidate: vue.unref(v$).updateEmail.pwd.$errors,
                  modelValue: state.updateEmail.pwd,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => state.updateEmail.pwd = $event),
                  label: _ctx.$t("update_email_form_pwd_label"),
                  type: "password",
                  autocomplete: "off"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                vue.createVNode(FyInput, {
                  id: "newEmail",
                  req: !0,
                  showLabel: !0,
                  placeholder: _ctx.$t("update_email_form_email_placeholder"),
                  errorVuelidate: vue.unref(v$).updateEmail.email.$errors,
                  modelValue: state.updateEmail.email,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => state.updateEmail.email = $event),
                  label: _ctx.$t("update_email_form_email_label"),
                  autocomplete: "off",
                  type: "email"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"])
              ]),
              errorOnSubmit.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8$8, vue.toDisplayString(errorOnSubmit.value), 1)) : vue.createCommentVNode("v-if", !0),
              vue.createElementVNode("button", _hoisted_9$7, vue.toDisplayString(_ctx.$t("update_email_cta")), 1)
            ], 40, _hoisted_6$a)
          ]),
          _: 1
        }, 8, ["title"])
      ])) : vue.createCommentVNode("v-if", !0);
    };
  }
}), KlbUpdateEmailModal = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "KlbUpdateEmailModal.vue"]]);
const _hoisted_1$c = {
  key: 0,
  class: "klb-account"
}, _hoisted_2$c = {
  key: 0,
  class: "input-group"
}, _hoisted_3$b = { class: "label-basic" }, _hoisted_4$b = { class: "input-box-child" }, _hoisted_5$9 = ["onSubmit"], _hoisted_6$9 = { class: "klb-account-grid-inputs" }, _hoisted_7$8 = {
  key: 0,
  class: "form-error-label"
}, _hoisted_8$7 = {
  class: "btn-defaults mt-4 btn primary",
  type: "submit"
};
var _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbUpdatePasswordModal",
  props: {
    showValueButton: { type: Boolean, default: !0 }
  },
  setup(__props) {
    const eventBus2 = useEventBus(), store = useFVStore(), isAuth = vue.computed(() => store.isAuth), pwd = vue.ref(), pwdConfirm = vue.ref(), oldPwd = vue.ref(), errorOnSubmit = vue.ref(void 0), rules = {
      oldPwd: { required: validators.required },
      pwd: { required: validators.required },
      pwdConfirm: { req: validators.required, sameAs: validators.sameAs(pwd) }
    }, v$ = useVuelidate__default.default(rules, { oldPwd, pwd, pwdConfirm }), changeEmail = async () => {
      if (errorOnSubmit.value = void 0, await v$.value.$validate()) {
        const _updateResult = await rest("User/@:setPassword", "POST", {
          old_password: oldPwd,
          password: pwd
        }).catch((err) => {
          errorOnSubmit.value = err.token;
        });
        _updateResult && _updateResult.result == "success" && (await store.refreshUser(), eventBus2.emit("updatePwdModal", !1));
      }
    };
    return (_ctx, _cache) => {
      const _component_FyModal = vue.resolveComponent("FyModal");
      return vue.unref(isAuth) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$c, [
        __props.showValueButton ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$c, [
          vue.createElementVNode("div", _hoisted_3$b, vue.toDisplayString(_ctx.$t("update_pwd_display_label")), 1),
          vue.createElementVNode("div", _hoisted_4$b, [
            vue.createElementVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(eventBus2).emit("updatePwdModal", !0)),
              class: "btn primary small"
            }, [
              vue.createVNode(vue.unref(render$5), { class: "edit-icon" }),
              vue.createTextVNode(" " + vue.toDisplayString(_ctx.$t("update_pwd_display_cta")), 1)
            ])
          ])
        ])) : vue.createCommentVNode("v-if", !0),
        vue.createVNode(_component_FyModal, {
          id: "updatePwd",
          title: _ctx.$t("update_pwd_modal_title")
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("form", {
              onSubmit: vue.withModifiers(changeEmail, ["prevent"])
            }, [
              vue.createElementVNode("div", _hoisted_6$9, [
                vue.createVNode(FyInput, {
                  id: "newPwd",
                  req: !0,
                  showLabel: !0,
                  placeholder: _ctx.$t("update_pwd_form_newPwd_placeholder"),
                  errorVuelidate: vue.unref(v$).pwd.$errors,
                  modelValue: pwd.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => pwd.value = $event),
                  label: _ctx.$t("update_pwd_form_newPwd_label"),
                  type: "password",
                  autocomplete: "off"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                vue.createVNode(FyInput, {
                  id: "newPwdConfirm",
                  req: !0,
                  showLabel: !0,
                  placeholder: _ctx.$t("update_pwd_form_pwdConfirm_placeholder"),
                  errorVuelidate: vue.unref(v$).pwdConfirm.$errors,
                  modelValue: pwdConfirm.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => pwdConfirm.value = $event),
                  label: _ctx.$t("update_pwd_form_pwdConfirm_label"),
                  type: "password",
                  autocomplete: "off"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"])
              ]),
              vue.createVNode(FyInput, {
                id: "oldPwd",
                req: !0,
                showLabel: !0,
                placeholder: _ctx.$t("update_pwd_form_oldPwd_placeholder"),
                errorVuelidate: vue.unref(v$).oldPwd.$errors,
                modelValue: oldPwd.value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => oldPwd.value = $event),
                label: _ctx.$t("update_pwd_form_oldPwd_label"),
                type: "password",
                autocomplete: "off"
              }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
              errorOnSubmit.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7$8, vue.toDisplayString(errorOnSubmit.value), 1)) : vue.createCommentVNode("v-if", !0),
              vue.createElementVNode("button", _hoisted_8$7, vue.toDisplayString(_ctx.$t("update_pwd_cta")), 1)
            ], 40, _hoisted_5$9)
          ]),
          _: 1
        }, 8, ["title"])
      ])) : vue.createCommentVNode("v-if", !0);
    };
  }
}), KlbUpdatePasswordModal = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "KlbUpdatePasswordModal.vue"]]);
const _hoisted_1$b = {
  key: 0,
  class: "klb-account"
}, _hoisted_2$b = { class: "input-group" }, _hoisted_3$a = { class: "label-basic" }, _hoisted_4$a = { class: "input-box-child" };
var _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbDeleteAccount",
  props: {
    url: { default: "/login" }
  },
  setup(__props) {
    const store = useFVStore(), isAuth = vue.computed(() => store.isAuth);
    return (_ctx, _cache) => {
      const _component_router_link = vue.resolveComponent("router-link");
      return vue.unref(isAuth) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$b, [
        vue.createElementVNode("div", _hoisted_2$b, [
          vue.createElementVNode("div", _hoisted_3$a, vue.toDisplayString(_ctx.$t("delete_account_display_label")), 1),
          vue.createElementVNode("div", _hoisted_4$a, [
            vue.createVNode(_component_router_link, {
              to: `${__props.url}?act=delete_account`,
              class: "btn primary small"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(render$c), { class: "edit-icon" }),
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.$t("delete_account_display_cta")), 1)
              ]),
              _: 1
            }, 8, ["to"])
          ])
        ])
      ])) : vue.createCommentVNode("v-if", !0);
    };
  }
}), KlbDeleteAccount = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "KlbDeleteAccount.vue"]]);
const _hoisted_1$a = { class: "klb-billing-history" }, _hoisted_2$a = ["href"], _hoisted_3$9 = { class: "billing-history-tag" }, _hoisted_4$9 = { class: "billing-history-tag" }, _hoisted_5$8 = {
  key: 1,
  class: "self-loader-fyvue"
}, _hoisted_6$8 = {
  key: 2,
  class: "no-billing-history"
};
var _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbBillingHistory",
  setup(__props) {
    const store = useFVStore(), isAuth = vue.computed(() => store.isAuth), billingHistory = vue.ref(), getPaymentHistory = async (page = 1) => {
      const _billingHistory = await rest("Order", "GET", {
        page_no: page,
        results_per_page: 10,
        Status: "completed"
      }).catch(() => {
      });
      _billingHistory && _billingHistory.result == "success" && (billingHistory.value = _billingHistory);
    };
    return vue.onMounted(async () => {
      isAuth.value && await getPaymentHistory();
    }), (_ctx, _cache) => {
      var _a;
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$a, [
        billingHistory.value ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          billingHistory.value.paging && billingHistory.value.paging.page_no ? (vue.openBlock(), vue.createBlock(FyPaging, {
            key: 0,
            id: "billingHistory",
            items: billingHistory.value.paging,
            class: "billing-history-paging"
          }, null, 8, ["items"])) : vue.createCommentVNode("v-if", !0),
          vue.createVNode(FyTable, {
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
            Actions_item: vue.withCtx((property) => [
              property.data.item.Invoice_Url ? (vue.openBlock(), vue.createElementBlock("a", {
                key: 0,
                href: property.data.item.Invoice_Url,
                target: "_blank",
                class: "btn neutral download-btn"
              }, [
                vue.createVNode(vue.unref(render$g), {
                  stroke: "currentColor",
                  class: "download-icon"
                }),
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.$t("billing_history_download_cta")), 1)
              ], 8, _hoisted_2$a)) : vue.createCommentVNode("v-if", !0)
            ]),
            Total_item: vue.withCtx((property) => [
              vue.createElementVNode("span", _hoisted_3$9, vue.toDisplayString(property.data.item.Total_Vat.display), 1)
            ]),
            Status_item: vue.withCtx((property) => [
              vue.createElementVNode("span", _hoisted_4$9, vue.toDisplayString(property.data.item.Status), 1)
            ]),
            Invoice_Date_item: vue.withCtx((property) => [
              vue.createTextVNode(vue.toDisplayString(_ctx.$formatDatetime(property.data.item.Invoice_Date.unixms)), 1)
            ]),
            Paid_item: vue.withCtx((property) => [
              vue.createTextVNode(vue.toDisplayString(_ctx.$formatDatetime(property.data.item.Paid.unixms)), 1)
            ]),
            _: 1
          }, 8, ["data", "headers"]),
          billingHistory.value.paging && billingHistory.value.paging.page_no ? (vue.openBlock(), vue.createBlock(FyPaging, {
            key: 1,
            id: "billingHistory",
            items: billingHistory.value.paging,
            class: "billing-history-paging"
          }, null, 8, ["items"])) : vue.createCommentVNode("v-if", !0)
        ], 64)) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$8, [
          vue.createVNode(FyLoader, {
            id: "self-loader-fyvue",
            force: !0,
            size: "6",
            showLoadingText: !1
          })
        ])),
        billingHistory.value && ((_a = billingHistory.value.data) == null ? void 0 : _a.length) == 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$8, vue.toDisplayString(_ctx.$t("billing_history_empty")), 1)) : vue.createCommentVNode("v-if", !0)
      ]);
    };
  }
}), KlbBillingHistory = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "KlbBillingHistory.vue"]]);
const _hoisted_1$9 = { class: "location-select" }, _hoisted_2$9 = { class: "input-group" }, _hoisted_3$8 = {
  key: 0,
  class: "label-basic",
  for: "selectLocation"
}, _hoisted_4$8 = { class: "input-box" }, _hoisted_5$7 = { key: 0 }, _hoisted_6$7 = ["onSubmit"], _hoisted_7$7 = { class: "form-grid" }, _hoisted_8$6 = { class: "input-group" }, _hoisted_9$6 = { class: "mr-4 w-16" }, _hoisted_10$5 = {
  class: "label-basic",
  for: "countryChoice"
}, _hoisted_11$5 = { class: "input-box" }, _hoisted_12$5 = ["value"], _hoisted_13$4 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1), _hoisted_14$4 = { class: "btn-box" }, _hoisted_15$3 = {
  class: "btn-defaults btn primary",
  type: "submit"
}, _hoisted_16$3 = {
  key: 1,
  class: "self-loader-fyvue"
};
var _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbUserLocation",
  props: {
    displayOnly: { type: Boolean, default: !1 },
    locationUuid: null,
    modelValue: null,
    selectedLocation: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props, store = useFVStore(), translate = useTranslation(), isAuth = vue.computed(() => store.isAuth), location = vue.ref(), locationsSelectOptions = vue.ref([]), locations = vue.ref({}), isLoaded = vue.ref(!1), editMode = vue.ref(!1), selectedLocation = vue.ref(), model = vue.computed({
      get: () => props.modelValue,
      set: (items) => {
        emit("update:modelValue", items);
      }
    }), locationWatcher = vue.ref(), state = vue.reactive({
      firstname: "",
      lastname: "",
      country: "",
      zip: ""
    }), v$ = useVuelidate__default.default({
      firstname: { required: validators.required },
      lastname: { required: validators.required },
      country: { required: validators.required },
      zip: { required: validators.required }
    }, state), getUserGeolocation = async () => {
      const _userLoc = await rest(
        "ThirdParty/Geoip:lookup",
        "GET"
      ).catch(() => {
      });
      _userLoc && _userLoc.result == "success" && (state.country = _userLoc.data.country.iso_code);
    }, deleteLocation = async () => {
      var _a;
      await rest(
        `User/Location/${(_a = location.value) == null ? void 0 : _a.User_Location__}`,
        "DELETE",
        {}
      ).catch(() => {
      }), await getUserLocation();
    }, submitLocation = async () => {
      var _a;
      location.value ? (await rest(
        `User/Location/${(_a = location.value) == null ? void 0 : _a.User_Location__}`,
        "PATCH",
        {
          First_Name: state.firstname,
          Last_Name: state.lastname,
          Zip: state.zip,
          Country__: state.country
        }
      ).catch(() => {
      }), editMode.value = !1, await getUserLocation()) : (await rest(
        "User/Location",
        "POST",
        {
          First_Name: state.firstname,
          Last_Name: state.lastname,
          Zip: state.zip,
          Country__: state.country
        }
      ).catch(() => {
      }), editMode.value = !1, await getUserLocation());
    }, getUserLocation = async () => {
      if (state.country = "", state.firstname = "", state.lastname = "", state.zip = "", isAuth.value) {
        const _locations = await rest("User/Location", "GET", {
          sort: "Created"
        }).catch(() => {
        });
        _locations && _locations.result == "success" && (_locations.data.length > 0 ? (location.value = _locations.data[0], props.selectedLocation ? selectedLocation.value = props.selectedLocation : selectedLocation.value = _locations.data[0].User_Location__, locationsSelectOptions.value = [], locations.value = {}, _locations.data.forEach((loc) => {
          locations.value[loc.User_Location__] = loc, locationsSelectOptions.value.push([
            loc.User_Location__,
            loc.Display.join(", ")
          ]);
        }), props.displayOnly || locationsSelectOptions.value.push([
          "new",
          translate("klb_location_new_cta")
        ]), editMode.value = !1) : (locations.value = {}, locationsSelectOptions.value = [], props.displayOnly || (locationsSelectOptions.value.push(["new", "New"]), selectedLocation.value = "new"), editMode.value = !0, state.country || await getUserGeolocation()));
      }
      isLoaded.value = !0;
    };
    return vue.onMounted(async () => {
      isAuth.value && (locationWatcher.value = vue.watch(selectedLocation, async (v) => {
        v == "new" ? (state.firstname = "", state.lastname = "", state.zip = "", state.country = "", editMode.value = !0, location.value = void 0, model.value = void 0, await getUserGeolocation()) : v && locations.value[v] && (location.value = locations.value[v], state.firstname = location.value.First_Name, state.lastname = location.value.Last_Name, state.zip = location.value.Zip ? location.value.Zip : "", state.country = location.value.Country__, model.value = location.value.User_Location__);
      }), await getUserLocation());
    }), vue.onUnmounted(() => {
      locationWatcher.value && locationWatcher.value();
    }), (_ctx, _cache) => {
      const _component_FyInput = vue.resolveComponent("FyInput");
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.unref(isAuth) && isLoaded.value ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(__props.displayOnly ? "" : "card-container card-defaults klb-user-location")
        }, [
          vue.createElementVNode("div", _hoisted_1$9, [
            vue.createElementVNode("div", _hoisted_2$9, [
              __props.displayOnly ? (vue.openBlock(), vue.createElementBlock("label", _hoisted_3$8, vue.toDisplayString(_ctx.$t("klb_user_location_label")), 1)) : vue.createCommentVNode("v-if", !0),
              vue.createElementVNode("div", _hoisted_4$8, [
                vue.createVNode(_component_FyInput, {
                  id: "selectLocation",
                  options: locationsSelectOptions.value,
                  type: "select",
                  modelValue: selectedLocation.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedLocation.value = $event)
                }, null, 8, ["options", "modelValue"])
              ])
            ]),
            __props.displayOnly ? vue.createCommentVNode("v-if", !0) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
              editMode.value == !1 ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                class: "btn primary btn-defaults",
                onClick: _cache[1] || (_cache[1] = ($event) => editMode.value = !0)
              }, vue.toDisplayString(_ctx.$t("klb_edit_location")), 1)) : vue.createCommentVNode("v-if", !0),
              editMode.value == !0 && location.value && selectedLocation.value != "new" ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 1,
                class: "btn danger btn-defaults",
                onClick: _cache[2] || (_cache[2] = ($event) => deleteLocation())
              }, vue.toDisplayString(_ctx.$t("klb_delete_location")), 1)) : vue.createCommentVNode("v-if", !0),
              editMode.value == !0 ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 2,
                class: "btn-defaults btn neutral",
                type: "reset",
                onClick: _cache[3] || (_cache[3] = ($event) => editMode.value = !1)
              }, vue.toDisplayString(_ctx.$t("klb_locations_reset_cta")), 1)) : vue.createCommentVNode("v-if", !0),
              (vue.openBlock(), vue.createElementBlock("button", {
                key: 3,
                class: "btn-defaults btn primary",
                type: "reset",
                onClick: _cache[4] || (_cache[4] = ($event) => selectedLocation.value = "new")
              }, vue.toDisplayString(_ctx.$t("klb_location_new_cta")), 1))
            ], 64))
          ]),
          editMode.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$7, [
            vue.createElementVNode("div", null, [
              vue.createElementVNode("form", {
                onSubmit: vue.withModifiers(submitLocation, ["prevent"])
              }, [
                vue.createElementVNode("div", _hoisted_7$7, [
                  vue.createVNode(_component_FyInput, {
                    id: "billingFirstname",
                    req: !0,
                    showLabel: !0,
                    type: "text",
                    placeholder: _ctx.$t("klb_location_firstname_placeholder"),
                    errorVuelidate: vue.unref(v$).firstname.$errors,
                    modelValue: state.firstname,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => state.firstname = $event),
                    label: _ctx.$t("klb_location_firstname_label")
                  }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                  vue.createVNode(_component_FyInput, {
                    id: "billingLastname",
                    req: !0,
                    type: "text",
                    showLabel: !0,
                    placeholder: _ctx.$t("klb_location_lastname_placeholder"),
                    errorVuelidate: vue.unref(v$).lastname.$errors,
                    modelValue: state.lastname,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => state.lastname = $event),
                    label: _ctx.$t("klb_location_lastname_label")
                  }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                  vue.createVNode(_component_FyInput, {
                    id: "billingZip",
                    req: !0,
                    type: "text",
                    showLabel: !0,
                    placeholder: _ctx.$t("klb_location_zip_placeholder"),
                    errorVuelidate: vue.unref(v$).zip.$errors,
                    modelValue: state.zip,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => state.zip = $event),
                    label: _ctx.$t("klb_location_zip_label")
                  }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                  vue.createElementVNode("div", _hoisted_8$6, [
                    vue.createElementVNode("div", _hoisted_9$6, [
                      vue.createElementVNode("label", _hoisted_10$5, vue.toDisplayString(_ctx.$t("klb_location_country_label")), 1)
                    ]),
                    vue.createElementVNode("div", _hoisted_11$5, [
                      vue.withDirectives(vue.createElementVNode("select", {
                        class: "input-basic",
                        id: "countryChoice",
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => state.country = $event)
                      }, [
                        (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.$countries.countries, (country) => (vue.openBlock(), vue.createElementBlock("option", {
                          value: country.Country__,
                          key: country.Country__
                        }, vue.toDisplayString(country.Name), 9, _hoisted_12$5))), 128))
                      ], 512), [
                        [vue.vModelSelect, state.country]
                      ])
                    ])
                  ])
                ]),
                _hoisted_13$4,
                vue.createElementVNode("div", _hoisted_14$4, [
                  vue.createElementVNode("button", _hoisted_15$3, vue.toDisplayString(_ctx.$t("klb_locations_save_cta")), 1)
                ])
              ], 40, _hoisted_6$7)
            ])
          ])) : vue.createCommentVNode("v-if", !0)
        ], 2)) : vue.createCommentVNode("v-if", !0),
        !isLoaded.value && vue.unref(isAuth) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_16$3, [
          vue.createVNode(FyLoader, {
            id: "self-loader-fyvue",
            force: !0,
            size: "6",
            showLoadingText: !1
          })
        ])) : vue.createCommentVNode("v-if", !0)
      ], 64);
    };
  }
}), KlbUserLocation = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "KlbUserLocation.vue"]]);
function useBilling() {
  return {
    setupPaymentIntent: (method = "Stripe") => new Promise((resolve) => {
      rest("Realm/PaymentMethod:setup", "POST", {
        method
      }).then((_result) => {
        _result && _result.result == "success" ? resolve(_result) : resolve(null);
      }).catch(() => {
        resolve(null);
      });
    }),
    getUserBillingAndLoc: () => new Promise((resolve) => {
      rest("User/Billing", "GET").then((_userBilling) => {
        _userBilling && _userBilling.data && _userBilling.data.length != 0 ? rest(
          `User/Location/${_userBilling.data[0].User_Location__}`,
          "GET"
        ).then((_userLocation) => {
          _userLocation && _userLocation.result == "success" ? resolve({
            location: _userLocation.data,
            billing: _userBilling.data[0]
          }) : resolve(null);
        }).catch(() => {
          resolve(null);
        }) : resolve(null);
      }).catch(() => {
        resolve(null);
      });
    })
  };
}
const _hoisted_1$8 = { key: 0 }, _hoisted_2$8 = ["onSubmit"], _hoisted_3$7 = { class: "form-grid" }, _hoisted_4$7 = { class: "input-group" }, _hoisted_5$6 = {
  class: "label-basic",
  for: "typeDef"
}, _hoisted_6$6 = { class: "input-box" }, _hoisted_7$6 = ["value"], _hoisted_8$5 = { class: "input-group" }, _hoisted_9$5 = {
  class: "label-basic",
  for: "typeDef"
}, _hoisted_10$4 = {
  key: 0,
  class: "response-error"
}, _hoisted_11$4 = { class: "btn-center" }, _hoisted_12$4 = {
  class: "btn primary btn-defaults",
  type: "submit"
};
var _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbAddPaymentMethodModal",
  props: {
    onComplete: { type: Function, default: () => {
    } }
  },
  setup(__props) {
    const props = __props, state = core.useStorage("state-store-klb-addpm", {
      label: "",
      firstname: "",
      lastname: "",
      country: "",
      zip: ""
    }), v$ = useVuelidate__default.default({
      label: { required: validators.required },
      firstname: { required: validators.required },
      lastname: { required: validators.required },
      country: { required: validators.required },
      zip: { required: validators.required }
    }, state), store = useFVStore(), paymentSetupIntent = vue.ref(), isAuth = vue.computed(() => store.isAuth), eventBus2 = useEventBus(), history = useHistory(), stripePayment = vue.ref(), errorMessage = vue.ref();
    let stripe, stripeElements;
    const submitBillingCreate = async () => {
      var _a;
      if (await v$.value.$validate() && (errorMessage.value = void 0, stripe && stripeElements)) {
        eventBus2.emit("modal-add-pm-loading", !0);
        const _stripeResult = await stripe.confirmSetup({
          elements: stripeElements,
          confirmParams: {
            return_url: `${klbfw.getUrl().scheme}://${klbfw.getUrl().host}${history.currentRoute.path}?newMode=1`,
            payment_method_data: {
              billing_details: {
                name: `${state.value.firstname} ${state.value.lastname}`,
                email: (_a = store.user) == null ? void 0 : _a.Email,
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
        _stripeResult.error && (errorMessage.value = _stripeResult.error.message), eventBus2.emit("modal-add-pm-loading", !1);
      }
    }, showAddPaymentMethodModal = async () => {
      var _a;
      eventBus2.emit("AddPaymentMethodModal", !0);
      const _setupIntent = await useBilling().setupPaymentIntent();
      _setupIntent && (paymentSetupIntent.value = _setupIntent, paymentSetupIntent.value.data.Setup.key && (stripe = window.Stripe(paymentSetupIntent.value.data.Setup.key, {
        locale: klbfw.getLocale(),
        stripeAccount: paymentSetupIntent.value.data.Setup.options.stripe_account ? paymentSetupIntent.value.data.Setup.options.stripe_account : void 0
      }))), stripe && (stripeElements = stripe.elements({
        clientSecret: (_a = paymentSetupIntent.value) == null ? void 0 : _a.data.Setup.client_secret
      }), await stripePayment.value, stripeElements.create("payment", {
        fields: {
          billingDetails: {
            address: "never",
            name: "never",
            email: "never"
          }
        }
      }).mount(stripePayment.value));
    };
    return vue.onMounted(async () => {
      if (history.currentRoute.query.setup_intent && history.currentRoute.query.setup_intent_client_secret && state.value && history.currentRoute.query.newMode == "1") {
        eventBus2.emit("modal-add-pm-loading", !0);
        const _result = await rest("User/Billing:create", "POST", {
          Label: state.value.label,
          First_Name: state.value.firstname,
          Last_Name: state.value.lastname,
          Zip: state.value.zip,
          Country__: state.value.country,
          method: "Stripe",
          stripe_intent: history.currentRoute.query.setup_intent
        }).catch((err) => {
          errorMessage.value = err.message, eventBus2.emit("modal-add-pm-loading", !1), history.push(klbfw.getPath());
        });
        _result && _result.result == "success" ? (eventBus2.emit("AddPaymentMethodModal", !1), props.onComplete(_result), state.value = null, history.push(klbfw.getPath())) : errorMessage.value = _result == null ? void 0 : _result.message, eventBus2.emit("modal-add-pm-loading", !1);
      }
      eventBus2.on("ShowAddPaymentMethodModal", showAddPaymentMethodModal);
    }), vue.onUnmounted(() => {
      eventBus2.off("ShowAddPaymentMethodModal", showAddPaymentMethodModal);
    }), head.useHead({
      script: [
        {
          src: "https://js.stripe.com/v3",
          key: "stripe-script"
        }
      ]
    }), (_ctx, _cache) => {
      const _component_FyLoader = vue.resolveComponent("FyLoader"), _component_FyInput = vue.resolveComponent("FyInput");
      return vue.unref(isAuth) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
        vue.createVNode(FyModal, {
          id: "AddPaymentMethod",
          title: _ctx.$t("add_pm_modal_title"),
          class: "klb-add-method"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_FyLoader, {
              id: "modal-add-pm",
              size: "6",
              showLoadingText: !1
            }),
            vue.createElementVNode("form", {
              onSubmit: vue.withModifiers(submitBillingCreate, ["prevent"])
            }, [
              vue.createVNode(_component_FyInput, {
                id: "billingLabel",
                req: !0,
                showLabel: !0,
                placeholder: _ctx.$t("add_pm_label_placeholder"),
                errorVuelidate: vue.unref(v$).label.$errors,
                modelValue: vue.unref(state).label,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(state).label = $event),
                label: _ctx.$t("add_pm_label_label"),
                type: "text"
              }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
              vue.createElementVNode("div", _hoisted_3$7, [
                vue.createVNode(_component_FyInput, {
                  id: "billingFirstname",
                  req: !0,
                  showLabel: !0,
                  placeholder: _ctx.$t("add_pm_firstname_placeholder"),
                  errorVuelidate: vue.unref(v$).firstname.$errors,
                  modelValue: vue.unref(state).firstname,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(state).firstname = $event),
                  label: _ctx.$t("add_pm_firstname_label"),
                  type: "text"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                vue.createVNode(_component_FyInput, {
                  id: "billingLastname",
                  req: !0,
                  showLabel: !0,
                  placeholder: _ctx.$t("add_pm_lastname_placeholder"),
                  errorVuelidate: vue.unref(v$).lastname.$errors,
                  modelValue: vue.unref(state).lastname,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(state).lastname = $event),
                  label: _ctx.$t("add_pm_lastname_label"),
                  type: "text"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                vue.createVNode(_component_FyInput, {
                  id: "billingZip",
                  req: !0,
                  showLabel: !0,
                  placeholder: _ctx.$t("add_pm_zip_placeholder"),
                  errorVuelidate: vue.unref(v$).zip.$errors,
                  modelValue: vue.unref(state).zip,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(state).zip = $event),
                  label: _ctx.$t("add_pm_zip_label"),
                  type: "text"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                vue.createElementVNode("div", _hoisted_4$7, [
                  vue.createElementVNode("label", _hoisted_5$6, vue.toDisplayString(_ctx.$t("add_pm_country_label")), 1),
                  vue.createElementVNode("div", _hoisted_6$6, [
                    vue.withDirectives(vue.createElementVNode("select", {
                      class: "input-basic",
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(state).country = $event)
                    }, [
                      (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.$countries.countries, (country) => (vue.openBlock(), vue.createElementBlock("option", {
                        value: country.Country__,
                        key: country.Country__
                      }, vue.toDisplayString(country.Name), 9, _hoisted_7$6))), 128))
                    ], 512), [
                      [vue.vModelSelect, vue.unref(state).country]
                    ])
                  ])
                ])
              ]),
              vue.createElementVNode("div", _hoisted_8$5, [
                vue.createElementVNode("label", _hoisted_9$5, vue.toDisplayString(_ctx.$t("payment_method_label")), 1),
                vue.createElementVNode("div", {
                  id: "stripePayment",
                  class: "stripePayment",
                  ref_key: "stripePayment",
                  ref: stripePayment
                }, null, 512)
              ]),
              errorMessage.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10$4, vue.toDisplayString(errorMessage.value), 1)) : vue.createCommentVNode("v-if", !0),
              vue.createElementVNode("div", _hoisted_11$4, [
                vue.createElementVNode("button", _hoisted_12$4, vue.toDisplayString(_ctx.$t("create_billing_profile")), 1)
              ])
            ], 40, _hoisted_2$8)
          ]),
          _: 1
        }, 8, ["title"])
      ])) : vue.createCommentVNode("v-if", !0);
    };
  }
}), KlbAddPaymentMethodModal = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "KlbAddPaymentMethodModal.vue"]]);
const _hoisted_1$7 = {
  key: 0,
  class: "card-container card-defaults klb-user-billing"
}, _hoisted_2$7 = ["onSubmit"], _hoisted_3$6 = { class: "input-group" }, _hoisted_4$6 = {
  class: "label-basic",
  for: "typeDef"
}, _hoisted_5$5 = {
  key: 0,
  class: "response-error"
}, _hoisted_6$5 = { class: "btn-center" }, _hoisted_7$5 = {
  class: "btn primary btn-defaults",
  type: "submit"
}, _hoisted_8$4 = { class: "billing-select" }, _hoisted_9$4 = { key: 0 }, _hoisted_10$3 = ["onSubmit"], _hoisted_11$3 = { class: "input-group" }, _hoisted_12$3 = {
  class: "label-basic",
  for: "theCard"
}, _hoisted_13$3 = {
  key: 0,
  class: "card-container billing-method-summary"
}, _hoisted_14$3 = {
  key: 0,
  class: "response-error"
}, _hoisted_15$2 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1), _hoisted_16$2 = { class: "btn-box" }, _hoisted_17$1 = {
  class: "btn-defaults btn primary",
  type: "submit"
}, _hoisted_18$1 = {
  key: 1,
  class: "self-loader-fyvue"
};
var _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbUserBilling",
  props: {
    displayOnly: { type: Boolean, default: !1 },
    locationUuid: null,
    modelValue: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props, store = useFVStore(), history = useHistory(), isAuth = vue.computed(() => store.isAuth), billingProfile = vue.ref(), billingProfileSelectOptions = vue.ref([]), billingProfiles = vue.ref({}), isLoaded = vue.ref(!1), editMode = vue.ref(!1), selectedBillingProfile = vue.ref(), stripeCard = vue.ref(), theCard = vue.ref(), errorMessage = vue.ref(), billingEmpty = vue.ref();
    let stripe, stripeElements;
    const paymentSetupIntent = vue.ref(), stripePayment = vue.ref(), billingWatcher = vue.ref(), model = vue.computed({
      get: () => props.modelValue,
      set: (items) => {
        emit("update:modelValue", items);
      }
    }), state = vue.reactive({
      billingProfile: {
        label: "",
        location: ""
      }
    }), v$ = useVuelidate__default.default({
      billingProfile: {
        label: { required: validators.required },
        location: { required: validators.required }
      }
    }, state), submitBillingEdit = async () => {
      var _a, _b, _c, _d;
      eventBus.emit("modal-edit-pm-loading", !0), errorMessage.value = void 0;
      const _userLocation = await rest(
        `User/Location/${(_a = billingProfile.value) == null ? void 0 : _a.User_Location__}`,
        "GET"
      ).catch(() => {
      });
      if (_userLocation && _userLocation.result == "success" && _userLocation.data) {
        const _stripeResult = await stripe.confirmSetup({
          elements: stripeElements,
          confirmParams: {
            return_url: `${klbfw.getUrl().scheme}://${klbfw.getUrl().host}${history.currentRoute.path}?editMode=1&editUuid=${(_b = billingProfile.value) == null ? void 0 : _b.Methods[0].User_Billing_Method__}&billingProfile=${(_c = billingProfile.value) == null ? void 0 : _c.User_Billing__}`,
            payment_method_data: {
              billing_details: {
                name: `${_userLocation.data.First_Name} ${_userLocation.data.Last_Name}`,
                email: (_d = store.user) == null ? void 0 : _d.Email,
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
        _stripeResult.error && (errorMessage.value = _stripeResult.error.message, eventBus.emit("modal-edit-pm-loading", !1)), eventBus.emit("EditPaymentMethodModal", !1), eventBus.emit("modal-edit-pm-loading", !1);
      }
    }, submitUserBilling = async () => {
      errorMessage.value = void 0, await v$.value.billingProfile.$validate() && billingProfile.value && (await rest(`User/Billing/${billingProfile.value.User_Billing__}`, "PATCH", {
        User_Location__: state.billingProfile.location,
        Label: state.billingProfile.label
      }).catch(() => {
      }), await getUserBilling(), isLoaded.value = !0, editMode.value = !1);
    }, getUserBilling = async () => {
      if (isLoaded.value = !1, isAuth.value) {
        const _billingProfiles = await rest(
          "User/Billing",
          "GET",
          {
            sort: "Created"
          }
        ).catch(() => {
        });
        _billingProfiles && _billingProfiles.result == "success" && (_billingProfiles.data.length > 0 ? (billingProfile.value = _billingProfiles.data[0], selectedBillingProfile.value = _billingProfiles.data[0].User_Billing__, billingProfileSelectOptions.value = [], billingProfiles.value = {}, _billingProfiles.data.forEach((_profile) => {
          billingProfiles.value[_profile.User_Billing__] = _profile, billingProfileSelectOptions.value.push([
            _profile.User_Billing__,
            _profile.Label
          ]);
        }), editMode.value = !1, billingEmpty.value = !1) : (billingProfileSelectOptions.value = [], billingProfiles.value = {}, editMode.value = !1, billingEmpty.value = !0));
      }
      isLoaded.value = !0;
    }, switchToEdit = async () => {
      editMode.value = !0, stripe && (stripeCard.value = stripe.elements().create("card", { hidePostalCode: !0 }), await theCard, stripeCard.value.mount(theCard.value));
    }, openEditModal = async () => {
      var _a;
      eventBus.emit("EditPaymentMethodModal", !0);
      const _setupIntent = await useBilling().setupPaymentIntent();
      _setupIntent && (paymentSetupIntent.value = _setupIntent, paymentSetupIntent.value.data.Setup.key && (stripe = window.Stripe(paymentSetupIntent.value.data.Setup.key, {
        locale: klbfw.getLocale(),
        stripeAccount: paymentSetupIntent.value.data.Setup.options.stripe_account ? paymentSetupIntent.value.data.Setup.options.stripe_account : void 0
      }))), stripe && (stripeElements = stripe.elements({
        clientSecret: (_a = paymentSetupIntent.value) == null ? void 0 : _a.data.Setup.client_secret
      }), await stripePayment.value, stripeElements.create("payment", {
        fields: {
          billingDetails: {
            address: "never",
            name: "never",
            email: "never"
          }
        }
      }).mount(stripePayment.value));
    };
    return vue.onMounted(async () => {
      isAuth.value && (billingWatcher.value = vue.watch(selectedBillingProfile, (v) => {
        v == "new" ? (state.billingProfile.label = "", state.billingProfile.location = "", editMode.value = !0, billingProfile.value = void 0, model.value = void 0) : v && billingProfiles.value[v] && (billingProfile.value = billingProfiles.value[v], state.billingProfile.label = billingProfile.value.Label, state.billingProfile.location = billingProfile.value.User_Location__, model.value = billingProfile.value.User_Billing__);
      }), await getUserBilling(), history.currentRoute.query.setup_intent && history.currentRoute.query.setup_intent_client_secret && history.currentRoute.query.editMode == "1" && history.currentRoute.query.editUuid && history.currentRoute.query.billingProfile && (await rest(
        `User/Billing/Method/${history.currentRoute.query.editUuid}:change`,
        "POST",
        {
          method: "Stripe",
          stripe_intent: history.currentRoute.query.setup_intent
        }
      ).catch(() => {
      }), await getUserBilling(), history.push(
        `${klbfw.getPath()}?billingProfile=${history.currentRoute.query.billingProfile}`
      )), history.currentRoute.query.billingProfile && (selectedBillingProfile.value = history.currentRoute.query.billingProfile, editMode.value = !0));
    }), vue.onUnmounted(() => {
      billingWatcher.value && billingWatcher.value();
    }), head.useHead({
      script: [
        {
          src: "https://js.stripe.com/v3",
          key: "stripe-script"
        }
      ]
    }), (_ctx, _cache) => {
      const _component_FyInput = vue.resolveComponent("FyInput");
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.unref(isAuth) && isLoaded.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$7, [
          vue.createVNode(FyModal, {
            id: "EditPaymentMethod",
            title: _ctx.$t("edit_pm_modal_title"),
            class: "klb-edit-method"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(FyLoader, {
                id: "modal-edit-pm",
                size: "6",
                showLoadingText: !1
              }),
              vue.createElementVNode("form", {
                onSubmit: vue.withModifiers(submitBillingEdit, ["prevent"])
              }, [
                vue.createElementVNode("div", _hoisted_3$6, [
                  vue.createElementVNode("label", _hoisted_4$6, vue.toDisplayString(_ctx.$t("payment_method_label")), 1),
                  vue.createElementVNode("div", {
                    id: "stripePayment",
                    class: "stripePayment",
                    ref_key: "stripePayment",
                    ref: stripePayment
                  }, null, 512)
                ]),
                errorMessage.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$5, vue.toDisplayString(errorMessage.value), 1)) : vue.createCommentVNode("v-if", !0),
                vue.createElementVNode("div", _hoisted_6$5, [
                  vue.createElementVNode("button", _hoisted_7$5, vue.toDisplayString(_ctx.$t("edit_billing_method")), 1)
                ])
              ], 40, _hoisted_2$7)
            ]),
            _: 1
          }, 8, ["title"]),
          vue.createVNode(KlbAddPaymentMethodModal, {
            onComplete: () => {
              getUserBilling();
            }
          }, null, 8, ["onComplete"]),
          vue.createElementVNode("div", _hoisted_8$4, [
            billingEmpty.value ? vue.createCommentVNode("v-if", !0) : (vue.openBlock(), vue.createBlock(_component_FyInput, {
              key: 0,
              id: "selectBillingProfile",
              options: billingProfileSelectOptions.value,
              type: "select",
              modelValue: selectedBillingProfile.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedBillingProfile.value = $event)
            }, null, 8, ["options", "modelValue"])),
            editMode.value == !1 && !billingEmpty.value ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 1,
              class: "btn primary btn-defaults",
              onClick: _cache[1] || (_cache[1] = ($event) => switchToEdit())
            }, vue.toDisplayString(_ctx.$t("klb_edit_billing_profile")), 1)) : vue.createCommentVNode("v-if", !0),
            editMode.value == !0 ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 2,
              class: "btn-defaults btn neutral",
              type: "reset",
              onClick: _cache[2] || (_cache[2] = ($event) => editMode.value = !1)
            }, vue.toDisplayString(_ctx.$t("klb_billing_cancel_save_payment_method")), 1)) : vue.createCommentVNode("v-if", !0),
            editMode.value == !1 ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 3,
              class: "btn-defaults btn primary",
              onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$eventBus.emit("ShowAddPaymentMethodModal", !0))
            }, vue.toDisplayString(_ctx.$t("klb_add_new_billing_profile")), 1)) : vue.createCommentVNode("v-if", !0)
          ]),
          editMode.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$4, [
            vue.createElementVNode("div", null, [
              vue.createElementVNode("form", {
                onSubmit: vue.withModifiers(submitUserBilling, ["prevent"])
              }, [
                vue.createVNode(_component_FyInput, {
                  id: "billingLabel",
                  req: !0,
                  showLabel: !0,
                  placeholder: _ctx.$t("add_pm_label_placeholder"),
                  errorVuelidate: vue.unref(v$).billingProfile.label.$errors,
                  modelValue: state.billingProfile.label,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => state.billingProfile.label = $event),
                  label: _ctx.$t("add_pm_label_label"),
                  type: "text"
                }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
                vue.createElementVNode("div", _hoisted_11$3, [
                  vue.createElementVNode("label", _hoisted_12$3, vue.toDisplayString(_ctx.$t("klb_billing_payment_method_label")), 1),
                  billingProfile.value && billingProfile.value.Methods && billingProfile.value.Methods.length > 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13$3, [
                    vue.createElementVNode("span", null, [
                      vue.createElementVNode("b", null, vue.toDisplayString(_ctx.$t("klb_billing_current_credit_card")), 1),
                      vue.createTextVNode(" " + vue.toDisplayString(_ctx.$t("payment_method_billing")) + ": ", 1),
                      vue.createElementVNode("b", null, vue.toDisplayString(billingProfile.value.Methods[0].Name), 1)
                    ]),
                    vue.createElementVNode("span", null, [
                      vue.createTextVNode(vue.toDisplayString(_ctx.$t("payment_method_exp")) + ": ", 1),
                      vue.createElementVNode("b", null, vue.toDisplayString(billingProfile.value.Methods[0].Expiration), 1)
                    ]),
                    vue.createElementVNode("button", {
                      class: "btn primary btn-defaults",
                      type: "button",
                      onClick: _cache[5] || (_cache[5] = ($event) => openEditModal())
                    }, vue.toDisplayString(_ctx.$t("klb_billing_edit_pm_cta")), 1)
                  ])) : vue.createCommentVNode("v-if", !0)
                ]),
                vue.createVNode(KlbUserLocation, {
                  displayOnly: !0,
                  selectedLocation: state.billingProfile.location,
                  modelValue: state.billingProfile.location,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => state.billingProfile.location = $event)
                }, null, 8, ["selectedLocation", "modelValue"]),
                vue.unref(v$).billingProfile.location.$errors.length > 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_14$3, vue.toDisplayString(_ctx.$t(
                  `vuelidate_validator_${vue.unref(v$).billingProfile.location.$errors[0].$validator.toString()}`
                )), 1)) : vue.createCommentVNode("v-if", !0),
                _hoisted_15$2,
                vue.createElementVNode("div", _hoisted_16$2, [
                  vue.createElementVNode("button", _hoisted_17$1, vue.toDisplayString(_ctx.$t("klb_billing_save_payment_method")), 1)
                ])
              ], 40, _hoisted_10$3)
            ])
          ])) : vue.createCommentVNode("v-if", !0)
        ])) : vue.createCommentVNode("v-if", !0),
        !isLoaded.value && vue.unref(isAuth) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_18$1, [
          vue.createVNode(FyLoader, {
            id: "self-loader-fyvue",
            force: !0,
            size: "6",
            showLoadingText: !1
          })
        ])) : vue.createCommentVNode("v-if", !0)
      ], 64);
    };
  }
}), KlbUserBilling = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "KlbUserBilling.vue"]]);
const _hoisted_1$6 = { class: "klb-product" }, _hoisted_2$6 = {
  key: 0,
  class: "subs"
}, _hoisted_3$5 = { class: "price" }, _hoisted_4$5 = { class: "price" }, _hoisted_5$4 = {
  key: 0,
  class: "cycle"
}, _hoisted_6$4 = ["src"], _hoisted_7$4 = { role: "list" }, _hoisted_8$3 = ["onClick"], _hoisted_9$3 = {
  key: 1,
  class: "shop"
}, _hoisted_10$2 = ["src"], _hoisted_11$2 = { class: "inside" }, _hoisted_12$2 = { class: "price-btn" }, _hoisted_13$2 = {
  key: 0,
  class: "cycle"
}, _hoisted_14$2 = ["onClick"];
var _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbCatalog",
  props: {
    options: { default: () => ({ sort: "Basic.Priority:asc" }) },
    displayType: { default: "subs" },
    features: { default: () => [] },
    startOrderPath: { default: "/user/order/start" },
    productMeta: { default: "" }
  },
  setup(__props) {
    const props = __props, products = vue.ref(), store = useFVStore();
    vue.onMounted(async () => {
      const _products = await rest("Catalog/Product:search", "GET", {
        ...props.options,
        image_variation: [
          "scale_crop=320x160&format=png&alias=shop",
          "scale_crop=320x120&format=png&alias=subs"
        ]
      }).catch(() => {
      });
      _products && _products.result == "success" && (products.value = _products);
    });
    const addProductToCart = async (productUuid) => {
      if (props.displayType == "subs") {
        await useCart().resetCart();
        const _addResult = await useCart().addProduct(
          productUuid,
          props.productMeta
        );
        _addResult && (await store.refreshCartData(_addResult), useHistory().push(props.startOrderPath));
      } else if (props.displayType == "shop") {
        const _addResult = await useCart().addProduct(
          productUuid,
          props.productMeta
        );
        await store.refreshCartData(_addResult);
      }
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [
        products.value && __props.displayType == "subs" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$6, [
          (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList((_a = products.value) == null ? void 0 : _a.data.data, (product) => {
            var _a2, _b2;
            return vue.openBlock(), vue.createElementBlock("div", {
              key: product.Catalog_Product__,
              class: "card-container card-defaults"
            }, [
              vue.createElementVNode("div", null, [
                vue.createElementVNode("h5", null, vue.toDisplayString(product["Basic.Name"]), 1),
                vue.createElementVNode("div", _hoisted_3$5, [
                  vue.createElementVNode("span", _hoisted_4$5, vue.toDisplayString(product.Price.display), 1),
                  product["Basic.ServiceLifetime"] ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$4, "/" + vue.toDisplayString(_ctx.$formatKlbRecurringPaymentCycle(
                    product["Basic.ServiceLifetime"]
                  )), 1)) : vue.createCommentVNode("v-if", !0)
                ]),
                product.Image && product.Image.list && product.Image.list.length > 0 && ((_a2 = product.Image.list[0].Variation) == null ? void 0 : _a2.subs) ? (vue.openBlock(), vue.createElementBlock("img", {
                  key: 0,
                  src: (_b2 = product.Image.list[0].Variation) == null ? void 0 : _b2.subs,
                  class: "product-image"
                }, null, 8, _hoisted_6$4)) : vue.createCommentVNode("v-if", !0),
                vue.createElementVNode("ul", _hoisted_7$4, [
                  vue.renderSlot(_ctx.$slots, product.Catalog_Product__)
                ]),
                vue.createElementVNode("button", {
                  onClick: ($event) => addProductToCart(product.Catalog_Product__),
                  class: "btn primary"
                }, vue.toDisplayString(_ctx.$t("klb_catalog_choose_plan")), 9, _hoisted_8$3)
              ])
            ]);
          }), 128))
        ])) : vue.createCommentVNode("v-if", !0),
        products.value && __props.displayType == "shop" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$3, [
          (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList((_b = products.value) == null ? void 0 : _b.data.data, (product) => {
            var _a2, _b2;
            return vue.openBlock(), vue.createElementBlock("div", {
              key: product.Catalog_Product__,
              class: "card-container card-defaults"
            }, [
              product.Image && product.Image.list && product.Image.list.length > 0 && ((_a2 = product.Image.list[0].Variation) == null ? void 0 : _a2.shop) ? (vue.openBlock(), vue.createElementBlock("img", {
                key: 0,
                src: (_b2 = product.Image.list[0].Variation) == null ? void 0 : _b2.shop,
                class: "product-image"
              }, null, 8, _hoisted_10$2)) : vue.createCommentVNode("v-if", !0),
              vue.createElementVNode("div", _hoisted_11$2, [
                vue.createElementVNode("h5", null, vue.toDisplayString(product["Basic.Name"]), 1),
                vue.renderSlot(_ctx.$slots, product.Catalog_Product__),
                vue.createElementVNode("div", _hoisted_12$2, [
                  vue.createElementVNode("span", null, [
                    vue.createTextVNode(vue.toDisplayString(product.Price.display) + " ", 1),
                    product["Basic.ServiceLifetime"] ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_13$2, "/" + vue.toDisplayString(_ctx.$formatKlbRecurringPaymentCycle(
                      product["Basic.ServiceLifetime"]
                    )), 1)) : vue.createCommentVNode("v-if", !0)
                  ]),
                  vue.createElementVNode("button", {
                    class: "btn primary btn-defaults",
                    onClick: ($event) => addProductToCart(product.Catalog_Product__)
                  }, vue.toDisplayString(_ctx.$t("klb_catalog_add_to_cart")), 9, _hoisted_14$2)
                ])
              ])
            ]);
          }), 128))
        ])) : vue.createCommentVNode("v-if", !0)
      ]);
    };
  }
}), KlbCatalog = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "KlbCatalog.vue"]]);
function useOrder() {
  return {
    process(data, orderUuid) {
      return rest(
        `Order/${orderUuid}:process`,
        "POST",
        data
      );
    },
    getOrder(orderUuid) {
      return rest(`Order/${orderUuid}`, "GET");
    },
    getOrders() {
      return rest("Order/", "GET");
    },
    getLastUnfinishedOrder() {
      return new Promise((resolve) => {
        rest("Order/", "GET", {
          results_per_page: 1,
          sort: "Created",
          Status: "pending"
        }).then((_result) => {
          _result && _result.result == "success" && _result.data.length > 0 && resolve(_result.data[0]), resolve(null);
        }).catch(() => {
          resolve(null);
        });
      });
    }
  };
}
const _hoisted_1$5 = { class: "klb-order-internal" }, _hoisted_2$5 = ["onSubmit"], _hoisted_3$4 = {
  key: 0,
  class: "input-group"
}, _hoisted_4$4 = {
  class: "label-basic",
  for: "stripeElementsRef"
}, _hoisted_5$3 = {
  key: 4,
  class: "response-error"
}, _hoisted_6$3 = { class: "klb-order-button" }, _hoisted_7$3 = { class: "btn primary btn-defaults" };
var _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbProcessOrderInternal",
  props: {
    orderUuid: null
  },
  setup(__props) {
    const props = __props;
    let stripe, stripeElements;
    head.useHead({
      script: [
        {
          src: "https://js.stripe.com/v3",
          key: "stripe-script"
        }
      ]
    });
    const currentMethod = vue.ref(), stripeElementsRef = vue.ref(), history = useHistory(), eventBus2 = useEventBus(), store = useFVStore(), session = vue.ref(), errorMessage = vue.ref(), order = vue.ref(), formData = vue.reactive({}), process = vue.ref(), onFileSelectOptions = vue.ref([]), selectedOnFile = vue.ref(), isAuth = vue.computed(() => store.isAuth), internalWatcher = vue.ref(), processOrder = async () => {
      var _a;
      if (eventBus2.emit("klb-order-loading", !0), errorMessage.value = void 0, currentMethod.value == "Stripe" && process.value) {
        const _stripeResult = await stripe.confirmPayment({
          elements: stripeElements,
          confirmParams: {
            return_url: `${klbfw.getUrl().scheme}://${klbfw.getUrl().host}${history.currentRoute.path}?Order__=${props.orderUuid}&session=${session.value}`,
            payment_method_data: {
              billing_details: {
                name: `${process.value.order.Billing_User_Location.First_Name} ${process.value.order.Billing_User_Location.Last_Name}`,
                email: (_a = store.user) == null ? void 0 : _a.Email,
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
        _stripeResult.error && (errorMessage.value = _stripeResult.error.message);
      } else if (currentMethod.value == "Free") {
        const data = { ...formData };
        data.session = session.value, data.method = currentMethod.value;
        const _process = await useOrder().process(data, props.orderUuid).catch((err) => {
          errorMessage.value = err.message;
        });
        errorMessage.value ? await getOrderProcess() : await getOrderProcess(_process);
      } else if (currentMethod.value == "OnFile") {
        const data = { ...formData };
        data.session = session.value, data.method = currentMethod.value, data.user_billing = selectedOnFile.value;
        const _process = await useOrder().process(data, props.orderUuid).catch((err) => {
          errorMessage.value = err.message;
        });
        errorMessage.value ? await getOrderProcess() : await getOrderProcess(_process);
      }
      eventBus2.emit("klb-order-loading", !1);
    }, activatePM = async (method) => {
      var _a, _b, _c, _d, _e, _f;
      if (eventBus2.emit("klb-order-loading", !0), process.value)
        if (method == "Stripe") {
          currentMethod.value = method;
          const _ccToken = process.value.methods[method].fields.cc_token;
          _ccToken.attributes && _ccToken.attributes.key && (stripe = window.Stripe((_a = _ccToken.attributes) == null ? void 0 : _a.key, {
            locale: klbfw.getLocale(),
            stripeAccount: (_b = _ccToken.attributes.options) == null ? void 0 : _b.stripe_account
          })), session.value = process.value.methods[method].session, stripe && (await stripeElementsRef.value, (_d = (_c = process.value.methods[method].fields.stripe_intent) == null ? void 0 : _c.attributes) != null && _d.client_secret && (stripeElements = stripe.elements({
            clientSecret: (_f = (_e = process.value.methods[method].fields.stripe_intent) == null ? void 0 : _e.attributes) == null ? void 0 : _f.client_secret
          }), stripeElementsRef.value && stripeElements.create("payment", {
            fields: {
              billingDetails: {
                address: "never",
                name: "never",
                email: "never"
              }
            }
          }).mount(stripeElementsRef.value)));
        } else if (method == "OnFile") {
          currentMethod.value = method, session.value = process.value.methods[method].session, onFileSelectOptions.value = [];
          const _userBilling = process.value.methods[method].fields.user_billing.values;
          if (_userBilling) {
            let i = 0;
            for (const userBilling of _userBilling) {
              i == 0 && (selectedOnFile.value = userBilling.User_Billing__);
              const displayUserBilling = `${userBilling.Label}`;
              onFileSelectOptions.value.push([
                userBilling.User_Billing__,
                displayUserBilling
              ]), i++;
            }
          }
        } else
          method == "Free" && (currentMethod.value = method, session.value = process.value.methods[method].session);
      eventBus2.emit("klb-order-loading", !1);
    }, getOrderProcess = async (__process = void 0) => {
      eventBus2.emit("klb-order-loading", !0);
      let processParams = null;
      useHistory().currentRoute.query.payment_intent && (processParams = { stripe_intent: 1 });
      const _process = __process || await useOrder().process(processParams, props.orderUuid).catch(() => {
      });
      if (_process && _process.result == "success") {
        process.value = _process.data, order.value = process.value.order;
        for (const method of process.value.methods_order)
          if (["Free", "Stripe", "OnFile"].includes(method)) {
            currentMethod.value = method;
            break;
          }
        currentMethod.value && await activatePM(currentMethod.value);
      }
      eventBus2.emit("klb-order-loading", !1);
    };
    return vue.onMounted(async () => {
      if (internalWatcher.value = vue.watch(formData, async (v) => {
        var _a, _b, _c;
        if (v.cc_remember && isAuth.value && currentMethod.value && (((_a = order.value) == null ? void 0 : _a.Flags.autorenew_record) == !0 && v.cc_remember == "0" || (!((_b = order.value) != null && _b.Flags.autorenew_record) || ((_c = order.value) == null ? void 0 : _c.Flags.autorenew_record) == !1) && v.cc_remember == "1")) {
          const _process = await useOrder().process(
            {
              cc_remember: v.cc_remember,
              session: session.value,
              method: currentMethod.value,
              stripe_intent: 1
            },
            props.orderUuid
          );
          _process && _process.result == "success" && (process.value = _process.data, order.value = process.value.order, session.value = process.value.methods[currentMethod.value].session);
        }
      }), history.currentRoute.query.payment_intent && history.currentRoute.query.payment_intent_client_secret && history.currentRoute.query.session) {
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
        errorMessage.value ? await getOrderProcess() : await getOrderProcess(_process), await store.refreshCart(), history.push(`${klbfw.getPath()}?Order__=${props.orderUuid}`);
      } else
        await getOrderProcess();
    }), vue.onUnmounted(() => {
      internalWatcher.value && internalWatcher.value();
    }), (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
      vue.createVNode(FyLoader, { id: "klb-order" }),
      process.value ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
        vue.createElementVNode("form", {
          onSubmit: vue.withModifiers(processOrder, ["prevent"])
        }, [
          process.value.order_payable ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            currentMethod.value == "Stripe" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$4, [
              vue.createElementVNode("label", _hoisted_4$4, vue.toDisplayString(_ctx.$t("klb_order_payment_card_label")), 1),
              vue.createElementVNode("div", {
                id: "stripeElementsRef",
                class: "stripeElements",
                ref_key: "stripeElementsRef",
                ref: stripeElementsRef
              }, null, 512)
            ])) : vue.createCommentVNode("v-if", !0),
            currentMethod.value == "Free" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [], 64)) : vue.createCommentVNode("v-if", !0),
            currentMethod.value == "OnFile" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
              vue.createVNode(FyInput, {
                id: "selectLocation",
                options: onFileSelectOptions.value,
                type: "select",
                modelValue: selectedOnFile.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedOnFile.value = $event)
              }, null, 8, ["options", "modelValue"]),
              process.value.methods_order.includes("Stripe") ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                onClick: _cache[1] || (_cache[1] = ($event) => activatePM("Stripe")),
                type: "button",
                class: "klb-switch-method"
              }, vue.toDisplayString(_ctx.$t("klb_order_option_stripe")), 1)) : vue.createCommentVNode("v-if", !0)
            ], 64)) : vue.createCommentVNode("v-if", !0),
            currentMethod.value ? (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, { key: 3 }, vue.renderList(process.value.methods[currentMethod.value].fields, (field, key) => (vue.openBlock(), vue.createElementBlock("div", {
              key: `field_method_${key}`
            }, [
              (field.type == "input" || field.type == "password" || field.type == "email" || field.type == "checkbox") && field.caption ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                field.type == "checkbox" ? (vue.openBlock(), vue.createBlock(FyInput, {
                  key: 0,
                  placeholder: _ctx.$t(field.caption),
                  type: field.type,
                  label: _ctx.$t(field.caption),
                  checkboxValue: formData[key],
                  "onUpdate:checkboxValue": ($event) => formData[key] = $event,
                  id: `form_${key}`,
                  checkboxTrueValue: "1",
                  checkboxFalseValue: "0"
                }, null, 8, ["placeholder", "type", "label", "checkboxValue", "onUpdate:checkboxValue", "id"])) : (vue.openBlock(), vue.createBlock(FyInput, {
                  key: 1,
                  placeholder: _ctx.$t(field.caption),
                  type: field.type,
                  label: _ctx.$t(field.caption),
                  modelValue: formData[key],
                  "onUpdate:modelValue": ($event) => formData[key] = $event,
                  id: `form_${key}`
                }, null, 8, ["placeholder", "type", "label", "modelValue", "onUpdate:modelValue", "id"]))
              ], 64)) : vue.createCommentVNode("v-if", !0)
            ]))), 128)) : vue.createCommentVNode("v-if", !0),
            errorMessage.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$3, vue.toDisplayString(errorMessage.value), 1)) : vue.createCommentVNode("v-if", !0),
            vue.createElementVNode("div", _hoisted_6$3, [
              vue.createElementVNode("button", _hoisted_7$3, vue.toDisplayString(_ctx.$t("klb_order_process_cta")), 1)
            ])
          ], 64)) : vue.createCommentVNode("v-if", !0)
        ], 40, _hoisted_2$5),
        process.value.order_payable == !1 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          process.value.order.Paid ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.createTextVNode(vue.toDisplayString(_ctx.$t("klb_order_paid_text", {
              date: _ctx.$formatDatetime(process.value.order.Paid.unixms)
            })), 1)
          ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createTextVNode(vue.toDisplayString(_ctx.$t("klb_order_non_payable")), 1)
          ], 64))
        ], 64)) : vue.createCommentVNode("v-if", !0)
      ], 64)) : vue.createCommentVNode("v-if", !0)
    ]));
  }
}), KlbProcessOrderInternal = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "KlbProcessOrderInternal.vue"]]);
const _hoisted_1$4 = {
  key: 0,
  class: "klb-order"
}, _hoisted_2$4 = {
  key: 0,
  class: "card-container card-defaults"
}, _hoisted_3$3 = {
  key: 0,
  class: "fv-typo mb-2"
}, _hoisted_4$3 = { class: "cart-summary" }, _hoisted_5$2 = { class: "price" }, _hoisted_6$2 = {
  key: 0,
  class: "cycle"
}, _hoisted_7$2 = ["onClick"], _hoisted_8$2 = {
  key: 0,
  class: "cart-summary is-desc"
}, _hoisted_9$2 = {
  key: 1,
  class: "cart-summary is-tax"
}, _hoisted_10$1 = { class: "price" }, _hoisted_11$1 = { class: "cart-total" }, _hoisted_12$1 = {
  key: 0,
  class: "cart-summary"
}, _hoisted_13$1 = { class: "price" }, _hoisted_14$1 = { class: "cart-summary vat" }, _hoisted_15$1 = { class: "price" }, _hoisted_16$1 = { class: "cart-summary vat" }, _hoisted_17 = { class: "price" }, _hoisted_18 = { class: "cart-summary total" }, _hoisted_19 = { class: "price" }, _hoisted_20 = {
  key: 1,
  class: "card-container card-defaults"
}, _hoisted_21 = { class: "cart-summary" }, _hoisted_22 = { class: "price" }, _hoisted_23 = {
  key: 0,
  class: "cycle"
}, _hoisted_24 = {
  key: 0,
  class: "cart-summary is-desc"
}, _hoisted_25 = {
  key: 1,
  class: "cart-summary is-desc"
}, _hoisted_26 = { class: "fv-tag" }, _hoisted_27 = {
  key: 2,
  class: "cart-summary is-tax"
}, _hoisted_28 = { class: "price" }, _hoisted_29 = { class: "cart-total" }, _hoisted_30 = {
  key: 0,
  class: "cart-summary"
}, _hoisted_31 = { class: "price" }, _hoisted_32 = { class: "cart-summary vat" }, _hoisted_33 = { class: "price" }, _hoisted_34 = { class: "cart-summary vat" }, _hoisted_35 = { class: "price" }, _hoisted_36 = { class: "cart-summary total" }, _hoisted_37 = { class: "price" }, _hoisted_38 = { class: "mt-4" }, _hoisted_39 = {
  key: 1,
  class: "card-container card-defaults fv-typo"
}, _hoisted_40 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1), _hoisted_41 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1), _hoisted_42 = { key: 1 }, _hoisted_43 = {
  key: 2,
  class: "response-error"
}, _hoisted_44 = { class: "mt-4 flex items-center justify-center" }, _hoisted_45 = { key: 2 };
var _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbOrder",
  props: {
    shopPath: { default: "/shop" },
    mode: { default: "b2c" },
    loginPath: { default: "/login" }
  },
  setup(__props) {
    const cart = vue.ref(), store = useFVStore(), router = vueRouter.useRouter(), route = vueRouter.useRoute(), routeOrderUuid = vue.computed(() => route.query.Order__), translate = useTranslation(), isAuth = vue.computed(() => store.isAuth), isReady = vue.ref(!1), error = vue.ref(), hasOrder = vue.ref(), eventBus2 = useEventBus(), orderWatcher = vue.ref(), state = vue.reactive({
      location: void 0
    }), delProduct = async (productUuid) => {
      eventBus2.emit("klb-order-main-loading", !0), await useCart().delProduct(productUuid) && (cart.value = await useCart().getCart(), await store.refreshCart()), eventBus2.emit("klb-order-main-loading", !1);
    }, createOrder = async () => {
      if (eventBus2.emit("klb-order-main-loading", !0), error.value = void 0, !state.location) {
        error.value = translate("klb_error_order_create_location_empty");
        return;
      }
      const _result = await useCart().createOrder({
        User_Location__: state.location
      }).catch((err) => {
        error.value = err.error;
      });
      _result && _result.result == "success" && (hasOrder.value = _result.data, router.push({
        path: router.currentRoute.value.path,
        query: { Order__: hasOrder.value.Order__ }
      })), await store.refreshCart(), eventBus2.emit("klb-order-main-loading", !1);
    };
    vue.onMounted(async () => {
      if (eventBus2.emit("klb-order-main-loading", !0), orderWatcher.value = vue.watch(routeOrderUuid, async (v) => {
        if (v) {
          const _order = await useOrder().getOrder(v.toString()).catch(() => {
          });
          _order && _order.result == "success" && (hasOrder.value = _order.data);
        } else
          hasOrder.value = void 0;
      }), !routeOrderUuid.value)
        route.query.product && await addProductToCart(route.query.product.toString()), cart.value = await useCart().getCart();
      else {
        const _order = await useOrder().getOrder(routeOrderUuid.value.toString()).catch(() => {
        });
        _order && _order.result == "success" && (hasOrder.value = _order.data);
      }
      isReady.value = !0, eventBus2.emit("klb-order-main-loading", !1);
    });
    const addProductToCart = async (productData) => {
      await useCart().resetCart();
      const _addResult = await useCart().addProduct(productData, "");
      _addResult && await store.refreshCartData(_addResult);
    };
    return vue.onUnmounted(() => {
      orderWatcher.value && orderWatcher.value();
    }), (_ctx, _cache) => {
      var _a;
      const _component_router_link = vue.resolveComponent("router-link");
      return isReady.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
        vue.createVNode(FyLoader, { id: "klb-order-main" }),
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.$t("klb_order_cart_summary")), 1),
        cart.value && !hasOrder.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$4, [
          cart.value.data.products.length == 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$3, [
            vue.createElementVNode("p", null, vue.toDisplayString(_ctx.$t("klb_order_cart_is_empty")), 1)
          ])) : vue.createCommentVNode("v-if", !0),
          (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(cart.value.data.products, (product) => (vue.openBlock(), vue.createElementBlock("div", {
            key: `cart_summary_${product.data.Catalog_Product__}`,
            class: "cart-product"
          }, [
            vue.createElementVNode("div", _hoisted_4$3, [
              vue.createElementVNode("h3", null, vue.toDisplayString(product.data["Basic.Name"]), 1),
              vue.createElementVNode("div", _hoisted_5$2, [
                vue.createTextVNode(vue.toDisplayString(__props.mode == "b2c" ? product.data.Price.tax.display : product.data.Price.raw.display) + " ", 1),
                product.data["Basic.ServiceLifetime"] ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_6$2, "/" + vue.toDisplayString(_ctx.$formatKlbRecurringPaymentCycle(
                  product.data["Basic.ServiceLifetime"]
                )), 1)) : vue.createCommentVNode("v-if", !0),
                vue.createElementVNode("button", {
                  class: "btn danger trash-icon",
                  onClick: ($event) => delProduct(product.key)
                }, [
                  vue.createVNode(vue.unref(render$1))
                ], 8, _hoisted_7$2)
              ])
            ]),
            product.meta.description ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8$2, vue.toDisplayString(product.meta.description), 1)) : vue.createCommentVNode("v-if", !0),
            __props.mode == "b2b" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$2, [
              vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.$t("klb_order_cart_vat")) + " (" + vue.toDisplayString(product.data.Price.tax_rate) + "%) ", 1),
              vue.createElementVNode("div", _hoisted_10$1, vue.toDisplayString(product.data.Price.tax_only.display), 1)
            ])) : vue.createCommentVNode("v-if", !0)
          ]))), 128)),
          vue.createElementVNode("div", _hoisted_11$1, [
            __props.mode == "b2c" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12$1, [
              vue.createElementVNode("h3", null, [
                vue.createTextVNode(vue.toDisplayString(_ctx.$t("klb_order_cart_total")) + " ", 1),
                vue.createElementVNode("small", null, "(" + vue.toDisplayString(_ctx.$t("klb_order_tv_included", {
                  val: cart.value.data.total_vat_only.display
                })) + ")", 1)
              ]),
              vue.createElementVNode("div", _hoisted_13$1, [
                vue.createElementVNode("b", null, vue.toDisplayString(cart.value.data.total_vat.display), 1)
              ])
            ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
              vue.createElementVNode("div", _hoisted_14$1, [
                vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.$t("klb_order_cart_total_products")), 1),
                vue.createElementVNode("div", _hoisted_15$1, [
                  vue.createElementVNode("b", null, vue.toDisplayString(cart.value.data.total.display), 1)
                ])
              ]),
              vue.createElementVNode("div", _hoisted_16$1, [
                vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.$t("klb_order_cart_total_taxes")), 1),
                vue.createElementVNode("div", _hoisted_17, [
                  vue.createElementVNode("b", null, vue.toDisplayString(cart.value.data.total_vat_only.display), 1)
                ])
              ]),
              vue.createElementVNode("div", _hoisted_18, [
                vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.$t("klb_order_cart_total")), 1),
                vue.createElementVNode("div", _hoisted_19, [
                  vue.createElementVNode("b", null, vue.toDisplayString(cart.value.data.total_vat.display), 1)
                ])
              ])
            ], 64))
          ])
        ])) : vue.createCommentVNode("v-if", !0),
        hasOrder.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_20, [
          (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(hasOrder.value.Items, (product) => (vue.openBlock(), vue.createElementBlock("div", {
            key: `cart_summary_${product.Catalog_Product.Catalog_Product__}`,
            class: "cart-product"
          }, [
            vue.createElementVNode("div", _hoisted_21, [
              vue.createElementVNode("h3", null, vue.toDisplayString(product.Catalog_Product["Basic.Name"]), 1),
              vue.createElementVNode("div", _hoisted_22, [
                vue.createTextVNode(vue.toDisplayString(__props.mode == "b2c" ? product.Catalog_Product.Price.tax.display : product.Catalog_Product.Price.raw.display) + " ", 1),
                product.Catalog_Product["Basic.ServiceLifetime"] ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_23, "/" + vue.toDisplayString(_ctx.$formatKlbRecurringPaymentCycle(
                  product.Catalog_Product["Basic.ServiceLifetime"]
                )), 1)) : vue.createCommentVNode("v-if", !0)
              ])
            ]),
            product.Catalog_Product["Meta.description"] ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_24, [
              vue.createTextVNode(vue.toDisplayString(_ctx.$t("klb_product_description_label")) + " ", 1),
              vue.createElementVNode("span", null, vue.toDisplayString(product.Catalog_Product["Meta.description"]), 1)
            ])) : vue.createCommentVNode("v-if", !0),
            product.Status ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_25, [
              vue.createTextVNode(vue.toDisplayString(_ctx.$t("klb_product_status")) + " ", 1),
              vue.createElementVNode("span", _hoisted_26, vue.toDisplayString(_ctx.$t(`klb_product_status_${product.Status.replace("-", "_")}`)), 1)
            ])) : vue.createCommentVNode("v-if", !0),
            __props.mode == "b2b" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_27, [
              vue.createElementVNode("span", null, vue.toDisplayString(_ctx.$t("klb_order_cart_vat")) + " (" + vue.toDisplayString(product.Catalog_Product.Price.tax_rate) + "%) ", 1),
              vue.createElementVNode("div", _hoisted_28, vue.toDisplayString(product.Catalog_Product.Price.tax_only.display), 1)
            ])) : vue.createCommentVNode("v-if", !0)
          ]))), 128)),
          vue.createElementVNode("div", _hoisted_29, [
            __props.mode == "b2c" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_30, [
              vue.createElementVNode("h3", null, [
                vue.createTextVNode(vue.toDisplayString(_ctx.$t("klb_order_cart_total")) + " ", 1),
                vue.createElementVNode("small", null, "(" + vue.toDisplayString(_ctx.$t("klb_order_tv_included", {
                  val: hasOrder.value.Vat_Amount.display
                })) + ")", 1)
              ]),
              vue.createElementVNode("div", _hoisted_31, [
                vue.createElementVNode("b", null, vue.toDisplayString(hasOrder.value.Total_Vat.display), 1)
              ])
            ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
              vue.createElementVNode("div", _hoisted_32, [
                vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.$t("klb_order_cart_total_products")), 1),
                vue.createElementVNode("div", _hoisted_33, [
                  vue.createElementVNode("b", null, vue.toDisplayString(hasOrder.value.Total.display), 1)
                ])
              ]),
              vue.createElementVNode("div", _hoisted_34, [
                vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.$t("klb_order_cart_total_taxes")), 1),
                vue.createElementVNode("div", _hoisted_35, [
                  vue.createElementVNode("b", null, vue.toDisplayString(hasOrder.value.Vat_Amount.display), 1)
                ])
              ]),
              vue.createElementVNode("div", _hoisted_36, [
                vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.$t("klb_order_cart_total")), 1),
                vue.createElementVNode("div", _hoisted_37, [
                  vue.createElementVNode("b", null, vue.toDisplayString(hasOrder.value.Total_Vat.display), 1)
                ])
              ])
            ], 64))
          ])
        ])) : vue.createCommentVNode("v-if", !0),
        vue.createElementVNode("div", _hoisted_38, [
          vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.$t("klb_order_billing_location")), 1),
          hasOrder.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_42, vue.toDisplayString(hasOrder.value.Billing_User_Location.Display.join(", ")), 1)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.unref(isAuth) ? (vue.openBlock(), vue.createBlock(KlbUserLocation, {
              key: 0,
              modelValue: state.location,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.location = $event)
            }, null, 8, ["modelValue"])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_39, [
              vue.createTextVNode(vue.toDisplayString(_ctx.$t("klb_order_you_need_to_be_logged_in")) + " ", 1),
              _hoisted_40,
              _hoisted_41,
              vue.createVNode(_component_router_link, {
                to: `${__props.loginPath}?return_to=${_ctx.$route.path}`,
                class: "btn primary btn-defaults"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.$t("klb_login_cta")), 1)
                ]),
                _: 1
              }, 8, ["to"])
            ]))
          ], 64)),
          error.value ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_43, vue.toDisplayString(error.value), 1)) : vue.createCommentVNode("v-if", !0),
          vue.createElementVNode("div", _hoisted_44, [
            hasOrder.value ? vue.createCommentVNode("v-if", !0) : (vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              onClick: _cache[1] || (_cache[1] = ($event) => createOrder()),
              class: "btn primary btn-defaults big"
            }, vue.toDisplayString(_ctx.$t("klb_order_create_cta")), 1))
          ])
        ]),
        vue.unref(routeOrderUuid) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_45, [
          vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.$t("klb_order_process")), 1),
          vue.createVNode(KlbProcessOrderInternal, {
            orderUuid: (_a = vue.unref(routeOrderUuid)) == null ? void 0 : _a.toString()
          }, null, 8, ["orderUuid"])
        ])) : vue.createCommentVNode("v-if", !0)
      ])) : vue.createCommentVNode("v-if", !0);
    };
  }
}), KlbOrder = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "KlbOrder.vue"]]);
const _hoisted_1$3 = {
  key: 1,
  class: "entry-header"
}, _hoisted_2$3 = {
  key: 0,
  class: "post-thumbnail"
}, _hoisted_3$2 = ["src", "title", "alt"], _hoisted_4$2 = { class: "h1-bg dark" }, _hoisted_5$1 = { class: "entry-main" }, _hoisted_6$1 = { class: "entry-content" }, _hoisted_7$1 = ["innerHTML"], _hoisted_8$1 = { key: 0 }, _hoisted_9$1 = {
  key: 0,
  class: "entry-footer"
}, _hoisted_11 = { class: "published" }, _hoisted_12 = ["datetime"], _hoisted_13 = {
  key: 1,
  class: "category"
}, _hoisted_14 = {
  key: 2,
  class: "category"
}, _hoisted_15 = { class: "modified" }, _hoisted_16 = ["datetime"];
var _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbBlogInnerPost",
  props: {
    post: null,
    single: { type: Boolean, default: !0 },
    basePath: { default: "/blog" },
    breadcrumbBase: { default: () => [] },
    cms: null,
    showFooter: { type: Boolean, default: !0 },
    isPage: { type: Boolean, default: !1 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      const _component_RouterLink = vue.resolveComponent("RouterLink"), _component_router_link = vue.resolveComponent("router-link");
      return vue.openBlock(), vue.createElementBlock("section", null, [
        __props.post ? (vue.openBlock(), vue.createElementBlock("article", {
          key: 0,
          class: vue.normalizeClass(__props.single ? "is-single" : "is-multiple")
        }, [
          __props.single ? (vue.openBlock(), vue.createBlock(vue.unref(runtime.SchemaOrgArticle), {
            key: 0,
            headline: __props.post.Title,
            "date-published": new Date(parseInt(__props.post.Published.unixms)).toISOString(),
            "date-modified": new Date(parseInt(__props.post.Last_Modified.unixms)).toISOString(),
            description: __props.post.Short_Contents ? __props.post.Short_Contents : void 0,
            image: __props.post.Top_Drive_Item && __props.post.Top_Drive_Item.Media_Image && ((_a = __props.post.Top_Drive_Item.Media_Image) == null ? void 0 : _a.Variation) ? (_b = __props.post.Top_Drive_Item.Media_Image) == null ? void 0 : _b.Variation.banner : void 0
          }, null, 8, ["headline", "date-published", "date-modified", "description", "image"])) : vue.createCommentVNode("v-if", !0),
          __props.single ? (vue.openBlock(), vue.createElementBlock("header", {
            key: 2,
            class: vue.normalizeClass(["entry-header", (_c = __props.post.Top_Drive_Item) != null && _c.Media_Image ? "has-pic" : ""]),
            style: vue.normalizeStyle(
              __props.post.Top_Drive_Item && __props.post.Top_Drive_Item.Media_Image && ((_d = __props.post.Top_Drive_Item.Media_Image) == null ? void 0 : _d.Variation) ? `background-image: url('${(_e = __props.post.Top_Drive_Item.Media_Image) == null ? void 0 : _e.Variation.bannerx100}'); background-size: cover;` : ""
            )
          }, [
            vue.createElementVNode("div", _hoisted_4$2, [
              vue.createElementVNode("h1", null, vue.toDisplayString(__props.post.Title), 1),
              __props.breadcrumbBase.length > 0 ? (vue.openBlock(), vue.createBlock(FyBreadcrumb, {
                key: 0,
                nav: __props.breadcrumbBase
              }, null, 8, ["nav"])) : vue.createCommentVNode("v-if", !0)
            ])
          ], 6)) : (vue.openBlock(), vue.createElementBlock("header", _hoisted_1$3, [
            vue.createVNode(_component_RouterLink, {
              to: `${__props.basePath}/${__props.post.Slug}`,
              title: __props.post.Title
            }, {
              default: vue.withCtx(() => {
                var _a2, _b2, _c2;
                return [
                  __props.post.Top_Drive_Item && __props.post.Top_Drive_Item.Media_Image && ((_a2 = __props.post.Top_Drive_Item.Media_Image) == null ? void 0 : _a2.Variation) ? (vue.openBlock(), vue.createElementBlock("figure", _hoisted_2$3, [
                    vue.createElementVNode("img", {
                      src: (_b2 = __props.post.Top_Drive_Item.Media_Image) == null ? void 0 : _b2.Variation.banner,
                      title: __props.post.Title,
                      alt: __props.post.Title
                    }, null, 8, _hoisted_3$2)
                  ])) : vue.createCommentVNode("v-if", !0),
                  vue.createCommentVNode(`<div class="keywords" v-if="post.Keywords.length">
          <span class="tag" v-for="keyword in post.Keywords">{{
            keyword
          }}</span>
        </div>`),
                  vue.createElementVNode("h2", {
                    class: vue.normalizeClass((_c2 = __props.post.Top_Drive_Item) != null && _c2.Media_Image ? "title-has-pic" : "")
                  }, vue.toDisplayString(__props.post.Title), 3)
                ];
              }),
              _: 1
            }, 8, ["to", "title"])
          ])),
          vue.createElementVNode("div", _hoisted_5$1, [
            vue.createElementVNode("div", _hoisted_6$1, [
              vue.createElementVNode("div", {
                innerHTML: __props.single || !__props.post.Short_Contents ? __props.post.Contents : "<p>" + __props.post.Short_Contents + "</p>"
              }, null, 8, _hoisted_7$1),
              !__props.single && __props.post.Short_Contents ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8$1, [
                vue.createVNode(_component_router_link, {
                  to: `${__props.basePath}/${__props.post.Slug}`
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(_ctx.$t("klb_blog_readmore")), 1)
                  ]),
                  _: 1
                }, 8, ["to"])
              ])) : vue.createCommentVNode("v-if", !0)
            ]),
            __props.showFooter ? (vue.openBlock(), vue.createElementBlock("footer", _hoisted_9$1, [
              (__props.post.Comments && __props.cms.Type == "article" && __props.isPage, vue.createCommentVNode("v-if", !0)),
              vue.createElementVNode("span", _hoisted_11, [
                vue.createVNode(vue.unref(render$f)),
                vue.createElementVNode("time", {
                  class: "entry-date published",
                  datetime: new Date(parseInt(__props.post.Published.unixms)).toISOString()
                }, vue.toDisplayString(_ctx.$formatDate(__props.post.Published.unixms)), 9, _hoisted_12)
              ]),
              __props.post.Tag_Category ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_13, [
                vue.createVNode(vue.unref(render$6)),
                vue.createVNode(_component_RouterLink, {
                  rel: "category tag",
                  to: `${__props.basePath}/category/${__props.post.Tag_Category.Full_Name}`
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(__props.post.Tag_Category.Full_Name), 1)
                  ]),
                  _: 1
                }, 8, ["to"])
              ])) : vue.createCommentVNode("v-if", !0),
              __props.post.Keywords && __props.post.Keywords.length ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_14, [
                vue.createVNode(vue.unref(render$2)),
                vue.createTextVNode(" " + vue.toDisplayString(__props.post.Keywords.join(", ")), 1)
              ])) : vue.createCommentVNode("v-if", !0),
              vue.createElementVNode("span", _hoisted_15, [
                vue.createVNode(vue.unref(render$f)),
                vue.createElementVNode("time", {
                  class: "updated",
                  datetime: new Date(parseInt(__props.post.Last_Modified.unixms)).toISOString()
                }, vue.toDisplayString(_ctx.$formatDate(__props.post.Last_Modified.unixms)), 9, _hoisted_16)
              ])
            ])) : vue.createCommentVNode("v-if", !0)
          ])
        ], 2)) : vue.createCommentVNode("v-if", !0),
        (__props.single && __props.isPage, vue.createCommentVNode("v-if", !0))
      ]);
    };
  }
}), KlbBlogInnerPost = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "KlbBlogInnerPost.vue"]]);
function useCMS() {
  return {
    getArticle: async (slug, basePath, alias, siteName, breadcrumbBase, seo, is404, dataSingle, displayType = void 0, blogName = void 0, breadcrumb = void 0, vars = [
      "strip&scale_crop=512x512&alias=squared",
      "strip&scale_crop=1280x100&alias=bannerx100",
      "strip&scale_crop=1200x630&alias=seo"
    ]) => {
      var _a;
      seo.value = {
        title: void 0,
        image: void 0,
        imageType: void 0,
        description: void 0,
        published: void 0,
        modified: void 0,
        keywords: void 0,
        imageWidth: void 0,
        imageHeight: void 0,
        type: "article"
      }, is404.value = !1, displayType && (displayType.value = "single");
      const _data = await rest(
        `Content/Cms/${alias}:loadSlug`,
        "GET",
        {
          slug,
          image_variation: vars
        }
      ).catch((err) => {
        err.code == 404 && (useHistory().status = 404, is404.value = !0, seo.value.title = "404");
      });
      return _data && _data.result == "success" && (blogName && (blogName.value = _data.data.content_cms.Name), breadcrumb && blogName && (breadcrumb.value = [
        ...breadcrumbBase,
        { name: blogName.value, to: basePath },
        { name: _data.data.content_cms_entry_data.Title }
      ]), dataSingle.value = _data, seo.value.published = new Date(
        parseInt(_data.data.content_cms_entry_data.Published.unixms)
      ).toISOString(), seo.value.modified = new Date(
        parseInt(_data.data.content_cms_entry_data.Last_Modified.unixms)
      ).toISOString(), seo.value.title = blogName ? _data.data.content_cms_entry_data.Title + " - " + blogName.value : _data.data.content_cms_entry_data.Title, _data.data.content_cms_entry_data.Short_Contents && (seo.value.description = _data.data.content_cms_entry_data.Short_Contents), _data.data.content_cms_entry_data.Keywords && _data.data.content_cms_entry_data.Keywords.length && (seo.value.keywords = _data.data.content_cms_entry_data.Keywords.join(",").trim()), _data.data.content_cms_entry_data.Top_Drive_Item && _data.data.content_cms_entry_data.Top_Drive_Item.Media_Image && _data.data.content_cms_entry_data.Top_Drive_Item.Media_Image.Variation && (seo.value.imageType = _data.data.content_cms_entry_data.Top_Drive_Item.Mime, seo.value.image = (_a = _data.data.content_cms_entry_data.Top_Drive_Item.Media_Image) == null ? void 0 : _a.Variation.seo, seo.value.imageWidth = "1200", seo.value.imageHeight = "630")), {
        seo,
        is404,
        dataSingle,
        displayType,
        blogName
      };
    }
  };
}
const _hoisted_1$2 = { class: "fv-relative klb-blog" }, _hoisted_2$2 = {
  key: 1,
  class: "fv-typo"
};
var _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbPage",
  props: {
    pagesAlias: { default: "@pages" },
    showFooter: { type: Boolean, default: !0 },
    breadcrumbBase: { default: () => [] },
    forceSlug: null
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props, slugWatcher = vue.ref(), page = vue.ref(), route = vueRouter.useRoute(), is404 = vue.ref(!1), eventBus2 = useEventBus(), seo = vue.ref({
      title: void 0,
      image: void 0,
      imageType: void 0,
      description: void 0,
      published: void 0,
      modified: void 0,
      keywords: void 0,
      type: "blog"
    }), getArticle = async (slug) => {
      eventBus2.emit("cmsPage-loading", !0), await useCMS().getArticle(
        slug,
        "",
        props.pagesAlias,
        "",
        [],
        seo,
        is404,
        page
      ), eventBus2.emit("cmsPage-loading", !1);
    };
    return [__temp, __restore] = vue.withAsyncContext(() => getArticle(
      props.forceSlug ? props.forceSlug : route.params.slug.toString()
    )), await __temp, __restore(), vue.onMounted(() => {
      props.forceSlug || (slugWatcher.value = vue.watch(
        () => route.params.slug,
        (v) => {
          typeof v == "string" && v != "" && getArticle(v.toString());
        }
      ));
    }), vue.onUnmounted(() => {
      slugWatcher.value && slugWatcher.value();
    }), useSeo(seo), (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
      vue.createVNode(FyLoader, { id: "cmsPage" }),
      page.value ? (vue.openBlock(), vue.createBlock(KlbBlogInnerPost, {
        key: 0,
        post: page.value.data.content_cms_entry_data,
        cms: page.value.data.content_cms,
        single: !0,
        showFooter: __props.showFooter,
        breadcrumbBase: __props.breadcrumbBase,
        isPage: !0
      }, null, 8, ["post", "cms", "showFooter", "breadcrumbBase"])) : vue.createCommentVNode("v-if", !0),
      is404.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$2, [
        vue.createVNode(Fy404View)
      ])) : vue.createCommentVNode("v-if", !0)
    ]));
  }
}), KlbPage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "KlbPage.vue"]]);
const _hoisted_1$1 = { class: "klb-blog" }, _hoisted_2$1 = {
  key: 0,
  class: "multiple"
}, _hoisted_3$1 = { key: 0 }, _hoisted_4$1 = {
  key: 0,
  class: "klb-post-container no-posts"
}, _hoisted_5 = { class: "m-h1" }, _hoisted_6 = ["placeholder"], _hoisted_7 = {
  key: 0,
  class: "widget"
}, _hoisted_8 = /* @__PURE__ */ vue.createElementVNode("h3", null, "Categories", -1), _hoisted_9 = {
  key: 1,
  class: "single"
}, _hoisted_10 = {
  key: 2,
  class: "is-404"
};
var _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbBlog",
  props: {
    blogAlias: { default: "@news" },
    basePath: { default: "/blog" },
    breadcrumbBase: null,
    siteName: null
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props, route = vueRouter.useRoute(), translate = useTranslation(), blogName = vue.ref(""), seo = vue.ref({}), is404 = vue.ref(!1), cats = vue.ref(), data = vue.ref(), dataSingle = vue.ref(), displayType = vue.ref("multiple"), query = vue.ref(), h1Mult = vue.ref(), eventBus2 = useEventBus(), breadcrumb = vue.ref([
      ...props.breadcrumbBase,
      { name: blogName.value }
    ]), slugWatcher = vue.ref(), getArticle = async (slug) => {
      eventBus2.emit("cmsBlog-loading", !0), await useCMS().getArticle(
        slug,
        props.basePath,
        props.blogAlias,
        props.siteName,
        props.breadcrumbBase,
        seo,
        is404,
        dataSingle,
        displayType,
        blogName,
        breadcrumb
      ), eventBus2.emit("cmsBlog-loading", !1);
    }, getCategories = async (uuid) => {
      const _cats = await rest(`Classify/${uuid}`, "GET");
      _cats && _cats.result == "success" && (cats.value = _cats.data.Root_Tags);
    }, getArticles = async (category, search, page = 1) => {
      route.query.page && (page = parseInt(route.query.page.toString())), eventBus2.emit("cmsBlog-loading", !0), is404.value = !1, displayType.value = "multiple", h1Mult.value = void 0, seo.value = {
        title: void 0,
        image: void 0,
        imageType: void 0,
        description: void 0,
        published: void 0,
        modified: void 0,
        keywords: void 0,
        imageWidth: void 0,
        imageHeight: void 0,
        type: "blog"
      };
      const _data = await rest(
        `Content/Cms/${props.blogAlias}:search`,
        "GET",
        {
          page_no: page,
          results_per_page: 8,
          sort: "published:desc",
          image_variation: "strip&scale_crop=1280x160&alias=banner",
          query: {
            tag: category,
            all: search
          }
        }
      ).catch((err) => {
        err.code == 404 && (useHistory().status = 404, is404.value = !0, seo.value.title = "404"), eventBus2.emit("cmsBlog-loading", !1);
      });
      search && (query.value = search), _data && _data.result == "success" && (getCategories(_data.data.content_cms.Classify.Classify__), data.value = _data, blogName.value = _data.data.content_cms.Name, category ? (breadcrumb.value = [
        ...props.breadcrumbBase,
        { name: blogName.value, to: props.basePath },
        { name: translate("klb_blog_category_breadcrumb", { category }) }
      ], seo.value.title = translate("klb_blog_category_breadcrumb", { category }), seo.value.type = "search", h1Mult.value = translate("klb_blog_category_breadcrumb", { category })) : search ? (breadcrumb.value = [
        ...props.breadcrumbBase,
        { name: blogName.value, to: props.basePath },
        { name: translate("klb_blog_search_breadcrumb", { search }) }
      ], seo.value.title = translate("klb_blog_search_breadcrumb", { search }), seo.value.type = "search", h1Mult.value = translate("klb_blog_search_breadcrumb", { search })) : (breadcrumb.value = [...props.breadcrumbBase, { name: blogName.value }], seo.value.title = blogName.value)), eventBus2.emit("cmsBlog-loading", !1);
    }, checkRoute = async (slug, page = 1) => {
      const args = slug.split("/");
      args.length == 1 ? args[0] == "" ? await getArticles(void 0, void 0, page) : await getArticle(args[0]) : args.length == 2 && (args[0] == "category" ? await getArticles(args[1], void 0, page) : args[0] == "search" && await getArticles(void 0, args[1], page));
    }, checkRoutePage = async (page = 1) => {
      await checkRoute(route.params.slug.toString(), page);
    };
    return [__temp, __restore] = vue.withAsyncContext(() => checkRoute(route.params.slug.toString())), await __temp, __restore(), vue.onMounted(() => {
      eventBus2.on("cmsPagingGoToPage", checkRoutePage), slugWatcher.value = vue.watch(
        () => route.params.slug,
        (v) => {
          typeof v == "string" && checkRoute(v.toString());
        }
      );
    }), vue.onUnmounted(() => {
      eventBus2.off("cmsPagingGoToPage", checkRoutePage), slugWatcher.value && slugWatcher.value();
    }), useSeo(seo), (_ctx, _cache) => {
      var _a, _b;
      const _component_RouterLink = vue.resolveComponent("RouterLink");
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
        vue.createVNode(FyLoader, { id: "cmsBlog" }),
        displayType.value == "multiple" && data.value && data.value.result ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$1, [
          vue.createVNode(vue.unref(runtime.SchemaOrgWebPage), { type: ["CollectionPage", "SearchResultsPage"] }),
          vue.createElementVNode("main", null, [
            vue.createVNode(FyBreadcrumb, { nav: breadcrumb.value }, null, 8, ["nav"]),
            (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList((_a = data.value) == null ? void 0 : _a.data.data, (post, index) => {
              var _a2;
              return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                key: post.Content_Cms_Entry__
              }, [
                vue.createVNode(KlbBlogInnerPost, {
                  post,
                  single: !1,
                  basePath: __props.basePath,
                  cms: data.value.data.content_cms
                }, null, 8, ["post", "basePath", "cms"]),
                data.value && index != ((_a2 = data.value) == null ? void 0 : _a2.data.data.length) - 1 ? (vue.openBlock(), vue.createElementBlock("hr", _hoisted_3$1)) : vue.createCommentVNode("v-if", !0)
              ], 64);
            }), 128)),
            (_b = data.value) != null && _b.data.data.length ? vue.createCommentVNode("v-if", !0) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$1, [
              vue.createElementVNode("p", null, vue.toDisplayString(_ctx.$t("klb_blog_no_posts")), 1)
            ])),
            data.value && data.value.paging ? (vue.openBlock(), vue.createBlock(FyPaging, {
              key: 1,
              id: "cmsPaging",
              items: data.value.paging
            }, null, 8, ["items"])) : vue.createCommentVNode("v-if", !0)
          ]),
          vue.createElementVNode("aside", null, [
            vue.createElementVNode("h1", _hoisted_5, vue.toDisplayString(h1Mult.value ? h1Mult.value : blogName.value), 1),
            vue.createElementVNode("form", {
              class: "search",
              onSubmit: _cache[1] || (_cache[1] = vue.withModifiers(
                () => {
                  _ctx.$router.push(`${__props.basePath}/search/${query.value}`);
                },
                ["prevent"]
              ))
            }, [
              vue.createVNode(vue.unref(render$8), { class: "searchIcon" }),
              vue.withDirectives(vue.createElementVNode("input", {
                type: "text",
                placeholder: _ctx.$t("klb_blog_search_placeholder"),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => query.value = $event)
              }, null, 8, _hoisted_6), [
                [vue.vModelText, query.value]
              ])
            ], 32),
            cats.value && cats.value.length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
              _hoisted_8,
              vue.createElementVNode("ul", null, [
                (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(cats.value, (cat) => (vue.openBlock(), vue.createElementBlock("li", {
                  key: cat.Classify_Tag__
                }, [
                  vue.createVNode(_component_RouterLink, {
                    to: `${__props.basePath}/category/${cat.Full_Name}`
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(render$b)),
                      vue.createTextVNode(" " + vue.toDisplayString(cat.Full_Name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"])
                ]))), 128))
              ])
            ])) : vue.createCommentVNode("v-if", !0),
            vue.createCommentVNode(`
        <div class="widget">
          <h3>Archives</h3>
        </div>`)
          ])
        ])) : vue.createCommentVNode("v-if", !0),
        displayType.value == "single" && dataSingle.value && dataSingle.value.result ? (vue.openBlock(), vue.createElementBlock("main", _hoisted_9, [
          vue.createVNode(KlbBlogInnerPost, {
            post: dataSingle.value.data.content_cms_entry_data,
            single: !0,
            basePath: __props.basePath,
            breadcrumbBase: breadcrumb.value,
            cms: dataSingle.value.data.content_cms
          }, null, 8, ["post", "basePath", "breadcrumbBase", "cms"])
        ])) : vue.createCommentVNode("v-if", !0),
        is404.value ? (vue.openBlock(), vue.createElementBlock("main", _hoisted_10, [
          vue.createVNode(Fy404View)
        ])) : vue.createCommentVNode("v-if", !0)
      ]);
    };
  }
}), KlbBlog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "KlbBlog.vue"]]);
const _hoisted_1 = ["onSubmit"], _hoisted_2 = {
  key: 0,
  class: "response-error"
}, _hoisted_3 = {
  class: "btn primary btn-defaults",
  type: "submit"
}, _hoisted_4 = {
  key: 1,
  class: "response-success"
};
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "KlbSupport",
  props: {
    to: { default: "@support" }
  },
  setup(__props) {
    var _a, _b;
    const props = __props, store = useFVStore(), isAuth = vue.computed(() => store.isAuth), eventBus2 = useEventBus(), globalFormError = vue.ref(null), success = vue.ref(!1), state = vue.reactive({
      contact: {
        fullname: isAuth.value ? (_a = store.user) == null ? void 0 : _a.Profile.Display_Name : "",
        email: isAuth.value ? (_b = store.user) == null ? void 0 : _b.Email : "",
        message: "",
        subject: ""
      }
    }), v$ = useVuelidate.useVuelidate({
      contact: {
        fullname: { required: validators.required },
        email: { required: validators.required, email: validators.email },
        message: { required: validators.required },
        subject: { required: validators.required }
      }
    }, state), sendMessage = async () => {
      if (globalFormError.value = null, success.value = !1, await v$.value.contact.$validate()) {
        eventBus2.emit("klb-contact-form-loading", !0);
        const sendResult = await rest("Support/Ticket", "POST", {
          To: props.to,
          Email: state.contact.email,
          Subject: `${state.contact.subject}`,
          Message: state.contact.message,
          Name: state.contact.fullname
        }).catch((error) => {
          eventBus2.emit("klb-contact-form-loading", !1), globalFormError.value = error.error;
        });
        sendResult && sendResult.result == "success" && (success.value = !0), eventBus2.emit("klb-contact-form-loading", !1);
      }
    };
    return (_ctx, _cache) => {
      const _component_FyInput = vue.resolveComponent("FyInput");
      return vue.openBlock(), vue.createElementBlock("div", null, [
        success.value ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_4, vue.toDisplayString(_ctx.$t("klb_contact_thanks")), 1)) : (vue.openBlock(), vue.createElementBlock("form", {
          key: 0,
          onSubmit: vue.withModifiers(sendMessage, ["prevent"]),
          class: "klb-contact-form"
        }, [
          vue.createVNode(FyLoader, { id: "klb-contact-form" }),
          vue.createElementVNode("div", null, [
            vue.createVNode(_component_FyInput, {
              id: "emailLogin",
              req: !0,
              showLabel: !0,
              placeholder: _ctx.$t("klb_contact_form_place_holder_email"),
              autocomplete: "email",
              errorVuelidate: vue.unref(v$).contact.email.$errors,
              modelValue: state.contact.email,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.contact.email = $event),
              disabled: vue.unref(isAuth),
              type: "email",
              label: _ctx.$t("klb_contact_form_label_email")
            }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "disabled", "label"]),
            vue.createVNode(_component_FyInput, {
              id: "fullName",
              req: !0,
              showLabel: !0,
              placeholder: _ctx.$t("klb_contact_form_label_fullname"),
              autocomplete: "name",
              disabled: vue.unref(isAuth),
              errorVuelidate: vue.unref(v$).contact.fullname.$errors,
              modelValue: state.contact.fullname,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => state.contact.fullname = $event),
              type: "text",
              label: _ctx.$t("klb_contact_form_place_holder_fullname")
            }, null, 8, ["placeholder", "disabled", "errorVuelidate", "modelValue", "label"]),
            vue.createVNode(_component_FyInput, {
              id: "subject",
              req: !0,
              showLabel: !0,
              placeholder: _ctx.$t("klb_contact_form_place_holder_subject"),
              errorVuelidate: vue.unref(v$).contact.subject.$errors,
              modelValue: state.contact.subject,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => state.contact.subject = $event),
              type: "text",
              label: _ctx.$t("klb_contact_form_label_subject")
            }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
            vue.createVNode(_component_FyInput, {
              id: "message",
              req: !0,
              showLabel: !0,
              placeholder: _ctx.$t("klb_contact_form_place_holder_message"),
              errorVuelidate: vue.unref(v$).contact.message.$errors,
              modelValue: state.contact.message,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => state.contact.message = $event),
              type: "textarea",
              label: _ctx.$t("klb_contact_form_label_message")
            }, null, 8, ["placeholder", "errorVuelidate", "modelValue", "label"]),
            globalFormError.value ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_2, vue.toDisplayString(globalFormError.value), 1)) : vue.createCommentVNode("v-if", !0),
            vue.createElementVNode("button", _hoisted_3, vue.toDisplayString(_ctx.$t("klb_contact_cta")), 1)
          ])
        ], 40, _hoisted_1))
      ]);
    };
  }
}), KlbSupport = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "KlbSupport.vue"]]);
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
    KlbBlog
  },
  composables: {
    useCart,
    useUserCheck: useUser,
    useOrder,
    useBilling
  }
}, helpersComponents = {
  ClientOnly
}, EN_US = ["second", "minute", "hour", "day", "week", "month", "year"];
function en_US(diff, idx) {
  if (idx === 0)
    return ["just now", "right now"];
  var unit = EN_US[Math.floor(idx / 2)];
  return diff > 1 && (unit += "s"), [diff + " " + unit + " ago", "in " + diff + " " + unit];
}
var ZH_CN = ["\u79D2", "\u5206\u949F", "\u5C0F\u65F6", "\u5929", "\u5468", "\u4E2A\u6708", "\u5E74"];
function zh_CN(diff, idx) {
  if (idx === 0)
    return ["\u521A\u521A", "\u7247\u523B\u540E"];
  var unit = ZH_CN[~~(idx / 2)];
  return [diff + " " + unit + "\u524D", diff + " " + unit + "\u540E"];
}
var Locales = {}, register = function(locale, func) {
  Locales[locale] = func;
}, getLocale = function(locale) {
  return Locales[locale] || Locales.en_US;
}, SEC_ARRAY = [
  60,
  60,
  24,
  7,
  365 / 7 / 12,
  12
];
function toDate(input) {
  return input instanceof Date ? input : !isNaN(input) || /^\d+$/.test(input) ? new Date(parseInt(input)) : (input = (input || "").trim().replace(/\.\d+/, "").replace(/-/, "/").replace(/-/, "/").replace(/(\d)T(\d)/, "$1 $2").replace(/Z/, " UTC").replace(/([+-]\d\d):?(\d\d)/, " $1$2"), new Date(input));
}
function formatDiff(diff, localeFunc) {
  var agoIn = diff < 0 ? 1 : 0;
  diff = Math.abs(diff);
  for (var totalSec = diff, idx = 0; diff >= SEC_ARRAY[idx] && idx < SEC_ARRAY.length; idx++)
    diff /= SEC_ARRAY[idx];
  return diff = Math.floor(diff), idx *= 2, diff > (idx === 0 ? 9 : 1) && (idx += 1), localeFunc(diff, idx, totalSec)[agoIn].replace("%s", diff.toString());
}
function diffSec(date, relativeDate) {
  var relDate = relativeDate ? toDate(relativeDate) : new Date();
  return (+relDate - +toDate(date)) / 1e3;
}
var format = function(date, locale, opts) {
  var sec = diffSec(date, opts && opts.relativeDate);
  return formatDiff(sec, getLocale(locale));
};
register("en_US", en_US), register("zh_CN", zh_CN);
const cropText = (str, ml = 100, end = "...") => str.length > ml ? `${str.slice(0, ml)}${end}` : str, formatKlbRecurringPaymentCycle = (cycle) => {
  const translate = useTranslation();
  if (!cycle)
    return translate("payment_cycles_one_time");
  const unit = cycle.slice(-1), quantity = parseInt(cycle.replace(unit, ""));
  switch (unit) {
    case "h":
      return translate("payment_cycles_hour", { count: quantity });
    case "d":
      return translate("payment_cycles_day", { count: quantity });
    case "m":
      return translate("payment_cycles_month", { count: quantity });
    case "y":
      return translate("payment_cycles_year", { count: quantity });
  }
  return "";
}, formatBytes = (bytes, decimals = 2) => {
  if (!+bytes)
    return "0 Bytes";
  const k = 1024, dm = decimals < 0 ? 0 : decimals, sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}, jpZipcode = (zip) => {
  const _zip = zip.toString();
  return _zip.length != 7 ? "" : "\u3012" + _zip.slice(0, 3) + "-" + _zip.slice(3, _zip.length);
}, formatDate = (dt) => {
  let _dt = dt;
  return typeof dt == "string" && (_dt = Date.parse(dt), Number.isNaN(_dt) && (_dt = parseInt(dt))), useTranslation()("global_datetime", {
    val: new Date(_dt),
    formatParams: {
      val: {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    }
  });
}, formatDatetime = (dt) => {
  let _dt = dt;
  return typeof dt == "string" && (_dt = Date.parse(dt), Number.isNaN(_dt) && (_dt = parseInt(dt))), useTranslation()("global_datetime", {
    val: new Date(_dt),
    formatParams: {
      val: {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }
    }
  });
}, formatTimeago = (dt) => {
  let _dt = dt;
  return typeof dt == "string" && (_dt = Date.parse(dt), Number.isNaN(_dt) && (_dt = parseInt(dt))), format(new Date(_dt), klbfw.getLocale().replace("_", "-"));
};
function useUserCheck(path = "/login") {
  const store = useFVStore(), isAuth = vue.computed(() => store.isAuth), router = vueRouter.useRouter(), checkUser = (route) => {
    route.meta.reqLogin && (isAuth.value || router.push(path));
  };
  store.refreshUser().then(() => {
    checkUser(useHistory().currentRoute);
  }), router.afterEach(async () => {
    await store.refreshUser();
  }), router.beforeEach((to) => {
    to.fullPath != path && checkUser(to);
  });
}
const components = { ...uiComponents, ...klb.components, ...helpersComponents }, i18nextPromise = (backend) => i18next__default.default.use(backend).init({
  ns: ["translation"],
  defaultNS: "translation",
  debug: !1,
  lng: klbfw.getLocale(),
  load: "currentOnly",
  initImmediate: !1
}), createFyvue = () => ({
  install: (app, options) => {
    options || (options = { loadKlb: !0 }), app.config.globalProperties.$eventBus = eventBus, app.config.globalProperties.$t = i18next__default.default.t, app.config.globalProperties.$cropText = cropText, app.config.globalProperties.$formatBytes = formatBytes, app.config.globalProperties.$formatDate = formatDate, app.config.globalProperties.$formatTimeago = formatTimeago, app.config.globalProperties.$formatDatetime = formatDatetime, app.config.globalProperties.$formatJPZipcode = jpZipcode, app.config.globalProperties.$formatKlbRecurringPaymentCycle = formatKlbRecurringPaymentCycle, app.config.globalProperties.$jpZipcode = jpZipcode;
    let k;
    for (k in uiComponents)
      app.component(uiComponents[k].__name, uiComponents[k]);
    if (options.loadKlb) {
      app.config.globalProperties.$countries = countries;
      let klbComponent;
      for (klbComponent in klb.components)
        app.component(
          klb.components[klbComponent].__name,
          klb.components[klbComponent]
        );
    }
    let hlp;
    for (hlp in helpersComponents)
      app.component(helpersComponents[hlp].__name, helpersComponents[hlp]);
  }
}), helpers = {
  cropText,
  formatBytes,
  formatJPZipcode: jpZipcode,
  formatDate,
  formatDatetime,
  formatTimeago,
  formatKlbRecurringPaymentCycle,
  eventBus
}, helpersSSR = {
  setupClient,
  handleSSR,
  isSSRRendered
}, KlbUse = {
  ...klb.composables
};
exports.KlbUse = KlbUse, exports.components = components, exports.countriesPromise = countriesPromise, exports.createFyvue = createFyvue, exports.helpers = helpers, exports.helpersSSR = helpersSSR, exports.i18nextPromise = i18nextPromise, exports.rest = rest, exports.restFetch = restFetch, exports.useCountries = useCountries, exports.useEventBus = useEventBus, exports.useFVStore = useFVStore, exports.useHistory = useHistory, exports.useSeo = useSeo, exports.useTranslation = useTranslation, exports.useUserCheck = useUserCheck;
//# sourceMappingURL=fyvue.js.map

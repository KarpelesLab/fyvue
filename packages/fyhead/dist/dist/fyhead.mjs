/*!
  * @fy/head v0.0.1-alpha.1
  * (c) 2022 Florian Gasquez <m@fy.to>
  * @license MIT
  */
import { ref, inject, watchEffect, onBeforeMount, onBeforeUnmount } from "vue";
import { defineStore, storeToRefs } from "pinia";
function generateUUID() {
  var d = new Date().getTime(), d2 = typeof performance != "undefined" && performance.now && performance.now() * 1e3 || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = Math.random() * 16;
    return d > 0 ? (r = (d + r) % 16 | 0, d = Math.floor(d / 16)) : (r = (d2 + r) % 16 | 0, d2 = Math.floor(d2 / 16)), (c === "x" ? r : r & 3 | 8).toString(16);
  });
}
const __fyHeadCount__ = "fyhead:count", useFyheadState = defineStore("fyHeadState", () => {
  const head = ref({
    links: {},
    metas: {},
    scripts: {},
    title: void 0
  });
  function $reset() {
    head.value = {
      links: {},
      metas: {},
      scripts: {},
      title: void 0
    };
  }
  function lazySeo(data, reset = !1) {
    reset && $reset(), data.url && addMeta("og:url", data.url), data.canonical && addLink("canonical", data.canonical), data.robots && addMeta("robots", data.robots, "name"), data.type && addMeta("og:type", data.type), data.title && (head.value.title = data.title), data.description && (addMeta("og:description", data.description), addMeta("twitter:description", data.description, "name"), addMeta("description", data.description, "name"), addMeta("og:description", data.description)), data.modified && addMeta("article:modified_time", data.modified), data.published && addMeta("article:published_time", data.published), data.imageWidth && data.imageHeight && (addMeta("og:image:width", data.imageWidth), addMeta("og:image:height", data.imageHeight)), data.imageType && addMeta("og:image:type", data.imageType), data.image && (addMeta("og:image", data.image), addMeta("twitter:image", data.image, "name")), data.next && addLink("next", data.next), data.prev && addLink("prev", data.prev);
  }
  function addScript(src, id = void 0, async = !1, nonce) {
    id || (id = generateUUID()), head.value.scripts[id] = { key: id, src, async, nonce };
  }
  function addLink(rel, href, key = void 0) {
    key || (key = generateUUID()), head.value.links[key] = { key, href, rel };
  }
  function addMeta(value, content, type = "property") {
    head.value.metas[value + type] = {
      key: value + type,
      value,
      content,
      type
    };
  }
  function addTitle(_title) {
    head.value.title = _title;
  }
  function _headTagsToString() {
    let headTags = "";
    return Object.values(head.value.metas).forEach((meta) => {
      headTags += `<meta ${meta.type == "name" ? "name" : "property"}="${meta.value}" content="${meta.content}" />
`;
    }), Object.values(head.value.links).forEach((link) => {
      headTags += `<meta rel="${link.rel}" href="${link.href}" />
`;
    }), Object.values(head.value.scripts).forEach((script) => {
      headTags += `<script id="${script.key}" src="${script.src}" ${script.async ? "async" : ""} ${script.nonce ? `nonce=${script.nonce}` : ""} />
`;
    }), head.value.title && (headTags += `<title>${head.value.title}</title>`), headTags;
  }
  function _htmlAttrsToString() {
    return "";
  }
  function _bodyAttrsToString() {
    return "";
  }
  function _bodyTagsToString() {
    return "";
  }
  function injectFyHead(_head) {
    const toInject = [], oldElements = [];
    if (document && document.head) {
      let headCountEl = document.querySelector(
        `meta[name="${__fyHeadCount__}"]`
      );
      const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
      if (headCountEl)
        for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++)
          j && oldElements.push(j), j = j ? j.previousElementSibling : null;
      if (headCountEl || (headCountEl = document.createElement("meta")), headCountEl.setAttribute("name", __fyHeadCount__), headCountEl.setAttribute("content", "0"), document.head.append(headCountEl), Object.values(_head.metas).forEach((meta) => {
        const el = document.createElement("meta");
        el.setAttribute(
          meta.type == "property" ? "property" : "name",
          meta.value
        ), el.setAttribute("content", meta.content), toInject.push(el);
      }), Object.values(_head.links).forEach((link) => {
        const el = document.createElement("link");
        el.setAttribute("rel", link.rel), el.setAttribute("href", link.href), toInject.push(el);
      }), Object.values(_head.scripts).forEach((script) => {
        const el = document.createElement("script");
        el.setAttribute("id", script.key), el.setAttribute("src", script.src), toInject.push(el);
      }), _head.title) {
        const el = document.createElement("title");
        el.text = _head.title, toInject.push(el);
      }
      toInject.forEach((n) => {
        document.head.insertBefore(n, headCountEl);
      }), oldElements.forEach((n) => {
        n.remove();
      }), headCountEl.setAttribute("content", toInject.length.toString());
    }
    return toInject;
  }
  function renderHeadToString() {
    return {
      headTags: _headTagsToString(),
      htmlAttrs: _htmlAttrsToString(),
      bodyAttrs: _bodyAttrsToString(),
      bodyTags: _bodyTagsToString()
    };
  }
  return {
    head,
    renderHeadToString,
    injectFyHead,
    addTitle,
    addMeta,
    addLink,
    addScript,
    lazySeo,
    $reset
  };
}), __isBrowser__ = typeof window != "undefined", useFyHead = () => {
  const fyHeadState = inject("fyhead");
  if (!fyHeadState)
    throw new Error("Did you apply app.use(fyhead)?");
  return fyHeadState.injectFyHead(fyHeadState.head), __isBrowser__ && (watchEffect(() => {
    fyHeadState.injectFyHead(fyHeadState.head);
  }), onBeforeMount(() => {
    fyHeadState.injectFyHead(fyHeadState.head);
  }), onBeforeUnmount(() => {
    fyHeadState.$reset(), fyHeadState.injectFyHead(fyHeadState.head);
  })), storeToRefs(fyHeadState);
}, createFyHead = () => {
  const fyHeadState = useFyheadState();
  return fyHeadState.$reset(), {
    install(app) {
      app.config.globalProperties && (app.config.globalProperties.$fyhead = fyHeadState, app.provide("fyhead", fyHeadState));
    }
  };
};
export {
  createFyHead,
  useFyHead
};
//# sourceMappingURL=fyhead.mjs.map

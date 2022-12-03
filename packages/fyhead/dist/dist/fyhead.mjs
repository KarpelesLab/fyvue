/*!
  * @fy/head v0.0.1-alpha.1
  * (c) 2022 Florian Gasquez <m@fy.to>
  * @license MIT
  */
import { reactive, inject, watch, onUnmounted } from "vue";
function generateUUID() {
  var d = new Date().getTime(), d2 = typeof performance != "undefined" && performance.now && performance.now() * 1e3 || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = Math.random() * 16;
    return d > 0 ? (r = (d + r) % 16 | 0, d = Math.floor(d / 16)) : (r = (d2 + r) % 16 | 0, d2 = Math.floor(d2 / 16)), (c === "x" ? r : r & 3 | 8).toString(16);
  });
}
class ElProperty {
  constructor(key, value) {
    this.key = key, this.value = value;
  }
  toString() {
    return this.value ? `${this.key}="${this.value}"` : this.key;
  }
}
class El {
  constructor(tag, properties = [], key, content) {
    this.tag = tag, this.properties = properties, this.content = content, key ? this.key = key : this.key = this.getKey();
  }
  getKey() {
    return generateUUID();
  }
  toStringProperties() {
    let propertiesString = "";
    for (const property of this.properties)
      propertiesString += ` ${property.toString()}`;
    return propertiesString.trim();
  }
  toString() {
    return `<${this.tag} ${this.toStringProperties()}>${this.content ? this.content : ""}</${this.tag}>`;
  }
  toDom(doc) {
    const el = doc.createElement(this.tag);
    for (const property of this.properties)
      el.setAttribute(property.key, property.value ? property.value : "");
    return this.content && (el.innerText = this.content), el;
  }
}
const __fyHeadCount__ = "fyhead:count";
class FyHead {
  constructor() {
    this.state = reactive({ elements: {} });
  }
  reset() {
    this.state.elements = {};
  }
  addTitle(title) {
    typeof title == "string" && (this.state.elements.title = new El("title", [], "title", title));
  }
  addScript(src, key, nonce, async = !1) {
    key || (key = generateUUID());
    const properties = [new ElProperty("id", key)];
    async && properties.push(new ElProperty("async")), nonce && properties.push(new ElProperty("nonce", nonce)), this.state.elements[key] = new El("script", properties, key);
  }
  addLink(rel, href, key = void 0) {
    key || (key = generateUUID()), this.state.elements[key] = new El(
      "link",
      [new ElProperty("rel", rel), new ElProperty("href", href)],
      key
    );
  }
  addMeta(value, content, type = "property") {
    const key = value + "-" + type;
    this.state.elements[key] = new El(
      "meta",
      [new ElProperty(type, value), new ElProperty("content", content)],
      key
    );
  }
  renderHeadToString() {
    let headTags = "";
    return Object.values(this.state.elements).forEach((el) => {
      headTags += `${el.toString()}
`;
    }), {
      headTags,
      htmlAttrs: "",
      bodyAttrs: "",
      bodyTags: ""
    };
  }
  lazySeo(data, reset = !1) {
    data.url && this.addMeta("og:url", data.url), data.canonical && this.addLink("canonical", data.canonical), data.robots && this.addMeta("robots", data.robots, "name"), data.type && this.addMeta("og:type", data.type), data.title && this.addTitle(data.title), data.description && (this.addMeta("og:description", data.description), this.addMeta("twitter:description", data.description, "name"), this.addMeta("description", data.description, "name"), this.addMeta("og:description", data.description)), data.modified && this.addMeta("article:modified_time", data.modified), data.published && this.addMeta("article:published_time", data.published), data.imageWidth && data.imageHeight && (this.addMeta("og:image:width", data.imageWidth), this.addMeta("og:image:height", data.imageHeight)), data.imageType && this.addMeta("og:image:type", data.imageType), data.image && (this.addMeta("og:image", data.image), this.addMeta("twitter:image", data.image, "name")), data.next && this.addLink("next", data.next), data.prev && this.addLink("prev", data.prev);
  }
  static injectFyHead(head) {
    const newElements = [], oldElements = [];
    if (document && document.head) {
      let headCountEl = document.querySelector(
        `meta[name="${__fyHeadCount__}"]`
      );
      const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
      if (headCountEl)
        for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++)
          j && oldElements.push(j), j = j ? j.previousElementSibling : null;
      headCountEl || (headCountEl = document.createElement("meta")), headCountEl.setAttribute("name", __fyHeadCount__), headCountEl.setAttribute("content", "0"), document.head.append(headCountEl), Object.values(head).forEach((el) => {
        const elDom = el.toDom(document);
        newElements.push(elDom);
      }), newElements.forEach((n) => {
        document.head.insertBefore(n, headCountEl);
      }), oldElements.forEach((n) => {
        n.remove();
      }), headCountEl.setAttribute("content", newElements.length.toString());
    }
    return newElements;
  }
}
const useFyHead = () => {
  const fyhead = inject("fyhead");
  if (!fyhead)
    throw new Error("Did you apply app.use(fyhead)?");
  return typeof window != "undefined" && (watch(fyhead.state.elements, (v) => {
    FyHead.injectFyHead(v);
  }), onUnmounted(() => {
    fyhead.reset();
  })), fyhead;
}, createFyHead = () => {
  const fyHead = new FyHead();
  return fyHead.reset(), {
    install(app) {
      app.config.globalProperties && (app.config.globalProperties.$fyhead = fyHead, app.provide("fyhead", fyHead));
    }
  };
};
export {
  createFyHead,
  useFyHead
};
//# sourceMappingURL=fyhead.mjs.map

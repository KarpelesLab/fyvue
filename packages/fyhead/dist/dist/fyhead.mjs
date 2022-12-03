
/**
 * @fy-/head v0.0.13
 * (c) 2022 Florian "Fy" Gasquez
 * Released under the MIT License
 */

import { reactive, inject, watch, onUnmounted } from 'vue';

function generateUUID() {
    var d = new Date().getTime();
    var d2 = (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
        0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

class ElProperty {
    key;
    value;
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return this.value ? `${this.key}="${this.value}"` : this.key;
    }
}
class El {
    tag;
    properties;
    content;
    key;
    constructor(tag, properties = [], key, content) {
        this.tag = tag;
        this.properties = properties;
        this.content = content;
        if (key)
            this.key = key;
        else
            this.key = this.getKey();
    }
    getKey() {
        return generateUUID();
    }
    toStringProperties() {
        let propertiesString = '';
        for (const property of this.properties) {
            propertiesString += ` ${property.toString()}`;
        }
        return propertiesString.trim();
    }
    toString() {
        return `<${this.tag} ${this.toStringProperties()}>${this.content ? this.content : ''}</${this.tag}>`;
    }
    toDom(doc) {
        const el = doc.createElement(this.tag);
        for (const property of this.properties) {
            el.setAttribute(property.key, property.value ? property.value : '');
        }
        if (this.content) {
            el.innerText = this.content;
        }
        return el;
    }
}

const __fyHeadCount__ = 'fyhead:count';
class FyHead {
    state;
    constructor() {
        this.state = reactive({ elements: {} });
    }
    reset() {
        this.state.elements = {};
    }
    addElement(el) {
        this.state.elements[el.key] = el;
    }
    addTitle(title) {
        if (typeof title !== 'string')
            return;
        this.state.elements.title = new El('title', [], 'title', title);
    }
    addScript(src, key, nonce, async = false) {
        if (!key)
            key = generateUUID();
        const properties = [new ElProperty('id', key), new ElProperty('src', src)];
        if (async)
            properties.push(new ElProperty('async'));
        if (nonce)
            properties.push(new ElProperty('nonce', nonce));
        this.state.elements[key] = new El('script', properties, key);
    }
    addLink(rel, href, key = undefined) {
        if (!key)
            key = generateUUID();
        this.state.elements[key] = new El('link', [new ElProperty('rel', rel), new ElProperty('href', href)], key);
    }
    addMeta(value, content, type = 'property') {
        const key = value + '-' + type;
        this.state.elements[key] = new El('meta', [new ElProperty(type, value), new ElProperty('content', content)], key);
    }
    renderHeadToString() {
        let headTags = '';
        Object.values(this.state.elements).forEach((el) => {
            headTags += `${el.toString()}\n`;
        });
        const htmlAttrs = '';
        const bodyAttrs = '';
        const bodyTags = '';
        return {
            headTags,
            htmlAttrs,
            bodyAttrs,
            bodyTags,
        };
    }
    lazySeo(data, reset = false) {
        if (data.url) {
            this.addMeta('og:url', data.url);
        }
        if (data.canonical) {
            this.addLink('canonical', data.canonical);
        }
        if (data.robots) {
            this.addMeta('robots', data.robots, 'name');
        }
        if (data.type) {
            this.addMeta('og:type', data.type);
        }
        if (data.title) {
            this.addTitle(data.title);
        }
        if (data.description) {
            this.addMeta('og:description', data.description);
            this.addMeta('twitter:description', data.description, 'name');
            this.addMeta('description', data.description, 'name');
            this.addMeta('og:description', data.description);
        }
        if (data.modified) {
            this.addMeta('article:modified_time', data.modified);
        }
        if (data.published) {
            this.addMeta('article:published_time', data.published);
        }
        if (data.imageWidth && data.imageHeight) {
            this.addMeta('og:image:width', data.imageWidth);
            this.addMeta('og:image:height', data.imageHeight);
        }
        if (data.imageType) {
            this.addMeta('og:image:type', data.imageType);
        }
        if (data.image) {
            this.addMeta('og:image', data.image);
            this.addMeta('twitter:image', data.image, 'name');
        }
        if (data.next) {
            this.addLink('next', data.next);
        }
        if (data.prev) {
            this.addLink('prev', data.prev);
        }
    }
    static injectFyHead(head) {
        const newElements = [];
        const oldElements = [];
        if (document && document.head) {
            let headCountEl = document.querySelector(`meta[name="${__fyHeadCount__}"]`);
            const headCount = headCountEl
                ? Number(headCountEl.getAttribute('content'))
                : 0;
            if (headCountEl) {
                for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++) {
                    if (j) {
                        oldElements.push(j);
                    }
                    j = j ? j.previousElementSibling : null;
                }
            }
            if (!headCountEl)
                headCountEl = document.createElement('meta');
            headCountEl.setAttribute('name', __fyHeadCount__);
            headCountEl.setAttribute('content', '0');
            document.head.append(headCountEl);
            Object.values(head).forEach((el) => {
                const elDom = el.toDom(document);
                newElements.push(elDom);
            });
            newElements.forEach((n) => {
                document.head.insertBefore(n, headCountEl);
            });
            oldElements.forEach((n) => {
                n.remove();
            });
            headCountEl.setAttribute('content', newElements.length.toString());
        }
        return newElements;
    }
}

const useFyHead = () => {
    const fyhead = inject('fyhead');
    if (!fyhead)
        throw new Error('Did you apply app.use(fyhead)?');
    const __isBrowser__ = typeof window !== 'undefined';
    if (__isBrowser__) {
        watch(fyhead.state.elements, (v) => {
            FyHead.injectFyHead(v);
        });
        onUnmounted(() => {
            fyhead.reset();
        });
    }
    return fyhead;
};
const createFyHead = () => {
    const fyHead = new FyHead();
    fyHead.reset();
    const fyHeadPlugin = {
        install(app) {
            if (app.config.globalProperties) {
                app.config.globalProperties.$fyhead = fyHead;
                app.provide('fyhead', fyHead);
            }
        },
        renderHeadToString() {
            return fyHead.renderHeadToString();
        },
    };
    return fyHeadPlugin;
};

export { createFyHead, useFyHead };

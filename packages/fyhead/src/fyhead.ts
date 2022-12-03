import { reactive } from 'vue';
import type { ShallowReactive } from 'vue';
import { generateUUID } from './helpers';
import { El, ElProperty } from './element';

const __fyHeadCount__ = 'fyhead:count';

export interface FyHeadState {
  elements: ShallowReactive<{
    [key: string]: El;
  }>;
}
export interface FyHeadLazy {
  name?: string;
  title?: string;
  image?: string;
  imageType?: string;
  imageWidth?: string;
  imageHeight?: string;
  description?: string;
  published?: string;
  modified?: string;
  keywords?: string;
  type?: 'blog' | 'search' | 'article' | 'website';
  searchAction?: string;
  next?: string;
  prev?: string;
  canonical?: string;
  locale?: string;
  robots?: string;
  url?: string;
}

export class FyHead {
  state: FyHeadState;
  constructor() {
    this.state = reactive({ elements: {} });
  }
  reset() {
    this.state.elements = {};
  }
  addTitle(title: string) {
    if (typeof title !== 'string') return;
    this.state.elements.title = new El('title', [], 'title', title);
  }
  addScript(src: string, key?: string, nonce?: string, async: boolean = false) {
    if (!key) key = generateUUID();
    const properties = [new ElProperty('id', key)];
    if (async) properties.push(new ElProperty('async'));
    if (nonce) properties.push(new ElProperty('nonce', nonce));
    this.state.elements[key] = new El('script', properties, key);
  }
  addLink(rel: string, href: string, key: string | undefined = undefined) {
    if (!key) key = generateUUID();
    this.state.elements[key] = new El(
      'link',
      [new ElProperty('rel', rel), new ElProperty('href', href)],
      key
    );
  }
  addMeta(
    value: string,
    content: string,
    type: 'name' | 'property' = 'property'
  ) {
    const key = value + '-' + type;
    this.state.elements[key] = new El(
      'meta',
      [new ElProperty(type, value), new ElProperty('content', content)],
      key
    );
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
  lazySeo(data: FyHeadLazy, reset: boolean = false) {
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
  static injectFyHead(
    head: ShallowReactive<{
      [key: string]: El;
    }>
  ) {
    const newElements: Element[] = [];
    const oldElements: Element[] = [];
    if (document && document.head) {
      let headCountEl = document.querySelector(
        `meta[name="${__fyHeadCount__}"]`
      );
      const headCount = headCountEl
        ? Number(headCountEl.getAttribute('content'))
        : 0;

      if (headCountEl) {
        for (
          let i = 0, j = headCountEl.previousElementSibling;
          i < headCount;
          i++
        ) {
          if (j) {
            oldElements.push(j);
          }
          j = j ? j.previousElementSibling : null;
        }
      }
      if (!headCountEl) headCountEl = document.createElement('meta');
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

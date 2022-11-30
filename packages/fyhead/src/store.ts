import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';
import type { App, Ref } from 'vue';
import type {
  FyHeadProperties,
  FyHeadLinks,
  FyHeadLazy,
  FyHeadScripts,
} from './types';
import { generateUUID } from './helpers';

const __fyHeadCount__ = 'fyhead:count';

export interface FyHeadState {
  links: FyHeadLinks;
  metas: FyHeadProperties;
  scripts: FyHeadScripts;
  title?: string;
}
export interface FyHead {
  links: FyHeadLinks;
  metas: FyHeadProperties;
  scripts: FyHeadScripts;
  title?: string;
}
export const useFyheadState = defineStore('fyHeadState', () => {
  const head = ref<FyHead>({
    links: {},
    metas: {},
    scripts: {},
    title: undefined,
  });
  function $reset() {
    head.value = {
      links: {},
      metas: {},
      scripts: {},
      title: undefined,
    };
  }
  function lazySeo(data: FyHeadLazy, reset: boolean = false) {
    //reset();
    if (reset) $reset();

    if (data.url) {
      addMeta('og:url', data.url);
    }
    if (data.canonical) {
      addLink('canonical', data.canonical);
    }
    if (data.robots) {
      addMeta('robots', data.robots, 'name');
    }
    if (data.type) {
      addMeta('og:type', data.type);
    }
    if (data.title) {
      head.value.title = data.title;
    }
    if (data.description) {
      addMeta('og:description', data.description);
      addMeta('twitter:description', data.description, 'name');
      addMeta('description', data.description, 'name');
      addMeta('og:description', data.description);
    }
    if (data.modified) {
      addMeta('article:modified_time', data.modified);
    }
    if (data.published) {
      addMeta('article:published_time', data.published);
    }
    if (data.imageWidth && data.imageHeight) {
      addMeta('og:image:width', data.imageWidth);
      addMeta('og:image:height', data.imageHeight);
    }
    if (data.imageType) {
      addMeta('og:image:type', data.imageType);
    }
    if (data.image) {
      addMeta('og:image', data.image);
      addMeta('twitter:image', data.image, 'name');
    }
    if (data.next) {
      addLink('next', data.next);
    }
    if (data.prev) {
      addLink('prev', data.prev);
    }
  }
  function addScript(
    src: string,
    id: string | undefined = undefined,
    async: boolean = false,
    nonce: string | undefined
  ) {
    if (!id) id = generateUUID();
    head.value.scripts[id] = { key: id, src: src, async: async, nonce: nonce };
  }
  function addLink(
    rel: string,
    href: string,
    key: string | undefined = undefined
  ) {
    if (!key) key = generateUUID();
    head.value.links[key] = { key: key, href: href, rel: rel };
  }
  function addMeta(
    value: string,
    content: string,
    type: 'name' | 'property' = 'property'
  ) {
    head.value.metas[value + type] = {
      key: value + type,
      value: value,
      content: content,
      type: type,
    };
  }
  function addTitle(_title: string) {
    head.value.title = _title;
  }
  function _headTagsToString() {
    let headTags = '';
    Object.values(head.value.metas).forEach((meta) => {
      headTags += `<meta ${meta.type == 'name' ? 'name' : 'property'}="${
        meta.value
      }" content="${meta.content}" />\n`;
    });
    Object.values(head.value.links).forEach((link) => {
      headTags += `<meta rel="${link.rel}" href="${link.href}" />\n`;
    });
    Object.values(head.value.scripts).forEach((script) => {
      headTags += `<script id="${script.key}" src="${script.src}" ${
        script.async ? 'async' : ''
      } ${script.nonce ? `nonce=${script.nonce}` : ''} />\n`;
    });
    if (head.value.title) headTags += `<title>${head.value.title}</title>`;
    return headTags;
  }
  function _htmlAttrsToString() {
    return '';
  }
  function _bodyAttrsToString() {
    return '';
  }
  function _bodyTagsToString() {
    return '';
  }
  function injectFyHead(_head: FyHead) {
    const toInject: Element[] = [];
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

      Object.values(_head.metas).forEach((meta) => {
        const el = document.createElement('meta');
        el.setAttribute(
          meta.type == 'property' ? 'property' : 'name',
          meta.value
        );
        el.setAttribute('content', meta.content);
        toInject.push(el);
      });
      Object.values(_head.links).forEach((link) => {
        const el = document.createElement('link');
        el.setAttribute('rel', link.rel);
        el.setAttribute('href', link.href);
        toInject.push(el);
      });
      Object.values(_head.scripts).forEach((script) => {
        const el = document.createElement('script');
        el.setAttribute('id', script.key);
        el.setAttribute('src', script.src);
        toInject.push(el);
      });

      if (_head.title) {
        const el = document.createElement('title');
        el.text = _head.title;
        toInject.push(el);
      }
      toInject.forEach((n) => {
        document.head.insertBefore(n, headCountEl);
      });
      oldElements.forEach((n) => {
        n.remove();
      });

      headCountEl.setAttribute('content', toInject.length.toString());
    }

    return toInject;
  }
  function renderHeadToString() {
    return {
      headTags: _headTagsToString(),
      htmlAttrs: _htmlAttrsToString(),
      bodyAttrs: _bodyAttrsToString(),
      bodyTags: _bodyTagsToString(),
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
    $reset,
  };
});

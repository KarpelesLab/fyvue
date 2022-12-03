import { ShallowReactive, App } from 'vue';

declare class ElProperty {
    key: string;
    value?: string;
    constructor(key: string, value?: string);
    toString(): string;
}
type ElTag = 'meta' | 'link' | 'script' | 'title';
declare class El {
    tag: ElTag;
    properties: ElProperty[];
    content?: string;
    key: string;
    constructor(tag: ElTag, properties?: ElProperty[], key?: string, content?: string);
    getKey(): string;
    toStringProperties(): string;
    toString(): string;
    toDom(doc: Document): HTMLMetaElement | HTMLLinkElement | HTMLScriptElement | HTMLTitleElement;
}

interface FyHeadState {
    elements: ShallowReactive<{
        [key: string]: El;
    }>;
}
interface FyHeadLazy {
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
declare class FyHead {
    state: FyHeadState;
    constructor();
    reset(): void;
    addTitle(title: string): void;
    addScript(src: string, key?: string, nonce?: string, async?: boolean): void;
    addLink(rel: string, href: string, key?: string | undefined): void;
    addMeta(value: string, content: string, type?: 'name' | 'property'): void;
    renderHeadToString(): {
        headTags: string;
        htmlAttrs: string;
        bodyAttrs: string;
        bodyTags: string;
    };
    lazySeo(data: FyHeadLazy, reset?: boolean): void;
    static injectFyHead(head: ShallowReactive<{
        [key: string]: El;
    }>): Element[];
}

declare const useFyHead: () => FyHead;
declare const createFyHead: () => {
    install(app: App): void;
};

export { FyHeadLazy, createFyHead, useFyHead };

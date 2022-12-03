import type { ShallowReactive } from 'vue';
import { El } from './element';
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
export declare class FyHead {
    state: FyHeadState;
    constructor();
    reset(): void;
    addElement(el: El): void;
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

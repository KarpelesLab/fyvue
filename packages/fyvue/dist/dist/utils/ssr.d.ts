import type { Router } from 'vue-router';
import type { Pinia } from 'pinia';
export interface KlbSSR {
    initial?: any;
    uuid?: string;
    meta?: string;
    link?: string;
    bodyAttributes?: string;
    htmlAttributes?: string;
    bodyTags?: string;
    app?: string;
    statusCode?: number;
    redirect?: string;
}
export declare type HistoryState = {
    _router: any | null;
    status: number;
    redirect?: string;
};
export declare const useHistory: import("pinia").StoreDefinition<"historyStore", HistoryState, {
    currentRoute: (state: {
        _router: any | null;
        status: number;
        redirect?: string | undefined;
    } & import("pinia").PiniaCustomStateProperties<HistoryState>) => any;
}, {
    setStatus(status: number): void;
    _setRouter(_router: Router | null): void;
    push(path: string, status?: number): void;
    replace(path: string, status?: number): void;
    go(delta: number): void;
    back(): void;
    forward(): void;
}>;
export declare const isSSRRendered: () => boolean;
export declare const setupClient: (router: Router, pinia: Pinia) => void;
export declare function handleSSR(createApp: Function, cb: Function, options?: {
    url: null;
}): Promise<any>;

import type { Router } from 'vue-router';
import type { Pinia } from 'pinia';
import type { KlbSSR } from '../dts/klb';
export type HistoryState = {
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
    push(path: any, status?: number): any;
    replace(path: any, status?: number): any;
    go(delta: number): void;
    back(): void;
    forward(): void;
}>;
export declare const isSSRRendered: () => boolean;
export declare const setupClient: (router: Router, pinia: Pinia) => void;
export interface SSROptions {
    url: string | null;
}
export declare function handleSSR(createApp: Function, cb: Function, options?: SSROptions): Promise<KlbSSR>;

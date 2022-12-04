import type { KlbAPIResult } from '../dts/klb';
import type { FetchResult } from '../dts';
type RequestResult = {
    [key: number]: KlbAPIResult | undefined;
};
type FetchRequestResult = {
    [key: number]: FetchResult | undefined;
};
type RestSharedState = {
    results: RequestResult;
    fetchResults: FetchRequestResult;
};
export declare const useRestState: import("pinia").StoreDefinition<"restState", RestSharedState, {}, {
    addResult(key: number, result: KlbAPIResult | undefined): void;
    delResult(key: number): void;
    getByHash(key: number): KlbAPIResult | undefined;
}>;
export declare function restFetch<ResultType extends FetchResult>(url: string, method?: string, params?: object): Promise<ResultType>;
export declare function rest<ResultType extends KlbAPIResult>(url: string, method?: string, params?: object, ctx?: object): Promise<ResultType>;
export {};

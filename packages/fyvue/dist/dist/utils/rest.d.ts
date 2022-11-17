import type { KlbAPIResult } from '../dts/klb';
type RequestResult = {
    [key: number]: KlbAPIResult | undefined;
};
type RestSharedState = {
    results: RequestResult;
};
export declare const useRestState: import("pinia").StoreDefinition<"restState", RestSharedState, {}, {
    addResult(key: number, result: KlbAPIResult | undefined): void;
    delResult(key: number): void;
    getByHash(key: number): KlbAPIResult | undefined;
}>;
export declare function rest<ResultType extends KlbAPIResult>(url: string, method?: string, params?: object, ctx?: object): Promise<ResultType>;
export {};

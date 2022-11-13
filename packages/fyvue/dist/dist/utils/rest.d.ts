import { KlbApiResultBase } from '../dts/klb';
declare type RequestResult = {
    [key: number]: KlbApiResultBase | undefined;
};
declare type RestSharedState = {
    results: RequestResult;
};
export declare const useRestState: import("pinia").StoreDefinition<"restState", RestSharedState, {}, {
    addResult(key: number, result: KlbApiResultBase | undefined): void;
    delResult(key: number): void;
    getByHash(key: number): KlbApiResultBase | undefined;
}>;
export declare function rest<ResultType extends KlbApiResultBase>(url: string, method?: string, params?: object, ctx?: object): Promise<ResultType>;
export {};

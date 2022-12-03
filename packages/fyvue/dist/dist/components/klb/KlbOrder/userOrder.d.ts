import { KlbAPIOrder, KlbAPIResultUnknown, KlbOrder, KlbAPIOrderProcess } from '../../../dts/klb';
export declare function useOrder(): {
    process(data: any, orderUuid: string): Promise<KlbAPIOrderProcess>;
    getOrder(orderUuid: string): Promise<KlbAPIOrder>;
    getOrders(): Promise<KlbAPIResultUnknown>;
    getLastUnfinishedOrder(): Promise<KlbOrder | null>;
};

import { KlbAPICatalogCart, KlbAPIOrder } from '../../../dts/klb';
export declare function useCart(): {
    resetCart: () => Promise<boolean>;
    createOrder(billingLocation: any): Promise<KlbAPIOrder>;
    getCart(): Promise<KlbAPICatalogCart>;
    delProduct: (productKey: string) => Promise<boolean>;
    addProduct: (productUuid: string, meta: string) => Promise<boolean>;
};

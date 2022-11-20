import { KlbAPISetupIntent, KlbBillingAndLocation } from '../../../dts/klb';
export declare function useBilling(): {
    setupPaymentIntent: (method?: string) => Promise<KlbAPISetupIntent | null>;
    getUserBillingAndLoc: () => Promise<KlbBillingAndLocation | null>;
};

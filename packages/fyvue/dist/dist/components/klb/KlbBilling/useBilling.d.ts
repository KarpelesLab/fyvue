import type { KlbBillingAndLocation } from '../../../dts/klb';
export declare function useBilling(): {
    getUserBillingAndLoc: () => Promise<KlbBillingAndLocation | null>;
};

import type { User } from '../dts/klb';
export declare type RootState = {
    user: User | null;
};
export declare const useFVStore: import("pinia").StoreDefinition<"fVStore", RootState, {
    isAuth: (state: {
        user: {
            Agreements: {
                tos?: boolean | undefined;
            };
            Created: {
                unix: number;
                us: number;
                iso: string;
                tz: string;
                full: string;
                unixms: string;
            };
            Current_Group: {
                Name: string;
                Nickname: string | null;
                Owner: {
                    _key: string;
                    type: string;
                };
                Type: "user" | "group";
                Status: "released" | "beta" | "alpha" | "private";
                User_Group__: string;
                User__: string;
            };
            Default_Billing_User_Location__: string | null;
            Default_License_User_Location__: string | null;
            Default_Shipping_User_Location__: string | null;
            Email: string;
            Has_Password: boolean;
            Language__: string;
            Profile: {
                User_Profile__: string;
                Birthdate: string;
                Display_Name: string;
                Gender: "M" | "F" | "NB" | null;
                Birthdate_Visibility: "full" | "hidden" | "year_only" | "month_day_only";
                Allow_Mature_Content: "Y" | "N";
                Media_Image?: {
                    Media_Image__: string;
                    Url: string;
                    Variation?: unknown;
                } | undefined;
            };
            User_Profile__: string;
            User__: string;
            Status: "shadow" | "valid" | "sub" | "banned" | "delete_pending" | "deleted" | "validating" | "compromised" | "frozen" | "expired" | "purged";
        } | null;
    } & import("pinia").PiniaCustomStateProperties<RootState>) => boolean;
}, {
    refreshUser(params?: {}): Promise<void>;
    logout(): Promise<void>;
    setUser(user: User | null): void;
}>;

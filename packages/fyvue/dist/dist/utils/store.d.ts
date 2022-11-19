import type { KlbAPICatalogCart, KlbUser } from '../dts/klb';
export type RootState = {
    user: KlbUser | null;
    cartCount: number;
};
export declare const useFVStore: import("pinia").StoreDefinition<"fVStore", RootState, {
    isAuth: (state: {
        user: {
            Agreements?: "tos" | "privacy" | undefined;
            Created?: {
                unix: number;
                us: number;
                iso: string;
                tz: string;
                full: string;
                unixms: string;
            } | undefined;
            Default_Billing_User_Location__?: string | undefined;
            Default_License_User_Location__?: string | undefined;
            Default_Shipping_User_Location__?: string | undefined;
            Display_Name?: string | undefined;
            Drive_Item__?: string | undefined;
            Email?: string | undefined;
            External_Id?: string | undefined;
            Flags: "partner" | "merchant" | "under18" | "shadow" | "phone_req";
            Id_Key?: string | undefined;
            Index?: number | undefined;
            Language__?: string | undefined;
            Last_Completed_Password_Recover?: {
                unix: number;
                us: number;
                iso: string;
                tz: string;
                full: string;
                unixms: string;
            } | undefined;
            Last_Email_Change?: {
                unix: number;
                us: number;
                iso: string;
                tz: string;
                full: string;
                unixms: string;
            } | undefined;
            Last_Login?: {
                unix: number;
                us: number;
                iso: string;
                tz: string;
                full: string;
                unixms: string;
            } | undefined;
            Last_Password_Recover?: {
                unix: number;
                us: number;
                iso: string;
                tz: string;
                full: string;
                unixms: string;
            } | undefined;
            Login?: string | undefined;
            Media_Image__?: string | undefined;
            OAuth2_App__?: string | undefined;
            Parent_User__: string;
            Password: string;
            Phone?: string | undefined;
            Realm__: string;
            Referral_User__: string;
            Site__?: string | undefined;
            Status: "shadow" | "valid" | "sub" | "banned" | "delete_pending" | "deleted" | "validating" | "compromised" | "frozen" | "expired" | "purged";
            Timezone?: string | undefined;
            User_Group__?: string | undefined;
            User__: string;
            Validation_Code?: string | undefined;
            Profile: {
                Allow_Mature_Content: "Y" | "N";
                Banner_Drive_Item__?: string | undefined;
                Birthdate: {
                    unix: number;
                    us: number;
                    iso: string;
                    tz: string;
                    full: string;
                    unixms: string;
                };
                Birthdate_Visibility: "full" | "hidden" | "year_only" | "month_day_only";
                Display_Name: string;
                Drive_Item__?: string | undefined;
                Gender?: "M" | "F" | "NB" | undefined;
                Realm__: string;
                User_Profile__: string;
                User__: string;
                Username?: string | undefined;
                Media_Image?: {
                    sizes?: string | undefined;
                    src: string;
                    type?: string | undefined;
                } | undefined;
                Banner_Image?: {
                    sizes?: string | undefined;
                    src: string;
                    type?: string | undefined;
                } | undefined;
            };
            Current_Group: {
                Name?: string | undefined;
                Nickname?: string | undefined;
                Status: "released" | "beta" | "alpha" | "private";
                Type: "user" | "group";
                User_Group__: string;
                User__?: string | undefined;
            };
        } | null;
        cartCount: number;
    } & import("pinia").PiniaCustomStateProperties<RootState>) => boolean;
}, {
    refreshCart(): Promise<void>;
    refreshCartData(_cart: KlbAPICatalogCart): Promise<void>;
    refreshUser(params?: {}): Promise<void>;
    logout(): Promise<void>;
    setUser(user: KlbUser | null): void;
}>;

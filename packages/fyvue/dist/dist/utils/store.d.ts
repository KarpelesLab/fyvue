import type { KlbAPICatalogCart, KlbCatalogCart, KlbUser } from '../dts/klb';
export type RootState = {
    user: KlbUser | null;
    cartCount: number;
    cart: KlbCatalogCart | null;
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
        cart: {
            products: {
                data: {
                    Catalog_Product__: string;
                    Price: {
                        raw: {
                            display: string;
                            currency: string;
                            display_short?: string | undefined;
                            has_vat?: boolean | undefined;
                            tax_rate?: number | undefined;
                            value: string;
                            value_disp: number;
                            value_int: number;
                        };
                        tax: {
                            display: string;
                            currency: string;
                            display_short?: string | undefined;
                            has_vat?: boolean | undefined;
                            tax_rate?: number | undefined;
                            value: string;
                            value_disp: number;
                            value_int: number;
                        };
                        tax_only: {
                            display: string;
                            currency: string;
                            display_short?: string | undefined;
                            has_vat?: boolean | undefined;
                            tax_rate?: number | undefined;
                            value: string;
                            value_disp: number;
                            value_int: number;
                        };
                        tax_rate: number;
                        display: string;
                        currency: string;
                        display_short?: string | undefined;
                        has_vat?: boolean | undefined;
                        value: string;
                        value_disp: number;
                        value_int: number;
                    };
                    'Affiliate.PaymentRate': string;
                    'Basic.Created': {
                        unix: number;
                        us: number;
                        iso: string;
                        tz: string;
                        full: string;
                        unixms: string;
                    };
                    'Basic.Date_Release': {
                        unix: number;
                        us: number;
                        iso: string;
                        tz: string;
                        full: string;
                        unixms: string;
                    };
                    'Basic.Decorator': string;
                    'Basic.Family_Name': string;
                    'Basic.Keywords': string;
                    'Basic.Name': string;
                    'Basic.Priority': number;
                    'Basic.ServiceLifetime': string;
                    'Basic.TaxProfile': string;
                    'Basic.Trigger': string;
                    'Description.ASIN': string;
                    'Description.Author': string;
                    'Description.AuthorCode': string;
                    'Description.CatchPhrase': string;
                    'Description.Config': string;
                    'Description.Install_Howto': string;
                    'Description.JAN': string;
                    'Description.Long': string;
                    'Description.Pieces': number;
                    'Description.Short': string;
                    'Description.Type': string;
                    'Description.URL': string;
                    'Download.Size': number;
                    'Download.Url': string;
                    'Flags.New': "Y" | "N";
                    'Flags.Recommended': "Y" | "N";
                    'Multiple.Image': {
                        list: [];
                    };
                    'Native.Catalog_Product__': string;
                    'Native.Catalog_Publisher__': "1";
                    'Native.Catalog__': string;
                    'Native.Created': {
                        unix: number;
                        us: number;
                        iso: string;
                        tz: string;
                        full: string;
                        unixms: string;
                    };
                    'Native.Internal_Name': string;
                    'Native.Parent_Catalog_Product__': string;
                    'Native.Partner_Group_Key': string;
                    'Native.Product_Class': "tax" | "regular" | "discount" | "shipping";
                    'Native.Product_Type': "service" | "oneshot" | "coupon" | "download";
                    'Native.Publisher_SKU': string;
                    'Native.SKU': string;
                    'Native.Visible': "Y" | "N";
                    'Partner.Last_Imported': {
                        unix: number;
                        us: number;
                        iso: string;
                        tz: string;
                        full: string;
                        unixms: string;
                    };
                    'Price.Price': number;
                    'Publisher.Contact': string;
                    'Publisher.Language__': string;
                    'Publisher.Name': string;
                    'Publisher.Website': string;
                    'Service.Catalog_Product__': string;
                    'Service.RenewLink': string;
                    'Service.Type': string;
                    'Shipping.Description': string;
                    'Shipping.Enabled': "Y" | "N";
                    'Shipping.Handling': "electronics" | "fragile" | "do_not_stack" | "keep_side_up" | "raw_food" | "contains_batteries" | "keep_dry";
                    'Shipping.Method': string;
                    'Shipping.Type': "package" | "letter" | "cool" | "freeze";
                    'Shipping.Volumetric_Weight': number;
                    'Shipping.Weight': number;
                    Image?: {
                        list?: {
                            Media_Image__: string;
                            Url: string;
                            Variation?: {
                                [key: string]: string;
                            } | undefined;
                        }[] | undefined;
                    } | undefined;
                };
                key: string;
                quantity: number;
                price: {
                    display: string;
                    currency: string;
                    display_short?: string | undefined;
                    has_vat?: boolean | undefined;
                    tax_rate?: number | undefined;
                    value: string;
                    value_disp: number;
                    value_int: number;
                };
                id: string;
                meta: {
                    [x: string]: any;
                    quantity: number;
                };
            }[];
            total: {
                display: string;
                currency: string;
                display_short?: string | undefined;
                has_vat?: boolean | undefined;
                tax_rate?: number | undefined;
                value: string;
                value_disp: number;
                value_int: number;
            };
            total_vat: {
                display: string;
                currency: string;
                display_short?: string | undefined;
                has_vat?: boolean | undefined;
                tax_rate?: number | undefined;
                value: string;
                value_disp: number;
                value_int: number;
            };
            total_vat_only: {
                display: string;
                currency: string;
                display_short?: string | undefined;
                has_vat?: boolean | undefined;
                tax_rate?: number | undefined;
                value: string;
                value_disp: number;
                value_int: number;
            };
            total_vat_rate: number;
            total_no_coupon: {
                display: string;
                currency: string;
                display_short?: string | undefined;
                has_vat?: boolean | undefined;
                tax_rate?: number | undefined;
                value: string;
                value_disp: number;
                value_int: number;
            };
            total_no_coupon_no_vat: {
                display: string;
                currency: string;
                display_short?: string | undefined;
                has_vat?: boolean | undefined;
                tax_rate?: number | undefined;
                value: string;
                value_disp: number;
                value_int: number;
            };
            subtotals: {
                regular: {
                    display: string;
                    currency: string;
                    display_short?: string | undefined;
                    has_vat?: boolean | undefined;
                    tax_rate?: number | undefined;
                    value: string;
                    value_disp: number;
                    value_int: number;
                };
                discount: {
                    display: string;
                    currency: string;
                    display_short?: string | undefined;
                    has_vat?: boolean | undefined;
                    tax_rate?: number | undefined;
                    value: string;
                    value_disp: number;
                    value_int: number;
                };
                shipping: {
                    display: string;
                    currency: string;
                    display_short?: string | undefined;
                    has_vat?: boolean | undefined;
                    tax_rate?: number | undefined;
                    value: string;
                    value_disp: number;
                    value_int: number;
                };
                tax: {
                    display: string;
                    currency: string;
                    display_short?: string | undefined;
                    has_vat?: boolean | undefined;
                    tax_rate?: number | undefined;
                    value: string;
                    value_disp: number;
                    value_int: number;
                };
            };
        } | null;
    } & import("pinia").PiniaCustomStateProperties<RootState>) => boolean;
}, {
    refreshCart(): Promise<void>;
    refreshCartData(_cart: KlbAPICatalogCart): Promise<void>;
    refreshUser(params?: {}): Promise<void>;
    logout(): Promise<void>;
    setUser(user: KlbUser | null): void;
}>;

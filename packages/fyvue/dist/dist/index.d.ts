import * as pinia from 'pinia';
import * as vue_router from 'vue-router';
import { Router } from 'vue-router';
import * as mitt from 'mitt';
import { Emitter } from 'mitt';
import * as i18next from 'i18next';
import * as vue from 'vue';
import { Ref, Plugin } from 'vue';

type KlbUUID = string;

interface KlbDate {
  unix: number;
  us: number;
  iso: string;
  tz: 'UTC' | string;
  full: string;
  unixms: string;
}

interface KlbPrice {
  display: string;
  currency: string;
  display_short?: string;
  has_vat?: boolean;
  tax_rate?: number;
  value: string;
  value_disp: number;
  value_int: number;
}
interface KlbPriceTaxes extends KlbPrice {
  raw: KlbPrice;
  tax: KlbPrice;
  tax_only: KlbPrice;
  tax_rate: number;
}
interface KlbMediaImage {
  Media_Image__: KlbUUID;
  Url: string;
  Variation?: {
    [key: string]: string;
  };
}

/*
  Klb API Results
*/
interface KlbAPIResult {
  result: 'redirect' | 'success' | 'error';
  param?: string;
  code?: number;
  error?: string;
  request?: KlbUUID;
  time?: number;
  token?: string;
  paging?: KlbApiPaging;
  message?: string;
  fvReject?: boolean;
}
interface KlbApiPaging {
  page_no: number;
  results_per_page: number;
  page_max: number;
  page_max_relation: string;
  count: number;
}
interface KlbAPIResultUnknown extends KlbAPIResult {
  data?: any;
}
interface KlbAPIOrderProcess extends KlbAPIResult {
  data: KlbOrderProcess;
}
interface KlbAPISetupIntent extends KlbAPIResult {
  data: KlbSetupIntent;
}
interface KlbAPICatalogCart extends KlbAPIResult {
  data: KlbCatalogCart;
}
interface KlbAPIOrder extends KlbAPIResult {
  data: KlbOrder;
}
interface KlbBillingAndLocation {
  location: KlbUserLocation;
  billing: KlbUserBilling;
}

// KlbUser (https://ws.atonline.com/_special/rest/User)
interface KlbUser {
  Agreements?: 'tos' | 'privacy';
  Created?: KlbDate;
  Default_Billing_User_Location__?: KlbUUID;
  Default_License_User_Location__?: KlbUUID;
  Default_Shipping_User_Location__?: KlbUUID;
  Display_Name?: string;
  Drive_Item__?: KlbUUID;
  Email?: string;
  External_Id?: string;
  Flags: 'partner' | 'merchant' | 'under18' | 'shadow' | 'phone_req';
  Id_Key?: string;
  Index?: number;
  Language__?: string;
  Last_Completed_Password_Recover?: KlbDate;
  Last_Email_Change?: KlbDate;
  Last_Login?: KlbDate;
  Last_Password_Recover?: KlbDate;
  Login?: string;
  Media_Image__?: KlbUUID;
  OAuth2_App__?: KlbUUID;
  Parent_User__: KlbUUID;
  Password: string;
  Phone?: string;
  Realm__: KlbUUID;
  Referral_User__: KlbUUID;
  Site__?: KlbUUID;
  Status:
    | 'shadow'
    | 'valid'
    | 'sub'
    | 'banned'
    | 'delete_pending'
    | 'deleted'
    | 'validating'
    | 'compromised'
    | 'frozen'
    | 'expired'
    | 'purged';
  Timezone?: string;
  User_Group__?: KlbUUID;
  User__: KlbUUID;
  Validation_Code?: string;
  Profile: KlbUserProfile;
  Current_Group: KlbUserGroup;
}

// KlbUserProfile (https://ws.atonline.com/_special/rest/User/Profile)
interface KlbUserProfile {
  Allow_Mature_Content: 'Y' | 'N';
  Banner_Drive_Item__?: KlbUUID;
  Birthdate: KlbDate;
  Birthdate_Visibility: 'hidden' | 'year_only' | 'month_day_only' | 'full';
  Display_Name: string;
  Drive_Item__?: KlbUUID;
  Gender?: 'M' | 'F' | 'NB';
  Realm__: KlbUUID;
  User_Profile__: KlbUUID;
  User__: KlbUUID;
  Username?: string;
  Media_Image?: MediaImage;
  Banner_Image?: MediaImage;
}

// KlbUserGroup (https://ws.atonline.com/_special/rest/User/Group)
interface KlbUserGroup {
  Name?: string;
  Nickname?: string;
  Status: 'released' | 'beta' | 'alpha' | 'private';
  Type: 'user' | 'group';
  User_Group__: KlbUUID;
  User__?: KlbUUID;
}

// KlbCountry (https://ws.atonline.com/_special/rest/Country)
interface KlbCountry {
  Country__: string;
  Currency__: string;
  Name: string;
  DOMTOM: '0' | '1';
  Domain: string;
  EU: '0' | '1';
  FIPS_Code?: string;
  ICANN_Region?: 'AF' | 'AP' | 'AQ' | 'EU' | 'LAC' | 'NA';
  ISO3166_3_Code?: string;
  ISO3166_Code?: string;
  ISO3166_Failsafe_Code: string;
  ISSN_Code?: string;
  Name_EN: string;
  Old_Country_Id: number;
  Phone_Prefix?: string;
  Phone_Prefix2?: string;
  Phone_Prefix3?: string;
  SEPA: '0' | '1';
  Trunk_Prefix: string;
  VAT_Rate: number;
  Visible: '0' | '1';
}

// KlbUserLocation (https://ws.atonline.com/_special/rest/User/Location)
interface KlbUserLocation {
  Address: string;
  Address2?: string;
  Address2_Jp?: string;
  Address3?: string;
  Address3_Jp?: string;
  Address_Jp?: string;
  City: string;
  Company_Department?: string;
  Company_European_Vat_Number?: string;
  Company_Name?: string;
  Company_Name_Jp?: string;
  Company_Reg_Number?: string;
  Contact_Fax?: string;
  Contact_Phone: string;
  Contact_Phone_Pro?: string;
  Country__: string;
  Created: KlbDate;
  Email?: string;
  First_Name: string;
  First_Name_Kana?: string;
  Last_Name: string;
  Last_Name_Kana?: string;
  Location_Name?: string;
  Location__?: KlbUUID;
  Middle_Name?: string;
  Nickname?: string;
  Parent_User_Location__?: KlbUUID;
  Private: 'Y' | 'N';
  Province?: string;
  Realm__: KlbUUID;
  Ref_Count: number;
  Title?: 1 | 2 | 3;
  Type: 'private' | 'corporation' | 'association' | 'other';
  User_Location__: KlbUUID;
  User__: KlbUUID;
  Verification:
    | 'none'
    | 'postal-pending'
    | 'postal-sent'
    | 'postal'
    | 'verified';
  Visible: 'Y' | 'C' | 'P' | 'N';
  Zip?: string;
  Display: string[];
}

// KlbUserBillingMethod (https://ws.atonline.com/_special/rest/User/Billing/Method)
interface KlbUserBillingMethod {
  Autorenew_Data?: string;
  Billing_Method: 'invoice' | 'autorenew';
  Card_Prefix?: string;
  Controller_Set?: string;
  Controller__?: number;
  Country__?: string;
  Expiration?: string;
  Fail_Count: number;
  Fingerprint?: string;
  Name: string;
  Order_Autorenew__?: KlbUUID;
  Partner_Customer_Id?: string;
  Priority: number;
  User_Billing_Method__: KlbUUID;
  User_Billing__: KlbUUID;
}

// KlbUserBilling (https://ws.atonline.com/_special/rest/User/Billing)
interface KlbUserBilling {
  Affiliate_Surfer?: string;
  Affiliate__?: KlbUUID;
  Created: KlbDate;
  Currency__: string;
  Invoice_Number_Prefix?: string;
  Label: string;
  Last_Process: KlbDate;
  Referer?: string;
  User_Billing__: KlbUUID;
  User_Location__: KlbUUID;
  User__: KlbUUID;
  Utm_Campaign?: string;
  Utm_Content?: string;
  Utm_Medium?: string;
  Utm_Source?: string;
  Utm_Term?: string;
  Methods: Array<KlbUserBillingMethod>;
}

// KlbUserBilling (https://ws.atonline.com/_special/rest/User/Billing)
interface KlbUserBilling {
  Affiliate_Surfer?: string;
  Affiliate__?: KlbUUID;
  Created: KlbDate;
  Currency__: string;
  Invoice_Number_Prefix?: string;
  Label: string;
  Last_Process: KlbDate;
  Referer?: string;
  User_Billing__: KlbUUID;
  User_Location__: KlbUUID;
  User__: KlbUUID;
  Utm_Campaign?: string;
  Utm_Content?: string;
  Utm_Medium?: string;
  Utm_Source?: string;
  Utm_Term?: string;
}

// Klb_Catalog_Product (https://ws.atonline.com/_special/rest/Catalog/Product/Field?pretty&results_per_page=100)
interface KlbCatalogProduct {
  Catalog_Product__: KlbUUID;
  Price: KlbPriceTaxes;
  'Affiliate.PaymentRate': string;
  'Basic.Created': KlbDate;
  'Basic.Date_Release': KlbDate;
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
  'Flags.New': 'Y' | 'N';
  'Flags.Recommended': 'Y' | 'N';
  'Multiple.Image': { list: [] };
  'Native.Catalog_Product__': string;
  'Native.Catalog_Publisher__': '1';
  'Native.Catalog__': string;
  'Native.Created': KlbDate;
  'Native.Internal_Name': string;
  'Native.Parent_Catalog_Product__': string;
  'Native.Partner_Group_Key': string;
  'Native.Product_Class': 'regular' | 'discount' | 'shipping' | 'tax';
  'Native.Product_Type': 'service' | 'oneshot' | 'coupon' | 'download';
  'Native.Publisher_SKU': string;
  'Native.SKU': string;
  'Native.Visible': 'Y' | 'N';
  'Partner.Last_Imported': KlbDate;
  'Price.Price': number;
  'Publisher.Contact': string;
  'Publisher.Language__': string;
  'Publisher.Name': string;
  'Publisher.Website': string;
  'Service.Catalog_Product__': string;
  'Service.RenewLink': string;
  'Service.Type': string;
  'Shipping.Description': string;
  'Shipping.Enabled': 'Y' | 'N';
  'Shipping.Handling':
    | 'electronics'
    | 'fragile'
    | 'do_not_stack'
    | 'keep_side_up'
    | 'raw_food'
    | 'contains_batteries'
    | 'keep_dry';
  'Shipping.Method': string;
  'Shipping.Type': 'package' | 'letter' | 'cool' | 'freeze';
  'Shipping.Volumetric_Weight': number;
  'Shipping.Weight': number;
  Image?: { list?: Array<KlbMediaImage> };
}
// KlbCatalogCart (https://ws.atonline.com/_special/rest/Catalog/Cart)
interface KlbCatalogCart {
  products: Array<{
    data: KlbCatalogProduct;
    key: string;
    quantity: number;
    price: KlbPrice;
    id: KlbUUID;
    meta: {
      quantity: number;
      [key: string]: any;
    };
  }>;
  total: KlbPrice;
  total_vat: KlbPrice;
  total_vat_only: KlbPrice;
  total_vat_rate: number;
  total_no_coupon: KlbPrice;
  total_no_coupon_no_vat: KlbPrice;
  subtotals: {
    regular: KlbPrice;
    discount: KlbPrice;
    shipping: KlbPrice;
    tax: KlbPrice;
  };
}

// KlbOrder (https://ws.atonline.com/_special/rest/Order)
interface KlbOrder {
  Affiliate_Currency__?: string;
  Affiliate_Status: 'none' | 'waiting' | 'credited' | 'error';
  Affiliate_Surfer?: string;
  Affiliate_Total?: number;
  Affiliate__: KlbUUID;
  Billing_User_Location__?: KlbUUID;
  Check_Accept_Language?: string;
  Check_Ip?: string;
  Check_User_Agent?: string;
  Created: KlbDate;
  Currency__: string;
  Flags: {
    autorenew_record?: any;
    autorenew?: any;
    trivial?: any;
    refund?: any;
    can_pay_later?: any;
  };
  Fraud_Score?: number;
  Invoice_Blob__: KlbUUID;
  Invoice_Date?: KlbDate;
  Invoice_Number?: number;
  Invoice_Prefix?: string;
  Invoice_Status: 'pending' | 'todo' | 'none' | 'done';
  Language__: string;
  License_User_Location__?: KlbUUID;
  Order__: KlbUUID;
  Owner_Realm__?: KlbUUID;
  Paid?: KlbDate;
  Parent_Order__?: KlbUUID;
  Payment_Card?: string;
  Payment_Card_Hash?: string;
  Payment_Class?: string;
  Payment_Class_Set?: string;
  Payment_Country__?: string;
  Payment_Fee?: number;
  Payment_Last4?: string;
  Payment_Method?: string;
  Payment_Reference?: string;
  Payment_Test: 'Y' | 'N';
  Realm__: KlbUUID;
  Referer?: string;
  Remind_Date?: KlbDate;
  Remind_Status: 'pending' | 'send' | 'sent' | 'none' | 'giveup';
  Shipping_User_Location__?: KlbUUID;
  Site__: KlbUUID;
  Status:
    | 'open'
    | 'pending'
    | 'pending-initiated'
    | 'unpaid'
    | 'pending-paid'
    | 'paid'
    | 'completed'
    | 'cancelled'
    | 'chargeback'
    | 'chargeback-reversed'
    | 'forcedcollection'
    | 'settled'
    | 'refunded'
    | 'expired';
  Total: KlbPrice;
  Total_Vat: KlbPrice;
  User_Billing__?: KlbUUID;
  User__?: KlbUUID;
  Utm_Campaign?: string;
  Utm_Content?: string;
  Utm_Medium?: string;
  Utm_Source?: string;
  Utm_Term?: string;
  Vat_Amount: KlbPrice;
  Vat_Engine: string;
  Vat_Rate: number;
  Items: Array<KlbOrderItem>;
  Subtotals: {
    discount: KlbPrice;
    regular: KlbPrice;
    shipping: KlbPrice;
    tax: KlbPrice;
  };
  Billing_User_Location: KlbUserLocation;
}

interface KlbOrderItem {
  Catalog_Product__: KlbUUID;
  Catalog_Product: KlbCatalogProduct;
  Status:
    | 'pending'
    | 'deliver-wait'
    | 'deliver-pending'
    | 'deliver-done'
    | 'deliver-failed'
    | 'cancel-pending'
    | 'cancel-done'
    | 'recover-pending'
    | 'recover-done'
    | 'refund-pending'
    | 'refund-done'
    | 'test';
  meta: {
    quantity: number;
    [key: string]: any;
  };
}
interface KlbOrderProcess {
  methods_order: Array<string>;
  order: KlbOrder;
  order_payable: boolean;
  methods: {
    [key: string]: {
      session: string;
      fields: {
        [key: string]: {
          attributes?: {
            value?: string;
            options?: any;
            key?: string;
            [key: string]: any;
          };
          caption?: string;
          type?: string;
          mode?: string;
          result?: boolean;
          values?: [];
        };
      };
    };
  };
}
interface KlbSetupIntent {
  Capabilities: {
    Autorenew: boolean;
    CancelDelay: number;
    DirectPayement: boolean;
    DirectRequiresExternal: boolean;
    ExternalLink: boolean;
    ExternalPost: boolean;
    PaymentCancel: boolean;
    PaymentKind: string;
    TwoSteps: boolean;
  };
  Setup: {
    client_secret: string;
    stripe_intent?: string;
    key?: string;
    options: {
      [key: string]: string;
    };
  };
}

declare function useBilling(): {
    setupPaymentIntent: (method?: string) => Promise<KlbAPISetupIntent | null>;
    getUserBillingAndLoc: () => Promise<KlbBillingAndLocation | null>;
};

declare function useOrder(): {
    process(data: any, orderUuid: string): Promise<KlbAPIOrderProcess>;
    getOrder(orderUuid: string): Promise<KlbAPIOrder>;
    getOrders(): Promise<KlbAPIResultUnknown>;
    getLastUnfinishedOrder(): Promise<KlbOrder | null>;
};

declare function useUser(): {};

declare function useCart(): {
    resetCart: () => Promise<boolean>;
    createOrder(billingLocation: any): Promise<KlbAPIOrder>;
    getCart(): Promise<KlbAPICatalogCart>;
    delProduct: (productKey: string) => Promise<boolean>;
    addProduct: (productUuid: string, meta: string) => Promise<KlbAPICatalogCart>;
};

type Events = {
    [key: string]: any;
};
type GlobalCountries = {
    countries: Array<KlbCountry>;
    byUuid: {
        [key: string]: KlbCountry;
    };
};
declare const useCountries: () => GlobalCountries;
declare const countriesPromise: () => Promise<unknown>;
declare const useEventBus: () => Emitter<Events>;
declare const useTranslation: () => (key: string, v?: any) => string;

type HistoryState = {
    _router: any | null;
    status: number;
    redirect?: string;
};
declare const useHistory: pinia.StoreDefinition<"historyStore", HistoryState, {
    currentRoute: (state: {
        _router: any | null;
        status: number;
        redirect?: string | undefined;
    } & pinia.PiniaCustomStateProperties<HistoryState>) => any;
}, {
    setStatus(status: number): void;
    _setRouter(_router: Router | null): void;
    push(path: any, status?: number): any;
    replace(path: any, status?: number): any;
    go(delta: number): void;
    back(): void;
    forward(): void;
}>;
interface SSROptions {
    url: string | null;
}
declare function handleSSR(createApp: Function, cb: Function, options?: SSROptions): Promise<any>;

type RootState = {
    user: KlbUser | null;
    cartCount: number;
    cart: KlbCatalogCart | null;
};
declare const useFVStore: pinia.StoreDefinition<"fVStore", RootState, {
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
    } & pinia.PiniaCustomStateProperties<RootState>) => boolean;
}, {
    refreshCart(): Promise<void>;
    refreshCartData(_cart: KlbAPICatalogCart): Promise<void>;
    refreshUser(params?: {}): Promise<void>;
    logout(): Promise<void>;
    setUser(user: KlbUser | null): void;
}>;

declare function rest<ResultType extends KlbAPIResult>(url: string, method?: string, params?: object, ctx?: object): Promise<ResultType>;

declare function useUserCheck(path?: string): void;

interface SeoData {
  name?: string;
  title?: string;
  image?: string;
  imageType?: string;
  imageWidth?: string;
  imageHeight?: string;
  description?: string;
  published?: string;
  modified?: string;
  keywords?: string;
  type?: 'blog' | 'search' | 'article' | 'website';
  searchAction?: string;
  next?: string;
  prev?: string;
}

declare const useSeo: (seo: Ref<SeoData>, initial?: boolean) => void;

declare const components: {
    ClientOnly: vue.DefineComponent<{}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[] | null, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbLogin: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbUpdateEmailModal: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbUpdatePasswordModal: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbDeleteAccount: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbBillingHistory: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbUserLocation: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbAddPaymentMethodModal: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbCatalog: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbOrder: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbUserBilling: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbPage: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbSupport: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    KlbBlog: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyModal: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyCirclePercent: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyConfirm: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyBreadcrumb: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FySteps: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyDatatable: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyTable: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyLoader: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyInput: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyPaging: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyNavbar: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    FyTabs: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
    Fy404View: vue.DefineComponent<{}, {}, any, vue.ComputedOptions, vue.MethodOptions, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;
};
declare const i18nextPromise: (backend: any) => Promise<i18next.TFunction<"translation", undefined>>;
declare const createFyvue: () => Plugin;
declare const helpers: {
    cropText: (str: string, ml?: number, end?: string) => string;
    formatBytes: (bytes: number, decimals?: number) => string;
    formatJPZipcode: (zip: string | number) => string;
    formatDate: (dt: string | number | Date) => string;
    formatDatetime: (dt: string | number | Date) => string;
    formatTimeago: (dt: string | number | Date) => string;
    formatKlbRecurringPaymentCycle: (cycle?: string | undefined) => string;
    eventBus: mitt.Emitter<{
        [key: string]: any;
    }>;
};
declare const helpersSSR: {
    setupClient: (router: vue_router.Router, pinia: pinia.Pinia) => void;
    handleSSR: typeof handleSSR;
    isSSRRendered: () => boolean;
};
declare const KlbUse: {
    useCart: typeof useCart;
    useUserCheck: typeof useUser;
    useOrder: typeof useOrder;
    useBilling: typeof useBilling;
};

export { KlbUse, components, countriesPromise, createFyvue, helpers, helpersSSR, i18nextPromise, rest, useCountries, useEventBus, useFVStore, useHistory, useSeo, useTranslation, useUserCheck };

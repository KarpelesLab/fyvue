export type KlbUUID = string;

export interface KlbDate {
  unix: number;
  us: number;
  iso: string;
  tz: 'UTC' | string;
  full: string;
  unixms: string;
}

export interface KlbPrice {
  display: string;
  currency: string;
  display_short?: string;
  has_vat?: boolean;
  tax_rate?: number;
  value: string;
  value_disp: number;
  value_int: number;
}
export interface KlbClassifyTag {
  Classify_Tag__: KlbUUID;
  Classify__: KlbUUID;
  Color?: string;
  Created: KlbDate;
  Flags: 'category' | 'hidden';
  MetaObject__: KlbUUID;
  Parent_Classify_Tag__?: KlbUUID;
  Priority: number;
  Refcount: number;
  Refcount_Internal: number;
  Refcount_Updated?: KlbDate;
  Full_Name: string;
  Full_Name_Compact: string;
}
export interface KlbPriceTaxes extends KlbPrice {
  raw: KlbPrice;
  tax: KlbPrice;
  tax_only: KlbPrice;
  tax_rate: number;
}
export interface KlbMediaImage {
  Media_Image__: KlbUUID;
  Url: string;
  Variation?: {
    [key: string]: string;
  };
}

/*
  Klb API Results
*/
export interface KlbAPIResult {
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
export interface KlbApiPaging {
  page_no: number;
  results_per_page: number;
  page_max: number;
  page_max_relation: string;
  count: number;
}
export interface KlbAPIResultUnknown extends KlbAPIResult {
  data?: any;
}
export interface KlbAPIResultArray extends KlbAPIResult {
  data: unknown[];
}
export interface KlbAPIOrderProcess extends KlbAPIResult {
  data: KlbOrderProcess;
}
export interface KlbAPIBillingHistory extends KlbAPIResult {
  data: Array<KlbUserBilling>;
}
export interface KlbAPIUserBilling extends KlbAPIResult {
  data: Array<KlbUserBilling>;
}
export interface KlbAPIUserLocation extends KlbAPIResult {
  data: KlbUserLocation;
}
export interface KlbAPIUserLocations extends KlbAPIResult {
  data: Array<KlbUserLocation>;
}
export interface KlbAPICountry extends KlbAPIResult {
  data: Array<KlbCountry>;
}
export interface KlbAPISetupIntent extends KlbAPIResult {
  data: KlbSetupIntent;
}
export interface KlbAPICatalog extends KlbAPIResult {
  data: { data: Array<KlbCatalogProduct> };
}
export interface KlbAPICatalogCart extends KlbAPIResult {
  data: KlbCatalogCart;
}
export interface KlbAPIClassify extends KlbAPIResult {
  data: {
    Root_Tags: Array<KlbClassifyTag>;
  };
}
export interface KlbAPIContentCmsSingle extends KlbAPIResult {
  data: {
    content_cms_entry_data: KlbContentCms;
    content_cms: {
      Name: string;
      Classify: {
        Classify__: KlbUUID;
      };
    };
  };
}
export interface KlbAPIContentCmsSearch extends KlbAPIResult {
  data: {
    data: Array<KlbContentCms>;
    content_cms: {
      Name: string;
      Classify: {
        Classify__: KlbUUID;
      };
    };
  };
}
export interface KlbAPIOrder extends KlbAPIResult {
  data: KlbOrder;
}
export interface KlbAPIOrders extends KlbAPIResult {
  data: Array<KlbOrder>;
}
export interface KlbBillingAndLocation {
  location: KlbUserLocation;
  billing: KlbUserBilling;
}
/*
  USER FLOW
*/
export interface KlbUserFlowButton {
  'background-color': string;
  logo: string;
}

export interface KlbUserFlowField {
  cat?: string;
  label?: string;
  type: string;
  name: string;
  button?: KlbUserFlowButton;
  id?: KlbUUID;
  info?: any; // too lazy
  style?: string;
  link?: string;
}

export interface KlbFlowData {
  fields: KlbUserFlowField[];
  message?: string;
  req: string[];
  session: string;
  complete: boolean;
  email: string | null;
  initial: boolean;
  url?: string;
  user?: KlbUser;
}

export interface KlbUserFlow extends KlbAPIResult {
  data: KlbFlowData;
}

// KlbUser (https://ws.atonline.com/_special/rest/User)
export interface KlbUser {
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
export interface KlbUserProfile {
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
export interface KlbUserGroup {
  Name?: string;
  Nickname?: string;
  Status: 'released' | 'beta' | 'alpha' | 'private';
  Type: 'user' | 'group';
  User_Group__: KlbUUID;
  User__?: KlbUUID;
}

// KlbMetaObject (https://ws.atonline.com/_special/rest/MetaObject)
export interface KlbMetaObject {
  MetaObject__: KlbUUID;
  Object_Type: string;
  Parent_Object__: KlbUUID;
  User_Group__?: KlbUUID;
}

// KlbCountry (https://ws.atonline.com/_special/rest/Country)
export interface KlbCountry {
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
export interface KlbUserLocation {
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

// KlbUserBilling (https://ws.atonline.com/_special/rest/User/Billing)
export interface KlbUserBilling {
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

// KlbRealmPaymentMethod (https://ws.atonline.com/_special/rest/Realm/PaymentMethod)
export interface KlbRealmPaymentMethod {
  Class: string;
  Class_Set?: string;
  Created: KlbDate;
  Editable: 'Y' | 'N';
  Index: number;
  Realm_PaymentMethod__: KlbUUID;
  Realm__: KlbUUID;
  Subaccount?: string;
}

// KlbUserBillingMethod (https://ws.atonline.com/_special/rest/User/Billing/Method)
export interface KlbUserBillingMethod {
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
export interface KlbUserBilling {
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
export interface KlbCatalogProduct {
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
export interface KlbCatalogCart {
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

/*
  SSR
*/
export interface KlbSSR {
  initial?: any;
  uuid?: string;
  meta?: string;
  link?: string;
  bodyAttributes?: string;
  htmlAttributes?: string;
  bodyTags?: string;
  app?: string;
  statusCode?: number;
  redirect?: string;
}

// KlbOrder (https://ws.atonline.com/_special/rest/Order)
export interface KlbOrder {
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

export interface KlbOrderItem {
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
export interface KlbOrderProcess {
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
export interface KlbSetupIntent {
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

export interface KlbContentCms {
  Audience: 'all' | 'web' | 'app';
  Content_Cms_Entry__: KlbUUID;
  Content_Cms__: KlbUUID;
  Created: KlbDate;
  Published: KlbDate;
  Deleted?: KlbDate;
  Drive_Item__?: KlbUUID;
  Import_Key?: string;
  Last_Modified: KlbDate;
  Status: 'valid' | 'deleted';
  Slug: string;
  Contents: string;
  Title: string;
  User__: KlbUUID;
  Tag_Category?: KlbClassifyTag;
  Keywords: Array<string>;
  Comments?: {
    Comment_Count: number;
    Commented: false;
  };
  Top_Drive_Item?: {
    Mime: string;
    Media_Image?: KlbMediaImage;
  };
  Short_Contents?: string;
}

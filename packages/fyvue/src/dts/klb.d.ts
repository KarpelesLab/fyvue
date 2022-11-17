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
export interface KlbAPIBillingHistory extends KlbAPIResult {
  data: Array<KlbUserBilling>;
}
export interface KlbAPIUserLocation extends KlbAPIResult {
  data: KlbUserLocation;
}
export interface KlbAPICountry extends KlbAPIResult {
  data: Array<KlbCountry>;
}
export interface KlbAPICatalog extends KlbAPIResult {
  data: { data: Array<KlbCatalogProduct> };
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
  Price: KlbPrice;
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
  Image: { list: Array<KlbMediaImage> };
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

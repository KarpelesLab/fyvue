/* From karpeleslab/klb-react-services/-/blob/master/src/types/ */
export type UUID = string;
export type URLString = string;
export type UnknownYet = unknown;
export interface TimeUnit {
  unix: number;
  us: number;
  iso: string;
  tz: 'UTC' | string; // add all possible values and remove | string
  full: string;
  unixms: string;
}
export interface MoneyUnit {
  display: string
}
// Users
export interface UserAgreement {
  tos?: boolean;
}
export interface UserGroupOwner {
  _key: UUID;
  type: string;
}
export interface UserGroup {
  Name: string;
  Nickname: string | null;
  Owner: UserGroupOwner;
  Type: 'user' | 'group';
  Status: 'released' | 'beta' | 'alpha' | 'private';
  User_Group__: UUID;
  User__: UUID;
}
export interface MediaImage {
  Media_Image__: UUID;
  Url: URLString;
  Variation?: UnknownYet;
}
export interface UserProfile {
  User_Profile__: UUID;
  Birthdate: string | '0000-00-00';
  Display_Name: string;
  Gender: 'M' | 'F' | 'NB' | null;
  Birthdate_Visibility: 'hidden' | 'year_only' | 'month_day_only' | 'full';
  Allow_Mature_Content: 'Y' | 'N';
  Media_Image?: MediaImage;
}
export interface User {
  Agreements: UserAgreement;
  Created: TimeUnit;
  Current_Group: UserGroup;
  Default_Billing_User_Location__: UUID | null;
  Default_License_User_Location__: UUID | null;
  Default_Shipping_User_Location__: UUID | null;
  Email: string;
  Has_Password: boolean;
  Language__: string;
  Profile: UserProfile;
  User_Profile__: UUID;
  User__: UUID;
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
}
export interface KLBPaging {
  page_no: number;
  results_per_page: number;
  page_max: 1;
  page_max_relation: string;
  count: number;
}

export interface KlbApiResultBase {
  result: 'redirect' | 'success' | 'error';
  param?: string;
  code?: number;
  error?: string;
  request?: UUID;
  time?: number;
  token?: string;
  paging?: KLBPaging;
  fvReject?: boolean;
}
export interface KLBApiResult extends KlbApiResultBase {
  data?: any;
}

/* Fyvue */
// User flow
interface KLBFlowFieldButton {
  'background-color': string;
  logo: string;
}
interface KLBFlowField {
  cat?: string;
  label?: string;
  type: string;
  name: string;
  button?: KLBFlowFieldButton;
  id?: UUID;
  info?: any; // too lazy
  style?: string;
  link?: string;
}
export interface KLBFLowData {
  fields: KLBFlowField[];
  message?: string;
  req: string[];
  session: string;
  complete: boolean;
  email: string | null;
  initial: boolean;
  url?: string;
  user?: User;
}
export interface KLBUserFlow extends KLBApiResult {
  data: KLBFLowData;
}

interface KlbBillingHistory {
  Invoice_Date: TimeUnit;
  Paid: TimeUnit;
  Status: string;
  Total: MoneyUnit;
  Invoice_Url: URLString;

}
export interface KlbApiResultArray extends KlbApiResultBase {
  data: []
}

export interface KlbBillingHistoryResult extends KlbApiResultBase {
  data: Array<KlbBillingHistory>
}
export  interface KlbUserLocation {
  Display_Name: string,
  First_Name: string,
  Last_Name: string,
  User_Location__: UUID,
  Country__: UUID
  Zip: string
}
export interface KlbUserLocationResult extends KlbApiResultBase {
  data: KlbUserLocation
}
export  interface KlbPaymentMethod {
  Name: string,
  Expiration: string
  Billing_Method: string,
  User_Billing_Method__: UUID,
  User_Billing__: UUID
}
export  interface KlbUserBilling {
  Created: TimeUnit,
  Label?: string,
  User_Billing__: UUID,
  User_Location__: UUID
  User__: UUID,
  Methods: Array<KlbPaymentMethod>
}
export interface KlbUserBillingResult extends KlbApiResultBase {
  data: Array<KlbUserBilling>
}

export interface KlbCountry {
  Country__: UUID;
  Name: string;
}
export interface KlbCountriesResult extends KlbApiResultBase {
  data: Array<KlbCountry>
}

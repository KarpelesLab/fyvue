/* From karpeleslab/klb-react-services/-/blob/master/src/types/ */
type InternalUUID = string;
type UUID = string;
type URLString = string;
type UnknownYet = unknown;
interface TimeUnit {
    unix: number;
    us: number;
    iso: string;
    tz: 'UTC' | string; // add all possible values and remove | string
    full: string;
    unixms: string;
}
// Users
interface UserAgreement {
  tos?: boolean;
}
interface UserGroupOwner {
  _key: UUID;
  type: string;
}
interface UserGroup {
  Name: string;
  Nickname: string | null;
  Owner: UserGroupOwner;
  Type: 'user' | 'group';
  Status: 'released' | 'beta' | 'alpha' | 'private';
  User_Group__: UUID;
  User__: UUID;
}
interface MediaImage {
  Media_Image__: UUID;
  Url: URLString;
  Variation?: UnknownYet
}
interface UserProfile {
  User_Profile__: UUID;
  Birthdate: string | '0000-00-00';
  Display_Name: string;
  Gender: 'M' | 'F' | 'NB' | null
  Birthdate_Visibility: 'hidden' | 'year_only' | 'month_day_only' | 'full';
  Allow_Mature_Content: 'Y' | 'N';
  Media_Image?: MediaImage;
}
interface User {
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
  Status: 'shadow' | 'valid' | 'sub' | 'banned' | 'delete_pending' | 'deleted' | 'validating' | 'compromised' | 'frozen' | 'expired' | 'purged';
}
interface KLBPaging {
  page_no: number
  results_per_page: number
  page_max: 1
  page_max_relation: string
  count: number
}
interface KLBApiResult {
  result: 'redirect' | 'success' | 'error'
  time: number
  data: any
  paging?: KLBPaging
}
interface KLBApiError {
  token: string,
  param?: string
}

/* Fyvue */
// User flow
interface KLBFlowFieldButton {
  'background-color': string,
  logo: string,
}
interface KLBFlowField {
  cat?: string
  label?: string
  type: string
  name: string
  button?: KLBFlowFieldButton
  id?: InternalUUID
  info?: any // too lazy
  style?: string
  link?: string
}
interface KLBFLowData {
  fields: KLBFlowField[]
  message?: string
  req: string[]
  session: string
  complete: boolean
  email: string|null
  initial: boolean
  url?: string
  user?: User
}
interface KLBUserFlow extends KLBApiResult {
  data: KLBFLowData
}

export { InternalUUID, KLBApiError, KLBApiResult, KLBFLowData, KLBPaging, KLBUserFlow, MediaImage, TimeUnit, URLString, UUID, UnknownYet, User, UserAgreement, UserGroup, UserGroupOwner, UserProfile };

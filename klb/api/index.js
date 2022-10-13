import {
  getUserBilling,
  updateBillingByID,
  getPaymentHistory,
  changePaymentMethodByID,
  getPaymentMethod,
  createBillingProfile,
} from "./billing";
import { getCountries, getLocationByID, updateLocationByID } from "./location";
import { getUser, userLogout, updatePwd, updateEmail } from "./user";
import i18next from "./i18n";

const KlbBilling = {
  getUserBilling,
  updateBillingByID,
  getPaymentHistory,
  changePaymentMethodByID,
  getPaymentMethod,
  createBillingProfile,
};
const KlbLocation = { getCountries, getLocationByID, updateLocationByID };
const KlbUser = { getUser, userLogout, updatePwd, updateEmail };

export { KlbBilling, KlbLocation, KlbUser, i18next };

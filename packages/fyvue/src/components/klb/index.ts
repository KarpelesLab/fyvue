import KlbLogin from './KlbLogin/KlbLogin.vue';
import KlbUpdateEmailModal from './KlbAccount/KlbUpdateEmailModal.vue';
import KlbUpdatePasswordModal from './KlbAccount/KlbUpdatePasswordModal.vue';
import KlbDeleteAccount from './KlbAccount/KlbDeleteAccount.vue';
import KlbBillingHistory from './KlbBilling/KlbBillingHistory.vue';
import KlbUserLocation from './KlbUser/KlbUserLocation.vue';
import KlbUserBilling from './KlbUser/KlbUserBilling.vue';
import KlbAddPaymentMethodModal from './KlbBilling/KlbAddPaymentMethodModal.vue';
import KlbCatalog from './KlbOrder/KlbCatalog.vue';
import KlbOrder from './KlbOrder/KlbOrder.vue';
import KlbPage from './KlbCMS/KlbPage.vue';
import KlbBlog from './KlbCMS/KlbBlog.vue';
import KlbSupport from './KlbMisc/KlbSupport.vue';

import { useCart } from './KlbOrder/useCart';
import { useUser } from './KlbUser/useUser';
import { useOrder } from './KlbOrder/userOrder';
import { useBilling } from './KlbBilling/useBilling';
export default {
  components: {
    KlbLogin,
    KlbUpdateEmailModal,
    KlbUpdatePasswordModal,
    KlbDeleteAccount,
    KlbBillingHistory,
    KlbUserLocation,
    KlbAddPaymentMethodModal,
    KlbCatalog,
    KlbOrder,
    KlbUserBilling,
    KlbPage,
    KlbSupport,
    KlbBlog,
  },
  composables: {
    useCart,
    useUserCheck: useUser,
    useOrder,
    useBilling,
  },
};

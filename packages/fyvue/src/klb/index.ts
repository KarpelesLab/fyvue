import FyNavbar from './components/FyNavbar.vue';
import KlbUpdateEmailModal from './components/KlbAccount/KlbUpdateEmailModal.vue';
import KlbUpdatePasswordModal from './components/KlbAccount/KlbUpdatePasswordModal.vue';
import KlbDeleteAccount from './components/KlbAccount/KlbDeleteAccount.vue';
import KlbBillingHistory from './components/KlbBilling/KlbBillingHistory.vue';
import KlbUserLocation from './components/KlbUser/KlbUserLocation.vue';
import KlbUserBilling from './components/KlbUser/KlbUserBilling.vue';
import KlbAddPaymentMethodModal from './components/KlbBilling/KlbAddPaymentMethodModal.vue';
import KlbCatalog from './components/KlbOrder/KlbCatalog.vue';
import KlbOrder from './components/KlbOrder/KlbOrder.vue';
import KlbPage from './components/KlbCMS/KlbPage.vue';
import KlbBlog from './components/KlbCMS/KlbBlog.vue';
import KlbSupport from './components/KlbMisc/KlbSupport.vue';
import KlbLogin from './components/KlbLogin/KlbLogin.vue';

import { useCart } from './components/KlbOrder/useCart';
import { useUser } from './components/KlbUser/useUser';
import { useOrder } from './components/KlbOrder/userOrder';
import { useBilling } from './components/KlbBilling/useBilling';

export default {
  components: {
    KlbLogin,
    FyNavbar,
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

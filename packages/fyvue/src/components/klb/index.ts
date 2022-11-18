import KlbLogin from './KlbLogin/KlbLogin.vue';
import KlbUpdateEmailModal from './KlbAccount/KlbUpdateEmailModal.vue';
import KlbUpdatePasswordModal from './KlbAccount/KlbUpdatePasswordModal.vue';
import KlbDeleteAccount from './KlbAccount/KlbDeleteAccount.vue';
import KlbBillingHistory from './KlbBilling/KlbBillingHistory.vue';
import KlbUpdatePaymentMethod from './KlbBilling/KlbUpdatePaymentMethod.vue';
import KlbUpdateBillingLocation from './KlbBilling/KlbUpdateBillingLocation.vue';
import KlbAddPaymentMethodModal from './KlbBilling/KlbAddPaymentMethodModal.vue';
import KlbCatalog from './KlbOrder/KlbCatalog.vue';
import KlbOrder from './KlbOrder/KlbOrder.vue';

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
    KlbUpdatePaymentMethod,
    KlbUpdateBillingLocation,
    KlbAddPaymentMethodModal,
    KlbCatalog,
    KlbOrder,
  },
  composables: {
    useCart,
    useUserCheck: useUser,
    useOrder,
    useBilling,
  },
};

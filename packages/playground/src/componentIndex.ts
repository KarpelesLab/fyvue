const uiComponents = [
  'FyInput',
  'FyLoader',
  'FyBreadcrumb',
  'FyCirclePercent',
  'FyConfirm',
  'FyDatatable',
  'FyNavbar',
  'FyPaging',
  'FySteps',
  'FyTable',
];
const KlbComponents = [
  'KlbDeleteAccount',
  'KlbUpdateEmailModal',
  'KlbUpdatePasswordModal',
  'KlbAddPaymentMethodModal',
  'KlbBillingHistory',
  'KlbUpdateBillingLocation',
  'KlbUpdatePaymentMethod',
  'KlbLogin',
  'useUserCheck',
];

const miscComponents = ['Button', 'Typo', 'ClientOnly'];

export default {
  ui: uiComponents.sort(),
  klb: KlbComponents.sort(),
  misc: miscComponents.sort(),
};

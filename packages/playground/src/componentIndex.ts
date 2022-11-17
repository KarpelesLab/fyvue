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
  'FyTabs',
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
  'KlbCatalog',
];

const miscComponents = ['Button', 'Typo', 'ClientOnly'];

export default {
  ui: uiComponents.sort(),
  klb: KlbComponents.sort(),
  misc: miscComponents.sort(),
};

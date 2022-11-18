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
  'KlbUserLocation',
  'KlbUserBilling',
  'KlbLogin',
  'useUserCheck',
  'KlbCatalog',
  'KlbOrder',
];

const miscComponents = ['Button', 'Typo', 'ClientOnly'];

export default {
  ui: uiComponents.sort(),
  klb: KlbComponents.sort(),
  misc: miscComponents.sort(),
};

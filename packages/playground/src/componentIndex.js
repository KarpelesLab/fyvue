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
  'KlbUpdatePasswordPModal',
  'KlbAddPaymentMethodModal',
  'KlbBillingHistory',
  'KlbUpdateBillingLocation',
  'KlbUpdatePaymentMethod',
  'KlbLogin',
  'KlbUserCheck',
];

const CSSComponents = ['Button', 'Typo', 'Helpers'];

export default {
  ui: uiComponents.sort(),
  klb: KlbComponents.sort(),
  css: CSSComponents.sort(),
};

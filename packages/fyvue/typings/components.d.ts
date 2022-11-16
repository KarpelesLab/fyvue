import { GlobalCountries } from '../src/utils/helpers';

declare module 'vue' {
  export interface GlobalComponents {
    // Fyvue
    FyBreadcrumb: typeof import('../src')['components']['FyBreadcrumb'];
    FyModal: typeof import('../src')['components']['FyModal'];
    FyConfirm: typeof import('../src')['components']['FyConfirm'];
    FyCirclePercent: typeof import('../src')['components']['FyCirclePercent'];
    FySteps: typeof import('../src')['components']['FySteps'];
    FyDatatable: typeof import('../src')['components']['FyDatatable'];
    FyTable: typeof import('../src')['components']['FyTable'];
    FyLoader: typeof import('../src')['components']['FyLoader'];
    FyInput: typeof import('../src')['components']['FyInput'];
    FyPaging: typeof import('../src')['components']['FyPaging'];
    FyNavbar: typeof import('../src')['components']['FyNavbar'];

    // KLB
    KlbLogin: typeof import('../src')['components']['KlbLogin'];
    KlbUpdateEmailModal: typeof import('../src')['components']['KlbUpdateEmailModal'];
    KlbUpdatePasswordModal: typeof import('../src')['components']['KlbUpdatePasswordModal'];
    KlbDeleteAccount: typeof import('../src')['components']['KlbDeleteAccount'];
    KlbBillingHistory: typeof import('../src')['components']['KlbBillingHistory'];
    KlbUpdatePaymentMethod: typeof import('../src')['components']['KlbUpdatePaymentMethod'];
    KlbUpdateBillingLocation: typeof import('../src')['components']['KlbUpdateBillingLocation'];
    KlbAddPaymentMethodModal: typeof import('../src')['components']['KlbAddPaymentMethodModal'];

    // Helpers
    ClientOnly: typeof import('../src')['components']['ClientOnly'];
  }
  interface ComponentCustomProperties {
    $t: typeof import('i18next').t;
    $eventBus: typeof import('../src/utils/helpers')['eventBus'];
    $cropText: typeof import('../src')['helpers']['cropText'];
    $formatBytes: typeof import('../src')['helpers']['formatBytes'];
    $countries: GlobalCountries;
  }
}

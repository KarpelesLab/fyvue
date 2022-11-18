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
    FyTabs: typeof import('../src')['components']['FyTabs'];

    // KLB
    KlbLogin: typeof import('../src')['components']['KlbLogin'];
    KlbUpdateEmailModal: typeof import('../src')['components']['KlbUpdateEmailModal'];
    KlbUpdatePasswordModal: typeof import('../src')['components']['KlbUpdatePasswordModal'];
    KlbDeleteAccount: typeof import('../src')['components']['KlbDeleteAccount'];
    KlbBillingHistory: typeof import('../src')['components']['KlbBillingHistory'];
    KlbUserBilling: typeof import('../src')['components']['KlbUserBilling'];
    KlbUserLocation: typeof import('../src')['components']['KlbUserLocation'];
    KlbAddPaymentMethodModal: typeof import('../src')['components']['KlbAddPaymentMethodModal'];
    KlbCatalog: typeof import('../src')['components']['KlbCatalog'];
    KlbOrder: typeof import('../src')['components']['KlbOrder'];

    // Helpers
    ClientOnly: typeof import('../src')['components']['ClientOnly'];
  }
  interface ComponentCustomProperties {
    $t: (key: string, v?: any | undefined) => string;
    $eventBus: typeof import('../src/utils/helpers')['eventBus'];
    $cropText: typeof import('../src')['helpers']['cropText'];
    $formatBytes: typeof import('../src')['helpers']['formatBytes'];
    $formatJPZipcode: typeof import('../src')['helpers']['formatJPZipcode'];
    $formatDate: typeof import('../src')['helpers']['formatDate'];
    $formatTimeago: typeof import('../src')['helpers']['formatTimeago'];
    $formatKlbRecurringPaymentCycle: typeof import('../src')['helpers']['formatKlbRecurringPaymentCycle'];
    $formatDatetime: typeof import('../src')['helpers']['formatDatetime'];

    $countries: GlobalCountries;
  }
}

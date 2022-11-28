import { GlobalCountries } from '../utils/helpers';

declare module 'vue' {
  export interface GlobalComponents {
    // Fyvue
    FyBreadcrumb: typeof import('../index')['components']['FyBreadcrumb'];
    FyModal: typeof import('../index')['components']['FyModal'];
    FyConfirm: typeof import('../index')['components']['FyConfirm'];
    FyCirclePercent: typeof import('../index')['components']['FyCirclePercent'];
    FySteps: typeof import('../index')['components']['FySteps'];
    FyDatatable: typeof import('../index')['components']['FyDatatable'];
    FyTable: typeof import('../index')['components']['FyTable'];
    FyLoader: typeof import('../index')['components']['FyLoader'];
    FyInput: typeof import('../index')['components']['FyInput'];
    FyPaging: typeof import('../index')['components']['FyPaging'];
    FyNavbar: typeof import('../index')['components']['FyNavbar'];
    FyTabs: typeof import('../index')['components']['FyTabs'];

    // KLB
    KlbLogin: typeof import('../index')['components']['KlbLogin'];
    KlbUpdateEmailModal: typeof import('../index')['components']['KlbUpdateEmailModal'];
    KlbUpdatePasswordModal: typeof import('../index')['components']['KlbUpdatePasswordModal'];
    KlbDeleteAccount: typeof import('../index')['components']['KlbDeleteAccount'];
    KlbBillingHistory: typeof import('../index')['components']['KlbBillingHistory'];
    KlbUserBilling: typeof import('../index')['components']['KlbUserBilling'];
    KlbUserLocation: typeof import('../index')['components']['KlbUserLocation'];
    KlbAddPaymentMethodModal: typeof import('../index')['components']['KlbAddPaymentMethodModal'];
    KlbCatalog: typeof import('../index')['components']['KlbCatalog'];
    KlbOrder: typeof import('../index')['components']['KlbOrder'];
    KlbPage: typeof import('../index')['components']['KlbPage'];
    KlbSupport: typeof import('../index')['components']['KlbSupport'];
    KlbBlog: typeof import('../index')['components']['KlbBlog'];
    Fy404View: typeof import('../index')['components']['Fy404View'];

    // Helpers
    ClientOnly: typeof import('../index')['components']['ClientOnly'];
  }
  interface ComponentCustomProperties {
    $t: (key: string, v?: any | undefined) => string;
    $eventBus: typeof import('../index')['helpers']['eventBus'];
    $cropText: typeof import('../index')['helpers']['cropText'];
    $formatBytes: typeof import('../index')['helpers']['formatBytes'];
    $formatJPZipcode: typeof import('../index')['helpers']['formatJPZipcode'];
    $formatDate: typeof import('../index')['helpers']['formatDate'];
    $formatTimeago: typeof import('../index')['helpers']['formatTimeago'];
    $formatKlbRecurringPaymentCycle: typeof import('../index')['helpers']['formatKlbRecurringPaymentCycle'];
    $formatDatetime: typeof import('../index')['helpers']['formatDatetime'];

    $countries: GlobalCountries;
  }
}

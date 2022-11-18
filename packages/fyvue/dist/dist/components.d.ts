import { GlobalCountries } from '@karpeleslab/fyvue/dist/utils/helpers';

declare module 'vue' {
  export interface GlobalComponents {
    // Fyvue
    FyBreadcrumb: typeof import('@karpeleslab/fyvue')['components']['FyBreadcrumb'];
    FyModal: typeof import('@karpeleslab/fyvue')['components']['FyModal'];
    FyConfirm: typeof import('@karpeleslab/fyvue')['components']['FyConfirm'];
    FyCirclePercent: typeof import('@karpeleslab/fyvue')['components']['FyCirclePercent'];
    FySteps: typeof import('@karpeleslab/fyvue')['components']['FySteps'];
    FyDatatable: typeof import('@karpeleslab/fyvue')['components']['FyDatatable'];
    FyTable: typeof import('@karpeleslab/fyvue')['components']['FyTable'];
    FyLoader: typeof import('@karpeleslab/fyvue')['components']['FyLoader'];
    FyInput: typeof import('@karpeleslab/fyvue')['components']['FyInput'];
    FyPaging: typeof import('@karpeleslab/fyvue')['components']['FyPaging'];
    FyNavbar: typeof import('@karpeleslab/fyvue')['components']['FyNavbar'];
    FyTabs: typeof import('@karpeleslab/fyvue')['components']['FyTabs'];

    // KLB
    KlbLogin: typeof import('@karpeleslab/fyvue')['components']['KlbLogin'];
    KlbUpdateEmailModal: typeof import('@karpeleslab/fyvue')['components']['KlbUpdateEmailModal'];
    KlbUpdatePasswordModal: typeof import('@karpeleslab/fyvue')['components']['KlbUpdatePasswordModal'];
    KlbDeleteAccount: typeof import('@karpeleslab/fyvue')['components']['KlbDeleteAccount'];
    KlbBillingHistory: typeof import('@karpeleslab/fyvue')['components']['KlbBillingHistory'];
    KlbUpdatePaymentMethod: typeof import('@karpeleslab/fyvue')['components']['KlbUpdatePaymentMethod'];
    KlbUpdateBillingLocation: typeof import('@karpeleslab/fyvue')['components']['KlbUpdateBillingLocation'];
    KlbAddPaymentMethodModal: typeof import('@karpeleslab/fyvue')['components']['KlbAddPaymentMethodModal'];
    KlbCatalog: typeof import('@karpeleslab/fyvue')['components']['KlbCatalog'];
    KlbOrder: typeof import('@karpeleslab/fyvue')['components']['KlbOrder'];

    // Helpers
    ClientOnly: typeof import('@karpeleslab/fyvue')['components']['ClientOnly'];
  }
  interface ComponentCustomProperties {
    $t: (key: string, v?: any | undefined) => string;
    $eventBus: typeof import('@karpeleslab/fyvue/dist/utils/helpers')['eventBus'];
    $cropText: typeof import('@karpeleslab/fyvue')['helpers']['cropText'];
    $formatBytes: typeof import('@karpeleslab/fyvue')['helpers']['formatBytes'];
    $formatJPZipcode: typeof import('@karpeleslab/fyvue')['helpers']['formatJPZipcode'];
    $formatDate: typeof import('@karpeleslab/fyvue')['helpers']['formatDate'];
    $formatTimeago: typeof import('@karpeleslab/fyvue')['helpers']['formatTimeago'];
    $formatKlbRecurringPaymentCycle: typeof import('@karpeleslab/fyvue')['helpers']['formatKlbRecurringPaymentCycle'];
    $formatDatetime: typeof import('@karpeleslab/fyvue')['helpers']['formatDatetime'];

    $countries: GlobalCountries;
  }
}

export { }

declare module "vue" {
  export interface GlobalComponents {
    // Fyvue
    FyBreadcrumb: typeof import("@karpeleslab/fyvue")["components"]["FyBreadcrumb"];
    FyModal: typeof import("@karpeleslab/fyvue")["components"]["FyModal"];
    FyConfirm: typeof import("@karpeleslab/fyvue")["components"]["FyConfirm"];
    FyCirclePercent: typeof import("@karpeleslab/fyvue")["components"]["FyCirclePercent"];
    FySteps: typeof import("@karpeleslab/fyvue")["components"]["FySteps"];
    FyDatatable: typeof import("@karpeleslab/fyvue")["components"]["FyDatatable"];
    FyTable: typeof import("@karpeleslab/fyvue")["components"]["FyTable"];
    FyLoader: typeof import("@karpeleslab/fyvue")["components"]["FyLoader"];
    FyInput: typeof import("@karpeleslab/fyvue")["components"]["FyInput"];
    FyPaging: typeof import("@karpeleslab/fyvue")["components"]["FyPaging"];
    FyNavbar: typeof import("@karpeleslab/fyvue")["components"]["FyNavbar"];

    // KLB
    KlbLogin: typeof import("@karpeleslab/fyvue")["components"]["KlbLogin"];
    KlbUpdateEmailModal: typeof import("@karpeleslab/fyvue")["components"]["KlbUpdateEmailModal"];
    KlbUpdatePasswordModal: typeof import("@karpeleslab/fyvue")["components"]["KlbUpdatePasswordModal"];
    KlbDeleteAccount: typeof import("@karpeleslab/fyvue")["components"]["KlbDeleteAccount"];
    KlbBillingHistory: typeof import("@karpeleslab/fyvue")["components"]["KlbBillingHistory"];
    KlbUpdatePaymentMethod: typeof import("@karpeleslab/fyvue")["components"]["KlbUpdatePaymentMethod"];
    KlbUpdateBillingLocation: typeof import("@karpeleslab/fyvue")["components"]["KlbUpdateBillingLocation"];
    KlbAddPaymentMethodModal: typeof import("@karpeleslab/fyvue")["components"]["KlbAddPaymentMethodModal"];
  }
  interface ComponentCustomProperties {
    $t: typeof import("i18next").t;
    $eventBus: typeof import("@karpeleslab/fyvue/")["eventBus"];
    $cropText: typeof import("@karpeleslab/fyvue")["helpers"]["cropText"];
    $formatBytes: typeof import("@karpeleslab/fyvue")["helpers"]["formatBytes"];
    $countries: typeof import("@karpeleslab/fyvue")["helpers"]["countries"];

  }
}

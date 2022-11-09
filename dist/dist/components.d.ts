export { }

declare module "vue" {
  export interface GlobalComponents {
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
    KlbLogin: typeof import("@karpeleslab/fyvue")["components"]["KlbLogin"];
  }

  interface ComponentCustomProperties {
    $t: typeof import("@karpeleslab/fyvue")["helpers"]["i18next"];
    $eventBus: typeof import("@karpeleslab/fyvue/")["useEventBus"];
    $cropText: typeof import("@karpeleslab/fyvue")["helpers"]["cropText"];
    $formatBytes: typeof import("@karpeleslab/fyvue")["helpers"]["formatBytes"]
  }
}

export { }

declare module 'vue' {
  export interface GlobalComponents {
    FyBreadcrumb: typeof import('../src/')['components']['FyBreadcrumb'],
    FyModal: typeof import('../src/')['components']['FyModal'],
    FyConfirm: typeof import('../src/')['components']['FyConfirm'],
    FyCirclePercent: typeof import('../src/')['components']['FyCirclePercent'],
    FySteps: typeof import('../src/')['components']['FySteps'],
    FyDatatable: typeof import('../src/')['components']['FyDatatable'],
    FyTable: typeof import('../src/')['components']['FyTable'],
    FyLoader: typeof import('../src/')['components']['FyLoader'],
    FyInput: typeof import('../src/')['components']['FyInput'],
    FyPaging: typeof import('../src/')['components']['FyPaging'],
    KlbLogin: typeof import('../src/')['components']['KlbLogin'],
  }

  interface ComponentCustomProperties {
    $t: typeof import('../src/')['helpers']['i18next'],
    $eventBus: typeof import('../src/helpers').useEventBus,
    $cropText: typeof import('../src/')['helpers']['cropText'],
    $formatBytes: typeof import('../src/')['helpers']['formatBytes']
  }
}

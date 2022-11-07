export {}
import FyModal from '../src/components/ui/FyModal/FyModal.vue';
import FyBreadcrumb from '../src/components/ui/FyBreadcrumb/FyBreadcrumb.vue';
import FyConfirm from '../src/components/ui/FyConfirm/FyConfirm.vue';
import FyCirclePercent from '../src/components/ui/FyCirclePercent/FyCirclePercent.vue';
import FySteps from '../src/components/ui/FySteps/FySteps.vue';

declare module 'vue' {
  export interface GlobalComponents {
    FyBreadcrumb: typeof FyBreadcrumb,
    FyModal: typeof FyModal,
    FyConfirm: typeof FyConfirm,
    FyCirclePercent: typeof FyCirclePercent,
    FySteps: typeof FySteps,
  }

  interface ComponentCustomProperties {
    $t: typeof import('../src/helpers').i18next.t,
    $eventBus: typeof import('../src/helpers').eventBus,
    $cropText: typeof import('../src/displayHelpers').cropText,
    $formatBytes: typeof import('../src/displayHelpers').formatBytes
  }
}

import type { App, Plugin } from 'vue';
import { BackendModule } from 'i18next';
import klb from './klb';
import {
  useCountries,
  countriesPromise,
  countries,
  GlobalCountries,
} from './klb/helpers';
import {
  handleSSR,
  setupClient,
  useHistory,
  isSSRRendered,
} from './klb/helpers/ssr';
import { useFVStore } from './klb/helpers/store';
import { rest, restFetch } from './klb/helpers/rest';
import type { FyvueOptions } from './klb/types';
import { useUserCheck } from './klb/components/KlbUser/useUserCheck';
import { getLocale } from '@karpeleslab/klbfw';
import { useSeo } from './misc/seo';
import {
  createFyCore,
  useEventBus,
  useTranslation,
  i18nextPromise as _i18nextPromise,
} from '@fy-/core';
import {
  createFyUI,
  CirclePercent,
  NavBreadcrumb,
  ConfirmModal,
  DefaultModal,
  DefaultInput,
  DefaultLoader,
  DefaultPaging,
  DefaultSteps,
  DefaultTable,
  DefaultError404,
} from '@fy-/ui';
import {
  cropText,
  formatBytes,
  formatTimeago,
  formatDatetime,
  jpZipcode,
  formatRecurringPaymentCycle,
  formatDate,
} from '@fy-/core';

import FyNavbar from './klb/components/FyNavbar.vue';
import './klb/index.scss';

const i18nextPromise = (backend: BackendModule) => {
  return _i18nextPromise(backend, getLocale());
};

// fix this
const components = { ...klb.components };

const createFyvue = () => {
  const fycore = createFyCore();
  const fyui = createFyUI();
  const install = (app: App, options?: FyvueOptions | undefined) => {
    if (!options) options = { loadKlb: true };

    app.use(fycore);
    app.use(fyui);

    // Alias for compatibility for fyvue < 0.2.x
    app.component('FyCirclePercent', CirclePercent);
    app.component('FyBreadcrumb', NavBreadcrumb);
    app.component('FyConfirm', ConfirmModal);
    app.component('FyModal', DefaultModal);
    app.component('FyInput', DefaultInput);
    app.component('FyLoader', DefaultLoader);
    app.component('FyPaging', DefaultPaging);
    app.component('FySteps', DefaultSteps);
    app.component('FyTable', DefaultTable);
    app.component('FyDatatable', DefaultTable);
    app.component('FyError404', DefaultError404);
    app.component('FyNavbar', FyNavbar);
    // End aliases.

    if (options.loadKlb) {
      app.config.globalProperties.$countries = countries;
      let klbComponent: keyof typeof klb.components;
      for (klbComponent in klb.components) {
        app.component(
          klb.components[klbComponent].__name!,
          klb.components[klbComponent]
        );
      }
    }
  };
  return <Plugin>{
    install,
  };
};

const helpers = {
  // Alias for compatibility for fyvue < 0.2.x
  cropText,
  formatBytes,
  formatJPZipcode: jpZipcode,
  formatDate,
  formatDatetime,
  formatTimeago,
  formatKlbRecurringPaymentCycle: formatRecurringPaymentCycle,
};
const helpersSSR = {
  // Alias for compatibility for fyvue < 0.2.x
  setupClient,
  handleSSR,
  isSSRRendered,
};
const KlbUse = {
  ...klb.composables,
};
export {
  createFyvue,
  useEventBus,
  useTranslation,
  useUserCheck,
  useSeo,
  useFVStore,
  useHistory,
  useCountries,
  countriesPromise,
  components,
  helpers,
  helpersSSR,
  rest,
  restFetch,
  KlbUse,
  i18nextPromise,
};
declare module 'vue' {
  export interface ComponentCustomProperties {
    $countries: GlobalCountries;
  }
  export interface GlobalComponents {
    FyNavbar: typeof import('./klb/components/FyNavbar.vue')['default'];
    KlbAddPaymentMethodModal: typeof import('./klb/components/KlbBilling/KlbAddPaymentMethodModal.vue')['default'];
    KlbBillingHistory: typeof import('./klb/components/KlbBilling/KlbBillingHistory.vue')['default'];
    KlbBlog: typeof import('./klb/components/KlbCMS/KlbBlog.vue')['default'];
    KlbBlogInnerPost: typeof import('./klb/components/KlbCMS/KlbBlogInnerPost.vue')['default'];
    KlbCatalog: typeof import('./klb/components/KlbOrder/KlbCatalog.vue')['default'];
    KlbComments: typeof import('./klb/components/KlbCMS/KlbComments.vue')['default'];
    KlbDeleteAccount: typeof import('./klb/components/KlbAccount/KlbDeleteAccount.vue')['default'];
    KlbLogin: typeof import('./klb/components/KlbLogin/KlbLogin.vue')['default'];
    KlbOrder: typeof import('./klb/components/KlbOrder/KlbOrder.vue')['default'];
    KlbPage: typeof import('./klb/components/KlbCMS/KlbPage.vue')['default'];
    KlbProcessOrderInternal: typeof import('./klb/components/KlbOrder/KlbProcessOrderInternal.vue')['default'];
    KlbSupport: typeof import('./klb/components/KlbMisc/KlbSupport.vue')['default'];
    KlbUpdateBillingLocation: typeof import('./klb/components/KlbBilling/KlbUpdateBillingLocation.vue')['default'];
    KlbUpdateEmailModal: typeof import('./klb/components/KlbAccount/KlbUpdateEmailModal.vue')['default'];
    KlbUpdatePasswordModal: typeof import('./klb/components/KlbAccount/KlbUpdatePasswordModal.vue')['default'];
    KlbUserBilling: typeof import('./klb/components/KlbUser/KlbUserBilling.vue')['default'];
    KlbUserLocation: typeof import('./klb/components/KlbUser/KlbUserLocation.vue')['default'];
  }
}

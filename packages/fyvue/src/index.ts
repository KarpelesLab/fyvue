import type { App, Plugin } from 'vue';
//import Backend from '../lib/klb-i18n-backend.js';
import i18next, { BackendModule } from 'i18next';
import uiComponents from './components/ui';
import klb from './components/klb';
import helpersComponents from './components/helpers';
import {
  //eventBus,
  // useEventBus,
  // useTranslation,
  useCountries,
  countriesPromise,
  countries,
} from './utils/helpers';
import {
  cropText,
  formatBytes,
  formatDate,
  formatTimeago,
  formatDatetime,
  formatKlbRecurringPaymentCycle,
  jpZipcode,
} from './utils/display';
import { handleSSR, setupClient, useHistory, isSSRRendered } from './utils/ssr';
import { useFVStore } from './utils/store';
import { rest, restFetch } from './utils/rest';
import type { FyvueOptions } from './dts';
import { useUserCheck } from './components/klb/KlbUser/useUserCheck';
import { getLocale } from '@karpeleslab/klbfw';
import { useSeo } from './components/helpers/seo';
import {
  createFyCore,
  useEventBus,
  useTranslation,
  i18nextPromise as _i18nextPromise,
} from '@fy-/core';
import { createFyUI } from '@fy-/ui';
import './fyvue.scss';

const i18nextPromise = (backend: BackendModule) => {
  return _i18nextPromise(backend, getLocale());
};

const components = { ...uiComponents, ...klb.components, ...helpersComponents };

const createFyvue = () => {
  const fycore = createFyCore();
  const fyui = createFyUI();
  const install = (app: App, options?: FyvueOptions | undefined) => {
    if (!options) options = { loadKlb: true };

    app.use(fycore);
    app.use(fyui);
    //app.config.globalProperties.$eventBus = eventBus;
    //app.config.globalProperties.$t = i18next.t;
    app.config.globalProperties.$cropText = cropText;
    app.config.globalProperties.$formatBytes = formatBytes;
    app.config.globalProperties.$formatDate = formatDate;
    app.config.globalProperties.$formatTimeago = formatTimeago;
    app.config.globalProperties.$formatDatetime = formatDatetime;
    app.config.globalProperties.$formatJPZipcode = jpZipcode;
    app.config.globalProperties.$formatKlbRecurringPaymentCycle =
      formatKlbRecurringPaymentCycle;
    app.config.globalProperties.$jpZipcode = jpZipcode;

    let k: keyof typeof uiComponents;
    for (k in uiComponents) {
      app.component(uiComponents[k].__name!, uiComponents[k]);
    }

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
    let hlp: keyof typeof helpersComponents;
    for (hlp in helpersComponents) {
      app.component(helpersComponents[hlp].__name!, helpersComponents[hlp]);
    }
  };
  return <Plugin>{
    install,
  };
};

const helpers = {
  cropText,
  formatBytes,
  formatJPZipcode: jpZipcode,
  formatDate,
  formatDatetime,
  formatTimeago,
  formatKlbRecurringPaymentCycle,
};
const helpersSSR = {
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

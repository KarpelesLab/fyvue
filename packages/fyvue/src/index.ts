import type { App, Plugin } from 'vue';
import uiComponents from './components/ui';
import klbComponents from './components/klb';
import {
  eventBus,
  useEventBus,
  useTranslation,
  useCountries,
  i18next,
  i18nextPromise,
  countriesPromise,
  countries,
} from './utils/helpers';
import {
  cropText,
  formatBytes,
  tailwindColors,
  jpZipcode,
} from './utils/display';
import { handleSSR, setupClient, useHistory, isSSRRendered } from './utils/ssr';
import { useFVStore } from './utils/store';
import { rest } from './utils/rest';
import type { FyvueOptions } from './dts';

const components = { ...uiComponents, ...klbComponents };

const createFyvue = () => {
  const install = (app: App, options?: FyvueOptions) => {
    app.config.globalProperties.$eventBus = eventBus;
    app.config.globalProperties.$t = i18next.t;
    app.config.globalProperties.$cropText = cropText;
    app.config.globalProperties.$formatBytes = formatBytes;
    app.config.globalProperties.$jpZipcode = jpZipcode;
    app.config.globalProperties.$countries = countries;

    let k: keyof typeof uiComponents;
    for (k in uiComponents) {
      app.component(uiComponents[k].__name!, uiComponents[k]);
    }
    let klb: keyof typeof klbComponents;
    for (klb in klbComponents) {
      app.component(klbComponents[klb].__name!, klbComponents[klb]);
    }
  };
  return <Plugin>{
    install,
  };
};

const helpers = {
  i18next: i18next.t,
  cropText,
  formatBytes,
  tailwindColors,
  jpZipcode,
};
const helpersSSR = {
  setupClient,
  handleSSR,
  isSSRRendered,
};

export {
  createFyvue,
  useEventBus,
  useTranslation,
  useFVStore,
  useHistory,
  useCountries,
  i18nextPromise,
  countriesPromise,
  components,
  helpers,
  helpersSSR,
  rest,
};

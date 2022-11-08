import type { App, Plugin } from "vue";
import { createHead } from "@vueuse/head"
import { createPinia } from "pinia";
import uiComponents from "./components/ui";
import klbComponents from "./components/klb";

import { eventBus, useEventBus, useTranslation, i18next, i18nextPromise } from './helpers';
import { cropText, formatBytes, tailwindColors } from "./displayHelpers";
import { useFVStore } from './store'
import type { FyvueOptions } from "./dts"

const components = {...uiComponents,...klbComponents};

const head = createHead();
const helpers = {
  i18next: i18next.t, cropText, formatBytes, tailwindColors, head
}
const createFyvue = () => {
  const install = (app: App, options?: FyvueOptions) => {
    app.use(head)
    app.use(createPinia())
    app.config.globalProperties.$eventBus = eventBus;
    app.config.globalProperties.$t = i18next.t;
    app.config.globalProperties.$cropText = cropText;
    app.config.globalProperties.$formatBytes = formatBytes;

    let k: keyof typeof uiComponents;
    for (k in uiComponents) {
      app.component(uiComponents[k].__name!, uiComponents[k]);
    }
    let klb: keyof typeof klbComponents;
    for (klb in klbComponents) {
      app.component(klbComponents[klb].__name!, klbComponents[klb]);
    }
  }
  return <Plugin>{
    install
  }
}

export {
  createFyvue,
  useEventBus,
  useTranslation,
  useFVStore,
  i18nextPromise,
  components,
  helpers
}

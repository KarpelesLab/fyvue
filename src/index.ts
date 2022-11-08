import type { App, Plugin } from "vue";
import { createHead } from "@vueuse/head"
import uiComponents from "./components/ui";
import { eventBus, useEventBus, useTranslation, i18next, i18nextPromise } from './helpers';
import { cropText, formatBytes, tailwindColors } from "./displayHelpers";
import type { FyvueOptions } from "./dts"

const components = {...uiComponents};
const helpers = {
  i18next: i18next.t, cropText, formatBytes, tailwindColors
}
const head = createHead();

const createFyvue = () => {
  const install = (app: App, options?: FyvueOptions) => {
    app.use(head)
    app.config.globalProperties.$eventBus = eventBus;
    app.config.globalProperties.$t = i18next.t;
    app.config.globalProperties.$cropText = cropText;
    app.config.globalProperties.$formatBytes = formatBytes;

    let k: keyof typeof uiComponents;
    for (k in uiComponents) {
      app.component(uiComponents[k].__name!, uiComponents[k]);
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
  i18nextPromise,
  components,
  helpers
}

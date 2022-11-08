import type { App, Plugin } from "vue";
import { createHead } from "@vueuse/head"
import uiComponents from "./components/ui";
import { eventBus, useEventBus, useTranslation, i18next, i18nextPromise } from './helpers';
import { cropText, formatBytes, tailwindColors } from "./displayHelpers";
import type { FyvueOptions } from "./types"

const cssDynamic = async () => {
  if (!process.env.live) await import('./fyvue.scss')
  return null;
}
cssDynamic()

const head = createHead();

const createFyvue = () => {
  const install = (app: App, options?: FyvueOptions) => {
    app.use(head)
    app.config.globalProperties.$eventBus = eventBus;
    app.config.globalProperties.$t = i18next.t;
    app.config.globalProperties.$cropText = cropText;
    app.config.globalProperties.$formatBytes = formatBytes;

    uiComponents.forEach((component) => {
      if (component.__name) app.component(component.__name, component)
    });
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
  tailwindColors
}

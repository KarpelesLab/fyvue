import type { App, Component, Plugin } from "vue";
import { createHead } from "@vueuse/head"
import { uiComponents } from "./components";
import { eventBus, useEventBus, useTranslation, i18next, i18nextPromise } from './helpers';
import { cropText, formatBytes } from "./displayHelpers";
import type { FyvueOptions } from "./fyvue"

import './fyvue.scss';

const head = createHead();

const createFyvue = () => {
  const install = (app: App, options?: FyvueOptions) => {
    app.use(head)
    app.config.globalProperties.$eventBus = eventBus;
    app.config.globalProperties.$t = i18next.t;
    app.config.globalProperties.$cropText = cropText;
    app.config.globalProperties.$formatBytes = formatBytes;

    // Loading UI components
    for (const componentKey in uiComponents) {
      app.component(componentKey, uiComponents[componentKey]);
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
  i18nextPromise
}

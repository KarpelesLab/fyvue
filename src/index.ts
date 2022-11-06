import type { App, Plugin } from "vue";
import { createHead } from "@vueuse/head"
import mitt from "mitt";
import type { FyvueOptions } from "./index.d"
import { uiComponents } from "./components";
import { eventBus, useEventBus } from './helpers';

import './fyvue.scss';

const head = createHead();

const createFyvue = () => {
  const install = (app: App, options?: FyvueOptions) => {
    app.use(head)
    app.config.globalProperties.$eventBus = eventBus;
    // Loading UI components
    for (const componentKey in uiComponents) {
      app.component(componentKey, uiComponents[componentKey]);
    }
  }
  return {
    install
  }
}

export {
  createFyvue,
  useEventBus
}
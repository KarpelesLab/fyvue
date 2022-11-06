import type { App, Plugin } from "vue";
import { createHead } from "@vueuse/head"
import { uiComponents } from "./components";
import { eventBus, useEventBus } from './helpers';
import type { FyvueOptions } from "./fyvue"

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
  return <Plugin>{
    install
  }
}

export {
  createFyvue,
  useEventBus
}
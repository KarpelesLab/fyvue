import mitt from "mitt";
import Notifications from "notiwind";
import { rest } from "@karpeleslab/klbfw";
import * as FyvueComponents from "./components/";
import * as KlbComponents from "./klb/components/";
import { createHead } from "@vueuse/head";
import { KlbBilling, KlbLocation, KlbUser, i18next } from "./klb/api";

const head = createHead();

export const eventBus = mitt();

export { KlbBilling, KlbLocation, KlbUser, i18next }

export default {
  install: (app) => {
    app.config.globalProperties.$eventBus = eventBus;
    app.config.globalProperties.$t = i18next.t;
    app.config.globalProperties.$rest = rest;

    for (const componentKey in FyvueComponents) {
      app.component(componentKey, FyvueComponents[componentKey]);
    }
    for (const componentKey in KlbComponents) {
      app.component(componentKey, KlbComponents[componentKey]);
    }
    app.use(Notifications);
    app.use(head);
  },
};

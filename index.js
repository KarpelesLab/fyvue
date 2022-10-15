import mitt from "mitt";
import Notifications from "notiwind";
import i18next from "./klb/api/i18n";
import { rest } from "@karpeleslab/klbfw";
import * as FyvueComponents from "./components/";
import * as KlbComponents from "./klb/components/";
import { createHead } from "@vueuse/head";
import { KlbBilling, KlbLocation, KlbUser } from "./klb/api";

const head = createHead();

export const eventBus = mitt();

export { KlbBilling, KlbLocation, KlbUser, i18next }

export default {
  install: (app) => {
    app.config.globalProperties.$eventBus = eventBus;
    app.config.globalProperties.$t = i18next.t;
    app.config.globalProperties.$rest = rest;
    app.config.globalProperties.$cropText = (str, ml=100) => {
      if (str && typeof(str) == 'string') {
        if (str.length > ml) {
          return `${str.slice(0, ml)}...`
        }
      }
      return str
    }
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

import mitt from "mitt";
import Notifications from "notiwind";
import i18next from "./klb/api/i18n";
import I18NextVue from "i18next-vue";
import { rest } from "@karpeleslab/klbfw";
import * as FyvueComponents from "./components/";
import * as KlbComponents from "./klb/components/";
import { createHead } from "@vueuse/head";
import { KlbBilling, KlbLocation, KlbUser, KlbOrder } from "./klb/api";
import { cropText, formatBytes } from "./utils";
const head = createHead();

const eventBus = mitt();

export { KlbBilling, KlbLocation, KlbUser, KlbOrder, i18next, eventBus };

export default {
  install: (app) => {
    app.config.globalProperties.$eventBus = eventBus;
    app.config.globalProperties.$rest = rest;
    app.config.globalProperties.$cropText = cropText;
    app.config.globalProperties.$formatBytes = formatBytes;
    app.use(I18NextVue, { i18next });
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

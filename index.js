import mitt from "mitt";
import Notifications from "notiwind";
import { getLocale } from "@karpeleslab/klbfw";
import Backend from "./klb/i18n-backend.js";
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import { rest } from "@karpeleslab/klbfw";
import * as FyvueComponents from "./components/";
import * as KlbComponents from "./klb/components/";
import { createHead } from "@vueuse/head";
import { getCurrentInstance } from 'vue'
import { notify } from "notiwind";
import { KlbBilling, KlbLocation, KlbUser, KlbOrder } from "./klb/api";
import { cropText, formatBytes } from "./utils";

const head = createHead();
const eventBus = mitt();
const locale = getLocale();

export const useEventBus = () => {
    const internalInstance = getCurrentInstance(); 
    const eventBus = internalInstance.appContext.config.globalProperties.$eventBus;

    return eventBus;
};

export const i18nextPromise = i18next.use(Backend).init({
  ns: ["translation"],
  defaultNS: "translation",
  debug: false,
  lng: locale,
  load: "currentOnly",
  initImmediate: false,
});

export const notificationErrors = (err) => {
  notify(
    {
      group: "default",
      type: "error",
      title: i18next.t("error_notif_title"),
      text: err.error
        ? err.error
        : i18next.t("error_notif_unknown"),
    },
    6000
  );
};

export { KlbBilling, KlbLocation, KlbUser, KlbOrder, i18next };

export default {
  install: (app, options) => {
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
  }
}
import mitt from "mitt";
import { getCurrentInstance } from "vue";
import type { FyVueEvent } from "./fyvue"
import { getLocale } from "@karpeleslab/klbfw";
import Backend from "./lib/klb-i18n-backend.js";
import i18next from "i18next";

const eventBus = mitt<FyVueEvent>();
const useEventBus = () => {
    const vueInstance = getCurrentInstance();
    return vueInstance?.appContext.config.globalProperties.$eventBus;
}


const i18nextPromise = i18next.use(Backend).init({
  ns: ["translation"],
  defaultNS: "translation",
  debug: false,
  lng: getLocale(),
  load: "currentOnly",
  initImmediate: false,
});

const useTranslation = () => {
  const vueInstance = getCurrentInstance();
  return vueInstance?.appContext.config.globalProperties.$t;
};

export {
  eventBus,
  useEventBus,
  i18next,
  i18nextPromise,
  useTranslation
}

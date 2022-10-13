import { getLocale } from "@karpeleslab/klbfw";
import { Backend } from "@karpeleslab/i18next-klb-backend";
import i18next from "i18next";

const locale = getLocale();
i18next.use(Backend).init({
  ns: ["translation"],
  defaultNS: "translation",
  debug: false,
  lng: locale,
  load: "currentOnly",
  initImmediate: false,
});

export default i18next;

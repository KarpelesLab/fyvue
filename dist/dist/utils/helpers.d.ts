import i18next from "i18next";
declare const eventBus: import("mitt").Emitter<Record<import("mitt").EventType, unknown>>;
declare const useEventBus: () => any;
declare const i18nextPromise: Promise<import("i18next").TFunction<"translation", undefined>>;
declare const useTranslation: () => any;
export { eventBus, useEventBus, i18next, i18nextPromise, useTranslation, };

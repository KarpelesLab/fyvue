import { Emitter } from 'mitt';
import i18next from 'i18next';
import type { KlbCountry } from '../dts/klb';
type Events = {
    [key: string]: any;
};
export type GlobalCountries = {
    countries: Array<KlbCountry>;
    byUuid: {
        [key: string]: KlbCountry;
    };
};
declare const countries: GlobalCountries;
declare const eventBus: Emitter<Events>;
declare const useCountries: () => GlobalCountries;
declare const countriesPromise: () => Promise<unknown>;
declare const useEventBus: () => Emitter<Events>;
declare const i18nextPromise: Promise<import("i18next").TFunction<"translation", undefined>>;
declare const useTranslation: () => import("i18next").TFunction<string[], undefined>;
export { eventBus, useEventBus, i18next, i18nextPromise, useTranslation, countriesPromise, useCountries, countries, };

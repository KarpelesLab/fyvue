import { Emitter } from 'mitt';
import i18next from 'i18next';
import type { KlbCountry } from '../dts/klb';
declare type Events = {
    [key: string]: any;
};
export declare type GlobalCountries = {
    countries: Array<KlbCountry>;
    byUuid: {
        [key: string]: KlbCountry;
    };
};
declare const countries: GlobalCountries;
declare const eventBus: Emitter<Events>;
declare const useCountries: () => any;
declare const countriesPromise: () => Promise<unknown>;
declare const useEventBus: () => any;
declare const i18nextPromise: Promise<import("i18next").TFunction<"translation", undefined>>;
declare const useTranslation: () => import("i18next").TFunction<string[], undefined>;
export { eventBus, useEventBus, i18next, i18nextPromise, useTranslation, countriesPromise, useCountries, countries, };

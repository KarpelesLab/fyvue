import { Emitter } from 'mitt';
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
declare const useTranslation: () => (key: string, v?: any) => string;
export { eventBus, useEventBus, useTranslation, countriesPromise, useCountries, countries, };

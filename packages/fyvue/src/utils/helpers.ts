import mitt, { Emitter } from 'mitt';
import { getCurrentInstance } from 'vue';
import { getLocale } from '@karpeleslab/klbfw';
import Backend from '../lib/klb-i18n-backend.js';
import i18next from 'i18next';
import { rest } from './rest';
import type { KlbCountriesResult, KlbCountry } from '../dts/klb';
type Events = {
  [key: string]: any;
};

export type GlobalCountries = {
  countries: Array<KlbCountry>;
  byUuid: {
    [key: string]: KlbCountry;
  };
};

const countries: GlobalCountries = {
  countries: new Array<KlbCountry>(),
  byUuid: {},
};

const eventBus: Emitter<Events> = mitt<Events>();

const useCountries = () => {
  const vueInstance = getCurrentInstance();
  return vueInstance!.appContext.config.globalProperties.$countries;
};

const countriesPromise = () => {
  return new Promise((resolve) => {
    rest<KlbCountriesResult>('Country', 'GET')
      .then((_countries) => {
        if (_countries && _countries.result == 'success') {
          countries.countries = _countries.data;
          _countries.data.forEach((_country) => {
            countries.byUuid[_country.Country__] = _country;
          });
        }
        resolve(true);
      })
      .catch(() => {});
  });
};

const useEventBus = () => {
  const vueInstance = getCurrentInstance();
  return vueInstance!.appContext.config.globalProperties.$eventBus;
};

const i18nextPromise = i18next.use(Backend).init({
  ns: ['translation'],
  defaultNS: 'translation',
  debug: false,
  lng: getLocale(),
  load: 'currentOnly',
  initImmediate: false,
});

const useTranslation = () => {
  const vueInstance = getCurrentInstance();
  return vueInstance!.appContext.config.globalProperties.$t;
};

export {
  eventBus,
  useEventBus,
  i18next,
  i18nextPromise,
  useTranslation,
  countriesPromise,
  useCountries,
  countries,
};

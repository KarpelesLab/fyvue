import { getCurrentInstance } from 'vue';
import { rest } from './rest';
import type { KlbAPICountry, KlbCountry } from '../KlbApiTypes';

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

const useCountries = () => {
  const vueInstance = getCurrentInstance();
  return vueInstance!.appContext.config.globalProperties.$countries;
};

const countriesPromise = () => {
  return new Promise((resolve) => {
    rest<KlbAPICountry>('Country', 'GET')
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

export { countriesPromise, useCountries, countries };

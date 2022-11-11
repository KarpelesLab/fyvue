import { defineStore } from 'pinia';
import { rest as _rest, getMode } from '@karpeleslab/klbfw';
import { KLBApiResult } from '../dts/klb';

type RequestResult = {
  [key: number]: KLBApiResult;
};

type RestSharedState = {
  results: RequestResult;
};

export const useRestState = defineStore({
  id: 'restState',
  state: (): RestSharedState => ({
    results: {},
  }),
  actions: {
    addResult(key: number, result: KLBApiResult) {
      this.results[key] = result;
    },
    delResult(key: number) {
      delete this.results[key];
    },
    getByHash(key: number) {
      return this.results[key];
    },
  },
});

const stringHashcode = (str: string) => {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const rest = async (
  url: string,
  method: string = 'GET',
  params: object = {},
  ctx: object = {}
) => {
  const requestHash = stringHashcode(
    url + method + JSON.stringify(params) // + devalue(ctx)
  );
  const restState = useRestState();
  if (getMode() == 'ssr' && restState.results[requestHash]) {
    const result = { ...restState.getByHash(requestHash) };
    restState.delResult(requestHash);
    return result;
  }

  return new Promise((resolve) => {
    let _result: KLBApiResult | undefined = undefined;
    _rest(url, method, params, ctx)
      .then((restResult: KLBApiResult | undefined) => {
        if (restResult?.result == 'success') {
          _result = restResult;
          resolve(_result);
          if (getMode() == 'ssr') restState.addResult(requestHash, restResult);
        } else {
          if (restResult) {
            _result = restResult;
            resolve(_result);
            if (getMode() == 'ssr')
              restState.addResult(requestHash, restResult);
          }
        }
      })
      .catch((err: KLBApiResult) => {
        _result = err;
        resolve(_result);
        restState.addResult(requestHash, err);
      });
  });
};

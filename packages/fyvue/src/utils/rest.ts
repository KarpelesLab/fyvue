import { defineStore } from 'pinia';
import { rest as _rest, getMode } from '@karpeleslab/klbfw';
import { KlbApiResultBase } from '../dts/klb';
import { isSSRRendered } from './ssr';

type RequestResult = {
  [key: number]: KlbApiResultBase | undefined;
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
    addResult(key: number, result: KlbApiResultBase | undefined) {
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

export async function rest<ResultType extends KlbApiResultBase>(
  url: string,
  method: string = 'GET',
  params: object = {},
  ctx: object = {}
): Promise<ResultType> {
  const requestHash = stringHashcode(url + method + JSON.stringify(params));
  const restState = useRestState();
  if (isSSRRendered() && restState.results[requestHash]) {
    const result = { ...restState.getByHash(requestHash) } as ResultType;
    restState.delResult(requestHash);
    return new Promise<ResultType>((resolve, reject) => {
      if (result.fvReject) {
        delete result.fvReject;
        reject(result);
      } else resolve(result);
    });
  }

  return new Promise<ResultType>((resolve, reject) => {
    _rest(url, method, params, ctx)
      .then((restResult: ResultType) => {
        if (getMode() == 'ssr') restState.addResult(requestHash, restResult);
        resolve(restResult);
      })
      .catch((err: ResultType) => {
        if (getMode() == 'ssr') {
          err.fvReject = true;
          restState.addResult(requestHash, err);
        }
        reject(err);
      });
  });
}
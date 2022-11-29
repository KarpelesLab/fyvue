import { defineStore } from 'pinia';
import { rest as _rest, getMode } from '@karpeleslab/klbfw';
import type { KlbAPIResult } from '../dts/klb';
import type { FetchResult } from '../dts';

import { isSSRRendered } from './ssr';

type RequestResult = {
  [key: number]: KlbAPIResult | undefined;
};
type FetchRequestResult = {
  [key: number]: FetchResult | undefined;
};

type RestSharedState = {
  results: RequestResult;
  fetchResults: FetchRequestResult;
};

export const useRestState = defineStore({
  id: 'restState',
  state: (): RestSharedState => ({
    results: {},
    fetchResults: {},
  }),
  actions: {
    addResult(key: number, result: KlbAPIResult | undefined) {
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

export function restFetch<ResultType extends FetchResult>(
  url: string,
  method: string = 'GET',
  params: object = {},
  isSSR: boolean = false
): Promise<ResultType> {
  const requestHash = stringHashcode(url + method + JSON.stringify(params));
  const restState = useRestState();

  if (isSSRRendered() && restState.fetchResults[requestHash]) {
    const result = { ...restState.fetchResults[requestHash] } as ResultType;
    delete restState.fetchResults[requestHash];
    return new Promise<ResultType>((resolve, reject) => {
      if (result.fvReject) {
        delete result.fvReject;
        reject(result);
      } else resolve(result);
    });
  }
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  let _params: any = params;
  if (method == 'POST') {
    _params = JSON.stringify(params);
  } else if (method == 'GET') {
    _params = undefined;
    if (params) {
      _params = '?' + new URLSearchParams(params as Record<string, string>);
    }
  }
  return new Promise<ResultType>((resolve, reject) => {
    fetch(`${url}${method == 'GET' ? _params : ''}`, {
      method: method,
      body: method == 'POST' ? _params : undefined,
      headers,
    })
      .catch((err) => {
        const _res: FetchResult = {
          raw: err,
          data: err,
          status: err.status,
        };
        if (isSSR) {
          _res.fvReject = true;
          restState.fetchResults[requestHash] = _res;
        }
        reject(_res as ResultType);
      })
      .then((res) => {
        if (res) {
          const _res: FetchResult = {
            raw: res,
            data: undefined,
            status: res.status,
          };
          res.json().then((data: any) => {
            _res.data = data;
            if (isSSR) restState.fetchResults[requestHash] = _res;
            resolve(_res as ResultType);
          });
        }
      });
  });
}

export function rest<ResultType extends KlbAPIResult>(
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

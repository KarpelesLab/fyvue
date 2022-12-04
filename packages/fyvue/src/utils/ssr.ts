import { renderToString } from '@vue/server-renderer';
import { getUuid, getPath, getInitialState } from '@karpeleslab/klbfw';
import type { Router } from 'vue-router';
import type { Pinia } from 'pinia';
import { defineStore } from 'pinia';
import type { KlbSSR } from '../dts/klb';

export type HistoryState = {
  _router: any | null;
  status: number;
  redirect?: string;
};

export const useHistory = defineStore({
  id: 'historyStore',
  state: () =>
    ({
      _router: null,
      status: 200,
      redirect: undefined,
    } as HistoryState),
  getters: {
    currentRoute: (state) => state._router!.currentRoute,
  },
  actions: {
    setStatus(status: number) {
      this.status = status;
    },
    _setRouter(_router: Router | null) {
      (this._router as unknown as Router | null) = _router;
    },
    push(path: any, status = 302) {
      this.status = status;
      if (status != 302) this.redirect = path;
      return this._router?.push(path);
    },
    replace(path: any, status = 302) {
      this.status = status;
      if (status != 302) this.redirect = path;
      return this._router?.replace(path);
    },
    go(delta: number) {
      this._router?.go(delta);
    },
    back() {
      this._router?.go(-1);
    },
    forward() {
      this._router?.go(1);
    },
  },
});

export const isSSRRendered = () => {
  const state = getInitialState();
  return !!(state && state.isSSRRendered == true);
};

export const setupClient = (router: Router, pinia: Pinia) => {
  const initialState = getInitialState();

  if (isSSRRendered()) {
    if (initialState && initialState.piniaState) {
      pinia.state.value = initialState.piniaState;
    }
  }
  useHistory(pinia)._setRouter(router);
};

export interface SSROptions {
  url: string | null;
}

export async function handleSSR(
  createApp: Function,
  cb: Function,
  options: SSROptions = { url: null }
) {
  const { app, router, head, pinia } = await createApp(true);
  let url;
  if (options.url) url = options.url;
  else {
    url = `${getPath()}`;
  }

  await router.push(url);
  await router.isReady();

  const result: KlbSSR = {
    uuid: getUuid(),
    initial: {
      isSSRRendered: true,
      piniaState: null,
    },
  };

  const historyStore = useHistory(pinia);
  useHistory(pinia)._setRouter(router);

  if (url !== historyStore.currentRoute.fullPath) {
    result.redirect = router.currentRoute.value.fullPath;
    result.statusCode = 307;
    cb(result);
    return result;
  }

  try {
    const html = await renderToString(app, {});
    const { headTags, htmlAttrs, bodyAttrs, bodyTags } =
      await head.renderHeadToString();

    result.meta = headTags;
    result.bodyAttributes = bodyAttrs;
    result.htmlAttributes = htmlAttrs;
    result.bodyTags = bodyTags;
    result.app = html;

    if (historyStore.status != 200) {
      if ([301, 302, 303, 307].includes(historyStore.status)) {
        if (historyStore.redirect) {
          result.statusCode = historyStore.status;
          result.redirect = historyStore.redirect;
        }
      } else {
        result.statusCode = historyStore.status;
      }
    }
    useHistory(pinia)._setRouter(null);
    result.initial.piniaState = pinia.state.value;

    cb(result);
    return result;
  } catch (e) {
    console.log('------Fyvue SSR Error------');
    if (e) {
      if (typeof e === 'string') {
        console.log(e); // works, `e` narrowed to string
      } else if (e instanceof Error) {
        console.log(e.message);
        console.log('------------');
        console.log(e.stack);
      }
    }
    console.log('------End Fyvue SSR Error------');
    cb(result);
    return result;
  }
}

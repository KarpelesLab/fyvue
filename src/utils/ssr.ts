import { renderToString } from "@vue/server-renderer";
import { renderHeadToString } from "@vueuse/head";
import { getUuid, getPath, getInitialState } from "@karpeleslab/klbfw";
import type {
  Router,
} from 'vue-router'
import { Pinia, defineStore } from 'pinia'

import serializeJavascript from "../lib/serialize-javascript.js"


export interface KlbSSR {
  initial?: any
  uuid?: string
  meta?: string
  link?: string
  bodyAttributes?: string
  htmlAttributes?: string,
  bodyTags?: string,
  app?: string,
  statusCode?: number,
  redirect?: string
}
/*
interface AppContext {
  pinia: Pinia
  router: Router
  query: LocationQuery
  params: Record<string, string>
}*/
export type HistoryState = {
  _router: Router | null
  status: number,
  redirect?: string
}

export const useHistory = defineStore({
  id: "historyStore",
  state: (): HistoryState =>
  ({
    _router: null,
    status: 200,
    redirect: undefined,
  }),
  getters: {
    currentRoute: (state) => state._router!.currentRoute,
  },
  actions: {
    setStatus(status: number) {
      this.status = status
    },
    _setRouter(_router: Router | null) {
      ;(this._router as unknown as Router | null) = _router
    },
    push(path: string, status = 302) {
      this.status = status
      this._router?.push(path)
      if (status != 302) this.redirect = path
    },
    replace(path: string, status = 302) {
      this.status = status
      this._router?.replace(path)
      if (status != 302) this.redirect = path
    },
    go(delta: number) {
      this._router?.go(delta)
    },
    back() {
      this._router?.go(-1)
    },
    forward() {
      this._router?.go(1)
    },
  },
})

export const setupClient = ({
  router,
  pinia,
}: {
  pinia: Pinia
  router: Router
}) => {
  const initialState = getInitialState()

  if (initialState && initialState.piniaState) pinia.state.value = initialState.piniaState;
  useHistory(pinia)._setRouter(router)
}

export async function handleSSR(createApp: Function, cb: Function, options = { 'routerNotFound': 'NotFound', 'router404Route': '/404' }) {
  const { app, router, head, pinia } = await createApp(true);
  const url = `${getPath()}`;
  await router.push(url)
  await router.isReady()

  /*
  const _route = router.currentRoute.value
  This will be usefull for middlewares, later, maybe...
  const context: AppContext = {
    pinia,
    router,
    query: _route.query,
    params: _route.params as AppContext['params'],
  }
  */

  const result: KlbSSR = { uuid: getUuid(), initial: { isSSRRendered: true, piniaState: serializeJavascript(null) } };

  const historyStore = useHistory(pinia)
  useHistory(pinia)._setRouter(router)

  if (url !== historyStore.currentRoute.fullPath) {
    result.redirect = router.currentRoute.value.fullPath;
    result.statusCode = 307
    return cb(result);
  }

  const html = await renderToString(app, {});
  const { headTags, htmlAttrs, bodyAttrs, bodyTags } = renderHeadToString(head)


  result.meta = headTags
  result.bodyAttributes = bodyAttrs
  result.htmlAttributes = htmlAttrs
  result.bodyTags = bodyTags
  result.app = html
  console.log(`[SSR Debug] Checking status... ${serializeJavascript(pinia.state.value)}`)
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
  useHistory(pinia)._setRouter(null)
  result.initial.piniaState = serializeJavascript(pinia.state.value)

  return cb(result)
}

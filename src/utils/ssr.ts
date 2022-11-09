import { renderToString } from "@vue/server-renderer";
import { renderHeadToString } from "@vueuse/head";
import { getPrefix, getUuid, getPath } from "@karpeleslab/klbfw";

type KlbSSR = {
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

export async function handleSSR(createApp: Function, cb: Function, options = { 'routerNotFound': 'NotFound', 'router404Route': '/404' }) {
  const { app, router, head } = await createApp(true);
  const result: KlbSSR = { uuid: getUuid(), initial: {} };
  const ctx = {};
  const url = `${getPath()}`;
  router.push(url);
  await router.isReady();
  let appHtml = "";
  try {
    appHtml = await renderToString(app, ctx);
  } catch (e) {
    router.push(`${getPrefix()}${options.router404Route}`);
    await router.isReady();
    appHtml = await renderToString(app, ctx);
    result.statusCode = 404;
    result.app = appHtml;
    return cb(result);
  }
  if (url != router.currentRoute.value.fullPath) {
    if (router.currentRoute.value.name == options.routerNotFound) {
      router.push(`${getPrefix()}${options.router404Route}`);
      await router.isReady();
      appHtml = await renderToString(app, ctx);
      result.statusCode = 404;
      result.app = appHtml;
      return cb(result);
    } else {
      result.statusCode = 301;
      result.redirect = router.currentRoute.value.fullPath;
      return cb(result);
    }
  }
  //const preloadLinks = renderPreloadLinks(ctx.modules, {});
  const { headTags, htmlAttrs, bodyAttrs, bodyTags } = renderHeadToString(head)
  result.meta = headTags
  //result.link = preloadLinks
  result.bodyAttributes = bodyAttrs
  result.htmlAttributes = htmlAttrs
  result.bodyTags = bodyTags
  result.app = appHtml
  if (router.currentRoute.value.name == options.routerNotFound) result.statusCode = 404;
  return cb(result)
}

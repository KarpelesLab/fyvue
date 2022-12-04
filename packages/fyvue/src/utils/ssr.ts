import { getUuid, getPath } from '@karpeleslab/klbfw';
import {
  useServerRouter,
  SSRRender,
  initVueClient,
  isServerRendered,
} from '@fy-/core';

export const useHistory = useServerRouter;

export const isSSRRendered = isServerRendered;

export const setupClient = initVueClient;

export interface SSROptions {
  url: string | null;
}

export async function handleSSR(
  createApp: Function,
  cb: Function,
  options: SSROptions = { url: null }
) {
  let url: string;
  if (options.url) url = options.url;
  else {
    url = `${getPath()}`;
  }
  return SSRRender(createApp, url, cb, getUuid());
}

import { getUuid, getPath } from '@karpeleslab/klbfw';
import {
  useServerRouter,
  SSRRender,
  initVueClient,
  isServerRendered,
} from '@fy-/core';

// Compatibility with fyvue 0.0.1 > 0.2.x
export const useHistory = useServerRouter;

// Compatibility with fyvue 0.0.1 > 0.2.x
export const isSSRRendered = isServerRendered;

// Compatibility with fyvue 0.0.1 > 0.2.x
export const setupClient = initVueClient;

// Compatibility with fyvue 0.0.1 > 0.2.x
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

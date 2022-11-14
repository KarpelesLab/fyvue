import { helpersSSR } from '@karpeleslab/fyvue';
import { createApp } from './main';

export async function render(cb) {
  await helpersSSR.handleSSR(createApp, cb, {});
}
export async function renderByURL(cb, url) {
  await helpersSSR.handleSSR(createApp, cb, { url: url });
}

import { helpersSSR } from '@karpeleslab/fyvue';
import { createApp } from './main';
import { routes } from './routes';


export async function render(cb) {
  await helpersSSR.handleSSR(createApp, cb, {});
}
export async function renderByURL(cb, url) {
  await helpersSSR.handleSSR(createApp, cb, { url: url });
}
export { routes };

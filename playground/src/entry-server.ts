import { helpersSSR } from '@karpeleslab/fyvue';
import { createApp } from './main';

export async function render(cb) {
  await helpersSSR.handleSSR(createApp, cb, {});
}

import { helpersSSR } from '@karpeleslab/fyvue';
import { createApp } from './main';

createApp(helpersSSR.isSSRRendered()).then(({ app, router, pinia }) => {
  router.isReady().then(() => {
    helpersSSR.setupClient(router, pinia);
    app.mount('#app');
  });
});

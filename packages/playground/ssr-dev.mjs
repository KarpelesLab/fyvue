import { readFileSync } from 'fs';
import { resolve as _resolve } from 'path';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { buildFw } from './ssr-utils.mjs';

async function createServer(root = process.cwd(), hmrPort) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const resolve = (p) => _resolve(__dirname, p);

  const app = express();
  const vite = await (
    await import('vite')
  ).createServer({
    base: '/',
    root,
    logLevel: 'info',
    server: {
      middlewareMode: true,
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100,
      },
      hmr: {
        port: hmrPort,
      },
    },
    appType: 'custom',
  });
  // use vite's connect instance as middleware
  app.use(vite.middlewares);
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      console.log(`\n\nRequested ${url}\n`);
      let template;

      template = readFileSync(resolve('index.html'), 'utf-8');
      template = template.replace(
        '<!--inject-fw-->',
        buildFw(
          'https://localhost:3001' + url,
          'localhost:3001',
          url,
          'http',
          'client',
          undefined
        )
      );

      template = await vite.transformIndexHtml(url, template);
      console.log(template);
      const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render;

      /*const cb = (data) => {
        console.log(data);
      };
      await render(cb);*/
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}
createServer().then(({ app }) =>
  app.listen(3001, () => {
    console.log('http://localhost:3001');
  })
);

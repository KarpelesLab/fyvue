import { readFileSync } from 'fs';
import { resolve as _resolve } from 'path';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { buildFw, generateUUID } from './ssr-utils.mjs';

async function createServer(root = process.cwd(), hmrPort) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const resolve = (p) => _resolve(__dirname, p);

  const app = express();
  const vite = await (
    await import('vite')
  ).createServer({
    base: '/',
    root,
    logLevel: 'error',
    server: {
      server: { middlewareMode: 'ssr' },
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
    const url = req.originalUrl;
    const reqUuid = generateUUID();
    global.FW = buildFw(
      reqUuid,
      'https://localhost:3001' + url,
      'localhost:3001',
      url,
      'http',
      'ssr',
      undefined
    );
    const _fwInject_ = `
    <script type="text/javascript">
      var FW = __FW__;
    </script>`;
    try {
      console.log(`\n\nRequested ${url}\n`);
      let template;

      template = readFileSync(resolve('index.html'), 'utf-8');
      //template = template.replace("<!--inject-fw-->", fws[0]);

      template = await vite.transformIndexHtml(url, template);
      const render = (await vite.ssrLoadModule('./src/entry-server.ts')).render;

      const data = await render(() => {});
      global.FW.initial = data.initial;
      global.FW.mode = 'ssr';

      const html = template
        .replace(
          '<!--inject-fw-->',
          _fwInject_.replace('__FW__', JSON.stringify(global.FW))
        )
        .replace('<!--headTag-->', data.meta)
        .replace('bodyAttrs', data.bodyAttrs)
        .replace('htmlAttributes', data.htmlAttributes)
        .replace('<!--bodyTags-->', data.bodyTags)
        .replace('<div id="app"></div>', `<div id="app">${data.app}</div>`);

      console.log(data);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
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

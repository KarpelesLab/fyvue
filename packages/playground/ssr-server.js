import vite from 'vite';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

const fw = `<script type="text/javascript" nonce="7NCrv9iVYykR3G-fSi_qxGYibism_9Nu">var FW = (function() {
  var my = {
      "Context": {
          "b": "master",
          "c": "JPY",
          "l": "en-US"
      },
      "GET": {},
      "Locale": "en-US",
      "Realm": {
          "Classify": {
              "Classify__": "clsf-qmenee-rsnf-bpto-hp6g-saptcn4i",
              "Created": {
                  "full": "1668384066919716",
                  "iso": "2022-11-14 00:01:06.919716",
                  "tz": "UTC",
                  "unix": 1668384066,
                  "unixms": "1668384066919",
                  "us": 919716
              },
              "MetaObject__": "usrr-pxws3b-nwhn-hcbc-2354-2l4cu6fy"
          },
          "Country__": null,
          "Name": "Fyvue",
          "Password_Reset": null,
          "Realm__": "usrr-pxws3b-nwhn-hcbc-2354-2l4cu6fy",
          "Registration": "open",
          "Terms_of_Service": null
      },
      "Registry": {
          "Currency_List": "JPY",
          "Language__": "en-US",
          "Price_Full_Precision": "1",
          "Realm": "usrr-pxws3b-nwhn-hcbc-2354-2l4cu6fy",
          "System_Timezone": "Asia/Tokyo",
          "User_Location_Mode": "light",
          "Vat_Engine": "Japan"
      },
      "URL": {
          "full": "/l/en-US/",
          "path": "/l/en-US/"
      },
      "cookies": {
          "Locale": "en-US"
      },
      "hostname": "localhost",
      "mode": "client",
      "path": "/",
      "prefix": "/l/en-US",
  };
  return my;
}());</script>`;

export async function createServer(root = process.cwd(), hmrPort) {
  const index = fs
    .readFileSync(resolve('dist/client/index.html'), 'utf-8')
    .replace('<!--fw-->', fw);

  const app = express();
  let vite;
  vite = await (
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
      const url = req.originalUrl.replace('/test/', '/');

      let template;

      /*
        template = indexProd
        render = (await import('./dist/server/entry-server.js')).render
        */
      template = fs.readFileSync(resolve('index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      const render = (await vite.ssrLoadModule('/src/entry-server.ts'))
        .renderByURL;
      const cb = (data) => {
        console.log(data);
      };
      await render(cb, req.originalUrl);
      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end('<html><body><p>Yo</p></body></html>');
      /*
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

      */
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}
createServer().then(({ app }) =>
  app.listen(6173, () => {
    console.log('http://localhost:6173');
  })
);

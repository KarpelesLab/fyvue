const renderToString = async () => {
  global.FW = (function () {
    var my = {
      Context: { b: 'master', c: 'JPY', l: 'en-US' },
      GET: {},
      Locale: 'en-US',
      Realm: {
        Classify: {
          Classify__: 'clsf-qmenee-rsnf-bpto-hp6g-saptcn4i',
          Created: {
            full: '1668384066919716',
            iso: '2022-11-14 00:01:06.919716',
            tz: 'UTC',
            unix: 1668384066,
            unixms: '1668384066919',
            us: 919716,
          },
          MetaObject__: 'usrr-pxws3b-nwhn-hcbc-2354-2l4cu6fy',
        },
        Country__: null,
        Name: 'Fyvue',
        Password_Reset: null,
        Realm__: 'usrr-pxws3b-nwhn-hcbc-2354-2l4cu6fy',
        Registration: 'open',
        Terms_of_Service: null,
      },
      Registry: {
        Currency_List: 'JPY',
        Language__: 'en-US',
        Price_Full_Precision: '1',
        System_Timezone: 'Asia/Tokyo',
        Vat_Engine: 'Japan',
      },
      URL: { full: '/', path: '/' },
      _ssr_diag: 'process has failed (console: Process has died\n)',
      cookies: {},
      hostname: 'www.fy-vue.com',
      mode: 'client',
      path: '/',
      prefix: '',
      token:
        'xUyJ1inzk_U1_dsurW94CJX0huEdakgLOGT0o_FCG1lAF0vsLeGDgsbdRFJJYhbJBF0UK3oKl-JbCbvx4J8a12nx_eJlTBkEsP38BFs_fimoiP6iASuHCyml1X8gZD-UrTCk6Q1I46Y',
      urlid: 'rgur-mnyejq-jazb-c6jm-ensy-4o56l3dq',
      uuid: '8c0015da-22f5-417e-8c53-a61ca19f0f69',
    };
    return my;
  })();
  const render = (await import('entry-server.js')).render;
  console.log(render);
  await render(printIt);
};
renderToString()
  .then(() => {
    console.log('END');
  })
  .catch((err) => {
    console.log(err);
  });

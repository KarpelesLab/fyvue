import { fileURLToPath, URL } from 'url';

import config from './vite.config';
const fyvueRoot = '../fyvue/dist';
const fyheadRoot = '../fyhead/dist';

export default Object.assign(config, {
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@karpeleslab/fyvue': fileURLToPath(new URL(fyvueRoot, import.meta.url)),
      '@fy-/head': fileURLToPath(new URL(fyheadRoot, import.meta.url)),
    },
  },
});

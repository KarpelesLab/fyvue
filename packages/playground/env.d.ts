/// <reference types="vite/client" />
declare module '@karpeleslab/fyvue';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

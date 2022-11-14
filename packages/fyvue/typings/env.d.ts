declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '*.js';
declare module '@karpeleslab/klbfw';
declare module '@vue/server-renderer';
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
/// <reference types="vite/client" />
/// <reference types="@fy-/core" />
/// <reference types="@fy-/ui" />
/// <reference types="@fy-/head" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

import type { App, Ref } from 'vue';
import type { Store } from 'pinia';
import { inject, watchEffect, onBeforeUnmount, onBeforeMount } from 'vue';
import { useFyheadState, FyHeadState } from './store';
import { storeToRefs } from 'pinia';

const __isBrowser__ = typeof window !== 'undefined';
// Public Domain/MIT

export const useFyHead = () => {
  const fyHeadState = inject('fyhead');
  if (!fyHeadState) throw new Error('Did you apply app.use(fyhead)?');

  // @ts-expect-error
  fyHeadState.injectFyHead(fyHeadState.head);
  if (__isBrowser__) {
    watchEffect(() => {
      // @ts-expect-error
      fyHeadState.injectFyHead(fyHeadState.head);
    });
    onBeforeMount(() => {
      // @ts-expect-error
      fyHeadState.injectFyHead(fyHeadState.head);
    });
    onBeforeUnmount(() => {
      // @ts-expect-error
      fyHeadState.$reset();
      // @ts-expect-error
      fyHeadState.injectFyHead(fyHeadState.head);
    });
  }
  return fyHeadState;
};

export const createFyHead = () => {
  const fyHeadState = useFyheadState();

  fyHeadState.$reset();

  const fyHead = {
    install(app: App) {
      if (app.config.globalProperties) {
        app.config.globalProperties.$fyhead = fyHeadState;
        app.provide('fyhead', fyHeadState);
      }
    },
  };
  return fyHead;
};

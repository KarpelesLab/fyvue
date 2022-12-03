import type { App } from 'vue';
import { FyHead } from './fyhead';
import type { FyHeadLazy } from './fyhead';
declare const useFyHead: () => FyHead;
declare const createFyHead: () => {
    install(app: App): void;
};
export { useFyHead, createFyHead, FyHeadLazy };

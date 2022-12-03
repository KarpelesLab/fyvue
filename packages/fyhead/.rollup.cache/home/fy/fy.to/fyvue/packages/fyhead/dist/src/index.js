import { inject, watch, onUnmounted } from 'vue';
import { FyHead } from './fyhead';
const useFyHead = () => {
    const fyhead = inject('fyhead');
    if (!fyhead)
        throw new Error('Did you apply app.use(fyhead)?');
    const __isBrowser__ = typeof window !== 'undefined';
    if (__isBrowser__) {
        watch(fyhead.state.elements, (v) => {
            FyHead.injectFyHead(v);
        });
        onUnmounted(() => {
            fyhead.reset();
        });
    }
    return fyhead;
};
const createFyHead = () => {
    const fyHead = new FyHead();
    fyHead.reset();
    const fyHeadPlugin = {
        install(app) {
            if (app.config.globalProperties) {
                app.config.globalProperties.$fyhead = fyHead;
                app.provide('fyhead', fyHead);
            }
        },
        renderHeadToString() {
            return fyHead.renderHeadToString();
        },
    };
    return fyHeadPlugin;
};
export { useFyHead, createFyHead };
//# sourceMappingURL=index.js.map
import mitt from "mitt";
import { getCurrentInstance } from "vue";

export const eventBus = mitt();
export const useEventBus = () => {
    const vueInstance = getCurrentInstance(); 
    return vueInstance?.appContext.config.globalProperties.$eventBus;
}
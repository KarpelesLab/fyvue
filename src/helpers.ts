import mitt from "mitt";
import { getCurrentInstance } from "vue";
import type { FyvueEvent } from "./fyvue"

export const eventBus = mitt<FyvueEvent>();
export const useEventBus = () => {
    const vueInstance = getCurrentInstance(); 
    return vueInstance?.appContext.config.globalProperties.$eventBus;
}
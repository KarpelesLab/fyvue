import * as vue from 'vue';
import { App } from 'vue';
import * as pinia from 'pinia';

declare const useFyHead: () => vue.ToRefs<pinia.StateTree & pinia._StoreWithGetters<pinia._GettersTree<pinia.StateTree>> & pinia.PiniaCustomStateProperties<pinia.StateTree>>;
declare const createFyHead: () => {
    install(app: App): void;
};

export { createFyHead, useFyHead };

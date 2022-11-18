import { useFVStore } from '../../../utils/store';
import { useHistory } from '../../../utils/ssr';
import { onBeforeMount, computed } from 'vue';

export function useUser() {
  return {
    userCheck: async () => {
      const store = useFVStore();
      const isAuth = computed(() => store.isAuth);

      const checkUser = () => {
        if (!isAuth.value) useHistory().push('/login', 302);
      };

      if (!import.meta.env.SSR) {
        await store.refreshUser();
        console.log('called');
        checkUser();
      }
    },
  };
}

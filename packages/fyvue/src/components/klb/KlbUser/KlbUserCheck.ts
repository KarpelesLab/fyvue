import { useFVStore } from '../../../utils/store';
import { useHistory } from '../../../utils/ssr';
import { onMounted, computed } from 'vue';

export function useUserCheck(onMount: boolean = true) {
  const store = useFVStore();
  const isAuth = computed(() => store.isAuth);

  const checkUser = () => {
    if (!isAuth.value) useHistory().push('/login', 302);
  };

  onMounted(async () => {
    if (onMount) {
      store.refreshUser().then(() => {
        if (useHistory().currentRoute.meta.reqLogin) checkUser();
      });
    }
  });
  if (onMount === false) {
    store.refreshUser().then(() => {
      if (useHistory().currentRoute.meta.reqLogin) checkUser();
    });
  }
}

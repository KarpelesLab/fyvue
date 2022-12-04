import { useFVStore } from '../../../utils/store';
import { useHistory } from '../../../utils/ssr';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export function useUserCheck(path = '/login') {
  const store = useFVStore();
  const isAuth = computed(() => store.isAuth);
  const router = useRouter();

  const checkUser = (route) => {
    if (route.meta.reqLogin) {
      if (!isAuth.value) router.push(path);
    }
  };

  store.refreshUser().then(() => {
    checkUser(useHistory().currentRoute);
  });

  router.afterEach(async () => {
    await store.refreshUser();
  });
  router.beforeEach((to) => {
    if (to.fullPath != path) {
      checkUser(to);
    }
  });
}

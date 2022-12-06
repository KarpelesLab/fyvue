import { useFVStore } from '../../helpers/store';
import { useHistory } from '../../helpers/ssr';
import { computed } from 'vue';
import { RouteLocation, useRouter } from 'vue-router';

export function useUserCheck(path = '/login') {
  const store = useFVStore();
  const isAuth = computed(() => store.isAuth);
  const router = useRouter();

  const checkUser = (route: RouteLocation) => {
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
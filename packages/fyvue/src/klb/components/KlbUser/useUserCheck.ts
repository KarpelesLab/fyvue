import { useFVStore } from '../../helpers/store';
import { useHistory } from '../../helpers/ssr';
import { computed } from 'vue';
import { RouteLocation, useRouter } from 'vue-router';

export function useUserCheck(path = '/login', redirectLink = false) {
  const store = useFVStore();
  const isAuth = computed(() => store.isAuth);
  const router = useRouter();

  const checkUser = (route: RouteLocation) => {
    if (route.meta.reqLogin) {
      if (!isAuth.value) {
        if (!redirectLink) router.push(path);
        else {
          router.push(`${path}?return_to=${route.path}`);
        }
      }
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

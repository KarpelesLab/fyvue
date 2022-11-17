import { defineStore } from 'pinia';
import { rest } from '@karpeleslab/klbfw';
import type { KlbAPIResultUnknown, KlbUser } from '../dts/klb';

export type RootState = {
  user: KlbUser | null;
};

export const useFVStore = defineStore({
  id: 'fVStore',
  state: (): RootState => ({
    user: null,
  }),
  getters: {
    isAuth: (state): boolean => {
      return !(state.user === null);
    },
  },
  actions: {
    async refreshUser(params = {}) {
      const apiData: KlbAPIResultUnknown = await rest(
        'User:get',
        'GET',
        params
      ).catch((err: KlbAPIResultUnknown) => {}); // @todo
      if (apiData.result == 'success' && apiData.data != null) {
        this.user = apiData.data as KlbUser;
      } else {
        this.user = null;
      }
    },
    async logout() {
      const apiData: KlbAPIResultUnknown = await rest(
        'User:logout',
        'POST'
      ).catch((err: KlbAPIResultUnknown) => {}); // @todo

      if (apiData.result == 'success') {
        this.setUser(null);
      }
    },
    setUser(user: KlbUser | null): void {
      this.user = user;
    },
  },
});

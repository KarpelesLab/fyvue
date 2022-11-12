import { defineStore } from 'pinia';
import { rest } from '@karpeleslab/klbfw';
import type { KLBApiResult, User } from '../dts/klb';

export type RootState = {
  user: User | null;
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
      const apiData: KLBApiResult = await rest('User:get', 'GET', params).catch(
        (err: KLBApiResult) => {}
      ); // @todo
      if (apiData.result == 'success' && apiData.data != null) {
        this.user = apiData.data as User;
      } else {
        this.user = null;
      }
    },
    async logout() {
      const apiData: KLBApiResult = await rest('User:logout', 'Post').catch(
        (err: KLBApiResult) => {}
      ); // @todo

      if (apiData.result == 'success') {
        this.setUser(null);
      }
    },
    setUser(user: User | null): void {
      this.user = user;
    },
  },
});

import { defineStore } from 'pinia';
import { rest } from '@karpeleslab/klbfw';
import type {
  KlbAPICatalogCart,
  KlbAPIResultUnknown,
  KlbUser,
} from '../dts/klb';
import { useCart } from '../components/klb/KlbOrder/useCart';
export type RootState = {
  user: KlbUser | null;
  cartCount: number;
};

export const useFVStore = defineStore({
  id: 'fVStore',
  state: (): RootState => ({
    user: null,
    cartCount: 0,
  }),
  getters: {
    isAuth: (state): boolean => {
      return !(state.user === null);
    },
  },
  actions: {
    async refreshCart() {
      const _cart = await useCart().getCart();
      if (_cart && _cart.result == 'success') {
        this.cartCount = _cart.data.products.length;
      }
    },
    async refreshCartData(_cart: KlbAPICatalogCart) {
      if (_cart && _cart.result == 'success') {
        this.cartCount = _cart.data.products.length;
      }
    },
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

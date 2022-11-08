import { defineStore } from "pinia";
import { rest } from "@karpeleslab/klbfw";
import type { KLBApiError, KLBApiResult, User } from './dts/klb'
import { useEventBus } from "./helpers";

export type RootState = {
  user: User | null
}

export const useFVStore = defineStore({
  id: "fVStore",
  state: (): RootState =>
  ({
    user: null,
  }),
  getters: {
    isAuth: (state): boolean => {
      return !(state.user === null)
    }
  },
  actions: {
    async refreshUser() {
      const apiData: KLBApiResult = await rest("User:get", "GET")
        .catch((err: KLBApiError) => { }) // @todo
      if (apiData.result == 'success' && apiData.data != null) {
        this.user = apiData.data as User;
      } else {
        this.user = null
      }
    },
    async logout() {
      const apiData: KLBApiResult = await rest("User:logout", "Post")
        .catch((err: KLBApiError) => { }) // @todo

      if (apiData.result == 'success') {
        this.setUser(null)
      }
    },
    setUser(user: User | null): void {
      this.user = user
    }
  },
})

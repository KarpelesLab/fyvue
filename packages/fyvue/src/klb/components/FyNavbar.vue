<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';
import { useFVStore } from '../helpers/store';
import { useServerRouter, ClientOnly } from '@fy-/core';
import type { NavLink } from '@fy-/ui';
import { NavMain } from '@fy-/ui';
const store = useFVStore();
const isAuth = computed(() => store.isAuth);
const cartCount = computed(() => store.cartCount);
const logout = async () => {
  await store.logout();
  useServerRouter().push('/', 302);
};

withDefaults(
  defineProps<{
    title?: string;
    showTitle?: boolean;
    darkLight?: boolean;
    links: NavLink[];
    loginPath?: string;
    accountPath?: string;
    cartPath?: string;
    showDashboardLink?: boolean;
    showCart?: boolean;
  }>(),
  {
    showTitle: true,
    darkLight: true,
    loginPath: '/login',
    accountPath: '/user',
    cartPath: '/user/order',
    showDashboardLink: true,
    showCart: false,
  }
);
</script>
<template>
  <NavMain
    :title="title"
    :darkLight="darkLight"
    :links="links"
    :showTitle="showTitle"
  >
    <template v-slot:logo>
      <slot name="logo"></slot>
      <span v-if="title && showTitle">{{ title }}</span>
    </template>
    <template v-slot:actions>
      <ClientOnly>
        <slot name="cart">
          <template v-if="showCart">
            <router-link :to="cartPath" class="nav-cart" tabindex="4">
              <ShoppingCartIcon />
              <div class="badge">{{ cartCount.toString() }}</div>
            </router-link>
          </template>
        </slot>
      </ClientOnly>
    </template>
    <template v-slot:custom>
      <slot name="custom"></slot>
    </template>
    <template v-slot:buttons>
      <slot name="buttons">
        <template v-if="isAuth">
          <a
            href="javascript:void(0)"
            tabindex="3"
            @click="logout()"
            class="btn neutral btn-defaults"
            >{{ $t('navbar_logout_cta') }}</a
          >
          <router-link
            v-if="showDashboardLink"
            tabindex="3"
            to="/user"
            class="btn primary btn-defaults"
            >{{ $t('navbar_dashboard_cta') }}</router-link
          >
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="btn neutral btn-defaults"
            tabindex="3"
            >{{ $t('navbar_login_cta') }}</router-link
          >
          <router-link
            to="/login"
            class="btn primary btn-defaults"
            tabindex="3"
            >{{ $t('navbar_signup_cta') }}</router-link
          >
        </template>
      </slot>
    </template>
  </NavMain>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ref, computed } from 'vue';
import { useFVStore } from '../../../utils/store';
import { useHistory } from '../../../utils/ssr';
import { ClientOnly } from '../../helpers/ClientOnly';
import type { NavLink } from '../../../dts/index';

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
});
const isOpen = ref<boolean>(false);
const toggleDark = useToggle(isDark);
const toggleNavbarOpen = useToggle(isOpen);
const store = useFVStore();
const isAuth = computed(() => store.isAuth);
const logout = async () => {
  await store.logout();
  useHistory().push('/', 302);
};

withDefaults(
  defineProps<{
    title: string;
    showTitle?: boolean;
    darkLight?: boolean;
    links: NavLink[];
    loginPath?: string;
    accountPath?: string;
    showDashboardLink?: boolean;
  }>(),
  {
    showTitle: true,
    darkLight: true,
    loginPath: '/login',
    accountPath: '/user',
    showDashboardLink: true,
  }
);
</script>
<template>
  <nav class="fy-navbar">
    <div class="nav-container">
      <router-link to="/" class="logo-image">
        <slot name="logo"></slot>
        <span v-if="title && showTitle">{{ title }}</span>
      </router-link>
      <div class="nav-actions">
        <slot name="custom"></slot>
        <slot name="buttons">
          <div v-if="isAuth">
            <a
              href="javascript:void(0)"
              @click="logout()"
              class="btn neutral btn-defaults"
              >{{ $t('navbar_logout_cta') }}</a
            >
            <router-link
              v-if="showDashboardLink"
              to="/user"
              class="btn primary btn-defaults"
              >{{ $t('navbar_dashboard_cta') }}</router-link
            >
          </div>
          <div v-else>
            <router-link to="/login" class="btn neutral btn-defaults">{{
              $t('navbar_login_cta')
            }}</router-link>
            <router-link to="/login" class="btn primary btn-defaults">{{
              $t('navbar_signup_cta')
            }}</router-link>
          </div>
        </slot>
        <button
          @click="toggleDark()"
          class="btn neutral light-dark"
          v-if="darkLight"
        >
          <MoonIcon v-if="!isDark" />
          <SunIcon v-else />
        </button>
        <button
          type="button"
          class="open-nav-button"
          @click="toggleNavbarOpen()"
        >
          <span class="is-sr">Open main menu</span>
          <svg
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div class="nav-menu" :class="isOpen ? 'is-open' : ''">
        <ul class="main-ul">
          <li v-for="(link, index) in links" :key="`link_${index.toString()}`">
            <template v-if="link.childrens && link.childrens.length > 0">
              <Menu>
                <MenuButton class="is-link has-childs">
                  {{ link.name }}
                  <svg
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </MenuButton>
                <transition name="fade">
                  <MenuItems class="sub-nav">
                    <ul>
                      <MenuItem
                        v-for="(children, index) in link.childrens"
                        :key="`link_children_${index.toString()}`"
                      >
                        <li>
                          <router-link
                            v-if="!children.isExternal"
                            :to="children.to"
                            :title="children.name"
                            :alt="children.name"
                            class="is-link"
                          >
                            {{ children.name }}
                          </router-link>
                          <a
                            v-else
                            :href="children.to"
                            :title="children.name"
                            :alt="children.name"
                            class="is-link"
                          >
                            {{ children.name }}
                          </a>
                        </li>
                      </MenuItem>
                    </ul>
                  </MenuItems>
                </transition>
              </Menu>
            </template>
            <template v-else>
              <router-link
                v-if="!link.isExternal"
                :to="link.to"
                :title="link.name"
                :alt="link.name"
                class="is-link"
                :class="false ? 'is-active' : ''"
              >
                {{ link.name }}
              </router-link>
              <a
                v-else
                :href="link.to"
                :title="link.name"
                :alt="link.name"
                class="is-link"
                :class="false ? 'is-active' : ''"
              >
                {{ link.name }}
              </a>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

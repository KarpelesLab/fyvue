<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ref } from 'vue';
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

withDefaults(
  defineProps<{
    title: string;
    showTitle?: boolean;
    darkLight?: boolean;
    links: NavLink[];
  }>(),
  {
    showTitle: true,
    darkLight: true,
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
        <slot name="buttons"> </slot>
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

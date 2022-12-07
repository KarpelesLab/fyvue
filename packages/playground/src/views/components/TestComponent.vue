<script lang="ts" setup>
import { NavLink } from '@fy-/ui';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    links: NavLink[];
    id?: string;
  }>(),
  {
    id: 'main',
  }
);
const isOpen = useStorage(`isOpenSidebar-${props.id}`, true);
</script>
<template>
  <aside class="fui-sidebar" :class="isOpen ? '' : 'fui-sidebar__md'">
    <div class="fui-sidebar__controller">
      <button class="btn neutral" @click="isOpen = !isOpen">
        <ArrowLeftIcon v-if="isOpen" />
        <ArrowRightIcon v-else />
      </button>
    </div>
    <ul role="list">
      <li v-for="(link, index) of links" :key="`aside_link_${index}`">
        <RouterLink :to="link.to" class="fui-sidebar__link">
          <component :is="link.icon" v-if="link.icon" />
          <span>{{ link.name }}</span>
          <div role="tooltip" class="fui-tooltip">
            {{ link.name }}
          </div>
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>
<style lang="scss">
.fui-tooltip {
  @apply inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium;
  @apply text-fv-neutral-50 bg-fv-neutral-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300  dark:bg-fv-neutral-700;
}
.fui-sidebar {
  @apply w-64 border-r;
  @apply border-r-fv-neutral-200 dark:border-r-fv-neutral-700;
  transition: width 600ms ease-in-out;
  .fui-sidebar__controller {
    @apply pt-4 flex items-center justify-end pr-3;
    svg {
      @apply w-4 h-4;
    }
    .btn {
    }
  }
  .fui-sidebar__link {
    @apply relative flex w-full items-center py-3 px-3 font-semibold text-sm border-l-[.4rem] border-l-transparent;
    @apply text-fv-neutral-600 hover:bg-fv-neutral-200/[.3] focus:bg-fv-neutral-200/[.3] hover:text-fv-primary-600;
    @apply dark:text-fv-neutral-300 dark:hover:bg-fv-neutral-700/[.3] dark:focus:bg-fv-neutral-700/[.3] dark:hover:text-fv-primary-400;
    //@apply  bg-red-600 outline;
    &.router-link-exact-active {
      @apply border-l-fv-primary-500 bg-fv-neutral-200  hover:text-fv-neutral-600 focus:text-fv-neutral-600;
      @apply dark:bg-fv-neutral-700 dark:hover:text-fv-neutral-300;
    }
    svg {
      @apply w-6 h-6 mr-2 -ml-1 text-fv-neutral-400 dark:text-fv-neutral-500;
    }
    transition: font-size 600ms ease-in-out, flex 300ms ease-in-out,
      flex-direction 300ms ease-in-out;
  }

  &.fui-sidebar__md {
    @apply w-28;
    .fui-sidebar__controller {
    }
    .fui-sidebar__link {
      @apply flex flex-col text-xs;
      svg {
        @apply mr-0;
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .fui-sidebar {
    @apply w-12;
    &.fui-sidebar__md {
      @apply w-12;
    }
    .fui-sidebar__controller {
      @apply hidden;
    }
    .fui-sidebar__link {
      @apply flex flex-col text-xs;
      svg {
        @apply mr-0;
      }
      span {
        @apply hidden;
      }
    }
    .fui-sidebar__link:hover .fui-tooltip,
    .fui-sidebar__link:focus .fui-tooltip,
    .fui-sidebar__link:active .fui-tooltip {
      @apply visible opacity-100 left-9 top-1;
    }
  }
}
</style>

<template>
  <div class="">
    <div
      class=" breadcrumb  mr-auto  font-semibold -mt-1 uppercase "
      aria-label="Breadcrumb"
    >
      <ol class="list-none p-0 inline-flex">
        <template v-for="item in nav">
          <li
            v-if="item.to"
            :key="item.to"
            class="flex items-center bc-innactive pr-2 break-words"
          >
            <router-link
              :to="item.to"
              class="bc-active pr-2 break-words"
            >
              {{
                $cropText(item.name, 15)
              }}
            </router-link>
            <ArrowRightIcon class="w-3 bc-innactive" />
          </li>
          <li
            v-else
            :key="item.to"
            class="flex items-center"
          >
            <span class="bc-innactive break-words">{{ $cropText(item.name, 15) }}</span>
          </li>
        </template>
      </ol>
    </div>
  </div>
</template>
<script>
import { ArrowRightIcon } from '@heroicons/vue/24/solid'

export default {
  name: "FyBreadcrumb",
  components: {
    ArrowRightIcon
  },
  props: {
    nav: {
      type: Array,
      default () {
        return [];
      }
    }
  }
};
</script>

<style lang="scss">
    .breadcrumb {
        @apply border-red-600 py-0;
        .bc-innactive {
            @apply text-gray-600
        }
        .bc-active {
            @apply text-orange-600
        }
    }

</style>
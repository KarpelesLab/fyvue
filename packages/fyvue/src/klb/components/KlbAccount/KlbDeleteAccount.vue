<script setup lang="ts">
import { useFVStore } from '../../helpers/store';
import { computed } from 'vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid';
withDefaults(
  defineProps<{
    url?: string;
  }>(),
  {
    url: '/login',
  }
);
const store = useFVStore();
const isAuth = computed(() => store.isAuth);
</script>
<template>
  <div v-if="isAuth" class="klb-account">
    <h2 class="h4">{{ $t('delete_account_display_label') }}</h2>
    <div class="klb-account-edit-data">
      <router-link :to="`${url}?act=delete_account`" class="btn primary small">
        <ExclamationTriangleIcon class="edit-icon" />
        {{ $t('delete_account_display_cta') }}
      </router-link>
    </div>
  </div>
</template>

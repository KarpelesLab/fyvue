<script setup lang="ts">
import { useTranslation } from '@karpeleslab/fyvue';
const translate = useTranslation();
console.log(translate('confirm_modal_cta_confirm'));
</script>
<template>
  <p>{{ $t('unknown_error') }}</p>
</template>

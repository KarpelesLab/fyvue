<script setup lang="ts">
import { useTranslation, rest } from '@karpeleslab/fyvue';
const translate = useTranslation();
console.log(translate('confirm_modal_cta_confirm'));

const test1 = await rest('User:get', 'GET');
console.log(test1)

const test2 = await rest('User:get', 'GET');
console.log(test2)

const test5 = await rest('User:get', 'GET');
console.log(test5)

const test3 = await rest('Location', 'GET');
console.log(test3)

const test4 = await rest('Location', 'GET');
console.log(test4)
</script>
<template>
  <p>{{ $t('unknown_error') }}</p>
</template>

<script setup lang="ts">
import { ListBulletIcon, MapPinIcon, CreditCardIcon } from "@heroicons/vue/24/solid";

</script>
<template>
<FySteps
  :steps="[
    { name: 'steps_offer', icon: ListBulletIcon },
    { name: 'steps_address', icon: MapPinIcon },
    { name: 'steps_payment', icon: CreditCardIcon },
  ]"
  :currentStep="2"
/>

<div class="dark bg-gray-700">
  <FySteps
  :steps="[
    { name: 'steps_offer' },
    { name: 'steps_address' },
    { name: 'steps_payment' },
  ]"
  :currentStep="1"
  />
</div>
</template>

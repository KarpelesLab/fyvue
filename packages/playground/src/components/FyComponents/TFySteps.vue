<script setup lang="ts">
import {
  ListBulletIcon,
  MapPinIcon,
  CreditCardIcon,
} from '@heroicons/vue/24/solid';
</script>
<template>
  <div class="p-4">
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

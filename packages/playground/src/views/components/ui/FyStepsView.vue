<script setup>
import {
  ListBulletIcon,
  MapPinIcon,
  CreditCardIcon,
} from '@heroicons/vue/24/solid';
const fvComponent = `
_script_
import {
  ListBulletIcon,
  MapPinIcon,
  CreditCardIcon,
} from '@heroicons/vue/24/solid';
_script_end_
<FySteps
  :steps="[
    { name: 'Offer', icon: ListBulletIcon },
    { name: 'Address', icon: MapPinIcon },
    { name: 'Payment', icon: CreditCardIcon },
  ]"
  :currentStep="2"
/>
`;
const props = [
  {
    name: 'steps',
    type: 'array',
    info: 'Array of object (property name is and i18n key and icon? is a Component)',
  },
  {
    name: 'currentStep',
    type: 'number',
    info: 'Current step (starting at 1)',
  },
];
</script>
<template>
  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <FySteps
        :steps="[
          { name: 'Offer' },
          { name: 'Address', icon: MapPinIcon },
          { name: 'Payment', icon: CreditCardIcon },
        ]"
        :currentStep="2"
      />
    </template>
  </FyDocPreview>
</template>

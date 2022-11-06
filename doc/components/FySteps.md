# FySteps
![FySteps](/components/FySteps.png)

## Usage

```vue
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
</template>
```

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| steps | Array\<FyVueStep> | [] | Array of steps (see usage) |
| currentStep | Number | 0 | Curren step (starting count a 1) |

## Details

### CSS

@[code sass](../../src/components/ui/FySteps/FySteps.scss)

### Code

@[code vue](../../src/components/ui/FySteps/FySteps.vue)

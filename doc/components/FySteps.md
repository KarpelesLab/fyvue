# FySteps

<details>
  <summary>Preview</summary>

  ![FySteps](/components/FySteps.png)
</details>

[[toc]]

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
| steps | Array\<FyVueStep> | [] | Array of steps<br /> ```[{ name: i18n_key, icon?: Component }]``` |
| currentStep | Number | 0 | Curren step (starting count a 1) |

## Details

### CSS

@[code sass](../../src/components/ui/FySteps/FySteps.scss)

### Code

@[code vue](../../src/components/ui/FySteps/FySteps.vue)

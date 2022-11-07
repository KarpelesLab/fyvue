<script setup lang="ts">
import { computed } from "vue"
import type { FyVueStep } from "@karpeleslab/fyvue/types"

const props = defineProps({
  steps: { type:Array<FyVueStep>, default: [] },
  currentStep: { type: Number, default: 0 }
})
const barWidth = computed(()=> (props.currentStep * 100) / props.steps.length);
const getStepClass = (index : number) => {
  if ((index+1) < props.currentStep) return 'past-step'
  if ((index+1) == props.currentStep) return 'current-step'
  return 'past-step'
}
</script>
<template>
  <div class="fy-step-bar">
    <div class="bar-bg">
      <div class="bar" :style="`width:${barWidth}%`"></div>
    </div>

    <ol>
      <li v-for="(step, index) in steps" v-bind:key="index" :class="getStepClass(index)">
        <span class="label"> {{ $t(step.name) }} </span>

        <component class="icon" :is="step.icon" v-if="step.icon" />
      </li>
    </ol>
  </div>
</template>

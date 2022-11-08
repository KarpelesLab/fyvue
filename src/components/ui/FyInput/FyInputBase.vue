<script setup lang="ts">
import { LinkIcon } from "@heroicons/vue/24/solid";
import { computed, PropType } from "vue";
import type { modelValueType, checkboxValueType } from '../../../dts/'

const props = withDefaults(defineProps<{
  id: string,
  showLabel: boolean,
  label? : string,
  type : string,
  placeholder? : string,
  autocomplete? : string,
  checkboxTrueValue? : string,
  checkboxFalseValue? : string,
  req? : boolean,
  linkIcon? : string,
  modelValue?: modelValueType,
  checkboxValue?: checkboxValueType,
  options?: string[][],
  help?: string,
  error?: string
}>(), {
  showLabel: true,
  type: 'text',
  req: false,
  options: () => [],
  checkboxTrueValue: "on",
  checkboxFalseValue: "off"
})

const emit = defineEmits(['update:modelValue', 'update:checkboxValue'])
const model = computed({
  get: () => props.modelValue,
  set: items => {
    emit('update:modelValue', items)
    console.log(items)
  }
})
const modelCheckbox = computed({
  get: () => props.checkboxValue,
  set: items => {
    emit('update:checkboxValue', items)
    console.log(items)
  }
})
</script>
<template>
  <div class="input-group">
    <template v-if="showLabel && id && label">
      <label class="label-basic" :for="id">
        <input v-if="type == 'checkbox'" type="checkbox" class="form-checkbox" :id="id"
          :class="{ 'error-form': error }" :true-value="checkboxTrueValue" :false-value="checkboxFalseValue"
          v-model="modelCheckbox" />

        {{ label }}

        <a class="link-icon" :href="linkIcon" target="_blank" v-if="linkIcon">
          <LinkIcon />
        </a>
        <sup class="is-req" v-if="req">*</sup>
      </label>
    </template>
    <div v-if="!['checkbox', 'radiobox'].includes(type)" class="input-box">
      <slot name="before"></slot>
      <input v-if="['text', 'password', 'email'].includes(type)" class="input-basic" :class="{ 'error-form': error }"
        :placeholder="placeholder" :autocomplete="autocomplete" :id="id" v-model="model" />
      <textarea v-if="type == 'textarea'" class="input-basic is-textarea" :class="{ 'error-form': error }"
        :placeholder="placeholder" :autocomplete="autocomplete" :id="id" v-model="model" />

      <select v-if="type == 'select'" :id="id" class="input-basic" v-model="model">
        <option v-for="opt in options" :value="opt[0]" :key="opt[0].toString()">
          {{ opt[1] }}
        </option>
      </select>
      <slot name="after"></slot>
    </div>
    <div class="help-text" v-if="help">
      {{ help }}
    </div>
    <div v-if="error" class="form-error-label">
      {{ error }}
    </div>
  </div>
</template>

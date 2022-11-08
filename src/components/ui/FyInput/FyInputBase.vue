<script setup lang="ts">
import { LinkIcon } from "@heroicons/vue/24/solid";
import { computed } from "vue";
const props = defineProps({
  id: {
    type: String,
    default: undefined,
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    default: undefined
  },
  errors: {
    type: String,
    default: undefined
  },
  type: {
    type: String,
    default: 'text',
    required: true
  },
  placeholder: {
    type: String,
    default: undefined
  },
  autocomplete: {
    type: String,
    default: undefined
  },
  checkboxTrueValue: {
    type: String,
    default: "on"
  },
  checkboxFalseValue: {
    type: String,
    default: "off"
  },
  req: {
    type: Boolean,
    default: false
  },
  help: {
    type: String,
    default: undefined
  },
  linkIcon: {
    type: String,
    default: undefined
  },
  modelValue: null,
  options: {
    type: Array<string[]>,
    default: []
  }
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: items => emit('update:modelValue', items)
})
</script>
<template>
  <div class="input-group">
    <template v-if="showLabel && id && label">
      <label class="label-basic" :for="id">
        <input v-if="type == 'checkbox'" type="checkbox" class="form-checkbox" :id="id"
          :class="{ 'error-form': errors }" :true-value="checkboxTrueValue" :false-value="checkboxFalseValue"
          v-model="model" />

        {{ label }}

        <a class="link-icon" :href="linkIcon" target="_blank" v-if="linkIcon">
          <LinkIcon />
        </a>
        <sup class="is-req" v-if="req">*</sup>
      </label>
    </template>
    <div v-if="!['checkbox', 'radiobox'].includes(type)" class="input-box">
      <slot name="before"></slot>
      <input v-if="['text', 'password', 'email'].includes(type)" class="input-basic" :class="{ 'error-form': errors }"
        :placeholder="placeholder" :autocomplete="autocomplete" :id="id" v-model="model" />
      <textarea v-if="type == 'textarea'" class="input-basic is-textarea" :class="{ 'error-form': errors }"
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
    <div v-if="errors" class="form-error-label">
      {{ errors }}
    </div>
  </div>
</template>

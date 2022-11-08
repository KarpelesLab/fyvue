<script setup lang="ts">
import { LinkIcon } from "@heroicons/vue/24/solid";

defineProps({
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
    default: undefined
  },
  checkboxFalseValue: {
    type: String,
    default: undefined
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


</script>

<template>
  <div class="input-group">
    <template v-if="showLabel && id && label">
      <label class="label-basic" :for="id">
        <input v-if="type == 'checkbox'" type="checkbox" class="form-checkbox" :id="id"
          :class="{ 'error-form': modelValue.$errors.length }" :true-value="checkboxTrueValue"
          :false-value="checkboxFalseValue" v-model="modelValue.$model" />
        {{ label }}

        <a class="link-icon" :href="linkIcon" target="_blank" v-if="linkIcon">
          <LinkIcon />
        </a>
        <sup class="is-req" v-if="req">*</sup>
      </label>
    </template>
    <div v-if="!['checkbox', 'radiobox'].includes(type)" class="input-box">
      <slot name="before"></slot>
      <input v-if="['text', 'password', 'email'].includes(type)" class="input-basic"
        :class="{ 'error-form': modelValue.$errors.length > 0 }" :placeholder="placeholder" :autocomplete="autocomplete"
        :id="id" v-model="modelValue.$model" />
      <textarea v-if="type == 'textarea'" class="input-basic is-textarea"
        :class="{ 'error-form': modelValue.$errors.length > 0 }" :placeholder="placeholder" :autocomplete="autocomplete"
        :id="id" v-model="modelValue.$model" />

      <select v-if="type == 'select'" :id="id" class="input-basic" v-model="modelValue.$model">
        <option v-for="opt in options" :value="opt[0]" v-bind:key="opt[0].toString()">
          {{ opt[1] }}
        </option>
      </select>
      <slot name="after"></slot>
    </div>
    <div class="help-text" v-if="help">
      {{ help }}
    </div>
    <div v-if="modelValue.$errors.length > 0" class="form-error-label">
      {{ $t(`error_form_${modelValue.$errors[0].$validator}`) }}
    </div>
  </div>
</template>

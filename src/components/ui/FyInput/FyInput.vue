<script setup lang="ts">
import { LinkIcon } from "@heroicons/vue/24/solid";
import { computed, ref, toRef } from "vue";
import type { modelValueType, checkboxValueType } from '../../../dts/'
import type { ErrorObject } from "@vuelidate/core"

const props = withDefaults(defineProps<{
  id: string,
  showLabel?: boolean,
  label? : string,
  type : string,
  placeholder? : string,
  autocomplete? : string,
  checkboxTrueValue? : string|boolean,
  checkboxFalseValue? : string|boolean,
  req? : boolean,
  linkIcon? : string,
  modelValue?: modelValueType,
  checkboxValue?: checkboxValueType,
  options?: string[][],
  help?: string,
  error?: string,
  errorVuelidate?: ErrorObject[]
}>(), {
  showLabel: true,
  type: 'text',
  req: false,
  options: () => [],
  checkboxTrueValue: true,
  checkboxFalseValue: false
})
const inputRef = ref<HTMLInputElement>()
const errorProps = toRef(props, 'error')
const errorVuelidateProps = toRef(props, 'errorVuelidate')

const checkErrors = computed(() => {
  if (errorProps.value) return errorProps.value;
  if (errorVuelidateProps.value && errorVuelidateProps.value.length > 0) {
    console.log(errorVuelidateProps.value)
    return errorVuelidateProps.value[0].$validator.toString()
  }

  return null
})

const focus = () => {
  if (inputRef.value) inputRef.value.focus()
}
defineExpose({ focus });

const emit = defineEmits(['update:modelValue', 'update:checkboxValue'])
const model = computed({
  get: () => props.modelValue,
  set: items => {
    emit('update:modelValue', items)
  }
})
const modelCheckbox = computed({
  get: () => props.checkboxValue,
  set: items => {
    emit('update:checkboxValue', items)
  }
})
</script>
<template>
  <div class="input-group">
    <template v-if="showLabel && id && label">
      <label class="label-basic" :for="id">
        <input :aria-label="label" :ref="`inputRef`" v-if="type == 'checkbox'" type="checkbox" class="form-checkbox" :id="id"
          :class="{ 'error-form': checkErrors }" :true-value="checkboxTrueValue" :false-value="checkboxFalseValue"
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
      <input :ref="`inputRef`" :aria-label="label" v-if="['text', 'password', 'email', 'search'].includes(type)" class="input-basic" :class="{ 'error-form': error }"
        :placeholder="placeholder" :autocomplete="autocomplete" :id="id" v-model="model" :type="type" />
      <textarea :aria-label="label" :ref="`inputRef`" v-if="type == 'textarea'" class="input-basic is-textarea" :class="{ 'error-form': checkErrors }"
        :placeholder="placeholder" :autocomplete="autocomplete" :id="id" v-model="model" />

      <select :aria-label="label" :ref="`inputRef`" v-if="type == 'select'" :id="id" class="input-basic" v-model="model">
        <option v-for="opt in options" :value="opt[0]" :key="opt[0].toString()">
          {{ opt[1] }}
        </option>
      </select>
      <slot name="after"></slot>
    </div>
    <div class="help-text" v-if="help">
      {{ help }}
    </div>
    <div v-if="checkErrors" class="form-error-label">
      {{ checkErrors }}
    </div>
  </div>
</template>

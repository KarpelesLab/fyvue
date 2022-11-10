<script setup lang="ts">
import { LinkIcon } from '@heroicons/vue/24/solid';

defineProps({
  id: {
    type: String,
    default: undefined,
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: undefined,
  },
  errors: {
    type: Array<Object>,
    default: [],
  },
  type: {
    type: String,
    default: 'text',
    required: true,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  autocomplete: {
    type: String,
    default: undefined,
  },
  checkboxTrueValue: {
    type: String,
    default: undefined,
  },
  checkboxFalseValue: {
    type: String,
    default: undefined,
  },
  req: {
    type: Boolean,
    default: false,
  },
  help: {
    type: String,
    default: undefined,
  },
  linkIcon: {
    type: String,
    default: undefined,
  },
  value: {
    type: String,
    default: '',
    required: true,
  },
});
const emit = defineEmits<{
  (event: 'update:value', payload: string): void;
}>();
</script>
<template>
  <div class="input-group">
    <template v-if="showLabel && id && label">
      <label class="label-basic" :for="id">
        <input
          v-if="type == 'checkbox'"
          type="checkbox"
          class="form-checkbox"
          :id="id"
          :class="{ 'error-form': errors.length }"
          :true-value="checkboxTrueValue"
          :false-value="checkboxFalseValue"
        />

        {{ label }}

        <a class="link-icon" :href="linkIcon" target="_blank" v-if="linkIcon"
          ><LinkIcon
        /></a>
        <sup class="is-req" v-if="req">*</sup>
      </label>
    </template>
    <div v-if="!['checkbox', 'radiobox'].includes(type)" class="input-box">
      <slot name="before"></slot>
      <input
        v-if="['text', 'password', 'email'].includes(type)"
        class="input-basic"
        :class="{ 'error-form': errors.length > 0 }"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :id="id"
        @input="emit('update:value', ($event.target as HTMLInputElement).value)"
      />
      <textarea
        v-if="type == 'textarea'"
        class="input-basic is-textarea"
        :class="{ 'error-form': errors.length > 0 }"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :id="id"
        @input="emit('update:value', ($event.target as HTMLInputElement).value)"
      />
      <slot name="after"></slot>
    </div>
    <div class="help-text" v-if="help">
      {{ help }}
    </div>
    <div v-if="errors.length > 0" class="form-error-label">
      <template v-for="err in errors" :key="err.key">
        {{ $t(err.key) }}
      </template>
    </div>
  </div>
</template>
<style lang="scss">
.input-group {
  @apply w-full;

  .is-req {
    @apply text-red-700;
  }
  .form-error-label {
    @apply text-xs text-center font-bold -mt-3.5 md:mt-0.5;
  }
  .link-icon {
    svg {
      @apply w-5 inline-block -mt-0.5 mr-2;
    }
  }
  .input-basic {
    &:focus,
    &:active {
      @apply outline-0 outline-1 outline-fv-primary-500;
    }
    @apply w-full py-3 text-xs placeholder-fv-neutral-400 font-semibold leading-none border-0 outline-none;
    &.is-textarea {
      @apply h-32;
    }
  }

  .input-box {
    @apply flex flex-1 border mb-4 md:mb-0;
    input {
      @apply px-2;
    }
    select {
      padding-top: 14px;
      padding-bottom: 13px;
    }
    textarea {
      @apply px-2;
    }
  }

  .label-basic {
    @apply block uppercase tracking-wide whitespace-nowrap text-xs  font-bold mb-2 text-left pt-0 md:pt-3;

    input[type='checkbox'] {
      @apply -mt-1;
      &:focus,
      &:active {
        @apply outline-0 outline-1 outline-fv-primary-500;
      }
      &:checked {
        @apply outline-0 outline-1 outline-fv-primary-500  bg-fv-primary-500;
      }
    }
  }

  .error-form {
    @apply outline-1 outline-red-600;
  }

  .help-text {
    @apply font-medium text-xs mt-0.5;
  }

  .help-icon {
    @apply w-6 inline-block -mt-1;
  }
}

.light {
  .link-icon svg {
    @apply text-fv-primary-600;
    &:hover {
      @apply text-fv-primary-900;
    }
  }
  .input-group {
    .input-box,
    .dp__input {
      @apply bg-fv-neutral-50 border-fv-neutral-300;
    }

    .input-basic {
      @apply bg-fv-neutral-50 text-black;
    }

    .label-basic,
    .help-icon,
    .help-text {
      @apply text-fv-neutral-600;
    }

    .form-error-label {
      @apply text-red-500;
    }
  }
}

.dark {
  .link-icon svg {
    @apply text-fv-neutral-300;
    &:hover {
      @apply text-fv-primary-50;
    }
  }
  .input-group {
    .input-box,
    .dp__input {
      @apply bg-fv-neutral-800 border-fv-neutral-700;
    }

    .input-basic {
      @apply bg-fv-neutral-800 text-fv-neutral-50;
    }

    .modal-container,
    .box {
      .input-box,
      .dp__input {
        @apply bg-fv-neutral-900 border-fv-neutral-700;
      }

      .input-basic {
        @apply bg-fv-neutral-900 text-fv-neutral-50;
      }
    }

    .label-basic,
    .help-icon,
    .help-text {
      @apply text-fv-neutral-200;
    }

    .form-error-label {
      @apply text-red-400;
    }
  }
}
</style>

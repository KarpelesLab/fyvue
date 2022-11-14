<script setup lang="ts">
import { UserCircleIcon, EnvelopeOpenIcon } from '@heroicons/vue/24/solid';
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, maxLength, required, email } from '@vuelidate/validators';
const state = reactive({
  user: {
    username: '',
    email: '',
    select: null,
  },
});
const selectOptions = [
  ['1', 'Yo'],
  ['2', 'YoYo'],
  ['3', 'YoYoYo'],
];
const rules = {
  user: {
    username: {
      required: required,
      minLength: minLength(2),
      maxLength: maxLength(36),
    },
    email: {
      required,
      email,
    },
    select: {
      required,
    },
  },
};
const v$ = useVuelidate(rules, state);
const submit = async () => {
  if (await v$.value.user.$validate()) {
    console.log('GG');
  }
};
</script>
<template>
  <pre class="text-xs">{{ state }}</pre>

  <form @submit.prevent="submit">
    <FyInput
      v-model="state.user.email"
      :errorVuelidate="v$.user.email.$errors"
      id="test_email"
      :req="true"
      :showLabel="true"
      :placeholder="$t('test_email_placeholder')"
      :label="$t('test_email_label')"
      autocomplete="email"
      type="email"
    >
      <template v-slot:after>
        <EnvelopeOpenIcon class="inline-block w-5 text-fv-primary-500 mx-2" />
      </template>
    </FyInput>
    <FyInput
      v-model="state.user.username"
      :errorVuelidate="v$.user.username.$errors"
      id="test_username"
      :req="true"
      :showLabel="true"
      :placeholder="$t('test_username_placeholder')"
      :label="$t('test_username_label')"
      autocomplete="email"
      type="text"
    >
      <template v-slot:before>
        <UserCircleIcon class="inline-block w-5 text-fv-primary-500 mx-2" />
      </template>
    </FyInput>
    <FyInput
      v-model="state.user.select"
      :errorVuelidate="v$.user.select.$errors"
      :options="selectOptions"
      id="test_select"
      :req="true"
      :showLabel="true"
      :placeholder="$t('test_select_placeholder')"
      :label="$t('test_select_label')"
      type="select"
    >
      <template v-slot:after>
        <EnvelopeOpenIcon class="inline-block w-5 text-fv-primary-500 mx-2" />
      </template>
    </FyInput>
    <button type="submit" class="btn primary btn-defaults">Submit</button>
  </form>
</template>

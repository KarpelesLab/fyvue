<script setup>
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, maxLength, required, email } from '@vuelidate/validators';
import { ref } from "vue";
// Vuelidate Usage
const isFormValid = ref(false);
const vuelidateState = reactive({
  user: {
    email: '',
    username: '',
  },
});
const vuelidateRules = {
  user: {
    email: {
      required,
      email,
    },
    username: {
      minLength: minLength(5),
      maxLength: maxLength(36),
    },
  },
};
const $v = useVuelidate(vuelidateRules, vuelidateState);
const resetForm = () => {
  $v.value.$reset();
  vuelidateState.user.email = '';
  vuelidateState.user.username = '';
  isFormValid.value = false;
}
const testSubmit = async () => {
  if (await $v.value.user.$validate()) {
    isFormValid.value = true;
  } else {
    isFormValid.value = false;
  }
};
// Basic usage
const stateExample = reactive({
  text: null,
  select: null,
  checkbox: null,
  textarea: null,
});
const selectOptions = [
  [1, 'Option 1'],
  [2, 'Option 2'],
  [3, 'Option 3'],
];

const fvComponent = `
_script_
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, maxLength, required, email } from '@vuelidate/validators';
import { ref } from "vue";

// Vuelidate Usage
const isFormValid = ref(false);
const vuelidateState = reactive({
  user: {
    email: '',
    username: '',
  },
});
const vuelidateRules = {
  user: {
    email: {
      required,
      email,
    },
    username: {
      minLength: minLength(5),
      maxLength: maxLength(36),
    },
  },
};
const $v = useVuelidate(vuelidateRules, vuelidateState);
const resetForm = () => {
  $v.value.$reset();
  vuelidateState.user.email = '';
  vuelidateState.user.username = '';
  isFormValid.value = false;
}
const testSubmit = async () => {
  if (await $v.value.user.$validate()) {
    isFormValid.value = true;
  } else {
    isFormValid.value = false;
  }
};


// Basic usage
const stateExample = reactive({
  text: null,
  select: null,
  checkbox: null,
  textarea: null,
});
const selectOptions = [
  [1, 'Option 1'],
  [2, 'Option 2'],
  [3, 'Option 3'],
];
_script_end_
<template>
  <h2 class="text-xl font-bold">Basic usage:</h2>
  <pre class="text-xs">{{ stateExample }}</pre>
  <FyInput
    v-model="stateExample.text"
    id="textInput"
    :showLabel="true"
    label="Text input label"
    placeholder="Your placeholder..."
    error="This will always be in error."
    type="text"
  />
  <FyInput
    v-model="stateExample.select"
    id="selectInput"
    :showLabel="true"
    label="Select input label"
    type="select"
    :options="selectOptions"
  />
  <FyInput
    v-model:checkboxValue="stateExample.checkbox"
    id="checkboxInput"
    :showLabel="true"
    label="Checkbox input label"
    type="checkbox"
    linkIcon="https://google.fr"
  />
  <FyInput
    v-model="stateExample.textarea"
    id="textareaInput"
    :showLabel="true"
    label="Textarea input label"
    placeholder="Your placeholder..."
    type="textarea"
  />
  <h2 class="text-xl mt-2 font-bold">Vuelidate usage:</h2>
  <pre class="text-xs">isFormValid: {{ isFormValid }}</pre>
  <form @submit.prevent="testSubmit">
    <FyInput
      v-model="vuelidateState.user.email"
      id="emailInput"
      :showLabel="true"
      :req="true"
      label="Email"
      placeholder="john@gmail.com"
      :errorVuelidate="$v.user.email.$errors"
      type="email"
    />
    <FyInput
      v-model="vuelidateState.user.username"
      id="usernameInput"
      :showLabel="true"
      :req="true"
      label="Username"
      placeholder="psish"
      :errorVuelidate="$v.user.username.$errors"
      type="text"
    />
    <div class="btn-box">
      <button type="submit" class="btn primary btn-defaults">
        Check for errors (submit)
      </button>
      <button
        @click.prevent="resetForm()"
        type="reset"
        class="btn neutral btn-defaults mt-4"
      >
        Reset
      </button>
    </div>
  </form>
</template>
`;
const props = [
  {
    name: 'id',
    type: 'string',
    info: 'used for HTML attribute ID on input and "for" on label',
  },
  {
    name: 'showLabel?	',
    type: 'boolean',
    info: 'Display input label',
    def: 'true',
  },
  {
    name: 'label?',
    type: 'string',
    info: 'Input label',
  },
  {
    name: 'type',
    type: 'text|password|email|checkbox|select|textarea',
    info: 'Input type',
    def: 'text',
  },
  {
    name: 'placeholder?',
    type: 'string',
    info: 'Input placeholder',
  },
  {
    name: 'autocomplete',
    type: 'string',
    info: 'HTML attribute autocomplete on input',
  },
  {
    name: 'checkboxTrueValue?',
    type: 'string',
    info: 'true value on checkbox',
    def: 'on',
  },
  {
    name: 'checkboxFalseValue?',
    type: 'string',
    info: 'false value on checkbox',
    def: 'off',
  },
  {
    name: 'req?',
    type: 'boolean',
    info: 'Is field required? (adds a red * after label)',
    def: 'false',
  },
  {
    name: 'help?',
    type: 'string',
    info: 'Help text displayed below input',
  },
  {
    name: 'error?',
    type: 'string',
    info: 'Force an error on the field and display value below input',
  },
  {
    name: 'errorVuelidate?',
    type: 'object',
    info: '$v.field.$errors from vuelidate object',
  },
  {
    name: 'linkIcon',
    type: 'string',
    info: 'Add link after label with a paper-clip icon',
  },
  {
    name: 'v-model?',
    type: 'string|number|string[]|undefined',
    info: 'v-model',
  },
  {
    name: 'v-model:checkboxValue?',
    type: 'any[]|Set<any>|undefined|boolean',
    info: 'v-model for checkbox',
  },
  {
    name: 'options',
    type: 'array',
    info: '2D array for select options',
  },
];
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>FyInput</h1>
    <p></p>
  </div>

  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <h2 class="text-xl font-bold">Basic usage:</h2>
      <pre class="text-xs">{{ stateExample }}</pre>
      <FyInput
        v-model="stateExample.text"
        id="textInput"
        :showLabel="true"
        label="Text input label"
        placeholder="Your placeholder..."
        error="This will always be in error."
        type="text"
      />
      <FyInput
        v-model="stateExample.select"
        id="selectInput"
        :showLabel="true"
        label="Select input label"
        type="select"
        :options="selectOptions"
      />
      <FyInput
        v-model:checkboxValue="stateExample.checkbox"
        id="checkboxInput"
        :showLabel="true"
        label="Checkbox input label"
        type="checkbox"
        linkIcon="https://google.fr"
      />
      <FyInput
        v-model="stateExample.textarea"
        id="textareaInput"
        :showLabel="true"
        label="Textarea input label"
        placeholder="Your placeholder..."
        type="textarea"
      />
      <h2 class="text-xl mt-2 font-bold">Vuelidate usage:</h2>
      <pre class="text-xs">isFormValid: {{ isFormValid }}</pre>
      <form @submit.prevent="testSubmit">
        <FyInput
          v-model="vuelidateState.user.email"
          id="emailInput"
          :showLabel="true"
          :req="true"
          label="Email"
          placeholder="john@gmail.com"
          :errorVuelidate="$v.user.email.$errors"
          type="email"
        />
        <FyInput
          v-model="vuelidateState.user.username"
          id="usernameInput"
          :showLabel="true"
          :req="true"
          label="Username"
          placeholder="psish"
          :errorVuelidate="$v.user.username.$errors"
          type="text"
        />
        <div class="btn-box">
          <button type="submit" class="btn primary btn-defaults">
            Check for errors (submit)
          </button>
          <button
            @click.prevent="resetForm()"
            type="reset"
            class="btn neutral btn-defaults mt-4"
          >
            Reset
          </button>
        </div>
      </form>
    </template>
  </FyDocPreview>
</template>

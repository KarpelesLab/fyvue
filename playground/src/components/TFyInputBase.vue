<script setup lang="ts">
import { UserCircleIcon, EnvelopeOpenIcon } from "@heroicons/vue/24/solid";
import { reactive } from "vue";
const selectOptions = [
  ['1', 'Yo'],
  ['2', 'YoYo'],
  ['3', 'YoYoYo']
]
const state = reactive({
  test: "",
  testErr: "",
  testEmail: "yo@fy.to",
  testUsername: "Fy",
  testTextarea: "Blabla \nBlabla",
  testCheckbox: [],
  testUsername2: "",
  testError2: "Error :(",
  testSelect: '2'
})
</script>
<template>
  <pre class="text-xs">{{ state }}</pre>
  <FyInput v-model="state.test" id="test"  :showLabel="true"
    :label="$t('test_label')" type="text" />
  <FyInput v-model="state.testErr" id="test-error" :req="true" :showLabel="true"
    :placeholder="$t('test-error_placeholder')" :label="$t('test-error_label')" type="text" error="This is an error" />
  <FyInput v-model="state.testEmail" id="test_email" :req="true" :showLabel="true"
    :placeholder="$t('test_email_placeholder')" :label="$t('test_email_label')" autocomplete="email" type="email">
    <template v-slot:after>
      <EnvelopeOpenIcon class="inline-block w-5 text-fv-primary-500 mx-2" />
    </template>
  </FyInput>
  <FyInput v-model="state.testSelect" id="testSelect" :options="selectOptions" :showLabel="true"
    :placeholder="$t('test_select')" :label="$t('test_select_label')" type="select" />

  <FyInput v-model="state.testUsername" id="test_username" :req="true" :showLabel="true"
    :placeholder="$t('test_username_placeholder')" :label="$t('test_username_label')" autocomplete="email" type="text">
    <template v-slot:before>
      <UserCircleIcon class="inline-block w-5 text-fv-primary-500 mx-2" />
    </template>
  </FyInput>
  <FyInput v-model="state.testTextarea" id="test_textarea" :req="true" :showLabel="true"
    :placeholder="$t('test_textarea_label')" :label="$t('test_textarea_placeholder')" type="textarea" />
  <FyInput v-model:checkboxValue="state.testCheckbox" id="checkbox" :req="true" :showLabel="true" :label="$t('checkbox_label')"
    type="checkbox" linkIcon="https://google.fr" />
  <div class="dark bg-neutral-800 p-4">
    <FyInput v-model="state.testUsername2" id="test_username2" :req="true" :showLabel="true"
      :placeholder="$t('test_username2_placeholder')" :label="$t('test_username2_label')" autocomplete="email"
      type="text"> <template v-slot:before>
        <UserCircleIcon class="inline-block w-5 text-fv-primary-300 mx-2" />
      </template>
    </FyInput>
    <FyInput v-model="state.testError2" id="test-error2" :req="true" :showLabel="true"
      :placeholder="$t('test-error2_placeholder')" :label="$t('test-error2_label')" type="text"
      help="/!\ You need to do better bro." error="This is an error" />
  </div>
</template>

<script setup lang="ts">
import { rest } from '../../../utils/rest';
import { ref, reactive, computed } from 'vue';
import { useFVStore } from '../../../utils/store';
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useEventBus } from '../../../utils/helpers';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
const store = useFVStore();
const isAuth = computed(() => store.isAuth);
const eventBus = useEventBus();
const props = withDefaults(
  defineProps<{
    to?: string;
  }>(),
  {
    to: '@support',
  }
);
const globalFormError = ref(null);
const success = ref(false);
const state = reactive({
  contact: {
    fullname: isAuth.value ? store.user?.Profile.Display_Name : '',
    email: isAuth.value ? store.user?.Email : '',
    message: '',
    subject: '',
  },
});
const rules = {
  contact: {
    fullname: { required },
    email: { required, email },
    message: { required },
    subject: { required },
  },
};
const v$ = useVuelidate(rules, state);
const sendMessage = async () => {
  globalFormError.value = null;
  success.value = false;
  if (await v$.value.contact.$validate()) {
    eventBus.emit('klb-contact-form-loading', true);
    const sendResult = await rest('Support/Ticket', 'POST', {
      To: props.to,
      Email: state.contact.email,
      Subject: `${state.contact.subject}`,
      Message: state.contact.message,
      Name: state.contact.fullname,
    }).catch((error) => {
      // handle errors here
      eventBus.emit('klb-contact-form-loading', false);
      globalFormError.value = error.error;
    });
    if (sendResult && sendResult.result == 'success') {
      success.value = true;
    }
    eventBus.emit('klb-contact-form-loading', false);
  }
};
</script>
<template>
  <div>
    <form
      @submit.prevent="sendMessage"
      v-if="!success"
      class="klb-contact-form"
    >
      <FyLoader id="klb-contact-form" />
      <div>
        <FyInput
          id="emailLogin"
          :req="true"
          :showLabel="true"
          :placeholder="$t('klb_contact_form_place_holder_email')"
          autocomplete="email"
          :errorVuelidate="v$.contact.email.$errors"
          v-model="state.contact.email"
          :disabled="isAuth"
          type="email"
          :label="$t('klb_contact_form_label_email')"
        >
        </FyInput>
        <FyInput
          id="fullName"
          :req="true"
          :showLabel="true"
          :placeholder="$t('klb_contact_form_label_fullname')"
          autocomplete="name"
          :disabled="isAuth"
          :errorVuelidate="v$.contact.fullname.$errors"
          v-model="state.contact.fullname"
          type="text"
          :label="$t('klb_contact_form_place_holder_fullname')"
        >
        </FyInput>
        <FyInput
          id="subject"
          :req="true"
          :showLabel="true"
          :placeholder="$t('klb_contact_form_place_holder_subject')"
          :errorVuelidate="v$.contact.subject.$errors"
          v-model="state.contact.subject"
          type="text"
          :label="$t('klb_contact_form_label_subject')"
        >
        </FyInput>
        <FyInput
          id="message"
          :req="true"
          :showLabel="true"
          :placeholder="$t('klb_contact_form_place_holder_message')"
          :errorVuelidate="v$.contact.message.$errors"
          v-model="state.contact.message"
          type="textarea"
          :label="$t('klb_contact_form_label_message')"
        >
        </FyInput>
        <p class="response-error" v-if="globalFormError">
          {{ globalFormError }}
        </p>
        <button class="btn primary btn-defaults" type="submit">
          {{ $t('klb_contact_cta') }}
        </button>
      </div>
    </form>
    <p class="response-success" v-else>{{ $t('klb_contact_thanks') }}</p>
  </div>
</template>

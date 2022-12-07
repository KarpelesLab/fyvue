<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { ref, computed, reactive } from 'vue';
import { PencilIcon } from '@heroicons/vue/24/solid';
import { useFVStore } from '../../helpers/store';
import { rest } from '../../helpers/rest';
import { useEventBus } from '@fy-/core';

withDefaults(
  defineProps<{
    showValueButton?: boolean;
  }>(),
  {
    showValueButton: true,
  }
);
const eventBus = useEventBus();
const store = useFVStore();
const isAuth = computed(() => store.isAuth);

const errorOnSubmit = ref<string | undefined>(undefined);
const rules = {
  updateEmail: {
    email: { required, email },
    pwd: { required },
  },
};
const state = reactive({ updateEmail: { email: '', pwd: '' } });
const v$ = useVuelidate(rules, state);

const changeEmail = async () => {
  errorOnSubmit.value = undefined;
  if (await v$.value.updateEmail.$validate()) {
    const _updateResult = await rest('User/@:setEmail', 'POST', {
      email: state.updateEmail.email,
      current_password: state.updateEmail.pwd,
    }).catch((err) => {
      errorOnSubmit.value = err.token;
    });
    if (_updateResult && _updateResult.result == 'success') {
      await store.refreshUser();
      eventBus.emit('UpdateEmailModal', false);
    }
  }
};
</script>
<template>
  <div v-if="isAuth" class="klb-account">
    <div v-if="showValueButton">
      <h2 class="h4">{{ $t('update_email_display_label') }}</h2>
      <div class="klb-account-edit-data">
        <div class="main h5">{{ store.user?.Email }}</div>

        <button
          @click="eventBus.emit('UpdateEmailModal', true)"
          class="btn primary small"
        >
          <PencilIcon class="edit-icon" /> {{ $t('update_email_display_cta') }}
        </button>
      </div>
    </div>
    <FyModal id="UpdateEmail" :title="$t('update_email_modal_title')">
      <form @submit.prevent="changeEmail">
        <div class="klb-account-grid-inputs">
          <FyInput
            id="currPwd"
            :req="true"
            :showLabel="true"
            :placeholder="$t('update_email_form_pwd_placeholder')"
            :errorVuelidate="v$.updateEmail.pwd.$errors"
            v-model="state.updateEmail.pwd"
            :label="$t('update_email_form_pwd_label')"
            type="password"
            autocomplete="off"
          ></FyInput>
          <FyInput
            id="newEmail"
            :req="true"
            :showLabel="true"
            :placeholder="$t('update_email_form_email_placeholder')"
            :errorVuelidate="v$.updateEmail.email.$errors"
            v-model="state.updateEmail.email"
            :label="$t('update_email_form_email_label')"
            autocomplete="off"
            type="email"
          ></FyInput>
        </div>
        <div class="form-error-label" v-if="errorOnSubmit">
          {{ errorOnSubmit }}
        </div>
        <button class="btn-defaults mt-4 btn primary" type="submit">
          {{ $t('update_email_cta') }}
        </button>
      </form>
    </FyModal>
  </div>
</template>

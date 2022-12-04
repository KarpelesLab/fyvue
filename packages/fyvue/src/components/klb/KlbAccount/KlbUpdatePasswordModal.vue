<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { PencilIcon } from '@heroicons/vue/24/solid';

import { useFVStore } from '../../../utils/store';
import { rest } from '../../../utils/rest';
import { useEventBus } from '@fy-/core';

import FyInput from '../../ui/FyInput/FyInput.vue';

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
const pwd = ref<string>();
const pwdConfirm = ref<string>();
const oldPwd = ref<string>();

const errorOnSubmit = ref<string | undefined>(undefined);
const rules = {
  oldPwd: { required },
  pwd: { required },
  pwdConfirm: { req: required, sameAs: sameAs(pwd) },
};
const v$ = useVuelidate(rules, { oldPwd, pwd, pwdConfirm });

const changeEmail = async () => {
  errorOnSubmit.value = undefined;
  if (await v$.value.$validate()) {
    const _updateResult = await rest('User/@:setPassword', 'POST', {
      old_password: oldPwd.value,
      password: pwd.value,
    }).catch((err) => {
      errorOnSubmit.value = err.token;
    });
    if (_updateResult && _updateResult.result == 'success') {
      await store.refreshUser();
      eventBus.emit('updatePwdModal', false);
    }
  }
};
</script>
<template>
  <div v-if="isAuth" class="klb-account">
    <div v-if="showValueButton" class="input-group">
      <div class="label-basic">{{ $t('update_pwd_display_label') }}</div>
      <div class="input-box-child">
        <button
          @click="eventBus.emit('updatePwdModal', true)"
          class="btn primary small"
        >
          <PencilIcon class="edit-icon" /> {{ $t('update_pwd_display_cta') }}
        </button>
      </div>
    </div>
    <FyModal id="updatePwd" :title="$t('update_pwd_modal_title')">
      <form @submit.prevent="changeEmail">
        <div class="klb-account-grid-inputs">
          <FyInput
            id="newPwd"
            :req="true"
            :showLabel="true"
            :placeholder="$t('update_pwd_form_newPwd_placeholder')"
            :errorVuelidate="v$.pwd.$errors"
            v-model="pwd"
            :label="$t('update_pwd_form_newPwd_label')"
            type="password"
            autocomplete="off"
          ></FyInput>
          <FyInput
            id="newPwdConfirm"
            :req="true"
            :showLabel="true"
            :placeholder="$t('update_pwd_form_pwdConfirm_placeholder')"
            :errorVuelidate="v$.pwdConfirm.$errors"
            v-model="pwdConfirm"
            :label="$t('update_pwd_form_pwdConfirm_label')"
            type="password"
            autocomplete="off"
          ></FyInput>
        </div>
        <FyInput
          id="oldPwd"
          :req="true"
          :showLabel="true"
          :placeholder="$t('update_pwd_form_oldPwd_placeholder')"
          :errorVuelidate="v$.oldPwd.$errors"
          v-model="oldPwd"
          :label="$t('update_pwd_form_oldPwd_label')"
          type="password"
          autocomplete="off"
        ></FyInput>
        <div class="form-error-label" v-if="errorOnSubmit">
          {{ errorOnSubmit }}
        </div>
        <button class="btn-defaults mt-4 btn primary" type="submit">
          {{ $t('update_pwd_cta') }}
        </button>
      </form>
    </FyModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import FyInput from '../../ui/FyInput/FyInput.vue';
import { useEventBus } from '../../../utils/helpers';
import { useRoute, useRouter } from 'vue-router';
import type {
  KlbUserFlow,
  KlbUserFlowField,
  KlbAPIResultUnknown,
} from '../../../dts/klb';
import type { ObjectS2Any } from '../../../dts';
import { useFVStore } from '../../../utils/store';
import { rest } from '../../../utils/rest';
import { ClientOnly } from '../../helpers/ClientOnly';

const props = withDefaults(
  defineProps<{
    returnDefault?: string;
    forceAction?: string;
    onSuccess?: Function;
  }>(),
  {
    returnDefault: '/',
  }
);
const state = reactive({
  userEmail: '',
});
const rules = {
  userEmail: { required },
};

type paramsType = {
  initial: boolean;
  oauth?: string;
};
const store = useFVStore();
const v$ = useVuelidate(rules, state);
const route = useRoute();
const router = useRouter();
const eventBus = useEventBus();
const returnTo = ref<string>(props.returnDefault);
const responseMessage = ref<string | null>(null);
const responseError = ref<KlbAPIResultUnknown>();
const responseReq = ref<string[]>([]);
const responseFields = ref<Array<KlbUserFlowField>>([]);
const response = ref<KlbUserFlow>();
const hasOauth = ref<boolean>(false);
const fieldsError = ref<ObjectS2Any>({});
const pwdRecoverMailSent = ref<boolean>(false);
const pwdRecoverError = ref<KlbAPIResultUnknown>();
const inputs = ref<InstanceType<typeof FyInput>[]>([]);

const formData = ref<ObjectS2Any>({
  return_to: props.returnDefault,
  session: null,
  action: props.forceAction ? props.forceAction : undefined,
});
const completed = ref(false);
const forgotPassword = async () => {
  if (await v$.value.$validate()) {
    const data = await rest('User:forgot_password', 'POST', {
      login: state.userEmail,
    }).catch((err: KlbAPIResultUnknown) => {
      pwdRecoverError.value = err;
    });

    if (data?.result == 'success') {
      pwdRecoverMailSent.value = true;
    } else {
      //
      //@TODO:
    }
  }
};
const userFlow = async (params: paramsType = { initial: false }) => {
  eventBus.emit('klblogin-loading', true);
  fieldsError.value = {};

  hasOauth.value = false;
  if (params.initial === false) {
    let hasError = false;
    responseReq.value.forEach((field) => {
      if (!formData.value[field] || formData.value[field] == '') {
        fieldsError.value[field] = 'error_form_value_is_required';
        hasError = true;
      }
    });
    if (hasError) {
      eventBus.emit('klblogin-loading', false);
      return;
    }
  }

  if (params.oauth) {
    formData.value.oauth2 = params.oauth;
  }

  if (route.query.return_to && typeof route.query.return_to == 'string') {
    returnTo.value = route.query.return_to
      ? route.query.return_to
      : props.returnDefault;
  }

  if (!formData.value.session) {
    formData.value.session = route.query.session
      ? route.query.session
      : undefined;
  }

  formData.value.return_to = returnTo.value;
  response.value = (await rest('User:flow', 'POST', formData.value).catch(
    (err: KlbAPIResultUnknown) => {
      responseError.value = err;
      if (responseError.value.param) {
        fieldsError.value[responseError.value.param] =
          responseError.value.token;
      }
      eventBus.emit('klblogin-loading', false);
      return;
    }
  )) as KlbUserFlow;
  if (response.value?.result == 'success') {
    if (props.onSuccess) {
      await props.onSuccess();
    }
    if (response.value.data.url) {
      window.location.href = response.value.data.url;
      return;
    }
    if (response.value.data.complete == true && response.value.data.user) {
      store.setUser(response.value.data.user);
      const routeExists = router.resolve(returnTo.value);
      if (routeExists.matched.length != 0) router.push(returnTo.value);
      else window.location.href = returnTo.value;
      return;
    }
    formData.value = {
      session: response.value.data.session,
    };
    inputs.value = [];
    if (response.value.data.email) state.userEmail = response.value.data.email;
    responseFields.value = response.value.data.fields;
    if (response.value.data.message)
      responseMessage.value = response.value.data.message;
    responseReq.value = response.value.data.req;
    responseFields.value.forEach((field) => {
      if (field.type == 'oauth2') {
        hasOauth.value = true;
      }
    });
    setTimeout(() => {
      if (inputs.value.length > 0 && inputs.value[inputs.value.length - 1])
        inputs.value[inputs.value.length - 1].focus();
    }, 300);
  } else {
    //
  }

  eventBus.emit('klblogin-loading', false);
};

onMounted(async () => {
  await userFlow({ initial: true });
});
</script>
<template>
  <ClientOnly>
    <div>
      <form @submit.prevent="userFlow()" v-if="!completed" class="klb-login">
        <FyLoader id="klblogin" />
        <div class="w-full">
          <h2 class="message" v-if="responseMessage">{{ responseMessage }}</h2>
          <template v-if="responseFields.length > 0">
            <template v-for="field of responseFields" :key="field.label">
              <h3
                v-if="field.type == 'label'"
                class="label"
                :class="field.style == 'error' ? 'response-error' : ''"
              >
                {{ field.label }}
              </h3>
              <template v-if="field.cat == 'input'">
                <template
                  v-if="
                    field.type == 'text' ||
                    field.type == 'password' ||
                    field.type == 'email'
                  "
                >
                  <FyInput
                    v-if="field.name"
                    :id="field.name"
                    :label="field.label"
                    :placeholder="
                      field.name == 'name' ? 'John Doe' : field.label
                    "
                    :error="fieldsError[field.name]"
                    :type="field.type"
                    ref="inputs"
                    v-model="formData[field.name]"
                    :req="responseReq.includes(field.name)"
                  />
                </template>
              </template>
              <template v-if="field.type == 'checkbox'">
                <FyInput
                  v-if="field.name"
                  :id="field.name"
                  :label="field.label"
                  :error="fieldsError[field.name]"
                  :type="field.type"
                  v-model:checkbox-value="formData[field.name]"
                  :req="responseReq.includes(field.name)"
                  :link-icon="field.link"
                />
              </template>
            </template>
            <div class="oauth-container" v-if="hasOauth">
              <template v-for="field of responseFields" :key="field.id">
                <a
                  @click="
                    () => {
                      userFlow({ initial: true, oauth: field.id });
                    }
                  "
                  v-if="field.type && field.type == 'oauth2' && field.button"
                  href="javascript:void(0);"
                >
                  <img
                    :key="`${field.label}oauth`"
                    class="oauth-button"
                    :alt="field.info.Name"
                    :src="field.button.logo"
                    :style="`background: ${field.button['background-color']}`"
                  />
                </a>
              </template>
            </div>
            <div
              class="response-error"
              v-if="responseError && responseError.token"
            >
              {{ $t(responseError.token) }}
            </div>
            <div v-if="responseReq.includes('password') && 0" class="reset-pwd">
              <a
                href="javascript:void(0)"
                @click="
                  () => {
                    eventBus.emit('ResetPasswordModal', true);
                    pwdRecoverMailSent = false;
                  }
                "
                >{{ $t('recover_pwd_link') }}</a
              >
            </div>
            <button class="btn primary btn-defaults">
              {{ $t('cta_login_next') }}
            </button>
          </template>
        </div>
      </form>
      <FyModal id="ResetPassword" :title="`${$t('recover_pwd_title')}`">
        <template v-if="!pwdRecoverMailSent">
          <FyInput
            id="emailRecover"
            :req="true"
            :showLabel="true"
            :placeholder="$t('recover_pwd_email_placeholder')"
            v-model="state.userEmail"
            :errorVuelidate="v$.userEmail.$errors"
            type="email"
            :label="$t('recover_pwd_email_label')"
          ></FyInput>
          <div
            class="response-error"
            v-if="pwdRecoverError && pwdRecoverError.token"
          >
            {{ $t(pwdRecoverError.token) }}
          </div>
          <a
            href="javascript:void(0)"
            @click="forgotPassword()"
            class="mt-2 float-right btn px-5 py-2 primary"
            >{{ $t('recover_pwd_cta') }}</a
          ><br style="clear: both" />
        </template>
        <div v-else>
          {{ $t('pwd_recover_confirm') }}
        </div>
      </FyModal>
    </div>
  </ClientOnly>
</template>

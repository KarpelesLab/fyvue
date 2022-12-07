<script setup lang="ts">
import { useFyHead } from '@fy-/head';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useFVStore } from '../../helpers/store';
import { rest } from '../../helpers/rest';
import { useEventBus } from '@fy-/core';
import { getLocale, getUrl, getPath } from '@karpeleslab/klbfw';
import type { KlbAPISetupIntent } from '../../KlbApiTypes';
import { useBilling } from './useBilling';
import { useHistory } from '../../helpers/ssr';
import { useStorage } from '@vueuse/core';

const props = defineProps({
  onComplete: { type: Function, default: () => {} },
});

const state = useStorage('state-store-klb-addpm', {
  label: '',
  firstname: '',
  lastname: '',
  country: '',
  zip: '',
});

const rules = {
  label: { required },
  firstname: { required },
  lastname: { required },
  country: { required },
  zip: { required },
};
const v$ = useVuelidate(rules, state);

const store = useFVStore();
const paymentSetupIntent = ref<KlbAPISetupIntent>();
const isAuth = computed(() => store.isAuth);
const eventBus = useEventBus();
const history = useHistory();
const stripePayment = ref();
const errorMessage = ref<string>();
let stripe: any;
let stripeElements: any;

const submitBillingCreate = async () => {
  if (await v$.value.$validate()) {
    errorMessage.value = undefined;
    if (stripe && stripeElements) {
      eventBus.emit('modal-add-pm-loading', true);
      const _stripeResult = await stripe.confirmSetup({
        elements: stripeElements,
        confirmParams: {
          return_url: `${getUrl().scheme}://${getUrl().host}${
            history.currentRoute.path
          }?newMode=1`,
          payment_method_data: {
            billing_details: {
              name: `${state.value.firstname} ${state.value.lastname}`,
              email: store.user?.Email,
              address: {
                country: state.value.country,
                postal_code: state.value.zip,
                state: '',
                city: '',
                line1: '',
                line2: '',
              },
            },
          },
        },
      });

      if (_stripeResult.error) {
        errorMessage.value = _stripeResult.error.message;
      }
      eventBus.emit('modal-add-pm-loading', false);
    }
  }
};
const showAddPaymentMethodModal = async () => {
  eventBus.emit('AddPaymentMethodModal', true);
  const _setupIntent = await useBilling().setupPaymentIntent();
  if (_setupIntent) {
    paymentSetupIntent.value = _setupIntent;
    if (paymentSetupIntent.value.data.Setup.key) {
      stripe = window.Stripe(paymentSetupIntent.value.data.Setup.key, {
        locale: getLocale(),
        stripeAccount: paymentSetupIntent.value.data.Setup.options
          .stripe_account
          ? paymentSetupIntent.value.data.Setup.options.stripe_account
          : undefined,
      });
    }
  }
  if (stripe) {
    stripeElements = stripe.elements({
      clientSecret: paymentSetupIntent.value?.data.Setup.client_secret,
    });

    await stripePayment.value;
    stripeElements
      .create('payment', {
        fields: {
          billingDetails: {
            address: 'never',
            name: 'never',
            email: 'never',
          },
        },
      })
      .mount(stripePayment.value);
  }
};

onMounted(async () => {
  if (
    history.currentRoute.query.setup_intent &&
    history.currentRoute.query.setup_intent_client_secret &&
    state.value &&
    history.currentRoute.query.newMode == '1'
  ) {
    eventBus.emit('modal-add-pm-loading', true);
    const _result = await rest('User/Billing:create', 'POST', {
      Label: state.value.label,
      First_Name: state.value.firstname,
      Last_Name: state.value.lastname,
      Zip: state.value.zip,
      Country__: state.value.country,
      method: 'Stripe',
      stripe_intent: history.currentRoute.query.setup_intent,
    }).catch((err) => {
      errorMessage.value = err.message;
      eventBus.emit('modal-add-pm-loading', false);
      history.push(getPath());
    });

    if (_result && _result.result == 'success') {
      eventBus.emit('AddPaymentMethodModal', false);
      props.onComplete(_result);
      state.value = null;
      history.push(getPath());
    } else {
      errorMessage.value = _result?.message;
    }
    eventBus.emit('modal-add-pm-loading', false);
  }

  eventBus.on('ShowAddPaymentMethodModal', showAddPaymentMethodModal);
});
onUnmounted(() => {
  eventBus.off('ShowAddPaymentMethodModal', showAddPaymentMethodModal);
});

useFyHead({
  scripts: [
    {
      src: 'https://js.stripe.com/v3',
      id: 'stripe-script',
    },
  ],
});
</script>
<template>
  <div v-if="isAuth">
    <FyModal
      id="AddPaymentMethod"
      :title="$t('add_pm_modal_title')"
      class="klb-add-method"
    >
      <FyLoader id="modal-add-pm" size="6" :showLoadingText="false" />
      <form @submit.prevent="submitBillingCreate">
        <FyInput
          id="billingLabel"
          :req="true"
          :showLabel="true"
          :placeholder="$t('add_pm_label_placeholder')"
          :errorVuelidate="v$.label.$errors"
          v-model="state.label"
          :label="$t('add_pm_label_label')"
          type="text"
        ></FyInput>
        <div class="form-grid">
          <FyInput
            id="billingFirstname"
            :req="true"
            :showLabel="true"
            :placeholder="$t('add_pm_firstname_placeholder')"
            :errorVuelidate="v$.firstname.$errors"
            v-model="state.firstname"
            :label="$t('add_pm_firstname_label')"
            type="text"
          ></FyInput>
          <FyInput
            id="billingLastname"
            :req="true"
            :showLabel="true"
            :placeholder="$t('add_pm_lastname_placeholder')"
            :errorVuelidate="v$.lastname.$errors"
            v-model="state.lastname"
            :label="$t('add_pm_lastname_label')"
            type="text"
          ></FyInput>
          <FyInput
            id="billingZip"
            :req="true"
            :showLabel="true"
            :placeholder="$t('add_pm_zip_placeholder')"
            :errorVuelidate="v$.zip.$errors"
            v-model="state.zip"
            :label="$t('add_pm_zip_label')"
            type="text"
          ></FyInput>
          <div class="fui-input">
            <label class="fui-input__label" for="typeDef"
              >{{ $t('add_pm_country_label') }}
            </label>
            <div class="fui-input__box">
              <select class="fui-input__input" v-model="state.country">
                <option
                  :value="country.Country__"
                  v-for="country in $countries.countries"
                  v-bind:key="country.Country__"
                >
                  {{ country.Name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="fui-input">
          <label class="fui-input__label" for="typeDef"
            >{{ $t('payment_method_label') }}
          </label>
          <div
            id="stripePayment"
            class="stripePayment"
            ref="stripePayment"
          ></div>
        </div>
        <div v-if="errorMessage" class="response-error">
          {{ errorMessage }}
        </div>
        <div class="btn-center">
          <button class="btn primary btn-defaults" type="submit">
            {{ $t('create_billing_profile') }}
          </button>
        </div>
      </form>
    </FyModal>
  </div>
</template>

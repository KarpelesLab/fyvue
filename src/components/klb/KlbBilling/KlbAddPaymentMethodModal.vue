<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useFVStore } from '../../../utils/store';
import { rest } from '../../../utils/rest';
import FyModal from '../../ui/FyModal/FyModal.vue';
import { useEventBus } from '../../../utils/helpers';
import { getLocale } from '@karpeleslab/klbfw';
import type {
  KLBApiResult,
  KlbUserBilling,
  KlbUserLocation,
  KlbUserBillingResult,
  KlbUserLocationResult,
} from '../../../dts/klb';

const props = defineProps({
  onComplete: { type: Function, default: () => {} },
});

const state = reactive({
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
const isAuth = computed(() => store.isAuth);
const eventBus = useEventBus();
const stripeCard = ref();
const theCard = ref();
const errorMessage = ref<string>();
let stripe: any;

const submitBillingCreate = async () => {
  if (await v$.value.$validate()) {
    errorMessage.value = undefined;
    if (stripeCard.value) {
      eventBus.emit('modal-add-pm-loading', true);
      const cardToken = await stripe.createToken(stripeCard.value, {
        name: `${state.firstname} ${state.lastname}`,
        email: store.user?.Email,
      });
      if (cardToken.error) {
        errorMessage.value = cardToken.error.message;
        eventBus.emit('modal-add-pm-loading', false);
      } else {
        const _result = await rest('User/Billing:create', 'POST', {
          Label: state.label,
          First_Name: state.firstname,
          Last_Name: state.lastname,
          Zip: state.zip,
          Country__: state.country,
          method: 'Stripe',
          cc_token: cardToken.token.id,
        }).catch((err) => {
          errorMessage.value = err.message;
          eventBus.emit('modal-add-pm-loading', false);
        });

        if (_result && _result.result == 'success') {
          eventBus.emit('AddPaymentMethodModal', false);
          props.onComplete(_result);
        } else {
          errorMessage.value = _result?.message;
        }
        eventBus.emit('modal-add-pm-loading', false);
      }
    }
  }
};
const showAddPaymentMethodModal = async () => {
  eventBus.emit('AddPaymentMethodModal', true);
  if (stripe) {
    stripeCard.value = stripe
      .elements()
      .create('card', { hidePostalCode: true });
    await theCard;
    stripeCard.value.mount(theCard.value);
  }
};

onMounted(async () => {
  const _pms = await rest<KLBApiResult>(
    'Realm/PaymentMethod:methodInfo',
    'GET',
    {
      method: 'Stripe',
    }
  );
  if (_pms && _pms.data) {
    if (_pms.data.Fields && _pms.data.Fields.cc_token) {
      stripe = window.Stripe(_pms.data.Fields.cc_token.attributes?.key, {
        locale: getLocale(),
        stripeAccount:
          _pms.data.Fields.cc_token.attributes?.options?.stripe_account,
      });
    }
  }

  eventBus.on('ShowAddPaymentMethodModal', showAddPaymentMethodModal);
});
onUnmounted(() => {
  eventBus.off('ShowAddPaymentMethodModal', showAddPaymentMethodModal);
});
useHead({
  script: [
    {
      src: 'https://js.stripe.com/v3',
      key: 'stripe-script',
    },
  ],
});
</script>
<template>
  <div v-if="isAuth">
    <FyModal id="AddPaymentMethod" :title="$t('add_pm_modal_title')">
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
        <div class="grid grid-cols-2 gap-2">
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
          <div class="input-group">
            <div class="mr-4 w-16">
              <label class="label-basic" for="typeDef"
                >{{ $t('add_pm_country_label') }}
              </label>
            </div>
            <div class="flex-1">
              <div class="input-box">
                <select class="input-basic" v-model="state.country">
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
        </div>
        <div class="input-group">
          <label class="label-basic" for="typeDef"
            >{{ $t('payment_method_label') }}
          </label>
          <div class="input-box">
            <div id="theCard" class="theCard" ref="theCard"></div>
          </div>
        </div>
        <div v-if="errorMessage" class="response-error">
          {{ errorMessage }}
        </div>
        <button
          class="block text-lg font-extrabold mx-auto p-2 mt-4 btn primary"
          type="submit"
        >
          {{ $t('create_billing_profile') }}
        </button>
      </form>
    </FyModal>
  </div>
</template>

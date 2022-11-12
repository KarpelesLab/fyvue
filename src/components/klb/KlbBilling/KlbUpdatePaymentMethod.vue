<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { ref, onMounted, computed } from 'vue';
import { getLocale } from '@karpeleslab/klbfw';
import { useFVStore } from '../../../utils/store';
import { rest } from '../../../utils/rest';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
import KlbAddPaymentMethodModal from './KlbAddPaymentMethodModal.vue';
import type {
  KLBApiResult,
  KlbUserBilling,
  KlbUserLocation,
  KlbUserBillingResult,
  KlbUserLocationResult,
} from '../../../dts/klb';

const store = useFVStore();
const isAuth = computed(() => store.isAuth);
const isLoaded = ref<Boolean>(false);
const billing = ref<KlbUserBilling>();
const location = ref<KlbUserLocation>();
const hasBilling = ref<boolean>(false);
const isEditing = ref<boolean>(false);
const stripeCard = ref();
const theCard = ref();
const errorMessage = ref<string>();

let stripe: any;

const switchToEdit = async () => {
  isEditing.value = true;
  if (stripe) {
    stripeCard.value = stripe
      .elements()
      .create('card', { hidePostalCode: true });
    await theCard;
    stripeCard.value.mount(theCard.value);
  }
};
const submitEditPaymentInfo = async () => {
  errorMessage.value = undefined;

  const cardToken = await stripe.createToken(stripeCard.value, {
    name: `${location.value?.First_Name} ${location.value?.Last_Name}`,
    email: store.user?.Email,
  });
  if (cardToken.error) {
    errorMessage.value = cardToken.error.message;
  } else {
    isLoaded.value = false;
    const _updateBillingResult = await rest(
      `User/Billing/Method/${billing.value?.Methods[0].User_Billing_Method__}:change`,
      'POST',
      {
        method: 'Stripe',
        cc_token: cardToken.token.id,
      }
    );
    if (_updateBillingResult && _updateBillingResult.result == 'success') {
      await getUserBilling();
    }
    isEditing.value = false;
    isLoaded.value = true;
  }
};
useHead({
  script: [
    {
      src: 'https://js.stripe.com/v3',
      key: 'stripe-script',
    },
  ],
});

const getUserBilling = async () => {
  if (isAuth.value) {
    isLoaded.value = false;
    const _userBilling = await rest<KlbUserBillingResult>(
      'User/Billing',
      'GET'
    ).catch(() => {});

    if (_userBilling && _userBilling.data) {
      if (_userBilling.data.length != 0) {
        hasBilling.value = true;
        const _userLocation = await rest<KlbUserLocationResult>(
          `User/Location/${_userBilling.data[0].User_Location__}`,
          'GET'
        ).catch(() => {});
        if (_userLocation && _userLocation.result == 'success') {
          location.value = _userLocation.data;
        }
        billing.value = _userBilling.data[0];
      }
    }
    isLoaded.value = true;
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
  await getUserBilling();
});
</script>

<template>
  <div v-if="isAuth">
    <div v-if="hasBilling && isLoaded" class="klb-update-pm">
      <form @submit.prevent="submitEditPaymentInfo" v-if="isEditing">
        <div class="input-group w-full">
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
        <div class="btn-box">
          <a class="btn-defaults btn neutral" @click="isEditing = false">{{
            $t('cancel_save_payment_method')
          }}</a>
          <button class="btn-defaults btn primary" type="submit">
            {{ $t('save_payment_method') }}
          </button>
        </div>
      </form>
      <div v-else class="">
        <div v-if="billing && billing.Methods && billing.Methods.length > 0">
          {{ $t('payment_method_billing') }}:
          <b>{{ billing.Methods[0].Name }}</b
          ><br />
          {{ $t('payment_method_exp') }}:
          <b>{{ billing.Methods[0].Expiration }}</b>
          <button
            class="block font-extrabold mx-auto p-2 mt-4 btn primary"
            @click="switchToEdit"
          >
            {{ $t('edit_billing_method') }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="!hasBilling && isLoaded">
      {{ $t('no_payment_method_yet') }}<br />
      <button
        @click="$eventBus.emit('ShowAddPaymentMethodModal')"
        class="btn primary btn-defaults"
      >
        {{ $t('add_payment_method_cta') }}
      </button>
    </div>
  </div>
  <div class="self-loader-fyvue" v-if="!isLoaded">
    <FyLoader
      id="self-loader-fyvue"
      :force="true"
      size="6"
      :showLoadingText="false"
    />
  </div>
  <KlbAddPaymentMethodModal />
</template>

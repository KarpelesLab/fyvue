<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useHead } from '@vueuse/head';
import {
  KlbUserBilling,
  KlbOrder,
  KlbOrderProcess,
  KlbAPIOrderProcess,
} from '../../../dts/klb';
import { getLocale } from '@karpeleslab/klbfw';
import { useOrder } from './userOrder';
import { useFVStore } from '../../../utils/store';
import { ObjectS2Any } from '../../../dts';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
import { useEventBus } from '../../../utils/helpers';
let stripe: any;

useHead({
  script: [
    {
      src: 'https://js.stripe.com/v3',
      key: 'stripe-script',
    },
  ],
});

const currentMethod = ref<string>();
const eventBus = useEventBus();
const store = useFVStore();
const props = withDefaults(
  defineProps<{
    orderUuid: string;
  }>(),
  {}
);
const session = ref<string>();
const theCard = ref();
const stripeCard = ref();
const errorMessage = ref<string>();
const order = ref<KlbOrder>();
const formData = reactive({} as ObjectS2Any);
const process = ref<KlbOrderProcess>();
const onFileSelectOptions = ref<Array<string[]>>([]);
const selectedOnFile = ref<string>();

const processOrder = async () => {
  eventBus.emit('klb-order-loading', true);
  errorMessage.value = undefined;
  if (currentMethod.value == 'Stripe') {
    const cardToken = await stripe.createToken(stripeCard.value, {
      name: `${order.value?.Billing_User_Location.First_Name} ${order.value?.Billing_User_Location.Last_Name}`,
      email: store.user?.Email,
    });
    if (cardToken.error) {
      errorMessage.value = cardToken.error.message;
    } else {
      const data = { ...formData };
      data.session = session.value;
      data.cc_token = cardToken.token.id;
      data.method = currentMethod.value;
      const _process = await useOrder()
        .process(data, props.orderUuid)
        .catch(() => {});

      await getOrderProcess(_process);
    }
  } else if (currentMethod.value == 'Free') {
    const data = { ...formData };
    data.session = session.value;
    data.method = currentMethod.value;
    const _process = await useOrder()
      .process(data, props.orderUuid)
      .catch(() => {});

    await getOrderProcess(_process);
  } else if (currentMethod.value == 'OnFile') {
    const data = { ...formData };
    data.session = session.value;
    data.method = currentMethod.value;
    data.user_billing = selectedOnFile.value;
    const _process = await useOrder()
      .process(data, props.orderUuid)
      .catch(() => {});

    await getOrderProcess(_process);
  }
  eventBus.emit('klb-order-loading', false);
  //await getOrderProcess();
};

const activatePM = async (method: string) => {
  eventBus.emit('klb-order-loading', true);
  if (process.value) {
    if (method == 'Stripe') {
      currentMethod.value = method;
      const _ccToken = process.value.methods[method].fields.cc_token;
      if (_ccToken.attributes && _ccToken.attributes.key) {
        stripe = window.Stripe(_ccToken.attributes?.key, {
          locale: getLocale(),
          stripeAccount: _ccToken.attributes.options?.stripe_account,
        });
      }
      session.value = process.value.methods[method].session;

      if (stripe) {
        stripeCard.value = stripe
          .elements()
          .create('card', { hidePostalCode: true });
        await theCard;
        if (theCard.value) {
          stripeCard.value.mount(theCard.value);
        }
      }
    } else if (method == 'OnFile') {
      currentMethod.value = method;
      session.value = process.value.methods[method].session;
      onFileSelectOptions.value = [];
      const _userBilling = process.value.methods[method].fields.user_billing
        .values as unknown as KlbUserBilling[];

      if (_userBilling) {
        let i = 0;
        for (const userBilling of _userBilling) {
          if (i == 0) selectedOnFile.value = userBilling.User_Billing__;
          const displayUserBilling = `${userBilling.Label}`;
          onFileSelectOptions.value.push([
            userBilling.User_Billing__,
            displayUserBilling,
          ]);
          i++;
        }
      }
    } else if (method == 'Free') {
      currentMethod.value = method;
      session.value = process.value.methods[method].session;
    }
  }
  eventBus.emit('klb-order-loading', false);
};
const getOrderProcess = async (
  __process: void | KlbAPIOrderProcess = undefined
) => {
  eventBus.emit('klb-order-loading', true);
  const _process = __process
    ? __process
    : await useOrder()
        .process(null, props.orderUuid)
        .catch(() => {});

  if (_process && _process.result == 'success') {
    process.value = _process.data;
    order.value = process.value.order;
    for (const method of process.value.methods_order) {
      if (['Free', 'Stripe', 'OnFile'].includes(method)) {
        currentMethod.value = method;
        break;
      }
    }
    if (currentMethod.value) {
      for (const [k, v] of Object.entries(
        process.value.methods[currentMethod.value].fields
      )) {
        if (k != 'user_billing' && v) {
          if (v.attributes) {
            formData[k] = v.attributes.value
              ? v.attributes.value.toString()
              : null;
          }
        }
      }
      await activatePM(currentMethod.value);
    }
  }
  eventBus.emit('klb-order-loading', false);
};
onMounted(async () => {
  await getOrderProcess();
});
</script>
<template>
  <div class="klb-order-internal">
    <FyLoader id="klb-order" />
    <template v-if="process">
      <form @submit.prevent="processOrder">
        <template v-if="process.order_payable">
          <template v-if="currentMethod == 'Stripe'">
            <div class="input-group">
              <label class="label-basic" for="theCard"
                >{{ $t('klb_order_payment_card_label') }}
              </label>
              <div class="input-box">
                <div id="theCard" class="theCard" ref="theCard"></div>
              </div>
            </div>
            <button
              @click="activatePM('OnFile')"
              type="button"
              class="klb-switch-method"
              v-if="process.methods_order.includes('OnFile')"
            >
              {{ $t('klb_order_option_on_file') }}
            </button>
            <div class="klb-order-button">
              <button class="btn primary btn-defaults">
                {{ $t('klb_order_process_cta') }}
              </button>
            </div>
          </template>
          <template v-if="currentMethod == 'Free'">
            <div class="klb-order-button">
              <button class="btn primary btn-defaults">
                {{ $t('klb_order_process_cta') }}
              </button>
            </div>
          </template>
          <template v-if="currentMethod == 'OnFile'">
            <FyInput
              id="selectLocation"
              :options="onFileSelectOptions"
              type="select"
              v-model="selectedOnFile"
            />
            <button
              @click="activatePM('Stripe')"
              type="button"
              class="klb-switch-method"
              v-if="process.methods_order.includes('Stripe')"
            >
              {{ $t('klb_order_option_stripe') }}
            </button>
            <div class="klb-order-button">
              <button class="btn primary btn-defaults big">
                {{ $t('klb_order_process_cta') }}
              </button>
            </div>
          </template>
        </template>
      </form>
      <template v-if="process.order.Status == 'completed'">
        {{
          $t('klb_order_paid_text', {
            date: process.order.Paid
              ? $formatDatetime(process.order.Paid.iso)
              : '',
          })
        }}
      </template>
    </template>
  </div>
</template>

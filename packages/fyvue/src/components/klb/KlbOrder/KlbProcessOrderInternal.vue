<script setup lang="ts">
import {
  ref,
  onMounted,
  reactive,
  watch,
  computed,
  onUnmounted,
  WatchStopHandle,
} from 'vue';
import { useFyHead } from '@fy/head';
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
import FyInput from '../../ui/FyInput/FyInput.vue';
import { getPath, getUrl } from '@karpeleslab/klbfw';
import { useHistory } from '../../../utils/ssr';
import { rest } from '../../../utils/rest';
let stripe: any;
let stripeElements: any;

useFyHead().addScript('https://js.stripe.com/v3', 'stripe-script');

const currentMethod = ref<string>();
const stripeElementsRef = ref();
const history = useHistory();
const eventBus = useEventBus();
const store = useFVStore();
const props = withDefaults(
  defineProps<{
    orderUuid: string;
  }>(),
  {}
);
const session = ref<string>();
const errorMessage = ref<string>();
const order = ref<KlbOrder>();
const formData = reactive({} as ObjectS2Any);
const process = ref<KlbOrderProcess>();
const onFileSelectOptions = ref<Array<string[]>>([]);
const selectedOnFile = ref<string>();
const isAuth = computed(() => store.isAuth);
const internalWatcher = ref<WatchStopHandle>();

const processOrder = async () => {
  eventBus.emit('klb-order-loading', true);
  errorMessage.value = undefined;
  if (currentMethod.value == 'Stripe' && process.value) {
    const _stripeResult = await stripe.confirmPayment({
      elements: stripeElements,
      confirmParams: {
        return_url: `${getUrl().scheme}://${getUrl().host}${
          history.currentRoute.path
        }?Order__=${props.orderUuid}&session=${session.value}`,
        //setup_future_usage: formData.cc_remember == '1' ? 'off_session' : undefined,
        payment_method_data: {
          billing_details: {
            name: `${process.value.order.Billing_User_Location.First_Name} ${process.value.order.Billing_User_Location.Last_Name}`,
            email: store.user?.Email,
            address: {
              country: process.value.order.Billing_User_Location.Country__,
              postal_code: process.value.order.Billing_User_Location.Zip,
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
  } else if (currentMethod.value == 'Free') {
    const data = { ...formData };
    data.session = session.value;
    data.method = currentMethod.value;
    const _process = await useOrder()
      .process(data, props.orderUuid)
      .catch((err) => {
        errorMessage.value = err.message;
      });

    if (!errorMessage.value) await getOrderProcess(_process);
    else await getOrderProcess();
  } else if (currentMethod.value == 'OnFile') {
    const data = { ...formData };
    data.session = session.value;
    data.method = currentMethod.value;
    data.user_billing = selectedOnFile.value;
    const _process = await useOrder()
      .process(data, props.orderUuid)
      .catch((err) => {
        errorMessage.value = err.message;
      });

    if (!errorMessage.value) await getOrderProcess(_process);
    else await getOrderProcess();
  }
  eventBus.emit('klb-order-loading', false);
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
        await stripeElementsRef.value;
        if (
          process.value.methods[method].fields.stripe_intent?.attributes
            ?.client_secret
        ) {
          stripeElements = stripe.elements({
            clientSecret:
              process.value.methods[method].fields.stripe_intent?.attributes
                ?.client_secret,
          });

          if (stripeElementsRef.value) {
            /*stripeElements = stripeElements.create('card', {
              hidePostalCode: true,
            });
            stripeElements.mount(stripeElementsRef.value);*/
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
              .mount(stripeElementsRef.value);
          }
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
    /*
    if (method) {
      for (const [k, v] of Object.entries(
        process.value.methods[method].fields
      )) {
        if (k != 'user_billing' && v) {
          if (v.attributes) {
            formData[k] = v.attributes.value
              ? v.attributes.value.toString()
              : null;
          }
        }
      }
    }
    */
  }
  eventBus.emit('klb-order-loading', false);
};
const getOrderProcess = async (
  __process: void | KlbAPIOrderProcess = undefined
) => {
  eventBus.emit('klb-order-loading', true);
  let processParams: null | { stripe_intent: number } = null;
  if (useHistory().currentRoute.query.payment_intent) {
    processParams = { stripe_intent: 1 };
  }
  const _process = __process
    ? __process
    : await useOrder()
        .process(processParams, props.orderUuid)
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
      await activatePM(currentMethod.value);
    }
  }
  eventBus.emit('klb-order-loading', false);
};
onMounted(async () => {
  internalWatcher.value = watch(formData, async (v) => {
    if (v.cc_remember) {
      if (isAuth.value && currentMethod.value) {
        if (
          (order.value?.Flags.autorenew_record == true &&
            v.cc_remember == '0') ||
          ((!order.value?.Flags.autorenew_record ||
            order.value?.Flags.autorenew_record == false) &&
            v.cc_remember == '1')
        ) {
          const _process = await useOrder().process(
            {
              cc_remember: v.cc_remember,
              session: session.value,
              method: currentMethod.value,
              stripe_intent: 1,
            },
            props.orderUuid
          );
          if (_process && _process.result == 'success') {
            process.value = _process.data;
            order.value = process.value.order;
            session.value = process.value.methods[currentMethod.value].session;
          }
        }
      }
    }
  });
  if (
    history.currentRoute.query.payment_intent &&
    history.currentRoute.query.payment_intent_client_secret &&
    history.currentRoute.query.session
  ) {
    const _process = await useOrder()
      .process(
        {
          session: history.currentRoute.query.session,
          stripe_intent: 1,
          method: 'Stripe',
        },
        props.orderUuid
      )
      .catch((err) => {
        errorMessage.value = err.message;
      });

    if (!errorMessage.value) await getOrderProcess(_process);
    else await getOrderProcess();
    await store.refreshCart();
    history.push(`${getPath()}?Order__=${props.orderUuid}`);
  } else {
    await getOrderProcess();
  }
});
onUnmounted(() => {
  if (internalWatcher.value) internalWatcher.value();
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
              <label class="label-basic" for="stripeElementsRef"
                >{{ $t('klb_order_payment_card_label') }}
              </label>
              <div
                id="stripeElementsRef"
                class="stripeElements"
                ref="stripeElementsRef"
              ></div>
            </div>
          </template>
          <template v-if="currentMethod == 'Free'"> </template>
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
          </template>
          <template v-if="currentMethod">
            <div
              v-for="(field, key) in process.methods[currentMethod].fields"
              v-bind:key="`field_method_${key}`"
            >
              <template
                v-if="
                  (field.type == 'input' ||
                    field.type == 'password' ||
                    field.type == 'email' ||
                    field.type == 'checkbox') &&
                  field.caption
                "
              >
                <FyInput
                  :placeholder="$t(field.caption)"
                  :type="field.type"
                  :label="$t(field.caption)"
                  v-model:checkboxValue="formData[key]"
                  :id="`form_${key}`"
                  checkboxTrueValue="1"
                  checkboxFalseValue="0"
                  v-if="field.type == 'checkbox'"
                >
                </FyInput>
                <FyInput
                  :placeholder="$t(field.caption)"
                  :type="field.type"
                  :label="$t(field.caption)"
                  v-model="formData[key]"
                  :id="`form_${key}`"
                  v-else
                >
                </FyInput>
              </template>
            </div>
          </template>
          <div v-if="errorMessage" class="response-error">
            {{ errorMessage }}
          </div>
          <div class="klb-order-button">
            <button class="btn primary btn-defaults">
              {{ $t('klb_order_process_cta') }}
            </button>
          </div>
        </template>
      </form>
      <template v-if="process.order_payable == false">
        <template v-if="process.order.Paid">
          {{
            $t('klb_order_paid_text', {
              date: $formatDatetime(process.order.Paid.unixms),
            })
          }}
        </template>
        <template v-else>
          {{ $t('klb_order_non_payable') }}
        </template>
      </template>
    </template>
  </div>
</template>

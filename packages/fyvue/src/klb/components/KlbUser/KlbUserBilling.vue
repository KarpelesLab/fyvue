<script setup lang="ts">
import {
  ref,
  onMounted,
  computed,
  reactive,
  watch,
  WatchStopHandle,
  onUnmounted,
} from 'vue';
import { useFVStore } from '../../helpers/store';
import { rest } from '../../helpers/rest';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useBilling } from '../KlbBilling/useBilling';
import { getLocale, getUrl, getPath } from '@karpeleslab/klbfw';
import KlbAddPaymentMethodModal from '../KlbBilling/KlbAddPaymentMethodModal.vue';
import KlbUserLocation from './KlbUserLocation.vue';
import type {
  KlbAPIUserBilling,
  KlbUserBilling,
  KlbAPISetupIntent,
  KlbAPIUserLocation,
} from '../../KlbApiTypes';
import { useFyHead } from '@fy-/head';
import { useEventBus } from '@fy-/core';
import { useHistory } from '../../helpers/ssr';
const props = withDefaults(
  defineProps<{
    displayOnly?: boolean;
    locationUuid?: string;
    modelValue?: string;
  }>(),
  {
    displayOnly: false,
  }
);
interface KlbBillingProfileByUuid {
  [key: string]: KlbUserBilling;
}

const eventBus = useEventBus();
const store = useFVStore();
const history = useHistory();
const isAuth = computed(() => store.isAuth);
const billingProfile = ref<KlbUserBilling>();
const billingProfileSelectOptions = ref<Array<string[]>>([]);
const billingProfiles = ref<KlbBillingProfileByUuid>({});
const isLoaded = ref<boolean>(false);
const editMode = ref<boolean>(false);
const selectedBillingProfile = ref<string>();
const emit = defineEmits(['update:modelValue']);
const stripeCard = ref();
const theCard = ref();
const errorMessage = ref<string>();
const billingEmpty = ref<boolean>();
let stripe: any;
let stripeElements: any;
const paymentSetupIntent = ref<KlbAPISetupIntent>();
const stripePayment = ref();
const billingWatcher = ref<WatchStopHandle>();

const model = computed({
  get: () => props.modelValue,
  set: (items) => {
    emit('update:modelValue', items);
  },
});

const state = reactive({
  billingProfile: {
    label: '',
    location: '',
  },
});
const rules = {
  billingProfile: {
    label: { required },
    location: { required },
  },
};
const v$ = useVuelidate(rules, state);

const submitBillingEdit = async () => {
  eventBus.emit('modal-edit-pm-loading', true);
  errorMessage.value = undefined;
  const _userLocation = await rest<KlbAPIUserLocation>(
    `User/Location/${billingProfile.value?.User_Location__}`,
    'GET'
  ).catch(() => {});
  if (
    _userLocation &&
    _userLocation.result == 'success' &&
    _userLocation.data
  ) {
    const _stripeResult = await stripe.confirmSetup({
      elements: stripeElements,
      confirmParams: {
        return_url: `${getUrl().scheme}://${getUrl().host}${
          history.currentRoute.path
        }?editMode=1&editUuid=${
          billingProfile.value?.Methods[0].User_Billing_Method__
        }&billingProfile=${billingProfile.value?.User_Billing__}`,
        payment_method_data: {
          billing_details: {
            name: `${_userLocation.data.First_Name} ${_userLocation.data.Last_Name}`,
            email: store.user?.Email,
            address: {
              country: _userLocation.data.Country__,
              postal_code: _userLocation.data.Country__,
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
      eventBus.emit('modal-edit-pm-loading', false);
    }
    eventBus.emit('EditPaymentMethodModal', false);
    eventBus.emit('modal-edit-pm-loading', false);
  }
};
const submitUserBilling = async () => {
  errorMessage.value = undefined;
  if ((await v$.value.billingProfile.$validate()) && billingProfile.value) {
    await rest(`User/Billing/${billingProfile.value.User_Billing__}`, 'PATCH', {
      User_Location__: state.billingProfile.location,
      Label: state.billingProfile.label,
    }).catch(() => {});
    await getUserBilling();
    isLoaded.value = true;
    editMode.value = false;
  }
};
const getUserBilling = async () => {
  isLoaded.value = false;
  if (isAuth.value) {
    const _billingProfiles = await rest<KlbAPIUserBilling>(
      `User/Billing`,
      'GET',
      {
        sort: 'Created',
      }
    ).catch(() => {});
    if (_billingProfiles && _billingProfiles.result == 'success') {
      if (_billingProfiles.data.length > 0) {
        billingProfile.value = _billingProfiles.data[0];
        selectedBillingProfile.value = _billingProfiles.data[0].User_Billing__;
        billingProfileSelectOptions.value = [];
        billingProfiles.value = {};
        _billingProfiles.data.forEach((_profile) => {
          billingProfiles.value[_profile.User_Billing__] = _profile;
          billingProfileSelectOptions.value.push([
            _profile.User_Billing__,
            _profile.Label,
          ]);
        });

        editMode.value = false;
        billingEmpty.value = false;
      } else {
        billingProfileSelectOptions.value = [];
        billingProfiles.value = {};
        editMode.value = false;
        billingEmpty.value = true;
      }
    }
  }
  isLoaded.value = true;
};
const switchToEdit = async () => {
  editMode.value = true;
  if (stripe) {
    stripeCard.value = stripe
      .elements()
      .create('card', { hidePostalCode: true });
    await theCard;
    stripeCard.value.mount(theCard.value);
  }
};

const openEditModal = async () => {
  eventBus.emit('EditPaymentMethodModal', true);
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
  if (isAuth.value) {
    billingWatcher.value = watch(selectedBillingProfile, (v) => {
      if (v == 'new') {
        state.billingProfile.label = '';
        state.billingProfile.location = '';

        editMode.value = true;
        billingProfile.value = undefined;
        model.value = undefined;
      } else {
        if (v && billingProfiles.value[v]) {
          billingProfile.value = billingProfiles.value[v];
          state.billingProfile.label = billingProfile.value.Label;
          state.billingProfile.location = billingProfile.value.User_Location__;
          model.value = billingProfile.value.User_Billing__;
        }
      }
    });
    await getUserBilling();
    if (
      history.currentRoute.query.setup_intent &&
      history.currentRoute.query.setup_intent_client_secret &&
      history.currentRoute.query.editMode == '1' &&
      history.currentRoute.query.editUuid &&
      history.currentRoute.query.billingProfile
    ) {
      await rest(
        `User/Billing/Method/${history.currentRoute.query.editUuid}:change`,
        'POST',
        {
          method: 'Stripe',
          stripe_intent: history.currentRoute.query.setup_intent,
        }
      ).catch(() => {});
      await getUserBilling();
      history.push(
        `${getPath()}?billingProfile=${
          history.currentRoute.query.billingProfile
        }`
      );
    }
    if (history.currentRoute.query.billingProfile) {
      selectedBillingProfile.value = history.currentRoute.query.billingProfile;
      editMode.value = true;
    }
  }
});
onUnmounted(() => {
  if (billingWatcher.value) billingWatcher.value();
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
  <div
    v-if="isAuth && isLoaded"
    class="card-container card-defaults klb-user-billing"
  >
    <FyModal
      id="EditPaymentMethod"
      :title="$t('edit_pm_modal_title')"
      class="klb-edit-method"
    >
      <FyLoader id="modal-edit-pm" size="6" :showLoadingText="false" />
      <form @submit.prevent="submitBillingEdit">
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
            {{ $t('edit_billing_method') }}
          </button>
        </div>
      </form>
    </FyModal>

    <KlbAddPaymentMethodModal
      :onComplete="
        () => {
          getUserBilling();
        }
      "
    />
    <div class="billing-select">
      <FyInput
        id="selectBillingProfile"
        :options="billingProfileSelectOptions"
        type="select"
        v-model="selectedBillingProfile"
        v-if="!billingEmpty"
      />
      <button
        class="btn primary btn-defaults"
        v-if="editMode == false && !billingEmpty"
        @click="switchToEdit()"
      >
        {{ $t('klb_edit_billing_profile') }}
      </button>
      <button
        class="btn-defaults btn neutral"
        type="reset"
        @click="editMode = false"
        v-if="editMode == true"
      >
        {{ $t('klb_billing_cancel_save_payment_method') }}
      </button>

      <button
        class="btn-defaults btn primary"
        v-if="editMode == false"
        @click="$eventBus.emit('ShowAddPaymentMethodModal', true)"
      >
        {{ $t('klb_add_new_billing_profile') }}
      </button>
    </div>
    <div v-if="editMode">
      <div>
        <form @submit.prevent="submitUserBilling">
          <FyInput
            id="billingLabel"
            :req="true"
            :showLabel="true"
            :placeholder="$t('add_pm_label_placeholder')"
            :errorVuelidate="v$.billingProfile.label.$errors"
            v-model="state.billingProfile.label"
            :label="$t('add_pm_label_label')"
            type="text"
          ></FyInput>
          <div class="fui-input">
            <label class="fui-input__label" for="theCard"
              >{{ $t('klb_billing_payment_method_label') }}
            </label>
            <div
              class="card-container billing-method-summary"
              v-if="
                billingProfile &&
                billingProfile.Methods &&
                billingProfile.Methods.length > 0
              "
            >
              <span
                ><b>{{ $t('klb_billing_current_credit_card') }}</b>
                {{ $t('payment_method_billing') }}:
                <b>{{ billingProfile.Methods[0].Name }}</b></span
              ><span>
                {{ $t('payment_method_exp') }}:
                <b>{{ billingProfile.Methods[0].Expiration }}</b>
              </span>
              <div>
                <button
                  class="btn primary btn-defaults"
                  type="button"
                  @click="openEditModal()"
                >
                  {{ $t('klb_billing_edit_pm_cta') }}
                </button>
              </div>
            </div>
          </div>
          <KlbUserLocation
            :displayOnly="true"
            :selectedLocation="state.billingProfile.location"
            v-model="state.billingProfile.location"
          />
          <div
            v-if="v$.billingProfile.location.$errors.length > 0"
            class="response-error"
          >
            {{
              $t(
                `vuelidate_validator_${v$.billingProfile.location.$errors[0].$validator.toString()}`
              )
            }}
          </div>
          <br />
          <div class="btn-box">
            <button class="btn-defaults btn primary" type="submit">
              {{ $t('klb_billing_save_payment_method') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="self-loader-fyvue" v-if="!isLoaded && isAuth">
    <FyLoader
      id="self-loader-fyvue"
      :force="true"
      size="6"
      :showLoadingText="false"
    />
  </div>
</template>

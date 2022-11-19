<script setup lang="ts">
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { useFVStore } from '../../../utils/store';
import { rest } from '../../../utils/rest';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
import { useBilling } from '../KlbBilling/useBilling';
import { getLocale } from '@karpeleslab/klbfw';
import KlbAddPaymentMethodModal from '../KlbBilling/KlbAddPaymentMethodModal.vue';
import KlbUserLocation from './KlbUserLocation.vue';
import type {
  KlbAPIUserBilling,
  KlbUserBilling,
  KlbAPIResultUnknown,
} from '../../../dts/klb';
import { useEventBus } from '../../../utils/helpers';
import { useHead } from '@vueuse/head';

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

const store = useFVStore();
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

const model = computed({
  get: () => props.modelValue,
  set: (items) => {
    emit('update:modelValue', items);
  },
});

watch(selectedBillingProfile, (v) => {
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

const submitUserBilling = async () => {
  errorMessage.value = undefined;
  if ((await v$.value.billingProfile.$validate()) && billingProfile.value) {
    const cardToken = await stripe.createToken(stripeCard.value, {
      name: `${billingProfile.value.Label}`,
      email: store.user?.Email,
    });
    isLoaded.value = false;
    if (!cardToken.error) {
      const _updateBillingResult = await rest(
        `User/Billing/Method/${billingProfile.value?.Methods[0].User_Billing_Method__}:change`,
        'POST',
        {
          method: 'Stripe',
          cc_token: cardToken.token.id,
        }
      ).catch(() => {});
    }
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

const getPaymentMethods = async () => {
  /*
  const _pms = await rest<KlbAPIResultUnknown>(
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
  }*/
};

onMounted(async () => {
  if (isAuth.value) {
    await getPaymentMethods();
    await getUserBilling();
  }
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
  <div
    v-if="isAuth && isLoaded"
    class="card-container card-defaults klb-user-billing"
  >
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
      <!--<button
        class="btn danger btn-defaults"
        v-if="
          editMode == true && billingProfile && selectedBillingProfile != 'new'
        "
        @click="deleteLocation()"
      >
        {{ $t('klb_delete_location') }}
      </button>-->
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
          <div class="input-group">
            <label class="label-basic" for="theCard"
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
              <b>{{ $t('klb_billing_current_credit_card') }}</b>
              {{ $t('payment_method_billing') }}:
              <b>{{ billingProfile.Methods[0].Name }}</b
              >, {{ $t('payment_method_exp') }}:
              <b>{{ billingProfile.Methods[0].Expiration }}</b>
            </div>
            <div class="input-box">
              <div id="theCard" class="theCard" ref="theCard"></div>
            </div>
            <div class="help-text">
              {{ $t('klb_billing_credit_card_edit_help') }}
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

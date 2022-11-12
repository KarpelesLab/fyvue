<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue';
import { useFVStore } from '../../../utils/store';
import { rest } from '../../../utils/rest';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
import type {
  KLBApiResult,
  KlbUserBilling,
  KlbUserLocation,
  KlbUserBillingResult,
  KlbUserLocationResult,
} from '../../../dts/klb';

const store = useFVStore();
const isAuth = computed(() => store.isAuth);
const billing = ref<KlbUserBilling>();
const location = ref<KlbUserLocation>();
const hasBilling = ref<boolean>(false);
const isLoaded = ref<boolean>(false);

const state = reactive({
  firstname: '',
  lastname: '',
  country: '',
  zip: '',
});
const rules = {
  firstname: { required },
  lastname: { required },
  country: { required },
  zip: { required },
};
const v$ = useVuelidate(rules, state);
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
          state.firstname = location.value.First_Name;
          state.lastname = location.value.Last_Name;
          state.zip = location.value.Zip;
          state.country = location.value.Country__;
        }
        billing.value = _userBilling.data[0];
      }
    }
    isLoaded.value = true;
  }
};
const submitEditBillingAddress = async () => {
  const _updateLocation = await rest<KlbUserLocationResult>(
    `User/Location/${billing.value?.User_Location__}`,
    'PATCH',
    {
      First_Name: state.firstname,
      Last_Name: state.lastname,
      Zip: state.zip,
      Country__: state.country,
    }
  ).catch(() => {});

  if (_updateLocation && _updateLocation.result == 'success') {
    const _updateBilling = await rest(
      `User/Billing/${billing.value?.User_Billing__}`,
      'PATCH',
      {
        User_Location__: _updateLocation.data.User_Location__,
        Label: billing.value?.Label,
      }
    );

    await getUserBilling();
  }
};

onMounted(async () => {
  await getUserBilling();
});
</script>
<template>
  <div v-if="isAuth">
    <form
      @submit.prevent="submitEditBillingAddress"
      class="klb-update-billing-loc"
      v-if="hasBilling"
    >
      <div class="form-grid">
        <FyInput
          id="billingFirstname"
          :req="true"
          :showLabel="true"
          type="text"
          :placeholder="$t('billing_location_firstname_placeholder')"
          :errorVuelidate="v$.firstname.$errors"
          v-model="state.firstname"
          :label="$t('billing_location_firstname_label')"
        ></FyInput>
        <FyInput
          id="billingLastname"
          :req="true"
          type="text"
          :showLabel="true"
          :placeholder="$t('billing_location_lastname_placeholder')"
          :errorVuelidate="v$.lastname.$errors"
          v-model="state.lastname"
          :label="$t('billing_location_lastname_label')"
        ></FyInput>
        <FyInput
          id="billingZip"
          :req="true"
          type="text"
          :showLabel="true"
          :placeholder="$t('billing_location_zip_placeholder')"
          :errorVuelidate="v$.zip.$errors"
          v-model="state.zip"
          :label="$t('billing_location_zip_label')"
        ></FyInput>
        <div class="input-group">
          <div class="mr-4 w-16">
            <label class="label-basic" for="typeDef"
              >{{ $t('billing_location_country_label') }}
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
      <button
        class="block font-extrabold mx-auto p-2 mt-4 btn primary"
        type="submit"
      >
        {{ $t('save_billing_location') }}
      </button>
    </form>
    <div v-else>
      {{ $t('no_billing_location_yet') }}
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
</template>

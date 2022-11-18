<script setup lang="ts">
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { useFVStore } from '../../../utils/store';
import { rest } from '../../../utils/rest';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
import { useBilling } from '../KlbBilling/useBilling';
import type {
  KlbAPIUserLocations,
  KlbUserLocation,
  KlbAPIUserLocation,
} from '../../../dts/klb';
import { useEventBus } from '../../../utils/helpers';

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
interface KlbLocationsByUuid {
  [key: string]: KlbUserLocation;
}
const store = useFVStore();
const isAuth = computed(() => store.isAuth);
const location = ref<KlbUserLocation>();
const locationsSelectOptions = ref<Array<string[]>>([]);
const locations = ref<KlbLocationsByUuid>({});
const isLoaded = ref<boolean>(false);
const editMode = ref<boolean>(false);
const selectedLocation = ref<string>();
const emit = defineEmits(['update:modelValue']);
const model = computed({
  get: () => props.modelValue,
  set: (items) => {
    emit('update:modelValue', items);
  },
});
watch(selectedLocation, (v) => {
  if (v == 'new') {
    state.firstname = '';
    state.lastname = '';
    state.zip = '';
    state.country = '';
    editMode.value = true;
    location.value = undefined;
    model.value = undefined;
  } else {
    if (v && locations.value[v]) {
      location.value = locations.value[v];
      state.firstname = location.value.First_Name;
      state.lastname = location.value.Last_Name;
      state.zip = location.value.Zip ? location.value.Zip : '';
      state.country = location.value.Country__;
      model.value = location.value.User_Location__;
    }
  }
});

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

const deleteLocation = async () => {
  await rest<KlbAPIUserLocation>(
    `User/Location/${location.value?.User_Location__}`,
    'DELETE',
    {}
  ).catch(() => {});
  await getUserLocation();
};
const submitLocation = async () => {
  if (location.value) {
    const _updateLocation = await rest<KlbAPIUserLocation>(
      `User/Location/${location.value?.User_Location__}`,
      'PATCH',
      {
        First_Name: state.firstname,
        Last_Name: state.lastname,
        Zip: state.zip,
        Country__: state.country,
      }
    ).catch(() => {});
    editMode.value = false;
    await getUserLocation();
  } else {
    const _updateLocation = await rest<KlbAPIUserLocation>(
      `User/Location`,
      'POST',
      {
        First_Name: state.firstname,
        Last_Name: state.lastname,
        Zip: state.zip,
        Country__: state.country,
      }
    ).catch(() => {});
    editMode.value = false;
    await getUserLocation();
  }
};
const getUserLocation = async () => {
  state.country = '';
  state.firstname = '';
  state.lastname = '';
  state.zip = '';
  if (isAuth.value) {
    const _locations = await rest<KlbAPIUserLocations>(`User/Location`, 'GET', {
      sort: 'Created',
    }).catch(() => {});
    if (_locations && _locations.result == 'success') {
      if (_locations.data.length > 0) {
        location.value = _locations.data[0];
        selectedLocation.value = location.value.User_Location__;
        locationsSelectOptions.value = [];
        _locations.data.forEach((loc) => {
          locations.value[loc.User_Location__] = loc;
          locationsSelectOptions.value.push([
            loc.User_Location__,
            loc.Display.join(', '),
          ]);
        });
        locationsSelectOptions.value.push(['new', 'New']);

        editMode.value = false;
      } else {
        locationsSelectOptions.value = [];
        locationsSelectOptions.value.push(['new', 'New']);
        selectedLocation.value = 'new';
        editMode.value = true;
      }
    }
  }
  isLoaded.value = true;
};

onMounted(async () => {
  if (isAuth.value) {
    await getUserLocation();
  }
});
</script>
<template>
  <div
    v-if="isAuth && isLoaded"
    class="klb-update-billing-loc klb-user-location"
  >
    <div class="location-select">
      <FyInput
        id="selectLocation"
        :options="locationsSelectOptions"
        type="select"
        v-model="selectedLocation"
      />
      <button
        class="btn primary btn-defaults"
        v-if="editMode == false"
        @click="editMode = true"
      >
        {{ $t('klb_edit_location') }}
      </button>
      <button
        class="btn danger btn-defaults"
        v-if="editMode == true && location && selectedLocation != 'new'"
        @click="deleteLocation()"
      >
        {{ $t('klb_delete_location') }}
      </button>
      <button
        class="btn-defaults btn neutral"
        type="reset"
        @click="editMode = false"
        v-if="editMode == true"
      >
        {{ $t('klb_locations_reset_cta') }}
      </button>
    </div>
    <div v-if="editMode">
      <div>
        <form @submit.prevent="submitLocation">
          <div class="form-grid">
            <FyInput
              id="billingFirstname"
              :req="true"
              :showLabel="true"
              type="text"
              :placeholder="$t('klb_location_firstname_placeholder')"
              :errorVuelidate="v$.firstname.$errors"
              v-model="state.firstname"
              :label="$t('klb_location_firstname_label')"
            ></FyInput>
            <FyInput
              id="billingLastname"
              :req="true"
              type="text"
              :showLabel="true"
              :placeholder="$t('klb_location_lastname_placeholder')"
              :errorVuelidate="v$.lastname.$errors"
              v-model="state.lastname"
              :label="$t('klb_location_lastname_label')"
            ></FyInput>
            <FyInput
              id="billingZip"
              :req="true"
              type="text"
              :showLabel="true"
              :placeholder="$t('klb_location_zip_placeholder')"
              :errorVuelidate="v$.zip.$errors"
              v-model="state.zip"
              :label="$t('klb_location_zip_label')"
            ></FyInput>
            <div class="input-group">
              <div class="mr-4 w-16">
                <label class="label-basic" for="countryChoice"
                  >{{ $t('klb_location_country_label') }}
                </label>
              </div>
              <div class="input-box">
                <select
                  class="input-basic"
                  id="countryChoice"
                  v-model="state.country"
                >
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
          <div class="btn-box">
            <button class="btn-defaults btn primary" type="submit">
              {{ $t('klb_locations_save_cta') }}
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

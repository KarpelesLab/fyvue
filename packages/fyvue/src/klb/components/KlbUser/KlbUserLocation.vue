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
import {
  KlbAPIUserLocations,
  KlbUserLocation,
  KlbAPIUserLocation,
  KlbAPIResultUnknown,
} from '../../KlbApiTypes';
import { useTranslation } from '@fy-/core';

const props = withDefaults(
  defineProps<{
    displayOnly?: boolean;
    locationUuid?: string;
    modelValue?: string;
    selectedLocation?: string;
  }>(),
  {
    displayOnly: false,
    selectedLocation: undefined,
  }
);
interface KlbLocationsByUuid {
  [key: string]: KlbUserLocation;
}
const store = useFVStore();
const translate = useTranslation();
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
const locationWatcher = ref<WatchStopHandle>();

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

const getUserGeolocation = async () => {
  const _userLoc = await rest<KlbAPIResultUnknown>(
    'ThirdParty/Geoip:lookup',
    'GET'
  ).catch(() => {});
  if (_userLoc && _userLoc.result == 'success') {
    state.country = _userLoc.data.country.iso_code;
  }
};
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
    await rest<KlbAPIUserLocation>(
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
    await rest<KlbAPIUserLocation>(`User/Location`, 'POST', {
      First_Name: state.firstname,
      Last_Name: state.lastname,
      Zip: state.zip,
      Country__: state.country,
    }).catch(() => {});
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
        if (props.selectedLocation) {
          selectedLocation.value = props.selectedLocation;
        } else {
          selectedLocation.value = _locations.data[0].User_Location__;
        }

        locationsSelectOptions.value = [];
        locations.value = {};
        _locations.data.forEach((loc) => {
          locations.value[loc.User_Location__] = loc;
          locationsSelectOptions.value.push([
            loc.User_Location__,
            loc.Display.join(', '),
          ]);
        });
        if (!props.displayOnly)
          locationsSelectOptions.value.push([
            'new',
            translate('klb_location_new_cta'),
          ]);

        editMode.value = false;
      } else {
        locations.value = {};
        locationsSelectOptions.value = [];
        if (!props.displayOnly) {
          locationsSelectOptions.value.push(['new', 'New']);
          selectedLocation.value = 'new';
        }
        editMode.value = true;
        if (!state.country) {
          await getUserGeolocation();
        }
      }
    }
  }
  isLoaded.value = true;
};

onMounted(async () => {
  if (isAuth.value) {
    locationWatcher.value = watch(selectedLocation, async (v) => {
      if (v == 'new') {
        state.firstname = '';
        state.lastname = '';
        state.zip = '';
        state.country = '';
        editMode.value = true;
        location.value = undefined;
        model.value = undefined;
        await getUserGeolocation();
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
    await getUserLocation();
  }
});
onUnmounted(() => {
  if (locationWatcher.value) locationWatcher.value();
});
</script>
<template>
  <div
    v-if="isAuth && isLoaded"
    :class="displayOnly ? '' : 'card-container card-defaults klb-user-location'"
  >
    <div class="location-select">
      <FyInput
        id="selectLocation"
        :options="locationsSelectOptions"
        type="select"
        v-model="selectedLocation"
      />
      <template v-if="!displayOnly">
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
        <button
          class="btn-defaults btn primary"
          type="reset"
          @click="selectedLocation = 'new'"
          v-if="
            async () => {
              editMode == false;
              await getUserGeolocation();
            }
          "
        >
          {{ $t('klb_location_new_cta') }}
        </button>
      </template>
    </div>
    <div v-if="editMode" class="location-display">
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
            <div class="fui-input">
              <div class="mr-4 w-16">
                <label class="fui-input__label" for="countryChoice"
                  >{{ $t('klb_location_country_label') }}
                </label>
              </div>
              <div class="fui-input__box">
                <select
                  class="fui-input__input"
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
          <br />
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

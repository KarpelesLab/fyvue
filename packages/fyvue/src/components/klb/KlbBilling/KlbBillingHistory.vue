<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ArrowDownTrayIcon } from '@heroicons/vue/24/solid';
import { useFVStore } from '../../../utils/store';
import { rest } from '../../../utils/rest';
import FyPaging from '../../ui/FyPaging/FyPaging.vue';
import FyTable from '../../ui/FyTable/FyTable.vue';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';

import type { KlbBillingHistoryResult } from '../../../dts/klb';

const store = useFVStore();
const isAuth = computed(() => store.isAuth);
const billingHistory = ref<KlbBillingHistoryResult>();
const getPaymentHistory = async (page = 1) => {
  const _billingHistory = await rest<KlbBillingHistoryResult>('Order', 'GET', {
    page_no: page,
    results_per_page: 10,
    Status: 'completed',
  }).catch(() => {});
  if (_billingHistory && _billingHistory.result == 'success') {
    billingHistory.value = _billingHistory;
  }
};
onMounted(async () => {
  if (isAuth.value) {
    await getPaymentHistory();
  }
});
</script>

<template>
  <div class="klb-billing-history">
    <template v-if="billingHistory">
      <FyPaging
        id="billingHistory"
        :items="billingHistory.paging"
        v-if="billingHistory.paging && billingHistory.paging.page_no"
        class="billing-history-paging"
      />
      <FyTable
        :data="billingHistory.data"
        :headers="{
          Invoice_Number: $t('billing_history_headers_invoice_number'),
          Invoice_Date: $t('billing_history_headers_created'),
          Paid: $t('billing_history_headers_paid'),
          Status: $t('billing_history_headers_status'),
          Total: $t('billing_history_headers_price'),
          Actions: $t('billing_history_headers_actions'),
        }"
      >
        <template v-slot:Actions_item="property">
          <a
            :href="property.data.item.Invoice_Url"
            target="_blank"
            class="btn neutral download-btn"
            v-if="property.data.item.Invoice_Url"
          >
            <ArrowDownTrayIcon stroke="currentColor" class="download-icon" />
            {{ $t('billing_history_download_cta') }}
          </a>
        </template>
        <template v-slot:Total_item="property">
          <span class="billing-history-tag">{{
            property.data.item.Total.display
          }}</span>
        </template>
        <template v-slot:Status_item="property">
          <span class="billing-history-tag">{{
            property.data.item.Status
          }}</span>
        </template>
        <template v-slot:Invoice_Date_item="property">
          {{
            $t('global_datetime', {
              val: new Date(property.data.item.Invoice_Date.iso),
              formatParams: {
                val: {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                },
              },
            })
          }}
        </template>
        <template v-slot:Paid_item="property">
          {{
            $t('global_datetime', {
              val: new Date(property.data.item.Paid.iso),
              formatParams: {
                val: {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                },
              },
            })
          }}
        </template>
      </FyTable>
      <FyPaging
        id="billingHistory"
        :items="billingHistory.paging"
        v-if="billingHistory.paging && billingHistory.paging.page_no"
        class="billing-history-paging"
      />
    </template>
    <div class="self-loader-fyvue" v-else>
      <FyLoader
        id="self-loader-fyvue"
        :force="true"
        size="6"
        :showLoadingText="false"
      />
    </div>
    <div
      v-if="billingHistory && billingHistory.data?.length == 0"
      class="no-billing-history"
    >
      {{ $t('billing_history_empty') }}
    </div>
  </div>
</template>

<template>
  <q-header reveal elevated>
    <q-toolbar>
      <q-separator dark vertical inset class="lt-md" />
      <q-toolbar-title style="min-width: 240px">
        <span class="page-title">
          <q-btn
            icon="unfold_more"
            disable
            class="q-pa-none"
            size="sm"
            style="opacity: 0.5 !important"
          ></q-btn>
          Main Portfolio
        </span>
      </q-toolbar-title>

      <q-space />

      <address-filter-dialog :open-dialog="openDialog" :show-chip="true" />
    </q-toolbar>
  </q-header>

  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="transactions" class="tab--mobile-table">
            <transactions-table
              v-if="accountStore.addressesFilter.length > 0"
              :addresses="accountStore.addressesFilter"
              :mobile="true"
            />
          </q-tab-panel>

          <q-tab-panel name="rewards" class="tab--mobile-table">
            <token-holder-balances-metric
              v-if="
                accountStore.addressesFilter.length > 0 &&
                blockProductionStore.blockProducers &&
                blockProductionStore.blockProducers.length > 0
              "
              title="Total Rewards"
              :token-holders="blockProducers"
              :tooltip-hide-delay="3000"
            />

            <block-rewards-table
              v-if="accountStore.addressesFilter.length > 0"
              :producer-ids="accountStore.addressesFilter"
              :mobile="true"
            />
          </q-tab-panel>

          <q-tab-panel name="token-operations" class="tab--mobile-table">
            <tokens-operations-table
              v-if="accountStore.addressesFilter.length > 0"
              :addresses="accountStore.addressesFilter"
              :mobile="true"
            />
          </q-tab-panel>

          <q-tab-panel name="contract-events" class="tab--mobile-table">
            <contract-events-table
              v-if="accountStore.addressesFilter.length > 0"
              :addresses="accountStore.addressesFilter"
              :mobile="true"
            />
          </q-tab-panel>

          <q-tab-panel name="token-events" class="tab--mobile-table">
            <tokens-events-table
              v-if="accountStore.addressesFilter.length > 0"
              :addresses="accountStore.addressesFilter"
              :mobile="true"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Tx"
          name="transactions"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Rewards"
          name="rewards"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Token Ops"
          name="token-operations"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Contract Events"
          name="contract-events"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Token Events"
          name="token-events"
        />
      </q-tabs>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { useAccountStore } from 'stores/account';
import AddressFilterDialog from '@koiner/components/search/address-filter-dialog/address-filter-dialog.vue';
import BlockRewardsTable from '@koiner/network/block-production/search/view/block-rewards-table.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import { useBlockProductionStore } from 'stores/block-production';
import { TokenHolder } from '@koiner/sdk';
import { useRoute } from 'vue-router';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';
import TransactionsTable from '@koiner/chain/transaction/search/view/transactions-table.vue';

export default defineComponent({
  name: 'AccountMobileIndexPage',
  components: {
    TransactionsTable,
    ContractEventsTable,
    TokensEventsTable,
    TokensOperationsTable,
    TokenHolderBalancesMetric,
    BlockRewardsTable,
    AddressFilterDialog,
  },

  setup() {
    const route = useRoute();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const accountStore = useAccountStore();
    const blockProductionStore = useBlockProductionStore();

    const tab: Ref<string> = ref('transactions');
    const openDialog = ref(false);

    onMounted(async () => {
      if (route.query['tab']) {
        tab.value = route.query['tab'].toString();
      }

      openDialog.value = accountStore.addressesFilter.length === 0;
    });

    return {
      koinerStore,
      statsStore,
      accountStore,
      blockProductionStore,
      tab,
      openDialog,

      blockProducers: computed(() => {
        // Transform BlockProducer profits to TokenHolder for input of component
        return blockProductionStore.blockProducers.map((blockProducer) => {
          return {
            addressId: blockProducer.addressId,
            balance: blockProducer.balance,
            contract: koinerStore.koinContract,
            contractId: koinerStore.koinContract.id,
          } as TokenHolder;
        });
      }),
    };
  },
});
</script>

<template>
  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="portfolio"
            style="padding: 0 !important; min-height: 100vh"
          >
            <q-card
              class="stats-card"
              flat
              v-if="accountStore.addressesFilter.length > 0"
            >
              <q-card-section>
                <div class="stat-title">Virtual Koin Balance</div>
                <div class="stat-content" style="font-size: 1.5rem">
                  ${{ accountStore.formattedVirtualKoinValue(2) }} <br /><span
                    :class="`stat-unit`"
                    style="font-size: 0.875rem"
                    >{{
                      accountStore.virtualTotal.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                    }}
                    Virtual KOIN</span
                  >
                </div>
              </q-card-section>
            </q-card>

            <address-filter-dialog :open-dialog="openDialog" />

            <token-balances-component
              v-if="accountStore.addressesFilter.length > 0"
              :token-balances="accountStore.tokenBalances"
            />
          </q-tab-panel>

          <q-tab-panel
            name="rewards"
            class="tab--mobile-network"
            style="padding: 0 !important; min-height: 100vh"
          >
            <token-holder-balances-metric
              v-if="
                accountStore.addressesFilter.length > 0 &&
                tokenHolders &&
                tokenHolders.length > 0
              "
              title="Total Rewards"
              :token-holders="tokenHolders"
              :tooltip-hide-delay="3000"
            />

            <address-filter-dialog :open-dialog="openDialog" />

            <block-rewards-table
              v-if="accountStore.addressesFilter.length > 0"
              :producer-ids="accountStore.addressesFilter"
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
          label="Portfolio"
          name="portfolio"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Rewards"
          name="rewards"
        />
      </q-tabs>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { useAccountStore } from 'stores/account';
import AddressFilterDialog from '@koiner/components/search/address-filter-dialog/address-filter-dialog.vue';
import TokenBalancesComponent from '@koiner/account/mobile/components/token-balances-component.vue';
import BlockRewardsTable from '@koiner/network/components/block-production/search/view/block-rewards-table.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import { TokenHolder } from '@koiner/sdk';
import { SearchRequestType, useSearchManager } from '@appvise/search-manager';

export default defineComponent({
  name: 'AccountMobileIndexPage',
  components: {
    TokenHolderBalancesMetric,
    BlockRewardsTable,
    TokenBalancesComponent,
    AddressFilterDialog,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const accountStore = useAccountStore();

    const tab: Ref<string> = ref('portfolio');
    const openDialog = ref(false);

    const blockProducersSearch = useSearchManager('blockProducers');

    const loadBlockProducers = async () => {
      if (accountStore.addressesFilter.length > 0) {
        const request: SearchRequestType = {
          first: 100,
          filter: {
            AND: [
              {
                OR: accountStore.addressesFilter.map((address) => {
                  return {
                    addressId: {
                      equals: address,
                    },
                  };
                }),
              },
            ],
          },
        };

        await blockProducersSearch.search(request);
      } else {
        blockProducersSearch.reset();
      }
    };

    onMounted(async () => {
      openDialog.value = accountStore.addressesFilter.length === 0;

      await loadBlockProducers();
    });

    watch(
      accountStore,
      async () => {
        await loadBlockProducers();
      },
      { deep: true }
    );

    return {
      koinerStore,
      statsStore,
      accountStore,
      tab,
      openDialog,

      blockProducersSearch,

      tokenHolders: computed(() => {
        // Transform BlockProducer profits to TokenHolder for input of component
        return blockProducersSearch.connection.value?.edges?.map((edge) => {
          return {
            addressId: edge.node.addressId,
            balance: edge.node.balance,
            contract: koinerStore.koinContract,
            contractId: koinerStore.koinContract.id,
          } as TokenHolder;
        });
      }),
    };
  },
});
</script>

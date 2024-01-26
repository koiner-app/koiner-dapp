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

      <address-filter-dialog :open-dialog="openDialog" />
    </q-toolbar>
  </q-header>

  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="coins"
            style="padding: 0 !important; min-height: 100vh"
            class="portfolio-panel"
          >
            <div class="q-pa-md row items-start q-gutter-md">
              <q-card
                class="stats-card"
                flat
                v-if="accountStore.addressesFilter.length > 0"
                style="width: calc(50% - 1rem) !important"
              >
                <q-card-section>
                  <div class="stat-title">
                    <span style="font-size: 0.675rem !important"
                      >Virtual Koin</span
                    >
                  </div>
                  <div class="stat-content" style="font-size: 1.5rem">
                    <span :class="`stat-unit`" style="font-size: 1rem"
                      >${{ accountStore.formattedVirtualKoinValue(2) }}
                    </span>
                    <p
                      :class="`stat-unit`"
                      style="font-size: 0.675rem; margin-top: 0.5rem"
                    >
                      {{
                        accountStore.virtualTotal.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })
                      }}
                      <span
                        :class="`stat-unit`"
                        style="font-size: 0.5rem; opacity: 0.8"
                        >KOIN/VHP
                      </span>
                    </p>
                  </div>
                </q-card-section>
              </q-card>

              <q-card
                class="stats-card"
                flat
                v-if="accountStore.addressesFilter.length > 0"
                style="
                  min-height: 125px;
                  max-width: 100%;
                  width: calc(50% - 1rem) !important;
                "
              >
                <q-card-section>
                  <div class="stat-title">
                    <span style="font-size: 0.675rem !important"> Filter</span>
                  </div>
                  <div>
                    <q-toggle
                      v-model="
                        accountStore[accountStore.environment].groupBalances
                      "
                      size="xs"
                      checked-icon="check"
                      color="blue-grey-4"
                      unchecked-icon="clear"
                      label="Grouped"
                    /></div
                ></q-card-section>
              </q-card>
            </div>

            <token-balances-component
              v-if="accountStore.addressesFilter.length > 0"
              :token-balances="accountStore.tokenBalances"
              :show-group-balances="false"
            />
          </q-tab-panel>

          <q-tab-panel name="history" class="tab--mobile-table">
            <q-card
              class="stats-card"
              flat
              v-if="accountStore.addressesFilter.length > 0"
            >
              <q-card-section>
                <div class="stat-title">My History</div>
                <div
                  class="stat-footer"
                  style="padding-top: 0.25rem !important"
                  v-if="accountStore.addressesFilter.length > 0"
                >
                  <span class="stat-footer-stat"
                    >{{ accountStore.addressesFilter.length }}
                    <span class="stat-unit">{{
                      `address${
                        accountStore.addressesFilter.length > 1 ? 'es' : ''
                      }`
                    }}</span>
                  </span>
                  <q-icon
                    name="help"
                    color="grey"
                    style="padding-bottom: 3px"
                    class="q-ml-xs"
                  />
                  <q-tooltip
                    anchor="bottom start"
                    self="top left"
                    class="bg-primary text-white shadow-4"
                    :hide-delay="3000"
                  >
                    <div class="q-pa-sm q-gutter-xs">
                      <div
                        class="row q-gutter-xs"
                        v-for="address in accountStore.addressesFilter"
                        :key="address"
                      >
                        <div class="col" style="min-width: 220px">
                          {{ address }}
                        </div>
                      </div>
                    </div>
                  </q-tooltip>
                </div>
              </q-card-section>
            </q-card>

            <address-filter-dialog :open-dialog="openDialog" />

            <address-mobile-history
              v-if="accountStore.addressesFilter.length > 0"
              :addresses="accountStore.addressesFilter"
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

            <address-filter-dialog :open-dialog="openDialog" />

            <block-rewards-table
              v-if="accountStore.addressesFilter.length > 0"
              :producer-ids="accountStore.addressesFilter"
              :mobile="true"
            />
          </q-tab-panel>

          <q-tab-panel name="watchlists" class="tab--mobile-table">
            <h2>Watchlists</h2>
          </q-tab-panel>

          <q-tab-panel name="nfts" class="tab--mobile-table">
            <h2>NFTs</h2>
          </q-tab-panel>

          <q-tab-panel name="liquidity" class="tab--mobile-table">
            <h2>Liquidity</h2>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Tokens"
          name="coins"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Watchlists"
          name="watchlists"
        />
        <q-tab class="text-overline" :ripple="false" label="NFTs" name="nfts" />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Liquidity"
          name="liquidity"
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
import TokenBalancesComponent from '@koiner/account/mobile/components/token-balances-component.vue';
import BlockRewardsTable from '@koiner/network/block-production/search/view/block-rewards-table.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import { useBlockProductionStore } from 'stores/block-production';
import { TokenHolder } from '@koiner/sdk';
import AddressMobileHistory from '@koiner/chain/address/mobile/components/address-mobile-history.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AccountMobileIndexPage',
  components: {
    AddressMobileHistory,
    TokenHolderBalancesMetric,
    BlockRewardsTable,
    TokenBalancesComponent,
    AddressFilterDialog,
  },

  setup() {
    const route = useRoute();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const accountStore = useAccountStore();
    const blockProductionStore = useBlockProductionStore();

    const tab: Ref<string> = ref('coins');
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

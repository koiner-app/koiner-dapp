<template>
  <q-header reveal elevated>
    <q-toolbar>
      <q-separator dark vertical inset class="lt-md" />
      <q-toolbar-title style="min-width: 240px">
        <span class="page-title">
          <portfolio-switcher />
        </span>
      </q-toolbar-title>

      <q-space />

      <address-filter-dialog :open-dialog="openDialog" />
      <account-menu-mobile />
    </q-toolbar>
  </q-header>

  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated swipeable>
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

          <q-tab-panel name="watchlists" class="tab--mobile-table">
            <h2>Watchlists</h2>
          </q-tab-panel>

          <q-tab-panel name="nfts" class="tab--mobile-table">
            <q-card class="stats-card" flat>
              <q-card-section>
                <div class="text-center text-h6 text-bold">Coming soon</div>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <q-tab-panel name="liquidity" class="tab--mobile-table">
            <token-balances-component
              v-if="accountStore.addressesFilter.length > 0"
              :token-balances="accountStore.tokenBalances"
              :show-group-balances="false"
              :liquidity-pools="true"
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
          label="Tokens"
          name="coins"
        />
        <!--        <q-tab-->
        <!--          class="text-overline"-->
        <!--          :ripple="false"-->
        <!--          label="Watchlists"-->
        <!--          name="watchlists"-->
        <!--        />-->
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
import { useBlockProductionStore } from 'stores/block-production';
import { TokenHolder } from '@koiner/sdk';
import { useRoute } from 'vue-router';
import AccountMenuMobile from '@koiner/components/account-menu-mobile.vue';
import PortfolioSwitcher from '@koiner/components/portfolio-switcher.vue';

export default defineComponent({
  name: 'AccountMobileIndexPage',
  components: {
    PortfolioSwitcher,
    AccountMenuMobile,
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

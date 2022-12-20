<template>
  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="portfolio" style="padding: 0 !important; min-height: 100vh">
            <q-card
              class="stats-card"
              flat
              v-if="accountStore.addressesFilter.length > 0"
            >
              <q-card-section>
                <div class="stat-title">Balance</div>
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
      </q-tabs>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { useAccountStore } from 'stores/account';
import AddressFilterDialog from '@koiner/components/search/address-filter-dialog/address-filter-dialog.vue';
import TokenBalancesComponent from '@koiner/account/mobile/components/token-balances-component.vue';

export default defineComponent({
  name: 'AccountMobileIndexPage',
  components: {
    TokenBalancesComponent,
    AddressFilterDialog,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const accountStore = useAccountStore();

    const tab: Ref<string> = ref('portfolio');
    const openDialog = ref(false);

    onMounted(() => {
      openDialog.value = accountStore.addressesFilter.length === 0;
    });

    return {
      koinerStore,
      statsStore,
      accountStore,
      tab,
      openDialog,
    };
  },
});
</script>

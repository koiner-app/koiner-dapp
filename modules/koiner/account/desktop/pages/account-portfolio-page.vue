<template>
  <q-page
    v-if="accountStore.addressesFilter.length > 0"
    class="row items-start"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <token-holder-balances-metric
          v-if="accountStore.addressesFilter.length > 0"
          :token-holders="accountStore.tokenBalances"
          :contract="koinerStore.koinContract"
        />
        <q-separator vertical />
        <token-holder-balances-metric
          v-if="accountStore.addressesFilter.length > 0"
          :token-holders="accountStore.tokenBalances"
          :contract="koinerStore.vhpContract"
          @calculated="updateTotalVhp"
        />
        <q-separator vertical />
        <token-holder-balances-metric
          v-if="accountStore.addressesFilter.length > 0"
          title="Virtual total"
          :token-holders="accountStore.tokenBalances"
          :contract="koinerStore.koinContract"
          :contract-ids="[
            koinerStore.koinContract.id,
            koinerStore.vhpContract.id,
          ]"
          @calculated="updateTotalVirtualKoin"
        />
        <q-separator vertical />
        <counter-metric title="Burned" :value="burned" :decimals="2" unit="%" />
      </q-card-section>
    </q-card>

    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-tabs v-model="tab" dense align="left" style="width: 100%">
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Balances"
            name="balances"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="balances">
            <token-balances-component
              v-if="accountStore.addressesFilter.length > 0"
              :token-balances="accountStore.tokenBalances"
              :show-group-balances="false"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="search-card gt-md" flat bordered>
      <q-card-section>
        <div class="text-overline">Addresses</div>

        <div class="search-card-content">
          <account-addresses-filter />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue';
import AccountAddressesFilter from '@koiner/chain/address/account-addresses-filter.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import { useAccountStore } from 'stores/account';
import { useKoinerStore } from 'stores/koiner';
import TokenBalancesComponent from '@koiner/account/mobile/components/token-balances-component.vue';

export default defineComponent({
  name: 'AccountPortfolioPage',
  components: {
    TokenBalancesComponent,
    CounterMetric,
    AccountAddressesFilter,
    TokenHolderBalancesMetric,
  },

  setup() {
    const accountStore = useAccountStore();
    const koinerStore = useKoinerStore();
    const totalVhp: Ref<number | undefined> = ref();
    const totalVirtualKoin: Ref<number | undefined> = ref();
    const tab: Ref<string> = ref('balances');

    return {
      tab,
      accountStore,
      koinerStore,

      totalVhp,
      totalVirtualKoin,
      updateTotalVhp: (newAmount: number) => {
        totalVhp.value = newAmount;
      },
      updateTotalVirtualKoin: (newAmount: number) => {
        totalVirtualKoin.value = newAmount;
      },
      burned: computed(() => {
        return totalVirtualKoin.value && totalVhp.value
          ? (totalVhp.value / totalVirtualKoin.value) * 100
          : 0;
      }),
    };
  },
});
</script>

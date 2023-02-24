<template>
  <q-page
    v-if="accountStore.addressesFilter.length > 0"
    class="row items-start"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <token-holder-balances-metric
          v-if="blockProducers && blockProducers.length > 0"
          title="Total Rewards"
          :token-holders="blockProducers"
        />
        <q-separator vertical />
        <token-holder-balances-metric
          v-if="vhpBurners && vhpBurners.length > 0"
          title="Total VHP Burned"
          :token-holders="vhpBurners"
          :contract="koinerStore.vhpContract"
        />
        <q-separator vertical />
        <counter-metric
          v-if="blockProducers && blockProducers.length > 0"
          title="ROI"
          :value="apy"
          :decimals="2"
          unit="%"
        />
        <q-separator vertical />
        <counter-metric
          v-if="blockProductionStore.blockProducers.length > 0"
          title="Blocks Produced"
          :value="blocksProduced"
        />
      </q-card-section>
    </q-card>

    <q-card class="search-card-large" flat bordered>
      <q-card-section>
        <div class="text-overline">Blocks Produced</div>

        <block-rewards-table
          v-if="
            accountStore.addressesFilter.length > 0 &&
            blockProductionStore.blockProducers &&
            blockProductionStore.blockProducers.length > 0
          "
          :producer-ids="accountStore.addressesFilter"
        />
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
import { computed, defineComponent, } from 'vue';
import BlockRewardsTable from '@koiner/network/components/block-production/search/view/block-rewards-table.vue';
import AccountAddressesFilter from '@koiner/chain/address/account-addresses-filter.vue';
import { TokenHolder } from '@koiner/sdk';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import { useAccountStore } from 'stores/account';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { useBlockProductionStore } from 'stores/block-production';

export default defineComponent({
  name: 'AccountRewardsPage',
  components: {
    AccountAddressesFilter,
    BlockRewardsTable,
    CounterMetric,
    TokenHolderBalancesMetric,
  },

  setup() {
    const accountStore = useAccountStore();
    const blockProductionStore = useBlockProductionStore();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    return {
      accountStore,
      blockProductionStore,
      koinerStore,

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
      vhpBurners: computed(() => {
        // Transform BlockProducer profits to TokenHolder for input of component
        return blockProductionStore.blockProducers?.map((blockProducer) => {
          return {
            addressId: blockProducer.addressId,
            balance: blockProducer.burnedTotal,
            contract: koinerStore.vhpContract,
            contractId: koinerStore.vhpContract.id,
          } as TokenHolder;
        });
      }),
      blocksProduced: computed(() => {
        let total = 0;

        blockProductionStore.blockProducers.forEach((blockProducer) => {
          total += blockProducer.blocksProduced;
        });

        return total;
      }),
      burnedTotal: computed(() => {
        let burnedTotal = 0;

        blockProductionStore.blockProducers.forEach((blockProducer) => {
          burnedTotal += parseInt(blockProducer.burnedTotal);
        });

        return burnedTotal;
      }),
      apy: computed(() => {
        return statsStore.blockProductionApy;
      }),
    };
  },
});
</script>

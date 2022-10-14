<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <q-card class="stats-card" flat>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Rewards</div>
              <div class="text-h4 q-mt-sm q-mb-xs">
                122.300 <span style="font-size: 1.25rem">tKOIN</span>
              </div>
              <div class="text-caption">
                {{
                  `${addressFilter.length} producer${
                    addressFilter.length > 1 ? 's' : ''
                  }`
                }}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>

        <q-separator vertical />

        <q-card class="stats-card" flat>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">VHP</div>
              <div class="text-h4 q-mt-sm q-mb-xs">
                114.851 <span style="font-size: 1.25rem">VHP</span>
              </div>
              <div class="text-caption">1 addresses</div>
            </q-card-section>
          </q-card-section>
        </q-card>

        <q-separator vertical />

        <q-card class="stats-card" flat>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">ROI</div>
              <div class="text-h4 q-mt-sm q-mb-xs">
                2.05 <span style="font-size: 1.25rem">%</span>
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>

        <q-separator vertical />

        <q-card class="stats-card" flat>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Blocks Produced</div>
              <div class="text-h4 q-mt-sm q-mb-xs">
                10.541
                <br />&nbsp;
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <q-card class="transactions-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Blocks Produced</div>
        <block-rewards-component
          v-if="addressFilter.length > 0"
          :producer-ids="addressFilter"
        />
      </q-card-section>
    </q-card>

    <q-card class="blocks-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Addresses</div>

        <div class="q-pa-lg">
          <account-addresses-filter @change="updateFilter" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import BlockRewardsComponent from '@koiner/network/components/block-production/search/view/block-rewards-table.vue';
import AccountAddressesFilter from '@koiner/chain/components/address/account-addresses-filter.vue';

export default defineComponent({
  name: 'AccountRewardsPage',
  components: {
    AccountAddressesFilter,
    BlockRewardsComponent,
  },

  setup() {
    const addressFilter: Ref<string[]> = ref([]);

    const updateFilter = (newFilter: string[]) => {
      addressFilter.value = newFilter;
    };

    return {
      addressFilter,
      updateFilter,
    };
  },
});
</script>

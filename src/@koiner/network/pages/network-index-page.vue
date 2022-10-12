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
              <div class="text-overline">Total Rewarded</div>
              <div class="text-h4 q-mt-sm q-mb-xs">
                122.300 <span style="font-size: 1.25rem">tKOIN</span>
              </div>
              <div class="text-caption">
                ...
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>

        <q-separator vertical />

        <q-card class="stats-card" flat>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Total VHP</div>
              <div class="text-h4 q-mt-sm q-mb-xs">
                114.851 <span style="font-size: 1.25rem">VHP</span>
              </div>
              <div class="text-caption">...</div>
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
              <div class="text-overline">Producers</div>
              <div class="text-h4 q-mt-sm q-mb-xs">
                20
                <br />&nbsp;
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <q-card class="rewards-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Rewards</div>
        <block-rewards-component />
      </q-card-section>
    </q-card>

    <q-card class="producers-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Producers</div>
        <block-producers-component />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlockProducersComponent from '../components/block-production/search/view/block-producers-table.vue';
import BlockRewardsComponent from '../components/block-production/search/view/block-rewards-table.vue';

export default defineComponent({
  name: 'AccountRewardsPage',
  components: { BlockRewardsComponent, BlockProducersComponent },
});
</script>

<style lang="scss" scoped>

.rewards-card {
  width: 100%;
  max-width: calc(60% - 24px);
}
.producers-card {
  width: 100%;
  max-width: calc(40% - 24px);
}
</style>

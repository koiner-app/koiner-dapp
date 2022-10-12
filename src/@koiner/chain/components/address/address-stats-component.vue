<template>
  <q-card class="stats-cards" flat bordered>
    <q-card-section horizontal>
      <q-card class="stats-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">KOIN Balance</div>
            <div class="text-h4 q-mt-sm q-mb-xs">
              122.300 <span style="font-size: 1.25rem">tKOIN</span>
            </div>
            <div class="text-caption">
              {{ `${ids.length} address${ids.length > 1 ? 'es' : ''}` }}
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
              1154851 <span style="font-size: 1.25rem">VHP</span>
            </div>
            <div class="text-caption">1 addresses</div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-separator vertical />

      <q-card class="stats-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Rewards</div>
            <div class="text-h4 q-mt-sm q-mb-xs">
              105055 <span style="font-size: 1.25rem">tKOIN</span>
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AddressStatsComponent',
  props: {
    ids: {
      required: true,
      type: Object as PropType<string[]>,
    },
  },
});
</script>

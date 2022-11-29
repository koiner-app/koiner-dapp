<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="stats-cards" flat bordered>
      <q-card-section>
        <div class="q-pa-md q-gutter-sm">
          <div>
            <q-toggle
              v-model="realtimeUpdates"
              checked-icon="check"
              color="primary"
              unchecked-icon="clear"
              label="Realtime updates (stats)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStatsStore } from 'stores/stats';

export default defineComponent({
  name: 'AccountBookmarksPage',

  setup() {
    const statsStore = useStatsStore();
    const realtimeUpdates = ref(statsStore.realtimeUpdates);

    watch(realtimeUpdates, (newValue) => {
      if (newValue) {
        statsStore.startUpdates();
      } else {
        statsStore.stopUpdates();
      }
    });

    return {
      realtimeUpdates,
    };
  },
});
</script>

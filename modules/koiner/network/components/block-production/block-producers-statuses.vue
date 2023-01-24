<template>
  <q-card class="stats-card" flat>
    <q-card-section>
      <div class="stat-title">My Nodes</div>

      <div class="text-center q-pt-xs">
        <q-scroll-area ref="scrollAreaRef" style="height: 80px">
          <q-list>
            <q-item
              v-for="blockProducer in blockProductionStore.blockProducers"
              :key="blockProducer.addressId"
              style="min-height: 1.675rem; padding-top: 0.25rem"
              class="q-pa-none"
            >
              <block-producer-status
                :last-produced-block="blockProducer.lastProducedBlock"
                :koin-balance="blockProducer.koinBalance.balance"
                :vhp-balance="blockProducer.vhpBalance.balance"
                :updated-at="blockProducer.updatedAt"
                :address-id="blockProducer.addressId"
              />
              <span
                class="q-pb-none address-short"
                style="
                  font-size: 0.675rem;
                  font-weight: 400;
                  line-height: 1;
                  letter-spacing: 0.03333em;
                "
                >{{ blockProducer.addressId }}</span
              >
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBlockProductionStore } from 'stores/block-production';
import { timeAgo } from '@koiner/utils';
import BlockProducerStatus from '@koiner/network/components/block-production/block-producer-status.vue';

export default defineComponent({
  name: 'BlockProducersStatuses',
  components: { BlockProducerStatus },
  methods: { timeAgo },

  setup() {
    const blockProductionStore = useBlockProductionStore();

    return {
      blockProductionStore,
    };
  },
});
</script>

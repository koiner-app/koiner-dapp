<template>
  <q-list v-if="block && block.reward">
    <q-item>
      <q-item-section>
        <q-item-label caption>Producer</q-item-label>
        <q-item-label>
          <router-link
            :to="{
              name: 'address.rewards',
              params: { id: block.reward?.producerId },
            }"
          >
            {{ block.reward?.producerId }}
          </router-link>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Block reward</q-item-label>
        <q-item-label>
          <span>
            {{ tokenAmount(block.reward?.value, 8) }}
            <router-link
              :to="{
                name: 'token',
                params: { id: koinerStore.koinContract.id },
              }"
            >
              <span>
                {{ koinerStore.koinContract.symbol }}
                <q-tooltip :delay="500">{{
                  koinerStore.koinContract.name
                }}</q-tooltip>
              </span>
            </router-link>
          </span>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Burned VHP</q-item-label>
        <q-item-label>
          <span>
            {{ tokenAmount(block.reward?.burnedValue, 8) }}
            <router-link
              :to="{
                name: 'token',
                params: { id: koinerStore.vhpContract.id },
              }"
            >
              <span>
                {{ koinerStore.vhpContract.symbol }}
                <q-tooltip :delay="500">{{
                  koinerStore.vhpContract.name
                }}</q-tooltip>
              </span>
            </router-link>
          </span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Block } from '@koiner/sdk';
import { tokenAmount } from '@koiner/utils';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'BlockProducerComponent',
  props: {
    block: {
      required: true,
      type: Object as PropType<Block>,
    },
  },

  setup() {
    const koinerStore = useKoinerStore();

    return {
      koinerStore,
      tokenAmount,
    };
  },
});
</script>

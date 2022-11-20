<template>
  <q-card class="tabs-card" flat bordered>
    <q-card-section class="q-pt-xs">
      <div class="text-overline">Token events</div>

      <tokens-events-table v-if="isMounted" :addresses="ids" />
    </q-card-section>
  </q-card>

  <q-card class="search-card" flat bordered>
    <q-card-section>
      <div class="text-overline">Wallet</div>

      <div class="search-card-content">
        {{ ids }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';

export default defineComponent({
  name: 'AddressHistoryComponent',
  components: { TokensEventsTable },
  props: {
    ids: {
      required: true,
      type: Array as PropType<Array<string>>,
    },
  },

  setup() {
    const isMounted = ref(false);

    onMounted(() => {
      isMounted.value = true;
    });

    return {
      isMounted,
    };
  },
});
</script>

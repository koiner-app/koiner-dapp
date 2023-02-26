<template>
  <q-page class="row items-baseline justify-evenly" v-if="tokenContract">
    <q-card class="table-card">
      <q-card-section>
        <tokens-events-table
          title="Events"
          :contract-ids="[tokenContract.id]"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TokensEventsTable from '../../../../components/event/search/view/tokens-events-table.vue';
import { TokenContract } from '@koiner/sdk';

export default defineComponent({
  name: 'TokenEventsPage',
  components: { TokensEventsTable },
  props: {
    tokenContract: {
      required: true,
      type: Object as PropType<TokenContract>,
    },
  },
});
</script>

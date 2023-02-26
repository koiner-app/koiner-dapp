<template>
  <q-page class="row items-baseline justify-evenly" v-if="tokenContract">
    <q-card class="table-card">
      <q-card-section>
        <tokens-operations-table
          title="Operations"
          :contract-ids="[tokenContract.id]"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TokensOperationsTable from '../../../../components/operation/search/view/tokens-operations-table.vue';
import { TokenContract } from '@koiner/sdk';

export default defineComponent({
  name: 'TokenOperationsPage',
  components: { TokensOperationsTable },
  props: {
    tokenContract: {
      required: true,
      type: Object as PropType<TokenContract>,
    },
  },
});
</script>

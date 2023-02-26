<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card">
      <q-card-section>
        <block-rewards-component title="Rewards" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlockRewardsComponent from '../../../search/view/block-rewards-table.vue';

export default defineComponent({
  name: 'BlockRewardsPage',
  components: {
    BlockRewardsComponent,
  },
});
</script>

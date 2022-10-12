<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <tokens-events-table title="Events" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TokensEventsTable from '../../components/event/search/view/tokens-events-table.vue';

export default defineComponent({
  name: 'TokensEventsPage',
  components: { TokensEventsTable },
});
</script>

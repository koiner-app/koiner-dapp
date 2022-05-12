<template>
  <q-page class="row items-center justify-evenly">
    <q-card
      v-if="id && typeof id === 'string'"
      class="table-card shadow-1"
      style="
        max-width: 1288px;
        margin: 0 auto;
        box-shadow: 0 0 20px rgb(0 0 0 / 8%);
      "
    >
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Operations</div>
          <q-space />
        </div>

        <token-operations-table-view :contract-id="id.toString()" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import TokenOperationsTableView from '@koiner/contract/token/search/table/token-operations-table-view.vue';

export default defineComponent({
  name: 'TokenTokenOperationsPage',
  components: { TokenOperationsTableView },

  setup() {
    let id: Ref<string | string[] | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id;
    });

    return {
      id,
    };
  },
});
</script>

<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card
      v-if="height"
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

        <operations-search-view :request="request" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import OperationsSearchView from '@koiner/chain/operation/search/operations-search-view.vue';
import { QueryOperationsArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'BlockOperationsPage',
  components: { OperationsSearchView },

  setup() {
    let request: Ref<QueryOperationsArgs> = ref({ filter: {} });
    let height: Ref<number | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      height.value = parseInt(route.params.height.toString());
      request.value.filter = {
        blockHeight: { equals: height.value },
      };
    });

    return {
      height,
      request,
    };
  },
});
</script>

<template>
  <div class="koiner-topbar fixed-top" v-if="id">
    <q-icon class="topbar-icon" name="toll"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Contract {{ id }}</span>
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Overview"
          :to="`/contracts/${id}`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Operations"
          :to="`/contracts/${id}/operations`"
          exact
        />
      </q-tabs>
    </div>
  </div>

  <router-view class="koiner-topbar-page" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ContractLayout',
  components: {},
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

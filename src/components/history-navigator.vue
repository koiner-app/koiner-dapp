<template>
  <div class="history-navigator">
    <q-btn
      :disabled="!history.back"
      @click="router.back()"
      size="xs"
      flat
      icon="arrow_back_ios"
    />
    <q-btn
      :disabled="!history.forward"
      @click="router.forward()"
      size="xs"
      flat
      icon="arrow_forward_ios"
      class="q-ml-xs"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'HistoryNavigator',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const history: Ref<{
      length: number;
      back: boolean;
      position: number;
      forward: boolean;
    }> = ref({
      length: 0,
      back: false,
      position: 0,
      forward: false,
    });

    onMounted(() => {
      history.value = {
        length: window.history.state.length,
        back: window.history.state.back,
        position: window.history.state.position,
        forward: window.history.state.forward,
      };
    });

    watch(
      () => route.name,
      async () => {
        history.value = {
          length: window.history.state.length,
          back: window.history.state.back,
          position: window.history.state.position,
          forward: window.history.state.forward,
        };
      }
    );

    watch(
      () => route.params,
      async () => {
        history.value = {
          length: window.history.state.length,
          back: window.history.state.back,
          position: window.history.state.position,
          forward: window.history.state.forward,
        };
      }
    );

    return {
      history,
      router,
    };
  },
});
</script>

<style lang="scss">
.history-navigator {
  padding-left: 4.5rem;

  .q-btn {
    padding: 0.25rem 0.5rem;
    margin-top: 4px;
  }
}
</style>

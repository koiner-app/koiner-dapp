<template>
  <q-page-sticky
    style="z-index: 9999"
    position="top-left"
    :offset="[20, -34]"
    class="hotkeys"
  >
    <q-btn
      v-if="previous"
      :to="previous"
      size="xs"
      color="secondary"
      icon="navigate_before"
      :class="Control && ArrowLeft ? 'q-btn--active' : ''"
    />
    <q-btn
      v-if="next"
      :to="next"
      size="xs"
      color="secondary"
      icon="navigate_next"
      :class="Control && ArrowLeft ? 'q-btn--active' : ''"
    />
  </q-page-sticky>
</template>
<script lang="ts">
import { defineComponent, PropType, watchEffect } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { RouteLocationRaw, useRouter } from 'vue-router';

export default defineComponent({
  name: 'HotkeyNavigator',
  props: {
    back: {
      type: Object as PropType<RouteLocationRaw>,
      required: false,
    },
    previous: {
      type: Object as PropType<RouteLocationRaw>,
      required: false,
    },
    next: {
      type: Object as PropType<RouteLocationRaw>,
      required: false,
    },
    previousTab: {
      type: Object as PropType<RouteLocationRaw>,
      required: false,
    },
    nextTab: {
      type: Object as PropType<RouteLocationRaw>,
      required: false,
    },
  },
  setup(props) {
    const router = useRouter();

    const { Control, Shift, ArrowLeft, ArrowRight, ArrowUp } = useMagicKeys();

    watchEffect(() => {
      if (props.back && Control.value && ArrowUp.value) {
        console.log('Control + ArrowUp have been pressed');
        router.push(props.back);
      }

      if (props.previous && Control.value && ArrowLeft.value) {
        console.log('Control + ArrowLeft have been pressed');
        router.push(props.previous);
      }

      if (props.next && Control.value && ArrowRight.value) {
        console.log('Control + ArrowRight have been pressed');
        router.push(props.next);
      }

      if (props.previousTab && Shift.value && ArrowLeft.value) {
        console.log('ArrowLeft have been pressed', props.previousTab);
        router.push(props.previousTab);
      }

      if (props.nextTab && Shift.value && ArrowRight.value) {
        console.log('ArrowRight have been pressed', props.nextTab);
        router.push(props.nextTab);
      }
    });

    return {
      Control,
      ArrowLeft,
    };
  },
});
</script>

<style lang="scss">
.hotkeys {
  .q-btn {
    font-size: 8px;
    min-height: auto !important;
    padding: 0;
    margin-right: 0.125rem;
  }
}
</style>

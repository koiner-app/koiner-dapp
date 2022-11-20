<template>
  <div v-if="visible" :class="`${styles.attribute.root} ${customClass}`">
    <div :class="styles.attribute.wrapper">
      <span v-if="before" class="before-attribute">{{ before }}</span>
      <slot />
      <span v-if="after" class="after-attribute">{{ after }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Styles } from '../styles';
import { CompType, Options } from '@appvise/jsonforms-quasar';

export default defineComponent({
  name: 'AttributeWrapper',
  props: {
    appliedOptions: {
      required: false,
      type: Object as CompType<Options, ObjectConstructor>,
      default: undefined,
    },
    visible: {
      required: false,
      type: Boolean,
      default: true,
    },
    styles: {
      required: true,
      type: Object as CompType<Styles, ObjectConstructor>,
    },
  },
  setup(props) {
    return {
      customClass: computed(() => {
        return props.appliedOptions?.class ?? '';
      }),
      before: computed(() => {
        return props.appliedOptions?.before;
      }),
      after: computed(() => {
        return props.appliedOptions?.after;
      }),
    };
  },
});
</script>

<template>
  <div v-if="visible" :class="styles.attribute.root">
    <div :class="styles.attribute.wrapper">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
});
</script>

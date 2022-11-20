<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <q-btn
      :id="control.id + '-input'"
      :class="styles.control.button"
      :disabled="isDisabled"
      :label="computedLabel"
      :unelevated="appliedOptions.unelevated"
      :color="appliedOptions.color"
      @click="onButtonClick"
    />
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useQuasarControl } from '../util';

export default defineComponent({
  name: 'ButtonControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useQuasarControl(
      useJsonFormsControl(props)
    )
  },
});
</script>

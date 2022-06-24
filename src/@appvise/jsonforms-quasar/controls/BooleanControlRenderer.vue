<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <q-checkbox
      :id="control.id + '-input'"
      v-model="control.data"
      :class="`${styles.control.input}${
        computedDescription ? ' q-field--with-description' : ''
      }`"
      :disabled="isDisabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      :label="computedLabel"
      :hint="computedDescription"
      :persistent-hint="persistentHint()"
      :required="control.required"
      :error-messages="control.errors"
      :indeterminate="control.data === undefined"
      :model-value="control.id"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </control-wrapper>
</template>

<script lang="ts">
import { ControlElement } from '@jsonforms/core';
import { defineComponent } from '../config/vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useQuasarControl } from '../util';

export default defineComponent({
  name: 'BooleanControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useQuasarControl(
      useJsonFormsControl(props),
      (newValue) => newValue || false
    );
  },
});
</script>

<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <q-input
      :id="control.id + '-input'"
      v-model.number="control.data"
      type="number"
      :step="step"
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
      :error="control.errors.length > 0"
      :error-message="control.errors"
      :min="control.schema.min"
      :max="control.schema.max"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <template #label>
        <div v-html="computedHtmlLabel" />
      </template>
    </q-input>
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
  name: 'NumberControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useQuasarControl(
      useJsonFormsControl(props),
      (value) => parseFloat(value) || undefined
    );
  },
  computed: {
    step(): number {
      const options: any = this.appliedOptions;
      return options.step ?? 0.1;
    },
  },
});
</script>

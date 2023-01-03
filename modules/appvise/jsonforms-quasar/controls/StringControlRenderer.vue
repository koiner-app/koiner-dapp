<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <q-input
      :id="control.id + '-input'"
      v-model="control.data"
      :class="`${styles.control.input}${
        computedDescription ? ' q-field--with-description' : ''
      }`"
      :disabled="isDisabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      :filled="appliedOptions.filled"
      :dense="appliedOptions.dense"
      :stack-label="appliedOptions.stackLabel"
      :label="computedLabel"
      :hint="computedDescription"
      :persistent-hint="persistentHint()"
      :error="control.errors.length > 0"
      :error-message="control.errors"
      :maxlength="
        appliedOptions.restrict ? control.schema.maxLength : undefined
      "
      :type="appliedOptions.type ?? undefined"
      :autogrow="appliedOptions.autogrow ?? undefined"
      :counter="control.schema.maxLength !== undefined ? true : undefined"
      :prefix="appliedOptions.prefix"
      :suffix="appliedOptions.suffix"
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
import { defineComponent } from 'vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useQuasarControl } from '../util';

export default defineComponent({
  name: 'StringControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useQuasarControl(
      useJsonFormsControl(props),
      (value) => value || undefined
    );
  },
});
</script>

<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <q-select
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
      :required="control.required"
      :error="control.errors.length > 0"
      :error-messages="control.errors"
      :options="computedOptions"
      item-text="title"
      item-value="const"
      @update:model-value="onSelectChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <template #label>
        <div v-html="computedHtmlLabel" />
      </template>
    </q-select>
  </control-wrapper>
</template>

<script lang="ts">
import { ControlElement } from '@jsonforms/core';
import { defineComponent } from '../config/vue';
import {
  rendererProps,
  useJsonFormsEnumControl,
  RendererProps,
} from '@jsonforms/vue';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useQuasarControl } from '../util';

export default defineComponent({
  name: 'EnumControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useQuasarControl(
      useJsonFormsEnumControl(props),
      (value) => value || undefined
    );
  },
  computed: {
    computedOptions() {
      return this.control.options.map((option) => {
        if (typeof option.value === 'object') {
          return {
            label: option.value.title,
            value: option.value.const,
          };
        }

        return option.value;
      });
    },
  },
  methods: {
    onSelectChange(value: any) {
      return this.onChange(typeof value !== 'object' ? value : value.value);
    },
  },
});
</script>

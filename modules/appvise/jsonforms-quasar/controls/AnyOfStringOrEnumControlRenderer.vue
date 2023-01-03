<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <label
      :for="control.id + '-input'"
      class="q-field row no-wrap items-start q-field--standard q-input q-field--float q-field--labeled q-field--with-bottom input relative-position"
    >
      <span class="absolute-left">{{ computedLabel }}</span>
      <div style="margin-left: 9.225rem;">
        <q-option-group
          :id="control.id + '-input'"
          v-model="control.data"
          :options="computedOptions"
          type="checkbox"
          @update:model-value="onChange"
          :class="`${styles.control.input}${
            computedDescription ? ' q-field--with-description' : ''
          }`"
          :disabled="isDisabled"
          :required="control.required"
          :error="control.errors.length > 0"
          :error-messages="control.errors"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
      </div>
    </label>
  </control-wrapper>
</template>

<script lang="ts">
import { ControlElement } from '@jsonforms/core';
import { defineComponent } from '../config/vue';
import {
  rendererProps,
  useJsonFormsAnyOfControl,
  RendererProps,
} from '@jsonforms/vue';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useQuasarControl } from '../util';

export default defineComponent({
  name: 'AnyOfStringOrEnumControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useQuasarControl(
      useJsonFormsAnyOfControl(props),
      (value) => value || undefined
    );
  },
  computed: {
    computedOptions() {
      return this.control.schema.anyOf?.map((option) => {
        if (typeof option === 'object') {
          return {
            label: option.title,
            value: option.const,
          };
        }

        return option;
      });
    },
  },
  methods: {
    onSelectChange(value: any) {
      return this.onChange(value);
    },
  },
});
</script>

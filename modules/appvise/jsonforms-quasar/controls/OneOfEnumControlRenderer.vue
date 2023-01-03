<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <q-select
      :use-input="useInput"
      :input-debounce="appliedOptions.inputDebounce ?? 0"
      :id="control.id + '-input'"
      v-model="control.data"
      :class="`${styles.control.input}${
        computedDescription ? ' q-field--with-description' : ''
      }`"
      :disabled="isDisabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      :readonly="appliedOptions.readonly"
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
      @blur="
        isFocused = false;
        typing = false;
      "
      @virtual-scroll="onScroll"
      @filter="filterFn"
    >
      <template #label>
        <div v-html="computedHtmlLabel" />
      </template>
      <template #selected-item>
        <span v-if="!typing && selectedLabel !== ''" class="absolute-left">
          {{ selectedLabel }}
        </span>
      </template>
      <template #error>
        {{ control.errors }}
      </template>
    </q-select>
  </control-wrapper>
</template>

<script lang="ts">
import { ControlElement } from '@jsonforms/core';
import { defineComponent, ref } from '../config/vue';
import {
  rendererProps,
  useJsonFormsOneOfEnumControl,
  RendererProps,
} from '@jsonforms/vue';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useQuasarControl } from '../util';
import { Ref } from 'vue';

export default defineComponent({
  name: 'OneOfEnumControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const control = useQuasarControl(
      useJsonFormsOneOfEnumControl(props),
      (value) => value || undefined
    );

    const typing: Ref<boolean> = ref(false);

    return {
      ...control,
      typing,
    };
  },
  computed: {
    useInput() {
      // Allow extended components to override
      return false;
    },
    computedOptions() {
      return this.control.options.map((option) => {
        if (typeof option.value === 'object') {
          return {
            label: option.value.title,
            value: option.value.const,
          };
        }

        return option;
      });
    },
    selectedOption() {
      return this.control.options.find(
        (option) => option.value === this.control.data
      );
    },
    selectedLabel() {
      return this.selectedOption ? this.selectedOption.label : '';
    },
  },
  methods: {
    onSelectChange(value: Record<string, unknown> | string | number) {
      this.typing = false;
      this.onChange(typeof value !== 'object' ? value : value.value);
    },
    onScroll() {
      // Defined so components that extend this component can override it
    },
    filterFn(val: string, update: (arg0: () => void) => void) {
      // Only defined so components that extend this component can override it
      update(() => {
        //
      });
    },
  },
});
</script>

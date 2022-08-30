<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <q-field
      :id="control.id + '-input'"
      v-model.number="control.data"
      type="number"
      :step="step"
      :class="`${styles.control.currency}${
        computedDescription ? ' q-field--with-description' : ''
      }`"
      :disabled="isDisabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      :readonly="appliedOptions.readonly"
      :label="computedLabel"
      :hint="computedDescription"
      :persistent-hint="persistentHint()"
      :required="control.required"
      :error="control.errors.length > 0"
      :error-message="control.errors"
      :min="control.schema.min"
      :max="control.schema.max"
      @update:model-value="emitChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <template #label>
        <div v-html="computedHtmlLabel" />
      </template>
      <template #control="{ id, floatingLabel, emitValue }">
        <money3-component
          :id="id"
          class="q-field__input"
          :model-value="control.data ?? 0.00"
          @update:model-value="emitValue"
          v-bind="moneyFormatForComponent"
          v-show="floatingLabel"
        />
      </template>
    </q-field>
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
import { Money3Component, unformat } from 'v-money3';

export default defineComponent({
  name: 'CurrencyControlRenderer',
  components: {
    ControlWrapper,
    Money3Component,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const control = useQuasarControl(useJsonFormsControl(props), (value) =>
      parseFloat(value) || undefined
    );

    const emitChange = (value: any) => {
      control.onChange(unformat(value));
    };

    return {
      ...control,
      moneyFormatForComponent: {
        decimal: control.appliedOptions.value.decimal ?? '.',
        thousands: control.appliedOptions.value.thousands ?? ',',
        prefix: control.appliedOptions.value.prefix ?? '$ ',
        suffix: control.appliedOptions.value.suffix,
        precision: control.appliedOptions.value.precision ?? 2,
        masked: true,
      },
      emitChange,
    };
  },
  computed: {
    step(): number {
      const options: any = this.appliedOptions;
      return options.step ?? 0.1;
    },
  },
});
</script>

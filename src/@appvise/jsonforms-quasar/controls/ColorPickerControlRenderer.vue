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
      :class="`${styles.control.input} ${styles.control.colorPicker}${
        computedDescription ? ' q-field--with-description' : ''
      }`"
      :rules="appliedOptions.rules ?? ['anyColor']"
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
      :prefix="appliedOptions.prefix"
      :suffix="appliedOptions.suffix"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <template #label>
        <div v-html="computedHtmlLabel" />
      </template>
      <template #append>
        <div
          v-if="appliedOptions.mode === 'preview'"
          class="color-picker-preview"
        >
          <div :style="`background-color: ${control.data ?? 'transparent'};`" />
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color
              v-model="control.data"
              @change="
                (val) => {
                  onChange(val);
                }
              "
            />
          </q-popup-proxy>
        </div>

        <q-icon v-else :name="matColorize" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color
              v-model="control.data"
              @change="
                (val) => {
                  onChange(val);
                }
              "
            />
          </q-popup-proxy>
        </q-icon>
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
import { matColorize } from '@quasar/extras/material-icons';

export default defineComponent({
  name: 'ColorPickerControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const control = useQuasarControl(
      useJsonFormsControl(props),
      (value) => value || undefined
    );

    return {
      ...control,
      matColorize,
    };
  },
});
</script>

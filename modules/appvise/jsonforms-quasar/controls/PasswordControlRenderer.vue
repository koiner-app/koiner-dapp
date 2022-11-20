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
      :type="passwordVisible ? 'text' : 'password'"
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
      :size="
        appliedOptions.trim && control.schema.maxLength !== undefined
          ? control.schema.maxLength
          : undefined
      "
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
        <q-icon
          :name="passwordVisible ? 'rapp:min' : 'rapp:add'"
          class="q-mr-sm cursor-pointer"
          size="xs"
          @click="passwordVisible = !passwordVisible"
        />
      </template>
    </q-input>
  </control-wrapper>
</template>

<script lang="ts">
import { ControlElement } from '@jsonforms/core';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useQuasarControl } from '../util';
import { defineComponent, ref } from '../config/vue';

export default defineComponent({
  name: 'PasswordControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const passwordVisible = ref(false);

    return {
      ...useQuasarControl(
        useJsonFormsControl(props),
        (value) => value || undefined
      ),
      passwordVisible,
    };
  },
});
</script>

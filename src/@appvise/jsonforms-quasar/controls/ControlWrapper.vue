<template>
  <div
    v-if="visible"
    :id="id"
    :class="styles.control.root"
  >
    <div :class="styles.control.wrapper">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { isDescriptionHidden, computeLabel } from '@jsonforms/core';
import { defineComponent } from 'vue';
import { Styles } from '../styles';
import { Options } from '../util';
import { CompType } from '../config/vue';

export default defineComponent({
  name: 'ControlWrapper',
  props: {
    id: {
      required: true,
      type: String
    },
    description: {
      required: false,
      type: String,
      default: undefined
    },
    errors: {
      required: false,
      type: String,
      default: undefined
    },
    label: {
      required: false,
      type: String,
      default: undefined
    },
    appliedOptions: {
      required: false,
      type: Object as CompType<Options, ObjectConstructor>,
      default: undefined
    },
    visible: {
      required: false,
      type: Boolean,
      default: true
    },
    required: {
      required: false,
      type: Boolean,
      default: false
    },
    isFocused: {
      required: false,
      type: Boolean,
      default: false
    },
    styles: {
      required: true,
      type: Object as CompType<Styles, ObjectConstructor>
    }
  },
  computed: {
    showDescription(): boolean {
      return !isDescriptionHidden(
        this.visible,
        this.description,
        this.isFocused,
        !!this.appliedOptions?.showUnfocusedDescription
      );
    },
    computedLabel(): string {
      return computeLabel(
        this.label,
        this.required,
        !!this.appliedOptions?.hideRequiredAsterisk
      );
    }
  }
});
</script>

<template>
  <span v-if="isSupported">
    <span v-if="showSource" @click="copy(source)">{{ source }}</span>
    <q-btn
      :flat="flat"
      :round="round"
      :class="buttonClass"
      @click="copy(source)"
      size="1rem"
      :style="buttonStyle"
    >
      <q-icon :name="copied ? 'done' : icon" :size="iconSize" />
    </q-btn>
    <q-tooltip>{{ tooltip }}</q-tooltip>
  </span>
  <p v-else>Your browser does not support Clipboard API</p>
</template>

<script lang="ts">
import { useClipboard } from '@vueuse/core';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CopyToClipboard',
  props: {
    source: {
      type: String,
      required: true,
    },
    showSource: {
      type: Boolean,
      required: false,
      default: true,
    },
    tooltip: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
      default: 'content_copy',
    },
    flat: {
      type: Boolean,
      required: false,
      default: true,
    },
    round: {
      type: Boolean,
      required: false,
      default: true,
    },
    iconSize: {
      type: String,
      required: false,
      default: '0.75rem',
    },
    buttonClass: {
      type: String,
      required: false,
      default: '',
    },
    buttonStyle: {
      type: String,
      required: false,
      default: 'min-width: 2rem; min-height: 2rem',
    },
  },

  setup(props) {
    const { text, copy, copied, isSupported } = useClipboard({
      source: props.source,
    });

    return {
      text,
      copy,
      copied,
      isSupported,
    };
  },
});
</script>

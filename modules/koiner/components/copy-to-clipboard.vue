<template>
  <span v-if="isSupported">
    <span v-if="showSource" @click="copy(source)">{{ source }}</span>
    <q-icon
      size="0.75rem"
      :name="copied ? 'done' : 'content_copy'"
      class="q-ml-xs"
      @click="copy(source)"
    />
    <q-tooltip>{{ tooltip }}</q-tooltip>
  </span>
  <p v-else>Your browser does not support Clipboard API</p>
</template>

<script lang="ts">
import { useClipboard } from '@vueuse/core';
import { defineComponent, PropType, ref, Ref } from 'vue';

export default defineComponent({
  name: 'CopyToClipboard',
  props: {
    source: {
      required: true,
      type: String,
    },
    showSource: {
      required: false,
      type: Boolean,
      default: true,
    },
    tooltip: {
      required: false,
      type: String,
    },
  },

  setup(props) {
    const copyId: Ref<string> = ref('');
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

<template>
  <attribute-wrapper
    v-if="rawValue(result.node)"
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <span v-for="(item, index) in entries(rawValue(result.node))" :key="index">
      <span v-if="index < 1">
        <q-chip
          @click="showDialog(rawValue(result.node))"
          square
          dense
          :label="item.key"
          size="sm"
          :class="`q-ml-md data-attribute-field ${item.key}`"
        /><span>{{ item.value }}</span></span
      >
      <q-btn
        v-if="index === 1"
        @click="showDialog(rawValue(result.node))"
        flat
        class="q-pa-none q-ml-sm"
        style="min-height: 0.9375rem !important"
      >
        <q-chip
          @click="showDialog(rawValue(result.node))"
          square
          dense
          size="sm"
          :label="`+${entries(rawValue(result.node)).length - 1}`"
          class="q-ma-none"
        />
      </q-btn>
    </span>
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import {
  AttributeElement,
  AttributeWrapper,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'DataAttributeRenderer',
  components: {
    AttributeWrapper,
  },
  props: {
    ...rendererProps<AttributeElement>(),

    result: {
      type: Object as PropType<any>,
      required: false,
      default: null,
    },
  },
  setup(props: RendererProps<AttributeElement>) {
    const attributeControl = useQuasarAttribute(useJsonAttribute(props));
    const $q = useQuasar();

    return {
      ...attributeControl,
      entries: (data: string): { key: string; value: any }[] => {
        const entries = [];

        for (const [key, value] of Object.entries(JSON.parse(data))) {
          entries.push({ key, value });
        }

        return entries;
      },
      showDialog: (data: any) => {
        let entriesTemplate = '';

        for (const [key, value] of Object.entries(JSON.parse(data))) {
          entriesTemplate += `<div class="q-pa-sm" style="max-width: 350px"><q-item>
  <q-item-section>
    <q-item-label class="block"><strong>${key}</strong></q-item-label>
    <q-item-label caption clickable v-ripple>${value}</q-item-label>
  </q-item-section>
</q-item></div>`;
        }

        $q.dialog({
          title: 'Decoded data',
          message: `<q-list bordered padding>${entriesTemplate}</q-list>`,
          html: true,
          style: 'min-width: 50vw;',
        });
      },
    };
  },
});
</script>

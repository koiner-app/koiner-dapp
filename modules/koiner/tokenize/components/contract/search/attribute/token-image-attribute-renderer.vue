<template>
  <attribute-wrapper
    v-if="rawValue(result)"
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <q-avatar v-if="tokenLogo(result.node.id, result.node.symbol)">
      <img
        :src="tokenLogo(result.node.id, result.node.symbol)"
        :alt="result.node.symbol"
      />
    </q-avatar>
    <q-avatar v-else color="primary" text-color="white">
      <span style="font-size: 0.75rem">{{
        result.node.symbol.substring(0, 3)
      }}</span>
    </q-avatar>
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import { tokenLogo } from '@koiner/utils';
import {
  AttributeElement,
  AttributeWrapper,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'KoinTokenLogoAttributeRenderer',
  methods: { tokenLogo },
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
    const koinerStore = useKoinerStore();
    const attributeControl = useQuasarAttribute(useJsonAttribute(props));

    return {
      koinerStore,
      ...attributeControl,
    };
  },
});
</script>

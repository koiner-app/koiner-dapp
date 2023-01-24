<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <block-producer-status
      :last-produced-block="result.node.lastProducedBlock"
      :koin-balance="result.node.koinBalance.balance"
      :vhp-balance="result.node.vhpBalance.balance"
      :updated-at="result.node.updatedAt"
      :address-id="result.node.addressId"
    />
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import { formattedTokenAmount, timeAgo } from '@koiner/utils';
import {
  AttributeElement,
  AttributeWrapper,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';
import BlockProducerStatus from '@koiner/network/components/block-production/block-producer-status.vue';

export default defineComponent({
  name: 'ProducerStatusAttributeRenderer',
  methods: { formattedTokenAmount, timeAgo },
  components: {
    BlockProducerStatus,
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

    return {
      ...attributeControl,
    };
  },
});
</script>

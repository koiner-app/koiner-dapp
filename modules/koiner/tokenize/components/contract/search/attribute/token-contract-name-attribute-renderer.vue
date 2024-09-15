<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <router-link
      :to="to(mappedValue(result, 'id'))"
      :class="`${styles.attribute.link} address-attribute`"
    >
      <q-icon v-if="appliedOptions.icon" :name="appliedOptions.icon" />
      <span v-if="!appliedOptions.icon">{{
        getTokenContractName(
          mappedValue(result, 'id'),
          mappedValue(result, 'name')
        )
      }}</span>
    </router-link>
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
import { tokenContractsMap } from '../../token-contracts-map';
import { getTokenContractName } from '../../get-token-contract-name';

export default defineComponent({
  name: 'TokenContractNameAttributeRenderer',
  methods: { getTokenContractName },
  computed: {
    contractsMap() {
      return tokenContractsMap;
    },
  },
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

    const to = (data: Record<string, unknown>) => {
      return {
        name: attributeControl.appliedOptions.value['route'] ?? 'token',
        params: { id: data },
      };
    };

    return {
      ...attributeControl,
      to,
    };
  },
});
</script>

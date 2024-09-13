<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <router-link
      :to="to(rawValue(result))"
      :class="`${styles.attribute.link} address-attribute`"
    >
      <q-icon v-if="appliedOptions.icon" :name="appliedOptions.icon" />
      <span v-if="!appliedOptions.icon">{{
        getContractName(rawValue(result))
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
import { contractsMap } from '../../contracts-map';
import { getContractName } from '../../get-contract-name';

export default defineComponent({
  name: 'ProducerNameAttributeRenderer',
  methods: { getContractName },
  computed: {
    contractsMap() {
      return contractsMap;
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
      // Use route with params
      return {
        name: attributeControl.appliedOptions.value['route'] ?? 'address',
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

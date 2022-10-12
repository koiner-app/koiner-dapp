<template>
  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import blockProducersSearchSchema from '..//block-producers-search.schema.json';
import tokenBalancesSearchUiSchema from '../view/block-producers-table.ui-schema.json';
import { QueryBlockProducersArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'BlockProducersComponent',
  components: { QJsonSearch },
  props: {
    contractIds: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    addresses: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
  },

  setup(props) {
    let request: Ref<QueryBlockProducersArgs> = ref({ filter: {} });
    let contractIdsFilter: any;
    let addressFilter: any;

    request.value.filter = { AND: [] };

    if (props.contractIds && props.contractIds.length > 0) {
      contractIdsFilter = {
        OR: props.contractIds.map((contractId) => {
          return {
            contractId: { equals: contractId },
          };
        }),
      };
    }

    if (props.addresses && props.addresses.length > 0) {
      addressFilter = {
        OR: props.addresses.map((address) => {
          return {
            addressId: { equals: address },
          };
        }),
      };
    }

    if (contractIdsFilter) {
      request.value.filter.AND?.push(contractIdsFilter);
    }

    if (addressFilter) {
      request.value.filter.AND?.push(addressFilter);
    }

    return {
      schema: blockProducersSearchSchema,
      uiSchema: tokenBalancesSearchUiSchema,
      request: request,
      renderers: KoinerRenderers,
    };
  },
});
</script>

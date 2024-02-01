<template>
  <div class="row no-wrap items-center" v-if="title">
    <div v-if="title" class="text-h6">{{ title }}</div>
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    :additional-renderers="renderers"
    @change="connectionUpdated"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import blockProducersSearchSchema from '../block-producers-search.schema.json';
import desktopUiSchema from './block-producers-table.ui-schema.json';
import mobileUiSchema from './block-producers-table.mobile-ui-schema.json';
import { BlockProducersConnection, QueryBlockProducersArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'BlockProducersComponent',
  components: { QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    contractIds: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    addresses: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    mobile: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  emits: ['change'],

  setup(props, { emit }) {
    let request: Ref<QueryBlockProducersArgs> = ref({ first: 250, filter: {} });
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

    const connectionUpdated = (connection: BlockProducersConnection) => {
      emit('change', connection);
    };

    return {
      schema: blockProducersSearchSchema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request: request,
      renderers: KoinerRenderers,
      connectionUpdated,
    };
  },
});
</script>

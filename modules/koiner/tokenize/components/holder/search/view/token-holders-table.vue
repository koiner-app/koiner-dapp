<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>

    <q-space />

    <search-filters :request="request" search-info="Search by address id" />
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    @change="onChange"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '../token-holders-search.schema.json';
import mobileUiSchema from './token-holders-table.mobile-ui-schema.json';
import desktopUiSchema from './token-holders-table.ui-schema.json';
import { TokenHoldersConnection } from '@koiner/sdk';
import { useTokensStore } from 'stores/tokens';

export default defineComponent({
  name: 'TokenHoldersTable',
  components: { SearchFilters, QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    contractId: {
      required: true,
      type: String,
    },
    mobile: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const tokensStore = useTokensStore();

    return {
      schema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request: {
        filter: {
          contractId: { equals: props.contractId },
        },
      },
      onChange: (data: TokenHoldersConnection) => {
        if (data.edges) {
          data.edges?.map(async (edge) => {
            const balance = await tokensStore.balance(
              edge.node.contractId,
              edge.node.addressId
            );

            if (balance != null) {
              edge.node.balance = balance.balance.toString();
            }

            return edge;
          });
        }
      },
      renderers: KoinerRenderers,
    };
  },
});
</script>

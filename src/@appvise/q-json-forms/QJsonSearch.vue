<script lang="ts">
import { JsonForms } from '@jsonforms/vue';
import { quasarRenderers } from '@appvise/jsonforms-quasar/renderers';
import { JsonFormsI18nState } from '@jsonforms/core/src/i18n/i18nTypes';
import { useI18n } from 'vue-i18n';
import { PropType, watch } from 'vue';
import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { SearchProvider, SearchRequestType } from '@appvise/search-manager';

const renderers = [...quasarRenderers];

/**
 * Setup base form which will take care of loading QuasarRenderers + translators
 */
export default {
  name: 'QJsonSearch',
  components: {
    JsonForms,
  },
  extends: JsonForms,
  props: {
    renderers: {
      required: false,
      type: Object as PropType<JsonFormsRendererRegistryEntry[]>,
      // Freeze renderers for performance gains
      default: Object.freeze(renderers),
    },
    searchProvider: {
      type: Object as PropType<SearchProvider<any, any, any, any>>,
      required: true,
    },
    request: {
      type: Object as PropType<SearchRequestType>,
      required: false,
      default: null,
    },
    scrollPosition: {
      type: Number,
      required: false,
    },
  },

  emits: ['onScroll'],

  // TODO: Make ignore unnecessary
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setup(props: any, { emit }) {
    const { t } = useI18n({
      fallbackWarn: false,
    });

    const i18n: JsonFormsI18nState = {
      // TODO: Fix signature not matching
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      translate: (id: string, defaultMessage: string, values?: any) => {
        if (!id) {
          return defaultMessage;
        }

        return t(id, values) ?? defaultMessage;
      },
    };

    watch(props.searchProvider.state.scrollPosition, (newScrollPosition) => {
      emit('onScroll', newScrollPosition);
    });

    return {
      i18n,
      data: {
        // TODO: Find a better way to inject search provider + request
        // Workaround for passing searchProvider + request down to SearchView renderers
        searchProvider: props.searchProvider,
        request: props.request,
        scrollPosition: props.scrollPosition,
      },
    };
  },
};
</script>

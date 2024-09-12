<template>
  <json-forms
    :renderers="mergedRenderers"
    :data="data"
    :schema="schema"
    :uischema="mergedUischema"
    :cells="cells"
    :config="config"
    :uischemas="uischemas"
    :ajv="ajv"
    :i18n="i18n"
    @change="onChange"
  />
</template>

<script lang="ts">
import { JsonForms, JsonFormsChangeEvent, MaybeReadonly } from '@jsonforms/vue';
import { createAjv, extendedQuasarRenderers } from '@appvise/jsonforms-quasar';
import { defineComponent, PropType, provide, Ref, ref, watch } from 'vue';
import {
  JsonFormsRendererRegistryEntry,
  JsonFormsI18nState,
  JsonSchema,
  UISchemaElement,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
} from '@jsonforms/core';
import { useI18n } from 'vue-i18n';
import { jsonSearchRenderers } from '@appvise/jsonsearch-quasar';
import { Connection, SearchRequestType } from '@appvise/search-manager';
import { useWindowSize } from '@vueuse/core';

const renderers = [...extendedQuasarRenderers, ...jsonSearchRenderers];

/**
 * Setup base form which will take care of loading QuasarRenderers + translators
 */
export default defineComponent({
  components: {
    JsonForms,
  },
  props: {
    connection: {
      type: Object as PropType<Connection<any, any>>,
      required: false,
    },
    // Adapted props
    // Replace default renderer set with custom renderer set
    renderers: {
      required: false,
      type: Object as PropType<JsonFormsRendererRegistryEntry[]>,
      // Freeze renderers for better performance
      default: Object.freeze(renderers),
    },
    // Add extra renderers to default renderer set
    additionalRenderers: {
      required: false,
      type: Object as PropType<JsonFormsRendererRegistryEntry[]>,
      // Freeze renderers for better performance
      default: Object.freeze(renderers),
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
    // Same as original
    schema: {
      required: false,
      type: [Object, Boolean] as PropType<JsonSchema>,
      default: undefined,
    },
    uischema: {
      required: false,
      type: Object as PropType<UISchemaElement>,
      default: undefined,
    },
    cells: {
      required: false,
      type: Array as PropType<
        MaybeReadonly<JsonFormsCellRendererRegistryEntry[]>
      >,
      default: () => [],
    },
    config: {
      required: false,
      type: Object as PropType<any>,
      default: undefined,
    },
    uischemas: {
      required: false,
      type: Array as PropType<MaybeReadonly<JsonFormsUISchemaRegistryEntry[]>>,
      default: () => [],
    },
    additionalData: {
      required: false,
      type: Object as PropType<any>,
    },
    mergeNestedSelections: {
      required: false,
      type: Boolean,
    },
    nestedMultiSelect: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'onScroll',
    'change',
    'selectionChanged',
    'nestedSelectionChanged',
    'selectedAllChanged',
    'custom-event',
  ],

  setup(props: any, { emit }: any) {
    const { t } = useI18n();
    const ajv = createAjv();
    const selectedItems: Ref<any[]> = ref([]);
    const nestedSelectedItems: Ref<Record<string, any[]>> = ref({});
    const selectedAll: Ref<boolean> = ref(false);

    // Can be used inside sub SearchViews to check if sub selection needs to be merged with
    // rootSelection if options.view.selection -> multi: false + mergeWithRootSelection: true
    provide<Ref<any[]>>('rootSelection', selectedItems);

    let mergedRenderers = props.renderers ?? renderers;

    if (props.additionalRenderers) {
      mergedRenderers = [...mergedRenderers, ...props.additionalRenderers];
    }

    // TODO: Use better way to use default settings for all tables
    const mergedUischema = ref(props.uischema);
    const { width } = useWindowSize();

    // Add default settings to enable table fullHeight mode
    if (
      mergedUischema.value?.elements[0] &&
      mergedUischema.value.elements[0].type === 'TableView'
    ) {
      if (!mergedUischema.value.elements[0].options) {
        mergedUischema.value.elements[0].options = {};
      }

      if (
        mergedUischema.value.elements[0].options.fullHeight === undefined &&
        width.value >= 1024
      ) {
        mergedUischema.value.elements[0].options.fullHeight = true;
        // 80 = desktop footer bar + q-page padding
        mergedUischema.value.elements[0].options.fullHeightMargin =
          width.value >= 1440 ? 92 : 64;
      }
    }

    const i18n: JsonFormsI18nState = {
      translate: t,
    };
    const lastScrollPosition = ref(props.scrollPosition);

    const onChange = (event: JsonFormsChangeEvent) => {
      // Propagate onScroll event
      // TODO: Does onScroll still work?
      if (
        event.data?.scrollPosition &&
        lastScrollPosition.value !== event.data?.scrollPosition
      ) {
        lastScrollPosition.value = event.data.scrollPosition;
        emit('onScroll', event.data.scrollPosition);
      }

      // Propagate custom events
      if (event.data.events) {
        const events = event.data.events;
        emit('custom-event', events);
        delete event.data.events;
      }

      // Propagate onChange event
      if (event.data) {
        emit('change', event.data);
      }

      nestedSelectedItems.value[event.data.selectionPath ?? 'root'] =
        event.data.selectedItems;

      if (props.mergeNestedSelections) {
        let newSelection: any[] = [];

        if (!props.nestedMultiSelect) {
          // Replace selectedItems with updated nestedSelection if multiSelect is not allowed
          newSelection = event.data.selectedItems;
        } else {
          // Otherwise merge all sub selections
          for (const [, subSelection] of Object.entries(
            nestedSelectedItems.value
          )) {
            if (Array.isArray(subSelection)) {
              newSelection = [...newSelection, ...subSelection];
            }
          }
        }

        selectedItems.value = newSelection ?? [];
      } else {
        selectedItems.value = event.data.selectedItems ?? [];
      }

      if (event.data.selectedAll != null) {
        selectedAll.value = event.data.selectedAll;
      }
    };

    watch(selectedItems, (newSelection) => {
      emit('selectionChanged', newSelection);
    });

    watch(nestedSelectedItems, (newNestedSelection) => {
      emit('nestedSelectionChanged', newNestedSelection);
    });

    watch(selectedAll, (newSelectedAll) => {
      emit('selectedAllChanged', newSelectedAll);
    });

    return {
      ajv,
      i18n,
      onChange,

      // Freeze renderers for better performance
      mergedRenderers: Object.freeze(
        mergedRenderers
      ) as JsonFormsRendererRegistryEntry[],

      data: {
        request: props.request,
        scrollPosition: props.scrollPosition,
        additionalData: props.additionalData,
        connection: props.connection,
      },

      mergedUischema,
      selectedItems,
      nestedSelectedItems,
    };
  },
});
</script>

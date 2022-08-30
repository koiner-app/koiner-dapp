<template>
  <q-list
    v-if="control.visible"
    class="enum-array"
  >
    <q-item
      v-for="(o, index) in control.options"
      :key="control.id + `-input-${index}-item`"
      v-ripple="!isDisabled(o.value)"
      tag="label"
      :disabled="isDisabled(o.value) ? 'disabled' : undefined"
    >
      <q-item-section avatar>
        <q-checkbox
          :id="control.id + `-input-${index}`"
          v-model="control.data"
          :val="o.value"
          :path="composePaths(control.path, `${index}`)"
          :indeterminate="control.data === undefined"
          :disabled="isDisabled(o.value) ? 'disabled' : undefined"
          :error-messages="control.errors"
          @click="() => !isDisabled(o.value) ? toggle(o.value, dataHasEnum(o.value)) : undefined"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ t(o.label + '.label') }}
        </q-item-label>
        <q-item-label
          v-if="hasDescription(o.label)"
          caption
        >
          {{ t(o.label + '.description') }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import {
  and,
  ControlElement,
  hasType,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  mapDispatchToMultiEnumProps,
  mapStateToMultiEnumControlProps,
  rankWith,
  schemaMatches,
  schemaSubPathMatches,
  uiTypeIs,
  composePaths,
  getI18nKeyPrefix,
} from '@jsonforms/core';
import {
  rendererProps,
  RendererProps,
  useControl,
  ControlProps,
} from '@jsonforms/vue';
import { defineComponent } from 'vue';
import { useQuasarBasicControl } from '../util';
import { useI18n } from 'vue-i18n';

//TODO: move into JsonForm Vue project under src/components/jsonFormsCompositions.ts
const useJsonFormsMultiEnumControl = (props: ControlProps) => {
  return useControl(
    props,
    mapStateToMultiEnumControlProps,
    mapDispatchToMultiEnumProps
  );
};

const controlRenderer = defineComponent({
  name: 'EnumArrayRenderer',
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const { t } = useI18n();

    return {
      ...useQuasarBasicControl(useJsonFormsMultiEnumControl(props)),
      t,
    };
  },
  computed: {
    getI18nPrefix(): string {
      return getI18nKeyPrefix(this.control.schema, this.control.uischema, this.control.path);
    }
  },
  methods: {
    dataHasEnum(value: any): boolean {
      return !!this.control.data?.includes(value);
    },
    isDisabled(value: string): boolean {
      return this.control.uischema.options?.disabled?.includes(value)
    },
    hasDescription(label: string): boolean {
      const translation = this.t(label + '.description');

      // If translation still includes the prefix there is no translation
      return !translation.includes(this.getI18nPrefix);
    },
    composePaths,
    toggle(value: any, add: boolean) {
      if (add) {
        this.addItem(this.control.path, value);
      } else {
        this.removeItem?.(this.control.path, value);
      }
    },
  },
});

export default controlRenderer;

</script>

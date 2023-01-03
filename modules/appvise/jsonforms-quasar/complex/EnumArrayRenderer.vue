<template>
  <label
    :for="control.id + '-input'"
    class="q-field row no-wrap items-start q-field--standard q-input q-field--float q-field--labeled q-field--with-bottom input relative-position"
  >
    <span class="enum-array-label" v-html="computedHtmlLabel"></span>
    <q-list v-if="control.visible" class="enum-array">
      <q-item
        v-for="(o, index) in control.options"
        :key="control.id + `-input-${index}-item`"
        v-ripple="!optionIsDisabled(o.value)"
        tag="label"
        :disabled="optionIsDisabled(o.value) ? 'disabled' : undefined"
      >
        <q-item-section avatar>
          <q-checkbox
            :id="control.id + `-input-${index}`"
            v-model="control.data"
            :val="o.value"
            :path="composePaths(control.path, `${index}`)"
            :indeterminate="control.data === undefined"
            :disabled="optionIsDisabled(o.value) ? 'disabled' : undefined"
            :error-messages="control.errors"
            @click="
              () =>
                !optionIsDisabled(o.value)
                  ? toggle(o.value, dataHasEnum(o.value))
                  : undefined
            "
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ t(o.label + '.label', '') }}
          </q-item-label>
          <q-item-label v-if="hasDescription(o.label)" caption>
            {{ t(o.label + '.description', '') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </label>
</template>

<script lang="ts">
import {
  ControlElement,
  composePaths,
  getI18nKeyPrefix,
} from '@jsonforms/core';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import { defineComponent } from 'vue';
import { useJsonFormsMultiEnumControl, useQuasarBasicControl } from '../util';
import { useI18n } from 'vue-i18n';

export default defineComponent({
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
      return getI18nKeyPrefix(
        this.control.schema,
        this.control.uischema,
        this.control.path
      );
    },
  },
  methods: {
    dataHasEnum(value: any): boolean {
      return !!this.control.data?.includes(value);
    },
    optionIsDisabled(value: string): boolean {
      return this.control.uischema.options?.disabled?.includes(value);
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
</script>

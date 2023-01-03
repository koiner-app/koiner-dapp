<template>
  <q-item-section :class="styles.arrayList.item">
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </q-item-section>

  <q-item-section side top>
    <div @click="expandClicked" :class="toolbarClasses">
      <div :class="styles.arrayList.itemLabel">{{ label }}</div>
      <q-btn
        flat
        v-if="showSortButtons"
        @click="moveUpClicked"
        :disabled="!moveUpEnabled"
        :icon="matArrowUpward"
        :class="styles.arrayList.itemMoveUp"
        :ripple="false"
      />
      <q-btn
        v-if="showSortButtons"
        flat
        :icon="matArrowDownward"
        @click="moveDownClicked"
        :disabled="!moveDownEnabled"
        :class="styles.arrayList.itemMoveDown"
        :ripple="false"
      />
      <q-btn
        flat
        :icon="matRemove"
        @click="deleteClicked"
        :disabled="!deleteEnabled"
        :class="styles.arrayList.itemDelete"
        :ripple="false"
      />
    </div>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { classes, Styles } from '../styles';
import {
  matArrowDownward,
  matArrowUpward,
  matRemove,
} from '@quasar/extras/material-icons';

export default defineComponent({
  name: 'array-list-element',
  props: {
    initiallyExpanded: {
      required: false,
      type: Boolean,
      default: false,
    },
    label: {
      required: false,
      type: String,
      default: '',
    },
    showSortButtons: {
      required: false,
      type: Boolean,
      default: false,
    },
    moveUpEnabled: {
      required: false,
      type: Boolean,
      default: true,
    },
    moveDownEnabled: {
      required: false,
      type: Boolean,
      default: true,
    },
    moveUp: {
      required: false,
      type: Function,
      default: undefined,
    },
    moveDown: {
      required: false,
      type: Function,
      default: undefined,
    },
    delete: {
      required: false,
      type: Function,
      default: undefined,
    },
    deleteEnabled: {
      required: false,
      type: Boolean,
      default: true,
    },
    styles: {
      required: true,
      type: Object as PropType<Styles>,
    },
  },
  data() {
    return {
      expanded: this.initiallyExpanded,
      matArrowDownward,
      matArrowUpward,
      matRemove,
    };
  },
  computed: {
    contentClasses(): string {
      return classes`${this.styles.arrayList.itemContent} ${
        this.expanded && this.styles.arrayList.itemExpanded
      }`;
    },
    toolbarClasses(): string {
      return classes`${this.styles.arrayList.itemToolbar} ${
        this.expanded && this.styles.arrayList.itemExpanded
      }`;
    },
  },
  methods: {
    expandClicked(): void {
      this.expanded = !this.expanded;
    },
    moveUpClicked(event: Event): void {
      event.stopPropagation();
      this.moveUp?.();
    },
    moveDownClicked(event: Event): void {
      event.stopPropagation();
      this.moveDown?.();
    },
    deleteClicked(event: Event): void {
      event.stopPropagation();
      this.delete?.();
    },
  },
});
</script>

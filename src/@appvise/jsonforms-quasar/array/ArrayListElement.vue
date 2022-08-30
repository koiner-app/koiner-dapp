<template>
  <q-item-section :class="styles.arrayList.item">
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </q-item-section>

  <q-item-section side top>
    <div @click="expandClicked" :class="toolbarClasses">
      <div :class="styles.arrayList.itemLabel">{{ label }}</div>

      <q-icon
        name="rapp:arrow-up"
        @click="moveUpClicked"
        :disabled="!moveUpEnabled"
        :class="styles.arrayList.itemMoveUp"
      />
      <q-icon
        name="rapp:arrow-down"
        @click="moveDownClicked"
        :disabled="!moveDownEnabled"
        :class="styles.arrayList.itemMoveDown"
      />
      <q-icon
        name="rapp:trash"
        @click="deleteClicked"
        :class="styles.arrayList.itemDelete"
      />
    </div>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { classes, Styles } from '../styles';

const listItem = defineComponent({
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
    styles: {
      required: true,
      type: Object as PropType<Styles>,
    },
  },
  data() {
    return {
      expanded: this.initiallyExpanded,
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

export default listItem;
</script>

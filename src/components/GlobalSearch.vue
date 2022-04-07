<template>
  <q-input
    dark
    dense
    standout
    v-model="text"
    input-class="text-right"
    class="q-ml-md global-search"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
    <template v-slot:append>
      <q-icon
        v-if="text !== ''"
        name="clear"
        class="cursor-pointer"
        @click="text = ''"
      />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {},

  setup() {
    return {
      text: ref(''),
    };
  },
});
</script>

<style lang="scss">
.global-search {
  position: fixed;
  top: 0.5rem;
  left: 50%;
  margin-left: -7.5rem;
  width: 15rem;

  .q-field__control {
    height: 1.75rem;
    color: #ffffff;
  }

  &.q-field--standout {
    border: 1px solid #000000 !important;

    &.q-field--dark.q-field--highlighted .q-field__control {
      background: rgba(255, 255, 255, 0);
      border: 1px solid lighten($primary, 20%) !important;
      transition: border ease-in 500ms 400ms;
      color: #ffffff !important;

      .q-field__input {
        color: #ffffff !important;
      }
    }
  }
}
</style>

<template>
  <q-input
    dark
    dense
    standout
    input-class="text-right"
    class="q-ml-md global-search"
    @click="dialog = true"
  >
    <template v-slot:prepend>
      <q-icon name="search" size="xs" style="margin-top: -8px" />
    </template>
  </q-input>

  <search-dialog :open-dialog="dialog" @closed="dialog = false" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SearchDialog from 'components/search-dialog.vue';

export default defineComponent({
  components: { SearchDialog },

  setup() {
    const dialog = ref(false);

    return {
      dialog,
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

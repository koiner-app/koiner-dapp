<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Nodes</div>
          <q-space />
        </div>

        <q-list bordered class="rounded-borders" style="max-width: 600px">
          <q-item-label header>Official</q-item-label>

          <q-item>
            <q-item-section avatar top>
              <q-icon name="account_tree" color="black" size="34px" />
            </q-item-section>

            <q-item-section top class="col-2 gt-sm">
              <q-item-label class="q-mt-sm">api.koinos.io</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label> 1.020.000 </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  color="green"
                  icon="done"
                />
              </div>
            </q-item-section>
          </q-item>

        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NetworkHealthPage',

  setup() {
    return {};
  },
});
</script>

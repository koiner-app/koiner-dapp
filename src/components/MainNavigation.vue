<template>
  <q-list padding>
    <q-item
      v-ripple
      v-for="menuItem in menuItems"
      :key="menuItem.name"
      :active="link === menuItem.to"
      :to="menuItem.to"
      clickable
    >
      <q-item-section avatar>
        <q-icon v-if="menuItem.icon != null" :name="menuItem.icon" />
        <q-item-label>{{ menuItem.name }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {},

  setup() {
    return {
      link: ref('/'),
      menuItems: [
        {
          name: 'Dashboard',
          to: '/dashboard',
          icon: 'dashboard',
        },
        {
          name: 'Chain',
          to: '/chain',
          icon: 'token',
        },
        {
          name: 'Tokens',
          to: '/tokens',
          icon: 'toll',
        },
        {
          name: 'Contracts',
          to: '/contracts',
          icon: 'document_scanner',
        },
        {
          name: 'Lockups',
          to: '/lockups',
          icon: 'lock',
        },
      ],
    };
  },
});
</script>

<style lang="scss">
.main-navigation {
  .q-toolbar__title {
    > img {
      max-width: 4.875rem;
      margin-top: 1.25rem;
    }
  }

  .q-list {
    overflow: hidden;

    .q-item {
      height: 2.5rem;
      margin: 4px 0;
      font-size: 0.875rem;
      color: #fff;

      .q-item__section--side {
        min-width: 2.5rem;
      }

      &.q-router-link--exact-active,
      &:hover {
        background: #4a60b2;
        border-radius: 4px;
      }
    }

    &.top-nav {
      margin-top: 3.125rem;
    }

    &.bottom-nav {
      position: absolute;
      bottom: 0.625rem;
      left: 1rem;
      right: 1rem;
    }
  }
}
</style>

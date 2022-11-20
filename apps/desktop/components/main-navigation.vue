<template>
  <q-list padding>
    <q-item
      v-ripple
      v-for="menuItem in menuItems"
      :key="menuItem.name"
      :active="isActive(menuItem.to)"
      :to="menuItem.to"
      clickable
      :disable="menuItem.disabled"
    >
      <q-item-section avatar>
        <q-icon v-if="menuItem.icon != null" :name="menuItem.icon" />
        <q-item-label>{{ menuItem.name }}</q-item-label>
      </q-item-section>
      <q-item-section>
        {{ menuItem.name }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {},

  setup() {
    const route = useRoute();
    const link = ref('/');
    const isActive = (to: string) => {
      // Home
      if (to === '/') {
        return to === link.value;
      }

      if (
        link.value !== '/' &&
        link.value.includes(to.replace('/overview', ''))
      ) {
        return true;
      }

      if (
        to === '/blocks' &&
        [
          '/transactions',
          '/events',
          '/operations',
          '/addresses',
          '/claims',
        ].includes(link.value)
      ) {
        return true;
      }

      if (to === '/tokenize' && link.value.includes('/tokens')) {
        return true;
      }
    };

    onMounted(() => {
      link.value = route.path;
    });

    watch(
      () => route.name,
      async () => {
        link.value = route.path;
      }
    );

    return {
      isActive,
      menuItems: [
        {
          name: 'Home',
          to: '/',
          icon: 'token',
          disabled: false,
        },
        {
          name: 'Dashboard',
          to: '/account',
          icon: 'dashboard',
          disabled: false,
        },
        {
          name: 'Chain',
          to: '/blocks',
          icon: 'token',
          disabled: false,
        },
        {
          name: 'Tokenize',
          to: '/tokenize',
          icon: 'toll',
          disabled: false,
        },
        {
          name: 'Contracts',
          to: '/contracts/overview',
          icon: 'document_scanner',
          disabled: false,
        },
        {
          name: 'Network',
          to: '/network',
          icon: 'hub',
          disabled: false,
        },
        {
          name: 'Governance',
          to: '/governance',
          icon: 'how_to_vote',
          disabled: true,
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

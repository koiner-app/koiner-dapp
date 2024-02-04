<template>
  <q-list padding>
    <q-item
      v-ripple
      v-for="menuItem in menuItems"
      :key="menuItem.name"
      :active="isActive(menuItem.to)"
      @click="
        isActive(menuItem.to)
          ? koinerStore.toggleMobileMenu()
          : $router.push(menuItem.to)
      "
      clickable
      :disable="menuItem.disabled"
    >
      <q-item-section avatar>
        <q-icon v-if="menuItem.icon != null" :name="menuItem.icon" />
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
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  setup() {
    const koinerStore = useKoinerStore();
    const route = useRoute();
    const link = ref('/mobile');
    const isActive = (to: string) => {
      // Home
      if (to === '/mobile') {
        return to === link.value;
      }

      if (link.value !== '/mobile' && link.value.includes(to)) {
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
      koinerStore,
      menuItems: [
        {
          name: 'Projects',
          to: '/mobile/ecosystem',
          icon: 'apps',
        },
        {
          name: 'Tokens',
          to: '/mobile/tokenize',
          icon: 'toll',
        },
        {
          name: 'Network',
          to: '/mobile/network',
          icon: 'hub',
        },
        {
          name: 'Contracts',
          to: '/mobile/contracts',
          icon: 'document_scanner',
        },
        {
          name: 'Transactions',
          to: '/mobile/transactions',
          icon: 'receipt',
        },
        {
          name: 'Addresses',
          to: '/mobile/addresses',
          icon: 'wallet',
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

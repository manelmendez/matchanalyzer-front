<template>
  <Menu :model="items" class="app-menu !p-8">
    <template #item="{ item, props }">
      <a v-ripple class="flex items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        <span
          v-if="item.shortcut"
          class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
          >{{ item.shortcut }}</span
        >
      </a>
    </template>
    <template #end>
      <button
        v-ripple
        class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200"
      >
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          class="mr-2"
          shape="circle"
        />
        <span class="inline-flex flex-col items-start">
          <span class="font-bold">Amy Elsner</span>
          <span class="text-sm">Admin</span>
        </span>
      </button>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'Documents',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
        shortcut: '⌘+N',
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        shortcut: '⌘+S',
      },
    ],
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O',
      },
      {
        label: 'Messages',
        icon: 'pi pi-inbox',
        badge: 2,
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        shortcut: '⌘+Q',
      },
    ],
  },
  {
    separator: true,
  },
])
</script>

<style>
.app-menu {
  position: fixed;
  z-index: 997;
  left: 0;
  top: 0;
  height: 100%;
  margin-top: 4rem;
}
</style>

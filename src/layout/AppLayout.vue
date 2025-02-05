<script setup lang="ts">
import AppToolbar from '@/layout/AppToolbar.vue'
import AppSidebar from '@/layout/AppSidebar.vue'
import { computed } from "vue";
import { useRootStore } from "@/stores/store";
const rootStore = useRootStore()
const displayMenu = computed(() => rootStore.displayMenu)
</script>

<template>
  <div class="app-layout grid grid-cols-[14em_1fr] max-sm:grid-cols-1" :style="displayMenu ? '' : 'grid-template-columns: 1fr'">
    <AppToolbar />
    <AppSidebar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  margin: 0 auto;
  padding: 6em 2em 2em 2em;
  font-weight: normal;
  gap: 2em;
}
</style>
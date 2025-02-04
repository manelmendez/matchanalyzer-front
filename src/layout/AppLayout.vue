<script setup lang="ts">
import AppToolbar from '@/layout/AppToolbar.vue'
import AppSidebar from '@/layout/AppSidebar.vue'
</script>

<template>
  <div class="app-layout">
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
  display: grid;
  grid-template-columns: 14em 1fr;
  gap: 2em;
}
</style>
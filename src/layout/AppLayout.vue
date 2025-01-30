<script setup lang="ts">
import AppToolbar from '@/layout/AppToolbar.vue'
import AppSidebar from '@/layout/AppSidebar.vue'
</script>

<template>
  <AppToolbar />
  <AppSidebar />
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
</style>
<script setup lang="ts">
import Sidebar from './SideBar.vue'
import Topbar from './AppTopBar.vue'
import Toast from 'primevue/toast'
</script>

<template>
  <div class="layout-wrapper">
    <Topbar></Topbar>
    <Sidebar></Sidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
  <Toast />
</template>

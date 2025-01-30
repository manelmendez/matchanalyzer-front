<script setup lang="ts">
import { ref } from 'vue'

function toggleDarkMode() {
  document.documentElement.classList.toggle('my-app-dark')
}

const isDarkTheme = ref(false)

</script>

<template>
  <Toolbar>
      <template #start>
        <Button icon="pi pi-bars" class="mr-2" severity="secondary" text />
        <span>MATCHANALYZER</span>
      </template>

      <template #center>
      </template>

      <template #end>
        <!-- <Button label="Toggle Dark Mode" @click="toggleDarkMode()" /> -->
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
        </button>
      </template>
    </Toolbar>
</template>

<style scoped>
.p-toolbar {
  position: fixed;
  height: 4rem;
  z-index: 997;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 2rem;
  border: none;
  border-radius: 0;   
  display: flex;
  align-items: center;
}
</style>
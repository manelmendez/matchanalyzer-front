<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  { label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/about' },
  { label: 'Mis Equipos', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
  { label: 'Mis competiciones', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
  { label: 'Planificación', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
]);
</script>

<template>
  <Menu :model="items" />
</template>

<style>
.p-menu {
  position: fixed;
  z-index: 997;
  left: 2em;
  top: 6em;
  border: none;
  height: calc(100vh - 8rem);
  overflow-y: auto;
  padding: .5rem 1rem;
  border-radius: 0.75em;
}

.p-menu ul a {
  display: flex;
  align-items: center;
  position: relative;
  outline: 0 none;
  color: var(--text-color);
  cursor: pointer;
  padding: .75rem 1rem;
  border-radius: var(--content-border-radius);
  transition: background-color var(--element-transition-duration), box-shadow var(--element-transition-duration);
}

.p-menu ul a.active-route {
  font-weight: 700;
  color: var(--primary-color);
}
</style>
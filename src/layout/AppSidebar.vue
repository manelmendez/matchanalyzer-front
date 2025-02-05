<template>
  <Menu :model="items" class="sidebar-menu max-sm:!h-min max-sm:w-full max-sm:mx-auto" :style="displayMenu ? '' : 'display:none'" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useRootStore } from "@/stores/store";
const router = useRouter();
const rootStore = useRootStore()
const displayMenu = computed(() => rootStore.displayMenu)

const items = ref([
  { label: 'Inicio', icon: 'pi pi-fw pi-home', command: () => {router.push('/')}},
  { label: 'Mis Equipos', icon: 'pi pi-fw pi-id-card', command: () => {router.push('/teams')}},
  { label: 'Mis competiciones', icon: 'pi pi-fw pi-check-square', command: () => {router.push('/competitions')}},
  { label: 'Planificación', icon: 'pi pi-fw pi-calendar', command: () => {router.push('/planification')}},
]);
</script>

<style>
.p-menu.sidebar-menu {
  border: none;
  height: calc(100vh - 8rem);
  overflow-y: auto;
  padding: .5rem .5rem;
  border-radius: 0.75em;
  width: max-content;
}

.p-menu.sidebar-menu ul a {
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

.p-menu.sidebar-menu ul a.active-route {
  font-weight: 700;
  color: var(--primary-color);
}
</style>
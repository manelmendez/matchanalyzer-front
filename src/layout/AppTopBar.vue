<template>
  <div class="card">
    <Toolbar>
      <template #start>
        <Button icon="pi pi-plus" class="mr-2" severity="secondary" text />
        <Button icon="pi pi-print" class="mr-2" severity="secondary" text />
        <Button icon="pi pi-upload" severity="secondary" text />
      </template>

      <template #center>
        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText placeholder="Search" />
        </IconField>
      </template>

      <template #end>
        <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
        <SplitButton label="Save" :model="items"></SplitButton
      ></template>
    </Toolbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

function toggleDarkMode() {
  document.documentElement.classList.toggle('my-app-dark')
}

const items = ref([
  {
    label: 'Update',
    icon: 'pi pi-refresh',
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
  },
])
</script>

<style scoped>
.p-toolbar {
  position: fixed;
  height: 4rem;
  z-index: 997;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 2rem;
}
</style>

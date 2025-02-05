<script setup lang="ts">
import { computed, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useRootStore } from './stores/store';
import { useToast } from "primevue/usetoast";
const toast = useToast();
const rootStore = useRootStore()
const toastVal = computed(()=> rootStore.toast)
watch(() => toastVal.value, newValue => {
  toast.add({
    severity: newValue.severity as "error" | "info" | "secondary" | "success" | "warn" | "contrast" | undefined,
    summary: newValue.summary,
    detail: newValue.detail,
    life: newValue.life
  })
})
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style scoped>
</style>

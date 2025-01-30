import { defineStore } from 'pinia'
// import { rootMutations } from '../mutations/rootMutations.ts'

export const useRootStore = defineStore('root', {
  state: () => ({
    toast: { severity: 'success', summary: 'Logueado correctamente', life: 3000 },
    theme: window.localStorage.getItem('theme')
  }),
  getters: {
  },
  actions: {
    // ...rootMutations
  }
})

import { defineStore } from 'pinia'
// import { rootMutations } from '../mutations/rootMutations.ts'

export const useRootStore = defineStore('root', {
  state: () => ({
    toast: { severity: '', summary: '', detail: '', life: 3000 },
    theme: window.localStorage.getItem('theme'),
    displayMenu: true
  }),
  getters: {
  },
  actions: {
    toggleMenu() {
      console.log(this.displayMenu)
      this.displayMenu = !this.displayMenu
    }
  }
})

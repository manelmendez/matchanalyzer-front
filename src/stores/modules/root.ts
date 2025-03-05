import { defineStore } from "pinia";
// import { rootMutations } from '../mutations/rootMutations.ts'

export const useRootStore = defineStore("root", {
  state: () => ({
    toast: { severity: "", summary: "", detail: "", life: 3000 },
    theme: "Emerald",
    isDark: false,
    displayMenu: true,
  }),
  getters: {},
  actions: {
    toggleMenu() {
      console.log(this.displayMenu);
      this.displayMenu = !this.displayMenu;
    },
    setDark(value: boolean) {
      this.isDark = value;
    },
  },
});

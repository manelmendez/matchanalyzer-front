<template>
  <Toolbar class="app-toolbar">
      <template #start>
        <Button icon="pi pi-bars" class="mr-2" severity="secondary" text @click="displayMenu"/>
        <span>MATCHANALYZER</span>
      </template>

      <template #center>
      </template>

      <template #end>
        <Button type="button" @click="toggleDarkMode" size="small" rounded variant="outlined" 
          :icon="iconSelect()" />
        <Avatar class="menu-avatar" :label="initials()" shape="circle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
          style="background-color: var(--p-primary-color); cursor: pointer;" />
        <Menu class="user-menu" ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
      </template>
    </Toolbar>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useUserStore, useRootStore } from '@/stores/store'
import { IUser } from '@/models/user';
import { onMounted } from 'vue';

export default {
  name: "AppToolbar",
  setup() {
    const isDarkTheme = ref(window.localStorage.getItem('dark') == "true" ? true : false)
    const userStore = useUserStore()
    const rootStore = useRootStore()
    const user = computed<IUser>(() => userStore.user)
    const menu = ref();
    const menuItems = ref([
      { label: "Perfil", command: () => { /* handle profile click */ } },
      { label: "Logout", command: () => { /* handle logout click */ } }
    ])

    const displayMenu = () => {
      rootStore.toggleMenu()
    }

    const toggle = (event:any) => {
      menu.value.toggle(event);
    };
    const toggleDarkMode = () => {
      document.documentElement.classList.toggle('my-app-dark')
      isDarkTheme.value = !isDarkTheme.value
      window.localStorage.setItem('dark', isDarkTheme.value.toString())
    }
    const initials = () => {
      let initials = ''
      let nameParts = [user.value.firstname, user.value.lastname]
      for (const namePart of nameParts) {
        if (namePart) {
          initials += namePart.charAt(0).toUpperCase()
        }
      }
      return initials
    }
    const iconSelect = () => {
      return isDarkTheme.value ? 'pi pi-moon' : 'pi pi-sun'
    }

    const setInitialTheme = () => {
      if(isDarkTheme.value) {
        document.documentElement.classList.toggle('my-app-dark')
      }
    }
    onMounted(() => {
      setInitialTheme()
    })

    return {
      isDarkTheme,
      toggleDarkMode,
      user,
      menuItems,
      menu,
      toggle,
      initials,
      iconSelect,
      displayMenu
    }
  }
}


</script>

<style>
.p-toolbar.app-toolbar {
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

.p-menu.user-menu {
  min-width: 8em;
}

.menu-avatar {
  margin: 0 1em 0 1em;
}
</style>
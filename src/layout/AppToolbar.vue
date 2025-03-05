<template>
  <Toolbar class="app-toolbar">
    <template #start>
      <Button
        icon="pi pi-bars"
        class="mr-2"
        severity="secondary"
        text
        @click="displayMenu"
      />
      <span class="cursor-pointer" @click="router.push('/')"
        >MATCHANALYZER</span
      >
    </template>

    <template #center> </template>

    <template #end>
      <Button
        type="button"
        @click="toggleTheme"
        size="small"
        rounded
        variant="outlined"
        icon="pi pi-palette"
      />
      <Menu
        class="theme-menu"
        ref="menuTheme"
        :model="menuThemeItems"
        :popup="true"
        pt:start="mb-4 grid justify-center"
      >
        <template #start>
          <Button
            type="button"
            @click="toggleDarkMode"
            size="small"
            rounded
            variant="outlined"
            :icon="iconSelect()"
          />
        </template>
        <template #item="{ item }">
          <Avatar
            label=""
            :style="'background-color:' + item.color"
            shape="circle"
            @click="changeTheme(item.label, item.preset)"
          />
        </template>
      </Menu>
      <Avatar
        class="menu-avatar"
        :label="initials()"
        shape="circle"
        @click="toggleUser"
        style="background-color: var(--p-primary-color); cursor: pointer"
      />
      <Menu
        class="user-menu"
        ref="menuUser"
        id="overlay_menu"
        :model="menuUserItems"
        :popup="true"
      />
    </template>
  </Toolbar>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useUserStore, useRootStore } from "@/stores/store";
import { IUser } from "@/models/user";
import { useRouter } from "vue-router";
import { usePreset, palette } from "@primevue/themes";
import {
  Emerald,
  Indigo,
  Red,
  Lime,
  Amber,
  Teal,
  Cyan,
  Sky,
  Stone,
} from "@/assets/themes";

export default {
  name: "AppToolbar",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const rootStore = useRootStore();
    const user = computed<IUser>(() => userStore.user);
    const isDarkTheme = computed(() => rootStore.isDark);
    const menuUser = ref();
    const menuTheme = ref();
    const menuUserItems = ref([
      {
        label: "Perfil",
        command: () => {
          /* handle profile click */
        },
      },
      {
        label: "Logout",
        command: () => {
          logout();
        },
      },
    ]);

    const menuThemeItems = ref([
      { label: "Emerald", color: "var(--p-emerald-500)", preset: Emerald },
      { label: "Indigo", color: "var(--p-indigo-500)", preset: Indigo },
      { label: "Red", color: "var(--p-red-500)", preset: Red },
      { label: "Lime", color: "var(--p-lime-500)", preset: Lime },
      { label: "Amber", color: "var(--p-amber-500)", preset: Amber },
      { label: "Teal", color: "var(--p-teal-500)", preset: Teal },
      { label: "Cyan", color: "var(--p-cyan-500)", preset: Cyan },
      { label: "Sky", color: "var(--p-sky-500)", preset: Sky },
      { label: "Stone", color: "var(--p-stone-500)", preset: Stone },
    ]);

    const displayMenu = () => {
      rootStore.toggleMenu();
    };
    const toggleUser = (event: any) => {
      menuUser.value.toggle(event);
    };
    const toggleTheme = (event: any) => {
      menuTheme.value.toggle(event);
    };
    const toggleDarkMode = () => {
      document.documentElement.classList.toggle("my-app-dark");
      rootStore.setDark(!isDarkTheme.value);
      window.localStorage.setItem("dark", isDarkTheme.value ? "true" : "false");
    };
    const changeTheme = (name: any, preset: any) => {
      usePreset(preset);
      window.localStorage.setItem("theme", name);
    };
    const initials = () => {
      let initials = "";
      let nameParts = [user.value.firstname, user.value.lastname];
      for (const namePart of nameParts) {
        if (namePart) {
          initials += namePart.charAt(0).toUpperCase();
        }
      }
      return initials;
    };
    const iconSelect = () => {
      return isDarkTheme.value ? "pi pi-moon" : "pi pi-sun";
    };

    const logout = () => {
      window.localStorage.removeItem("authUser");
      userStore.signOut;
      let toast = {
        severity: "success",
        summary: "Ha cerrado sesión",
        detail: "",
        life: 3000,
      };
      rootStore.toast = toast;
      router.push("/login");
    };

    return {
      isDarkTheme,
      toggleDarkMode,
      user,
      menuUserItems,
      menuThemeItems,
      menuUser,
      menuTheme,
      toggleUser,
      toggleTheme,
      initials,
      iconSelect,
      displayMenu,
      router,
      changeTheme,
    };
  },
};
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
.p-menu.theme-menu {
  min-width: 3em;
  align-items: center;
  padding: 1em;
}
.theme-menu .p-menu-item {
  align-items: center;
  cursor: pointer;
  padding: 2px;
}

.theme-menu .p-menu-item-content:hover {
  background-color: transparent;
}

.theme-menu .p-menu-item-content:focus {
  background-color: transparent;
}

.menu-avatar {
  margin: 0 1em 0 1em;
}
</style>

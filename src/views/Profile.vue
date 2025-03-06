<template>
  <div class="grid justify-items-center w-full h-full gap-8">
    <Avatar
      class="h-40 w-40 text-6xl"
      :label="initials()"
      shape="circle"
      style="background-color: var(--p-primary-color)"
    />
    <Card class="w-120 max-md:w-90">
      <template #content>
        <div class="grid grid-cols py-2">
          <p class="text-md !font-bold">Nombre:</p>
          <p>{{ user.firstname + " " + user.lastname }}</p>
        </div>
        <div class="grid grid-cols py-2">
          <p class="text-md !font-bold">Email:</p>
          <p>{{ user.email }}</p>
        </div>
        <div class="grid grid-cols py-2">
          <p class="text-md !font-bold">Rol:</p>
          <p>{{ user.role }}</p>
        </div>
        <div class="grid grid-cols py-2">
          <p class="text-md !font-bold">Fecha de registro:</p>
          <p>{{ user.signupDate }}</p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/store";
import { computed } from "vue";

export default {
  name: "Profile",
  setup() {
    const userStore = useUserStore();
    const user = computed(() => userStore.user);
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
    return {
      user,
      initials,
    };
  },
};
</script>

<style scoped></style>

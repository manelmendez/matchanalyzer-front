<template>
  <Menu :model="myTeams" class="teams-menu">
    <template #item="{ item }">
      <div class="item" @click="router.push({name: 'teams-id', params: {id: item.id}})">
        <a v-ripple class="flex items-center">
          <!-- <span :class="item.icon" /> -->
          <Image style="margin-right: 1em;" :src="constants.ADDRESS + item.avatar"
            @error="item.avatar = constants.DEFAULT_TEAM_URL" width="30"/>
          <span>{{ item.name }}</span>
          <div style="margin-left: auto;">
            <span class="pi pi-pencil" style="margin-right: 1em; color:dodgerblue" />
            <span class="pi pi-trash" style="color: darkred" />
          </div>
        </a>
      </div>
    </template>
  </Menu>
</template>
<script lang="ts">
import { useTeamStore, useUserStore } from '@/stores/store';
import { useRouter } from 'vue-router';
import { computed, ComputedRef } from 'vue';
import { ITeam } from '@/models/team';
import { onMounted } from 'vue';
import constants from '@/assets/constants/constants';

export default {
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const teamStore = useTeamStore()
    
    const user = computed(() => userStore.user)
    const myTeams: ComputedRef<ITeam[]> = computed(() => teamStore.myTeams)

    const getInitialData = async () => {
      await teamStore.getUserTeams(Number(user.value.id))
    }

    onMounted(() => {
      getInitialData()
    })

    return {
      user,
      myTeams,
      constants,
      router
    }
  }
}
</script>
<style>
.p-menu.teams-menu {
  z-index: 997;
  border: none;
  width: calc(145vh - 1rem);
  overflow-y: auto;
  padding: .5rem 1rem;
  border-radius: 0.75em;
}

.p-menu.teams-menu ul a {
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

.p-menu.teams-menu ul a.active-route {
  font-weight: 700;
  color: var(--primary-color);
}
</style>
<template>
  <div>
    <Menu :model="myTeams" class="teams-menu">
      <template #item="{ item }">
        <div class="item" @click="router.push({ name: 'teams-id', params: { id: item.id } })">
          <a v-ripple class="flex items-center">
            <!-- <span :class="item.icon" /> -->
            <Image
              style="margin-right: 1em"
              :src="constants.ADDRESS + item.avatar"
              @error="item.avatar = constants.DEFAULT_TEAM_URL"
              width="30"
            />
            <span>{{ item.name }}</span>
            <div style="margin-left: auto">
              <Button
                icon="pi pi-pencil"
                severity="info"
                variant="text"
                rounded
                @click.stop=";(updatingTeam = item), (dialog = true)"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                variant="text"
                rounded
                @click.stop=";(deletingTeam = item.id), (deleteDialog = true)"
              />
            </div>
          </a>
        </div>
      </template>
    </Menu>
    <div class="center-h" style="margin-top: 2em">
      <Button icon="pi pi-plus" rounded @click="dialog = true" />
    </div>
  </div>
  <CreateOrEditTeam
    v-if="dialog"
    :myTeam="true"
    :team="updatingTeam ? updatingTeam : null"
    :show="dialog"
    @confirm="createOrUpdateTeamFunction"
    @close=";(dialog = false), (updatingTeam = null)"
  ></CreateOrEditTeam>
  <DeleteDialog
    v-if="deleteDialog"
    :show="deleteDialog"
    type="team"
    @close=";(deleteDialog = false), (deletingTeam = null)"
    @delete="deleteTeamFunction"
  >
  </DeleteDialog>
</template>

<script lang="ts">
import { useTeamStore, useUserStore } from '@/stores/store'
import { useRouter } from 'vue-router'
import { computed, ComputedRef, ref } from 'vue'
import { ITeam } from '@/models/team'
import { onMounted } from 'vue'
import constants from '@/assets/constants/constants'
import DeleteDialog from '@/components/dialogs/DeleteDialog.vue'

export default {
  setup() {
    const deleteDialog = ref(false)
    const deletingTeam = ref(null)
    const dialog = ref(false)
    const updatingTeam = ref(null)
    const router = useRouter()
    const userStore = useUserStore()
    const teamStore = useTeamStore()

    const user = computed(() => userStore.user)
    const myTeams: ComputedRef<ITeam[]> = computed(() => teamStore.myTeams)

    const createOrUpdateTeamFunction = () => {
      dialog.value = false
    }

    const deleteTeamFunction = () => {
      teamStore
        .deleteTeam(Number(deletingTeam.value))
        .then(() => {
          deleteDialog.value = false
        })
        .catch(() => {
          deleteDialog.value = false
        })
    }

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
      router,
      deleteDialog,
      deletingTeam,
      deleteTeamFunction,
      dialog,
      updatingTeam,
      createOrUpdateTeamFunction
    }
  }
}
</script>
<style>
.p-menu.teams-menu {
  z-index: 997;
  border: none;
  overflow-y: auto;
  padding: 0.5rem 1rem;
  border-radius: 0.75em;
  height: fit-content;
}

.p-menu.teams-menu ul a {
  display: flex;
  align-items: center;
  position: relative;
  outline: 0 none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: var(--content-border-radius);
  transition: background-color var(--element-transition-duration), box-shadow var(--element-transition-duration);
}

.p-menu.teams-menu ul a.active-route {
  font-weight: 700;
  color: var(--primary-color);
}
</style>

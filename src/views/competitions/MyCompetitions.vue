<template>
  <div>
    <Menu :model="myCompetitions" class="competition-menu">
      <template #item="{ item }">
        <div class="item" @click="router.push({name: 'summary', params: {id: item.id, roundId: 'latest'}})">
          <a v-ripple class="flex items-center">
            <span>{{ item.name }}</span>
            <div style="margin-left: auto;">
              <Button icon="pi pi-pencil" severity="info" variant="text" rounded @click.stop="updatingCompetition = item.id,dialog = true"/>
              <Button icon="pi pi-trash" severity="danger" variant="text" rounded @click.stop="deletingCompetition = item.id,deleteDialog = true"/>
            </div>
          </a>
        </div>
      </template>
    </Menu>
    <div class="center-h" style="margin-top: 2em;">
      <Button icon="pi pi-plus" rounded @click="dialog = true" />
    </div>
  </div>
  <CreateOrEditCompetition
    v-if="dialog"
    :team="updatingCompetition ? updatingCompetition : null"
    :show="dialog"
    @confirm="createOrUpdateCompetitionFunction"
    @close="dialog = false, updatingCompetition = null"
  ></CreateOrEditCompetition>
  <DeleteDialog v-if="deleteDialog"
    :show="deleteDialog"
    type="competition"
    @close="deleteDialog = false, deletingCompetition = null"
    @delete="deleteCompetitionFunction">
  </DeleteDialog> 
</template>

<script lang="ts">
import { useCompetitionStore, useUserStore } from '@/stores/store';
import { useRouter } from 'vue-router';
import { computed, ComputedRef, ref } from 'vue';
import { ICompetition } from '@/models/competition';
import { onMounted } from 'vue';
import constants from '@/assets/constants/constants';
import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';

export default {
  setup() {
    const deleteDialog = ref(false)
    const deletingCompetition = ref(null)
    const dialog = ref(false)
    const updatingCompetition = ref(null)
    const router = useRouter()
    const userStore = useUserStore()
    const competitionStore = useCompetitionStore()
    
    const user = computed(() => userStore.user)
    const myCompetitions: ComputedRef<ICompetition[]> = computed(() => competitionStore.competitions)

    const createOrUpdateCompetitionFunction = () => {
      dialog.value = false
    }

    const deleteCompetitionFunction = () => {
      competitionStore.deleteCompetition(deletingCompetition.value)
        .then(() => {
          deleteDialog.value = false
        })
        .catch(() => {
          deleteDialog.value = false
        })
    }

    const getInitialData = async () => {
      await competitionStore.getUserCompetitions(Number(user.value.id))
    }

    onMounted(() => {
      getInitialData()
    })

    return {
      user,
      myCompetitions,
      constants,
      router,
      deleteDialog,
      deletingCompetition,
      deleteCompetitionFunction,
      dialog,
      updatingCompetition,
      createOrUpdateCompetitionFunction
    }
  }
}
</script>
<style>
.p-menu.competition-menu {
  z-index: 997;
  border: none;
  overflow-y: auto;
  padding: .5rem 1rem;
  border-radius: 0.75em;
  height: fit-content;
}

.p-menu.competition-menu ul a {
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

.p-menu.competition-menu ul a.active-route {
  font-weight: 700;
  color: var(--primary-color);
}
</style>
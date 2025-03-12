<template>
  <div class="grid gap-8">
    <div v-if="rounds.length == 0">
      <Card class="no-data">
        <template #content>
          Aun no hay ninguna jornada disputada
          <br />
        </template>
      </Card>
    </div>
    <Card v-else>
      <template #content>
        <div class="grid grid-cols-1 max-md:justify-items-center md:grid-cols-2 gap-2">
          <Select
            @change="roundChange"
            v-model="round"
            :options="rounds"
            optionLabel="name"
            placeholder="Selecciona ronda"
            size="small"
            class="w-42"
          />
          <div class="flex md:justify-end gap-4 items-center">
            <div>
              <Button
                label="Anterior"
                icon="pi pi-angle-double-left"
                iconPos="left"
                @click="previousRound"
                size="small"
              />
            </div>
            <div>
              <Button
                label="Siguiente"
                icon="pi pi-angle-double-right"
                iconPos="right"
                @click="nextRound"
                size="small"
                :disabled="(round ? round.id : null) == (rounds && rounds.length ? rounds[rounds.length - 1].id : null)"
              />
            </div>
          </div>
        </div>
      </template>
    </Card>
    <div class="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-4" v-if="round">
      <div>
        <TopScorers v-if="topScorers.length != 0" :topScorers="topScorers"></TopScorers>
      </div>
      <div>
        <MostTrashed v-if="mostTrashed.length != 0" :mostTrashed="mostTrashed"></MostTrashed>
      </div>
      <div>
        <TopDifference v-if="topDifference.length != 0" :topDifference="topDifference"></TopDifference>
      </div>
    </div>
    <div>
      <div class="grid grid-cols-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-2">
        <Card
          v-for="team in competition?.teams"
          class="teamCard h-full"
          @click="router.push(`/competitions/${competition?.id}/team/${team.id}`)"
        >
          <template #content>
            <i v-if="team.managerId" class="material-icons absolute text-yellow-300"> star </i>
            <div class="grid justify-center">
              <Image
                :src="constants.ADDRESS + team.avatar"
                @error="team.avatar = constants.DEFAULT_TEAM_URL"
                width="90"
              />
            </div>
            <div class="text-center">{{ team.name }}</div>
          </template>
          <template #footer>
            <div class="flex justify-end">
              <Button icon="pi pi-pencil" severity="info" variant="text" rounded />
              <Button icon="pi pi-trash" severity="danger" variant="text" rounded />
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="center-h h-20" style="margin-top: 2em">
      <Button icon="pi pi-plus" rounded size="large" />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useCompetitionStore, useUserStore } from '@/stores/store'
import { computed } from 'vue'
import constants from '@/assets/constants/constants'
import TopScorers from '@/components/competitions/summary/TopScorers.vue'
import MostTrashed from '@/components/competitions/summary/MostTrashed.vue'
import TopDifference from '@/components/competitions/summary/TopDifference.vue'
import { onMounted } from 'vue'

export default {
  components: {
    TopScorers,
    MostTrashed,
    TopDifference
  },
  setup() {
    const userStore = useUserStore()
    const competitionStore = useCompetitionStore()
    const router = useRouter()

    const user = computed(() => userStore.user)
    const competition = computed(() => competitionStore.competitionById(Number(router.currentRoute.value.params.id)))
    const rounds = computed(() => competitionStore.rounds)
    const round = computed(() => competitionStore.round(router.currentRoute.value.params.roundId))
    const topScorers = computed(() => competitionStore.topScorers(router.currentRoute.value.params.roundId))
    const mostTrashed = computed(() => competitionStore.mostTrashed(router.currentRoute.value.params.roundId))
    const topDifference = computed(() => competitionStore.topDifference(router.currentRoute.value.params.roundId))

    const roundChange = (originalEvent: any) => {
      //coger el numero de round y ponerlo en selectedRound
      let str = originalEvent.value.name
      let res = str.split(' ')
      competitionStore.selectedRound = Number(res[1])
      router.push({
        name: 'summary',
        params: {
          id: Number(router.currentRoute.value.params.id),
          roundId: res[1]
        }
      })
    }
    const previousRound = () => {
      const actualRound =
        router.currentRoute.value.params.roundId == 'latest'
          ? rounds.value?.length
          : router.currentRoute.value.params.roundId
      competitionStore.selectedRound = Number(actualRound) - 1
      router.push({
        name: 'summary',
        params: {
          id: router.currentRoute.value.params.id,
          roundId: Number(actualRound) - 1
        }
      })
    }
    const nextRound = () => {
      const actualRound =
        router.currentRoute.value.params.roundId == 'latest'
          ? rounds.value?.length
          : router.currentRoute.value.params.roundId
      competitionStore.selectedRound = Number(actualRound) + 1
      router.push({
        name: 'summary',
        params: {
          id: router.currentRoute.value.params.id,
          roundId: Number(actualRound) + 1
        }
      })
    }

    const getInitialData = async () => {
      await competitionStore.getUserCompetitions(Number(user.value.id))
      if (competition.value) {
        await competitionStore.getCompetitionRounds(Number(competition.value.id))
      }
    }
    onMounted(() => {
      getInitialData()
    })

    return {
      competition,
      rounds,
      round,
      roundChange,
      previousRound,
      nextRound,
      topScorers,
      mostTrashed,
      topDifference,
      constants,
      router
    }
  }
}
</script>

<style>
.no-teams {
  width: 100%;
}
.teamCard {
  cursor: pointer;
}
.teamCard .p-card-body {
  min-height: 100%;
  justify-content: space-between;
}
</style>

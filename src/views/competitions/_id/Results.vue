<template>
  <div class="grid gap-8">
    <Card>
      <template #content>
        <div class="grid grid-cols-2 gap-2">
          <Select @change="roundChange" v-model="round" :options="rounds" optionLabel="name" placeholder="Selecciona una ronda" class="w-35" />
          <div class="flex justify-end gap-4 items-center">
            <div>
              <Button label="Anterior" icon="pi pi-angle-double-left" iconPos="left" @click="previousRound" size="small"/>
            </div>
            <div>
              <Button label="Siguiente" icon="pi pi-angle-double-right" iconPos="right" @click="nextRound" size="small"
              :disabled="(round ? round.id : null) == (rounds && rounds.length ? rounds[rounds.length - 1].id : null)" />
            </div>
          </div>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="grid gap-8">
          <RoundMatch
            v-if="round"
            v-for="match in round.matches"
            :key="match.id"
            :match="match"
          ></RoundMatch>
        </div>
      </template>
    </Card>
    <div class="center-h h-20" style="margin-top: 2em;">
      <Button icon="pi pi-plus" rounded size="large"/>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { useCompetitionStore, useUserStore } from '@/stores/store';
import { computed } from 'vue';
import constants from '@/assets/constants/constants';
import { onMounted } from 'vue';
import RoundMatch from '@/components/competitions/results/RoundMatch.vue';

export default {
  components: {
    RoundMatch
  },
  setup() {
    const userStore = useUserStore()
    const competitionStore = useCompetitionStore()
    const router = useRouter()

    const user = computed(() => userStore.user)
    const competition = computed(() => competitionStore.competitionById(Number(router.currentRoute.value.params.id)))
    const rounds = computed(() => competitionStore.rounds)
    const round = computed(() => competitionStore.round(router.currentRoute.value.params.roundId))

    const roundChange = (originalEvent: any) => {
      //coger el numero de round y ponerlo en selectedRound
      let str = originalEvent.value.name
      let res = str.split(' ')
      competitionStore.selectedRound = Number(res[1])
      router.push({
        name: 'results',
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
        name: 'results',
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
        name: 'results',
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
      constants
    }
  }
}
</script>

<style>
.no-teams {
  width: 100%;
}
</style>

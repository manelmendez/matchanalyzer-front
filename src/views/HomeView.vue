<template>
  <Card>
    <template #title>
      Equipos <Badge :value="myTeams.length" size="small" style="margin-left: 0.5em;" />
    </template>
    <template #content>
      <TeamCarousel></TeamCarousel>
    </template>
  </Card>
  <Card style="margin-top: 1em;">
    <template #title>
      Competiciones <Badge :value="competitions.length" size="small" style="margin-left: 0.5em;" />
    </template>
    <template #content>
      <CompetitionCarousel></CompetitionCarousel>
    </template>
  </Card>
</template>

<script lang="ts">
import { computed, onMounted, ComputedRef } from 'vue'
import { useUserStore, useTeamStore, useCompetitionStore } from '@/stores/store'
import TeamCarousel from '@/components/dashboard/TeamCarousel.vue'
import CompetitionCarousel from '@/components/dashboard/competitionCarousel.vue';
import { IUser } from '@/models/user';
import { ITeam } from '@/models/team';
import { ICompetition } from '@/models/competition';

export default {
  name: 'HomeView',
  components: {
    TeamCarousel,
    CompetitionCarousel
  },
  setup() {
    const userStore = useUserStore()
    const competitionStore = useCompetitionStore()
    const teamStore = useTeamStore()

    const user: ComputedRef<IUser> = computed(() => userStore.user)
    const myTeams: ComputedRef<ITeam[]> = computed(() => teamStore.myTeams)
    const competitions: ComputedRef<ICompetition[]> = computed(() => competitionStore.competitions)

    const getInitialData = async () => {
      await competitionStore.getUserCompetitions(Number(user.value.id))
      await teamStore.getUserTeams(Number(user.value.id))
      for (const team of myTeams.value) {
        if (team.id !== undefined && team.competitionId !== undefined) {
          await teamStore.getTeamStats(team.id, team.competitionId)
        }
      }
    }

    onMounted(() => {
      getInitialData()
    })

    return {
      user,
      myTeams,
      competitions,
      getInitialData
    }
  }
}
</script>
<style>
.p-card {
  box-shadow: none;
}

.p-card-title {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
}
</style>

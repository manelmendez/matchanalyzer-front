<template>
  <div class="grid row-auto gap-8">
    <div class="text-center">
      <Tag style="border: 2px solid var(--p-primary-color); color: var(--text-color)">
        <Image
          :src="constants.ADDRESS + avatar"
          @error="avatar = constants.DEFAULT_TEAM_URL"
          width="25"
          style="margin-right: 0.5em"
        />
        <span>{{ teamWithStats?.name }}</span>
      </Tag>
    </div>
    <div class="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <positionStats :statsPerRound="statsPerRound" />
      <matchStats :rankedTeams="rankedTeams" />
      <goalStats :rounds="rounds" />
    </div>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card>
        <template #title> Total </template>
        <template #content>
          <p>- Goles a favor por partido: {{ totalStats.goalAverage }}</p>
          <p>- Goles recibidos por partido: {{ totalStats.againstGoalAverage }}</p>
          <p>- Partidos con la porteria a 0: {{ totalStats.zeroGoals }}</p>
        </template>
      </Card>
      <Card>
        <template #title> Local </template>
        <template #content>
          <p>- Goles a favor por partido: {{ totalStats.localGoalAverage }}</p>
          <p>- Goles recibidos por partido: {{ totalStats.localAgainstGoalAverage }}</p>
          <p>- Partidos con la porteria a 0: {{ totalStats.localZeroGoals }}</p>
        </template>
      </Card>
      <Card>
        <template #title> Visitante </template>
        <template #content>
          <p>- Goles a favor por partido: {{ totalStats.awayGoalAverage }}</p>
          <p>- Goles recibidos por partido: {{ totalStats.awayAgainstGoalAverage }}</p>
          <p>- Partidos con la porteria a 0: {{ totalStats.awayZeroGoals }}</p>
        </template>
      </Card>
    </div>
    <div class="grid grid-cols-1">
      <Card v-if="teamWithStats && rounds">
        <template #title> Jornadas disputadas </template>
        <template #content>
          <teamMatchList
            :team="teamWithStats"
            :rounds="rounds"
            :key="Number(router.currentRoute.value.params.teamId)"
          />
        </template>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { ITeam } from '@/models/team'
import { useTeamStore, useUserStore, useCompetitionStore } from '@/stores/store'
import constants from '@/assets/constants/constants'
import router from '@/router/index.js'
import { IUser } from '@/models/user'
import teamMatchList from '@/components/competitions/team/teamMatchList.vue'
import positionStats from '@/components/competitions/team/positionStats.vue'
import matchStats from '@/components/competitions/team/matchStats.vue'
import goalStats from '@/components/competitions/team/goalStats.vue'

export default {
  components: {
    teamMatchList,
    positionStats,
    matchStats,
    goalStats
  },
  setup() {
    const userStore = useUserStore()
    const user = ref<IUser>(userStore.user)
    const teamStore = useTeamStore()
    const competitionStore = useCompetitionStore()
    const team = computed<ITeam | undefined>(() => teamStore.teamById(Number(router.currentRoute.value.params.teamId)))
    const rounds = computed(() => competitionStore.rounds)
    const statsPerRound = computed(() => competitionStore.statsPerRound)
    const rankedTeams = computed(() => competitionStore.rankedTeams('latest'))
    const teamWithStats = computed<ITeam | undefined>(() =>
      competitionStore.competitionTeamById(
        Number(router.currentRoute.value.params.id),
        Number(router.currentRoute.value.params.teamId)
      )
    )
    const avatar = computed({
      get: () => teamWithStats.value?.avatar,
      set: (newValue) => {
        if (teamWithStats) {
          if (teamWithStats.value) {
            teamWithStats.value.avatar = newValue || ''
          }
        }
      }
    })

    const totalStats = computed(() => {
      let localGoals = 0
      let awayGoals = 0
      let localAgainstGoals = 0
      let awayAgainstGoals = 0
      let localZeroGoals = 0
      let awayZeroGoals = 0
      let localMatches = 0
      let awayMatches = 0
      for (const match of competitionStore.teamMatchesPerRound(Number(router.currentRoute.value.params.teamId))) {
        if (match.localTeam?.id == Number(router.currentRoute.value.params.teamId)) {
          localMatches++
          localGoals += Number(match.localTeamGoals)
          localAgainstGoals += Number(match.awayTeamGoals)
          if (Number(match.awayTeamGoals) == 0) {
            localZeroGoals++
          }
        } else {
          awayMatches++
          awayGoals += Number(match.awayTeamGoals)
          awayAgainstGoals += Number(match.localTeamGoals)
          if (Number(match.localTeamGoals) == 0) {
            awayZeroGoals++
          }
        }
      }
      return {
        goalAverage: ((localGoals + awayGoals) / (localMatches + awayMatches)).toFixed(2),
        againstGoalAverage: ((localAgainstGoals + awayAgainstGoals) / (localMatches + awayMatches)).toFixed(2),
        zeroGoals: localZeroGoals + awayZeroGoals + ' de ' + (localMatches + awayMatches),
        localGoalAverage: (localGoals / localMatches).toFixed(2),
        localAgainstGoalAverage: (localAgainstGoals / localMatches).toFixed(2),
        localZeroGoals: localZeroGoals + ' de ' + localMatches,
        awayGoalAverage: (awayGoals / awayMatches).toFixed(2),
        awayAgainstGoalAverage: (awayAgainstGoals / awayMatches).toFixed(2),
        awayZeroGoals: awayZeroGoals + ' de ' + awayMatches
      }
    })
    const getInitialData = async () => {
      await teamStore.getUserTeams(Number(user.value.id))
      await competitionStore.getUserCompetitions(Number(user.value.id))
      await competitionStore.getCompetition(Number(router.currentRoute.value.params.id))
      await competitionStore.getCompetitionRounds(Number(router.currentRoute.value.params.id))
    }

    onBeforeMount(() => {
      getInitialData()
    })
    return {
      team,
      rounds,
      avatar,
      constants,
      totalStats,
      teamWithStats,
      router,
      statsPerRound,
      rankedTeams
    }
  }
}
</script>

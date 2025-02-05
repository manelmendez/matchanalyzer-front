<template>
  <DataTable :value="rankedTeams" scrollable scrollHeight="38em" :virtualScrollerOptions="{ itemSize: 50 }">
    <Column header="Pos" headerStyle="justify-items: center;" bodyStyle="text-align: center;">
      <template #body="slotProps">
          {{ slotProps.index + 1 }}
      </template>
    </Column>
    <Column header="" bodyStyle="justify-items: center;">
      <template #body="slotProps">
        <div class="grid">
          <Image
            width="20"
            :src="constants.ADDRESS + slotProps.data.avatar"
            :error="slotProps.data.avatar = constants.DEFAULT_TEAM_URL"
            style="cursor: pointer;"
            @click="router.push('/competitions/' + router.currentRoute.value.params.id + '/team/' + slotProps.id)"/>
        </div>
      </template>
    </Column>
    <Column header="Nombre" headerStyle="justify-items: center;" bodyStyle="text-align: center;">
      <template #body="slotProps">
        <span class="text-nowrap">{{ slotProps.data.name }}</span>
      </template>
    </Column>
    <Column field="stats.points" header="PTS" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
    <Column field="stats.gamesPlayed" header="PJ" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
    <Column field="stats.wins" header="V" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
    <Column field="stats.draws" header="E" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
    <Column field="stats.loses" header="D" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
    <Column field="stats.goals" header="GF" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
    <Column field="stats.againstGoals" header="GC" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
    <Column field="stats.goalDif" header="DG" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
    <template v-if="details">
      <Column field="" header="Casa" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.homePoints" header="PTS" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.homeGamesPlayed" header="PJ" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.homeWins" header="V" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.homeDraws" header="E" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.homeLoses" header="D" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.homeGoals" header="GF" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.homeAgainstGoals" header="GC" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.homeGoalDif" header="DG" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="" header="Fuera" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.awayPoints" header="PTS" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.awayGamesPlayed" header="PJ" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.awayWins" header="V" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.awayDraws" header="E" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.awayLoses" header="D" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.awayGoals" header="GF" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.awayAgainstGoals" header="GC" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
      <Column field="stats.awayGoalDif" header="DG" headerStyle="justify-items: center;" bodyStyle="text-align: center;"></Column>
    </template>
    <template #empty>
      <div class="center-h">Aún no están los datos de esta jornada :(</div>
    </template>
  </DataTable>
</template>
<script>
import constants from '@/assets/constants/constants'
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ClassificationTable',
  props: {
    rankedTeams: Array,
    details: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const details = ref(props.details)
    const router = useRouter()
    const rankedTeams = props.rankedTeams

    const setClass = (index) => {
      if (index == 0) return 'first'
      else if (index == 1) return 'second'
      else if (
        index == this.rankedTeams.length - 1 ||
        index == this.rankedTeams.length - 2 ||
        index == this.rankedTeams.length - 3
      )
        return 'descending'
    }
    watch(() => props.details, newValue => {
      details.value = newValue
    })
    return {
      constants,
      router,
      rankedTeams,
      details
    }
  }
}
</script>
<style scoped>
.first {
  background-color: rgba(117, 255, 131, 0.55);
}
.first:hover {
  background-color: rgba(117, 255, 131, 0.8) !important;
}
.descending {
  background-color: rgba(255, 117, 117, 0.55);
}
.descending:hover {
  background-color: rgba(255, 117, 117, 0.9) !important;
}

</style>

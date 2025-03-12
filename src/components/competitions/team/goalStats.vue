<template>
  <Card style="overflow: visible">
    <template #content>
      <Card class="v-sheet--offset mx-auto" style="background-color: var(--oposite-color)" elevation="4" rounded>
        <template #content>
          <Chart type="bar" :data="goalStats" :options="goalOptions" class="w-full min-h-[20rem]" />
        </template>
      </Card>
      <div class="text-center mt-[-1em] text-xl">
        <p>Goles del equipo</p>
      </div>
    </template>
  </Card>
</template>

<script>
import { ref, computed } from 'vue'
import router from '@/router'
export default {
  props: {
    rounds: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const rounds = computed(() => props.rounds)
    const teamId = computed(() => Number(router.currentRoute.value.params.teamId))
    const teamGoals = computed(() => {
      let goalsperround = []
      let againstgoalsperround = []
      for (let i = 0; i < rounds.value.length; i++) {
        for (let j = 0; j < rounds.value[i].matches.length; j++) {
          if (Number(rounds.value[i].matches[j].localTeam.id) == teamId.value) {
            goalsperround.push(rounds.value[i].matches[j].localTeamGoals)
            againstgoalsperround.push(rounds.value[i].matches[j].awayTeamGoals)
          }
          if (Number(rounds.value[i].matches[j].awayTeam.id) == teamId.value) {
            goalsperround.push(rounds.value[i].matches[j].awayTeamGoals)
            againstgoalsperround.push(rounds.value[i].matches[j].localTeamGoals)
          }
        }
      }
      let goals = {
        goalsperround,
        againstgoalsperround
      }
      console.log(goals)
      return goals
    })
    const goalStats = computed(() => {
      let goals = teamGoals.value
      let labels = []
      for (let i = 0; i < goals.goalsperround.length; i++) {
        labels.push('J' + (i + 1))
      }
      return {
        labels: labels,
        datasets: [
          {
            label: 'Goles a favor',
            data: goals.goalsperround,
            backgroundColor: 'rgba(220,0,0,0.2)',
            borderWidth: 1,
            borderColor: 'rgb(220,0,0)'
          },
          {
            label: 'Goles en contra',
            data: goals.againstgoalsperround,
            backgroundColor: 'rgba(0,0,220,0.2)',
            borderWidth: 1,
            borderColor: 'rgb(0,0,220)'
          }
        ]
      }
    })
    const goalOptions = ref({
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Goles por jornada'
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'Goles'
          },
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        },
        x: {
          title: {
            display: true,
            text: 'Jornadas'
          }
        }
      }
    })
    return {
      goalStats,
      goalOptions
    }
  }
}
</script>

<style>
.v-sheet--offset {
  top: -3em;
  position: relative;
  z-index: 1;
  min-height: calc(100% - 32px);
}

.stats-menu .p-menu-item-content:hover {
  background-color: transparent;
  color: white;
}

.stats-menu .p-menu-item-content:focus {
  background-color: transparent;
  color: white;
}

.stats-menu .p-menu-item.p-focus .p-menu-item-content {
  background-color: transparent;
  color: white;
}
</style>

<template>
  <Card style="overflow: visible">
    <template #content>
      <Card class="v-sheet--offset mx-auto" style="background-color: var(--oposite-color)" elevation="4" rounded>
        <template #content>
          <Chart type="doughnut" :data="matchStats" :options="matchOptions" class="w-full min-h-[20rem]" />
        </template>
      </Card>
      <div class="text-center mt-[-1em] text-xl">
        <p>Partidos del equipo</p>
      </div>
    </template>
  </Card>
</template>

<script>
import { ref, computed } from 'vue'
import router from '@/router'
export default {
  props: {
    rankedTeams: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const rankedTeams = computed(() => props.rankedTeams)
    const teamId = computed(() => Number(router.currentRoute.value.params.teamId))
    const matchStats = computed(() => {
      let victorias = 0
      let empates = 0
      let derrotas = 0
      for (let i = 0; i < rankedTeams.value.length; i++) {
        if (Number(rankedTeams.value[i].id) == teamId.value) {
          victorias = rankedTeams.value[i].stats.wins
          empates = rankedTeams.value[i].stats.draws
          derrotas = rankedTeams.value[i].stats.loses
        }
      }
      return {
        labels: ['Victorias', 'Empates', 'Derrotas'],
        datasets: [
          {
            data: [victorias, empates, derrotas],
            backgroundColor: ['rgb(115, 199, 132)', 'rgb(255, 212, 71)', 'rgb(255, 117, 117)'],
            borderColor: ['rgba(115, 199, 132,0)', 'rgba(255, 212, 71,0)', 'rgba(255, 117, 117,0)']
          }
        ]
      }
    })
    const matchOptions = ref({
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      }
    })
    return {
      matchStats,
      matchOptions
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

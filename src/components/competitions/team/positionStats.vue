<template>
  <Card style="overflow: visible">
    <template #content>
      <Card class="v-sheet--offset mx-auto" style="background-color: var(--oposite-color)" elevation="4" rounded>
        <template #content>
          <Chart type="line" :data="positionStats" :options="positionOptions" class="w-full min-h-[20rem]" />
        </template>
      </Card>
      <div class="text-center mt-[-1em] text-xl">
        <p>Recorrido del equipo</p>
      </div>
    </template>
  </Card>
</template>

<script>
import { ref, computed } from 'vue'
import router from '@/router'
export default {
  props: {
    statsPerRound: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const statsPerRound = computed(() => props.statsPerRound)
    const teamId = computed(() => Number(router.currentRoute.value.params.teamId))
    const positionStats = computed(() => {
      let labels = []
      let positions = []
      for (let i = 0; i < statsPerRound.value.length; i++) {
        // labels.push(this.statsPerRound[i].name)
        labels.push('J' + (i + 1))
        for (let j = 0; j < statsPerRound.value[i].ranking.length; j++) {
          if (Number(statsPerRound.value[i].ranking[j].id) == teamId.value) {
            positions.push(j + 1)
          }
        }
      }
      return {
        labels: labels,
        datasets: [
          {
            label: 'Posición',
            data: positions,
            backgroundColor: 'rgb(0,0,0,0.1)',
            borderColor: 'rgb(76,180,179)',
            fill: 'start' //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
          }
        ]
      }
    })
    const positionOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Recorrido del equipo'
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: false,
            text: 'Posición'
          },
          reverse: true,
          max: 21,
          min: 1,
          ticks: {
            stepSize: 1
          }
        },
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Jornada'
          },
          reverse: false,
          min: 'J1',
          ticks: {
            stepSize: 1
          }
        }
      }
    })
    return {
      positionStats,
      positionOptions
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

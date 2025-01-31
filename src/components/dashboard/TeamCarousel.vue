<template>
  <Carousel :value="teams" :numVisible="1" :numScroll="1" circular :autoplayInterval="6000">
    <template #item="slotProps">
      <div class="center-h">{{slotProps.data.name}}</div>
      <div class="carousel-content" v-if="slotProps.data.stats">
        <div class="carousel-item">
          <h3>Posición en liga</h3>
          <div>
            <p class="center-h">{{ slotProps.data.stats.position }}</p>
            <i v-if="slotProps.data.stats.position <= 3" class="pi pi-trophy center-h"
            :style="
                  slotProps.data.stats.position == 1
                    ? 'color:gold;'
                    : slotProps.data.stats.position == 2
                      ? 'color:silver;'
                      : slotProps.data.stats.position == 3
                        ? 'color:orange;'
                        : '' " ></i>
          </div>
        </div>
        <div class="carousel-item">
          <h3>Puntos</h3>
          <p>
            {{ slotProps.data.stats.points }}/{{
              slotProps.data.stats.gamesPlayed * 3
            }}
          </p>
        </div>
        <div class="carousel-item">
          <h3>Goles</h3>
          <div>
            <span class="center-h">{{ slotProps.data.stats.goals }}</span>
            <i class="material-icons center-h">sports_soccer</i>
          </div>
        </div>
        <div class="carousel-item">
          <h3>Resumen Partidos</h3>
          <div class="chart-container">
            <Chart type="doughnut" :data="setChartData(slotProps.data)" :options="setChartOptions()" class="" />
          </div>
        </div>
      </div>
      <div class="carousel-item-empty" v-else>
        No hay datos
      </div>
    </template>
  </Carousel>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useUserStore, useTeamStore } from '@/stores/store'
import constants from '@/assets/constants/constants'
import { ITeam } from '@/models/team';
export default {
  name: 'CompetitionCarousel',
  props: {
  },
  setup() {
    const userStore = useUserStore()
    const teamStore = useTeamStore()

    const user = computed(() => userStore.user)
    const teams = computed<ITeam[]>(() => teamStore.myTeams)

    const setChartData = (team: ITeam) => {
      if (team.stats) {
        let victorias = team.stats.wins
        let empates = team.stats.draws
        let derrotas = team.stats.loses
        return {
          labels: ['Victorias', 'Empates', 'Derrotas'],
          datasets: [
            {
              data: [victorias, empates, derrotas],
              backgroundColor: [
                'rgb(115, 199, 132)',
                'rgb(255, 212, 71)',
                'rgb(255, 117, 117)'
              ],
              borderColor: [
                'rgba(115, 199, 132,0)',
                'rgba(255, 212, 71,0)',
                'rgba(255, 117, 117,0)'
              ]
            }
          ]
        }
      };
    };

    const setChartOptions = () => {
      return {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
          }
        }
      };
    };

    return {
      user,
      teams,
      constants,
      setChartData,
      setChartOptions
    }

  }
}
</script>
<style>
.carousel-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 1600px) {
  .carousel-content {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 1280px) {
  .carousel-content {
    grid-template-columns: repeat(1, 1fr);
  }
}

.carousel-item {
  display: grid;
  justify-items: center;
  grid-template-rows: min-content;
}

.carousel-item-empty {
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  height: 100%;
}

.carousel-item .chart-container {
  width: 50%; /* Asegura que el contenedor del gráfico ocupe todo el ancho */
  height: auto;
}

.carousel-item .chart-container canvas {
  width: 100% !important; /* El canvas ocupa el 100% del contenedor */
  height: auto !important; /* Mantiene la relación de aspecto */
}
</style>
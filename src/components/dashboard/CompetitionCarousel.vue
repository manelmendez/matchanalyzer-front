<template>
  <Carousel :value="competitions" :numVisible="1" :numScroll="1" circular :autoplayInterval="6000">
    <template #item="slotProps">
      <div class="center-h">{{slotProps.data.name}}</div>
      <div class="carousel-content">
        <div class="carousel-item">
          <h3 class="title">Líder</h3>
            <Image
              :src="constants.ADDRESS + slotProps.data.teams[0].avatar"
              :error="slotProps.data.teams[0].avatar = constants.DEFAULT_TEAM_URL"
              :width="35">
            </Image>
            <p>{{ slotProps.data.teams[0].name }}</p>
        </div>
        <div class="carousel-item">
          <h3>Último</h3>
          <Image
            :src="constants.ADDRESS + slotProps.data.teams[slotProps.data.teams.length -1].avatar"
            :error="slotProps.data.teams[slotProps.data.teams.length -1].avatar = constants.DEFAULT_TEAM_URL"
            :width="35">
          </Image>
          <p>{{ slotProps.data.teams[slotProps.data.teams.length -1].name }}</p>
        </div>
        <div class="carousel-item">
          <h3>Total Goles</h3>
          <div>
            <span class="center-h">{{ totalGoals(slotProps.data) }}</span>
            <i class="material-icons center-h">sports_soccer</i>
          </div>
        </div>
        <div class="carousel-item">
          <h3>Año</h3>
          <p>{{ slotProps.data.season }}</p>
        </div>
      </div>
    </template>
  </Carousel>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useUserStore, useCompetitionStore } from '@/stores/store.ts'
import constants from '@/assets/constants/constants.ts'
export default {
  name: 'CompetitionCarousel',
  props: {
  },
  setup() {
    const userStore = useUserStore()
    const competitionStore = useCompetitionStore()

    const user = computed(() => userStore.user)
    const competitions = computed(() => competitionStore.competitions)

    const getInitialData = async () => {
      await competitionStore.getUserCompetitions(Number(user.value.id))
    }

    const totalGoals = ((competition) => {
      let goals = 0
      for (let i = 0; i < competition.teams.length; i++) {
        goals += competition.teams[i].stats.goals
      }
      return goals
    })

    onMounted(() => {
      // getInitialData()
      console.log(constants)
    })

    return {
      user,
      competitions,
      getInitialData,
      constants,
      totalGoals
    }
  }
}
</script>
<style>
.carousel-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 1280px) {
  .carousel-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1080px) {
  .carousel-content {
    grid-template-columns: repeat(1, 1fr);
  }
}
.carousel-item {
  display: grid;
  justify-items: center;
  grid-template-rows: min-content;
}
</style>
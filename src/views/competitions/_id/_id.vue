<template>
  <Tabs value="/summary">
    <TabList>
      <Tab v-for="tab in items" :key="tab.label" :value="tab.route">
        <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
          <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
            <i :class="tab.icon" />
            <span>{{ tab.label }}</span>
          </a>
        </router-link>
      </Tab>
    </TabList>
  </Tabs>
</template>

<script>
import { useUserStore, useCompetitionStore } from '@/stores/store';
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'CompetitionBase',
  setup() {
    const userStore = useUserStore()
    const competitionStore = useCompetitionStore()

    const user = computed(() => userStore.user)
    const competition = computed(() => competitionStore.competition)

    const items = ref([
    { route: '/summary', label: 'Summary', icon: 'pi pi-chart-line' },
    { route: '/results', label: 'Resultados', icon: 'pi pi-chart-line' },
    { route: '/rankings', label: 'Classificación', icon: 'pi pi-trophy' }
]);

    const getInitialData = async () => {
      await competitionStore.getUserCompetitions(Number(user.value.id))
      await competitionStore.getCompetitionRounds(Number(competition.value.id))
    }
    onMounted(() => {
      getInitialData()
    })

    return {
      competition,
      items
    }
  }
}
</script>
<style scoped>
.compTab {
  font-size: 75%;
}
.compTab:hover {
  color: rgb(255, 255, 255);
}
.nothing {
  color: #187388;
}
</style>
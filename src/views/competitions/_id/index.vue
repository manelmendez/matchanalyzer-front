<template>
  <Tabs :value="isActive">
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
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
import { useUserStore, useCompetitionStore } from '@/stores/store';
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';

export default {
  name: 'CompetitionBase',
  setup() {
    const userStore = useUserStore()
    const competitionStore = useCompetitionStore()
    const router = useRouter()
    const user = computed(() => userStore.user)
    const competition = computed(() => competitionStore.competitionById(Number(router.currentRoute.value.params.id)))
    const items = ref([
      { route: 'summary', label: 'Summary', icon: 'pi pi-chart-line' },
      { route: 'results', label: 'Resultados', icon: 'pi pi-list' },
      { route: 'rankings', label: 'Classificación', icon: 'pi pi-trophy' }
    ]);

    const getInitialData = async () => {
      await competitionStore.getUserCompetitions(Number(user.value.id))
      await competitionStore.getCompetitionRounds(Number(competition.value.id))
    }

    const isActive = computed(() => {
      return router.currentRoute.value.name
    })

    onMounted(() => {
      getInitialData()
    })

    return {
      competition,
      items,
      isActive
    }
  }
}
</script>
<style scoped>

</style>
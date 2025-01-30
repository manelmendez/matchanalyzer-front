<template>
  <div class="myteam-header">

  </div>
  <div class="myteam-content">
    <div class="myteam-charts">
      <Chart type="doughnut" :data="setChartData(slotProps.data)" :options="setChartOptions()" class="w-full md:w-[30rem]" />
      <Chart type="doughnut" :data="setChartData(slotProps.data)" :options="setChartOptions()" class="w-full md:w-[30rem]" />
    </div>
    <div class="myteam-players">

    </div>
  </div>
</template>
<script lang="ts">
import { useTeamStore, useUserStore } from '@/stores/store';
import { computed, ComputedRef } from 'vue';
import { ITeam } from '@/models/team';
import { onMounted } from 'vue';
import constants from '@/assets/constants/constants';
import router from '@/router';

export default {
  name: "team-details",
  setup() {
    const userStore = useUserStore()
    const teamStore = useTeamStore()
    const user = computed(() => userStore.user)
    const myTeam: ComputedRef<ITeam | undefined> = computed(() => teamStore.myTeamById(Number(user.value.id)))
    
    const getInitialData = async () => {
      await teamStore.getPlayersByTeamId(Number(router.currentRoute.value.params.id))
    }

    onMounted(() => {
      getInitialData()
    })

    return {
      user,
      myTeam,
      constants
    }
  }
}
</script>
<style>
</style>
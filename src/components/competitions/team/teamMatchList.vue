<template>
  <div v-if="loading" class="grid">
    <ProgressSpinner class="mx-auto" />
  </div>
  <DataTable v-else :value="matchList" tableStyle="grid sm:grid-cols-2 md:grid-cols-4">
    <Column field="roundName" style="width: 15%"></Column>
    <Column style="width: 60%">
      <template #body="item">
        <a
          :class="item.data.localTeam.id == team.id ? 'team' : 'rival'"
          @click="
            router.push('/competitions/' + router.currentRoute.value.params.id + '/team/' + item.data.localTeam.id)
          "
          >{{ item.data.localTeam.name }}</a
        >
        -
        <a
          :class="item.data.awayTeam.id == team.id ? 'team' : 'rival'"
          @click="
            router.push('/competitions/' + router.currentRoute.value.params.id + '/team/' + item.data.awayTeam.id)
          "
          >{{ item.data.awayTeam.name }}</a
        >
      </template>
    </Column>
    <Column style="width: 15%">
      <template #body="item"> {{ item.data.localTeamGoals }} - {{ item.data.awayTeamGoals }} </template>
    </Column>
    <Column style="width: 10%">
      <template #body="item">
        <Avatar
          v-if="
            (item.data.localTeam.id == team.id && Number(item.data.localTeamGoals) > Number(item.data.awayTeamGoals)) ||
            (item.data.awayTeam.id == team.id && Number(item.data.awayTeamGoals) > Number(item.data.localTeamGoals))
          "
          label="G"
          class="mr-2"
          style="background-color: #28a745; color: white"
        />
        <Avatar
          v-if="Number(item.data.localTeamGoals) == Number(item.data.awayTeamGoals)"
          label="E"
          class="mr-2"
          style="background-color: #ffc107; color: white"
        />
        <Avatar
          v-if="
            (item.data.localTeam.id == team.id && Number(item.data.localTeamGoals) < Number(item.data.awayTeamGoals)) ||
            (item.data.awayTeam.id == team.id && Number(item.data.awayTeamGoals) < Number(item.data.localTeamGoals))
          "
          label="P"
          class="mr-2"
          style="background-color: #dc3545; color: white"
        />
      </template>
    </Column>
  </DataTable>
</template>
<script lang="ts">
import { computed, watchEffect, ref } from 'vue'
import router from '@/router/index.js'

export default {
  props: {
    team: {
      type: Object,
      required: true
    },
    rounds: { type: Array, required: true }
  },
  setup(props: { team: any; rounds: any[] }) {
    const team = computed(() => props.team)
    const rounds = computed(() => props.rounds)
    let loading = ref(false)
    const matchList = computed(() => {
      loading.value = true
      let matches = []
      for (let i = 0; i < rounds.value.length; i++) {
        for (let j = 0; j < rounds.value[i].matches.length; j++) {
          let match = rounds.value[i].matches[j]
          match.roundName = rounds.value[i].name
          if (match.localTeam.id == team.value.id || match.awayTeam.id == team.value.id) {
            matches.push(match)
          }
        }
      }
      loading.value = false
      return matches
    })
    return {
      team,
      matchList,
      router,
      loading
    }
  }
}
</script>
<style>
.rival {
  cursor: pointer;
  text-decoration: none;
  color: var(--p-primary-color) !important;
}
.team {
  cursor: pointer;
  text-decoration: none;
}
</style>

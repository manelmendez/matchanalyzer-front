<template>
  <Card class="myteam-header">
    <template #content>
      <Tag style="border: 2px solid var(--p-primary-color); color: var(--text-color); ">
            <Image :src="constants.ADDRESS + avatar" @error="avatar = constants.DEFAULT_TEAM_URL" width="25" style="margin-right: .5em;" />
            <span>{{ myTeam?.name }}</span>
      </Tag>
      <Button label="Ir a la competición" icon="pi pi-chevron-right" iconPos="right" rounded
        @click="router.push({name: 'summary',params: {id: myTeam?.competitionId,roundId: 'latest'}})" />
    </template>
  </Card>
  <div class="myteam-content lg:grid-cols-2 md:grid-flow-row-dense">
    <div class="myteam-players">
      <DataTable :value="myTeam?.players" style=" border-radius: 0.6em" size="small" columnResizeMode="fit">
        <Column>
          <template #body="{ data }">
            <Avatar class="menu-avatar" :label="initials(data)" shape="circle" aria-haspopup="true" aria-controls="overlay_menu"
              style="background-color: var(--p-primary-color); cursor: pointer;" />
          </template>
        </Column>
        <Column field="firstname" header="Nombre" sortable>
          <template #body="{ data }">
            {{ data.firstname + ' ' + data.lastname }}
          </template>
        </Column>
        <Column field="position" header="Posición" sortable></Column>
        <Column field="year" header="Año" sortable></Column>
        <Column>
          <template #body="{ data }">
              <Button icon="pi pi-pencil" severity="info" variant="text" rounded />
              <Button icon="pi pi-trash" severity="danger" variant="text" rounded />
          </template>
        </Column>
        <template #empty>
          <div class="center-h">No hay jugadores en este equipo :(</div>
        </template>
      </DataTable>
    </div>
    <div class="myteam-charts" v-if="pichichiList || cardList">
      <Card v-if="pichichiList">
        <template #content>
          <div>
            <Chart type="line" :data="pichichiList" :options="pichichiOptions" class="w-full min-h-[20rem]"/>
          </div>
        </template>
      </Card>
      <Card v-if="cardList">
        <template #content>
          <Chart type="line" :data="cardList" :options="cardOptions" class="w-full min-h-[20rem]"/>
        </template>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { useTeamStore, useUserStore } from '@/stores/store';
import { computed, ComputedRef, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ITeam } from '@/models/team';
import constants from '@/assets/constants/constants';
import { CardItem } from '@/models/types';
import { Pichichi } from '@/models/types';
import { IPlayer } from '@/models/player';
import colors from 'tailwindcss/colors';

export default {
  name: "team-details",
  setup() {
    const userStore = useUserStore()
    const teamStore = useTeamStore()
    const router = useRouter()
    const user = computed(() => userStore.user)
    const myTeam: ComputedRef<ITeam | undefined> = computed(() => teamStore.myTeamById(Number(router.currentRoute.value.params.id)))
    const pichichis: ComputedRef<Pichichi[] | undefined> = computed(() => teamStore.pichichiList)
    const cards: ComputedRef<CardItem[] | undefined> = computed(() => teamStore.cardList)
    const avatar = computed({
      get: () => myTeam.value?.avatar,
      set: (newValue) => {
        if (myTeam.value) {
          myTeam.value.avatar = newValue || '';
        }
      }
    });

    const initials = (player: IPlayer) => {
      let initials = ''
      let nameParts = [player.firstname, player.lastname]
      for (const namePart of nameParts) {
        if (namePart) {
          initials += namePart.charAt(0).toUpperCase()
        }
      }
      return initials
    }

    const pichichiList = computed(() => {
      if (pichichis.value && pichichis.value.length != 0) {
        const list = pichichis.value
        const primero = list[0]
        const segundo = list[1]
        const tercero = list[2]
        const cuarto = list[3]
        const quinto = list[4]
        const labels = []
        const goals1 = []
        const goals2 = []
        const goals3 = []
        const goals4 = []
        const goals5 = []
        const rounds = list[0].roundsGoals.length
        for (let i = 0; i < rounds; i++) {
          // labels.push(this.statsPerRound[i].name)
          labels.push('J' + (i + 1))
          goals1.push(primero.roundsGoals[i])
          goals2.push(segundo.roundsGoals[i])
          goals3.push(tercero.roundsGoals[i])
          goals4.push(cuarto.roundsGoals[i])
          goals5.push(quinto.roundsGoals[i])
        }
        const primaryColor = colors.red[500]
        const secondaryColor = colors.teal[500]
        const color3 = colors.lime[500]
        const color4 = colors.cyan[500]
        const color5 = colors.amber[500]

        return {
          labels: labels,
          datasets: [
            {
              label: primero.playerName,
              data: goals1,
              backgroundColor: 'rgb(0,0,0,0.1)',
              borderColor: primaryColor,
              fill: false //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            },
            {
              label: segundo.playerName,
              data: goals2,
              backgroundColor: 'rgb(0,0,0,0)',
              borderColor: secondaryColor,
              fill: false //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            },
            {
              label: tercero.playerName,
              data: goals3,
              backgroundColor: 'rgb(0,0,0,0)',
              borderColor: color3,
              fill: false //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            },
            {
              label: cuarto.playerName,
              data: goals4,
              backgroundColor: 'rgb(0,0,0,0)',
              borderColor: color4,
              fill: false //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            },
            {
              label: quinto.playerName,
              data: goals5,
              backgroundColor: 'rgb(0,0,0,0)',
              borderColor: color5,
              fill: false //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            }
          ]
        }
      } else {
        return undefined
      }
    })

    const cardList = computed(() => {
      if (cards.value && cards.value.length != 0) {
        const list = cards.value
        const primero = list[0]
        const segundo = list[1]
        const tercero = list[2]
        const labels = []
        const cards1 = []
        const cards2 = []
        const cards3 = []
        const rounds = list[0].roundCards.length
        for (let i = 0; i < rounds; i++) {
          labels.push('J' + (i + 1))
          cards1.push(primero.roundCards[i])
          cards2.push(segundo.roundCards[i])
          cards3.push(tercero.roundCards[i])
        }
        const primaryColor = colors.red[500]
        const secondaryColor = colors.teal[500]
        const color3 = colors.lime[500]

        return {
          labels: labels,
          datasets: [
            {
              label: primero.playerName,
              data: cards1,
              backgroundColor: 'rgb(0,0,0,0.1)',
              borderColor: primaryColor,
              fill: false
            },
            {
              label: segundo.playerName,
              data: cards2,
              backgroundColor: 'rgb(0,0,0,0.1)',
              borderColor: secondaryColor,
              fill: false
            },
            {
              label: tercero.playerName,
              data: cards3,
              backgroundColor: 'rgb(0,0,0,0.1)',
              borderColor: color3,
              fill: false
            }
          ]
        }
      } else {
        return undefined
      }
    })

    const pichichiOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
        display: true,
        text: 'Pichichis del equipo'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: false,
            text: 'Goles'
          },
          ticks: {
            reverse: false,
            min: 0,
            stepSize: 5
          }
        },
        x: {
          beginAtZero: true,
          title: {
            display: false,
            text: 'Jornada'
          }
        }
      }
    })
    const cardOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Jugadores con más tarjetas'
          }
        },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: false,
            text: 'Tarjetas'
          },
          ticks: {
            reverse: false,
            min: 0,
            stepSize: 1
          }
        },
        x: {
          beginAtZero: true,
          title: {
            display: false,
            text: 'Jornada'
          }
        }
      }
    })
    const getInitialData = async () => {
      await teamStore.getUserTeams(Number(user.value.id))
      await teamStore.getPlayersByTeamId(Number(router.currentRoute.value.params.id))
      await teamStore.getTeamScorers({teamId: Number(myTeam.value?.id), competitionId: Number(myTeam.value?.competitionId)})
      await teamStore.getTeamCards({teamId: Number(myTeam.value?.id), competitionId: Number(myTeam.value?.competitionId)})
    }
    onMounted(() => {
      getInitialData()
    })

    return {
      user,
      myTeam,
      constants,
      pichichiList,
      cardList,
      pichichiOptions,
      cardOptions,
      initials,
      avatar,
      router
    }
  }
}
</script>
<style>
.myteam-header{
  height: fit-content;
}
.myteam-header .p-card-body .p-card-content{
  display: grid !important;
  grid-auto-flow: column;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
}
.myteam-content {
  display: grid;
  gap: 2em
}

.myteam-charts {
  display: grid;
  gap: 2em;
  height: fit-content;
}

.p-datatable-table-container {
  border-radius: 0.6em;
}
</style>
<template>
  <div class="grid grid-cols-7 max-lg:grid-cols-5 gap-2 max-lg:gap-2">
    <Card class="border-1 text-center col-span-2 col-start-2 max-lg:col-start-1 max-lg:h-25" 
    :class="match.localTeamGoals>match.awayTeamGoals ? 'bg-emerald-400 border-emerald-800':'bg-rose-400  border-rose-800'">
      <template #content>
        <div class="grid justify-center max-lg:text-sm">
          <Image :src="constants.ADDRESS + match.localTeam.avatar"
          :error="match.localTeam.avatar = constants.DEFAULT_TEAM_URL" width="30"/>
        </div>
        <p class="max-lg:text-xs">{{ match.localTeam.name }}</p>
      </template>
    </Card>
    <Card class="border-1 m-auto col-span-1 bg-gray-500 border-gray-600 font-extrabold text-xl max-lg:text-sm max-lg:h-15">
      <template #content>
        <div class="text-nowrap">{{ match.localTeamGoals }} - {{ match.awayTeamGoals }}</div>
      </template>
    </Card>
    <Card class="border-1 text-center col-span-2 max-lg:h-25"
    :class="match.awayTeamGoals>match.localTeamGoals ? 'bg-emerald-400 border-emerald-800':'bg-rose-400 border-rose-800'">
      <template #content>
        <div class="grid justify-center">
          <Image :src="constants.ADDRESS + match.awayTeam.avatar"
            :error="match.awayTeam.avatar = constants.DEFAULT_TEAM_URL" width="30"/>
        </div>
        <p class="max-lg:text-xs">{{ match.awayTeam.name }}</p>
      </template>
    </Card>
    <Card class="m-auto col-span-1 max-lg:col-span-full max-lg:h-15">
      <template #content>
        <div style="margin-left: auto;" class="max-lg:h-15">
          <Button icon="pi pi-pencil" severity="info" variant="text" rounded/>
          <Button icon="pi pi-trash" severity="danger" variant="text" rounded/>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import constants from '@/assets/constants/constants';
export default {
  props: {
    match: {
      type: Object,
      required: true,
      default: false
    }
  },
  setup(props) {
    const match = props.match
    return {
      match,
      constants
    }
  }
}
</script>
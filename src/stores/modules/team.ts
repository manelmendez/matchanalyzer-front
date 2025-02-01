import { defineStore } from 'pinia'
import {teamActions} from '../actions/teamActions'
import { ITeam } from '@/models/team'
import { IPlayer } from '@/models/player'
import { CardItem } from '@/models/types'
import { Pichichi } from '@/models/types'

export const useTeamStore = defineStore('team', {
  state: () => ({
    teams: [] as ITeam[],
    myTeams: [] as ITeam[],
    players: [] as IPlayer[],
    pichichiList: [] as Pichichi[],
    cardList: [] as CardItem[]
  }),
  getters: {
    teamPlayers: (state) => (id: number) => {
      let team: ITeam | undefined = state.teams.find((team) => team.id == id)
      return team ? team?.players : undefined
    },
    teamById: (state) => (id:number) => state.teams.find((team) => team.id == id),
    myTeamById: (state) => (id:number) => state.myTeams.find((team) => team.id == id),
    playersByTeamId: (state) => (teamId:number) => {
      let playersByTeamId = state.players.filter(
        (player) => player.teamId == teamId
      )
      for (const player of playersByTeamId) {
        player.name = player.firstname + ' ' + player.lastname
      }
      return playersByTeamId
    }
  },
  actions: {
    ...teamActions,
  }
})

import axios from 'axios'
import { useTeamStore, useCompetitionStore } from "../../stores/store";

// TEAM
export const teamActions = {
  addTeam(body: any) {
    console.log('ACTION -- addTeam')
    const teamStore = useTeamStore()
    return axios
      .post('teams', body)
      .then((response) => {
        teamStore.teams = [...teamStore.teams, response.data.team]
        return response
      })
      .catch((err) => {
        throw err.response
      })
  },
  getTeam(id: Number) {
    console.log('ACTION -- getTeam')
    const teamStore = useTeamStore()
    return axios.get('teams/' + id).then((response) => {
      if (!teamStore.teams.find((t) => t.id == response.data.team.id)) {
        teamStore.teams = [...teamStore.teams, response.data.team]
      }
      return response.data.team
    })
  },
  getUserTeams(userId: Number) {
    console.log('ACTION -- getUserTeams')
    const teamStore = useTeamStore()
    return axios.get('teams/user/' + userId).then((response) => {
      teamStore.myTeams = response.data.teams
    })
    .catch((err) => {
      throw err.response
    })
  },
  addNoManagerTeam(body) {
    console.log('ACTION -- addNoManagerTeam')
    const competitionStore = useCompetitionStore()
    return axios
      .post('teams/no-manager', body)
      .then((response) => {        
        let previousTeam = competitionStore.competition.teams.find((a) => a.id === response.data.team.id)
        if (previousTeam) {
          Object.assign(previousTeam, response.data.team)
        } else {
          competitionStore.competition.teams.push(response.data.team)
        }
        return response
      })
      .catch((err) => {
        throw err.response
      })
  },
  uploadImage(formData) {
    console.log('ACTION -- uploadImage')
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return axios
      .post('images', formData, {
        headers: headers,
        onUploadProgress: (progressEvent) => {
          console.log(
            'Progress: ' +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            '%'
          )
        }
      })
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err.response
      })
  },
  updateTeam(data) {
    console.log('ACTION -- updateTeam')
    const competitionStore = useCompetitionStore()
    return axios
      .put('teams/' + data.id, data.body)
      .then((response) => {
        let previousTeam = competitionStore.competition.teams.find((a) => a.id === response.data.team.id)
        if (previousTeam) {
          Object.assign(previousTeam, response.data.team)
        } else {
          competitionStore.competition.teams.push(response.data.team)
        }
        return response
      })
      .catch((err) => {
        throw err.response
      })
  },
  deleteTeam(id) {
    console.log('ACTION -- deleteTeam')
    const teamStore = useTeamStore()
    return axios
      .delete('teams/' + id)
      .then((response) => {
        let index = teamStore.myTeams.findIndex((item) => item.id == id)
        teamStore.myTeams.splice(index, 1)

        let index2 = teamStore.teams.findIndex((item) => item.id == id)
        teamStore.teams.splice(index2, 1)
        return response
      })
      .catch((err) => {
        throw err.response
      })
  },
  getTeamStats(teamId: number, competitionId: number) {
    console.log('ACTION -- getTeamStats')
    const teamStore = useTeamStore()
    return axios.get('teams/' + teamId +'/competition/' + competitionId).then((response) => {
      let index = teamStore.myTeams.findIndex((item) => item.id == teamId)
      teamStore.myTeams[index].stats = response.data.teamStats.stats
    })
    .catch((err) => {
      throw err.response
    })
  },

  // PLAYER
  addPlayer(body) {
    console.log('ACTION -- addPlayer')
    const teamStore = useTeamStore()
    return axios
      .post('players', body)
      .then((response) => {
        teamStore.players = [...teamStore.players, response.data.player]
        return response
      })
      .catch((err) => {
        throw err.response
      })
  },
  getPlayersByTeamId(teamId) {
    console.log('ACTION -- getPlayersByTeamId')
    const teamStore = useTeamStore()
    return axios
      .get('players/team/' + teamId)
      .then((response) => {
        teamStore.players = [...response.data.players]
        let index = teamStore.myTeams.findIndex((item) => item.id == response.data.players[0].teamId)
        teamStore.myTeams[index].players = [...response.data.players]
        let index2 = teamStore.teams.findIndex((item) => item.id == response.data.players[0].teamId)
        teamStore.players[index2] = [...response.data.players]
      })
      .catch((err) => {
        throw err.response
      })
  },
  updatePlayer(body) {
    console.log('ACTION -- updatePlayer')
    const teamStore = useTeamStore()
    return axios
      .put('players/' + body.id, body)
      .then((response) => {
        let previousPlayer = teamStore.players.find((a) => a.id === response.data.player.id)
        Object.assign(previousPlayer, response.data.player)
        return response
      })
      .catch((err) => {
        throw err.response
      })
  },
  deletePlayer(id) {
    console.log('ACTION -- deletePlayer')
    const teamStore = useTeamStore()
    return axios
      .delete('players/' + id)
      .then((response) => {
        let index = teamStore.players.findIndex((item) => item.id == id)
        teamStore.players.splice(index, 1)
        return response
      })
      .catch((err) => {
        throw err.response
      })
  },
  getTeamScorers(data) {
    const { teamId, competitionId } = data
    console.log('ACTION -- getUserTeams')
    const teamStore = useTeamStore()
    return axios
      .get('teams/' + teamId + '/competition/' + competitionId + '/pichihi')
      .then((response) => {
        teamStore.pichichiList = [...response.data.pichichiList]
      })
      .catch((err) => {
        throw err.response
      })
  },
  getTeamCards(data) {
    const { teamId, competitionId } = data
    console.log('ACTION -- getUserTeams')
    const teamStore = useTeamStore()
    return axios
      .get('teams/' + teamId + '/competition/' + competitionId + '/cards')
      .then((response) => {
        teamStore.cardList = [...response.data.cardList]
      })
      .catch((err) => {
        throw err.response
      })
  }
}

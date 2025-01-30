import axios from 'axios'
import { useCompetitionStore } from "../../stores/store";

// COMPETITION
export const competitionActions = {
  addCompetition(body) {
    console.log('ACTION -- addCompetition')
    const competitionStore = useCompetitionStore()
    return axios
      .post('competitions', body)
      .then((response) => {
        competitionStore.competitions = [...competitionStore.competitions, response.data.competition]
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  getCompetition(id) {
    console.log('ACTION -- getCompetition')
    const competitionStore = useCompetitionStore()
    return axios.get('competitions/' + id).then((response) => {
      competitionStore.competition = response.data.competition
    })
  },
  getUserCompetitions(id: number) {
    console.log('ACTION -- getUserCompetitions')
    const competitionStore = useCompetitionStore()
    return axios.get('competitions/user/' + id).then((response) => {
      competitionStore.competitions = response.data.competitions
    })
  },
  updateCompetition(data) {
    console.log('ACTION -- updateCompetition')
    const competitionStore = useCompetitionStore()
    return axios
      .put('competitions/' + data.id, data)
      .then((response) => {
        let previousCompetition = competitionStore.competitions.find(
              (a) => a.id === response.data.id
            )
            Object.assign(previousCompetition, response.data)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  deleteCompetition(data) {
    console.log('ACTION -- deleteCompetition')
    const competitionStore = useCompetitionStore()
    return axios
      .delete('competitions/' + data)
      .then((response) => {
        let index = competitionStore.competitions.findIndex((item) => item.id == response.data.id)
        competitionStore.competitions.splice(index, 1)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },

  // ROUND
  addRound(body) {
    console.log('ACTION -- addRound')
    const competitionStore = useCompetitionStore()
    return axios
      .post('rounds', body)
      .then((response) => {
        competitionStore.rounds = [...competitionStore.rounds, response.data.round]
        competitionStore.selectedRound = Number(competitionStore.rounds.length)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  getCompetitionRounds(id) {
    console.log('ACTION -- getCompetitionRounds')
    const competitionStore = useCompetitionStore()
    return axios.get('rounds/competition/' + id).then((response) => {
      if (competitionStore.selectedRound == null) {
        competitionStore.selectedRound = response.data.rounds.length
      }
      competitionStore.rounds = response.data.rounds
    })
  },
  deleteRound(id) {
    console.log('ACTION -- deleteRound')
    const competitionStore = useCompetitionStore()
    return axios
      .delete('rounds/' + id)
      .then((response) => {
        competitionStore.rounds.pop()
        competitionStore.selectedRound = Number(competitionStore.rounds.length)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },

  // MATCH
  getMatch(id) {
    console.log('ACTION -- getMatch')
    const competitionStore = useCompetitionStore()
    return axios.get('matches/' + id).then((response) => {
      competitionStore.match = response.data.match
    })
  },
  addMatch(body) {
    console.log('ACTION -- addMatch')
    const competitionStore = useCompetitionStore()
    return axios
      .post('matches', body)
      .then((response) => {
        for (let j = 0; j < competitionStore.competition.teams.length; j++) {
          if (response.data.match.localTeam == competitionStore.competition.teams[j].id) {
            response.data.match.localTeam = competitionStore.competition.teams[j]
          } else if (response.data.match.awayTeam == competitionStore.competition.teams[j].id) {
            response.data.match.awayTeam = competitionStore.competition.teams[j]
          }
        }
        for (let i = 0; i < competitionStore.rounds.length; i++) {
          if (competitionStore.rounds[i].id == response.data.match.round) {
            competitionStore.rounds[i].matches = [...competitionStore.rounds[i].matches, response.data.match]
          }
        }
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  updateMatch(data) {
    console.log('ACTION -- updateMatch')
    const competitionStore = useCompetitionStore()
    return axios
      .put('matches/' + data.id, data.body)
      .then((response) => {
        data.body.id = data.id
        let updatedMatch = data.body
        for (let i = 0; i < competitionStore.rounds.length; i++) {
          if (competitionStore.rounds[i].id == updatedMatch.round) {
            for (let j = 0; j < competitionStore.rounds[i].matches.length; j++) {
              if (competitionStore.rounds[i].matches[j].id == updatedMatch.id) {
                // EN PRINCIPIO EL INDEXOF() ES LO MISMO QUE LA J
                let index = competitionStore.rounds[i].matches.indexOf(
                  competitionStore.rounds[i].matches[j]
                )
                competitionStore.rounds[i].matches[index] = updatedMatch
              }
            }
          }
        }
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  deleteMatch(id) {
    console.log('ACTION -- deleteMatch')
    const competitionStore = useCompetitionStore()
    return axios
      .delete('matches/' + id)
      .then((response) => {
        //eliminar partido de la jornada
        for (
          let x = 0;
          x < competitionStore.rounds[competitionStore.selectedRound - 1].matches.length;
          x++
        ) {
          if (competitionStore.rounds[competitionStore.selectedRound - 1].matches[x].id == id) {
            competitionStore.rounds[competitionStore.selectedRound - 1].matches.splice(x, 1)
          }
        }
        return response
      })
      .catch((err) => {
        return err.response
      })
  },

  // MATCHPART
  addMatchpart(body) {
    console.log('ACTION -- addMatchpart')
    return axios
      .post('matchparts', body)
      .then((response) => {
        console.log(response.data)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  getMatchpartsByMatchId(id) {
    console.log('ACTION -- getMatchpartsByMatchId')
    const competitionStore = useCompetitionStore()
    return axios.get('matchparts/match/' + id).then((response) => {
      competitionStore.matchparts = response.data.matchParts
    })
  },

  // MINUTES
  getMinutesByMatchId(id) {
    console.log('ACTION -- getMinutesByMatchId')
    const competitionStore = useCompetitionStore()
    return axios.get('minutes/match/' + id).then((response) => {
      competitionStore.minutes = response.data.minutes
    })
  },
  addMinute(body) {
    console.log('ACTION -- addMinute')
    return axios
      .post('minutes', body)
      .then((response) => {
        console.log(response.data)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  deleteMinute(data) {
    console.log('ACTION -- deleteMinute')
    const competitionStore = useCompetitionStore()
    return axios
      .delete('minutes/' + data)
      .then((response) => {
        let index = competitionStore.minutes.findIndex((item) => item.id == response.data.id)
        competitionStore.minutes.splice(index, 1)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },

  // GOAL
  getGoalsByMatchId(id) {
    console.log('ACTION -- getGoalsByMatchId')
    const competitionStore = useCompetitionStore()
    return axios.get('goals/match/' + id).then((response) => {
      competitionStore.goals = response.data.goals
    })
  },
  addGoal(body) {
    console.log('ACTION -- addGoal')
    return axios
      .post('goals', body)
      .then((response) => {
        console.log(response.data)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  deleteGoal(data) {
    console.log('ACTION -- deleteGoal')
    const competitionStore = useCompetitionStore()
    return axios
      .delete('goals/' + data)
      .then((response) => {
        let index = competitionStore.goals.findIndex((item) => item.id == response.data.id)
        competitionStore.goals.splice(index, 1)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },

  // ASSIST
  getAssistsByMatchId(id) {
    console.log('ACTION -- getAssistsByMatchId')
    const competitionStore = useCompetitionStore()
    return axios.get('assists/match/' + id).then((response) => {
      competitionStore.assists = response.data.assists
    })
  },
  addAssist(body) {
    console.log('ACTION -- addAssist')
    return axios
      .post('assists', body)
      .then((response) => {
        console.log(response.data)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  deleteAssist(data) {
    console.log('ACTION -- deleteAssist')
    const competitionStore = useCompetitionStore()
    return axios
      .delete('assists/' + data)
      .then((response) => {
        let index = competitionStore.assists.findIndex((item) => item.id == response.data.id)
        competitionStore.assists.splice(index, 1)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },

  // CARDS
  getCardsByMatchId(id) {
    console.log('ACTION -- getCardsByMatchId')
    const competitionStore = useCompetitionStore()
    return axios.get('cards/match/' + id).then((response) => {
      competitionStore.cards = response.data.cards
    })
  },
  addCard(body) {
    console.log('ACTION -- addCard')
    return axios
      .post('cards', body)
      .then((response) => {
        console.log(response.data)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  deleteCard(data) {
    console.log('ACTION -- deleteCard')
    const competitionStore = useCompetitionStore()
    return axios
      .delete('cards/' + data)
      .then((response) => {
        let index = competitionStore.cards.findIndex((item) => item.id == response.data.id)
        competitionStore.cards.splice(index, 1)        
        return response
      })
      .catch((err) => {
        return err.response
      })
  },

  // SUBSTITUTIONS
  getSubstitutionsByMatchId(id) {
    console.log('ACTION -- getSubstitutionsByMatchId')
    const competitionStore = useCompetitionStore()
    return axios.get('substitutions/match/' + id).then((response) => {
      competitionStore.substitutions = response.data.substitutions
    })
  },
  addSubstitution(body) {
    console.log('ACTION -- addSubstitution')
    return axios
      .post('substitutions', body)
      .then((response) => {
        console.log(response.data)
        return response
      })
      .catch((err) => {
        return err.response
      })
  },
  deleteSubstitution(data) {
    console.log('ACTION -- deleteSubstitution')
    const competitionStore = useCompetitionStore()
    return axios
      .delete('substitutions/' + data)
      .then((response) => {
        let index = competitionStore.substitutions.findIndex(
          (item) => item.id == response.data.id
        )
        competitionStore.substitutions.splice(index, 1)
        return response
      })
      .catch((err) => {
        return err.response
      })
  }
}
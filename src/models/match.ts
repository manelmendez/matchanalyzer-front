import { ITeam } from "./team"

export type Match = {
  id?: number
  matchDay?: Date
  localTeam?: ITeam
  awayTeam?: ITeam
  localTeamGoals: number
  awayTeamGoals: number
  localTeamId: number
  awayTeamId: number
  competitionId: number
  roundId: number
  userId: number
}
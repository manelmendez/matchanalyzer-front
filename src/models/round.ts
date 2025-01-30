import { Match } from "./match"
import { ITeam } from "./team"

export type Round = {
  id?: number
  name: string
  date: Date
  competitionId: number
  userId: number
  matches?: Match[]
  ranking?: ITeam[]
}
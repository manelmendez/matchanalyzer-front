import { TeamStats } from "./types"
import { IPlayer } from "./player"

export interface ITeam {
  id?: number
  name: string
  avatar: string
  signupDate: Date
  season: number
  managerId?: number
  competitionId?: number
  userId: number
  stats?: TeamStats
  players?: IPlayer[]
}
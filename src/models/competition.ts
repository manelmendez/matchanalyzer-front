import { Round } from "./round";
import { ITeam } from "./team"

export interface ICompetition {
  id?: number;
  name: string;
  avatar?: string;
  discipline: string;
  signupDate?: Date;
  managerId: number;
  season: number;
  userId: number;
  category: string;
  teams?: ITeam[];
  rounds?: Round[]
}
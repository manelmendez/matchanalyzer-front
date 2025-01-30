import { Card } from "./card"
import { Goal } from "./goal"

export interface IPlayer {
  id?: number;
  firstname: string;
  lastname: string;
  name?: string;
  position: string;
  year: number;
  avatar: string;
  guest: boolean;
  teamId: number;
  userId: number;
  goals?: Goal[];
  cards?: Card[];
}
import { createPinia } from 'pinia'
import { useUserStore } from './modules/user'
import { useCompetitionStore } from './modules/competition'
import { useTeamStore } from './modules/team'
import { useCalendarStore } from './modules/calendar'
import { useRootStore } from './modules/root'

const pinia = createPinia()

export {
  pinia,
  useUserStore,
  useCompetitionStore,
  useTeamStore,
  useCalendarStore,
  useRootStore
}

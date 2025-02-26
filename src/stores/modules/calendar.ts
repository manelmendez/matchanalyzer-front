import { defineStore } from 'pinia'
import { calendarActions } from '../actions/calendarActions'
import { CalendarEvent } from '../../models/calendarEvent'
export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    events: [] as CalendarEvent[],
  }),
  actions: {
    ...calendarActions,
  },
  getters: {
  }
})

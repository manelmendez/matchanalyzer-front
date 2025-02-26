import axios from '@/assets/axios'
import { useCalendarStore } from '../modules/calendar'
import { CalendarEvent } from '@/models/calendarEvent'

export const calendarActions = {
  getUserEvents() {
    const calendarStore = useCalendarStore()
    console.log('ACTION -- getUserEvents')
    return axios.get('calendar').then((response) => {
      console.log(response.data.events)
      calendarStore.events = response.data.events
    })
  },

  // addEvent(credentials: any) {
  //   const userStore = useCalendarStore()
  //   console.log('ACTION -- signIn')
  //   return axios
  //     .post('users/signin', {}, { auth: credentials })
  //     .then((response) => {
  //       let authUser = {
  //         token: response.data.token,
  //         isLogged: true,
  //         ...response.data.user
  //       }
  //       console.log('authUser', authUser)
  //       axios.defaults.headers.common['Authorization'] =
  //         'Bearer ' + response.data.token
  //       window.localStorage.setItem('authUser', JSON.stringify(authUser))
  //       userStore.user = { ...authUser }
  //       userStore.isLogged = true
  //       return response
  //     })
  // },

  // deleteEvent(data: any) {
  //   const userStore = useCalendarStore()
  //   console.log('ACTION -- signUp')
  //   return axios
  //     .post('users', data.body, { auth: data.credentials })
  //     .then((response) => {
  //       let authUser = {
  //         token: response.data.token,
  //         isLogged: true,
  //         ...response.data.user
  //       }
  //       axios.defaults.headers.common['Authorization'] =
  //         'Bearer ' + response.data.token
  //       window.localStorage.setItem('authUser', JSON.stringify(authUser))
  //       userStore.user = { ...authUser }
  //       userStore.isLogged = true
  //       return response
  //     })
  // }
}
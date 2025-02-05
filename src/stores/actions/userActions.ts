import axios from '@/assets/axios'
import { useUserStore } from '../modules/user'
import { IUser } from '@/models/user'

export const userActions = {
  initializeStore() {
    const userStore = useUserStore()
    console.log('ACTION -- initializeStore')
    const authUser = JSON.parse(window.localStorage.getItem('authUser') || 'null')
    if (authUser) {
      userStore.user = authUser
    }
  },

  signIn(credentials: any) {
    const userStore = useUserStore()
    console.log('ACTION -- signIn')
    return axios
      .post('users/signin', {}, { auth: credentials })
      .then((response) => {
        let authUser = {
          token: response.data.token,
          isLogged: true,
          ...response.data.user
        }
        console.log('authUser', authUser)
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + response.data.token
        window.localStorage.setItem('authUser', JSON.stringify(authUser))
        userStore.user = { ...authUser }
        return response
      })
  },

  signUp(data: any) {
    const userStore = useUserStore()
    console.log('ACTION -- signUp')
    return axios
      .post('users', data.body, { auth: data.credentials })
      .then((response) => {
        let authUser = {
          token: response.data.token,
          isLogged: true,
          ...response.data.user
        }
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + response.data.token
        window.localStorage.setItem('authUser', JSON.stringify(authUser))
        userStore.user = { ...authUser }
        userStore.isLogged = true
        return response
      })
  },

  signOut() {
    const userStore = useUserStore()
    console.log('ACTION -- signOut')
    userStore.user = {} as IUser
    userStore.isLogged = false
    window.localStorage.removeItem('authUser')
    delete axios.defaults.headers.common['Authorization']
  }
}
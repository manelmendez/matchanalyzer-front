import { userMutations } from '@/stores/mutations/userMutations'
import * as userActions from '@/stores/actions/userActions'

interface UserState {
  user: { id: string; name: string; email: string; isLogged: boolean }
}

interface UserGetters {
  user: (state: UserState) => {
    id: string
    name: string
    email: string
    isLogged: boolean
  }
  isLogged: (state: UserState) => boolean
}

export const userModule = {
  namespaced: true,
  state: {
    user: {},
  } as UserState,
  getters: {
    user: (state: UserState) => {
      return state.user
    },
    isLogged: (state: UserState) => {
      return state.user.isLogged
    },
  } as UserGetters,
  mutations: {
    ...userMutations,
  },
  actions: {
    ...userActions,
  },
}

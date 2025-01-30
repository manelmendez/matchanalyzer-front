import { defineStore } from 'pinia'
import { userActions } from '../actions/userActions'
import { IUser } from '../../models/user'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser
  }),
  actions: {
    ...userActions,
  },
  getters: {
  }
})

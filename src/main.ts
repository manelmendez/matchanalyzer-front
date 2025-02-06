import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'
import { pinia, useUserStore } from './stores/store'
import axiosInstance from './assets/axios'
import { Emerald, Indigo, Red, Lime, Amber, Teal, Cyan, Sky, Stone } from './assets/themes'

const app = createApp(App)
const theme = window.localStorage.getItem('theme') || Emerald

app.use(PrimeVue, {
  theme: {
    preset: theme=="Emerald"?Emerald:theme=="Indigo"?Indigo:theme=="Red"?Red:theme=="Lime"?Lime:
    theme=="Amber"?Amber:theme=="Teal"?Teal:theme=="Cyan"?Cyan:theme=="Sky"?Sky:Stone,
    options: {
      cssLayer: {
        name: "primevue",
        order: "base, primevue",
      },
      darkModeSelector: '.my-app-dark',
    },
  },
})
app.use(pinia)
app.config.globalProperties.$axios = axiosInstance
const userStore = useUserStore()
userStore.initializeStore()
app.use(router)
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
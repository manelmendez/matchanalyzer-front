import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'
import { pinia, useUserStore } from './stores/store'
import * as axiosConfig from './assets/axios'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
    },
  },
})
app.use(pinia)
app.config.globalProperties.$axios = axiosConfig
const userStore = useUserStore()
userStore.initializeStore()
app.use(router)
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
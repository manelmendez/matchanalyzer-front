import axios from 'axios'
import constants from './constants/constants.js'
// import { useRootStore } from '../stores/store.js'
import router from '../router/index.js'

const axiosInstance = axios.create({
  baseURL: constants.API_ADDRESS
})

axiosInstance.defaults.headers.common['Accept'] = 'application/json';
axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axiosInstance.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

// add token to Auth header if onceLogged
const authUser = window.localStorage.getItem('authUser');
if (authUser) {
  const parsedAuthUser = JSON.parse(authUser);
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + parsedAuthUser.token;
}
const rootStore = () => import('../stores/store.js').then(module => module.useRootStore())
// Initialize Pinia
// const store = useRootStore(pinia);
axiosInstance.interceptors.response.use(
  async function (response) {
    if (response.status == 200 && response.config.method != "get") {
      let toast = {
        severity: 'success',
        summary: response.data.message,
        detail: '',
        life: 3000
      }
      const store = await rootStore();
      store.toast = toast;
    }
    return response
  },
  async function (error) {
    let toast = {
      severity: 'error',
      summary: 'Error',
      detail: '',
      life: 3000
    }
    const store = await rootStore();
    if (error.response) {
      if (error.response.status == 404) {
        // DO NOTHING FOR NOW
        // TODO
      } else if (error.response.status >= 400) {
        toast.detail = error.response.data.message
        store.toast = toast
        // if (error.response.status == 404) {
        //   router.push({name: "error"});
        // }
      } else {
        toast.detail = 'Error en la petición'
        store.toast = toast
      }
    } else if (error.request) {
      toast.detail = 'Se ha perdido la conexión con el servidor'
      // router.push('500')
      store.toast = toast
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
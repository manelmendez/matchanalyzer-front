import axios from 'axios'
import constants from './constants/constants'
import { pinia, useRootStore } from '../stores/store'
import router from '../router'

axios.defaults.baseURL = constants.API_ADDRESS

// add token to Auth header if onceLogged
const authUser = window.localStorage.getItem('authUser');
if (authUser) {
  const parsedAuthUser = JSON.parse(authUser);
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + parsedAuthUser.token;
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
}
// Initialize Pinia
const store = useRootStore(pinia);
axios.interceptors.response.use(
  function (response) {
    // if (response.status == 200 && response.config.method != "get") {
    //   let snackbar = {
    //     show: true,
    //     color: "success",
    //     text: response.data.message
    //   }
    //   store.commit("root/SNACKBAR", snackbar);
    // }
    return response
  },
  function (error) {
    let snackbar = {
      show: true,
      color: 'error',
      text: ''
    }
    if (error.response) {
      if (error.response.status == 404) {
        // DO NOTHING FOR NOW
        // TODO
      } else if (error.response.status >= 400) {
        snackbar.text = error.response.data.message
        store.snackbar = snackbar;
        // if (error.response.status == 404) {
        //   router.push({name: "error"});
        // }
      } else {
        snackbar.text = 'Error en la petición'
        store.snackbar = snackbar;
      }
    } else if (error.request) {
      snackbar.text = 'Se ha perdido la conexión con el servidor'
      router.push('500')
      store.snackbar = snackbar;
    }
    return Promise.reject(error)
  }
)

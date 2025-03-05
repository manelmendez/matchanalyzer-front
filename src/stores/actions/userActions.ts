import axios from "@/assets/axios";
import { useUserStore } from "../modules/user";
import { useRootStore } from "../modules/root";
import { IUser } from "@/models/user";

export const userActions = {
  initializeStore() {
    const userStore = useUserStore();
    const rootStore = useRootStore();
    console.log("ACTION -- initializeStore");
    const authUser = JSON.parse(
      window.localStorage.getItem("authUser") || "null"
    );
    if (authUser) {
      userStore.user = authUser;
    }
    const isDark = window.localStorage.getItem("dark") == "true" ? true : false;
    if (isDark === true) {
      if (!document.documentElement.classList.contains("my-app-dark")) {
        document.documentElement.classList.add("my-app-dark");
      }
    } else {
      document.documentElement.classList.remove("my-app-dark");
    }
    console.log("isDark", isDark);
    rootStore.isDark = isDark;
    const theme = window.localStorage.getItem("theme") || "Emerald";
    rootStore.theme = theme;
  },

  signIn(credentials: any) {
    const userStore = useUserStore();
    console.log("ACTION -- signIn");
    return axios
      .post("users/signin", {}, { auth: credentials })
      .then((response) => {
        let authUser = {
          token: response.data.token,
          isLogged: true,
          ...response.data.user,
        };
        console.log("authUser", authUser);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        window.localStorage.setItem("authUser", JSON.stringify(authUser));
        userStore.user = { ...authUser };
        userStore.isLogged = true;
        return response;
      });
  },

  signUp(data: any) {
    const userStore = useUserStore();
    console.log("ACTION -- signUp");
    return axios
      .post("users", data.body, { auth: data.credentials })
      .then((response) => {
        let authUser = {
          token: response.data.token,
          isLogged: true,
          ...response.data.user,
        };
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        window.localStorage.setItem("authUser", JSON.stringify(authUser));
        userStore.user = { ...authUser };
        userStore.isLogged = true;
        return response;
      });
  },

  signOut() {
    const userStore = useUserStore();
    console.log("ACTION -- signOut");
    userStore.user = {} as IUser;
    userStore.isLogged = false;
    window.localStorage.removeItem("authUser");
    delete axios.defaults.headers.common["Authorization"];
  },
};

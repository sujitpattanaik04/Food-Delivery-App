import { createStore } from "vuex";
import authModule from "./authModule";

const store = createStore({
  modules: {
    auth: authModule,
    //   request: requestModule,
  },
  state() {
    return {
      darkTheme: true,
    };
  },
  getters: {
    isDark(state) {
      return state.darkTheme;
    },
  },
  mutations: {
    toggleTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export default store;

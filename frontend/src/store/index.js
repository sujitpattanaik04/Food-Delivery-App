import { createStore } from "vuex";
import authModule from "./authModule";

const store = createStore({
  modules: {
    auth: authModule,
    //   request: requestModule,
  },
  state() {
    return {};
  },
  //   getters: {
  //     getUserId(state) {
  //       return state.userId;
  //     },
  //   },
});

export default store;

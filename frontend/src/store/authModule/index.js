import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

export default {
  state() {
    return {
      user: null,
      authToken: null,
    };
  },
  getters,
  mutations,
  actions,
};

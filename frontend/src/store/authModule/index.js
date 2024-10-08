// import axios from "axios";
// import { toast } from "vue3-toastify";
// import "vue3-toastify/dist/index.css";
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

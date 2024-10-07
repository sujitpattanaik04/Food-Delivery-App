export default {
  setUser(state, payload) {
    state.user = payload.user;
  },
  getUser(state) {
    return state.user;
  },
  removeUser(state) {
    state.user = null;
  },
};

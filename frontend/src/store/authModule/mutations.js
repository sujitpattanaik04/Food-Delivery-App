export default {
  setUser(state, payload) {
    state.user = payload.user;
    state.isLoggedIn = true;
  },
  removeUser(state) {
    state.user = null;
    state.isLoggedIn = false;
  },
};

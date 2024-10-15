export default {
  setUser(state, user) {
    state.user = user;
    state.isLoggedIn = true;
  },
  removeUser(state) {
    state.user = null;
    state.isLoggedIn = false;
  },
};

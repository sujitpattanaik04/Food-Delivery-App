export default {
  setUser(state, payload) {
    state.user = payload.user;
  },
  // setToken(state, payload) {
  //   state.authToken = payload.token;
  // },
  removeUser(state) {
    state.user = null;
  },
};

export default {
  setUser(state, payload) {
    state.user = payload.user;
  },
  setToken(state, payload) {
    state.authToken = payload.token;
  },
  getUser(state) {
    let user = { ...state.user };
    console.log(user);

    return user;
  },
  removeUser(state) {
    state.user = null;
  },
};

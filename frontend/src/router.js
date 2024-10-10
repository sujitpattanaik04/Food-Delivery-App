import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

import SignUp from "./pages/SignUp.vue";
import LogIn from "./pages/LogIn.vue";
import DashBoard from "./pages/DashBoard.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import ChangePassword from "./pages/ChangePassword.vue";
import PageNotFound from "./pages/PageNotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/signup",
      component: SignUp,
      meta: { login: false },
    },
    {
      path: "/login",
      component: LogIn,
      meta: { login: false },
    },
    {
      path: "/dashboard",
      component: DashBoard,
      meta: { login: true },
    },
    { path: "/forgot-password", component: ForgotPassword },
    { path: "/reset-password/:token", component: ResetPassword },
    {
      path: "/change-password",
      component: ChangePassword,
      meta: { login: true },
    },
    { path: "/:notfound(.*)", component: PageNotFound },
  ],
});

router.beforeEach(async (to, from, next) => {
  // const isLoggedIn = store.state.isLoggedIn;

  // if (!isLoggedIn) {
  //   await store.dispatch("getUserDetails");
  // }
  // if (isLoggedIn && !to.meta.login) {
  //   return next("/dashboard");
  // } else if (!isLoggedIn && to.meta.login) {
  //   return next("/login");
  // } else {
  //   next();
  // }

  console.log(store.state.auth.isLoggedIn);

  if (!store.state.auth.isLoggedIn) {
    await store.dispatch("getUserDetails");
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.auth.user) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;

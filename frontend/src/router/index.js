import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import DashBoard from "../views/DashBoard.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import ChangePassword from "../views/ChangePassword.vue";
import PageNotFound from "../views/PageNotFound.vue";

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
  if (!store.state.auth.isLoggedIn) {
    await store.dispatch("getUserDetails");
  }

  if (store.state.auth.isLoggedIn && !to.meta.login) {
    return next("/dashboard");
  } else if (!store.state.auth.isLoggedIn && to.meta.login) {
    return next("/login");
  } else {
    next();
  }
});

export default router;

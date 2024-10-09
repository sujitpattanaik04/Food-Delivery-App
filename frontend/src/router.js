import { createRouter, createWebHistory } from "vue-router";
import Store from "./store/index.js";

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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Store.getters.getUser;

  if (to.meta.login && !isAuthenticated) {
    return next("/login");
  }

  if (!to.meta.login && isAuthenticated) {
    return next("/dashboard");
  }

  next();
});

export default router;

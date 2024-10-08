import { createRouter, createWebHistory } from "vue-router";

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
    { path: "/", redirect: "/signup" },
    { path: "/signup", component: SignUp },
    { path: "/login", component: LogIn },
    { path: "/dashboard", component: DashBoard },
    { path: "/forgot-password", component: ForgotPassword },
    { path: "/reset-password/:token", component: ResetPassword },
    { path: "/change-password", component: ChangePassword },
    { path: "/:notfound(.*)", component: PageNotFound },
  ],
});

export default router;

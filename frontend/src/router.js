import { createRouter, createWebHistory } from "vue-router";

import SignUp from "./pages/SignUp.vue";
import LogIn from "./pages/LogIn.vue";
import DashBoard from "./pages/DashBoard.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";

// import CoachDetails from "./pages/coaches/CoachDetails.vue";
// import ContactCoach from "./pages/requests/ContactCoach.vue";
// import ReceivedRequests from "./pages/requests/ReceivedRequests.vue";
// import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
// import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: "/", redirect: "/coaches" },

    { path: "/signup", component: SignUp },
    { path: "/login", component: LogIn },
    { path: "/dashboard", component: DashBoard },
    { path: "/forgot-password", component: ForgotPassword },

    // {
    //   path: "/coaches/:id",
    //   component: CoachDetails,
    //   children: [{ path: "contact", component: ContactCoach }],
    // },
    // { path: "/requests", component: ReceivedRequests },
    // { path: "/register", component: CoachRegistration },
    // { path: "/:notfound(.*)", component: NotFound },
  ],
});

export default router;

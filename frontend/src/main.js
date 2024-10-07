import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router.js";
// import store from "./store/index.js";

const app = createApp(App);

app.use(Router);
// app.use(store);

app.mount("#app");

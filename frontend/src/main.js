import { createApp } from "vue";

import App from "./App.vue";
import Router from "./router.js";
// import store from "./store/index.js";
// import BaseCard from "./components/UI/BaseCard.vue";
// import BaseBtn from "./components/UI/BaseBtn";

const app = createApp(App);

app.use(Router);
// app.use(store);
// app.component("base-card", BaseCard);
// app.component("base-btn", BaseBtn);

app.mount("#app");

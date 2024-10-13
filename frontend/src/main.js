import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import TheHeader from "./components/UI/TheHeader.vue";
import "./assets/global.css";

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component("the-header", TheHeader)
  .mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./scss/main.scss";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

// // vue-fullscreen
// import fullscreen from 'vue-fullscreen'
// Vue.use(fullscreen)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

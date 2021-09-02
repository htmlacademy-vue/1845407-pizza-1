import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import "@/plugins/vuePlugins";

Vue.config.productionTip = false;

import AppHeader from "@/components/AppHeader";
import AppNotification from "@/components/AppNotification";
Vue.component("AppHeader", AppHeader);
Vue.component("AppNotification", AppNotification);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

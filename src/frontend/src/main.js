import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import "@/plugins/vuePlugins";

Vue.config.productionTip = false;

import AppHeader from "@/components/AppHeader";
Vue.component("AppHeader", AppHeader);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

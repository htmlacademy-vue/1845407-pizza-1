import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import AppMetaLayout from "./components/AppMetaLayout";
import AppHeader from "./components/AppHeader";

Vue.config.productionTip = false;

Vue.component("AppMetaLayout", AppMetaLayout);
Vue.component("AppHeader", AppHeader);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

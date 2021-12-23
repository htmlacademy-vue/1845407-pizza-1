import Vue from "vue";
import JWTService from "@/services/jwt.service";
import Notifier from "@/plugins/notifier";
import store from "@/store";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JWTService,
        $api() {
          return createResources(this.$notifier);
        },

        $notifier: () => new Notifier(store),
      },
    });
  },
};

Vue.use(plugins);

import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";
import { RESET_CHOICE } from "./modules/builder.store";
import { SET_ACCOUNT } from "./modules/auth.store";

Vue.use(Vuex);

const state = () => ({});

const actions = {
  async init({ dispatch }) {
    if (this.$jwt.getToken()) {
      this.$api.auth.setAuthHeader();
      await dispatch(`Auth/${SET_ACCOUNT}`);
    }

    await dispatch(`Builder/${RESET_CHOICE}`);
  },
};

const mutations = {};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules,
});

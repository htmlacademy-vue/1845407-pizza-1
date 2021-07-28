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
    dispatch(`Builder/${RESET_CHOICE}`);

    if (this.$jwt.getToken()) {
      this.$api.auth.setAuthHeader();
      dispatch(`Auth/${SET_ACCOUNT}`);
    }
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

import uniqueId from "lodash/uniqueId";
import reject from "lodash/reject";

import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";
import { RESET_CHOICE } from "./modules/builder.store";
import { RESET_CART } from "./modules/cart.store";
import { SET_ACCOUNT } from "./modules/auth.store";
import { MESSAGE_LIVE_TIME } from "@/common/constants";

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
//export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
});

const actions = {
  async init({ dispatch }) {
    dispatch(`Builder/${RESET_CHOICE}`);
    dispatch(`Cart/${RESET_CART}`);

    if (this.$jwt.getToken()) {
      this.$api.auth.setAuthHeader();
      dispatch(`Auth/${SET_ACCOUNT}`);
    }
  },
  [ADD_NOTIFICATION]({ state, commit }, { ...notification }) {
    const id = uniqueId();

    commit(UPDATE_NOTIFICATIONS, [
      ...state.notifications,
      { ...notification, id },
    ]);

    setTimeout(
      () => commit(UPDATE_NOTIFICATIONS, reject(state.notifications, { id })),
      MESSAGE_LIVE_TIME
    );
  },
};

const mutations = {
  [UPDATE_NOTIFICATIONS](state, notifications) {
    Object.assign(state, { notifications });
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules,
});

import _ from "lodash";

export const AUTHENTICATE = "AUTHENTICATE";
export const SET_ACCOUNT = "SET_ACCOUNT";

import accountData from "@/static/user.json";

import router from "@/router";

export default {
  namespaced: true,
  state: () => ({
    account: {},
  }),
  getters: {
    isLogged({ account }) {
      return !_.isEmpty(account);
    },
  },
  actions: {
    [AUTHENTICATE]({ commit }, account) {
      account = account.email && account.password ? accountData : {};
      commit(SET_ACCOUNT, { account: account });
    },
  },
  mutations: {
    [SET_ACCOUNT](state, account) {
      Object.assign(state, account);
      if (router.currentRoute.name === "login") {
        router.back();
      } else {
        router.push({ name: "builder" });
      }
    },
  },
};

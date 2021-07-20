import { isEmpty } from "lodash";
import router from "@/router";

import accountData from "@/static/user.json";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGIN_REDIRECT = "LOGIN_REDIRECT";
export const CART_ORDER_REDIRECT = "CART_ORDER_REDIRECT";

export default {
  namespaced: true,
  state: () => ({
    account: {},
  }),
  getters: {
    isLogged({ account }) {
      return !isEmpty(account);
    },
  },
  actions: {
    [AUTHENTICATE]({ commit, dispatch }, account) {
      account = account.email && account.password ? accountData : {};
      commit(AUTHENTICATE, { account: account });
      dispatch(LOGIN_REDIRECT);
    },
    [LOGIN_REDIRECT]() {
      if (router.currentRoute.name === "login") {
        router.back();
      } else {
        router.push({ name: "builder" });
      }
    },
    [CART_ORDER_REDIRECT]({ getters }) {
      if (getters.isLogged) {
        router.replace({ name: "orders" });
      } else {
        router.replace({ name: "builder" });
      }
    },
  },
  mutations: {
    [AUTHENTICATE](state, account) {
      Object.assign(state, account);
    },
  },
};

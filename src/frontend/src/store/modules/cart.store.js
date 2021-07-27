import uniqueId from "lodash/uniqueId";
import find from "lodash/find";
import router from "@/router";

import additionalData from "@/static/misc.json";
import { MISC_ADDITIONAL } from "@/common/constants";
import { pizzaTypesMixin } from "@/common/helpers";

export const UPDATE_CART = "UPDATE_CART";
export const SUBMIT_CART = "SUBMIT_CART";
export const RESET_CART = "RESET_CART";
import { ADD_TO_CART, RESET_CHOICE } from "@/store/modules/builder.store";
import { CART_ORDER_REDIRECT } from "@/store/modules/auth.store.js";

const state = () => ({
  pizzas: [],
  additional: pizzaTypesMixin(additionalData, MISC_ADDITIONAL),
  delivery: {
    type: "",
    phone: "",
    street: "",
    building: "",
    room: "",
  },
});

export default {
  namespaced: true,
  state,
  getters: {
    price({ pizzas, additional }) {
      let price = 0;

      if (!pizzas.length) return price;

      price += pizzas.reduce((sum, { price, count }) => sum + price * count, 0);
      price += additional.reduce(
        (sum, { price, count }) => sum + price * count,
        0
      );
      return price;
    },
    isEmpty({ pizzas }) {
      return !pizzas.length;
    },
  },
  actions: {
    [ADD_TO_CART]({ state, dispatch }, choice) {
      let pizzas = [...state.pizzas];
      let current = find(pizzas, ["id", choice.id]);
      if (current) {
        Object.assign(current, choice);
        router.push({ name: "cart" });
      } else {
        Object.assign(choice, { id: uniqueId(), count: 1 });
        pizzas = [...pizzas, choice];
        dispatch(`Builder/${RESET_CHOICE}`, null, { root: true });
      }
      dispatch(UPDATE_CART, { pizzas });
    },
    [UPDATE_CART]({ commit }, cart) {
      commit(UPDATE_CART, cart);
    },
    [SUBMIT_CART]({ commit }) {
      // отправить заказ на сервер
      commit(SUBMIT_CART);
    },
    [RESET_CART]({ commit, dispatch }) {
      commit(UPDATE_CART, state());
      dispatch(`Auth/${CART_ORDER_REDIRECT}`, null, { root: true });
    },
  },
  mutations: {
    [UPDATE_CART](state, cart) {
      Object.assign(state, cart);
    },
    [SUBMIT_CART]() {
      router.push({ name: "thanks" });
    },
  },
};

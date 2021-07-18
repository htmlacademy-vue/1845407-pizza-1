import { uniqueId } from "lodash";

import additionalData from "@/static/misc.json";
import { MISC_ADDITIONAL } from "@/common/constants";
import { pizzaTypesMixin } from "@/common/helpers";

export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";

export default {
  namespaced: true,
  state: () => ({
    pizzas: [],
    additional: pizzaTypesMixin(additionalData, MISC_ADDITIONAL),
    delivery: {
      type: "",
      phone: "",
      street: "",
      building: "",
      room: "",
    },
  }),
  getters: {
    price({ pizzas, additional }) {
      let price = 0;
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
    [ADD_TO_CART]({ commit }, pizza) {
      commit(ADD_TO_CART, { uid: uniqueId(), count: 1, ...pizza });
    },
    [UPDATE_CART]({ commit }, cart) {
      commit(UPDATE_CART, { ...cart });
    },
  },
  mutations: {
    [ADD_TO_CART](state, pizza) {
      const index = state.pizzas.findIndex(({ uid }) => uid === pizza.uid);
      if (~index) {
        state.pizzas.splice(index, 1, pizza);
      } else {
        state.pizzas.push(pizza);
      }
    },
    [UPDATE_CART](state, cart) {
      Object.assign(state, cart);
    },
  },
};

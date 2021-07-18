import { uniqueId } from "lodash";

import additionalData from "@/static/misc.json";
import { MISC_ADDITIONAL } from "@/common/constants";
import { pizzaTypesMixin } from "@/common/helpers";

export const UPDATE_CART = "UPDATE_CART";
import { ADD_TO_CART } from "@/store/modules/builder.store";

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
    [ADD_TO_CART]({ commit, state }, pizza) {
      let pizzas = [...state.pizzas];
      const index = pizzas.findIndex(({ id }) => id === pizza.id);
      if (~index) {
        Object.assign(pizzas[index], pizza);
      } else {
        pizzas.push({ ...pizza, id: uniqueId(), count: 1 });
      }
      commit(UPDATE_CART, { pizzas });
    },
    [UPDATE_CART]({ commit }, cart) {
      commit(UPDATE_CART, { ...cart });
    },
  },
  mutations: {
    [UPDATE_CART](state, cart) {
      Object.assign(state, cart);
    },
  },
};

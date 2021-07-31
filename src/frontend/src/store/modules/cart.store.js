import uniqueId from "lodash/uniqueId";
import find from "lodash/find";

import { MISC_ADDITIONAL } from "@/common/constants";
import { pizzaTypesMixin } from "@/common/helpers";

export const UPDATE_CART = "UPDATE_CART";
export const SUBMIT_CART = "SUBMIT_CART";
export const RESET_CART = "RESET_CART";
import { ADD_TO_CART, RESET_CHOICE } from "@/store/modules/builder.store";

const state = () => ({
  pizzas: [],
  additional: [],
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
        this.$router.push({ name: "cart" });
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
    async [RESET_CART]({ commit }) {
      // загрузить допы
      const additional = pizzaTypesMixin(
        await this.$api.misc.query(),
        MISC_ADDITIONAL
      );
      commit(UPDATE_CART, { ...state(), additional });
    },
  },
  mutations: {
    [UPDATE_CART](state, cart) {
      Object.assign(state, cart);
    },
    [SUBMIT_CART]() {
      this.$router.push({ name: "thanks" });
    },
  },
};

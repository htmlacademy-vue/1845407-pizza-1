import find from "lodash/find";

import {
  PIZZA_DOUGH_TYPES,
  PIZZA_INGREDIENTS_TYPES,
  PIZZA_SAUCES_TYPES,
  PIZZA_SIZES_TYPES,
} from "@/common/constants";
import { pizzaTypesMixin } from "@/common/helpers";

export const UPDATE_CHOICE = "UPDATE_CHOICE";
export const LOAD_CHOICE = "LOAD_CHOICE";
export const RESET_CHOICE = "RESET_CHOICE";
export const ADD_TO_CART = "ADD_TO_CART";

const state = () => ({
  id: "",
  title: "",
  dough: [],
  sizes: [],
  sauces: [],
  ingredients: [],
});

export default {
  namespaced: true,
  state,
  getters: {
    choice({ id, title, dough, sizes, sauces, ingredients }) {
      const _dough = find(dough, "checked"),
        size = find(sizes, "checked"),
        sauce = find(sauces, "checked");
      let price = 0;
      price += ingredients.reduce(
        (total, ingredient) => total + ingredient?.price * ingredient?.count,
        0
      );
      price += dough?.price ?? 0;
      price += sauce?.price ?? 0;
      price *= size?.multiplier ?? 0;
      return { id, title, dough: _dough, size, sauce, ingredients, price };
    },
  },
  actions: {
    [UPDATE_CHOICE]({ commit }, choice) {
      commit(UPDATE_CHOICE, choice);
    },
    [LOAD_CHOICE]({ state, commit }, choice) {
      let { dough, sizes, sauces } = state;
      const { id, title, ingredients } = choice;
      dough = dough.map((item) => ({ ...item, checked: false }));
      dough = pizzaTypesMixin(dough, [choice.dough]);
      sizes = sizes.map((item) => ({ ...item, checked: false }));
      sizes = pizzaTypesMixin(sizes, [choice.size]);
      sauces = sauces.map((item) => ({ ...item, checked: false }));
      sauces = pizzaTypesMixin(sauces, [choice.sauce]);

      commit(UPDATE_CHOICE, { id, title, dough, sizes, sauces, ingredients });
    },
    async [RESET_CHOICE]({ dispatch }) {
      dispatch(UPDATE_CHOICE, state());
      dispatch("query", { component: "dough", mixin: PIZZA_DOUGH_TYPES });
      dispatch("query", { component: "sizes", mixin: PIZZA_SIZES_TYPES });
      dispatch("query", { component: "sauces", mixin: PIZZA_SAUCES_TYPES });
      dispatch("query", {
        component: "ingredients",
        mixin: PIZZA_INGREDIENTS_TYPES,
      });
    },
    [ADD_TO_CART]({ dispatch, getters }) {
      dispatch(`Cart/${ADD_TO_CART}`, getters.choice, { root: true });
    },
    async query({ dispatch }, { component, mixin }) {
      const items = {};
      items[component] = pizzaTypesMixin(
        await this.$api[component].query(),
        mixin
      );
      dispatch(UPDATE_CHOICE, items);
    },
  },
  mutations: {
    [UPDATE_CHOICE](state, choice) {
      Object.assign(state, choice);
    },
  },
};

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
  doughs: [],
  sizes: [],
  sauces: [],
  ingredients: [],
});

export default {
  namespaced: true,
  state,
  getters: {
    choice({ id, title, doughs, sizes, sauces, ingredients }) {
      const dough = find(doughs, "checked"),
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
      return { id, title, dough, size, sauce, ingredients, price };
    },
  },
  actions: {
    [UPDATE_CHOICE]({ commit }, choice) {
      commit(UPDATE_CHOICE, choice);
    },
    [LOAD_CHOICE]({ state, commit }, choice) {
      let { doughs, sizes, sauces } = state;
      const { id, title, dough, size, sauce, ingredients } = choice;
      doughs = doughs.map((item) => ({ ...item, checked: false }));
      doughs = pizzaTypesMixin(doughs, [dough]);
      sizes = sizes.map((item) => ({ ...item, checked: false }));
      sizes = pizzaTypesMixin(sizes, [size]);
      sauces = sauces.map((item) => ({ ...item, checked: false }));
      sauces = pizzaTypesMixin(sauces, [sauce]);

      commit(UPDATE_CHOICE, { id, title, doughs, sizes, sauces, ingredients });
    },
    async [RESET_CHOICE]({ dispatch }) {
      let [doughs, sizes, sauces, ingredients] = await Promise.all([
        this.$api.dough.query(),
        this.$api.sizes.query(),
        this.$api.sauces.query(),
        this.$api.ingredients.query(),
      ]);

      doughs = pizzaTypesMixin(doughs, PIZZA_DOUGH_TYPES);
      sizes = pizzaTypesMixin(sizes, PIZZA_SIZES_TYPES);
      sauces = pizzaTypesMixin(sauces, PIZZA_SAUCES_TYPES);
      ingredients = pizzaTypesMixin(ingredients, PIZZA_INGREDIENTS_TYPES);

      dispatch(UPDATE_CHOICE, { doughs, sizes, sauces, ingredients });
    },
    [ADD_TO_CART]({ dispatch, getters }) {
      dispatch(`Cart/${ADD_TO_CART}`, getters.choice, { root: true });
    },
  },
  mutations: {
    [UPDATE_CHOICE](state, choice) {
      Object.assign(state, choice);
    },
  },
};

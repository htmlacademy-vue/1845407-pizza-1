import find from "lodash/find";

import pizzaConfigParts from "@/static/pizza.json";
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
  doughs: pizzaTypesMixin(pizzaConfigParts.dough, PIZZA_DOUGH_TYPES),
  sizes: pizzaTypesMixin(pizzaConfigParts.sizes, PIZZA_SIZES_TYPES),
  sauces: pizzaTypesMixin(pizzaConfigParts.sauces, PIZZA_SAUCES_TYPES),
  ingredients: pizzaTypesMixin(
    pizzaConfigParts.ingredients,
    PIZZA_INGREDIENTS_TYPES
  ),
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
        (total, ingredient) => total + ingredient.price * ingredient.count,
        0
      );
      price += dough.price;
      price += sauce.price;
      price *= size.multiplier;
      return { id, title, dough, size, sauce, ingredients, price };
    },
  },
  actions: {
    [UPDATE_CHOICE]({ commit }, choice) {
      commit(UPDATE_CHOICE, choice);
    },
    [LOAD_CHOICE]({ commit }, { id, title, dough, size, sauce, ingredients }) {
      let { doughs, sizes, sauces } = state();
      doughs = doughs.map((item) => ({ ...item, checked: false }));
      doughs = pizzaTypesMixin(doughs, [dough]);
      sizes = sizes.map((item) => ({ ...item, checked: false }));
      sizes = pizzaTypesMixin(sizes, [size]);
      sauces = sauces.map((item) => ({ ...item, checked: false }));
      sauces = pizzaTypesMixin(sauces, [sauce]);
      commit(UPDATE_CHOICE, { id, title, doughs, sizes, sauces, ingredients });
    },
    [RESET_CHOICE]({ dispatch }) {
      dispatch(UPDATE_CHOICE, state());
    },
    [ADD_TO_CART]({ dispatch, getters }) {
      dispatch(`Cart/${ADD_TO_CART}`, getters.choice, { root: true });
      dispatch(RESET_CHOICE);
    },
  },
  mutations: {
    [UPDATE_CHOICE](state, choice) {
      Object.assign(state, choice);
    },
  },
};

import _ from "lodash";
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
    choice({ title, doughs, sizes, sauces, ingredients }) {
      ingredients = _.filter(ingredients, "count");
      const dough = _.find(doughs, "checked"),
        size = _.find(sizes, "checked"),
        sauce = _.find(sauces, "checked");
      let price = 0;
      price += ingredients.reduce(
        (total, ingredient) => total + ingredient.price * ingredient.count,
        0
      );
      price += dough.price;
      price += sauce.price;
      price *= size.multiplier;
      return { title, dough, size, sauce, ingredients, price };
    },
  },
  actions: {
    [UPDATE_CHOICE]({ commit }, choice) {
      commit(UPDATE_CHOICE, choice);
    },
    [LOAD_CHOICE]({ commit }, choice) {
      commit(LOAD_CHOICE, choice);
    },
    [ADD_TO_CART]({ dispatch, getters }) {
      dispatch(`Cart/${ADD_TO_CART}`, getters.choice, { root: true });
      dispatch(UPDATE_CHOICE, state());
    },
  },
  mutations: {
    [UPDATE_CHOICE](state, choice) {
      Object.assign(state, choice);
    },
    [LOAD_CHOICE](state, { id, title, dough, size, sauce, ingredients }) {
      const doughs = pizzaTypesMixin(
        state.doughs.map(({ dough }) => ({ ...dough, checked: false })),
        [dough]
      );
      const sizes = pizzaTypesMixin(
        state.sizes.map(({ size }) => ({ ...size, checked: false })),
        [size]
      );
      const sauces = pizzaTypesMixin(
        state.sauces.map(({ sauce }) => ({ ...sauce, checked: false })),
        [sauce]
      );
      ingredients = pizzaTypesMixin(
        state.ingredients.map(({ ingredient }) => ({
          ...ingredient,
          count: 0,
        })),
        ingredients
      );
      Object.assign(state, { id, title, doughs, sizes, sauces, ingredients });
    },
  },
};

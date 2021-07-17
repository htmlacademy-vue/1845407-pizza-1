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
export const ADD_TO_CART = "ADD_TO_CART";

const state = () => ({
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
    [UPDATE_CHOICE]({ commit }, data) {
      commit(UPDATE_CHOICE, data);
    },
    [ADD_TO_CART]({ dispatch, getters }) {
      dispatch(`Cart/${ADD_TO_CART}`, getters.choice, { root: true });
      dispatch(UPDATE_CHOICE, state());
    },
  },
  mutations: {
    [UPDATE_CHOICE](state, data) {
      Object.assign(state, data);
    },
  },
};

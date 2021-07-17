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

export default {
  namespaced: true,
  state: () => ({
    title: "",
    doughs: pizzaTypesMixin(pizzaConfigParts.dough, PIZZA_DOUGH_TYPES),
    sizes: pizzaTypesMixin(pizzaConfigParts.sizes, PIZZA_SIZES_TYPES),
    sauces: pizzaTypesMixin(pizzaConfigParts.sauces, PIZZA_SAUCES_TYPES),
    ingredients: pizzaTypesMixin(
      pizzaConfigParts.ingredients,
      PIZZA_INGREDIENTS_TYPES
    ),
  }),
  getters: {
    choice({ title, doughs, sizes, sauces, ingredients }) {
      return {
        title: title,
        dough: _.find(doughs, "checked"),
        size: _.find(sizes, "checked"),
        sauce: _.find(sauces, "checked"),
        ingredients: _.filter(ingredients, "count"),
      };
    },
  },
  actions: {
    updateChoice({ commit }, data) {
      commit(UPDATE_CHOICE, data);
    },
  },
  mutations: {
    [UPDATE_CHOICE](state, data) {
      Object.assign(state, data);
    },
  },
};

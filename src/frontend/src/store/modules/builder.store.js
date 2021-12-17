import find from "lodash/find";

import {
  PIZZA_DOUGH_TYPES,
  PIZZA_INGREDIENTS_TYPES,
  PIZZA_SAUCES_TYPES,
  PIZZA_SIZES_TYPES,
} from "@/common/constants";
import { normalizeByKey } from "@/common/helpers";

export const UPDATE_CHOICE = "UPDATE_CHOICE";
export const LOAD_CHOICE = "LOAD_CHOICE";
export const RESET_CHOICE = "RESET_CHOICE";
export const ADD_TO_CART = "ADD_TO_CART";

const state = () => ({
  id: "",
  name: "",
  dough: [],
  sizes: [],
  sauces: [],
  ingredients: [],
});

export default {
  namespaced: true,
  state,
  getters: {
    choice({ id, name, dough, sizes, sauces, ingredients }) {
      const _dough = find(dough, "checked"),
        size = find(sizes, "checked"),
        sauce = find(sauces, "checked");
      let price = 0;
      price += ingredients.reduce(
        (total, ingredient) => total + ingredient?.price * ingredient?.quantity,
        0
      );
      price += _dough?.price ?? 0;
      price += sauce?.price ?? 0;
      price *= size?.multiplier ?? 0;
      return { id, name, dough: _dough, size, sauce, ingredients, price };
    },
  },
  actions: {
    [UPDATE_CHOICE]({ commit }, choice) {
      commit(UPDATE_CHOICE, choice);
    },
    [LOAD_CHOICE]({ state, commit }, choice) {
      let { dough, sizes, sauces } = state;
      const { id, name, ingredients } = choice;
      dough = dough.map((item) => ({ ...item, checked: false }));
      dough = normalizeByKey(dough, [choice.dough], "name");
      sizes = sizes.map((item) => ({ ...item, checked: false }));
      sizes = normalizeByKey(sizes, [choice.size], "name");
      sauces = sauces.map((item) => ({ ...item, checked: false }));
      sauces = normalizeByKey(sauces, [choice.sauce], "name");

      commit(UPDATE_CHOICE, { id, name, dough, sizes, sauces, ingredients });
    },
    async [RESET_CHOICE]({ dispatch }) {
      dispatch(UPDATE_CHOICE, state());
      dispatch("query", { resource: "dough", mixin: PIZZA_DOUGH_TYPES });
      dispatch("query", { resource: "sizes", mixin: PIZZA_SIZES_TYPES });
      dispatch("query", { resource: "sauces", mixin: PIZZA_SAUCES_TYPES });
      dispatch("query", {
        resource: "ingredients",
        mixin: PIZZA_INGREDIENTS_TYPES,
      });
    },
    [ADD_TO_CART]({ dispatch, getters }) {
      dispatch(`Cart/${ADD_TO_CART}`, getters.choice, { root: true });
    },
    async query({ dispatch }, { resource, mixin }) {
      const resources = {};
      resources[resource] = normalizeByKey(
        await this.$api[resource].query(),
        mixin,
        "name"
      );
      dispatch(UPDATE_CHOICE, resources);
    },
  },
  mutations: {
    [UPDATE_CHOICE](state, choice) {
      Object.assign(state, choice);
    },
  },
};

import uniqueId from "lodash/uniqueId";
import find from "lodash/find";
import pick from "lodash/pick";

import { MISC_ADDITIONAL } from "@/common/constants";
import { normalizeByKey } from "@/common/helpers";

export const UPDATE_CART = "UPDATE_CART";
export const RESET_CART = "RESET_CART";
import { ADD_TO_CART, RESET_CHOICE } from "@/store/modules/builder.store";

const state = () => ({
  pizzas: [],
  misc: [],
  phone: "",
  address: {
    id: null,
    name: null,
    street: "",
    building: "",
    flat: "",
  },
});

export default {
  namespaced: true,
  state,
  getters: {
    price({ pizzas, misc }) {
      let price = 0;

      if (!pizzas.length) return price;

      price += pizzas.reduce(
        (sum, { price, quantity }) => sum + price * quantity,
        0
      );
      price += misc.reduce(
        (sum, { price, quantity }) => sum + price * quantity,
        0
      );
      return price;
    },
    isEmpty({ pizzas }) {
      return !pizzas.length;
    },
    toJson({ pizzas, misc, phone, address }) {
      return {
        pizzas: pizzas.map(
          ({ dough, size, sauce, ingredients, name, quantity }) => ({
            name,
            quantity,
            doughId: dough.id,
            sizeId: size.id,
            sauceId: sauce.id,
            ingredients: ingredients
              .filter(({ quantity }) => quantity)
              .map(({ id, quantity }) => ({ ingredientId: id, quantity })),
          })
        ),
        misc: misc
          .filter(({ quantity }) => quantity)
          .map(({ id, quantity }) => ({ miscId: id, quantity })),
        phone,
        address:
          address &&
          pick(address, address.id ? ["id"] : ["street", "building", "flat"]),
      };
    },
  },
  actions: {
    [ADD_TO_CART]({ state, dispatch }, choice) {
      let pizzas = [...state.pizzas];
      let current = find(pizzas, ["id", choice.id]);
      if (current) {
        Object.assign(current, choice);
      } else {
        pizzas = [...pizzas, { ...choice, id: uniqueId(), quantity: 1 }];
        dispatch(`Builder/${RESET_CHOICE}`, null, { root: true });
      }
      dispatch(UPDATE_CART, { pizzas });
    },
    [UPDATE_CART]({ commit }, cart) {
      commit(UPDATE_CART, cart);
    },
    async [RESET_CART]({ dispatch }) {
      dispatch(UPDATE_CART, state());
      // загрузить допы
      const misc = normalizeByKey(
        await this.$api.misc.query(),
        MISC_ADDITIONAL,
        "name"
      );
      dispatch(UPDATE_CART, { misc });
    },
  },
  mutations: {
    [UPDATE_CART](state, cart) {
      Object.assign(state, cart);
    },
  },
};

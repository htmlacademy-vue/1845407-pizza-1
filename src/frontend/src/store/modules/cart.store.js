import { uniqueId } from "lodash";

export const ADD_TO_CART = "ADD_TO_CART";

export default {
  namespaced: true,
  state: () => ({
    pizzas: [],
    additional: [],
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
  },
  actions: {
    [ADD_TO_CART]({ commit }, pizza) {
      commit(ADD_TO_CART, { uid: uniqueId(), count: 1, ...pizza });
    },
  },
  mutations: {
    [ADD_TO_CART](state, pizza) {
      console.log({ cart: pizza });
      const index = state.pizzas.findIndex(({ uid }) => uid === pizza.uid);
      if (~index) {
        state.pizzas.splice(index, 1, pizza);
      } else {
        state.pizzas.push(pizza);
      }
    },
  },
};

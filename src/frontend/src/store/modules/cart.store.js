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
      console.log({ cart: pizza });
      commit(ADD_TO_CART, { ...pizza, count: 1 });
    },
  },
  mutations: {
    [ADD_TO_CART](state, pizza) {
      state.pizzas = [...state.pizzas, pizza];
    },
  },
};

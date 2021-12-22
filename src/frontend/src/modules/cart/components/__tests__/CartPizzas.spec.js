import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import random from "lodash/random";
import times from "lodash/times";

import { UPDATE_CART } from "@/modules/cart/store";
import { mockPizza } from "@/common/mocks/cart";

import CartPizzas from "../CartPizzas";
import CartPizzasItem from "@/modules/cart/components/CartPizzasItem";

const localVue = createLocalVue();
localVue.component("CartPizzasItem", CartPizzasItem);
localVue.use(Vuex);

let pizzas = [];
times(random(2, 5), () => {
  pizzas.push(mockPizza());
});

describe("CartPizzas", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(CartPizzas, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    actions = {
      Cart: {
        [UPDATE_CART]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    store.commit(`Cart/${UPDATE_CART}`, { pizzas });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render all pizza items", () => {
    createComponent({ localVue, store });
    const cartPizzasItems = wrapper.findAllComponents(CartPizzasItem);
    expect(cartPizzasItems.length).toBe(pizzas.length);
  });

  it("emits pizza update on CartPizzasItem onChangeCount event", () => {
    createComponent({ localVue, store });
    const cartPizzasItem = wrapper.findComponent(CartPizzasItem);
    cartPizzasItem.vm.$emit("onChangeCount", pizzas[0].quantity + 1);
    pizzas[0].quantity += 1;
    expect(actions.Cart[UPDATE_CART]).toHaveBeenCalledWith(expect.any(Object), {
      pizzas,
    });
  });

  it("emits pizza delete on CartPizzasItem onChangeCount event with 0 quantity", () => {
    createComponent({ localVue, store });
    const cartPizzasItem = wrapper.findComponent(CartPizzasItem);
    cartPizzasItem.vm.$emit("onChangeCount", 0);
    pizzas.splice(0, 1);
    expect(actions.Cart[UPDATE_CART]).toHaveBeenCalledWith(expect.any(Object), {
      pizzas,
    });
  });
});

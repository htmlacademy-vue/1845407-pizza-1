import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import random from "lodash/random";
import times from "lodash/times";

import { UPDATE_CART } from "@/modules/cart/store";
import { mockPizza, mockMisc } from "@/common/mocks/cart";

import CartFooter from "../CartFooter";
import BlockCost from "@/common/components/BlockCost";

const localVue = createLocalVue();
localVue.component("BlockCost", BlockCost);
localVue.use(Vuex);

let pizzas = [];
times(random(2, 5), () => {
  pizzas.push(mockPizza());
});

describe("CartFooter", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  const stubs = ["router-link"];
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  let actions = {};
  let store;

  beforeEach(() => {
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render cart submit enabled", () => {
    const misc = mockMisc.map((item) => ({
      ...item,
      quantity: random(0, 5),
    }));
    store.commit(`Cart/${UPDATE_CART}`, { pizzas, misc });
    createComponent({ localVue, store, stubs });
    expect(
      wrapper.find(".footer__submit button[type='submit']").element.disabled
    ).toBeFalsy();
    expect(wrapper.findComponent(BlockCost).props("pizzas")).toEqual(pizzas);
    expect(wrapper.findComponent(BlockCost).props("misc")).toEqual(misc);
  });

  it("render cart submit disabled", () => {
    const misc = mockMisc.map((item) => ({
      ...item,
      quantity: random(1, 5),
    }));
    store.commit(`Cart/${UPDATE_CART}`, { misc });
    createComponent({ localVue, store, stubs });
    expect(
      wrapper.find(".footer__submit button[type='submit']").element.disabled
    ).toBeTruthy();
    expect(wrapper.findComponent(BlockCost).props("pizzas")).toEqual([]);
    expect(wrapper.find(".footer__price").text()).toBe("Итого: 0 ₽");
  });
});

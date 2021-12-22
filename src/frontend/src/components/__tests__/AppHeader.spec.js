import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import random from "lodash/random";
import times from "lodash/times";

import { UPDATE_CART } from "@/modules/cart/store";
import { mockPizza, mockMisc } from "@/common/mocks/cart";

import AppHeader from "../AppHeader";
import BaseCostBlock from "@/common/components/CostBlock";

const localVue = createLocalVue();
localVue.component("BaseCostBlock", BaseCostBlock);
localVue.use(Vuex);

let pizzas = [];
times(random(2, 5), () => {
  pizzas.push(mockPizza());
});

describe("AppHeader", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  const stubs = ["router-link"];
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(AppHeader, options);
  };

  let actions = {};
  let store;

  beforeEach(() => {
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("header logo is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find(".header__logo").exists()).toBeTruthy();
  });

  it("header cart cost 0 when no pizzas choice", () => {
    const misc = mockMisc.map((item) => ({
      ...item,
      quantity: random(1, 5),
    }));
    store.commit(`Cart/${UPDATE_CART}`, { misc });
    createComponent({ localVue, store, stubs });
    expect(wrapper.find(".header__cart").text()).toBe("0 ₽");
  });

  it("render BaseCost component", () => {
    const misc = mockMisc.map((item) => ({
      ...item,
      quantity: random(0, 5),
    }));
    store.commit(`Cart/${UPDATE_CART}`, { pizzas, misc });
    createComponent({ localVue, store, stubs });
    expect(wrapper.findComponent(BaseCostBlock).exists()).toBeTruthy();
  });
});

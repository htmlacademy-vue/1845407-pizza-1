import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import random from "lodash/random";
import times from "lodash/times";

import resources from "@/common/enums/resources";
import { generateMockStore } from "@/store/mocks";
import { account, mockAddresses } from "@/common/mocks/user";
import { mockPizza, mockMisc } from "@/common/mocks/cart";

import { SET_ACCOUNT } from "@/store/modules/auth.store";
import { UPDATE_CART } from "@/store/modules/cart.store";

import Cart from "../Cart";
import PzzCartPizzas from "@/modules/cart/components/CartPizzas";
import PzzCartMisc from "@/modules/cart/components/CartMisc";
import PzzCartDelivery from "@/modules/cart/components/CartDelivery";
import PzzCartFooter from "@/modules/cart/components/CartFooter";

const localVue = createLocalVue();
localVue.component("PzzCartPizzas", PzzCartPizzas);
localVue.component("PzzCartMisc", PzzCartMisc);
localVue.component("PzzCartDelivery", PzzCartDelivery);
localVue.component("PzzCartFooter", PzzCartFooter);
localVue.use(Vuex);

let pizzas = [];
times(random(2, 5), () => {
  pizzas.push(mockPizza());
});
const misc = mockMisc;

describe("Cart", () => {
  const mocks = {
    $api: {
      [resources.ADDRESSES]: {
        query: jest.fn(() => mockAddresses),
      },
      [resources.ORDERS]: {
        post: jest.fn(),
      },
    },
    $router: {
      push: jest.fn(),
    },
  };
  const stubs = ["router-link", "base-modal"];
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Render empty Cart", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(".cart__empty").exists()).toBeTruthy();
    expect(wrapper.findComponent(PzzCartPizzas).exists()).toBeFalsy();
    expect(wrapper.findComponent(PzzCartMisc).exists()).toBeFalsy();
    expect(wrapper.findComponent(PzzCartDelivery).exists()).toBeFalsy();
  });

  it("Render filled Cart", () => {
    store.commit(`Cart/${UPDATE_CART}`, { pizzas, misc });
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(".cart__empty").exists()).toBeFalsy();
    expect(wrapper.findComponent(PzzCartPizzas).exists()).toBeTruthy();
    expect(wrapper.findComponent(PzzCartMisc).exists()).toBeTruthy();
    expect(wrapper.findComponent(PzzCartDelivery).exists()).toBeTruthy();
  });

  it("Cart form submit", async () => {
    store.commit(`Cart/${UPDATE_CART}`, { pizzas, misc, address: null });
    createComponent({ localVue, store, mocks, stubs });
    await wrapper.find("form.layout-form").trigger("submit");
    const payload = store.getters["Cart/toJson"];
    expect(mocks.$api[resources.ORDERS].post).toHaveBeenCalledWith(payload);
    expect(mocks.$router.push).toBeCalledWith({ name: "thanks" });
  });

  it("Cart form submit authenticated user", async () => {
    store.commit(`Cart/${UPDATE_CART}`, { pizzas, misc, address: null });
    store.commit(`Auth/${SET_ACCOUNT}`, account);
    createComponent({ localVue, store, mocks, stubs });
    await wrapper.find("form.layout-form").trigger("submit");
    const payload = store.getters["Cart/toJson"];
    expect(mocks.$api[resources.ORDERS].post).toHaveBeenCalledWith({
      ...payload,
      userId: account.id,
    });
    expect(mocks.$router.push).toBeCalledWith({ name: "thanks" });
  });
});

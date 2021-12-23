import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import random from "lodash/random";
import times from "lodash/times";

import resources from "@/common/enums/resources";
import { generateMockStore } from "@/store/mocks";
import { account, mockAddresses } from "@/common/mocks/user";
import { mockPizza, mockMisc } from "@/common/mocks/cart";

import { SET_ACCOUNT } from "@/modules/auth/store";
import { UPDATE_CART } from "@/modules/cart/store";

import Cart from "../Cart/Index";
import CartPizzas from "@/modules/cart/components/CartPizzas";
import CartMisc from "@/modules/cart/components/CartMisc";
import CartDelivery from "@/modules/cart/components/CartDelivery";
import CartFooter from "@/modules/cart/components/CartFooter";

const localVue = createLocalVue();
localVue.component("CartPizzas", CartPizzas);
localVue.component("CartMisc", CartMisc);
localVue.component("CartDelivery", CartDelivery);
localVue.component("CartFooter", CartFooter);
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
  const stubs = ["router-link", "app-modal"];
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
    expect(wrapper.findComponent(CartPizzas).exists()).toBeFalsy();
    expect(wrapper.findComponent(CartMisc).exists()).toBeFalsy();
    expect(wrapper.findComponent(CartDelivery).exists()).toBeFalsy();
  });

  it("Render filled Cart", () => {
    store.commit(`Cart/${UPDATE_CART}`, { pizzas, misc });
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(".cart__empty").exists()).toBeFalsy();
    expect(wrapper.findComponent(CartPizzas).exists()).toBeTruthy();
    expect(wrapper.findComponent(CartMisc).exists()).toBeTruthy();
    expect(wrapper.findComponent(CartDelivery).exists()).toBeTruthy();
  });

  it("Cart form submit", async () => {
    store.commit(`Cart/${UPDATE_CART}`, { pizzas, misc, address: null });
    createComponent({ localVue, store, mocks, stubs });
    await wrapper.find("form.layout-form").trigger("submit");
    const payload = store.getters["Cart/toJson"];
    expect(mocks.$api[resources.ORDERS].post).toHaveBeenCalledWith(payload);
    expect(mocks.$router.push).toBeCalledWith("/cart/thanks");
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
    expect(mocks.$router.push).toBeCalledWith("/cart/thanks");
  });
});

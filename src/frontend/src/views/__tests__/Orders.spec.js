import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import random from "lodash/random";
import times from "lodash/times";

import resources from "@/common/enums/resources";
import { generateMockStore } from "@/store/mocks";
import { account, mockAddresses } from "@/common/mocks/user";
import { dough, sauces, sizes, ingredients } from "@/common/mocks/pizza";
import { mockPizza, mockMisc } from "@/common/mocks/cart";
import { mockOrder } from "@/common/mocks/orders";

import { SET_ACCOUNT } from "@/store/modules/auth.store";
import { UPDATE_CHOICE } from "@/store/modules/builder.store";
import { UPDATE_CART } from "@/store/modules/cart.store";

import Orders from "../Orders/Index";
import OrderItem from "@/modules/orders/components/OrderItem";

const localVue = createLocalVue();
localVue.component("OrderItem", OrderItem);
localVue.use(Vuex);

let orders = [];
times(random(2, 3), () => {
  let orderPizzas = [];
  times(random(1, 3), () => {
    let pizza = mockPizza();
    orderPizzas.push({
      id: pizza.id,
      name: pizza.name,
      doughId: pizza.dough.id,
      sizeId: pizza.size.id,
      sauceId: pizza.sauce.id,
      ingredients: pizza.ingredients
        .filter(({ quantity }) => quantity)
        .map(({ id, quantity }) => ({
          ingredientId: id,
          quantity,
        })),
      quantity: random(1, 3),
    });
  });
  let orderMisc = mockMisc
    .map(({ id }) => ({
      miscId: id,
      quantity: random(3),
    }))
    .filter(({ quantity }) => quantity);
  let orderAddress = [null, ...mockAddresses][random(mockAddresses.length)];
  orders.push({ ...mockOrder(), orderPizzas, orderMisc, orderAddress });
});

describe("Orders", () => {
  const mocks = {
    $api: {
      [resources.ORDERS]: {
        query: jest.fn(() => orders),
      },
    },
  };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    store = generateMockStore(actions);
    store.commit(`Builder/${UPDATE_CHOICE}`, {
      dough,
      sauces,
      sizes,
      ingredients,
    });
    store.commit(`Cart/${UPDATE_CART}`, { misc: mockMisc });
    store.commit(`Auth/${SET_ACCOUNT}`, account);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Render all orders", async () => {
    createComponent({ localVue, store, mocks });
    await wrapper.vm.$nextTick();
    const orderItemList = wrapper.findAllComponents(OrderItem);
    expect(orderItemList.length).toBe(orders.length);
  });

  it("Destroy order", async () => {
    createComponent({ localVue, store, mocks });
    await wrapper.vm.$nextTick();
    const orderItem = wrapper.findComponent(OrderItem);
    const id = orderItem.props("id");
    orderItem.vm.$emit("onDestroy", { id });
    await wrapper.vm.$nextTick();
    const orderItemList = wrapper.findAllComponents(OrderItem);
    expect(orderItemList.length).toBe(orders.length - 1);
  });
});

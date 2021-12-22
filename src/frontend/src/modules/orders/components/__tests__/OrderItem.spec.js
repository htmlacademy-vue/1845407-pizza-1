import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import random from "lodash/random";
import times from "lodash/times";
import find from "lodash/find";

import { generateMockStore } from "@/store/mocks";
import { normalizeByKey } from "@/common/helpers";
import resources from "@/common/enums/resources";

import { UPDATE_CHOICE } from "@/modules/builder/store";
import { UPDATE_CART } from "@/modules/cart/store";
import { dough, sauces, sizes, ingredients } from "@/common/mocks/pizza";
import { mockPizza, mockMisc } from "@/common/mocks/cart";
import { mockAddresses } from "@/common/mocks/user";
import { mockOrder } from "@/common/mocks/orders";

import OrderItem from "../OrderItem";
import OrderPizzaItem from "@/modules/orders/components/OrderPizzaItem";
import OrderMiscItem from "@/modules/orders/components/OrderMiscItem";
import BaseAddressString from "@/common/components/AddressString";
import BaseCostBlock from "@/common/components/CostBlock";

const localVue = createLocalVue();
localVue.component("OrderPizzaItem", OrderPizzaItem);
localVue.component("OrderMiscItem", OrderMiscItem);
localVue.component("BaseAddressString", BaseAddressString);
localVue.component("BaseCostBlock", BaseCostBlock);
localVue.use(Vuex);

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

describe("OrderItem", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $api: {
      [resources.ORDERS]: {
        delete: jest.fn(),
      },
    },
  };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(OrderItem, options);
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
    store.commit(`Builder/${UPDATE_CHOICE}`, {
      dough,
      sauces,
      sizes,
      ingredients,
    });
    store.commit(`Cart/${UPDATE_CART}`, { misc: mockMisc });
    // order = mockOrder();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render order id", () => {
    let propsData = { ...mockOrder(), orderPizzas };
    createComponent({ localVue, store, propsData });
    expect(wrapper.find(".order__number").text()).toBe(
      `Заказ #${propsData.id}`
    );
  });

  it("render order cost", () => {
    let orderMisc = mockMisc
      .map(({ id }) => ({
        miscId: id,
        quantity: random(3),
      }))
      .filter(({ quantity }) => quantity);
    // Object.assign(order, { orderPizzas, orderMisc });
    let propsData = { ...mockOrder(), orderPizzas, orderMisc };
    const _ingredients = ingredients;
    let pizzas = orderPizzas.map(
      ({ id, name, doughId, sizeId, sauceId, ingredients, quantity }) => ({
        id,
        name,
        dough: { ...find(dough, ["id", doughId]), checked: true },
        size: { ...find(sizes, ["id", sizeId]), checked: true },
        sauce: { ...find(sauces, ["id", sauceId]), checked: true },
        ingredients: normalizeByKey(
          _ingredients.map((item) => ({ ...item, quantity: 0 })),
          ingredients.map(({ ingredientId, quantity }) => ({
            id: ingredientId,
            quantity,
          })),
          "id"
        ),
        quantity,
      })
    );
    pizzas = pizzas.map((pizza) => {
      let price = pizza.ingredients.reduce(
        (total, { price, quantity }) => total + price * quantity,
        0
      );
      price += pizza.dough?.price ?? 0;
      price += pizza.sauce?.price ?? 0;
      price *= pizza.size?.multiplier ?? 0;

      return { ...pizza, price };
    });
    let misc = normalizeByKey(
      mockMisc,
      orderMisc.map(({ miscId, quantity }) => ({
        id: miscId,
        quantity,
      })),
      "id"
    );
    let cost = pizzas.reduce(
      (cost, { price, quantity }) => cost + price * quantity,
      0
    );
    cost += misc.reduce(
      (cost, { price, quantity }) => cost + price * quantity,
      0
    );
    createComponent({ localVue, store, propsData });
    expect(wrapper.findComponent(BaseCostBlock).text()).toContain(cost);
  });

  it("render pizzas list", () => {
    // Object.assign(order, { orderPizzas });
    let propsData = { ...mockOrder(), orderPizzas };
    const _ingredients = ingredients;
    let pizzas = orderPizzas.map(
      ({ id, name, doughId, sizeId, sauceId, ingredients, quantity }) => ({
        id,
        name,
        dough: { ...find(dough, ["id", doughId]), checked: true },
        size: { ...find(sizes, ["id", sizeId]), checked: true },
        sauce: { ...find(sauces, ["id", sauceId]), checked: true },
        ingredients: normalizeByKey(
          _ingredients.map((item) => ({ ...item, quantity: 0 })),
          ingredients.map(({ ingredientId, quantity }) => ({
            id: ingredientId,
            quantity,
          })),
          "id"
        ),
        quantity,
      })
    );
    pizzas = pizzas.map((pizza) => {
      let price = pizza.ingredients.reduce(
        (total, { price, quantity }) => total + price * quantity,
        0
      );
      price += pizza.dough?.price ?? 0;
      price += pizza.sauce?.price ?? 0;
      price *= pizza.size?.multiplier ?? 0;

      return { ...pizza, price };
    });
    createComponent({ localVue, store, propsData });
    const pizzaList = wrapper.findAllComponents(OrderPizzaItem);
    expect(pizzaList.length).toEqual(pizzas.length);
    pizzaList.wrappers.forEach((orderPizza, index) => {
      expect(orderPizza.props()).toEqual(pizzas[index]);
    });
  });

  it("render misc list", () => {
    let orderMisc = mockMisc
      .map(({ id }) => ({
        miscId: id,
        quantity: random(3),
      }))
      .filter(({ quantity }) => quantity);
    let propsData = { ...mockOrder(), orderMisc };
    let misc = normalizeByKey(
      mockMisc,
      orderMisc.map(({ miscId, quantity }) => ({
        id: miscId,
        quantity,
      })),
      "id"
    ).filter(({ quantity }) => quantity);
    createComponent({ localVue, store, propsData });
    const miscList = wrapper.findAllComponents(OrderMiscItem);
    expect(miscList.length).toEqual(misc.length);
    miscList.wrappers.forEach((orderMisc, index) => {
      expect(orderMisc.props()).toEqual(misc[index]);
    });
  });

  it("render self-delivery address", () => {
    let propsData = { ...mockOrder() };
    createComponent({ localVue, store, propsData });
    const addressComponent = wrapper.findComponent(BaseAddressString);
    expect(addressComponent.text()).toContain("Самовывоз");
  });

  it("render delivery address", () => {
    let orderAddress = mockAddresses[0];
    let propsData = { ...mockOrder(), orderAddress };
    createComponent({ localVue, store, propsData });
    const addressComponent = wrapper.findComponent(BaseAddressString);
    expect(addressComponent.text()).toContain("Адрес доставки:");
    const { street, building, flat } = orderAddress;
    expect(addressComponent.props()).toEqual({ street, building, flat });
  });

  it("emits order destroy", async () => {
    //Object.assign(order, { orderPizzas });
    let propsData = { ...mockOrder(), orderPizzas };
    createComponent({ localVue, store, propsData, mocks });
    const button = wrapper.find("button[data-test='destroyOrder']");
    await button.trigger("click");
    expect(mocks.$api[resources.ORDERS].delete).toHaveBeenCalledWith(
      propsData.id
    );
    expect(wrapper.emitted("onDestroy")[0]).toEqual([{ id: propsData.id }]);
  });

  it("emits order repeat", async () => {
    let orderMisc = mockMisc
      .map(({ id }) => ({
        miscId: id,
        quantity: random(3),
      }))
      .filter(({ quantity }) => quantity);
    //Object.assign(order, { orderPizzas, orderMisc });
    let propsData = { ...mockOrder(), orderPizzas, orderMisc };
    const _ingredients = ingredients;
    let pizzas = orderPizzas.map(
      ({ id, name, doughId, sizeId, sauceId, ingredients, quantity }) => ({
        id,
        name,
        dough: { ...find(dough, ["id", doughId]), checked: true },
        size: { ...find(sizes, ["id", sizeId]), checked: true },
        sauce: { ...find(sauces, ["id", sauceId]), checked: true },
        ingredients: normalizeByKey(
          _ingredients.map((item) => ({ ...item, quantity: 0 })),
          ingredients.map(({ ingredientId, quantity }) => ({
            id: ingredientId,
            quantity,
          })),
          "id"
        ),
        quantity,
      })
    );
    pizzas = pizzas.map((pizza) => {
      let price = pizza.ingredients.reduce(
        (total, { price, quantity }) => total + price * quantity,
        0
      );
      price += pizza.dough?.price ?? 0;
      price += pizza.sauce?.price ?? 0;
      price *= pizza.size?.multiplier ?? 0;

      return { ...pizza, price };
    });
    let misc = normalizeByKey(
      mockMisc,
      orderMisc.map(({ miscId, quantity }) => ({
        id: miscId,
        quantity,
      })),
      "id"
    );
    createComponent({ localVue, store, propsData, mocks });
    const button = wrapper.find("button[data-test='repeatOrder']");
    await button.trigger("click");
    expect(actions.Cart[UPDATE_CART]).toHaveBeenCalledWith(expect.any(Object), {
      pizzas,
      misc,
      address: null,
    });
    expect(mocks.$router.push).toBeCalledWith("/cart");
  });
});

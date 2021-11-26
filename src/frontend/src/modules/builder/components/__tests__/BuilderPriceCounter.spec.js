import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { UPDATE_CHOICE } from "@/store/modules/builder.store";
import { dough, sizes, sauces, ingredients } from "@/common/mocks/pizza";

import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPriceCounter", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    actions = {
      Builder: {
        [UPDATE_CHOICE]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    store.commit(`Builder/${UPDATE_CHOICE}`, {
      name: "test pizza",
      dough,
      sizes,
      sauces,
      ingredients,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render actual choice cost", () => {
    createComponent({ localVue, store });
    const choice = store.getters["Builder/choice"];
    expect(wrapper.html()).toContain(`Итого: ${choice.price} ₽`);
  });

  it("submit enabled when name and ingredients present", () => {
    createComponent({ localVue, store });
    expect(wrapper.find('button[type="submit"]').element.disabled).toBeFalsy();
  });

  it("submit disabled when no name", () => {
    store.commit(`Builder/${UPDATE_CHOICE}`, {
      name: "",
    });
    createComponent({ localVue, store });
    expect(wrapper.find('button[type="submit"]').element.disabled).toBeTruthy();
  });

  it("submit disabled when no ingredients", () => {
    store.commit(`Builder/${UPDATE_CHOICE}`, {
      ingredients: ingredients.map((item) => ({
        ...item,
        quantity: 0,
      })),
    });
    createComponent({ localVue, store });
    expect(wrapper.find('button[type="submit"]').element.disabled).toBeTruthy();
  });
});

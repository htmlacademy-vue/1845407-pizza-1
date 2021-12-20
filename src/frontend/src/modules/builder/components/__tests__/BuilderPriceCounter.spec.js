import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { UPDATE_CHOICE } from "@/store/modules/builder.store";
import { mockChoice } from "@/common/mocks/pizza";

import BuilderPriceCounter from "../BuilderPriceCounter";

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
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render initial choice", () => {
    createComponent({ localVue, store });
    const choice = store.getters["Builder/choice"];
    expect(wrapper.find(".content__result > p").text()).toContain(
      `Итого: ${choice.price} ₽`
    );
    expect(wrapper.find('button[type="submit"]').element.disabled).toBeTruthy();
  });

  it("submit disabled when no name", () => {
    let { ingredients } = mockChoice();
    store.commit(`Builder/${UPDATE_CHOICE}`, {
      name: "",
      ingredients,
    });
    createComponent({ localVue, store });
    expect(wrapper.find('button[type="submit"]').element.disabled).toBeTruthy();
  });

  it("submit disabled when no name", () => {
    store.commit(`Builder/${UPDATE_CHOICE}`, { name: "test name" });
    createComponent({ localVue, store });
    expect(wrapper.find('button[type="submit"]').element.disabled).toBeTruthy();
  });

  it("submit enabled when name and ingredients present", () => {
    let { name, ingredients } = mockChoice();
    store.commit(`Builder/${UPDATE_CHOICE}`, { name, ingredients });
    createComponent({ localVue, store });
    const choice = store.getters["Builder/choice"];
    expect(wrapper.find(".content__result > p").text()).toContain(
      `Итого: ${choice.price} ₽`
    );
    expect(wrapper.find('button[type="submit"]').element.disabled).toBeFalsy();
  });
});

import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import find from "lodash/find";
import cloneDeep from "lodash/cloneDeep";

import { UPDATE_CHOICE } from "@/store/modules/builder.store";
import { dough, sauces, ingredients } from "@/common/mocks/pizza";

import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
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
      dough,
      sauces,
      ingredients: ingredients.map((ingredient, index) => ({
        ...ingredient,
        quantity: index % 4,
      })),
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render with correct foundation class", () => {
    createComponent({ localVue, store });
    const choice = store.getters["Builder/choice"];
    const foundationClass = [
      "pizza--foundation-",
      choice.dough?.value,
      choice.sauce?.type,
    ]
      .filter(Boolean)
      .join("-");
    const pizza = wrapper.find(".pizza");
    expect(pizza.classes()).toContain(foundationClass);
  });

  it("render quantity filling ingredients", () => {
    createComponent({ localVue, store });
    const choice = store.getters["Builder/choice"];
    choice.ingredients.forEach((item) => {
      const pizzaFilling = wrapper.findAll(`.pizza__filling--${item.type}`);
      expect(pizzaFilling.length).toBe(item.quantity);
    });
  });

  it("emits ingredients count change on drop", async () => {
    createComponent({ localVue, store });
    const choice = store.getters["Builder/choice"];
    choice.ingredients.forEach(async (item) => {
      await wrapper.trigger("drop", {
        dataTransfer: {
          effectAllowed: false,
          dropEffect: false,
          getData: jest.fn(() => JSON.stringify(item)),
        },
      });

      let ingredients = cloneDeep(choice.ingredients);
      let ingredient = find(ingredients, { type: item.type });
      ingredient.quantity += 1;

      expect(actions.Builder[UPDATE_CHOICE]).toHaveBeenCalledWith(
        expect.any(Object),
        { ingredients }
      );
    });
  });
});

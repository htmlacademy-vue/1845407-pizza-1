import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import { normalizeByKey } from "@/common/helpers";
import { generateMockStore } from "@/store/mocks";
import {
  dough,
  sauces,
  sizes,
  ingredients,
  mockChoice,
} from "@/common/mocks/pizza";

import {
  ADD_TO_CART,
  LOAD_CHOICE,
  UPDATE_CHOICE,
} from "@/store/modules/builder.store";
import { UPDATE_CART } from "@/store/modules/cart.store";

import Builder from "../Builder";
import PzzBuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import PzzBuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import PzzBuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import PzzBuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import PzzBuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import PzzBuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import PzzBuilderTitleInput from "@/modules/builder/components/BuilderTitleInput";

const localVue = createLocalVue();
localVue.component("PzzBuilderDoughSelector", PzzBuilderDoughSelector);
localVue.component("PzzBuilderSizeSelector", PzzBuilderSizeSelector);
localVue.component("PzzBuilderSauceSelector", PzzBuilderSauceSelector);
localVue.component(
  "PzzBuilderIngredientsSelector",
  PzzBuilderIngredientsSelector
);
localVue.component("PzzBuilderPizzaView", PzzBuilderPizzaView);
localVue.component("PzzBuilderPriceCounter", PzzBuilderPriceCounter);
localVue.component("PzzBuilderTitleInput", PzzBuilderTitleInput);
localVue.use(Vuex);

describe("Builder", () => {
  let mocks = {
    $route: {
      path: "/",
      query: {},
    },
    $router: {
      push: jest.fn(),
      replace: jest.fn(),
    },
  };
  const stubs = ["base-modal"];
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(Builder, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    actions = {
      Builder: {
        [ADD_TO_CART]: jest.fn(),
        [LOAD_CHOICE]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    store.commit(`Builder/${UPDATE_CHOICE}`, {
      dough,
      sauces,
      sizes,
      ingredients,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Render pizza components", async () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(
      wrapper.findComponent(PzzBuilderDoughSelector).exists()
    ).toBeTruthy();
    expect(wrapper.findComponent(PzzBuilderSizeSelector).exists()).toBeTruthy();
    expect(
      wrapper.findComponent(PzzBuilderSauceSelector).exists()
    ).toBeTruthy();
    expect(
      wrapper.findComponent(PzzBuilderIngredientsSelector).exists()
    ).toBeTruthy();
    expect(wrapper.findComponent(PzzBuilderPizzaView).exists()).toBeTruthy();
    expect(wrapper.findComponent(PzzBuilderPriceCounter).exists()).toBeTruthy();
    expect(wrapper.findComponent(PzzBuilderTitleInput).exists()).toBeTruthy();
  });

  it("Load pizza to edit", async () => {
    let pizzas = [mockChoice()];
    store.commit(`Cart/${UPDATE_CART}`, { pizzas });
    mocks.$route.query = { id: pizzas[0]["id"] };
    createComponent({ localVue, store, mocks, stubs });
    expect(actions.Builder[LOAD_CHOICE]).toHaveBeenCalledWith(
      expect.any(Object),
      pizzas[0]
    );
  });

  it("Redirect incorrect id pizza edit", async () => {
    mocks.$route.query = { id: 1 };
    createComponent({ localVue, store, mocks, stubs });
    expect(mocks.$router.replace).toBeCalledWith({ name: "builder" });
  });

  it("Add choice to Cart", async () => {
    createComponent({ localVue, store, mocks, stubs });
    let choice = mockChoice();
    store.commit(`Builder/${UPDATE_CHOICE}`, {
      name: choice.name,
      dough: normalizeByKey(
        dough.map((item) => ({ ...item, checked: false })),
        [choice.dough],
        "name"
      ),
      sizes: normalizeByKey(
        sizes.map((item) => ({ ...item, checked: false })),
        [choice.size],
        "name"
      ),
      sauces: normalizeByKey(
        sauces.map((item) => ({ ...item, checked: false })),
        [choice.sauce],
        "name"
      ),
      ingredients: normalizeByKey(
        ingredients.map((item) => ({ ...item, quantity: 0 })),
        choice.ingredients,
        "name"
      ),
    });

    await wrapper.find("form.layout-form").trigger("submit");
    expect(actions.Builder[ADD_TO_CART]).toHaveBeenCalled();
  });

  it("Update choice from cart", async () => {
    let choice = mockChoice();
    let pizzas = [choice];
    store.commit(`Cart/${UPDATE_CART}`, { pizzas });
    mocks.$route.query = { id: pizzas[0]["id"] };
    createComponent({ localVue, store, mocks, stubs });

    store.commit(`Builder/${UPDATE_CHOICE}`, {
      name: choice.name,
      dough: normalizeByKey(
        dough.map((item) => ({ ...item, checked: false })),
        [choice.dough],
        "name"
      ),
      sizes: normalizeByKey(
        sizes.map((item) => ({ ...item, checked: false })),
        [choice.size],
        "name"
      ),
      sauces: normalizeByKey(
        sauces.map((item) => ({ ...item, checked: false })),
        [choice.sauce],
        "name"
      ),
      ingredients: normalizeByKey(
        ingredients.map((item) => ({ ...item, quantity: 0 })),
        choice.ingredients,
        "name"
      ),
    });

    await wrapper.find("form.layout-form").trigger("submit");
    expect(actions.Builder[ADD_TO_CART]).toHaveBeenCalled();
    expect(mocks.$router.push).toBeCalledWith({ name: "cart" });
  });
});

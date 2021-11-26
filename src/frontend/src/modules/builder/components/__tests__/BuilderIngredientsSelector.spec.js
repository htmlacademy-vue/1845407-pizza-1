import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { UPDATE_CHOICE } from "@/store/modules/builder.store";
import { ingredients } from "@/common/mocks/pizza";

import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BaseItemCounter from "@/common/components/ItemCounter";

const localVue = createLocalVue();
localVue.component("BaseItemCounter", BaseItemCounter);
localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
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
    store.commit(`Builder/${UPDATE_CHOICE}`, { ingredients });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render ingridients selectors", () => {
    createComponent({ localVue, store });
    expect(wrapper.findAll(".ingridients__item").length).toBe(ingredients.length);
  });

  it("is render correct filling", () => {
    createComponent({ localVue, store });
    let fillings = wrapper.findAll('.filling');
    ingredients.forEach((item, index) => {
      expect(fillings.at(index).classes()).toContain(`filling--${item.type}`);
      expect(fillings.at(index).text()).toContain(item.name);
    });
  });

  it("is render correct item counter component", () => {
    createComponent({ localVue, store });
    let itemCounterComponentList = wrapper.findAllComponents(BaseItemCounter);
    ingredients.forEach((item, index) => {
      let component = itemCounterComponentList.at(index);
      let input = component.find(`input[name='counter[${item.type}]']`);
      expect(input.exists()).toBeTruthy();
      expect(input.element.value).toBe(String(item.quantity));
      expect(input.element.min).toBe(String(0));
      expect(input.element.max).toBe(String(3));
    });
  });

  it("emits ingredients count change event", () => {
    createComponent({ localVue, store });
    let itemCounterComponentList = wrapper.findAllComponents(BaseItemCounter);
    ingredients.forEach((item, index) => {
      let component = itemCounterComponentList.at(index);
      let quantity = 1;
      Object.assign(item, { quantity });
      component.vm.$emit("input", quantity);
      expect(actions.Builder[UPDATE_CHOICE]).toHaveBeenCalledWith(
        expect.any(Object),
        { ingredients }
      );
    });
  });
});

import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { UPDATE_CHOICE } from "@/store/modules/builder.store";
import { sauces } from "@/common/mocks/pizza";

import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import BaseRadioButton from "@/common/components/RadioButton";

const localVue = createLocalVue();
localVue.component("BaseRadioButton", BaseRadioButton);
localVue.use(Vuex);

describe("BuilderSauceSelector", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(BuilderSauceSelector, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    actions = {
      Builder: {
        UPDATE_CHOICE: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    store.commit(`Builder/${UPDATE_CHOICE}`, { sauces });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render sauce selectors", () => {
    createComponent({ localVue, store });
    expect(wrapper.findAll(".ingridients__input").length).toBe(sauces.length);
  });

  it("is render correct radio button component", () => {
    createComponent({ localVue, store });
    let radioButtonComponentList = wrapper.findAllComponents(BaseRadioButton);
    sauces.forEach((item, index) => {
      let component = radioButtonComponentList.wrappers[index];
      expect(component.find("span").text()).toBe(item.name);
      let input = component.find("input[name='sauce']");
      expect(input.exists()).toBeTruthy();
      expect(input.element.value).toBe(item.type);
      expect(input.element.checked).toBe(!!item.checked);
    });
  });

  it("emits sauce checked event", async () => {
    createComponent({ localVue, store });
    let index = sauces.findIndex(({ checked }) => !checked);

    let choice = sauces.map((item) => ({
      ...item,
      checked: false,
    }));
    Object.assign(choice[index], { checked: true });
    let input = wrapper.find(`input[value='${choice[index].type}']`);
    await input.trigger("click");
    expect(actions.Builder.UPDATE_CHOICE).toHaveBeenCalledWith(
      expect.any(Object),
      { sauces: choice }
    );
  });
});

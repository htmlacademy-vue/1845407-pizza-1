import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { UPDATE_CHOICE } from "@/store/modules/builder.store";
import { dough } from "@/common/mocks/pizza";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BaseRadioButton from "@/common/components/RadioButton";

const localVue = createLocalVue();
localVue.component("BaseRadioButton", BaseRadioButton);
localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
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
    store.commit(`Builder/${UPDATE_CHOICE}`, { dough });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render dough selectors", () => {
    createComponent({ localVue, store });
    expect(wrapper.findAll(".dough__input").length).toBe(dough.length);
  });

  it("is render correct radio button component", () => {
    createComponent({ localVue, store });
    let radioButtonComponentList = wrapper.findAllComponents(BaseRadioButton);
    dough.forEach((item, index) => {
      let component = radioButtonComponentList.wrappers[index];
      expect(component.find("b").text()).toBe(item.name);
      expect(component.find("span").text()).toBe(item.description);
      let input = component.find("input[name='dough']");
      expect(input.exists()).toBeTruthy();
      expect(input.element.value).toBe(item.type);
      expect(input.element.checked).toBe(!!item.checked);
    });
  });

  it("emits dough checked event", async  () => {
    createComponent({ localVue, store });
    let index = dough.findIndex(({ checked }) => !checked);

    let choice = dough.map((item) => ({
      ...item,
      checked: false,
    }));
    Object.assign(choice[index], { checked: true });
    let input = wrapper.find(`input[value='${choice[index].type}']`);
    await input.trigger("click");
    expect(actions.Builder.UPDATE_CHOICE).toHaveBeenCalledWith(
      expect.any(Object),
      { dough: choice }
    );
  });
});

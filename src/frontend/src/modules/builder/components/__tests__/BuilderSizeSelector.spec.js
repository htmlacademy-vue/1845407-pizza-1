import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { UPDATE_CHOICE } from "@/store/modules/builder.store";
import { sizes } from "@/common/mocks/pizza";

import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BaseRadioButton from "@/common/components/RadioButton";

const localVue = createLocalVue();
localVue.component("BaseRadioButton", BaseRadioButton);
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
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
    store.commit(`Builder/${UPDATE_CHOICE}`, { sizes });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render size selectors", () => {
    createComponent({ localVue, store });
    expect(wrapper.findAll(".diameter__input").length).toBe(sizes.length);
  });

  it("is render correct radio button component", () => {
    createComponent({ localVue, store });
    let radioButtonComponentList = wrapper.findAllComponents(BaseRadioButton);
    sizes.forEach((item, index) => {
      let component = radioButtonComponentList.wrappers[index];
      expect(component.classes()).toContain(`diameter__input--${item.type}`);
      expect(component.find("span").text()).toBe(item.name);
      let input = component.find("input[name='diameter']");
      expect(input.exists()).toBeTruthy();
      expect(input.element.value).toBe(item.type);
      expect(input.element.checked).toBe(!!item.checked);
    });
  });

  it("emits size checked event", async () => {
    createComponent({ localVue, store });
    let index = sizes.findIndex(({ checked }) => !checked);

    let choice = sizes.map((item) => ({
      ...item,
      checked: false,
    }));
    Object.assign(choice[index], { checked: true });
    let input = wrapper.find(`input[value='${choice[index].type}']`);
    await input.trigger("click");
    expect(actions.Builder[UPDATE_CHOICE]).toHaveBeenCalledWith(
      expect.any(Object),
      { sizes: choice }
    );
  });
});

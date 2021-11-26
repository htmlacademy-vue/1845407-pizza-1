import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { UPDATE_CHOICE } from "@/store/modules/builder.store";

import BuilderTitleInput from "@/modules/builder/components/BuilderTitleInput";
import BaseInputField from "@/common/components/InputField";

const localVue = createLocalVue();
localVue.component("BaseInputField", BaseInputField);
localVue.use(Vuex);

describe("BuilderTitleInput", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(BuilderTitleInput, options);
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

  it("is render", () => {
    createComponent({ localVue, store });
    const input = wrapper.find("input[name='pizza_name']");
    expect(input.exists()).toBeTruthy();
  });

  it("render pizza name at input", async () => {
    createComponent({ localVue, store });
    const name = "test name";
    await store.commit(`Builder/${UPDATE_CHOICE}`, { name: name });
    const input = wrapper.find("input[name='pizza_name']");
    expect(input.element.value).toBe(name);
  });

  it("emits pizza name input event", async () => {
    createComponent({ localVue, store });
    const name = "test name";
    const input = wrapper.find("input[name='pizza_name']");
    input.element.value = name;
    await input.trigger("input");
    expect(actions.Builder[UPDATE_CHOICE]).toHaveBeenCalledWith(
      expect.any(Object),
      { name }
    );
  });
});

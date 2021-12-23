import { shallowMount } from "@vue/test-utils";
import AppInputField from "../AppInputField";

describe("AppInputField", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    value: "test",
    name: "test",
    type: "submit",
    placeholder: "test",
  };
  const slots = { default: "content" };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(AppInputField, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("It renders out the slot content", () => {
    createComponent({ propsData, slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("It sets initial type", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("type")).toBe(propsData.type);
  });

  it("It sets initial name", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("name")).toBe(propsData.name);
  });

  it("It sets initial placeholder", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      propsData.placeholder
    );
  });

  it("It focus input on prop autofocus", () => {
    //propsData.autofocus = true;
    createComponent({
      propsData: { ...propsData, autofocus: true },
      attachTo: document.body,
    });
    expect(wrapper.find("input").element).toBe(document.activeElement);
  });

  it("It sets initial value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("It emits an input event when typing", async () => {
    createComponent({ propsData });
    await wrapper.find("input").trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("It emits the current input value when typing", async () => {
    createComponent({ propsData });
    const value = "test input";
    await wrapper.find("input").setValue(value);
    expect(wrapper.emitted().input[0][0]).toEqual(value);
  });

  it("It sets defaults required to false", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.required).toBeFalsy();
  });

  it("It sets initial required", () => {
    // propsData.required = true;
    createComponent({ propsData: { ...propsData, required: true } });
    expect(wrapper.find("input").element.required).toBeTruthy();
  });

  it("It sets defaults disabled to false", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.disabled).toBeFalsy();
  });

  it("It sets initial disabled", () => {
    //propsData.disabled = true;
    createComponent({ propsData: { ...propsData, disabled: true } });
    expect(wrapper.find("input").element.disabled).toBeTruthy();
  });
});

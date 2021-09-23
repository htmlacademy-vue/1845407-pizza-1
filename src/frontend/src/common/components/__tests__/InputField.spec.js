import { shallowMount } from "@vue/test-utils";
import InputField from "../InputField";

describe("InputField", () => {
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
    wrapper = shallowMount(InputField, options);
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
    propsData.autofocus = true;
    createComponent({ propsData, attachToDocument: true });
    let input = wrapper.find("input").element;
    expect(input).toBe(document.activeElement);
  });

  it("It sets initial value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("It emits an input event when typing", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    await input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("It emits the current input value when typing", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    input.element.value = "test input";
    await input.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual("test input");
  });

  it("It sets defaults required to false", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.required).toBeFalsy();
  });

  it("It sets initial required", () => {
    propsData.required = true;
    createComponent({ propsData });
    expect(wrapper.find("input").element.required).toBeTruthy();
  });

  it("It sets defaults disabled to false", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.disabled).toBeFalsy();
  });

  it("It sets initial disabled", () => {
    propsData.disabled = true;
    createComponent({ propsData });
    expect(wrapper.find("input").element.disabled).toBeTruthy();
  });
});

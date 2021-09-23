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

  // Проверяем переданные props
  it("Input type is prop type", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("type")).toBe(propsData.type);
  });

  it("Input name is prop name", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("name")).toBe(propsData.name);
  });

  it("Input placeholder is prop placeholder", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("placeholder")).toBe(propsData.placeholder);
  });

  it("Input is focus on prop autofocus", () => {
    propsData.autofocus = true;
    createComponent({ propsData, attachToDocument: true });
    let input = wrapper.find('input').element;
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

  it('emits the current input value when typing', async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    input.element.value = "test";
    await input.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual("test");
  });

  it("Input required defaults to false", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.required).toBeFalsy();
  });

  it("Input required is prop required", () => {
    propsData.required = true;
    createComponent({ propsData });
    expect(wrapper.find("input").element.required).toBeTruthy();
  });

  it("Input disabled defaults to false", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.disabled).toBeFalsy();
  });

  it("Input disabled is prop disabled", () => {
    propsData.disabled = true;
    createComponent({ propsData });
    expect(wrapper.find("input").element.disabled).toBeTruthy();
  });

});

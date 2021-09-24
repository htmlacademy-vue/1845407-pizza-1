import { shallowMount } from "@vue/test-utils";
import ItemCounter from "../ItemCounter";

describe("ItemCounter", () => {
  const buttonClassMinus = "counter__button--minus";
  const buttonClassPlus = "counter__button--plus";
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    name: "test",
    value: 1,
    min: 0,
    max: 2,
  };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets initial name", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("name")).toBe(propsData.name);
  });

  it("Has button minus count", () => {
    createComponent({ propsData });
    expect(wrapper.find(`.${buttonClassMinus}`)).toBeTruthy();
  });

  it("Has button plus count", () => {
    createComponent({ propsData });
    expect(wrapper.find(`.${buttonClassPlus}`)).toBeTruthy();
  });

  it("It sets initial min", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("min") * 1).toBe(propsData.min);
  });

  it("It sets initial max", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("max") * 1).toBe(propsData.max);
  });

  it("It sets initial value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value * 1).toBe(propsData.value);
  });

  it("Has button minus disabled on value = min", () => {
    createComponent({ propsData: { ...propsData, value: propsData.min } });
    expect(wrapper.find(`.${buttonClassMinus}`).element.disabled).toBeTruthy();
  });

  it("Has button plus disabled on value = max", () => {
    createComponent({ propsData: { ...propsData, value: propsData.max } });
    expect(wrapper.find(`.${buttonClassPlus}`).element.disabled).toBeTruthy();
  });

  it("It emits an input value when button minus click", async () => {
    createComponent({ propsData });
    let button = wrapper.find(`.${buttonClassMinus}`);
    await button.trigger("click");
    expect(wrapper.emitted("input")[0]).toEqual([propsData.value - 1]);
  });

  it("It emits an input value when button plus click", async () => {
    createComponent({ propsData });
    let button = wrapper.find(`.${buttonClassPlus}`);
    await button.trigger("click");
    expect(wrapper.emitted("input")[0]).toEqual([propsData.value + 1]);
  });
});

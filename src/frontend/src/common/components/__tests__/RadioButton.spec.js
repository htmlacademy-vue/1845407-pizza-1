import { shallowMount } from "@vue/test-utils";
import RadioButton from "../RadioButton";

describe("RadioButton", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    value: "test",
    name: "test",
  };
  const slots = { default: "content" };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("It renders out the slot content", () => {
    createComponent({ propsData, slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("It sets initial name", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("name")).toBe(propsData.name);
  });

  it("It sets initial value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("It emits value after click", async () => {
    createComponent({ propsData });
    await wrapper.find("input").trigger("click");
    expect(wrapper.emitted().change[0][0]).toEqual(propsData.value);
  });
});

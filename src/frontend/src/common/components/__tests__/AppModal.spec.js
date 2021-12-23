import { shallowMount } from "@vue/test-utils";
import AppModal from "../AppModal";

describe("AppModal", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const slots = { default: "default content" };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(AppModal, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("It renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});

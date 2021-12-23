import { shallowMount } from "@vue/test-utils";
import BlockAddress from "../BlockAddress";

describe("BlockAddress", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(BlockAddress, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("render street part", () => {
    const propsData = {
      street: "Тестовая ул.",
    };
    createComponent({ propsData });
    expect(wrapper.text()).toEqual(propsData.street);
  });

  it("render building part", () => {
    const propsData = {
      building: "10",
    };
    createComponent({ propsData });
    expect(wrapper.text()).toEqual(`д. ${propsData.building}`);
  });

  it("render flat part", () => {
    const propsData = {
      flat: "10",
    };
    createComponent({ propsData });
    expect(wrapper.text()).toEqual(`кв. ${propsData.flat}`);
  });

  it("render all parts joined", () => {
    const propsData = {
      street: "Тестовая ул.",
      building: "10",
      flat: "10",
    };
    createComponent({ propsData });
    expect(wrapper.text()).toEqual(
      `${propsData.street}, д. ${propsData.building}, кв. ${propsData.flat}`
    );
  });

  it("It renders out the slot content", () => {
    const slots = { default: "content" };
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});

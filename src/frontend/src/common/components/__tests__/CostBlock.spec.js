import { shallowMount } from "@vue/test-utils";
import CostBlock from "../CostBlock";

describe("CostBlock", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(CostBlock, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("render 0 on undefended props", () => {
    const propsData = {};
    createComponent({ propsData });
    expect(wrapper.text()).toEqual("0 ₽");
  });

  it("render pizzas cost", () => {
    const propsData = {
      pizzas: [
        { price: 10, quantity: 5 },
        { price: 1, quantity: 5 },
      ],
    };
    createComponent({ propsData });
    expect(wrapper.text()).toEqual("55 ₽");
  });

  it("render misc cost", () => {
    const propsData = {
      misc: [
        { price: 10, quantity: 5 },
        { price: 1, quantity: 5 },
      ],
    };
    createComponent({ propsData });
    expect(wrapper.text()).toEqual("55 ₽");
  });

  it("render 0 on misc with 0 pizzas", () => {
    const propsData = {
      pizzas: [],
      misc: [
        { price: 10, quantity: 5 },
        { price: 1, quantity: 5 },
      ],
    };
    createComponent({ propsData });
    expect(wrapper.text()).toEqual("0 ₽");
  });

  it("render pizzas and misc cost", () => {
    const propsData = {
      pizzas: [
        { price: 100, quantity: 5 },
        { price: 1, quantity: 50 },
      ],
      misc: [
        { price: 10, quantity: 5 },
        { price: 1, quantity: 5 },
      ],
    };
    createComponent({ propsData });
    expect(wrapper.text()).toEqual("605 ₽");
  });
});

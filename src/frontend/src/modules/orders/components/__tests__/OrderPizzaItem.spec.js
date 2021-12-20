import { shallowMount } from "@vue/test-utils";

import OrderPizzaItem from "../OrderPizzaItem";

import { mockPizza } from "@/common/mocks/cart";

describe("OrderPizzaItem", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = { ...mockPizza() };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(OrderPizzaItem, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("render pizza image", () => {
    createComponent({ propsData });
    const img = wrapper.find("img");
    expect(img.attributes("alt")).toEqual(propsData.name);
  });

  it("render pizza name", () => {
    createComponent({ propsData });
    expect(wrapper.find(".product__text h2").text()).toEqual(propsData.name);
  });

  it("It render pizza size and dough desc", () => {
    createComponent({ propsData });
    const desc = wrapper.find(".product__text > ul > li:first-child");
    expect(desc.text()).toEqual(
      [propsData.size.name, propsData.dough.desc].join(", ")
    );
  });

  it("It render pizza sauce desc", () => {
    createComponent({ propsData });
    const desc = wrapper.find(".product__text > ul > li:nth-child(2)");
    expect(desc.text()).toEqual(`Соус: ${propsData.sauce.name.toLowerCase()}`);
  });

  it("It render pizza ingredients desc", () => {
    createComponent({ propsData });
    const desc = wrapper.find(".product__text > ul > li:last-child");
    const ingredientsDesc = propsData.ingredients
      .filter(({ quantity }) => quantity)
      .map(({ name }) => name)
      .join(", ")
      .toLowerCase();
    expect(desc.text()).toEqual(`Начинка: ${ingredientsDesc}`);
  });

  it("render misc item quantity and price", () => {
    createComponent({ propsData });
    expect(wrapper.find(".order__price").text()).toEqual(
      `${propsData.quantity} x ${propsData.price}₽`
    );
  });
});

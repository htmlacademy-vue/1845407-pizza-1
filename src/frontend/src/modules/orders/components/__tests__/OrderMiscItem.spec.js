import { shallowMount } from "@vue/test-utils";

import OrderMiscItem from "../OrderMiscItem";

import { mockMisc } from "@/common/mocks/cart";

describe("OrderMiscItem", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = { ...mockMisc[0], quantity: 1 };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(OrderMiscItem, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("render misc item image", () => {
    createComponent({ propsData });
    const img = wrapper.find("img");
    expect(img.attributes("src")).toEqual(propsData.image);
    expect(img.attributes("alt")).toEqual(propsData.name);
  });

  it("render misc item name", () => {
    createComponent({ propsData });
    expect(wrapper.find("p > span").text()).toEqual(propsData.name);
  });

  it("render misc item quantity and price", () => {
    createComponent({ propsData });
    expect(wrapper.find("p > b").text()).toEqual(
      `${propsData.quantity} x ${propsData.price}₽`
    );
  });
});

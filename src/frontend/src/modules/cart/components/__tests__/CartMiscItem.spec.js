import { createLocalVue, mount } from "@vue/test-utils";
import CartMiscItem from "../CartMiscItem";
import BaseItemCounter from "@/common/components/ItemCounter";
import BlockCost from "@/common/components/BlockCost";

import { mockMisc } from "@/common/mocks/cart";

const localVue = createLocalVue();
localVue.component("BaseItemCounter", BaseItemCounter);
localVue.component("BlockCost", BlockCost);

describe("CartMiscItem", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = { ...mockMisc[0], quantity: 0 };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(CartMiscItem, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("It render misc item image", () => {
    createComponent({ propsData });
    const img = wrapper.find(".additional-list__description > img");
    expect(img.exists()).toBeTruthy();
    expect(img.attributes("src")).toEqual(propsData.image);
    expect(img.attributes("alt")).toEqual(propsData.name);
  });

  it("It render misc item name and price", () => {
    createComponent({ propsData });
    const name = wrapper.find(".additional-list__description > span");
    expect(name.text()).toContain(propsData.name);
    expect(name.text()).toContain(`${propsData.price} ₽/шт`);
  });

  it("It render BaseItemCounter component", () => {
    Object.assign(propsData, { quantity: 1 });
    createComponent({ propsData });
    const baseItemCounter = wrapper.findComponent(BaseItemCounter);
    expect(baseItemCounter.exists()).toBeTruthy();
    expect(baseItemCounter.props("value")).toEqual(propsData.quantity);
  });

  it("It emits onChangeCount on BaseItemCounter input event", () => {
    createComponent({ propsData });
    const baseItemCounter = wrapper.findComponent(BaseItemCounter);
    const quantity = "1";
    baseItemCounter.vm.$emit("input", quantity);
    expect(wrapper.emitted("onChangeCount")[0]).toEqual([quantity]);
  });
});

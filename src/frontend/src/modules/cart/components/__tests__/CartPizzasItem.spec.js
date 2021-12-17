import { createLocalVue, mount } from "@vue/test-utils";
import CartPizzasItem from "../CartPizzasItem";
import BaseItemCounter from "@/common/components/ItemCounter";

import { generateMockPizza } from "@/common/mocks/cart";

const localVue = createLocalVue();
localVue.component("BaseItemCounter", BaseItemCounter);

describe("CartPizzasItem", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = { ...generateMockPizza() };
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(CartPizzasItem, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("It render pizza image", () => {
    createComponent({ propsData });
    const img = wrapper.find("img.product__img");
    expect(img.exists()).toBeTruthy();
    expect(img.attributes("alt")).toEqual(propsData.name);
  });

  it("It render pizza name", () => {
    createComponent({ propsData });
    const name = wrapper.find(".product__text > h2");
    expect(name.text()).toEqual(propsData.name);
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

  it("It render pizza cost", () => {
    createComponent({ propsData });
    const el = wrapper.find(".cart-list__price");
    const price = propsData.quantity * propsData.price;
    expect(el.text()).toEqual(`${price} ₽`);
  });

  it("It render counter component", () => {
    createComponent({ propsData });
    const baseItemCounter = wrapper.findComponent(BaseItemCounter);
    expect(baseItemCounter.props("value")).toEqual(propsData.quantity);
  });

  it("It emits onChangeCount on BaseItemCounter input event", () => {
    const quantity = "2";
    createComponent({ propsData });
    const baseItemCounter = wrapper.findComponent(BaseItemCounter);
    baseItemCounter.vm.$emit("input", quantity);
    expect(wrapper.emitted("onChangeCount")[0]).toEqual([quantity]);
  });

  it("It route to Builder on pizza edit click", async () => {
    createComponent({ propsData, mocks });
    const editBtn = wrapper.find(".cart-list__button button:first-child");
    await editBtn.trigger("click");
    expect(mocks.$router.push).toBeCalledWith({
      name: "builder",
      query: { id: propsData.id },
    });
  });

  it("It emits onChangeCount with 0 quantity on delete btn click", async () => {
    createComponent({ propsData, mocks });
    const editBtn = wrapper.find(".cart-list__button button:last-child");
    await editBtn.trigger("click");
    expect(wrapper.emitted("onChangeCount")[0]).toEqual([0]);
  });
});

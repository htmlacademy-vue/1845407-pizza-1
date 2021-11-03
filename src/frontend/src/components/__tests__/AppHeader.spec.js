import { shallowMount } from "@vue/test-utils";
import AppHeader from "../AppHeader";

describe("AppHeader", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const stubs = ['router-link'];
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(AppHeader, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('is rendered', () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("header logo is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.find(".header__logo").exists()).toBeTruthy();
  });

  it("header cart is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.find(".header__cart").exists()).toBeTruthy();
  });
});

/*
Ссылка логотипа ведет на рут

Ссылка блока цены ведет в корзину

Проверка отображаемой суммы корзины (тут пока не знаю надо ли делать отдельно для пустой и для корзины с чем-то)
*/

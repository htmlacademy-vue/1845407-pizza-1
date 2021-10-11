import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex"
import { generateMockStore } from "@/store/mocks";
import AppHeader from "../AppHeader";
import PzzAccountHeader from "@/modules/account/components/Header";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("PzzAccountHeader", PzzAccountHeader);

describe("AppHeader", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $notifier: {
      success: jest.fn(),
    },
  };
  const stubs = ['router-link'];
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(AppHeader, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    actions = {};
    mocks.$notifier.success = jest.fn();
    mocks.$router.push = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('is rendered', () => {
    createComponent({ localVue, store, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("header logo is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(".header__logo").exists()).toBeTruthy();
  });

  it("header cart is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(".header__cart").exists()).toBeTruthy();
  });

  it("header empty cart cost is 0", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(".header__cart").text()).toContain("0 ₽");
  });

  it("header account is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(".header__user").exists()).toBeTruthy();
  });
});

/*
Ссылка логотипа ведет на рут

Ссылка блока цены ведет в корзину

Проверка отображаемой суммы корзины (тут пока не знаю надо ли делать отдельно для пустой и для корзины с чем-то)
*/

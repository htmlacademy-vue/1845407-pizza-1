import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
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
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});

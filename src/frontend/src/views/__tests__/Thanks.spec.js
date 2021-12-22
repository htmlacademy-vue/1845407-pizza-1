import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import Thanks from "../Cart/^Thanks";

import { SET_ACCOUNT } from "@/modules/auth/store";
import { RESET_CART } from "@/modules/cart/store";

import { generateMockStore } from "@/store/mocks";
import { account } from "@/common/mocks/user";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Thanks", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(Thanks, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    actions = {
      Cart: {
        [RESET_CART]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("unauthenticated thanks modal close button click", async () => {
    createComponent({ localVue, store });
    wrapper.find("button.close").trigger("click");
    expect(wrapper.emitted("close")[0]).toEqual(["/"]);
  });

  it("unauthenticated thanks modal popup button click", async () => {
    createComponent({ localVue, store });
    wrapper.find(".popup__button > .button").trigger("click");
    expect(wrapper.emitted("close")[0]).toEqual(["/"]);
  });

  it("authenticated thanks modal close button click", async () => {
    store.commit(`Auth/${SET_ACCOUNT}`, account);
    createComponent({ localVue, store });
    wrapper.find("button.close").trigger("click");
    expect(wrapper.emitted("close")[0]).toEqual(["/orders"]);
  });

  it("authenticated thanks modal popup button click", async () => {
    store.commit(`Auth/${SET_ACCOUNT}`, account);
    createComponent({ localVue, store });
    wrapper.find(".popup__button > .button").trigger("click");
    expect(wrapper.emitted("close")[0]).toEqual(["/orders"]);
  });
});

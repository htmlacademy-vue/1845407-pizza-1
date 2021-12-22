import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { UPDATE_CART } from "@/modules/cart/store";
import { mockMisc } from "@/common/mocks/cart";
const misc = mockMisc;

import CartMisc from "../CartMisc";
import CartMiscItem from "@/modules/cart/components/CartMiscItem";

const localVue = createLocalVue();
localVue.component("CartMiscItem", CartMiscItem);
localVue.use(Vuex);

describe("CartMisc", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(CartMisc, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    actions = {
      Cart: {
        [UPDATE_CART]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    store.commit(`Cart/${UPDATE_CART}`, { misc });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render all misc items", () => {
    createComponent({ localVue, store });
    const cartMiscItems = wrapper.findAllComponents(CartMiscItem);
    expect(cartMiscItems.length).toBe(misc.length);
  });

  it("emits misc update on CartMiscItem onChangeCount event", () => {
    createComponent({ localVue, store });
    const cartMiscItems = wrapper.findAllComponents(CartMiscItem);
    misc.forEach((item, index) => {
      const component = cartMiscItems.at(index);
      component.vm.$emit("onChangeCount", item.quantity + 1);
      item.quantity += 1;
      expect(actions.Cart[UPDATE_CART]).toHaveBeenCalledWith(
        expect.any(Object),
        { misc }
      );
    });
  });
});

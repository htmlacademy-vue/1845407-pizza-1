import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import flushPromises from 'flush-promises';
import { generateMockStore } from "@/store/mocks";

import { UPDATE_CART } from "@/store/modules/cart.store";
import { UPDATE_ADDRESSES } from "@/store/modules/auth.store";
import { mockAddresses } from "@/common/mocks/user";

import CartDelivery from "../CartDelivery";
import BaseInputField from "@/common/components/InputField";

const localVue = createLocalVue();
localVue.component("BaseInputField", BaseInputField);
localVue.use(Vuex);

const addresses = mockAddresses;

describe("CartDelivery", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(CartDelivery, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    actions = {
      Auth: {
        [UPDATE_ADDRESSES]: () => Promise.resolve(),
      },
      Cart: {
        [UPDATE_CART]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render address selector for unauth user", async () => {
    createComponent({ localVue, store });
    await flushPromises();
    const selector = wrapper.find("select[name='addressSelector']");
    expect(selector.element.options.length).toBe(2);
    expect(selector.element.options[0].value).toEqual("Заберу сам");
    expect(selector.element.options[1].value).toEqual("Новый адрес");
  });

  it("render address selector for auth user", async () => {
    store.commit(`Auth/${UPDATE_ADDRESSES}`, addresses);
    createComponent({ localVue, store });
    await flushPromises();
    const selector = wrapper.find("select[name='addressSelector']");
    expect(selector.element.options.length).toBe(addresses.length + 2);
    addresses.forEach(({name}, index) => {
      expect(selector.element.options[index + 2].value).toEqual(name);
    });
  });

  it("initial address selection by Cart state address", async () => {
    store.commit(`Auth/${UPDATE_ADDRESSES}`, addresses);
    store.commit(`Cart/${UPDATE_CART}`, { address: addresses[0] });
    createComponent({ localVue, store });
    await flushPromises();
    const selector = wrapper.find("select[name='addressSelector']");
    expect(selector.element.value).toBe(addresses[0].name);
  });

  it("hide address for self-delivery", async () => {
    store.commit(`Auth/${UPDATE_ADDRESSES}`, addresses);
    store.commit(`Cart/${UPDATE_CART}`, { address: null });
    createComponent({ localVue, store });
    await flushPromises();
    expect(wrapper.find(".cart-form__address").exists()).toBeFalsy();
  });

  it("new address form is editable", async () => {
    createComponent({ localVue, store });
    await flushPromises();
    const addressForm = wrapper.find(".cart-form__address");
    expect(addressForm.exists()).toBeTruthy();
    expect(addressForm.find(".cart-form__label").text()).toContain("Новый адрес");
    ["street", "building", "flat"].forEach((attribute) => {
      const input = addressForm.find(`input[name='address[${attribute}]']`);
      expect(input.element.disabled).toBeFalsy();
    });
  });

  it("existing address not editable", async () => {
    store.commit(`Auth/${UPDATE_ADDRESSES}`, addresses);
    store.commit(`Cart/${UPDATE_CART}`, { address: addresses[0] });
    createComponent({ localVue, store });
    await flushPromises();
    const addressForm = wrapper.find(".cart-form__address");
    expect(addressForm.find(".cart-form__label").text()).toContain(
      addresses[0].name
    );
    expect(addressForm.exists()).toBeTruthy();
    ["street", "building", "flat"].forEach((attribute) => {
      const input = addressForm.find(`input[name='address[${attribute}]']`);
      expect(input.element.value).toBe(addresses[0][attribute]);
      expect(input.element.disabled).toBeTruthy();
    });
  });

  it("address selector emits cart address update", async () => {
    createComponent({ localVue, store });
    await flushPromises();
    const selector = wrapper.find("select[name='addressSelector']");

    await selector.findAll("option").at(0).setSelected();
    expect(actions.Cart[UPDATE_CART]).toHaveBeenCalledWith(expect.any(Object), {
      address: null,
    });
  });

  it("new address form input emits cart address update", async () => {
    createComponent({ localVue, store });
    const address = store.state.Cart.address;
    const addressForm = wrapper.find(".cart-form__address");
    ["street", "building", "flat"].forEach(async (attribute) => {
      const input = addressForm.find(`input[name='address[${attribute}]']`);
      await input.setValue(attribute);
      expect(actions.Cart[UPDATE_CART]).toHaveBeenCalledWith(
        expect.any(Object),
        {
          address: { ...address, [attribute]: attribute },
        }
      );
    });
  });
});

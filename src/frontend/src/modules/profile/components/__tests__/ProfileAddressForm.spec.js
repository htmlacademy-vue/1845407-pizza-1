import { createLocalVue, mount } from "@vue/test-utils";

import { mockAddresses } from "@/common/mocks/user";
import resources from "@/common/enums/resources";

import ProfileAddressForm from "../ProfileAddressForm";
import AppInputField from "@/common/components/AppInputField";

const localVue = createLocalVue();
localVue.component("AppInputField", AppInputField);

const addressNew = {
  id: null,
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
};

const addressPersisted = mockAddresses[0];

const api = {
  [resources.ADDRESSES]: {
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
};

describe("ProfileAddressForm", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  const mocks = {
    $api: api,
  };
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(ProfileAddressForm, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("render new address form", () => {
    createComponent({ localVue, propsData: { address: addressNew } });
    expect(wrapper.find(".address-form__header b").text()).toBe(
      "Добавить адрес"
    );
    const button = wrapper.find(
      ".address-form__buttons button:not([type='submit'])"
    );
    expect(button.exists()).toBeFalsy();
  });

  it("render persisted address form", () => {
    createComponent({ localVue, propsData: { address: addressPersisted } });
    expect(wrapper.find(".address-form__header b").text()).toBe(
      "Изменить адрес"
    );
    const button = wrapper.find(
      ".address-form__buttons button:not([type='submit'])"
    );
    expect(button.exists()).toBeTruthy();
  });

  it("empty required fields makes form invalid", async () => {
    createComponent({
      localVue,
      mocks,
      propsData: { address: addressNew },
      attachTo: document.body,
    });

    const requiredInputs = wrapper.findAll("input[required]");
    requiredInputs.wrappers.forEach(async (input) => {
      await input.setValue(input.attributes("name"));
    });
    expect(wrapper.element.checkValidity()).toBeTruthy();

    requiredInputs.wrappers.forEach(async (input) => {
      const value = input.element.value;
      await input.setValue(null);
      expect(wrapper.element.checkValidity()).toBeFalsy();
      await input.setValue(value);
    });
  });

  it("new address POST form", async () => {
    const address = { ...addressNew };
    createComponent({
      localVue,
      mocks,
      propsData: { address },
      attachTo: document.body,
    });

    const requiredInputs = wrapper.findAll("input[required]");
    requiredInputs.wrappers.forEach(async (input) => {
      const value = input.attributes("name");
      await input.setValue(value);
      address[value] = value;
    });
    expect(wrapper.element.checkValidity()).toBeTruthy();

    await wrapper.find("button[type='submit']").trigger("click");
    expect(mocks.$api[resources.ADDRESSES].post).toHaveBeenCalledWith(address);
    expect(wrapper.emitted("updateList")[0]).toEqual([address]);
  });

  it("persisted address PUT form", async () => {
    const address = { ...addressPersisted };
    createComponent({
      localVue,
      mocks,
      propsData: { address },
      attachTo: document.body,
    });

    const requiredInputs = wrapper.findAll("input[required]");
    requiredInputs.wrappers.forEach(async (input) => {
      const value = input.attributes("name");
      await input.setValue(value);
      address[value] = value;
    });
    expect(wrapper.element.checkValidity()).toBeTruthy();

    await wrapper.find("button[type='submit']").trigger("click");
    expect(mocks.$api[resources.ADDRESSES].put).toHaveBeenCalledWith(address);
    expect(wrapper.emitted("updateList")[0]).toEqual([address]);
  });

  it("destroy persisted address", async () => {
    createComponent({
      localVue,
      mocks,
      propsData: { address: addressPersisted },
      attachTo: document.body,
    });
    const button = wrapper.find(
      ".address-form__buttons button:not([type='submit'])"
    );
    expect(button.exists()).toBeTruthy();

    await button.trigger("click");
    expect(mocks.$api[resources.ADDRESSES].delete).toHaveBeenCalledWith(
      addressPersisted.id
    );
    expect(wrapper.emitted("updateList")[0]).toEqual([
      { ...addressPersisted, _destroyed: true },
    ]);
  });

  it("close address form", async () => {
    createComponent({
      localVue,
      mocks,
      propsData: { address: addressPersisted },
      attachTo: document.body,
    });

    await wrapper.find(".address-form__header button").trigger("click");
    expect(wrapper.emitted("toggleEdit")[0]).toEqual([false]);
  });
});

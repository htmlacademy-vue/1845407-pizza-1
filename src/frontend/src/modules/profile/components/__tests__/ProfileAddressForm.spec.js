import { createLocalVue, mount } from "@vue/test-utils";

import { addresses } from "@/common/mocks/user";
import resources from "@/common/enums/resources";

import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";
import BaseInputField from "@/common/components/InputField";

const localVue = createLocalVue();
localVue.component("BaseInputField", BaseInputField);

const addressNew = {
  id: null,
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
};

const addressPersisted = addresses[0];

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
    expect(wrapper.find(".address-form__header b").text()).toBe("Добавить адрес");
    expect(wrapper.find(".address-form__buttons button:not([type='submit'])").exists()).toBeFalsy();
  });

  it("render persisted address form", () => {
    createComponent({ localVue, propsData: { address: addressPersisted } });
    expect(wrapper.find(".address-form__header b").text()).toBe("Изменить адрес");
    expect(wrapper.find(".address-form__buttons button:not([type='submit'])").exists()).toBeTruthy();
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
    expect(wrapper.is(":valid")).toBeTruthy();

    requiredInputs.wrappers.forEach(async (input) => {
      const value = input.element.value;
      await input.setValue(null);
      expect(wrapper.is(":invalid")).toBeTruthy();
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
    expect(wrapper.is(":valid")).toBeTruthy();

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
    expect(wrapper.is(":valid")).toBeTruthy();

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
    const destroyButton = wrapper.find(".address-form__buttons button:not([type='submit'])");
    expect(destroyButton.exists()).toBeTruthy();

    await destroyButton.trigger("click");
    expect(mocks.$api[resources.ADDRESSES].delete).toHaveBeenCalledWith(addressPersisted.id);
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
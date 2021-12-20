import { createLocalVue, mount } from "@vue/test-utils";

import pick from "lodash/pick";

import { mockAddresses } from "@/common/mocks/user";

import ProfileAddressItem from "../ProfileAddressItem";
import BaseAddressString from "@/common/components/AddressString";

const localVue = createLocalVue();
localVue.component("BaseAddressString", BaseAddressString);

const address = mockAddresses[0];

describe("ProfileAddressItem", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(ProfileAddressItem, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("renders address name", () => {
    const propsData = { address };
    createComponent({ propsData });
    const nameElement = wrapper.find(".address-form__header > b");
    expect(nameElement.text()).toContain(address.name);
  });

  it("renders address comment", () => {
    const propsData = { address };
    createComponent({ propsData });
    const commentElement = wrapper.find(".sheet.address-form > small");
    expect(commentElement.text()).toContain(address.comment);
  });

  it("render address parts", () => {
    const propsData = { address };
    createComponent({ propsData });
    const addressString = wrapper.findComponent(BaseAddressString);
    expect(addressString.props()).toEqual(
      pick(address, ["street", "building", "flat"])
    );
  });

  it("toggle address edit form", async () => {
    const propsData = { address };
    createComponent({ propsData });
    await wrapper.find(".address-form__edit button").trigger("click");
    expect(wrapper.emitted("toggleEdit")[0]).toEqual([address.id]);
  });
});

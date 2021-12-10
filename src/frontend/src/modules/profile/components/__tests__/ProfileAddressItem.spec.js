import { shallowMount } from "@vue/test-utils";

import { addresses } from "@/common/mocks/user";

import ProfileAddressItem from "@/modules/profile/components/ProfileAddressItem";

const address = addresses[0];

describe("ProfileAddressItem", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(ProfileAddressItem, options);
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

    const addressElement = wrapper.find(".sheet.address-form > p");

    const street = address.street || "";
    expect(addressElement.text()).toContain(street);

    const building = address.building && `д. ${address.building}` || "";
    expect(addressElement.text()).toContain(building);

    const flat = address.flat && `кв. ${address.flat}` || "";
    expect(addressElement.text()).toContain(flat);

    expect(addressElement.text()).toEqual(
      [street, building, flat].filter(Boolean).join(", ")
    );
  });

  it("toggle address edit form", async () => {
    const propsData = { address };
    createComponent({ propsData });

    await wrapper.find(".address-form__edit button").trigger("click");
    expect(wrapper.emitted("toggleEdit")[0]).toEqual([address.id]);
  });
});

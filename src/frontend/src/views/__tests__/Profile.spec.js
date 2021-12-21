import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import resources from "@/common/enums/resources";
import { generateMockStore } from "@/store/mocks";
import { account, mockAddresses } from "@/common/mocks/user";

import { SET_ACCOUNT } from "@/store/modules/auth.store";

import Profile from "../Profile/Index";
import ProfileInfo from "@/modules/profile/components/ProfileInfo";
import ProfileAddressItem from "@/modules/profile/components/ProfileAddressItem";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";

const localVue = createLocalVue();
localVue.component("ProfileInfo", ProfileInfo);
localVue.component("ProfileAddressItem", ProfileAddressItem);
localVue.component("ProfileAddressForm", ProfileAddressForm);
localVue.use(Vuex);

describe("Profile", () => {
  const mocks = {
    $api: {
      [resources.ADDRESSES]: {
        query: jest.fn(() => mockAddresses),
      },
    },
  };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    store = generateMockStore(actions);
    store.commit(`Auth/${SET_ACCOUNT}`, account);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Render profile info component", async () => {
    createComponent({ localVue, store, mocks });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ProfileInfo).exists()).toBeTruthy();
  });

  it("Render all mock addresses as ProfileAddressItem", async () => {
    createComponent({ localVue, store, mocks });
    await wrapper.vm.$nextTick();
    const profileAddressItemList =
      wrapper.findAllComponents(ProfileAddressItem);
    expect(profileAddressItemList.length).toBe(mockAddresses.length);
    expect(wrapper.findComponent(ProfileAddressForm).exists()).toBeFalsy();
    expect(
      wrapper.find("button[data-test='newAddress']").exists()
    ).toBeTruthy();
  });

  it("Emits new address form", async () => {
    createComponent({ localVue, store, mocks });
    await wrapper.vm.$nextTick();

    const button = wrapper.find("button[data-test='newAddress']");
    expect(button.exists()).toBeTruthy();

    await button.trigger("click");
    const form = wrapper.findComponent(ProfileAddressForm);
    expect(form.exists()).toBeTruthy();
    expect(wrapper.find("button[data-test='newAddress']").exists()).toBeFalsy();
  });

  it("Emits existed address edit form", async () => {
    createComponent({ localVue, store, mocks });
    await wrapper.vm.$nextTick();

    const profileAddressItem = wrapper.findComponent(ProfileAddressItem);
    const address = profileAddressItem.props("address");
    profileAddressItem.vm.$emit("toggleEdit", address["id"]);
    await wrapper.vm.$nextTick();
    const form = wrapper.findComponent(ProfileAddressForm);
    expect(form.exists()).toBeTruthy();
    expect(form.props("address")).toEqual(address);
    expect(
      wrapper.find("button[data-test='newAddress']").exists()
    ).toBeTruthy();
    const profileAddressItemList =
      wrapper.findAllComponents(ProfileAddressItem);
    expect(profileAddressItemList.length).toBe(mockAddresses.length - 1);
  });

  it("Address form close", async () => {
    createComponent({ localVue, store, mocks });
    await wrapper.vm.$nextTick();
    await wrapper.find("button[data-test='newAddress']").trigger("click");
    const form = wrapper.findComponent(ProfileAddressForm);
    form.vm.$emit("toggleEdit", false);
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ProfileAddressForm).exists()).toBeFalsy();
  });

  it("Change address edit form", async () => {
    createComponent({ localVue, store, mocks });
    await wrapper.vm.$nextTick();

    let profileAddressItem = wrapper.findComponent(ProfileAddressItem);
    let address = profileAddressItem.props("address");
    profileAddressItem.vm.$emit("toggleEdit", address["id"]);
    await wrapper.vm.$nextTick();
    let form = wrapper.findComponent(ProfileAddressForm);
    expect(form.exists()).toBeTruthy();
    expect(form.props("address")).toEqual(address);

    profileAddressItem = wrapper.findComponent(ProfileAddressItem);
    address = profileAddressItem.props("address");
    profileAddressItem.vm.$emit("toggleEdit", address["id"]);
    await wrapper.vm.$nextTick();
    form = wrapper.findComponent(ProfileAddressForm);
    expect(form.exists()).toBeTruthy();
    expect(form.props("address")).toEqual(address);
  });

  it("Destroy persisted address", async () => {
    createComponent({ localVue, store, mocks });
    await wrapper.vm.$nextTick();

    let profileAddressItem = wrapper.findComponent(ProfileAddressItem);
    let address = profileAddressItem.props("address");
    profileAddressItem.vm.$emit("toggleEdit", address["id"]);
    await wrapper.vm.$nextTick();
    let form = wrapper.findComponent(ProfileAddressForm);
    form.vm.$emit("updateList", { ...address, _destroyed: true });
    await wrapper.vm.$nextTick();

    form = wrapper.findComponent(ProfileAddressForm);
    expect(form.exists()).toBeFalsy();
    const profileAddressItemList =
      wrapper.findAllComponents(ProfileAddressItem);
    expect(profileAddressItemList.length).toBe(mockAddresses.length - 1);
  });
});

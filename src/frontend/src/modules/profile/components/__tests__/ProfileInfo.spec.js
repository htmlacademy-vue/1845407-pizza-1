import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { SET_ACCOUNT } from "@/modules/auth/store";
import { account } from "@/common/mocks/user";

import ProfileInfo from "../ProfileInfo";
import BlockAvatar from "@/common/components/BlockAvatar";

const localVue = createLocalVue();
localVue.component("BlockAvatar", BlockAvatar);
localVue.use(Vuex);

describe("ProfileInfo", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(ProfileInfo, options);
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

  it("render user avatar", () => {
    createComponent({ localVue, store });
    const avatar = wrapper.findComponent(BlockAvatar);
    expect(avatar.exists()).toBeTruthy();
    expect(avatar.props("src")).toEqual(account.avatar);
    expect(avatar.props("alt")).toEqual(account.name);
  });

  it("render user name", () => {
    createComponent({ localVue, store });
    expect(wrapper.find(".user__name").text()).toEqual(account.name);
  });

  it("render user phone", () => {
    createComponent({ localVue, store });
    expect(wrapper.find(".user__phone").text()).toEqual(
      `Контактный телефон: ${account.phone}`
    );
  });
});

import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { generateMockStore } from "@/store/mocks";

import { SET_ACCOUNT, SIGN_OUT } from "@/modules/auth/store";
import { account } from "@/common/mocks/user";

import AccountHeader from "../AccountHeader";
import BaseAvatarBlock from "@/common/components/AvatarBlock";

const localVue = createLocalVue();
localVue.component("BaseAvatarBlock", BaseAvatarBlock);
localVue.use(Vuex);
localVue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Builder",
    children: [
      {
        path: "/login",
        name: "Login",
      },
    ],
  },
  {
    path: "/profile",
    name: "Profile",
  },
];
const router = new VueRouter({ mode: "history", routes });

describe("AccountHeader", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(AccountHeader, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    actions = {
      Auth: {
        [SIGN_OUT]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    // store.commit(`Auth/${SET_ACCOUNT}`, account);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("User not authenticated", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.find(".header__login").exists()).toBeTruthy();
    expect(wrapper.find(".header__logout").exists()).toBeFalsy();
  });

  it("User is authenticated", () => {
    store.commit(`Auth/${SET_ACCOUNT}`, account);
    createComponent({ localVue, store, router });
    expect(wrapper.find(".header__login").exists()).toBeFalsy();
    expect(wrapper.find(".header__logout").exists()).toBeTruthy();

    const avatar = wrapper.findComponent(BaseAvatarBlock);
    expect(avatar.exists()).toBeTruthy();
    expect(avatar.props("src")).toEqual(account.avatar);
    expect(avatar.props("alt")).toEqual(account.name);

    const profile = wrapper.findAll("a[href]").at(0);
    expect(profile.find("span").text()).toEqual(account.name);
  });

  it("User logout click emits store SIGN_OUT", async () => {
    store.commit(`Auth/${SET_ACCOUNT}`, account);
    createComponent({ localVue, store, router });
    const logout = wrapper.find(".header__logout");
    await logout.trigger("click");
    expect(actions.Auth[SIGN_OUT]).toHaveBeenCalled();
  });
});

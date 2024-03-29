import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import Login from "../Index/^Login";
import AppInputField from "@/common/components/AppInputField";

import { SIGN_IN } from "@/modules/auth/store";

import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.component("AppInputField", AppInputField);
localVue.use(Vuex);

describe("Login", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  let actions;
  let store;

  beforeEach(() => {
    actions = {
      Auth: {
        [SIGN_IN]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Form invalid until inputs filled", () => {
    createComponent({ localVue, store });
    expect(wrapper.find("form").element.checkValidity()).toBeFalsy();
  });

  it("Form sign in", async () => {
    const authData = {
      email: "user@example.com",
      password: "user@example.com",
      from: { path: "/cart" },
    };
    createComponent({ localVue, store, attachTo: document.body });
    Login.beforeRouteEnter.call(wrapper.vm, undefined, authData.from, (c) =>
      c(wrapper.vm)
    );
    await wrapper.vm.$nextTick();
    const form = wrapper.find("form");
    await form.find("input[name='email']").setValue(authData.email);
    await form.find("input[name='password']").setValue(authData.password);
    expect(form.element.checkValidity()).toBeTruthy();
    await form.find("button[type='submit']").trigger("click");
    expect(actions.Auth[SIGN_IN]).toHaveBeenCalledWith(expect.any(Object), {
      ...authData,
    });
    expect(wrapper.emitted("close")[0]).toEqual([authData.from.path]);
  });

  it("Emits form close", async () => {
    const from = { path: "/" };
    createComponent({ localVue, store });
    Login.beforeRouteEnter.call(wrapper.vm, undefined, from, (c) =>
      c(wrapper.vm)
    );
    await wrapper.vm.$nextTick();
    await wrapper.find("button.close").trigger("click");
    expect(wrapper.emitted("close")[0]).toEqual([from.path]);
  });
});

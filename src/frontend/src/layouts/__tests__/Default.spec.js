import { shallowMount } from "@vue/test-utils";
import DefaultLayout from "../Default";

const stubs = ["router-view"];

describe("DefaultLayout", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(DefaultLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});

import { shallowMount } from "@vue/test-utils";
import LayoutDefault from "../LayoutDefault";

const stubs = ["router-view"];

describe("LayoutDefault", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(LayoutDefault, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});

import { shallowMount } from "@vue/test-utils";
import LayoutSidebar from "../LayoutSidebar";

const stubs = ["router-link", "router-view"];

describe("LayoutSidebar", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(LayoutSidebar, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});

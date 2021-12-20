import { shallowMount } from "@vue/test-utils";
import SidebarLayout from "../Sidebar";

const stubs = ["router-link", "router-view"];

describe("SidebarLayout", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(SidebarLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});

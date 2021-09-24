import { shallowMount } from "@vue/test-utils";
import AppNotification from "../AppNotification";

describe("AppNotification", () => {
  const mocks = {
    $store: {
      state: {
        notifications: [],
      },
    },
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppNotification, options);
  };

  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.notifications = [];
  });

  it("doesn't render out when no notifications", () => {
    createComponent({ mocks });
    expect(wrapper.isVisible()).toBeFalsy();
  });

  it("renders out when we have notifications", () => {
    mocks.$store.state.notifications = [{ text: "text", type: "warning" }];
    createComponent({ mocks });
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.findAll(".notification").length).toBeTruthy();
  });

  it("renders out notification", () => {
    const types = ["info", "error", "success", "warning"];
    types.forEach((type) => {
      mocks.$store.state.notifications.push({ type, text: type });
    });
    createComponent({ mocks });
    types.forEach((type) => {
      let notification = wrapper.find(`.notification--${type}`);
      expect(notification.exists()).toBeTruthy();
      expect(notification.text()).toBe(type);
    });
  });
});

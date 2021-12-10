import { createLocalVue, mount } from "@vue/test-utils";
import VueRouter from "vue-router";

import Sidebar from "@/modules/account/components/Sidebar";

const localVue = createLocalVue();
localVue.use(VueRouter);

const routes = [
  {
    path: "/orders",
    name: "orders",
  },
  {
    path: "/profile",
    name: "profile",
  },
];
const router = new VueRouter({ mode: "history", routes });

describe("Sidebar", () => {
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(Sidebar, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Orders active", async () => {
    createComponent({ localVue, router });

    const link = wrapper.findAll("a.layout__link").at(0);
    expect(link.text()).toEqual("История заказов");

    await link.trigger("click");
    expect(link.classes("layout__link--active")).toBeTruthy();
  });

  it("Profile active", async () => {
    createComponent({ localVue, router });

    const link = wrapper.findAll("a.layout__link").at(1);
    expect(link.text()).toEqual("Мои данные");

    await link.trigger("click");
    expect(link.classes("layout__link--active")).toBeTruthy();
  });
});

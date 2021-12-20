import { shallowMount } from "@vue/test-utils";
import Avatar from "../Avatar";

describe("Avatar", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    src: "/img/users/user5.jpg",
  };
  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(Avatar, options);
  };
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("It renders out source and img", () => {
    createComponent({ propsData });
    expect(wrapper.find("source").exists()).toBeTruthy();
    expect(wrapper.find("img").exists()).toBeTruthy();
  });

  it("It sets img alt", () => {
    const alt = "img alt text";
    createComponent({ propsData: { ...propsData, alt } });
    expect(wrapper.find("img").attributes("alt")).toBe(alt);
  });

  it("It sets img 32 src", () => {
    createComponent({ propsData });
    expect(wrapper.find("img").attributes("src")).toBe(propsData.src);
  });

  it("It sets img 72 src", () => {
    const size = 72;
    createComponent({ propsData: { ...propsData, size } });
    expect(wrapper.find("img").attributes("src")).toBe(
      propsData.src.replace(".jpg", "@2x.jpg")
    );
  });
});

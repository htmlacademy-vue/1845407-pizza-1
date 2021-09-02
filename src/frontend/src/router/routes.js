import { auth, allowAuthenticated, skipAuthenticated } from "@/middlewares";

export default [
  {
    path: "/",
    name: "builder",
    components: {
      default: () => import("@/views/Builder"),
    },
  },
  {
    path: "/login",
    name: "login",
    components: {
      default: () => import("@/views/Login"),
      main: () => import("@/views/Builder"),
    },
    meta: {
      layout: "Popup",
      middlewares: [auth, skipAuthenticated],
    },
  },
  {
    path: "/cart",
    name: "cart",
    components: {
      default: () => import("@/views/Cart"),
    },
  },
  {
    path: "/cart/thanks",
    name: "thanks",
    components: {
      default: () => import("@/views/Thanks"),
      main: () => import("@/views/Cart"),
    },
    meta: {
      layout: "Popup",
    },
    beforeEnter(to, from, next) {
      // исключить попадание на эту страницу если это не переход из корзины
      if (from.name == "cart") next();
      else next(false);
    },
  },
  {
    path: "/orders",
    name: "orders",
    components: {
      default: () => import("@/views/Orders"),
      sidebar: () => import("@/modules/account/components/Sidebar"),
    },
    meta: {
      layout: "Sidebar",
      middlewares: [auth, allowAuthenticated],
    },
  },
  {
    path: "/profile",
    name: "profile",
    components: {
      default: () => import("@/views/Profile"),
      sidebar: () => import("@/modules/account/components/Sidebar"),
    },
    meta: {
      layout: "Sidebar",
      middlewares: [auth, allowAuthenticated],
    },
  },
];

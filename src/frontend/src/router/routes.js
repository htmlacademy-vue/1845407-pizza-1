import { auth, isLogged } from "@/middlewares";

export default [
  {
    path: "/",
    name: "builder",
    components: {
      default: () => import("@/views/Builder.vue"),
    },
  },
  {
    path: "/login",
    name: "login",
    components: {
      default: () => import("@/views/Login.vue"),
      main: () => import("@/views/Builder.vue"),
    },
    meta: {
      layout: "Popup",
    },
  },
  {
    path: "/cart",
    name: "cart",
    components: {
      default: () => import("@/views/Cart.vue"),
    },
  },
  {
    path: "/cart/thanks",
    name: "thanks",
    components: {
      default: () => import("@/views/Thanks.vue"),
      main: () => import("@/views/Cart.vue"),
    },
    meta: {
      layout: "Popup",
    },
  },
  {
    path: "/orders",
    name: "orders",
    components: {
      default: () => import("@/views/Orders.vue"),
      sidebar: () => import("@/modules/account/components/Sidebar.vue"),
    },
    meta: {
      layout: "Sidebar",
      middlewares: [auth, isLogged],
    },
  },
  {
    path: "/profile",
    name: "profile",
    components: {
      default: () => import("@/views/Profile.vue"),
      sidebar: () => import("@/modules/account/components/Sidebar.vue"),
    },
    meta: {
      layout: "Sidebar",
      middlewares: [auth, isLogged],
    },
  },
];

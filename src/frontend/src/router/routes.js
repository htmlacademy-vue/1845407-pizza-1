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
    meta: { layout: "Popup" },
    components: {
      default: () => import("@/views/Login.vue"),
      main: () => import("@/views/Builder.vue"),
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
    meta: { layout: "Popup" },
    components: {
      default: () => import("@/views/Thanks.vue"),
      main: () => import("@/views/Cart.vue"),
    },
  },
  {
    path: "/orders",
    name: "orders",
    meta: { layout: "Sidebar" },
    components: {
      default: () => import("@/views/Orders.vue"),
      sidebar: () => import("@/modules/account/components/Sidebar.vue"),
    },
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "Sidebar" },
    components: {
      default: () => import("@/views/Profile.vue"),
      sidebar: () => import("@/modules/account/components/Sidebar.vue"),
    },
  },
];

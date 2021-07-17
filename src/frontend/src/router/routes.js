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
      default: () => import("@/views/Builder.vue"),
      popup: () => import("@/views/Login.vue"),
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
    path: "/orders",
    name: "orders",
    components: {
      default: () => import("@/views/Orders.vue"),
      sidebar: () => import("@/modules/account/components/Sidebar.vue"),
    },
    meta: { layout: "Sidebar" },
  },
  {
    path: "/profile",
    name: "profile",
    components: {
      default: () => import("@/views/Profile.vue"),
      sidebar: () => import("@/modules/account/components/Sidebar.vue"),
    },
    meta: { layout: "Sidebar" },
  },
];

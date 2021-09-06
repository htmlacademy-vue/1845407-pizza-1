// eslint-disable-next-line no-unused-vars
import {
  auth,
  allowAuthenticated,
  skipAuthenticated,
  fromCart,
} from "@/middlewares";

export default [
  {
    path: "/",
    name: "builder",
    components: {
      default: () => import("@/views/Builder"),
    },
    children: [
      {
        path: "/login",
        name: "login",
        components: {
          modal: () => import("@/views/Login"),
        },
        meta: {
          middlewares: [auth, skipAuthenticated],
        },
      },
    ],
  },
  {
    path: "/cart",
    name: "cart",
    components: {
      default: () => import("@/views/Cart"),
    },
    children: [
      {
        path: "/cart/thanks",
        name: "thanks",
        components: {
          modal: () => import("@/views/Thanks"),
        },
        meta: {
          middlewares: [fromCart],
        },
      },
    ],
  },
  {
    path: "/orders",
    name: "orders",
    components: {
      default: () => import("@/views/Orders"),
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
    },
    meta: {
      layout: "Sidebar",
      middlewares: [auth, allowAuthenticated],
    },
  },
];

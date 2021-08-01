import { SET_ACCOUNT } from "../store/modules/auth.store";

const auth = async ({ store, nextMiddleware }) => {
  if (!store.getters["Auth/isLogged"]) {
    const token = store.$jwt.getToken();
    if (token) {
      store.$api.auth.setAuthHeader();
      await store.dispatch(`Auth/${SET_ACCOUNT}`);
    }
  }
  return nextMiddleware();
};

export default auth;

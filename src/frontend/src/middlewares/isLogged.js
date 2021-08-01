// import { SET_ACCOUNT } from "../store/modules/auth.store";

const isLogged = ({ from, next, store, nextMiddleware }) => {
  if (!store.getters["Auth/isLogged"]) {
    next(from.fullPath);
  }
  return nextMiddleware();
};

export default isLogged;

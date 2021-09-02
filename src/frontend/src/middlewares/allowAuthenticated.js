const allowAuthenticated = ({ from, next, store, nextMiddleware }) => {
  return store.getters["Auth/isLogged"]
    ? nextMiddleware()
    : next(from.fullPath);
};

export default allowAuthenticated;

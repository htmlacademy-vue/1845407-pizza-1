const skipAuthenticated = ({ from, next, store, nextMiddleware }) => {
  if (store.getters["Auth/isLogged"]) next(from.fullPath);
  return nextMiddleware();
};

export default skipAuthenticated;

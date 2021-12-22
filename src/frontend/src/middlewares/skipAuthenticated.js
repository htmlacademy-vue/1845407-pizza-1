const skipAuthenticated = ({ from, next, store, nextMiddleware }) => {
  console.log("skipAuthenticated");
  return !store.getters["Auth/isLogged"]
    ? nextMiddleware()
    : next(from.fullPath);
};

export default skipAuthenticated;

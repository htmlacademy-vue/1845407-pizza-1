const fromCart = ({ from, next, nextMiddleware }) => {
  return from.name === "cart" ? nextMiddleware() : next(from.fullPath);
};

export default fromCart;

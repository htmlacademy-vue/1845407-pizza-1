const fromCart = ({ from, next, nextMiddleware }) => {
  console.log("fromCart");
  return from.path === "/cart" ? nextMiddleware() : next(from.fullPath);
};

export default fromCart;

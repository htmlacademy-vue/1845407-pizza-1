// Добавляем к объекту аттрибут type
// из сопоставления { name: type }
export const pizzaTypesMixin = (obj, types) => {
  return (obj || {}).map((item) => ({
    ...item,
    type: types[item.name],
  }));
};

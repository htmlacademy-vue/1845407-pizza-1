// Добавляем к объекту аттрибут type
// из сопоставления { name: type }
export const pizzaTypesMixin = (obj, types) => {
  return (obj || {}).map((item) => ({
    ...item,
    type: findTypeByName(types, item.name),
  }));
};

// Ищет среди записей вида
// [{ name: "", type: ""}]
// подходящую по имени, и возвращает type или undefined
const findTypeByName = (types, name) => {
  const type = types.find((obj) => obj.name === name);
  // возможно исключение, когда нет записи с исхомым именем
  return type && type.type;
};

// Добавляем к объекту аттрибут type
// из сопоставления { name: type }
export const pizzaTypesMixin = (obj, types) => {
  return obj.map((item) => ({
    ...item,
    ...findTypeByName(types, item.name),
  }));
};

// Ищет среди записей вида
// [{ name: "", type: ""}]
// подходящую по имени, и возвращает объект
const findTypeByName = (types, name) => {
  // возможно исключение, когда нет записи с исхомым именем
  return types.find((obj) => obj.name === name) || {};
};

import resources from "@/common/enums/resources";
import { AuthApiService, BuilderApiService } from "@/services/api.service";

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

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.DOUGHS]: new BuilderApiService(resources.DOUGHS),
    [resources.SIZES]: new BuilderApiService(resources.SIZES),
    [resources.SAUCES]: new BuilderApiService(resources.SAUCES),
    [resources.INGREDIENTS]: new BuilderApiService(resources.INGREDIENTS),
  };
};

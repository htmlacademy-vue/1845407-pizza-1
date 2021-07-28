import find from "lodash/find";

import resources from "@/common/enums/resources";
import { AuthApiService, BuilderApiService } from "@/services/api.service";

// Добавляем к объекту аттрибут type
// из сопоставления { name: type }
export const pizzaTypesMixin = (obj, types) => {
  return obj.map((item) =>
    Object.assign(item, find(types, ["name", item.name]))
  );
};

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.DOUGH]: new BuilderApiService(resources.DOUGH),
    [resources.SIZES]: new BuilderApiService(resources.SIZES),
    [resources.SAUCES]: new BuilderApiService(resources.SAUCES),
    [resources.INGREDIENTS]: new BuilderApiService(resources.INGREDIENTS),
  };
};

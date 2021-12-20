import find from "lodash/find";

import resources from "@/common/enums/resources";
import {
  AuthApiService,
  BuilderApiService,
  CrudApiService,
} from "@/services/api.service";

export const normalizeByKey = (list, data, key) =>
  list.map((item) => ({ ...item, ...find(data, [key, item[key]]) }));

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.DOUGH]: new BuilderApiService(resources.DOUGH, notifier),
    [resources.SIZES]: new BuilderApiService(resources.SIZES, notifier),
    [resources.SAUCES]: new BuilderApiService(resources.SAUCES, notifier),
    [resources.INGREDIENTS]: new BuilderApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new BuilderApiService(resources.MISC, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
  };
};

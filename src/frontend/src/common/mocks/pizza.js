import pizzaMock from "@/static/pizza.json";
import {
  PIZZA_DOUGH_TYPES,
  PIZZA_INGREDIENTS_TYPES,
  PIZZA_SAUCES_TYPES,
  PIZZA_SIZES_TYPES,
} from "@/common/constants";

import { normalizeByKey } from "@/common/helpers";

export const dough = normalizeByKey(pizzaMock.dough, PIZZA_DOUGH_TYPES, "name");
export const sizes = normalizeByKey(pizzaMock.sizes, PIZZA_SIZES_TYPES, "name");
export const sauces = normalizeByKey(
  pizzaMock.sauces,
  PIZZA_SAUCES_TYPES,
  "name"
);
export const ingredients = normalizeByKey(
  pizzaMock.ingredients,
  PIZZA_INGREDIENTS_TYPES,
  "name"
);

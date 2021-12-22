import random from "lodash/random";
import times from "lodash/times";
import uniqueId from "lodash/uniqueId";

import { normalizeByKey } from "@/common/helpers";

import pizzaMock from "@/static/pizza.json";
import {
  PIZZA_DOUGH_TYPES,
  PIZZA_INGREDIENTS_TYPES,
  PIZZA_SAUCES_TYPES,
  PIZZA_SIZES_TYPES,
} from "@/common/constants";

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

export const mockChoice = () => {
  const mockDough = { ...dough[random(dough.length - 1)], checked: true };
  const mockSize = { ...sizes[random(sizes.length - 1)], checked: true };
  const mockSauce = { ...sauces[random(sauces.length - 1)], checked: true };
  let mockIngredients = ingredients.map((ingredient) => ({
    ...ingredient,
    quantity: 0,
  }));
  times(random(1, 5), (index) => {
    let ingredient = mockIngredients.splice(
      random(mockIngredients.length - index - 1),
      1
    )[0];
    mockIngredients.push({
      ...ingredient,
      quantity: random(1, 3),
    });
  });

  let price = mockIngredients.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  );
  price += mockDough?.price ?? 0;
  price += mockSauce?.price ?? 0;
  price *= mockSize?.multiplier ?? 0;

  return {
    id: +uniqueId(),
    name: new Date().toString(),
    dough: mockDough,
    size: mockSize,
    sauce: mockSauce,
    ingredients: mockIngredients,
    quantity: 1,
    price,
  };
};

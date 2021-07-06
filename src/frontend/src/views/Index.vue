<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="(dough, index) in doughs"
                :key="dough.type"
                class="dough__input"
                :class="`dough__input--${dough.type}`"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="dough.type"
                  class="visually-hidden"
                  :checked="!index"
                />
                <b>{{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="(size, index) of sizes"
                :key="size.type"
                class="diameter__input"
                :class="`diameter__input--${size.type}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="size.type"
                  class="visually-hidden"
                  :checked="index === 1"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingridients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingridients">
              <div class="ingridients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="(sauce, index) of sauces"
                  :key="sauce.type"
                  class="radio ingridients__input"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="sauce.type"
                    :checked="index === 0"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingridients__filling">
                <p>Начинка:</p>

                <ul class="ingridients__list">
                  <li
                    v-for="ingredient of ingredients"
                    :key="ingredient.type"
                    class="ingridients__item"
                  >
                    <span
                      class="filling"
                      :class="`filling--${ingredient.type}`"
                    >
                      {{ ingredient.name }}
                    </span>

                    <div class="counter counter--orange ingridients__counter">
                      <button
                        type="button"
                        class="
                          counter__button
                          counter__button--minus
                          counter__button--disabled
                        "
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        :name="`counter[${ingredient.type}]`"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button button--disabled" disabled="">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import {
  PIZZA_DOUGH_TYPES,
  PIZZA_INGREDIENTS_TYPES,
  PIZZA_SAUCES_TYPES,
  PIZZA_SIZES_TYPES,
} from "@/common/constants";
import { pizzaTypesMixin } from "@/common/helpers";

export default {
  name: "PizzaIndex",
  data() {
    return {
      misc: misc,
      pizza: pizza,
      user: user,
    };
  },
  computed: {
    doughs() {
      return pizzaTypesMixin(pizza.dough, PIZZA_DOUGH_TYPES);
    },
    ingredients() {
      return pizzaTypesMixin(pizza.ingredients, PIZZA_INGREDIENTS_TYPES);
    },
    sauces() {
      return pizzaTypesMixin(pizza.sauces, PIZZA_SAUCES_TYPES);
    },
    sizes() {
      return pizzaTypesMixin(pizza.sizes, PIZZA_SIZES_TYPES);
    },
  },
};
</script>

<style lang="scss" scoped></style>

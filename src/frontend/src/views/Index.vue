<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <pzz-builder-dough-selector
          :doughs="pizza.doughs"
          @pizzaUpdate="pizzaUpdate"
        />

        <pzz-builder-size-selector
          :sizes="pizza.sizes"
          @pizzaUpdate="pizzaUpdate"
        />

        <pzz-builder-ingredients-selector
          :ingredients="pizza.ingredients"
          :sauces="pizza.sauces"
          @pizzaUpdate="pizzaUpdate"
        />

        <div class="content__pizza">
          <pzz-builder-title-input
            :title="pizza.title"
            @pizzaUpdate="pizzaUpdate"
          />

          <pzz-builder-pizza-view
            :pizzaChoice="choice"
            @pizzaUpdate="pizzaUpdate"
          />
          <pzz-builder-price-counter :pizzaChoice="choice" />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import misc from "@/static/misc.json";
import pizzaConfigParts from "@/static/pizza.json";
import {
  PIZZA_DOUGH_TYPES,
  PIZZA_INGREDIENTS_TYPES,
  PIZZA_SAUCES_TYPES,
  PIZZA_SIZES_TYPES,
} from "@/common/constants";

import _ from "lodash";
import { pizzaTypesMixin } from "@/common/helpers";

import PzzBuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import PzzBuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import PzzBuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import PzzBuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import PzzBuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import PzzBuilderTitleInput from "@/modules/builder/components/BuilderTitleInput.vue";

export default {
  name: "PzzIndex",
  components: {
    PzzBuilderDoughSelector,
    PzzBuilderSizeSelector,
    PzzBuilderIngredientsSelector,
    PzzBuilderPizzaView,
    PzzBuilderPriceCounter,
    PzzBuilderTitleInput,
  },
  data() {
    return {
      misc: misc,
      pizza: {
        title: "",
        doughs: pizzaTypesMixin(pizzaConfigParts.dough, PIZZA_DOUGH_TYPES),
        sizes: pizzaTypesMixin(pizzaConfigParts.sizes, PIZZA_SIZES_TYPES),
        sauces: pizzaTypesMixin(pizzaConfigParts.sauces, PIZZA_SAUCES_TYPES),
        ingredients: pizzaTypesMixin(
          pizzaConfigParts.ingredients,
          PIZZA_INGREDIENTS_TYPES
        ),
      },
    };
  },
  computed: {
    choice() {
      return {
        title: this.pizza.title,
        dough: _.find(this.pizza.doughs, "checked"),
        size: _.find(this.pizza.sizes, "checked"),
        sauce: _.find(this.pizza.sauces, "checked"),
        ingredients: this.pizza.ingredients.filter(
          (ingredient) => ingredient.count > 0
        ),
      };
    },
  },
  methods: {
    pizzaUpdate(data) {
      this.pizza = { ...this.pizza, ...data };
    },
  },
};
</script>

<style lang="scss" scoped></style>

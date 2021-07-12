<template>
  <div class="content__result">
    <p>Итого: {{ cost }} ₽</p>
    <button
      type="button"
      class="button"
      :class="{ 'button--disabled': !hasIngredients || !title }"
      :disabled="!hasIngredients || !title"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "PzzBuilderPriceCounter",
  props: {
    pizzaChoice: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cost() {
      let cost = 0;
      cost += this.pizzaChoice.ingredients.reduce(
        (total, ingredient) => total + ingredient.price * ingredient.count,
        0
      );
      cost += this.pizzaChoice.dough.price;
      cost += this.pizzaChoice.sauce.price;
      cost *= this.pizzaChoice.size.multiplier;
      return cost;
    },
    title() {
      return this.pizzaChoice.title;
    },
    hasIngredients() {
      return !!this.pizzaChoice.ingredients.length;
    },
  },
};
</script>

<style lang="scss" scoped></style>

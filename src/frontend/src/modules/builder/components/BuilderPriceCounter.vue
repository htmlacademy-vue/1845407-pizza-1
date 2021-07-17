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
    title: {
      type: String,
      default: "",
    },
    dough: {
      type: Object,
      required: true,
    },
    size: {
      type: Object,
      required: true,
    },
    sauce: {
      type: Object,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  computed: {
    cost() {
      let cost = 0;
      cost += this.ingredients.reduce(
        (total, ingredient) => total + ingredient.price * ingredient.count,
        0
      );
      cost += this.dough.price;
      cost += this.sauce.price;
      cost *= this.size.multiplier;
      return cost;
    },
    hasIngredients() {
      return !!this.ingredients.length;
    },
  },
};
</script>

<style lang="scss" scoped></style>

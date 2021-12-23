<template>
  <li class="order__item">
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="name"
      >
      <div class="product__text">
        <h2>{{ name }}</h2>
        <ul>
          <li>{{ size.name }}, {{ dough.desc }}</li>
          <li>Соус: {{ sauceDesc }}</li>
          <li>Начинка: {{ ingredientsDesc }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">
      {{ quantity }} x {{ price }}₽
    </p>
  </li>
</template>

<script>
export default {
  name: "OrderPizzaItem",
  props: {
    id: {
      type: [Number, String],
      default: undefined,
    },

    name: {
      type: String,
      default: "",
    },

    dough: {
      type: Object,
      default: () => {},
    },

    size: {
      type: Object,
      default: () => {},
    },

    sauce: {
      type: Object,
      default: () => {},
    },

    ingredients: {
      type: Array,
      default: () => [],
    },

    quantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    sauceDesc() {
      return this.sauce.name.toLowerCase();
    },

    ingredientsDesc() {
      return this.ingredients
        .filter(({ quantity }) => quantity)
        .map(({ name }) => name)
        .join(", ")
        .toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/blocks/product.scss";

  .order__item {
    display: flex;

    width: 310px;
    margin-right: 33px;
    margin-bottom: 32px;
  }
  .order__price {
    @include b-s16-h19;

    margin: 0 15px;

    white-space: nowrap;
  }
</style>

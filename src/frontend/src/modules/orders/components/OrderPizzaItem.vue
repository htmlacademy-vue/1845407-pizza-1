<template>
  <li class="order__item">
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="name"
      />
      <div class="product__text">
        <h2>{{ name }}</h2>
        <ul>
          <li>{{ size.name }}, {{ dough.desc }}</li>
          <li>Соус: {{ sauceDesc }}</li>
          <li>Начинка: {{ ingredientsDesc }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">{{ quantity }} x {{ price }}₽</p>
  </li>
</template>

<script>
export default {
  name: "OrderPizzaItem",
  props: {
    id: [Number, String],
    name: {
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
      default: () => [],
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: Number,
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

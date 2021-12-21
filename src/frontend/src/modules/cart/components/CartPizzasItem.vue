<template>
  <li>
    <div class="product cart-list__product">
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

    <base-item-counter
      class="cart-list__counter"
      :name="`pizza[${id}][quantity]`"
      :value="quantity"
      :min="1"
      @input="$emit('onChangeCount', $event)"
    />

    <div class="cart-list__price">
      <b>
        <base-cost-block :pizzas="[{ price, quantity }]" />
      </b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click="$router.push({ name: 'Builder', query: { id } })"
      >
        Изменить
      </button>
      <button
        type="button"
        class="cart-list__edit"
        @click="$emit('onChangeCount', 0)"
      >
        Удалить
      </button>
    </div>
  </li>
</template>

<script>
import BaseItemCounter from "@/common/components/ItemCounter";
import BaseCostBlock from "@/common/components/CostBlock";

export default {
  name: "CartPizzasItem",
  components: { BaseItemCounter, BaseCostBlock },
  props: {
    id: {
      type: [String, Number],
      required: true,
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
.cart-list__button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>

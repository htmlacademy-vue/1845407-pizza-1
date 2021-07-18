<template>
  <li>
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="title"
      />
      <div class="product__text">
        <h2>{{ title }}</h2>
        <ul>
          <li>{{ size.name }}, {{ dough.desc }}</li>
          <li>Соус: {{ sauceDesc }}</li>
          <li>Начинка: {{ ingredientsDesc }}</li>
        </ul>
      </div>
    </div>

    <base-item-counter
      class="cart-list__counter"
      :name="`pizza[${uid}][count]`"
      :value="count"
      min="0"
      @input="onChangeCount"
    />

    <div class="cart-list__price">
      <b>{{ cost }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
    </div>
  </li>
</template>

<script>
import BaseItemCounter from "@/common/components/ItemCounter.vue";

export default {
  name: "CartPizzasItem",
  components: { BaseItemCounter },
  props: {
    uid: String,
    title: String,
    dough: Object,
    size: Object,
    sauce: Object,
    ingredients: Array,
    count: Number,
    price: Number,
  },
  computed: {
    sauceDesc() {
      return this.sauce.name.toLowerCase();
    },
    ingredientsDesc() {
      return this.ingredients
        .map(({ name }) => name)
        .join(", ")
        .toLowerCase();
    },

    cost() {
      return this.count * this.price;
    },
  },
  methods: {
    onChangeCount(event) {
      console.log({ onChangeCount: event });
    },
  },
};
</script>

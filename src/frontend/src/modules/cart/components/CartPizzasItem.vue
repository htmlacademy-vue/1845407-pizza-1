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
      :name="`pizza[${id}][count]`"
      :value="count"
      :min="1"
      @input="$emit('onChangeCount', $event.target.value)"
    />

    <div class="cart-list__price">
      <b>{{ cost }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="onEditPizza">
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
import filter from "lodash/filter";
import BaseItemCounter from "@/common/components/ItemCounter.vue";

export default {
  name: "CartPizzasItem",
  components: { BaseItemCounter },
  props: {
    id: String,
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
      return filter(this.ingredients, "count")
        .map(({ name }) => name)
        .join(", ")
        .toLowerCase();
    },

    cost() {
      return this.count * this.price;
    },
  },
  methods: {
    onEditPizza() {
      const id = this.id;
      this.$router.push({ name: "builder", query: { id } });
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

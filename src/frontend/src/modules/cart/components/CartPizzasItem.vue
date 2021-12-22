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
        @click="$router.push({ path: '/', query: { id } })"
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
      type: [Number],
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
  @import "~@/assets/scss/blocks/product.scss";

  .cart-list__item {
    display: flex;
    align-items: flex-start;

    margin-bottom: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    padding-left: 15px;

    border-bottom: 1px solid rgba($green-500, 0.1);

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;

      border-bottom: none;
    }
  }

  .cart-list__product {
    flex-grow: 1;

    margin-right: auto;
  }

  .cart-list__counter {
    width: 54px;
    margin-right: auto;
    margin-left: 20px;
  }

  .cart-list__price {
    min-width: 100px;
    margin-right: 36px;
    margin-left: 10px;

    text-align: right;

    b {
      @include b-s16-h19;
    }
  }

  .cart-list__edit {
    @include l-s11-h13;

    cursor: pointer;
    transition: 0.3s;

    border: none;
    outline: none;
    background-color: transparent;

    &:hover {
      color: $green-500;
    }

    &:active {
      color: $green-600;
    }

    &:focus {
      color: $green-400;
    }
  }

  .cart-list__button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>

<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="image"
        width="39"
        height="60"
        :alt="name"
      >
      <span>
        {{ name }}
        <br>
        <span>{{ price }} ₽/шт</span>
      </span>
    </p>

    <div class="additional-list__wrapper">
      <base-item-counter
        class="additional-list__counter"
        name="addition[quantity]"
        :value="quantity"
        :min="0"
        @input="$emit('onChangeCount', $event)"
      />
      <div class="additional-list__price">
        <b><base-cost-block :misc="[{ price, quantity }]" /></b>
      </div>
    </div>
  </li>
</template>

<script>
import BaseItemCounter from "@/common/components/ItemCounter";
import BaseCostBlock from "@/common/components/CostBlock";

export default {
  name: "CartMiscItem",
  components: { BaseItemCounter, BaseCostBlock },
  props: {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
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
    cost() {
      return this.quantity * this.price;
    },
  },
};
</script>

<style lang="scss" scoped>
.additional-list__item {
  flex-grow: 1;
  margin-right: unset;

  & + & {
    margin-left: 15px;
  }

  span > span {
    font-weight: normal;
  }
}
</style>

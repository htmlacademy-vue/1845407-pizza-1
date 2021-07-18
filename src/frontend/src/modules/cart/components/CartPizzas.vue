<template>
  <ul class="cart-list sheet">
    <pzz-cart-pizzas-item
      v-for="pizza of pizzas"
      :key="pizza.uid"
      v-bind="pizza"
      class="cart-list__item"
      @onChangeCount="onChangeCount"
    />
  </ul>
</template>

<script>
import PzzCartPizzasItem from "@/modules/cart/components/CartPizzasItem.vue";

import { mapState } from "vuex";

export default {
  name: "CartPizzas",
  components: { PzzCartPizzasItem },
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
  methods: {
    onChangeCount(event) {
      console.log({ onChangeCount: event });
    },
  },
};
</script>

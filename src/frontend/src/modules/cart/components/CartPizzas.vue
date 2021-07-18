<template>
  <ul class="cart-list sheet">
    <pzz-cart-pizzas-item
      v-for="pizza of pizzas"
      :key="pizza.uid"
      v-bind="pizza"
      class="cart-list__item"
      @onChangeCount="addToCart({ ...pizza, count: $event * 1 })"
    />
  </ul>
</template>

<script>
import PzzCartPizzasItem from "@/modules/cart/components/CartPizzasItem.vue";

import { mapState, mapActions } from "vuex";
import { ADD_TO_CART } from "@/store/modules/cart.store";

export default {
  name: "CartPizzas",
  components: { PzzCartPizzasItem },
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
  methods: {
    ...mapActions("Cart", {
      addToCart: ADD_TO_CART,
    }),
  },
};
</script>

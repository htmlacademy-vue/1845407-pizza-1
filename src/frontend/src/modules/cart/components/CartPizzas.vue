<template>
  <ul class="cart-list sheet">
    <pzz-cart-pizzas-item
      v-for="pizza of pizzas"
      :key="pizza.id"
      v-bind="pizza"
      class="cart-list__item"
      @onChangeCount="changePizza({ ...pizza, quantity: $event * 1 })"
    />
  </ul>
</template>

<script>
import PzzCartPizzasItem from "@/modules/cart/components/CartPizzasItem";

import { mapState, mapActions } from "vuex";
import { UPDATE_CART } from "@/store/modules/cart.store";

export default {
  name: "CartPizzas",
  components: { PzzCartPizzasItem },
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
  methods: {
    ...mapActions("Cart", [UPDATE_CART]),
    changePizza(pizza) {
      let pizzas = [...this.pizzas];
      const index = pizzas.findIndex(({ id }) => id === pizza.id);
      if (~index) {
        if (pizza.quantity) {
          pizzas.splice(index, 1, pizza);
        } else {
          pizzas.splice(index, 1);
        }
        this[UPDATE_CART]({ pizzas });
      }
    },
  },
};
</script>

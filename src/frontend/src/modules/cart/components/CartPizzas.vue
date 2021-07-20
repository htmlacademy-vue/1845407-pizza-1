<template>
  <ul class="cart-list sheet">
    <pzz-cart-pizzas-item
      v-for="pizza of pizzas"
      :key="pizza.id"
      v-bind="pizza"
      class="cart-list__item"
      @onChangeCount="changePizza({ ...pizza, count: $event * 1 })"
    />
  </ul>
</template>

<script>
import PzzCartPizzasItem from "@/modules/cart/components/CartPizzasItem.vue";

import { mapState, mapActions } from "vuex";
import { UPDATE_CART } from "@/store/modules/cart.store";

export default {
  name: "CartPizzas",
  components: { PzzCartPizzasItem },
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
  methods: {
    ...mapActions("Cart", {
      updateCart: UPDATE_CART,
    }),
    changePizza(pizza) {
      let pizzas = [...this.pizzas];
      const index = pizzas.findIndex(({ id }) => id === pizza.id);
      if (~index) {
        if (pizza.count) {
          pizzas.splice(index, 1, pizza);
        } else {
          pizzas.splice(index, 1);
        }
        this.updateCart({ pizzas });
      }
    },
  },
};
</script>

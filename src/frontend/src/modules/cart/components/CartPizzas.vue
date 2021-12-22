<template>
  <ul class="cart-list sheet">
    <cart-pizzas-item
      v-for="pizza of pizzas"
      :key="pizza.id"
      :id="pizza.id"
      v-bind="pizza"
      class="cart-list__item"
      @onChangeCount="changePizza({ ...pizza, quantity: $event })"
    />
  </ul>
</template>

<script>
import find from "lodash/find";
import cloneDeep from "lodash/cloneDeep";

import CartPizzasItem from "@/modules/cart/components/CartPizzasItem";

import { mapState, mapActions } from "vuex";
import { UPDATE_CART } from "@/modules/cart/store";

export default {
  name: "CartPizzas",
  components: { CartPizzasItem },
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
  methods: {
    ...mapActions("Cart", [UPDATE_CART]),
    changePizza({ id, quantity }) {
      let pizzas = cloneDeep(this.pizzas);
      let pizza = find(pizzas, { id });
      if (pizza) {
        Object.assign(pizza, { quantity });
        pizzas = pizzas.filter(({ quantity }) => quantity);
        this[UPDATE_CART]({ pizzas });
      }
    },
  },
};
</script>

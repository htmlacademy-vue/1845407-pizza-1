<template>
  <span>{{ cost }} ₽</span>
</template>

<script>
import isUndefined from "lodash/isUndefined";

export default {
  name: "Cost",
  props: {
    pizzas: {
      type: Array,
      default: undefined,
    },
    misc: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    cost() {
      let cost =
        this.pizzas?.reduce(
          (cost, { price, quantity }) => cost + price * quantity,
          0
        ) ?? 0;
      if (isUndefined(this.pizzas) || cost) {
        cost +=
          this.misc?.reduce(
            (cost, { price, quantity }) => cost + price * quantity,
            0
          ) ?? 0;
      }

      return cost;
    },
  },
};
</script>

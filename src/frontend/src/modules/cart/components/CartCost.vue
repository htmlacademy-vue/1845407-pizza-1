<template>
  <span>{{ price }} ₽</span>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartCost",
  computed: {
    ...mapGetters("Cart", ["price"]),
  },
};
</script>

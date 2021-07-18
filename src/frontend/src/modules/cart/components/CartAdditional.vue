<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <pzz-cart-additional-item
        v-for="(addition, index) of additional"
        :key="index"
        v-bind="addition"
        @onChangeCount="changeAddition({ ...addition, count: $event * 1 })"
      />
    </ul>
  </div>
</template>

<script>
import PzzCartAdditionalItem from "@/modules/cart/components/CartAdditionalItem.vue";

import { mapState, mapActions } from "vuex";
import { UPDATE_CART } from "@/store/modules/cart.store";

export default {
  name: "CartAdditional",
  components: { PzzCartAdditionalItem },
  computed: {
    ...mapState("Cart", ["additional"]),
  },
  methods: {
    ...mapActions("Cart", {
      updateCart: UPDATE_CART,
    }),
    changeAddition(addition) {
      let additional = [...this.additional];
      const index = additional.findIndex(({ id }) => id === addition.id);
      if (~index) {
        additional.splice(index, 1, addition);
        this.updateCart({ additional });
      }
    },
  },
};
</script>

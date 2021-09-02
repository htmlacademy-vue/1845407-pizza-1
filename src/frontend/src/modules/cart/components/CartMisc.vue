<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <cart-misc-item
        v-for="item of misc"
        :key="item.id"
        v-bind="item"
        @onChangeCount="changeAddition({ ...item, quantity: $event * 1 })"
      />
    </ul>
  </div>
</template>

<script>
import CartMiscItem from "@/modules/cart/components/CartMiscItem";

import { mapState, mapActions } from "vuex";
import { UPDATE_CART } from "@/store/modules/cart.store";

export default {
  name: "CartMisc",
  components: { CartMiscItem },
  computed: {
    ...mapState("Cart", ["misc"]),
  },
  methods: {
    ...mapActions("Cart", [UPDATE_CART]),
    changeAddition(item) {
      let misc = [...this.misc];
      const index = misc.findIndex(({ id }) => id === item.id);
      if (~index) {
        misc.splice(index, 1, item);
        this[UPDATE_CART]({ misc });
      }
    },
  },
};
</script>

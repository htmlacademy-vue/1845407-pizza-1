<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <cart-misc-item
        v-for="item of misc"
        :key="item.id"
        v-bind="item"
        @onChangeCount="onChangeAddition({ ...item, quantity: $event })"
      />
    </ul>
  </div>
</template>

<script>
import find from "lodash/find";
import cloneDeep from "lodash/cloneDeep";

import CartMiscItem from "@/modules/cart/components/CartMiscItem";

import { mapState, mapActions } from "vuex";
import { UPDATE_CART } from "@/modules/cart/store";

export default {
  name: "CartMisc",
  components: { CartMiscItem },
  computed: {
    ...mapState("Cart", ["misc"]),
  },

  methods: {
    ...mapActions("Cart", [UPDATE_CART]),
    onChangeAddition({ id, quantity }) {
      let misc = cloneDeep(this.misc);
      let item = find(misc, { id });
      if (item) {
        Object.assign(item, { quantity });
        this[UPDATE_CART]({ misc });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/mixins/m_clear-list.scss";

  .additional-list {
    @include clear-list;

    display: flex;
    flex-wrap: wrap;
  }
</style>

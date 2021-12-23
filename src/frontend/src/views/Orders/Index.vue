<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">
        История заказов
      </h1>
    </div>

    <order-item
      v-for="order in orders"
      :id="order.id"
      :key="order.id"
      v-bind="order"
      @onDestroy="destroyOrder"
    />
  </div>
</template>

<script>
import reject from "lodash/reject";

import OrderItem from "@/modules/orders/components/OrderItem";
import {
  auth,
  allowAuthenticated,
} from "@/middlewares";

export default {
  name: "Orders",
  components: { OrderItem },
  layout: "LayoutSidebar",
  middlewares: [auth, allowAuthenticated],
  data() {
    return {
      orders: [],
    };
  },

  async created() {
    this.orders = await this.$api.orders.query();
  },

  methods: {
    destroyOrder({ id }) {
      this.orders = reject(this.orders, { id });
    },
  },
};
</script>

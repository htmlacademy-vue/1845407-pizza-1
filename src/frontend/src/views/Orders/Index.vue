<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">
        История заказов
      </h1>
    </div>

    <order-item
      v-for="order in orders"
      :key="order.id"
      :id="order.id"
      v-bind="order"
      @onDestroy="destroyOrder"
    />
  </div>
</template>

<script>
import reject from "lodash/reject";

import OrderItem from "@/modules/orders/components/OrderItem";

export default {
  name: "Orders",
  components: { OrderItem },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    destroyOrder({ id }) {
      this.orders = reject(this.orders, { id });
    },
  },
  async created() {
    this.orders = await this.$api.orders.query();
  },
};
</script>

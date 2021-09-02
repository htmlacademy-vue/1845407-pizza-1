<template>
  <main class="content">
    <form
      action="/orders"
      method="post"
      class="layout-form"
      @submit.prevent="submit"
    >
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <!-- <div class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div> -->
        <template v-if="isEmpty">
          <div class="sheet cart__empty">
            <p>В корзине нет ни одного товара</p>
          </div>
        </template>
        <template v-else>
          <pzz-cart-pizzas />
          <pzz-cart-misc />
          <pzz-cart-delivery />
        </template>
      </div>
      <pzz-cart-footer />
    </form>
    <div class="modal">
      <router-view name="modal" />
    </div>
  </main>
</template>

<script>
import PzzCartPizzas from "@/modules/cart/components/CartPizzas";
import PzzCartMisc from "@/modules/cart/components/CartMisc";
import PzzCartDelivery from "@/modules/cart/components/CartDelivery";
import PzzCartFooter from "@/modules/cart/components/CartFooter";

import { mapState, mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    PzzCartPizzas,
    PzzCartMisc,
    PzzCartDelivery,
    PzzCartFooter,
  },
  computed: {
    ...mapGetters("Cart", ["isEmpty", "toJson"]),
    ...mapState("Auth", ["account"]),
  },
  methods: {
    async submit() {
      const userId = this.account && this.account?.id;
      try {
        await this.$api.orders.post({ ...this.toJson, userId });
        await this.$router.push({ name: "thanks" });
      } catch (err) {
        // continue regardless of error
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

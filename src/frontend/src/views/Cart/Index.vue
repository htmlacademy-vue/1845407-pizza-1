<template>
  <main class="content">
    <form
      action=""
      method="post"
      class="layout-form"
      @submit.prevent="submit"
    >
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">
            Корзина
          </h1>
        </div>

        <template v-if="isEmpty">
          <div class="sheet cart__empty">
            <p>В корзине нет ни одного товара</p>
          </div>
        </template>
        <template v-else>
          <cart-pizzas />
          <cart-misc />
          <cart-delivery />
        </template>
      </div>
      <cart-footer />
    </form>
    <base-modal-window v-slot="modal">
      <router-view
        @close="modal.close"
      />
    </base-modal-window>
  </main>
</template>

<script>
import CartPizzas from "@/modules/cart/components/CartPizzas";
import CartMisc from "@/modules/cart/components/CartMisc";
import CartDelivery from "@/modules/cart/components/CartDelivery";
import CartFooter from "@/modules/cart/components/CartFooter";

import { mapState, mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    CartPizzas,
    CartMisc,
    CartDelivery,
    CartFooter,
  },
  computed: {
    ...mapGetters("Cart", ["isEmpty", "toJson"]),
    ...mapState("Auth", ["account"]),
  },
  methods: {
    async submit() {
      const userId = this.account?.id;
      try {
        await this.$api.orders.post({ ...this.toJson, userId });
        await this.$router.push("/cart/thanks");
      } catch (err) {
        // continue regardless of error
      }
    },
  },
};
</script>

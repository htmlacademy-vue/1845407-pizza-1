<template>
  <form action="test.html" method="post" class="layout-form">
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
        <pzz-cart-additional />
        <pzz-cart-delivery />
      </template>
    </div>
    <pzz-cart-footer />
  </form>
</template>

<script>
import PzzCartPizzas from "@/modules/cart/components/CartPizzas.vue";
import PzzCartAdditional from "@/modules/cart/components/CartAdditional.vue";
import PzzCartDelivery from "@/modules/cart/components/CartDelivery.vue";
import PzzCartFooter from "@/modules/cart/components/CartFooter.vue";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    PzzCartPizzas,
    PzzCartAdditional,
    PzzCartDelivery,
    PzzCartFooter,
  },
  computed: {
    ...mapGetters("Cart", ["isEmpty"]),
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <form action="test.html" method="post" class="layout-form">
    <div class="container">
      <div class="cart__title">
        <h1 class="title title--big">Корзина</h1>
      </div>

      <!-- <div class="sheet cart__empty">
        <p>В корзине нет ни одного товара</p>
      </div> -->
      <pzz-cart-pizzas />
      <pzz-cart-additional />
      <pzz-cart-delivery />
    </div>
    <pzz-cart-footer />
  </form>
</template>

<script>
import PzzCartPizzas from "@/modules/cart/components/CartPizzas.vue";
import PzzCartAdditional from "@/modules/cart/components/CartAdditional.vue";
import PzzCartDelivery from "@/modules/cart/components/CartDelivery.vue";
import PzzCartFooter from "@/modules/cart/components/CartFooter.vue";

export default {
  name: "Cart",
  components: {
    PzzCartPizzas,
    PzzCartAdditional,
    PzzCartDelivery,
    PzzCartFooter,
  },
};
</script>

<style lang="scss" scoped></style>

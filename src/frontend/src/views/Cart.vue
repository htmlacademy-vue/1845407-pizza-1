<template>
  <form action="test.html" method="post" class="layout-form">
    <div class="container">
      <div class="cart__title">
        <h1 class="title title--big">Корзина</h1>
      </div>

      <!-- <div class="sheet cart__empty">
        <p>В корзине нет ни одного товара</p>
      </div> -->
      <pzz-cart-list />
      <pzz-cart-additional />
      <pzz-cart-form />
    </div>
    <pzz-cart-footer />
  </form>
</template>

<script>
import PzzCartList from "@/modules/cart/components/CartList.vue";
import PzzCartAdditional from "@/modules/cart/components/CartAdditional.vue";
import PzzCartForm from "@/modules/cart/components/CartForm.vue";
import PzzCartFooter from "@/modules/cart/components/CartFooter.vue";

export default {
  name: "Cart",
  components: {
    PzzCartList,
    PzzCartAdditional,
    PzzCartForm,
    PzzCartFooter,
  },
};
</script>

<style lang="scss" scoped></style>

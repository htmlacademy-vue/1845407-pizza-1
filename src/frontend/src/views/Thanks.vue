<template>
  <div class="popup">
    <a href="#" class="close" @click.prevent="resetCart">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click.prevent="resetCart">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { RESET_CART } from "@/store/modules/cart.store";

export default {
  name: "Thanks",
  methods: {
    ...mapActions("Cart", {
      resetCart: RESET_CART,
    }),
  },
};
</script>

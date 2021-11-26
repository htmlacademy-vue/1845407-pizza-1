<template>
  <section class="footer">
    <div class="footer__more">
      <router-link
        :to="{ name: 'builder' }"
        class="button button--border button--arrow"
      >
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: <pzz-cart-cost /></b>
    </div>

    <div class="footer__submit">
      <button type="submit" class="button" :disabled="!price">
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import PzzCartCost from "@/modules/cart/components/CartCost";
import { mapGetters } from "vuex";

export default {
  name: "CartFooter",
  components: { PzzCartCost },
  computed: {
    ...mapGetters("Cart", ["price"]),
  },
};
</script>
